import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";
import * as db from "./db";
import { createShareLink, verifyShareLink } from "./_core/shareLinks";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Temporary Share Links
  shareLinks: router({
    create: adminProcedure
      .input(
        z.object({
          ttlHours: z.number().int().min(1).max(168),
          note: z.string().max(200).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const expiresInMs = input.ttlHours * 60 * 60 * 1000;
        const { token, expiresAt } = await createShareLink(expiresInMs);

        return {
          token,
          expiresAt: expiresAt.toISOString(),
          note: input.note ?? null,
        };
      }),
    validate: publicProcedure
      .input(z.object({ token: z.string().min(10) }))
      .query(async ({ input }) => {
        const result = await verifyShareLink(input.token);

        return {
          valid: result.valid,
          expiresAt: result.expiresAt ? result.expiresAt.toISOString() : null,
        };
      }),
  }),

  // Contact form submission with owner notification
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
          phone: z.string().min(10, "رقم الهاتف غير صحيح"),
          date: z.string().min(1, "يرجى اختيار التاريخ"),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const title = `📸 طلب حجز جديد من ${input.name}`;
        const content = `
**طلب حجز جديد**

**الاسم:** ${input.name}
**رقم الهاتف:** ${input.phone}
**تاريخ المناسبة:** ${input.date}
${input.message ? `**تفاصيل إضافية:** ${input.message}` : ""}

---
تم استلام هذا الطلب من موقع Badr Bado Photography
        `.trim();

        const delivered = await notifyOwner({ title, content });

        return {
          success: true,
          notificationSent: delivered,
        } as const;
      }),
  }),

  // ============================================
  // Admin CMS API
  // ============================================

  // Site Content Management
  siteContent: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllSiteContent();
    }),
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await db.getSiteContentByKey(input.key);
      }),
    upsert: adminProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
        category: z.string(),
        label: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.upsertSiteContent(input);
      }),
    delete: adminProcedure
      .input(z.object({ key: z.string() }))
      .mutation(async ({ input }) => {
        return await db.deleteSiteContent(input.key);
      }),
  }),

  // Site Images Management
  siteImages: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllSiteImages();
    }),
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await db.getSiteImageByKey(input.key);
      }),
    upsert: adminProcedure
      .input(z.object({
        key: z.string(),
        url: z.string(),
        alt: z.string().optional(),
        category: z.string(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.upsertSiteImage(input);
      }),
    upload: adminProcedure
      .input(z.object({
        key: z.string(),
        base64: z.string(),
        mimeType: z.string(),
        alt: z.string().optional(),
        category: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Convert base64 to buffer
        const buffer = Buffer.from(input.base64, 'base64');
        const ext = input.mimeType.split('/')[1] || 'jpg';
        const fileKey = `images/${input.key}-${nanoid(8)}.${ext}`;
        
        // Upload to S3
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        
        // Save to database
        return await db.upsertSiteImage({
          key: input.key,
          url,
          alt: input.alt,
          category: input.category,
        });
      }),
    delete: adminProcedure
      .input(z.object({ key: z.string() }))
      .mutation(async ({ input }) => {
        return await db.deleteSiteImage(input.key);
      }),
  }),

  // Portfolio Images Management
  portfolio: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllPortfolioImages();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getPortfolioImageById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        url: z.string(),
        category: z.string(),
        visible: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createPortfolioImage(input);
      }),
    upload: adminProcedure
      .input(z.object({
        title: z.string(),
        base64: z.string(),
        mimeType: z.string(),
        category: z.string(),
        visible: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, 'base64');
        const ext = input.mimeType.split('/')[1] || 'jpg';
        const fileKey = `portfolio/${nanoid(12)}.${ext}`;
        
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        
        return await db.createPortfolioImage({
          title: input.title,
          url,
          category: input.category,
          visible: input.visible ?? true,
        });
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        url: z.string().optional(),
        category: z.string().optional(),
        visible: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updatePortfolioImage(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deletePortfolioImage(input.id);
      }),
  }),

  // Site Sections Management
  sections: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllSiteSections();
    }),
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await db.getSiteSectionByKey(input.key);
      }),
    upsert: adminProcedure
      .input(z.object({
        key: z.string(),
        name: z.string(),
        visible: z.boolean(),
        sortOrder: z.number().optional(),
        page: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await db.upsertSiteSection(input);
      }),
    toggleVisibility: adminProcedure
      .input(z.object({
        key: z.string(),
        visible: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        return await db.updateSiteSectionVisibility(input.key, input.visible);
      }),
  }),

  // Packages Management
  packages: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllPackages();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getPackageById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        price: z.string(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        category: z.string(),
        popular: z.boolean().optional(),
        visible: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createPackage(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        price: z.string().optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        category: z.string().optional(),
        popular: z.boolean().optional(),
        visible: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updatePackage(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deletePackage(input.id);
      }),
  }),

  // Testimonials Management
  testimonials: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllTestimonials();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getTestimonialById(input.id);
      }),
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        quote: z.string(),
        visible: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createTestimonial(input);
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        quote: z.string().optional(),
        visible: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateTestimonial(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await db.deleteTestimonial(input.id);
      }),
  }),

  // Contact Info Management
  contactInfo: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllContactInfo();
    }),
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await db.getContactInfoByKey(input.key);
      }),
    upsert: adminProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
        label: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.upsertContactInfo(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;

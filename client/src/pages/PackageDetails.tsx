import { Link } from "wouter";
import { Facebook, Instagram, MessageCircle, Phone, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EditableText } from "@/components/InlineEdit";
import { useContactData, useContentData } from "@/hooks/useSiteData";

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.56 4.15 1.62 5.96L0 24l6.2-1.62a11.95 11.95 0 0 0 5.86 1.5h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.44ZM12.07 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.96.98-3.58-.24-.37a9.9 9.9 0 0 1-1.56-5.36C2.16 6.5 6.6 2.06 12.06 2.06c2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.9 6.98c0 5.46-4.44 9.97-9.87 9.97Zm5.77-7.48c-.31-.16-1.82-.9-2.1-1-.28-.1-.48-.16-.68.16-.2.31-.78 1-.96 1.2-.18.2-.35.24-.66.08-.31-.16-1.3-.48-2.47-1.54-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.35.47-.52.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.68-1.65-.93-2.27-.24-.58-.49-.5-.68-.5h-.58c-.2 0-.52.08-.8.39-.28.31-1.06 1.03-1.06 2.5 0 1.47 1.08 2.9 1.23 3.1.16.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.82-.74 2.08-1.45.26-.7.26-1.3.18-1.45-.08-.14-.28-.23-.58-.39Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function PackageDetails() {
  const { contactInfo, socialLinks } = useContactData();
  const content = useContentData();
  const contentMap = content.contentMap ?? {};

  const phone = (contactInfo.phone ?? "").replace(/\s/g, "");
  const whatsapp = (contactInfo.whatsappNumber ?? "").replace(/[^\d]/g, "");
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}` : "";
  const telHref = phone ? `tel:${phone}` : "";

  const options = [
    {
      key: "package_help_option_1",
      fallback: "عايز استفسر عن حاجه كمان",
      href: "/contact",
      icon: MessageCircle,
    },
    {
      key: "package_help_option_2",
      fallback: "احجز ازاي",
      href: "/contact",
      icon: Sparkles,
    },
    {
      key: "package_help_option_3",
      fallback: "بنفع احجز دلوقتي لمده طويله قدام",
      href: "/contact",
      icon: Sparkles,
    },
    {
      key: "package_help_option_4",
      fallback: "عايز اتواصل معاك بشكل مباشر",
      href: telHref || "/contact",
      icon: Phone,
      external: Boolean(telHref),
    },
    {
      key: "package_help_option_5",
      fallback: "واتسابك",
      href: whatsappHref || "/contact",
      icon: WhatsAppIcon,
      external: Boolean(whatsappHref),
    },
    {
      key: "package_help_option_6",
      fallback: "عايز اشوف شكل الالبومات وغيره",
      href: "/portfolio",
      icon: Sparkles,
    },
  ];

  const socials = [
    {
      key: "instagram",
      href: socialLinks.instagram,
      label: "Instagram",
      icon: Instagram,
    },
    {
      key: "facebook",
      href: socialLinks.facebook,
      label: "Facebook",
      icon: Facebook,
    },
    {
      key: "tiktok",
      href: socialLinks.tiktok,
      label: "TikTok",
      icon: TikTokIcon,
    },
    {
      key: "whatsapp",
      href: whatsappHref,
      label: "WhatsApp",
      icon: WhatsAppIcon,
    },
  ].filter((item) => Boolean(item.href));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <header className="pt-28 pb-10 md:pt-32 bg-card/60 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_15%,rgba(255,200,80,0.12),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">
              <EditableText
                value={contentMap.package_help_kicker}
                fallback="اختار اللي يناسبك"
                fieldKey="package_help_kicker"
                category="services"
                label="شارة صفحة تفاصيل الباقات"
              />
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <EditableText
              value={contentMap.package_help_title}
              fallback="تفاصيل الباقات"
              fieldKey="package_help_title"
              category="services"
              label="عنوان صفحة تفاصيل الباقات"
            />
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={contentMap.package_help_subtitle}
              fallback="اختر من الخيارات التالية علشان نوصل لأفضل قرار سريع وواضح."
              fieldKey="package_help_subtitle"
              category="services"
              label="وصف صفحة تفاصيل الباقات"
              multiline
            />
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => {
              const Icon = option.icon as any;
              const isExternal = option.external || option.href?.startsWith("http");
              const contentNode = (
                <>
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-black/20 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-base md:text-lg font-semibold">
                      <EditableText
                        value={contentMap[option.key]}
                        fallback={option.fallback}
                        fieldKey={option.key}
                        category="services"
                        label={`خيار الباقة: ${option.fallback}`}
                        multiline
                      />
                    </div>
                  </div>
                </>
              );

              if (option.href?.startsWith("/") && !isExternal) {
                return (
                  <Link key={option.key} href={option.href}>
                    <a className="premium-border border border-white/10 bg-card/50 p-5 flex items-center justify-between gap-4 hover:border-primary/40 hover:bg-primary/5 transition-colors">
                      {contentNode}
                    </a>
                  </Link>
                );
              }

              return (
                <a
                  key={option.key}
                  href={option.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="premium-border border border-white/10 bg-card/50 p-5 flex items-center justify-between gap-4 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  {contentNode}
                </a>
              );
            })}
          </div>

          {socials.length > 0 && (
            <div className="mt-10">
              <div className="text-center mb-6 text-sm text-muted-foreground">
                <EditableText
                  value={contentMap.package_help_socials_title}
                  fallback="تواصل معنا عبر السوشيال"
                  fieldKey="package_help_socials_title"
                  category="services"
                  label="عنوان السوشيال في صفحة تفاصيل الباقات"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {socials.map((social) => {
                  const Icon = social.icon as any;
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/15 bg-black/20 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
                    >
                      <Icon size={26} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

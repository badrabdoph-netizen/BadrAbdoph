import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Instagram, Facebook, Send, Sparkles, Copy } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  contactInfo,
  socialLinks,
  pageTexts,
  sessionPackages,
  sessionPackagesWithPrints,
  weddingPackages,
  additionalServices,
} from "@/config/siteConfig";

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }),
  phone: z
    .string()
    .min(10, { message: "رقم الهاتف قصير" })
    .regex(/^[0-9+\s()-]+$/, { message: "اكتب رقم صحيح (أرقام فقط)" }),
  date: z.string().min(1, { message: "يرجى اختيار التاريخ" }),
  packageId: z.string().min(1, { message: "اختر الباقة" }),
  addonIds: z.array(z.string()).optional(),
});

function toEnglishDigits(input: string) {
  const ar = "٠١٢٣٤٥٦٧٨٩";
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  return input
    .split("")
    .map((ch) => {
      const iAr = ar.indexOf(ch);
      if (iAr !== -1) return String(iAr);
      const iFa = fa.indexOf(ch);
      if (iFa !== -1) return String(iFa);
      return ch;
    })
    .join("");
}

function normalizePhone(raw: string) {
  let v = toEnglishDigits(raw);
  v = v.replace(/[^\d+]/g, "");
  if (v.includes("+") && !v.startsWith("+")) v = v.replace(/\+/g, "");
  v = v.startsWith("+") ? "+" + v.slice(1).replace(/\+/g, "") : v;
  return v;
}

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

function buildWhatsAppHref(text: string) {
  const phone = (contactInfo.whatsappNumber ?? "").replace(/[^\d]/g, "");
  if (!phone) return "";
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", date: "", packageId: "", addonIds: [] },
    mode: "onBlur",
  });

  const packageOptions = useMemo(() => {
    const map = (items: Array<{ id: string; name: string; price: string }>) =>
      items.map((p) => ({ id: p.id, label: p.name, price: p.price }));
    return [
      ...map(sessionPackages as any),
      ...map(sessionPackagesWithPrints as any),
      ...map(weddingPackages as any),
    ];
  }, []);

  const addonOptions = useMemo(() => {
    const list = (additionalServices ?? []) as Array<{
      id: string;
      name: string;
      price: string;
      emoji?: string;
      priceNote?: string;
    }>;
    return list.map((a) => ({
      id: a.id,
      label: a.name,
      price: a.price,
      emoji: a.emoji,
      priceNote: a.priceNote,
    }));
  }, []);

  const addonOptions = useMemo(() => {
    const list = (additionalServices ?? []) as Array<{
      id: string;
      name: string;
      price: string;
      emoji?: string;
      priceNote?: string;
    }>;
    return list.map((a) => ({
      id: a.id,
      label: a.name,
      price: a.price,
      emoji: a.emoji,
      priceNote: a.priceNote,
    }));
  }, []);

  const watchedName = useWatch({ control: form.control, name: "name" }) ?? "";
  const watchedPhone = useWatch({ control: form.control, name: "phone" }) ?? "";
  const watchedDate = useWatch({ control: form.control, name: "date" }) ?? "";
  const watchedPackageId = useWatch({ control: form.control, name: "packageId" }) ?? "";
  const watchedAddonIds = useWatch({ control: form.control, name: "addonIds" }) ?? [];

  const selectedPackage = useMemo(
    () => packageOptions.find((p) => p.id === watchedPackageId),
    [packageOptions, watchedPackageId]
  );

  const selectedAddons = useMemo(
    () => addonOptions.filter((a) => watchedAddonIds.includes(a.id)),
    [addonOptions, watchedAddonIds]
  );

  const addonsText = selectedAddons.length
    ? selectedAddons.map((a) => a.label).join("، ")
    : "—";

  const priceValue = selectedPackage?.price ?? "";
  const receiptText = useMemo(() => {
    const lines = [
      "إيصال حجز ❤️",
      `الاسم: ${watchedName || "—"}`,
      `الهاتف: ${watchedPhone || "—"}`,
      `التاريخ: ${watchedDate || "—"}`,
      `الباقة: ${selectedPackage?.label || "—"}`,
      `الإضافات: ${addonsText}`,
      `السعر: ${priceValue || "—"}`,
    ];
    return lines.join("\n");
  }, [watchedName, watchedPhone, watchedDate, selectedPackage, addonsText, priceValue]);

  const whatsappReceiptHref = useMemo(() => buildWhatsAppHref(receiptText), [receiptText]);

  const whatsappBookingHref = useMemo(() => buildWhatsAppHref("عايز احجز اوردر ❤️"), []);
  const telHref = useMemo(() => `tel:${(contactInfo.phone ?? "").replace(/\s/g, "")}`, []);

  const onSendReceipt = () => {
    if (!whatsappReceiptHref) {
      toast.error("أدخل البيانات كاملة أولاً.");
      return;
    }
    window.open(whatsappReceiptHref, "_blank");
  };

  const onCopyReceipt = async () => {
    try {
      await navigator.clipboard.writeText(receiptText);
      toast.success("تم نسخ الإيصال.");
    } catch {
      toast.error("تعذر النسخ. جرّب مرة أخرى.");
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "120px";
    return () => {
      document.documentElement.style.scrollPaddingTop = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <header className="pt-32 pb-10 bg-card relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_15%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">
              رد سريع • تنظيم مواعيد • تفاصيل واضحة
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {pageTexts.contact.title}
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            {pageTexts.contact.subtitle}
          </p>
        </div>
      </header>

      {/* Quick Actions */}
      <section className="border-y border-white/10 bg-background/70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={whatsappBookingHref}
              target="_blank"
              rel="noreferrer"
              className="premium-border bg-card/40 border border-white/10 px-4 py-4 flex items-center justify-center gap-2 hover:border-primary/35 transition-colors"
            >
              <span className="text-primary">
                <WhatsAppIcon />
              </span>
              <span className="text-sm font-semibold">واتساب</span>
            </a>

            <a
              href={telHref}
              className="premium-border bg-card/40 border border-white/10 px-4 py-4 flex items-center justify-center gap-2 hover:border-primary/35 transition-colors"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">مكالمة</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Form FIRST on mobile */}
            <div className="order-1 lg:order-2 bg-card p-7 md:p-10 border border-white/10 premium-border">
              <h2 className="text-2xl font-bold mb-6">{pageTexts.contact.formTitle}</h2>

              <Form {...form}>
                <form className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم بالكامل</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="أدخل اسمك"
                            {...field}
                            className="bg-background border-white/10 focus:border-primary h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاريخ المناسبة</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-background border-white/10 focus:border-primary h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="packageId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اختر الباقة</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full bg-background border-white/10 focus:border-primary h-12">
                              <SelectValue placeholder="اختر الباقة المناسبة" />
                            </SelectTrigger>
                            <SelectContent>
                              {packageOptions.map((opt) => (
                                <SelectItem key={opt.id} value={opt.id}>
                                  <span className="flex items-center justify-between w-full gap-3">
                                    <span>{opt.label}</span>
                                    <span className="text-xs text-muted-foreground">{opt.price}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="01xxxxxxxxx"
                            value={field.value}
                            onChange={(e) => field.onChange(normalizePhone(e.target.value))}
                            className="bg-background border-white/10 focus:border-primary h-12 text-right"
                            dir="ltr"
                            inputMode="tel"
                            autoComplete="tel"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-2">
                    <Label>السعر المختار</Label>
                    <Input
                      value={priceValue}
                      readOnly
                      placeholder="سيظهر السعر تلقائياً"
                      className="bg-background border-white/10 focus:border-primary h-12 text-right"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>الإضافات المتاحة</Label>
                    <div className="rounded-md border border-white/10 bg-background/60 p-3 space-y-2">
                      {addonOptions.length ? (
                        addonOptions.map((opt) => (
                          <div key={opt.id} className="space-y-1">
                            <div className="flex items-center justify-between gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                {opt.emoji ? <span className="text-base">{opt.emoji}</span> : null}
                                <span>{opt.label}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{opt.price}</span>
                            </div>
                            {opt.priceNote ? (
                              <div className="text-[11px] text-muted-foreground/70 pr-6">
                                {opt.priceNote}
                              </div>
                            ) : null}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">لا توجد إضافات حالياً.</div>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground/70">
                      هذه الإضافات للعرض فقط، ويتم تأكيدها لاحقًا عبر واتساب.
                    </p>
                  </div>

                  <div className="rounded-md border border-white/10 bg-background/60 p-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold">الإيصال</div>
                      <button
                        type="button"
                        onClick={onCopyReceipt}
                        className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        <Copy size={14} />
                        نسخ
                      </button>
                    </div>
                    <pre className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed">
                      {receiptText}
                    </pre>
                  </div>

                  <div className="pt-2">
                    <div
                      className="md:static md:bg-transparent md:border-0 md:p-0
                                 sticky bottom-0 z-20 -mx-7 px-7 pb-3 pt-3
                                 bg-card/92 backdrop-blur-md border-t border-white/10"
                      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
                    >
                      <Button
                        type="button"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg rounded-none"
                        onClick={form.handleSubmit(onSendReceipt)}
                      >
                        إرسال الإيصال على واتساب
                        <Send size={18} className="mr-2" />
                      </Button>

                      <p className="text-[11px] text-muted-foreground/75 text-center mt-3 leading-relaxed">
                        بالضغط على إرسال، سيتم فتح واتساب بإيصال جاهز حسب اختياراتك.
                      </p>
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            {/* Info SECOND on mobile */}
            <div className="order-2 lg:order-1 space-y-10">
              <div className="premium-border bg-card/40 border border-white/10 p-7 md:p-9">
                <h2 className="text-2xl font-bold mb-4 text-primary">{pageTexts.contact.infoTitle}</h2>
                <p className="text-muted-foreground leading-relaxed mb-7">
                  {pageTexts.contact.infoDescription}
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black/15 border border-white/10 flex items-center justify-center text-primary">
                      <Phone size={22} />
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold">الهاتف</h4>
                      <a
                        href={telHref}
                        className="text-muted-foreground hover:text-primary transition-colors dir-ltr block"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black/15 border border-white/10 flex items-center justify-center text-primary">
                      <span className="text-primary">
                        <WhatsAppIcon size={22} />
                      </span>
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold">واتساب</h4>
                      <a
                        href={whatsappBookingHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors dir-ltr block"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black/15 border border-white/10 flex items-center justify-center text-primary">
                      <Mail size={22} />
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold">البريد الإلكتروني</h4>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black/15 border border-white/10 flex items-center justify-center text-primary">
                      <MapPin size={22} />
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold">الموقع</h4>
                      <p className="text-muted-foreground">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="premium-border bg-card/40 border border-white/10 p-7 md:p-9">
                <h2 className="text-xl font-bold mb-5">تابعنا على</h2>
                <div className="flex gap-3">
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 bg-black/15 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={22} />
                  </a>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 bg-black/15 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook size={22} />
                  </a>
                  <a
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 bg-black/15 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label="TikTok"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappBookingHref}
        target="_blank"
        rel="noreferrer"
        className="fixed z-50 premium-border bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg flex items-center gap-2 px-5 py-3 md:px-0 md:py-0 md:w-14 md:h-14 md:rounded-full rounded-full"
        style={{ right: "1rem", bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        title="تواصل عبر واتساب"
      >
        <WhatsAppIcon />
        <span className="text-sm font-semibold md:hidden">واتساب</span>
      </a>

      <style>{`
        .premium-border { position: relative; }
        .premium-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255,255,255,0.06);
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>

      <Footer />
    </div>
  );
}

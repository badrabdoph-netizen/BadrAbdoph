import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Sparkles,
  Camera,
  Heart,
  Receipt,
  PlusCircle,
  ArrowLeft,
  Phone,
  Gift,
  ArrowDown,
  Gem,
} from "lucide-react";
import {
  pageTexts,
  ctaTexts,
} from "@/config/siteConfig";
import { useContactData, usePackagesData, useContentData } from "@/hooks/useSiteData";
import { EditableText } from "@/components/InlineEdit";

type Pkg = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  featured?: boolean;
  badge?: string;
  priceNote?: string;
};

function CoupleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8.5" r="2.2" />
      <path d="M4 20c.5-3 2.2-4.8 4-4.8s3.5 1.8 4 4.8" />
      <path d="M12.5 20c.4-2.2 1.8-3.8 3.5-3.8 1.6 0 3 1.6 3.4 3.8" />
      <path d="M4.8 6.2l3.2-3.2 3.2 3.2" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.56 4.15 1.62 5.96L0 24l6.2-1.62a11.95 11.95 0 0 0 5.86 1.5h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.44ZM12.07 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.96.98-3.58-.24-.37a9.9 9.9 0 0 1-1.56-5.36C2.16 6.5 6.6 2.06 12.06 2.06c2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.9 6.98c0 5.46-4.44 9.97-9.87 9.97Zm5.77-7.48c-.31-.16-1.82-.9-2.1-1-.28-.1-.48-.16-.68.16-.2.31-.78 1-.96 1.2-.18.2-.35.24-.66.08-.31-.16-1.3-.48-2.47-1.54-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.35.47-.52.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.68-1.65-.93-2.27-.24-.58-.49-.5-.68-.5h-.58c-.2 0-.52.08-.8.39-.28.31-1.06 1.03-1.06 2.5 0 1.47 1.08 2.9 1.23 3.1.16.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.82-.74 2.08-1.45.26-.7.26-1.3.18-1.45-.08-.14-.28-.23-.58-.39Z"
        fill="currentColor"
      />
    </svg>
  );
}

function buildWhatsAppHref(text: string, whatsappNumber: string | undefined) {
  const phone = (whatsappNumber ?? "").replace(/[^\d]/g, "");
  if (!phone) return "";
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}


function getNavOffsetPx() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-offset").trim();
  const n = parseInt(v.replace("px", ""), 10);
  return Number.isFinite(n) ? n : 96;
}

function getSectionScrollMarginPx() {
  return getNavOffsetPx() + 78;
}

function SectionHeader({
  title,
  subtitle,
  icon,
  subtitleClassName,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  subtitleClassName?: string;
}) {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-4">
        {icon}
        <span className={["text-xs md:text-sm text-foreground/80", subtitleClassName ?? ""].join(" ")}>
          {subtitle ?? "تفاصيل واضحة • جودة ثابتة • ستايل فاخر"}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <div className="mt-5 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}

function PrimaryCTA({ whatsappNumber, label }: { whatsappNumber: string | undefined; label: React.ReactNode }) {
  void whatsappNumber;
  return (
    <Link href="/contact">
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 text-lg rounded-none w-full sm:w-auto cta-glow"
      >
        {label}
      </Button>
    </Link>
  );
}

function PackageCard({
  pkg,
  kind,
  whatsappNumber,
  contentMap,
}: {
  pkg: Pkg;
  kind: "session" | "prints" | "wedding" | "addon";
  whatsappNumber: string | undefined;
  contentMap: Record<string, string>;
}) {
  const isVipPlus = (p: any) => p?.id === "full-day-vip-plus" || p?.featured === true;
  const isWedding = kind === "wedding";
  const vip = isWedding && isVipPlus(pkg);
  const weddingTone = isWedding;
  const popular = !!pkg.popular;
  const isCustom = pkg.id === "special-montage-design";
  const isPro = pkg.id === "session-2";
  const baseKey = `package_${pkg.id}`;
  const getValue = (key: string, fallback = "") => (contentMap[key] as string | undefined) ?? fallback;
  const customDescription = getValue(`${baseKey}_description`, pkg.description ?? "").trim();

  const Icon =
    kind === "wedding" || kind === "prints" ? (
      <CoupleIcon className="w-9 h-9 text-primary" />
    ) : kind === "addon" ? (
      <PlusCircle className="w-9 h-9 text-primary" />
    ) : (
      <Camera className="w-9 h-9 text-primary" />
    );

  const waInquiryText = getValue("services_whatsapp_inquiry_text", "حابب استفسر ❤️");
  const waInquiryHref = buildWhatsAppHref(waInquiryText, whatsappNumber);

  return (
    <div
      className={[
        "relative overflow-hidden bg-card border transition-all duration-300 group premium-border p-7 md:p-8 services-card",
        isCustom ? "custom-package md:col-span-2" : "",
        weddingTone
          ? "border-primary/45 shadow-[0_0_70px_rgba(255,200,80,0.12)] hover:shadow-[0_0_95px_rgba(255,200,80,0.18)] hover:-translate-y-2"
          : popular || isPro
          ? "border-primary/30 shadow-lg shadow-primary/15 hover:-translate-y-2"
          : "border-white/10 hover:border-primary/35 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 pointer-events-none transition-opacity duration-300",
          weddingTone || popular || isPro ? "opacity-40" : "opacity-0 group-hover:opacity-100",
          "bg-[radial-gradient(circle_at_30%_20%,rgba(255,200,80,0.14),transparent_60%)]",
        ].join(" ")}
      />

      <div className={["relative z-10", isCustom ? "custom-body" : ""].join(" ")}>
        <div
          className={[
            "flex flex-col gap-4 mb-6",
            isCustom ? "items-center text-center" : "sm:flex-row sm:items-start sm:justify-between",
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-white/10 bg-black/15 backdrop-blur-md flex items-center justify-center">
              {Icon}
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <h3 className={["text-xl md:text-2xl font-bold leading-tight", vip ? "text-primary" : ""].join(" ")}>
                  <EditableText
                    value={contentMap[`${baseKey}_name`]}
                    fallback={pkg.name}
                    fieldKey={`${baseKey}_name`}
                    category="services"
                    label={`اسم الباقة ${pkg.name}`}
                  />
                </h3>
                {vip && (
                  <span className="inline-flex items-center justify-center px-2.5 py-1 text-[10px] md:text-xs font-semibold tracking-wide rounded-full border border-amber-300/50 text-amber-100/90 bg-[linear-gradient(135deg,rgba(255,215,140,0.22),rgba(255,180,60,0.12))] shadow-[0_10px_28px_rgba(255,200,80,0.18)] backdrop-blur-sm relative md:-translate-y-[1px]">
                    <EditableText
                      value={contentMap[`${baseKey}_vip_label`]}
                      fallback="VIP PLUS"
                      fieldKey={`${baseKey}_vip_label`}
                      category="services"
                      label={`شارة VIP - ${pkg.name}`}
                    />
                  </span>
                )}
                {(contentMap[`${baseKey}_badge`] ?? pkg.badge) && !vip ? (
                  <span className="pro-badge">
                    <EditableText
                      value={contentMap[`${baseKey}_badge`]}
                      fallback={pkg.badge ?? ""}
                      fieldKey={`${baseKey}_badge`}
                      category="services"
                      label={`شارة الباقة ${pkg.name}`}
                    />
                  </span>
                ) : null}
                {popular && !vip && !(contentMap[`${baseKey}_badge`] ?? pkg.badge) ? (
                  <span className="inline-flex items-center justify-center px-2.5 py-1 text-[10px] md:text-xs font-semibold rounded-full border border-white/15 text-foreground/90 bg-white/5 shadow-[0_10px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm relative md:-translate-y-[1px]">
                    <EditableText
                      value={contentMap[`${baseKey}_popular_label`]}
                      fallback="الأكثر طلباً"
                      fieldKey={`${baseKey}_popular_label`}
                      category="services"
                      label={`شارة الأكثر طلباً - ${pkg.name}`}
                    />
                  </span>
                ) : null}
              </div>
              {isCustom ? (
                customDescription ? (
                  <div className="custom-line">
                    <EditableText
                      value={contentMap[`${baseKey}_description`]}
                      fallback={customDescription}
                      fieldKey={`${baseKey}_description`}
                      category="services"
                      label={`وصف الباقة ${pkg.name}`}
                      multiline
                    />
                  </div>
                ) : null
              ) : (
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  <EditableText
                    value={contentMap[`${baseKey}_description`]}
                    fallback={pkg.description}
                    fieldKey={`${baseKey}_description`}
                    category="services"
                    label={`وصف الباقة ${pkg.name}`}
                    multiline
                  />
                </p>
              )}
            </div>
          </div>

          <div className="text-right sm:text-left">
            <div className="text-primary font-bold text-2xl md:text-3xl leading-none">
              <EditableText
                value={contentMap[`${baseKey}_price`]}
                fallback={pkg.price}
                fieldKey={`${baseKey}_price`}
                category="services"
                label={`سعر الباقة ${pkg.name}`}
              />
              {vip ? (
                <span className="price-note-inline">
                  <EditableText
                    value={contentMap.services_price_note_inline}
                    fallback="متوسط"
                    fieldKey="services_price_note_inline"
                    category="services"
                    label="ملحوظة سعر VIP"
                  />
                </span>
              ) : null}
            </div>
            {(contentMap[`${baseKey}_price_note`] ?? pkg.priceNote) ? (
              <div className={["text-xs mt-2", vip ? "text-primary/90" : "text-muted-foreground"].join(" ")}>
                <EditableText
                  value={contentMap[`${baseKey}_price_note`]}
                  fallback={pkg.priceNote}
                  fieldKey={`${baseKey}_price_note`}
                  category="services"
                  label={`ملاحظة السعر ${pkg.name}`}
                  multiline
                />
              </div>
            ) : null}
          </div>
        </div>

        {isPro ? (
          <div className="pro-note">
            <Check size={14} className="text-primary ml-2 flex-shrink-0" />
            <span className="pro-note-text">
              <EditableText
                value={contentMap.services_pro_note_text}
                fallback="MEDIA COVERAGE REELS & TIKTOK"
                fieldKey="services_pro_note_text"
                category="services"
                label="ملاحظة برو"
              />
            </span>
          </div>
        ) : null}

        {pkg.features.length && !isCustom ? (
          <ul className="space-y-3 mb-6 md:mb-7">
            {pkg.features.map((feature, i) => {
              const featureValue = contentMap[`${baseKey}_feature_${i + 1}`] ?? feature;
              const showProTag = isPro && featureValue.includes("تنظيم ريلز");
              const showMediaTag = featureValue.includes("MEDIA COVERAGE REELS");
              return (
                <li key={i} className="flex items-start text-sm">
                  <Check size={16} className="text-primary ml-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 leading-relaxed">
                    <EditableText
                      value={contentMap[`${baseKey}_feature_${i + 1}`]}
                      fallback={feature}
                      fieldKey={`${baseKey}_feature_${i + 1}`}
                      category="services"
                      label={`ميزة ${i + 1} - ${pkg.name}`}
                      multiline
                    />
                    {showProTag ? (
                      <span className="pro-note-tag">
                        <EditableText
                          value={contentMap.services_pro_tag}
                          fallback="مصور خاص"
                          fieldKey="services_pro_tag"
                          category="services"
                          label="وسم مصور خاص"
                        />
                      </span>
                    ) : null}
                    {showMediaTag ? (
                      <span className="pro-note-tag media-tag-glow">
                        <EditableText
                          value={contentMap.services_media_tag}
                          fallback="مصور خاص"
                          fieldKey="services_media_tag"
                          category="services"
                          label="وسم مصور خاص (إعلامي)"
                        />
                      </span>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/contact">
            <Button
              variant={weddingTone ? "default" : "outline"}
              className={[
                "w-full h-[56px] rounded-none cta-glow",
                weddingTone
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
              ].join(" ")}
            >
              <EditableText
                value={contentMap.services_primary_cta}
                fallback={ctaTexts.bookNow ?? "احجز الآن"}
                fieldKey="services_primary_cta"
                category="services"
                label="زر احجز الآن (الباقات)"
              />
            </Button>
          </Link>

          <Link href="/package-details">
            <Button
              variant="outline"
              className="w-full h-[56px] border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-none cta-glow"
            >
              <EditableText
                value={contentMap.services_secondary_cta}
                fallback="اسأل عن التفاصيل"
                fieldKey="services_secondary_cta"
                category="services"
                label="زر اسأل عن التفاصيل"
              />
              <ArrowLeft className="mr-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {vip && (
          <div className="mt-5 text-xs vip-note">
            <EditableText
              value={contentMap.services_vip_note}
              fallback="* تسعير VIP Plus بيتم تحديده حسب تفاصيل اليوم والمكان وعدد ساعات التغطية."
              fieldKey="services_vip_note"
              category="services"
              label="ملاحظة VIP"
              multiline
            />
          </div>
        )}
      </div>
    </div>
  );
}

function QuickNav({
  active,
  onJump,
  stuck,
  navRef,
  contentMap,
}: {
  active: string;
  onJump: (id: string) => void;
  stuck: boolean;
  navRef: React.Ref<HTMLDivElement>;
  contentMap: Record<string, string>;
}) {
  const items = [
    { id: "sessions", labelKey: "services_nav_sessions", fallback: "سيشن" },
    { id: "prints", labelKey: "services_nav_prints", fallback: "جلسات + مطبوعات" },
    { id: "wedding", labelKey: "services_nav_wedding", fallback: "Full Day" },
    { id: "addons", labelKey: "services_nav_addons", fallback: "إضافات" },
  ];

  return (
    <div
      className={["z-40 quicknav-float", stuck ? "quicknav-stuck" : ""].join(" ")}
      style={stuck ? { top: "calc(var(--nav-offset, 96px) - 6px)" } : undefined}
      ref={navRef}
    >
      <div className="container mx-auto px-4 py-2 sm:py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onJump(it.id)}
                className={[
                  "shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-semibold transition-all duration-200 rounded-full tap-target border quicknav-btn",
                  isActive ? "quicknav-btn--active" : "quicknav-btn--idle",
                ].join(" ")}
              >
                <EditableText
                  value={contentMap[it.labelKey]}
                  fallback={it.fallback}
                  fieldKey={it.labelKey}
                  category="services"
                  label={`عنوان التنقل ${it.fallback}`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { contactInfo } = useContactData();
  const content = useContentData();
  const {
    sessionPackages,
    sessionPackagesWithPrints,
    weddingPackages,
    additionalServices,
  } = usePackagesData();
  const contentMap = content.contentMap ?? {};
  const [activeSection, setActiveSection] = useState("sessions");
  const [isNavStuck, setIsNavStuck] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const navAnchorRef = useRef<HTMLDivElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);

  const ids = useMemo(() => ["sessions", "prints", "wedding", "addons"], []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = getSectionScrollMarginPx();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    setActiveSection(id);
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let raf = 0;

    const updateMetrics = () => {
      const navEl = navRef.current;
      if (navEl) setNavHeight(navEl.offsetHeight);
    };

    updateMetrics();

    const computeActiveByScroll = () => {
      const offset = getSectionScrollMarginPx() + 8;
      const y = window.scrollY + offset;

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        computeActiveByScroll();
        const navEl = navRef.current;
        const anchor = navAnchorRef.current;
        if (navEl && anchor) {
          const offset = getNavOffsetPx() - 2;
          const anchorTop = anchor.getBoundingClientRect().top;
          setIsNavStuck(anchorTop <= offset);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("resize", updateMetrics);
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", updateMetrics);
    };
  }, [ids]);

  const sectionStyle = useMemo(() => {
    return { scrollMarginTop: `${getSectionScrollMarginPx()}px` } as React.CSSProperties;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div
        className="border-y border-primary/20 bg-[linear-gradient(90deg,rgba(255,200,80,0.16),rgba(255,200,80,0.05),transparent)]"
        style={{ marginTop: "var(--nav-offset, 96px)" }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/90">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary">
              <Gift className="w-4 h-4" />
              <EditableText
                value={contentMap.services_promo_badge}
                fallback="هديّة"
                fieldKey="services_promo_badge"
                category="services"
                label="شارة العرض"
              />
            </span>
            <span>
              <EditableText
                value={contentMap.services_promo_text}
                fallback="عند الحجز اسأل عن هديتك"
                fieldKey="services_promo_text"
                category="services"
                label="نص العرض"
              />
            </span>
            <ArrowDown className="promo-arrow w-4 h-4 text-primary/70" />
          </div>
        </div>
      </div>

      <header className="pt-10 md:pt-12 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-background/35 to-background" />
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_20%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none hero-grain opacity-[0.10]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">
              <EditableText
                value={contentMap.services_kicker}
                fallback="باقات واضحة • ستايل فاخر • تسليم احترافي"
                fieldKey="services_kicker"
                category="services"
                label="عنوان صغير (الخدمات)"
              />
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <EditableText
              value={contentMap.services_title}
              fallback={pageTexts.services.title}
              fieldKey="services_title"
              category="services"
              label="عنوان صفحة الخدمات"
            />
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed services-subtitle-glow">
            <EditableText
              value={contentMap.services_subtitle}
              fallback={pageTexts.services.subtitle}
              fieldKey="services_subtitle"
              category="services"
              label="وصف صفحة الخدمات"
              multiline
            />
          </p>
          <div className="mt-4 mb-3 flex flex-col items-center gap-3">
            <div className="vip-highlight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Gem className="w-4 h-4 vip-highlight-icon" />
              <span>
                <EditableText
                  value={contentMap.services_vip_line_1}
                  fallback="- VIP بمجرد حجزك لليوم، مش بيتحجز لغيرك حتى لو سنة."
                  fieldKey="services_vip_line_1"
                  category="services"
                  label="سطر VIP 1"
                  multiline
                />
              </span>
            </div>
            <div className="vip-highlight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              <Receipt className="w-4 h-4 vip-highlight-icon" />
              <span>
                <EditableText
                  value={contentMap.services_vip_line_2}
                  fallback="بعد الحجز، تكون الأسعار نهائية كما في إيصال حجزك، بدون أي زيادات أو رسوم إضافية."
                  fieldKey="services_vip_line_2"
                  category="services"
                  label="سطر VIP 2"
                  multiline
                />
              </span>
            </div>
          </div>
        </div>
      </header>

      <div ref={navAnchorRef} className="h-px" aria-hidden="true" />
      {isNavStuck ? <div style={{ height: navHeight }} aria-hidden="true" /> : null}
      <QuickNav
        active={activeSection}
        onJump={jumpTo}
        stuck={isNavStuck}
        navRef={navRef}
        contentMap={contentMap}
      />

      <section id="sessions" className="pt-12 pb-16" style={sectionStyle}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title={
              <EditableText
                value={contentMap.services_sessions_title}
                fallback={pageTexts.services.sessionsTitle}
                fieldKey="services_sessions_title"
                category="services"
                label="عنوان قسم السيشن"
              />
            }
            subtitle={
              <EditableText
                value={contentMap.services_sessions_subtitle}
                fallback="اختيار موفق - نفس الجودة"
                fieldKey="services_sessions_subtitle"
                category="services"
                label="وصف قسم السيشن"
              />
            }
            subtitleClassName="section-subtitle-glow"
            icon={<Camera className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {sessionPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg as any}
                kind="session"
                whatsappNumber={contactInfo.whatsappNumber}
                contentMap={contentMap}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="prints" className="pt-12 pb-16" style={sectionStyle}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title={
              <EditableText
                value={contentMap.services_prints_title}
                fallback={pageTexts.services.sessionsWithPrintsTitle}
                fieldKey="services_prints_title"
                category="services"
                label="عنوان قسم المطبوعات"
              />
            }
            subtitle={
              <EditableText
                value={contentMap.services_prints_subtitle}
                fallback="للي بيحبوا المطبوعات الفاخرة والألبومات"
                fieldKey="services_prints_subtitle"
                category="services"
                label="وصف قسم المطبوعات"
              />
            }
            icon={<Receipt className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {sessionPackagesWithPrints.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg as any}
                kind="prints"
                whatsappNumber={contactInfo.whatsappNumber}
                contentMap={contentMap}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="wedding" className="pt-12 pb-16 bg-card border-y border-white/5" style={sectionStyle}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title={
              <EditableText
                value={contentMap.services_wedding_title}
                fallback={pageTexts.services.weddingTitle}
                fieldKey="services_wedding_title"
                category="services"
                label="عنوان قسم الزفاف"
              />
            }
            subtitle={
              <EditableText
                value={contentMap.services_wedding_subtitle}
                fallback="تغطية يوم كامل • فريق • تفاصيل • تسليم سريع"
                fieldKey="services_wedding_subtitle"
                category="services"
                label="وصف قسم الزفاف"
              />
            }
            icon={<Heart className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {weddingPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg as any}
                kind="wedding"
                whatsappNumber={contactInfo.whatsappNumber}
                contentMap={contentMap}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ✅ addons gets extra bottom padding to guarantee activation near end */}
      <section id="addons" className="pt-12 pb-24" style={sectionStyle}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title={
              <EditableText
                value={contentMap.services_addons_title}
                fallback={pageTexts.services.addonsTitle}
                fieldKey="services_addons_title"
                category="services"
                label="عنوان قسم الإضافات"
              />
            }
            subtitle={
              <EditableText
                value={contentMap.services_addons_subtitle}
                fallback="اختيارات إضافية تزود التجربة جمال"
                fieldKey="services_addons_subtitle"
                category="services"
                label="وصف قسم الإضافات"
              />
            }
            icon={<PlusCircle className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                className="relative bg-card p-7 md:p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 premium-border group overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(255,200,80,0.12),transparent_60%)]" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">
                      {service.emoji}{" "}
                      <EditableText
                        value={contentMap[`package_${service.id}_name`]}
                        fallback={service.name}
                        fieldKey={`package_${service.id}_name`}
                        category="services"
                        label={`اسم الإضافة ${service.name}`}
                      />
                    </h3>
                    <span className="text-primary font-bold">
                      <EditableText
                        value={contentMap[`package_${service.id}_price`]}
                        fallback={service.price}
                        fieldKey={`package_${service.id}_price`}
                        category="services"
                        label={`سعر الإضافة ${service.name}`}
                      />
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    <EditableText
                      value={contentMap[`package_${service.id}_description`]}
                      fallback={service.description}
                      fieldKey={`package_${service.id}_description`}
                      category="services"
                      label={`وصف الإضافة ${service.name}`}
                      multiline
                    />
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check size={14} className="text-primary ml-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">
                          <EditableText
                            value={contentMap[`package_${service.id}_feature_${i + 1}`]}
                            fallback={feature}
                            fieldKey={`package_${service.id}_feature_${i + 1}`}
                            category="services"
                            label={`ميزة الإضافة ${i + 1} - ${service.name}`}
                            multiline
                          />
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <PrimaryCTA
                      whatsappNumber={contactInfo.whatsappNumber}
                      label={
                        <EditableText
                          value={contentMap.services_primary_cta}
                          fallback={ctaTexts.bookNow ?? "احجز الآن"}
                          fieldKey="services_primary_cta"
                          category="services"
                          label="زر احجز الآن (الإضافات)"
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-muted-foreground mt-10 text-sm leading-relaxed space-y-2">
            <div>
              <EditableText
                value={contentMap.services_note_1}
                fallback="اطمئن التزامي في المواعيد وجودة التسليم جزء من شغلي، مش ميزة إضافية."
                fieldKey="services_note_1"
                category="services"
                label="ملاحظة الخدمات 1"
                multiline
              />
            </div>
            <div>
              <EditableText
                value={contentMap.services_note_2}
                fallback="* الأسعار قد تختلف حسب الموقع والتفاصيل الإضافية. غير شامل رسوم اللوكيشن."
                fieldKey="services_note_2"
                category="services"
                label="ملاحظة الخدمات 2"
                multiline
              />
            </div>
            <div>
              <EditableText
                value={contentMap.services_note_3}
                fallback="حجز اليوم بالأسبقية — Full Day لو اليوم محجوز لعريس تاني قبلك بنعتذر."
                fieldKey="services_note_3"
                category="services"
                label="ملاحظة الخدمات 3"
                multiline
              />
            </div>
            <div>
              <EditableText
                value={contentMap.services_note_4}
                fallback="الحجز يتم بتأكيد على واتساب + ديبوزيت تأكيد."
                fieldKey="services_note_4"
                category="services"
                label="ملاحظة الخدمات 4"
                multiline
              />
            </div>
            <div>
              <EditableText
                value={contentMap.services_note_5}
                fallback="الاستفسار فقط لا يعتبر حجزًا ويتم إلغاؤه تلقائيًا بدون تأكيد."
                fieldKey="services_note_5"
                category="services"
                label="ملاحظة الخدمات 5"
                multiline
              />
            </div>
            <div>
              <EditableText
                value={contentMap.services_note_6}
                fallback="أقدر أساعدك في أي شيء خارج التصوير يوم الزفاف (خدمات ونصائح مجانية)."
                fieldKey="services_note_6"
                category="services"
                label="ملاحظة الخدمات 6"
                multiline
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-grain {
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          mix-blend-mode: overlay;
        }

        .services-card::after {
          content: "";
          position: absolute;
          inset: -40% -10%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.28) 48%, transparent 72%);
          transform: translateX(-120%);
          animation: services-shine 6s ease-in-out infinite;
          opacity: 0.3;
          pointer-events: none;
        }

        .quicknav-float {
          background: transparent;
          border: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          box-shadow: none;
          overflow: visible;
          transform: translateY(0);
          transition: transform 240ms ease, box-shadow 240ms ease, background 240ms ease;
          will-change: transform;
          position: relative;
        }
        .quicknav-float::after {
          content: none;
        }
        .quicknav-stuck {
          position: fixed;
          left: 0;
          right: 0;
          background: transparent;
          border: none;
          box-shadow: none;
          transform: translateY(0);
          animation: nav-float 3.6s ease-in-out infinite;
        }
        .quicknav-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(140deg, rgba(255,210,120,0.1), rgba(10,10,14,0.65) 70%);
          border-color: rgba(255,210,120,0.35);
          color: rgba(255,235,200,0.9);
          box-shadow: inset 0 0 0 1px rgba(255,210,120,0.1);
        }
        .quicknav-btn::after {
          content: "";
          position: absolute;
          inset: -160% -20%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.5) 46%, transparent 72%);
          transform: translateX(-120%);
          animation: services-shine 6.2s ease-in-out infinite;
          opacity: 0.35;
          pointer-events: none;
        }
        .quicknav-btn:hover {
          border-color: rgba(255,210,120,0.65);
          color: #fff2dc;
          box-shadow: 0 0 18px rgba(255,210,130,0.25);
        }
        .quicknav-btn--active {
          background: linear-gradient(140deg, rgba(255,210,120,0.48), rgba(255,255,255,0.12) 70%);
          border-color: rgba(255,210,120,0.9);
          color: #fff7e4;
          text-shadow: 0 0 16px rgba(255,210,130,0.55);
          box-shadow: 0 0 32px rgba(255,210,130,0.65), 0 0 64px rgba(255,210,130,0.25);
        }
        .quicknav-btn--active::after {
          opacity: 0.9;
          animation-duration: 4.6s;
        }
        @keyframes nav-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        .services-subtitle-glow {
          color: rgba(255,245,220,0.9);
          text-shadow: 0 0 16px rgba(255,210,130,0.45);
        }
        .vip-highlight {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,210,120,0.4);
          background:
            linear-gradient(140deg, rgba(255,210,120,0.18), rgba(10,10,14,0.65) 65%),
            radial-gradient(circle at 20% 20%, rgba(255,245,210,0.25), transparent 60%);
          color: rgba(255,245,220,0.95);
          font-size: 13px;
          line-height: 1.6;
          text-shadow: 0 0 18px rgba(255,210,130,0.55);
          box-shadow: 0 12px 30px rgba(0,0,0,0.35), 0 0 22px rgba(255,210,130,0.18);
          overflow: hidden;
          isolation: isolate;
        }
        .vip-highlight::after {
          content: "";
          position: absolute;
          inset: -120% -10%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.6) 46%, transparent 70%);
          transform: translateX(-120%);
          animation: services-shine 5.5s ease-in-out infinite;
          opacity: 0.55;
          pointer-events: none;
        }
        .vip-highlight-icon {
          color: rgba(255,220,150,0.95);
          filter: drop-shadow(0 0 10px rgba(255,210,130,0.6));
        }
        .section-subtitle-glow {
          color: rgba(255,235,200,0.95);
          text-shadow: 0 0 14px rgba(255,210,130,0.45);
          letter-spacing: 0.08em;
        }
        .pro-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,210,120,0.6);
          background: linear-gradient(120deg, rgba(255,210,120,0.4), rgba(255,255,255,0.08));
          color: #fff4d5;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-shadow: 0 0 14px rgba(255,210,130,0.7);
          box-shadow: 0 10px 30px rgba(255,200,80,0.2);
        }
        .pro-note {
          margin-top: -8px;
          margin-bottom: 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,235,200,0.9);
          text-shadow: 0 0 14px rgba(255,210,130,0.45);
        }
        .pro-note-text {
          opacity: 0.9;
        }
        .pro-note-tag {
          display: inline-block;
          margin-right: 8px;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(255,240,205,0.9);
          text-shadow: 0 0 10px rgba(255,210,130,0.4);
        }
        .media-tag-glow {
          color: rgba(255,248,225,0.98);
          text-shadow: 0 0 12px rgba(255,210,130,0.7), 0 0 22px rgba(255,210,130,0.4);
        }
        .vip-note {
          color: rgba(255,235,200,0.95);
          text-shadow: 0 0 14px rgba(255,210,130,0.5);
        }
        .price-note-inline {
          margin-right: 8px;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,235,200,0.85);
          text-shadow: 0 0 10px rgba(255,210,130,0.35);
        }

        .custom-package {
          background:
            linear-gradient(145deg, rgba(18,18,24,0.9), rgba(8,8,12,0.98)),
            radial-gradient(circle at 20% 15%, rgba(255,210,120,0.12), transparent 55%);
          border-style: dashed;
          border-color: rgba(255,210,120,0.45);
          box-shadow: 0 22px 70px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,210,120,0.25);
          border-radius: 999px;
          aspect-ratio: 1 / 1;
          max-width: 380px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .custom-body {
          text-align: center;
          align-items: center;
        }
        @media (max-width: 640px) {
          .custom-package {
            aspect-ratio: auto;
            border-radius: 28px;
            max-width: 100%;
          }
          .services-card {
            padding: 24px;
          }
        }
        .custom-line {
          margin-top: 8px;
          padding: 10px 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,210,120,0.3);
          background: rgba(12,12,16,0.6);
          color: rgba(255,230,190,0.92);
          font-size: 13px;
          letter-spacing: 0.04em;
          line-height: 1.6;
          box-shadow: 0 10px 28px rgba(0,0,0,0.35);
        }

        .promo-arrow {
          filter: drop-shadow(0 0 10px rgba(255,200,80,0.35));
          animation: promo-float 2.8s ease-in-out infinite;
        }
        @keyframes promo-float {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50% { transform: translateY(4px); opacity: 0.9; }
        }
        @keyframes services-shine {
          0% { transform: translateX(-120%); }
          65% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }

      `}</style>

      <Footer />
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import {
  sessionPackages,
  sessionPackagesWithPrints,
  weddingPackages,
  additionalServices,
  pageTexts,
  ctaTexts,
  contactInfo,
} from "@/config/siteConfig";

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

function getNavOffsetPx() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-offset").trim();
  const n = parseInt(v.replace("px", ""), 10);
  return Number.isFinite(n) ? n : 96; // fallback
}

// scroll margin for sections = nav + quicknav height
function getSectionScrollMarginPx() {
  // quicknav تقريبًا 64-72
  return getNavOffsetPx() + 78;
}

function SectionHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-4">
        {icon}
        <span className="text-xs md:text-sm text-foreground/80">
          {subtitle ?? "تفاصيل واضحة • جودة ثابتة • ستايل فاخر"}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <div className="mt-5 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}

function PrimaryCTA() {
  return (
    <Link href="/contact">
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 text-lg rounded-none w-full sm:w-auto"
      >
        {ctaTexts.bookNow}
      </Button>
    </Link>
  );
}

function PackageCard({
  pkg,
  kind,
}: {
  pkg: Pkg;
  kind: "session" | "prints" | "wedding" | "addon";
}) {
  const isVipPlus = (p: any) => p?.id === "full-day-vip-plus" || p?.featured === true;
  const vip = kind === "wedding" && isVipPlus(pkg);
  const popular = !!pkg.popular;

  const Icon =
    kind === "wedding" ? (
      <Heart className="w-9 h-9 text-primary" />
    ) : kind === "prints" ? (
      <Receipt className="w-9 h-9 text-primary" />
    ) : kind === "addon" ? (
      <PlusCircle className="w-9 h-9 text-primary" />
    ) : (
      <Camera className="w-9 h-9 text-primary" />
    );

  return (
    <div
      className={[
        "relative overflow-hidden p-7 md:p-8 bg-card border transition-all duration-300 group premium-border",
        vip
          ? "border-primary/45 shadow-[0_0_70px_rgba(255,200,80,0.12)] hover:shadow-[0_0_95px_rgba(255,200,80,0.18)] hover:-translate-y-2"
          : popular
          ? "border-primary/25 shadow-lg shadow-primary/10 hover:-translate-y-2"
          : "border-white/10 hover:border-primary/35 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 pointer-events-none transition-opacity duration-300",
          vip || popular ? "opacity-40" : "opacity-0 group-hover:opacity-100",
          "bg-[radial-gradient(circle_at_30%_20%,rgba(255,200,80,0.14),transparent_60%)]",
        ].join(" ")}
      />

      {vip && (
        <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
          VIP PLUS ✨
        </div>
      )}

      {popular && !vip && (
        <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
          الأكثر طلباً
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-white/10 bg-black/15 backdrop-blur-md flex items-center justify-center">
              {Icon}
            </div>
            <div className="text-right">
              <h3 className={["text-xl md:text-2xl font-bold", vip ? "text-primary" : ""].join(" ")}>
                {pkg.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{pkg.description}</p>
            </div>
          </div>

          <div className="text-left">
            <div className="text-primary font-bold text-2xl md:text-3xl leading-none">{pkg.price}</div>
            {pkg.priceNote ? (
              <div className={["text-xs mt-2", vip ? "text-primary/90" : "text-muted-foreground"].join(" ")}>
                {pkg.priceNote}
              </div>
            ) : null}
          </div>
        </div>

        <ul className="space-y-3 mb-7">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm">
              <Check size={16} className="text-primary ml-2 mt-1 flex-shrink-0" />
              <span className="text-gray-300 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <PrimaryCTA />
          <Link href="/contact">
            <Button
              variant="outline"
              className="rounded-none border-white/15 text-foreground hover:bg-white hover:text-black px-10 py-7 w-full"
            >
              اسأل عن التفاصيل <ArrowLeft className="mr-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {vip && (
          <div className="mt-5 text-xs text-muted-foreground/80">
            * VIP Plus يتم تسعيره حسب تفاصيل اليوم والمكان وعدد ساعات التغطية.
          </div>
        )}
      </div>
    </div>
  );
}

function QuickNav({
  active,
  onJump,
}: {
  active: string;
  onJump: (id: string) => void;
}) {
  const items = [
    { id: "sessions", label: "جلسات" },
    { id: "prints", label: "جلسات + مطبوعات" },
    { id: "wedding", label: "زفاف" },
    { id: "addons", label: "إضافات" },
  ];

  return (
    <div
      className="sticky z-30 bg-background/75 backdrop-blur-md border-y border-white/10"
      style={{
        top: "var(--nav-offset, 96px)", // ✅ بدل رقم ثابت
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onJump(it.id)}
                className={[
                  "shrink-0 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full tap-target",
                  "border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-black/15 border-white/10 text-foreground/80 hover:border-primary/35 hover:text-primary",
                ].join(" ")}
              >
                {it.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileStickyBar({ show }: { show: boolean }) {
  const waHref = `https://wa.me/${contactInfo.whatsappNumber}`;

  return (
    <div
      className={[
        "fixed md:hidden left-0 right-0 z-50 transition-transform duration-300 will-change-transform",
        show ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      style={{ bottom: "calc(0px + env(safe-area-inset-bottom))" }}
    >
      <div className="border-t border-white/10 bg-background/85 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <Link href="/contact">
              <Button className="w-full h-12 rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                {ctaTexts.bookNow}
              </Button>
            </Link>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="w-full h-12 border border-white/15 bg-black/20 text-foreground hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center gap-2"
            >
              <span className="text-primary">
                <WhatsAppIcon size={18} />
              </span>
              واتساب
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeSection, setActiveSection] = useState("sessions");
  const [showSticky, setShowSticky] = useState(false);

  // ✅ Jump to section (top of section, not middle) with offset
  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = getSectionScrollMarginPx();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" });
  };

  // ✅ Active section + sticky bar
  useEffect(() => {
    const ids = ["sessions", "prints", "wedding", "addons"];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      {
        root: null,
        // ✅ حساب الـ nav + quicknav تقريباً
        rootMargin: `-${getSectionScrollMarginPx()}px 0px -55% 0px`,
        threshold: [0.12, 0.2, 0.3, 0.4],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setShowSticky(window.scrollY > 420);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const sectionStyle = useMemo(() => {
    return {
      scrollMarginTop: `${getSectionScrollMarginPx()}px`,
    } as React.CSSProperties;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <header className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-background/35 to-background" />
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_20%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none hero-grain opacity-[0.10]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">
              باقات واضحة • ستايل فاخر • تسليم احترافي
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {pageTexts.services.title}
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            {pageTexts.services.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <PrimaryCTA />
            <button
              onClick={() => jumpTo("wedding")}
              className="border border-white/15 text-foreground hover:bg-white hover:text-black transition-colors rounded-none px-10 py-4 font-semibold"
            >
              شوف باقات الزفاف
            </button>
          </div>
        </div>
      </header>

      {/* QuickNav */}
      <QuickNav active={activeSection} onJump={jumpTo} />

      {/* Sections */}
      <section id="sessions" className="py-16" style={sectionStyle}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title={pageTexts.services.sessionsTitle}
            subtitle="جلسات رايقة • إضاءة حلوة • تفاصيل متظبطة"
            icon={<Camera className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {sessionPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg as any} kind="session" />
            ))}
          </div>
        </div>
      </section>

      <section id="prints" className="py-16" style={sectionStyle}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title={pageTexts.services.sessionsWithPrintsTitle}
            subtitle="للي بيحبوا المطبوعات الفاخرة والألبومات"
            icon={<Receipt className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {sessionPackagesWithPrints.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg as any} kind="prints" />
            ))}
          </div>
        </div>
      </section>

      <section id="wedding" className="py-16 bg-card border-y border-white/5" style={sectionStyle}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title={pageTexts.services.weddingTitle}
            subtitle="تغطية يوم كامل • فريق • تفاصيل • تسليم سريع"
            icon={<Heart className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {weddingPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg as any} kind="wedding" />
            ))}
          </div>
        </div>
      </section>

      <section id="addons" className="py-16" style={sectionStyle}>
        <div className="container mx-auto px-4">
          <SectionHeader
            title={pageTexts.services.addonsTitle}
            subtitle="اختيارات إضافية تزود التجربة جمال"
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
                      {service.emoji} {service.name}
                    </h3>
                    <span className="text-primary font-bold">{service.price}</span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check size={14} className="text-primary ml-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <PrimaryCTA />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-10 text-sm">
            * الأسعار قد تختلف حسب الموقع والتفاصيل الإضافية. غير شامل رسوم اللوكيشن.
          </p>
        </div>
      </section>

      {/* ✅ Spacer to prevent bottom bar covering content */}
      <div className="md:hidden" style={{ height: "92px" }} />

      {/* Mobile Sticky Bottom Bar */}
      <MobileStickyBar show={showSticky} />

      <style>{`
        .hero-grain {
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          mix-blend-mode: overlay;
        }

        .premium-border { position: relative; }
        .premium-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255,255,255,0.06);
          pointer-events: none;
        }
        .premium-border::after {
          content: "";
          position: absolute;
          inset: -1px;
          border: 1px solid rgba(255,200,80,0.10);
          opacity: 0;
          transition: opacity 250ms ease;
          pointer-events: none;
        }
        .premium-border:hover::after { opacity: 1; }
      `}</style>

      <Footer />
    </div>
  );
}

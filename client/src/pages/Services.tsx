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
    <div className="text-center mb-12">
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
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 text-lg rounded-none"
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
  // ✅ Identify VIP Plus package
  const isVipPlus = (p: any) => p?.id === "full-day-vip-plus" || p?.featured === true;
  const vip = kind === "wedding" && isVipPlus(pkg);

  const popular = !!pkg.popular;

  const Icon =
    kind === "wedding" ? (
      <Heart className="w-10 h-10 text-primary" />
    ) : kind === "prints" ? (
      <Receipt className="w-10 h-10 text-primary" />
    ) : kind === "addon" ? (
      <PlusCircle className="w-10 h-10 text-primary" />
    ) : (
      <Camera className="w-10 h-10 text-primary" />
    );

  return (
    <div
      className={[
        "relative overflow-hidden p-8 bg-card border transition-all duration-300 group premium-border",
        vip
          ? "border-primary/45 shadow-[0_0_70px_rgba(255,200,80,0.12)] hover:shadow-[0_0_95px_rgba(255,200,80,0.18)] hover:-translate-y-2"
          : popular
          ? "border-primary/25 shadow-lg shadow-primary/10 hover:-translate-y-2"
          : "border-white/10 hover:border-primary/35 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
      ].join(" ")}
    >
      {/* glow layer */}
      <div
        className={[
          "absolute inset-0 pointer-events-none transition-opacity duration-300",
          vip || popular ? "opacity-40" : "opacity-0 group-hover:opacity-100",
          "bg-[radial-gradient(circle_at_30%_20%,rgba(255,200,80,0.14),transparent_60%)]",
        ].join(" ")}
      />

      {/* VIP shine */}
      {vip && (
        <>
          <div className="pointer-events-none absolute -inset-1 opacity-35 blur-2xl bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 animate-[shine_2.8s_linear_infinite]" />
          <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
            VIP PLUS ✨
          </div>
        </>
      )}

      {/* Popular badge */}
      {popular && !vip && (
        <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
          الأكثر طلباً
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 border border-white/10 bg-black/15 backdrop-blur-md flex items-center justify-center">
              {Icon}
            </div>
            <div className="text-right">
              <h3 className={["text-2xl font-bold", vip ? "text-primary" : ""].join(" ")}>
                {pkg.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{pkg.description}</p>
            </div>
          </div>

          <div className="text-left">
            <div className="text-primary font-bold text-3xl leading-none">{pkg.price}</div>
            {pkg.priceNote ? (
              <div className={["text-xs mt-2", vip ? "text-primary/90" : "text-muted-foreground"].join(" ")}>
                {pkg.priceNote}
              </div>
            ) : null}
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm">
              <Check size={16} className="text-primary ml-2 mt-1 flex-shrink-0" />
              <span className="text-gray-300 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <PrimaryCTA />
          <Link href="/contact">
            <Button
              variant="outline"
              className="rounded-none border-white/15 text-foreground hover:bg-white hover:text-black px-10 py-7"
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

function QuickNav() {
  const items = [
    { id: "sessions", label: "جلسات" },
    { id: "prints", label: "جلسات + مطبوعات" },
    { id: "wedding", label: "زفاف" },
    { id: "addons", label: "إضافات" },
  ];

  return (
    <div className="sticky top-[76px] z-30 border-y border-white/10 bg-background/70 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="shrink-0 px-4 py-2 text-sm border border-white/10 bg-black/15 hover:border-primary/35 hover:text-primary transition-colors"
          >
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <header className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/wedding-1.jpg')] bg-cover bg-center opacity-10" />
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

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {pageTexts.services.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {pageTexts.services.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <PrimaryCTA />
            <a href="#wedding" className="inline-block">
              <Button
                variant="outline"
                size="lg"
                className="border-white/15 text-foreground hover:bg-white hover:text-black rounded-none px-10 py-7"
              >
                شوف باقات الزفاف
              </Button>
            </a>
          </div>

          <div className="mt-10 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
        </div>
      </header>

      {/* Quick Nav */}
      <QuickNav />

      {/* Session Packages */}
      <section id="sessions" className="py-20 scroll-mt-32">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={pageTexts.services.sessionsTitle}
            subtitle="جلسات رايقة • إضاءة حلوة • تفاصيل متظبطة"
            icon={<Camera className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {sessionPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg as any} kind="session" />
            ))}
          </div>

          {/* Sessions With Prints */}
          <div id="prints" className="mt-24 scroll-mt-32">
            <SectionHeader
              title={pageTexts.services.sessionsWithPrintsTitle}
              subtitle="للي بيحبوا المطبوعات الفاخرة والألبومات"
              icon={<Receipt className="w-4 h-4 text-primary" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {sessionPackagesWithPrints.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg as any} kind="prints" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Packages */}
      <section id="wedding" className="py-20 bg-card border-y border-white/5 scroll-mt-32">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={pageTexts.services.weddingTitle}
            subtitle="تغطية يوم كامل • فريق • تفاصيل • تسليم سريع"
            icon={<Heart className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {weddingPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg as any} kind="wedding" />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="addons" className="py-20 scroll-mt-32">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={pageTexts.services.addonsTitle}
            subtitle="اختيارات إضافية تزود التجربة جمال"
            icon={<PlusCircle className="w-4 h-4 text-primary" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                className="relative bg-card p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 premium-border group overflow-hidden"
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

      {/* Final CTA */}
      <section className="py-20 text-center bg-primary/5 border-t border-white/5">
        <h2 className="text-3xl font-bold mb-6">هل لديك استفسار خاص؟</h2>
        <p className="text-muted-foreground mb-8">
          تواصل معي لمناقشة تفاصيل يومك وتصميم باقة تناسبك.
        </p>
        <PrimaryCTA />
      </section>

      {/* inline styles (safe) */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-60%); }
          100% { transform: translateX(60%); }
        }

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

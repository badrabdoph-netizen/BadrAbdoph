import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import {
  sessionPackages,
  sessionPackagesWithPrints,
  weddingPackages,
  additionalServices,
  pageTexts,
  ctaTexts,
} from "@/config/siteConfig";

export default function Services() {
  // ✅ Identify VIP Plus package (by id OR featured flag if you add it later)
  const isVipPlus = (pkg: any) =>
    pkg?.id === "full-day-vip-plus" || pkg?.featured === true;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <Navbar />

      {/* Header */}
      <header className="pt-40 pb-20 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/wedding-1.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {pageTexts.services.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {pageTexts.services.subtitle}
          </p>
        </div>
      </header>

      {/* Session Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {pageTexts.services.sessionsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {sessionPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-card border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  pkg.popular
                    ? "border-primary shadow-lg shadow-primary/10 scale-105 z-10"
                    : "border-white/10 hover:border-primary/50"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-full">
                    الأكثر طلباً
                  </div>
                )}

                <h3
                  className="text-2xl font-bold mb-2 text-center"
                  style={{ fontFamily: "'Amiri', serif" }}
                >
                  {pkg.name}
                </h3>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {pkg.price}
                  </span>
                </div>

                <p className="text-muted-foreground text-center mb-8 text-sm">
                  {pkg.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check
                        size={16}
                        className="text-primary ml-2 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center mt-auto">
                  <Link href="/contact">
                    <Button className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                      {ctaTexts.bookNow}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Sessions With Prints */}
          <div className="mt-24">
            <h2
              className="text-3xl font-bold text-center mb-12"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {pageTexts.services.sessionsWithPrintsTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {sessionPackagesWithPrints.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-card border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    pkg.popular
                      ? "border-primary shadow-lg shadow-primary/10 scale-105 z-10"
                      : "border-white/10 hover:border-primary/50"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-full">
                      الأكثر طلباً
                    </div>
                  )}

                  <h3
                    className="text-2xl font-bold mb-2 text-center"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    {pkg.name}
                  </h3>

                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-primary">
                      {pkg.price}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-center mb-8 text-sm">
                    {pkg.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check
                          size={16}
                          className="text-primary ml-2 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center mt-auto">
                    <Link href="/contact">
                      <Button className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                        {ctaTexts.bookNow}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Packages */}
      <section className="py-20 bg-card border-t border-white/5">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {pageTexts.services.weddingTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {weddingPackages.map((pkg) => {
              const vip = isVipPlus(pkg);

              return (
                <div
                  key={pkg.id}
                  className={`relative overflow-hidden p-6 border transition-all duration-300 ${
                    vip
                      ? "bg-background border-primary/50 ring-2 ring-primary/20 shadow-[0_0_60px_rgba(255,215,0,0.12)] hover:shadow-[0_0_90px_rgba(255,215,0,0.18)] hover:-translate-y-2"
                      : "bg-background border-white/5 hover:border-primary/30"
                  }`}
                >
                  {/* ✅ VIP Plus Glow layers */}
                  {vip && (
                    <>
                      <div className="pointer-events-none absolute -inset-1 opacity-40 blur-2xl bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 animate-[shine_2.8s_linear_infinite]" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
                        VIP PLUS ✨
                      </div>
                    </>
                  )}

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3
                        className={`text-xl font-bold ${
                          vip ? "text-primary" : ""
                        }`}
                        style={{ fontFamily: "'Amiri', serif" }}
                      >
                        {pkg.name}
                      </h3>

                      <span className="text-primary font-bold">{pkg.price}</span>
                    </div>

                    {pkg.priceNote && (
                      <p
                        className={`text-xs mb-2 ${
                          vip ? "text-primary/90" : "text-muted-foreground"
                        }`}
                      >
                        {pkg.priceNote}
                      </p>
                    )}

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <Check
                            size={14}
                            className="text-primary ml-2 mt-1 flex-shrink-0"
                          />
                          <span className="text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ✅ زر خاص بالـ VIP Plus */}
                    {vip && (
                      <div className="mt-2">
                        <Link href="/contact">
                          <Button className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                            احجز VIP Plus
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {pageTexts.services.addonsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                className="bg-card p-6 border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    {service.emoji} {service.name}
                  </h3>
                  <span className="text-primary font-bold">{service.price}</span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check
                        size={14}
                        className="text-primary ml-2 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            * الأسعار قد تختلف حسب الموقع والتفاصيل الإضافية. غير شامل رسوم
            اللوكيشن.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-primary/5">
        <h2
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          هل لديك استفسار خاص؟
        </h2>
        <p className="text-muted-foreground mb-8">
          تواصل معي لمناقشة تفاصيل يومك وتصميم باقة تناسبك.
        </p>
        <Link href="/contact">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg rounded-none"
          >
            تواصل معي
          </Button>
        </Link>
      </section>

      {/* ✅ Keyframes for VIP shine (safe inline) */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-60%); }
            100% { transform: translateX(60%); }
          }
        `}
      </style>

      <Footer />
    </div>
  );
}

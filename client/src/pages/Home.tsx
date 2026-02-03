import { useEffect, useMemo, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Heart, Star, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  photographerInfo,
  siteImages,
  aboutContent,
  testimonials,
  pageTexts,
  ctaTexts,
  homeHero,
  homeServicesPreview,
} from "@/config/siteConfig";

function ServiceIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  if (t.includes("زفاف") || t.includes("wedding")) return <Heart className="w-12 h-12 text-primary mb-6" />;
  if (t.includes("vip")) return <Sparkles className="w-12 h-12 text-primary mb-6" />;
  return <Camera className="w-12 h-12 text-primary mb-6" />;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // ✅ smoother parallax (no stutter)
  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!heroRef.current) return;
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const heroHeadline = useMemo(() => {
    const h = homeHero?.headlineAr;
    if (!h) return null;
    return (
      <>
        {h.line1Prefix} <span className="italic text-primary">{h.highlight}</span>
        <br />
        {h.line2}
      </>
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative z-10">
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center z-0 will-change-transform"
          style={{
            backgroundImage: `url('${siteImages.heroImage}')`,
            filter: "brightness(0.36)",
          }}
        />

        {/* cinematic gradient + subtle vignette */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-background/25 to-background" />
        <div className="absolute inset-0 z-10 pointer-events-none [background:radial-gradient(circle_at_50%_35%,rgba(255,200,80,0.10),transparent_55%)]" />

        {/* subtle grain */}
        <div className="absolute inset-0 z-10 pointer-events-none hero-grain opacity-[0.12]" />

        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          {/* Social proof / badge row */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm border border-white/10 bg-black/30 backdrop-blur-md">
              <Star className="w-4 h-4 text-primary" />
              تصوير زفاف • ستايل سينمائي فاخر
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm border border-white/10 bg-black/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary" />
              تركيز على التفاصيل والمشاعر
            </span>
          </div>

          <h2 className="text-primary text-lg md:text-xl tracking-[0.3em] uppercase mb-4 font-medium">
            {photographerInfo.title}
          </h2>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {heroHeadline ?? (
              <>
                مش مجرد <span className="italic text-primary">صور</span>
                <br />
                دي ذكريات متعاشة
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed">
            {homeHero?.subTextAr ?? photographerInfo.descriptionAr}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-none min-w-[180px]"
              >
                {homeHero?.primaryCta ?? ctaTexts.bookSession}
              </Button>
            </Link>

            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-none min-w-[180px]"
              >
                {homeHero?.secondaryCta ?? "عرض التفاصيل والاسعار"}
              </Button>
            </Link>
          </div>

          {/* micro divider */}
          <div className="mt-10 h-[1px] w-52 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent mx-auto" />
        </div>
      </header>

      {/* Services Preview */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none opacity-40 [background:radial-gradient(circle_at_15%_25%,rgba(255,200,80,0.10),transparent_55%)]" />

        <div className="container mx-auto px-4 relative z-10">
          {/* زر كبير فوق الباقات */}
          <div className="text-center mb-12">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-none min-w-[180px]"
              >
                {homeHero?.secondaryCta ?? "عرض التفاصيل والاسعار"}
              </Button>
            </Link>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">الخدمات</h3>
            <h2 className="text-4xl md:text-5xl font-bold">باقات التصوير</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              اختار الباقة المناسبة… وكلها بتتعمل بنفس الجودة والاهتمام بالتفاصيل.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeServicesPreview.map((card) => {
              const featured = !!card.featured;

              return (
                <div
                  key={card.id}
                  className={[
                    "relative overflow-hidden group transition-all duration-300",
                    "bg-card p-8 border",
                    featured
                      ? "border-primary/30 shadow-2xl shadow-black/50 md:-translate-y-4"
                      : "border-white/5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
                    "premium-border",
                  ].join(" ")}
                >
                  {/* glow */}
                  <div
                    className={[
                      "absolute inset-0 pointer-events-none transition-opacity duration-300",
                      featured ? "opacity-45" : "opacity-0 group-hover:opacity-100",
                      "bg-[radial-gradient(circle_at_30%_20%,rgba(255,200,80,0.14),transparent_55%)]",
                    ].join(" ")}
                  />

                  {/* badge */}
                  {card.badge ? (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1">
                      {card.badge}
                    </div>
                  ) : null}

                  <div className={featured ? "" : "group-hover:scale-110 transition-transform duration-300"}>
                    <ServiceIcon title={card.title} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{card.description}</p>

                  <ul className="text-sm text-muted-foreground space-y-2 mb-8">
                    {card.bullets.map((b, idx) => (
                      <li key={`${card.id}-b-${idx}`} className="flex items-center">
                        <Star size={14} className="ml-2 text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  <div className="flex items-center justify-between gap-4">
                    <Link href="/services">
                      <Button
                        variant={featured ? "default" : "outline"}
                        className={[
                          "rounded-none px-7",
                          featured
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                        ].join(" ")}
                      >
                        عرض التفاصيل
                      </Button>
                    </Link>

                    <span className="text-xs text-muted-foreground/70 hidden sm:inline">
                      * الأسعار والخيارات داخل صفحة الخدمات
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1 group overflow-hidden">
              <div className="absolute -top-4 -left-4 w-full h-full border border-primary/30 z-0 hidden md:block" />
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/15" />
              <div className="about-shine absolute inset-0 z-20 pointer-events-none opacity-45 md:opacity-0 md:group-hover:opacity-55 transition-opacity duration-500" />

              <img
                src={siteImages.aboutImage}
                alt="Badr Photography Style"
                className="
                  relative z-0 w-full h-[600px] object-cover
                  saturate-[1.35] contrast-[1.12] brightness-[1.05]
                  transition-transform duration-[1100ms] ease-out
                  scale-[1.06] md:scale-100
                  md:group-hover:scale-[1.12]
                  shadow-[0_30px_120px_rgba(0,0,0,0.65)]
                "
              />
            </div>

            <div className="order-1 md:order-2 text-right">
              <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">
                {aboutContent.subtitle}
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{aboutContent.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {aboutContent.description}
              </p>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
                {aboutContent.stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-card/40 border border-white/5 backdrop-blur-sm px-4 py-4 text-center premium-border"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{s.number}</div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <Link href="/about">
                <Button variant="link" className="text-primary p-0 text-lg hover:no-underline group">
                  {ctaTexts.readMore}{" "}
                  <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-card overflow-hidden">
        <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
          <div>
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">معرض الأعمال</h3>
            <h2 className="text-4xl md:text-5xl font-bold">لقطات مختارة</h2>
            <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
              سحب أفقي سريع… وإحساس Premium بالـ snap scrolling.
            </p>
          </div>

          <a
            href="https://badrabdoph.pixells.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <Button variant="outline" className="border-white/20 hover:bg-white hover:text-black rounded-none">
              عرض المعرض الكامل
            </Button>
          </a>
        </div>

        {/* ✅ snap scrolling for premium feel */}
        <div className="flex space-x-6 space-x-reverse overflow-x-auto snap-x snap-mandatory pb-8 px-4 md:px-0 scrollbar-hide">
          {siteImages.portfolioPreview.map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] md:min-w-[420px] h-[520px] relative group cursor-pointer overflow-hidden snap-center premium-border"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0 opacity-80" />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h4 className="text-2xl text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 mt-8 md:hidden text-center">
          <a
            href="https://badrabdoph.pixells.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full border-white/20 hover:bg-white hover:text-black rounded-none">
              عرض المعرض الكامل
            </Button>
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-6 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-primary blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">آراء العملاء</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-16">قصص سعيدة</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background/45 p-8 border border-white/5 backdrop-blur-sm hover:border-primary/25 transition-colors duration-300 premium-border"
              >
                <div className="text-primary text-4xl font-serif mb-4">"</div>
                <p className="text-lg text-muted-foreground mb-6 italic">{testimonial.quote}</p>
                <h4 className="font-bold text-foreground">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative flex items-center justify-center">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 fixed-bg"
          style={{
            backgroundImage: `url('${siteImages.heroImage2}')`,
            filter: "brightness(0.28)",
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/35" />
        <div className="absolute inset-0 z-10 pointer-events-none hero-grain opacity-[0.10]" />

        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">{pageTexts.home.ctaTitle}</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{pageTexts.home.ctaDescription}</p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-8 text-xl rounded-none min-w-[200px]"
            >
              {ctaTexts.contactNow}
            </Button>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes aboutShine {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          15% { opacity: 0.35; }
          40% { opacity: 0.6; }
          70% { opacity: 0.25; }
          100% { transform: translateX(140%) skewX(-18deg); opacity: 0; }
        }
        .about-shine {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.10) 35%,
            rgba(255,255,255,0.55) 50%,
            rgba(255,255,255,0.10) 65%,
            transparent 100%
          );
          transform: translateX(-140%) skewX(-18deg);
          animation: aboutShine 3.2s ease-in-out infinite;
          mix-blend-mode: overlay;
        }

        /* subtle grain overlay (very light) */
        .hero-grain {
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          mix-blend-mode: overlay;
        }

        /* premium border sheen */
        .premium-border {
          position: relative;
        }
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
        .premium-border:hover::after {
          opacity: 1;
        }
      `}</style>

      <Footer />
    </div>
  );
}

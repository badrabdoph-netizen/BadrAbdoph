import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Heart, Phone, Star, Sparkles, ZoomIn, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  photographerInfo,
  siteImages,
  aboutContent,
  testimonials,
  ctaTexts,
  homeHero,
  homeServicesPreview,
  externalPortfolioUrl,
  contactInfo,
} from "@/config/siteConfig";

function ServiceIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  if (t.includes("زفاف") || t.includes("wedding")) return <Heart className="w-12 h-12 text-primary mb-6" />;
  if (t.includes("vip")) return <Sparkles className="w-12 h-12 text-primary mb-6" />;
  return <Camera className="w-12 h-12 text-primary mb-6" />;
}

function StarsRow() {
  return (
    <div className="flex items-center gap-1 text-primary">
      <Star className="w-4 h-4" />
      <Star className="w-4 h-4" />
      <Star className="w-4 h-4" />
      <Star className="w-4 h-4" />
      <Star className="w-4 h-4" />
    </div>
  );
}

function buildWhatsAppHref(text: string) {
  const phone = (contactInfo.whatsappNumber ?? "").replace(/[^\d]/g, "");
  if (!phone) return "";
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

function MosaicCard({
  img,
  onClick,
  className,
  eager = false,
}: {
  img: { src: string; title: string };
  onClick: () => void;
  className?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      className={[
        "mosaic-card premium-border border border-white/10 overflow-hidden group",
        loaded ? "is-loaded" : "",
        className ?? "",
      ].join(" ")}
      onClick={onClick}
      aria-label="Open external portfolio"
      style={{
        backgroundImage: `url('${img.src}')`,
      }}
    >
      <img
        src={img.src}
        alt={img.title}
        decoding="async"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className="mosaic-img"
      />

      <div className="absolute inset-0 mosaic-overlay" />
      <div className="absolute inset-0 mosaic-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-2 left-2 right-2 text-[11px] text-white/90 line-clamp-1 text-center drop-shadow">
        {img.title}
      </div>
    </button>
  );
}

function MobileStickyBar({
  show,
  bookingHref,
}: {
  show: boolean;
  bookingHref: string;
}) {
  const telHref = `tel:${(contactInfo.phone ?? "").replace(/\s/g, "")}`;

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
            <a
              href={telHref}
              className="w-full h-12 border border-white/15 bg-black/20 text-foreground hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-primary" />
              اتصال
            </a>

            <a
              href={bookingHref}
              target="_blank"
              rel="noreferrer"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              {ctaTexts.bookSession}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLElement | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (heroRef.current) {
          const scrolled = window.scrollY;
          heroRef.current.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
        }
        setShowSticky(window.scrollY > 380);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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

  const gallery = useMemo(() => {
    return (siteImages.portfolioGallery ?? []) as Array<{ src: string; title: string; category?: string }>;
  }, []);

  const safeGallery = useMemo(() => {
    if (!gallery.length) return [];
    const min = 16;
    if (gallery.length >= min) return gallery;
    const times = Math.ceil(min / gallery.length);
    const out: typeof gallery = [];
    for (let i = 0; i < times; i++) out.push(...gallery);
    return out;
  }, [gallery]);

  const mobileGallery = useMemo(() => {
    if (!gallery.length) return [];
    if (gallery.length <= 7) return gallery;
    return gallery.slice(0, 7);
  }, [gallery]);

  const desktopGallery = useMemo(() => {
    if (!safeGallery.length) return [];
    return safeGallery.slice(0, 10);
  }, [safeGallery]);

  const desktopLayout = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
  ];

  const topTestimonials = useMemo(() => (testimonials ?? []).slice(0, 3), []);

  const goPortfolio = () => {
    window.location.href = externalPortfolioUrl;
  };

  const setSpot = (clientX: number, clientY: number) => {
    const el = portfolioRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    const y = ((clientY - r.top) / r.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  };

  const waBookingHref = useMemo(() => buildWhatsAppHref("عايز احجز اوردر ❤️"), []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative z-10">
      <Navbar />

      {/* HERO */}
      <header className="relative min-h-[86vh] md:h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center z-0 will-change-transform hero-image"
          style={{
            // @ts-ignore
            "--hero-image": `url('${siteImages.heroImage}')`,
            "--hero-image-mobile": `url('${siteImages.heroImageMobile ?? siteImages.heroImage}')`,
            filter: "brightness(0.36)",
          }}
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-background/25 to-background" />
        <div className="absolute inset-0 z-10 pointer-events-none [background:radial-gradient(circle_at_50%_35%,rgba(255,200,80,0.10),transparent_55%)]" />
        <div className="absolute inset-0 z-10 pointer-events-none hero-grain opacity-[0.12]" />

        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center animate-in fade-in zoom-in duration-1000">
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

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {heroHeadline ?? (
              <>
                مش مجرد <span className="italic text-primary">صور</span>
                <br />
                دي ذكريات متعاشة
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed">
            {homeHero?.subTextAr ?? photographerInfo.descriptionAr}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href={waBookingHref} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-none w-full sm:w-auto"
              >
                {homeHero?.primaryCta ?? ctaTexts.bookSession}
              </Button>
            </a>

            <Link href="/services#sessions">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-none w-full sm:w-auto"
              >
                {homeHero?.secondaryCta ?? "عرض التفاصيل والأسعار"}
              </Button>
            </Link>
          </div>

          <div className="mt-10 h-[1px] w-52 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        </div>
      </header>

      {/* SERVICES PREVIEW */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none opacity-40 [background:radial-gradient(circle_at_15%_25%,rgba(255,200,80,0.10),transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10">
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
                      : "border-white/10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
                    "premium-border",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute inset-0 pointer-events-none transition-opacity duration-300",
                      featured ? "opacity-45" : "opacity-0 group-hover:opacity-100",
                      "bg-[radial-gradient(circle_at_30%_20%,rgba(255,200,80,0.14),transparent_55%)]",
                    ].join(" ")}
                  />

                  {card.badge ? (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1">
                      {card.badge}
                    </div>
                  ) : null}

                  <div className={featured ? "" : "group-hover:scale-110 transition-transform duration-300"}>
                    <ServiceIcon title={card.title} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-muted-foreground mb-5 md:mb-6 leading-relaxed text-sm md:text-base line-clamp-3 md:line-clamp-none">
                    {card.description}
                  </p>

                  <ul className="text-sm text-muted-foreground space-y-2 mb-6 md:mb-8">
                    {card.bullets.map((b, idx) => (
                      <li
                        key={`${card.id}-b-${idx}`}
                        className={[
                          "items-center",
                          idx > 1 ? "hidden md:flex" : "flex",
                        ].join(" ")}
                      >
                        <Star size={14} className="ml-2 text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  <div className="flex items-center justify-between gap-4">
                    <Link href="/services#sessions">
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ✅ أعمالنا (Film-strip preview) */}
      <section
        ref={(el) => (portfolioRef.current = el)}
        className="py-20 relative overflow-hidden"
        onMouseMove={(e) => setSpot(e.clientX, e.clientY)}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) setSpot(t.clientX, t.clientY);
        }}
        style={{
          // @ts-ignore
          "--spot-x": "50%",
          "--spot-y": "35%",
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-45 [background:radial-gradient(circle_at_85%_25%,rgba(255,200,80,0.10),transparent_55%)]" />
        <div className="absolute inset-0 pointer-events-none spotlight-layer" />
        <div className="absolute inset-0 pointer-events-none film-frame" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center gap-3 mb-9">
            <h3 className="text-primary text-sm tracking-widest uppercase font-bold">أعمالنا</h3>
            <h2 className="text-3xl md:text-5xl font-bold">لمحات سريعة</h2>

            <a
              href={externalPortfolioUrl}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-4 inline-flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              بعض أعمالنا <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-20" />

            <div className="marquee">
              <div className="marquee__track marquee__track--left" aria-hidden="true">
                {loop1.map((img, i) => (
                  <FilmCard key={`r1-${img.src}-${i}`} img={img} idx={i} onClick={goPortfolio} />
                ))}
              </div>
            </div>

            <div className="marquee mt-3">
              <div className="marquee__track marquee__track--right" aria-hidden="true">
                {loop2.map((img, i) => (
                  <FilmCard key={`r2-${img.src}-${i}`} img={img} idx={i} onClick={goPortfolio} />
                ))}
              </div>
            </div>

            <div className="mt-7 flex justify-center">
              <a
                href={externalPortfolioUrl}
                className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-none px-10 py-4 inline-flex items-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                عرض المعرض كامل <ZoomIn className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1 group overflow-hidden">
              <div className="absolute -top-4 -left-4 w-full h-full border border-primary/30 z-0 hidden md:block" />
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/15" />

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
                loading="lazy"
              />
            </div>

            <div className="order-1 md:order-2 text-right">
              <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">
                {aboutContent.subtitle}
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{aboutContent.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{aboutContent.description}</p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
                {aboutContent.stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-card/40 border border-white/10 backdrop-blur-sm px-4 py-4 text-center premium-border"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{s.number}</div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <Link href="/about">
                <Button variant="link" className="text-primary p-0 text-lg hover:no-underline group">
                  {ctaTexts.readMore} <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 [background:radial-gradient(circle_at_20%_30%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">آراء العملاء</h3>
            <h2 className="text-3xl md:text-5xl font-bold">قصص سعيدة</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              أهم حاجة… الناس تطلع مبسوطة ومرتاحه من أول لحظة لحد التسليم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topTestimonials.map((t, i) => (
              <div
                key={i}
                className="bg-background/45 border border-white/10 p-7 premium-border hover:border-primary/25 transition-colors"
              >
                <StarsRow />
                <p className="text-muted-foreground italic leading-relaxed mt-4 mb-5">"{t.quote}"</p>
                <div className="font-bold">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_20%,rgba(255,200,80,0.12),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">جاهز نثبت يومك بصور تفضل معاك؟</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            ابعت التفاصيل بسرعة… وهنرتب كل حاجة بشكل مريح وواضح.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waBookingHref} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-7 text-lg w-full sm:w-auto">
                {ctaTexts.bookNow}
              </Button>
            </a>

            <Link href="/services#sessions">
              <Button
                variant="outline"
                className="border-white/15 text-foreground hover:bg-white hover:text-black rounded-none px-10 py-7 text-lg w-full sm:w-auto"
              >
                شوف الباقات
              </Button>
            </Link>
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

        .marquee { overflow: hidden; position: relative; width: 100%; }
        .marquee:hover .marquee__track { animation-play-state: paused; }

        .marquee__track {
          display: flex;
          gap: 12px;
          width: max-content;
          will-change: transform;
        }

        /* ✅ Smaller on mobile to show more frames */
        .marquee__item {
          position: relative;
          flex: 0 0 auto;
          width: min(52vw, 290px);
          aspect-ratio: 3 / 4;
          transition: transform 250ms ease;
          background-size: cover;
          background-position: center;
          background-color: rgba(255,255,255,0.02);
        }
        .marquee__item:hover { transform: translateY(-4px) scale(1.01); }

        @media (min-width: 640px) { .marquee__item { width: min(34vw, 320px); } }
        @media (min-width: 1024px) { .marquee__item { width: 230px; } }

        .marquee__track--left {
          animation: marqueeLeft linear infinite;
          animation-duration: calc(22s - var(--marquee-boost, 0s));
        }
        .marquee__track--right {
          animation: marqueeRight linear infinite;
          animation-duration: calc(26s - var(--marquee-boost, 0s));
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee__track--left,
          .marquee__track--right { animation: none !important; }
          .marquee { overflow-x: auto; }
        }

        @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

        .spotlight-layer {
          background: radial-gradient(
            circle at var(--spot-x, 50%) var(--spot-y, 35%),
            rgba(255,200,80,0.14),
            transparent 55%
          );
          opacity: 0.9;
        }

        .film-frame {
          background:
            linear-gradient(to bottom, rgba(255,255,255,0.08), transparent 18%),
            linear-gradient(to top, rgba(255,255,255,0.08), transparent 18%);
          opacity: 0.22;
          mix-blend-mode: overlay;
        }

        /* ✅ Film look */
        .film-card {
          border-radius: 14px;
          box-shadow: 0 30px 90px rgba(0,0,0,0.55);
        }

        /* perforations top/bottom */
        .film-card::before {
          content:"";
          position:absolute;
          left:0; right:0; top:0;
          height: 18px;
          background:
            repeating-linear-gradient(
              to right,
              rgba(0,0,0,0.85) 0px,
              rgba(0,0,0,0.85) 10px,
              rgba(255,255,255,0.08) 10px,
              rgba(255,255,255,0.08) 14px
            );
          opacity: .55;
          pointer-events:none;
        }
        .film-card::after {
          content:"";
          position:absolute;
          left:0; right:0; bottom:0;
          height: 18px;
          background:
            repeating-linear-gradient(
              to right,
              rgba(0,0,0,0.85) 0px,
              rgba(0,0,0,0.85) 10px,
              rgba(255,255,255,0.08) 10px,
              rgba(255,255,255,0.08) 14px
            );
          opacity: .55;
          pointer-events:none;
        }

        .film-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 240ms ease;
        }
        .film-card.is-loaded .film-img { opacity: 1; }

        .film-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.10), transparent);
          opacity: 0.9;
        }

        .glow-hover {
          background: radial-gradient(circle at 30% 20%, rgba(255,200,80,0.18), transparent 55%);
          mix-blend-mode: screen;
        }
      `}</style>

      <Footer />
    </div>
  );
}

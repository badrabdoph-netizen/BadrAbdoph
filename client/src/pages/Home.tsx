import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Check,
  Star,
  Sparkles,
  ZoomIn,
  Instagram,
  Facebook,
  ArrowDownRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  photographerInfo,
  siteImages,
  aboutContent,
  homeHero,
  homeServicesPreview,
  externalPortfolioUrl,
} from "@/config/siteConfig";
import { useContactData, useContentData, usePortfolioData, useTestimonialsData } from "@/hooks/useSiteData";

function ServiceIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  if (t.includes("زفاف") || t.includes("wedding")) return <CoupleIcon className="w-12 h-12 text-primary mb-6" />;
  if (t.includes("vip")) return <Sparkles className="w-12 h-12 text-primary mb-6" />;
  return <Camera className="w-12 h-12 text-primary mb-6" />;
}

function CoupleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 30c5 0 9-4 9-9s-4-9-9-9-9 4-9 9 4 9 9 9Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M44 30c5 0 9-4 9-9s-4-9-9-9-9 4-9 9 4 9 9 9Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M6 54c2-9 10-15 19-15s17 6 19 15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M22 54c2-8 9-13 16-13s14 5 16 13"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 18c0 4-3 7-7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 18c0 4 3 7 7 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
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

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center">
        <span className="camera-badge">📸</span>
      </div>
    </button>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLElement | null>(null);
  const { contactInfo, socialLinks } = useContactData();
  const content = useContentData();
  const testimonials = useTestimonialsData();
  const { gallery } = usePortfolioData();

  const waSocialHref = useMemo(() => {
    const phone = (contactInfo.whatsappNumber ?? "").replace(/[^\d]/g, "");
    return phone ? `https://wa.me/${phone}` : "";
  }, [contactInfo.whatsappNumber]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (heroRef.current) {
          const scrolled = window.scrollY;
          heroRef.current.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
        }
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
    if (content.heroTitle) {
      const lines = content.heroTitle.split("\n").filter(Boolean);
      if (!lines.length) return null;
      return (
        <>
          {lines.map((line, idx) => (
            <span key={`${line}-${idx}`}>
              {line}
              {idx < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </>
      );
    }
    const h = homeHero?.headlineAr;
    if (!h) return null;
    return (
      <>
        {h.line1Prefix} <span className="italic text-primary">{h.highlight}</span>
        <br />
        {h.line2}
      </>
    );
  }, [content.heroTitle]);

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
    if (gallery.length <= 8) return gallery;
    return gallery.slice(0, 8);
  }, [gallery]);

  const desktopGallery = useMemo(() => {
    if (!safeGallery.length) return [];
    return safeGallery.slice(0, 5);
  }, [safeGallery]);

  const collageLayout = [
    "gallery-hero",
    "gallery-tall",
    "gallery-wide",
    "gallery-stack",
    "gallery-stack-2",
  ];

  const topTestimonials = useMemo(() => (testimonials ?? []).slice(0, 3), [testimonials]);

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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative z-10">
      <Navbar />

      {/* HERO */}
      <header className="relative min-h-[82vh] md:h-screen w-full overflow-hidden flex items-center justify-center pt-[calc(var(--nav-offset,96px)+8px)]">
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

        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center -translate-y-1 md:-translate-y-6 animate-in fade-in zoom-in duration-1000">
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

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-6 font-light leading-relaxed">
            {content.heroDescription || homeHero?.subTextAr || photographerInfo.descriptionAr}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="hero-follow-title">تابعنا</div>
            <div className="hero-follow-icons">
              {socialLinks.instagram ? (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-btn hero-social--ig"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              ) : null}
              {socialLinks.facebook ? (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-btn hero-social--fb"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              ) : null}
              {socialLinks.tiktok ? (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-btn hero-social--tt"
                  aria-label="TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
              ) : null}
              {waSocialHref ? (
                <a
                  href={waSocialHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-btn hero-social--wa"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={20} />
                </a>
              ) : null}
            </div>
            <div className="hero-follow-glow" aria-hidden="true" />
          </div>
        </div>
      </header>

      {/* SERVICES PREVIEW */}
      <section className="pt-20 pb-12 relative">
        <div className="absolute inset-0 pointer-events-none opacity-40 [background:radial-gradient(circle_at_15%_25%,rgba(255,200,80,0.10),transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">الخدمات</h3>
            <h2 className="text-4xl md:text-5xl font-bold">باقات التصوير</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              كلها بتتعمل بنفس الجودة والاهتمام بالتفاصيل لأن التزامي في المواعيد وجودة التسليم جزء من شغلي، مش ميزة إضافية.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-12 py-5 text-lg cta-glow"
                >
                  شوف الباقات <ArrowDownRight className="w-4 h-4 cta-icon" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeServicesPreview.map((card, idx) => {
              const featured = !!card.featured;
              const tone = ["tone-amber", "tone-rose", "tone-emerald"][idx % 3];
              const titleIcon = [
                <Camera key="cam" size={15} />,
                <CoupleIcon key="couple" className="w-4 h-4" />,
                <Sparkles key="spark" size={15} />,
              ][idx % 3];
              const isSignature = card.id === "home-service-sessions";

              return (
                <div
                  key={card.id}
                  className={[
                    "relative overflow-hidden group transition-all duration-300 package-card flex flex-col",
                    "bg-card p-8 border rounded-2xl",
                    featured
                      ? "border-primary/30 shadow-2xl shadow-black/50 md:-translate-y-4"
                      : "border-white/10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
                    "premium-border",
                    tone,
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute inset-0 pointer-events-none transition-opacity duration-300 card-glow",
                      featured ? "opacity-45" : "opacity-0 group-hover:opacity-100",
                    ].join(" ")}
                  />

                  {card.badge ? (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1">
                      {card.badge}
                    </div>
                  ) : null}

                  {card.vipLabel ? <div className="vip-label">{card.vipLabel}</div> : null}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className={featured ? "" : "group-hover:scale-110 transition-transform duration-300"}>
                      <ServiceIcon title={card.title} />
                    </div>

                    <h3 className="card-title-chip">
                      <span className="title-icon">{titleIcon}</span>
                      <span>{card.title}</span>
                    </h3>

                    <div className="card-fade">
                      <p
                        className={[
                          "text-muted-foreground mb-3 leading-relaxed text-sm md:text-base",
                          isSignature ? "card-desc--glow" : "",
                        ].join(" ")}
                      >
                        {card.description}
                      </p>
                      {card.note ? <div className="card-note">{card.note}</div> : null}

                      <ul className="text-sm text-muted-foreground space-y-2 pb-2">
                        {card.bullets.map((b, bIdx) => (
                          <li key={`${card.id}-b-${bIdx}`} className="flex items-start">
                            <Check size={15} className="ml-2 mt-1 text-primary" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 mt-auto" />

                    <div className="flex items-center justify-between gap-4">
                      <Link href="/services">
                        <Button
                          variant={featured ? "default" : "outline"}
                          className={[
                            "rounded-none px-7 cta-glow",
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="pt-16 pb-10 md:pt-20 md:pb-14 relative">
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
              <h3 className="about-subtitle">
                {aboutContent.subtitle}
              </h3>
              <h2 className="about-name">
                {content.aboutTitle || aboutContent.title}
              </h2>
              <p className="about-text">
                {content.aboutDescription || aboutContent.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Story Gallery */}
      <section
        ref={(el) => (portfolioRef.current = el)}
        className="pt-2 pb-10 relative overflow-hidden"
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
        <div className="absolute inset-0 pointer-events-none gallery-frame" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="relative">
            <div className="md:hidden">
              <div className="gallery-rail">
                {mobileGallery.map((img, i) => (
                  <MosaicCard
                    key={`m-${img.src}-${i}`}
                    img={img}
                    onClick={goPortfolio}
                    eager={i < 2}
                    className="gallery-slide aspect-[4/5]"
                  />
                ))}
              </div>
              <div className="gallery-hint">اسحب لمشاهدة المزيد</div>

            </div>

            <div className="hidden md:block">
              <div className="gallery-collage">
                {desktopGallery.map((img, i) => (
                  <MosaicCard
                    key={`d-${img.src}-${i}`}
                    img={img}
                    onClick={goPortfolio}
                    eager={i < 2}
                    className={["gallery-card h-full", collageLayout[i] ?? ""].join(" ")}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="pt-4 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
            {aboutContent.stats.map((s) => (
              <div
                key={s.label}
                className="bg-card/40 border border-white/10 backdrop-blur-sm px-3 py-4 text-center premium-border"
              >
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">{s.number}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO CTA */}
      <section className="pt-6 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 [background:radial-gradient(circle_at_35%_25%,rgba(255,200,80,0.12),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">المعرض</h3>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">شوف جزء من تصويري بالكوالتي الكاملة</h2>

          <a
            href={externalPortfolioUrl}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-4 inline-flex items-center gap-2 cta-glow"
            target="_blank"
            rel="noreferrer"
          >
            عرض المعرض كامل <ZoomIn className="w-4 h-4" />
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.instagram ? (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="portfolio-social portfolio-social--ig"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            ) : null}
            {socialLinks.facebook ? (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="portfolio-social portfolio-social--fb"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            ) : null}
            {socialLinks.tiktok ? (
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="portfolio-social portfolio-social--tt"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
            ) : null}
            {waSocialHref ? (
              <a
                href={waSocialHref}
                target="_blank"
                rel="noreferrer"
                className="portfolio-social portfolio-social--wa"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 [background:radial-gradient(circle_at_20%_30%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">آراء العملاء</h3>
            <h2 className="text-3xl md:text-5xl font-bold">عرساني🫶</h2>
            <p className="testimonials-glow mt-4 max-w-2xl mx-auto leading-relaxed">
              أهم حاجة… الناس تطلع مبسوطة ومرتاحه من أول لحظة لحد التسليم ❤️
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Mohamed & Heba",
                quote:
                  "بجد احلي فوتوغرافر اتعاملنا معاه في خطوبتنا والصور مشاء الله طالعه احلي مما كنا عايزين كمان وانشاء الله مش اخر تعامل ♥️",
              },
              {
                name: "Basent & Abdo",
                quote:
                  "الصور احنا مش مصدقين حلاوتها بجد ولا الألوان خطيره اكيد مش اخر مره ما بينا انشاء الله ♥️",
              },
              {
                name: "Norhan & Hossam",
                quote:
                  "صور الفرح مشاء الله جميله اوي اوي عجبت كل صحابنا وأهلنا دا غير البرومو التحفه اللي اتعرض في الفرح كلو انبهر بيه ♥️",
              },
              {
                name: "Shahd",
                quote:
                  "سيشن عيد ميلادي كان خطير بجد متصورتش صور بالحلاوه دي قبل كد تسلم ايدك ❤️",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-background/45 border border-white/10 p-7 premium-border testimonial-card hover:border-primary/25 transition-colors"
              >
                <StarsRow />
                <p className="text-muted-foreground italic leading-relaxed mt-4 mb-5">"{t.quote}"</p>
                <div className="font-bold">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .hero-follow-title {
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          position: relative;
          padding-bottom: 10px;
        }
        .hero-follow-title::after {
          content: "";
          width: 54px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,200,80,0.8), transparent);
          display: block;
          margin: 10px auto 0;
          box-shadow: 0 0 12px rgba(255,200,80,0.35);
        }
        .hero-follow-icons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .hero-follow-glow {
          width: min(220px, 60vw);
          height: 18px;
          margin-top: 2px;
          background: radial-gradient(circle, rgba(255,210,130,0.45), transparent 70%);
          filter: blur(8px);
          opacity: 0.75;
          animation: glow-pulse 4.2s ease-in-out infinite;
        }
        .hero-social-btn {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(9,9,12,0.55);
          color: #f6ddb0;
          box-shadow: 0 18px 45px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.05);
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease, background 200ms ease;
          position: relative;
          overflow: hidden;
        }
        .hero-social-btn::before {
          content: "";
          position: absolute;
          inset: -35% -25%;
          background: radial-gradient(circle, rgba(255,220,160,0.35), transparent 65%);
          opacity: 0.35;
          pointer-events: none;
        }
        .hero-social-btn::after {
          content: "";
          position: absolute;
          inset: -40% -10%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.55) 48%, transparent 70%);
          transform: translateX(-120%);
          animation: social-shine 4.8s ease-in-out infinite;
          opacity: 0.35;
          pointer-events: none;
        }
        .hero-social-btn:hover {
          transform: translateY(-3px) scale(1.03);
          border-color: rgba(255,200,80,0.45);
          box-shadow: 0 22px 60px rgba(0,0,0,0.6), 0 0 22px rgba(255,200,80,0.22);
        }
        .hero-social--ig,
        .hero-social--fb,
        .hero-social--tt,
        .hero-social--wa {
          background: radial-gradient(circle at 30% 20%, rgba(255,210,120,0.18), rgba(10,10,14,0.9));
          color: #f7e4bf;
          border-color: rgba(255,210,120,0.35);
        }
        @media (max-width: 640px) {
          .hero-social-btn {
            width: 52px;
            height: 52px;
            border-radius: 16px;
          }
        }

        .cta-glow {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 0 0 1px rgba(255, 200, 80, 0.18) inset, 0 20px 60px rgba(255, 200, 80, 0.12);
        }
        .cta-glow::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255, 220, 150, 0.18), transparent 60%);
          opacity: 0.8;
          pointer-events: none;
        }
        .cta-glow::after {
          content: "";
          position: absolute;
          inset: -120% -10%;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.55) 45%, transparent 70%);
          transform: translateX(-120%);
          animation: cta-shine 3.6s ease-in-out infinite;
          pointer-events: none;
          opacity: 0.7;
        }
        .cta-glow:hover {
          box-shadow: 0 0 0 1px rgba(255, 200, 80, 0.35) inset, 0 24px 80px rgba(255, 200, 80, 0.2);
        }
        .cta-icon {
          margin-left: 8px;
          filter: drop-shadow(0 0 10px rgba(255,210,130,0.55));
          animation: cta-icon-pulse 2.6s ease-in-out infinite;
        }

        .hero-image { background-image: var(--hero-image); }
        @media (max-width: 640px) {
          .hero-image { background-image: var(--hero-image-mobile); }
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

        .package-card {
          background:
            linear-gradient(150deg, rgba(22,22,30,0.96), rgba(8,8,12,0.98)),
            radial-gradient(circle at 20% 15%, rgba(255,245,220,0.10), transparent 55%);
          box-shadow: 0 28px 90px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,220,170,0.2) inset;
          border-color: rgba(255,225,190,0.2);
          backdrop-filter: blur(18px) saturate(130%);
          -webkit-backdrop-filter: blur(18px) saturate(130%);
        }
        .package-card .card-glow {
          animation: glow-drift 6s ease-in-out infinite;
        }

        .card-title-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,225,190,0.35);
          background: rgba(12,12,16,0.6);
          color: #fff2d6;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.4), inset 0 0 18px rgba(255,230,190,0.15);
          position: relative;
          overflow: hidden;
        }
        .card-title-chip::after {
          content: "";
          position: absolute;
          inset: -40% -10%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 72%);
          transform: translateX(-120%);
          animation: social-shine 6s ease-in-out infinite;
          opacity: 0.35;
          pointer-events: none;
        }
        .title-icon {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,225,190,0.4);
          background: rgba(255,225,190,0.12);
          color: #fff3d6;
          box-shadow: inset 0 0 14px rgba(255,225,190,0.2);
        }
        .card-desc--glow {
          color: rgba(255,245,220,0.92);
          text-shadow: 0 0 14px rgba(255,220,170,0.35);
          font-weight: 600;
        }
        .card-note {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,235,200,0.85);
          text-shadow: 0 0 12px rgba(255,220,170,0.35);
          margin-bottom: 12px;
        }

        .about-subtitle {
          display: inline-block;
          font-size: 12px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(255,210,120,0.9);
          position: relative;
          margin-bottom: 12px;
        }
        .about-subtitle::after {
          content: "";
          display: block;
          width: 60px;
          height: 2px;
          margin-top: 10px;
          background: linear-gradient(90deg, transparent, rgba(255,210,120,0.8), transparent);
          box-shadow: 0 0 12px rgba(255,200,80,0.4);
        }
        .about-name {
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 700;
          margin-bottom: 14px;
          font-family: "Playfair Display", serif;
          background: linear-gradient(120deg, #fff, #f7e0b5, #fff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 10px 30px rgba(255,210,120,0.12);
        }
        .about-text {
          color: rgba(255,255,255,0.72);
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.9;
          margin-bottom: 8px;
          font-family: "Cairo", sans-serif;
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(12,12,16,0.55);
          color: rgba(255,255,255,0.8);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 12px 30px rgba(0,0,0,0.35);
        }

        .card-glow {
          background: radial-gradient(circle at 30% 20%, var(--tone, rgba(255,200,80,0.18)), transparent 55%);
        }
        .tone-amber { --tone: rgba(255,200,80,0.18); }
        .tone-rose { --tone: rgba(255,140,170,0.18); }
        .tone-emerald { --tone: rgba(110,240,200,0.16); }

        .card-fade {
          position: relative;
          max-height: 280px;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0));
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0));
        }
        @media (min-width: 768px) {
          .card-fade { max-height: 300px; }
        }

        .vip-label {
          position: absolute;
          top: 14px;
          left: 18px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,210,120,0.5);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          background: linear-gradient(120deg, rgba(255,210,120,0.55), rgba(255,255,255,0.12));
          color: #fff5d6;
          text-shadow: 0 0 20px rgba(255,210,130,0.8);
          animation: vip-shine 2.8s ease-in-out infinite;
          pointer-events: none;
          box-shadow: 0 18px 50px rgba(255,200,80,0.25);
        }

        .camera-badge {
          font-size: 16px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(0,0,0,0.45);
          box-shadow: 0 8px 20px rgba(0,0,0,0.35);
        }

        .spotlight-layer {
          background: radial-gradient(
            circle at var(--spot-x, 50%) var(--spot-y, 35%),
            rgba(255,200,80,0.14),
            transparent 55%
          );
          opacity: 0.9;
        }

        .gallery-frame {
          background:
            radial-gradient(circle at 20% 20%, rgba(255,200,80,0.12), transparent 45%),
            repeating-linear-gradient(
              135deg,
              rgba(255,255,255,0.05) 0 2px,
              transparent 2px 14px
            );
          opacity: 0.32;
          mix-blend-mode: screen;
        }

        .gallery-rail {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(72%, 1fr);
          gap: 14px;
          overflow-x: auto;
          padding: 6px 2px 10px;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }
        .gallery-rail::-webkit-scrollbar { display: none; }
        .gallery-slide { scroll-snap-align: center; }
        .gallery-rail .mosaic-card {
          animation: rail-float 6.2s ease-in-out infinite;
        }
        .gallery-rail .mosaic-card:nth-child(2n) {
          animation-delay: -1.6s;
        }
        .gallery-rail .mosaic-card::after {
          content: "";
          position: absolute;
          inset: -35%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.28) 45%, transparent 70%);
          transform: translateX(-120%);
          animation: rail-shine 3.8s ease-in-out infinite;
          mix-blend-mode: screen;
          opacity: 0.7;
          pointer-events: none;
        }
        .gallery-hint {
          text-align: center;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.55);
          margin-top: 10px;
        }

        .gallery-collage {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-auto-rows: 34px;
          gap: 14px;
        }
        @media (min-width: 1024px) {
          .gallery-collage { grid-auto-rows: 38px; }
        }

        .gallery-hero { grid-column: 1 / span 7; grid-row: 1 / span 12; }
        .gallery-tall { grid-column: 8 / span 5; grid-row: 1 / span 9; }
        .gallery-wide { grid-column: 1 / span 6; grid-row: 13 / span 7; }
        .gallery-stack { grid-column: 7 / span 6; grid-row: 10 / span 6; }
        .gallery-stack-2 { grid-column: 7 / span 6; grid-row: 16 / span 5; }

        .gallery-card {
          border-radius: 26px;
          box-shadow: 0 28px 90px rgba(0,0,0,0.48);
          background: rgba(10,10,10,0.55);
          --tilt: 0deg;
        }
        .gallery-card::before {
          content:"";
          position:absolute;
          inset: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          pointer-events:none;
        }
        .gallery-card::after {
          content:"";
          position:absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.10), transparent 40%);
          opacity: 0.45;
          pointer-events:none;
        }
        .gallery-collage .gallery-card:nth-child(2) { --tilt: 0.6deg; }
        .gallery-collage .gallery-card:nth-child(3) { --tilt: -0.5deg; }
        .gallery-collage .gallery-card:nth-child(4) { --tilt: 0.4deg; }
        .gallery-collage .gallery-card:nth-child(5) { --tilt: -0.3deg; }

        .mosaic-card {
          position: relative;
          width: 100%;
          border-radius: 18px;
          background-size: cover;
          background-position: center;
          background-color: rgba(255,255,255,0.02);
          box-shadow: 0 22px 70px rgba(0,0,0,0.45);
          transition: transform 240ms ease;
          transform: rotate(var(--tilt, 0deg));
        }
        .mosaic-card:hover { transform: translateY(-3px) scale(1.01) rotate(var(--tilt, 0deg)); }
        .mosaic-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .gallery-rail .mosaic-img {
          transform: scale(1.03);
          transition: opacity 220ms ease, transform 800ms ease, filter 800ms ease;
          filter: saturate(1.08) contrast(1.04);
        }
        .mosaic-card.is-loaded .mosaic-img { opacity: 1; }
        .mosaic-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.05), transparent);
          opacity: 0.95;
        }
        .mosaic-glow {
          background: radial-gradient(circle at 30% 20%, rgba(255,200,80,0.22), transparent 60%);
          mix-blend-mode: screen;
        }

        .gallery-collage .gallery-card {
          border-radius: 26px;
          box-shadow: 0 28px 90px rgba(0,0,0,0.48);
        }

        .portfolio-social {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(12,12,16,0.5);
          color: rgba(255,255,255,0.8);
          box-shadow: 0 12px 35px rgba(0,0,0,0.45);
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
          position: relative;
          overflow: hidden;
        }
        .portfolio-social::after {
          content: "";
          position: absolute;
          inset: -40% -10%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 72%);
          transform: translateX(-120%);
          animation: social-shine 5.2s ease-in-out infinite;
          opacity: 0.35;
          pointer-events: none;
        }
        .portfolio-social:hover {
          transform: translateY(-2px) scale(1.03);
          border-color: rgba(255,200,80,0.4);
          box-shadow: 0 18px 50px rgba(0,0,0,0.55), 0 0 20px rgba(255,200,80,0.15);
        }
        .portfolio-social--ig,
        .portfolio-social--fb,
        .portfolio-social--tt,
        .portfolio-social--wa { color: #f7e4bf; border-color: rgba(255,210,120,0.35); }

        .testimonials-glow {
          color: rgba(255,255,255,0.85);
          text-shadow: 0 0 14px rgba(255,210,130,0.45), 0 0 30px rgba(255,210,130,0.25);
        }
        .testimonial-card {
          position: relative;
          background:
            linear-gradient(160deg, rgba(18,18,26,0.85), rgba(8,8,12,0.96));
          border-color: rgba(255,210,120,0.2);
          box-shadow: 0 22px 70px rgba(0,0,0,0.5);
          overflow: hidden;
          backdrop-filter: blur(14px) saturate(120%);
          -webkit-backdrop-filter: blur(14px) saturate(120%);
        }
        .testimonial-card::after {
          content: "";
          position: absolute;
          inset: -40% -10%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 48%, transparent 70%);
          transform: translateX(-120%);
          animation: social-shine 6s ease-in-out infinite;
          opacity: 0.25;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .portfolio-social {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }
        }

        @keyframes rail-float {
          0%, 100% { transform: translateY(0) scale(1) rotate(var(--tilt, 0deg)); }
          50% { transform: translateY(-4px) scale(1.02) rotate(var(--tilt, 0deg)); }
        }
        @keyframes rail-shine {
          0% { transform: translateX(-120%); }
          60% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }

        @keyframes cta-shine {
          0% { transform: translateX(-120%); }
          60% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes cta-icon-pulse {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(2px); opacity: 1; }
        }

        @keyframes social-shine {
          0% { transform: translateX(-120%); }
          70% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes vip-shine {
          0%, 100% { opacity: 0.8; text-shadow: 0 0 18px rgba(255,210,130,0.45); }
          50% { opacity: 1; text-shadow: 0 0 28px rgba(255,220,150,0.8); }
        }
        @keyframes glow-drift {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-8px); opacity: 0.6; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes float-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @media (max-width: 768px) {
          .package-card { animation: float-soft 7s ease-in-out infinite; }
          .package-card:nth-child(2) { animation-delay: -1.8s; }
          .package-card:nth-child(3) { animation-delay: -3.6s; }
          .testimonial-card { animation: float-soft 8s ease-in-out infinite; }
          .testimonial-card:nth-child(2) { animation-delay: -2s; }
          .testimonial-card:nth-child(3) { animation-delay: -4s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .package-card,
          .testimonial-card,
          .hero-follow-glow,
          .card-glow,
          .hero-social-btn::after,
          .portfolio-social::after { animation: none !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}

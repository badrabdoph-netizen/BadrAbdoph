import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles, Heart, Star, ArrowLeft } from "lucide-react";
import { aboutContent, photographerInfo, siteImages, testimonials, ctaTexts, externalPortfolioUrl, contactInfo } from "@/config/siteConfig";
import SmartImage from "@/components/SmartImage";

function buildWhatsAppHref(text: string) {
  const phone = (contactInfo.whatsappNumber ?? "").replace(/[^\d]/g, "");
  if (!phone) return "";
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

export default function About() {
  const aboutImg = siteImages.aboutImage ?? siteImages.heroImage;

  const waBookingHref = buildWhatsAppHref("عايز احجز اوردر ❤️");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <header className="pt-32 pb-10 bg-card relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${aboutImg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-background/40 to-background" />
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_15%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none hero-grain opacity-[0.10]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">
              ستايل سينمائي • تفاصيل • تسليم احترافي
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {aboutContent.title ?? "عن بدر"}
          </h1>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            {aboutContent.description ?? photographerInfo.descriptionAr ?? "تصوير يركز على اللحظة… ويطلعها بأفضل شكل."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href={waBookingHref} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-7 text-lg w-full sm:w-auto">
                {ctaTexts.bookNow ?? "احجز الآن"}
              </Button>
            </a>

            <Link href="/services#sessions">
              <Button
                variant="outline"
                className="border-white/15 text-foreground hover:bg-white hover:text-black rounded-none px-10 py-7 text-lg w-full sm:w-auto"
              >
                الأسعار والباقات
              </Button>
            </Link>
          </div>

          <div className="mt-10 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
        </div>
      </header>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-1 lg:order-2 relative overflow-hidden premium-border">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/10 z-10" />

              <SmartImage
                src={aboutImg}
                alt="About"
                className="w-full h-[520px] md:h-[620px] object-cover shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="order-2 lg:order-1 text-right">
              <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">
                {aboutContent.subtitle ?? "الستايل"}
              </h3>

              <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
                تصوير يحافظ على الإحساس… قبل الشكل
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
                {aboutContent.description ??
                  "بحب أصوّر اللحظات الطبيعية من غير مبالغة… مع اهتمام بالتفاصيل والإضاءة واللون. الهدف إن الصور تحسّها حقيقية وفخمة في نفس الوقت."}
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {(aboutContent.stats ?? []).map((s) => (
                  <div
                    key={s.label}
                    className="bg-card/40 border border-white/10 backdrop-blur-sm px-3 py-4 text-center premium-border"
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{s.number}</div>
                    <div className="text-[11px] sm:text-sm text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a href={externalPortfolioUrl} target="_blank" rel="noreferrer">
                  <Button variant="link" className="text-primary p-0 text-lg hover:no-underline group">
                    شوف المعرض{" "}
                    <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 [background:radial-gradient(circle_at_15%_25%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">ليه تختارني؟</h3>
            <h2 className="text-3xl md:text-5xl font-bold">تفاصيل بتفرق</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              نفس الجودة… في كل باقة. ونفس الاهتمام… في كل لقطة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background/45 border border-white/10 p-7 premium-border group hover:border-primary/25 transition-colors">
              <Camera className="w-10 h-10 text-primary mb-5" />
              <h3 className="text-xl font-bold mb-3">إضاءة وستايل سينمائي</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                ألوان متزنة، Skin tones طبيعية، ولمسة فخمة من غير مبالغة.
              </p>
            </div>

            <div className="bg-background/45 border border-white/10 p-7 premium-border group hover:border-primary/25 transition-colors">
              <Heart className="w-10 h-10 text-primary mb-5" />
              <h3 className="text-xl font-bold mb-3">لقطات إحساس مش “بوزات”</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                توجيه بسيط… ولقطات طبيعية حقيقية، عشان اليوم يفضل حي في الصور.
              </p>
            </div>

            <div className="bg-background/45 border border-white/10 p-7 premium-border group hover:border-primary/25 transition-colors">
              <Sparkles className="w-10 h-10 text-primary mb-5" />
              <h3 className="text-xl font-bold mb-3">تفاصيل وتسليم مرتب</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                تنظيم قبل التصوير، اختيار أفضل لقطات، وتسليم بجودة عالية.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">آراء العملاء</h3>
            <h2 className="text-3xl md:text-5xl font-bold">قصص سعيدة</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.slice(0, 2).map((t, i) => (
              <div
                key={i}
                className="bg-card/40 border border-white/10 p-7 premium-border hover:border-primary/25 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                </div>
                <p className="text-muted-foreground italic leading-relaxed mb-5">"{t.quote}"</p>
                <div className="font-bold">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5 border-t border-white/5 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">جاهز نثبت يومك بصور تفضل معاك؟</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            ابعت التفاصيل بسرعة… وهنرتب كل حاجة بشكل مريح وواضح.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waBookingHref} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-7 text-lg w-full sm:w-auto">
                {ctaTexts.contactNow ?? "تواصل الآن"}
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
      `}</style>

      <Footer />
    </div>
  );
}

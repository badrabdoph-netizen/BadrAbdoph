import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Camera, Heart, Film } from "lucide-react";
import { photographerInfo, aboutContent, siteImages, ctaTexts } from "@/config/siteConfig";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <header className="pt-40 pb-20 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 transform translate-x-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ fontFamily: "'Amiri', serif" }}>
            {aboutContent.subtitle}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            أكثر من مجرد مصور، أنا راوي قصص بصرية يبحث عن الجمال في التفاصيل الصغيرة.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* ✅ الصورة (ألوان دايمًا + تأثير قوي على الموبايل) */}
            <div className="relative group overflow-hidden">
              <div className="absolute inset-0 border-2 border-primary transform translate-x-4 translate-y-4 hidden md:block"></div>

              {/* Vignette depth */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/10" />

              {/* Shine متحرك (يشتغل دايمًا على الموبايل، ويزيد على الديسكتوب مع hover) */}
              <div className="about-shine absolute inset-0 z-20 pointer-events-none opacity-45 md:opacity-0 md:group-hover:opacity-55 transition-opacity duration-500" />

              <img
                src={siteImages.aboutImage}
                alt="Badr Photography"
                style={{ filter: "none" }} // ✅ يكسر أي grayscale مفروض من CSS عام
                className="
                  w-full h-[600px] object-cover relative z-0
                  grayscale-0 filter-none
                  saturate-[1.35] contrast-[1.12] brightness-[1.05]
                  transition-transform duration-[1100ms] ease-out
                  scale-[1.06] md:scale-100
                  md:group-hover:scale-[1.12]
                  shadow-[0_30px_120px_rgba(0,0,0,0.65)]
                "
              />
            </div>

            <div className="space-y-8 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "'Amiri', serif" }}>
                {photographerInfo.name}
              </h2>
              <h3 className="text-xl text-muted-foreground">{photographerInfo.title}</h3>

              <div className="prose prose-invert prose-lg max-w-none">
                {aboutContent.fullStory.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="border-r-4 border-primary pr-4 italic text-muted-foreground">
                {aboutContent.philosophy}
              </blockquote>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                {aboutContent.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <span className="text-2xl font-bold text-primary block">{stat.number}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ fontFamily: "'Amiri', serif" }}>
            لماذا تختارني؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 border border-white/5 hover:border-primary/50 transition-colors duration-300">
              <Film className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4 text-primary" style={{ fontFamily: "'Amiri', serif" }}>
                أسلوب سينمائي
              </h3>
              <p className="text-muted-foreground">
                أستخدم تقنيات الإضاءة والتكوين السينمائي لجعل صوركم تبدو وكأنها مشاهد من فيلم رومانسي.
              </p>
            </div>

            <div className="bg-background p-8 border border-white/5 hover:border-primary/50 transition-colors duration-300">
              <Heart className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4 text-primary" style={{ fontFamily: "'Amiri', serif" }}>
                تجربة مريحة
              </h3>
              <p className="text-muted-foreground">
                أعرف جيداً رهبة الوقوف أمام الكاميرا، لذلك أحرص على خلق جو مرح ومريح يجعلكم تتصرفون بطبيعتكم.
              </p>
            </div>

            <div className="bg-background p-8 border border-white/5 hover:border-primary/50 transition-colors duration-300">
              <Camera className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4 text-primary" style={{ fontFamily: "'Amiri', serif" }}>
                جودة لا تضاهى
              </h3>
              <p className="text-muted-foreground">
                من التصوير بأحدث الكاميرات وحتى الطباعة في أرقى المعامل، أضمن لكم جودة تليق بذكرياتكم الغالية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Amiri', serif" }}>
          هل أعجبك أسلوبي؟
        </h2>
        <Link href="/contact">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg rounded-none">
            {ctaTexts.contactNow}
          </Button>
        </Link>
      </section>

      {/* ✅ CSS للتأثير */}
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
      `}</style>

      <Footer />
    </div>
  );
}

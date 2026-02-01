import { useEffect, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Heart, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  photographerInfo,
  siteImages,
  aboutContent,
  testimonials,
  pageTexts,
  ctaTexts,
} from "@/config/siteConfig";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          ref={heroRef}
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('${siteImages.heroImage}')`,
            filter: "brightness(0.4)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />

        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          <h2 className="text-primary text-lg md:text-xl tracking-[0.3em] uppercase mb-4 font-medium">
            {photographerInfo.title}
          </h2>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            مش مجرد <span className="italic text-primary">صور</span>
            <br />
            دي ذكريات متعاشة
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed">
            {photographerInfo.descriptionAr}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-none min-w-[180px]"
              >
                {ctaTexts.bookSession}
              </Button>
            </Link>

            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-none min-w-[180px]"
              >
                عرض التفاصيل والاسعار
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent mx-auto"></div>
        </div>
      </header>

      {/* Services Preview */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          {/* الزر الكبير فوق الباقات */}
          <div className="text-center mb-12">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-none min-w-[180px]"
              >
                عرض التفاصيل والاسعار
              </Button>
            </Link>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">
              الخدمات
            </h3>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              باقات التصوير
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 group">
              <Camera className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                جلسات التصوير
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                جلسات تصوير خارجية للعروسين في أماكن مميزة، مع التركيز على الإضاءة
                الطبيعية والمشاعر العفوية.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-8">
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> عدد صور غير
                  محدود
                </li>
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> شامل 2 Reels &
                  TikTok
                </li>
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> تعديل احترافي
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 border border-primary/20 relative transform md:-translate-y-4 shadow-2xl shadow-black/50">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1">
                الأكثر طلباً
              </div>
              <Heart className="w-12 h-12 text-primary mb-6" />
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                باقات الزفاف
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                تغطية شاملة ليوم الزفاف من التحضيرات حتى نهاية الحفل، لتوثيق كل
                لحظة وكل تفصيل.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-8">
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> ألبومات فاخرة
                  مطبوعة
                </li>
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> تابلوهات خشبية
                </li>
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> تغطية فيديو
                  Reels
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 group">
              <Star className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                VIP Full Day
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                تجربة تصوير كاملة بمستوى VIP ليوم لا يتكرر، مع فريق عمل متكامل
                واهتمام بأدق التفاصيل.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-8">
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> تغطية يوم كامل
                </li>
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> فيديو برومو
                  سينمائي
                </li>
                <li className="flex items-center">
                  <Star size={14} className="ml-2 text-primary" /> هدايا حصرية
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-8"
              >
                {ctaTexts.viewDetails}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* ✅ ألوان دايمًا + تأثير قوي يشتغل على الموبايل */}
            <div className="relative order-2 md:order-1 group overflow-hidden">
              <div className="absolute -top-4 -left-4 w-full h-full border border-primary/30 z-0 hidden md:block"></div>

              {/* Vignette لعمق الصورة */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/10" />

              {/* Shine متحرك دايمًا (موبايل وديسكتوب) */}
              <div className="about-shine absolute inset-0 z-20 pointer-events-none opacity-45 md:opacity-0 md:group-hover:opacity-55 transition-opacity duration-500" />

              <img
                src={siteImages.aboutImage}
                alt="Badr Photography Style"
                style={{ filter: "none" }} // ✅ كسر أي grayscale مفروض من CSS
                className="
                  relative z-0 w-full h-[600px] object-cover
                  grayscale-0 filter-none
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
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                {aboutContent.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {aboutContent.description}
              </p>
              <Link href="/about">
                <Button
                  variant="link"
                  className="text-primary p-0 text-lg hover:no-underline group"
                >
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
            <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">
              معرض الأعمال
            </h3>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              لقطات مختارة
            </h2>
          </div>
          <Link href="/portfolio">
            <Button
              variant="outline"
              className="hidden md:flex border-white/20 hover:bg-white hover:text-black rounded-none"
            >
              عرض المعرض الكامل
            </Button>
          </Link>
        </div>

        <div className="flex space-x-6 space-x-reverse overflow-x-auto pb-8 px-4 md:px-0 scrollbar-hide">
          {siteImages.portfolioPreview.map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] md:min-w-[400px] h-[500px] relative group cursor-pointer overflow-hidden"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h4
                  className="text-2xl text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  style={{ fontFamily: "'Amiri', serif" }}
                >
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 mt-8 md:hidden text-center">
          <Link href="/portfolio">
            <Button
              variant="outline"
              className="w-full border-white/20 hover:bg-white hover:text-black rounded-none"
            >
              عرض المعرض الكامل
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-primary blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-primary text-sm tracking-widest uppercase mb-2 font-bold">
            آراء العملاء
          </h3>
          <h2
            className="text-4xl md:text-5xl font-bold mb-16"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            قصص سعيدة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background/50 p-8 border border-white/5 backdrop-blur-sm"
              >
                <div className="text-primary text-4xl font-serif mb-4">"</div>
                <p className="text-lg text-muted-foreground mb-6 italic">
                  {testimonial.quote}
                </p>
                <h4
                  className="font-bold text-foreground"
                  style={{ fontFamily: "'Amiri', serif" }}
                >
                  {testimonial.name}
                </h4>
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
            filter: "brightness(0.3)",
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {pageTexts.home.ctaTitle}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {pageTexts.home.ctaDescription}
          </p>
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

      {/* CSS للتأثير القوي */}
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

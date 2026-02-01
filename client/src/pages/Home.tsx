import { useEffect, useRef } from "react";
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
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`;
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

      {/* ================= HERO ================= */}
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

        <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center">
          <h2 className="text-primary tracking-[0.3em] mb-4">
            {photographerInfo.title}
          </h2>

          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            مش مجرد <span className="text-primary italic">صور</span>
            <br />
            دي ذكريات متعاشة
          </h1>

          <p className="text-gray-300 max-w-2xl mb-10">
            {photographerInfo.descriptionAr}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary rounded-none px-10 py-6 text-lg"
              >
                {ctaTexts.bookSession}
              </Button>
            </Link>

            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white rounded-none px-10 py-6 text-lg"
              >
                عرض التفاصيل والاسعار
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= SERVICES ================= */}
      <section className="py-28 relative">
        <div className="container mx-auto px-4">

          {/* 🔥 الزر الجديد الكبير فوق الباقات */}
          <div className="text-center mb-16">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-16 py-8 text-2xl"
              >
                عرض التفاصيل والاسعار
              </Button>
            </Link>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-primary tracking-widest mb-2 font-bold">
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
            <div className="bg-card p-8 border">
              <Camera className="text-primary mb-4" size={40} />
              <h3 className="text-2xl mb-4">جلسات التصوير</h3>
              <p>جلسات تصوير احترافية بإحساس سينمائي</p>
            </div>

            <div className="bg-card p-8 border border-primary">
              <Heart className="text-primary mb-4" size={40} />
              <h3 className="text-2xl mb-4">باقات الزفاف</h3>
              <p>تغطية كاملة ليوم الزفاف</p>
            </div>

            <div className="bg-card p-8 border">
              <Star className="text-primary mb-4" size={40} />
              <h3 className="text-2xl mb-4">VIP Full Day</h3>
              <p>تجربة فاخرة ليوم لا يُنسى</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img
            src={siteImages.aboutImage}
            className="w-full h-[500px] object-cover"
          />
          <div className="text-right">
            <h3 className="text-primary">{aboutContent.subtitle}</h3>
            <h2 className="text-4xl mb-6">{aboutContent.title}</h2>
            <p className="mb-6">{aboutContent.description}</p>
            <Link href="/about">
              <Button variant="link">
                {ctaTexts.readMore} <ArrowLeft />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO ================= */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl mb-6">معرض الأعمال</h2>
          <Link href="/portfolio">
            <Button variant="outline" className="rounded-none px-10">
              شاهد أعمالي
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-12">آراء العملاء</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 border">
                <p className="mb-4">"{t.quote}"</p>
                <strong>{t.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

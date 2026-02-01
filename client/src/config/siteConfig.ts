import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

type PackageCard = {
  id: string;
  name: string;
  price: string;
  description?: string;
  features: string[];
  popular?: boolean;
  priceNote?: string;
};

type AddonCard = {
  id: string;
  name: string;
  price: string;
  emoji?: string;
  description: string;
  features: string[];
};

export default function Services() {
  /**
   * =====================================================
   * ✅ كل الكتابة + كل الباقات الخاصة بصفحة الخدمات هنا
   * عدّل أي نص/عنوان/باكدج من نفس الملف بسهولة
   * =====================================================
   */
  const CONTENT = {
    page: {
      title: "الخدمات والباقات",
      subtitle: "باقات تصوير متنوعة تناسب جميع المناسبات",
      headerBackgroundImage: "/images/wedding-1.jpg",
    },

    sections: {
      sessionsTitle: "جلسات التصوير",
      sessionsWithPrintsTitle: "جلسات التصوير شامل المطبوعات",
      weddingTitle: "باقات الزفاف",
      addonsTitle: "خدمات إضافية (اختياري)",
    },

    ui: {
      popularBadgeText: "الأكثر طلباً",
      bookNowText: "احجز الآن",
      bookLink: "/contact",
      pricesNote:
        "* الأسعار قد تختلف حسب الموقع والتفاصيل الإضافية. غير شامل رسوم اللوكيشن.",
      bottomCta: {
        title: "هل لديك استفسار خاص؟",
        description: "تواصل معي لمناقشة تفاصيل يومك وتصميم باقة تناسبك.",
        buttonText: "تواصل معي",
        link: "/contact",
      },
    },

    // =========================
    // ✅ باقات جلسات التصوير
    // =========================
    sessionPackages: [
      {
        id: "session-1",
        name: "باكدج 1",
        price: "$3000",
        description: "جلسة تصوير احترافية مع باقة متكاملة",
        features: [
          "ألبوم كلاسيكي فاخر 18 صورة طباعة ليزر",
          "تابلوه سابلميشن متوسط مقاس 40×50",
          "كروت تذكارية صغيرة",
          "شامل 2 REELS & TIKTOK",
          "عدد غير محدود من الصور",
          "وقت محدد",
        ],
        popular: false,
      },
      {
        id: "session-2",
        name: "باكدج 2",
        price: "$4500",
        description: "الباقة الأكثر طلباً - تجربة متكاملة",
        features: [
          "ألبوم كبير مقاس 30×80 عدد من 20 لـ 40 صورة",
          "تابلوه أنيميشن كبير 50×70 جودة عالية مع طبقة حماية",
          "ألبوم آخر مصغر أنيق + كروت صغيرة لصور السيشن",
          "ساعة حائط كبيرة مصممة بصوركم الخاصة",
          "REELS & TIKTOK",
          "عدد غير محدود من الصور",
          "وقت مفتوح",
        ],
        popular: true,
      },
    ] as PackageCard[],

    // =====================================================
    // ✅ جلسات التصوير شامل المطبوعات (مكررة حالياً)
    // بعدين تقدر تغيّرها لعروض مختلفة بدون ما تأثر على الأولى
    // =====================================================
    sessionPackagesWithPrints: [
      {
        id: "prints-session-1",
        name: "باكدج 1",
        price: "$3000",
        description: "جلسة تصوير احترافية مع باقة متكاملة",
        features: [
          "ألبوم كلاسيكي فاخر 18 صورة طباعة ليزر",
          "تابلوه سابلميشن متوسط مقاس 40×50",
          "كروت تذكارية صغيرة",
          "شامل 2 REELS & TIKTOK",
          "عدد غير محدود من الصور",
          "وقت محدد",
        ],
        popular: false,
      },
      {
        id: "prints-session-2",
        name: "باكدج 2",
        price: "$4500",
        description: "الباقة الأكثر طلباً - تجربة متكاملة",
        features: [
          "ألبوم كبير مقاس 30×80 عدد من 20 لـ 40 صورة",
          "تابلوه أنيميشن كبير 50×70 جودة عالية مع طبقة حماية",
          "ألبوم آخر مصغر أنيق + كروت صغيرة لصور السيشن",
          "ساعة حائط كبيرة مصممة بصوركم الخاصة",
          "ساعة حائط كبيرة مصممة بصوركم الخاصة",
          "REELS & TIKTOK",
          "عدد غير محدود من الصور",
          "وقت مفتوح",
        ],
        popular: true,
      },
    ] as PackageCard[],

    // =========================
    // ✅ باقات الزفاف
    // =========================
    weddingPackages: [
      {
        id: "wedding-party",
        name: "بارتي القاعة",
        price: "$800",
        priceNote: "غير شامل رسوم اللوكيشن",
        description: "تغطية حفل الزفاف في القاعة",
        features: [
          "عدد غير محدد من الصور دائماً",
          "صور جماعية مع الأصدقاء والأقارب",
          "توثيق كل لحظة حتى نهاية الحفل",
          "لقطات عفوية تخلد فرحتك",
        ],
      },
      {
        id: "media-coverage",
        name: "MEDIA COVERAGE",
        price: "$1000",
        description: "تغطية سوشيال ميديا متكاملة",
        features: [
          "توثيق كامل اليوم من كل التفاصيل بشكل سينمائي مختصر",
          "توثيق كامل لليوم بالهاتف",
          "تنظيم ريلز واستوريهات السوشيال ميديا",
        ],
      },
    ] as PackageCard[],

    // =========================
    // ✅ خدمات إضافية
    // =========================
    additionalServices: [
      {
        id: "vip-full-day",
        name: "تصوير اليوم الكامل FULL DAY (VIP)",
        price: "$1700",
        emoji: "🚀",
        description: "تجربة تصوير كاملة بمستوى VIP لأن اليوم ده مش هيتكرر ❤️",
        features: ["تغطية يوم كامل", "فيديو برومو سينمائي", "هدايا حصرية"],
      },
      {
        id: "promo-video",
        name: "PROMO VIDEO",
        price: "اتصل للسعر",
        emoji: "🎬",
        description: "فيديو ترويجي سينمائي احترافي",
        features: ["مونتاج احترافي", "موسيقى مرخصة", "تسليم سريع"],
      },
    ] as AddonCard[],
  };

  const renderPackageGrid = (packages: PackageCard[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {packages.map((pkg) => (
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
              {CONTENT.ui.popularBadgeText}
            </div>
          )}

          <h3
            className="text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {pkg.name}
          </h3>

          <div className="text-center mb-2">
            <span className="text-4xl font-bold text-primary">{pkg.price}</span>
          </div>

          {pkg.priceNote && (
            <p className="text-xs text-muted-foreground text-center mb-4">
              {pkg.priceNote}
            </p>
          )}

          {pkg.description && (
            <p className="text-muted-foreground text-center mb-8 text-sm">
              {pkg.description}
            </p>
          )}

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

          {/* ✅ زر احجز الآن ملوّن في كل الباكدجات */}
          <div className="text-center mt-auto">
            <Link href={CONTENT.ui.bookLink}>
              <Button className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                {CONTENT.ui.bookNowText}
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <Navbar />

      {/* Header */}
      <header className="pt-40 pb-20 bg-card relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('${CONTENT.page.headerBackgroundImage}')` }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {CONTENT.page.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {CONTENT.page.subtitle}
          </p>
        </div>
      </header>

      {/* Sessions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {CONTENT.sections.sessionsTitle}
          </h2>

          {renderPackageGrid(CONTENT.sessionPackages)}

          {/* Sessions With Prints */}
          <div className="mt-24">
            <h2
              className="text-3xl font-bold text-center mb-12"
              style={{ fontFamily: "'Amiri', serif" }}
            >
              {CONTENT.sections.sessionsWithPrintsTitle}
            </h2>

            {renderPackageGrid(CONTENT.sessionPackagesWithPrints)}
          </div>
        </div>
      </section>

      {/* Wedding */}
      <section className="py-20 bg-card border-t border-white/5">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {CONTENT.sections.weddingTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {CONTENT.weddingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-background p-6 border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    {pkg.name}
                  </h3>
                  <span className="text-primary font-bold">{pkg.price}</span>
                </div>

                {pkg.priceNote && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {pkg.priceNote}
                  </p>
                )}

                {pkg.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {pkg.description}
                  </p>
                )}

                <ul className="space-y-2">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {CONTENT.sections.addonsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {CONTENT.additionalServices.map((service) => (
              <div
                key={service.id}
                className="bg-card p-6 border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    {service.emoji ? `${service.emoji} ` : ""}
                    {service.name}
                  </h3>
                  <span className="text-primary font-bold">
                    {service.price}
                  </span>
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
            {CONTENT.ui.pricesNote}
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center bg-primary/5">
        <h2
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          {CONTENT.ui.bottomCta.title}
        </h2>
        <p className="text-muted-foreground mb-8">
          {CONTENT.ui.bottomCta.description}
        </p>
        <Link href={CONTENT.ui.bottomCta.link}>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg rounded-none"
          >
            {CONTENT.ui.bottomCta.buttonText}
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

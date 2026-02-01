/**
 * =====================================================
 * Central Site Config (ALL TEXTS / CONTENT)
 * =====================================================
 * الهدف: أي كلمة في الموقع تكون هنا.
 * =====================================================
 */

// =====================================================
// Basic Info
// =====================================================
export const photographerInfo = {
  name: "Badr Bado",
  brandName: "BADR.PH",
  title: "Wedding Photography",
  taglineAr: "توثيق المشاعر واللحظات الحقيقية",
  descriptionAr:
    "أسلوب سينمائي فاخر يخلد ذكرياتكم للأبد. نروي قصة حبكم من خلال عدسة فنية تلتقط أدق التفاصيل.",
};

export const contactInfo = {
  phone: "+20 101 151 1561",
  whatsappNumber: "201011511561",
  email: "contact@badr-ph.com",
  location: "مصر (متاح للسفر للمحافظات)",
};

export const socialLinks = {
  instagram: "https://www.instagram.com/badr_abdo_ph",
  facebook: "https://www.facebook.com/badrabdophoto",
  tiktok: "https://www.tiktok.com/@badr_abdo_ph?_r=1&_t=ZS-93VLFDPD2cH",
};

export const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services" },
  { label: "من أنا", href: "/about" },
  { label: "أعمالي", href: "/portfolio" },
  { label: "تواصل معي", href: "/contact" },
];

// =====================================================
// Global CTA texts
// =====================================================
export const ctaTexts = {
  bookSession: "احجز جلستك",
  viewPortfolio: "شاهد أعمالي",
  contactNow: "تواصل معنا الآن",
  bookNow: "احجز الآن",
  viewDetails: "عرض التفاصيل والأسعار",
  readMore: "اقرأ قصتي",
  sendRequest: "إرسال الطلب",
};

// =====================================================
// Site Images
// =====================================================
export const siteImages = {
  heroImage: "/images/hero-1.jpg",
  heroImage2: "/images/hero-2.webp",
  aboutImage: "/images/portrait-1.jpg",

  portfolioPreview: [
    { src: "/images/wedding-1.jpg", title: "لحظات الزفاف" },
    { src: "/images/outdoor-1.jpg", title: "جلسات خارجية" },
    { src: "/images/bw-1.jpg", title: "بورتريه كلاسيكي" },
    { src: "/images/golden-1.jpg", title: "ساعة ذهبية" },
    { src: "/images/wedding-2.jpg", title: "تفاصيل دقيقة" },
  ],

  portfolioGallery: [
    { src: "/images/wedding-1.jpg", category: "wedding", title: "لحظة الزفاف" },
    { src: "/images/wedding-2.jpg", category: "wedding", title: "تفاصيل الفرح" },
    { src: "/images/outdoor-1.jpg", category: "outdoor", title: "جلسة خارجية" },
    { src: "/images/bw-1.jpg", category: "portrait", title: "بورتريه أبيض وأسود" },
    { src: "/images/golden-1.jpg", category: "outdoor", title: "الساعة الذهبية" },
    { src: "/images/portrait-1.jpg", category: "portrait", title: "بورتريه فني" },
    { src: "/images/hero-1.jpg", category: "wedding", title: "لحظة رومانسية" },
    { src: "/images/hero-2.webp", category: "outdoor", title: "جلسة مميزة" },
  ],
};

// =====================================================
// HOME PAGE TEXTS (كل اللي ظاهر في Home.tsx)
// =====================================================
export const homeContent = {
  hero: {
    titleSmall: photographerInfo.title,
    headline: {
      line1Prefix: "مش مجرد",
      highlight: "صور",
      line2: "دي ذكريات متعاشة",
    },
    description: photographerInfo.descriptionAr,
    primaryButton: ctaTexts.bookSession,
    secondaryButton: ctaTexts.viewDetails, // نفس اللي عندك
    secondaryButtonHardText: "عرض التفاصيل والاسعار", // لو عندك كتابة مختلفة بالهمزة/بدون
  },

  servicesPreview: {
    sectionEyebrow: "الخدمات",
    sectionTitle: "باقات التصوير",
    topButtonText: "عرض التفاصيل والاسعار",
    bottomButtonText: ctaTexts.viewDetails,
    cards: [
      {
        title: "جلسات التصوير",
        description:
          "جلسات تصوير خارجية للعروسين في أماكن مميزة، مع التركيز على الإضاءة الطبيعية والمشاعر العفوية.",
        bullets: ["عدد غير محدود من الصور", "شامل 2 Reels & TikTok", "تعديل احترافي"],
      },
      {
        badge: "الأكثر طلباً",
        title: "باقات الزفاف",
        description:
          "تغطية شاملة ليوم الزفاف من التحضيرات حتى نهاية الحفل، لتوثيق كل لحظة وكل تفصيل.",
        bullets: ["ألبومات فاخرة مطبوعة", "تابلوهات خشبية", "تغطية فيديو Reels"],
      },
      {
        title: "VIP Full Day",
        description:
          "تجربة تصوير كاملة بمستوى VIP ليوم لا يتكرر، مع فريق عمل متكامل واهتمام بأدق التفاصيل.",
        bullets: ["تغطية يوم كامل", "فيديو برومو سينمائي", "هدايا حصرية"],
      },
    ],
  },

  portfolioPreview: {
    eyebrow: "معرض الأعمال",
    title: "لقطات مختارة",
    desktopButton: "عرض المعرض الكامل",
    mobileButton: "عرض المعرض الكامل",
  },

  testimonials: {
    eyebrow: "آراء العملاء",
    title: "قصص سعيدة",
    quoteMark: '"',
  },

  finalCta: {
    title: "جاهزون لتوثيق قصتكم؟",
    description: "دعونا نصنع ذكريات لا تنسى معاً. تواصلوا معنا الآن لحجز موعدكم.",
    button: ctaTexts.contactNow,
  },
};

// =====================================================
// ABOUT PAGE TEXTS (كل اللي ظاهر في About.tsx)
// =====================================================
export const aboutContent = {
  title: "شغف بتصوير اللحظات العفوية",
  subtitle: "من أنا",

  // ✅ الجملة اللي كانت “مفقودة” عندك لأنها كانت مكتوبة داخل About.tsx
  headerLead:
    "أكثر من مجرد مصور، أنا راوي قصص بصرية يبحث عن الجمال في التفاصيل الصغيرة.",

  description: `My name is Badr Abdo, I am 26 years old and I hold a bachelor’s degree from Al-Azhar University. I chose to work as a photographer because I believe in doing what I truly love..`,

  fullStory: `Photography is something I truly love, and I see it as more than just a job — it’s a real passion and something I genuinely enjoy. What I love most is portrait photography, because I enjoy capturing people’s personalities and emotions, not just their appearance.

I also really enjoy photographing parties, weddings, and spontaneous moments, as these moments are natural, honest, and full of real emotions. I always focus on capturing the small details and genuine feelings in a simple yet artistic way.

My goal is for every photo to tell a story and become a beautiful memory that lasts for years, especially during important occasions and VIP events.ة.`,

  philosophy:
    'أجمل صورة هي اللي بتطلع لوحدها، من غير تصنّع، لما الإحساس يكون صادق والضحكة حقيقية \n"لما تكون بتحبني 🫶".',

  stats: [
    { number: "+500", label: "عميل سعيد" },
    { number: "+10", label: "سنوات خبرة" },
    { number: "+1000", label: "جلسة تصوير" },
  ],

  whyChooseMe: {
    title: "لماذا تختارني؟",
    cards: [
      {
        iconKey: "film",
        title: "أسلوب سينمائي",
        description:
          "أستخدم تقنيات الإضاءة والتكوين السينمائي لجعل صوركم تبدو وكأنها مشاهد من فيلم رومانسي.",
      },
      {
        iconKey: "heart",
        title: "تجربة مريحة",
        description:
          "أعرف جيداً رهبة الوقوف أمام الكاميرا، لذلك أحرص على خلق جو مرح ومريح يجعلكم تتصرفون بطبيعتكم.",
      },
      {
        iconKey: "camera",
        title: "جودة لا تضاهى",
        description:
          "من التصوير بأحدث الكاميرات وحتى الطباعة في أرقى المعامل، أضمن لكم جودة تليق بذكرياتكم الغالية.",
      },
    ],
  },

  cta: {
    title: "هل أعجبك أسلوبي؟",
    button: ctaTexts.contactNow,
  },
};

// =====================================================
// SERVICES PAGE CONTENT (كل النصوص الخاصة بصفحة الخدمات)
// =====================================================
export const servicesPageContent = {
  headerBackgroundImage: "/images/wedding-1.jpg",
  title: "الخدمات والباقات",
  subtitle: "باقات تصوير متنوعة تناسب جميع المناسبات",

  sectionTitles: {
    sessions: "جلسات التصوير",
    sessionsWithPrints: "جلسات التصوير شامل المطبوعات",
    wedding: "باقات الزفاف",
    addons: "خدمات إضافية (اختياري)",
  },

  popularBadgeText: "الأكثر طلباً",
  bookNowText: ctaTexts.bookNow,
  bookLink: "/contact",

  pricesNote:
    "* الأسعار قد تختلف حسب الموقع والتفاصيل الإضافية. غير شامل رسوم اللوكيشن.",

  bottomCta: {
    title: "هل لديك استفسار خاص؟",
    description: "تواصل معي لمناقشة تفاصيل يومك وتصميم باقة تناسبك.",
    buttonText: "تواصل معي",
    link: "/contact",
  },
};

// =====================================================
// Packages Data
// =====================================================
export const sessionPackages = [
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
];

export const sessionPackagesWithPrints = [
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
      "REELS & TIKTOK",
      "عدد غير محدود من الصور",
      "وقت مفتوح",
    ],
    popular: true,
  },
];

export const weddingPackages = [
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
    popular: false,
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
    popular: false,
  },
];

export const additionalServices = [
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
];

// =====================================================
// PLACEHOLDERS for full 100% coverage
// (هنا تحط أي نصوص تلاقيها في Contact/Portfolio/Navbar/Footer...)
// =====================================================
export const footerContent = {
  // اكتب هنا أي نصوص عندك في الفوتر لما تعمل البحث
};

export const navbarContent = {
  // اكتب هنا أي نصوص اضافية في النافبار غير navLinks
};

export const contactPageContent = {
  // اكتب هنا كل نصوص صفحة تواصل
};

export const portfolioPageContent = {
  // اكتب هنا كل نصوص صفحة الأعمال + أزرار/فلاتر إن وجدت
};

import { Link } from "wouter";
import { Facebook, Instagram, MessageCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EditableText } from "@/components/InlineEdit";
import { Button } from "@/components/ui/button";
import { useContactData, useContentData } from "@/hooks/useSiteData";

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.56 4.15 1.62 5.96L0 24l6.2-1.62a11.95 11.95 0 0 0 5.86 1.5h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.44ZM12.07 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.96.98-3.58-.24-.37a9.9 9.9 0 0 1-1.56-5.36C2.16 6.5 6.6 2.06 12.06 2.06c2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.9 6.98c0 5.46-4.44 9.97-9.87 9.97Zm5.77-7.48c-.31-.16-1.82-.9-2.1-1-.28-.1-.48-.16-.68.16-.2.31-.78 1-.96 1.2-.18.2-.35.24-.66.08-.31-.16-1.3-.48-2.47-1.54-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.35.47-.52.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.68-1.65-.93-2.27-.24-.58-.49-.5-.68-.5h-.58c-.2 0-.52.08-.8.39-.28.31-1.06 1.03-1.06 2.5 0 1.47 1.08 2.9 1.23 3.1.16.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.82-.74 2.08-1.45.26-.7.26-1.3.18-1.45-.08-.14-.28-.23-.58-.39Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function PackageDetails() {
  const { contactInfo, socialLinks } = useContactData();
  const content = useContentData();
  const contentMap = content.contentMap ?? {};

  const whatsapp = (contactInfo.whatsappNumber ?? "").replace(/[^\d]/g, "");
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}` : "";

  const options = [
    {
      fallback: "احجز ازاي",
      key: "package_help_option_1",
      icon: Sparkles,
    },
    {
      fallback: "عايز استفسر عن حاجه كمان 💁‍♂️",
      key: "package_help_option_2",
      icon: MessageCircle,
    },
    {
      fallback: "هل اليوم بتاعي هيكون متاح ؟ 🙏",
      key: "package_help_option_3",
      icon: Sparkles,
    },
    {
      fallback: "عايز اشوف شكل الالبومات ❤️",
      key: "package_help_option_4",
      href: "/contact",
      icon: Sparkles,
    },
  ];

  const socials = [
    {
      key: "instagram",
      href: socialLinks.instagram,
      label: "Instagram",
      icon: Instagram,
    },
    {
      key: "facebook",
      href: socialLinks.facebook,
      label: "Facebook",
      icon: Facebook,
    },
    {
      key: "tiktok",
      href: socialLinks.tiktok,
      label: "TikTok",
      icon: TikTokIcon,
    },
    {
      key: "whatsapp",
      href: whatsappHref,
      label: "WhatsApp",
      icon: WhatsAppIcon,
    },
  ].filter((item) => Boolean(item.href));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <header className="pt-28 pb-10 md:pt-32 bg-card/60 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_15%,rgba(255,200,80,0.12),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">
              <EditableText
                value={contentMap.package_help_kicker}
                fallback="اختار اللي يناسبك"
                fieldKey="package_help_kicker"
                category="services"
                label="شارة صفحة تفاصيل الباقات"
              />
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <EditableText
              value={contentMap.package_help_title}
              fallback="تفاصيل الباقات"
              fieldKey="package_help_title"
              category="services"
              label="عنوان صفحة تفاصيل الباقات"
            />
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <EditableText
              value={contentMap.package_help_subtitle}
              fallback="اختر من الخيارات التالية علشان نوصل لأفضل قرار سريع وواضح."
              fieldKey="package_help_subtitle"
              category="services"
              label="وصف صفحة تفاصيل الباقات"
              multiline
            />
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => {
              const Icon = option.icon as any;
              const optionText = contentMap[option.key] || option.fallback;
              const message = encodeURIComponent(optionText);
              const optionHref = whatsappHref
                ? `${whatsappHref}?text=${message}`
                : "/contact";
              const isExternal = whatsappHref.length > 0;
              const contentNode = (
                <span className="inline-flex items-center gap-3 text-base md:text-lg font-semibold">
                  <Icon className="w-4 h-4" />
                  <EditableText
                    value={contentMap[option.key]}
                    fallback={option.fallback}
                    fieldKey={option.key}
                    category="services"
                    label={`خيار الباقة: ${option.fallback}`}
                    multiline
                  />
                </span>
              );

              if (optionHref.startsWith("/") && !isExternal) {
                return (
                  <Link key={option.key} href={optionHref}>
                    <Button
                      variant="outline"
                      className="w-full min-h-[56px] rounded-none px-6 cta-glow border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {contentNode}
                    </Button>
                  </Link>
                );
              }

              return (
                <Button
                  key={option.key}
                  asChild
                  variant="outline"
                  className="w-full min-h-[56px] rounded-none px-6 cta-glow border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a
                    href={optionHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                  >
                    {contentNode}
                  </a>
                </Button>
              );
            })}
          </div>

          {socials.length > 0 && (
            <div className="mt-10">
              <div className="text-center mb-6 text-sm text-muted-foreground hero-follow-title">
                <EditableText
                  value={contentMap.package_help_socials_title}
                  fallback="تواصل معنا عبر السوشيال"
                  fieldKey="package_help_socials_title"
                  category="services"
                  label="عنوان السوشيال في صفحة تفاصيل الباقات"
                />
              </div>
              <div className="hero-follow-icons">
                {socials.map((social) => {
                  const Icon = social.icon as any;
                  const className =
                    social.key === "instagram"
                      ? "hero-social-btn hero-social--ig"
                      : social.key === "facebook"
                        ? "hero-social-btn hero-social--fb"
                        : social.key === "tiktok"
                          ? "hero-social-btn hero-social--tt"
                          : "hero-social-btn hero-social--wa";
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className={className}
                    >
                      <Icon size={26} />
                    </a>
                  );
                })}
              </div>
              <div className="hero-follow-glow" aria-hidden="true" />
            </div>
          )}
        </div>
      </section>

      <style>{`
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
          margin: 14px auto 0;
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
          box-shadow: 0 0 0 1px rgba(255, 200, 80, 0.18) inset, 0 18px 50px rgba(255, 200, 80, 0.12);
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
          opacity: 0.6;
        }
        @keyframes social-shine {
          0% { transform: translateX(-120%); }
          70% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes cta-shine {
          0% { transform: translateX(-120%); }
          60% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-follow-glow,
          .hero-social-btn::after,
          .cta-glow::after { animation: none !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}

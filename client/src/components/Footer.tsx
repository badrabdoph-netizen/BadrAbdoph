import { Link } from "wouter";
import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import {
  photographerInfo,
  contactInfo,
  socialLinks,
  navLinks,
  ctaTexts,
  pageTexts,
} from "@/config/siteConfig";

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

export default function Footer() {
  const waHref = `https://wa.me/${contactInfo.whatsappNumber}`;
  const telHref = `tel:${contactInfo.phone.replace(/\s/g, "")}`;
  const mailHref = `mailto:${contactInfo.email}`;

  return (
    <footer className="bg-card border-t border-white/5">
      {/* Top CTA strip (Mobile-first) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_10%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="container mx-auto px-4 py-14 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm text-foreground/80">
                رد سريع • تنظيم مواعيد • تفاصيل واضحة
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {pageTexts?.home?.ctaTitle ?? "جاهزين نوثق فرحتكم؟"}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {pageTexts?.home?.ctaDescription ?? "لأن كل لحظة مهمة تستاهل تتوثّق صح."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <a className="w-full sm:w-auto">
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-6 text-lg font-semibold">
                    {ctaTexts?.contactNow ?? "تواصل معنا الآن"}
                  </button>
                </a>
              </Link>

              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto border border-white/15 text-foreground hover:bg-white hover:text-black rounded-none px-10 py-6 text-lg font-semibold inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={20} />
                واتساب سريع
              </a>
            </div>

            <div className="mt-10 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
          </div>
        </div>
      </section>

      {/* Main footer */}
      <div className="container mx-auto px-4 pt-14 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="text-center md:text-right">
            <Link href="/">
              <a
                className="text-3xl font-bold tracking-wider text-foreground mb-4 inline-block"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {photographerInfo.brandName.replace(".", "")}
                <span className="text-primary">.</span>PH
              </a>
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
              {photographerInfo.descriptionAr}
            </p>

            <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 bg-black/15 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 bg-black/15 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full border border-white/10 bg-black/15 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
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
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-foreground mb-6">
              روابط سريعة
            </h4>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/services#sessions">
                <a className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <span>شوف الأسعار والباقات</span>
                  <span className="text-primary">
                    {/* سهم بسيط */}
                    ‹
                  </span>
                </a>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-foreground mb-6">
              معلومات التواصل
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="text-primary" />
                <a href={telHref} className="text-muted-foreground hover:text-primary transition-colors" dir="ltr">
                  {contactInfo.phone}
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="text-primary" />
                <a href={mailHref} className="text-muted-foreground hover:text-primary transition-colors">
                  {contactInfo.email}
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-muted-foreground">{contactInfo.location}</span>
              </div>
            </div>

            {/* Quick contact buttons (mobile-first) */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="premium-border border border-white/10 bg-black/15 hover:border-primary/35 hover:text-primary transition-colors px-4 py-3 inline-flex items-center justify-center gap-2"
              >
                <span className="text-primary">
                  <WhatsAppIcon size={18} />
                </span>
                <span className="text-sm font-semibold">واتساب</span>
              </a>

              <a
                href={telHref}
                className="premium-border border border-white/10 bg-black/15 hover:border-primary/35 hover:text-primary transition-colors px-4 py-3 inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">اتصال</span>
              </a>
            </div>

            <div className="mt-3">
              <Link href="/contact">
                <a className="block">
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-6 py-4 font-semibold">
                    {ctaTexts?.bookNow ?? "احجز الآن"}
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/70">
          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} {photographerInfo.name} Photography. جميع الحقوق محفوظة.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 border border-white/10 bg-black/15 hover:border-primary/35 hover:text-primary transition-colors px-4 py-2"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
            للأعلى
          </button>
        </div>
      </div>

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
          border-radius: inherit;
        }
      `}</style>
    </footer>
  );
}

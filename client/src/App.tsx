import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useContactData } from "@/hooks/useSiteData";
import { Phone } from "lucide-react";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function getNavOffsetPx() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-offset").trim();
  const n = parseInt(v.replace("px", ""), 10);
  return Number.isFinite(n) ? n : 96; // fallback safe
}

function scrollToIdWithOffset(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const offset = getNavOffsetPx();
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" });
  return true;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // ادي الصفحة فرصة ترندر
    requestAnimationFrame(() => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const ok = scrollToIdWithOffset(id);
        if (ok) return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location]);

  return null;
}

function buildWhatsAppHref(text: string, whatsappNumber: string | undefined) {
  const phone = (whatsappNumber ?? "").replace(/[^\d]/g, "");
  if (!phone) return "";
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
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

function FloatingWhatsApp() {
  const { contactInfo } = useContactData();
  const href = buildWhatsAppHref("❤️", contactInfo.whatsappNumber);
  if (!href) return null;

  return (
    <a href={href} className="wa-float hidden md:inline-flex" target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <WhatsAppIcon size={16} />
      <span className="wa-text">واتساب</span>
    </a>
  );
}

function GlobalStickyBar() {
  const { contactInfo } = useContactData();
  const telHref = contactInfo.phone ? `tel:${contactInfo.phone.replace(/\s/g, "")}` : "";
  const waHref = buildWhatsAppHref("❤️", contactInfo.whatsappNumber);
  if (!telHref && !waHref) return null;

  return (
    <div className="glass-bar md:hidden">
      <div className="container mx-auto px-4">
        <div className="glass-bar-inner">
          {telHref ? (
            <a href={telHref} className="glass-btn" aria-label="Call">
              <Phone className="w-4 h-4" />
              اتصل
            </a>
          ) : null}
          {waHref ? (
            <a href={waHref} className="glass-btn" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon size={16} />
              واتساب
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <div dir="rtl">
          <TooltipProvider>
            <Toaster position="top-center" />
            <Router />
            <FloatingWhatsApp />
            <GlobalStickyBar />
          </TooltipProvider>
          <style>{`
            .wa-float {
              position: fixed;
              right: 22px;
              bottom: 22px;
              z-index: 70;
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 9px 12px;
              border-radius: 999px;
              background: linear-gradient(135deg, #1ab055 0%, #25d366 55%, #42e08c 100%);
              color: #0b2014;
              font-weight: 600;
              letter-spacing: 0.01em;
              box-shadow: 0 14px 40px rgba(37, 211, 102, 0.38);
              border: 1px solid rgba(255,255,255,0.26);
              isolation: isolate;
              overflow: hidden;
              position: relative;
              transition: transform 200ms ease, box-shadow 200ms ease;
              animation: wa-float 3.2s ease-in-out infinite, wa-pulse 2.8s ease-out infinite;
            }
            .wa-float::before {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: inherit;
              background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.55) 45%, transparent 70%);
              transform: translateX(-120%);
              animation: wa-shine 3.6s ease-in-out infinite;
              opacity: 0.45;
              pointer-events: none;
            }
            .wa-float:hover {
              transform: translateY(-2px) scale(1.02);
              box-shadow: 0 22px 60px rgba(37, 211, 102, 0.55);
            }
            .wa-text { font-size: 12px; }
            @media (max-width: 768px) {
              .wa-float {
                left: 14px;
                right: auto;
                bottom: 92px;
                padding: 8px 10px;
              }
              .wa-text { font-size: 11px; }
            }
            @keyframes wa-shine {
              0% { transform: translateX(-120%); }
              55% { transform: translateX(120%); }
              100% { transform: translateX(120%); }
            }
            @keyframes wa-float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            @keyframes wa-pulse {
              0% {
                box-shadow: 0 14px 40px rgba(37, 211, 102, 0.38), 0 0 0 0 rgba(37,211,102,0.45);
              }
              70% {
                box-shadow: 0 14px 40px rgba(37, 211, 102, 0.38), 0 0 0 16px rgba(37,211,102,0);
              }
              100% {
                box-shadow: 0 14px 40px rgba(37, 211, 102, 0.38), 0 0 0 0 rgba(37,211,102,0);
              }
            }

            .glass-bar {
              position: fixed;
              left: 0;
              right: 0;
              bottom: calc(env(safe-area-inset-bottom) + 16px);
              z-index: 65;
              pointer-events: none;
            }
            .glass-bar-inner {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 10px;
              pointer-events: auto;
            }
            .glass-btn {
              height: 44px;
              border-radius: 14px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              font-weight: 600;
              letter-spacing: 0.02em;
              color: rgba(247,228,191,0.95);
              background:
                linear-gradient(135deg, rgba(255,215,140,0.12), rgba(255,200,120,0.08)),
                linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0));
              border: 1px solid rgba(255,220,170,0.28);
              box-shadow:
                0 16px 40px rgba(0,0,0,0.35),
                inset 0 0 0 1px rgba(255,255,255,0.18);
              position: relative;
              overflow: hidden;
              backdrop-filter: blur(12px) saturate(130%);
              -webkit-backdrop-filter: blur(12px) saturate(130%);
              transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
            }
            .glass-btn::after {
              content: "";
              position: absolute;
              inset: -40% -10%;
              background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.30) 48%, transparent 72%);
              transform: translateX(-120%);
              animation: glass-shine 9s ease-in-out infinite;
              opacity: 0.22;
              pointer-events: none;
            }
            .glass-btn:hover {
              transform: translateY(-1px);
              border-color: rgba(255,220,170,0.45);
              box-shadow: 0 18px 50px rgba(0,0,0,0.45);
            }
            @keyframes glass-shine {
              0% { transform: translateX(-120%); }
              75% { transform: translateX(120%); }
              100% { transform: translateX(120%); }
            }

          `}</style>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

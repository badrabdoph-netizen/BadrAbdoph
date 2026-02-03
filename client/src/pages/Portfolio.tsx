import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ZoomIn, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { siteImages, pageTexts } from "@/config/siteConfig";

type GalleryItem = {
  src: string;
  title: string;
  category?: string;
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const gallery = useMemo<GalleryItem[]>(() => {
    return (siteImages.portfolioGallery ?? []) as GalleryItem[];
  }, []);

  const filtered = useMemo(() => {
    return activeCategory === "all"
      ? gallery
      : gallery.filter((img) => img.category === activeCategory);
  }, [activeCategory, gallery]);

  // Lightbox state: store index inside "filtered"
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isOpen = openIndex !== null;
  const current = isOpen ? filtered[openIndex!] : null;

  // Lock body scroll when modal open
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape + arrows on desktop
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, openIndex, filtered]);

  const clampIndex = (i: number) => {
    if (filtered.length === 0) return 0;
    if (i < 0) return filtered.length - 1;
    if (i >= filtered.length) return 0;
    return i;
  };

  const next = () => {
    if (openIndex === null) return;
    setOpenIndex(clampIndex(openIndex + 1));
  };

  const prev = () => {
    if (openIndex === null) return;
    setOpenIndex(clampIndex(openIndex - 1));
  };

  // ✅ Touch gestures for mobile: swipe down = close, swipe left/right = next/prev
  const touchRef = useRef({
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    active: false,
    mode: "" as "" | "vertical" | "horizontal",
  });

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x0: t.clientX, y0: t.clientY, x1: t.clientX, y1: t.clientY, active: true, mode: "" };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchRef.current.active) return;
    const t = e.touches[0];
    touchRef.current.x1 = t.clientX;
    touchRef.current.y1 = t.clientY;

    const dx = touchRef.current.x1 - touchRef.current.x0;
    const dy = touchRef.current.y1 - touchRef.current.y0;

    // decide gesture direction once
    if (!touchRef.current.mode) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) touchRef.current.mode = "vertical";
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) touchRef.current.mode = "horizontal";
    }
  };

  const onTouchEnd = () => {
    if (!touchRef.current.active) return;

    const dx = touchRef.current.x1 - touchRef.current.x0;
    const dy = touchRef.current.y1 - touchRef.current.y0;

    // close on swipe down
    if (touchRef.current.mode === "vertical" && dy > 90) {
      setOpenIndex(null);
    }

    // next/prev on horizontal swipe
    if (touchRef.current.mode === "horizontal" && Math.abs(dx) > 70) {
      // dx < 0 means swipe left => next
      if (dx < 0) next();
      else prev();
    }

    touchRef.current.active = false;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <header className="pt-32 pb-10 bg-card relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_50%_15%,rgba(255,200,80,0.10),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/20 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground/80">
              لقطات مختارة • ستايل فاخر • تفاصيل
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {pageTexts.portfolio.title}
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
            {pageTexts.portfolio.subtitle}
          </p>
        </div>
      </header>

      {/* Category chips */}
      <section
        className="sticky z-30 bg-background/75 backdrop-blur-md border-y border-white/10"
        style={{ top: "var(--nav-offset, 96px)" }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {pageTexts.portfolio.categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={[
                    "shrink-0 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full tap-target",
                    "border",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-black/15 border-white/10 text-foreground/80 hover:border-primary/35 hover:text-primary",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((img, index) => (
              <button
                key={`${img.src}-${index}`}
                className="relative group overflow-hidden cursor-pointer bg-gray-900 aspect-[3/4] border border-white/5 hover:border-primary/25 transition-colors premium-border"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open ${img.title}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0 opacity-90 md:opacity-70 md:group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                  <span className="text-white/90 text-xs md:text-sm tracking-wide text-center translate-y-4 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500">
                    {img.title}
                  </span>
                  <ZoomIn className="text-white w-7 h-7 mt-2 translate-y-4 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-500 delay-75" />
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground mt-14">
              لا يوجد صور في هذا التصنيف حالياً.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
        >
          {/* Top bar */}
          <div className="absolute top-4 left-4 right-4 z-[80] flex items-center justify-between gap-3">
            <div className="text-white/85 text-sm line-clamp-1">
              {current.title}
              <span className="text-white/40 mx-2">•</span>
              <span className="text-white/60">
                {openIndex! + 1} / {filtered.length}
              </span>
            </div>

            <button
              className="w-12 h-12 border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-colors tap-target"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(null);
              }}
              aria-label="Close"
            >
              <X size={26} />
            </button>
          </div>

          {/* Prev/Next big tap targets */}
          <button
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-[80] w-12 h-12 border border-white/10 bg-white/5 backdrop-blur-md items-center justify-center text-white/80 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>

          <button
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-[80] w-12 h-12 border border-white/10 bg-white/5 backdrop-blur-md items-center justify-center text-white/80 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <ChevronRight />
          </button>

          {/* Image container (gestures) */}
          <div
            className="max-w-full max-h-[88vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={current.src}
              alt={current.title}
              className="max-w-full max-h-[88vh] object-contain shadow-2xl select-none"
              draggable={false}
            />
          </div>

          {/* Mobile hint */}
          <div className="md:hidden absolute bottom-4 left-4 right-4 z-[80] text-center text-xs text-white/55">
            اسحب لتحت للإغلاق • اسحب يمين/شمال للتنقل
          </div>
        </div>
      )}

      <style>{`
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

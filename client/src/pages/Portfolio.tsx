import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ZoomIn, Sparkles } from "lucide-react";
import { siteImages, pageTexts } from "@/config/siteConfig";
import SmartImage from "@/components/SmartImage";

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title?: string;
  } | null>(null);

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = useMemo(() => {
    return activeCategory === "all"
      ? siteImages.portfolioGallery
      : siteImages.portfolioGallery.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (!selectedImage) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

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

      <section className="sticky top-[76px] z-30 bg-background/75 backdrop-blur-md border-y border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {pageTexts.portfolio.categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={[
                    "shrink-0 px-4 py-2 text-sm font-medium transition-all duration-200",
                    "border",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-black/15 border-white/10 text-foreground/80 hover:border-primary/35 hover:text-primary",
                    "rounded-full",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredImages.map((img, index) => (
              <button
                key={`${img.src}-${index}`}
                className="relative group overflow-hidden cursor-pointer bg-gray-900 aspect-[3/4] border border-white/5 hover:border-primary/25 transition-colors premium-border"
                onClick={() => setSelectedImage({ src: img.src, title: img.title })}
                aria-label={`Open ${img.title}`}
              >
                <SmartImage
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
            <div className="text-white/80 text-sm line-clamp-1">
              {selectedImage.title ?? ""}
            </div>

            <button
              className="w-12 h-12 border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X size={26} />
            </button>
          </div>

          <SmartImage
            src={selectedImage.src}
            alt={selectedImage.title ?? "Full size"}
            className="max-w-full max-h-[88vh] object-contain shadow-2xl animate-in zoom-in-95 duration-200"
            priority
            onClick={(e) => e.stopPropagation()}
            sizes="100vw"
          />
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

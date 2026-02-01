import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ZoomIn } from "lucide-react";
import { siteImages, pageTexts } from "@/config/siteConfig";
import { trpc } from "@/lib/trpc";

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: dbPortfolio } = trpc.portfolio.getAll.useQuery(undefined, {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const gallery = useMemo(() => {
    if (dbPortfolio && dbPortfolio.length > 0) {
      return dbPortfolio
        .filter((img) => img.visible)
        .map((img) => ({
          src: img.url,
          category: img.category,
          title: img.title,
        }));
    }
    return siteImages.portfolioGallery;
  }, [dbPortfolio]);

  const filteredImages = activeCategory === "all"
    ? gallery
    : gallery.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <header className="pt-40 pb-12 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ fontFamily: "'Amiri', serif" }}>{pageTexts.portfolio.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {pageTexts.portfolio.subtitle}
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <section className="py-8 bg-card border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {pageTexts.portfolio.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent border border-white/20 text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((img, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden cursor-pointer bg-gray-900 aspect-[4/5]"
                onClick={() => setSelectedImage(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <span className="text-primary text-sm tracking-widest uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.title}</span>
                  <ZoomIn className="text-white w-8 h-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

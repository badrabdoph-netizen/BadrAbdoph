import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Camera, Heart, Film } from "lucide-react";
import { photographerInfo, aboutContent, siteImages } from "@/config/siteConfig";

export default function About() {
  const iconMap = {
    film: Film,
    heart: Heart,
    camera: Camera,
  } as const;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <Navbar />

      {/* Header */}
      <header className="pt-40 pb-20 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 transform translate-x-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {aboutContent.subtitle}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {aboutContent.headerLead}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 border-2 border-primary transform translate-x-4 translate-y-4 hidden md:block"></div>
              <img
                src={siteImages.aboutImage}
                alt="Badr Photography"
                className="w-full h-[600px] object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="space-y-8 text-right">
              <h2
                className="text-3xl md:text-4xl font-bold text-primary"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                {photographerInfo.name}
              </h2>
              <h3 className="text-xl text-muted-foreground">
                {photographerInfo.title}
              </h3>

              <div className="prose prose-invert prose-lg max-w-none">
                {aboutContent.fullStory.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="border-r-4 border-primary pr-4 italic text-muted-foreground whitespace-pre-line">
                {aboutContent.philosophy}
              </blockquote>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                {aboutContent.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <span className="text-2xl font-bold text-primary block">
                      {stat.number}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            {aboutContent.whyChooseMe.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutContent.whyChooseMe.cards.map((card, idx) => {
              const Icon = iconMap[card.iconKey as keyof typeof iconMap] ?? Camera;
              return (
                <div
                  key={idx}
                  className="bg-background p-8 border border-white/5 hover:border-primary/50 transition-colors duration-300"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3
                    className="text-xl font-bold mb-4 text-primary"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2
          className="text-3xl font-bold mb-8"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          {aboutContent.cta.title}
        </h2>
        <Link href="/contact">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg rounded-none"
          >
            {aboutContent.cta.button}
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

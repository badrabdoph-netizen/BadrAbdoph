import { Link } from "wouter";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { photographerInfo, contactInfo, socialLinks, navLinks } from "@/config/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <Link
              href="/"
              className="text-3xl font-bold tracking-wider text-foreground mb-4 block"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {photographerInfo.brandName.replace('.', '')}<span className="text-primary">.</span>PH
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed mb-6">
              {photographerInfo.descriptionAr}
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h3 className="text-lg font-semibold text-foreground mb-6" style={{ fontFamily: "'Amiri', serif" }}>روابط سريعة</h3>
            <ul className="space-y-3">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h3 className="text-lg font-semibold text-foreground mb-6" style={{ fontFamily: "'Amiri', serif" }}>معلومات التواصل</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 space-x-reverse justify-center md:justify-start">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground" dir="ltr">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse justify-center md:justify-start">
                <Mail size={18} className="text-primary" />
                <span className="text-muted-foreground">{contactInfo.email}</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse justify-center md:justify-start">
                <MapPin size={18} className="text-primary" />
                <span className="text-muted-foreground">{contactInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} {photographerInfo.name} Photography. جميع الحقوق محفوظة.</p>
          <p className="mt-2 md:mt-0">Designed with Luxury & Passion</p>
        </div>
      </div>
    </footer>
  );
}

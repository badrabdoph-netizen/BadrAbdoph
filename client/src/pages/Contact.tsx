import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Instagram, Facebook, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { contactInfo, socialLinks, pageTexts, ctaTexts } from "@/config/siteConfig";
import { useContactInfoMap } from "@/hooks/useContactInfoMap";

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صحيح" }),
  date: z.string().min(1, { message: "يرجى اختيار التاريخ" }),
  message: z.string().optional(),
});

export default function Contact() {
  const { get } = useContactInfoMap();

  const phone = get("phone", contactInfo.phone);
  const whatsapp = get("whatsapp", contactInfo.whatsappNumber);
  const email = get("email", contactInfo.email);
  const location = get("location", contactInfo.location);
  const instagram = get("instagram", socialLinks.instagram);
  const facebook = get("facebook", socialLinks.facebook);
  const tiktok = get("tiktok", socialLinks.tiktok);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: "",
      message: "",
    },
  });

  // Use tRPC mutation for contact form submission
  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success("تم إرسال طلبك بنجاح! سنتواصل معك قريباً.");
        form.reset();
      }
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
      console.error("Contact form error:", error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitContact.mutate(values);
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <header className="pt-40 pb-12 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ fontFamily: "'Amiri', serif" }}>{pageTexts.contact.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {pageTexts.contact.subtitle}
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary" style={{ fontFamily: "'Amiri', serif" }}>{pageTexts.contact.infoTitle}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {pageTexts.contact.infoDescription}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-card border border-white/10 flex items-center justify-center text-primary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">الهاتف / واتساب</h4>
                      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors dir-ltr block text-right">
                        {phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-card border border-white/10 flex items-center justify-center text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">البريد الإلكتروني</h4>
                      <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-card border border-white/10 flex items-center justify-center text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">الموقع</h4>
                      <p className="text-muted-foreground">{location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Amiri', serif" }}>تابعنا على</h2>
                <div className="flex space-x-4 space-x-reverse">
                  <a href={instagram} target="_blank" rel="noreferrer" className="w-14 h-14 bg-card border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                    <Instagram size={24} />
                  </a>
                  <a href={facebook} target="_blank" rel="noreferrer" className="w-14 h-14 bg-card border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                    <Facebook size={24} />
                  </a>
                  <a href={tiktok} target="_blank" rel="noreferrer" className="w-14 h-14 bg-card border border-white/10 flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 md:p-10 border border-white/5">
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Amiri', serif" }}>{pageTexts.contact.formTitle}</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم بالكامل</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسمك" {...field} className="bg-background border-white/10 focus:border-primary h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input placeholder="01xxxxxxxxx" {...field} className="bg-background border-white/10 focus:border-primary h-12 text-right" dir="ltr" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاريخ المناسبة (تقريبي)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="bg-background border-white/10 focus:border-primary h-12 text-right" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تفاصيل إضافية (اختياري)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="أخبرنا المزيد عن مناسبتك..." 
                            className="bg-background border-white/10 focus:border-primary min-h-[120px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg rounded-none mt-4" 
                    disabled={submitContact.isPending}
                  >
                    {submitContact.isPending ? "جاري الإرسال..." : ctaTexts.sendRequest}
                    {!submitContact.isPending && <Send size={18} className="mr-2" />}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${whatsapp}`}
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        title="تواصل عبر واتساب"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
      </a>

      <Footer />
    </div>
  );
}

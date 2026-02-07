import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Image, 
  FileText, 
  Settings, 
  Package, 
  MessageSquare, 
  Phone, 
  Upload,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Save,
  Loader2,
  LayoutGrid,
  Home,
  Monitor,
  Link2,
  Clock,
  Copy,
} from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  return <AdminDashboard />;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
            <span className="text-sm text-muted-foreground">مرحباً، المدير</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 ml-2" />
                الموقع
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full max-w-6xl mx-auto">
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">المعرض</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">النصوص</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">الباقات</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">الآراء</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">التواصل</span>
            </TabsTrigger>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">الأقسام</span>
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              <span className="hidden sm:inline">روابط مؤقتة</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">المعاينة</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <PortfolioManager />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentManager />
          </TabsContent>
          
          <TabsContent value="packages">
            <PackagesManager />
          </TabsContent>
          
          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactManager />
          </TabsContent>
          
          <TabsContent value="sections">
            <SectionsManager />
          </TabsContent>

          <TabsContent value="share">
            <ShareLinksManager />
          </TabsContent>

          <TabsContent value="preview">
            <PreviewPane />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ============================================
// Portfolio Manager Component
// ============================================
function PortfolioManager() {
  const { data: images, refetch, isLoading } = trpc.portfolio.getAll.useQuery();
  const createMutation = trpc.portfolio.upload.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة الصورة بنجاح");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });
  const updateMutation = trpc.portfolio.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الصورة");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });
  const deleteMutation = trpc.portfolio.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الصورة");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const [newImage, setNewImage] = useState({ title: "", category: "wedding", file: null as File | null });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage({ ...newImage, file });
    }
  };

  const handleUpload = async () => {
    if (!newImage.file || !newImage.title) {
      toast.error("يرجى إدخال العنوان واختيار صورة");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      await createMutation.mutateAsync({
        title: newImage.title,
        base64,
        mimeType: newImage.file!.type,
        category: newImage.category,
      });
      setNewImage({ title: "", category: "wedding", file: null });
    };
    reader.readAsDataURL(newImage.file);
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            إضافة صورة جديدة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="عنوان الصورة"
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={newImage.category}
              onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
            >
              <option value="wedding">زفاف</option>
              <option value="engagement">خطوبة</option>
              <option value="outdoor">جلسات خارجية</option>
              <option value="portrait">بورتريه</option>
            </select>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <Button onClick={handleUpload} disabled={createMutation.isPending}>
            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Upload className="w-4 h-4 ml-2" />}
            رفع الصورة
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => updateMutation.mutate({ id: image.id, visible: !image.visible })}
                >
                  {image.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteMutation.mutate({ id: image.id })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate">{image.title}</p>
              <p className="text-xs text-muted-foreground">{image.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!images || images.length === 0) && (
        <div className="text-center py-12 text-muted-foreground">
          <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>لا توجد صور في المعرض بعد</p>
          <p className="text-sm">قم بإضافة صور جديدة من الأعلى</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// Content Manager Component
// ============================================
function ContentManager() {
  const { data: content, refetch, isLoading } = trpc.siteContent.getAll.useQuery();
  const upsertMutation = trpc.siteContent.upsert.useMutation({
    onSuccess: () => {
      toast.success("تم حفظ التغييرات");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const [editingContent, setEditingContent] = useState<Record<string, string>>({});

  useEffect(() => {
    if (content) {
      const contentMap: Record<string, string> = {};
      content.forEach((item) => {
        contentMap[item.key] = item.value;
      });
      setEditingContent(contentMap);
    }
  }, [content]);

  const handleSave = async (key: string, category: string, label?: string) => {
    await upsertMutation.mutateAsync({
      key,
      value: editingContent[key] || "",
      category,
      label,
    });
  };

  // Default content structure
  const defaultContent = [
    { key: "hero_title", label: "عنوان الصفحة الرئيسية", category: "home" },
    { key: "hero_subtitle", label: "العنوان الفرعي", category: "home" },
    { key: "hero_description", label: "الوصف", category: "home" },
    { key: "about_title", label: "عنوان صفحة من أنا", category: "about" },
    { key: "about_description", label: "وصف صفحة من أنا", category: "about" },
    { key: "cta_title", label: "عنوان قسم الدعوة للتواصل", category: "cta" },
    { key: "cta_description", label: "وصف قسم الدعوة للتواصل", category: "cta" },
  ];

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>تعديل النصوص</CardTitle>
          <CardDescription>قم بتعديل نصوص الموقع مباشرة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {defaultContent.map((item) => (
            <div key={item.key} className="space-y-2">
              <Label>{item.label}</Label>
              <div className="flex gap-2">
                <Textarea
                  value={editingContent[item.key] || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, [item.key]: e.target.value })}
                  placeholder={item.label}
                  rows={2}
                />
                <Button
                  size="icon"
                  onClick={() => handleSave(item.key, item.category, item.label)}
                  disabled={upsertMutation.isPending}
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// Packages Manager Component
// ============================================
function PackagesManager() {
  const { data: packages, refetch, isLoading } = trpc.packages.getAll.useQuery();
  const createMutation = trpc.packages.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة الباقة");
      refetch();
      setNewPackage({ name: "", price: "", description: "", category: "session", features: "" });
    },
    onError: (error) => toast.error(error.message),
  });
  const updateMutation = trpc.packages.update.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الباقة");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });
  const deleteMutation = trpc.packages.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الباقة");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    description: "",
    category: "session",
    features: "",
  });

  const handleCreate = async () => {
    if (!newPackage.name || !newPackage.price) {
      toast.error("يرجى إدخال اسم الباقة والسعر");
      return;
    }
    await createMutation.mutateAsync({
      name: newPackage.name,
      price: newPackage.price,
      description: newPackage.description,
      category: newPackage.category,
      features: newPackage.features.split("\n").filter(Boolean),
    });
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            إضافة باقة جديدة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="اسم الباقة"
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
            />
            <Input
              placeholder="السعر (مثال: $500)"
              value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>تصنيف الباقة</Label>
              <select
                value={newPackage.category}
                onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
                className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
              >
                <option value="session">جلسات التصوير</option>
                <option value="prints">جلسات + مطبوعات</option>
                <option value="wedding">Full Day</option>
                <option value="addon">إضافات</option>
              </select>
            </div>
          </div>
          <Textarea
            placeholder="وصف الباقة"
            value={newPackage.description}
            onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
          />
          <Textarea
            placeholder="المميزات (كل ميزة في سطر جديد)"
            value={newPackage.features}
            onChange={(e) => setNewPackage({ ...newPackage, features: e.target.value })}
            rows={4}
          />
          <Button onClick={handleCreate} disabled={createMutation.isPending}>
            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
            إضافة الباقة
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages?.map((pkg) => (
          <Card key={pkg.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <p className="text-2xl font-bold text-primary mt-2">{pkg.price}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    التصنيف: {pkg.category ?? "session"}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => updateMutation.mutate({ id: pkg.id, visible: !pkg.visible })}
                  >
                    {pkg.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteMutation.mutate({ id: pkg.id })}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
              {pkg.features && (
                <ul className="text-sm space-y-1">
                  {(pkg.features as string[]).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {(!packages || packages.length === 0) && (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>لا توجد باقات بعد</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// Testimonials Manager Component
// ============================================
function TestimonialsManager() {
  const { data: testimonials, refetch, isLoading } = trpc.testimonials.getAll.useQuery();
  const createMutation = trpc.testimonials.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة الرأي");
      refetch();
      setNewTestimonial({ name: "", quote: "" });
    },
    onError: (error) => toast.error(error.message),
  });
  const deleteMutation = trpc.testimonials.delete.useMutation({
    onSuccess: () => {
      toast.success("تم حذف الرأي");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const [newTestimonial, setNewTestimonial] = useState({ name: "", quote: "" });

  const handleCreate = async () => {
    if (!newTestimonial.name || !newTestimonial.quote) {
      toast.error("يرجى إدخال الاسم والرأي");
      return;
    }
    await createMutation.mutateAsync(newTestimonial);
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            إضافة رأي عميل
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="اسم العميل"
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
          />
          <Textarea
            placeholder="رأي العميل"
            value={newTestimonial.quote}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
            rows={3}
          />
          <Button onClick={handleCreate} disabled={createMutation.isPending}>
            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
            إضافة الرأي
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials?.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold">- {testimonial.name}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteMutation.mutate({ id: testimonial.id })}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!testimonials || testimonials.length === 0) && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>لا توجد آراء عملاء بعد</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// Contact Manager Component
// ============================================
function ContactManager() {
  const { data: contactInfo, refetch, isLoading } = trpc.contactInfo.getAll.useQuery();
  const upsertMutation = trpc.contactInfo.upsert.useMutation({
    onSuccess: () => {
      toast.success("تم حفظ التغييرات");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const [editingContact, setEditingContact] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contactInfo) {
      const contactMap: Record<string, string> = {};
      contactInfo.forEach((item) => {
        contactMap[item.key] = item.value;
      });
      setEditingContact(contactMap);
    }
  }, [contactInfo]);

  const handleSave = async (key: string, label: string) => {
    await upsertMutation.mutateAsync({
      key,
      value: editingContact[key] || "",
      label,
    });
  };

  const contactFields = [
    { key: "phone", label: "رقم الهاتف" },
    { key: "whatsapp", label: "رقم الواتساب" },
    { key: "email", label: "البريد الإلكتروني" },
    { key: "location", label: "الموقع" },
    { key: "instagram", label: "رابط إنستجرام" },
    { key: "facebook", label: "رابط فيسبوك" },
    { key: "tiktok", label: "رابط تيك توك" },
  ];

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>معلومات التواصل</CardTitle>
          <CardDescription>قم بتحديث معلومات التواصل وروابط السوشيال ميديا</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactFields.map((field) => (
            <div key={field.key} className="flex gap-2 items-center">
              <Label className="w-32 shrink-0">{field.label}</Label>
              <Input
                value={editingContact[field.key] || ""}
                onChange={(e) => setEditingContact({ ...editingContact, [field.key]: e.target.value })}
                placeholder={field.label}
                dir="ltr"
              />
              <Button
                size="icon"
                onClick={() => handleSave(field.key, field.label)}
                disabled={upsertMutation.isPending}
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// Sections Manager Component
// ============================================
function SectionsManager() {
  const { data: sections, refetch, isLoading } = trpc.sections.getAll.useQuery();
  const upsertMutation = trpc.sections.upsert.useMutation({
    onSuccess: () => {
      toast.success("تم حفظ التغييرات");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });
  const toggleMutation = trpc.sections.toggleVisibility.useMutation({
    onSuccess: () => {
      toast.success("تم تحديث الإعدادات");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  // Initialize default sections if empty
  useEffect(() => {
    if (sections && sections.length === 0) {
      const defaultSections = [
        { key: "hero", name: "القسم الرئيسي (Hero)", page: "home", sortOrder: 1 },
        { key: "about_preview", name: "قسم من أنا", page: "home", sortOrder: 2 },
        { key: "portfolio_preview", name: "معرض الأعمال", page: "home", sortOrder: 3 },
        { key: "services_preview", name: "الخدمات", page: "home", sortOrder: 4 },
        { key: "testimonials", name: "آراء العملاء", page: "home", sortOrder: 5 },
        { key: "cta", name: "قسم الدعوة للتواصل", page: "home", sortOrder: 6 },
      ];
      defaultSections.forEach((section) => {
        upsertMutation.mutate({ ...section, visible: true });
      });
    }
  }, [sections]);

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  const defaultSections = [
    { key: "hero", name: "القسم الرئيسي (Hero)", page: "home" },
    { key: "about_preview", name: "قسم من أنا", page: "home" },
    { key: "portfolio_preview", name: "معرض الأعمال", page: "home" },
    { key: "services_preview", name: "الخدمات", page: "home" },
    { key: "testimonials", name: "آراء العملاء", page: "home" },
    { key: "cta", name: "قسم الدعوة للتواصل", page: "home" },
  ];

  const getSectionVisibility = (key: string) => {
    const section = sections?.find((s) => s.key === key);
    return section?.visible ?? true;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الأقسام</CardTitle>
          <CardDescription>تحكم في إظهار أو إخفاء أقسام الموقع</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {defaultSections.map((section) => (
            <div key={section.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{section.name}</p>
                <p className="text-sm text-muted-foreground">الصفحة: {section.page === "home" ? "الرئيسية" : section.page}</p>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor={section.key} className="text-sm">
                  {getSectionVisibility(section.key) ? "ظاهر" : "مخفي"}
                </Label>
                <Switch
                  id={section.key}
                  checked={getSectionVisibility(section.key)}
                  onCheckedChange={(checked) => {
                    toggleMutation.mutate({ key: section.key, visible: checked });
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// Share Links Manager Component
// ============================================
type ShareLinkItem = {
  token: string;
  url: string;
  expiresAt: string;
  createdAt: string;
  note?: string | null;
};

const SHARE_LINKS_STORAGE_KEY = "badr_share_links_cache";

function loadCachedShareLinks(): ShareLinkItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SHARE_LINKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ShareLinkItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistShareLinks(links: ShareLinkItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SHARE_LINKS_STORAGE_KEY, JSON.stringify(links));
  } catch {
    // ignore storage errors
  }
}

function formatShareDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "غير محدد";
  return new Intl.DateTimeFormat("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function ShareLinksManager() {
  const [ttlHours, setTtlHours] = useState(24);
  const [note, setNote] = useState("");
  const [links, setLinks] = useState<ShareLinkItem[]>(() => loadCachedShareLinks());

  useEffect(() => {
    persistShareLinks(links);
  }, [links]);

  const createMutation = trpc.shareLinks.create.useMutation({
    onSuccess: (data) => {
      const origin = window.location.origin;
      const url = `${origin}/share/${data.token}`;
      const item: ShareLinkItem = {
        token: data.token,
        url,
        expiresAt: data.expiresAt,
        createdAt: new Date().toISOString(),
        note: data.note ?? (note.trim() || null),
      };

      setLinks(prev => [item, ...prev].slice(0, 12));
      setNote("");
      toast.success("تم إنشاء الرابط المؤقت");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleCreate = () => {
    if (!Number.isFinite(ttlHours) || ttlHours < 1) {
      toast.error("يرجى إدخال مدة صحيحة بالساعات");
      return;
    }
    createMutation.mutate({ ttlHours, note: note.trim() || undefined });
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("تم نسخ الرابط");
    } catch {
      toast.error("تعذر نسخ الرابط");
    }
  };

  const handleRemove = (token: string) => {
    setLinks(prev => prev.filter(link => link.token !== token));
  };

  const now = Date.now();
  const sortedLinks = [...links].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            إنشاء رابط مؤقت
          </CardTitle>
          <CardDescription>
            أنشئ رابط مشاركة ينتهي تلقائياً بعد مدة محددة.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="share-ttl">المدة (بالساعات)</Label>
              <Input
                id="share-ttl"
                type="number"
                min={1}
                max={168}
                value={ttlHours}
                onChange={(e) => setTtlHours(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="share-note">ملاحظة (اختياري)</Label>
              <Input
                id="share-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="مثال: لينك لمعاينة جلسة جديدة"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setTtlHours(1)}
            >
              ساعة واحدة
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setTtlHours(24)}
            >
              24 ساعة
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setTtlHours(72)}
            >
              3 أيام
            </Button>
          </div>
          <Button onClick={handleCreate} disabled={createMutation.isPending}>
            {createMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin ml-2" />
            ) : (
              <Link2 className="w-4 h-4 ml-2" />
            )}
            إنشاء الرابط
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            الروابط التي أنشأتها
          </CardTitle>
          <CardDescription>
            هذه القائمة محفوظة على المتصفح الحالي فقط.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sortedLinks.length === 0 && (
            <div className="text-sm text-muted-foreground">
              لم يتم إنشاء أي روابط بعد.
            </div>
          )}

          {sortedLinks.map((link) => {
            const expiresAtMs = new Date(link.expiresAt).getTime();
            const isExpired = Number.isNaN(expiresAtMs)
              ? false
              : expiresAtMs <= now;

            return (
              <div
                key={link.token}
                className="flex flex-col gap-3 rounded-lg border border-border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={isExpired ? "destructive" : "secondary"}>
                      {isExpired ? "منتهي" : "ساري"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      ينتهي في {formatShareDate(link.expiresAt)}
                    </span>
                  </div>
                  {link.note && (
                    <div className="text-sm text-muted-foreground">
                      {link.note}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground dir-ltr break-all">
                    {link.url}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopy(link.url)}
                  >
                    <Copy className="w-4 h-4 ml-2" />
                    نسخ
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemove(link.token)}
                  >
                    <Trash2 className="w-4 h-4 ml-2" />
                    حذف
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// Preview Pane Component
// ============================================
function PreviewPane() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>معاينة الموقع</CardTitle>
        <CardDescription>شاهد الموقع كما يظهر للزوار بعد أي تعديل</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <iframe
            src="/"
            title="Site Preview"
            className="w-full h-[70vh] bg-background"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          لو عايز معاينة كاملة بملء الشاشة، افتح الموقع في تبويب جديد.
        </p>
      </CardContent>
    </Card>
  );
}

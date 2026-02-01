import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  ArrowUp,
  ArrowDown,
  Pencil,
  Save,
  Loader2,
  LayoutGrid,
  Home,
  LogOut
} from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { aboutContent, pageTexts, photographerInfo } from "@/config/siteConfig";

export default function Admin() {
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();
  
  // Check if user is admin
  const isAdmin = user?.role === "admin";

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">لوحة التحكم</CardTitle>
            <CardDescription>يرجى تسجيل الدخول للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>
          <CardContent>
            <a href={getLoginUrl()}>
              <Button className="w-full" size="lg">
                تسجيل الدخول
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">غير مصرح</CardTitle>
            <CardDescription>ليس لديك صلاحية للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              هذه الصفحة متاحة فقط لصاحب الموقع.
            </p>
            <Link href="/">
              <Button variant="outline" className="w-full">
                العودة للصفحة الرئيسية
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminDashboard user={user} logout={logout} />;
}

function AdminDashboard({ user, logout }: { user: any; logout: () => void }) {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
            <span className="text-sm text-muted-foreground">مرحباً، {user?.name || "المسؤول"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 ml-2" />
                الموقع
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 ml-2" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl mx-auto">
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

  const fallbackByKey: Record<string, string> = {
    hero_title: photographerInfo.taglineAr,
    hero_subtitle: photographerInfo.title,
    hero_description: photographerInfo.descriptionAr,
    about_title: aboutContent.title,
    about_description: aboutContent.description,
    cta_title: pageTexts.home.ctaTitle,
    cta_description: pageTexts.home.ctaDescription,
  };

  useEffect(() => {
    const contentMap: Record<string, string> = { ...fallbackByKey };
    (content ?? []).forEach((item) => {
      contentMap[item.key] = item.value;
    });
    setEditingContent(contentMap);
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
      setNewPackage({ name: "", price: "", description: "", category: "session", features: "", popular: false });
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
    popular: false,
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
      popular: newPackage.popular,
    });
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  const PackageEditDialog = ({ pkg }: { pkg: any }) => {
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState(() => ({
      name: pkg.name ?? "",
      price: pkg.price ?? "",
      description: pkg.description ?? "",
      category: pkg.category ?? "session",
      popular: !!pkg.popular,
      featuresText: Array.isArray(pkg.features) ? (pkg.features as string[]).join("\n") : "",
    }));

    useEffect(() => {
      if (!open) return;
      setDraft({
        name: pkg.name ?? "",
        price: pkg.price ?? "",
        description: pkg.description ?? "",
        category: pkg.category ?? "session",
        popular: !!pkg.popular,
        featuresText: Array.isArray(pkg.features) ? (pkg.features as string[]).join("\n") : "",
      });
    }, [open, pkg]);

    const saveEdits = async () => {
      await updateMutation.mutateAsync({
        id: pkg.id,
        name: draft.name,
        price: draft.price,
        description: draft.description,
        category: draft.category,
        popular: draft.popular,
        features: draft.featuresText
          .split("\n")
          .map((l: string) => l.trim())
          .filter(Boolean),
      });
      setOpen(false);
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost" title="تعديل">
            <Pencil className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تعديل الباقة</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>اسم الباقة</Label>
                <Input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>السعر</Label>
                <Input
                  value={draft.price}
                  onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع الباقة</Label>
                <Select
                  value={draft.category}
                  onValueChange={(value) =>
                    setDraft({ ...draft, category: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="نوع الباقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="session">جلسات تصوير</SelectItem>
                    <SelectItem value="wedding">باقات زفاف</SelectItem>
                    <SelectItem value="addon">خدمات إضافية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الأكثر طلباً</Label>
                <div className="flex items-center justify-between rounded-md border border-white/10 px-3 py-2">
                  <span className="text-sm text-muted-foreground">إظهار شارة</span>
                  <Switch
                    checked={draft.popular}
                    onCheckedChange={(checked) =>
                      setDraft({ ...draft, popular: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>وصف الباقة</Label>
              <Textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>المميزات (كل ميزة في سطر)</Label>
              <Textarea
                value={draft.featuresText}
                onChange={(e) => setDraft({ ...draft, featuresText: e.target.value })}
                rows={6}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="ghost">إلغاء</Button>
            </DialogClose>
            <Button onClick={saveEdits} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
              ) : (
                <Save className="w-4 h-4 ml-2" />
              )}
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

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
            <Select
              value={newPackage.category}
              onValueChange={(value) =>
                setNewPackage({ ...newPackage, category: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="نوع الباقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="session">جلسات تصوير</SelectItem>
                <SelectItem value="wedding">باقات زفاف</SelectItem>
                <SelectItem value="addon">خدمات إضافية</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-between gap-4 rounded-md border border-white/10 px-3 py-2">
              <div className="text-right">
                <Label className="text-sm">تمييز كـ "الأكثر طلباً"</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  يظهر شارة على الباقة في صفحة الخدمات
                </p>
              </div>
              <Switch
                checked={newPackage.popular}
                onCheckedChange={(checked) =>
                  setNewPackage({ ...newPackage, popular: checked })
                }
              />
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
                </div>
                <div className="flex gap-1">
                  <PackageEditDialog pkg={pkg} />
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
    { key: "hero", name: "القسم الرئيسي (Hero)", page: "home", sortOrder: 1 },
    { key: "about_preview", name: "قسم من أنا", page: "home", sortOrder: 2 },
    { key: "portfolio_preview", name: "معرض الأعمال", page: "home", sortOrder: 3 },
    { key: "services_preview", name: "الخدمات", page: "home", sortOrder: 4 },
    { key: "testimonials", name: "آراء العملاء", page: "home", sortOrder: 5 },
    { key: "cta", name: "قسم الدعوة للتواصل", page: "home", sortOrder: 6 },
  ];

  const orderedSections = useMemo(() => {
    const merged = defaultSections.map((section) => {
      const db = sections?.find((s) => s.key === section.key);
      return {
        ...section,
        sortOrder: db?.sortOrder ?? section.sortOrder,
        visible: db?.visible ?? true,
      };
    });
    merged.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    return merged;
  }, [sections]);

  const getSectionVisibility = (key: string) => {
    const section = orderedSections.find((s) => s.key === key);
    return section?.visible ?? true;
  };

  const moveSection = (key: string, direction: -1 | 1) => {
    const currentIndex = orderedSections.findIndex((s) => s.key === key);
    const swapIndex = currentIndex + direction;
    if (currentIndex === -1) return;
    if (swapIndex < 0 || swapIndex >= orderedSections.length) return;

    const a = orderedSections[currentIndex];
    const b = orderedSections[swapIndex];

    // Swap sortOrder values
    upsertMutation.mutate({
      key: a.key,
      name: a.name,
      page: a.page,
      sortOrder: b.sortOrder,
      visible: a.visible,
    });
    upsertMutation.mutate({
      key: b.key,
      name: b.name,
      page: b.page,
      sortOrder: a.sortOrder,
      visible: b.visible,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة الأقسام</CardTitle>
          <CardDescription>تحكم في إظهار أو إخفاء أقسام الموقع</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderedSections.map((section, index) => (
            <div key={section.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{section.name}</p>
                  <p className="text-sm text-muted-foreground">الصفحة: {section.page === "home" ? "الرئيسية" : section.page}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={index === 0}
                  onClick={() => moveSection(section.key, -1)}
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={index === orderedSections.length - 1}
                  onClick={() => moveSection(section.key, 1)}
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
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

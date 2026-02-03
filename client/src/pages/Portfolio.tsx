import { useEffect } from "react";
import { externalPortfolioUrl } from "@/config/siteConfig";

export default function Portfolio() {
  useEffect(() => {
    // ✅ تحويل فوري (بدون ما نعرض محتوى داخلي)
    window.location.replace(externalPortfolioUrl);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-2xl font-bold mb-2">جاري تحويلك للمعرض…</div>
        <p className="text-muted-foreground mb-6">
          لو ما تمش التحويل تلقائيًا، اضغط الزر.
        </p>
        <a
          href={externalPortfolioUrl}
          className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors px-10 py-4 rounded-none"
        >
          فتح المعرض
        </a>
      </div>
    </div>
  );
}

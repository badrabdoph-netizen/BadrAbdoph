import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Link2, Clock, XCircle } from "lucide-react";

type ShareProps = {
  token: string;
};

function formatDateTime(value: string | null | undefined) {
  if (!value) return "غير محدد";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "غير محدد";

  return new Intl.DateTimeFormat("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function Share({ token }: ShareProps) {
  const [, setLocation] = useLocation();
  const {
    data,
    isLoading,
    isError,
  } = trpc.shareLinks.validate.useQuery(
    { token },
    { enabled: Boolean(token) }
  );

  const isValid = Boolean(data?.valid);
  const expiresAt = data?.expiresAt ?? null;

  useEffect(() => {
    if (!isValid) return;
    const timeout = window.setTimeout(() => setLocation("/"), 1400);
    return () => window.clearTimeout(timeout);
  }, [isValid, setLocation]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16" dir="rtl">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            رابط مؤقت للموقع
          </CardTitle>
          <CardDescription>
            لو الرابط صالح هتحول للموقع تلقائياً. لو منتهي هنبلغك هنا.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري التأكد من صلاحية الرابط...
            </div>
          )}

          {!isLoading && isError && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <XCircle className="w-4 h-4" />
              حدث خطأ أثناء التحقق من الرابط.
            </div>
          )}

          {!isLoading && !isError && !isValid && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="w-4 h-4" />
                الرابط منتهي أو غير صالح.
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                لو محتاج رابط جديد اطلبه من صاحب الموقع.
              </div>
            </div>
          )}

          {!isLoading && !isError && isValid && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                صالح حتى {formatDateTime(expiresAt)}
              </div>
              <Button onClick={() => setLocation("/")} className="w-full">
                دخول الموقع الآن
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

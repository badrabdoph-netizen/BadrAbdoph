import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Link2, Clock, XCircle } from "lucide-react";

type ShareProps = {
  token?: string;
  code?: string;
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

export default function Share({ token, code }: ShareProps) {
  const shortQuery = trpc.shareLinks.validateShort.useQuery(
    { code: code ?? "" },
    { enabled: Boolean(code) }
  );
  const tokenQuery = trpc.shareLinks.validate.useQuery(
    { token: token ?? "" },
    { enabled: !code && Boolean(token) }
  );

  const data = code ? shortQuery.data : tokenQuery.data;
  const isLoading = code ? shortQuery.isLoading : tokenQuery.isLoading;
  const isError = code ? shortQuery.isError : tokenQuery.isError;

  const isValid = Boolean(data?.valid);
  const expiresAt = data?.expiresAt ?? null;

  return (
    <div className="min-h-screen bg-background px-4 py-10" dir="rtl">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              رابط مؤقت للموقع
            </CardTitle>
            <CardDescription>
              لو الرابط صالح هتقدر تتصفح الموقع هنا بدون ما يتغير العنوان.
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
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  صالح حتى {formatDateTime(expiresAt)}
                </div>
                <p>
                  تصفح الموقع من الإطار بالأسفل علشان يفضل الرابط المؤقت ظاهر.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {!isLoading && !isError && isValid && (
          <div className="rounded-xl border border-border overflow-hidden bg-background shadow-sm">
            <iframe
              src="/"
              title="Temporary Share Preview"
              className="w-full h-[75vh] md:h-[80vh] bg-background"
            />
          </div>
        )}
      </div>
    </div>
  );
}

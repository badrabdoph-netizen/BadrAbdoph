import { trpc } from "@/lib/trpc";
import { Router, Route, Switch } from "wouter";
import { Loader2, XCircle } from "lucide-react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/NotFound";

type ShareProps = {
  token?: string;
  code?: string;
};

function SiteRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function Share({ token, code }: ShareProps) {
  const shortQuery = trpc.shareLinks.validateShort.useQuery(
    { code: code ?? "" },
    { enabled: Boolean(code), staleTime: 0, refetchOnWindowFocus: true }
  );
  const tokenQuery = trpc.shareLinks.validate.useQuery(
    { token: token ?? "" },
    { enabled: !code && Boolean(token), staleTime: 0, refetchOnWindowFocus: true }
  );

  const data = code ? shortQuery.data : tokenQuery.data;
  const isLoading = code ? shortQuery.isLoading : tokenQuery.isLoading;
  const isError = code ? shortQuery.isError : tokenQuery.isError;

  const isValid = Boolean(data?.valid);
  const basePath = code ? `/s/${code}` : token ? `/share/${token}` : "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          جاري التأكد من صلاحية الرابط...
        </div>
      </div>
    );
  }

  if (isError || !isValid || !basePath) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
        <div className="max-w-md text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-destructive font-semibold">
            <XCircle className="w-5 h-5" />
            الرابط منتهي أو غير صالح.
          </div>
          <p className="text-sm text-muted-foreground">
            اطلب رابط مؤقت جديد من صاحب الموقع.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router base={basePath}>
      <SiteRoutes />
    </Router>
  );
}

import { useEffect, useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [error, setError] = useState<string>("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error ?? "Login failed");
        return;
      }
      setStatus("ok");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Login failed");
    }
  }

  // After login, we show a simple dashboard that links to existing sections.
  // If your project already had admin components, you can wire them here later.
  if (status !== "ok") {
    return (
      <div style={{ maxWidth: 420, margin: "64px auto", padding: 24 }}>
        <h1 style={{ marginBottom: 8 }}>لوحة التحكم</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>ادخل كلمة السر للدخول.</p>
        <form onSubmit={login}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة السر"
            style={{ width: "100%", padding: 12, fontSize: 16, marginTop: 8 }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{ width: "100%", padding: 12, fontSize: 16, marginTop: 12 }}
          >
            {status === "loading" ? "جاري الدخول..." : "دخول"}
          </button>
          {status === "error" && (
            <div style={{ marginTop: 12, color: "crimson" }}>{error}</div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "48px auto", padding: 24 }}>
      <h1>لوحة التحكم</h1>
      <p style={{ opacity: 0.8 }}>
        تم تسجيل الدخول ✅. (في النسخة دي: لوحة تحكم للمحتوى — هنكمّل ربط النماذج واحدة واحدة.)
      </p>
      <ul>
        <li>الصفحة الرئيسية (Hero / About / Services)</li>
        <li>الباقات والأسعار</li>
        <li>آراء العملاء</li>
        <li>بيانات التواصل</li>
      </ul>
      <p style={{ opacity: 0.8 }}>
        لو حابب دلوقتي، قولي أي جزء عايز تعدّله الأول وأنا أربطه مباشرة في اللوحة.
      </p>
    </div>
  );
}

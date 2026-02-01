# تشغيل ونشر المشروع على Railway (بالعربي)

## 1) ارفع المشروع على GitHub
- فك الضغط
- ارفع الملفات للريبو
- اعمل Commit

## 2) على Railway: اربط الريبو واعمل Deploy
النسخة دي فيها `nixpacks.toml` عشان تتفادى مشاكل pnpm في البناء.

## 3) متغيرات البيئة (Variables) المطلوبة
في Railway -> Service -> Variables أضف:

- `DATABASE_URL` = `${{MySQL.MYSQL_URL}}` (أو ربطها Reference من خدمة MySQL)
- `JWT_SECRET` = أي نص طويل (32 حرف أو أكثر)
- `ADMIN_PASSWORD` = كلمة سر لوحة التحكم

> ملاحظة: لو عندك خدمة MySQL على Railway هتلاقي `MYSQL_URL` ضمن المتغيرات، اعمل `DATABASE_URL` Reference لها.

## 4) تهيئة قاعدة البيانات (مرة واحدة فقط)
بعد أول Deploy ناجح:
- افتح Shell/Console (إن متاح) وشغل:
`pnpm db:push`

## 5) لوحة التحكم
افتح:
`/admin`
وادخل كلمة السر من `ADMIN_PASSWORD`.

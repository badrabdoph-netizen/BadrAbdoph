# Badr Photography (Clean + Admin)

## تشغيل على Railway (الأبسط)
1) ارفع هذا المشروع على GitHub.
2) اربط GitHub بـ Railway واعمل Deploy.
3) بعد أول Deploy (حتى لو فشل/اشتغل)، ادخل Railway > Variables واضف:
- DATABASE_URL = Reference إلى MYSQL_URL (أو انسخ رابط MySQL)
- JWT_SECRET = أي نص طويل (32 حرف+)
- ADMIN_PASSWORD = كلمة سر لوحة التحكم

## لوحة التحكم
- افتح: /admin
- اكتب كلمة السر (ADMIN_PASSWORD)

## ملاحظة
هذا الإصدار يستبدل الصور الثقيلة بصور placeholder خفيفة لتناسب الخطة المجانية.

<p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed">
{photographerInfo.descriptionAr}
</p>

          {/* ✅ Buttons updated */}
<div className="flex flex-col sm:flex-row gap-4">
<Link href="/contact">
<Button
@@ -73,15 +71,13 @@ export default function Home() {
{ctaTexts.bookSession}
</Button>
</Link>

            {/* بدل شاهد أعمالي فوق -> عرض التفاصيل والاسعار */}
            <Link href="/services">
            <Link href="/portfolio">
<Button
variant="outline"
size="lg"
className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-none min-w-[180px]"
>
                عرض التفاصيل والاسعار
                {ctaTexts.viewPortfolio}
</Button>
</Link>
</div>
@@ -259,14 +255,12 @@ export default function Home() {
لقطات مختارة
</h2>
</div>

          {/* ✅ هنا نزلنا "شاهد أعمالي" تحت بدل عرض المعرض الكامل */}
<Link href="/portfolio">
<Button
variant="outline"
className="hidden md:flex border-white/20 hover:bg-white hover:text-black rounded-none"
>
              شاهد أعمالي
              عرض المعرض الكامل
</Button>
</Link>
</div>
@@ -300,7 +294,7 @@ export default function Home() {
variant="outline"
className="w-full border-white/20 hover:bg-white hover:text-black rounded-none"
>
              شاهد أعمالي
              عرض المعرض الكامل
</Button>
</Link>
</div>

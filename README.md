# موقع ثبات — جاهز لـ Vercel

## الصفحات
- `/` الرئيسية (index.html)
- `/waitlist` الطابور الحي وقائمة الانتظار
- `/privacy` الخصوصية
- أي رابط غلط → `404.html`

## قبل الرفع (مرة وحدة)
1. في Vercel → Project → Settings → Environment Variables أضف:
   - `TELEGRAM_BOT_TOKEN` من @BotFather
   - `TELEGRAM_CHAT_ID` رقم المحادثة اللي توصلك فيها التسجيلات
   - (اختياري) `ALLOWED_ORIGIN` = https://thabatapp-jet.vercel.app
2. أبقِ `api/waitlist.js` المحدّث: يحتوي على مهلة إرسال ٨ ثوانٍ والتحقق من نتيجة Telegram. الصفحة ترسل JSON: `{handle, platform, source, at, website}`.
3. ملف الفيديو: انسخ `wl-story.mp4` و `wl-story.jpg` من مشروعك القديم إلى `assets/`. لو ما نسختهم، زر الفيديو يختفي تلقائياً.
4. حساب إنستغرام مضبوط على `thabat.ar` في `waitlist/index.html` و`privacy/index.html`.
5. مجلد `app-preview/` يحتوي على واجهة التطبيق الأصلية وملفاتها التابعة، ويُعرض داخل قسم الباب. لا تحذفه عند الرفع؛ إعداد `SAMEORIGIN` مطلوب لعرضها داخل الموقع.

## لو غيّرت الدومين
ابحث واستبدل `thabatapp-jet.vercel.app` في كل الملفات (canonical, og, sitemap, robots).

## التجربة على جهازك
افتح الملفات بسيرفر محلي، مو بالضغط المباشر على الملف:
`npx serve .` ثم افتح http://localhost:3000
(الروابط النظيفة مثل /waitlist تشتغل صح على Vercel.)

## الخطوط
Badeen Display و Baloo Bhaijaan 2 محفوظة في `assets/fonts` (رخصة OFL، الملفات معها).

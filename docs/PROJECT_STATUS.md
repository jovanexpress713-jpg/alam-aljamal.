# حالة المشروع

## الموجود
- واجهة متجر عربية RTL مستوردة من مصدر التصميم.
- أقسام وبطاقات منتجات وسلة ومفضلة تفاعلية محلياً.
- معاينة لوحة إدارة أولية ضمن نفس المكوّن.
- إعداد Vite + React + TypeScript.

## غير المنفذ بعد
- المصادقة الحقيقية وإدارة جلسات المستخدمين.
- قاعدة البيانات الدائمة وسياسات RLS.
- إدارة المنتجات والطلبات والمخزون عبر Backend.
- بوابة دفع وتكامل شركات التوصيل.
- فصل لوحة الإدارة إلى مسار محمي مستقل.
- تطبيق Android وإنتاج APK.
- اختبارات تكامل وتشغيل إنتاجي.

## مبدأ التسليم
لا تعتبر البيانات المعروضة في الواجهة بيانات تجارية حقيقية، ولا تعتبر وظائف الدفع أو الطلبات متاحة قبل ربطها واختبارها.


## CI verification
- First workflow attempt failed before dependency installation because setup-node npm caching requires a lockfile that has not been generated yet.
- Workflow corrected to install dependencies without cache; a fresh run will verify TypeScript and production build.

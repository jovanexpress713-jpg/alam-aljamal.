import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  HelpCircle,
  FileText,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const StoreInfoModal: React.FC = () => {
  const { infoModal, setInfoModal, lang, t } = useStore();

  if (!infoModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0f0f0f] border border-[#D7AD55]/40 rounded-3xl p-6 sm:p-8 text-[#F4EAD5] shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setInfoModal(null)}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-full bg-[#181818] text-[#F4EAD5]/70 hover:text-white border border-[#D7AD55]/30"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. About Us */}
        {infoModal === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
              <div className="w-12 h-12 rounded-full bg-[#181818] border border-[#D7AD55]/40 p-2.5">
                <img src="/brand-emblem.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif text-[#F4EAD5]">عالم الجمال | ALAM ALJAMAL</h2>
                <span className="text-xs text-[#D7AD55] tracking-widest uppercase">Maison de Haute Parfumerie & Beauté</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F4EAD5]/80 leading-relaxed">
              تأسست دار <b>عالم الجمال</b> لتكون وجهة النخبة الأولى في الشرق الأوسط لعشاق الفخامة والأصالة. نحن لا نبيع مجرد عطور أو مستحضرات، بل نبتكر تجارب حسية استثنائية تجمع بين أسرار التراث الشرقي العريق وأرقى ابتكارات معامل باريس وزيورخ.
            </p>

            <div className="p-4 rounded-2xl bg-[#141414] border border-[#D7AD55]/20 space-y-2 text-xs">
              <div className="font-bold text-[#F4D98E]">قيمنا الأساسية:</div>
              <ul className="list-disc list-inside text-[#F4EAD5]/70 space-y-1">
                <li>النقاء المطلق: خامات طبيعية معتقة بدون شوائب.</li>
                <li>الحرفية العالية: عبوات مصنوعة يدوياً بكريستال مقطوع بماء الذهب.</li>
                <li>الخصوصية والاهتمام الملكي لكل عميل من عملاء الدار.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 2. Contact Us */}
        {infoModal === 'contact' && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold font-serif text-[#F4EAD5] flex items-center space-x-2 rtl:space-x-reverse">
              <Phone className="w-5 h-5 text-[#D7AD55]" />
              <span>{t('اتصل بـ VIP Concierge الخاص بالدار', 'VIP Concierge & Direct Support')}</span>
            </h2>

            <p className="text-xs text-[#F4EAD5]/70">
              فريق مستشارينا وخبراء العطور جاهزون لخدمتكم وتقديم الاستشارات الحصرية ومتابعة طلباتكم على مدار الساعة.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#D7AD55]/20 space-y-1">
                <span className="text-[#D7AD55] font-bold block">واتساب كبار الشخصيات VIP:</span>
                <span className="font-mono text-sm text-[#F4EAD5] block">+966 50 123 4567</span>
                <span className="text-[10px] text-[#F4EAD5]/50">رد مباشر ومساعد شخصي</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#141414] border border-[#D7AD55]/20 space-y-1">
                <span className="text-[#D7AD55] font-bold block">البريد الإلكتروني المباشر:</span>
                <span className="font-mono text-sm text-[#F4EAD5] block">concierge@alamaljamal.luxury</span>
                <span className="text-[10px] text-[#F4EAD5]/50">استفسارات المجموعات الخاصة والشراكات</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#141414] border border-[#D7AD55]/20 space-y-1 sm:col-span-2">
                <span className="text-[#D7AD55] font-bold block">المقر الإقليمي وصالة العرض:</span>
                <span className="text-xs text-[#F4EAD5] block">الرياض، طريق الملك فهد — برج عالم الجمال الفاخر</span>
                <span className="text-[10px] text-[#F4EAD5]/50">ساعات العمل: السبت إلى الخميس (09:00 ص - 11:00 م)</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Golden Warranty & Returns */}
        {infoModal === 'returns' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#F4EAD5] flex items-center space-x-2 rtl:space-x-reverse">
              <ShieldCheck className="w-5 h-5 text-[#D7AD55]" />
              <span>{t('الضمان الذهبي الملكي وسياسة الاسترجاع', 'Golden Warranty & Exchange Policy')}</span>
            </h2>

            <p className="text-xs text-[#F4EAD5]/80 leading-relaxed">
              في عالم الجمال، ثقتكم هي أثمن ما نملك. نمنح جميع عملائنا الضمان الذهبي للاستبدال والاسترجاع بكل سلاسة ومرونة وفق الشروط التالية:
            </p>

            <div className="space-y-2 text-xs text-[#F4EAD5]/70">
              <div className="p-3 rounded-xl bg-[#141414] border border-[#D7AD55]/15">
                <b className="text-[#F4D98E]">عينات التجربة المرفقة:</b> نرفق مع كل عطر عينة تجربة صغيرة بحجم 2 مل. يمكنك تجربة العينة قبل فتح العبوة الأصلية المغلفة بالسلوفان.
              </div>
              <div className="p-3 rounded-xl bg-[#141414] border border-[#D7AD55]/15">
                <b className="text-[#F4D98E]">فترة الاسترجاع:</b> يحق للعميل طلب الاسترجاع أو الاستبدال خلال 7 أيام من تاريخ الاستلام دون أي رسوم إضافية.
              </div>
              <div className="p-3 rounded-xl bg-[#141414] border border-[#D7AD55]/15">
                <b className="text-[#F4D98E]">الاسترداد المالي:</b> يتم استرجاع المبلغ بنفس وسيلة الدفع خلال 48 ساعة من فحص الشحنة المرتجعة.
              </div>
            </div>
          </div>
        )}

        {/* 4. Privacy & Security */}
        {infoModal === 'privacy' && (
          <div className="space-y-4 text-xs text-[#F4EAD5]/80 leading-relaxed">
            <h2 className="text-xl font-bold font-serif text-[#F4EAD5] flex items-center space-x-2 rtl:space-x-reverse">
              <FileText className="w-5 h-5 text-[#D7AD55]" />
              <span>{t('سياسة الخصوصية وأمان البيانات', 'Privacy & Security Protocol')}</span>
            </h2>
            <p>
              نلتزم بأعلى معايير التشفير المصرفي (256-bit SSL/TLS). لا نقوم بتخزين أي أرقام بطاقات ائتمانية على خوادمنا؛ فجميع عمليات الدفع تتم عبر بوابات مشفرة ومعتمدة من البنك المركزي السعودي (SAMA).
            </p>
            <p>
              بياناتكم الشخصية وعناوينكم تُعامل بسرية تامة ولا تُشارك مع أي طرف خارجي سوى مندوب التوصيل المعتمد لغرض تسليم الطلب فقط.
            </p>
          </div>
        )}

        {/* 5. Terms */}
        {infoModal === 'terms' && (
          <div className="space-y-4 text-xs text-[#F4EAD5]/80 leading-relaxed">
            <h2 className="text-xl font-bold font-serif text-[#F4EAD5] flex items-center space-x-2 rtl:space-x-reverse">
              <FileText className="w-5 h-5 text-[#D7AD55]" />
              <span>{t('شروط وأحكام الخدمة', 'Terms of Service')}</span>
            </h2>
            <p>
              جميع المنتجات والصور والشعارات في هذا التطبيق هي علامات تجارية مملوكة حصرياً لدار عالم الجمال ALAM ALJAMAL. يُحظر نسخها أو استخدامها تجارياً دون إذن خطي مسبق.
            </p>
            <p>
              تخضع جميع الطلبات للشروط والأنظمة التجارية المطبقة، وتتحمل الدار سلامة وصول الشحنة بحالتها الملكية الأصلية.
            </p>
          </div>
        )}

        {/* 6. FAQ */}
        {infoModal === 'faq' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[#F4EAD5] flex items-center space-x-2 rtl:space-x-reverse">
              <HelpCircle className="w-5 h-5 text-[#D7AD55]" />
              <span>{t('الأسئلة الأكثر شيوعاً', 'Frequently Asked Questions')}</span>
            </h2>

            <div className="space-y-3 text-xs">
              {[
                {
                  q: 'هل جميع منتجات عالم الجمال أصلية 100%؟',
                  a: 'نعم، نضمن أصالة كافة المقتنيات والعطور بدهن عود نقي وخلاصات طبيعية معتمدة من معامل العطور الفرنسية والسويسرية.'
                },
                {
                  q: 'كم يستغرق توصيل الشحنة؟',
                  a: 'لعملاء الرياض وجدة تتوفر خدمة التوصيل الفوري نفس اليوم عبر أسطول VIP. ولبقية مناطق المملكة والخليج خلال 24 - 48 ساعة عمل.'
                },
                {
                  q: 'هل يمكنني إهداء الطلب لشخص آخر؟',
                  a: 'نعم، نوفر خيار التغليف الملكي المجاني مع كتابة بطاقة إهداء مذهبة وتسليمها مباشرة للشخص المهدى إليه.'
                },
                {
                  q: 'ما هي وسائل الدفع المتاحة؟',
                  a: 'نقبل Apple Pay، بطاقات مدى، البطاقات الائتمانية (Visa / MasterCard)، والدفع نقداً أو بالشبكة عند الاستلام.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#141414] border border-[#D7AD55]/15 space-y-1">
                  <h4 className="font-bold text-[#F4D98E]">{item.q}</h4>
                  <p className="text-[#F4EAD5]/70 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

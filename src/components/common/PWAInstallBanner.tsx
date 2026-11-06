import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import {
  Download,
  Smartphone,
  Share2,
  PlusSquare,
  QrCode,
  X,
  Sparkles,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // If already running in standalone mode (already installed), don't bother the user
  if (isInstalled) {
    return null;
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setShowModal(false);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Discreet floating top banner on mobile or button in header */}
      <div className="bg-gradient-to-r from-[#17150f] via-[#211b10] to-[#17150f] border-b border-[#D7AD55]/30 px-4 py-2 flex items-center justify-between text-xs text-[#F4EAD5] shadow-lg">
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[#080808] border border-[#D7AD55]/40 flex items-center justify-center shrink-0 p-1">
            <img src="/brand-emblem.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <span className="truncate text-[11px] sm:text-xs">
            <b>تطبيق عالم الجمال</b> · ثبّت التطبيق على شاشة هاتفك الرئيسية لتجربة تسوق أسرع
          </span>
        </div>

        <button
          onClick={handleInstallClick}
          className="gold-button px-3.5 py-1.5 rounded-full text-[11px] font-bold shrink-0 flex items-center space-x-1 rtl:space-x-reverse shadow-md ml-2 rtl:ml-0 rtl:mr-2"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تثبيت التطبيق</span>
        </button>
      </div>

      {/* Modal with Direct Instructions & QR Code for scanning from desktop */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-[#D7AD55]/40 rounded-3xl p-6 sm:p-8 text-[#F4EAD5] shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-full bg-[#181818] text-[#F4EAD5]/70 hover:text-white border border-[#D7AD55]/30"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#141414] border border-[#D7AD55]/40 p-2.5 shadow-[0_0_20px_rgba(215,173,85,0.3)]">
                <img src="/brand-emblem.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#F4EAD5]">تثبيت تطبيق عالم الجمال</h3>
                <span className="text-[11px] text-[#D7AD55] tracking-widest uppercase">ALAM ALJAMAL MOBILE APP</span>
              </div>
            </div>

            {/* Android / Chrome One-Tap Install */}
            {isInstallable ? (
              <div className="p-5 rounded-2xl bg-[#141414] border border-[#D7AD55]/30 space-y-3 text-center mb-6">
                <Sparkles className="w-8 h-8 text-[#D7AD55] mx-auto animate-pulse" />
                <h4 className="text-sm font-bold text-[#F4D98E]">جاهز للتثبيت الفوري بنقرة واحدة!</h4>
                <p className="text-xs text-[#F4EAD5]/70">
                  انقر على الزر أدناه لإضافة أيقونة عالم الجمال مباشرة إلى شاشة هاتفك وتصفحه كتطبيق مستقل.
                </p>
                <button
                  onClick={install}
                  className="gold-button w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>تثبيت الآن على الهاتف</span>
                </button>
              </div>
            ) : isIOS ? (
              /* iOS Safari instructions */
              <div className="p-5 rounded-2xl bg-[#141414] border border-[#D7AD55]/30 space-y-4 mb-6">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-bold text-[#F4D98E]">
                  <Smartphone className="w-4 h-4 text-[#D7AD55]" />
                  <span>طريقة التثبيت على أجهزة iPhone / iPad (Safari):</span>
                </div>
                <div className="space-y-2.5 text-xs text-[#F4EAD5]/80">
                  <div className="flex items-start space-x-2.5 rtl:space-x-reverse bg-[#080808] p-3 rounded-xl border border-[#D7AD55]/15">
                    <Share2 className="w-4 h-4 text-[#D7AD55] shrink-0 mt-0.5" />
                    <div>
                      <b>الخطوة 1:</b> اضغط على زر <b>المشاركة (Share)</b> الموجود أسفل شاشة المتصفح.
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 rtl:space-x-reverse bg-[#080808] p-3 rounded-xl border border-[#D7AD55]/15">
                    <PlusSquare className="w-4 h-4 text-[#D7AD55] shrink-0 mt-0.5" />
                    <div>
                      <b>الخطوة 2:</b> مرر للأسفل واضغط على <b>"إضافة إلى الصفحة الرئيسية" (Add to Home Screen)</b>.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Desktop / General instructions with QR Code and URL */
              <div className="space-y-4 mb-6">
                <div className="p-5 rounded-2xl bg-[#141414] border border-[#D7AD55]/30 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
                  {/* Dynamic QR Code generator via API */}
                  <div className="w-28 h-28 bg-white p-2 rounded-xl shrink-0 shadow-md">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`}
                      alt="امسح الرمز بكاميرا الهاتف"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <h4 className="font-bold text-[#F4D98E] flex items-center justify-center sm:justify-start space-x-1.5 rtl:space-x-reverse">
                      <QrCode className="w-4 h-4 text-[#D7AD55]" />
                      <span>امسح الرمز بكاميرا هاتفك</span>
                    </h4>
                    <p className="text-[#F4EAD5]/70 leading-relaxed text-[11px]">
                      افتح كاميرا الهاتف ووجّهها نحو الرمز أعلاه لفتح المتجر مباشرة، ثم اضغط على "تثبيت" أو "إضافة إلى الشاشة الرئيسية".
                    </p>
                  </div>
                </div>

                {/* Direct Link Copy */}
                <div>
                  <label className="block text-[11px] text-[#F4EAD5]/60 mb-1">أو انسخ الرابط المباشر وأرسله لهاتفك:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={currentUrl}
                      className="flex-1 bg-[#080808] border border-[#D7AD55]/30 rounded-xl px-3 py-2 text-xs text-[#F4D98E] font-mono outline-none"
                    />
                    <button
                      onClick={handleCopy}
                      className="gold-button px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 rtl:space-x-reverse"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#D7AD55]/20 text-[11px] text-[#F4EAD5]/50 text-center">
              يعمل التطبيق بكامل طاقته وميزاته دون الحاجة للتنزيل من متجر Google Play مع دعم العمل في وضع عدم الاتصال.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

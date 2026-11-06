import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    formatPrice,
    setCurrentTab,
    coupons,
    lang,
    t,
    notify
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('riyadh');

  // Shipping calculation based on region
  const shippingFees: Record<string, { fee: number; nameAr: string; nameEn: string }> = {
    riyadh: { fee: 0, nameAr: 'الرياض (توصيل أسطول VIP مجاني)', nameEn: 'Riyadh (Complimentary VIP)' },
    central: { fee: 25, nameAr: 'المنطقة الوسطى والقصيم', nameEn: 'Central Region' },
    west: { fee: 25, nameAr: 'جدة ومكة المكرمة والمدينة', nameEn: 'Western Region' },
    east: { fee: 25, nameAr: 'الدمام والخبر والمنطقة الشرقية', nameEn: 'Eastern Province' },
    gulf: { fee: 60, nameAr: 'دول الخليج العربي (شحن جوي سريع)', nameEn: 'GCC Express Air' }
  };

  const deliveryFee = shippingFees[selectedRegion]?.fee ?? 0;

  // Apply Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    const match = coupons.find((c) => c.code === code && c.isActive);

    if (!match) {
      notify(lang === 'ar' ? 'كود الخصم غير صالح أو منتهي الصلاحية' : 'Invalid or expired coupon code', 'error');
      return;
    }

    if (cartSubtotal < match.minOrderValue) {
      notify(
        lang === 'ar'
          ? `الحد الأدنى لتطبيق هذا الكود هو ${formatPrice(match.minOrderValue)}`
          : `Minimum order for this coupon is ${formatPrice(match.minOrderValue)}`,
        'error'
      );
      return;
    }

    let discount = 0;
    if (match.discountType === 'percent') {
      discount = (cartSubtotal * match.discountValue) / 100;
      if (match.maxDiscount && discount > match.maxDiscount) {
        discount = match.maxDiscount;
      }
    } else {
      discount = match.discountValue;
    }

    setAppliedCoupon({ code: match.code, discountAmount: discount });
    notify(
      lang === 'ar'
        ? `تم تطبيق كود الخصم "${match.code}" بنجاح!`
        : `Coupon "${match.code}" applied!`,
      'success'
    );
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center pb-32">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#121212] border border-[#D7AD55]/30 flex items-center justify-center text-[#D7AD55] shadow-[0_0_25px_rgba(215,173,85,0.2)]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-[#F4EAD5] mb-2">
          {t('حقيبة التسوق فارغة حالياً', 'Your Shopping Bag Is Empty')}
        </h2>
        <p className="text-xs sm:text-sm text-[#F4EAD5]/60 max-w-md mx-auto mb-8">
          {t(
            'استكشف مجموعتنا الفاخرة من العطور النيش ودهن العود الملكي وأضف ما يعكس ذوقك الرفيع.',
            'Discover our signature haute collections and select items that reflect your discerning taste.'
          )}
        </p>
        <button
          onClick={() => setCurrentTab('products')}
          className="gold-button px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center space-x-2 rtl:space-x-reverse"
        >
          <span>{t('تصفح الكتالوج الملكي', 'Explore Haute Catalog')}</span>
          <ArrowIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 sm:pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D7AD55]/15">
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#D7AD55] font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('المقتنيات المختارة', 'Curated Selections')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4EAD5]">
            {t('حقيبة التسوق الفاخرة', 'Your Luxury Bag')} ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#F4EAD5]/50 hover:text-rose-400 flex items-center space-x-1 rtl:space-x-reverse transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t('تفريغ الحقيبة', 'Clear Bag')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Line Items */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item, idx) => {
            const unitPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);
            const lineTotal = unitPrice * item.quantity;

            return (
              <div
                key={`${item.product.id}-${item.selectedVariant?.id || 'std'}-${idx}`}
                className="luxury-card p-4 rounded-2xl flex items-center space-x-4 rtl:space-x-reverse border border-[#D7AD55]/15 bg-[#121212]"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#181818] shrink-0 border border-[#D7AD55]/20">
                  <img
                    src={item.product.images[0]}
                    alt={lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info & Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#D7AD55] font-medium uppercase tracking-wider block">
                    {item.product.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#F4EAD5] font-serif truncate mb-1">
                    {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                  </h3>

                  {item.selectedVariant && (
                    <span className="inline-block text-[10px] text-[#F4D98E] bg-[#1a1a1a] px-2 py-0.5 rounded-md border border-[#D7AD55]/20 mb-2">
                      {lang === 'ar' ? item.selectedVariant.nameAr : item.selectedVariant.nameEn}
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-[#F4D98E]">
                      {formatPrice(unitPrice)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#0a0a0a] border border-[#D7AD55]/25 rounded-lg p-1">
                      <button
                        onClick={() =>
                          updateCartQty(item.product.id, item.quantity - 1, item.selectedVariant?.id)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-[#F4EAD5] hover:text-[#D7AD55]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#F4D98E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQty(item.product.id, item.quantity + 1, item.selectedVariant?.id)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-[#F4EAD5] hover:text-[#D7AD55]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                  className="p-2 text-[#F4EAD5]/40 hover:text-rose-400 transition-colors"
                  aria-label={t('حذف', 'Remove')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Order Summary & Delivery Estimator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/30 shadow-xl space-y-6">
            <h2 className="text-base font-bold font-serif text-[#F4EAD5] border-b border-[#D7AD55]/15 pb-3">
              {t('ملخص الطلب الفاخر', 'Luxury Order Summary')}
            </h2>

            {/* Delivery Region Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#F4EAD5]/70 mb-2">
                {t('منطقة ورسوم التوصيل:', 'Delivery Destination:')}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#D7AD55]/30 text-[#F4EAD5] text-xs rounded-xl p-3 outline-none focus:border-[#D7AD55]"
              >
                {Object.entries(shippingFees).map(([key, val]) => (
                  <option key={key} value={key}>
                    {lang === 'ar' ? val.nameAr : val.nameEn} ({val.fee === 0 ? t('مجاني', 'Free') : formatPrice(val.fee)})
                  </option>
                ))}
              </select>
            </div>

            {/* Promo Code Coupon Engine */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="block text-xs font-semibold text-[#F4EAD5]/70">
                {t('رمز الخصم الملكي (الكوبون):', 'Privilege Promo Code:')}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 w-4 h-4 text-[#D7AD55]" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="BEAUTY10 / GOLD20"
                    className="w-full bg-[#0a0a0a] border border-[#D7AD55]/30 text-[#F4EAD5] placeholder-[#F4EAD5]/30 text-xs rounded-xl py-2.5 px-9 uppercase font-mono outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#181818] border border-[#D7AD55]/40 hover:border-[#D7AD55] text-xs font-bold text-[#D7AD55]"
                >
                  {t('تطبيق', 'Apply')}
                </button>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Check className="w-3.5 h-3.5" />
                    <span>{t('تم تفعيل الكوبون:', 'Applied:')} {appliedCoupon.code}</span>
                  </div>
                  <span className="font-bold">-{formatPrice(appliedCoupon.discountAmount)}</span>
                </div>
              )}
            </form>

            {/* Financial Breakdown */}
            <div className="space-y-2.5 text-xs text-[#F4EAD5]/80 pt-2 border-t border-[#D7AD55]/15">
              <div className="flex justify-between">
                <span>{t('المجموع الفرعي للمنتجات', 'Subtotal')}</span>
                <span className="font-medium text-[#F4EAD5]">{formatPrice(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>{t('قيمة الخصم الملكي', 'Privilege Discount')}</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('رسوم التوصيل والخدمة الفاخرة', 'White Glove Courier')}</span>
                <span>{deliveryFee === 0 ? t('مجاني VIP', 'Complimentary') : formatPrice(deliveryFee)}</span>
              </div>

              <div className="flex justify-between text-[11px] text-[#F4EAD5]/50">
                <span>{t('ضريبة القيمة المضافة (15% مشمولة)', 'VAT (15% Included)')}</span>
                <span>{formatPrice((grandTotal * 0.15) / 1.15)}</span>
              </div>

              <div className="pt-3 border-t border-[#D7AD55]/25 flex justify-between items-baseline text-sm sm:text-base font-bold text-[#F4D98E]">
                <span>{t('الإجمالي النهائي للدفع', 'Final Total')}</span>
                <span className="text-xl font-bold font-serif">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => setCurrentTab('checkout')}
              className="gold-button w-full py-4 rounded-xl flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm font-bold shadow-xl"
            >
              <span>{t('الانتقال لإتمام الطلب الفاخر', 'Proceed to Luxury Checkout')}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-[11px] text-[#F4EAD5]/50 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D7AD55]" />
              <span>{t('دفع آمن ومشفر 100% وفق أعلى معايير الحماية', '100% Encrypted & Bank-Grade Security')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

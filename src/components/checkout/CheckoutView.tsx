import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod, Address, OrderItem } from '../../types/commerce';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  MapPin,
  Phone,
  User,
  ShoppingBag
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    formatPrice,
    addresses,
    user,
    placeOrder,
    setActiveTrackingOrderId,
    setCurrentTab,
    lang,
    t,
    notify
  } = useStore();

  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || 'custom');
  
  // Custom address fields if user enters new address
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNo, setBuildingNo] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash_on_delivery');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'vip_same_day'>('vip_same_day');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = deliverySpeed === 'vip_same_day' ? 35 : 0;
  const grandTotal = cartSubtotal + deliveryFee;

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      notify(lang === 'ar' ? 'يرجى إكمال بيانات الاسم ورقم الهاتف' : 'Please provide name and phone', 'error');
      return;
    }

    setIsSubmitting(true);

    const chosenAddress: Address = addresses.find((a) => a.id === selectedAddressId) || {
      id: `addr-${Date.now()}`,
      recipientName: customerName,
      phone: customerPhone,
      city,
      region,
      street,
      buildingNo,
      notes: customerNote,
      isDefault: false
    };

    const orderItems: OrderItem[] = cart.map((item) => {
      const unitPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);
      return {
        id: `item-${Date.now()}-${item.product.id}`,
        productId: item.product.id,
        productName: lang === 'ar' ? item.product.nameAr : item.product.nameEn,
        productImage: item.product.images[0],
        unitPrice,
        quantity: item.quantity,
        lineTotal: unitPrice * item.quantity,
        variantName: item.selectedVariant
          ? lang === 'ar'
            ? item.selectedVariant.nameAr
            : item.selectedVariant.nameEn
          : undefined
      };
    });

    setTimeout(() => {
      const newOrder = placeOrder({
        customerId: user?.id || 'usr-guest',
        customerName,
        customerPhone,
        address: chosenAddress,
        items: orderItems,
        status: 'new',
        paymentMethod,
        paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'paid',
        subtotal: cartSubtotal,
        deliveryFee,
        discountTotal: 0,
        total: grandTotal,
        customerNote,
        estimatedDelivery:
          deliverySpeed === 'vip_same_day'
            ? lang === 'ar'
              ? 'اليوم خلال المساء (أسطول VIP)'
              : 'Today evening via VIP Courier'
            : lang === 'ar'
            ? 'خلال 48 ساعة'
            : 'Within 48 hours'
      });

      setIsSubmitting(false);
      setActiveTrackingOrderId(newOrder.id);
      setCurrentTab('tracking');
      notify(
        lang === 'ar'
          ? `تم تأكيد طلبك الملكي رقم ${newOrder.orderNumber} بنجاح!`
          : `Order ${newOrder.orderNumber} placed successfully!`,
        'success'
      );
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 sm:pb-32">
      <div className="mb-8 pb-4 border-b border-[#D7AD55]/15 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#D7AD55] font-semibold tracking-wider uppercase mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>{t('إتمام الطلب الآمن والمشفر', 'Encrypted Luxury Checkout')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4EAD5]">
            {t('تأكيد بيانات الشحنة والدفع', 'Confirm Shipping & Payment')}
          </h1>
        </div>

        <button
          onClick={() => setCurrentTab('cart')}
          className="text-xs text-[#D7AD55] hover:text-[#F4D98E] flex items-center space-x-1 rtl:space-x-reverse"
        >
          <span>{t('العودة إلى السلة', 'Back to Bag')}</span>
        </button>
      </div>

      <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Main Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Customer Contact */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4">
            <h2 className="text-sm font-bold font-serif text-[#F4D98E] flex items-center space-x-2 rtl:space-x-reverse">
              <User className="w-4 h-4 text-[#D7AD55]" />
              <span>{t('1. بيانات العميل المستلم', '1. Recipient Details')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('الاسم الكريم', 'Full Name')}</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none focus:border-[#D7AD55]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('رقم الجوال للتوصيل', 'Mobile Phone')}</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none focus:border-[#D7AD55]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('البريد الإلكتروني للفاتورة', 'Email for Tax Receipt')}</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none focus:border-[#D7AD55]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4">
            <h2 className="text-sm font-bold font-serif text-[#F4D98E] flex items-center space-x-2 rtl:space-x-reverse">
              <MapPin className="w-4 h-4 text-[#D7AD55]" />
              <span>{t('2. عنوان التوصيل الملكي', '2. Delivery Address')}</span>
            </h2>

            {addresses.length > 0 && (
              <div className="space-y-2 mb-4">
                <label className="block text-xs text-[#F4EAD5]/70">{t('اختر من العناوين المحفوظة:', 'Select Saved Address:')}</label>
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedAddressId === addr.id
                        ? 'bg-[#181818] border-[#D7AD55]'
                        : 'bg-[#0a0a0a] border-[#D7AD55]/15'
                    }`}
                  >
                    <input
                      type="radio"
                      name="saved_addr"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="mt-1 text-[#D7AD55] focus:ring-0"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-[#F4EAD5]">{addr.recipientName} ({addr.city})</div>
                      <div className="text-[#F4EAD5]/60 mt-0.5">{addr.region} · {addr.street}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Custom address details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('المدينة', 'City')}</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('الحي والمنطقة', 'District / Area')}</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('الشارع ورقم المبنى / القصر', 'Street & Villa / Building')}</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('ملاحظات خاصة بالتوصيل والإهداء', 'Gift & Delivery Notes')}</label>
                <textarea
                  rows={2}
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Options */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4">
            <h2 className="text-sm font-bold font-serif text-[#F4D98E] flex items-center space-x-2 rtl:space-x-reverse">
              <Truck className="w-4 h-4 text-[#D7AD55]" />
              <span>{t('3. أسلوب وسرعة التوصيل', '3. Dispatch Priority')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 rtl:space-x-reverse ${
                  deliverySpeed === 'vip_same_day'
                    ? 'bg-[#181818] border-[#D7AD55]'
                    : 'bg-[#0a0a0a] border-[#D7AD55]/15'
                }`}
              >
                <input
                  type="radio"
                  name="speed"
                  checked={deliverySpeed === 'vip_same_day'}
                  onChange={() => setDeliverySpeed('vip_same_day')}
                  className="mt-1 text-[#D7AD55] focus:ring-0"
                />
                <div className="text-xs">
                  <div className="font-bold text-[#F4EAD5] flex items-center space-x-1 rtl:space-x-reverse">
                    <span>{t('توصيل فوري VIP نفس اليوم', 'Same-Day VIP Courier')}</span>
                    <span className="text-[10px] text-[#080808] bg-[#D7AD55] px-1.5 py-0.2 rounded font-bold">
                      VIP
                    </span>
                  </div>
                  <div className="text-[#F4EAD5]/60 mt-1">{t('تسليم خلال ساعات مع المندوب الخاص', 'Hand-delivered today')}</div>
                  <div className="text-[#F4D98E] font-bold mt-1">+35 ر.س</div>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 rtl:space-x-reverse ${
                  deliverySpeed === 'standard'
                    ? 'bg-[#181818] border-[#D7AD55]'
                    : 'bg-[#0a0a0a] border-[#D7AD55]/15'
                }`}
              >
                <input
                  type="radio"
                  name="speed"
                  checked={deliverySpeed === 'standard'}
                  onChange={() => setDeliverySpeed('standard')}
                  className="mt-1 text-[#D7AD55] focus:ring-0"
                />
                <div className="text-xs">
                  <div className="font-bold text-[#F4EAD5]">{t('شحن سريع مجاني (48 ساعة)', 'Standard Express (48h)')}</div>
                  <div className="text-[#F4EAD5]/60 mt-1">{t('توصيل آمن لجميع مدن المملكة', 'Covered nationwide')}</div>
                  <div className="text-emerald-400 font-bold mt-1">{t('مجاني', 'Free')}</div>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: Payment Methods */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4">
            <h2 className="text-sm font-bold font-serif text-[#F4D98E] flex items-center space-x-2 rtl:space-x-reverse">
              <CreditCard className="w-4 h-4 text-[#D7AD55]" />
              <span>{t('4. وسيلة الدفع المعتمدة', '4. Payment Method')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'apple_pay', title: 'Apple Pay', desc: t('دفع سريع بنقرة واحدة وآمن', 'Instant 1-Click Pay') },
                { id: 'mada', title: t('بطاقات مدى البنكية (Mada)', 'Mada Debit Card'), desc: t('الشبكة السعودية للمدفوعات', 'Direct Saudi Debit') },
                { id: 'credit_card', title: t('بطاقة ائتمانية (Visa / Master)', 'Credit Card'), desc: t('دفع مشفر 3D Secure', 'Global Verified Cards') },
                { id: 'cash_on_delivery', title: t('الدفع عند الاستلام', 'Cash on Delivery'), desc: t('معاينة الطلب والتسليم', 'Pay Upon Delivery') }
              ].map((m) => (
                <label
                  key={m.id}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 rtl:space-x-reverse ${
                    paymentMethod === m.id
                      ? 'bg-[#181818] border-[#D7AD55]'
                      : 'bg-[#0a0a0a] border-[#D7AD55]/15'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id as PaymentMethod)}
                    className="mt-1 text-[#D7AD55] focus:ring-0"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-[#F4EAD5]">{m.title}</div>
                    <div className="text-[#F4EAD5]/60 mt-0.5">{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right / Order Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/30 shadow-xl space-y-6 sticky top-24">
            <h2 className="text-base font-bold font-serif text-[#F4EAD5] border-b border-[#D7AD55]/15 pb-3">
              {t('مقتنيات الطلب الفاخر', 'Order Items')} ({cart.length})
            </h2>

            {/* Micro items list */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 rtl:space-x-reverse text-xs">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-[#181818] border border-[#D7AD55]/20"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#F4EAD5] truncate">
                      {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </div>
                    <div className="text-[#F4EAD5]/50">
                      {item.quantity} × {formatPrice(item.product.price + (item.selectedVariant?.priceModifier || 0))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Breakdown */}
            <div className="space-y-2 text-xs text-[#F4EAD5]/75 pt-3 border-t border-[#D7AD55]/15">
              <div className="flex justify-between">
                <span>{t('قيمة المنتجات', 'Subtotal')}</span>
                <span className="font-medium text-[#F4EAD5]">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('رسوم الشحن والتوصيل', 'Shipping')}</span>
                <span>{deliveryFee === 0 ? t('مجاني VIP', 'Complimentary') : formatPrice(deliveryFee)}</span>
              </div>
              <div className="pt-3 border-t border-[#D7AD55]/25 flex justify-between items-baseline text-base font-bold text-[#F4D98E]">
                <span>{t('الإجمالي المستحق للدفع', 'Grand Total')}</span>
                <span className="text-2xl font-serif">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="gold-button w-full py-4 rounded-xl flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm font-bold shadow-xl cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t('جارٍ تأكيد ومعالجة الطلب...', 'Securing Order...')}</span>
              ) : (
                <>
                  <span>{t('تأكيد الطلب ودفع', 'Confirm Order & Pay')} {formatPrice(grandTotal)}</span>
                  <ArrowIcon className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-[#F4EAD5]/50">
              {t(
                'بالضغط على تأكيد، فإنك توافق على شروط الخدمة والضمان الذهبي لعالم الجمال.',
                'By confirming, you accept Alam Aljamal luxury terms & golden warranty.'
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

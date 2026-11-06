import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types/commerce';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const {
    orders,
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    updateOrderStatus,
    setCurrentTab,
    formatPrice,
    lang,
    t
  } = useStore();

  const [searchOrderNumber, setSearchOrderNumber] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Active tracked order or default to the most recent one
  const order =
    orders.find((o) => o.id === activeTrackingOrderId) ||
    orders.find((o) => o.orderNumber.toLowerCase() === searchOrderNumber.trim().toLowerCase()) ||
    orders[0];

  const steps: { status: OrderStatus; labelAr: string; labelEn: string; descAr: string; descEn: string }[] = [
    {
      status: 'new',
      labelAr: 'تم استلام الطلب',
      labelEn: 'Order Placed',
      descAr: 'تم استلام وتوثيق الطلب في النظام الملكي',
      descEn: 'Order verified in our luxury database'
    },
    {
      status: 'confirmed',
      labelAr: 'قيد المراجعة',
      labelEn: 'Under Review',
      descAr: 'تمت مراجعة الجاهزية والاعتماد',
      descEn: 'Items reserved and approved'
    },
    {
      status: 'preparing',
      labelAr: 'قيد التجهيز الفاخر',
      labelEn: 'Curating & Packaging',
      descAr: 'تجهيز المنتجات والتغليف الملكي الخاص',
      descEn: 'Silk packaging & wax seal application'
    },
    {
      status: 'ready_to_ship',
      labelAr: 'جاهز للشحن',
      labelEn: 'Ready for Dispatch',
      descAr: 'تم تجهيز الشحنة مع بوليصة النقل السريع',
      descEn: 'Manifested and queued for dispatch'
    },
    {
      status: 'out_for_delivery',
      labelAr: 'خرج للتوصيل',
      labelEn: 'Out for Delivery',
      descAr: 'المندوب الخاص VIP في طريقه لموقعك',
      descEn: 'Courier is en route to destination'
    },
    {
      status: 'delivered',
      labelAr: 'تم التسليم بنجاح',
      labelEn: 'Delivered',
      descAr: 'تم استلام الشحنة وإتمام المعاملة الملكية',
      descEn: 'Safely handed over to recipient'
    }
  ];

  const getStepIndex = (status: OrderStatus) => {
    return steps.findIndex((s) => s.status === status);
  };

  const currentStepIndex = order ? getStepIndex(order.status) : 0;

  // Simulator to test moving the order through all 6 stages
  const handleAdvanceStatus = () => {
    if (!order) return;
    const nextIdx = (currentStepIndex + 1) % steps.length;
    const nextStatus = steps[nextIdx].status;
    updateOrderStatus(order.id, nextStatus);
  };

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 sm:pb-32">
      {/* Search Header for Tracking Any Order */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#D7AD55]/15">
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#D7AD55] font-semibold tracking-wider uppercase mb-1">
            <Truck className="w-3.5 h-3.5" />
            <span>{t('تتبع الشحنات المباشر', 'Real-Time Dispatch Tracking')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4EAD5]">
            {t('متابعة مسار طلبك الملكي', 'Track Your Luxury Order')}
          </h1>
        </div>

        {/* Search Order Number */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 w-4 h-4 text-[#D7AD55]" />
            <input
              type="text"
              value={searchOrderNumber}
              onChange={(e) => setSearchOrderNumber(e.target.value)}
              placeholder="AJ-2026-XXXX"
              className="bg-[#121212] border border-[#D7AD55]/30 text-[#F4EAD5] text-xs rounded-xl py-2.5 px-9 outline-none uppercase font-mono w-44"
            />
          </div>
        </div>
      </div>

      {!order ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-[#121212] border border-[#D7AD55]/15 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-[#D7AD55] mx-auto mb-4" />
          <h2 className="text-base font-bold font-serif text-[#F4EAD5] mb-2">
            {t('لم يتم العثور على طلب بهذا الرقم', 'No Order Found')}
          </h2>
          <p className="text-xs text-[#F4EAD5]/60 mb-6">
            {t('تأكد من إدخال رقم الطلب الصحيح أو قم بإتمام أول طلب تجربة.', 'Please verify the order number or place an order to track.')}
          </p>
          <button
            onClick={() => setCurrentTab('home')}
            className="gold-button px-6 py-2.5 rounded-full text-xs font-semibold"
          >
            {t('العودة للتسوق', 'Return to Store')}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Status Overview Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#121212] border border-[#D7AD55]/30 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D7AD55]/15 pb-6">
              <div>
                <span className="text-[11px] text-[#D7AD55] tracking-widest uppercase font-semibold">
                  {t('رقم الطلب المعتمد', 'Verified Order Reference')}
                </span>
                <div className="flex items-center space-x-3 rtl:space-x-reverse mt-1">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#F4D98E]">
                    {order.orderNumber}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D7AD55]/20 text-[#F4D98E] border border-[#D7AD55]/40">
                    {order.paymentStatus === 'paid' ? t('مدفوع مؤكد', 'Paid & Verified') : t('الدفع عند الاستلام', 'COD')}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Print Invoice button */}
                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#181818] border border-[#D7AD55]/30 hover:border-[#D7AD55] text-xs font-medium text-[#F4EAD5] flex items-center space-x-2 rtl:space-x-reverse transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#D7AD55]" />
                  <span>{t('الفاتورة الضريبية', 'Tax Invoice')}</span>
                </button>

                {/* Advance Status simulator button for testing */}
                <button
                  onClick={handleAdvanceStatus}
                  className="px-4 py-2 rounded-xl bg-[#1a1813] border border-[#D7AD55]/50 text-xs font-semibold text-[#D7AD55] hover:bg-[#D7AD55] hover:text-[#080808] transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
                  title="محاكاة تقدم الحالة لاختبار النظام"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('محاكاة تحديث الحالة ⟳', 'Simulate Next Stage ⟳')}</span>
                </button>
              </div>
            </div>

            {/* Estimated Arrival Banner */}
            <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#F4EAD5]/80 gap-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Clock className="w-4 h-4 text-[#D7AD55]" />
                <span>
                  {t('الموعد المتوقع للتسليم:', 'Estimated Delivery:')}{' '}
                  <b className="text-[#F4D98E]">{order.estimatedDelivery}</b>
                </span>
              </div>
              <div className="text-[#F4EAD5]/50 font-mono">
                {t('رقم التتبع الملكي:', 'Tracking No:')} {order.trackingNumber || 'AJ-VIP-99410'}
              </div>
            </div>

            {/* 6-Stage Timeline Stepper */}
            <div className="pt-8 pb-4">
              <div className="relative">
                {/* Line background */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-[#222] -translate-y-1/2" />
                <div
                  className="hidden md:block absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-[#D7AD55] to-[#F4D98E] -translate-y-1/2 transition-all duration-500"
                  style={{
                    width: `${(currentStepIndex / (steps.length - 1)) * 100}%`
                  }}
                />

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
                  {steps.map((step, idx) => {
                    const isPassed = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div
                        key={step.status}
                        className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all ${
                          isCurrent
                            ? 'bg-[#181818] border border-[#D7AD55] shadow-[0_0_15px_rgba(215,173,85,0.25)]'
                            : 'bg-transparent'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                            isCurrent
                              ? 'bg-[#D7AD55] text-[#080808] ring-4 ring-[#D7AD55]/20 animate-pulse'
                              : isPassed
                              ? 'bg-[#D7AD55] text-[#080808]'
                              : 'bg-[#222] text-[#F4EAD5]/40 border border-white/10'
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>

                        <span
                          className={`text-xs font-bold mb-0.5 leading-tight ${
                            isCurrent
                              ? 'text-[#F4D98E]'
                              : isPassed
                              ? 'text-[#F4EAD5]'
                              : 'text-[#F4EAD5]/40'
                          }`}
                        >
                          {lang === 'ar' ? step.labelAr : step.labelEn}
                        </span>

                        <span className="text-[10px] text-[#F4EAD5]/50 leading-tight hidden md:block">
                          {lang === 'ar' ? step.descAr : step.descEn}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Details & Delivery Address Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Recipient Info */}
            <div className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4">
              <h3 className="text-sm font-bold font-serif text-[#F4D98E] flex items-center space-x-2 rtl:space-x-reverse border-b border-[#D7AD55]/15 pb-2">
                <MapPin className="w-4 h-4 text-[#D7AD55]" />
                <span>{t('تفاصيل المستلم والعنوان', 'Recipient & Destination')}</span>
              </h3>

              <div className="space-y-2 text-xs text-[#F4EAD5]/80">
                <div className="flex justify-between">
                  <span className="text-[#F4EAD5]/50">{t('المستلم:', 'Recipient:')}</span>
                  <span className="font-bold text-[#F4EAD5]">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F4EAD5]/50">{t('رقم الجوال:', 'Phone:')}</span>
                  <span className="font-mono text-[#F4EAD5]">{order.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F4EAD5]/50">{t('المدينة والحي:', 'Destination:')}</span>
                  <span className="text-[#F4EAD5]">
                    {order.address.city} — {order.address.region}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F4EAD5]/50">{t('الشارع:', 'Street:')}</span>
                  <span className="text-[#F4EAD5]">{order.address.street}</span>
                </div>
                {order.customerNote && (
                  <div className="pt-2 text-[11px] text-[#D7AD55] bg-[#181818] p-2.5 rounded-xl border border-[#D7AD55]/15">
                    <b>{t('ملاحظة العميل:', 'Client Note:')}</b> {order.customerNote}
                  </div>
                )}
              </div>
            </div>

            {/* Order Items Breakdown */}
            <div className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4">
              <h3 className="text-sm font-bold font-serif text-[#F4D98E] flex items-center space-x-2 rtl:space-x-reverse border-b border-[#D7AD55]/15 pb-2">
                <Package className="w-4 h-4 text-[#D7AD55]" />
                <span>{t('المقتنيات المشمولة في الشحنة', 'Items Included')} ({order.items.length})</span>
              </h3>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 rtl:space-x-reverse text-xs">
                    <img
                      src={item.productImage}
                      alt=""
                      className="w-11 h-11 rounded-lg object-cover bg-[#181818] border border-[#D7AD55]/20"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#F4EAD5] truncate">{item.productName}</div>
                      <div className="text-[#F4EAD5]/50">
                        {item.quantity} × {formatPrice(item.unitPrice)}
                        {item.variantName && ` · ${item.variantName}`}
                      </div>
                    </div>
                    <div className="font-bold text-[#F4D98E]">{formatPrice(item.lineTotal)}</div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#D7AD55]/15 flex justify-between items-baseline text-sm font-bold text-[#F4D98E]">
                <span>{t('المبلغ الإجمالي المدفوع:', 'Total Paid:')}</span>
                <span className="text-lg font-serif">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Luxury Printable Invoice Modal */}
      {showInvoiceModal && order && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#D7AD55]/40 rounded-3xl p-6 sm:p-8 text-[#F4EAD5] shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#D7AD55]/20 pb-6 mb-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-12 h-12 rounded-full bg-[#181818] border border-[#D7AD55]/30 p-2">
                  <img src="/brand-emblem.svg" alt="" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#F4EAD5]">عالم الجمال | ALAM ALJAMAL</h2>
                  <p className="text-[11px] text-[#D7AD55] tracking-widest uppercase">فاتورة ضريبية ملكية مبسطة</p>
                </div>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-[#F4EAD5]/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs text-[#F4EAD5]/80 mb-6 bg-[#141414] p-4 rounded-xl border border-[#D7AD55]/15">
              <div>
                <span className="text-[#F4EAD5]/50 block">رقم الفاتورة:</span>
                <span className="font-mono font-bold text-[#F4D98E]">{order.orderNumber}</span>
              </div>
              <div>
                <span className="text-[#F4EAD5]/50 block">تاريخ الإصدار:</span>
                <span>{new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}</span>
              </div>
              <div>
                <span className="text-[#F4EAD5]/50 block">اسم العميل:</span>
                <span className="font-bold">{order.customerName}</span>
              </div>
              <div>
                <span className="text-[#F4EAD5]/50 block">طريقة السداد:</span>
                <span className="capitalize">{order.paymentMethod.replace('_', ' ')} (ناجح)</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="divide-y divide-[#D7AD55]/10 text-xs mb-6 max-h-40 overflow-y-auto">
              {order.items.map((item, i) => (
                <div key={i} className="py-2.5 flex justify-between">
                  <div>
                    <span className="font-bold text-[#F4EAD5]">{item.productName}</span>
                    <span className="text-[#F4EAD5]/50 block text-[10px]">الكمية: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-[#F4D98E]">{formatPrice(item.lineTotal)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-[#D7AD55]/25 flex justify-between items-center text-sm font-bold text-[#F4D98E]">
              <span>الإجمالي الكلي شامل الضريبة (15%):</span>
              <span className="text-xl font-serif">{formatPrice(order.total)}</span>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

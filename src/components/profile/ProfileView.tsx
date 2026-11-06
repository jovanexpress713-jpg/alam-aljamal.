import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Address } from '../../types/commerce';
import {
  User,
  Shield,
  MapPin,
  Package,
  Bell,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  FileText,
  HelpCircle,
  Phone,
  Sparkles,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    user,
    orders,
    addresses,
    notifications,
    addAddress,
    deleteAddress,
    loginAs,
    updateProfile,
    logout,
    setCurrentTab,
    setActiveTrackingOrderId,
    setInfoModal,
    formatPrice,
    lang,
    t,
    notify
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'notifications'>('orders');

  // Address modal / inline add
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('الرياض');
  const [newRegion, setNewRegion] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Profile Edit
  const [editName, setEditName] = useState(user?.fullName || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  // Auth toggle if logged out
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const ChevronIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient.trim() || !newPhone.trim() || !newStreet.trim()) {
      notify(lang === 'ar' ? 'يرجى إكمال الحقول الإلزامية للعنوان' : 'Please fill all required address fields', 'error');
      return;
    }
    addAddress({
      recipientName: newRecipient,
      phone: newPhone,
      city: newCity,
      region: newRegion,
      street: newStreet,
      notes: newNotes,
      isDefault: addresses.length === 0
    });
    setShowAddAddress(false);
    setNewRecipient('');
    setNewPhone('');
    setNewRegion('');
    setNewStreet('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName,
      phone: editPhone,
      email: editEmail
    });
  };

  // If user is logged out, show the luxury Authentication screen
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 pb-32">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#141414] border border-[#D7AD55]/40 flex items-center justify-center p-3">
            <img src="/brand-emblem.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#F4EAD5] mb-2">
            {authMode === 'signin'
              ? t('تسجيل الدخول إلى عالم الجمال', 'Sign In to ALAM ALJAMAL')
              : t('إنشاء عضوية ملكية جديدة', 'Create Royal Membership')}
          </h1>
          <p className="text-xs text-[#F4EAD5]/60">
            {t(
              'انضم إلى نخبة عملاء عالم الجمال للاستمتاع بخصومات وتتبع حصري.',
              'Access bespoke privilege tiers, saved orders, and VIP concierge.'
            )}
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="p-4 rounded-2xl bg-[#141414] border border-[#D7AD55]/25 mb-6 text-center space-y-2.5">
          <span className="text-[11px] font-bold text-[#D7AD55] block">
            {t('دخول سريع للمعاينة والتحكّم:', 'Instant Quick Demo Access:')}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => loginAs('customer')}
              className="flex-1 py-2.5 rounded-xl bg-[#1f1f1f] hover:bg-[#252525] border border-[#D7AD55]/30 text-xs font-semibold text-[#F4EAD5]"
            >
              {t('حساب عميل VIP', 'VIP Customer')}
            </button>
            <button
              onClick={() => loginAs('admin')}
              className="flex-1 py-2.5 rounded-xl bg-[#D7AD55] text-[#080808] hover:bg-[#F4D98E] text-xs font-bold"
            >
              {t('حساب مدير النظام (Admin)', 'Store Admin')}
            </button>
          </div>
        </div>

        {/* Auth form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginAs('customer');
          }}
          className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4"
        >
          <div>
            <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('البريد الإلكتروني', 'Email')}</label>
            <input
              type="email"
              required
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="client@alamaljamal.luxury"
              className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('كلمة المرور', 'Password')}</label>
            <input
              type="password"
              required
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
            />
          </div>

          <button
            type="submit"
            className="gold-button w-full py-3.5 rounded-xl text-xs font-bold shadow-lg"
          >
            {authMode === 'signin' ? t('دخول آمن', 'Sign In') : t('تأكيد التسجيل', 'Register')}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              className="text-xs text-[#D7AD55] hover:underline"
            >
              {authMode === 'signin'
                ? t('ليس لديك حساب؟ اشترك كعضو جديد', "Don't have an account? Sign up")
                : t('لديك حساب بالفعل؟ تسجيل الدخول', 'Already have an account? Sign in')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 sm:pb-32">
      {/* Customer Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121212] via-[#1a1610] to-[#121212] border border-[#D7AD55]/30 shadow-2xl mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 rtl:sm:space-x-reverse text-center sm:text-start">
          <div className="relative">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'}
              alt={user.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#D7AD55] p-1 bg-[#080808] shadow-[0_0_20px_rgba(215,173,85,0.3)]"
            />
            <span className="absolute bottom-0 right-0 rtl:right-auto rtl:left-0 bg-[#D7AD55] text-[#080808] p-1 rounded-full text-[10px]">
              ✦
            </span>
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse">
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#F4EAD5]">
                {user.fullName}
              </h1>
              {user.role === 'admin' && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D7AD55] text-[#080808]">
                  SUPER ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-[#F4EAD5]/60 font-mono mt-0.5">{user.email}</p>
            <div className="flex items-center justify-center sm:justify-start space-x-2 rtl:space-x-reverse mt-2">
              <span className="text-[11px] font-semibold text-[#F4D98E] bg-[#181818] px-3 py-1 rounded-full border border-[#D7AD55]/30">
                {t('فئة العضوية:', 'Tier:')} {user.vipTier}
              </span>
              <span className="text-[11px] text-[#F4EAD5]/50">
                {t('عضو منذ', 'Member since')} {user.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Admin Shortcut & Sign Out */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {user.role === 'admin' && (
            <button
              onClick={() => setCurrentTab('admin')}
              className="px-4 py-2.5 rounded-xl bg-[#D7AD55] text-[#080808] font-bold text-xs flex items-center space-x-1.5 rtl:space-x-reverse shadow-[0_0_15px_rgba(215,173,85,0.35)]"
            >
              <Shield className="w-4 h-4" />
              <span>{t('لوحة الإدارة الشاملة', 'Admin Console')}</span>
            </button>
          )}

          <button
            onClick={logout}
            className="p-2.5 rounded-xl bg-[#181818] border border-[#D7AD55]/30 text-[#F4EAD5]/70 hover:text-rose-400 transition-colors"
            title={t('تسجيل الخروج', 'Sign Out')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#D7AD55]/20 mb-8 overflow-x-auto pb-1 text-xs font-semibold space-x-8 rtl:space-x-reverse">
        {[
          { id: 'orders', label: t('سجل الطلبات', 'Orders History'), count: orders.length },
          { id: 'addresses', label: t('دفتر العناوين', 'Saved Addresses'), count: addresses.length },
          { id: 'notifications', label: t('مركز الإشعارات', 'Notifications'), count: notifications.length },
          { id: 'profile', label: t('تعديل البيانات', 'Account Details') }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 whitespace-nowrap transition-colors relative flex items-center space-x-2 rtl:space-x-reverse ${
              activeTab === tab.id ? 'text-[#F4D98E]' : 'text-[#F4EAD5]/50 hover:text-[#F4EAD5]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#181818] border border-[#D7AD55]/20 text-[#D7AD55]">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D7AD55]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-[#121212] border border-[#D7AD55]/15">
              <Package className="w-10 h-10 text-[#D7AD55] mx-auto mb-3" />
              <h3 className="text-sm font-bold font-serif text-[#F4EAD5] mb-1">
                {t('لا توجد طلبات سابقة بعد', 'No Orders Yet')}
              </h3>
              <p className="text-xs text-[#F4EAD5]/60 mb-4">
                {t('اكتشف منتجات عالم الجمال واطلب أول شحنة الآن.', 'Explore our collections and place your first order.')}
              </p>
              <button
                onClick={() => setCurrentTab('products')}
                className="gold-button px-5 py-2 rounded-full text-xs font-semibold"
              >
                {t('تصفح المنتجات', 'Shop Now')}
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-2xl bg-[#121212] border border-[#D7AD55]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D7AD55]/50 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-sm font-bold font-mono text-[#F4D98E]">
                      {ord.orderNumber}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#181818] border border-[#D7AD55]/30 text-[#D7AD55]">
                      {ord.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-[#F4EAD5]/60">
                    {new Date(ord.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')} ·{' '}
                    {ord.items.length} {t('منتجات', 'items')} · {formatPrice(ord.total)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTrackingOrderId(ord.id);
                      setCurrentTab('tracking');
                    }}
                    className="gold-button px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    <span>{t('تتبع الشحنة المباشر', 'Track Live')}</span>
                    <ChevronIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#F4EAD5]/70">
              {t('إدارة العناوين المسجلة للتوصيل السريع', 'Manage delivery addresses')}
            </span>
            <button
              onClick={() => setShowAddAddress(!showAddAddress)}
              className="gold-button px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('إضافة عنوان جديد', 'Add Address')}</span>
            </button>
          </div>

          {/* New address form */}
          {showAddAddress && (
            <form onSubmit={handleCreateAddress} className="p-5 rounded-2xl bg-[#141414] border border-[#D7AD55]/40 space-y-3">
              <h4 className="text-xs font-bold text-[#D7AD55]">{t('بيانات العنوان الجديد', 'New Address Form')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={t('اسم المستلم', 'Recipient Name')}
                  required
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-xs text-[#F4EAD5] outline-none"
                />
                <input
                  type="tel"
                  placeholder={t('رقم الجوال', 'Mobile Phone')}
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-xs text-[#F4EAD5] outline-none"
                />
                <input
                  type="text"
                  placeholder={t('المدينة', 'City')}
                  required
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-xs text-[#F4EAD5] outline-none"
                />
                <input
                  type="text"
                  placeholder={t('الحي / المنطقة', 'District / Area')}
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-xs text-[#F4EAD5] outline-none"
                />
                <input
                  type="text"
                  placeholder={t('الشارع ورقم المبنى', 'Street Address')}
                  required
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  className="sm:col-span-2 bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-xs text-[#F4EAD5] outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAddress(false)}
                  className="px-3 py-1.5 text-xs text-[#F4EAD5]/60 hover:text-white"
                >
                  {t('إلغاء', 'Cancel')}
                </button>
                <button type="submit" className="gold-button px-4 py-1.5 rounded-xl text-xs font-semibold">
                  {t('حفظ العنوان', 'Save Address')}
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-5 rounded-2xl bg-[#121212] border border-[#D7AD55]/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#F4EAD5]">{addr.recipientName}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-[#D7AD55]/20 text-[#F4D98E] px-2 py-0.5 rounded-full border border-[#D7AD55]/40 font-bold">
                        {t('افتراضي', 'Default')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#F4EAD5]/70 mb-1">
                    {addr.city} — {addr.region}
                  </p>
                  <p className="text-xs text-[#F4EAD5]/50">{addr.street}</p>
                  <p className="text-[11px] font-mono text-[#D7AD55] mt-1">{addr.phone}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#D7AD55]/15 flex justify-end">
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t('حذف', 'Delete')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-4 rounded-2xl bg-[#121212] border border-[#D7AD55]/20 flex items-start space-x-3 rtl:space-x-reverse"
            >
              <div className="p-2 rounded-xl bg-[#181818] text-[#D7AD55] shrink-0 border border-[#D7AD55]/20">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-[#F4D98E]">
                    {lang === 'ar' ? notif.titleAr : notif.titleEn}
                  </h4>
                  <span className="text-[10px] text-[#F4EAD5]/40">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-[#F4EAD5]/70 leading-relaxed">
                  {lang === 'ar' ? notif.messageAr : notif.messageEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Profile Details Edit */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4 max-w-xl">
          <h3 className="text-sm font-bold font-serif text-[#F4D98E] mb-2">{t('تعديل البيانات الشخصية', 'Edit Profile')}</h3>
          <div>
            <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('الاسم بالكامل', 'Full Name')}</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('البريد الإلكتروني', 'Email')}</label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-[#F4EAD5]/70 mb-1">{t('رقم الجوال', 'Mobile Phone')}</label>
            <input
              type="tel"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-3 text-xs text-[#F4EAD5] outline-none"
            />
          </div>
          <button type="submit" className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold">
            {t('حفظ التغييرات', 'Save Changes')}
          </button>
        </form>
      )}

      {/* Store Policies & Information links */}
      <div className="mt-12 pt-8 border-t border-[#D7AD55]/20">
        <h3 className="text-xs font-semibold text-[#D7AD55] tracking-widest uppercase mb-4">
          {t('معلومات وسياسات عالم الجمال', 'Maison Policies & Concierge')}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {[
            { id: 'about', label: t('من نحن وقصة الدار', 'About Maison'), icon: Sparkles },
            { id: 'contact', label: t('اتصل بـ VIP Concierge', 'VIP Concierge'), icon: Phone },
            { id: 'returns', label: t('الضمان الذهبي والاسترجاع', 'Golden Warranty'), icon: Shield },
            { id: 'privacy', label: t('سياسة الخصوصية والأمان', 'Privacy Policy'), icon: FileText },
            { id: 'terms', label: t('شروط الاستخدام والخدمة', 'Terms of Service'), icon: FileText },
            { id: 'faq', label: t('الأسئلة المتكررة', 'FAQ'), icon: HelpCircle }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setInfoModal(item.id as any)}
                className="p-3.5 rounded-2xl bg-[#121212] border border-[#D7AD55]/15 hover:border-[#D7AD55]/40 text-start flex items-center justify-between group transition-all"
              >
                <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                  <Icon className="w-4 h-4 text-[#D7AD55]" />
                  <span className="text-[#F4EAD5] group-hover:text-[#F4D98E] font-medium">{item.label}</span>
                </div>
                <ChevronIcon className="w-3.5 h-3.5 text-[#F4EAD5]/40 group-hover:text-[#D7AD55]" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

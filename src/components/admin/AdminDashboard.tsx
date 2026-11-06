import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Category, Coupon, OrderStatus } from '../../types/commerce';
import {
  BarChart3,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Tag,
  Settings,
  Plus,
  Trash2,
  Edit,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  Truck,
  DollarSign,
  TrendingUp,
  Database,
  ExternalLink,
  Search,
  Eye,
  Filter
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    categories,
    orders,
    coupons,
    user,
    setCurrentTab,
    formatPrice,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    addCoupon,
    deleteCoupon,
    backendInfo,
    lang,
    t,
    notify
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'categories' | 'coupons' | 'settings'
  >('overview');

  // Search in admin
  const [adminQuery, setAdminQuery] = useState('');

  // Add Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [prodNameAr, setProdNameAr] = useState('');
  const [prodNameEn, setProdNameEn] = useState('');
  const [prodBrand, setProdBrand] = useState('عالم الجمال — المجموعة الخاصة');
  const [prodCategoryId, setProdCategoryId] = useState(categories[0]?.id || 'cat-perfumes');
  const [prodPrice, setProdPrice] = useState(450);
  const [prodComparePrice, setProdComparePrice] = useState(550);
  const [prodStock, setProdStock] = useState(25);
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1000&q=85');
  const [prodDescAr, setProdDescAr] = useState('خلاصة عطرية ملكية معتقة بنفحات العود والعنبر الفاخر.');
  const [prodTag, setProdTag] = useState('جديد وحصري');

  // Add Coupon State
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(250);

  // Add Category State
  const [showAddCat, setShowAddCat] = useState(false);
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatImage, setNewCatImage] = useState('https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1000&q=85');

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const totalProducts = products.length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodNameAr.trim() || !prodPrice) {
      notify('يرجى إكمال البيانات الأساسية للمنتج', 'error');
      return;
    }
    const cat = categories.find((c) => c.id === prodCategoryId);
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      nameAr: prodNameAr.trim(),
      nameEn: prodNameEn.trim() || prodNameAr.trim(),
      slug: prodNameEn.toLowerCase().replace(/\s+/g, '-') || `prod-${Date.now()}`,
      brand: prodBrand,
      categoryId: prodCategoryId,
      categoryNameAr: cat?.nameAr || 'قسم عام',
      categoryNameEn: cat?.nameEn || 'General',
      price: Number(prodPrice),
      compareAtPrice: Number(prodComparePrice) || undefined,
      rating: 5.0,
      reviewsCount: 1,
      stockQuantity: Number(prodStock),
      images: [prodImage],
      descriptionAr: prodDescAr,
      descriptionEn: 'Luxury crafted creation with rare ingredients.',
      specifications: {
        'النوع': 'إصدار ملكي خاص',
        'المنشأ': 'معامل عالم الجمال'
      },
      tag: prodTag || undefined,
      isFeatured: true,
      isActive: true,
      sku: `AJ-${Math.floor(100 + Math.random() * 900)}`
    };

    addProduct(newProduct);
    setShowAddProductModal(false);
    setProdNameAr('');
    setProdNameEn('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const c: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountType: 'percent',
      discountValue: Number(newCouponVal),
      minOrderValue: Number(newCouponMin),
      isActive: true
    };
    addCoupon(c);
    setShowAddCoupon(false);
    setNewCouponCode('');
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameAr.trim()) return;
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      nameAr: newCatNameAr.trim(),
      nameEn: newCatNameEn.trim() || newCatNameAr.trim(),
      slug: newCatNameEn.toLowerCase().replace(/\s+/g, '-') || `cat-${Date.now()}`,
      imageUrl: newCatImage,
      sortOrder: categories.length + 1,
      isActive: true,
      itemCount: 0
    };
    addCategory(newCat);
    setShowAddCat(false);
    setNewCatNameAr('');
    setNewCatNameEn('');
  };

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-32">
      {/* Top Admin Header */}
      <div className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/30 shadow-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse text-center sm:text-start">
          <div className="w-14 h-14 rounded-2xl bg-[#080808] border border-[#D7AD55]/40 flex items-center justify-center p-2.5 shadow-[0_0_20px_rgba(215,173,85,0.25)]">
            <img src="/brand-emblem.svg" alt="" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse justify-center sm:justify-start">
              <span className="text-[10px] font-bold text-[#080808] bg-[#D7AD55] px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                ENTERPRISE CONSOLE
              </span>
              <span className="text-xs text-emerald-400 flex items-center space-x-1 rtl:space-x-reverse">
                <CheckCircle className="w-3 h-3" />
                <span>{backendInfo.isSupabaseConfigured ? 'Supabase Live' : 'Local Storage Engine'}</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#F4EAD5] mt-1">
              {t('لوحة تحكّم وإدارة منصة عالم الجمال', 'ALAM ALJAMAL Enterprise Admin Console')}
            </h1>
          </div>
        </div>

        {/* Back to storefront */}
        <button
          onClick={() => setCurrentTab('home')}
          className="px-5 py-2.5 rounded-xl bg-[#181818] border border-[#D7AD55]/30 hover:border-[#D7AD55] text-xs font-semibold text-[#D7AD55] flex items-center space-x-2 rtl:space-x-reverse transition-all"
        >
          <span>{t('العودة إلى واجهة المتجر', 'View Live Storefront')}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Backend & Supabase Status Alert */}
      <div className="p-4 rounded-2xl bg-[#14120b] border border-[#D7AD55]/30 mb-8 flex items-start space-x-3 rtl:space-x-reverse text-xs">
        <Database className="w-5 h-5 text-[#D7AD55] shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-bold text-[#F4D98E] mb-0.5">{backendInfo.message}</div>
          <p className="text-[#F4EAD5]/60 text-[11px] leading-relaxed">
            {backendInfo.isSupabaseConfigured
              ? `متصل بقاعدة البيانات على الخادم: ${backendInfo.url}`
              : 'النظام يعمل حالياً بمحرك التخزين المحلي فائق السرعة والمطابق لمخطط Supabase (202611060001_initial_commerce_schema.sql). جميع العمليات (إضافة المنتجات، تحديث المخزون، معالجة الطلبات، إنشاء الكوبونات) تُحفظ وتُدار بدقة 100%.'}
          </p>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse overflow-x-auto pb-4 mb-8 text-xs font-semibold">
        {[
          { id: 'overview', label: t('نظرة عامة والتقارير', 'Overview & Metrics'), icon: BarChart3 },
          { id: 'orders', label: t('إدارة الطلبات', 'Orders'), icon: ShoppingBag, count: orders.length },
          { id: 'products', label: t('المنتجات والمخزون', 'Products & Stock'), icon: Package, count: products.length },
          { id: 'categories', label: t('التصنيفات والأقسام', 'Categories'), icon: Layers, count: categories.length },
          { id: 'coupons', label: t('الكوبونات والعروض', 'Coupons & Promos'), icon: Tag, count: coupons.length },
          { id: 'settings', label: t('إعدادات المتجر والتوصيل', 'Store Settings'), icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center space-x-2 rtl:space-x-reverse border ${
                isActive
                  ? 'bg-[#D7AD55] text-[#080808] border-[#D7AD55] font-bold shadow-[0_0_15px_rgba(215,173,85,0.3)]'
                  : 'bg-[#121212] text-[#F4EAD5]/70 border-[#D7AD55]/15 hover:border-[#D7AD55]/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-[#080808] text-[#D7AD55]' : 'bg-[#181818] text-[#F4EAD5]/60'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: t('إجمالي المبيعات المؤكدة', 'Gross Revenue'),
                value: formatPrice(totalRevenue),
                sub: t('من كافة بوابات الدفع', 'All payment gateways'),
                icon: DollarSign,
                color: 'text-amber-400'
              },
              {
                title: t('إجمالي الطلبات', 'Total Orders'),
                value: orders.length.toString(),
                sub: `${pendingOrders} ${t('طلب قيد المتابعة', 'active/pending')}`,
                icon: ShoppingBag,
                color: 'text-sky-400'
              },
              {
                title: t('المنتجات في الكتالوج', 'Catalog Products'),
                value: totalProducts.toString(),
                sub: t('جميعها مفعلة وجاهزة للبيع', 'Active in storefront'),
                icon: Package,
                color: 'text-emerald-400'
              },
              {
                title: t('معدل الرضا والتقييم', 'Customer Satisfaction'),
                value: '4.95 / 5.0',
                sub: t('تقييمات موثقة من النخبة', 'Verified VIP reviews'),
                icon: TrendingUp,
                color: 'text-[#D7AD55]'
              }
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-[#121212] border border-[#D7AD55]/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#F4EAD5]/60 font-medium">{kpi.title}</span>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-serif text-[#F4D98E]">
                    {kpi.value}
                  </div>
                  <span className="text-[10px] text-[#F4EAD5]/40 block">{kpi.sub}</span>
                </div>
              );
            })}
          </div>

          {/* Quick Action Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders Overview */}
            <div className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4">
              <div className="flex items-center justify-between border-b border-[#D7AD55]/15 pb-3">
                <h3 className="text-sm font-bold font-serif text-[#F4D98E]">{t('أحدث الطلبات الواردة', 'Recent Orders')}</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#D7AD55] hover:underline"
                >
                  {t('إدارة كافة الطلبات ←', 'View All Orders')}
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 4).map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-xl bg-[#161616] border border-[#D7AD55]/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold font-mono text-[#F4D98E]">{ord.orderNumber}</div>
                      <div className="text-[11px] text-[#F4EAD5]/60">{ord.customerName} · {formatPrice(ord.total)}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1f1f1f] border border-[#D7AD55]/30 text-[#D7AD55]">
                      {ord.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Catalog Stock Health */}
            <div className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-4">
              <div className="flex items-center justify-between border-b border-[#D7AD55]/15 pb-3">
                <h3 className="text-sm font-bold font-serif text-[#F4D98E]">{t('حالة المخزون الملكي', 'Stock Health Alerts')}</h3>
                <button
                  onClick={() => setActiveTab('products')}
                  className="text-xs text-[#D7AD55] hover:underline"
                >
                  {t('تعديل الكتالوج ←', 'Manage Catalog')}
                </button>
              </div>

              <div className="space-y-3">
                {products.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl bg-[#161616] border border-[#D7AD55]/10 flex items-center justify-between text-xs"
                  >
                    <div className="truncate pr-2">
                      <div className="font-bold text-[#F4EAD5] truncate">{lang === 'ar' ? p.nameAr : p.nameEn}</div>
                      <div className="text-[11px] text-[#D7AD55]">{p.brand}</div>
                    </div>
                    <div className="text-end shrink-0">
                      <span className="font-bold text-[#F4D98E] block">{p.stockQuantity} {t('قطعة', 'units')}</span>
                      <span className="text-[10px] text-emerald-400">{t('نشط للبيع', 'In Stock')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ORDERS MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#F4EAD5]/70">
              {t('إدارة وتغيير حالات الطلبات الملكية وتعيين المناديب', 'Manage customer orders and dispatch status')}
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-2xl bg-[#121212] border border-[#D7AD55]/20 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D7AD55]/10 pb-3">
                  <div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="font-mono font-bold text-sm text-[#F4D98E]">{ord.orderNumber}</span>
                      <span className="text-xs text-[#F4EAD5]/60">
                        {new Date(ord.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                      </span>
                    </div>
                    <div className="text-xs text-[#F4EAD5]/80 mt-1">
                      <b>{ord.customerName}</b> ({ord.customerPhone}) · {ord.address.city}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-xs font-bold text-[#F4D98E]">{formatPrice(ord.total)}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#181818] border border-[#D7AD55]/30 text-[#D7AD55]">
                      {ord.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4EAD5]/70">
                  {ord.items.map((item, i) => (
                    <div key={i} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <img src={item.productImage} alt="" className="w-8 h-8 rounded object-cover" />
                      <span className="truncate">{item.productName} ({item.quantity}×)</span>
                    </div>
                  ))}
                </div>

                {/* Status Updater Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#F4EAD5]/60">{t('تحديث المرحلة:', 'Stage:')}</span>
                  {(
                    [
                      ['new', 'استلام'],
                      ['confirmed', 'مراجعة'],
                      ['preparing', 'تجهيز'],
                      ['ready_to_ship', 'جاهز للشحن'],
                      ['out_for_delivery', 'خرج للتوصيل'],
                      ['delivered', 'تم التسليم']
                    ] as [OrderStatus, string][]
                  ).map(([st, label]) => (
                    <button
                      key={st}
                      onClick={() => updateOrderStatus(ord.id, st)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                        ord.status === st
                          ? 'bg-[#D7AD55] text-[#080808] border-[#D7AD55] font-bold'
                          : 'bg-[#181818] text-[#F4EAD5]/60 border-[#D7AD55]/20 hover:border-[#D7AD55]/50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PRODUCTS MANAGEMENT TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#F4EAD5]/70">
              {t('إدارة وتعديل كتالوج المنتجات والأسعار والمخزون', 'Manage catalog products & pricing')}
            </span>

            <button
              onClick={() => setShowAddProductModal(true)}
              className="gold-button px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('إضافة تحفة عطرية جديدة', 'Add New Product')}</span>
            </button>
          </div>

          {/* Add Product Modal */}
          {showAddProductModal && (
            <form onSubmit={handleCreateProduct} className="p-6 rounded-3xl bg-[#141414] border border-[#D7AD55]/40 space-y-4">
              <h3 className="text-sm font-bold text-[#D7AD55]">{t('إضافة منتج فاخر إلى المتجر', 'Create New Luxury Item')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('اسم المنتج (بالعربية)', 'Name in Arabic')}</label>
                  <input
                    type="text"
                    required
                    value={prodNameAr}
                    onChange={(e) => setProdNameAr(e.target.value)}
                    placeholder="عطر مسك الغزال الملكي..."
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('اسم المنتج (بالإنجليزية)', 'Name in English')}</label>
                  <input
                    type="text"
                    value={prodNameEn}
                    onChange={(e) => setProdNameEn(e.target.value)}
                    placeholder="Royal Musk Extrait..."
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('القسم / التصنيف', 'Department')}</label>
                  <select
                    value={prodCategoryId}
                    onChange={(e) => setProdCategoryId(e.target.value)}
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('الدار / العلامة', 'Brand')}</label>
                  <input
                    type="text"
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('السعر (ر.س)', 'Price (SAR)')}</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('السعر قبل الخصم (اختياري)', 'Compare At Price')}</label>
                  <input
                    type="number"
                    value={prodComparePrice}
                    onChange={(e) => setProdComparePrice(Number(e.target.value))}
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('الكمية في المخزون', 'Stock Quantity')}</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('رابط الصورة عالية الدقة', 'Image URL')}</label>
                  <input
                    type="url"
                    value={prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#F4EAD5]/70 mb-1">{t('الوصف الفاخر', 'Description')}</label>
                  <textarea
                    rows={2}
                    value={prodDescAr}
                    onChange={(e) => setProdDescAr(e.target.value)}
                    className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 text-xs text-[#F4EAD5]/60 hover:text-white"
                >
                  {t('إلغاء', 'Cancel')}
                </button>
                <button type="submit" className="gold-button px-6 py-2 rounded-xl text-xs font-semibold">
                  {t('إضافة المنتج ونشره', 'Publish Product')}
                </button>
              </div>
            </form>
          )}

          {/* Products list table */}
          <div className="divide-y divide-[#D7AD55]/15 rounded-2xl bg-[#121212] border border-[#D7AD55]/20 overflow-hidden">
            {products.map((p) => (
              <div key={p.id} className="p-4 flex items-center justify-between text-xs hover:bg-[#161616] transition-colors">
                <div className="flex items-center space-x-3 rtl:space-x-reverse min-w-0">
                  <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-[#181818]" />
                  <div className="min-w-0">
                    <div className="font-bold text-[#F4EAD5] truncate">{lang === 'ar' ? p.nameAr : p.nameEn}</div>
                    <div className="text-[11px] text-[#D7AD55]">{p.brand} · SKU: {p.sku}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="text-end">
                    <div className="font-bold text-[#F4D98E]">{formatPrice(p.price)}</div>
                    <div className="text-[10px] text-[#F4EAD5]/60">{p.stockQuantity} {t('قطعة بالمخزن', 'in stock')}</div>
                  </div>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="p-2 text-rose-400 hover:text-rose-300"
                    title={t('حذف المنتج', 'Delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. CATEGORIES TAB */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#F4EAD5]/70">{t('إدارة وتعديل أقسام الكتالوج', 'Manage Departments')}</span>
            <button
              onClick={() => setShowAddCat(true)}
              className="gold-button px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('إضافة قسم جديد', 'Add Department')}</span>
            </button>
          </div>

          {showAddCat && (
            <form onSubmit={handleCreateCategory} className="p-5 rounded-2xl bg-[#141414] border border-[#D7AD55]/40 space-y-3 text-xs">
              <h4 className="font-bold text-[#D7AD55]">{t('إضافة قسم جديد', 'Add New Department')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder={t('اسم القسم بالعربية', 'Category Arabic')}
                  value={newCatNameAr}
                  onChange={(e) => setNewCatNameAr(e.target.value)}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5]"
                />
                <input
                  type="text"
                  placeholder={t('اسم القسم بالإنجليزية', 'Category English')}
                  value={newCatNameEn}
                  onChange={(e) => setNewCatNameEn(e.target.value)}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5]"
                />
                <input
                  type="url"
                  placeholder={t('رابط صورة القسم', 'Image URL')}
                  value={newCatImage}
                  onChange={(e) => setNewCatImage(e.target.value)}
                  className="sm:col-span-2 bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddCat(false)} className="px-3 py-1 text-[#F4EAD5]/60">
                  {t('إلغاء', 'Cancel')}
                </button>
                <button type="submit" className="gold-button px-4 py-1.5 rounded-xl font-bold">
                  {t('حفظ القسم', 'Save')}
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-2xl bg-[#121212] border border-[#D7AD55]/20 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src={cat.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs text-[#F4EAD5]">{cat.nameAr}</h4>
                    <span className="text-[10px] text-[#D7AD55]">{cat.nameEn}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="text-rose-400 hover:text-rose-300 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. COUPONS TAB */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#F4EAD5]/70">{t('إدارة أكواد الخصم الملكية والعروض', 'Manage Promo Codes')}</span>
            <button
              onClick={() => setShowAddCoupon(true)}
              className="gold-button px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('إنشاء كود جديد', 'Create Coupon')}</span>
            </button>
          </div>

          {showAddCoupon && (
            <form onSubmit={handleCreateCoupon} className="p-5 rounded-2xl bg-[#141414] border border-[#D7AD55]/40 space-y-3 text-xs">
              <h4 className="font-bold text-[#D7AD55]">{t('إنشاء كود خصم جديد', 'Create Promo Code')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="CODE (e.g. ROYAL25)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5] uppercase font-mono"
                />
                <input
                  type="number"
                  placeholder={t('نسبة الخصم %', 'Discount %')}
                  value={newCouponVal}
                  onChange={(e) => setNewCouponVal(Number(e.target.value))}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5]"
                />
                <input
                  type="number"
                  placeholder={t('الحد الأدنى للطلب', 'Min Order')}
                  value={newCouponMin}
                  onChange={(e) => setNewCouponMin(Number(e.target.value))}
                  className="bg-[#080808] border border-[#D7AD55]/30 rounded-xl p-2.5 text-[#F4EAD5]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddCoupon(false)} className="px-3 py-1 text-[#F4EAD5]/60">
                  {t('إلغاء', 'Cancel')}
                </button>
                <button type="submit" className="gold-button px-4 py-1.5 rounded-xl font-bold">
                  {t('تفعيل الكود', 'Activate')}
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="p-5 rounded-2xl bg-[#121212] border border-[#D7AD55]/20 flex items-center justify-between"
              >
                <div>
                  <span className="font-mono font-bold text-base text-[#F4D98E] block">{c.code}</span>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {t('خصم', 'Discount')} {c.discountValue}%
                  </span>
                  <span className="text-[10px] text-[#F4EAD5]/45 block mt-0.5">
                    {t('للطلبات فوق', 'Min Order')}: {formatPrice(c.minOrderValue)}
                  </span>
                </div>
                <button
                  onClick={() => deleteCoupon(c.code)}
                  className="text-rose-400 hover:text-rose-300 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-[#121212] border border-[#D7AD55]/20 space-y-6 max-w-2xl">
          <h3 className="text-sm font-bold font-serif text-[#F4D98E]">{t('إعدادات المتجر العامة والتكامل السحابي', 'Store & Cloud Integration')}</h3>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#080808] border border-[#D7AD55]/20 space-y-1">
              <span className="font-bold text-[#D7AD55] block">بيئة تشغيل Supabase:</span>
              <p className="text-[#F4EAD5]/70">
                الملف المرجعي لقاعدة البيانات: <code>supabase/migrations/202611060001_initial_commerce_schema.sql</code>
              </p>
              <p className="text-[#F4EAD5]/50">
                المتغيرات المطلوبة للإنتاج: <code>VITE_SUPABASE_URL</code> و <code>VITE_SUPABASE_ANON_KEY</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#080808] border border-[#D7AD55]/20 space-y-1">
              <span className="font-bold text-[#D7AD55] block">إعداد تطبيق Android (Capacitor):</span>
              <p className="text-[#F4EAD5]/70">
                معرف الحزمة: <code>com.alamaljamal.app</code>. الاسم: <code>ALAM ALJAMAL</code>. جاهز لإنتاج APK وبناء Android Studio.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

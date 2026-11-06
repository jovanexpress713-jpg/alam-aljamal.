import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types/commerce';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Heart,
  Plus,
  Star,
  Check,
  Copy
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    categories,
    setCurrentTab,
    setSelectedCategory,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    lang,
    t,
    notify
  } = useStore();

  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const bestSellers = products.filter((p) => p.isFeatured || p.rating >= 4.9).slice(0, 4);
  const newArrivals = products.slice().reverse().slice(0, 4);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    notify(
      lang === 'ar' ? `تم نسخ كود الخصم "${code}" بنجاح!` : `Coupon code "${code}" copied!`,
      'success'
    );
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="pb-24 sm:pb-32 space-y-12 sm:space-y-16 overflow-x-hidden alam-mobile-shell">
      {/* HERO BANNER SECTION */}
      <section className="relative min-h-[560px] sm:min-h-[680px] lg:min-h-[740px] flex items-center justify-center overflow-hidden px-4 sm:px-6 border-b border-[#D7AD55]/15">
        {/* Background Image with dramatic gradient vignette */}
        <div className="absolute inset-0 z-0">
          <div className="alam-hero-glow top-[-8%] left-1/2 -translate-x-1/2" />
          <img
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1800&q=90"
            alt="عالم الجمال الفاخر"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-110 scale-105 transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,173,85,0.12)_0%,transparent_70%)]" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-8 sm:pt-16">
          {/* Subtle Royal Emblem Mark */}
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-1.5 rounded-full bg-[#121212]/80 border border-[#D7AD55]/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(215,173,85,0.25)]">
            <img src="/brand-emblem.svg" alt="" className="w-4 h-4 object-contain" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#F4D98E] uppercase">
              {t('عالم الجمال · المجموعة الملكية الحصرية', 'ALAM ALJAMAL · HAUTE COLLECTION')}
            </span>
          </div>

          {/* Majestic Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F4EAD5] leading-[1.25] mb-6 font-serif">
            {t('كل ما تتمنى من الفخامة،', 'Unrivaled Luxury,')}
            <br />
            <span className="gold-gradient-text italic font-normal">
              {t('في عالم واحد لا يشبه غيره.', 'In A World Of Pure Elegance.')}
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-[#F4EAD5]/75 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10">
            {t(
              'اكتشف أندر نفحات العطور النيش، دهن العود المعتق، وطقوس العناية والجمال المستخلصة من أثمن المكونات السويسرية والباريسية.',
              'Discover rare niche perfumes, aged vintage ouds, and couture skincare formulated with gold and botanical elixirs.'
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentTab('products');
              }}
              className="gold-button w-full sm:w-auto px-8 py-3.5 rounded-full flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm font-semibold tracking-wide shadow-xl cursor-pointer"
            >
              <span>{t('تصفح الكتالوج الفاخر', 'Explore Luxury Catalog')}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSelectedCategory('cat-perfumes');
                setCurrentTab('products');
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-medium text-[#F4EAD5] border border-[#D7AD55]/40 hover:border-[#D7AD55] bg-[#121212]/60 hover:bg-[#181818] backdrop-blur-md transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <Sparkles className="w-4 h-4 text-[#D7AD55]" />
              <span>{t('العطور النيش الحصرية', 'Niche Perfumes')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* TRUST PILLARS / LUXURY GUARANTEES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            {
              icon: Award,
              title: t('اختيارات متنوعة', 'Curated Selection'),
              desc: t('تشكيلة واسعة تناسب اهتمامات مختلفة', 'A considered range for different interests')
            },
            {
              icon: Truck,
              title: t('تصفح مريح', 'Effortless Browsing'),
              desc: t('انتقل بسهولة بين الأقسام والمنتجات', 'Move easily between categories and products')
            },
            {
              icon: ShieldCheck,
              title: t('تفاصيل المنتج', 'Product Details'),
              desc: t('صور ومعلومات وأسعار في مكان واحد', 'Images, information and pricing in one place')
            },
            {
              icon: RotateCcw,
              title: t('قائمة المفضلة', 'Your Wishlist'),
              desc: t('احفظ المنتجات التي ترغب بالعودة إليها', 'Save products you would like to revisit')
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="luxury-card p-4 sm:p-6 rounded-2xl flex items-start space-x-3 sm:space-x-4 rtl:space-x-reverse"
              >
                <div className="p-2 sm:p-3 rounded-xl bg-[#181818] border border-[#D7AD55]/25 text-[#D7AD55] shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#F4EAD5] mb-1 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#F4EAD5]/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#D7AD55] font-semibold tracking-wider uppercase mb-1">
              <span>✦</span>
              <span>{t('أقسام الكتالوج', 'Curated Departments')}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#F4EAD5] font-serif">
              {t('تصفح حسب اهتمامك', 'Explore By Category')}
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('categories')}
            className="text-xs sm:text-sm text-[#D7AD55] hover:text-[#F4D98E] flex items-center space-x-1 rtl:space-x-reverse transition-colors"
          >
            <span>{t('عرض جميع الأقسام', 'View All')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentTab('products');
              }}
              className="alam-category-card group relative h-36 sm:h-48 rounded-2xl overflow-hidden border border-[#D7AD55]/25 hover:border-[#F4D98E] transition-all text-start flex flex-col justify-end p-3 sm:p-4 text-white bg-[#111]"
            >
              <img
                src={cat.imageUrl}
                alt={cat.nameAr}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.48] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] text-[#D7AD55] tracking-wider uppercase font-medium">
                  {cat.itemCount || 15} {t('قطعة', 'items')}
                </span>
                <h3 className="text-xs sm:text-sm font-bold font-serif text-[#F4EAD5] group-hover:text-[#F4D98E] transition-colors leading-snug">
                  {lang === 'ar' ? cat.nameAr : cat.nameEn}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BEST SELLERS CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#D7AD55] font-semibold tracking-wider uppercase mb-1">
              <span>✦</span>
              <span>{t('مختارات النخبة', 'Elite Collection')}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#F4EAD5] font-serif">
              {t('الأكثر مبيعاً وطلباً', 'Best Selling Masterpieces')}
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentTab('products');
            }}
            className="text-xs sm:text-sm text-[#D7AD55] hover:text-[#F4D98E] flex items-center space-x-1 rtl:space-x-reverse transition-colors"
          >
            <span>{t('عرض الكل', 'View All')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => setSelectedProduct(product)}
              onAddToCart={() => addToCart(product, 1)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              isFav={isWishlisted(product.id)}
              formatPrice={formatPrice}
              lang={lang}
              t={t}
            />
          ))}
        </div>
      </section>

      {/* EXCLUSIVE PROMO SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden border border-[#D7AD55]/30 bg-gradient-to-r from-[#14120e] via-[#1c1810] to-[#121212] p-6 sm:p-12">
          {/* Subtle gold emblem backdrop */}
          <div className="absolute top-1/2 -right-10 rtl:-right-auto rtl:-left-10 -translate-y-1/2 w-64 h-64 opacity-10 pointer-events-none">
            <img src="/brand-emblem.svg" alt="" className="w-full h-full object-contain" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-[11px] font-bold text-[#080808] bg-[#D7AD55] px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              {t('عرض حصري لأعضاء المنصة', 'Private Privilege')}
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#F4EAD5] font-serif mb-3">
              {t('خصم 10% إلى 20% على طلبك الأول', 'Up to 20% Off Your Curated Order')}
            </h2>

            <p className="text-xs sm:text-sm text-[#F4EAD5]/70 mb-6 leading-relaxed">
              {t(
                'استخدم الرمز الملكي عند الدفع للاستمتاع بخصم فوري وتوصيل مجاني لكافة مناطق المملكة والخليج.',
                'Apply coupon code at checkout for instant luxury savings and complimentary white glove delivery.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#080808] border border-[#D7AD55]/40 rounded-xl px-4 py-2">
                <span className="text-xs text-[#F4EAD5]/60">{t('الكود الأول:', 'Code 1:')}</span>
                <span className="font-mono font-bold text-sm text-[#F4D98E]">BEAUTY10</span>
                <button
                  onClick={() => handleCopyCode('BEAUTY10')}
                  className="text-[#D7AD55] hover:text-white transition-colors"
                  title="نسخ"
                >
                  {copiedCode === 'BEAUTY10' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#080808] border border-[#D7AD55]/40 rounded-xl px-4 py-2">
                <span className="text-xs text-[#F4EAD5]/60">{t('للطلبات الكبرى:', 'VIP Code:')}</span>
                <span className="font-mono font-bold text-sm text-[#F4D98E]">GOLD20</span>
                <button
                  onClick={() => handleCopyCode('GOLD20')}
                  className="text-[#D7AD55] hover:text-white transition-colors"
                  title="نسخ"
                >
                  {copiedCode === 'GOLD20' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentTab('products');
                }}
                className="gold-button px-5 py-2 rounded-xl text-xs font-semibold ml-auto rtl:ml-0 rtl:mr-auto"
              >
                {t('تسوق الآن واستفد من الخصم', 'Shop With Privilege')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#D7AD55] font-semibold tracking-wider uppercase mb-1">
              <span>✦</span>
              <span>{t('إصدارات جديدة', 'New Releases')}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#F4EAD5] font-serif">
              {t('أحدث الإبداعات الفاخرة', 'Latest Haute Creations')}
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentTab('products');
            }}
            className="text-xs sm:text-sm text-[#D7AD55] hover:text-[#F4D98E] flex items-center space-x-1 rtl:space-x-reverse transition-colors"
          >
            <span>{t('عرض الكل', 'View All')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => setSelectedProduct(product)}
              onAddToCart={() => addToCart(product, 1)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              isFav={isWishlisted(product.id)}
              formatPrice={formatPrice}
              lang={lang}
              t={t}
            />
          ))}
        </div>
      </section>

      {/* PRESTIGE BRANDS STRIP */}
      <section className="border-t border-b border-[#D7AD55]/15 bg-[#0c0c0c] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[10px] sm:text-xs font-semibold text-[#D7AD55] tracking-[0.25em] uppercase block mb-6">
            {t('العلامات والمجموعات المعتمدة لدى عالم الجمال', 'Certified Haute Maisons & Partners')}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 sm:gap-8 items-center justify-center opacity-65 font-serif text-xs sm:text-sm tracking-widest text-[#F4EAD5]">
            <div className="py-2 border-b border-[#D7AD55]/20">ALAM ALJAMAL PRIVÉE</div>
            <div className="py-2 border-b border-[#D7AD55]/20">CHANEL COUTURE</div>
            <div className="py-2 border-b border-[#D7AD55]/20">DIOR PARFUMS</div>
            <div className="py-2 border-b border-[#D7AD55]/20">AMOUAGE ROYAL</div>
            <div className="py-2 border-b border-[#D7AD55]/20">TOM FORD PRIVATE</div>
            <div className="py-2 border-b border-[#D7AD55]/20">KILIAN PARIS</div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Luxury Product Card
export const ProductCard: React.FC<{
  product: Product;
  onSelect: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isFav: boolean;
  formatPrice: (n: number) => string;
  lang: 'ar' | 'en';
  t: (ar: string, en: string) => string;
}> = ({ product, onSelect, onAddToCart, onToggleWishlist, isFav, formatPrice, lang, t }) => {
  return (
    <article className="luxury-card group rounded-2xl overflow-hidden flex flex-col justify-between border border-[#D7AD55]/15 hover:border-[#D7AD55]/50 transition-all bg-[#121212]">
      {/* Top Media Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#181818] cursor-pointer" onClick={onSelect}>
        <img
          src={product.images[0]}
          alt={lang === 'ar' ? product.nameAr : product.nameEn}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
        />

        {/* Tag badge */}
        {product.tag && (
          <span className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#080808]/85 text-[#F4D98E] border border-[#D7AD55]/40 backdrop-blur-md">
            {product.tag}
          </span>
        )}

        {/* Wishlist Heart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isFav
              ? 'bg-[#D7AD55] text-[#080808]'
              : 'bg-[#080808]/60 text-[#F4EAD5]/70 hover:text-white'
          }`}
          aria-label={t('إضافة للمفضلة', 'Add to wishlist')}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Info Container */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div className="cursor-pointer" onClick={onSelect}>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-[#D7AD55] font-medium mb-1">
            <span className="truncate">{product.brand}</span>
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-amber-300 shrink-0">
              <Star className="w-3 h-3 fill-current text-[#D7AD55]" />
              <span className="text-[10px] font-semibold text-[#F4EAD5]">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-bold text-[#F4EAD5] group-hover:text-[#F4D98E] transition-colors line-clamp-2 font-serif mb-2 leading-snug">
            {lang === 'ar' ? product.nameAr : product.nameEn}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#D7AD55]/10 flex items-center justify-between mt-auto">
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#F4D98E]">
              {formatPrice(product.price)}
            </div>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <del className="text-[10px] text-[#F4EAD5]/45 block">
                {formatPrice(product.compareAtPrice)}
              </del>
            )}
          </div>

          <button
            onClick={onAddToCart}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#181818] border border-[#D7AD55]/30 hover:border-[#D7AD55] text-[#D7AD55] hover:bg-[#D7AD55] hover:text-[#080808] transition-all flex items-center space-x-1 rtl:space-x-reverse text-xs font-semibold"
            aria-label={t('أضف للسلة', 'Add to Bag')}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('إضافة', 'Add')}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

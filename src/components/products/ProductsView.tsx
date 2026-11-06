import React, { useMemo, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../home/HomeView';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';

export const ProductsView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    lang,
    t
  } = useStore();

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return list;
  }, [products]);

  // Filtered & Sorted items
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }
      // In-stock
      if (inStockOnly && p.stockQuantity <= 0) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchAr = p.nameAr.toLowerCase().includes(q) || p.descriptionAr.toLowerCase().includes(q);
        const matchEn = p.nameEn.toLowerCase().includes(q) || p.descriptionEn.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        return matchAr || matchEn || matchBrand || matchSku;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result = result.slice().reverse();
    }

    return result;
  }, [products, selectedCategory, selectedBrand, inStockOnly, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 sm:pb-32">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Search input with gold icon */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 w-4 h-4 text-[#D7AD55]" />
          <input
            id="search-input-field"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ابحث عن عطر، مستحضر، دهن عود، أو علامة تجارية...', 'Search perfumes, oud, skincare, or brands...')}
            className="w-full bg-[#121212] border border-[#D7AD55]/30 focus:border-[#D7AD55] text-[#F4EAD5] placeholder-[#F4EAD5]/40 text-xs sm:text-sm rounded-full py-3 px-11 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-4 text-[#F4EAD5]/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Quick Filter Actions */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#121212] border border-[#D7AD55]/30 text-[#F4EAD5] text-xs rounded-xl py-3 px-3.5 outline-none cursor-pointer focus:border-[#D7AD55]"
            aria-label={t('ترتيب المنتجات', 'Sort')}
          >
            <option value="featured">{t('المقترحات الملكية', 'Curated & Featured')}</option>
            <option value="price_asc">{t('السعر: من الأقل للأعلى', 'Price: Low to High')}</option>
            <option value="price_desc">{t('السعر: من الأعلى للأقل', 'Price: High to Low')}</option>
            <option value="rating">{t('الأعلى تقييماً', 'Top Rated')}</option>
            <option value="newest">{t('أحدث الإطلاقات', 'Newest Arrivals')}</option>
          </select>

          <button
            onClick={() => setShowFiltersModal(!showFiltersModal)}
            className={`p-3 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 rtl:space-x-reverse transition-all ${
              selectedBrand !== 'all' || inStockOnly
                ? 'bg-[#D7AD55] text-[#080808] border-[#D7AD55]'
                : 'bg-[#121212] text-[#F4EAD5]/80 border-[#D7AD55]/30 hover:border-[#D7AD55]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">{t('تصفية', 'Filters')}</span>
          </button>
        </div>
      </div>

      {/* Categories Horizontal Carousel / Pills */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
            selectedCategory === 'all'
              ? 'bg-[#D7AD55] text-[#080808] border-[#D7AD55] font-semibold shadow-[0_0_15px_rgba(215,173,85,0.3)]'
              : 'bg-[#121212] text-[#F4EAD5]/70 border-[#D7AD55]/20 hover:border-[#D7AD55]/50'
          }`}
        >
          {t('جميع المنتجات (الكل)', 'All Departments')}
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-[#D7AD55] text-[#080808] border-[#D7AD55] font-semibold shadow-[0_0_15px_rgba(215,173,85,0.3)]'
                : 'bg-[#121212] text-[#F4EAD5]/70 border-[#D7AD55]/20 hover:border-[#D7AD55]/50'
            }`}
          >
            {lang === 'ar' ? cat.nameAr : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Active Filter Modal / Bar */}
      {showFiltersModal && (
        <div className="mb-6 p-4 rounded-2xl bg-[#141414] border border-[#D7AD55]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#D7AD55]/15 pb-2">
            <h3 className="text-xs font-bold text-[#F4D98E]">{t('خيارات التصفية الدقيقة', 'Refined Filters')}</h3>
            <button
              onClick={() => {
                setSelectedBrand('all');
                setInStockOnly(false);
              }}
              className="text-[11px] text-[#D7AD55] hover:underline"
            >
              {t('إعادة تعيين', 'Reset All')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#F4EAD5]/70 mb-2">
                {t('العلامة التجارية / الدار', 'Haute Maison')}
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#080808] border border-[#D7AD55]/30 text-[#F4EAD5] text-xs rounded-xl p-2.5 outline-none"
              >
                <option value="all">{t('جميع الدور والعلامات', 'All Maisons')}</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-start sm:justify-end pt-5">
              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer text-xs text-[#F4EAD5]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D7AD55] focus:ring-0 bg-[#080808] border-[#D7AD55]/50"
                />
                <span>{t('عرض المتوفر في المخزون فقط', 'In-Stock Items Only')}</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#F4EAD5]/60 mb-4 px-1">
        <span>
          {t('عرض', 'Displaying')} <b>{filteredProducts.length}</b> {t('تحفة فاخرة', 'luxury creations')}
        </span>
        {searchQuery && (
          <span className="text-[#D7AD55]">
            {t('نتائج البحث عن:', 'Results for:')} "{searchQuery}"
          </span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => (
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
      ) : (
        <div className="text-center py-20 px-4 rounded-3xl bg-[#121212]/50 border border-[#D7AD55]/15 max-w-md mx-auto">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#181818] border border-[#D7AD55]/30 flex items-center justify-center text-[#D7AD55]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#F4EAD5] font-serif mb-2">
            {t('لا توجد قطع مطابقة للبحث', 'No Matching Creations Found')}
          </h3>
          <p className="text-xs text-[#F4EAD5]/60 mb-6">
            {t('جرّب تغيير كلمات البحث أو استعراض قسم آخر من الكتالوج.', 'Try adjusting your search criteria or reset filters.')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedBrand('all');
              setInStockOnly(false);
            }}
            className="gold-button px-6 py-2.5 rounded-full text-xs font-semibold"
          >
            {t('إعادة تعيين البحث والتصفية', 'Reset All Filters')}
          </button>
        </div>
      )}
    </div>
  );
};

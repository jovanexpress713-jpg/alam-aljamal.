import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../home/HomeView';
import { Heart, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
    setCurrentTab,
    formatPrice,
    lang,
    t
  } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 sm:pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D7AD55]/15">
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#D7AD55] font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('قائمتك المفضلة', 'Curated Wishlist')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4EAD5]">
            {t('المقتنيات الملكية المحفوظة', 'Saved Luxury Pieces')} ({wishlistedProducts.length})
          </h1>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            onClick={() => {
              wishlistedProducts.forEach((p) => addToCart(p, 1));
            }}
            className="gold-button px-4 py-2 rounded-xl text-xs font-semibold"
          >
            {t('نقل الكل إلى السلة', 'Move All to Bag')}
          </button>
        )}
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => setSelectedProduct(product)}
              onAddToCart={() => addToCart(product, 1)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              isFav={true}
              formatPrice={formatPrice}
              lang={lang}
              t={t}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-20 px-4 rounded-3xl bg-[#121212]/60 border border-[#D7AD55]/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#181818] border border-[#D7AD55]/30 flex items-center justify-center text-[#D7AD55]">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold font-serif text-[#F4EAD5] mb-2">
            {t('قائمتك المفضلة فارغة حالياً', 'Your Wishlist Is Empty')}
          </h2>
          <p className="text-xs text-[#F4EAD5]/60 mb-6 leading-relaxed">
            {t(
              'احفظ القطع الفاخرة والعطور التي نالت إعجابك لتسهيل الرجوع إليها واقتنائها لاحقاً.',
              'Save your favorite extrait de parfums and skincare elixirs for quick access.'
            )}
          </p>
          <button
            onClick={() => setCurrentTab('products')}
            className="gold-button px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span>{t('استكشف الكتالوج الفاخر', 'Discover Creations')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

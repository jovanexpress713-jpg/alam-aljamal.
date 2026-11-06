import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductVariant } from '../../types/commerce';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Award,
  CheckCircle,
  MessageSquare
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    formatPrice,
    products,
    lang,
    t,
    notify
  } = useStore();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    selectedProduct.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      author: 'الأميرة نورة آل سعود',
      rating: 5,
      date: 'منذ يومين',
      comment: 'رائحة ساحرة وثبات ملكي يدوم لأيام في الملابس والبخور. التغليف فاق التوقعات شكراً لكم.'
    },
    {
      author: 'د. خالد التميمي',
      rating: 5,
      date: 'منذ أسبوع',
      comment: 'جودة استثنائية ونقاء لا مثيل له. التعامل والتوصيل VIP بكل ما تعنيه الكلمة.'
    }
  ]);

  const currentPrice = selectedProduct.price + (selectedVariant?.priceModifier || 0);
  const isFav = isWishlisted(selectedProduct.id);

  // Similar products
  const similarProducts = products
    .filter((p) => p.categoryId === selectedProduct.categoryId && p.id !== selectedProduct.id)
    .slice(0, 3);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      notify(lang === 'ar' ? 'يرجى كتابة اسمك والتعليق' : 'Please provide name and comment', 'error');
      return;
    }
    const review = {
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: lang === 'ar' ? 'الآن' : 'Just now',
      comment: newReviewComment.trim()
    };
    setReviewsList([review, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    notify(lang === 'ar' ? 'شكراً لك! تم نشر تقييمك بنجاح' : 'Thank you! Review published', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-[#0f0f0f] border border-[#D7AD55]/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] my-4 text-[#F4EAD5]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 p-2.5 rounded-full bg-[#181818]/80 text-[#F4EAD5] hover:text-[#F4D98E] border border-[#D7AD55]/30 backdrop-blur-md transition-all hover:scale-105"
          aria-label={t('إغلاق', 'Close')}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Gallery Column */}
          <div className="p-4 sm:p-8 bg-[#141414] border-b md:border-b-0 md:border-r rtl:md:border-r-0 rtl:md:border-l border-[#D7AD55]/15 flex flex-col justify-between">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0a0a0a] border border-[#D7AD55]/20 group">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {selectedProduct.tag && (
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[#080808]/90 text-[#F4D98E] border border-[#D7AD55]/40 backdrop-blur-md">
                  {selectedProduct.tag}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`absolute top-3 right-3 rtl:right-auto rtl:left-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isFav
                    ? 'bg-[#D7AD55] text-[#080808]'
                    : 'bg-[#080808]/70 text-[#F4EAD5]/80 hover:text-white'
                }`}
                aria-label="المفضلة"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail selector */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse mt-4 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#D7AD55] shadow-[0_0_12px_rgba(215,173,85,0.4)]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees Box */}
            <div className="mt-6 pt-6 border-t border-[#D7AD55]/15 grid grid-cols-2 gap-3 text-xs text-[#F4EAD5]/70">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Award className="w-4 h-4 text-[#D7AD55] shrink-0" />
                <span>{t('أصلي ومضمون 100%', '100% Authentic')}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Truck className="w-4 h-4 text-[#D7AD55] shrink-0" />
                <span>{t('توصيل فاخر خلال 24 ساعة', 'VIP 24h Delivery')}</span>
              </div>
            </div>
          </div>

          {/* Details & Action Column */}
          <div className="p-4 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              {/* Brand and SKU */}
              <div className="flex items-center justify-between text-xs text-[#D7AD55] font-semibold tracking-wider uppercase mb-1.5">
                <span>{selectedProduct.brand}</span>
                <span className="text-[10px] text-[#F4EAD5]/40 font-mono">
                  SKU: {selectedProduct.sku}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#F4EAD5] leading-snug mb-3">
                {lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4 text-xs">
                <div className="flex items-center space-x-1 rtl:space-x-reverse text-[#D7AD55]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-[#F4EAD5]">{selectedProduct.rating.toFixed(2)}</span>
                  <span className="text-[#F4EAD5]/50">({reviewsList.length + selectedProduct.reviewsCount})</span>
                </div>
                <span className="text-[#D7AD55]/30">|</span>
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>
                    {selectedProduct.stockQuantity > 5
                      ? t('متوفر في المخزون الملكي', 'In Stock at Maison')
                      : t(`متبقي فقط ${selectedProduct.stockQuantity} قطع`, `Only ${selectedProduct.stockQuantity} remaining`)}
                  </span>
                </div>
              </div>

              {/* Price display */}
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#D7AD55]/20 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#F4EAD5]/50 block uppercase tracking-wider">
                    {t('السعر الفاخر شامل الضريبة', 'Privilege Price (Inc. VAT)')}
                  </span>
                  <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                    <span className="text-xl sm:text-2xl font-bold text-[#F4D98E]">
                      {formatPrice(currentPrice)}
                    </span>
                    {selectedProduct.compareAtPrice && (
                      <del className="text-xs text-[#F4EAD5]/40">
                        {formatPrice(selectedProduct.compareAtPrice)}
                      </del>
                    )}
                  </div>
                </div>

                {selectedProduct.compareAtPrice && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#D7AD55]/20 text-[#F4D98E] border border-[#D7AD55]/40">
                    {t('وفر', 'Save')}{' '}
                    {formatPrice(selectedProduct.compareAtPrice - currentPrice)}
                  </span>
                )}
              </div>

              {/* Variants Selector */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#F4EAD5]/80 mb-2">
                    {t('اختر الحجم أو الإصدار:', 'Select Volume / Edition:')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                          selectedVariant?.id === v.id
                            ? 'bg-[#D7AD55] text-[#080808] border-[#D7AD55] font-bold shadow-[0_0_12px_rgba(215,173,85,0.3)]'
                            : 'bg-[#141414] text-[#F4EAD5]/80 border-[#D7AD55]/20 hover:border-[#D7AD55]/50'
                        }`}
                      >
                        {lang === 'ar' ? v.nameAr : v.nameEn}
                        {v.priceModifier !== 0 && (
                          <span className="text-[10px] opacity-80 mr-1 rtl:mr-0 rtl:ml-1">
                            ({v.priceModifier! > 0 ? '+' : ''}
                            {formatPrice(v.priceModifier!)})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Information Tabs */}
              <div className="border-b border-[#D7AD55]/20 mb-4 flex space-x-6 rtl:space-x-reverse text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'desc'
                      ? 'text-[#F4D98E]'
                      : 'text-[#F4EAD5]/50 hover:text-[#F4EAD5]'
                  }`}
                >
                  {t('الوصف والمكونات', 'Description & Notes')}
                  {activeTab === 'desc' && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D7AD55]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'specs'
                      ? 'text-[#F4D98E]'
                      : 'text-[#F4EAD5]/50 hover:text-[#F4EAD5]'
                  }`}
                >
                  {t('المواصفات', 'Specifications')}
                  {activeTab === 'specs' && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D7AD55]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'reviews'
                      ? 'text-[#F4D98E]'
                      : 'text-[#F4EAD5]/50 hover:text-[#F4EAD5]'
                  }`}
                >
                  {t('التقييمات', 'Reviews')} ({reviewsList.length})
                  {activeTab === 'reviews' && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D7AD55]" />
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs text-[#F4EAD5]/80 leading-relaxed mb-6">
                {activeTab === 'desc' && (
                  <div className="space-y-4">
                    <p>{lang === 'ar' ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}</p>
                    {selectedProduct.notes && (
                      <div className="p-3.5 rounded-xl bg-[#141414] border border-[#D7AD55]/15 space-y-2">
                        <div className="font-bold text-[#D7AD55] flex items-center space-x-1.5 rtl:space-x-reverse">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{t('الهرم العطري الملكي', 'Olfactory Notes')}</span>
                        </div>
                        {selectedProduct.notes.top && (
                          <div>
                            <span className="text-[#F4D98E] font-medium">{t('القمة العطرية:', 'Top Notes:')}</span>{' '}
                            {selectedProduct.notes.top}
                          </div>
                        )}
                        {selectedProduct.notes.heart && (
                          <div>
                            <span className="text-[#F4D98E] font-medium">{t('قلب العطر:', 'Heart Notes:')}</span>{' '}
                            {selectedProduct.notes.heart}
                          </div>
                        )}
                        {selectedProduct.notes.base && (
                          <div>
                            <span className="text-[#F4D98E] font-medium">{t('القاعدة العطرية:', 'Base Notes:')}</span>{' '}
                            {selectedProduct.notes.base}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="divide-y divide-[#D7AD55]/10">
                    {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                      <div key={key} className="py-2 flex items-center justify-between">
                        <span className="text-[#F4EAD5]/60">{key}</span>
                        <span className="font-medium text-[#F4EAD5]">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {/* Customer reviews list */}
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {reviewsList.map((rev, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#141414] border border-[#D7AD55]/15">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-[#F4D98E]">{rev.author}</span>
                            <span className="text-[10px] text-[#F4EAD5]/40">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-400 mb-1">
                            {Array.from({ length: rev.rating }).map((_, r) => (
                              <Star key={r} className="w-3 h-3 fill-current text-[#D7AD55]" />
                            ))}
                          </div>
                          <p className="text-[11px] text-[#F4EAD5]/80">{rev.comment}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Review Form */}
                    <form onSubmit={handleAddReview} className="p-3.5 rounded-xl bg-[#121212] border border-[#D7AD55]/20 space-y-2.5">
                      <h4 className="text-xs font-bold text-[#D7AD55] flex items-center space-x-1 rtl:space-x-reverse">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{t('أضف تقييمك وتجربتك الفاخرة', 'Write Your Luxury Review')}</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder={t('اسمك الكريم', 'Your Full Name')}
                          className="bg-[#080808] border border-[#D7AD55]/30 rounded-lg p-2 text-xs text-[#F4EAD5] outline-none"
                        />
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="bg-[#080808] border border-[#D7AD55]/30 rounded-lg p-2 text-xs text-[#F4EAD5] outline-none"
                        >
                          <option value="5">★★★★★ (5/5)</option>
                          <option value="4">★★★★☆ (4/5)</option>
                          <option value="3">★★★☆☆ (3/5)</option>
                        </select>
                      </div>
                      <textarea
                        rows={2}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder={t('صف انطباعك عن رائحة وجودة المنتج...', 'Your review comments...')}
                        className="w-full bg-[#080808] border border-[#D7AD55]/30 rounded-lg p-2 text-xs text-[#F4EAD5] outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-[#D7AD55] text-[#080808] text-xs font-bold hover:bg-[#F4D98E] transition-colors"
                      >
                        {t('نشر التقييم', 'Submit Review')}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="pt-4 border-t border-[#D7AD55]/20 flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#141414] border border-[#D7AD55]/30 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-[#181818] flex items-center justify-center text-[#F4EAD5] hover:text-[#D7AD55]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-[#F4D98E]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-[#181818] flex items-center justify-center text-[#F4EAD5] hover:text-[#D7AD55]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity, selectedVariant);
                  setSelectedProduct(null);
                }}
                className="gold-button flex-1 py-3.5 rounded-xl flex items-center justify-center space-x-2 rtl:space-x-reverse text-xs sm:text-sm font-bold shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {t('إضافة إلى حقيبة التسوق', 'Add to Shopping Bag')} · {formatPrice(currentPrice * quantity)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

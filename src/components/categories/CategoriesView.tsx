import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { categories, setSelectedCategory, setCurrentTab, lang, t } = useStore();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 sm:pb-32">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full bg-[#121212] border border-[#D7AD55]/30 text-[#D7AD55] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('أقسام وتصنيفات المتجر', 'Haute Departments')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#F4EAD5] font-serif mb-3">
          {t('استكشف عوالم الجمال والأناقة', 'Explore Curated Realms')}
        </h1>
        <p className="text-xs sm:text-sm text-[#F4EAD5]/70">
          {t(
            'تصنيفات منتقاة بعناية تلبي أرقى معايير الذوق الرفيع من العطور النيش إلى مجوهرات المناسبات.',
            'Each department is meticulously curated to elevate your personal luxury ritual.'
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentTab('products');
            }}
            className="group relative h-64 sm:h-80 rounded-3xl overflow-hidden border border-[#D7AD55]/20 hover:border-[#D7AD55]/60 transition-all cursor-pointer flex flex-col justify-end p-6 bg-[#121212] shadow-xl"
          >
            {/* Background image with smooth zoom */}
            <img
              src={cat.imageUrl}
              alt={lang === 'ar' ? cat.nameAr : cat.nameEn}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] group-hover:scale-106 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />

            {/* Department info */}
            <div className="relative z-10 flex flex-col justify-end">
              <span className="text-[11px] font-semibold text-[#D7AD55] tracking-widest uppercase mb-1">
                {cat.itemCount || 18} {t('قطعة فاخرة', 'Exquisite Items')}
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-[#F4EAD5] font-serif group-hover:text-[#F4D98E] transition-colors mb-2">
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </h2>
              <p className="text-xs text-[#F4EAD5]/75 line-clamp-2 mb-4 font-light leading-relaxed">
                {lang === 'ar' ? cat.descriptionAr : cat.descriptionEn}
              </p>

              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-xs font-semibold text-[#D7AD55] group-hover:text-white transition-colors">
                <span>{t('تصفح المنتجات الآن', 'Browse Department')}</span>
                <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

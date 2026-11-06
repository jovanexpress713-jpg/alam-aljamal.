import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Heart, ShoppingBag, Shield, Globe } from 'lucide-react';

export const LuxuryHeader: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    lang,
    setLang,
    cartTotalCount,
    wishlist,
    user,
    setSearchQuery,
    t
  } = useStore();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/90 backdrop-blur-md border-b border-[#D7AD55]/15 transition-all">
      {/* Top micro announcement bar */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1 text-[11px] tracking-wider text-[#F4D98E]/80 bg-[#121212]/80 border-b border-[#D7AD55]/10">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-[#D7AD55]">✦</span>
          <span>{t('توصيل فاخر VIP مع تغليف ملكي مجاني لجميع الطلبات', 'Complimentary VIP delivery & bespoke packaging')}</span>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <span>{t('خدمة عملاء حصرية 24/7', 'Concierge VIP Service 24/7')}</span>
          <span className="text-[#D7AD55]">|</span>
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center space-x-1 rtl:space-x-reverse hover:text-white transition-colors"
          >
            <Globe className="w-3 h-3 text-[#D7AD55]" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center space-x-3 rtl:space-x-reverse text-start focus:outline-none group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center rounded-full bg-[#121212] border border-[#D7AD55]/30 group-hover:border-[#D7AD55] transition-all p-1.5 shadow-[0_0_15px_-4px_rgba(215,173,85,0.25)]">
            <img
              src="/brand-emblem.svg"
              alt="شعار عالم الجمال"
              className="w-full h-full object-contain filter group-hover:brightness-110"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#F4EAD5] font-serif leading-none">
              عالم الجمال
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#D7AD55] font-semibold uppercase mt-0.5">
              ALAM ALJAMAL
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse text-sm font-medium">
          <button
            onClick={() => setCurrentTab('home')}
            className={`transition-colors py-1 relative ${
              currentTab === 'home'
                ? 'text-[#F4D98E] font-semibold'
                : 'text-[#F4EAD5]/70 hover:text-[#F4EAD5]'
            }`}
          >
            {t('الرئيسية', 'Home')}
            {currentTab === 'home' && (
              <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D7AD55] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('categories')}
            className={`transition-colors py-1 relative ${
              currentTab === 'categories'
                ? 'text-[#F4D98E] font-semibold'
                : 'text-[#F4EAD5]/70 hover:text-[#F4EAD5]'
            }`}
          >
            {t('التصنيفات', 'Categories')}
            {currentTab === 'categories' && (
              <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D7AD55] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('products')}
            className={`transition-colors py-1 relative ${
              currentTab === 'products'
                ? 'text-[#F4D98E] font-semibold'
                : 'text-[#F4EAD5]/70 hover:text-[#F4EAD5]'
            }`}
          >
            {t('المتجر والمنتجات', 'All Products')}
            {currentTab === 'products' && (
              <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D7AD55] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('tracking')}
            className={`transition-colors py-1 relative ${
              currentTab === 'tracking'
                ? 'text-[#F4D98E] font-semibold'
                : 'text-[#F4EAD5]/70 hover:text-[#F4EAD5]'
            }`}
          >
            {t('تتبع طلبك', 'Track Order')}
            {currentTab === 'tracking' && (
              <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#D7AD55] rounded-full" />
            )}
          </button>
        </nav>

        {/* Action icons */}
        <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
          {/* Mobile language switch */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="sm:hidden p-2 rounded-full text-xs font-semibold text-[#D7AD55] border border-[#D7AD55]/20 bg-[#121212]"
            aria-label="تبديل اللغة"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Search trigger */}
          <button
            onClick={() => {
              setCurrentTab('products');
              // focus search
              setTimeout(() => {
                const el = document.getElementById('search-input-field');
                el?.focus();
              }, 100);
            }}
            className="p-2 sm:p-2.5 rounded-full text-[#F4EAD5]/80 hover:text-[#F4D98E] hover:bg-[#181818] transition-colors"
            aria-label={t('بحث', 'Search')}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setCurrentTab('wishlist')}
            className="relative p-2 sm:p-2.5 rounded-full text-[#F4EAD5]/80 hover:text-[#F4D98E] hover:bg-[#181818] transition-colors"
            aria-label={t('المفضلة', 'Wishlist')}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 rtl:right-auto rtl:left-1 w-4 h-4 rounded-full bg-[#D7AD55] text-[#080808] text-[10px] font-bold flex items-center justify-center ring-2 ring-[#080808]">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => setCurrentTab('cart')}
            className="relative p-2 sm:p-2.5 rounded-full text-[#F4EAD5]/80 hover:text-[#F4D98E] hover:bg-[#181818] transition-colors"
            aria-label={t('السلة', 'Bag')}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartTotalCount > 0 && (
              <span className="absolute top-1 right-1 rtl:right-auto rtl:left-1 w-4 h-4 rounded-full bg-[#D7AD55] text-[#080808] text-[10px] font-bold flex items-center justify-center ring-2 ring-[#080808] animate-pulse">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard shortcut if user has admin privileges */}
          {user?.role === 'admin' && (
            <button
              onClick={() => setCurrentTab(currentTab === 'admin' ? 'home' : 'admin')}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                currentTab === 'admin'
                  ? 'bg-[#D7AD55] text-[#080808] border-[#D7AD55] shadow-[0_0_15px_rgba(215,173,85,0.4)]'
                  : 'bg-[#181818] text-[#D7AD55] border-[#D7AD55]/30 hover:border-[#D7AD55]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {currentTab === 'admin' ? t('المتجر', 'Store') : t('لوحة الإدارة', 'Admin')}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { useStore, ScreenTab } from '../../context/StoreContext';
import { Home, Layers, Heart, ShoppingBag, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, cartTotalCount, wishlist, t } = useStore();

  const navItems: { id: ScreenTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: t('الرئيسية', 'Home'), icon: Home },
    { id: 'categories', label: t('التصنيفات', 'Categories'), icon: Layers },
    { id: 'wishlist', label: t('المفضلة', 'Wishlist'), icon: Heart },
    { id: 'cart', label: t('السلة', 'Bag'), icon: ShoppingBag },
    { id: 'profile', label: t('حسابي', 'Account'), icon: User }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-xl border-t border-[#D7AD55]/15 pb-[env(safe-area-inset-bottom,0px)] transition-all">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive =
            currentTab === item.id ||
            (item.id === 'categories' && currentTab === 'products') ||
            (item.id === 'cart' && currentTab === 'checkout');
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className="relative flex flex-col items-center justify-center h-full w-full group focus:outline-none transition-transform active:scale-95"
            >
              {/* Active Golden Glow pill */}
              {isActive && (
                <span className="absolute top-0 w-8 h-[2px] bg-gradient-to-r from-transparent via-[#D7AD55] to-transparent shadow-[0_0_8px_#D7AD55]" />
              )}

              <div className="relative">
                <IconComponent
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive
                      ? 'text-[#F4D98E] scale-110 drop-shadow-[0_0_8px_rgba(215,173,85,0.6)]'
                      : 'text-[#F4EAD5]/50 group-hover:text-[#F4EAD5]/80'
                  }`}
                />

                {/* Badge for Wishlist */}
                {item.id === 'wishlist' && wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 rtl:-right-auto rtl:-left-2 w-4 h-4 bg-[#D7AD55] text-[#080808] text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#0c0c0c]">
                    {wishlist.length}
                  </span>
                )}

                {/* Badge for Bag */}
                {item.id === 'cart' && cartTotalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 rtl:-right-auto rtl:-left-2 w-4 h-4 bg-[#D7AD55] text-[#080808] text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#0c0c0c] animate-pulse">
                    {cartTotalCount}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] tracking-tight mt-1 transition-colors ${
                  isActive
                    ? 'text-[#F4D98E] font-semibold'
                    : 'text-[#F4EAD5]/50 group-hover:text-[#F4EAD5]/80'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

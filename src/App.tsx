import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { SplashScreen } from './components/common/SplashScreen';
import { LuxuryHeader } from './components/common/LuxuryHeader';
import { BottomNav } from './components/common/BottomNav';
import { Toast } from './components/common/Toast';
import { HomeView } from './components/home/HomeView';
import { CategoriesView } from './components/categories/CategoriesView';
import { ProductsView } from './components/products/ProductsView';
import { WishlistView } from './components/wishlist/WishlistView';
import { CartView } from './components/cart/CartView';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderTrackingView } from './components/orders/OrderTrackingView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { StoreInfoModal } from './components/modals/StoreInfoModal';
import { PWAInstallBanner } from './components/common/PWAInstallBanner';

const AppContent: React.FC = () => {
  const { currentTab, setCurrentTab, selectedProduct, setSelectedProduct, infoModal, setInfoModal } = useStore();
  const [showSplash, setShowSplash] = useState(true);

  // Android hardware back button support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProduct) {
          setSelectedProduct(null);
        } else if (infoModal) {
          setInfoModal(null);
        } else if (currentTab !== 'home') {
          setCurrentTab('home');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, infoModal, currentTab, setSelectedProduct, setInfoModal, setCurrentTab]);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F4EAD5] flex flex-col font-sans selection:bg-[#D7AD55]/30 selection:text-[#F4D98E]">
      {/* Mobile PWA Install Banner */}
      <PWAInstallBanner />

      {/* Splash Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Floating System Toasts */}
      <Toast />

      {/* Header */}
      <LuxuryHeader />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && <HomeView />}
        {currentTab === 'categories' && <CategoriesView />}
        {currentTab === 'products' && <ProductsView />}
        {currentTab === 'wishlist' && <WishlistView />}
        {currentTab === 'cart' && <CartView />}
        {currentTab === 'checkout' && <CheckoutView />}
        {currentTab === 'tracking' && <OrderTrackingView />}
        {currentTab === 'profile' && <ProfileView />}
        {currentTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal />

      {/* Store Info & Policies Modal */}
      <StoreInfoModal />

      {/* Luxury Footer (visible on desktop or scroll end) */}
      <footer className="border-t border-[#D7AD55]/15 bg-[#0a0a0a] pt-12 pb-24 sm:pb-16 text-xs text-[#F4EAD5]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse mb-3">
              <div className="w-8 h-8 rounded-full bg-[#121212] border border-[#D7AD55]/30 p-1">
                <img src="/brand-emblem.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold font-serif text-sm text-[#F4EAD5]">عالم الجمال | ALAM ALJAMAL</span>
            </div>
            <p className="text-[11px] text-[#F4EAD5]/50 leading-relaxed">
              دار العطور النيش ومستحضرات التجميل الراقية. الأصالة الشرقية بمعايير الفخامة العالمية.
            </p>
          </div>

          <div>
            <div className="font-bold text-xs text-[#F4D98E] uppercase tracking-wider mb-3">أقسام المتجر</div>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-[#D7AD55]">العطور النيش والخاصة</button></li>
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-[#D7AD55]">دهن العود الملكي المعتق</button></li>
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-[#D7AD55]">العناية الفائقة والكافيار</button></li>
              <li><button onClick={() => setCurrentTab('products')} className="hover:text-[#D7AD55]">مستحضرات التجميل الراقية</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-xs text-[#F4D98E] uppercase tracking-wider mb-3">خدمة النخبة VIP</div>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => setInfoModal('contact')} className="hover:text-[#D7AD55]">استشارة عطرية خاصة</button></li>
              <li><button onClick={() => setCurrentTab('tracking')} className="hover:text-[#D7AD55]">تتبع الشحنة المباشر</button></li>
              <li><button onClick={() => setInfoModal('returns')} className="hover:text-[#D7AD55]">الضمان الذهبي للاستبدال</button></li>
              <li><button onClick={() => setInfoModal('faq')} className="hover:text-[#D7AD55]">الأسئلة الشائعة</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-xs text-[#F4D98E] uppercase tracking-wider mb-3">الضمان الملكي</div>
            <div className="p-3 rounded-xl bg-[#121212] border border-[#D7AD55]/20 text-[11px] leading-relaxed">
              جميع عطورنا ومنتجاتنا مضمونة 100% مع بطاقة فحص الجودة وتغليف الحرير الملكي.
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-[#D7AD55]/10 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#F4EAD5]/40 gap-2">
          <span>© 2026 عالم الجمال ALAM ALJAMAL — جميع الحقوق محفوظة لدار عالم الجمال للتجارة الفاخرة.</span>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <button onClick={() => setInfoModal('privacy')} className="hover:text-[#D7AD55]">سياسة الخصوصية</button>
            <button onClick={() => setInfoModal('terms')} className="hover:text-[#D7AD55]">شروط الاستخدام</button>
          </div>
        </div>
      </footer>

      {/* Android Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

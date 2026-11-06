import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Order,
  CartItem,
  UserProfile,
  Address,
  Coupon,
  StoreNotification,
  OrderStatus,
  ProductVariant
} from '../types/commerce';
import { storage, DEFAULT_USER } from '../services/storageService';

export type ScreenTab =
  | 'home'
  | 'categories'
  | 'products'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'profile'
  | 'admin';

export type InfoModalType = 'about' | 'contact' | 'returns' | 'privacy' | 'terms' | 'faq' | null;

interface StoreContextType {
  // Navigation & Screen
  currentTab: ScreenTab;
  setCurrentTab: (tab: ScreenTab) => void;
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  t: (ar: string, en: string) => string;
  formatPrice: (amount: number) => string;

  // Data
  products: Product[];
  categories: Category[];
  orders: Order[];
  user: UserProfile | null;
  cart: CartItem[];
  wishlist: string[];
  addresses: Address[];
  coupons: Coupon[];
  notifications: StoreNotification[];

  // Filter & Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;

  // Modals & Detail views
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  infoModal: InfoModalType;
  setInfoModal: (m: InfoModalType) => void;
  toast: { message: string; type: 'gold' | 'error' | 'success' } | null;
  notify: (msg: string, type?: 'gold' | 'error' | 'success') => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  updateCartQty: (productId: string, quantity: number, variantId?: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  placeOrder: (orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'timeline'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, noteAr?: string) => void;

  // User & Auth
  loginAs: (role: 'admin' | 'customer') => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  logout: () => void;

  // Addresses
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;

  // Admin Actions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (cat: Category) => void;
  updateCategory: (cat: Category) => void;
  deleteCategory: (id: string) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  backendInfo: { isSupabaseConfigured: boolean; message: string; url?: string };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home');
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [products, setProducts] = useState<Product[]>(() => storage.getProducts());
  const [categories, setCategories] = useState<Category[]>(() => storage.getCategories());
  const [orders, setOrders] = useState<Order[]>(() => storage.getOrders());
  const [user, setUser] = useState<UserProfile | null>(() => storage.getUser());
  const [addresses, setAddresses] = useState<Address[]>(() => storage.getAddresses());
  const [wishlist, setWishlist] = useState<string[]>(() => storage.getWishlist());
  const [coupons, setCoupons] = useState<Coupon[]>(() => storage.getCoupons());
  const [notifications, setNotifications] = useState<StoreNotification[]>(() => storage.getNotifications());

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aj_cart_items_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);
  const [toast, setToast] = useState<{ message: string; type: 'gold' | 'error' | 'success' } | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aj_cart_items_v2', JSON.stringify(cart));
    } catch (e) {
      console.warn(e);
    }
  }, [cart]);

  // Synchronize document dir and lang
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const notify = (message: string, type: 'gold' | 'error' | 'success' = 'gold') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  };

  const t = (ar: string, en: string) => (lang === 'ar' ? ar : en);

  const formatPrice = (amount: number) => {
    if (lang === 'ar') {
      return `${amount.toLocaleString('ar-SA')} ر.س`;
    }
    return `${amount.toLocaleString('en-US')} SAR`;
  };

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant?.id === variant?.id
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    notify(
      lang === 'ar'
        ? `أُضيف "${product.nameAr}" إلى حقيبة التسوق الملكية`
        : `Added "${product.nameEn}" to your shopping bag`,
      'gold'
    );
  };

  const updateCartQty = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant?.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant?.id === variantId)
      )
    );
    notify(lang === 'ar' ? 'تمت إزالة المنتج من السلة' : 'Item removed from bag', 'gold');
  };

  const clearCart = () => setCart([]);

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const itemPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);
    return sum + itemPrice * item.quantity;
  }, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      storage.saveWishlist(next);
      notify(
        exists
          ? lang === 'ar' ? 'أُزيل من المفضلة' : 'Removed from wishlist'
          : lang === 'ar' ? 'أُضيف إلى قائمة أمنياتك الفاخرة' : 'Added to your luxury wishlist',
        'gold'
      );
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const placeOrder = (
    orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'timeline'>
  ): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `AJ-2026-${randomSuffix}`;
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderPayload,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          status: 'new',
          timestamp: 'الآن - ' + new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
          noteAr: 'تم استلام وتأكيد الطلب الفاخر وجارٍ بدء المعالجة',
          noteEn: 'Order received and being processed'
        }
      ]
    };

    const nextOrders = [newOrder, ...orders];
    setOrders(nextOrders);
    storage.saveOrders(nextOrders);
    clearCart();

    // Create notification
    const newNotif: StoreNotification = {
      id: `notif-${Date.now()}`,
      titleAr: `تم استلام طلبك رقم ${orderNumber}`,
      titleEn: `Order #${orderNumber} Confirmed`,
      messageAr: `تم تأكيد طلبك بقيمة ${formatPrice(newOrder.total)}، ويمكنك تتبعه فورياً الآن.`,
      messageEn: `Your order of ${formatPrice(newOrder.total)} is confirmed. Track live status anytime.`,
      timestamp: 'الآن',
      read: false,
      type: 'order'
    };
    const nextNotifs = [newNotif, ...notifications];
    setNotifications(nextNotifs);
    storage.saveNotifications(nextNotifs);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, noteAr?: string) => {
    setOrders((prev) => {
      const next = prev.map((ord) => {
        if (ord.id === orderId) {
          const statusNotes: Record<OrderStatus, { ar: string; en: string }> = {
            new: { ar: 'تم استلام الطلب', en: 'Order Received' },
            confirmed: { ar: 'تم تأكيد الطلب وتعيين المندوب', en: 'Order Confirmed' },
            preparing: { ar: 'قيد التجهيز الفاخر والتغليف الملكي', en: 'Preparing & Packing' },
            ready_to_ship: { ar: 'الشحنة جاهزة للتسليم للناقل', en: 'Ready to Dispatch' },
            out_for_delivery: { ar: 'خرج الطلب للتوصيل مع الكابتن', en: 'Out for Delivery' },
            delivered: { ar: 'تم تسليم الطلب للعميل بنجاح', en: 'Delivered Successfully' },
            cancelled: { ar: 'تم إلغاء الطلب بناءً على الطلب', en: 'Order Cancelled' },
            returned: { ar: 'تم تسجيل طلب الإرجاع والضمان', en: 'Order Returned' }
          };
          const newTimelineEntry = {
            status,
            timestamp: new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
            }),
            noteAr: noteAr || statusNotes[status].ar,
            noteEn: statusNotes[status].en
          };
          return {
            ...ord,
            status,
            updatedAt: new Date().toISOString(),
            timeline: [...ord.timeline, newTimelineEntry]
          };
        }
        return ord;
      });
      storage.saveOrders(next);
      return next;
    });
    notify(lang === 'ar' ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated successfully', 'success');
  };

  const loginAs = (role: 'admin' | 'customer') => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      role,
      fullName: role === 'admin' ? 'مدير منصة عالم الجمال (Super Admin)' : 'سمو العميل الراقي',
      vipTier: role === 'admin' ? 'Royal Diamond' : 'Platinum'
    };
    setUser(newUser);
    storage.saveUser(newUser);
    notify(
      lang === 'ar'
        ? `تم تسجيل الدخول بصلاحية: ${role === 'admin' ? 'مدير المنظمة الفاخرة' : 'عميل مميز'}`
        : `Signed in as ${role}`,
      'gold'
    );
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    storage.saveUser(updated);
    notify(lang === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Profile updated', 'success');
  };

  const logout = () => {
    setUser(null);
    storage.saveUser(null);
    notify(lang === 'ar' ? 'تم تسجيل الخروج' : 'Signed out', 'gold');
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = { ...address, id: `addr-${Date.now()}` };
    const next = [...addresses, newAddress];
    setAddresses(next);
    storage.saveAddresses(next);
    notify(lang === 'ar' ? 'تمت إضافة العنوان الجديد' : 'Address added', 'success');
  };

  const updateAddress = (address: Address) => {
    const next = addresses.map((a) => (a.id === address.id ? address : a));
    setAddresses(next);
    storage.saveAddresses(next);
    notify(lang === 'ar' ? 'تم تعديل العنوان' : 'Address updated', 'success');
  };

  const deleteAddress = (id: string) => {
    const next = addresses.filter((a) => a.id !== id);
    setAddresses(next);
    storage.saveAddresses(next);
    notify(lang === 'ar' ? 'تم حذف العنوان' : 'Address deleted', 'gold');
  };

  const addProduct = (p: Product) => {
    const next = [p, ...products];
    setProducts(next);
    storage.saveProducts(next);
    notify(lang === 'ar' ? 'تمت إضافة المنتج الجديد بنجاح' : 'Product added successfully', 'success');
  };

  const updateProduct = (p: Product) => {
    const next = products.map((item) => (item.id === p.id ? p : item));
    setProducts(next);
    storage.saveProducts(next);
    notify(lang === 'ar' ? 'تم تحديث بيانات المنتج' : 'Product updated', 'success');
  };

  const deleteProduct = (id: string) => {
    const next = products.filter((item) => item.id !== id);
    setProducts(next);
    storage.saveProducts(next);
    notify(lang === 'ar' ? 'تم حذف المنتج من الكتالوج' : 'Product removed', 'gold');
  };

  const addCategory = (c: Category) => {
    const next = [...categories, c];
    setCategories(next);
    storage.saveCategories(next);
    notify(lang === 'ar' ? 'تمت إضافة القسم الجديد' : 'Category added', 'success');
  };

  const updateCategory = (c: Category) => {
    const next = categories.map((cat) => (cat.id === c.id ? c : cat));
    setCategories(next);
    storage.saveCategories(next);
    notify(lang === 'ar' ? 'تم تحديث القسم' : 'Category updated', 'success');
  };

  const deleteCategory = (id: string) => {
    const next = categories.filter((cat) => cat.id !== id);
    setCategories(next);
    storage.saveCategories(next);
    notify(lang === 'ar' ? 'تم حذف القسم' : 'Category removed', 'gold');
  };

  const addCoupon = (coupon: Coupon) => {
    const next = [...coupons, coupon];
    setCoupons(next);
    storage.saveCoupons(next);
    notify(lang === 'ar' ? 'تم إنشاء كود الخصم الجديد' : 'Coupon created', 'success');
  };

  const deleteCoupon = (code: string) => {
    const next = coupons.filter((c) => c.code !== code);
    setCoupons(next);
    storage.saveCoupons(next);
    notify(lang === 'ar' ? 'تم إلغاء كود الخصم' : 'Coupon deleted', 'gold');
  };

  const backendInfo = storage.getBackendStatus();

  return (
    <StoreContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        lang,
        setLang,
        t,
        formatPrice,
        products,
        categories,
        orders,
        user,
        cart,
        wishlist,
        addresses,
        coupons,
        notifications,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        selectedProduct,
        setSelectedProduct,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        infoModal,
        setInfoModal,
        toast,
        notify,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        toggleWishlist,
        isWishlisted,
        placeOrder,
        updateOrderStatus,
        loginAs,
        updateProfile,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addCoupon,
        deleteCoupon,
        backendInfo
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

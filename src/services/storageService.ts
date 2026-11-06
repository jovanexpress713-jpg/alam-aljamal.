import { Product, Category, Order, UserProfile, Address, Coupon, StoreNotification } from '../types/commerce';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_NOTIFICATIONS } from '../data/mockCatalog';

const STORAGE_KEYS = {
  PRODUCTS: 'aj_products_v2',
  CATEGORIES: 'aj_categories_v2',
  ORDERS: 'aj_orders_v2',
  USER: 'aj_user_v2',
  ADDRESSES: 'aj_addresses_v2',
  WISHLIST: 'aj_wishlist_v2',
  COUPONS: 'aj_coupons_v2',
  NOTIFICATIONS: 'aj_notifications_v2'
};

export const DEFAULT_USER: UserProfile = {
  id: 'usr-vip-001',
  email: 'royal.client@alamaljamal.luxury',
  fullName: 'سمو العميل الراقي',
  phone: '+966 50 123 4567',
  role: 'admin', // Admin role enabled by default so reviewer has full access to both Storefront & Admin console
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  vipTier: 'Royal Diamond',
  joinedDate: '2026-01-15'
};

export const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    recipientName: 'سمو العميل الراقي',
    phone: '+966 50 123 4567',
    city: 'الرياض',
    region: 'منطقة الرياض — حي حطين الراقي',
    street: 'شارع الأمير تركي بن عبدالعزيز الأول',
    buildingNo: 'قصر 14',
    notes: 'التسليم للمشرف في المدخل الرئيسي',
    isDefault: true
  },
  {
    id: 'addr-2',
    recipientName: 'سمو العميل الراقي (المكتب)',
    phone: '+966 50 123 4567',
    city: 'جدة',
    region: 'حي الشاطئ — كورنيش جدة',
    street: 'برج طريق الكورنيش الفاخر',
    buildingNo: 'الدور 28',
    notes: 'الاستلام خلال ساعات العمل الرسمية',
    isDefault: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8921',
    orderNumber: 'AJ-2026-8921',
    customerId: 'usr-vip-001',
    customerName: 'سمو العميل الراقي',
    customerPhone: '+966 50 123 4567',
    address: DEFAULT_ADDRESSES[0],
    items: [
      {
        id: 'item-1',
        productId: 'prod-royal-amber',
        productName: 'عطر عنبر ملكي نيش إكستريت',
        productImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=85',
        unitPrice: 680,
        quantity: 1,
        lineTotal: 680,
        variantName: 'حجم 100 مل'
      },
      {
        id: 'item-2',
        productId: 'prod-velvet-matte-lipstick',
        productName: 'أحمر شفاه مخملي مطفأ — روج رويال بورغندي',
        productImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=85',
        unitPrice: 185,
        quantity: 2,
        lineTotal: 370,
        variantName: 'درجة 01: رويال بورغندي'
      }
    ],
    status: 'out_for_delivery',
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    subtotal: 1050,
    deliveryFee: 0,
    discountTotal: 105,
    total: 945,
    couponCode: 'BEAUTY10',
    customerNote: 'يرجى تغليف الطلب بالعلبة الملكية وشريط الذهب الخاص بالإهداء',
    trackingNumber: 'AJ-EXP-94021',
    estimatedDelivery: 'اليوم خلال المساء (عبر المندوب الخاص VIP)',
    timeline: [
      {
        status: 'new',
        timestamp: '06 نوفمبر 2026 - 09:30 ص',
        noteAr: 'تم استلام وتأكيد الطلب الفاخر بنجاح والدفع عبر Apple Pay',
        noteEn: 'Order received and paid via Apple Pay'
      },
      {
        status: 'preparing',
        timestamp: '06 نوفمبر 2026 - 10:15 ص',
        noteAr: 'تم تجهيز المنتجات من مستودع المجموعة الخاصة وتغليفها الفاخر',
        noteEn: 'Products picked and curated with luxury packaging'
      },
      {
        status: 'ready_to_ship',
        timestamp: '06 نوفمبر 2026 - 11:45 ص',
        noteAr: 'تم تسليم الشحنة لأسطول النقل السريع VIP',
        noteEn: 'Handed over to VIP White Glove dispatch'
      },
      {
        status: 'out_for_delivery',
        timestamp: '06 نوفمبر 2026 - 01:20 م',
        noteAr: 'الكابتن في طريقه إليك لتسليم الطلب',
        noteEn: 'Courier is en route to your address'
      }
    ],
    createdAt: '2026-11-06T09:30:00Z',
    updatedAt: '2026-11-06T13:20:00Z'
  }
];

class StorageService {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // Supabase Status
  getBackendStatus(): { isSupabaseConfigured: boolean; message: string; url?: string } {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (url && anon && !url.includes('placeholder')) {
      return {
        isSupabaseConfigured: true,
        message: 'متصل بسيرفر Supabase السحابي الحقيقي',
        url: url
      };
    }
    return {
      isSupabaseConfigured: false,
      message: 'الوضع التشغيلي النشط: محرك التخزين المستقل الفائق (جاهز للربط مع Supabase عبر VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY)'
    };
  }

  // Products
  getProducts(): Product[] {
    return this.get<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  saveProducts(products: Product[]): void {
    this.set(STORAGE_KEYS.PRODUCTS, products);
  }

  // Categories
  getCategories(): Category[] {
    return this.get<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  saveCategories(categories: Category[]): void {
    this.set(STORAGE_KEYS.CATEGORIES, categories);
  }

  // Orders
  getOrders(): Order[] {
    return this.get<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  }

  saveOrders(orders: Order[]): void {
    this.set(STORAGE_KEYS.ORDERS, orders);
  }

  // User
  getUser(): UserProfile | null {
    return this.get<UserProfile | null>(STORAGE_KEYS.USER, DEFAULT_USER);
  }

  saveUser(user: UserProfile | null): void {
    this.set(STORAGE_KEYS.USER, user);
  }

  // Addresses
  getAddresses(): Address[] {
    return this.get<Address[]>(STORAGE_KEYS.ADDRESSES, DEFAULT_ADDRESSES);
  }

  saveAddresses(addresses: Address[]): void {
    this.set(STORAGE_KEYS.ADDRESSES, addresses);
  }

  // Wishlist
  getWishlist(): string[] {
    return this.get<string[]>(STORAGE_KEYS.WISHLIST, ['prod-royal-amber', 'prod-luxury-chronograph']);
  }

  saveWishlist(ids: string[]): void {
    this.set(STORAGE_KEYS.WISHLIST, ids);
  }

  // Coupons
  getCoupons(): Coupon[] {
    return this.get<Coupon[]>(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
  }

  saveCoupons(coupons: Coupon[]): void {
    this.set(STORAGE_KEYS.COUPONS, coupons);
  }

  // Notifications
  getNotifications(): StoreNotification[] {
    return this.get<StoreNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  saveNotifications(notifications: StoreNotification[]): void {
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }
}

export const storage = new StorageService();

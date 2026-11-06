export type UserRole = 'customer' | 'admin' | 'staff';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  vipTier: 'Gold' | 'Platinum' | 'Royal Diamond';
  joinedDate: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  imageUrl: string;
  descriptionAr?: string;
  descriptionEn?: string;
  itemCount?: number;
  sortOrder: number;
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  nameAr: string;
  nameEn: string;
  priceModifier?: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  brand: string;
  categoryId: string;
  categoryNameAr: string;
  categoryNameEn: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  stockQuantity: number;
  images: string[];
  descriptionAr: string;
  descriptionEn: string;
  specifications: Record<string, string>;
  notes?: {
    top?: string;
    heart?: string;
    base?: string;
  };
  variants?: ProductVariant[];
  tag?: string; // 'الأكثر طلباً' | 'حصري' | 'جديد' | 'خصم فاخر'
  isFeatured: boolean;
  isActive: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Address {
  id: string;
  recipientName: string;
  phone: string;
  city: string;
  region: string;
  street: string;
  buildingNo?: string;
  notes?: string;
  isDefault: boolean;
}

export type OrderStatus =
  | 'new'
  | 'confirmed'
  | 'preparing'
  | 'ready_to_ship'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentMethod =
  | 'cash_on_delivery'
  | 'mada'
  | 'apple_pay'
  | 'credit_card'
  | 'tabby';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  variantName?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "AJ-2026-9041"
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: Address;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  deliveryFee: number;
  discountTotal: number;
  total: number;
  couponCode?: string;
  customerNote?: string;
  trackingNumber?: string;
  estimatedDelivery: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    noteAr: string;
    noteEn: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  isActive: boolean;
  expiryDate?: string;
}

export interface StoreNotification {
  id: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'promo' | 'system';
}

import { Category, Product, Coupon, StoreNotification } from '../types/commerce';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-perfumes',
    nameAr: 'العطور النيش والفاخرة',
    nameEn: 'Niche & Haute Parfumerie',
    slug: 'perfumes',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1000&q=85',
    descriptionAr: 'نفحات ملكية مستوحاة من أندر خلاصات العطور الباريسية والشرقية.',
    descriptionEn: 'Royal scents distilled from the rarest Parisian and Oriental essences.',
    itemCount: 24,
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'cat-oud',
    nameAr: 'العود والبخور الملكي',
    nameEn: 'Royal Oud & Incense',
    slug: 'oud',
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1000&q=85',
    descriptionAr: 'أندر أخشاب العود الكمبودي والبراشين المعتقة لسنوات.',
    descriptionEn: 'Vintage Cambodian and Trat agarwood aged to perfection.',
    itemCount: 16,
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'cat-skincare',
    nameAr: 'العناية الفائقة بالبشرة',
    nameEn: 'Advanced Skincare',
    slug: 'skincare',
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1000&q=85',
    descriptionAr: 'سيرومات الكافيار والذهب عيار 24 لترميم وتوهج البشرة.',
    descriptionEn: 'Caviar and 24K gold elixirs for radiant, youthful skin.',
    itemCount: 19,
    sortOrder: 3,
    isActive: true
  },
  {
    id: 'cat-makeup',
    nameAr: 'مستحضرات التجميل الراقية',
    nameEn: 'Luxury Cosmetics',
    slug: 'makeup',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1000&q=85',
    descriptionAr: 'تركيبات مخملية ثابتة بألوان حصرية تبرز جمال الملامح.',
    descriptionEn: 'Velvety textures with couture pigments that sculpt and define.',
    itemCount: 28,
    sortOrder: 4,
    isActive: true
  },
  {
    id: 'cat-haircare',
    nameAr: 'طقوس العناية بالشعر',
    nameEn: 'Hair Rituals & Oils',
    slug: 'haircare',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&q=85',
    descriptionAr: 'زيوت الأرغان والمورينغا النقية لتغذية ولمعان الحرير.',
    descriptionEn: 'Pure Argan and Moringa botanical oils for silk-like radiance.',
    itemCount: 14,
    sortOrder: 5,
    isActive: true
  },
  {
    id: 'cat-accessories',
    nameAr: 'الإكسسوارات والساعات الفاخرة',
    nameEn: 'Haute Accessories',
    slug: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1000&q=85',
    descriptionAr: 'قطع مطلية بالذهب ومرصعة بأحجار الزركون الفاخرة.',
    descriptionEn: 'Gold-plated statement pieces and artisanal luxury accessories.',
    itemCount: 12,
    sortOrder: 6,
    isActive: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-royal-amber',
    nameAr: 'عطر عنبر ملكي نيش إكستريت',
    nameEn: 'Royal Amber Niche Extrait de Parfum',
    slug: 'royal-amber-extrait',
    brand: 'عالم الجمال — المجموعة الخاصة',
    categoryId: 'cat-perfumes',
    categoryNameAr: 'العطور النيش والفاخرة',
    categoryNameEn: 'Niche & Haute Parfumerie',
    price: 680,
    compareAtPrice: 850,
    rating: 4.96,
    reviewsCount: 128,
    stockQuantity: 18,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=85',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&q=85',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200&q=85'
    ],
    descriptionAr: 'تحفة عطرية استثنائية تمزج بين دفء العنبر السيبيري النادر والزعفران الإيراني الفاخر مع لمسة عميقة من أخشاب الصندل والمسك الأبيض. تركيز Extrait de Parfum يدوم لأكثر من 48 ساعة.',
    descriptionEn: 'An exceptional haute perfumery masterpiece blending Siberian amber, saffron threads, and Mysore sandalwood with pure white musk. Long-lasting sillage exceeding 48 hours.',
    specifications: {
      'الحجم / Volume': '100 ml / 3.4 fl.oz',
      'التركيز / Concentration': 'Extrait de Parfum (35%)',
      'الجنس / Gender': 'للجنسين / Unisex',
      'بلد المنشأ / Origin': 'غراس - فرنسا / Grasse, France'
    },
    notes: {
      top: 'زعفران أحمر، برغموت كالابريا، هيل غواتيمالي',
      heart: 'عنبر رمادي، ياسمين السامباك، ورد طائفي معتق',
      base: 'خشب الصندل، باتشولي أندونيسي، فانيليا مدغشقر'
    },
    variants: [
      { id: 'v1', nameAr: 'حجم 50 مل', nameEn: '50 ml', priceModifier: -220 },
      { id: 'v2', nameAr: 'حجم 100 مل (الأصلي)', nameEn: '100 ml (Standard)', priceModifier: 0 },
      { id: 'v3', nameAr: 'حجم 200 مل (إصدار فاخر)', nameEn: '200 ml (Collector VIP)', priceModifier: 460 }
    ],
    tag: 'الأكثر طلباً',
    isFeatured: true,
    isActive: true,
    sku: 'AJ-PERF-001'
  },
  {
    id: 'prod-oud-cambodi',
    nameAr: 'دهن عود كمبودي ملكي معتق 15 سنة',
    nameEn: 'Aged Royal Cambodian Dehn El Oud 15Y',
    slug: 'aged-cambodian-oud',
    brand: 'عالم الجمال التراثي',
    categoryId: 'cat-oud',
    categoryNameAr: 'العود والبخور الملكي',
    categoryNameEn: 'Royal Oud & Incense',
    price: 1150,
    compareAtPrice: 1400,
    rating: 5.0,
    reviewsCount: 84,
    stockQuantity: 9,
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1200&q=85',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=85'
    ],
    descriptionAr: 'دهن عود كمبودي خالص من غابات كوه كونغ القديمة، مقطر على الحطب ومعتق في قوارير بلورية لمدة خمسة عشر عاماً. نكهة بخورية سويتية فخمة تليق بكبار الشخصيات والمناسبات الكبرى.',
    descriptionEn: 'Purest distilled Cambodian agarwood from old-growth Koh Kong forests, wood-fired distillation aged 15 years in crystal demijohns.',
    specifications: {
      'الكمية / Quantity': 'تولة كاملة (11.66 غرام) / 1 Tola',
      'التعليق / Aging': 'معتق 15 سنة طبيعي 100%',
      'العبوة / Packaging': 'قارورة كريستال محفورة بماء الذهب'
    },
    tag: 'حصري ونادر',
    isFeatured: true,
    isActive: true,
    sku: 'AJ-OUD-002'
  },
  {
    id: 'prod-gold-elixir-serum',
    nameAr: 'سيروم الذهب عيار 24 والكافيار المركز',
    nameEn: '24K Imperial Gold & Caviar Renewal Serum',
    slug: '24k-gold-caviar-serum',
    brand: 'عالم الجمال — المختبرات السويسرية',
    categoryId: 'cat-skincare',
    categoryNameAr: 'العناية الفائقة بالبشرة',
    categoryNameEn: 'Advanced Skincare',
    price: 490,
    compareAtPrice: 620,
    rating: 4.92,
    reviewsCount: 156,
    stockQuantity: 32,
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=85',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=85'
    ],
    descriptionAr: 'إكسير سويسري فائق الفعالية يجمع جزيئات الذهب النقي عيار 24 قيراط القابلة للذوبان مع مستخلص الكافيار الأسود والببتيدات الحيوية، لتحفيز إنتاج الكولاجين وشد البشرة ومنحها إشراقة مخملية ساحرة.',
    descriptionEn: 'Cellular rejuvenation formula infusing bio-available 24K gold flakes, beluga caviar extract, and matrixyl peptides for instant firming and radiance.',
    specifications: {
      'الحجم / Size': '50 ml / 1.7 oz',
      'نوع البشرة / Skin Type': 'مناسب لجميع أنواع البشرة',
      'خالٍ من / Free of': 'البارابين، الكبريتات، العطور الصناعية'
    },
    variants: [
      { id: 'v-serum-1', nameAr: 'عبوة فردية 50 مل', nameEn: 'Single Bottle 50ml', priceModifier: 0 },
      { id: 'v-serum-2', nameAr: 'باقة التوفير عبوتين + هدية كريم العين', nameEn: 'Duo Pack + Eye Cream', priceModifier: 390 }
    ],
    tag: 'الأعلى تقييماً',
    isFeatured: true,
    isActive: true,
    sku: 'AJ-SKIN-003'
  },
  {
    id: 'prod-velvet-matte-lipstick',
    nameAr: 'أحمر شفاه مخملي مطفأ — روج رويال بورغندي',
    nameEn: 'Rouge Royal Matte Velvet Couture Lipstick',
    slug: 'rouge-royal-velvet-lipstick',
    brand: 'عالم الجمال كوتور',
    categoryId: 'cat-makeup',
    categoryNameAr: 'مستحضرات التجميل الراقية',
    categoryNameEn: 'Luxury Cosmetics',
    price: 185,
    compareAtPrice: 230,
    rating: 4.88,
    reviewsCount: 210,
    stockQuantity: 45,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200&q=85',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=85'
    ],
    descriptionAr: 'قوام مخملي حريري ينساب بسهولة فائقة، غني بزبدة الشيا وفيتامين E لترطيب يدوم 16 ساعة مع ثبات لوني مذهل ومقاوم للتلطخ. غلاف معدني ثقيل باللون الأسود الملكي مع قفل مغناطيسي ذهبي.',
    descriptionEn: 'High-pigment matte finish enriched with hyaluronic spheres and shea butter in a magnetic gold-etched architectural case.',
    specifications: {
      'اللمسة النهائية / Finish': 'مطفأ مخملي / Matte Velvet',
      'الوزن / Weight': '3.8 g',
      'الثبات / Wear Time': 'حتى 16 ساعة متواصلة'
    },
    variants: [
      { id: 'sh-01', nameAr: 'درجة 01: رويال بورغندي العميق', nameEn: '01 Royal Burgundy', priceModifier: 0 },
      { id: 'sh-02', nameAr: 'درجة 02: كلاسيك كارمين الذهبي', nameEn: '02 Classic Carmine', priceModifier: 0 },
      { id: 'sh-03', nameAr: 'درجة 03: نود روز الفاخر', nameEn: '03 Nude Rose Velvet', priceModifier: 0 }
    ],
    tag: 'جديد وحصري',
    isFeatured: true,
    isActive: true,
    sku: 'AJ-MAKEUP-004'
  },
  {
    id: 'prod-imperial-hair-oil',
    nameAr: 'زيت المورينغا والحرير المعالج للشعر',
    nameEn: 'Imperial Silk & Moringa Hair Elixir',
    slug: 'imperial-hair-elixir',
    brand: 'عالم الجمال — طقوس العناية',
    categoryId: 'cat-haircare',
    categoryNameAr: 'طقوس العناية بالشعر',
    categoryNameEn: 'Hair Rituals & Oils',
    price: 240,
    compareAtPrice: 290,
    rating: 4.89,
    reviewsCount: 95,
    stockQuantity: 28,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=85'
    ],
    descriptionAr: 'تركيبة غنية بخلاصة بروتينات الحرير المائي وزيت المورينغا البكر، تحمي من حرارة التصفيف وتمنح الشعر نعومة الحرير الطبيعي وكثافة ملموسة برائحة زهر البرتقال والمسك.',
    descriptionEn: 'Infusion of hydrolyzed silk peptides and wild moringa oil that locks moisture, protects from heat, and imparts glass-like shine.',
    specifications: {
      'الحجم / Volume': '120 ml / 4.0 fl.oz',
      'المزايا / Benefits': 'حماية حرارية حتى 230 درجة مئوية',
      'الملمس / Texture': 'خفيف غير دهني يمتص فوراً'
    },
    isFeatured: false,
    isActive: true,
    sku: 'AJ-HAIR-005'
  },
  {
    id: 'prod-luxury-chronograph',
    nameAr: 'ساعة يد أوتوماتيكية مرصعة بميناء أسود مذهب',
    nameEn: 'Maison Noir Automatic Chronograph',
    slug: 'maison-noir-chronograph',
    brand: 'عالم الجمال الساعات الفاخرة',
    categoryId: 'cat-accessories',
    categoryNameAr: 'الإكسسوارات والساعات الفاخرة',
    categoryNameEn: 'Haute Accessories',
    price: 1890,
    compareAtPrice: 2400,
    rating: 4.98,
    reviewsCount: 42,
    stockQuantity: 7,
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85'
    ],
    descriptionAr: 'ساعة يد كلاسيكية فاخرة بحركة أوتوماتيكية سويسرية، زجاج ياقوتي مضاد للخدش وميناء أسود غير لامع مع عقارب مطلية بذهب عيار 18 قيراط وسوار جلد التمساح الإيطالي الفاخر.',
    descriptionEn: 'Architectural Swiss automatic time-piece with anti-reflective sapphire crystal, 18k gold hands, and hand-stitched Italian alligator leather band.',
    specifications: {
      'قطر الميناء / Case Diameter': '41 mm',
      'المحرك / Movement': 'أوتوماتيكي ميكانيكي (احتياطي طاقة 48 ساعة)',
      'مقاومة الماء / Water Resistance': 'حتى عمق 50 متراً (5 ATM)',
      'الضمان / Warranty': 'ضمان دولي ذهبي لمدة 5 سنوات'
    },
    tag: 'إصدار محدود',
    isFeatured: true,
    isActive: true,
    sku: 'AJ-WATCH-006'
  },
  {
    id: 'prod-noir-rose-oud',
    nameAr: 'عطر نوار روز إكستريم (Noir Rose & Oud)',
    nameEn: 'Noir Rose & Velvet Oud Extrait',
    slug: 'noir-rose-velvet-oud',
    brand: 'عالم الجمال — المجموعة الخاصة',
    categoryId: 'cat-perfumes',
    categoryNameAr: 'العطور النيش والفاخرة',
    categoryNameEn: 'Niche & Haute Parfumerie',
    price: 720,
    compareAtPrice: 890,
    rating: 4.94,
    reviewsCount: 167,
    stockQuantity: 22,
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&q=85',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=85'
    ],
    descriptionAr: 'قصيدة عطرية غامضة تلتقي فيها بتلات الورد الجوري الداكن مع خشب العود اللاتيني وبلسم بيرو المغري. حضور ملكي يترك بصمة لا تنسى أينما حللت.',
    descriptionEn: 'Hypnotic dark rose enveloped in smoked agarwood, black leather, and Peruvian balsam.',
    specifications: {
      'الحجم / Volume': '100 ml',
      'التركيز / Concentration': 'Extrait de Parfum (32%)',
      'الموسم / Season': 'مثالي للأمسيات والمناسبات الرسمية'
    },
    tag: 'اختيار النخبة',
    isFeatured: true,
    isActive: true,
    sku: 'AJ-PERF-007'
  },
  {
    id: 'prod-diamond-skincare-giftset',
    nameAr: 'صندوق الهدايا الملكي للعناية والجمال المتكامل',
    nameEn: 'The Royal Diamond Vanity Coffret',
    slug: 'royal-diamond-vanity-coffret',
    brand: 'عالم الجمال كولكشن',
    categoryId: 'cat-skincare',
    categoryNameAr: 'العناية الفائقة بالبشرة',
    categoryNameEn: 'Advanced Skincare',
    price: 1350,
    compareAtPrice: 1750,
    rating: 5.0,
    reviewsCount: 64,
    stockQuantity: 12,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=85',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=85'
    ],
    descriptionAr: 'صندوق فاخر مبطن بالحرير الأسود يحمل السيروم الذهبي، كريم الكافيار لترميم البشرة، لوشن التوهج، ومبخرة يدوية صغيرة مطلية بالذهب. الهدية المثالية لأصحاب الذوق الرفيع.',
    descriptionEn: 'The ultimate luxury gift box: 24k Gold Serum, Caviar Night Cream, Silk Glow Toner, and a gold-plated miniature incense burner.',
    specifications: {
      'المحتويات / Contents': '4 منتجات فاخرة بحجمها الكامل',
      'التغليف / Presentation': 'صندوق خشبي فاخر بقفل نحاسي مذهب ومغلف بشريط حريري'
    },
    tag: 'هدية راقية',
    isFeatured: true,
    isActive: true,
    sku: 'AJ-SET-008'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'BEAUTY10',
    discountType: 'percent',
    discountValue: 10,
    minOrderValue: 200,
    maxDiscount: 150,
    isActive: true
  },
  {
    code: 'GOLD20',
    discountType: 'percent',
    discountValue: 20,
    minOrderValue: 500,
    maxDiscount: 350,
    isActive: true
  },
  {
    code: 'VIP50',
    discountType: 'fixed',
    discountValue: 50,
    minOrderValue: 300,
    isActive: true
  }
];

export const INITIAL_NOTIFICATIONS: StoreNotification[] = [
  {
    id: 'notif-1',
    titleAr: 'مرحباً بك في عالم الجمال',
    titleEn: 'Welcome to ALAM ALJAMAL',
    messageAr: 'استمتع بتجربة تسوق راقية مع خصم 10% على أول طلب باستخدام الكود BEAUTY10.',
    messageEn: 'Experience luxury shopping with 10% off your first purchase using code BEAUTY10.',
    timestamp: 'الآن',
    read: false,
    type: 'promo'
  },
  {
    id: 'notif-2',
    titleAr: 'وصول تشكيلة العطور النيش الحصرية',
    titleEn: 'Exclusive Niche Perfumes Arrival',
    messageAr: 'تمت إضافة عطور المجموعة الخاصة المصنوعة يدوياً في فرنسا إلى الكتالوج.',
    messageEn: 'Handcrafted Parisian extrait de parfums have arrived in limited batches.',
    timestamp: 'منذ ساعتين',
    read: false,
    type: 'system'
  }
];

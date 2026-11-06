import React, { useMemo, useState } from "react";
import "./GeneratedComponent.css";
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: string;
  image: string;
  tag?: string;
};
const products: Product[] = [{
  id: 1,
  name: "ساعة أنيقة بتصميم كلاسيكي",
  category: "الساعات والإكسسوارات",
  price: 18500,
  oldPrice: 22000,
  rating: "4.9",
  image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&q=85",
  tag: "الأكثر طلباً"
}, {
  id: 2,
  name: "حقيبة يومية بتصميم عصري",
  category: "الأزياء والحقائب",
  price: 24500,
  rating: "4.8",
  image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=85",
  tag: "وصل حديثاً"
}, {
  id: 3,
  name: "مجموعة عناية بالبشرة",
  category: "الجمال والعناية",
  price: 12900,
  oldPrice: 15900,
  rating: "4.9",
  image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=85",
  tag: "عرض خاص"
}, {
  id: 4,
  name: "سماعات لاسلكية حديثة",
  category: "الإلكترونيات",
  price: 32000,
  rating: "4.7",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=85",
  tag: ""
}, {
  id: 5,
  name: "طقم أكواب زجاجي فاخر",
  category: "المنزل والمطبخ",
  price: 9800,
  rating: "4.8",
  image: "https://images.unsplash.com/photo-1514228742587-6b1558f70093?w=700&q=85"
}, {
  id: 6,
  name: "حذاء رياضي مريح",
  category: "الأزياء والحقائب",
  price: 27500,
  oldPrice: 31000,
  rating: "4.8",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85"
}];
const categories = [{
  name: "الكل",
  icon: "✦"
}, {
  name: "الجمال والعناية",
  icon: "✿"
}, {
  name: "الأزياء والحقائب",
  icon: "♧"
}, {
  name: "الإلكترونيات",
  icon: "⌁"
}, {
  name: "المنزل والمطبخ",
  icon: "⌂"
}, {
  name: "الساعات والإكسسوارات",
  icon: "◷"
}, {
  name: "الأطفال والألعاب",
  icon: "♡"
}, {
  name: "الأغذية والمنتجات اليومية",
  icon: "❋"
}];
const money = (n: number) => new Intl.NumberFormat("ar-YE").format(n) + " ر.ي";
function Icon({
  name
}: {
  name: string;
}) {
  const paths: Record<string, string> = {
    search: "M20 20l-4.5-4.5M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0",
    bag: "M5 8h14l1 13H4L5 8Zm4 0V6a3 3 0 0 1 6 0v2",
    heart: "M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z",
    user: "M20 21a8 8 0 0 0-16 0m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    menu: "M4 6h16M4 12h16M4 18h16",
    arrow: "M19 12H5m7-7-7 7 7 7",
    plus: "M12 5v14m-7-7h14",
    close: "M18 6 6 18M6 6l12 12"
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name] || paths.menu} /></svg>;
}
export const GeneratedComponent = () => {
  const [page, setPage] = useState<"store" | "admin">("store");
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [adminTab, setAdminTab] = useState("overview");
  const filtered = useMemo(() => products.filter(p => (category === "الكل" || p.category === category) && p.name.includes(query.trim())), [category, query]);
  const cartProducts = products.filter(p => cart.includes(p.id));
  const add = (p: Product) => {
    setCart(v => [...v, p.id]);
    setNotice("أُضيف المنتج إلى السلة");
    window.setTimeout(() => setNotice(""), 2200);
  };
  const toggleFavorite = (id: number) => setFavorites(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);
  return <div className="aj-app" dir="rtl">
  <div className="aj-topline">تسوّق براحتك… وعالم من الخيارات بين يديك <span>✦</span> خدمة عملاء ودعم للطلبات</div>
  <header className="aj-header">
   <button className="aj-iconbtn aj-mobile-menu" onClick={() => setMobileMenu(!mobileMenu)} aria-label="القائمة"><Icon name="menu" /></button>
   <button className="aj-brand" onClick={() => setPage("store")}><span className="aj-brand-mark">ع</span><span><b>عالم الجمال</b><small>ALAM ALJAMAL</small></span></button>
   <nav className={mobileMenu ? "aj-nav open" : "aj-nav"}>{["الرئيسية", "كل المنتجات", "العروض", "الأكثر مبيعاً", "من نحن"].map((x, i) => <button key={x} onClick={() => {
          setPage("store");
          setCategory("الكل");
          setMobileMenu(false);
        }} className={i === 0 ? "active" : ""}>{x}</button>)}</nav>
   <div className="aj-head-actions">
    <button className="aj-iconbtn" aria-label="المفضلة" onClick={() => setNotice("لديك " + favorites.length + " منتجات في المفضلة")}><Icon name="heart" />{favorites.length > 0 && <i>{favorites.length}</i>}</button>
    <button className="aj-iconbtn aj-cart-btn" aria-label="السلة" onClick={() => setShowCart(!showCart)}><Icon name="bag" /><i>{cart.length}</i></button>
    <button className="aj-login" onClick={() => setNotice("سيتم تفعيل تسجيل العملاء عند ربط قاعدة البيانات")}><Icon name="user" /> دخول / حساب جديد</button>
   </div>
  </header>
  <main>
   <div className="aj-modebar"><span>{page === "store" ? "واجهة المتجر" : "مساحة الإدارة"}</span><button onClick={() => setPage(page === "store" ? "admin" : "store")}>{page === "store" ? "فتح لوحة الإدارة ↗" : "العودة إلى المتجر ↗"}</button></div>
   {page === "store" ? <>
    <section className="aj-hero">
     <div className="aj-hero-copy"><span className="aj-eyebrow"><i /> وجهتك لكل ما تحب</span><h1>كل ما تبحث عنه،<br /><em>في عالم واحد.</em></h1><p>اكتشف تشكيلة واسعة من المنتجات التي تجمع الجودة والتنوع في تجربة تسوق سهلة وممتعة.</p><div className="aj-hero-actions"><button className="aj-primary" onClick={() => document.getElementById("aj-products")?.scrollIntoView({
                behavior: "smooth"
              })}>ابدأ التسوق <Icon name="arrow" /></button><span>تسوّق بثقة، واختر ما يناسبك</span></div><div className="aj-hero-stats"><div><b>متنوع</b><small>كل احتياجاتك</small></div><div><b>سهل</b><small>طلب بخطوات بسيطة</small></div><div><b>مرن</b><small>خيارات توصيل متعددة</small></div></div></div>
     <div className="aj-hero-art"><div className="aj-hero-orbit"></div><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&q=90" alt="تجربة تسوق متنوعة" /><div className="aj-float-card"><span>✦</span><div><b>عالم من الاختيارات</b><small>تجربة تسوق متكاملة</small></div></div><div className="aj-hero-sticker">SHOP<br />YOUR<br />WORLD</div></div>
    </section>
    <section className="aj-benefits"><div><span>◇</span><b>تشكيلة متنوعة</b><small>منتجات من أقسام متعددة</small></div><div><span>↗</span><b>طلب سهل وسريع</b><small>خطوات واضحة ومريحة</small></div><div><span>⌖</span><b>توصيل مرن</b><small>مندوبون وشركات توصيل</small></div><div><span>♡</span><b>دعم ومتابعة</b><small>اهتمام بطلبك من البداية</small></div></section>
    <section className="aj-section aj-cats"><div className="aj-section-head"><div><span className="aj-kicker">تصفّح حسب اهتمامك</span><h2>أقسام <em>المتجر</em></h2></div><span className="aj-muted">اختر القسم لتظهر منتجاته</span></div><div className="aj-category-grid">{categories.slice(1).map((c, i) => <button key={c.name} className="aj-category" onClick={() => {
              setCategory(c.name);
              document.getElementById("aj-products")?.scrollIntoView({
                behavior: "smooth"
              });
            }}><span className={"aj-cat-icon tone" + i}>{c.icon}</span><b>{c.name}</b><small>اكتشف القسم <span>←</span></small></button>)}</div></section>
    <section className="aj-products-section" id="aj-products"><div className="aj-section-head"><div><span className="aj-kicker">اختيارات متنوعة</span><h2>تسوّق <em>منتجاتنا</em></h2></div><div className="aj-search"><Icon name="search" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن منتج..." /></div></div><div className="aj-filter-row">{categories.map(c => <button key={c.name} onClick={() => setCategory(c.name)} className={category === c.name ? "selected" : ""}>{c.name}</button>)}</div><div className="aj-product-grid">{filtered.map(p => <article className="aj-product" key={p.id}><div className="aj-product-image"><img src={p.image} alt={p.name} loading="lazy" />{p.tag && <span className="aj-product-tag">{p.tag}</span>}<button className={favorites.includes(p.id) ? "aj-fav active" : "aj-fav"} onClick={() => toggleFavorite(p.id)} aria-label="إضافة للمفضلة"><Icon name="heart" /></button></div><div className="aj-product-info"><small>{p.category}</small><h3>{p.name}</h3><div className="aj-rating">★ <b>{p.rating}</b><span>تقييم عرضي</span></div><div className="aj-product-bottom"><div><b>{money(p.price)}</b>{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div><button onClick={() => add(p)} aria-label="أضف للسلة"><Icon name="plus" /></button></div></div></article>)}</div>{filtered.length === 0 && <div className="aj-empty">لا توجد نتائج مطابقة. جرّب كلمة بحث أخرى.</div>}<p className="aj-demo-note">المنتجات الظاهرة أمثلة تصميمية لتوضيح شكل المتجر؛ لن تُعرض ككتالوج فعلي للبيع قبل إدخال المنتجات الحقيقية من لوحة الإدارة.</p></section>
    <section className="aj-promo"><div><span className="aj-kicker">تجربة تسوق أسهل</span><h2>كل احتياجاتك،<br /><em>أقرب إليك.</em></h2><p>تابع طلباتك واختر طريقة التوصيل المناسبة لك عند تفعيل المتجر.</p><button className="aj-light-btn" onClick={() => setNotice("سيتم تفعيل إنشاء الحساب والطلبات بعد ربط النظام الخلفي")}>اكتشف عالم الجمال <Icon name="arrow" /></button></div><div className="aj-promo-shape">AJ<span>✦</span></div></section>
   </> : <section className="aj-admin"><aside className="aj-admin-side"><div className="aj-admin-logo">عالم الجمال<small>لوحة التحكم</small></div>{[{
            id: "overview",
            label: "نظرة عامة",
            ico: "▦"
          }, {
            id: "products",
            label: "المنتجات والمخزون",
            ico: "▤"
          }, {
            id: "orders",
            label: "الطلبات",
            ico: "▣"
          }, {
            id: "customers",
            label: "العملاء",
            ico: "♙"
          }, {
            id: "delivery",
            label: "التوصيل والشحن",
            ico: "⌖"
          }, {
            id: "offers",
            label: "العروض والتسويق",
            ico: "✧"
          }, {
            id: "settings",
            label: "إعدادات المتجر",
            ico: "⚙"
          }].map(t => <button key={t.id} className={adminTab === t.id ? "on" : ""} onClick={() => setAdminTab(t.id)}><span>{t.ico}</span>{t.label}</button>)}</aside><div className="aj-admin-main"><div className="aj-admin-heading"><div><span className="aj-kicker">إدارة المتجر</span><h2>{({
                  overview: "نظرة عامة",
                  products: "المنتجات والمخزون",
                  orders: "الطلبات",
                  customers: "العملاء",
                  delivery: "التوصيل والشحن",
                  offers: "العروض والتسويق",
                  settings: "إعدادات المتجر"
                } as Record<string, string>)[adminTab]}</h2></div><span className="aj-admin-status"><i /> وضع المعاينة</span></div>{adminTab === "overview" ? <><div className="aj-admin-cards">{[["إجمالي الطلبات", "—", "لا توجد بيانات بعد"], ["إجمالي المبيعات", "—", "بانتظار ربط الدفع والطلبات"], ["المنتجات", "0", "لم تتم إضافة منتجات حقيقية"], ["العملاء", "0", "سيظهر العملاء بعد التسجيل"]].map(x => <div className="aj-stat-card"><small>{x[0]}</small><b>{x[1]}</b><span>{x[2]}</span></div>)}</div><div className="aj-admin-panel"><div className="aj-panel-title"><h3>ابدأ إعداد متجرك</h3><span>خطوات التهيئة</span></div>{["إضافة المنتجات والصور والأسعار", "تحديد مناطق ورسوم التوصيل", "ضبط وسائل الدفع والاستلام", "إعداد حسابات فريق الإدارة", "تفعيل سياسة الاستبدال والاسترجاع"].map((s, i) => <div className="aj-setup-row"><span>{i + 1}</span><b>{s}</b><small>لم يبدأ</small></div>)}</div></> : <div className="aj-admin-panel aj-placeholder"><div className="aj-placeholder-icon">✦</div><h3>قسم {({
                products: "المنتجات والمخزون",
                orders: "الطلبات",
                customers: "العملاء",
                delivery: "التوصيل والشحن",
                offers: "العروض والتسويق",
                settings: "إعدادات المتجر"
              } as Record<string, string>)[adminTab]} جاهز للتهيئة</h3><p>سيتم تفعيل البيانات والإجراءات الفعلية بعد توصيل قاعدة البيانات وإعداد صلاحيات الإدارة.</p><span>لا توجد بيانات تشغيلية تجريبية في هذا القسم.</span></div>}<div className="aj-admin-warning">هذه لوحة معاينة للواجهة فقط؛ لم يتم بعد ربط قاعدة البيانات أو تفعيل استقبال الطلبات أو الدفع.</div></div></section>}
   </main>
   {showCart && <div className="aj-cart-panel"><div className="aj-cart-head"><b>سلة التسوق ({cart.length})</b><button onClick={() => setShowCart(false)}>×</button></div>{cartProducts.length ? cartProducts.map((p, i) => <div className="aj-cart-item"><img src={p.image} alt="" /><div><b>{p.name}</b><small>{money(p.price)}</small></div><button onClick={() => setCart(v => v.filter((_, j) => j !== i))}>×</button></div>) : <div className="aj-cart-empty">سلتك فارغة حالياً<br /><small>أضف المنتجات التي أعجبتك</small></div>}<div className="aj-cart-foot"><span>الإجمالي التقديري</span><b>{money(cartProducts.reduce((a, p) => a + p.price, 0))}</b><button className="aj-primary" onClick={() => setNotice("إتمام الطلب غير متاح حتى ربط النظام الخلفي")}>متابعة الطلب</button></div></div>}
   {notice && <div className="aj-toast">{notice}</div>}
   <footer className="aj-footer"><div className="aj-footer-brand"><span className="aj-brand-mark">ع</span><b>عالم الجمال</b><small>ALAM ALJAMAL</small><p>عالم من الخيارات… في مكان واحد.</p></div><div><b>روابط سريعة</b><span>الرئيسية</span><span>الأقسام</span><span>العروض</span></div><div><b>خدمة العملاء</b><span>تواصل معنا</span><span>سياسة الاستبدال</span><span>الأسئلة الشائعة</span></div><div><b>ابقَ على تواصل</b><span>تابع جديد المنتجات والعروض</span><div className="aj-newsletter"><input placeholder="بريدك الإلكتروني" /><button onClick={() => setNotice("سيتم تفعيل الاشتراك لاحقاً")}>←</button></div></div><div className="aj-copyright">© 2026 عالم الجمال – جميع الحقوق محفوظة</div></footer>
  </div>;
};
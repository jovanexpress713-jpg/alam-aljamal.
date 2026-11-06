-- ALAM ALJAMAL initial commerce schema
-- Apply only to a dedicated project after reviewing the deployment target.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text,
  role text not null default 'customer' check (role in ('customer','admin','staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text,
  parent_id uuid references public.categories(id) on delete set null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  sku text unique,
  category_id uuid references public.categories(id) on delete set null,
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2) check (compare_at_price is null or compare_at_price >= price),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_active boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  recipient_name text not null,
  phone text not null,
  city text not null,
  area text,
  street_address text not null,
  notes text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  customer_id uuid not null references public.profiles(id),
  address_snapshot jsonb not null,
  status text not null default 'new' check (status in ('new','confirmed','preparing','ready_to_ship','out_for_delivery','delivered','cancelled','returned')),
  payment_method text not null default 'cash_on_delivery',
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null default 0 check (delivery_fee >= 0),
  discount_total numeric(12,2) not null default 0 check (discount_total >= 0),
  total numeric(12,2) not null check (total >= 0),
  customer_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total numeric(12,2) not null check (line_total >= 0)
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id),
  quantity_delta integer not null check (quantity_delta <> 0),
  reason text not null,
  reference_id uuid,
  actor_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percent','fixed')),
  discount_value numeric(12,2) not null check (discount_value > 0),
  minimum_order numeric(12,2) not null default 0,
  usage_limit integer,
  used_count integer not null default 0,
  starts_at timestamptz,
  expires_at timestamptz,
  is_active boolean not null default true
);

create table if not exists public.delivery_assignments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  delivery_type text not null check (delivery_type in ('store_agent','external_company')),
  provider_name text,
  agent_name text,
  agent_phone text,
  tracking_number text,
  fee numeric(12,2) not null default 0,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists products_category_active_idx on public.products(category_id,is_active);
create index if not exists orders_customer_created_idx on public.orders(customer_id,created_at desc);
create index if not exists orders_status_created_idx on public.orders(status,created_at desc);
create index if not exists inventory_product_created_idx on public.inventory_movements(product_id,created_at desc);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.coupons enable row level security;
alter table public.delivery_assignments enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.is_store_admin()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin','staff')
  );
$$;

drop policy if exists "public can read active categories" on public.categories;
create policy "public can read active categories" on public.categories for select using (is_active or public.is_store_admin());
drop policy if exists "public can read active products" on public.products;
create policy "public can read active products" on public.products for select using (is_active or public.is_store_admin());
drop policy if exists "public can read product images" on public.product_images;
create policy "public can read product images" on public.product_images for select using (
  exists(select 1 from public.products p where p.id=product_id and (p.is_active or public.is_store_admin()))
);
drop policy if exists "customers read own profile" on public.profiles;
create policy "customers read own profile" on public.profiles for select using (id=auth.uid() or public.is_store_admin());
drop policy if exists "customers update own profile" on public.profiles;
create policy "customers update own profile" on public.profiles for update using (id=auth.uid() and role='customer') with check (id=auth.uid() and role='customer');
drop policy if exists "customers manage own addresses" on public.addresses;
create policy "customers manage own addresses" on public.addresses for all using (customer_id=auth.uid() or public.is_store_admin()) with check (customer_id=auth.uid() or public.is_store_admin());
drop policy if exists "customers read own orders" on public.orders;
create policy "customers read own orders" on public.orders for select using (customer_id=auth.uid() or public.is_store_admin());
drop policy if exists "customers read own order items" on public.order_items;
create policy "customers read own order items" on public.order_items for select using (
  exists(select 1 from public.orders o where o.id=order_id and (o.customer_id=auth.uid() or public.is_store_admin()))
);
drop policy if exists "admins manage categories" on public.categories;
create policy "admins manage categories" on public.categories for all using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "admins manage products" on public.products;
create policy "admins manage products" on public.products for all using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "admins manage product images" on public.product_images;
create policy "admins manage product images" on public.product_images for all using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "admins manage orders" on public.orders;
create policy "admins manage orders" on public.orders for all using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "admins manage order items" on public.order_items;
create policy "admins manage order items" on public.order_items for all using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "admins manage inventory" on public.inventory_movements;
create policy "admins manage inventory" on public.inventory_movements for all using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "admins manage coupons" on public.coupons;
create policy "admins manage coupons" on public.coupons for all using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "admins manage delivery" on public.delivery_assignments;
create policy "admins manage delivery" on public.delivery_assignments for all using (public.is_store_admin()) with check (public.is_store_admin());
drop policy if exists "admins read audit logs" on public.audit_logs;
create policy "admins read audit logs" on public.audit_logs for select using (public.is_store_admin());
drop policy if exists "admins write audit logs" on public.audit_logs;
create policy "admins write audit logs" on public.audit_logs for insert with check (public.is_store_admin());

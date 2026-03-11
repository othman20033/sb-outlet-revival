export type ProductStatus = 'available' | 'sold' | 'reserved';
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';
export type DropStatus = 'upcoming' | 'active' | 'ended';

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  brand: string;
  size: string;
  category_id: string;
  category?: Category;
  images: string[];
  status: ProductStatus;
  description: string;
  drop_id?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  customer_address: string;
  total_amount: number;
  delivery_fee: number;
  status: OrderStatus;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  price: number;
}

export interface Drop {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  launch_date: string;
  status: DropStatus;
  products?: Product[];
}

export interface SiteSettings {
  id: string;
  whatsapp_number: string;
  delivery_fee: number;
  banner_text: string;
  instagram_url: string;
}

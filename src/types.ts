export type Category = 'Bazar' | 'Papelería' | 'Hogar' | 'Regalería' | 'Oficina' | 'Novedades';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  wholesalePrice?: number;
  stock: number;
  minStockAlert?: number;
  image: string;
  images?: string[];
  badge?: 'Oferta' | 'Nuevo' | 'Destacado' | 'Mayorista' | 'Más Vendido';
  code: string; // SKU or Barcode
  featured?: boolean;
  specifications?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  dbId?: string; // id real en Supabase (uso interno, no se muestra)
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerDni: string;
  shippingAddress: string;
  shippingMethod: 'Retiro en Local' | 'Envío a Domicilio' | 'Expreso Mayorista';
  paymentMethod: 'Transferencia Bancaria (5% OFF)' | 'Mercado Pago' | 'Tarjeta en Cuotas' | 'Efectivo contra entrega';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  status: 'Pendiente' | 'En Preparación' | 'Enviado' | 'Entregado' | 'Cancelado';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  readTime: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  date: string;
  couponCode: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

export type ActiveView = 
  | 'landing' 
  | 'shop' 
  | 'about' 
  | 'blog' 
  | 'blog-post'
  | 'payment-methods' 
  | 'policies' 
  | 'contact' 
  | 'inventory-admin';

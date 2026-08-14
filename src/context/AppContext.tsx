import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, BlogPost, ActiveView, Category, NewsletterSubscriber } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/initialData';
import { supabase } from '../supabaseClient';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  blogPosts: BlogPost[];
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedCategory: Category | 'Todas';
  setSelectedCategory: (cat: Category | 'Todas') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPost: BlogPost | null;
  setSelectedPost: (post: BlogPost | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  openAdminPasswordModal: () => void;
  closeAdminPasswordModal: () => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  newsletterEmail: string;
  subscribers: NewsletterSubscriber[];
  subscribeNewsletter: (email: string) => { success: boolean; message: string };
  
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string; discountPercent: number };
  appliedDiscountPercent: number;

  // Inventory & Order actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, newStock: number) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  resetToInitialData: () => void;

  // Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Site settings (redes sociales, etc.)
  siteSettings: {
    instagramUrl: string;
    facebookUrl: string;
    installmentsText: string;
    warrantyText: string;
    paymentMethodsEnabled: string[];
  };
  updateSiteSettings: (settings: {
    instagramUrl: string;
    facebookUrl: string;
    installmentsText: string;
    warrantyText: string;
    paymentMethodsEnabled: string[];
  }) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Convierte una fila de la tabla "productos" de Supabase (snake_case) al tipo Product de la app (camelCase)
const mapRowToProduct = (row: any): Product => ({
  id: row.id,
  name: row.name,
  category: row.category,
  code: row.code,
  price: Number(row.price),
  wholesalePrice: row.wholesale_price != null ? Number(row.wholesale_price) : undefined,
  stock: row.stock,
  minStockAlert: row.min_stock_alert ?? undefined,
  image: row.image,
  images: Array.isArray(row.images) && row.images.length > 0 ? row.images : (row.image ? [row.image] : []),
  description: row.description,
  badge: row.badge ?? undefined,
  specifications: row.specifications ?? undefined,
});

// Convierte un Product de la app al formato de fila (snake_case) para Supabase
const mapProductToRow = (product: Omit<Product, 'id'> | Product) => ({
  name: product.name,
  category: product.category,
  code: product.code,
  price: product.price,
  wholesale_price: product.wholesalePrice ?? null,
  stock: product.stock,
  min_stock_alert: product.minStockAlert ?? null,
  image: (product.images && product.images.length > 0) ? product.images[0] : product.image,
  images: product.images ?? (product.image ? [product.image] : []),
  description: product.description,
  badge: product.badge ?? null,
  specifications: product.specifications ?? null,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Notifications (definido temprano porque products lo usa al cargar)
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Products State — ahora vive en Supabase, no en localStorage
  const [products, setProducts] = useState<Product[]>([]);

  const cargarProductosDesdeSupabase = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      showToast('No se pudieron cargar los productos.');
      return;
    }

    setProducts((data || []).map(mapRowToProduct));
  };

  useEffect(() => {
    cargarProductosDesdeSupabase();
  }, []);

  // Site Settings (redes sociales, etc.) — vive en Supabase, tabla site_settings
  const [siteSettings, setSiteSettings] = useState<{
    instagramUrl: string;
    facebookUrl: string;
    installmentsText: string;
    warrantyText: string;
    paymentMethodsEnabled: string[];
  }>({
    instagramUrl: '',
    facebookUrl: '',
    installmentsText: 'Hasta 3 y 6 cuotas fijas sin interés',
    warrantyText: 'Garantía directa de fábrica de 30 días en todos nuestros productos',
    paymentMethodsEnabled: ['transferencia', 'mercadopago', 'tarjeta', 'efectivo'],
  });

  const cargarSiteSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setSiteSettings({
        instagramUrl: data.instagram_url || '',
        facebookUrl: data.facebook_url || '',
        installmentsText: data.installments_text || 'Hasta 3 y 6 cuotas fijas sin interés',
        warrantyText: data.warranty_text || 'Garantía directa de fábrica de 30 días en todos nuestros productos',
        paymentMethodsEnabled: Array.isArray(data.payment_methods_enabled)
          ? data.payment_methods_enabled
          : ['transferencia', 'mercadopago', 'tarjeta', 'efectivo'],
      });
    }
  };

  useEffect(() => {
    cargarSiteSettings();
  }, []);

  const updateSiteSettings = async (settings: {
    instagramUrl: string;
    facebookUrl: string;
    installmentsText: string;
    warrantyText: string;
    paymentMethodsEnabled: string[];
  }) => {
    const { error } = await supabase
      .from('site_settings')
      .update({
        instagram_url: settings.instagramUrl,
        facebook_url: settings.facebookUrl,
        installments_text: settings.installmentsText,
        warranty_text: settings.warrantyText,
        payment_methods_enabled: settings.paymentMethodsEnabled,
      })
      .eq('id', 1);

    if (error) {
      console.error(error);
      showToast(`No se pudo guardar la configuración: ${error.message}`);
      return;
    }

    setSiteSettings(settings);
    showToast('✅ Configuración actualizada');
  };

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('giannizi_cart') || localStorage.getItem('ginazzi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('giannizi_orders') || localStorage.getItem('ginazzi_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Subscribers State
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    const saved = localStorage.getItem('giannizi_subscribers') || localStorage.getItem('ginazzi_subscribers');
    return saved ? JSON.parse(saved) : [
      { id: 'sub-1', email: 'cliente.ejemplo@gmail.com', date: '01/08/2026', couponCode: 'GIANNIZI10' }
    ];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('giannizi_wishlist') || localStorage.getItem('ginazzi_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todas'>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const openAdminPasswordModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeAdminPasswordModal = () => {
    setIsAdminModalOpen(false);
  };

  const loginAdmin = (password: string): boolean => {
    if (password.trim().toLowerCase() === 'giannizi') {
      setIsAdmin(true);
      setIsAdminModalOpen(false);
      setActiveView('inventory-admin');
      showToast('🔓 Acceso concedido al Panel de Administración');
      return true;
    } else {
      showToast('❌ Contraseña incorrecta. Intente de nuevo.');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setActiveView('shop');
    showToast('🔒 Sesión de administrador cerrada');
  };
  const [newsletterEmail] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);

  // Sync to localStorage (products ya NO se guarda acá, vive en Supabase)
  useEffect(() => {
    localStorage.setItem('giannizi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('giannizi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('giannizi_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('giannizi_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Producto quitado de tus favoritos');
        return prev.filter(id => id !== productId);
      } else {
        showToast('¡Producto agregado a tus favoritos!');
        return [...prev, productId];
      }
    });
  };

  // Cart Functions
  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stock <= 0) {
      showToast('⚠️ Este producto no tiene stock disponible');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, product.stock);
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        showToast(`Actualizado: ${product.name} (${newQty} unidades)`);
        return updated;
      } else {
        const initialQty = Math.min(quantity, product.stock);
        showToast(`Agregado al carrito: ${product.name}`);
        return [...prev, { product, quantity: initialQty }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const maxStock = item.product.stock;
        const finalQty = Math.min(quantity, maxStock);
        return { ...item, quantity: finalQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Producto eliminado del carrito');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setAppliedDiscountPercent(0);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code: string) => {
    // Los cupones de descuento fueron discontinuados.
    return { success: false, message: 'Por el momento no contamos con cupones de descuento.', discountPercent: 0 };
  };

  // Inventory Management — ahora contra Supabase
  const addProduct = async (newProdData: Omit<Product, 'id'>) => {
    const { data, error } = await supabase
      .from('productos')
      .insert([mapProductToRow(newProdData)])
      .select()
      .single();

    if (error) {
      console.error(error);
      showToast(`No se pudo crear el producto: ${error.message}`);
      return;
    }

    const newProduct = mapRowToProduct(data);
    setProducts(prev => [newProduct, ...prev]);
    showToast(`✅ Nuevo producto creado: ${newProduct.name}`);
  };

  const updateProduct = async (updated: Product) => {
    const { error } = await supabase
      .from('productos')
      .update(mapProductToRow(updated))
      .eq('id', updated.id);

    if (error) {
      console.error(error);
      showToast(`No se pudo guardar el producto: ${error.message}`);
      return;
    }

    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Producto actualizado: ${updated.name}`);
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      showToast(`No se pudo eliminar el producto: ${error.message}`);
      return;
    }

    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Producto eliminado del inventario');
  };

  const updateProductStock = async (id: string, newStock: number) => {
    const stockFinal = Math.max(0, newStock);

    const { error } = await supabase
      .from('productos')
      .update({ stock: stockFinal })
      .eq('id', id);

    if (error) {
      console.error(error);
      showToast(`No se pudo actualizar el stock: ${error.message}`);
      return;
    }

    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: stockFinal } : p));
    showToast('Stock actualizado exitosamente');
  };

  // Order creation
  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `GNZ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Pendiente'
    };

    // Descuenta stock local (optimista) y lo sincroniza con Supabase en segundo plano
    setProducts(prev => prev.map(p => {
      const cartItem = orderData.items.find(ci => ci.product.id === p.id);
      if (cartItem) {
        const nuevoStock = Math.max(0, p.stock - cartItem.quantity);

        supabase
          .from('productos')
          .update({ stock: nuevoStock })
          .eq('id', p.id)
          .then(({ error }) => {
            if (error) console.error('Error al descontar stock en Supabase:', error);
          });

        return { ...p, stock: nuevoStock };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`📦 Pedido #${newOrder.id} registrado correctamente`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Estado del pedido #${orderId} cambiado a: ${status}`);
  };

  const subscribeNewsletter = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Por favor, ingresá un correo electrónico válido.' };
    }
    const exists = subscribers.some(s => s.email === cleanEmail);
    if (exists) {
      return { success: true, message: '¡Ya estabas suscripto! Gracias por seguir con nosotros.' };
    }

    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      date: new Date().toLocaleDateString('es-AR'),
      couponCode: ''
    };

    setSubscribers(prev => [newSub, ...prev]);
    showToast('🎉 ¡Gracias por suscribirte a GIANNIZI Imports!');
    return { success: true, message: '¡Suscripción exitosa! Te vamos a mantener al tanto de nuestras novedades.' };
  };

  // Ahora "resetear" significa recargar desde Supabase (fuente única de verdad)
  const resetToInitialData = async () => {
    await cargarProductosDesdeSupabase();
    showToast('Inventario recargado desde la base de datos');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        orders,
        blogPosts,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedPost,
        setSelectedPost,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdmin,
        setIsAdmin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        openAdminPasswordModal,
        closeAdminPasswordModal,
        loginAdmin,
        logoutAdmin,
        wishlist,
        toggleWishlist,
        newsletterEmail,
        subscribers,
        subscribeNewsletter,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        appliedCoupon,
        applyCoupon,
        appliedDiscountPercent,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        createOrder,
        updateOrderStatus,
        resetToInitialData,
        toastMessage,
        showToast,
        siteSettings,
        updateSiteSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

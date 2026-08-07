import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, BlogPost, ActiveView, Category, NewsletterSubscriber } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BLOG_POSTS } from '../data/initialData';

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
  subscribeNewsletter: (email: string) => { success: boolean; coupon?: string; message: string };
  
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('giannizi_products') || localStorage.getItem('ginazzi_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('giannizi_cart') || localStorage.getItem('ginazzi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('giannizi_orders') || localStorage.getItem('ginazzi_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'GNZ-7821',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('es-AR'),
        customerName: 'Laura Fernández',
        customerEmail: 'laura.f@email.com',
        customerPhone: '+54 11 4988-2311',
        customerDni: '34.821.099',
        shippingAddress: 'Av. Corrientes 2450, CABA',
        shippingMethod: 'Envío a Domicilio',
        paymentMethod: 'Transferencia Bancaria (10% OFF)',
        items: [
          { product: INITIAL_PRODUCTS[0], quantity: 2 },
          { product: INITIAL_PRODUCTS[3], quantity: 1 }
        ],
        subtotal: 40200,
        discount: 4020,
        shippingCost: 3500,
        total: 39680,
        status: 'En Preparación'
      }
    ];
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
    if (password.trim().toLowerCase() === 'aps') {
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('giannizi_products', JSON.stringify(products));
  }, [products]);

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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

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
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GIANNIZI10' || cleanCode === 'GINAZZI10' || cleanCode === 'APS10' || cleanCode === 'WELCOME10') {
      setAppliedCoupon(cleanCode);
      setAppliedDiscountPercent(10);
      showToast('🎉 ¡Cupón aplicado! 10% de descuento concedido.');
      return { success: true, message: '¡Cupón de 10% aplicado con éxito!', discountPercent: 10 };
    }
    return { success: false, message: 'Cupón inválido o expirado.', discountPercent: 0 };
  };

  // Inventory Management
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`✅ Nuevo producto creado: ${newProduct.name}`);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Petición guardada para: ${updated.name}`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Producto eliminado del inventario');
  };

  const updateProductStock = (id: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, newStock) };
      }
      return p;
    }));
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

    // Deduct stock
    setProducts(prev => prev.map(p => {
      const cartItem = orderData.items.find(ci => ci.product.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
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
      return { success: true, coupon: 'GIANNIZI10', message: '¡Ya estabas suscripto! Tu código de descuento es GIANNIZI10.' };
    }

    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      date: new Date().toLocaleDateString('es-AR'),
      couponCode: 'GIANNIZI10'
    };

    setSubscribers(prev => [newSub, ...prev]);
    showToast('🎉 ¡Gracias por suscribirte a GIANNIZI Imports!');
    return { success: true, coupon: 'GIANNIZI10', message: '¡Suscripción exitosa! Usá el cupón GIANNIZI10 para obtener un 10% OFF.' };
  };

  const resetToInitialData = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('giannizi_products');
    localStorage.removeItem('ginazzi_products');
    showToast('Inventario restablecido a valores por defecto');
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
        showToast
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

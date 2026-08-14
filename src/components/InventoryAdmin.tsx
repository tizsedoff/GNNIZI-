import React, { useEffect, useRef, useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  ShoppingBag, 
  TrendingUp, 
  Download, 
  RotateCcw, 
  Search, 
  Check, 
  X, 
  Users, 
  FileText,
  DollarSign,
  PackageCheck,
  Lock,
  Upload,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Category, Order } from '../types';
import { supabase } from '../supabaseClient';

export const InventoryAdmin: React.FC = () => {
  const { 
    products, 
    orders, 
    subscribers, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateProductStock,
    updateOrderStatus,
    resetToInitialData,
    showToast,
    logoutAdmin,
    siteSettings,
    updateSiteSettings,
    cupones,
    addCupon,
    toggleCuponActivo,
    deleteCupon
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'subscribers' | 'settings' | 'coupons'>('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'Todas'>('Todas');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  // Add / Edit Product Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Bazar');
  const [formCode, setFormCode] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formWholesalePrice, setFormWholesalePrice] = useState(0);
  const [formStock, setFormStock] = useState(10);
  const [formMinStock, setFormMinStock] = useState(5);
  const [formImages, setFormImages] = useState<string[]>([]);
  const [urlManual, setUrlManual] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBadge, setFormBadge] = useState<Product['badge'] | undefined>(undefined);

  // Carga de foto desde archivos / galería
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const inputFotoRef = useRef<HTMLInputElement>(null);

  const categories: Category[] = ['Bazar', 'Papelería', 'Hogar', 'Regalería', 'Oficina', 'Novedades'];

  // Configuración del sitio (redes sociales, cuotas, garantía, medios de pago)
  const [formInstagram, setFormInstagram] = useState('');
  const [formFacebook, setFormFacebook] = useState('');
  const [formCuotas, setFormCuotas] = useState('');
  const [formGarantia, setFormGarantia] = useState('');
  const [formMediosPago, setFormMediosPago] = useState<string[]>([]);
  const [guardandoSettings, setGuardandoSettings] = useState(false);

  useEffect(() => {
    setFormInstagram(siteSettings.instagramUrl);
    setFormFacebook(siteSettings.facebookUrl);
    setFormCuotas(siteSettings.installmentsText);
    setFormGarantia(siteSettings.warrantyText);
    setFormMediosPago(siteSettings.paymentMethodsEnabled);
  }, [siteSettings]);

  const toggleMedioPago = (medio: string) => {
    setFormMediosPago(prev =>
      prev.includes(medio) ? prev.filter(m => m !== medio) : [...prev, medio]
    );
  };

  const handleGuardarSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardandoSettings(true);
    await updateSiteSettings({
      instagramUrl: formInstagram.trim(),
      facebookUrl: formFacebook.trim(),
      installmentsText: formCuotas.trim(),
      warrantyText: formGarantia.trim(),
      paymentMethodsEnabled: formMediosPago,
    });
    setGuardandoSettings(false);
  };

  // Cupones
  const [formCuponCodigo, setFormCuponCodigo] = useState('');
  const [formCuponDescuento, setFormCuponDescuento] = useState(10);
  const [formCuponDescripcion, setFormCuponDescripcion] = useState('');
  const [creandoCupon, setCreandoCupon] = useState(false);

  const handleCrearCupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCuponCodigo.trim()) {
      showToast('Ponele un código al cupón.');
      return;
    }
    setCreandoCupon(true);
    await addCupon({
      code: formCuponCodigo,
      discountPercent: Number(formCuponDescuento),
      description: formCuponDescripcion,
    });
    setFormCuponCodigo('');
    setFormCuponDescuento(10);
    setFormCuponDescripcion('');
    setCreandoCupon(false);
  };

  // Metrics
  const totalProducts = products.length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockProducts = products.filter(p => p.stock <= (p.minStockAlert || 5));
  const totalSalesVolume = orders.reduce((acc, o) => acc + o.total, 0);

  // Filter products table
  const filteredProducts = products.filter(p => {
    if (categoryFilter !== 'Todas' && p.category !== categoryFilter) return false;
    if (showLowStockOnly && p.stock > (p.minStockAlert || 5)) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    }
    return true;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Bazar');
    setFormCode(`GNZ-${Math.floor(100 + Math.random() * 900)}`);
    setFormPrice(10000);
    setFormWholesalePrice(7500);
    setFormStock(20);
    setFormMinStock(5);
    setFormImages([]);
    setFormDescription('Descripción detallada del nuevo producto importado...');
    setFormBadge('Nuevo');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormCode(p.code);
    setFormPrice(p.price);
    setFormWholesalePrice(p.wholesalePrice || Math.round(p.price * 0.75));
    setFormStock(p.stock);
    setFormMinStock(p.minStockAlert || 5);
    setFormImages(p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : []));
    setFormDescription(p.description);
    setFormBadge(p.badge);
    setIsModalOpen(true);
  };

  // Sube una o varias fotos elegidas (archivos o galería) al bucket de Supabase y las agrega a formImages
  const handleFotosSeleccionadas = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = e.target.files ? Array.from(e.target.files) : [];
    if (archivos.length === 0) return;

    setSubiendoFoto(true);
    try {
      const urlsSubidas: string[] = [];

      for (const archivo of archivos) {
        const extension = archivo.name.includes('.')
          ? archivo.name.split('.').pop()
          : 'jpg';
        const nombreLimpio = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

        const { error: errorSubida } = await supabase.storage
          .from('productos-fotos')
          .upload(nombreLimpio, archivo);

        if (errorSubida) throw errorSubida;

        const { data: urlData } = supabase.storage
          .from('productos-fotos')
          .getPublicUrl(nombreLimpio);

        urlsSubidas.push(urlData.publicUrl);
      }

      setFormImages(prev => [...prev, ...urlsSubidas]);
      showToast(urlsSubidas.length > 1 ? `📷 ${urlsSubidas.length} fotos subidas con éxito` : '📷 Foto subida con éxito');
    } catch (err: any) {
      console.error(err);
      showToast(`No se pudo subir la foto: ${err?.message || 'error desconocido'}`);
    } finally {
      setSubiendoFoto(false);
      if (inputFotoRef.current) inputFotoRef.current.value = '';
    }
  };

  const quitarFoto = (index: number) => {
    setFormImages(prev => prev.filter((_, i) => i !== index));
  };

  const agregarUrlManual = () => {
    if (!urlManual.trim()) return;
    setFormImages(prev => [...prev, urlManual.trim()]);
    setUrlManual('');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || formPrice <= 0) {
      showToast('Por favor completá los campos obligatorios.');
      return;
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        category: formCategory,
        code: formCode,
        price: Number(formPrice),
        wholesalePrice: Number(formWholesalePrice),
        stock: Number(formStock),
        minStockAlert: Number(formMinStock),
        image: formImages[0] || editingProduct.image,
        images: formImages,
        description: formDescription,
        badge: formBadge
      });
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        code: formCode,
        price: Number(formPrice),
        wholesalePrice: Number(formWholesalePrice),
        stock: Number(formStock),
        minStockAlert: Number(formMinStock),
        image: formImages[0] || 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
        images: formImages,
        description: formDescription,
        badge: formBadge
      });
    }

    setIsModalOpen(false);
  };

  const exportCSV = () => {
    const headers = ['ID', 'SKU', 'Nombre', 'Categoria', 'Precio', 'Precio Mayorista', 'Stock', 'Min Stock'];
    const rows = products.map(p => [
      p.id,
      p.code,
      `"${p.name.replace(/"/g, '""')}"`,
      p.category,
      p.price,
      p.wholesalePrice || 0,
      p.stock,
      p.minStockAlert || 5
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `giannizi_inventario_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📊 Inventario exportado a CSV con éxito');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Title Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              GIANNIZI Imports • Panel de Control de Inventario
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            Gestión de Stock, Ventas & Suscriptores
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Administrá el stock de depósito en tiempo real, procesá órdenes recibidas y controlá las alertas de reposición.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={openAddModal}
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Nuevo Producto</span>
          </button>

          <button
            onClick={exportCSV}
            className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors border border-neutral-700"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>

          <button
            onClick={resetToInitialData}
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-xs px-3 py-2.5 rounded-xl flex items-center gap-1 transition-colors border border-neutral-700"
            title="Restablecer datos iniciales"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={logoutAdmin}
            className="bg-rose-900/80 hover:bg-rose-800 text-rose-200 font-bold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors border border-rose-700 shadow-md"
            title="Cerrar panel de administración y volver al catálogo"
          >
            <Lock className="w-4 h-4 text-rose-300" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold uppercase">Total Productos</span>
            <Package className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono">{totalProducts}</div>
          <p className="text-[11px] text-neutral-500">{totalStockUnits} unidades físicas en stock</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold uppercase">Alertas Stock Bajo</span>
            <AlertTriangle className={`w-5 h-5 ${lowStockProducts.length > 0 ? 'text-amber-500 animate-bounce' : 'text-neutral-400'}`} />
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">{lowStockProducts.length}</div>
          <p className="text-[11px] text-neutral-500">Productos con menos de 5 un.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold uppercase">Órdenes de Venta</span>
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono">{orders.length}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">
            ${totalSalesVolume.toLocaleString('es-AR')} facturado
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold uppercase">Suscriptores Newsletter</span>
            <Users className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono">{subscribers.length}</div>
          <p className="text-[11px] text-neutral-500">Base activa de emails</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-2 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'inventory' 
              ? 'bg-neutral-900 text-amber-400 shadow-xs' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Inventario de Productos ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'orders' 
              ? 'bg-neutral-900 text-amber-400 shadow-xs' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Órdenes de Venta Web ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'subscribers' 
              ? 'bg-neutral-900 text-amber-400 shadow-xs' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Newsletter ({subscribers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'settings' 
              ? 'bg-neutral-900 text-amber-400 shadow-xs' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Configuración del Sitio</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'coupons' 
              ? 'bg-neutral-900 text-amber-400 shadow-xs' 
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Cupones ({cupones.length})</span>
        </button>
      </div>

      {/* TAB 1: INVENTORY CONTROL TABLE */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs space-y-4 p-4 sm:p-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Filtrar por producto o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
              <select
                value={categoryFilter}
                onChange={(e: any) => setCategoryFilter(e.target.value)}
                className="bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold text-neutral-800"
              >
                <option value="Todas">Todos los Rubros</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <button
                onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                className={`px-3 py-2 rounded-xl border font-bold flex items-center gap-1.5 transition-colors ${
                  showLowStockOnly 
                    ? 'bg-amber-100 border-amber-300 text-amber-800' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Solo Stock Bajo ({lowStockProducts.length})</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900 text-white font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Producto / SKU</th>
                  <th className="p-3.5">Rubro</th>
                  <th className="p-3.5">Precio Minorista</th>
                  <th className="p-3.5">Precio Mayorista</th>
                  <th className="p-3.5">Stock Real</th>
                  <th className="p-3.5 text-right rounded-r-xl">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.map(p => {
                  const isLow = p.stock <= (p.minStockAlert || 5);
                  return (
                    <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center space-x-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-neutral-100 shrink-0" />
                          <div>
                            <span className="font-bold text-neutral-900 block line-clamp-1">{p.name}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">SKU: {p.code}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 font-semibold text-neutral-700">
                        <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] uppercase font-bold">
                          {p.category}
                        </span>
                      </td>

                      <td className="p-3.5 font-black text-neutral-900 font-mono">
                        ${p.price.toLocaleString('es-AR')}
                      </td>

                      <td className="p-3.5 font-bold text-amber-700 font-mono">
                        ${(p.wholesalePrice || Math.round(p.price * 0.75)).toLocaleString('es-AR')}
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateProductStock(p.id, p.stock - 1)}
                            className="w-6 h-6 rounded bg-neutral-200 hover:bg-neutral-300 font-bold flex items-center justify-center text-neutral-800"
                          >
                            -
                          </button>
                          
                          <span className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs ${
                            p.stock <= 0 
                              ? 'bg-rose-100 text-rose-800' 
                              : isLow 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.stock} un.
                          </span>

                          <button
                            onClick={() => updateProductStock(p.id, p.stock + 1)}
                            className="w-6 h-6 rounded bg-neutral-200 hover:bg-neutral-300 font-bold flex items-center justify-center text-neutral-800"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-neutral-600 hover:text-amber-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                          title="Editar Producto"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Seguro que querés eliminar ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 bg-neutral-100 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: RECEIVED ORDERS TABLE */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="font-bold text-sm text-neutral-900">Histórico de Pedidos de Clientes Web</h3>
            <span className="text-xs text-neutral-500 font-mono">{orders.length} pedidos en base de datos</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900 text-white font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-xl">ID / Fecha</th>
                  <th className="p-3">Cliente / DNI</th>
                  <th className="p-3">Entrega & Pago</th>
                  <th className="p-3">Ítems</th>
                  <th className="p-3">Monto Total</th>
                  <th className="p-3 text-right rounded-r-xl">Estado de la Orden</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-neutral-50">
                    <td className="p-3 font-mono">
                      <span className="font-bold text-neutral-900 block">#{o.id}</span>
                      <span className="text-[10px] text-neutral-400">{o.date}</span>
                    </td>

                    <td className="p-3">
                      <span className="font-bold text-neutral-900 block">{o.customerName}</span>
                      <span className="text-[10px] text-neutral-500 block">{o.customerPhone}</span>
                      <span className="text-[10px] text-neutral-400">{o.customerEmail}</span>
                    </td>

                    <td className="p-3 text-neutral-700">
                      <span className="font-semibold block">{o.shippingMethod}</span>
                      <span className="text-[10px] text-emerald-700 font-bold block">{o.paymentMethod}</span>
                    </td>

                    <td className="p-3 text-neutral-600">
                      {o.items.map((it, idx) => (
                        <div key={idx} className="text-[11px]">
                          • {it.quantity}x {it.product.name}
                        </div>
                      ))}
                    </td>

                    <td className="p-3 font-black text-amber-600 font-mono text-sm">
                      ${o.total.toLocaleString('es-AR')}
                    </td>

                    <td className="p-3 text-right">
                      <select
                        value={o.status}
                        onChange={(e: any) => updateOrderStatus(o.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                          o.status === 'Entregado' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                          o.status === 'Enviado' ? 'bg-sky-100 text-sky-800 border-sky-300' :
                          o.status === 'En Preparación' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                          'bg-neutral-100 text-neutral-800 border-neutral-300'
                        }`}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Preparación">En Preparación</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: NEWSLETTER SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="font-bold text-sm text-neutral-900">Listado de Emails Suscriptos</h3>
            <span className="text-xs text-neutral-500 font-mono">{subscribers.length} contactos registrados</span>
          </div>

          <div className="space-y-2">
            {subscribers.map((sub, i) => (
              <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  <span className="font-mono font-bold text-neutral-900">{sub.email}</span>
                </div>
                <div className="flex items-center space-x-4 text-neutral-500">
                  <span>Suscrito: {sub.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SITE SETTINGS (Redes Sociales, Cuotas, Garantía, Medios de Pago) */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl">
          <div className="border-b border-neutral-100 pb-3">
            <h3 className="font-bold text-sm text-neutral-900">Configuración General</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Redes sociales, cuotas, garantía y medios de pago activos en todo el sitio.
            </p>
          </div>

          <form onSubmit={handleGuardarSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Link de Instagram</label>
              <input
                type="url"
                value={formInstagram}
                onChange={(e) => setFormInstagram(e.target.value)}
                placeholder="https://instagram.com/giannizi.imports"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Link de Facebook</label>
              <input
                type="url"
                value={formFacebook}
                onChange={(e) => setFormFacebook(e.target.value)}
                placeholder="https://facebook.com/giannizi.imports"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <label className="block font-bold text-neutral-700 mb-1">Texto de Cuotas</label>
              <p className="text-[10px] text-neutral-400 mb-1">Se muestra en Checkout y en la página de Medios de Pago.</p>
              <input
                type="text"
                value={formCuotas}
                onChange={(e) => setFormCuotas(e.target.value)}
                placeholder="Ej: Hasta 3 y 6 cuotas fijas sin interés"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">Texto de Garantía</label>
              <p className="text-[10px] text-neutral-400 mb-1">Se muestra en el pie de página y en Medios de Pago.</p>
              <textarea
                rows={2}
                value={formGarantia}
                onChange={(e) => setFormGarantia(e.target.value)}
                placeholder="Ej: Garantía directa de fábrica de 30 días en todos nuestros productos"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-2">Medios de Pago Activos</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'transferencia', label: 'Transferencia Bancaria' },
                  { key: 'mercadopago', label: 'Mercado Pago' },
                  { key: 'tarjeta', label: 'Tarjeta de Crédito' },
                  { key: 'efectivo', label: 'Efectivo en Local' },
                ].map((medio) => (
                  <label
                    key={medio.key}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                      formMediosPago.includes(medio.key)
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formMediosPago.includes(medio.key)}
                      onChange={() => toggleMedioPago(medio.key)}
                      className="accent-amber-500"
                    />
                    {medio.label}
                  </label>
                ))}
              </div>
              <p className="text-[10px] text-neutral-400 mt-2">
                Desmarcá un medio de pago para que deje de aparecer como opción en el Checkout.
              </p>
            </div>

            <button
              type="submit"
              disabled={guardandoSettings}
              className="w-full py-3 bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 font-bold rounded-xl shadow-md transition-all disabled:opacity-60"
            >
              {guardandoSettings ? 'Guardando...' : 'Guardar Configuración'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: CUPONES */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs max-w-xl">
            <h3 className="font-bold text-sm text-neutral-900 mb-4">Crear Nuevo Cupón</h3>
            <form onSubmit={handleCrearCupon} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Código</label>
                  <input
                    type="text"
                    value={formCuponCodigo}
                    onChange={(e) => setFormCuponCodigo(e.target.value)}
                    placeholder="GIANNIZI10"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl uppercase font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">% de Descuento</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formCuponDescuento}
                    onChange={(e) => setFormCuponDescuento(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Descripción (opcional)</label>
                <input
                  type="text"
                  value={formCuponDescripcion}
                  onChange={(e) => setFormCuponDescripcion(e.target.value)}
                  placeholder="Ej: Cupón de bienvenida para suscriptores"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={creandoCupon}
                className="w-full py-2.5 bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 font-bold rounded-xl shadow-md transition-all disabled:opacity-60"
              >
                {creandoCupon ? 'Creando...' : 'Crear Cupón'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            <h3 className="font-bold text-sm text-neutral-900 mb-4">Cupones Existentes</h3>
            {cupones.length === 0 ? (
              <p className="text-xs text-neutral-500">Todavía no creaste ningún cupón.</p>
            ) : (
              <div className="space-y-2">
                {cupones.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                    <div>
                      <span className="font-mono font-bold text-neutral-900">{c.code}</span>
                      <span className="ml-2 text-amber-700 font-bold">{c.discount_percent}% OFF</span>
                      {c.description && <p className="text-neutral-500 mt-0.5">{c.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCuponActivo(c.id, !c.active)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                          c.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        {c.active ? 'Activo' : 'Inactivo'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar el cupón ${c.code}?`)) deleteCupon(c.id);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 bg-neutral-100 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs p-4 flex items-center justify-center animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-neutral-200 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-bold text-base text-neutral-900">
                {editingProduct ? 'Editar Producto del Inventario' : 'Cargar Nuevo Producto Importado'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Nombre del Producto *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Rubro / Categoría *</label>
                  <select
                    value={formCategory}
                    onChange={(e: any) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-bold"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Código SKU *</label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Precio Minorista ($) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Precio Mayorista ($)</label>
                  <input
                    type="number"
                    value={formWholesalePrice}
                    onChange={(e) => setFormWholesalePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Stock Actual (unidades) *</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Alerta Stock Mínimo</label>
                  <input
                    type="number"
                    value={formMinStock}
                    onChange={(e) => setFormMinStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Fotos del producto: subida múltiple desde archivos/galería + URL manual opcional */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  Fotos del Producto {formImages.length > 0 && `(${formImages.length})`}
                </label>

                {formImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formImages.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Foto ${index + 1}`}
                          className="w-16 h-16 rounded-xl object-cover border border-neutral-200"
                        />
                        {index === 0 && (
                          <span className="absolute -top-1.5 -left-1.5 bg-amber-500 text-neutral-950 text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow">
                            Portada
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => quitarFoto(index)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] hover:bg-rose-600"
                          title="Quitar foto"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  ref={inputFotoRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFotosSeleccionadas}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => inputFotoRef.current?.click()}
                  disabled={subiendoFoto}
                  className="w-full py-2.5 rounded-xl border border-neutral-300 font-bold text-neutral-700 hover:bg-neutral-100 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Upload className="w-4 h-4" />
                  {subiendoFoto ? 'Subiendo...' : 'Agregar fotos (galería o archivos, podés elegir varias)'}
                </button>

                <label className="block text-[10px] font-semibold text-neutral-400 mt-2 mb-1">
                  o agregá una URL de imagen (Unsplash, CDN, etc.)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlManual}
                    onChange={(e) => setUrlManual(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={agregarUrlManual}
                    className="px-3 py-2 rounded-xl border border-neutral-300 font-bold text-neutral-700 hover:bg-neutral-100"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Descripción Corta</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Distintivo (opcional)</label>
                <select
                  value={formBadge || ''}
                  onChange={(e) =>
                    setFormBadge(e.target.value ? (e.target.value as Product['badge']) : undefined)
                  }
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl font-bold"
                >
                  <option value="">Sin distintivo</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Más Vendido">Más Vendido (aparece como Destacado en el inicio)</option>
                  <option value="Oferta">Oferta</option>
                </select>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-300 font-bold hover:bg-neutral-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 font-bold rounded-xl shadow-md transition-all"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

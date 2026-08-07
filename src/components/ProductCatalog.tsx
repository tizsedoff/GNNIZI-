import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Heart, 
  Eye, 
  AlertTriangle, 
  Check, 
  SlidersHorizontal,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category, Product } from '../types';

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    addToCart, 
    setQuickViewProduct,
    wishlist,
    toggleWishlist
  } = useApp();

  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'lowStock'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'name'>('featured');
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(false);

  const categories: (Category | 'Todas')[] = ['Todas', 'Bazar', 'Papelería', 'Hogar', 'Regalería', 'Oficina', 'Novedades'];

  // Filter products
  let filtered = products.filter(p => {
    // Category match
    if (selectedCategory !== 'Todas' && p.category !== selectedCategory) {
      return false;
    }
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCode = p.code.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchDesc && !matchCat) {
        return false;
      }
    }
    // Stock filter
    if (stockFilter === 'inStock' && p.stock <= 0) return false;
    if (stockFilter === 'lowStock' && p.stock > (p.minStockAlert || 5)) return false;

    // Wishlist filter
    if (showOnlyWishlist && !wishlist.includes(p.id)) return false;

    return true;
  });

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    // Default featured
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Catalog Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Catálogo Oficial GIANNIZI Imports
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Tienda Multirubro de Importaciones
          </h1>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Explorá nuestro stock real en vivo. Todos los artículos se despachan directamente desde nuestro depósito central con factura oficial y garantía.
          </p>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-xs space-y-4">
        
        {/* Category Chips Bar */}
        <div>
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
            Seleccionar Rubro / Categoría
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-amber-400 shadow-md'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Secondary Filters Row */}
        <div className="pt-3 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar por nombre, código o SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-900"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter options */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
            
            {/* Wishlist toggle filter */}
            <button
              onClick={() => setShowOnlyWishlist(!showOnlyWishlist)}
              className={`px-3 py-2 rounded-xl border font-semibold flex items-center gap-1.5 transition-colors ${
                showOnlyWishlist 
                  ? 'bg-rose-50 border-rose-300 text-rose-700' 
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showOnlyWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>Mis Favoritos ({wishlist.length})</span>
            </button>

            {/* Stock filter dropdown */}
            <div className="flex items-center gap-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5">
              <span className="text-neutral-500 font-medium">Stock:</span>
              <select
                value={stockFilter}
                onChange={(e: any) => setStockFilter(e.target.value)}
                className="bg-transparent font-bold text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="all">Todos</option>
                <option value="inStock">Disponible</option>
                <option value="lowStock">Pocas Unidades (&lt;5)</option>
              </select>
            </div>

            {/* Sorting dropdown */}
            <div className="flex items-center gap-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5">
              <span className="text-neutral-500 font-medium">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="priceAsc">Menor Precio</option>
                <option value="priceDesc">Mayor Precio</option>
                <option value="name">Nombre (A-Z)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedCategory !== 'Todas' || searchQuery || stockFilter !== 'all' || showOnlyWishlist) && (
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
            <span className="font-bold text-neutral-400">Filtros activos:</span>
            {selectedCategory !== 'Todas' && (
              <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                Rubro: {selectedCategory}
                <button onClick={() => setSelectedCategory('Todas')} className="hover:text-black">✕</button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                Búsqueda: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-black">✕</button>
              </span>
            )}
            {showOnlyWishlist && (
              <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                Favoritos
                <button onClick={() => setShowOnlyWishlist(false)} className="hover:text-black">✕</button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
                setStockFilter('all');
                setShowOnlyWishlist(false);
              }}
              className="text-amber-700 hover:underline font-bold ml-auto"
            >
              Limpiar todo
            </button>
          </div>
        )}
      </div>

      {/* Product Grid Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-neutral-500">
            Mostrando {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-neutral-200 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">No encontramos productos</h3>
            <p className="text-xs text-neutral-500">
              Intenta cambiar los términos de búsqueda o seleccionar otra categoría para ver nuestro inventario disponible.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
                setStockFilter('all');
                setShowOnlyWishlist(false);
              }}
              className="bg-neutral-900 text-amber-400 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => {
              const isFav = wishlist.includes(product.id);
              const isLowStock = product.stock > 0 && product.stock <= (product.minStockAlert || 5);
              const isOut = product.stock <= 0;

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative h-56 bg-neutral-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badge Top Left */}
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-neutral-900 text-amber-400 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md z-10">
                          {product.badge}
                        </span>
                      )}

                      {/* Wishlist Heart Top Right */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all z-10"
                        title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-500'}`} />
                      </button>

                      {/* Quick View Button */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-neutral-900/90 text-white hover:bg-neutral-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ver Detalle</span>
                      </button>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-700 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-neutral-400 font-mono">
                          SKU: {product.code}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-neutral-900 leading-snug line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>

                      <p className="text-xs text-neutral-500 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Stock & Price Footer */}
                  <div className="p-4 pt-0 space-y-3">
                    
                    {/* Stock Status Indicator */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100">
                      <div className="flex items-center gap-1">
                        {isOut ? (
                          <span className="text-rose-600 font-bold flex items-center gap-1 text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Sin Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="text-amber-600 font-bold flex items-center gap-1 text-[11px]">
                            <AlertTriangle className="w-3 h-3 text-amber-500" /> Últimas {product.stock} un.
                          </span>
                        ) : (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Stock: {product.stock} un.
                          </span>
                        )}
                      </div>

                      {product.wholesalePrice && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-200">
                          Mayorista: ${product.wholesalePrice.toLocaleString('es-AR')}
                        </span>
                      )}
                    </div>

                    {/* Price and Cart Button */}
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Precio Minorista</span>
                        <span className="text-xl font-black text-neutral-900 font-mono">
                          ${product.price.toLocaleString('es-AR')}
                        </span>
                      </div>

                      <button
                        disabled={isOut}
                        onClick={() => addToCart(product, 1)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                          isOut 
                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                            : 'bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 active:scale-95'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{isOut ? 'Agotado' : 'Comprar'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

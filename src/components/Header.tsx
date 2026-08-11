import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Heart, 
  Sparkles,
  PhoneCall,
  ShieldCheck,
  CreditCard,
  Truck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category, ActiveView } from '../types';
import logoGiannizi from '../../assets/logo.jpg';

export const Header: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    cartCount, 
    setIsCartOpen,
    wishlist
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: (Category | 'Todas')[] = ['Todas', 'Bazar', 'Papelería', 'Hogar', 'Regalería', 'Oficina', 'Novedades'];

  const handleNav = (view: ActiveView, category?: Category | 'Todas') => {
    setActiveView(view);
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs">
      {/* Top Banner Announcement */}
      <div className="bg-neutral-900 text-neutral-100 px-4 py-2 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4 overflow-x-auto py-0.5 whitespace-nowrap scrollbar-none">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Truck className="w-3.5 h-3.5" /> Envíos a todo el país
            </span>
            <span className="text-neutral-500">|</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CreditCard className="w-3.5 h-3.5" /> 10% OFF pagando con Transferencia
            </span>
            <span className="text-neutral-500 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-neutral-300 hidden sm:flex">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Ventas Minoristas y Mayoristas
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-300">
            <a 
              href="https://wa.me/549113755266056?text=Hola%20GIANNIZI%20Imports,%20quisiera%20hacer%20una%20consulta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>Atención Directa: +54 9 11 3755 266056</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('landing')}
            className="cursor-pointer flex items-center gap-2 group min-w-0"
          >
            <img
              src={logoGiannizi}
              alt="GIANNIZI Imports"
              className="w-11 h-11 object-contain group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="min-w-0">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 block leading-none font-display truncate">
                GIANNIZI <span className="text-amber-600 font-light text-lg sm:text-xl">IMPORTS</span>
              </span>
              <span className="text-[10px] text-neutral-500 tracking-widest uppercase font-semibold mt-0.5 truncate hidden sm:block">
                Bazar, Papelería & Importaciones
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar por producto, código o categoría (ej. botella, cuaderno)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'shop') {
                    setActiveView('shop');
                  }
                }}
                className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-neutral-900 placeholder-neutral-400"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs bg-neutral-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Wishlist Button */}
            <button
              onClick={() => handleNav('shop')}
              className="relative p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors hidden sm:flex items-center gap-1.5 text-xs font-medium"
              title="Lista de Favoritos"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-neutral-600'}`} />
              <span className="hidden lg:inline">Favoritos</span>
              {wishlist.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-sm active:scale-95"
              aria-label="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-sm hidden sm:inline">Carrito</span>
              <span className="bg-amber-400 text-neutral-950 font-bold text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar productos en GIANNIZI..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'shop') {
                  setActiveView('shop');
                }
              }}
              className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-900"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-neutral-50 border-t border-neutral-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm font-medium text-neutral-700">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleNav('landing')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeView === 'landing' 
                    ? 'bg-neutral-900 text-white font-semibold' 
                    : 'hover:bg-neutral-200/70 text-neutral-800'
                }`}
              >
                Inicio
              </button>

              <button
                onClick={() => handleNav('shop', 'Todas')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeView === 'shop' && selectedCategory === 'Todas'
                    ? 'bg-amber-500 text-neutral-950 font-semibold' 
                    : 'hover:bg-neutral-200/70 text-neutral-800'
                }`}
              >
                Tienda Multirubro
              </button>

              {/* Category Quick Chips */}
              {categories.filter(c => c !== 'Todas').map(category => (
                <button
                  key={category}
                  onClick={() => handleNav('shop', category)}
                  className={`px-3 py-1.5 rounded-md transition-colors text-xs uppercase tracking-wide font-medium ${
                    activeView === 'shop' && selectedCategory === category
                      ? 'bg-neutral-900 text-amber-400 font-bold'
                      : 'hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Informative Pages Nav */}
            <div className="flex items-center space-x-1 border-l border-neutral-200 pl-4">
              <button
                onClick={() => handleNav('about')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  activeView === 'about' ? 'text-amber-600 bg-amber-50' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Quiénes Somos
              </button>

              <button
                onClick={() => handleNav('blog')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  activeView === 'blog' || activeView === 'blog-post' ? 'text-amber-600 bg-amber-50' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Blog & Novedades
              </button>

              <button
                onClick={() => handleNav('payment-methods')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  activeView === 'payment-methods' ? 'text-amber-600 bg-amber-50' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Medios de Pago
              </button>

              <button
                onClick={() => handleNav('policies')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  activeView === 'policies' ? 'text-amber-600 bg-amber-50' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Políticas de Devolución
              </button>

              <button
                onClick={() => handleNav('contact')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  activeView === 'contact' ? 'text-amber-600 bg-amber-50' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block px-2 py-1">
              Navegación Principal
            </span>
            <button
              onClick={() => handleNav('landing')}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-neutral-100"
            >
              🏠 Inicio / Landing Page
            </button>
            <button
              onClick={() => handleNav('shop', 'Todas')}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-neutral-800 hover:bg-neutral-100 flex items-center justify-between"
            >
              <span>🛍️ Catálogo Multirubro Completo</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Ver Todo</span>
            </button>
          </div>

          <div className="space-y-1 pt-2 border-t border-neutral-100">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block px-2 py-1">
              Rubros & Categorías
            </span>
            <div className="grid grid-cols-2 gap-1">
              {categories.filter(c => c !== 'Todas').map(cat => (
                <button
                  key={cat}
                  onClick={() => handleNav('shop', cat)}
                  className="text-left px-3 py-1.5 text-xs font-medium rounded-md hover:bg-amber-50 text-neutral-700"
                >
                  • {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-neutral-100">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block px-2 py-1">
              Información Corporativa
            </span>
            <button
              onClick={() => handleNav('about')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              🏢 Quiénes Somos
            </button>
            <button
              onClick={() => handleNav('blog')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              📰 Blog & Novedades
            </button>
            <button
              onClick={() => handleNav('payment-methods')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              💳 Medios de Pago & Cuotas
            </button>
            <button
              onClick={() => handleNav('policies')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              🛡️ Políticas de Devolución & Garantía
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              📞 Contacto & Ubicación
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
import React from 'react';
import { 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Building2, 
  BookOpen, 
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';

export const HeroLanding: React.FC = () => {
  const { products, blogPosts, setActiveView, setSelectedCategory, addToCart, setQuickViewProduct } = useApp();

  const featuredProducts = products.filter(p => p.featured || p.badge === 'Más Vendido').slice(0, 4);

  const categoriesList: { name: Category; title: string; desc: string; icon: string; bg: string; count: number }[] = [
    { 
      name: 'Bazar', 
      title: 'Bazar & Cocina', 
      desc: 'Botellas térmicas, tazas cerámicas, frascos herméticos y útiles de bazar.', 
      icon: '☕', 
      bg: 'from-amber-500/10 to-amber-600/5 border-amber-200',
      count: products.filter(p => p.category === 'Bazar').length 
    },
    { 
      name: 'Papelería', 
      title: 'Papelería & Bullet Journal', 
      desc: 'Cuadernos A5 de 100g, resaltadores pastel, lapiceras borrabiles y notas.', 
      icon: '📓', 
      bg: 'from-blue-500/10 to-blue-600/5 border-blue-200',
      count: products.filter(p => p.category === 'Papelería').length 
    },
    { 
      name: 'Hogar', 
      title: 'Hogar & Iluminación', 
      desc: 'Lámparas táctiles LED, organizadores, accesorios decorativos y confort.', 
      icon: '💡', 
      bg: 'from-emerald-500/10 to-emerald-600/5 border-emerald-200',
      count: products.filter(p => p.category === 'Hogar').length 
    },
    { 
      name: 'Regalería', 
      title: 'Regalería & Bienestar', 
      desc: 'Difusores de aromas ultrasónicos, velas y sets para regalar.', 
      icon: '🎁', 
      bg: 'from-rose-500/10 to-rose-600/5 border-rose-200',
      count: products.filter(p => p.category === 'Regalería').length 
    },
    { 
      name: 'Oficina', 
      title: 'Oficina & Escritorio', 
      desc: 'Organizadores acrílicos, insumos de escritorio y soporte ergonómico.', 
      icon: '💼', 
      bg: 'from-purple-500/10 to-purple-600/5 border-purple-200',
      count: products.filter(p => p.category === 'Oficina').length 
    },
    { 
      name: 'Novedades', 
      title: 'Novedades & Tecnología', 
      desc: 'Mini impresoras térmicas Bluetooth, gadgets y artículos virales.', 
      icon: '⚡', 
      bg: 'from-orange-500/10 to-orange-600/5 border-orange-200',
      count: products.filter(p => p.category === 'Novedades').length 
    }
  ];

  const handleGoCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Main Hero Banner */}
      <section className="relative overflow-hidden bg-neutral-950 text-white pt-12 pb-20 rounded-b-3xl sm:rounded-b-[2.5rem] shadow-xl">
        {/* Background glow effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Importadores Directos • Ventas Minoristas & Mayoristas</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-display">
                Calidad y Variedad Multirubro en <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Bazar & Papelería</span>
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Llevamos las últimas tendencias internacionales a tu comercio o tu hogar. Botellas térmicas, insumos de papelería bullet journal, organizadores y novedades con envío a todo el país.
              </p>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('Todas');
                    setActiveView('shop');
                  }}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Explorar Tienda Online</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => setActiveView('payment-methods')}
                  className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
                >
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span>10% OFF en Transferencia</span>
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">+1.200</span>
                  <span className="text-xs text-neutral-400">Productos en Stock</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-amber-400 block">100%</span>
                  <span className="text-xs text-neutral-400">Garantía de Fábrica</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">24-48hs</span>
                  <span className="text-xs text-neutral-400">Despacho Express</span>
                </div>
              </div>
            </div>

            {/* Hero Image / Collage Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
                <img 
                  src={featuredProducts[0]?.image || 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80'} 
                  alt={featuredProducts[0]?.name || 'GIANNIZI Imports Bazar & Papeleria'} 
                  className="w-full h-[380px] sm:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
                
                {/* Floating Tag: solo se muestra si hay un producto destacado real cargado en Supabase */}
                {featuredProducts[0] && (
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                        Destacado del Mes
                      </span>
                      <h4 className="text-white font-bold text-sm">{featuredProducts[0].name}</h4>
                      <p className="text-xs text-neutral-300">
                        ${featuredProducts[0].price.toLocaleString('es-AR')}
                        {featuredProducts[0].wholesalePrice && (
                          <span className="text-[10px] text-neutral-400"> (Mayorista ${featuredProducts[0].wholesalePrice.toLocaleString('es-AR')})</span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(featuredProducts[0], 1)}
                      className="bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold px-3 py-2 rounded-lg transition-colors shrink-0"
                    >
                      + Agregar
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Multirubro Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              Catálogo Multirubro
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display">
              Explorá Nuestros Rubros Principales
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Todas');
              setActiveView('shop');
            }}
            className="text-amber-700 hover:text-amber-800 text-sm font-bold flex items-center gap-1 group"
          >
            <span>Ver todo el catálogo</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map(cat => (
            <div
              key={cat.name}
              onClick={() => handleGoCategory(cat.name)}
              className={`group cursor-pointer rounded-2xl p-6 bg-gradient-to-br ${cat.bg} border hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl p-3 bg-white rounded-2xl shadow-xs group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 bg-white/80 rounded-full text-neutral-700 shadow-xs">
                  {cat.count} {cat.count === 1 ? 'Producto' : 'Productos'}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-amber-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs font-semibold text-neutral-900 group-hover:text-amber-600">
                <span>Ingresar a este rubro</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Top Selling Products */}
      <section className="bg-neutral-50 py-12 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> Los Más Vendidos de la Semana
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display">
                Productos Destacados en Stock
              </h2>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setActiveView('shop');
              }}
              className="hidden sm:flex text-neutral-800 hover:text-amber-600 text-sm font-bold items-center gap-1"
            >
              <span>Ver todos ({products.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-52 bg-neutral-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-neutral-900 text-amber-400 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-neutral-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Vista Rápida
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                      {product.category} • SKU: {product.code}
                    </span>
                    <h3 className="font-bold text-sm text-neutral-900 line-clamp-2 mt-0.5 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-400 block font-normal">Precio Unitario</span>
                      <span className="text-lg font-black text-neutral-900">
                        ${product.price.toLocaleString('es-AR')}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Comprar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden border border-amber-500/20 shadow-2xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              Atención a Revendedores y Comercios
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-display leading-tight">
              ¿Tenés un bazar, papelería o librería? Comprá a Precios Mayoristas
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              En GIANNIZI Imports te ofrecemos listas de precios escalonadas, catálogo digital actualizado, atención prioritaria por WhatsApp y envíos a tu transporte de confianza.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-300">
              <span className="flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Mínimo accesible de compra
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Facturas A y B
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Despacho en 24hs
              </span>
            </div>
            <div className="pt-4">
              <a
                href="https://wa.me/5493755266056?text=Hola%20GIANNIZI%20Imports,%20quisiera%20solicitar%20el%20catálogo%20y%20condiciones%20mayoristas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg"
              >
                <span>Solicitar Asesoramiento Mayorista</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              Blog & Novedades
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display">
              Artículos y Tendencias del Sector
            </h2>
          </div>

          <button
            onClick={() => setActiveView('blog')}
            className="text-amber-700 hover:text-amber-800 text-sm font-bold flex items-center gap-1"
          >
            <span>Ver todos los artículos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <article 
              key={post.id}
              onClick={() => setActiveView('blog')}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="h-48 overflow-hidden bg-neutral-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1">
                    <span className="font-bold text-amber-600">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-3 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-amber-600">
                  <span>Leer completo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

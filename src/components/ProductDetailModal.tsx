import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, ShieldCheck, Truck, AlertTriangle, Check, Heart, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = quickViewProduct;

  const images = product
    ? (product.images && product.images.length > 0 ? product.images : [product.image])
    : [];

  useEffect(() => {
    setSelectedImageIndex(0);
    setQty(1);
  }, [product?.id]);

  if (!product) return null;

  const isFav = wishlist.includes(product.id);
  const isOut = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image + Gallery */}
        <div className="md:w-1/2 relative bg-neutral-100 min-h-[280px] flex flex-col">
          <div className="relative flex-1 min-h-[280px]">
            <img 
              src={images[selectedImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover absolute inset-0"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-neutral-900 text-amber-400 font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails: solo si hay más de una foto cargada */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 p-3 bg-white/80 overflow-x-auto">
              {images.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                    index === selectedImageIndex ? 'border-amber-500' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`${product.name} foto ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details & Specs */}
        <div className="md:w-1/2 p-6 flex-1 flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-amber-700 uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-neutral-400 font-mono">SKU: {product.code}</span>
            </div>

            <h2 className="text-xl font-bold text-neutral-900 leading-snug">
              {product.name}
            </h2>

            <div className="mt-3 text-2xl font-black text-neutral-900 font-mono">
              ${product.price.toLocaleString('es-AR')}
              {product.wholesalePrice && (
                <span className="block text-xs font-semibold text-amber-700 mt-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 inline-block">
                  🔥 Precio Mayorista: ${product.wholesalePrice.toLocaleString('es-AR')}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-4 pt-3 border-t border-neutral-100">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Especificaciones Técnicas:
                </span>
                <ul className="space-y-1 text-xs text-neutral-700">
                  {product.specifications.map((spec, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-neutral-100 space-y-3">
            
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-500">Cantidad:</span>
              <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-50">
                <button
                  disabled={qty <= 1}
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-1.5 font-bold hover:bg-neutral-200 disabled:opacity-30"
                >
                  -
                </button>
                <span className="px-3 font-bold text-neutral-900">{qty}</span>
                <button
                  disabled={qty >= product.stock}
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-3 py-1.5 font-bold hover:bg-neutral-200 disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                disabled={isOut}
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                  isOut
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOut ? 'Agotado' : `Agregar ${qty} al Carrito • $${(product.price * qty).toLocaleString('es-AR')}`}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3 border border-neutral-300 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-600'}`} />
              </button>
            </div>

            <div className="text-[10px] text-neutral-400 flex items-center justify-around pt-1">
              <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-emerald-500" /> Envío rápido</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-sky-500" /> Garantía Oficial</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

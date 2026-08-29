import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    appliedCoupon, 
    applyCoupon, 
    appliedDiscountPercent,
    setIsCheckoutOpen
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const discountAmount = Math.round((cartTotal * appliedDiscountPercent) / 100);
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;
    const res = await applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-lg">Tu Carrito de Compras</h2>
              <span className="bg-amber-400 text-neutral-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {cart.length} {cart.length === 1 ? 'ítem' : 'ítems'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-neutral-800">Tu carrito está vacío</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explorá nuestros productos de Bazar, Papelería y Novedades para agregar ítems a tu orden.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-neutral-900 text-amber-400 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  Ir al Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-neutral-100">
                  <span>Productos seleccionados</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Vaciar
                  </button>
                </div>

                {cart.map(item => (
                  <div 
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 items-center justify-between"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-neutral-900 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] text-amber-700 font-mono font-semibold block">
                        SKU: {item.product.code}
                      </span>
                      <div className="text-xs font-black text-neutral-900 mt-1">
                        ${item.product.price.toLocaleString('es-AR')}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Callout */}
          {cart.length > 0 && (
            <div className="p-5 bg-neutral-50 border-t border-neutral-200 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Cupón (ej. GIANNIZI10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                    <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shrink-0"
                  >
                    Aplicar
                  </button>
                </div>

                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Cupón "{appliedCoupon}" activo ({appliedDiscountPercent}% OFF)
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 pt-1">
                    <AlertCircle className="w-3 h-3" /> {couponError}
                  </p>
                )}
              </form>

              {/* Summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold font-mono">${cartTotal.toLocaleString('es-AR')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Descuento Cupón ({appliedDiscountPercent}%):</span>
                    <span className="font-mono">-${discountAmount.toLocaleString('es-AR')}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-900 font-bold text-base pt-2 border-t border-neutral-200">
                  <span>Total Estimado:</span>
                  <span className="font-mono text-xl text-amber-600">${finalTotal.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all text-sm"
              >
                <span>Finalizar Compra / Ver Opciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-neutral-400">
                🔒 Transferencia Bancaria, Mercado Pago o Tarjeta en Cuotas sin interés.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

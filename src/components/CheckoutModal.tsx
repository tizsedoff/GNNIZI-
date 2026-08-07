import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MessageCircle, 
  Truck, 
  CreditCard, 
  Building2, 
  QrCode, 
  ArrowRight, 
  Download,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    appliedDiscountPercent, 
    isCheckoutOpen, 
    setIsCheckoutOpen,
    createOrder,
    showToast
  } = useApp();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [copiedCbu, setCopiedCbu] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerDni, setCustomerDni] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'Retiro en Local' | 'Envío a Domicilio' | 'Expreso Mayorista'>('Envío a Domicilio');
  const [paymentMethod, setPaymentMethod] = useState<'Transferencia Bancaria (10% OFF)' | 'Mercado Pago' | 'Tarjeta en Cuotas' | 'Efectivo contra entrega'>('Transferencia Bancaria (10% OFF)');

  if (!isCheckoutOpen) return null;

  // Calculate costs
  const discountFromCoupon = Math.round((cartTotal * appliedDiscountPercent) / 100);
  const transferDiscount = paymentMethod === 'Transferencia Bancaria (10% OFF)' ? Math.round((cartTotal - discountFromCoupon) * 0.1) : 0;
  
  const totalDiscount = discountFromCoupon + transferDiscount;
  
  const shippingCost = shippingMethod === 'Retiro en Local' ? 0 : shippingMethod === 'Envío a Domicilio' ? 3500 : 2500;
  
  const finalTotal = Math.max(0, cartTotal - totalDiscount + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerEmail || !customerPhone || !customerDni) {
      showToast('Por favor, completá los datos del cliente.');
      return;
    }

    if (shippingMethod !== 'Retiro en Local' && !shippingAddress) {
      showToast('Por favor, ingresá la dirección de envío.');
      return;
    }

    const newOrder = createOrder({
      customerName,
      customerEmail,
      customerPhone,
      customerDni,
      shippingAddress: shippingMethod === 'Retiro en Local' ? 'Retiro por Depósito Central (Av. Jujuy 1420, CABA)' : shippingAddress,
      shippingMethod,
      paymentMethod,
      items: cart,
      subtotal: cartTotal,
      discount: totalDiscount,
      shippingCost,
      total: finalTotal
    });

    setCreatedOrder(newOrder);
    setStep('success');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCbu(true);
    setTimeout(() => setCopiedCbu(false), 2000);
  };

  const getWhatsAppMessageUrl = (order: Order) => {
    const text = `Hola GIANNIZI Imports! 👋 Acabo de realizar el pedido *#${order.id}* desde la web.

*Datos del cliente:*
- Nombre: ${order.customerName}
- Teléfono: ${order.customerPhone}
- Forma de Pago: ${order.paymentMethod}
- Entrega: ${order.shippingMethod} (${order.shippingAddress})

*Monto Total:* $${order.total.toLocaleString('es-AR')}

Aguardo confirmación de pago y datos para el envío. Muchas gracias!`;

    return `https://wa.me/5491123456789?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs p-4 flex items-center justify-center animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-6 bg-neutral-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              GIANNIZI Imports • Checkout Seguro
            </span>
            <h2 className="text-xl font-bold font-display">
              {step === 'form' ? 'Proceso de Compra & Pago' : '¡Pedido Confirmado!'}
            </h2>
          </div>

          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setStep('form');
            }}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* 1. Datos Personales */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-amber-400 text-xs font-black flex items-center justify-center">1</span>
                Datos del Comprador
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@email.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+54 9 11 1234-5678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 font-semibold mb-1">DNI / CUIT (Para Facturación) *</label>
                  <input
                    type="text"
                    required
                    placeholder="30-12345678-9"
                    value={customerDni}
                    onChange={(e) => setCustomerDni(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Método de Envío */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-amber-400 text-xs font-black flex items-center justify-center">2</span>
                Forma de Entrega
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                  shippingMethod === 'Envío a Domicilio' ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400' : 'border-neutral-200 bg-neutral-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'Envío a Domicilio'}
                      onChange={() => setShippingMethod('Envío a Domicilio')}
                      className="accent-amber-500"
                    />
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-neutral-900">A Domicilio</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">$3.500 (Oca / Correo)</span>
                </label>

                <label className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                  shippingMethod === 'Retiro en Local' ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400' : 'border-neutral-200 bg-neutral-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'Retiro en Local'}
                      onChange={() => setShippingMethod('Retiro en Local')}
                      className="accent-amber-500"
                    />
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-neutral-900">Retiro en Depósito</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold">¡GRATIS! (CABA)</span>
                </label>

                <label className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                  shippingMethod === 'Expreso Mayorista' ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-400' : 'border-neutral-200 bg-neutral-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'Expreso Mayorista'}
                      onChange={() => setShippingMethod('Expreso Mayorista')}
                      className="accent-amber-500"
                    />
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-neutral-900">Expreso / Comprador</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">$2.500 (Despacho a transporte)</span>
                </label>
              </div>

              {shippingMethod !== 'Retiro en Local' && (
                <div>
                  <label className="block text-xs text-neutral-600 font-semibold mb-1">
                    Dirección de Entrega Completa (Calle, Número, Piso, Código Postal, Ciudad) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Av. Santa Fe 1820 4° B, C1059, CABA"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* 3. Medio de Pago */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-amber-400 text-xs font-black flex items-center justify-center">3</span>
                Medio de Pago Seleccionado
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Transferencia */}
                <label className={`p-3.5 rounded-2xl border cursor-pointer flex items-start space-x-3 transition-all ${
                  paymentMethod === 'Transferencia Bancaria (10% OFF)' ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400' : 'border-neutral-200 bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Transferencia Bancaria (10% OFF)'}
                    onChange={() => setPaymentMethod('Transferencia Bancaria (10% OFF)')}
                    className="accent-amber-500 mt-1"
                  />
                  <div>
                    <span className="font-bold text-neutral-900 block">Transferencia Bancaria</span>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded inline-block mt-0.5">
                      🔥 10% OFF Automático
                    </span>
                  </div>
                </label>

                {/* Mercado Pago */}
                <label className={`p-3.5 rounded-2xl border cursor-pointer flex items-start space-x-3 transition-all ${
                  paymentMethod === 'Mercado Pago' ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400' : 'border-neutral-200 bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Mercado Pago'}
                    onChange={() => setPaymentMethod('Mercado Pago')}
                    className="accent-amber-500 mt-1"
                  />
                  <div>
                    <span className="font-bold text-neutral-900 block">Mercado Pago / Dinero en Cuenta</span>
                    <span className="text-[11px] text-neutral-500">QR / Débito / Saldo instantáneo</span>
                  </div>
                </label>

                {/* Tarjetas */}
                <label className={`p-3.5 rounded-2xl border cursor-pointer flex items-start space-x-3 transition-all ${
                  paymentMethod === 'Tarjeta en Cuotas' ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400' : 'border-neutral-200 bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Tarjeta en Cuotas'}
                    onChange={() => setPaymentMethod('Tarjeta en Cuotas')}
                    className="accent-amber-500 mt-1"
                  />
                  <div>
                    <span className="font-bold text-neutral-900 block">Tarjeta de Crédito</span>
                    <span className="text-[11px] text-neutral-500">Hasta 3 y 6 cuotas fijas</span>
                  </div>
                </label>

                {/* Efectivo */}
                <label className={`p-3.5 rounded-2xl border cursor-pointer flex items-start space-x-3 transition-all ${
                  paymentMethod === 'Efectivo contra entrega' ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400' : 'border-neutral-200 bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Efectivo contra entrega'}
                    onChange={() => setPaymentMethod('Efectivo contra entrega')}
                    className="accent-amber-500 mt-1"
                  />
                  <div>
                    <span className="font-bold text-neutral-900 block">Efectivo en Local</span>
                    <span className="text-[11px] text-neutral-500">Pago en mano al retirar</span>
                  </div>
                </label>

              </div>

              {/* Transfer Details Card */}
              {paymentMethod === 'Transferencia Bancaria (10% OFF)' && (
                <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-2 text-xs">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>Datos bancarios para transferencia:</span>
                    <span>Ahorro: -${transferDiscount.toLocaleString('es-AR')}</span>
                  </div>
                  <div className="font-mono space-y-1 text-neutral-300">
                    <p>Banco: <strong className="text-white">Banco Galicia</strong></p>
                    <p>Titular: <strong className="text-white">GIANNIZI IMPORTS S.A.</strong></p>
                    <p className="flex items-center justify-between">
                      <span>CBU: <strong className="text-white">0070123420000012345678</strong></span>
                      <button 
                        type="button" 
                        onClick={() => copyToClipboard('0070123420000012345678')}
                        className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        {copiedCbu ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedCbu ? '¡Copiado!' : 'Copiar CBU'}
                      </button>
                    </p>
                    <p>Alias: <strong className="text-amber-400">GIANNIZI.IMPORTS.GALICIA</strong></p>
                  </div>
                </div>
              )}
            </div>

            {/* Total Breakdown Summary */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal de Productos:</span>
                <span className="font-mono font-semibold">${cartTotal.toLocaleString('es-AR')}</span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Descuentos Aplicados:</span>
                  <span className="font-mono">-${totalDiscount.toLocaleString('es-AR')}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Costo de Envío ({shippingMethod}):</span>
                <span className="font-mono font-semibold">${shippingCost.toLocaleString('es-AR')}</span>
              </div>

              <div className="flex justify-between text-neutral-900 font-black text-base pt-2 border-t border-neutral-200">
                <span>Total a Pagar:</span>
                <span className="font-mono text-xl text-amber-600">${finalTotal.toLocaleString('es-AR')}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all text-sm"
            >
              <span>Confirmar Orden de Compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        ) : createdOrder && (
          /* Success Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                ¡Gracias por tu compra en GIANNIZI Imports!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 font-display mt-1">
                Orden #{createdOrder.id} Registrada
              </h2>
              <p className="text-xs text-neutral-500 max-w-md mx-auto mt-2">
                Guardamos los datos de tu pedido y reservamos tu stock. Podés coordinar la entrega o enviar tu comprobante directamente por WhatsApp.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-5 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-neutral-200 pb-2 font-sans font-bold text-neutral-800">
                <span>Resumen de Pedido</span>
                <span>{createdOrder.date}</span>
              </div>
              <p>Comprador: <strong>{createdOrder.customerName}</strong></p>
              <p>Email: <strong>{createdOrder.customerEmail}</strong></p>
              <p>Teléfono: <strong>{createdOrder.customerPhone}</strong></p>
              <p>Pago: <strong>{createdOrder.paymentMethod}</strong></p>
              <p>Entrega: <strong>{createdOrder.shippingMethod}</strong></p>
              <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-neutral-900 text-sm">
                <span>Monto Final:</span>
                <span className="text-amber-600">${createdOrder.total.toLocaleString('es-AR')}</span>
              </div>
            </div>

            {/* WhatsApp CTA Action Button */}
            <div className="space-y-3">
              <a
                href={getWhatsAppMessageUrl(createdOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Comprobante por WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep('form');
                }}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3 rounded-xl text-xs transition-colors"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

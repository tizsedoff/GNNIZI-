import React, { useState } from 'react';
import { CreditCard, DollarSign, Building2, QrCode, ShieldCheck, Tag, ArrowRight, Calculator } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentMethodsPage: React.FC = () => {
  const { setActiveView } = useApp();
  const [calcAmount, setCalcAmount] = useState(25000);

  const transferSavings = Math.round(calcAmount * 0.05);
  const finalTransferPrice = calcAmount - transferSavings;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Transacciones Transparentes & Seguras
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Medios de Pago & Promociones
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            En GIANNIZI Imports te facilitamos múltiples alternativas de pago para que compres tanto al por menor como al por mayor con total tranquilidad.
          </p>
        </div>
      </div>

      {/* Interactive Savings Calculator */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
          <Calculator className="w-5 h-5 text-amber-600" />
          <span>Calculadora Interactiva de Descuento por Transferencia Bancaria</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Simular Monto de Compra ($ ARS):</label>
            <input
              type="number"
              value={calcAmount}
              onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl font-mono text-base font-bold text-neutral-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-300 border border-emerald-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              5% OFF Con Transferencia
            </span>
            <div className="text-2xl font-black font-mono">${finalTransferPrice.toLocaleString('es-AR')}</div>
            <p className="text-xs text-emerald-400 font-medium">Ahorrás en el acto: ${transferSavings.toLocaleString('es-AR')}</p>
          </div>

          <div>
            <button
              onClick={() => setActiveView('shop')}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <span>Ir a Comprar con Descuento</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Payment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Transferencia */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase border border-emerald-200">
              Recomendado • 5% OFF
            </span>
            <h3 className="text-lg font-bold text-neutral-900 mt-2">Transferencia Bancaria</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Recibís acreditación directa y un 5% de descuento automático en el total de tus productos. Ideal para compras mayoristas.
            </p>
          </div>
          <ul className="text-xs text-neutral-600 space-y-1.5 pt-2 border-t border-neutral-100 font-mono">
            <li>• Banco Galicia / CBU directo</li>
            <li>• Confirmación inmediata vía WhatsApp</li>
            <li>• Factura A y B disponible</li>
          </ul>
        </div>

        {/* Card 2: Mercado Pago */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded uppercase border border-sky-200">
              Acreditación Instantánea
            </span>
            <h3 className="text-lg font-bold text-neutral-900 mt-2">Mercado Pago / QR</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Pagá con saldo en cuenta de Mercado Pago, dinero disponible o escaneando nuestro código QR de caja desde la app.
            </p>
          </div>
          <ul className="text-xs text-neutral-600 space-y-1.5 pt-2 border-t border-neutral-100 font-mono">
            <li>• Escaneo QR sin comisiones extra</li>
            <li>• Débito inmediato</li>
            <li>• 100% protegido por Mercado Pago</li>
          </ul>
        </div>

        {/* Card 3: Tarjetas */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded uppercase border border-purple-200">
              Hasta 6 Cuotas
            </span>
            <h3 className="text-lg font-bold text-neutral-900 mt-2">Tarjetas de Crédito & Débito</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Aceptamos Visa, Mastercard, American Express y Naranja X. Financiación flexible para renovar tus artículos de bazar y estudio.
            </p>
          </div>
          <ul className="text-xs text-neutral-600 space-y-1.5 pt-2 border-t border-neutral-100 font-mono">
            <li>• 3 cuotas fijas de renovación</li>
            <li>• Débito Visa y Maestro</li>
            <li>• Procesamiento seguro SSL</li>
          </ul>
        </div>

        {/* Card 4: Efectivo */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded uppercase border border-neutral-200">
              En Depósito
            </span>
            <h3 className="text-lg font-bold text-neutral-900 mt-2">Efectivo en Local</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Aboná directamente al momento de retirar tu pedido en nuestro depósito central en AV Rivadavia 650 El Soberbio, Misiones sin costos de envío adicionales.
            </p>
          </div>
          <ul className="text-xs text-neutral-600 space-y-1.5 pt-2 border-t border-neutral-100 font-mono">
            <li>• Retiro presencial de 9 a 18hs</li>
            <li>• Verificación de mercadería en mano</li>
            <li>• Ticket y factura inmediata</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

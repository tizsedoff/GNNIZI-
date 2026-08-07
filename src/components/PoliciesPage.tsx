import React, { useState } from 'react';
import { RefreshCw, ShieldCheck, Truck, HelpCircle, ChevronDown, CheckCircle2, FileText } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cuál es el plazo para realizar un cambio o devolución?',
      a: 'Disponés de 30 días corridos a partir del día que recibís tu compra para gestionar cualquier cambio o devolución sin costo por fallas de fábrica.'
    },
    {
      q: '¿Qué requisitos debe cumplir el producto a devolver?',
      a: 'El producto debe encontrarse sin uso, conservando sus embalajes originales, etiquetas, accesorios e instructivos de fábrica intactos.'
    },
    {
      q: '¿Cómo funciona la garantía de los productos importados?',
      a: 'Todos los productos de nuestro catálogo cuentan con garantía directa de GIANNIZI Imports por 6 meses por defectos de fabricación o fallas en componentes electrónicos/térmicos.'
    },
    {
      q: '¿Cómo se realizan las devoluciones en compras con envío?',
      a: 'Coordinamos una etiqueta de envío prioritario a nuestro depósito. Una vez verificado el artículo en recepción, emitimos la nota de crédito o el reembolso del dinero por el mismo medio de pago.'
    },
    {
      q: '¿Emiten Factura A para compras corporativas o mayoristas?',
      a: 'Sí, emitimos Facturas A y B de manera automatizada. Únicamente debés ingresar tu CUIT durante el proceso de compra.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Garantía & Respaldo Oficial
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Políticas de Devolución & Garantía
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Queremos que compres con total tranquilidad. Todos nuestros productos de bazar, papelería e iluminación importada cuentan con respaldo directo de fábrica.
          </p>
        </div>
      </div>

      {/* 3 Core Guarantees Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-neutral-900">30 Días de Cambio</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Si recibís un producto que no cumple con tus expectativas o querés cambiar de color, podés gestionarlo en 30 días.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-neutral-900">Garantía Directa 6 Meses</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Cobertura integral frente a fallas técnicas en productos de iluminación LED, difusores térmicos y mini impresoras.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-neutral-900">Envíos Asegurados</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Todos nuestros despachos por correo o transporte express viajan con seguro de carga 100% cubierto.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 text-neutral-900 font-bold text-lg">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h2>Preguntas Frecuentes sobre Cambios & Envíos</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-sm text-neutral-900 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="p-4 bg-white text-xs text-neutral-600 border-t border-neutral-100 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

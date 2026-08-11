import React from 'react';
import { Building2, Award, Users, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutUsPage: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Importaciones & Distribución Multirubro
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Quiénes Somos
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Más de 15 años conectando a emprendedores, librerías y hogares con las mejores tendencias globales en Bazar y Papelería.
          </p>
        </div>
      </div>

      {/* Story & Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Nuestra Trayectoria
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 font-display">
            Innovación y Calidad Directa de Origen
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            En <strong>GIANNIZI Imports</strong> nacimos con una misión clara: eliminar intermediarios innecesarios para acercar artículos de bazar, papelería bullet journal, regalos e iluminación con excelente relación costo-beneficio.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Contamos con un depósito central de distribución en El Soberbio, Misiones desde el cual despachamos diariamente cientos de pedidos minoristas y pallets enteros para comercios de todo el país.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-2xl font-black text-amber-800 block font-mono">+500</span>
              <span className="text-neutral-700 font-bold">Comercios Adheridos</span>
            </div>
            <div className="p-4 bg-neutral-900 text-white rounded-2xl">
              <span className="text-2xl font-black text-amber-400 block font-mono">100%</span>
              <span className="text-neutral-300 font-bold">Stock Real Garantizado</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl bg-neutral-100 h-[380px]">
          <img 
            src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=80" 
            alt="Depósito GIANNIZI Imports" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Depósito Central El Soberbio</span>
            <p className="text-sm font-semibold">Infraestructura logística preparada para envíos prioritarios.</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200 space-y-6">
        <h3 className="text-xl font-bold text-neutral-900 text-center">Nuestros Pilares Operativos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2">
            <Globe className="w-8 h-8 text-amber-600" />
            <h4 className="font-bold text-base text-neutral-900">Importación Directa</h4>
            <p className="text-xs text-neutral-600">Seleccionamos personalmente proveedores certificados en origen.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h4 className="font-bold text-base text-neutral-900">Control de Calidad</h4>
            <p className="text-xs text-neutral-600">Probamos cada lote antes de su ingreso al inventario comercial.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2">
            <Users className="w-8 h-8 text-sky-600" />
            <h4 className="font-bold text-base text-neutral-900">Atención Personalizada</h4>
            <p className="text-xs text-neutral-600">Asesoramiento directo para compras al por menor y listas mayoristas.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h3 className="text-2xl font-black text-neutral-900">¿Querés sumar nuestros productos a tu tienda?</h3>
        <button
          onClick={() => setActiveView('shop')}
          className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 font-bold px-8 py-3.5 rounded-xl text-sm transition-all inline-flex items-center gap-2 shadow-lg"
        >
          <span>Ver Catálogo Multirubro</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

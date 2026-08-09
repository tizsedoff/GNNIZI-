import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  CreditCard,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoGiannizi from '../../assets/logo.jpg';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, subscribeNewsletter } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [subscribeResult, setSubscribeResult] = useState<{ success?: boolean; message?: string; coupon?: string } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    const res = subscribeNewsletter(emailInput);
    setSubscribeResult(res);
    if (res.success) {
      setEmailInput('');
    }
  };

  const navTo = (view: any, category?: any) => {
    setActiveView(view);
    if (category) setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-8 border-t border-neutral-800">
      {/* Top Newsletter & Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start space-x-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Envíos a Todo el País</h4>
              <p className="text-xs text-neutral-400 mt-1">Despachos rápidos vía Oca, Correo Argentino y transportes expresos.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Medios de Pago Flexibles</h4>
              <p className="text-xs text-neutral-400 mt-1">10% OFF con Transferencia, Cuotas en tarjeta y Mercado Pago.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Garantía Directa</h4>
              <p className="text-xs text-neutral-400 mt-1">Productos probados de fábrica e importación propia asegurada.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30 Días de Devolución</h4>
              <p className="text-xs text-neutral-400 mt-1">Política clara de cambios sin complicaciones para nuestros clientes.</p>
            </div>
          </div>
        </div>

        {/* Newsletter Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Suscripción a Novedades & Promociones
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Recibí ofertas exclusivas y un 10% OFF en tu primera compra
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Suscribite a nuestro newsletter para enterarte antes que nadie del ingreso de nuevos contenedores de Bazar y Papelería.
            </p>
          </div>

          <div className="w-full md:w-auto md:min-w-[320px]">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Ingresá tu e-mail aquí..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 flex-1"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors shrink-0"
              >
                <span>Suscribirme</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {subscribeResult && (
              <div className={`mt-3 p-3 rounded-xl text-xs flex items-center gap-2 ${
                subscribeResult.success ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-rose-950/80 text-rose-300 border border-rose-800'
              }`}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{subscribeResult.message}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 p-1">
                <img src={logoGiannizi} alt="GIANNIZI Imports" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-white tracking-wider">
                GIANNIZI <span className="text-amber-400 font-light">IMPORTS</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Empresa líder en importación directa y distribución multirubro de bazar, papelería creativa, artículos de hogar, oficina y novedades tecnológicas. Ventas por menor y por mayor a todo el país.
            </p>
            
            {/* Social Networks */}
            <div className="pt-2">
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-3">
                Síguenos en nuestras Redes Sociales:
              </span>
              <div className="flex items-center space-x-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-amber-400 hover:border-amber-500 transition-colors"
                  aria-label="Instagram de GIANNIZI Imports"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-amber-400 hover:border-amber-500 transition-colors"
                  aria-label="Facebook de GIANNIZI Imports"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/5493755301413" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-900 transition-colors"
                  aria-label="WhatsApp GIANNIZI Imports"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navTo('landing')} className="hover:text-amber-400 transition-colors">
                  Inicio / Landing Page
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Todas')} className="hover:text-amber-400 transition-colors">
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="hover:text-amber-400 transition-colors">
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button onClick={() => navTo('blog')} className="hover:text-amber-400 transition-colors">
                  Blog & Novedades
                </button>
              </li>
              <li>
                <button onClick={() => navTo('payment-methods')} className="hover:text-amber-400 transition-colors">
                  Medios de Pago & Cuotas
                </button>
              </li>
              <li>
                <button onClick={() => navTo('policies')} className="hover:text-amber-400 transition-colors">
                  Políticas de Devolución
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Rubros Destacados</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navTo('shop', 'Bazar')} className="hover:text-amber-400 transition-colors">
                  Bazar & Botellas Térmicas
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Papelería')} className="hover:text-amber-400 transition-colors">
                  Papelería & Bullet Journal
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Hogar')} className="hover:text-amber-400 transition-colors">
                  Hogar & Iluminación LED
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Regalería')} className="hover:text-amber-400 transition-colors">
                  Regalería & Difusores
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Oficina')} className="hover:text-amber-400 transition-colors">
                  Oficina & Organizadores
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'Novedades')} className="hover:text-amber-400 transition-colors">
                  Novedades & Gadgets
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Contacto Directo</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Depósito Central: Av. Jujuy 1420, CABA, Argentina</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ventas: +54 9 3755 30-1413</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ventas@gianniziimports.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lun a Vie: 9:00 a 18:00 hs | Sáb: 9:00 a 13:00 hs</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar & Mandatory Developer Credit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} GIANNIZI Imports S.A. Todos los derechos reservados.
        </div>

        {/* Payment options accepted icons indicator */}
        <div className="flex items-center space-x-2 text-[11px] text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
          <span>Aceptamos: Mercado Pago • Visa • Mastercard • Transferencia Bancaria</span>
        </div>

        {/* Developer Credit - EXACT LINK REQUIREMENT */}
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span>Sitio web</span>
          <a 
            href="https://aps-dev-hm44.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 flex items-center gap-1 transition-colors"
          >
            DESARROLLADO POR APS
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

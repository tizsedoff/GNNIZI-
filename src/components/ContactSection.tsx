import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('✉️ Mensaje enviado con éxito. Te responderemos a la brevedad.');
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            Atención al Cliente & Mayoristas
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Contacto & Atencion Directa
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            ¿Tenés dudas sobre un producto, un envío o querés solicitar cotización por bulto cerrado? Estamos para ayudarte.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact info list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-bold text-lg text-neutral-900">Información de Contacto</h3>

            <div className="space-y-4 text-xs text-neutral-700">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-neutral-900 text-sm font-bold">Depósito Central & Retiro:</strong>
                  <span>Av. Jujuy 1420, CABA, Argentina</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-neutral-900 text-sm font-bold">WhatsApp Directo:</strong>
                  <span>+54 9 3755 30-1413</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-sky-100 text-sky-800 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-neutral-900 text-sm font-bold">E-mail de Ventas:</strong>
                  <span>ventas@gianniziimports.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-neutral-900 text-sm font-bold">Horarios de Atención:</strong>
                  <span>Lunes a Viernes de 9:00 a 18:00 hs<br />Sábados de 9:00 a 13:00 hs</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Launcher Button */}
            <a
              href="https://wa.me/5493755301413?text=Hola%20GIANNIZI%20Imports!%20Quisiera%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Abrir Chat de WhatsApp en Vivo</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-bold text-lg text-neutral-900">Enviarnos un Mensaje</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-base">¡Mensaje Recibido!</h4>
                <p className="text-xs text-emerald-700">
                  Gracias por contactar a GIANNIZI Imports. Un asesor de ventas te responderá a tu correo en menos de 24 hs hábiles.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">E-mail de Contacto *</label>
                    <input
                      type="email"
                      required
                      placeholder="tu.email@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">Teléfono</label>
                    <input
                      type="tel"
                      placeholder="+54 11 1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">Asunto</label>
                    <input
                      type="text"
                      placeholder="Ej. Consulta por lista mayorista"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Mensaje *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Escribí tu consulta aquí..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 font-bold py-3.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

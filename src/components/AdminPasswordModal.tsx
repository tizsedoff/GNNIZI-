import React, { useState } from 'react';
import { Lock, X, KeyRound, ShieldAlert, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminPasswordModal: React.FC = () => {
  const { isAdminModalOpen, setIsAdminModalOpen, loginAdmin, activeView, setActiveView, isAdmin } = useApp();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAdminModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const success = loginAdmin(password);
    if (success) {
      setPassword('');
      setErrorMsg(null);
    } else {
      setErrorMsg('Contraseña incorrecta. Por favor intente nuevamente.');
    }
  };

  const handleClose = () => {
    setIsAdminModalOpen(false);
    setPassword('');
    setErrorMsg(null);
    if (activeView === 'inventory-admin' && !isAdmin) {
      setActiveView('shop');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-neutral-200 max-w-md w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-neutral-900 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
            Acceso Restringido
          </span>
          <h2 className="text-xl font-bold font-display mt-0.5">
            Panel de Administración
          </h2>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Ingresá la clave de acceso para gestionar el inventario, ver ventas y editar el catálogo de GIANNIZI Imports.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700">
              Contraseña de Administrador
            </label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                required
                placeholder="Ingresá la contraseña..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
              />
              <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 font-bold text-xs transition-all flex items-center gap-2 shadow-md active:scale-95"
            >
              <span>Ingresar al Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

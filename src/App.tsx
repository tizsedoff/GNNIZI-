import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroLanding } from './components/HeroLanding';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InventoryAdmin } from './components/InventoryAdmin';
import { AdminPasswordModal } from './components/AdminPasswordModal';
import { PaymentMethodsPage } from './components/PaymentMethodsPage';
import { BlogPage } from './components/BlogPage';
import { PoliciesPage } from './components/PoliciesPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactSection } from './components/ContactSection';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, toastMessage, isAdmin } = useApp();

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 selection:bg-amber-400 selection:text-neutral-950">
      <Header />

      <main className="flex-1">
        {activeView === 'landing' && <HeroLanding />}
        {activeView === 'shop' && <ProductCatalog />}
        {activeView === 'about' && <AboutUsPage />}
        {(activeView === 'blog' || activeView === 'blog-post') && <BlogPage />}
        {activeView === 'payment-methods' && <PaymentMethodsPage />}
        {activeView === 'policies' && <PoliciesPage />}
        {activeView === 'contact' && <ContactSection />}
        {activeView === 'inventory-admin' && (
          isAdmin ? (
            <>
              <InventoryAdmin />

              {/* Gestión de fotos de productos (Supabase) */}
              <div className="max-w-4xl mx-auto px-4 py-10">
                <h2 className="text-xl font-bold mb-4">
                  Cargar producto con foto
                </h2>
                <ProductForm />

                <h2 className="text-xl font-bold mt-10 mb-4">
                  Productos cargados
                </h2>
                <ProductList />
              </div>
            </>
          ) : (
            <ProductCatalog />
          )
        )}
      </main>

      <Footer />

      {/* Modals & Slide-overs */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AdminPasswordModal />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-500/40 text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { ShopProvider, useShop } from './context/ShopContext';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import MobileStoriesBar from './components/MobileStoriesBar';
import Hero from './components/Hero';
import CategoriesSection from './components/CategoriesSection';
import ProductGrid from './components/ProductGrid';
import VirtualDrapeStudio from './components/VirtualDrapeStudio';
import DrapeGuideSection from './components/DrapeGuideSection';
import WhyHarivillu from './components/WhyHarivillu';
import TestimonialsSection from './components/TestimonialsSection';
import ProfilePage from './components/ProfilePage';
import LocationModal from './components/LocationModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import LiveNotificationToast from './components/LiveNotificationToast';
import MobileBottomNav from './components/MobileBottomNav';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { currentView, isAuthenticated, setIsAuthModalOpen } = useShop();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FAF7F2] text-slate-800 font-sans selection:bg-rose-500 selection:text-white content-bottom-space lg:pb-0 overflow-x-hidden max-w-full">
      
      {/* Grand Luxury Brand Splash Screen Intro with Official Logo */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Top Header with Harivillu Collections Official Logo */}
      <Navbar />

      {/* Mobile Stories & Quick Highlights Bar (Shown on Home) */}
      {currentView === 'home' && <MobileStoriesBar />}

      {/* Main View Router: Profile vs Storefront */}
      {currentView === 'profile' ? (
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {isAuthenticated ? (
            <ProfilePage />
          ) : (
            <div className="min-h-[70vh] flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xl text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-temple-crimson mx-auto flex items-center justify-center shadow-inner">
                  <User className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  Harivillu VIP Profile
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Please log in to view your orders, customized measurements for your little princesses, and 450 Silk Coins.
                </p>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl rani-gradient-bg text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all"
                >
                  Log In / Sign Up
                </button>
              </div>
            </div>
          )}
        </main>
      ) : (
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          <Hero />
          <CategoriesSection />
          <ProductGrid />
          <VirtualDrapeStudio />
          <DrapeGuideSection />
          <WhyHarivillu />
          <TestimonialsSection />
        </main>
      )}

      {/* Brand Footer */}
      <Footer />

      {/* Real-time Interactive Drawers & Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <LocationModal />
      <AuthModal />
      <LiveNotificationToast />

      {/* Native App-Like Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

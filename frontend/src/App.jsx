import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
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
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import LiveNotificationToast from './components/LiveNotificationToast';
import MobileBottomNav from './components/MobileBottomNav';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FAF7F2] text-slate-800 font-sans selection:bg-rose-500 selection:text-white content-bottom-space lg:pb-0 overflow-x-hidden max-w-full">
      
      {/* Grand Luxury Brand Splash Screen Intro with Official Logo */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Top Header with Harivillu Collections Official Logo */}
      <Navbar />

      {/* Mobile Stories & Quick Highlights Bar */}
      <MobileStoriesBar />

      {/* Main Home Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Hero />
        <CategoriesSection />
        <ProductGrid />
        <VirtualDrapeStudio />
        <DrapeGuideSection />
        <WhyHarivillu />
        <TestimonialsSection />
      </main>

      {/* Brand Footer */}
      <Footer />

      {/* Real-time Interactive Drawers & Overlays */}
      <CartDrawer />
      <QuickViewModal />
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

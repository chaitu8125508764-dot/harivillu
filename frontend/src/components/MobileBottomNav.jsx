import React from 'react';
import { Home, Layers, Sparkles, User, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MobileBottomNav() {
  const { 
    currentView,
    setCurrentView,
    isAuthenticated,
    setIsAuthModalOpen,
    totalCartCount, 
    cartSubtotal, 
    wishlist, 
    setIsCartOpen, 
    formatPrice 
  } = useShop();

  const handleNavClick = (view, sectionId = null) => {
    if (view === 'profile') {
      if (!isAuthenticated) {
        setIsAuthModalOpen(true);
      } else {
        setCurrentView('profile');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setCurrentView('home');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            const yOffset = -60; 
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-bottom-nav border-t border-amber-900/15 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto px-1 flex items-center justify-between h-14 sm:h-16 nav-bottom-padding">
        
        {/* 1. Home */}
        <button
          onClick={() => handleNavClick('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 active:scale-90 transition-transform ${
            currentView === 'home' ? 'text-temple-crimson' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 ${currentView === 'home' ? 'text-temple-crimson stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-0.5 leading-none ${currentView === 'home' ? 'font-bold text-temple-crimson' : 'font-medium'}`}>
            Home
          </span>
        </button>

        {/* 2. Categories / Explore */}
        <button
          onClick={() => handleNavClick('home', 'categories-section')}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-600 hover:text-slate-900 active:scale-90 transition-transform"
          aria-label="Explore Categories"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-medium text-slate-600 mt-0.5 leading-none">Explore</span>
        </button>

        {/* 3. Virtual Drape Studio (Center Highlight) */}
        <button
          onClick={() => handleNavClick('home', 'virtual-studio')}
          className="flex-1 flex flex-col items-center justify-center py-1 active:scale-90 transition-transform relative"
          aria-label="Virtual Drape Studio"
        >
          <div className="relative -top-2 w-11 h-11 rounded-full rani-gradient-bg p-0.5 shadow-md border-2 border-amber-300 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-temple-crimson flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-800 tracking-tight -mt-1 leading-none">Studio</span>
        </button>

        {/* 4. Customer Profile & Sizing Vault */}
        <button
          onClick={() => handleNavClick('profile')}
          className={`flex-1 flex flex-col items-center justify-center py-1 active:scale-90 transition-transform relative ${
            currentView === 'profile' ? 'text-temple-crimson' : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Customer Profile"
        >
          <div className="relative">
            <User className={`w-5 h-5 ${currentView === 'profile' ? 'text-temple-crimson stroke-[2.5]' : ''}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </div>
          <span className={`text-[10px] mt-0.5 leading-none ${currentView === 'profile' ? 'font-bold text-temple-crimson' : 'font-medium'}`}>
            Profile
          </span>
        </button>

        {/* 5. Bag / Cart Drawer */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-600 active:scale-90 transition-transform relative"
          aria-label="Cart Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-slate-800" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-500 text-slate-950 text-[9px] font-extrabold rounded-full flex items-center justify-center shadow">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-900 mt-0.5 leading-none truncate max-w-[50px]">
            {totalCartCount > 0 ? formatPrice(cartSubtotal) : 'Bag'}
          </span>
        </button>

      </div>
    </div>
  );
}

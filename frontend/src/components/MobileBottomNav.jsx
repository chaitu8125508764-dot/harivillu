import React from 'react';
import { Home, Layers, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MobileBottomNav() {
  const { 
    totalCartCount, 
    cartSubtotal, 
    wishlist, 
    setIsCartOpen, 
    formatPrice 
  } = useShop();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -60; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-bottom-nav border-t border-amber-900/15 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto px-1 flex items-center justify-between h-14 sm:h-16 nav-bottom-padding">
        
        {/* 1. Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-700 active:scale-90 transition-transform"
        >
          <Home className="w-5 h-5 text-temple-crimson" />
          <span className="text-[10px] font-bold text-temple-crimson mt-0.5 leading-none">Home</span>
        </button>

        {/* 2. Categories */}
        <button
          onClick={() => scrollTo('categories-section')}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-600 active:scale-90 transition-transform"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-medium text-slate-600 mt-0.5 leading-none">Explore</span>
        </button>

        {/* 3. Virtual Drape Studio (Center Highlight) */}
        <button
          onClick={() => scrollTo('virtual-studio')}
          className="flex-1 flex flex-col items-center justify-center py-1 active:scale-90 transition-transform relative"
        >
          <div className="relative -top-2 w-11 h-11 rounded-full rani-gradient-bg p-0.5 shadow-md border-2 border-amber-300 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-temple-crimson flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-800 tracking-tight -mt-1 leading-none">Studio</span>
        </button>

        {/* 4. Wishlist */}
        <button
          onClick={() => scrollTo('featured-collection')}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-600 active:scale-90 transition-transform relative"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rani-600 fill-rani-600' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-rani-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium text-slate-600 mt-0.5 leading-none">Saved</span>
        </button>

        {/* 5. Bag / Cart Drawer */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-600 active:scale-90 transition-transform relative"
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

import React from 'react';
import { Home, Layers, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MobileBottomNav() {
  const { 
    totalCartCount, 
    cartSubtotal, 
    wishlist, 
    setIsCartOpen, 
    setSelectedCategory,
    formatPrice 
  } = useShop();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-bottom-nav shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-around pb-safe">
        
        {/* 1. Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-700 hover:text-temple-crimson active:scale-90 transition-all"
        >
          <Home className="w-5 h-5 text-temple-crimson" />
          <span className="text-[10px] font-bold text-temple-crimson mt-0.5">Home</span>
        </button>

        {/* 2. Categories */}
        <button
          onClick={() => scrollTo('categories-section')}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-600 hover:text-temple-crimson active:scale-90 transition-all"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Explore</span>
        </button>

        {/* 3. Virtual Drape Studio (Center Highlight Pill) */}
        <button
          onClick={() => scrollTo('virtual-studio')}
          className="relative flex flex-col items-center justify-center -mt-4 active:scale-90 transition-all group"
        >
          <div className="w-12 h-12 rounded-full rani-gradient-bg p-0.5 shadow-lg shadow-pink-900/30 flex items-center justify-center border-2 border-amber-300">
            <div className="w-full h-full rounded-full bg-temple-crimson flex items-center justify-center group-hover:bg-temple-maroon transition-colors">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-800 tracking-tight mt-0.5">Studio</span>
        </button>

        {/* 4. Wishlist */}
        <button
          onClick={() => scrollTo('featured-collection')}
          className="relative flex flex-col items-center justify-center py-1 px-2 text-slate-600 hover:text-temple-crimson active:scale-90 transition-all"
        >
          <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rani-600 fill-rani-600' : ''}`} />
          {wishlist.length > 0 && (
            <span className="absolute 0 top-0.5 right-1 w-4 h-4 bg-rani-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] font-medium mt-0.5">Saved</span>
        </button>

        {/* 5. Bag / Cart Drawer */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-2 text-slate-600 hover:text-temple-crimson active:scale-90 transition-all"
        >
          <ShoppingBag className="w-5 h-5 text-slate-800" />
          {totalCartCount > 0 && (
            <span className="absolute top-0.5 right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[9px] font-extrabold rounded-full flex items-center justify-center shadow animate-pulse">
              {totalCartCount}
            </span>
          )}
          <span className="text-[10px] font-bold text-slate-900 mt-0.5">
            {totalCartCount > 0 ? formatPrice(cartSubtotal) : 'Bag'}
          </span>
        </button>

      </div>
    </div>
  );
}

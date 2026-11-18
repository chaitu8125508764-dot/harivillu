import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    setQuickViewProduct, 
    formatPrice 
  } = useShop();

  const [selectedAge, setSelectedAge] = useState(product.selectedAge || (product.ageGroups && product.ageGroups[0]));
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div 
      className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.readyToWear && (
            <span className="inline-flex items-center gap-0.5 bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
              <Zap className="w-2.5 h-2.5 fill-slate-950" /> 1-Min
            </span>
          )}
          {product.tag && (
            <span className="bg-temple-crimson/95 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Expanded 40px Touch Target) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
            isWishlisted 
              ? 'bg-rose-50 text-rani-600 shadow-md scale-110' 
              : 'bg-white/85 hover:bg-white text-slate-600 shadow-sm'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rani-600 text-rani-600' : ''}`} />
        </button>

        {/* Live Viewers Floating Ticker */}
        <div className="absolute bottom-1.5 left-1.5 z-10 bg-black/60 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
          <span>{product.viewsNow} view</span>
        </div>

        {/* Quick View Desktop Hover Button */}
        <div className="hidden sm:block absolute inset-x-2 bottom-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-1.5 bg-white/95 text-slate-900 rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

      </div>

      {/* Product Details Section */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between">
        
        <div>
          {/* Rating & Fabric Tag */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1">
            <span className="text-slate-500 font-medium truncate max-w-[100px] sm:max-w-[140px]">
              {product.fabric.split('with')[0]}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Saree Title */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 cursor-pointer leading-tight sm:leading-snug hover:text-temple-crimson"
          >
            {product.name}
          </h3>

          {/* Mobile Age Chip selector (Horizontal scroll) */}
          <div className="mt-2">
            <div className="flex gap-1 overflow-x-auto no-scrollbar pb-0.5">
              {product.ageGroups.slice(0, 3).map(age => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded border whitespace-nowrap transition-colors ${
                    selectedAge === age
                      ? 'border-temple-crimson bg-rose-50 text-temple-crimson font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {age}
                </button>
              ))}
              {product.ageGroups.length > 3 && (
                <span className="text-[9px] text-slate-400 px-1 py-0.5 self-center">
                  +{product.ageGroups.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-xs sm:text-base font-bold text-temple-crimson">
                {formatPrice(product.price)}
              </span>
              <span className="text-[9px] sm:text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
            <span className="text-[8px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
              {product.discount}
            </span>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={() => addToCart(product, selectedAge)}
            className="w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl rani-gradient-bg text-white text-[11px] sm:text-xs font-bold shadow active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
}

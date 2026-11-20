import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle,
  Eye,
  Check,
  Ruler,
  MapPin
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    formatPrice,
    deliveryLocation,
    setIsLocationModalOpen
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedAge, setSelectedAge] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  if (!quickViewProduct) return null;

  const currentAge = selectedAge || quickViewProduct.selectedAge || quickViewProduct.ageGroups[0];
  const isWishlisted = wishlist.includes(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Sheet Container: Bottom Sheet on Mobile, Centered Modal on Tablet/Desktop */}
      <div className="relative w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-amber-900/10 z-10 max-h-[90vh] sm:max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Grab Handle */}
        <div className="sm:hidden w-full pt-3 pb-1 flex justify-center bg-white cursor-grab">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full"></div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2 rounded-full bg-white/90 text-slate-500 hover:text-slate-800 shadow"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
            
            {/* Gallery (Left Column) */}
            <div className="md:col-span-6 flex flex-col gap-2.5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-slate-200">
                <img
                  src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-top"
                />

                {/* Floating Viewers */}
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
                  <span>{quickViewProduct.viewsNow} viewing</span>
                </div>
              </div>

              {/* Thumbnails Swiper */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIdx === idx ? 'border-temple-crimson scale-105 shadow' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details (Right Column) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-900">{quickViewProduct.rating}</span>
                    <span className="text-[11px] text-slate-400">({quickViewProduct.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-[10px] font-bold text-temple-crimson bg-rose-50 px-2 py-0.5 rounded-full">
                    {quickViewProduct.tag}
                  </span>
                </div>

                <h2 className="text-base sm:text-2xl font-serif font-bold text-slate-900 mt-1.5 leading-snug">
                  {quickViewProduct.name}
                </h2>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-temple-crimson font-serif">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {quickViewProduct.discount}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {quickViewProduct.description}
                </p>

                {/* Features list */}
                <div className="mt-3 space-y-1 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/60 text-[11px]">
                  {quickViewProduct.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-700">
                      <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Zepto/Flipkart Delivery Location ETA Banner */}
                <div 
                  onClick={() => setIsLocationModalOpen(true)}
                  className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-amber-50 via-rose-50/60 to-amber-50 border border-amber-200/80 cursor-pointer hover:bg-amber-100/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-temple-crimson text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] leading-tight">
                      <p className="text-slate-800">
                        Deliver to <strong className="font-bold text-slate-900">{deliveryLocation?.area || deliveryLocation?.city} - {deliveryLocation?.pincode}</strong>
                      </p>
                      <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                        <span>⚡ {deliveryLocation?.deliveryTime || 'Tomorrow, by 2:00 PM'}</span>
                        <span className="text-slate-300">|</span>
                        <span>Free Express Air</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-temple-crimson hover:underline ml-2">Change</span>
                </div>

                {/* Age selector */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Select Age Group:
                    </span>
                    <button
                      onClick={() => setShowSizeChart(!showSizeChart)}
                      className="text-[11px] text-rani-700 font-semibold flex items-center gap-0.5"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>{showSizeChart ? 'Hide Size' : 'Size Chart'}</span>
                    </button>
                  </div>

                  {showSizeChart && (
                    <div className="mb-2 p-2.5 bg-white rounded-xl border border-slate-300 text-[10px] space-y-1">
                      <div className="font-bold text-slate-800">Height Guide:</div>
                      <div className="grid grid-cols-2 gap-1 text-slate-600">
                        <div>2-4Y: 85-100cm</div>
                        <div>5-7Y: 105-120cm</div>
                        <div>8-10Y: 125-138cm</div>
                        <div>11-14Y: 140-155cm</div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.ageGroups.map(age => (
                      <button
                        key={age}
                        onClick={() => setSelectedAge(age)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold active:scale-95 transition-all ${
                          currentAge === age
                            ? 'bg-temple-crimson text-white shadow'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 space-y-2 nav-bottom-padding sm:pb-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, currentAge, quickViewProduct.colorName, quantity);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 rounded-xl rani-gradient-bg text-white font-bold text-xs uppercase tracking-wider shadow active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(quickViewProduct.price * quantity)}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-xl border active:scale-95 ${
                      isWishlisted
                        ? 'border-rose-300 bg-rose-50 text-rani-600'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rani-600' : ''}`} />
                  </button>
                </div>

                <a
                  href={`https://wa.me/?text=Hi%20Harivillu!%20Interested%20in%20"${quickViewProduct.name}"%20(${currentAge}).`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Video Call</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

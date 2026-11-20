import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, MessageCircle, RefreshCw, Palette } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const SILK_PALETTES = [
  { name: 'Rajkumari Jamun Purple', hex: '#4a1d4e', borderHex: '#c5a059', blouse: '#2d0a32' },
  { name: 'Kanchi Peacock Teal', hex: '#0e7490', borderHex: '#d4af37', blouse: '#9d174d' },
  { name: 'Rani Magenta Pink', hex: '#be185d', borderHex: '#ca8a04', blouse: '#047857' },
  { name: 'Turmeric Gold Yellow', hex: '#d97706', borderHex: '#881337', blouse: '#be123c' },
  { name: 'Royal Emerald Green', hex: '#047857', borderHex: '#d4af37', blouse: '#881337' },
  { name: 'Temple Crimson Maroon', hex: '#881337', borderHex: '#eab308', blouse: '#0284c7' },
  { name: 'Pastel Lilac Organza', hex: '#7c3aed', borderHex: '#fb7185', blouse: '#db2777' }
];

const ZARI_OPTIONS = [
  { name: 'Pure 24K Kanchi Gold Zari', color: 'from-amber-300 via-yellow-400 to-amber-600', code: 'gold' },
  { name: 'Antique Copper Temple Brocade', color: 'from-amber-600 via-orange-400 to-amber-800', code: 'copper' },
  { name: 'Shimmering Silver Tissue Zari', color: 'from-slate-200 via-gray-300 to-slate-400', code: 'silver' }
];

export default function VirtualDrapeStudio() {
  const [selectedSilk, setSelectedSilk] = useState(SILK_PALETTES[0]);
  const [selectedZari, setSelectedZari] = useState(ZARI_OPTIONS[0]);
  const [selectedAge, setSelectedAge] = useState('6-8 Yrs');
  const [isRotating, setIsRotating] = useState(false);
  const { addToCart, formatPrice } = useShop();

  const handleCustomOrder = () => {
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Custom Handloom Drape (${selectedSilk.name})`,
      category: 'ready-to-wear',
      price: 4999,
      originalPrice: 6590,
      fabric: `Pure Silk with ${selectedZari.name}`,
      colorName: `${selectedSilk.name} + Zari`,
      images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85']
    };
    addToCart(customProduct, selectedAge, selectedSilk.name);
  };

  return (
    <section id="virtual-studio" className="py-10 sm:py-20 bg-gradient-to-b from-[#FAF7F2] via-amber-50/40 to-[#FAF7F2] relative overflow-hidden border-b border-amber-900/10">
      
      {/* Background Rainbow Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-gradient-to-r from-pink-200/30 via-yellow-200/30 to-teal-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-sm">
            <Palette className="w-3.5 h-3.5 text-amber-700" />
            Harivillu Rainbow Color Lab
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            Interactive Virtual Drape Studio
          </h2>
          <p className="mt-1 text-slate-600 text-xs sm:text-sm">
            Preview pure silk body shades, contrast blouses & zari borders live on mobile.
          </p>
        </div>

        {/* Studio Workspace Box */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-amber-200/70 p-4 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Visual Mannequin Simulation Stage (Left Column) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-stone-100 via-rose-50/30 to-amber-50/30 rounded-2xl border border-amber-900/10 relative overflow-hidden">
              
              {/* Live Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold text-slate-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Drape • {selectedAge}</span>
              </div>

              {/* Reset / Randomize Swatch */}
              <button
                onClick={() => {
                  setIsRotating(true);
                  const randomSilk = SILK_PALETTES[Math.floor(Math.random() * SILK_PALETTES.length)];
                  const randomZari = ZARI_OPTIONS[Math.floor(Math.random() * ZARI_OPTIONS.length)];
                  setSelectedSilk(randomSilk);
                  setSelectedZari(randomZari);
                  setTimeout(() => setIsRotating(false), 500);
                }}
                className="absolute top-3 right-3 z-20 p-1.5 sm:p-2 bg-white/90 rounded-full text-slate-700 shadow-sm border border-slate-200 active:scale-90 transition-transform"
                title="Shuffle Color"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              </button>

              {/* Saree Mannequin Graphic */}
              <div className="relative w-48 h-72 sm:w-64 sm:h-96 flex items-center justify-center my-2">
                
                {/* Background aura with selected color */}
                <div
                  className="absolute w-40 h-56 sm:w-52 sm:h-72 rounded-full blur-2xl opacity-40 transition-colors duration-500"
                  style={{ backgroundColor: selectedSilk.hex }}
                ></div>

                {/* Illustrated SVG Mannequin / Saree Silhouette */}
                <svg viewBox="0 0 200 320" className="w-full h-full drop-shadow-xl transition-all duration-500">
                  {/* Blouse */}
                  <path
                    d="M 75 75 Q 100 85 125 75 L 132 110 L 68 110 Z"
                    fill={selectedSilk.blouse}
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    className="transition-colors duration-500"
                  />
                  <rect x="68" y="106" width="64" height="4" fill="#fbbf24" />

                  {/* Saree Pleats Body */}
                  <path
                    d="M 68 115 L 132 115 L 155 280 L 45 280 Z"
                    fill={selectedSilk.hex}
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    className="transition-colors duration-500"
                  />

                  {/* Pleat Lines */}
                  {[60, 75, 90, 105, 120, 135].map((x, idx) => (
                    <line
                      key={idx}
                      x1={x}
                      y1="130"
                      x2={x + (idx - 3) * 3}
                      y2="280"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* Bottom Zari Border */}
                  <path
                    d="M 45 255 L 155 255 L 155 280 L 45 280 Z"
                    fill={selectedSilk.borderHex}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  {[55, 70, 85, 100, 115, 130, 145].map((bx, bidx) => (
                    <polygon
                      key={bidx}
                      points={`${bx},262 ${bx + 4},267 ${bx},272 ${bx - 4},267`}
                      fill="#fff"
                      opacity="0.8"
                    />
                  ))}

                  {/* Cross Pallu Drape */}
                  <path
                    d="M 75 75 L 115 130 L 135 125 L 85 70 Z"
                    fill={selectedSilk.hex}
                    opacity="0.95"
                  />
                  <path
                    d="M 85 70 L 60 160 L 68 165 L 90 75 Z"
                    fill={selectedSilk.borderHex}
                  />

                  {/* Gold Waistband Belt */}
                  <rect x="66" y="113" width="68" height="6" rx="3" fill="#d4af37" stroke="#b45309" strokeWidth="1" />
                  <circle cx="100" cy="116" r="4" fill="#be123c" />
                </svg>

              </div>

              {/* Selected Swatch Summary Pill */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-sm text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: selectedSilk.hex }}></span>
                  <span className="font-semibold text-slate-800">{selectedSilk.name}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-amber-700 font-bold">{selectedZari.name.split(' ')[1]} Zari</span>
              </div>

            </div>

            {/* Customizer Controls (Right Column) */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              
              {/* 1. Silk Color Palette Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  1. Choose Silk Shade:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SILK_PALETTES.map(palette => {
                    const isSelected = selectedSilk.name === palette.name;
                    return (
                      <button
                        key={palette.name}
                        onClick={() => setSelectedSilk(palette)}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all active:scale-95 ${
                          isSelected
                            ? 'border-temple-crimson ring-2 ring-rose-400 bg-rose-50/50 shadow-sm'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full shadow-inner flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: palette.hex }}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-800 leading-tight truncate">
                          {palette.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Zari Brocade Type */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  2. Select Zari Border:
                </label>
                <div className="space-y-1.5">
                  {ZARI_OPTIONS.map(z => {
                    const isSelected = selectedZari.code === z.code;
                    return (
                      <button
                        key={z.code}
                        onClick={() => setSelectedZari(z)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs font-semibold active:scale-95 ${
                          isSelected
                            ? 'border-amber-500 ring-2 ring-amber-300 bg-amber-50/40 text-slate-900 shadow-sm'
                            : 'border-slate-200 text-slate-700 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-md bg-gradient-to-r ${z.color} shadow-sm border border-black/10`}></span>
                          <span className="text-[11px] sm:text-xs">{z.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Girl's Age Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  3. Select Age:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['2-3 Yrs', '4-5 Yrs', '6-8 Yrs', '9-11 Yrs', '12-14 Yrs', '15-18 Yrs'].map(age => (
                    <button
                      key={age}
                      onClick={() => setSelectedAge(age)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold active:scale-95 transition-colors ${
                        selectedAge === age
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Action CTA */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-serif font-bold text-temple-crimson">
                      {formatPrice(4999)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(6590)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      24% Off Custom
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Includes Pre-stitched Drape + Free Custom Blouse
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCustomOrder}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Custom Drape</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=Hi%20Harivillu!%20I%20customized%20a%20saree:%20${selectedSilk.name}%20with%20${selectedZari.name}%20for%20age%20${selectedAge}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 active:scale-95"
                    title="Send to WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  ShoppingBag, 
  MessageCircle, 
  RefreshCw, 
  Palette, 
  Eye, 
  ZoomIn, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Layers,
  Ruler
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SILK_PALETTES = [
  { 
    name: 'Rajkumari Jamun Purple', 
    hex: '#4A1D4E', 
    borderHex: '#C5A059', 
    blouse: '#2D0A32',
    image: '/images/saree-aubergine-purple.jpg',
    textureImage: '/images/saree-aubergine-purple.jpg',
    weave: 'Pure Chanderi Silk with Rose-Gold Kattam Checks',
    tag: 'Trending #1',
    borderType: 'Antique Rose-Gold Zari Weave'
  },
  { 
    name: 'Kanchi Peacock Teal', 
    hex: '#0891b2', 
    borderHex: '#d4af37', 
    blouse: '#9d174d',
    image: '/images/saree-peacock-teal.jpg',
    textureImage: '/images/saree-peacock-teal.jpg',
    weave: 'Pure Mulberry Kanchipuram Handloom Weave',
    tag: 'Classic Royal',
    borderType: 'Mayura Peacock Temple Border'
  },
  { 
    name: 'Rani Magenta Pink', 
    hex: '#db2777', 
    borderHex: '#eab308', 
    blouse: '#047857',
    image: '/images/saree-pattu-half.jpg',
    textureImage: '/images/saree-pattu-half.jpg',
    weave: 'Kanchi Tissue Pattu with Gilded Brocade',
    tag: 'Festive Favorite',
    borderType: 'Swarna Gilded Zari Border'
  },
  { 
    name: 'Temple Crimson Maroon', 
    hex: '#881337', 
    borderHex: '#eab308', 
    blouse: '#0284c7',
    image: '/images/saree-crimson-1min.jpg',
    textureImage: '/images/saree-crimson-1min.jpg',
    weave: 'Authentic Dharmavaram Pure Silk',
    tag: 'Bestseller',
    borderType: 'Traditional Rudraksha Border'
  },
  { 
    name: 'Turmeric Gold Yellow', 
    hex: '#d97706', 
    borderHex: '#881337', 
    blouse: '#be123c',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    textureImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    weave: 'Mangala Pasupu Silk with Contrast Pallu',
    tag: 'Pooja Special',
    borderType: 'Gopuram Temple Zari'
  },
  { 
    name: 'Royal Emerald Green', 
    hex: '#047857', 
    borderHex: '#d4af37', 
    blouse: '#881337',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    textureImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    weave: 'Vanamali Pure Kanchipuram Silk',
    tag: 'Heirloom',
    borderType: 'Pure 24K Floral Creeper Zari'
  },
  { 
    name: 'Pastel Lilac Organza', 
    hex: '#7c3aed', 
    borderHex: '#fb7185', 
    blouse: '#db2777',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
    textureImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
    weave: 'Featherlight Organza with Zari Bootis',
    tag: 'Party Wear',
    borderType: 'Shimmering Scalloped Zari Edge'
  }
];

export const ZARI_OPTIONS = [
  { 
    name: 'Pure 24K Kanchi Gold Zari', 
    color: 'from-amber-300 via-yellow-400 to-amber-600', 
    code: 'gold',
    shimmerGlow: 'rgba(251, 191, 36, 0.25)',
    filterEffect: 'brightness(1.04) contrast(1.02)'
  },
  { 
    name: 'Antique Copper Temple Brocade', 
    color: 'from-amber-600 via-orange-400 to-amber-800', 
    code: 'copper',
    shimmerGlow: 'rgba(234, 88, 12, 0.22)',
    filterEffect: 'sepia(0.08) brightness(1.02)'
  },
  { 
    name: 'Shimmering Silver Tissue Zari', 
    color: 'from-slate-200 via-gray-300 to-slate-400', 
    code: 'silver',
    shimmerGlow: 'rgba(226, 232, 240, 0.35)',
    filterEffect: 'brightness(1.06) contrast(1.04)'
  }
];

export default function VirtualDrapeStudio() {
  const [selectedSilk, setSelectedSilk] = useState(SILK_PALETTES[0]); // Jamun Aubergine Purple
  const [selectedZari, setSelectedZari] = useState(ZARI_OPTIONS[0]);
  const [selectedAge, setSelectedAge] = useState('6-8 Yrs');
  const [viewMode, setViewMode] = useState('model'); // 'model' | 'texture'
  const [lightingMode, setLightingMode] = useState('daylight'); // 'daylight' | 'evening'
  const [isRotating, setIsRotating] = useState(false);
  const { addToCart, formatPrice, showToast } = useShop();

  const handleCustomOrder = () => {
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `${selectedSilk.name} Custom Silk Drape`,
      category: 'ready-to-wear',
      price: 4999,
      originalPrice: 6590,
      discount: '24% OFF',
      rating: 5.0,
      reviewsCount: 1,
      fabric: selectedSilk.weave,
      colorName: `${selectedSilk.name} + ${selectedZari.name}`,
      colorHex: selectedSilk.hex,
      contrastColorHex: selectedSilk.borderHex,
      images: [selectedSilk.image],
      readyToWear: true
    };
    addToCart(customProduct, selectedAge, selectedSilk.name);
    showToast(`✨ ${selectedSilk.name} customized drape added to Bag!`, 'success');
  };

  return (
    <section id="virtual-studio" className="py-8 sm:py-16 bg-gradient-to-b from-[#FAF7F2] via-amber-50/40 to-[#FAF7F2] relative overflow-hidden border-b border-amber-900/10">
      
      {/* Background Rainbow Atmosphere Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[650px] h-80 sm:h-[650px] bg-gradient-to-r from-pink-200/25 via-amber-200/25 to-purple-200/25 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-sm">
            <Palette className="w-3.5 h-3.5 text-amber-700" />
            <span>Harivillu Real-View Drape Studio</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Interactive Virtual Drape Studio
          </h2>
          <p className="mt-1 text-slate-600 text-xs sm:text-sm">
            Preview photorealistic pure silk body shades, real zari pallus & custom drapes on models.
          </p>
        </div>

        {/* Studio Workspace Box */}
        <div className="bg-white rounded-3xl shadow-2xl border border-amber-200/80 p-3 sm:p-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* ============================================================== */}
            {/* LEFT COLUMN: REALISTIC PHOTO STUDIO STAGE (10-Senior Level) */}
            {/* ============================================================== */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 sm:p-5 bg-gradient-to-b from-stone-900/5 via-amber-50/30 to-stone-900/5 rounded-3xl border border-amber-900/10 relative overflow-hidden">
              
              {/* Top Floating Controls */}
              <div className="w-full flex items-center justify-between z-20 mb-2 px-1">
                {/* Live Model Badge */}
                <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white shadow-md border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5"></span>
                  <span className="font-bold">Real Drape • {selectedAge}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Lighting Toggle (Daylight vs Evening Festive Lamp) */}
                  <button
                    onClick={() => setLightingMode(prev => prev === 'daylight' ? 'evening' : 'daylight')}
                    className="p-1.5 sm:p-2 bg-white/95 rounded-full text-slate-700 shadow-sm border border-slate-200 hover:text-amber-600 transition-colors"
                    title={`Current: ${lightingMode === 'daylight' ? 'Daylight Studio' : 'Evening Festive Hall'}`}
                  >
                    {lightingMode === 'daylight' ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-purple-600" />}
                  </button>

                  {/* Shuffle Color */}
                  <button
                    onClick={() => {
                      setIsRotating(true);
                      const randomSilk = SILK_PALETTES[Math.floor(Math.random() * SILK_PALETTES.length)];
                      const randomZari = ZARI_OPTIONS[Math.floor(Math.random() * ZARI_OPTIONS.length)];
                      setSelectedSilk(randomSilk);
                      setSelectedZari(randomZari);
                      setTimeout(() => setIsRotating(false), 500);
                    }}
                    className="p-1.5 sm:p-2 bg-white/95 rounded-full text-slate-700 shadow-sm border border-slate-200 active:scale-90 transition-transform"
                    title="Shuffle Random Silk Shade"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Realistic Visual Stage Container */}
              <div className="relative w-full h-[360px] sm:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-slate-900 group">
                
                {/* Real High-Resolution Saree Photo */}
                <img
                  src={viewMode === 'model' ? selectedSilk.image : selectedSilk.textureImage}
                  alt={selectedSilk.name}
                  style={{ filter: selectedZari.filterEffect }}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    viewMode === 'model' ? 'object-top group-hover:scale-105' : 'object-center scale-125'
                  } ${lightingMode === 'evening' ? 'brightness-95 contrast-105 sepia-[0.15]' : ''}`}
                />

                {/* Ambient Real-time Silk Shimmer Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${selectedZari.shimmerGlow} 0%, transparent 50%, ${selectedSilk.hex}15 100%)` 
                  }}
                />

                {/* Silk Mark Certified Royal Emblem Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-amber-400/90 text-slate-950 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-md border border-white/40">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Silk Mark Certified 100% Pure</span>
                </div>

                {/* Saree Tag Pill */}
                <div className="absolute top-3 right-3 z-10 bg-temple-crimson/90 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                  {selectedSilk.tag}
                </div>

                {/* View Mode Switcher Pills (Model View vs Close-up Texture) */}
                <div className="absolute bottom-20 sm:bottom-24 inset-x-0 flex justify-center z-20">
                  <div className="bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 flex items-center gap-1 shadow-lg">
                    <button
                      onClick={() => setViewMode('model')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                        viewMode === 'model' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Model Drape</span>
                    </button>
                    <button
                      onClick={() => setViewMode('texture')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                        viewMode === 'texture' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>Zari Texture</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Real-time Saree Fabric Spec Card */}
                <div className="absolute bottom-3 inset-x-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300/60 shadow-lg text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-serif font-bold text-slate-900 leading-tight">
                        {selectedSilk.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                        {selectedSilk.weave}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                        {selectedZari.name.split(' ')[1]} Zari
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Swatch Color Indicator Strip */}
              <div className="mt-3 flex items-center justify-between w-full text-[11px] text-slate-600 px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: selectedSilk.hex }}></span>
                  <strong className="text-slate-900">{selectedSilk.name}</strong>
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ Pre-stitched Pleats Included
                </span>
              </div>

            </div>

            {/* ============================================================== */}
            {/* RIGHT COLUMN: INTERACTIVE CUSTOMIZER CONTROLS */}
            {/* ============================================================== */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              
              {/* 1. Silk Color Palette Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    1. Choose Real Silk Shade:
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {SILK_PALETTES.length} Heirloom Hues
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SILK_PALETTES.map(palette => {
                    const isSelected = selectedSilk.name === palette.name;
                    return (
                      <button
                        key={palette.name}
                        onClick={() => setSelectedSilk(palette)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-2xl border text-left transition-all active:scale-95 ${
                          isSelected
                            ? 'border-temple-crimson ring-2 ring-rose-400/80 bg-rose-50/60 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shadow-inner flex items-center justify-center flex-shrink-0 border border-white"
                          style={{ backgroundColor: palette.hex }}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-slate-900 leading-tight truncate">
                            {palette.name}
                          </p>
                          <p className="text-[9px] text-slate-400 truncate">
                            {palette.tag}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Zari Brocade Type */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                  2. Select Zari Border Weave:
                </label>
                <div className="space-y-2">
                  {ZARI_OPTIONS.map(z => {
                    const isSelected = selectedZari.code === z.code;
                    return (
                      <button
                        key={z.code}
                        onClick={() => setSelectedZari(z)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-semibold active:scale-95 ${
                          isSelected
                            ? 'border-amber-500 ring-2 ring-amber-300 bg-amber-50/50 text-slate-900 shadow-sm'
                            : 'border-slate-200 text-slate-700 bg-white hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-lg bg-gradient-to-r ${z.color} shadow-sm border border-black/10 flex-shrink-0`}></span>
                          <div className="text-left">
                            <p className="text-xs font-bold text-slate-900">{z.name}</p>
                            <p className="text-[10px] text-slate-500 font-normal">Authentic Handloom Metallic Sheen</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Girl's Age Selection */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    3. Select Girl's Age:
                  </label>
                  <span className="text-[10px] text-temple-crimson font-bold flex items-center gap-1">
                    <Ruler className="w-3 h-3" /> Custom Blouse Tailored to Age
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {['2-3 Yrs', '4-5 Yrs', '6-8 Yrs', '9-11 Yrs', '12-14 Yrs', '15-18 Yrs'].map(age => (
                    <button
                      key={age}
                      onClick={() => setSelectedAge(age)}
                      className={`py-2 px-1 text-center rounded-xl text-[11px] font-bold active:scale-95 transition-all ${
                        selectedAge === age
                          ? 'bg-temple-crimson text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Action CTA */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-temple-crimson">
                      {formatPrice(4999)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(6590)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      24% Off Custom
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Includes Pre-pleated Drape + Custom Blouse + Silk Mark
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCustomOrder}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-2xl rani-gradient-bg text-white text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 hover:brightness-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Custom Drape</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=Hi%20Harivillu%20Team!%20I%20would%20like%20to%20order%20the%20custom%20drape:%20${encodeURIComponent(selectedSilk.name)}%20with%20${encodeURIComponent(selectedZari.name)}%20for%20age%20${encodeURIComponent(selectedAge)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 active:scale-95 transition-colors shadow-xs"
                    title="Send customization to WhatsApp stylist"
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
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

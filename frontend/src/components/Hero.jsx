import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Play, Shield, Clock, HeartHandshake, Eye, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const HERO_SLIDES = [
  {
    title: 'Pure Kanchipuram Silks, Handcrafted for Young Royalty',
    tagline: 'FEATHER-LIGHT WEAVES • ZERO-ITCH COTTON LINING',
    description: 'Introducing Harivillu’s royal festive collection for girls aged 2 to 18 years. Handwoven with authentic gold zari and kid-safe soft finishes.',
    ctaText: 'Explore Royal Silks',
    category: 'kanchi-silks',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    accent: 'bg-emerald-800'
  },
  {
    title: '60-Second Ready-to-Wear Sarees for Little Darlings',
    tagline: 'PRE-PLEATED PLEATS • VELCRO CLASP • NO PINS',
    description: 'Let your little princess twirl and dance without slipping or tripping! Pre-stitched pallu and comfortable elastic waistband designed for active kids.',
    ctaText: 'Shop 1-Min Sarees',
    category: 'ready-to-wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    accent: 'bg-temple-crimson'
  },
  {
    title: 'Celebrate Heritage: Mother & Daughter Matching Weaves',
    tagline: 'TWINNING IN TIMELESS SILK • SILK MARK CERTIFIED',
    description: 'Create unforgettable lifelong memories with heirloom sarees handwoven in matching Kanchi patterns for mothers and daughters.',
    ctaText: 'View Mother-Daughter Duo',
    category: 'twinning-combos',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85',
    accent: 'bg-rose-900'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchCoords, setTouchCoords] = useState(null);
  const { setSelectedCategory, setQuickViewProduct, products, addToCart, formatPrice } = useShop();

  const featuredProduct = products[0]; // Mayura Peacock Saree

  // Auto advance slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Safe Horizontal Swipe Gesture Handlers (Allows 100% natural vertical up/down scrolling)
  const handleTouchStart = (e) => {
    if (e.targetTouches.length === 1) {
      setTouchCoords({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchCoords || e.changedTouches.length === 0) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = touchCoords.x - endX;
    const diffY = touchCoords.y - endY;

    // Only swipe if horizontal motion was substantially greater than vertical motion
    if (Math.abs(diffX) > Math.abs(diffY) * 1.5 && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // swipe left -> next
        setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
      } else {
        // swipe right -> prev
        setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
    }
    setTouchCoords(null);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F5ECE0] pt-4 sm:pt-6 pb-12 lg:pb-24 border-b border-amber-900/10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >

      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-1/3 right-5 w-72 sm:w-96 h-72 sm:h-96 bg-amber-200/50 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* Left Column: Headline & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">

            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-[11px] font-bold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 fill-amber-500 animate-bounce" />
              <span>{slide.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.2] sm:leading-[1.15] tracking-tight">
              {slide.title.split(',')[0]},
              <span className="block italic text-temple-crimson font-serif font-normal mt-0.5 sm:mt-1">
                {slide.title.split(',')[1] || 'Woven for Celebrations'}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              {slide.description}
            </p>

            {/* Mobile Actions */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={() => {
                  setSelectedCategory(slide.category);
                  document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-none px-6 py-3 rounded-full rani-gradient-bg text-white font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  document.getElementById('drape-guide')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-3 rounded-full bg-white/95 text-slate-800 font-semibold text-xs sm:text-sm border border-amber-800/20 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-rose-700" />
                </div>
                <span>1-Min Drape Video</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-amber-900/10">
              <div className="flex items-center sm:items-start gap-1.5 sm:gap-2.5">
                <div className="p-1.5 sm:p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">1-Min Drape</h4>
                  <p className="hidden sm:block text-[10px] text-slate-500">Kid-safe velcro</p>
                </div>
              </div>

              <div className="flex items-center sm:items-start gap-1.5 sm:gap-2.5">
                <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Silk Mark</h4>
                  <p className="hidden sm:block text-[10px] text-slate-500">100% pure silk</p>
                </div>
              </div>

              <div className="flex items-center sm:items-start gap-1.5 sm:gap-2.5">
                <div className="p-1.5 sm:p-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                  <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-700" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Soft Lining</h4>
                  <p className="hidden sm:block text-[10px] text-slate-500">Pure cotton inner</p>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-7 bg-temple-crimson' : 'w-2 bg-slate-300'
                    }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative mt-2 sm:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                <div className="relative h-[300px] sm:h-[460px] w-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Floating Live badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-2.5"></span>
                    <span>Live Weavers Spotlight</span>
                  </div>

                  {/* Floating Viewers */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-600/90 text-white text-[10px] font-bold">
                    <Eye className="w-3 h-3" />
                    <span>24 Viewing</span>
                  </div>

                  {/* Product overlay bottom */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200/80 shadow-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] font-bold text-slate-800">4.9</span>
                        <span className="text-[9px] text-slate-500">(142)</span>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        In Stock (3 left)
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {featuredProduct.name}
                    </h3>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-extrabold text-temple-crimson">
                          {formatPrice(featuredProduct.price)}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          {formatPrice(featuredProduct.originalPrice)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setQuickViewProduct(featuredProduct)}
                          className="px-2.5 py-1 rounded-lg border border-slate-300 text-slate-700 text-[11px] font-semibold"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={() => addToCart(featuredProduct, '7-9 Yrs')}
                          className="px-3 py-1 rounded-lg rani-gradient-bg text-white text-[11px] font-bold active:scale-95"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

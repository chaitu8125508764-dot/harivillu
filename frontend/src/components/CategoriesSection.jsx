import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';

const AGE_SEGMENTS = [
  { label: 'All Ages', value: 'all', desc: 'Full Range' },
  { label: '2 - 5 Yrs', value: '2-5', desc: 'Tiny Darlings' },
  { label: '6 - 9 Yrs', value: '6-9', desc: 'Festive Weaves' },
  { label: '10 - 14 Yrs', value: '10-14', desc: 'Half-Sarees' },
  { label: '15 - 18 Yrs', value: '15-18', desc: 'Grand Silks' },
  { label: 'Mom & Me', value: 'twinning', desc: 'Matching Sets' }
];

export default function CategoriesSection() {
  const { setSelectedCategory, selectedCategory, selectedAgeFilter, setSelectedAgeFilter } = useShop();

  return (
    <section id="categories-section" className="py-10 sm:py-16 bg-[#FAF7F2] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-[11px] font-bold tracking-wider uppercase mb-2">
            <Sparkles className="w-3 h-3 text-rose-700" />
            Curated For Every Milestone
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            Shop By Collection & Age
          </h2>
          <p className="mt-1 text-slate-600 text-xs sm:text-sm">
            Handcrafted for toddlers to young adults with customizable blouse fits.
          </p>
        </div>

        {/* Age Filter Quick-Pill Switcher (Mobile Swipeable) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-3 mb-6 no-scrollbar mobile-touch-scroll">
          {AGE_SEGMENTS.map(seg => {
            const isActive = (seg.value === 'all' && selectedAgeFilter === 'all' && selectedCategory !== 'twinning-combos') ||
                             (seg.value === 'twinning' && selectedCategory === 'twinning-combos') ||
                             selectedAgeFilter === seg.value;

            return (
              <button
                key={seg.value}
                onClick={() => {
                  if (seg.value === 'twinning') {
                    setSelectedCategory('twinning-combos');
                    setSelectedAgeFilter('all');
                  } else {
                    setSelectedAgeFilter(seg.value);
                    if (selectedCategory === 'twinning-combos') setSelectedCategory('all');
                  }
                  document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border active:scale-95 ${
                  isActive
                    ? 'bg-temple-crimson text-white border-temple-crimson shadow-md'
                    : 'bg-white text-slate-700 border-amber-900/15 hover:bg-amber-50/50'
                }`}
              >
                <span>{seg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Swipeable Card Carousel / Desktop 5-Col Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar mobile-touch-scroll pb-2">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-shrink-0 w-44 sm:w-auto mobile-snap-item group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-amber-200/60 bg-white active:scale-95"
            >
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                
                {/* Age Pill Badge */}
                <span className="absolute top-2.5 left-2.5 bg-white/95 text-slate-900 text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow">
                  {cat.ageGroup}
                </span>

                {/* Arrow Icon */}
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/80 text-slate-800 flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>

                {/* Card Content Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[9px] uppercase font-bold text-amber-300 tracking-wider">
                    {cat.count}
                  </span>
                  <h3 className="text-sm font-bold font-serif leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

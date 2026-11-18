import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    selectedAgeFilter, 
    setSelectedAgeFilter,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [sortBy, setSortBy] = useState('featured');
  const [onlyReadyToWear, setOnlyReadyToWear] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedAgeFilter !== 'all') {
        const hasAge = p.ageGroups.some(ag => ag.includes(selectedAgeFilter.replace('-', '')));
        if (!hasAge && selectedAgeFilter !== 'twinning') return false;
      }
      if (onlyReadyToWear && !p.readyToWear) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchName && !matchFabric && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, selectedAgeFilter, onlyReadyToWear, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedAgeFilter('all');
    setOnlyReadyToWear(false);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedAgeFilter !== 'all' || onlyReadyToWear || searchQuery !== '';

  return (
    <section id="featured-collection" className="py-8 sm:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-amber-900/10">
        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Pure Silk Mark Authenticated
          </div>
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-slate-900">
            {selectedCategory === 'all' 
              ? 'Featured Girls Sarees' 
              : selectedCategory === 'ready-to-wear'
                ? '60-Sec Ready-to-Wear'
                : selectedCategory === 'pattu-half-sarees'
                  ? 'Kanchi Pattu Half-Sarees'
                  : selectedCategory === 'kanchi-silks'
                    ? 'Pure Handloom Silks'
                    : selectedCategory === 'twinning-combos'
                      ? 'Mother & Daughter Duos'
                      : 'Airy Organza Drapes'}
          </h2>
          <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> master handloom weaves
          </p>
        </div>

        {/* Sorting & Filter Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 overflow-x-auto no-scrollbar pb-1">
          {/* 1-Min Ready to wear quick switch */}
          <button
            onClick={() => setOnlyReadyToWear(!onlyReadyToWear)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border flex items-center gap-1 whitespace-nowrap active:scale-95 ${
              onlyReadyToWear
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            <Zap className="w-3 h-3 fill-slate-950" />
            <span>1-Min Drape</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm whitespace-nowrap">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
              aria-label="Sort sarees by"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">Active:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              {selectedCategory}
              <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedCategory('all')} />
            </span>
          )}
          {selectedAgeFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-900 text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              {selectedAgeFilter}
              <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedAgeFilter('all')} />
            </span>
          )}
          {onlyReadyToWear && (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              1-Min Only
              <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setOnlyReadyToWear(false)} />
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
              "{searchQuery}"
              <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSearchQuery('')} />
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-[10px] text-temple-crimson underline font-bold whitespace-nowrap ml-1"
          >
            Clear
          </button>
        </div>
      )}

      {/* Product Cards Grid: 2-col on Mobile, 4-col on Desktop */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 mt-5 sm:mt-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 mt-6 p-6">
          <p className="text-sm font-semibold text-slate-700">No sarees match your criteria.</p>
          <button
            onClick={clearAllFilters}
            className="mt-3 px-4 py-2 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
}

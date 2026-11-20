import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  X, 
  Phone, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  Menu, 
  Compass,
  MessageCircle,
  Truck,
  ArrowLeft,
  User
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const { 
    currentView,
    setCurrentView,
    totalCartCount, 
    cartSubtotal, 
    wishlist, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery,
    currency,
    setCurrency,
    currencies,
    formatPrice,
    setSelectedCategory,
    products,
    setQuickViewProduct
  } = useShop();

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Filter products for quick search dropdown
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const POPULAR_SEARCHES = ['1-Min Saree', 'Kanchi Pattu', 'Half Saree', 'Rani Pink', 'Mother Daughter'];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm transition-all duration-300">
      
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-temple-crimson via-rani-800 to-temple-crimson text-white text-[11px] py-1.5 px-3 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full border border-amber-300/30 text-[10px] font-bold">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              FLAT 20% OFF
            </span>
            <span className="text-pink-100 truncate">
              CODE: <strong className="text-amber-300">HARIVILLU20</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[10px]">
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-200">
              <Truck className="w-3 h-3" /> Free Express Shipping Over ₹2,500
            </span>

            {/* Currency Selector */}
            <div className="relative inline-flex items-center">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-black/40 text-amber-200 border border-amber-400/30 rounded px-1.5 py-0.5 text-[10px] focus:outline-none cursor-pointer"
                aria-label="Currency"
              >
                {Object.keys(currencies).map(c => (
                  <option key={c} value={c} className="bg-slate-900 text-white">
                    {c} ({currencies[c].symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand Header */}
      <nav className="glass-header border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-4">
            
            {/* Brand Logo */}
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none" 
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 shadow-md flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full rounded-full bg-white overflow-hidden p-0.5 flex items-center justify-center shadow-inner">
                  <img
                    src="/images/harivillu-logo.jpg"
                    alt="Harivillu Collections"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-temple-maroon">
                    Harivillu
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-800 px-1.5 py-0.2 bg-amber-50 rounded border border-amber-300">
                    Collections
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[10px] tracking-wider text-slate-500 uppercase font-medium">
                  Pure Silk & Ready-to-Wear Girls Ethnic Drapes
                </span>
              </div>
            </div>

            {/* Desktop Search Input */}
            <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search pure silk sarees, 1-min drapes, half-sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 bg-white/90 border border-amber-900/20 rounded-full text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rani-500 shadow-inner"
                />
                <Search className="w-4 h-4 text-amber-800/60 absolute left-3.5 top-2.5" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-amber-200 p-3 z-50">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-2 mb-2">
                    Matching Sarees ({searchResults.length})
                  </div>
                  <div className="space-y-1">
                    {searchResults.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setQuickViewProduct(p);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-rose-50/60 rounded-xl cursor-pointer transition-colors"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-lg border border-amber-200" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-500">{p.fabric}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-rani-700">{formatPrice(p.price)}</span>
                            <span className="text-[10px] text-slate-400 line-through">{formatPrice(p.originalPrice)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2 text-slate-700 hover:text-rani-600 active:scale-90 transition-transform"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* WhatsApp Live Stylist (Desktop) */}
              <a
                href="https://wa.me/?text=Hi%20Harivillu%20Team!%20I%20would%20like%20assistance%20picking%20a%20girl%20saree"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Live Stylist</span>
              </a>

              {/* User Profile Button (Desktop & Mobile) */}
              <button
                onClick={() => {
                  setCurrentView(currentView === 'profile' ? 'home' : 'profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative p-2 sm:p-2.5 rounded-full transition-all active:scale-90 ${
                  currentView === 'profile'
                    ? 'text-temple-crimson bg-amber-100 ring-2 ring-amber-400/60 shadow-sm'
                    : 'text-slate-700 hover:text-rani-600 hover:bg-rose-50'
                }`}
                aria-label="Profile and Orders"
                title="My Profile & Sizing Vault"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline text-xs font-semibold ml-1.5">
                  {currentView === 'profile' ? 'Home' : 'Profile'}
                </span>
              </button>

              {/* Wishlist Button (Desktop) */}
              <button
                onClick={() => {
                  const el = document.getElementById('featured-collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hidden sm:inline-flex relative p-2.5 rounded-full text-slate-700 hover:text-rani-600 hover:bg-rose-50 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rani-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-3 sm:py-2 rounded-full rani-gradient-bg text-white shadow-md active:scale-95 transition-transform"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
                  <span className="text-[10px] font-medium text-pink-100">Bag ({totalCartCount})</span>
                  <span className="text-xs font-bold text-amber-200">{formatPrice(cartSubtotal)}</span>
                </div>
                {totalCartCount > 0 && (
                  <span className="sm:hidden text-[10px] font-extrabold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Desktop Category Bar */}
        <div className="hidden lg:block border-t border-amber-900/10 bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 text-xs font-semibold tracking-wide text-slate-700 space-x-6">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-rani-700 transition-colors"
              >
                🌟 All Collections
              </button>
              
              <button
                onClick={() => {
                  setSelectedCategory('ready-to-wear');
                  document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-rani-700 transition-colors flex items-center gap-1.5 text-temple-crimson"
              >
                <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">HOT</span>
                1-Min Ready to Wear (2-8Y)
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('pattu-half-sarees');
                  document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-rani-700 transition-colors"
              >
                Pattu Pavadai & Langa Voni
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('kanchi-silks');
                  document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-rani-700 transition-colors"
              >
                Pure Kanchipuram Silks (8-18Y)
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('twinning-combos');
                  document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-rani-700 transition-colors"
              >
                Mother & Daughter Duos
              </button>

              <button
                onClick={() => {
                  document.getElementById('virtual-studio')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-amber-700 font-bold hover:text-amber-900 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                Virtual Drape Studio
              </button>

              <button
                onClick={() => {
                  document.getElementById('drape-guide')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-slate-500 hover:text-slate-800 transition-colors"
              >
                Kids Drape Guide
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-200">
          {/* Mobile Search Header */}
          <div className="p-3 border-b border-slate-200 flex items-center gap-2 bg-[#FAF7F2]">
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                autoFocus
                placeholder="Search girls sarees, half-sarees, silks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rani-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {searchQuery.trim() === '' ? (
              <div>
                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map(term => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-temple-crimson"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Found ({searchResults.length}) Results
                </p>
                {searchResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setQuickViewProduct(p);
                      setIsMobileSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200 active:bg-rose-50"
                  >
                    <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{p.name}</p>
                      <p className="text-[11px] text-slate-500">{p.fabric}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-temple-crimson">{formatPrice(p.price)}</span>
                        <span className="text-[10px] text-slate-400 line-through">{formatPrice(p.originalPrice)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                No matching sarees found for "{searchQuery}".
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
}

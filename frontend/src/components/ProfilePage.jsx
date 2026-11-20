import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Gift, 
  Crown, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Scissors, 
  Copy, 
  Check, 
  MessageCircle, 
  ChevronRight,
  Ruler,
  LogOut
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProfilePage() {
  const { 
    userProfile, 
    setCurrentView, 
    logout,
    addChildProfile, 
    removeChildProfile, 
    wishlist, 
    products, 
    addToCart, 
    formatPrice, 
    showToast 
  } = useShop();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'princesses' | 'wishlist' | 'addresses' | 'rewards'
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState('');

  // Form state for new child profile
  const [childForm, setChildForm] = useState({
    name: '',
    relation: 'Daughter',
    age: '6 Yrs',
    height: '110 cm',
    waist: '20 in',
    blouseChest: '22 in',
    skirtLength: '24 in',
    notes: 'Sensitive skin - 100% soft cotton cambric lining'
  });

  const handleCreateChildProfile = (e) => {
    e.preventDefault();
    if (!childForm.name.trim()) return;
    addChildProfile(childForm);
    setChildForm({
      name: '',
      relation: 'Daughter',
      age: '6 Yrs',
      height: '110 cm',
      waist: '20 in',
      blouseChest: '22 in',
      skirtLength: '24 in',
      notes: ''
    });
    setShowAddChildModal(false);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    showToast(`Coupon code ${code} copied!`);
    setTimeout(() => setCopiedCoupon(''), 2000);
  };

  // Filter wishlisted products
  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Return to Shop button */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-amber-900/10 mb-6">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-temple-crimson active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shopping</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              Harivillu Collections VIP Member Portal
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-temple-crimson hover:bg-rose-100 font-semibold text-xs border border-rose-200 transition-colors shadow-xs active:scale-95"
              title="Sign out of your VIP account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* User Profile Grand Card */}
        <div className="rounded-3xl bg-gradient-to-r from-temple-crimson via-rani-900 to-slate-900 p-5 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Avatar & Info */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-600 shadow-xl flex-shrink-0">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-2 border-white">
                  <User className="w-9 h-9 text-amber-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow border border-white">
                  <Crown className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {userProfile.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    {userProfile.memberTier}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-pink-100/80 mt-1.5">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-amber-300" /> {userProfile.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> {userProfile.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Loyalty Quick Stat Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Orders</span>
                <span className="text-base font-bold text-white">{userProfile.orderHistory.length}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Silk Coins</span>
                <span className="text-base font-bold text-white">{userProfile.silkCoins}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Princesses</span>
                <span className="text-base font-bold text-white">{userProfile.children.length}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Wishlisted</span>
                <span className="text-base font-bold text-white">{wishlist.length}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-slate-200">
          {[
            { id: 'orders', label: 'My Orders', icon: Package, count: userProfile.orderHistory.length },
            { id: 'princesses', label: 'Little Princesses Sizing', icon: Scissors, count: userProfile.children.length },
            { id: 'wishlist', label: 'Saved Sarees', icon: Heart, count: wishlist.length },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
            { id: 'rewards', label: 'Coins & Coupons', icon: Gift, count: '20% OFF' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 border ${
                  isActive
                    ? 'bg-temple-crimson text-white border-temple-crimson shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders Content */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold text-slate-900">
                Order History & Live Courier Tracking
              </h2>
              <span className="text-xs text-slate-500">Showing {userProfile.orderHistory.length} orders</span>
            </div>

            <div className="space-y-3">
              {userProfile.orderHistory.map(order => (
                <div
                  key={order.orderNumber}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-temple-crimson bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          #{order.orderNumber}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {order.date}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {order.productName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Age: <strong className="text-slate-800">{order.ageGroup}</strong></span>
                        <span>•</span>
                        <span>Tracking: <code className="text-amber-800 font-bold">{order.trackingId}</code></span>
                      </div>
                      <div className="pt-0.5">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-900 animate-pulse'
                        }`}>
                          <ShieldCheck className="w-3 h-3" /> {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-2">
                    <span className="text-base font-serif font-bold text-slate-900">
                      {formatPrice(order.amount)}
                    </span>
                    <a
                      href={`https://wa.me/?text=Hi%20Harivillu!%20Please%20update%20me%20on%20my%20order%20%23${order.orderNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-800 hover:text-temple-crimson text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Track on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Little Princesses Sizing Profiles */}
        {activeTab === 'princesses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900">
                  My Little Princesses (Custom Sizing Profiles)
                </h2>
                <p className="text-xs text-slate-500">
                  Save your daughters' and family girls' exact height and waist measurements for 1-click tailored fit.
                </p>
              </div>

              <button
                onClick={() => setShowAddChildModal(true)}
                className="px-3.5 py-2 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow flex items-center gap-1.5 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Princess</span>
              </button>
            </div>

            {/* Princess Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProfile.children.map(child => (
                <div
                  key={child.id}
                  className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-base shadow-inner">
                        👑
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-base font-bold text-slate-900">{child.name}</h3>
                          <span className="text-[10px] font-bold text-temple-crimson bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            {child.relation} • {child.age}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Custom Tailored Profile</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeChildProfile(child.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Measurements Matrix */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                    <div className="p-2 bg-[#FAF7F2] rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block font-semibold">Height</span>
                      <strong className="text-slate-800">{child.height}</strong>
                    </div>
                    <div className="p-2 bg-[#FAF7F2] rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block font-semibold">Waist</span>
                      <strong className="text-slate-800">{child.waist}</strong>
                    </div>
                    <div className="p-2 bg-[#FAF7F2] rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 block font-semibold">Skirt Length</span>
                      <strong className="text-slate-800">{child.skirtLength}</strong>
                    </div>
                  </div>

                  {child.notes && (
                    <div className="mt-3 text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-xl border border-amber-200">
                      💡 <strong>Tailor Note:</strong> {child.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal: Add Child Profile */}
            {showAddChildModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                    Add Princess Sizing Profile
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Enter your child's measurements so our weavers and tailors stitch the perfect fit.
                  </p>

                  <form onSubmit={handleCreateChildProfile} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Child Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ananya"
                          value={childForm.name}
                          onChange={(e) => setChildForm({ ...childForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-temple-crimson"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Age</label>
                        <select
                          value={childForm.age}
                          onChange={(e) => setChildForm({ ...childForm, age: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                        >
                          {['2 Yrs', '3 Yrs', '4 Yrs', '5 Yrs', '6 Yrs', '7 Yrs', '8 Yrs', '9 Yrs', '10-12 Yrs', '13-16 Yrs'].map(a => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Height</label>
                        <input
                          type="text"
                          placeholder="110 cm"
                          value={childForm.height}
                          onChange={(e) => setChildForm({ ...childForm, height: e.target.value })}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Waist</label>
                        <input
                          type="text"
                          placeholder="20 in"
                          value={childForm.waist}
                          onChange={(e) => setChildForm({ ...childForm, waist: e.target.value })}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Skirt Length</label>
                        <input
                          type="text"
                          placeholder="24 in"
                          value={childForm.skirtLength}
                          onChange={(e) => setChildForm({ ...childForm, skirtLength: e.target.value })}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Comfort Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Soft cotton inner lining only"
                        value={childForm.notes}
                        onChange={(e) => setChildForm({ ...childForm, notes: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                      />
                    </div>

                    <div className="flex gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowAddChildModal(false)}
                        className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow"
                      >
                        Save Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-slate-900">
              Saved Silk Sarees ({wishlistedItems.length})
            </h2>

            {wishlistedItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                <Heart className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No sarees saved in your vault yet.</p>
                <button
                  onClick={() => setCurrentView('home')}
                  className="mt-3 px-4 py-2 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow"
                >
                  Explore Sarees
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistedItems.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200 p-3 flex gap-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                        <p className="text-[11px] text-slate-500">{product.fabric}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-bold text-temple-crimson">{formatPrice(product.price)}</span>
                          <span className="text-[10px] text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product, product.ageGroups[0])}
                        className="w-full py-1.5 rounded-lg rani-gradient-bg text-white text-[11px] font-bold shadow active:scale-95 transition-all mt-2"
                      >
                        Move to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Delivery Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <h2 className="text-lg font-serif font-bold text-slate-900">Saved Delivery Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProfile.addresses.map(addr => (
                <div key={addr.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-temple-crimson" /> {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {addr.address}<br />
                    {addr.city}, {addr.state} — {addr.pincode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Silk Coins & Coupons */}
        {activeTab === 'rewards' && (
          <div className="space-y-5">
            {/* Coins Balance Box */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-6 text-slate-950 shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-950">Harivillu Royalty Coins</span>
                <div className="text-3xl font-serif font-extrabold mt-1">450 Coins</div>
                <p className="text-xs text-amber-900 mt-0.5">Worth ₹450 • Automatically deductible at checkout</p>
              </div>
              <Sparkles className="w-12 h-12 text-amber-900/40" />
            </div>

            {/* Coupons Grid */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Active Festive Promo Codes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl border border-amber-300 p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-mono text-sm font-bold text-temple-crimson">HARIVILLU20</div>
                    <p className="text-xs text-slate-600 mt-0.5">Flat 20% Off on entire pure silk cart</p>
                  </div>
                  <button
                    onClick={() => copyCode('HARIVILLU20')}
                    className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1"
                  >
                    {copiedCoupon === 'HARIVILLU20' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCoupon === 'HARIVILLU20' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-mono text-sm font-bold text-slate-800">FIRST10</div>
                    <p className="text-xs text-slate-600 mt-0.5">Welcome gift: 10% Off first order</p>
                  </div>
                  <button
                    onClick={() => copyCode('FIRST10')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                  >
                    {copiedCoupon === 'FIRST10' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCoupon === 'FIRST10' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

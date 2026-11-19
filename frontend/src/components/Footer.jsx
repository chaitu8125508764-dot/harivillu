import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Truck, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { setSelectedCategory, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
      showToast('Welcome to Harivillu VIP Club! Coupon code unlocked 🎉');
    }
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('HARIVILLU20');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    showToast('Code HARIVILLU20 copied to clipboard!');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top VIP Club Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-temple-crimson via-rose-950 to-slate-900 p-8 sm:p-10 border border-amber-500/30 mb-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" /> Harivillu Royalty Club
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Unlock Flat 20% Off On Your First Pure Silk Order
              </h3>
              <p className="text-xs sm:text-sm text-pink-100 max-w-lg">
                Join our private circle of over 12,000 mothers. Receive first access to limited festive handloom drops and auspicious festive dates.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-amber-300/40 text-center space-y-2">
                  <p className="text-xs font-semibold text-emerald-400">✨ You are in! Use this secret coupon code:</p>
                  <div className="flex items-center justify-center gap-2 bg-black/40 py-2 px-4 rounded-xl">
                    <span className="font-mono text-base font-bold text-amber-300 tracking-wider">HARIVILLU20</span>
                    <button
                      onClick={copyCoupon}
                      className="p-1 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
                      title="Copy Code"
                    >
                      {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-md"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>Claim 20%</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Ethos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 shadow-md flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full rounded-full bg-white overflow-hidden p-0.5 flex items-center justify-center shadow-inner">
                  <img
                    src="/images/harivillu-logo.jpg"
                    alt="Harivillu Collections Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  Harivillu Collections
                </span>
                <span className="text-[10px] text-amber-300 font-medium tracking-widest uppercase">
                  Pure Handloom Silk Heritage
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-amber-300">Harivillu</strong> (హరివిల్లు) signifies the divine rainbow in Telugu. We handcraft authentic pure silk sarees, ready-to-wear pre-pleated drapes, and festive half-sarees for young girls and teens, preserving handloom heritage with effortless modern comfort.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Silk Mark Certified Weavers Consortium • Government of India</span>
            </div>
          </div>

          {/* Quick Collections */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-300">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('ready-to-wear'); document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  60-Sec Ready to Wear (2-8Y)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('pattu-half-sarees'); document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Pattu Pavadai & Langa Voni
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('kanchi-silks'); document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Pure Kanchipuram Handloom Silks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('twinning-combos'); document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Mother & Daughter Twinning Sets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('organza-party'); document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Pastel Floral Organza Drapes
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-300">
              Support & Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#drape-guide" className="hover:text-amber-300 transition-colors">
                  How 1-Minute Saree Works
                </a>
              </li>
              <li>
                <a href="#virtual-studio" className="hover:text-amber-300 transition-colors">
                  Virtual Color Matcher Studio
                </a>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  Girls Sizing & Growth Chart
                </span>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  7-Day Domestic & Global Returns
                </span>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  Track Your Courier Order
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Live Video */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 text-amber-300">
              Stylist Concierge
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +91 98480 22338</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>support@harivillusarees.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>Heritage Loom Studio, Jubilee Hills, Hyderabad, India</span>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-white/5 rounded-lg text-[11px] text-amber-200 border border-white/10">
                  Global Shipping to USA, UK, Canada, Australia & Singapore
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Harivillu Girls Sarees. Crafted with pure love for Indian Handloom & Traditions.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">UPI</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">RuPay</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">Visa</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">Mastercard</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">NetBanking</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-semibold text-[10px] text-slate-300">PayPal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

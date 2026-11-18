import React from 'react';
import { ShoppingBag, X, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function LiveNotificationToast() {
  const { liveActivity, showLiveActivity, setShowLiveActivity, toastNotification } = useShop();

  return (
    <>
      {/* Dynamic Toast Feedback (e.g. Added to Cart / Wishlist) */}
      {toastNotification && (
        <div className="fixed top-16 sm:top-24 right-3 sm:right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300 max-w-[90vw]">
          <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-2xl shadow-2xl border border-amber-400/30 flex items-center gap-2.5 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{toastNotification.message}</span>
          </div>
        </div>
      )}

      {/* Real-time Purchase Social Proof Ticker (Bottom Left, Elevated Above Mobile Nav) */}
      {showLiveActivity && liveActivity && (
        <div className="fixed bottom-20 sm:bottom-5 left-3 sm:left-5 z-30 max-w-[92vw] sm:max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-2xl border border-amber-200/80 flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500">
                <span className="font-bold text-slate-900 truncate">{liveActivity.name}</span>
                <span>•</span>
                <span className="truncate">{liveActivity.location}</span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-800 truncate mt-0.5">
                Purchased <span className="text-temple-crimson">{liveActivity.product}</span>
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] text-slate-400">{liveActivity.time}</span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded flex items-center gap-0.5">
                  <CheckCircle className="w-2.5 h-2.5" /> Verified
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowLiveActivity(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
              aria-label="Dismiss purchase notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

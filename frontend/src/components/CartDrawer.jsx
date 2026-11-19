import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    isFreeShipping, 
    freeShippingThreshold, 
    cartTotal, 
    coupon, 
    couponInput, 
    setCouponInput, 
    couponError, 
    applyCouponCode, 
    formatPrice 
  } = useShop();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderPlaced(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-[#FAF7F2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-temple-crimson" />
              <h2 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 active:scale-90 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-4 py-2.5 bg-amber-50/70 border-b border-amber-200/60">
            <div className="flex items-center justify-between text-[11px] font-semibold text-amber-900 mb-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                {isFreeShipping 
                  ? '🎉 FREE Express Delivery Unlocked!' 
                  : `Add ${formatPrice(freeShippingRemaining)} for FREE Delivery`}
              </span>
            </div>
            <div className="w-full bg-amber-200/60 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            
            {orderPlaced ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Dhanyavadagalu! Order Placed!
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your Harivillu pure silk order has been received with complimentary custom stitching.
                </p>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                  Order ID: #HVS-88492 • Updates sent via WhatsApp
                </div>
                <button
                  onClick={() => {
                    setOrderPlaced(false);
                    setIsCartOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl rani-gradient-bg text-white text-xs font-bold shadow"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-base font-bold text-slate-800">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our pure silk and ready-to-wear drapes for young girls.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2 rounded-full rani-gradient-bg text-white text-xs font-bold shadow"
                >
                  Explore New Arrivals
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {cart.map(item => (
                  <div
                    key={item.cartItemId}
                    className="p-2.5 bg-white rounded-xl border border-slate-200 flex gap-2.5 shadow-sm"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">
                            {item.selectedAge}
                          </span>
                          <span className="text-[10px] text-slate-500 truncate">
                            {item.selectedColor}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-100">
                        {/* Stepper with enlarged touch areas */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            className="px-2.5 py-1 text-slate-600 active:bg-slate-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            className="px-2.5 py-1 text-slate-600 active:bg-slate-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-temple-crimson">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code Box */}
            {cart.length > 0 && !orderPlaced && (
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-amber-900/10 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Promo Code
                  </span>
                  {coupon.applied && (
                    <span className="text-[9px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                      "{coupon.code}" (-{coupon.discount}%)
                    </span>
                  )}
                </div>

                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="HARIVILLU20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs uppercase bg-white border border-slate-300 rounded-lg focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (couponInput) applyCouponCode(couponInput);
                    }}
                    className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg active:scale-95"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-rose-600 font-semibold">{couponError}</p>
                )}
              </div>
            )}

          </div>

          {/* Footer Breakdown & Sticky Checkout CTA */}
          {cart.length > 0 && !orderPlaced && (
            <div className="p-4 border-t border-slate-200 bg-white space-y-2.5 nav-bottom-padding sm:pb-4">
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">{formatPrice(cartSubtotal)}</span>
                </div>
                {coupon.applied && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({coupon.discount}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold text-slate-800">
                    {isFreeShipping ? <strong className="text-emerald-700 font-bold">FREE</strong> : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-base text-temple-crimson">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 rounded-xl rani-gradient-bg text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                {isCheckingOut ? (
                  <span>Processing Checkout...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Encrypted • UPI, Cards, NetBanking, PayPal</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

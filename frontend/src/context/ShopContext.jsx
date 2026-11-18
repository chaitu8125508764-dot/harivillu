import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, LIVE_ACTIVITY_STREAM } from '../data/products';

const ShopContext = createContext();

const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, name: 'INR' },
  USD: { symbol: '$', rate: 0.012, name: 'USD' },
  GBP: { symbol: '£', rate: 0.0094, name: 'GBP' },
  EUR: { symbol: '€', rate: 0.011, name: 'EUR' }
};

export const ShopProvider = ({ children }) => {
  // Load saved Cart & Wishlist
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('harivillu_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('harivillu_wishlist');
      return saved ? JSON.parse(saved) : ['hvs-001', 'hvs-005'];
    } catch {
      return ['hvs-001', 'hvs-005'];
    }
  });

  const [currency, setCurrency] = useState('INR');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState('all');
  const [coupon, setCoupon] = useState({ code: 'HARIVILLU20', discount: 20, applied: true });
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [toastNotification, setToastNotification] = useState(null);

  // Real-time live recent purchase activity ticker
  const [liveActivity, setLiveActivity] = useState(LIVE_ACTIVITY_STREAM[0]);
  const [showLiveActivity, setShowLiveActivity] = useState(true);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('harivillu_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('harivillu_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Real-time purchase simulation every 14 seconds
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % LIVE_ACTIVITY_STREAM.length;
      setLiveActivity(LIVE_ACTIVITY_STREAM[index]);
      setShowLiveActivity(true);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type = 'success') => {
    setToastNotification({ message, type });
    setTimeout(() => setToastNotification(null), 3500);
  };

  const addToCart = (product, age, color, quantity = 1) => {
    const chosenAge = age || (product.ageGroups && product.ageGroups[0]) || 'Standard';
    const chosenColor = color || product.colorName;
    const cartItemId = `${product.id}-${chosenAge}-${chosenColor}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        cartItemId,
        product,
        selectedAge: chosenAge,
        selectedColor: chosenColor,
        quantity
      }];
    });

    showToast(`Added "${product.name}" to your shopping bag!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist! ❤️');
        return [...prev, productId];
      }
    });
  };

  const applyCouponCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HARIVILLU20' || clean === 'DIWALI20') {
      setCoupon({ code: clean, discount: 20, applied: true });
      setCouponError('');
      showToast('Coupon applied! 20% festive discount added 🎉');
      return true;
    } else if (clean === 'FIRST10') {
      setCoupon({ code: clean, discount: 10, applied: true });
      setCouponError('');
      showToast('Welcome gift! 10% discount applied 🎉');
      return true;
    } else {
      setCouponError('Invalid coupon. Try "HARIVILLU20" or "FIRST10"');
      return false;
    }
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = coupon.applied ? Math.round((cartSubtotal * coupon.discount) / 100) : 0;
  const freeShippingThreshold = 2500;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 199;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (inrPrice) => {
    const cur = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = Math.round(inrPrice * cur.rate);
    return `${cur.symbol}${converted.toLocaleString()}`;
  };

  return (
    <ShopContext.Provider value={{
      products: PRODUCTS,
      cart,
      wishlist,
      currency,
      setCurrency,
      currencies: CURRENCIES,
      isCartOpen,
      setIsCartOpen,
      quickViewProduct,
      setQuickViewProduct,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedAgeFilter,
      setSelectedAgeFilter,
      coupon,
      couponInput,
      setCouponInput,
      couponError,
      toastNotification,
      liveActivity,
      showLiveActivity,
      setShowLiveActivity,
      cartSubtotal,
      discountAmount,
      shippingFee,
      isFreeShipping,
      freeShippingThreshold,
      cartTotal,
      totalCartCount,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      applyCouponCode,
      formatPrice,
      showToast
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

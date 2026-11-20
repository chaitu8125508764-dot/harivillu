import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, LIVE_ACTIVITY_STREAM } from '../data/products';

const ShopContext = createContext();

const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, name: 'INR' },
  USD: { symbol: '$', rate: 0.012, name: 'USD' },
  GBP: { symbol: '£', rate: 0.0094, name: 'GBP' },
  EUR: { symbol: '€', rate: 0.011, name: 'EUR' }
};

const DEFAULT_DELIVERY_LOCATION = {
  pincode: '500033',
  area: 'Jubilee Hills',
  city: 'Hyderabad',
  state: 'Telangana',
  deliveryTime: 'Tomorrow, by 2:00 PM',
  isExpress: true,
  expressBadge: '⚡ 24-Hr Express Dispatch'
};

const DEFAULT_USER_PROFILE = {
  name: 'Sowmya Reddy',
  email: 'sowmya.reddy@example.com',
  phone: '+91 98480 22338',
  memberTier: 'Silk Royalty Member',
  silkCoins: 450,
  children: [
    { id: 1, name: 'Ananya', relation: 'Daughter', age: '7 Yrs', height: '118 cm', waist: '22 in', blouseChest: '24 in', skirtLength: '28 in', notes: 'Prefers soft cotton cambric lining' },
    { id: 2, name: 'Diya', relation: 'Niece', age: '4 Yrs', height: '95 cm', waist: '19 in', blouseChest: '21 in', skirtLength: '22 in', notes: 'Prefers 60-second ready-to-wear clasp' }
  ],
  addresses: [
    { id: 1, label: 'Home (Default)', address: 'Plot 42, Jubilee Hills Road No 36', city: 'Hyderabad', state: 'Telangana', pincode: '500033', isDefault: true },
    { id: 2, label: 'Parents / Festival Gifting', address: '14/B Gandhi Road, Maharani Peta', city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530002', isDefault: false }
  ],
  orderHistory: [
    {
      orderNumber: 'HVS-88492',
      date: '15 Nov 2026',
      productName: 'Mayura Peacock Kanchipuram Pure Silk Girl Saree',
      ageGroup: '7-9 Yrs',
      amount: 4499,
      status: 'Delivered',
      trackingId: 'DTDC-9921838',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80'
    },
    {
      orderNumber: 'HVS-73201',
      date: '18 Nov 2026',
      productName: 'Karpaga Swarna Rani Pink Pre-Stitched Half-Saree Set',
      ageGroup: '5-7 Yrs',
      amount: 3899,
      status: 'In Custom Blouse Stitching',
      trackingId: 'BLUE-440219',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80'
    }
  ]
};

export const ShopProvider = ({ children }) => {
  // Navigation View: 'home' | 'profile'
  const [currentView, setCurrentView] = useState('home');

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

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('harivillu_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  // Zepto / Flipkart Delivery Location
  const [deliveryLocation, setDeliveryLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('harivillu_delivery_location');
      return saved ? JSON.parse(saved) : DEFAULT_DELIVERY_LOCATION;
    } catch {
      return DEFAULT_DELIVERY_LOCATION;
    }
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('harivillu_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('harivillu_delivery_location', JSON.stringify(deliveryLocation));
  }, [deliveryLocation]);

  const updateDeliveryLocation = (newLoc) => {
    setDeliveryLocation(newLoc);
    showToast(`📍 Delivering to ${newLoc.area}, ${newLoc.city} (${newLoc.pincode})`, 'success');
  };

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

  const addChildProfile = (childData) => {
    setUserProfile(prev => ({
      ...prev,
      children: [...prev.children, { id: Date.now(), ...childData }]
    }));
    showToast(`Added measurements for ${childData.name}! 👑`);
  };

  const removeChildProfile = (id) => {
    setUserProfile(prev => ({
      ...prev,
      children: prev.children.filter(c => c.id !== id)
    }));
    showToast('Measurements removed', 'info');
  };

  const updateProfileInfo = (updatedInfo) => {
    setUserProfile(prev => ({ ...prev, ...updatedInfo }));
    showToast('Profile updated successfully!');
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
      currentView,
      setCurrentView,
      userProfile,
      deliveryLocation,
      setDeliveryLocation,
      updateDeliveryLocation,
      isLocationModalOpen,
      setIsLocationModalOpen,
      updateProfileInfo,
      addChildProfile,
      removeChildProfile,
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

# Harivillu (హరివిల్లు) — Premium Girls Sarees & Ethnic Drapes

> **"Where Handloom Heritage Meets Young Grace"**  
> An ultra-luxurious, mobile-first, native-app-smooth e-commerce platform for Girls' Sarees, Pattu Pavadai Half-Sarees, and Mother-Daughter Twinnings. Built with **React 18**, **JavaScript (ES6+)**, **Tailwind CSS**, and **Vite**.

---

## 📱 Native App-Smooth Mobile Architecture (10 Senior Perspectives)

| # | Senior Specialist Perspective | Mobile Implementation in Harivillu |
|---|---|---|
| 1 | **Senior Mobile UX Architect** | **Glass Bottom Navigation Bar** fixed at the bottom with thumb-friendly zones (Home, Explore, Studio, Saved, Bag with live subtotal). |
| 2 | **Senior Gesture & Touch Engineer** | **Swipe Gestures**: Touch gesture swipe on hero banners (`onTouchStart`/`onTouchEnd`), horizontal snap-scrolling (`snap-x mandatory`) on categories, and 44px minimum tap targets. |
| 3 | **Senior Mobile Merchandising Lead** | **Instagram/Myntra Style Story Rings**: Horizontal circular highlights bar with glowing gradient rings ("1-Min Drape", "Half Sarees", "Pure Silks", "Mom & Me", "Color Lab"). |
| 4 | **Senior Mobile Conversion (CRO) Lead** | 2-column mobile card grid with instant touch Add-to-Bag, live free delivery meter, and coupon code celebration. |
| 5 | **Senior Mobile Sheet Architect** | **Native Bottom Sheet Modals**: Quick View and filters open as smooth bottom sheets with grab handles on mobile screens instead of centered popups. |
| 6 | **Senior Mobile Search Specialist** | Full-screen mobile search takeover with popular searches chips and real-time live product thumbnail search results. |
| 7 | **Senior Mobile Performance Specialist** | 60fps hardware-accelerated transforms, `touch-action: manipulation` (no 300ms mobile tap delay), and `viewport-fit=cover`. |
| 8 | **Senior Mobile Ergonomics Lead** | Bottom-safe padding (`pb-safe`) protecting against iOS home indicator bar and Android navigation bars. |
| 9 | **Senior Mobile Social Proof Lead** | Non-intrusive purchase notification stream dynamically floating above the bottom navigation bar (`bottom-20` on mobile). |
| 10 | **Senior Mobile VIP Concierge Lead** | 1-touch **WhatsApp Live Video Shopping** button connecting directly to weavers and drapers. |

---

## 🛠️ Project Structure

```
harivillu/
├── backend/                  # Ready for future backend / payment webhooks
└── frontend/                 # React + Vite + Tailwind Application
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx              # Mobile search overlay, compact logo, currency selector
    │   │   ├── MobileStoriesBar.jsx    # Circular story highlights with animated gradient rings
    │   │   ├── MobileBottomNav.jsx     # Native app-like bottom navigation bar
    │   │   ├── Hero.jsx                # Mobile touch-swipeable hero banner
    │   │   ├── CategoriesSection.jsx   # Swipeable horizontal category cards
    │   │   ├── ProductCard.jsx         # 2-column mobile card with quick age selector
    │   │   ├── ProductGrid.jsx         # Responsive 2-col/4-col grid with mobile filter bar
    │   │   ├── VirtualDrapeStudio.jsx  # Mobile-optimized interactive color & zari lab
    │   │   ├── DrapeGuideSection.jsx   # 60-second ready-to-wear guide & video shopping
    │   │   ├── WhyHarivillu.jsx        # 4 trust pillars (Silk Mark, Soft Cotton Linings)
    │   │   ├── TestimonialsSection.jsx # Verified mom reviews
    │   │   ├── CartDrawer.jsx          # Slide-in bag with free delivery thermometer
    │   │   ├── QuickViewModal.jsx      # Mobile swipeable bottom sheet with size chart
    │   │   ├── LiveNotificationToast.jsx # Floating social proof ticker
    │   │   └── Footer.jsx              # VIP club signup, brand manifesto, secure payments
    │   ├── context/
    │   │   └── ShopContext.jsx         # Global state (Cart, Wishlist, Currency, Alerts)
    │   ├── data/
    │   │   └── products.js             # Realistic handloom catalog & customer reviews
    │   ├── App.jsx                     # Core application layout
    │   ├── main.jsx                    # React 18 entry point
    │   └── index.css                   # Mobile touch optimizations, safe-area padding
    ├── index.html                      # PWA meta tags, viewport-fit=cover, theme-color
    ├── tailwind.config.js              # Custom ethnic palette & animations
    ├── vite.config.js                  # Vite server & port configuration
    └── package.json                    # Dependencies & build scripts
```

---

## 🚀 Running The Application Locally

1. Start development server:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open in browser:
   ```
   http://localhost:3000/
   ```
   *(Press `F12` and click the Mobile Device Toggle icon in Chrome/Edge DevTools to experience the native mobile view with iPhone/Pixel presets!)*

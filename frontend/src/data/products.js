export const CATEGORIES = [
  {
    id: 'ready-to-wear',
    name: '1-Min Ready to Wear',
    subtitle: 'Pre-stitched pleats with velcro waistband',
    ageGroup: '2-8 Yrs',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    count: '34 Styles',
    color: 'from-amber-600 to-rose-700'
  },
  {
    id: 'pattu-half-sarees',
    name: 'Pattu Pavadai & Half Sarees',
    subtitle: 'Traditional Langa Voni & Kanchi borders',
    ageGroup: '6-14 Yrs',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    count: '48 Styles',
    color: 'from-pink-600 to-purple-800'
  },
  {
    id: 'kanchi-silks',
    name: 'Pure Kanchipuram Silks',
    subtitle: 'Silk Mark certified heirloom weaves',
    ageGroup: '8-18 Yrs',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    count: '52 Styles',
    color: 'from-emerald-700 to-teal-900'
  },
  {
    id: 'organza-party',
    name: 'Breezy Organza & Florals',
    subtitle: 'Feather-light modern party drapes',
    ageGroup: '4-16 Yrs',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    count: '29 Styles',
    color: 'from-cyan-600 to-blue-800'
  },
  {
    id: 'twinning-combos',
    name: 'Mother & Daughter Sets',
    subtitle: 'Handwoven matching festive duos',
    ageGroup: 'All Ages',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
    count: '18 Sets',
    color: 'from-rose-600 to-amber-700'
  }
];

export const PRODUCTS = [
  {
    id: 'hvs-000',
    name: 'Rajkumari Jamun Aubergine Pure Chanderi Silk Zari Checks Saree',
    category: 'kanchi-silks',
    price: 4899,
    originalPrice: 6999,
    discount: '30% OFF',
    rating: 5.0,
    reviewsCount: 184,
    ageGroups: ['6-8 Yrs', '9-11 Yrs', '12-14 Yrs', '15-18 Yrs (Teen & Young Adults)'],
    selectedAge: '12-14 Yrs',
    fabric: 'Pure Chanderi & Katan Silk with Antique Rose-Gold Zari Weave',
    colorName: 'Royal Aubergine Purple & Antique Rose-Gold Zari',
    colorHex: '#4A1D4E',
    contrastColorHex: '#C5A059',
    tag: '🔥 #1 Trending New Launch',
    readyToWear: true,
    viewsNow: 42,
    stockLeft: 4,
    images: [
      '/images/saree-aubergine-purple.jpg',
      '/images/saree-crimson-1min.jpg',
      '/images/saree-peacock-teal.jpg'
    ],
    features: [
      'Silk Mark Certified 100% Pure Handloom Silk',
      'Exquisite Fine Gold Kattam (Micro-Checks) Handloom Weave',
      'Grand Antique Rose-Gold Tissue Zari Border & Rich Pallu',
      'Pre-pleated 60-second slip-on option with zero-itch cotton lining',
      'Includes stitched custom tailored designer blouse with matching border'
    ],
    description: 'A showstopping royal masterpiece in regal Aubergine Jamun purple, woven with delicate micro-checks (Kattam) and framed by a rich antique rose-gold tissue zari border and pallu. Handcrafted with ultra-soft handloom silk for girls and teens to experience heritage royalty with effortless comfort and elegance.'
  },
  {
    id: 'hvs-001',
    name: 'Mayura Peacock Kanchipuram Pure Silk Girl Saree',
    category: 'kanchi-silks',
    price: 4499,
    originalPrice: 6299,
    discount: '28% OFF',
    rating: 4.9,
    reviewsCount: 142,
    ageGroups: ['4-6 Yrs', '7-9 Yrs', '10-12 Yrs', '13-16 Yrs'],
    selectedAge: '7-9 Yrs',
    fabric: 'Pure Mulberry Silk with Pure Gold Zari',
    colorName: 'Peacock Teal & Rani Pink',
    colorHex: '#0891b2',
    contrastColorHex: '#db2777',
    tag: 'Bestseller',
    readyToWear: true,
    viewsNow: 16,
    stockLeft: 3,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    features: [
      'Silk Mark Certified 100% Pure Silk',
      'Pre-pleated 1-Minute Drape with itch-free lining',
      'Includes stitched unlined contrast brocade blouse',
      'Handwoven peacock and temple border motifs'
    ],
    description: 'A regal royal teal and magenta Kanchipuram silk saree woven specially for young girls. Made with ultra-soft pure mulberry silk and lightweight zari so children can dance, run, and celebrate comfortably for hours.'
  },
  {
    id: 'hvs-002',
    name: 'Karpaga Swarna Rani Pink Pre-Stitched Half-Saree Set',
    category: 'pattu-half-sarees',
    price: 3899,
    originalPrice: 5199,
    discount: '25% OFF',
    rating: 4.8,
    reviewsCount: 98,
    ageGroups: ['2-4 Yrs', '5-7 Yrs', '8-10 Yrs', '11-14 Yrs'],
    selectedAge: '5-7 Yrs',
    fabric: 'Kanchi Tissue Pattu with Gilded Brocade',
    colorName: 'Rani Pink & Mango Gold',
    colorHex: '#db2777',
    contrastColorHex: '#eab308',
    tag: 'Festive Special',
    readyToWear: true,
    viewsNow: 22,
    stockLeft: 5,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    features: [
      'Pleated flared skirt with adjustable drawstring',
      'Soft cotton voile lining prevents skin prickling',
      'Handcrafted heavy golden zari borders',
      'Free matching potli bag included'
    ],
    description: 'Quintessential South Indian royal celebration attire. Designed with traditional temple zari border and lustrous rani pink silk base that shimmers gracefully under festive lights.'
  },
  {
    id: 'hvs-003',
    name: 'Kashvi Golden Temple Border Crimson Saree (1-Min Drape)',
    category: 'ready-to-wear',
    price: 2999,
    originalPrice: 4299,
    discount: '30% OFF',
    rating: 5.0,
    reviewsCount: 187,
    ageGroups: ['3-5 Yrs', '6-8 Yrs', '9-11 Yrs', '12-15 Yrs'],
    selectedAge: '6-8 Yrs',
    fabric: 'Soft Chanderi Silk Cotton Blend',
    colorName: 'Crimson Temple Red',
    colorHex: '#991b1b',
    contrastColorHex: '#d4af37',
    tag: 'Kid-Friendly Hit',
    readyToWear: true,
    viewsNow: 31,
    stockLeft: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    features: [
      'Patented 60-second slip-and-hook system',
      'Featherweight 320g total weight',
      'Breathable organic cotton weave',
      'Zero safety pins needed'
    ],
    description: 'Engineered for active little dancers! No fuss, no safety pin pricks. Just wrap, click the concealed velcro clasps, throw the pleated pallu over the shoulder, and she is ready to shine.'
  },
  {
    id: 'hvs-004',
    name: 'Anandi Pastel Lavender Bloom Organza Silk Saree',
    category: 'organza-party',
    price: 3499,
    originalPrice: 4699,
    discount: '25% OFF',
    rating: 4.7,
    reviewsCount: 64,
    ageGroups: ['5-7 Yrs', '8-11 Yrs', '12-15 Yrs', '16-18 Yrs'],
    selectedAge: '8-11 Yrs',
    fabric: 'Fine Korean Organza with Scallop Zari Edge',
    colorName: 'Lilac Lavender & Rose Gold',
    colorHex: '#a855f7',
    contrastColorHex: '#fb7185',
    tag: 'Trending Now',
    readyToWear: false,
    viewsNow: 11,
    stockLeft: 7,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    features: [
      'Delicate hand-painted watercolor botanical prints',
      'Scalloped cutwork border with metallic thread',
      'Includes unstitched soft satin silk blouse',
      'Ideal for birthdays, weddings, and farewells'
    ],
    description: 'Dreamy modern pastel aesthetic. This airy organza drape floats effortlessly, lending an ethereal, modern princess vibe for teens and younger girls alike.'
  },
  {
    id: 'hvs-005',
    name: 'Harivillu Rainbow Navratna Pattu Pavada Langa Set',
    category: 'pattu-half-sarees',
    price: 4999,
    originalPrice: 6999,
    discount: '29% OFF',
    rating: 5.0,
    reviewsCount: 215,
    ageGroups: ['1-3 Yrs', '4-6 Yrs', '7-10 Yrs', '11-14 Yrs'],
    selectedAge: '4-6 Yrs',
    fabric: 'Dharmavaram Pure Silk with Zari Checks',
    colorName: 'Vibrant Multi-Color Rainbow & Gold',
    colorHex: '#f59e0b',
    contrastColorHex: '#ec4899',
    tag: 'Signature Piece',
    readyToWear: true,
    viewsNow: 38,
    stockLeft: 4,
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    features: [
      'Harivillu Signature 7-color festive panel weaving',
      'Pure zari checks with butti motifs',
      'Double lining with pure cotton cambric',
      'Handmade silk tassel latkans'
    ],
    description: 'Named after Harivillu (The Rainbow), this joyful masterpiece brings seven auspicious shades in pure Dharmavaram silk. A showstopper for naming ceremonies, first birthdays, and festivals.'
  },
  {
    id: 'hvs-006',
    name: 'Vaidarbhi Emerald Green & Turmeric Half Saree Duo',
    category: 'kanchi-silks',
    price: 5299,
    originalPrice: 7499,
    discount: '29% OFF',
    rating: 4.9,
    reviewsCount: 112,
    ageGroups: ['6-8 Yrs', '9-12 Yrs', '13-15 Yrs', '16-18 Yrs'],
    selectedAge: '9-12 Yrs',
    fabric: 'Arani Silk with Antique Copper Zari',
    colorName: 'Emerald Green & Turmeric Gold',
    colorHex: '#047857',
    contrastColorHex: '#ca8a04',
    tag: 'Heirloom Grade',
    readyToWear: true,
    viewsNow: 19,
    stockLeft: 3,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    features: [
      'Heavy traditional Korvai contrast border',
      'Intricate elephant (Yali) and lotus motifs',
      'Pre-pleated duppatta / dhavani with borders',
      'Generous margin seams for growth adjustment'
    ],
    description: 'Inspired by traditional classical dance and South Indian temple festivities. Features rich emerald green pure silk adorned with lustrous turmeric gold antique border.'
  },
  {
    id: 'hvs-007',
    name: 'Janaki Royal Blue & Mustard Banarasi Brocade Saree',
    category: 'ready-to-wear',
    price: 3699,
    originalPrice: 4999,
    discount: '26% OFF',
    rating: 4.8,
    reviewsCount: 76,
    ageGroups: ['4-6 Yrs', '7-9 Yrs', '10-13 Yrs', '14-17 Yrs'],
    selectedAge: '10-13 Yrs',
    fabric: 'Banarasi Katan Silk Brocade',
    colorName: 'Royal Indigo Blue & Mustard',
    colorHex: '#1e3a8a',
    contrastColorHex: '#eab308',
    tag: 'Classic',
    readyToWear: true,
    viewsNow: 14,
    stockLeft: 6,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    features: [
      'All-over gold zari jaal weaving',
      'Lightweight construction easy for active movement',
      'Dry-clean friendly with durable metallic weave',
      'Pre-stitched pleats with invisible snaps'
    ],
    description: 'A timeless Banarasi brocade creation rendered in deep royal indigo and glowing mustard. Perfect for formal school ceremonies, festivals, and family celebrations.'
  },
  {
    id: 'hvs-008',
    name: 'Matru-Bala Pure Silk Mother & Daughter Saree Combo',
    category: 'twinning-combos',
    price: 9499,
    originalPrice: 12999,
    discount: '27% OFF',
    rating: 5.0,
    reviewsCount: 340,
    ageGroups: ['Mom + Girl 3-6 Yrs', 'Mom + Girl 7-11 Yrs', 'Mom + Teen 12-16 Yrs'],
    selectedAge: 'Mom + Girl 7-11 Yrs',
    fabric: 'Pure Kanchipuram Handloom Silk (Both)',
    colorName: 'Ruby Red & Temple Gold',
    colorHex: '#be123c',
    contrastColorHex: '#d4af37',
    tag: 'Celebrity Pick',
    readyToWear: true,
    viewsNow: 45,
    stockLeft: 2,
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    features: [
      'Twin matched weave: Full 6-yard saree for Mom + Pre-stitched saree for Daughter',
      'Two Silk Mark Authenticity Certificates included',
      'Custom blouse stitching option with maggam work',
      'Delivered in luxury velvet keepsake gift box'
    ],
    description: 'Create unforgettable photo moments and timeless memories with our matching mother and daughter Kanchipuram silk set. Woven on the same loom for flawless color harmony.'
  }
];

export const LIVE_ACTIVITY_STREAM = [
  { name: 'Sowmya K.', location: 'Hyderabad, TS', product: 'Mayura Peacock Kanchipuram Pure Silk Girl Saree', time: '1 min ago' },
  { name: 'Deepika R.', location: 'Bengaluru, KA', product: 'Harivillu Rainbow Navratna Pattu Pavada Langa Set', time: '3 mins ago' },
  { name: 'Kavitha M.', location: 'Chennai, TN', product: 'Karpaga Swarna Rani Pink Pre-Stitched Half-Saree', time: '5 mins ago' },
  { name: 'Sneha P.', location: 'Dallas, TX (USA)', product: 'Matru-Bala Pure Silk Mother & Daughter Saree Combo', time: '7 mins ago' },
  { name: 'Lavanya S.', location: 'Visakhapatnam, AP', product: 'Kashvi Golden Temple Border Crimson Saree', time: '9 mins ago' },
  { name: 'Pooja J.', location: 'Mumbai, MH', product: 'Anandi Pastel Lavender Bloom Organza Saree', time: '12 mins ago' }
];

export const CUSTOMER_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sravani Reddy',
    city: 'Hyderabad',
    rating: 5,
    verified: true,
    comment: 'My 6-year-old daughter wore the Mayura peacock saree for our family wedding. She wore it for 7 hours without complaining once! The 1-minute pre-stitched design saved us so much stress. Absolutely breathtaking craftsmanship!',
    daughterAge: 'Daughter, Age 6',
    sareeName: 'Mayura Peacock Kanchipuram Saree'
  },
  {
    id: 2,
    name: 'Nandini Venkatesh',
    city: 'San Jose, CA',
    rating: 5,
    verified: true,
    comment: 'Ordering from USA was so smooth. Video calling with Harivillu stylists helped me pick the right length and size. Pure silk mark verified and arrived in 4 days. Harivillu is now our family go-to!',
    daughterAge: 'Daughter, Age 10',
    sareeName: 'Harivillu Rainbow Navratna Pattu Pavada'
  },
  {
    id: 3,
    name: 'Anitha Suresh',
    city: 'Bengaluru',
    rating: 5,
    verified: true,
    comment: 'The Mother-Daughter matching duo stole the show at our housewarming! The pure zari gleam in person is even more stunning than the photos. Premium packaging too.',
    daughterAge: 'Mother & Daughter Set',
    sareeName: 'Matru-Bala Pure Silk Combo'
  }
];

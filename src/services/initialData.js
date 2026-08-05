// Pre-populated initial dataset for Bulk Saves Hub

export const INITIAL_CATEGORIES = [
  { id: 'electronics', name: 'Consumer Electronics', icon: 'Cpu', count: 48, description: 'Smartphones, Audio Gear, Accessories & Smart Home Gadgets' },
  { id: 'office', name: 'Office Supplies & Tech', icon: 'Briefcase', count: 32, description: 'Desks, Monitors, Ergonomic Chairs & Desk Supplies' },
  { id: 'fashion', name: 'Apparel & Textiles', icon: 'Shirt', count: 64, description: 'Bulk Cotton T-shirts, Hoodies, Activewear & Fabrics' },
  { id: 'home', name: 'Home & Kitchen Appliances', icon: 'Home', count: 29, description: 'Blenders, Air Fryers, Cookware & Household Goods' },
  { id: 'beauty', name: 'Personal Care & Beauty', icon: 'Sparkles', count: 41, description: 'Skincare Sets, Haircare Products & Cosmetic Wholesale' },
  { id: 'industrial', name: 'Packaging & Hardware', icon: 'Package', count: 53, description: 'Eco Boxes, Thermal Paper, Tools & Safety Gear' },
  { id: 'groceries', name: 'Vegetables & Groceries', icon: 'Carrot', count: 20, description: 'Fresh Farm Produce, Organic Vegetables, Rice, Spices & Bulk Oils' }
];

export const INITIAL_SUPPLIERS = [
  {
    id: 'sup_apex',
    name: 'Apex Global Tech Ltd',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.9,
    reviewsCount: 142,
    location: 'Shenzhen, China / San Jose, CA',
    established: 2014,
    responseRate: '98.5%',
    avgDelivery: '3-5 Days Express',
    description: 'Direct manufacturer & distributor of high-performance wireless audio, fast-charging accessories, and ergonomic tech items.',
    categories: ['electronics', 'office'],
    contactEmail: 'b2b-orders@apexglobaltech.com',
    phone: '+1 (800) 555-0192',
    address: '104 Innovation Way, Tech Park, San Jose, CA'
  },
  {
    id: 'sup_nordic',
    name: 'Nordic Craft Wear Co',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.8,
    reviewsCount: 98,
    location: 'Stockholm, Sweden',
    established: 2017,
    responseRate: '96.2%',
    avgDelivery: '5-7 Days Standard',
    description: 'Premium organic cotton blanks, sustainable hoodies, and workwear customized for private label branding.',
    categories: ['fashion'],
    contactEmail: 'wholesale@nordiccraftwear.com',
    phone: '+46 8 123 4567',
    address: 'Sveavägen 42, Stockholm, Sweden'
  },
  {
    id: 'sup_eco',
    name: 'EcoPack Solutions Global',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31727223ec?w=150&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.95,
    reviewsCount: 215,
    location: 'Chicago, IL, USA',
    established: 2011,
    responseRate: '99.1%',
    avgDelivery: '2-4 Days Regional',
    description: '100% biodegradable shipping boxes, custom mailers, thermal label rolls, and protective honeycomb wrap.',
    categories: ['industrial', 'office'],
    contactEmail: 'sales@ecopacksolutions.io',
    phone: '+1 (312) 555-0144',
    address: '88 Commerce Blvd, Industrial District, Chicago, IL'
  },
  {
    id: 'sup_lumin',
    name: 'Lumin Living & Appliances',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.7,
    reviewsCount: 76,
    location: 'Frankfurt, Germany',
    established: 2016,
    responseRate: '94.8%',
    avgDelivery: '4-6 Days Europe/USA',
    description: 'Wholesale smart kitchen appliances, ambient LED illumination, and premium modern lifestyle accessories.',
    categories: ['home', 'electronics'],
    contactEmail: 'supply@luminliving.de',
    phone: '+49 69 9876543',
    address: 'Mainzer Landstraße 180, Frankfurt, Germany'
  },
  {
    id: 'sup_greenharvest',
    name: 'GreenHarvest Organic Farms & Agro',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.92,
    reviewsCount: 184,
    location: 'California, USA / Salinas Valley',
    established: 2012,
    responseRate: '99.4%',
    avgDelivery: '1-2 Days Cold Express',
    description: 'Direct farm producer and wholesale exporter of certified organic fresh vegetables, farm-fresh produce, bulk grains, and cooking oils.',
    categories: ['groceries'],
    contactEmail: 'b2b-sales@greenharvestorganic.com',
    phone: '+1 (800) 555-8833',
    address: '450 Agro Valley Rd, Salinas, CA'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Pro Wireless Active Noise-Canceling Earbuds (V2)',
    category: 'electronics',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    description: 'Customizable ANC earbuds featuring 40h total battery life, Bluetooth 5.3, low latency mode, and custom logo printing for bulk buyers.',
    retailPrice: 7379.18,
    bulkPrice: 2337.00,
    moq: 50,
    unit: 'units',
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    stockQuantity: 12000,
    featured: true,
    specifications: {
      'Bluetooth Version': '5.3 Dual Channel',
      'Battery Capacity': '450mAh Charging Case',
      'ANC Depth': '-38dB active noise reduction',
      'Water Resistance': 'IPX5 Sweatproof',
      'Warranty': '12 Months Manufacturer Defect'
    },
    tierPrices: [
      { minQty: 50, maxQty: 199, price: 2788.00 },
      { minQty: 200, maxQty: 499, price: 2501.00 },
      { minQty: 500, maxQty: 10000, price: 2337.00 }
    ]
  },
  {
    id: 'prod_2',
    name: 'Ergonomic Mesh Office Chair with Lumbar Support',
    category: 'office',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d85d5?w=600&auto=format&fit=crop&q=80',
    description: 'High-density breathable mesh office chair with 3D adjustable armrests, synchronized tilt mechanism, and heavy-duty chrome base.',
    retailPrice: 20418.00,
    bulkPrice: 6970.00,
    moq: 20,
    unit: 'chairs',
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    stockQuantity: 2400,
    featured: true,
    specifications: {
      'Weight Capacity': '330 lbs (150 kg)',
      'Frame Material': 'Reinforced Nylon & Alloy',
      'Casters': '60mm Mute PU Casters',
      'Certifications': 'BIFMA Pass / SGS Class 4 Gas Lift'
    },
    tierPrices: [
      { minQty: 20, maxQty: 49, price: 7790.00 },
      { minQty: 50, maxQty: 99, price: 7298.00 },
      { minQty: 100, maxQty: 500, price: 6970.00 }
    ]
  },
  {
    id: 'prod_3',
    name: 'Heavyweight 450GSM Organic Cotton Fleece Hoodie',
    category: 'fashion',
    supplierId: 'sup_nordic',
    supplierName: 'Nordic Craft Wear Co',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-soft, pre-shrunk 100% organic combed cotton blank hoodie. Ideal for streetwear brands, embroidery, and screen printing.',
    retailPrice: 6150.00,
    bulkPrice: 1804.00,
    moq: 100,
    unit: 'pieces',
    rating: 4.95,
    reviewsCount: 56,
    inStock: true,
    stockQuantity: 18000,
    featured: true,
    specifications: {
      'Fabric Weight': '450 GSM Heavy Fleece',
      'Material': '100% GOTS Certified Organic Cotton',
      'Fit': 'Relaxed European Streetwear Fit',
      'Colors': '14 Stock Colors Available'
    },
    tierPrices: [
      { minQty: 100, maxQty: 299, price: 2091.00 },
      { minQty: 300, maxQty: 999, price: 1927.00 },
      { minQty: 1000, maxQty: 5000, price: 1804.00 }
    ]
  },
  {
    id: 'prod_4',
    name: 'Biodegradable Honeycomb Cushioning Mailer Boxes',
    category: 'industrial',
    supplierId: 'sup_eco',
    supplierName: 'EcoPack Solutions Global',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    description: 'Custom printable self-sealing corrugated mailer boxes made from 100% recycled paper. Zero plastic, water-based inks.',
    retailPrice: 180.40,
    bulkPrice: 36.90,
    moq: 500,
    unit: 'boxes',
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stockQuantity: 250000,
    featured: true,
    specifications: {
      'Dimensions': '10x7x3 inches (Custom size available)',
      'Flute Type': 'E-Flute Sturdy Corrugated',
      'Recycled Content': '100% Post-Consumer Recycled Paper',
      'Custom Logo': 'Free 1-color flexo print on 1000+ units'
    },
    tierPrices: [
      { minQty: 500, maxQty: 1999, price: 53.30 },
      { minQty: 2000, maxQty: 4999, price: 42.64 },
      { minQty: 5000, maxQty: 50000, price: 36.90 }
    ]
  },
  {
    id: 'prod_5',
    name: 'Smart WiFi Digital Air Fryer XL (5.8L capacity)',
    category: 'home',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80',
    description: 'Stainless steel air fryer with mobile app control, 12 preset touch programs, non-stick dishwasher-safe basket.',
    retailPrice: 11479.18,
    bulkPrice: 3444.00,
    moq: 30,
    unit: 'units',
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    stockQuantity: 4500,
    featured: false,
    specifications: {
      'Power': '1700W 110V/220V Dual Voltage',
      'Capacity': '5.8 Quarts (5.5 Liters)',
      'Display': 'HD LED Touch Control Panel',
      'Safety': 'Auto-Shutoff & Overheat Protection'
    },
    tierPrices: [
      { minQty: 30, maxQty: 99, price: 3936.00 },
      { minQty: 100, maxQty: 499, price: 3649.00 },
      { minQty: 500, maxQty: 2000, price: 3444.00 }
    ]
  },
  {
    id: 'prod_6',
    name: 'Hydrating Botanical Hyaluronic Serum Set (30ml)',
    category: 'beauty',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    description: 'Dermatologist tested vegan hyaluronic acid skin serum for private label cosmetics resellers. Glass dropper bottles with customizable labels.',
    retailPrice: 2788.00,
    bulkPrice: 557.60,
    moq: 150,
    unit: 'bottles',
    rating: 4.85,
    reviewsCount: 38,
    inStock: true,
    stockQuantity: 30000,
    featured: true,
    specifications: {
      'Volume': '30 ml / 1.0 fl. oz',
      'Ingredients': 'Triple Weight Hyaluronic Acid, Niacinamide 5%',
      'Packaging': 'Amber UV-protective Glass Dropper',
      'Shelf Life': '24 Months'
    },
    tierPrices: [
      { minQty: 150, maxQty: 499, price: 672.40 },
      { minQty: 500, maxQty: 1999, price: 606.80 },
      { minQty: 2000, maxQty: 10000, price: 557.60 }
    ]
  },
  {
    id: 'prod_7',
    name: 'Ultra Fast 65W GaN Dual USB-C Wall Charger',
    category: 'electronics',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    description: 'Compact 65W Gallium Nitride fast charger supporting Power Delivery 3.0 for laptops, tablets, and phones.',
    retailPrice: 4099.18,
    bulkPrice: 1189.00,
    moq: 100,
    unit: 'units',
    rating: 4.88,
    reviewsCount: 64,
    inStock: true,
    stockQuantity: 15000,
    featured: true,
    specifications: {
      'Max Power': '65W Power Delivery',
      'Technology': 'GaN III Semiconductor',
      'Ports': '2x USB-C + 1x USB-A',
      'Certifications': 'CE / FCC / RoHS / UL Listed'
    },
    tierPrices: [
      { minQty: 100, maxQty: 499, price: 1353.00 },
      { minQty: 500, maxQty: 2000, price: 1189.00 }
    ]
  },
  {
    id: 'prod_8',
    name: 'Minimalist Anodized Aluminum Laptop Stand & Riser',
    category: 'office',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
    description: 'Ergonomic heat-dissipating aluminum alloy desk stand compatible with laptops from 10 to 17 inches.',
    retailPrice: 4919.18,
    bulkPrice: 1377.60,
    moq: 50,
    unit: 'units',
    rating: 4.92,
    reviewsCount: 47,
    inStock: true,
    stockQuantity: 8500,
    featured: false,
    specifications: {
      'Material': 'Aviation-Grade Aluminum Alloy',
      'Compatibility': '10-17.3 inch Laptops',
      'Weight Capacity': '20 lbs (9 kg)',
      'Finish': 'Space Gray / Silver Anodized'
    },
    tierPrices: [
      { minQty: 50, maxQty: 199, price: 1558.00 },
      { minQty: 200, maxQty: 1000, price: 1377.60 }
    ]
  },
  {
    id: 'prod_9',
    name: 'Waterproof Lightweight Activewear Trail Jacket',
    category: 'fashion',
    supplierId: 'sup_nordic',
    supplierName: 'Nordic Craft Wear Co',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
    description: '10K/10K breathable waterproof membrane windbreaker jacket designed for outdoor apparel brands and corporate promo merch.',
    retailPrice: 9020.00,
    bulkPrice: 2624.00,
    moq: 60,
    unit: 'pieces',
    rating: 4.86,
    reviewsCount: 29,
    inStock: true,
    stockQuantity: 6200,
    featured: false,
    specifications: {
      'Waterproof Rating': '10,000mm Hydrostatic Head',
      'Zippers': 'YKK AquaGuard Sealed Zippers',
      'Weight': '280 grams Ultralight',
      'Custom Branding': 'Embroidery & Heat Transfer Ready'
    },
    tierPrices: [
      { minQty: 60, maxQty: 199, price: 2952.00 },
      { minQty: 200, maxQty: 1000, price: 2624.00 }
    ]
  },
  {
    id: 'prod_10',
    name: 'BPA-Free Thermal Receipt Paper Rolls (80x80mm Box of 50)',
    category: 'industrial',
    supplierId: 'sup_eco',
    supplierName: 'EcoPack Solutions Global',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    description: 'High-density crisp print BPA-free thermal paper rolls for POS printers, credit card machines, and retail cash registers.',
    retailPrice: 3936.00,
    bulkPrice: 1164.40,
    moq: 20,
    unit: 'boxes',
    rating: 4.94,
    reviewsCount: 112,
    inStock: true,
    stockQuantity: 40000,
    featured: false,
    specifications: {
      'Roll Size': '80mm Width x 80mm Diameter (55m length)',
      'Paper Grade': '55GSM Premium Direct Thermal',
      'Core Size': '12mm Plastic Free Core',
      'BPA Content': '100% Phenol & BPA Free'
    },
    tierPrices: [
      { minQty: 20, maxQty: 99, price: 1353.00 },
      { minQty: 100, maxQty: 1000, price: 1164.40 }
    ]
  },
  {
    id: 'prod_11',
    name: 'Conical Burr Electric Espresso & Drip Coffee Grinder',
    category: 'home',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Stainless steel 40mm conical burr coffee grinder featuring 35 precise grind settings, anti-static technology, and digital timer.',
    retailPrice: 13038.00,
    bulkPrice: 3977.00,
    moq: 25,
    unit: 'units',
    rating: 4.89,
    reviewsCount: 52,
    inStock: true,
    stockQuantity: 3800,
    featured: true,
    specifications: {
      'Burr Type': '40mm High-Carbon Stainless Steel Conical',
      'Grind Range': 'Espresso to Cold Brew (35 steps)',
      'Bean Hopper': '275g UV-tinted airtight hopper',
      'Motor': '160W DC Low-RPM Quiet Motor'
    },
    tierPrices: [
      { minQty: 25, maxQty: 99, price: 4428.00 },
      { minQty: 100, maxQty: 500, price: 3977.00 }
    ]
  },
  {
    id: 'prod_12',
    name: 'Organic Damask Rosewater Hydrosol Facial Mist (100ml)',
    category: 'beauty',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    description: '100% pure steam-distilled organic rosewater face toner mist. Free from alcohol, parabens, or synthetic fragrance. Private label print ready.',
    retailPrice: 1968.00,
    bulkPrice: 401.80,
    moq: 200,
    unit: 'bottles',
    rating: 4.91,
    reviewsCount: 73,
    inStock: true,
    stockQuantity: 45000,
    featured: false,
    specifications: {
      'Volume': '100 ml / 3.4 fl. oz',
      'Extraction': '100% Steam Distilled Rosa Damascena',
      'Bottle': 'Frosted Glass with Fine Mist Pump',
      'Certifications': 'USDA Organic / Leaping Bunny Cruelty Free'
    },
    tierPrices: [
      { minQty: 200, maxQty: 999, price: 475.60 },
      { minQty: 1000, maxQty: 5000, price: 401.80 }
    ]
  },
  {
    id: 'prod_13',
    name: 'Premium Stainless Steel Insulated Water Bottle 1L',
    category: 'home',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    description: 'Double-wall vacuum insulated 1L stainless steel bottle, keeps cold 24h / hot 12h. BPA-free, leak-proof lid, ideal for branded merchandise.',
    retailPrice: 2499,
    bulkPrice: 699,
    moq: 100,
    unit: 'pieces',
    rating: 4.8,
    reviewsCount: 93,
    inStock: true,
    stockQuantity: 22000,
    featured: true,
    specifications: {
      'Capacity': '1000ml / 34 fl oz',
      'Material': '18/8 Food-Grade Stainless Steel',
      'Insulation': 'Double-Wall Vacuum',
      'Lid Type': 'Leak-Proof Screw Cap + Handle'
    },
    tierPrices: [
      { minQty: 100, maxQty: 499, price: 799 },
      { minQty: 500, maxQty: 1999, price: 749 },
      { minQty: 2000, maxQty: 10000, price: 699 }
    ]
  },
  {
    id: 'prod_14',
    name: 'Wireless Mechanical Gaming Keyboard RGB Backlit',
    category: 'electronics',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1601445638532-aa99ab36b800?w=600&auto=format&fit=crop&q=80',
    description: 'Tri-mode wireless gaming keyboard (Bluetooth 5.0 / 2.4GHz / USB-C), hot-swappable Brown switches, per-key RGB, 3800mAh battery.',
    retailPrice: 8999,
    bulkPrice: 2850,
    moq: 30,
    unit: 'units',
    rating: 4.7,
    reviewsCount: 61,
    inStock: true,
    stockQuantity: 5000,
    featured: true,
    specifications: {
      'Switch Type': 'Hot-Swappable Gateron Brown',
      'Connectivity': '2.4GHz / Bluetooth 5.0 / USB-C',
      'Battery': '3800mAh Li-Polymer',
      'Backlighting': 'Per-Key RGB 16.8M Colors'
    },
    tierPrices: [
      { minQty: 30, maxQty: 99, price: 3200 },
      { minQty: 100, maxQty: 499, price: 2999 },
      { minQty: 500, maxQty: 5000, price: 2850 }
    ]
  },
  {
    id: 'prod_15',
    name: '4K Ultra HD Action Camera with EIS Waterproof',
    category: 'electronics',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
    description: 'Compact 4K 60fps action camera with 6-axis EIS stabilization, 40m waterproof housing, 170° wide angle lens, live streaming support.',
    retailPrice: 14999,
    bulkPrice: 4200,
    moq: 20,
    unit: 'units',
    rating: 4.6,
    reviewsCount: 48,
    inStock: true,
    stockQuantity: 3000,
    featured: false,
    specifications: {
      'Resolution': '4K 60fps / 1080P 240fps',
      'Stabilization': '6-Axis Electronic Image Stabilization',
      'Waterproof': '40m without housing',
      'Battery': '1750mAh Quick-Charge'
    },
    tierPrices: [
      { minQty: 20, maxQty: 49, price: 4800 },
      { minQty: 50, maxQty: 199, price: 4500 },
      { minQty: 200, maxQty: 2000, price: 4200 }
    ]
  },
  {
    id: 'prod_16',
    name: 'Bamboo Fiber Eco Reusable Shopping Bag Set (5pcs)',
    category: 'industrial',
    supplierId: 'sup_eco',
    supplierName: 'EcoPack Solutions Global',
    image: 'https://images.unsplash.com/photo-1610024062303-e355b1806a4f?w=600&auto=format&fit=crop&q=80',
    description: 'Compostable and reusable bamboo fiber grocery bags with printed carrying handles. 5-piece nested set, custom logo-print ready.',
    retailPrice: 699,
    bulkPrice: 89,
    moq: 500,
    unit: 'sets',
    rating: 4.9,
    reviewsCount: 77,
    inStock: true,
    stockQuantity: 120000,
    featured: false,
    specifications: {
      'Material': '70% Bamboo Fiber + 30% Cotton',
      'Capacity': '10kg load capacity per bag',
      'Sizes': 'Small / Medium / Large / XL / Drawstring',
      'Printing': 'Custom logo soy-based ink print'
    },
    tierPrices: [
      { minQty: 500, maxQty: 1999, price: 110 },
      { minQty: 2000, maxQty: 9999, price: 99 },
      { minQty: 10000, maxQty: 100000, price: 89 }
    ]
  },
  {
    id: 'prod_17',
    name: 'Standing Adjustable Electric Height Desk 140cm',
    category: 'office',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop&q=80',
    description: 'Electric sit-stand desk with dual motor, memory height presets (58–120cm), anti-collision sensor, cable management tray, 140cm wide.',
    retailPrice: 39999,
    bulkPrice: 13500,
    moq: 10,
    unit: 'units',
    rating: 4.85,
    reviewsCount: 36,
    inStock: true,
    stockQuantity: 800,
    featured: true,
    specifications: {
      'Width': '140 x 70 cm Desktop',
      'Height Range': '58cm – 120cm Electric Adjustment',
      'Motor': 'Dual Motor Silent 45dB',
      'Load Capacity': '100kg / 220 lbs'
    },
    tierPrices: [
      { minQty: 10, maxQty: 24, price: 15000 },
      { minQty: 25, maxQty: 99, price: 14200 },
      { minQty: 100, maxQty: 500, price: 13500 }
    ]
  },
  {
    id: 'prod_18',
    name: 'Cold Brew Coffee Concentrate Pack (250ml x 12)',
    category: 'home',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80',
    description: 'Ready-to-sell premium cold brew coffee concentrate made from single-origin Arabica beans. 12 bottles per case, private label ready.',
    retailPrice: 2999,
    bulkPrice: 849,
    moq: 50,
    unit: 'cases',
    rating: 4.88,
    reviewsCount: 44,
    inStock: true,
    stockQuantity: 10000,
    featured: false,
    specifications: {
      'Volume': '250ml per bottle, 12 per case',
      'Bean Origin': '100% Colombian Arabica',
      'Extraction': '24-hour Cold Steep Process',
      'Shelf Life': '12 Months Refrigerated'
    },
    tierPrices: [
      { minQty: 50, maxQty: 199, price: 999 },
      { minQty: 200, maxQty: 999, price: 899 },
      { minQty: 1000, maxQty: 5000, price: 849 }
    ]
  },
  {
    id: 'prod_19',
    name: 'Premium Cotton Terry Towel Set (Bath + Hand + Face)',
    category: 'fashion',
    supplierId: 'sup_nordic',
    supplierName: 'Nordic Craft Wear Co',
    image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&auto=format&fit=crop&q=80',
    description: '600 GSM luxury cotton terry towel set (1 bath + 2 hand + 2 face towels). Hotel grade, zero-twist yarn, quick dry. Custom embroidery available.',
    retailPrice: 1899,
    bulkPrice: 549,
    moq: 100,
    unit: 'sets',
    rating: 4.92,
    reviewsCount: 58,
    inStock: true,
    stockQuantity: 15000,
    featured: true,
    specifications: {
      'GSM': '600 GSM Zero-Twist Cotton',
      'Set Contents': '1 Bath + 2 Hand + 2 Face Towels',
      'Colors': '8 hotel color options',
      'Branding': 'Custom embroidery logo available'
    },
    tierPrices: [
      { minQty: 100, maxQty: 499, price: 649 },
      { minQty: 500, maxQty: 1999, price: 589 },
      { minQty: 2000, maxQty: 10000, price: 549 }
    ]
  },
  {
    id: 'prod_20',
    name: 'LED Desk Lamp with Wireless Charger USB Hub',
    category: 'office',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=600&auto=format&fit=crop&q=80',
    description: 'Smart LED desk lamp with 10W wireless charging pad, 3 USB-A ports, 5 color temperatures, touch dimmer, and auto-dim sensor.',
    retailPrice: 3499,
    bulkPrice: 999,
    moq: 50,
    unit: 'units',
    rating: 4.82,
    reviewsCount: 69,
    inStock: true,
    stockQuantity: 7000,
    featured: false,
    specifications: {
      'Brightness': '1000 Lumens Adjustable',
      'Wireless Charging': '10W Qi Fast Charge',
      'USB Ports': '3x USB-A 5V/2.4A each',
      'Color Temp': '2700K–6500K 5-Step'
    },
    tierPrices: [
      { minQty: 50, maxQty: 199, price: 1199 },
      { minQty: 200, maxQty: 999, price: 1049 },
      { minQty: 1000, maxQty: 5000, price: 999 }
    ]
  },
  {
    id: 'prod_21',
    name: 'Vitamin C Brightening Face Serum 30ml (Private Label)',
    category: 'beauty',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&auto=format&fit=crop&q=80',
    description: 'Stable 20% L-ascorbic acid vitamin C face serum with ferulic acid and vitamin E. Dermatologist tested, private-label cosmetics grade.',
    retailPrice: 1499,
    bulkPrice: 310,
    moq: 200,
    unit: 'bottles',
    rating: 4.87,
    reviewsCount: 82,
    inStock: true,
    stockQuantity: 50000,
    featured: true,
    specifications: {
      'Active': '20% L-Ascorbic Acid + Ferulic Acid',
      'Volume': '30ml Amber Dropper Glass Bottle',
      'Packaging': 'Custom box print available',
      'Shelf Life': '18 Months Sealed'
    },
    tierPrices: [
      { minQty: 200, maxQty: 499, price: 380 },
      { minQty: 500, maxQty: 1999, price: 340 },
      { minQty: 2000, maxQty: 10000, price: 310 }
    ]
  },
  {
    id: 'prod_22',
    name: 'Smart Home Security IP Camera 4MP Night Vision',
    category: 'electronics',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=600&auto=format&fit=crop&q=80',
    description: '4MP IP security camera with AI human detection, color night vision, two-way audio, SD card + cloud storage, IP67 weatherproof.',
    retailPrice: 4999,
    bulkPrice: 1350,
    moq: 25,
    unit: 'units',
    rating: 4.78,
    reviewsCount: 55,
    inStock: true,
    stockQuantity: 9000,
    featured: false,
    specifications: {
      'Resolution': '4MP 2560x1440 Super HD',
      'Night Vision': 'Full-Color Smart IR 30m',
      'Detection': 'AI Human + Vehicle Detection',
      'Weatherproof': 'IP67 Outdoor Rated'
    },
    tierPrices: [
      { minQty: 25, maxQty: 99, price: 1599 },
      { minQty: 100, maxQty: 499, price: 1449 },
      { minQty: 500, maxQty: 5000, price: 1350 }
    ]
  },
  {
    id: 'prod_23',
    name: 'Anti-Slip Yoga Mat 6mm Natural Rubber TPE',
    category: 'fashion',
    supplierId: 'sup_nordic',
    supplierName: 'Nordic Craft Wear Co',
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&auto=format&fit=crop&q=80',
    description: '6mm dual-layer natural rubber + TPE yoga mat with alignment lines, moisture-wicking microfiber top surface, custom print-ready.',
    retailPrice: 2499,
    bulkPrice: 599,
    moq: 50,
    unit: 'pieces',
    rating: 4.9,
    reviewsCount: 67,
    inStock: true,
    stockQuantity: 12000,
    featured: false,
    specifications: {
      'Thickness': '6mm Dual Layer Comfort',
      'Material': 'Natural Rubber Base + TPE Surface',
      'Dimensions': '183 x 61cm Standard',
      'Print': 'Custom design print available'
    },
    tierPrices: [
      { minQty: 50, maxQty: 199, price: 749 },
      { minQty: 200, maxQty: 999, price: 649 },
      { minQty: 1000, maxQty: 5000, price: 599 }
    ]
  },
  {
    id: 'prod_24',
    name: 'Handmade Soy Wax Scented Candle Set (4-Pack)',
    category: 'home',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    description: 'Premium 100% soy wax scented candles in 4 seasonal fragrances (Sandalwood, Lavender, Vanilla, Jasmine). Cotton wick, glass jar. Private label ready.',
    retailPrice: 1299,
    bulkPrice: 299,
    moq: 100,
    unit: 'sets',
    rating: 4.93,
    reviewsCount: 101,
    inStock: true,
    stockQuantity: 30000,
    featured: true,
    specifications: {
      'Wax Type': '100% Natural Soy Wax',
      'Wick': 'Lead-Free Cotton Wick',
      'Burn Time': '40–50 Hours per candle',
      'Fragrances': 'Sandalwood / Lavender / Vanilla / Jasmine'
    },
    tierPrices: [
      { minQty: 100, maxQty: 499, price: 379 },
      { minQty: 500, maxQty: 1999, price: 329 },
      { minQty: 2000, maxQty: 10000, price: 299 }
    ]
  },
  {
    id: 'prod_25',
    name: 'A4 80GSM Multi-Purpose Copier Paper (500 Sheets)',
    category: 'industrial',
    supplierId: 'sup_eco',
    supplierName: 'EcoPack Solutions Global',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop&q=80',
    description: 'FSC-certified 80 GSM A4 white copier and laser printer paper. Smooth surface, acid-free, jam-free guaranteed. Ream of 500 sheets.',
    retailPrice: 399,
    bulkPrice: 199,
    moq: 100,
    unit: 'reams',
    rating: 4.85,
    reviewsCount: 134,
    inStock: true,
    stockQuantity: 500000,
    featured: false,
    specifications: {
      'Weight': '80 GSM',
      'Size': 'A4 (210 x 297mm)',
      'Whiteness': '161 CIE Brightness',
      'Certification': 'FSC / ISO 9001 Certified'
    },
    tierPrices: [
      { minQty: 100, maxQty: 499, price: 235 },
      { minQty: 500, maxQty: 1999, price: 215 },
      { minQty: 2000, maxQty: 50000, price: 199 }
    ]
  },
  {
    id: 'prod_26',
    name: 'Kraft Paper Gift Box Set with Ribbon (30-Pack)',
    category: 'industrial',
    supplierId: 'sup_eco',
    supplierName: 'EcoPack Solutions Global',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&auto=format&fit=crop&q=80',
    description: 'Assorted kraft paper gift boxes in 5 sizes, includes satin ribbon, tissue paper liner. Ideal for jewellery, cosmetics, e-commerce gifting.',
    retailPrice: 1199,
    bulkPrice: 289,
    moq: 200,
    unit: 'packs',
    rating: 4.88,
    reviewsCount: 96,
    inStock: true,
    stockQuantity: 80000,
    featured: false,
    specifications: {
      'Sizes Included': 'XS/S/M/L/XL (6 of each)',
      'Material': '350 GSM Natural Brown Kraft',
      'Ribbon': 'Satin Ribbon + Tissue Paper Insert',
      'Custom Print': 'Logo stamp available on 1000+ units'
    },
    tierPrices: [
      { minQty: 200, maxQty: 999, price: 349 },
      { minQty: 1000, maxQty: 4999, price: 309 },
      { minQty: 5000, maxQty: 50000, price: 289 }
    ]
  },
  {
    id: 'prod_27',
    name: 'Men\'s Classic Fit 100% Cotton Polo T-Shirt',
    category: 'fashion',
    supplierId: 'sup_nordic',
    supplierName: 'Nordic Craft Wear Co',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&auto=format&fit=crop&q=80',
    description: 'Premium 220 GSM pique polo shirt for corporate branding, gifting and uniforms. Ribbed collar, 2-button placket, custom embroidery.',
    retailPrice: 1499,
    bulkPrice: 349,
    moq: 100,
    unit: 'pieces',
    rating: 4.87,
    reviewsCount: 73,
    inStock: true,
    stockQuantity: 25000,
    featured: true,
    specifications: {
      'Fabric Weight': '220 GSM Pique Knit Cotton',
      'Sizes': 'XS to 4XL (Custom sizing available)',
      'Colors': '16 Corporate Colors',
      'Branding': 'Chest embroidery logo included at 500+'
    },
    tierPrices: [
      { minQty: 100, maxQty: 299, price: 429 },
      { minQty: 300, maxQty: 999, price: 389 },
      { minQty: 1000, maxQty: 10000, price: 349 }
    ]
  },
  {
    id: 'prod_28',
    name: 'Portable Bluetooth Speaker IPX7 Waterproof 360°',
    category: 'electronics',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80',
    description: '360° surround sound portable speaker with 30W output, IPX7 waterproof, 20h playback, USB-C charging, built-in mic, NFC pairing.',
    retailPrice: 5999,
    bulkPrice: 1650,
    moq: 30,
    unit: 'units',
    rating: 4.81,
    reviewsCount: 54,
    inStock: true,
    stockQuantity: 6000,
    featured: false,
    specifications: {
      'Output': '30W 360° Surround Sound',
      'Battery': '6600mAh 20-Hour Playback',
      'Waterproof': 'IPX7 Submersible 30min/1m',
      'Connectivity': 'Bluetooth 5.3 + NFC'
    },
    tierPrices: [
      { minQty: 30, maxQty: 99, price: 1999 },
      { minQty: 100, maxQty: 499, price: 1799 },
      { minQty: 500, maxQty: 5000, price: 1650 }
    ]
  },
  {
    id: 'prod_29',
    name: 'Niacinamide 10% + Zinc 1% Face Serum 30ml',
    category: 'beauty',
    supplierId: 'sup_lumin',
    supplierName: 'Lumin Living & Appliances',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    description: 'Science-backed 10% niacinamide and 1% zinc pore-minimising serum for blemish-prone skin. Vegan, cruelty-free, private label ready.',
    retailPrice: 999,
    bulkPrice: 220,
    moq: 300,
    unit: 'bottles',
    rating: 4.94,
    reviewsCount: 118,
    inStock: true,
    stockQuantity: 60000,
    featured: true,
    specifications: {
      'Active Ingredients': '10% Niacinamide + 1% Zinc PCA',
      'Volume': '30ml Glass Dropper Bottle',
      'Skin Type': 'Oily / Combination / Blemish-Prone',
      'Certification': 'Vegan / Cruelty-Free / Dermatologist Tested'
    },
    tierPrices: [
      { minQty: 300, maxQty: 999, price: 269 },
      { minQty: 1000, maxQty: 4999, price: 239 },
      { minQty: 5000, maxQty: 20000, price: 220 }
    ]
  },
  {
    id: 'prod_30',
    name: 'Smart Digital Luggage Scale with LED Display',
    category: 'office',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    description: 'Portable digital luggage scale, 50kg capacity, large backlit LED display, tare function, auto-off, includes travel pouch. Ideal for retail gifting.',
    retailPrice: 899,
    bulkPrice: 199,
    moq: 100,
    unit: 'units',
    rating: 4.79,
    reviewsCount: 85,
    inStock: true,
    stockQuantity: 18000,
    featured: false,
    specifications: {
      'Capacity': '50kg / 110lbs Max',
      'Precision': '±10g accuracy',
      'Display': 'Large Blue Backlit LED',
      'Battery': 'CR2 Lithium (included)'
    },
    tierPrices: [
      { minQty: 100, maxQty: 499, price: 249 },
      { minQty: 500, maxQty: 1999, price: 219 },
      { minQty: 2000, maxQty: 10000, price: 199 }
    ]
  },
  {
    id: 'prod_31',
    name: 'Biodegradable PLA Cold Drink Cups 16oz (Pack of 100)',
    category: 'industrial',
    supplierId: 'sup_eco',
    supplierName: 'EcoPack Solutions Global',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop&q=80',
    description: 'Plant-based PLA compostable clear cold cups for bubble tea, juices, and smoothies. 100% petroleum-free, custom print lid and sleeve.',
    retailPrice: 699,
    bulkPrice: 149,
    moq: 1000,
    unit: 'packs',
    rating: 4.91,
    reviewsCount: 62,
    inStock: true,
    stockQuantity: 300000,
    featured: false,
    specifications: {
      'Material': '100% PLA Corn Starch Bioplastic',
      'Capacity': '16oz / 480ml',
      'Certifications': 'BPI Certified Compostable / FDA Safe',
      'Customization': 'Full-color print on 5000+ packs'
    },
    tierPrices: [
      { minQty: 1000, maxQty: 4999, price: 185 },
      { minQty: 5000, maxQty: 19999, price: 165 },
      { minQty: 20000, maxQty: 200000, price: 149 }
    ]
  },
  {
    id: 'prod_32',
    name: 'Leather Padfolio Business Portfolio with iPad Slot',
    category: 'office',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=600&auto=format&fit=crop&q=80',
    description: 'Executive PU leather portfolio with iPad/tablet sleeve, A4 notepad holder, card slots, pen loop, and zippered pockets. Custom embossing available.',
    retailPrice: 2999,
    bulkPrice: 699,
    moq: 50,
    unit: 'pieces',
    rating: 4.84,
    reviewsCount: 47,
    inStock: true,
    stockQuantity: 8000,
    featured: true,
    specifications: {
      'Material': 'Premium PU Leather Shell',
      'Tablet Size': 'Fits up to 11" iPad / Tablet',
      'Pockets': '12 Organizer pockets + Zip compartment',
      'Branding': 'Custom deboss logo available'
    },
    tierPrices: [
      { minQty: 50, maxQty: 199, price: 849 },
      { minQty: 200, maxQty: 999, price: 769 },
      { minQty: 1000, maxQty: 5000, price: 699 }
    ]
  },
  {
    id: 'prod_g1',
    name: 'Farm-Fresh Organic Red & Yellow Bell Peppers (10kg Crate)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80',
    description: 'Grade-A pesticide-free organic bell peppers harvested fresh daily. Temperature-controlled shipping crates ideal for supermarkets, hotels, and bulk retailers.',
    retailPrice: 48.00,
    bulkPrice: 24.50,
    moq: 10,
    unit: 'crates',
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    stockQuantity: 4500,
    featured: true,
    specifications: {
      'Grade': 'Export Grade A Premium',
      'Storage Temp': '7°C - 10°C Cold Chain',
      'Shelf Life': '14 Days Post Delivery',
      'Packaging': 'Vented Eco Crates (10kg net weight)'
    },
    tierPrices: [
      { minQty: 10, maxQty: 49, price: 28.50 },
      { minQty: 50, maxQty: 199, price: 26.00 },
      { minQty: 200, maxQty: 2000, price: 24.50 }
    ]
  },
  {
    id: 'prod_g2',
    name: 'Wholesale Red Onions & Premium Garlic Mesh Sack (25kg Pack)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    description: 'Farm-cured long shelf life red onions paired with premium whole white garlic bulbs. Triple-graded for size uniformity and high culinary standard.',
    retailPrice: 38.00,
    bulkPrice: 18.90,
    moq: 15,
    unit: 'bags',
    rating: 4.85,
    reviewsCount: 52,
    inStock: true,
    stockQuantity: 12000,
    featured: true,
    specifications: {
      'Origin': 'Salinas Valley Farm Direct',
      'Moisture Content': '< 12% Standard',
      'Bag Net Weight': '25 kg (55 lbs)',
      'Shelf Life': '60 Days in ventilated storage'
    },
    tierPrices: [
      { minQty: 15, maxQty: 49, price: 22.00 },
      { minQty: 50, maxQty: 199, price: 20.00 },
      { minQty: 200, maxQty: 5000, price: 18.90 }
    ]
  },
  {
    id: 'prod_g3',
    name: 'Hydroponic Organic Baby Spinach & Salad Greens (5kg Cold Box)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
    description: 'Triple-washed hydroponic baby spinach and romaine lettuce delivered in refrigerated insulated boxes with ice gel packs. Zero soil residue, 100% organic.',
    retailPrice: 28.00,
    bulkPrice: 14.50,
    moq: 20,
    unit: 'boxes',
    rating: 4.95,
    reviewsCount: 38,
    inStock: true,
    stockQuantity: 3200,
    featured: true,
    specifications: {
      'Cultivation': 'Advanced Closed-Loop Hydroponics',
      'Washing': 'Triple Ozone Purified Water Wash',
      'Net Weight': '5 kg Box (Insulated Gel Pack)',
      'Certification': 'USDA Organic & Global GAP'
    },
    tierPrices: [
      { minQty: 20, maxQty: 49, price: 17.00 },
      { minQty: 50, maxQty: 99, price: 15.50 },
      { minQty: 100, maxQty: 1000, price: 14.50 }
    ]
  },
  {
    id: 'prod_g4',
    name: 'Farm Direct Vine Tomatoes & Potatoes Crate (50kg Combo)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Fresh farm vine-ripened red tomatoes paired with washed Russet potatoes. Essential staple combo for commercial kitchens, mess halls, and caterers.',
    retailPrice: 65.00,
    bulkPrice: 32.00,
    moq: 10,
    unit: 'crates',
    rating: 4.88,
    reviewsCount: 47,
    inStock: true,
    stockQuantity: 6500,
    featured: true,
    specifications: {
      'Combo Ratio': '25kg Tomatoes + 25kg Potatoes',
      'Quality Grade': 'A Premium Commercial',
      'Packaging': 'Heavy Duty Stackable Plastic Crates',
      'Dispatch': 'Same Day Harvest Dispatch'
    },
    tierPrices: [
      { minQty: 10, maxQty: 29, price: 37.00 },
      { minQty: 30, maxQty: 99, price: 34.00 },
      { minQty: 100, maxQty: 2000, price: 32.00 }
    ]
  },
  {
    id: 'prod_g5',
    name: 'Royal Extra Long Aged Basmati Rice Sack (50kg Bulk Bag)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description: '100% Pure Aged 1121 Extra Long Grain Basmati Rice. Fluffy, non-sticky texture with rich authentic aroma for catering and grocery retail.',
    retailPrice: 85.00,
    bulkPrice: 45.00,
    moq: 5,
    unit: 'bags',
    rating: 4.98,
    reviewsCount: 92,
    inStock: true,
    stockQuantity: 15000,
    featured: true,
    specifications: {
      'Grain Length': '8.35 mm Pre-cooked',
      'Aging': '2 Years Natural Warehouse Aged',
      'Admixture': '< 1%',
      'Bag Type': 'Food Grade Jute Sack (50kg)'
    },
    tierPrices: [
      { minQty: 5, maxQty: 19, price: 52.00 },
      { minQty: 20, maxQty: 99, price: 48.00 },
      { minQty: 100, maxQty: 5000, price: 45.00 }
    ]
  },
  {
    id: 'prod_g6',
    name: 'Cold-Pressed Pure Sunflower & Mustard Oil (20L Canister)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    description: '100% natural expeller-pressed edible oil with zero chemical solvents. High smoke point ideal for commercial cooking, frying, and food manufacturing.',
    retailPrice: 72.00,
    bulkPrice: 38.50,
    moq: 5,
    unit: 'canisters',
    rating: 4.9,
    reviewsCount: 41,
    inStock: true,
    stockQuantity: 8000,
    featured: true,
    specifications: {
      'Extraction Method': 'Traditional Wooden Cold Press (Ghani)',
      'Free Fatty Acid': '< 0.5%',
      'Container': 'BPA-Free Food Grade HD-PE Canister (20 Liters)',
      'Shelf Life': '12 Months'
    },
    tierPrices: [
      { minQty: 5, maxQty: 19, price: 44.00 },
      { minQty: 20, maxQty: 49, price: 41.00 },
      { minQty: 50, maxQty: 1000, price: 38.50 }
    ]
  },
  {
    id: 'prod_g7',
    name: 'Fresh Farm Broccoli & Cauliflower Florets (10kg Insulated Box)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp green broccoli heads and snow-white cauliflower florets. Packed in temperature-monitored crates to preserve nutrients.',
    retailPrice: 42.00,
    bulkPrice: 22.00,
    moq: 10,
    unit: 'boxes',
    rating: 4.87,
    reviewsCount: 33,
    inStock: true,
    stockQuantity: 5200,
    featured: false,
    specifications: {
      'Grade': 'A Grade Export Standard',
      'Ratio': '5kg Broccoli + 5kg Cauliflower',
      'Packaging': 'Chilled Insulated Box with Ice Gel',
      'Shelf Life': '10 Days Cold Chain'
    },
    tierPrices: [
      { minQty: 10, maxQty: 49, price: 25.50 },
      { minQty: 50, maxQty: 199, price: 23.50 },
      { minQty: 200, maxQty: 1000, price: 22.00 }
    ]
  },
  {
    id: 'prod_g8',
    name: 'Organic Farm Carrots & Beetroot Combo Crate (20kg)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1447175008436-08417189295a?w=600&auto=format&fit=crop&q=80',
    description: 'Farm-fresh sweet crunchy orange carrots and deep red beetroots. Ideal for juicing bars, salad counters, and supermarkets.',
    retailPrice: 36.00,
    bulkPrice: 19.50,
    moq: 15,
    unit: 'crates',
    rating: 4.91,
    reviewsCount: 29,
    inStock: true,
    stockQuantity: 7400,
    featured: false,
    specifications: {
      'Origin': 'Salinas Organic Growers',
      'Washing': 'Pre-washed Root Vegetables',
      'Net Weight': '20 kg (44 lbs)',
      'Shelf Life': '30 Days Refrigerated'
    },
    tierPrices: [
      { minQty: 15, maxQty: 49, price: 22.50 },
      { minQty: 50, maxQty: 199, price: 20.50 },
      { minQty: 200, maxQty: 1000, price: 19.50 }
    ]
  },
  {
    id: 'prod_g9',
    name: 'Crisp Green Cucumbers & Zucchini Wholesale Box (15kg)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&auto=format&fit=crop&q=80',
    description: 'Greenhouse grown seedless cucumbers and dark green zucchini. Firm, hydrating, and uniform size for gourmet food service.',
    retailPrice: 32.00,
    bulkPrice: 16.80,
    moq: 12,
    unit: 'boxes',
    rating: 4.82,
    reviewsCount: 24,
    inStock: true,
    stockQuantity: 4100,
    featured: false,
    specifications: {
      'Type': 'English Seedless & Green Zucchini',
      'Weight': '15 kg per corrugated box',
      'Storage': '8°C - 12°C',
      'Pesticide Standard': '100% Residue Free'
    },
    tierPrices: [
      { minQty: 12, maxQty: 49, price: 19.50 },
      { minQty: 50, maxQty: 199, price: 17.80 },
      { minQty: 200, maxQty: 1000, price: 16.80 }
    ]
  },
  {
    id: 'prod_g10',
    name: 'Fresh Green Peas & French Beans Mesh Crate (10kg)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&auto=format&fit=crop&q=80',
    description: 'Hand-picked tender green peas in pod paired with crisp snap french beans. Farm fresh quality packed in breathable mesh crates.',
    retailPrice: 40.00,
    bulkPrice: 21.00,
    moq: 10,
    unit: 'crates',
    rating: 4.89,
    reviewsCount: 31,
    inStock: true,
    stockQuantity: 3900,
    featured: false,
    specifications: {
      'Ratio': '5kg Peas + 5kg French Beans',
      'Freshness': 'Picked 24h prior to shipping',
      'Packaging': 'Ventilated Food Plastic Crates',
      'Shelf Life': '12 Days in Cold Storage'
    },
    tierPrices: [
      { minQty: 10, maxQty: 49, price: 24.00 },
      { minQty: 50, maxQty: 199, price: 22.50 },
      { minQty: 200, maxQty: 1000, price: 21.00 }
    ]
  },
  {
    id: 'prod_g11',
    name: 'Fresh Sweet Corn Cobs & Baby Corn Wholesale Bundle (50 Pcs)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    description: 'Golden juicy sweet corn ears in husk alongside tender baby corn. High sugar content and natural sweetness.',
    retailPrice: 30.00,
    bulkPrice: 15.50,
    moq: 15,
    unit: 'bundles',
    rating: 4.84,
    reviewsCount: 22,
    inStock: true,
    stockQuantity: 6200,
    featured: false,
    specifications: {
      'Variety': 'Golden Super Sweet & Tender Baby Corn',
      'Count': '35 Sweet Corn + 15 Baby Corn Packs',
      'Husk': 'Intact natural protective husk',
      'Grade': 'Choice Commercial Grade'
    },
    tierPrices: [
      { minQty: 15, maxQty: 49, price: 18.00 },
      { minQty: 50, maxQty: 199, price: 16.50 },
      { minQty: 200, maxQty: 1000, price: 15.50 }
    ]
  },
  {
    id: 'prod_g12',
    name: 'Organic Avocados & Hass Avocado Commercial Box (10kg)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
    description: 'Creamy Hass avocados harvested at optimal oil maturity. Ideal for restaurants, guacamole makers, and health stores.',
    retailPrice: 70.00,
    bulkPrice: 36.00,
    moq: 8,
    unit: 'boxes',
    rating: 4.96,
    reviewsCount: 58,
    inStock: true,
    stockQuantity: 2800,
    featured: true,
    specifications: {
      'Variety': '100% Hass Avocado Organic',
      'Size': '48s / 60s Count per 10kg Box',
      'Ripeness': 'Stage 2 Hard-Green (Ready for transport)',
      'Origin': 'California Farm Direct'
    },
    tierPrices: [
      { minQty: 8, maxQty: 29, price: 41.00 },
      { minQty: 30, maxQty: 99, price: 38.00 },
      { minQty: 100, maxQty: 1000, price: 36.00 }
    ]
  },
  {
    id: 'prod_g13',
    name: 'Fresh Red & Green Chili Peppers Bulk Bag (5kg)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
    description: 'Spicy fresh red hot chili peppers and vibrant green Thai chilies. High capsaicin level, pungent flavor for hot sauce and cooking.',
    retailPrice: 24.00,
    bulkPrice: 12.80,
    moq: 20,
    unit: 'bags',
    rating: 4.88,
    reviewsCount: 19,
    inStock: true,
    stockQuantity: 5000,
    featured: false,
    specifications: {
      'Scoville Heat': '30,000 - 50,000 SHU',
      'Weight': '5 kg Net Bag',
      'Color': '50% Red / 50% Green Split',
      'Shelf Life': '20 Days'
    },
    tierPrices: [
      { minQty: 20, maxQty: 49, price: 15.00 },
      { minQty: 50, maxQty: 199, price: 13.80 },
      { minQty: 200, maxQty: 1000, price: 12.80 }
    ]
  },
  {
    id: 'prod_g14',
    name: 'Fresh Farm Ginger & Turmeric Root Mesh Bag (10kg)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    description: 'Plump washed ginger rhizomes and high-curcumin raw orange turmeric root. Powerful natural aromatic roots for wholesale.',
    retailPrice: 52.00,
    bulkPrice: 28.00,
    moq: 10,
    unit: 'bags',
    rating: 4.93,
    reviewsCount: 44,
    inStock: true,
    stockQuantity: 4300,
    featured: false,
    specifications: {
      'Curcumin Content': '> 5.2% in Turmeric',
      'Ginger Rhizome Size': '150g+ per piece',
      'Net Weight': '10 kg (5kg Ginger + 5kg Turmeric)',
      'Drying': 'Soil Free Cured Roots'
    },
    tierPrices: [
      { minQty: 10, maxQty: 49, price: 32.00 },
      { minQty: 50, maxQty: 199, price: 29.50 },
      { minQty: 200, maxQty: 1000, price: 28.00 }
    ]
  },
  {
    id: 'prod_g15',
    name: 'Organic Whole Wheat Flour (Atta) Sack (50kg Bag)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    description: 'Stone-ground 100% whole wheat chakki atta. High dietary fiber content, perfect for bakeries, flatbreads, and retail grocery packaging.',
    retailPrice: 55.00,
    bulkPrice: 29.00,
    moq: 5,
    unit: 'bags',
    rating: 4.91,
    reviewsCount: 67,
    inStock: true,
    stockQuantity: 18000,
    featured: false,
    specifications: {
      'Grinding': 'Traditional Chakki Stone Milled',
      'Ash Content': '< 1.5%',
      'Gluten Strength': '30% Min Index',
      'Packaging': 'Heavy Duty 50kg Moisture Proof Sack'
    },
    tierPrices: [
      { minQty: 5, maxQty: 19, price: 34.00 },
      { minQty: 20, maxQty: 99, price: 31.00 },
      { minQty: 100, maxQty: 5000, price: 29.00 }
    ]
  },
  {
    id: 'prod_g16',
    name: 'Premium Yellow Toor Dal & Chana Lentils Sack (25kg Bag)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?w=600&auto=format&fit=crop&q=80',
    description: 'Unpolished protein-rich yellow split pigeon peas (Toor Dal) and chickpeas. Cleaned, sorted with optical laser machinery.',
    retailPrice: 62.00,
    bulkPrice: 34.00,
    moq: 10,
    unit: 'bags',
    rating: 4.89,
    reviewsCount: 36,
    inStock: true,
    stockQuantity: 11000,
    featured: false,
    specifications: {
      'Purity': '99.9% Optical Sorted',
      'Moisture': '< 10%',
      'Weight': '25 kg Sack',
      'Polish': '100% Unpolished Natural'
    },
    tierPrices: [
      { minQty: 10, maxQty: 49, price: 39.00 },
      { minQty: 50, maxQty: 199, price: 36.00 },
      { minQty: 200, maxQty: 5000, price: 34.00 }
    ]
  },
  {
    id: 'prod_g17',
    name: 'Pure Organic Raw Honey & Wildflower Nectar (10kg Bucket)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    description: 'Unheated unfiltered pure wildflower raw honey direct from apiaries. Rich golden texture with natural pollen and enzymes.',
    retailPrice: 120.00,
    bulkPrice: 65.00,
    moq: 4,
    unit: 'buckets',
    rating: 4.97,
    reviewsCount: 81,
    inStock: true,
    stockQuantity: 2100,
    featured: true,
    specifications: {
      'Purity': '100% Pure Raw Wildflower Honey',
      'HMF Level': '< 15 mg/kg',
      'Diastase Activity': '> 10 DN',
      'Container': 'Food Grade 10kg Sealed Pail'
    },
    tierPrices: [
      { minQty: 4, maxQty: 19, price: 75.00 },
      { minQty: 20, maxQty: 49, price: 69.00 },
      { minQty: 50, maxQty: 500, price: 65.00 }
    ]
  },
  {
    id: 'prod_g18',
    name: 'Whole Black Pepper & Spices Export Crate (5kg Box)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    description: 'Sun-dried high-piping Malabar black peppercorns, whole green cardamom pods, and cinnamon bark spice box.',
    retailPrice: 90.00,
    bulkPrice: 48.00,
    moq: 5,
    unit: 'boxes',
    rating: 4.94,
    reviewsCount: 39,
    inStock: true,
    stockQuantity: 3400,
    featured: false,
    specifications: {
      'Contents': '3kg Black Pepper + 1kg Cardamom + 1kg Cinnamon',
      'Piperine Content': '> 5.5% in Black Pepper',
      'Packaging': 'Vacuum Sealed Aluminum Foil Bags in 5kg Box',
      'Origin': 'Kerala Spice Estate Direct'
    },
    tierPrices: [
      { minQty: 5, maxQty: 19, price: 55.00 },
      { minQty: 20, maxQty: 49, price: 51.00 },
      { minQty: 50, maxQty: 500, price: 48.00 }
    ]
  },
  {
    id: 'prod_g19',
    name: 'Fresh Lemons & Citrus Farm Crate (20kg)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1534531141161-e41d133a897d?w=600&auto=format&fit=crop&q=80',
    description: 'Juicy bright yellow Eureka lemons and fresh limes. High juice yield, thin skin, packed in ventilated crates for beverage and kitchen use.',
    retailPrice: 34.00,
    bulkPrice: 18.00,
    moq: 10,
    unit: 'crates',
    rating: 4.86,
    reviewsCount: 27,
    inStock: true,
    stockQuantity: 6700,
    featured: false,
    specifications: {
      'Juice Content': '> 42% by weight',
      'Size': '115s / 140s Count per 20kg Crate',
      'Storage': '10°C Cold Chain',
      'Shelf Life': '25 Days'
    },
    tierPrices: [
      { minQty: 10, maxQty: 49, price: 21.00 },
      { minQty: 50, maxQty: 199, price: 19.50 },
      { minQty: 200, maxQty: 1000, price: 18.00 }
    ]
  },
  {
    id: 'prod_g20',
    name: 'Extra Virgin Cold-Pressed Olive Oil Commercial Drum (25L)',
    category: 'groceries',
    supplierId: 'sup_greenharvest',
    supplierName: 'GreenHarvest Organic Farms & Agro',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    description: 'First cold-pressed Mediterranean extra virgin olive oil with low acidity (<0.3%). Exceptional aroma for fine dining restaurants and bottling.',
    retailPrice: 160.00,
    bulkPrice: 85.00,
    moq: 2,
    unit: 'drums',
    rating: 4.99,
    reviewsCount: 73,
    inStock: true,
    stockQuantity: 1500,
    featured: true,
    specifications: {
      'Acidity': '< 0.3% Free Fatty Acids',
      'Extraction': 'Single Estate First Cold Extraction (<27°C)',
      'Container': 'Stainless Steel / Food Grade 25L Drum',
      'Certification': 'IOC Certified Extra Virgin'
    },
    tierPrices: [
      { minQty: 2, maxQty: 9, price: 98.00 },
      { minQty: 10, maxQty: 29, price: 90.00 },
      { minQty: 30, maxQty: 200, price: 85.00 }
    ]
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev_1',
    productId: 'prod_1',
    userName: 'David Miller',
    userRole: 'E-commerce Store Owner',
    rating: 5,
    date: '2026-06-14',
    comment: 'Ordered 500 units for our Amazon storefront. The ANC quality blew us away and profit margins are around 65% per unit sold!'
  },
  {
    id: 'rev_2',
    productId: 'prod_1',
    userName: 'Sarah Jenkins',
    userRole: 'Corporate Purchasing Manager',
    rating: 5,
    date: '2026-05-22',
    comment: 'Custom logo printing was flawless. Delivered to our SF office in 4 days. Will order another batch for Q4 gifting.'
  },
  {
    id: 'rev_3',
    productId: 'prod_3',
    userName: 'Marcus Thorne',
    userRole: 'Streetwear Brand Founder',
    rating: 5,
    date: '2026-07-02',
    comment: 'The 450GSM weight is elite. Comparable to luxury brands selling at $160+. Our customers love the heavy drape.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Price Drop Alert',
    message: 'Pro Wireless ANC Earbuds bulk tier price reduced to ₹2,337 for orders over 500 units.',
    time: '2 hours ago',
    read: false,
    type: 'promo'
  },
  {
    id: 'notif_2',
    title: 'Supplier Verified',
    message: 'Apex Global Tech Ltd has achieved Diamond Wholesaler Verification badge.',
    time: '1 day ago',
    read: true,
    type: 'system'
  },
  {
    id: 'notif_3',
    title: 'Savings Milestone',
    message: 'You have calculated over ₹12,00,000 in potential bulk margins this month!',
    time: '3 days ago',
    read: true,
    type: 'savings'
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 'test_1',
    name: 'Elena Rostova',
    role: 'Founder & CEO, TechGlow Retail',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    quote: 'Bulk Saves Hub allowed us to cut intermediary supplier costs by 42%. We connected directly with Apex Global and scaled our inventory in 3 weeks.',
    rating: 5,
    savingsAmount: '₹31,72,800'
  },
  {
    id: 'test_2',
    name: 'James Thornton',
    role: 'Director of Procurement, Apex Logistics',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
    quote: 'The Savings Calculator and MOQ tier comparison tool saved our procurement team endless hours. A must-have B2B platform.',
    rating: 5,
    savingsAmount: '₹92,54,400'
  },
  {
    id: 'test_3',
    name: 'Chloe Bennett',
    role: 'Brand Manager, Thread & Co',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    quote: 'Verification badges give total peace of mind. Every wholesaler we connected with on Bulk Saves Hub provided genuine sample kits.',
    rating: 5,
    savingsAmount: '₹20,23,500'
  }
];

export const INITIAL_FAQS = [
  {
    question: 'How does Bulk Saves Hub help buyers save money?',
    answer: 'We aggregate direct manufacturer & wholesale pricing, eliminating middleman broker markups. Our real-time price comparison engine displays true volume tiers and estimated profit margins so you buy at factory rates.'
  },
  {
    question: 'Are all suppliers on Bulk Saves Hub verified?',
    answer: 'Yes! Suppliers with the Verified Wholesaler badge undergo strict verification including business license audits, factory origin checks, ISO compliance checks, and MOQ fulfillment history.'
  },
  {
    question: 'What is Minimum Order Quantity (MOQ)?',
    answer: 'MOQ is the minimum quantity of product units a wholesale supplier is willing to sell in a single order to maintain volume pricing. Higher MOQs typically unlock deeper discounts.'
  },
  {
    question: 'Can I request sample products before placing a full bulk order?',
    answer: 'Absolutely. You can click "Contact Supplier" on any product card or supplier profile page to inquire directly about sample shipments and custom branding quotes.'
  },
  {
    question: 'How do I submit or manage my own products as a supplier?',
    answer: 'Simply log in to your account, head to the User Dashboard or Products page, and click "Add Product". You can manage tiered volume pricing, specs, images, and inventory in real time.'
  }
];

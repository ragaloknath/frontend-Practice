import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_SUPPLIERS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS
} from './initialData';

const KEYS = {
  PRODUCTS: 'bsh_products_v2',
  CATEGORIES: 'bsh_categories_v2',
  SUPPLIERS: 'bsh_suppliers_v2',
  WISHLIST: 'bsh_wishlist_v2',
  MESSAGES: 'bsh_contact_messages_v2',
  REVIEWS: 'bsh_reviews_v2',
  NOTIFICATIONS: 'bsh_notifications_v2',
  SEARCH_HISTORY: 'bsh_search_history_v2',
  USERS: 'bsh_users_v2',
  CURRENT_USER: 'bsh_current_user_v2'
};

// Helper: Safe JSON Parse & Stringify
const getItem = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
};

const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
};

// Initialize Storage with defaults if empty
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    setItem(KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }
  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    setItem(KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }
  if (!localStorage.getItem(KEYS.SUPPLIERS)) {
    setItem(KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
  }
  if (!localStorage.getItem(KEYS.REVIEWS)) {
    setItem(KEYS.REVIEWS, INITIAL_REVIEWS);
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    setItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }
  if (!localStorage.getItem(KEYS.WISHLIST)) {
    setItem(KEYS.WISHLIST, ['prod_1', 'prod_3']);
  }
  if (!localStorage.getItem(KEYS.SEARCH_HISTORY)) {
    setItem(KEYS.SEARCH_HISTORY, ['ANC Earbuds', 'Organic Cotton Blank', 'Air Fryer XL']);
  }
  if (!localStorage.getItem(KEYS.MESSAGES)) {
    setItem(KEYS.MESSAGES, [
      {
        id: 'msg_1',
        name: 'Alexander Wright',
        email: 'alex@techimports.co',
        subject: 'Custom OEM Logo Inquiry',
        message: 'Looking for 1,500 custom branded earbud units for our tech conference gift set.',
        date: '2026-07-28 14:30'
      }
    ]);
  }
  // Initialize default demo user if none exists
  if (!localStorage.getItem(KEYS.USERS)) {
    const defaultUser = {
      uid: 'user_demo_101',
      name: 'Alex Johnson',
      email: 'alex.demo@bulksaveshub.com',
      company: 'Horizon Global Retail',
      role: 'Wholesale Buyer',
      phone: '+1 (555) 234-5678',
      joinedDate: '2026-01-15'
    };
    setItem(KEYS.USERS, [defaultUser]);
    if (!localStorage.getItem(KEYS.CURRENT_USER)) {
      setItem(KEYS.CURRENT_USER, defaultUser);
    }
  }
};

// Storage Service API methods
export const storageService = {
  // PRODUCTS CRUD
  getProducts: () => getItem(KEYS.PRODUCTS, INITIAL_PRODUCTS),
  
  getProductById: (id) => {
    const products = getItem(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    return products.find(p => p.id === id) || null;
  },

  addProduct: (productData) => {
    const products = getItem(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const newProduct = {
      ...productData,
      id: `prod_${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      inStock: true,
      featured: false,
      tierPrices: productData.tierPrices || [
        { minQty: Number(productData.moq) || 10, maxQty: 99, price: Number(productData.bulkPrice) * 1.1 },
        { minQty: 100, maxQty: 1000, price: Number(productData.bulkPrice) }
      ]
    };
    const updated = [newProduct, ...products];
    setItem(KEYS.PRODUCTS, updated);
    return newProduct;
  },

  updateProduct: (id, updatedFields) => {
    const products = getItem(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setItem(KEYS.PRODUCTS, updated);
    return updated.find(p => p.id === id);
  },

  deleteProduct: (id) => {
    const products = getItem(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = products.filter(p => p.id !== id);
    setItem(KEYS.PRODUCTS, updated);
    
    // Also cleanup wishlist
    const wishlist = getItem(KEYS.WISHLIST, []);
    setItem(KEYS.WISHLIST, wishlist.filter(pId => pId !== id));
    return true;
  },

  // CATEGORIES & SUPPLIERS
  getCategories: () => getItem(KEYS.CATEGORIES, INITIAL_CATEGORIES),
  getSuppliers: () => getItem(KEYS.SUPPLIERS, INITIAL_SUPPLIERS),
  getSupplierById: (id) => {
    const suppliers = getItem(KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
    return suppliers.find(s => s.id === id) || null;
  },

  // WISHLIST CRUD
  getWishlist: () => getItem(KEYS.WISHLIST, []),
  
  toggleWishlist: (productId) => {
    const wishlist = getItem(KEYS.WISHLIST, []);
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter(id => id !== productId);
    } else {
      updated = [productId, ...wishlist];
    }
    setItem(KEYS.WISHLIST, updated);
    return updated;
  },

  // REVIEWS CRUD
  getReviews: (productId) => {
    const reviews = getItem(KEYS.REVIEWS, INITIAL_REVIEWS);
    if (!productId) return reviews;
    return reviews.filter(r => r.productId === productId);
  },

  addReview: (reviewData) => {
    const reviews = getItem(KEYS.REVIEWS, INITIAL_REVIEWS);
    const newReview = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newReview, ...reviews];
    setItem(KEYS.REVIEWS, updated);

    // Update product rating and reviews count
    const products = getItem(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const productReviews = updated.filter(r => r.productId === reviewData.productId);
    const avgRating = (productReviews.reduce((sum, r) => sum + Number(r.rating), 0) / productReviews.length).toFixed(1);

    storageService.updateProduct(reviewData.productId, {
      rating: parseFloat(avgRating),
      reviewsCount: productReviews.length
    });

    return newReview;
  },

  // CONTACT MESSAGES CRUD
  getMessages: () => getItem(KEYS.MESSAGES, []),
  
  addMessage: (msg) => {
    const messages = getItem(KEYS.MESSAGES, []);
    const newMsg = {
      ...msg,
      id: `msg_${Date.now()}`,
      date: new Date().toLocaleString()
    };
    const updated = [newMsg, ...messages];
    setItem(KEYS.MESSAGES, updated);
    return newMsg;
  },

  // SEARCH HISTORY CRUD
  getSearchHistory: () => getItem(KEYS.SEARCH_HISTORY, []),
  
  addSearchQuery: (query) => {
    if (!query || !query.trim()) return;
    const history = getItem(KEYS.SEARCH_HISTORY, []);
    const filtered = history.filter(q => q.toLowerCase() !== query.toLowerCase());
    const updated = [query.trim(), ...filtered].slice(0, 10);
    setItem(KEYS.SEARCH_HISTORY, updated);
    return updated;
  },

  clearSearchHistory: () => {
    setItem(KEYS.SEARCH_HISTORY, []);
    return [];
  },

  // NOTIFICATIONS CRUD
  getNotifications: () => getItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS),

  markNotificationAsRead: (id) => {
    const notifs = getItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    setItem(KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  deleteNotification: (id) => {
    const notifs = getItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const updated = notifs.filter(n => n.id !== id);
    setItem(KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  // AUTH & USER CRUD
  getCurrentUser: () => getItem(KEYS.CURRENT_USER, null),
  
  setCurrentUser: (user) => {
    setItem(KEYS.CURRENT_USER, user);
  },

  getUsers: () => getItem(KEYS.USERS, []),

  registerUser: (userData) => {
    const users = getItem(KEYS.USERS, []);
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }
    const newUser = {
      uid: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      company: userData.company || 'Direct Buyer',
      role: userData.role || 'Wholesale Buyer',
      phone: userData.phone || '',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    const updatedUsers = [...users, newUser];
    setItem(KEYS.USERS, updatedUsers);
    setItem(KEYS.CURRENT_USER, newUser);
    return newUser;
  },

  loginUser: (email, password) => {
    const users = getItem(KEYS.USERS, []);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Create user on the fly if testing login with new email
      const newUser = {
        uid: `user_${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        company: 'Bulk Trader Co',
        role: 'Wholesale Buyer',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      users.push(newUser);
      setItem(KEYS.USERS, users);
      setItem(KEYS.CURRENT_USER, newUser);
      return newUser;
    }
    setItem(KEYS.CURRENT_USER, user);
    return user;
  },

  updateUserProfile: (updatedFields) => {
    const currentUser = getItem(KEYS.CURRENT_USER, null);
    if (!currentUser) return null;
    const updated = { ...currentUser, ...updatedFields };
    setItem(KEYS.CURRENT_USER, updated);

    // Update in users array
    const users = getItem(KEYS.USERS, []);
    const updatedUsers = users.map(u => u.uid === updated.uid ? updated : u);
    setItem(KEYS.USERS, updatedUsers);

    return updated;
  },

  logoutUser: () => {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
};

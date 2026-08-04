import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useCompare } from '../../context/CompareContext';
import { ThemeToggle } from './ThemeToggle';
import {
  PackageSearch,
  Heart,
  Scale,
  Bell,
  User,
  LogOut,
  Sliders,
  PlusCircle,
  Menu,
  X,
  Search,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Package,
  Sparkles,
  Clock,
  Building2,
  Tag,
  Phone,
  Zap
} from 'lucide-react';

export const Navbar = ({ onOpenAddModal }) => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { products, categories, suppliers, wishlist, notifications, searchHistory, markNotificationRead, logSearch } = useProducts();
  const { compareItems, toggleCompareDrawer } = useCompare();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const notifRef = useRef();
  const profileRef = useRef();
  const searchContainerRef = useRef();
  const mobileInputRef = useRef();

  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Filter matching items for Live Search Dropdown
  const matchingProducts = searchQuery.trim()
    ? products.filter(p => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchesText = p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.supplierName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        return matchesCategory && matchesText;
      }).slice(0, 5)
    : [];

  const matchingCategories = searchQuery.trim()
    ? categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchingSuppliers = searchQuery.trim()
    ? suppliers.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus mobile input when mobile search is opened
  useEffect(() => {
    if (isMobileSearchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      logSearch(searchQuery.trim());
      let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`;
      }
      navigate(url);
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSelectProduct = (productId) => {
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    navigate(`/products/${productId}`);
  };

  const handleSelectCategory = (catId) => {
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    navigate(`/products?category=${catId}`);
  };

  const handleSelectSupplier = (supId) => {
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    navigate(`/suppliers/${supId}`);
  };

  const navLinks = [
    { name: 'All Products', path: '/products', icon: Package },
    { name: 'Categories', path: '/categories', icon: Tag },
    { name: 'Suppliers', path: '/suppliers', icon: Building2 },
    { name: 'Savings Calculator', path: '/calculator', icon: Sparkles },
    { name: 'About Us', path: '/about', icon: ShieldCheck },
    { name: 'Contact Support', path: '/contact', icon: Phone }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* ─── TOP ANNOUNCEMENT BAR ─── */}
      <div className="bg-gradient-to-r from-slate-950 via-brand-950 to-indigo-950 text-white text-[11px] py-1.5 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified Factory Wholesalers</span>
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">Escrow Buyer Protection Active</span>
          </div>
          <div className="flex items-center space-x-5">
            <a href="tel:+18004890192" className="text-gray-300 hover:text-white flex items-center space-x-1">
              <Phone className="w-3 h-3 text-brand-400" />
              <span>Support: +1 (800) 489-0192</span>
            </a>
            <Link to="/register" className="text-brand-300 hover:text-white font-semibold">
              Become a Verified Supplier
            </Link>
          </div>
        </div>
      </div>

      {/* ─── MAIN HEADER (TIER 1) ─── */}
      <nav className="glass-nav border-b border-gray-200/80 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
                <PackageSearch className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Bulk<span className="text-brand-600 dark:text-brand-400">Saves</span>Hub
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500 -mt-1">
                  B2B Wholesale Platform
                </span>
              </div>
            </Link>

            {/* ─── AMAZON/ALIBABA STYLE DESKTOP SEARCH BAR (CENTER) ─── */}
            <div className="hidden md:flex flex-1 max-w-2xl relative" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="flex w-full items-center">
                
                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-11 px-3 bg-gray-100 dark:bg-gray-800/90 border border-r-0 border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 z-10 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                {/* Input Field */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    placeholder="Search 48,000+ bulk products, suppliers, SKUs..."
                    className="w-full h-11 pl-4 pr-10 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/80 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-[#151C28] transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="h-11 px-5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs rounded-r-2xl shadow-md transition-all flex items-center justify-center space-x-1.5 flex-shrink-0"
                  title="Search Wholesale Database"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden lg:inline">Search</span>
                </button>
              </form>

              {/* ─── LIVE AUTOCOMPLETE DROPDOWN POPOVER ─── */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#151C28] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  
                  {searchQuery.trim() ? (
                    <>
                      {/* Products Section */}
                      {matchingProducts.length > 0 && (
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                          <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                              Matching Bulk Products ({matchingProducts.length})
                            </span>
                            <span className="text-[10px] text-gray-400">Click to view specs</span>
                          </div>
                          <div className="space-y-1">
                            {matchingProducts.map(prod => {
                              const savingsPct = Math.round(((prod.retailPrice - prod.bulkPrice) / prod.retailPrice) * 100);
                              return (
                                <div
                                  key={prod.id}
                                  onClick={() => handleSelectProduct(prod.id)}
                                  className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-950/60 cursor-pointer transition-colors group"
                                >
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="w-11 h-11 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0 shadow-sm"
                                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80'; }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">
                                      {prod.name}
                                    </h5>
                                    <span className="text-[11px] text-gray-500 block truncate">
                                      {prod.supplierName} · {prod.category}
                                    </span>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <span className="text-xs font-black text-brand-600 dark:text-brand-400 block">
                                      ₹{prod.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                    </span>
                                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                                      {savingsPct}% OFF
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Categories Section */}
                      {matchingCategories.length > 0 && (
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block px-2 mb-2">
                            Matching Categories
                          </span>
                          <div className="flex flex-wrap gap-2 px-1">
                            {matchingCategories.map(cat => (
                              <button
                                key={cat.id}
                                onClick={() => handleSelectCategory(cat.id)}
                                className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-brand-600 hover:text-white transition-colors"
                              >
                                {cat.name} ({cat.count})
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suppliers Section */}
                      {matchingSuppliers.length > 0 && (
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block px-2 mb-2">
                            Verified Suppliers
                          </span>
                          <div className="space-y-1">
                            {matchingSuppliers.map(sup => (
                              <div
                                key={sup.id}
                                onClick={() => handleSelectSupplier(sup.id)}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 cursor-pointer"
                              >
                                <img src={sup.logo} alt={sup.name} className="w-8 h-8 rounded-lg object-cover" />
                                <div>
                                  <div className="text-xs font-bold text-gray-900 dark:text-white">{sup.name}</div>
                                  <div className="text-[10px] text-emerald-500 font-semibold">Verified Diamond Wholesaler</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {matchingProducts.length === 0 && matchingCategories.length === 0 && (
                        <div className="p-6 text-center text-xs text-gray-500">
                          No wholesale items found matching "<strong className="text-gray-800 dark:text-gray-200">{searchQuery}</strong>"
                        </div>
                      )}

                      {/* See All Results Button */}
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full p-3 bg-brand-50/80 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/80 text-xs font-bold text-brand-700 dark:text-brand-300 text-center flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <span>See all results for "{searchQuery}"</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    /* Focused but Empty: Show Recent Searches & Trending Keywords */
                    <div className="p-4 space-y-4">
                      {searchHistory.length > 0 && (
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block mb-2">
                            Recent Searches
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {searchHistory.slice(0, 5).map((q, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setSearchQuery(q);
                                  navigate(`/products?search=${encodeURIComponent(q)}`);
                                  setIsSearchFocused(false);
                                }}
                                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-brand-100 hover:text-brand-700 transition-all"
                              >
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span>{q}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block mb-2">
                          Popular Bulk Sourcing Terms
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {['Wireless Earbuds', 'Organic Hoodies', 'Eco Packaging', 'Office Chairs', 'Air Fryer XL'].map(term => (
                            <button
                              key={term}
                              onClick={() => {
                                setSearchQuery(term);
                                navigate(`/products?search=${encodeURIComponent(term)}`);
                                setIsSearchFocused(false);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-600 hover:text-white transition-colors"
                            >
                              🔥 {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* ─── ACTION BUTTONS & USER NAV ─── */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <ThemeToggle />

              {/* Mobile Search Icon Trigger */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:text-brand-600"
                title="Search Products"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Compare Drawer Trigger */}
              <button
                onClick={toggleCompareDrawer}
                className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                title="Compare Products"
              >
                <Scale className="w-4 h-4" />
                {compareItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow">
                    {compareItems.length}
                  </span>
                )}
              </button>

              {/* Wishlist Button */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Notifications Dropdown */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow animate-pulse">
                      {unreadNotifs}
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-3">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Notifications</h4>
                      <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                        {unreadNotifs} Unread
                      </span>
                    </div>
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-gray-500 text-center py-4">No notifications yet.</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3 rounded-xl cursor-pointer text-xs transition-colors border ${
                              n.read
                                ? 'bg-gray-50/50 dark:bg-gray-800/30 border-transparent text-gray-500'
                                : 'bg-brand-50/70 dark:bg-brand-950/60 border-brand-200 dark:border-brand-800 text-gray-800 dark:text-gray-200 font-medium'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-semibold">{n.title}</span>
                              <span className="text-[10px] text-gray-400">{n.time}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-snug">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsNotifOpen(false)}
                      className="block text-center text-xs font-semibold text-brand-600 dark:text-brand-400 pt-3 border-t border-gray-100 dark:border-gray-800 hover:underline"
                    >
                      View All in Dashboard
                    </Link>
                  </div>
                )}
              </div>

              {/* Auth Profile / Account */}
              {isAuthenticated ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <User className="w-4 h-4 text-brand-500" />
                        <span>User Dashboard</span>
                      </Link>
                      <Link
                        to="/profile-settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Sliders className="w-4 h-4 text-brand-500" />
                        <span>Account Settings</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>My Wishlist ({wishlist.length})</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-2 text-xs font-semibold rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all hover:scale-105"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* ─── SUB-HEADER NAVIGATION BAR (TIER 2) ─── */}
        <div className="hidden lg:block bg-gray-100/80 dark:bg-gray-900/80 border-t border-gray-200/60 dark:border-gray-800/60 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={name}
                  to={path}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    isActive(path)
                      ? 'text-brand-600 dark:text-brand-400 bg-white dark:bg-gray-800 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white/60 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-brand-500" />
                  <span>{name}</span>
                </Link>
              ))}
            </div>

            {/* Add Product CTA */}
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow transition-all hover:scale-105"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Listing</span>
              </button>
            )}
          </div>
        </div>

        {/* ─── MOBILE SEARCH MODAL OVERLAY ─── */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 md:hidden flex flex-col">
            <div className="bg-white dark:bg-[#151C28] rounded-2xl p-4 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-bold text-gray-900 dark:text-white">Search Bulk Catalog</span>
                <button onClick={() => setIsMobileSearchOpen(false)} className="p-1 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  ref={mobileInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, suppliers, SKUs..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3.5 text-gray-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Mobile Live Results */}
              {searchQuery.trim() && (
                <div className="max-h-80 overflow-y-auto space-y-2 pt-2">
                  {matchingProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="flex items-center space-x-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 cursor-pointer"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate text-gray-900 dark:text-white">{p.name}</div>
                        <div className="text-[10px] text-gray-500">{p.supplierName}</div>
                      </div>
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400">₹{p.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold mt-2"
                  >
                    View All Search Results
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── MOBILE DRAWER MENU ─── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 px-4 bg-white dark:bg-[#0B0F17] border-t border-gray-200 dark:border-gray-800 space-y-4 animate-in fade-in slide-in-from-top-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2.5 text-xs font-medium rounded-xl ${
                    isActive(path)
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-brand-500" />
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </nav>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Search, ShieldCheck, TrendingDown, Zap, Globe2, ChevronDown,
  Star, CheckCircle, Package, BarChart3, Users, Award, Quote, ChevronRight, Plus, Minus
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/products/ProductCard';
import { RatingStars } from '../components/common/RatingStars';
import { INITIAL_TESTIMONIALS, INITIAL_FAQS } from '../services/initialData';

const STATS = [
  { value: '48,000+', label: 'Bulk Products Listed', icon: Package },
  { value: '1,200+', label: 'Verified Suppliers', icon: ShieldCheck },
  { value: '₹2,000Cr+', label: 'Buyer Savings Generated', icon: TrendingDown },
  { value: '98 Countries', label: 'Global Wholesale Network', icon: Globe2 }
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Verified Wholesale Suppliers',
    desc: 'Every supplier undergoes rigorous ISO, license, and fulfillment auditing before receiving our Verified badge.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Savings Calculator',
    desc: 'Compare tiered volume pricing, profit margins, and ROI instantly with our real-time calculation engine.',
    color: 'from-brand-500 to-indigo-600'
  },
  {
    icon: Zap,
    title: 'Instant Price Intelligence',
    desc: 'Monitor price drops across thousands of bulk SKUs with live alerts and weekly market briefings.',
    color: 'from-amber-500 to-orange-600'
  },
  {
    icon: Globe2,
    title: 'Direct Factory Access',
    desc: 'Eliminate middlemen and sourcing brokers — connect directly with manufacturers and factory wholesalers.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Users,
    title: 'Dedicated Buyer Support',
    desc: 'Get personalized sourcing assistance from our wholesale experts for every bulk order and supplier match.',
    color: 'from-sky-500 to-cyan-600'
  },
  {
    icon: CheckCircle,
    title: 'Secure Escrow Payments',
    desc: 'Protect every transaction with escrow-backed checkout and dispute support for trusted bulk procurement.',
    color: 'from-lime-500 to-emerald-600'
  },
  {
    icon: Award,
    title: 'Quality Assurance Programs',
    desc: 'Access certified products with quality checks, sample approvals, and on-time delivery commitments.',
    color: 'from-fuchsia-500 to-violet-600'
  },
  {
    icon: Package,
    title: 'Flexible MOQ & Logistics',
    desc: 'Choose flexible minimum order quantities and logistics options to scale inventory without excess risk.',
    color: 'from-indigo-500 to-blue-600'
  }
];

export default function Home() {
  const { products, categories, suppliers, logSearch } = useProducts();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [heroSearch, setHeroSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  // Group products by category for Amazon-style rows
  const productsByCategory = categories.map(cat => ({
    ...cat,
    items: products.filter(p => p.category === cat.id).slice(0, 6)
  })).filter(c => c.items.length > 0);

  const trendingProducts = [...products].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 8);
  const newArrivals = products.slice(Math.max(0, products.length - 8));
  const topDeals = [...products].sort((a, b) => {
    const sa = (a.retailPrice - a.bulkPrice) / a.retailPrice;
    const sb = (b.retailPrice - b.bulkPrice) / b.retailPrice;
    return sb - sa;
  }).slice(0, 8);

  const tabProducts = activeTab === 'all' ? featuredProducts
    : products.filter(p => p.category === activeTab).slice(0, 8);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      logSearch(heroSearch.trim());
      navigate(`/products?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const popularSearches = ['Wireless Earbuds', 'Organic Hoodies', 'Eco Packaging', 'Office Chairs', 'Gaming Keyboard', 'Face Serum', 'Water Bottle', 'Yoga Mat'];

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-[#0B0F17] to-[#0d1424] overflow-hidden">

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute top-3/4 left-1/3 w-[400px] h-[400px] bg-emerald-600/15 rounded-full blur-3xl"
          />
          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(rgba(100,130,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,130,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-widest mb-6">
                  <Zap className="w-3.5 h-3.5" />
                  <span>The #1 B2B Wholesale Discovery Platform</span>
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight text-white">
                  Buy <span className="text-gradient">Smarter</span>,<br />
                  Save <span className="text-gradient-accent">Bigger</span>,<br />
                  Scale <span className="text-white">Faster</span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                  Connect directly with <strong className="text-white">1,200+ verified factory wholesalers</strong> worldwide. 
                  Discover bulk products, compare tiered factory pricing, and calculate your real wholesale savings margins — all in one platform.
                </p>
              </motion.div>

              {/* Search Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      placeholder="Search bulk products, suppliers, categories..."
                      className="w-full pl-5 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/60 backdrop-blur-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-500/30 transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Products</span>
                  </button>
                </form>

                {/* Popular Searches */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-gray-500 pt-1 font-medium">Trending:</span>
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        logSearch(term);
                        navigate(`/products?search=${encodeURIComponent(term)}`);
                      }}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-gray-300 hover:bg-white/20 hover:text-white transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {[
                  { icon: ShieldCheck, text: 'Verified Suppliers' },
                  { icon: Award, text: 'Buyer Escrow Protection' },
                  { icon: Zap, text: 'Instant Price Alerts' }
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center space-x-2 text-xs text-gray-300 font-medium">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 grid grid-cols-2 gap-4"
            >
              {STATS.map(({ value, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:bg-white/8 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-white mb-1">{value}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 bg-gray-50 dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Top Bulk Deals
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
                Featured Wholesale Products
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
                Hand-curated bulk listings from our Diamond-tier verified factory suppliers.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Amazon-style Category Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-brand-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              ⚡ All Featured
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === cat.id ? 'bg-brand-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tabProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ProductCard product={product} layout="grid" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-xl shadow-brand-500/20 transition-all hover:scale-105"
            >
              <span>Browse All Bulk Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TRENDING PRODUCTS ─── */}
      <section className="py-16 bg-white dark:bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">🔥 Trending Now</span>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">Most Popular Wholesale Items</h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center space-x-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              <span>See all</span><ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} layout="grid" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROMOTIONAL BANNER ─── */}
      <section className="py-8 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-white text-center sm:text-left">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-brand-200 mb-1">Limited Time Offer</div>
              <h3 className="text-2xl font-black">Get up to 78% OFF on First Bulk Order</h3>
              <p className="text-sm text-brand-100 mt-1">Register as a verified buyer and unlock factory-direct pricing today</p>
            </div>
            <Link
              to="/register"
              className="flex-shrink-0 px-8 py-3.5 rounded-2xl bg-white text-brand-700 font-extrabold text-sm hover:bg-brand-50 transition-all shadow-xl hover:scale-105"
            >
              Claim Offer Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TOP DEALS ─── */}
      <section className="py-16 bg-gray-50 dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">💰 Best Savings</span>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">Top Bulk Discount Deals</h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center space-x-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              <span>See all</span><ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topDeals.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} layout="grid" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORY PRODUCT ROWS (Amazon Style) ─── */}
      {productsByCategory.map((catGroup, gi) => (
        <section key={catGroup.id} className={`py-14 ${gi % 2 === 0 ? 'bg-white dark:bg-[#090C12]' : 'bg-gray-50 dark:bg-[#0B0F17]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-500">{catGroup.description}</span>
                <h2 className="text-xl font-black text-gray-900 dark:text-white mt-0.5">{catGroup.name}</h2>
              </div>
              <Link
                to={`/products?category=${catGroup.id}`}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl border border-brand-200 dark:border-brand-800 text-xs font-bold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 transition-all"
              >
                <span>Shop All</span><ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {catGroup.items.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-xl p-3 group hover:border-brand-500/40 hover:shadow-lg transition-all"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="relative w-full h-28 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1.5 left-1.5">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500 text-white">
                          {Math.round(((product.retailPrice - product.bulkPrice) / product.retailPrice) * 100)}% OFF
                        </span>
                      </div>
                    </div>
                    <h3 className="text-[11px] font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                      {product.name}
                    </h3>
                    <div className="text-xs font-black text-brand-600 dark:text-brand-400">
                      ₹{product.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-[10px] text-gray-400 line-through">
                      ₹{product.retailPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ─── NEW ARRIVALS ─── */}
      <section className="py-16 bg-white dark:bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-500">✨ Just Added</span>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">New Arrivals</h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center space-x-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              <span>See all</span><ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {newArrivals.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} layout="grid" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-24 bg-white dark:bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Shop by Industry
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
              Browse Wholesale Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className="glass-card rounded-2xl p-5 text-center block hover:border-brand-500/50 transition-all group hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-100 to-indigo-100 dark:from-brand-950/80 dark:to-indigo-950/80 flex items-center justify-center mx-auto mb-3 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform shadow-sm">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {cat.count} Products
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="py-24 bg-gray-50 dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Platform Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
              Why Industry Leaders Choose<br />Bulk Saves Hub
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 group hover:border-brand-500/40 transition-all hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR SUPPLIERS ─── */}
      <section className="py-24 bg-white dark:bg-[#090C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Diamond Tier
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
                Top Verified Wholesale Suppliers
              </h2>
            </div>
            <Link
              to="/suppliers"
              className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <span>View All Suppliers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suppliers.map((supplier, i) => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/suppliers/${supplier.id}`}
                  className="glass-card rounded-2xl p-5 block hover:border-brand-500/40 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={supplier.logo}
                      alt={supplier.name}
                      className="w-14 h-14 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0 shadow"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {supplier.name}
                      </h3>
                      {supplier.verified && (
                        <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full mt-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <RatingStars rating={supplier.rating} reviewsCount={supplier.reviewsCount} size="sm" />
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      📍 {supplier.location}
                    </div>
                    <div className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                      {supplier.responseRate} Response Rate
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-gray-50 dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
              What Our Wholesale Buyers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card rounded-3xl p-7 flex flex-col justify-between group hover:border-brand-500/40 transition-all"
              >
                <div>
                  <Quote className="w-8 h-8 text-brand-300 dark:text-brand-700 mb-4" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover shadow" />
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">{t.name}</div>
                      <div className="text-[11px] text-gray-500">{t.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                      {t.savingsAmount}
                    </div>
                    <div className="text-[10px] text-gray-400">Total Saved</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-white dark:bg-[#090C12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {INITIAL_FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${openFaq === i ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    {openFaq === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="w-12 h-12 text-brand-300 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to Cut Sourcing Costs by 30–70%?
            </h2>
            <p className="text-brand-200 text-base max-w-xl mx-auto mb-8">
              Join 48,000+ wholesale buyers already discovering factory prices on Bulk Saves Hub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 rounded-2xl bg-white text-brand-700 font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Get Started — It's Free
              </Link>
              <Link
                to="/products"
                className="px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                Browse Wholesale Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

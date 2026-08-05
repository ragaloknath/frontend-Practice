import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowRight, Carrot, ShieldCheck, Truck, Sparkles, Leaf, ShoppingBag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/products/ProductCard';
import { CategoryIcon } from '../components/common/CategoryIcon';

export default function Categories() {
  const { categories, products } = useProducts();
  const [grocerySubTab, setGrocerySubTab] = useState('all');

  const getCategoryCount = (catId) => products.filter(p => p.category === catId).length;

  const CATEGORY_IMAGES = {
    electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
    office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80',
    fashion: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&auto=format&fit=crop&q=80',
    home: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80',
    beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80',
    industrial: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=80',
    groceries: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80'
  };

  // Filter grocery products for dedicated section
  const groceryProducts = products.filter(p => p.category === 'groceries');

  const filteredGroceryProducts = grocerySubTab === 'all'
    ? groceryProducts
    : grocerySubTab === 'veg'
    ? groceryProducts.filter(p => p.name.toLowerCase().includes('bell') || p.name.toLowerCase().includes('onion') || p.name.toLowerCase().includes('spinach') || p.name.toLowerCase().includes('tomato'))
    : grocerySubTab === 'grains'
    ? groceryProducts.filter(p => p.name.toLowerCase().includes('rice') || p.name.toLowerCase().includes('grain'))
    : groceryProducts.filter(p => p.name.toLowerCase().includes('oil'));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      {/* Header */}
      <div className="bg-white dark:bg-[#090C12] border-b border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400 uppercase tracking-widest bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
            Industry Categories
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-3">
            Wholesale Product Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-lg mx-auto">
            Browse across {categories.length} bulk wholesale industries and find factory-direct pricing in your niche.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const count = getCategoryCount(cat.id);
            const isGroceries = cat.id === 'groceries';
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className={`glass-card rounded-3xl overflow-hidden block group hover:shadow-2xl transition-all relative ${
                    isGroceries ? 'ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/10' : 'hover:border-brand-500/40'
                  }`}
                >
                  {/* Banner Image */}
                  <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.electronics}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {isGroceries && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        <span>Fresh Direct</span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                      <span className="text-xs font-bold text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {count || cat.count} Products
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${isGroceries ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400'}`}>
                          <CategoryIcon icon={cat.icon} className="w-4 h-4" />
                        </div>
                        <h3 className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 max-w-xs">
                        {cat.description}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-brand-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── DEDICATED VEGETABLES & GROCERIES SECTION ─── */}
      <section className="py-16 bg-white dark:bg-[#090C12] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold mb-3 border border-emerald-200 dark:border-emerald-800">
                <Carrot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Dedicated Farm Produce Marketplace</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                Vegetables & Groceries Wholesale Section
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
                Source farm-fresh organic vegetables, bulk staples, basmati rice, and pure cooking oils directly from verified agricultural producers and cold-chain distributors.
              </p>
            </div>

            <Link
              to="/products?category=groceries"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all self-start md:self-auto"
            >
              <span>View All Groceries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Value Proposition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white flex-shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">100% Organic & Farm Fresh</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Directly harvested from certified agro-farms</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Cold Express Logistics</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Refrigerated trucks to ensure maximum crispness</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-amber-600 text-white flex-shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Bulk Crates & Sack MOQs</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Flexible crate quantities for hotels & retailers</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-purple-600 text-white flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Verified Agro Suppliers</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Escrow protected buyer payment guarantee</p>
              </div>
            </div>
          </div>

          {/* Sub-category Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'all', label: '🌱 All Fresh Produce & Groceries' },
              { id: 'veg', label: '🥦 Fresh Vegetables & Greens' },
              { id: 'grains', label: '🌾 Basmati Rice & Bulk Staples' },
              { id: 'oils', label: '🛢️ Cooking Oils & Canisters' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setGrocerySubTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  grocerySubTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grocery Products Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredGroceryProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} layout="grid" />
              </motion.div>
            ))}
          </div>

          {filteredGroceryProducts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              <Carrot className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">No products found for this sub-category.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

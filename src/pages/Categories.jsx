import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function Categories() {
  const { categories, products } = useProducts();

  const getCategoryCount = (catId) => products.filter(p => p.category === catId).length;

  const CATEGORY_IMAGES = {
    electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
    office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80',
    fashion: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&auto=format&fit=crop&q=80',
    home: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80',
    beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80',
    industrial: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=80'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      {/* Header */}
      <div className="bg-white dark:bg-[#090C12] border-b border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Wholesale Product Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-lg mx-auto">
            Browse across {categories.length} bulk wholesale industries and find factory-direct pricing in your niche.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const count = getCategoryCount(cat.id);
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
                  className="glass-card rounded-3xl overflow-hidden block group hover:shadow-2xl hover:border-brand-500/40 transition-all"
                >
                  {/* Banner Image */}
                  <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.electronics}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-bold text-white/80 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {count || cat.count} Products
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 max-w-xs">
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
    </div>
  );
}

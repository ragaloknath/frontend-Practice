import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, TrendingDown } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/products/ProductCard';

export default function Wishlist() {
  const { products, wishlist } = useProducts();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const totalRetail = wishlistProducts.reduce((sum, p) => sum + p.retailPrice, 0);
  const totalBulk = wishlistProducts.reduce((sum, p) => sum + p.bulkPrice, 0);
  const totalSavings = totalRetail - totalBulk;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <div className="bg-white dark:bg-[#090C12] border-b border-gray-100 dark:border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white flex items-center space-x-3">
                <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                <span>My Wishlist</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">{wishlistProducts.length} saved wholesale items</p>
            </div>

            {wishlistProducts.length > 0 && (
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Potential Per-Unit Savings</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    ₹{totalSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Avg. Savings Rate</span>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                    {totalRetail > 0 ? Math.round((totalSavings / totalRetail) * 100) : 0}% Off
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-16 text-center max-w-lg mx-auto mt-8">
            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center mx-auto mb-4 text-red-400">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Wishlist is Empty</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Browse wholesale products and click the heart icon to save items for later reference or bulk order planning.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Wholesale Catalog</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, Filter } from 'lucide-react';

export const ProductFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  supplier,
  setSupplier,
  maxPrice,
  setMaxPrice,
  maxMoq,
  setMaxMoq,
  sortBy,
  setSortBy,
  categories,
  suppliers,
  onReset
}) => {
  return (
    <div className="glass-panel rounded-2xl p-5 space-y-6">
      
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white text-sm">
          <Filter className="w-4 h-4 text-brand-500" />
          <span>Filter Products</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-xs text-brand-600 dark:text-brand-400 hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Search Keyword
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type product name..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Supplier Filter */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Verified Supplier
        </label>
        <select
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Suppliers</option>
          {suppliers.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Max Wholesale Price Slider */}
      <div>
        <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          <span>Max Wholesale Price</span>
          <span className="text-brand-600 dark:text-brand-400">₹{maxPrice >= 10000 ? '10,000+' : maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="5"
          max="10000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹5</span>
          <span>₹10,000+</span>
        </div>
      </div>

      {/* Max MOQ Slider */}
      <div>
        <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          <span>Max MOQ Requirement</span>
          <span className="text-brand-600 dark:text-brand-400">{maxMoq} units</span>
        </div>
        <input
          type="range"
          min="10"
          max="1000"
          step="20"
          value={maxMoq}
          onChange={(e) => setMaxMoq(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Sort Results By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
        >
          <option value="featured">Featured First</option>
          <option value="savings">Highest Savings %</option>
          <option value="price-asc">Bulk Price: Low to High</option>
          <option value="price-desc">Bulk Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="moq-asc">Lowest MOQ</option>
        </select>
      </div>

    </div>
  );
};

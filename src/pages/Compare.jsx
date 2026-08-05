import React from 'react';
import { useCompare } from '../context/CompareContext';
import { Link } from 'react-router-dom';
import { Scale, Trash2, X, CheckCircle, ArrowRight } from 'lucide-react';
import { RatingStars } from '../components/common/RatingStars';

export default function Compare() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17] flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-16 text-center max-w-lg">
          <Scale className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Comparison Tray is Empty</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Add products to compare using the <Scale className="w-3.5 h-3.5 inline" /> icon on any product card.
          </p>
          <Link to="/products" className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm">
            <span>Browse Products to Compare</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const COMPARE_FIELDS = [
    { label: 'Wholesale Price', getValue: p => `₹${p.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, highlight: (items, idx) => items[idx].bulkPrice === Math.min(...items.map(i => i.bulkPrice)) },
    { label: 'Est. Retail Price', getValue: p => `₹${p.retailPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
    { label: 'Savings Per Unit', getValue: p => `₹${(p.retailPrice - p.bulkPrice).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, highlight: (items, idx) => (items[idx].retailPrice - items[idx].bulkPrice) === Math.max(...items.map(i => i.retailPrice - i.bulkPrice)) },
    { label: 'Savings %', getValue: p => `${Math.round(((p.retailPrice - p.bulkPrice) / p.retailPrice) * 100)}%`, highlight: (items, idx) => ((items[idx].retailPrice - items[idx].bulkPrice) / items[idx].retailPrice) === Math.max(...items.map(i => (i.retailPrice - i.bulkPrice) / i.retailPrice)) },
    { label: 'Min. Order Qty', getValue: p => `${p.moq} ${p.unit}`, highlight: (items, idx) => items[idx].moq === Math.min(...items.map(i => i.moq)) },
    { label: 'Supplier', getValue: p => p.supplierName },
    { label: 'Category', getValue: p => p.category },
    { label: 'Rating', getValue: p => `${p.rating} / 5 (${p.reviewsCount} reviews)`, highlight: (items, idx) => items[idx].rating === Math.max(...items.map(i => i.rating)) },
    { label: 'In Stock', getValue: p => p.inStock ? '✅ Yes' : '❌ No' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <div className="bg-white dark:bg-[#090C12] border-b border-gray-100 dark:border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white flex items-center space-x-3">
              <Scale className="w-7 h-7 text-brand-600 flex-shrink-0" />
              <span>Product Comparison Matrix</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Side-by-side wholesale price & specification audit for {compareItems.length} products
            </p>
          </div>
          <button
            onClick={clearCompare}
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-sm font-semibold border border-red-200 dark:border-red-900 w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 overflow-x-auto">
        <table className="w-full border-separate border-spacing-2 min-w-[700px]">
          <thead>
            <tr>
              <th className="w-44 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider p-3 sticky left-0 bg-gray-50 dark:bg-[#0B0F17] z-10">
                Feature
              </th>
              {compareItems.map(prod => (
                <th key={prod.id} className="text-center">
                  <div className="glass-card rounded-2xl p-4 relative">
                    <button
                      onClick={() => removeFromCompare(prod.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img src={prod.image} alt={prod.name} className="w-24 h-24 object-cover rounded-xl mx-auto mb-3" />
                    <p className="text-xs font-bold text-gray-900 dark:text-white text-center line-clamp-2 leading-tight">
                      {prod.name}
                    </p>
                    <Link
                      to={`/products/${prod.id}`}
                      className="mt-2 inline-flex items-center text-[11px] text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      View Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_FIELDS.map(({ label, getValue, highlight }) => (
              <tr key={label} className="group">
                <td className="text-xs font-semibold text-gray-600 dark:text-gray-400 p-3 bg-gray-100 dark:bg-gray-800/90 rounded-xl sticky left-0 z-10 backdrop-blur-md">
                  {label}
                </td>
                {compareItems.map((prod, idx) => {
                  const isBest = highlight ? highlight(compareItems, idx) : false;
                  return (
                    <td
                      key={prod.id}
                      className={`text-center text-sm p-3 rounded-xl font-semibold transition-all ${
                        isBest
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-white/60 dark:bg-gray-800/30 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1">
                        {isBest && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                        <span>{getValue(prod)}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

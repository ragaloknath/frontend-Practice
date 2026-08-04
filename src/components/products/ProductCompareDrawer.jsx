import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompare } from '../../context/CompareContext';
import { Link } from 'react-router-dom';
import { X, Scale, Trash2, ArrowRight } from 'lucide-react';

export const ProductCompareDrawer = () => {
  const { compareItems, isCompareOpen, removeFromCompare, clearCompare, setIsCompareOpen } = useCompare();

  if (!isCompareOpen || compareItems.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end">

        {/* Backdrop for closing */}
        <div
          onClick={() => setIsCompareOpen(false)}
          className="pointer-events-auto absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />

        {/* Floating Tray */}
        <motion.div
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 250, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="pointer-events-auto relative w-full max-w-6xl mx-auto glass-panel rounded-t-3xl border-b-0 shadow-2xl p-6 bg-white/95 dark:bg-[#151C28]/95 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">
                  Bulk Product Comparison Tray
                </h4>
                <p className="text-xs text-gray-500">
                  {compareItems.length} of 4 items selected for side-by-side spec audit
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={clearCompare}
                className="flex items-center space-x-1 text-xs text-red-600 dark:text-red-400 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
              <Link
                to="/compare"
                onClick={() => setIsCompareOpen(false)}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>Full Comparison Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
            {compareItems.map((prod) => {
              const savings = prod.retailPrice - prod.bulkPrice;
              const savingsPct = Math.round((savings / prod.retailPrice) * 100);

              return (
                <div
                  key={prod.id}
                  className="relative p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 flex items-center space-x-3"
                >
                  <button
                    onClick={() => removeFromCompare(prod.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shadow hover:scale-110 transition-transform"
                    title="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-white"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {prod.name}
                    </h5>
                    <div className="flex items-baseline space-x-1.5 mt-0.5">
                      <span className="text-sm font-black text-brand-600 dark:text-brand-400">
                        ₹{prod.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        ({savingsPct}% OFF)
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 block">
                      MOQ: {prod.moq} {prod.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

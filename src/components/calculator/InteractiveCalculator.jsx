import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, IndianRupee, TrendingUp, Sparkles, PieChart, ArrowUpRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveCalculator = ({ defaultRetail = 89.99, defaultBulk = 28.50, defaultQty = 100 }) => {
  const [retailPrice, setRetailPrice] = useState(defaultRetail);
  const [bulkPrice, setBulkPrice] = useState(defaultBulk);
  const [quantity, setQuantity] = useState(defaultQty);

  // Synchronize props if changed
  useEffect(() => {
    if (defaultRetail) setRetailPrice(Number(defaultRetail));
    if (defaultBulk) setBulkPrice(Number(defaultBulk));
    if (defaultQty) setQuantity(Number(defaultQty));
  }, [defaultRetail, defaultBulk, defaultQty]);

  // Calculations
  const retailNum = Math.max(0, Number(retailPrice) || 0);
  const bulkNum = Math.max(0, Number(bulkPrice) || 0);
  const qtyNum = Math.max(1, Number(quantity) || 1);

  const totalRetail = retailNum * qtyNum;
  const totalBulk = bulkNum * qtyNum;
  const totalSavings = Math.max(0, totalRetail - totalBulk);
  const savingsPercent = retailNum > 0 ? Math.round((totalSavings / totalRetail) * 100) : 0;
  const profitMarginPercent = bulkNum > 0 ? Math.round(((retailNum - bulkNum) / bulkNum) * 100) : 0;
  const profitPerUnit = Math.max(0, retailNum - bulkNum);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            B2B Savings & ROI Calculator
          </h2>
          <p className="text-xs text-gray-500">
            Real-time calculation engine for wholesale volume margins.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            1. Input Unit Parameters
          </h3>

          {/* Retail Price Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Estimated Unit Retail Price (₹)
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                min="0"
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              />
              <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Bulk Price Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Wholesale Factory Bulk Price (₹)
            </label>
            <div className="relative">
              <input
                type="number"
                step="1"
                min="0"
                value={bulkPrice}
                onChange={(e) => setBulkPrice(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-sm font-bold text-brand-600 dark:text-brand-400 focus:ring-2 focus:ring-brand-500"
              />
              <IndianRupee className="w-4 h-4 text-brand-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Quantity Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              <span>Order Volume Quantity</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">{quantity} Units</span>
            </div>
            <input
              type="range"
              min="10"
              max="5000"
              step="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full accent-brand-600 h-2 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>10 units</span>
              <span>1,000 units</span>
              <span>5,000 units</span>
            </div>
          </div>

          {/* Preset Quick Fill Buttons */}
          <div className="pt-2">
            <span className="text-[11px] text-gray-500 font-medium block mb-2">Preset Quick Quantity Tiers:</span>
            <div className="flex flex-wrap gap-2">
              {[50, 200, 500, 1000, 2500].map(tier => (
                <button
                  key={tier}
                  onClick={() => setQuantity(tier)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                    quantity === tier
                      ? 'bg-brand-600 text-white border-brand-600 shadow'
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {tier} Qty
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Output Display */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-950 to-slate-950 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold tracking-wider text-brand-300 uppercase block mb-1">
                  Calculated Net Bulk Savings
                </span>
                <motion.div
                  key={totalSavings}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="text-3xl sm:text-4xl font-black text-white tracking-tight"
                >
                  ₹{totalSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </motion.div>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{savingsPercent}% Savings</span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-gray-400 block">Total Retail Valuation</span>
                <span className="text-lg font-bold text-gray-200">
                  ₹{totalRetail.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-gray-400 block">Total Wholesale Cost</span>
                <span className="text-lg font-bold text-brand-300">
                  ₹{totalBulk.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-gray-400 block">Profit per Unit Sold</span>
                <span className="text-lg font-bold text-emerald-400">
                  +₹{profitPerUnit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-gray-400 block">Est. ROI / Profit Margin</span>
                <span className="text-lg font-bold text-amber-300">
                  {profitMarginPercent}% Markup
                </span>
              </div>
            </div>

            {/* Visual Margin Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-gray-300 mb-1 font-semibold">
                <span>Cost Structure Ratio</span>
                <span>{100 - savingsPercent}% Wholesale / {savingsPercent}% Margin</span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
                <div style={{ width: `${100 - savingsPercent}%` }} className="bg-brand-500 h-full" title="Wholesale Cost" />
                <div style={{ width: `${savingsPercent}%` }} className="bg-emerald-400 h-full" title="Margin Savings" />
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6">
            <button
              onClick={triggerCelebration}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Celebrate Wholesale Savings</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

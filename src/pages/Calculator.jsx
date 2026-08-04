import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { InteractiveCalculator } from '../components/calculator/InteractiveCalculator';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/products/ProductCard';
import { Calculator, Lightbulb } from 'lucide-react';

export default function CalculatorPage() {
  const [searchParams] = useSearchParams();
  const { products } = useProducts();

  const retail = parseFloat(searchParams.get('retail')) || 89.99;
  const bulk = parseFloat(searchParams.get('bulk')) || 28.50;
  const moq = parseInt(searchParams.get('moq')) || 100;

  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  const QUICK_FILLS = products.slice(0, 4).map(p => ({
    name: p.name.slice(0, 28) + '...',
    retail: p.retailPrice,
    bulk: p.bulkPrice,
    moq: p.moq
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <div className="bg-white dark:bg-[#090C12] border-b border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-bold mb-4 border border-brand-200 dark:border-brand-800">
            <Calculator className="w-4 h-4" />
            <span>Real-time Wholesale Margin Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Bulk Savings & ROI Calculator
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
            Instantly calculate your wholesale profit margin, total cost savings, and ROI for any bulk order scenario.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InteractiveCalculator defaultRetail={retail} defaultBulk={bulk} defaultQty={moq} />

        {/* Tip Box */}
        <div className="mt-8 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start space-x-4">
          <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1">
              Pro Tip: Volume Discount Stacking
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              Most wholesale suppliers offer tiered price drops every 3x volume increase. 
              Combining MOQ tiers across 2-3 product SKUs from the same supplier often qualifies 
              for additional combined shipping discounts of 5–12%.
            </p>
          </div>
        </div>

        {/* Quick Fill Cards */}
        {featuredProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">
              Quick-Fill: Calculate for Top Bulk Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} layout="grid" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

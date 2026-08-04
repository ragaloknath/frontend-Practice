import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from '../common/SkeletonLoader';
import { PackageX } from 'lucide-react';

export const ProductGrid = ({
  products,
  loading,
  layout = 'grid',
  onEditProduct,
  onDeleteProduct,
  onResetFilters
}) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center my-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-500 flex items-center justify-center mx-auto mb-4">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Matching Bulk Products</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
          We couldn't find any items matching your selected filter criteria or search query.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition-all"
          >
            Clear Filters & Reset
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          layout={layout}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
        />
      ))}
    </div>
  );
};

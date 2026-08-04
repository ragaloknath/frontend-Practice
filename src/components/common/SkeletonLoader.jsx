import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl p-4 animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-800 h-48 rounded-xl w-full mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-2"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/4"></div>
      </div>
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-14 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
      ))}
    </div>
  );
};

import React from 'react';
import { ShieldCheck, TrendingDown, CheckCircle, Package } from 'lucide-react';

export const Badge = ({ variant = 'default', children, className = '' }) => {
  const variants = {
    verified: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    savings: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    category: 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200 dark:border-brand-800/60',
    stock: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${variants[variant]} ${className}`}>
      {variant === 'verified' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
      {variant === 'savings' && <TrendingDown className="w-3.5 h-3.5 text-amber-500" />}
      {variant === 'stock' && <CheckCircle className="w-3.5 h-3.5 text-blue-500" />}
      {children}
    </span>
  );
};

import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, reviewsCount, size = 'sm', showNumber = true }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const sizeClasses = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center text-amber-400">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${sizeClasses} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300 dark:text-gray-700'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1">
          {Number(rating).toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};

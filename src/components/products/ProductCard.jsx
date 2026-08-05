import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Scale, ShieldCheck, ArrowRight, Edit3, Trash2, Calculator, Package, ShoppingCart, Zap } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { useProducts } from '../../context/ProductContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { AuthModal } from '../common/AuthModal';

export const ProductCard = ({ product, layout = 'grid', onEdit, onDelete }) => {
  const { toggleWishlist, isInWishlist } = useProducts();
  const { addToCompare } = useCompare();
  const { isAuthenticated, currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  const isWishlisted = isInWishlist(product.id);

  // Price & Savings Math
  const savingsAmount = product.retailPrice - product.bulkPrice;
  const savingsPercent = Math.round((savingsAmount / product.retailPrice) * 100);

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      setAuthMessage('Please sign in or create an account with your email to add items to your wishlist.');
      setIsAuthModalOpen(true);
      return;
    }
    toggleWishlist(product.id);
  };

  const handleBuyOrCartClick = (actionType = 'order') => {
    if (!isAuthenticated) {
      setAuthMessage(`Please sign in or create an account to ${actionType === 'cart' ? 'add this item to your cart' : 'place a bulk order or request factory pricing'}.`);
      setIsAuthModalOpen(true);
      return;
    }

    toast.success(
      actionType === 'cart'
        ? `"${product.name}" added to your cart!`
        : `Order Request for "${product.name}" submitted! Deal contract sent to ${currentUser?.email}.`
    );
  };

  return (
    <>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        message={authMessage}
        onSuccess={() => {
          toast.success(`Signed in as ${currentUser?.name || 'User'}! You can now complete your order.`);
        }}
      />

      {layout === 'list' ? (
        <div className="glass-card rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6 group hover:border-brand-500/40">
          
          {/* Product Image */}
          <div className="relative w-full md:w-56 h-48 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500 text-white shadow-md">
                {savingsPercent}% OFF
              </span>
            </div>
            <button
              onClick={handleWishlistClick}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                isWishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-black/30 text-white hover:bg-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3 w-full">
            <div className="flex items-center space-x-2">
              <Badge variant="category">{product.category}</Badge>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                <span>{product.supplierName}</span>
              </div>
            </div>

            <Link to={`/products/${product.id}`}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center space-x-4">
              <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
              <div className="flex items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                <Package className="w-3.5 h-3.5 text-brand-500 mr-1" />
                <span>MOQ: {product.moq} {product.unit}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="w-full md:w-64 flex flex-col justify-between p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/60 md:border-l md:border-y-0 md:border-r-0">
            <div>
              <span className="text-[11px] text-gray-400 font-medium block">Wholesale Bulk Price</span>
              <div className="flex items-baseline space-x-2 mb-1">
                <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                  ₹{product.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.retailPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <span className="inline-block text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                Save ₹{savingsAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })} / unit
              </span>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBuyOrCartClick('cart')}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center shadow-md transition-all flex items-center justify-center space-x-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={() => handleBuyOrCartClick('order')}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs text-center shadow-md transition-all flex items-center justify-center space-x-1"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Buy Now</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  to={`/products/${product.id}`}
                  className="text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => addToCompare(product)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-brand-600"
                    title="Compare Product"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                  {onEdit && (
                    <button onClick={() => onEdit(product)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(product.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Grid Layout */
        <div className="glass-card rounded-2xl p-4 flex flex-col justify-between group hover:border-brand-500/50 hover:shadow-xl transition-all duration-300 relative">
          
          {/* Top Banner Image */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Savings Badge Overlay */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                {savingsPercent}% SAVINGS
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistClick}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                isWishlisted
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-black/30 text-white hover:bg-red-500'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>

            {/* MOQ Tag Overlay */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white">
              MOQ: {product.moq} {product.unit}
            </div>
          </div>

          {/* Product Content */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <Badge variant="category">{product.category}</Badge>
              <div className="flex items-center text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 mr-1 flex-shrink-0" />
                <span className="truncate">{product.supplierName}</span>
              </div>
            </div>

            <Link to={`/products/${product.id}`}>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 h-10">
                {product.name}
              </h3>
            </Link>

            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
          </div>

          {/* Pricing & Controls */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Bulk Wholesale Price</span>
                <span className="text-xl font-black text-brand-600 dark:text-brand-400">
                  ₹{product.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block font-medium">Est. Retail</span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.retailPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Add to Cart & Buy Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleBuyOrCartClick('cart')}
                className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => handleBuyOrCartClick('order')}
                className="py-2 px-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs text-center shadow-md shadow-brand-500/20 transition-all flex items-center justify-center space-x-1"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Buy Now</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <Link
                to={`/products/${product.id}`}
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => addToCompare(product)}
                  className="p-1 rounded-lg text-gray-500 hover:text-brand-600"
                  title="Add to Comparison"
                >
                  <Scale className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate(`/calculator?retail=${product.retailPrice}&bulk=${product.bulkPrice}&moq=${product.moq}`)}
                  className="p-1 rounded-lg text-gray-500 hover:text-emerald-500"
                  title="Calculate Savings"
                >
                  <Calculator className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default ProductCard;

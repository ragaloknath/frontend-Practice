import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Heart, Scale, Calculator, ShieldCheck, Package,
  Star, Send, ChevronRight, CheckCircle, ExternalLink, ShoppingCart, Zap
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { storageService } from '../services/storageService';
import { RatingStars } from '../components/common/RatingStars';
import { Badge } from '../components/common/Badge';
import { ProductCard } from '../components/products/ProductCard';
import { AuthModal } from '../components/common/AuthModal';
import { useToast } from '../context/ToastContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, toggleWishlist, isInWishlist, addReview } = useProducts();
  const { isAuthenticated, currentUser } = useAuth();
  const { addToCompare } = useCompare();
  const { toast } = useToast();

  const product = products.find(p => p.id === id);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [activeTab, setActiveTab] = useState('specs');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    setReviews(storageService.getReviews(id));
  }, [id, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B0F17]">
        <div className="text-center space-y-4">
          <Package className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Product Not Found</h2>
          <Link to="/products" className="text-brand-600 dark:text-brand-400 underline text-sm">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const savingsAmount = product.retailPrice - product.bulkPrice;
  const savingsPercent = Math.round((savingsAmount / product.retailPrice) * 100);
  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleProtectedAction = (actionType = 'order') => {
    if (!isAuthenticated) {
      setAuthMessage(
        actionType === 'cart'
          ? 'Please sign in or create an account with your email to add this item to your cart.'
          : actionType === 'wishlist'
          ? 'Please sign in or create an account to save items to your wishlist.'
          : 'Please sign in or create an account with your email to place bulk orders or contact suppliers.'
      );
      setIsAuthModalOpen(true);
      return;
    }

    if (actionType === 'wishlist') {
      toggleWishlist(product.id);
    } else if (actionType === 'cart') {
      toast.success(`"${product.name}" added to your wholesale cart!`);
    } else if (actionType === 'contact') {
      navigate(`/suppliers/${product.supplierId}`);
    } else {
      toast.success(`Bulk Order Request for "${product.name}" submitted! Invoice & supplier contract sent to ${currentUser.email}.`);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthMessage('Please sign in or create an account with your email to leave a product review.');
      setIsAuthModalOpen(true);
      return;
    }
    const newReview = addReview({
      productId: id,
      userName: currentUser.name,
      userRole: currentUser.role || 'Wholesale Buyer',
      rating: reviewForm.rating,
      comment: reviewForm.comment
    });
    setReviews(storageService.getReviews(id));
    setReviewForm({ rating: 5, comment: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        message={authMessage}
        onSuccess={() => {
          toast.success(`Welcome ${currentUser?.name || 'User'}! You can now proceed with your order.`);
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-brand-600 dark:hover:text-brand-400">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">

          {/* Left: Image */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                  {savingsPercent}% Wholesale Savings
                </span>
              </div>
              {product.inStock && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    <span>In Stock</span>
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="category">{product.category}</Badge>
                <Link to={`/suppliers/${product.supplierId}`} className="flex items-center space-x-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full font-semibold border border-emerald-200 dark:border-emerald-800/60">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{product.supplierName}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-3">
                <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="md" />
                <span className="text-xs text-gray-500">·</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {product.stockQuantity?.toLocaleString()} units available
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Pricing Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 dark:from-brand-950/60 dark:to-indigo-950/60 border border-brand-200/60 dark:border-brand-800/60">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs text-gray-500 font-medium block mb-1">Wholesale Price</span>
                  <span className="text-3xl font-black text-brand-600 dark:text-brand-400">
                    ₹{product.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs text-gray-400 block">per {product.unit}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium block mb-1">Est. Retail Value</span>
                  <span className="text-2xl font-bold text-gray-400 line-through">
                    ₹{product.retailPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                    Save ₹{savingsAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })} per unit
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1.5">
                  <Package className="w-4 h-4 text-brand-500" />
                  <span>MOQ: <strong className="text-gray-900 dark:text-white">{product.moq} {product.unit}</strong></span>
                </div>
              </div>
            </div>

            {/* Volume Tier Pricing */}
            {product.tierPrices && product.tierPrices.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Volume Tier Pricing</h3>
                <div className="space-y-2">
                  {product.tierPrices.map((tier, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {tier.minQty} – {tier.maxQty === 10000 ? '5,000+' : tier.maxQty} {product.unit}
                      </span>
                      <span className="text-sm font-black text-brand-600 dark:text-brand-400">
                        ₹{tier.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })} / unit
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => handleProtectedAction('cart')}
                className="flex-1 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => handleProtectedAction('order')}
                className="flex-1 py-3 px-5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-xl shadow-brand-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now / Place Order</span>
              </button>

              <button
                onClick={() => handleProtectedAction('wishlist')}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-center ${
                  isWishlisted
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                    : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => addToCompare(product)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:border-brand-500 hover:text-brand-600 transition-all flex items-center justify-center space-x-1.5"
              >
                <Scale className="w-4 h-4" />
                <span>Add to Compare</span>
              </button>

              <button
                onClick={() => handleProtectedAction('contact')}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Contact Supplier</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Tabs: Specs + Reviews */}
        <div className="glass-panel rounded-3xl p-6 mb-16">
          <div className="flex space-x-2 mb-6 border-b border-gray-100 dark:border-gray-800">
            {['specs', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-t-xl capitalize transition-all -mb-px ${
                  activeTab === tab
                    ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400 bg-brand-50/50 dark:bg-brand-950/30'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab === 'specs' ? 'Specifications' : `Reviews (${reviews.length})`}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && product.specifications && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">{key}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Write a Verified Review
                </h4>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">Rating:</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className={`p-1 ${reviewForm.rating >= star ? 'text-amber-400' : 'text-gray-300'}`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  rows="3"
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience regarding bulk quality, shipping speed, or supplier response..."
                  className="w-full p-3 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{rev.userName}</span>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>
                    <RatingStars rating={rev.rating} size="xs" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">
              More Products in {product.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} layout="grid" />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

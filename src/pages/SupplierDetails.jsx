import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Mail, Phone, Globe, Package, MessageSquare, ChevronRight, Send } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/products/ProductCard';
import { storageService } from '../services/storageService';
import { useToast } from '../context/ToastContext';

export default function SupplierDetails() {
  const { id } = useParams();
  const { suppliers, products, submitContactMessage } = useProducts();
  const { toast } = useToast();

  const supplier = suppliers.find(s => s.id === id);
  const supplierProducts = products.filter(p => p.supplierId === id);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Wholesale Inquiry', message: '' });

  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B0F17]">
        <div className="text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Supplier Not Found</h2>
          <Link to="/suppliers" className="text-brand-600 underline text-sm">View All Suppliers</Link>
        </div>
      </div>
    );
  }

  const handleContactSubmit = (e) => {
    e.preventDefault();
    submitContactMessage({ ...contactForm, subject: `[Supplier: ${supplier.name}] ${contactForm.subject}` });
    setContactForm({ name: '', email: '', subject: 'Wholesale Inquiry', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-8">
          <Link to="/suppliers" className="hover:text-brand-600">Suppliers</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 dark:text-white font-medium">{supplier.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Profile Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-3xl p-7 text-center"
            >
              <img
                src={supplier.logo}
                alt={supplier.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4 shadow-xl"
              />
              <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">{supplier.name}</h1>
              {supplier.verified && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800 mt-2 mx-auto">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Diamond Verified Wholesaler</span>
                </div>
              )}
              <div className="mt-3 flex justify-center">
                <RatingStars rating={supplier.rating} reviewsCount={supplier.reviewsCount} size="md" />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 text-center">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="text-xl font-black text-brand-600 dark:text-brand-400">{supplierProducts.length}</div>
                  <div className="text-[11px] text-gray-500">Products</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="text-xl font-black text-gray-900 dark:text-white">{supplier.established}</div>
                  <div className="text-[11px] text-gray-500">Founded</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{supplier.responseRate}</div>
                  <div className="text-[11px] text-gray-500">Response</div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">Contact Details</h3>
              <div className="flex items-start space-x-3 text-xs text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                <span>{supplier.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>{supplier.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>{supplier.phone}</span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-panel rounded-2xl p-5">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">
                <MessageSquare className="inline w-4 h-4 mr-2 text-brand-500" />
                Send Wholesale Inquiry
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={contactForm.name}
                  onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-brand-500 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-brand-500 dark:text-white"
                />
                <textarea
                  placeholder="Describe your bulk order needs, quantity, and delivery location..."
                  required
                  rows="4"
                  value={contactForm.message}
                  onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-brand-500 dark:text-white"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry to Supplier</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right: Products */}
          <div className="lg:col-span-8">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">
              {supplier.name}'s Bulk Product Catalog
              <span className="text-sm font-medium text-gray-500 ml-2">({supplierProducts.length} listings)</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {supplier.description}
            </p>
            {supplierProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {supplierProducts.map(product => (
                  <ProductCard key={product.id} product={product} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-10 text-center">
                <Package className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No products listed yet for this supplier.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch, ShieldCheck, Mail, Phone, MapPin, Send, Award, Lock, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thank you for subscribing to wholesale price alert updates!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-white dark:bg-[#090C12] border-t border-gray-200/80 dark:border-gray-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 mb-16 bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 text-white relative overflow-hidden shadow-2xl border-none">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/30 text-brand-200 text-xs font-semibold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" /> B2B Price Intelligence
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                Subscribe for Exclusive Wholesale Drops & Flash Tier Price Cuts
              </h3>
              <p className="text-brand-100 text-sm max-w-xl">
                Get weekly market reports, new verified supplier alerts, and direct factory deals delivered straight to your inbox.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter business email..."
                  required
                  className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <PackageSearch className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Bulk<span className="text-brand-600 dark:text-brand-400">Saves</span>Hub
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              The leading SaaS platform connecting e-commerce brands, retailers, and corporate buyers directly with verified factory wholesalers worldwide.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Verified Wholesalers</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800/60">
                <Lock className="w-4 h-4" />
                <span>Escrow Buyer Protection</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Platform Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Browse All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Product Categories
                </Link>
              </li>
              <li>
                <Link to="/suppliers" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Wholesale Suppliers
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Savings Calculator
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company & Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  About Bulk Saves Hub
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Contact Wholesale Support
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Become a Verified Supplier
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Buyer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Corporate Office
            </h4>
            <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span>100 Enterprise Way, Suite 400, San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>support@bulksaveshub.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>+1 (800) 489-0192 (Mon-Fri)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Bulk Saves Hub Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <a href="#escrow" className="hover:underline">Buyer Escrow Protection</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

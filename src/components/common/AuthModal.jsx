import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Building2, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = ({ isOpen, onClose, onSuccess, title = "Authentication Required", message = "Please sign in or create an account with your email to continue." }) => {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: '',
    role: 'Wholesale Buyer'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegisterMode) {
        await register(formData);
      } else {
        await login(formData.email, formData.password);
      }
      setLoading(false);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white dark:bg-[#111622] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          {/* Header Banner */}
          <div className="relative p-6 bg-gradient-to-r from-brand-600 to-indigo-600 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-200 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Bulk Saves Hub Account</span>
            </div>
            
            <h3 className="text-xl font-black text-white">
              {isRegisterMode ? 'Create Your Free Account' : 'Sign In to Your Account'}
            </h3>
            <p className="text-xs text-white/80 mt-1">
              {message}
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            {isRegisterMode && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Company Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Horizon Retail"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 555-0192"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center space-x-2 mt-2"
            >
              <span>{loading ? 'Processing...' : isRegisterMode ? 'Create Account & Continue' : 'Sign In & Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                {isRegisterMode
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Create one for free"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;

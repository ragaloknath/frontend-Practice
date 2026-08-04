import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function Contact() {
  const { submitContactMessage } = useProducts();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitContactMessage(form);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <div className="bg-white dark:bg-[#090C12] border-b border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Contact Wholesale Support
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-lg mx-auto">
            Need help connecting with a supplier, or have questions about our B2B platform? Our team typically replies within 2 business hours.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Info Cards */}
          <div className="lg:col-span-4 space-y-6">
            {[
              {
                icon: Mail, title: 'Email Support',
                desc: 'Reach our wholesale team',
                value: 'support@bulksaveshub.com',
                color: 'from-brand-500 to-indigo-600'
              },
              {
                icon: Phone, title: 'Phone Support',
                desc: 'Mon–Fri, 9AM–6PM EST',
                value: '+1 (800) 489-0192',
                color: 'from-emerald-500 to-teal-600'
              },
              {
                icon: MapPin, title: 'Headquarters',
                desc: 'Enterprise Office',
                value: '100 Enterprise Way, San Francisco, CA',
                color: 'from-amber-500 to-orange-600'
              },
              {
                icon: Clock, title: 'Response Time',
                desc: 'Average support reply',
                value: '< 2 Business Hours',
                color: 'from-purple-500 to-pink-600'
              }
            ].map(({ icon: Icon, title, desc, value, color }) => (
              <div key={title} className="glass-card rounded-2xl p-5 flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-[11px] text-gray-500">{desc}</p>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8">
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-brand-500" />
                <span>Send Us a Message</span>
              </h2>
              <p className="text-sm text-gray-500 mb-6">Submit your wholesale inquiry, supplier question, or support request below.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                    Our wholesale support team will review your message and reply within 2 business hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Alex Johnson"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-brand-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-brand-500 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="e.g. Bulk order inquiry for 500 wireless earbuds"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-brand-500 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows="5"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe your wholesale requirements, quantities, target markets, and any questions about sourcing, shipping, or supplier verification..."
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-brand-500 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center space-x-2 w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

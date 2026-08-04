import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Heart, Bell, Search, Package, LogOut,
  BarChart3, Clock, CheckCircle, Trash2, TrendingDown, X, Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/products/ProductCard';
import { RatingStars } from '../components/common/RatingStars';

const TAB_LIST = [
  { key: 'overview', label: 'Overview', icon: BarChart3 },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'searches', label: 'Search History', icon: Search },
  { key: 'messages', label: 'Messages', icon: Package }
];

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const {
    products,
    wishlist,
    notifications,
    searchHistory,
    messages,
    markNotificationRead,
    deleteNotification,
    clearHistory
  } = useProducts();

  const [activeTab, setActiveTab] = useState('overview');

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  const totalSaved = wishlistProducts.reduce((sum, p) => sum + (p.retailPrice - p.bulkPrice), 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-black shadow-xl">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">{currentUser?.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-0.5 rounded-full">
                  {currentUser?.role || 'Wholesale Buyer'}
                </span>
                <span className="text-xs text-gray-500">· {currentUser?.company || 'Direct Buyer'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/profile-settings"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-950 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Wishlist Items', value: wishlist.length, icon: Heart, color: 'text-red-500' },
            { label: 'Total Savings Value', value: `$${totalSaved.toFixed(0)}`, icon: TrendingDown, color: 'text-emerald-500' },
            { label: 'Unread Notifications', value: unreadNotifs, icon: Bell, color: 'text-amber-500' },
            { label: 'Messages Sent', value: messages.length, icon: Package, color: 'text-brand-500' }
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass-card rounded-2xl p-5 text-center">
              <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
              <div className="text-2xl font-black text-gray-900 dark:text-white">{value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="glass-panel rounded-3xl overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-100 dark:border-gray-800 px-4 pt-4 gap-1">
            {TAB_LIST.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap -mb-px ${
                  activeTab === key
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50/60 dark:bg-brand-950/30 border-b-2 border-brand-600'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
                {key === 'notifications' && unreadNotifs > 0 && (
                  <span className="w-4 h-4 bg-amber-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Wishlist */}
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Recent Wishlist Items</h3>
                    <div className="space-y-3">
                      {wishlistProducts.slice(0, 3).length > 0 ? (
                        wishlistProducts.slice(0, 3).map(p => (
                          <Link key={p.id} to={`/products/${p.id}`} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group">
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-brand-600 dark:group-hover:text-brand-400">{p.name}</p>
                              <p className="text-xs text-brand-600 dark:text-brand-400 font-bold">₹{p.bulkPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}/unit</p>
                            </div>
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold whitespace-nowrap">
                              {Math.round(((p.retailPrice - p.bulkPrice) / p.retailPrice) * 100)}% off
                            </span>
                          </Link>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 py-4 text-center">No items in wishlist yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">Recent Searches</h3>
                      {searchHistory.length > 0 && (
                        <button onClick={clearHistory} className="text-xs text-red-500 hover:underline flex items-center space-x-1">
                          <Trash2 className="w-3 h-3" />
                          <span>Clear History</span>
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.length > 0 ? (
                        searchHistory.map((q, i) => (
                          <Link
                            key={i}
                            to={`/products?search=${encodeURIComponent(q)}`}
                            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-brand-100 dark:hover:bg-brand-950/60 hover:text-brand-700 dark:hover:text-brand-300 transition-all"
                          >
                            <Clock className="w-3 h-3" />
                            <span>{q}</span>
                          </Link>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500">No search history yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div>
                {wishlistProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map(p => (
                      <ProductCard key={p.id} product={p} layout="grid" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No products in your wishlist yet.</p>
                    <Link to="/products" className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold">
                      Browse Wholesale Catalog
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      className={`flex items-start justify-between p-4 rounded-2xl border ${
                        n.read
                          ? 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800'
                          : 'bg-brand-50/60 dark:bg-brand-950/40 border-brand-200 dark:border-brand-800'
                      }`}
                    >
                      <div onClick={() => markNotificationRead(n.id)} className="cursor-pointer flex-1 pr-3">
                        <div className="flex items-center space-x-2 mb-1">
                          {!n.read && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{n.title}</p>
                          <span className="text-[10px] text-gray-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{n.message}</p>
                      </div>
                      <button onClick={() => deleteNotification(n.id)} className="text-gray-400 hover:text-red-500 p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500 py-8">All clear! No notifications.</p>
                )}
              </div>
            )}

            {/* SEARCH HISTORY TAB */}
            {activeTab === 'searches' && (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Your Search History ({searchHistory.length})</h3>
                  {searchHistory.length > 0 && (
                    <button onClick={clearHistory} className="text-xs text-red-500 hover:underline flex items-center space-x-1">
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {searchHistory.length > 0 ? (
                    searchHistory.map((q, i) => (
                      <Link
                        key={i}
                        to={`/products?search=${encodeURIComponent(q)}`}
                        className="flex items-center space-x-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-brand-700 transition-all group"
                      >
                        <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-500" />
                        <span className="truncate">{q}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="col-span-4 text-center text-sm text-gray-500 py-8">No search history.</p>
                  )}
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map(msg => (
                    <div key={msg.id} className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{msg.subject}</span>
                        <span className="text-xs text-gray-400">{msg.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">From: {msg.name} · {msg.email}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No messages sent yet.</p>
                    <Link to="/contact" className="text-brand-600 text-xs hover:underline mt-2 block">Send a message to our team</Link>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { User, Mail, Phone, Building2, Briefcase, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfileSettings() {
  const { currentUser, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    company: currentUser?.company || '',
    role: currentUser?.role || '',
    phone: currentUser?.phone || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
  };

  const fields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Your Full Name' },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'you@company.com' },
    { key: 'company', label: 'Company Name', icon: Building2, type: 'text', placeholder: 'Your Company Inc.' },
    { key: 'role', label: 'Job Title / Role', icon: Briefcase, type: 'text', placeholder: 'Head of Procurement' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+1 (555) 000-0000' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-3 mb-8">
          <Link to="/dashboard" className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Account Settings</h1>
            <p className="text-xs text-gray-500">Update your profile information and preferences</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8">
          {/* Avatar */}
          <div className="flex items-center space-x-5 pb-8 border-b border-gray-100 dark:border-gray-800 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-black shadow-xl">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">{currentUser?.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
              <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-1">
                Member since {currentUser?.joinedDate}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                  <div className="relative">
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                    />
                    <Icon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-xl shadow-brand-500/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

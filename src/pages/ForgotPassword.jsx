import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(email);
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0B0F17] to-[#0d1424] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <PackageSearch className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold text-white">
              Bulk<span className="text-brand-400">Saves</span>Hub
            </span>
          </Link>

          {sent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl font-black text-white">Check Your Email</h2>
              <p className="text-sm text-gray-400">
                We've sent a password reset link to <strong className="text-white">{email}</strong>.
                Please check your inbox and spam folder.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 text-brand-400 hover:underline text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-white text-center mb-1">Reset Password</h2>
              <p className="text-gray-400 text-sm text-center mb-8">
                Enter your email address and we'll send you a secure reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/60"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl transition-all disabled:opacity-60"
                >
                  {loading ? 'Sending Reset Link...' : 'Send Password Reset Link'}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link to="/login" className="inline-flex items-center space-x-2 text-gray-400 hover:text-brand-400 text-xs transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

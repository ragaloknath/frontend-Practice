import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe2, Award, Users, TrendingDown, Zap, ArrowRight } from 'lucide-react';

const TEAM = [
  {
    name: 'Michael Hayes',
    role: 'CEO & Co-Founder',
    bio: 'Former VP of Supply Chain at Fortune 500 retailer with 15+ years in B2B wholesale logistics.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Priya Sharma',
    role: 'CTO & Co-Founder',
    bio: 'Full-stack product engineer behind three successful SaaS platforms before co-founding Bulk Saves Hub.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
  },
  {
    name: 'Carlos Mendes',
    role: 'Head of Supplier Relations',
    bio: 'Built and managed global sourcing networks across Asia, Europe, and South America since 2012.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-slate-950 via-[#0B0F17] to-brand-950 overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Award className="w-4 h-4" />
              <span>Our Story & Mission</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Democratizing Access<br />to <span className="text-gradient">Factory Pricing</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Bulk Saves Hub was founded in 2021 with a clear mission: eliminate the pricing opacity and broker middlemen that have long kept small and mid-size retailers locked out of factory-direct wholesale pricing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="py-20 bg-white dark:bg-[#090C12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck, color: 'from-emerald-500 to-teal-600',
                title: 'Verified Sourcing Network',
                desc: 'We personally vet every supplier through factory audits, business registration checks, and historical fulfillment reviews before they can list products.'
              },
              {
                icon: TrendingDown, color: 'from-brand-500 to-indigo-600',
                title: 'Radical Price Transparency',
                desc: 'All wholesale pricing, volume tiers, and MOQs are displayed upfront — zero hidden fees, negotiating games, or broker commissions.'
              },
              {
                icon: Globe2, color: 'from-amber-500 to-orange-600',
                title: 'Global Wholesale Intelligence',
                desc: 'Our platform aggregates bulk pricing data from manufacturers across 98 countries and continuously updates tiers as markets fluctuate.'
              }
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-7 text-center group hover:border-brand-500/40 hover:shadow-xl transition-all">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${color} flex items-center justify-center text-white shadow-lg mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white mb-3">{title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50 dark:bg-[#0B0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
              The Leadership Team
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Experienced operators from wholesale, supply chain, and SaaS backgrounds
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-3xl p-7 text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 shadow-xl"
                />
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold mb-3">{member.role}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-[#090C12]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-10 h-10 text-brand-500 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
            Ready to Source Smarter?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Join thousands of retailers, e-commerce sellers, and procurement teams already saving 30–70% on bulk inventory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xl transition-all hover:scale-105 flex items-center space-x-2">
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="px-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

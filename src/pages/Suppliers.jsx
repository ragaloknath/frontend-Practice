import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Phone, Mail, Package, ArrowRight, Star } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { RatingStars } from '../components/common/RatingStars';

export default function Suppliers() {
  const { suppliers, products } = useProducts();

  const getSupplierProductCount = (supplierId) =>
    products.filter(p => p.supplierId === supplierId).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      <div className="bg-white dark:bg-[#090C12] border-b border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Verified Wholesale Suppliers
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
            Every supplier on our platform is vetted through our 12-point factory verification system.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {suppliers.map((supplier, i) => {
            const productCount = getSupplierProductCount(supplier.id);
            return (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="glass-card rounded-3xl p-7 group hover:border-brand-500/40 hover:shadow-xl transition-all">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center space-x-4">
                      <img
                        src={supplier.logo}
                        alt={supplier.name}
                        className="w-20 h-20 rounded-2xl object-cover bg-gray-100 dark:bg-gray-800 shadow-md"
                      />
                      <div>
                        <h3 className="font-extrabold text-lg text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {supplier.name}
                        </h3>
                        {supplier.verified && (
                          <span className="inline-flex items-center space-x-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full mt-1 border border-emerald-200 dark:border-emerald-800/60">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Diamond Verified Wholesaler</span>
                          </span>
                        )}
                        <RatingStars rating={supplier.rating} reviewsCount={supplier.reviewsCount} size="sm" />
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                    {supplier.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="text-lg font-black text-gray-900 dark:text-white">{productCount || '12+'}</div>
                      <div className="text-[11px] text-gray-500">Products</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="text-lg font-black text-brand-600 dark:text-brand-400">{supplier.responseRate}</div>
                      <div className="text-[11px] text-gray-500">Response Rate</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="text-lg font-black text-gray-900 dark:text-white">{supplier.established}</div>
                      <div className="text-[11px] text-gray-500">Est. Year</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-5 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                      <span>{supplier.contactEmail}</span>
                    </div>
                  </div>

                  <Link
                    to={`/suppliers/${supplier.id}`}
                    className="flex items-center justify-center space-x-2 w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg transition-all"
                  >
                    <span>View Supplier Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

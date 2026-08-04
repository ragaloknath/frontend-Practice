import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Image as ImageIcon, DollarSign, Package, ShieldCheck } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const AddEditProductModal = ({ isOpen, onClose, initialData = null }) => {
  const { addProduct, updateProduct, categories, suppliers } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    supplierId: 'sup_apex',
    supplierName: 'Apex Global Tech Ltd',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    description: '',
    retailPrice: '',
    bulkPrice: '',
    moq: '50',
    unit: 'units',
    stockQuantity: '1000'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'electronics',
        supplierId: initialData.supplierId || 'sup_apex',
        supplierName: initialData.supplierName || 'Apex Global Tech Ltd',
        image: initialData.image || '',
        description: initialData.description || '',
        retailPrice: initialData.retailPrice || '',
        bulkPrice: initialData.bulkPrice || '',
        moq: initialData.moq || '50',
        unit: initialData.unit || 'units',
        stockQuantity: initialData.stockQuantity || '1000'
      });
    } else {
      setFormData({
        name: '',
        category: categories[0]?.id || 'electronics',
        supplierId: suppliers[0]?.id || 'sup_apex',
        supplierName: suppliers[0]?.name || 'Apex Global Tech Ltd',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
        description: '',
        retailPrice: '',
        bulkPrice: '',
        moq: '50',
        unit: 'units',
        stockQuantity: '1000'
      });
    }
  }, [initialData, categories, suppliers, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'supplierId') {
      const selectedSup = suppliers.find(s => s.id === value);
      setFormData(prev => ({
        ...prev,
        supplierId: value,
        supplierName: selectedSup ? selectedSup.name : prev.supplierName
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      retailPrice: parseFloat(formData.retailPrice),
      bulkPrice: parseFloat(formData.bulkPrice),
      moq: parseInt(formData.moq, 10),
      stockQuantity: parseInt(formData.stockQuantity, 10)
    };

    if (initialData) {
      updateProduct(initialData.id, payload);
    } else {
      addProduct(payload);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-[#151C28] rounded-3xl p-6 max-w-2xl w-full border border-gray-200 dark:border-gray-800 shadow-2xl my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                {initialData ? 'Edit Product Listing' : 'Add New Bulk Product'}
              </h3>
              <p className="text-xs text-gray-500">
                Publish factory pricing, minimum order quantities, and product details.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ultra HD 4K Wireless Presentation Hub"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Category & Supplier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Supplier *
                </label>
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Estimated Retail Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="retailPrice"
                  required
                  value={formData.retailPrice}
                  onChange={handleChange}
                  placeholder="99.99"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Factory Bulk Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="bulkPrice"
                  required
                  value={formData.bulkPrice}
                  onChange={handleChange}
                  placeholder="29.50"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 font-bold text-brand-600"
                />
              </div>
            </div>

            {/* MOQ & Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Min Order Quantity (MOQ) *
                </label>
                <input
                  type="number"
                  name="moq"
                  required
                  value={formData.moq}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Unit Type
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="units, boxes, pieces"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Available Stock
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Product Image URL *
              </label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Detailed Product Description *
              </label>
              <textarea
                name="description"
                rows="3"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide manufacturing specs, materials, warranty, and packaging options..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              ></textarea>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/25 transition-all"
              >
                {initialData ? 'Save Changes' : 'Publish Product Listing'}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

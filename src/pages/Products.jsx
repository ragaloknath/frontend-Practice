import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, List, PlusCircle, SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilter } from '../components/products/ProductFilter';
import { AddEditProductModal } from '../components/products/AddEditProductModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Pagination } from '../components/common/Pagination';

const ITEMS_PER_PAGE = 9;

export default function Products() {
  const { products, categories, suppliers, deleteProduct, logSearch } = useProducts();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();

  const [layout, setLayout] = useState('grid');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [supplier, setSupplier] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [maxMoq, setMaxMoq] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Apply URL params
  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('category') || 'all';
    setSearch(s);
    if (s.trim()) logSearch(s.trim());
    setCategory(c);
    setPage(1);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.supplierName?.toLowerCase().includes(q)
      );
    }
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (supplier !== 'all') result = result.filter(p => p.supplierId === supplier);
    result = result.filter(p => p.bulkPrice <= maxPrice && p.moq <= maxMoq);

    switch (sortBy) {
      case 'savings':
        result.sort((a, b) => ((b.retailPrice - b.bulkPrice) / b.retailPrice) - ((a.retailPrice - a.bulkPrice) / a.retailPrice));
        break;
      case 'price-asc':
        result.sort((a, b) => a.bulkPrice - b.bulkPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.bulkPrice - a.bulkPrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'moq-asc':
        result.sort((a, b) => a.moq - b.moq);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, search, category, supplier, maxPrice, maxMoq, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleReset = () => {
    setSearch(''); setCategory('all'); setSupplier('all');
    setMaxPrice(10000); setMaxMoq(1000); setSortBy('featured'); setPage(1);
  };

  const handleDelete = (id) => setDeleteId(id);
  const confirmDelete = () => { deleteProduct(deleteId); setDeleteId(null); };
  const handleEdit = (product) => setEditProduct(product);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17]">
      
      {/* Page Header */}
      <div className="bg-white dark:bg-[#090C12] border-b border-gray-100 dark:border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                Wholesale Product Catalog
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filteredProducts.length} bulk products found — Factory-direct pricing
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Layout Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-2 rounded-lg transition-all ${layout === 'grid' ? 'bg-white dark:bg-gray-700 shadow text-brand-600' : 'text-gray-500'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-2 rounded-lg transition-all ${layout === 'list' ? 'bg-white dark:bg-gray-700 shadow text-brand-600' : 'text-gray-500'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {/* Add Product */}
              {isAuthenticated && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilter
                search={search} setSearch={setSearch}
                category={category} setCategory={setCategory}
                supplier={supplier} setSupplier={setSupplier}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                maxMoq={maxMoq} setMaxMoq={setMaxMoq}
                sortBy={sortBy} setSortBy={setSortBy}
                categories={categories}
                suppliers={suppliers}
                onReset={handleReset}
              />
            </div>
          </aside>

          {/* Mobile Sidebar Drawer */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsFilterOpen(false)}>
              <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-[#151C28] p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm dark:text-white">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
                </div>
                <ProductFilter
                  search={search} setSearch={setSearch}
                  category={category} setCategory={setCategory}
                  supplier={supplier} setSupplier={setSupplier}
                  maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                  maxMoq={maxMoq} setMaxMoq={setMaxMoq}
                  sortBy={sortBy} setSortBy={setSortBy}
                  categories={categories}
                  suppliers={suppliers}
                  onReset={handleReset}
                />
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={paginatedProducts}
              loading={false}
              layout={layout}
              onEditProduct={isAuthenticated ? handleEdit : null}
              onDeleteProduct={isAuthenticated ? handleDelete : null}
              onResetFilters={handleReset}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          </div>

        </div>
      </div>

      {/* Modals */}
      <AddEditProductModal
        isOpen={isAddModalOpen || !!editProduct}
        onClose={() => { setIsAddModalOpen(false); setEditProduct(null); }}
        initialData={editProduct}
      />
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Remove Product Listing?"
        message="Are you sure you want to permanently delete this bulk product listing? This action cannot be undone."
        confirmText="Delete Listing"
        onConfirm={confirmDelete}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}

import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProductCompareDrawer } from '../components/products/ProductCompareDrawer';
import { AddEditProductModal } from '../components/products/AddEditProductModal';
import { ProtectedRoute } from './ProtectedRoute';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Categories = lazy(() => import('../pages/Categories'));
const Suppliers = lazy(() => import('../pages/Suppliers'));
const SupplierDetails = lazy(() => import('../pages/SupplierDetails'));
const Calculator = lazy(() => import('../pages/Calculator'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Terms = lazy(() => import('../pages/Terms'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ProfileSettings = lazy(() => import('../pages/ProfileSettings'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Compare = lazy(() => import('../pages/Compare'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B0F17]">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-2xl animate-pulse">
        <div className="w-7 h-7 rounded-full bg-white/40"></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Loading Bulk Saves Hub...</p>
    </div>
  </div>
);

export const AppRoutes = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      <main className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/:id" element={<SupplierDetails />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/compare" element={<Compare />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* Global Product Comparison Drawer */}
      <ProductCompareDrawer />

      {/* Global Add Product Modal */}
      <AddEditProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
};

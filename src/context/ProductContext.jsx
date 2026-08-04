import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { useToast } from './ToastContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  const refreshData = () => {
    setProducts(storageService.getProducts());
    setCategories(storageService.getCategories());
    setSuppliers(storageService.getSuppliers());
    setWishlist(storageService.getWishlist());
    setSearchHistory(storageService.getSearchHistory());
    setNotifications(storageService.getNotifications());
    setMessages(storageService.getMessages());
  };

  useEffect(() => {
    refreshData();
    setLoading(false);
  }, []);

  // PRODUCT CRUD
  const addProduct = (productData) => {
    const newProduct = storageService.addProduct(productData);
    setProducts(prev => [newProduct, ...prev]);
    toast.success(`Product "${newProduct.name}" added successfully!`);
    return newProduct;
  };

  const updateProduct = (id, fields) => {
    const updated = storageService.updateProduct(id, fields);
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    toast.success(`Product updated successfully!`);
    return updated;
  };

  const deleteProduct = (id) => {
    storageService.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
    setWishlist(prev => prev.filter(pId => pId !== id));
    toast.info('Product listing removed.');
  };

  // WISHLIST CRUD
  const toggleWishlist = (productId) => {
    const updated = storageService.toggleWishlist(productId);
    setWishlist(updated);
    if (updated.includes(productId)) {
      toast.success('Added to Wishlist!');
    } else {
      toast.info('Removed from Wishlist.');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // REVIEWS CRUD
  const addReview = (reviewData) => {
    const newRev = storageService.addReview(reviewData);
    setProducts(storageService.getProducts());
    toast.success('Thank you for submitting your review!');
    return newRev;
  };

  // CONTACT MESSAGES CRUD
  const submitContactMessage = (msgData) => {
    const newMsg = storageService.addMessage(msgData);
    setMessages(prev => [newMsg, ...prev]);
    toast.success('Message sent! Our support & wholesale team will reply shortly.');
    return newMsg;
  };

  // SEARCH HISTORY CRUD
  const logSearch = (query) => {
    const updated = storageService.addSearchQuery(query);
    if (updated) setSearchHistory(updated);
  };

  const clearHistory = () => {
    storageService.clearSearchHistory();
    setSearchHistory([]);
    toast.info('Search history cleared.');
  };

  // NOTIFICATIONS CRUD
  const markNotificationRead = (id) => {
    const updated = storageService.markNotificationAsRead(id);
    setNotifications(updated);
  };

  const deleteNotification = (id) => {
    const updated = storageService.deleteNotification(id);
    setNotifications(updated);
    toast.info('Notification dismissed.');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        suppliers,
        wishlist,
        searchHistory,
        notifications,
        messages,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleWishlist,
        isInWishlist,
        addReview,
        submitContactMessage,
        logSearch,
        clearHistory,
        markNotificationRead,
        deleteNotification,
        refreshData
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

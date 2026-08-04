import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const { toast } = useToast();

  const addToCompare = (product) => {
    if (compareItems.some(item => item.id === product.id)) {
      toast.info('Product is already in the comparison tray.');
      setIsCompareOpen(true);
      return;
    }
    if (compareItems.length >= 4) {
      toast.warning('You can compare up to 4 products at a time.');
      return;
    }
    setCompareItems(prev => [...prev, product]);
    toast.success(`Added "${product.name.slice(0, 25)}..." to comparison.`);
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId) => {
    setCompareItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setIsCompareOpen(false);
    toast.info('Comparison list cleared.');
  };

  const toggleCompareDrawer = () => {
    setIsCompareOpen(prev => !prev);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        isCompareOpen,
        addToCompare,
        removeFromCompare,
        clearCompare,
        toggleCompareDrawer,
        setIsCompareOpen
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);

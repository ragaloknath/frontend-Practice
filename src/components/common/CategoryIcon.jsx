import React from 'react';
import {
  Cpu,
  Briefcase,
  Shirt,
  Home,
  Sparkles,
  Package,
  Carrot,
  Leaf,
  Apple,
  ShoppingBag,
  Utensils
} from 'lucide-react';

const ICON_MAP = {
  Cpu: Cpu,
  Briefcase: Briefcase,
  Shirt: Shirt,
  Home: Home,
  Sparkles: Sparkles,
  Package: Package,
  Carrot: Carrot,
  Leaf: Leaf,
  Apple: Apple,
  ShoppingBag: ShoppingBag,
  Utensils: Utensils,
  // Fallbacks by category id string
  electronics: Cpu,
  office: Briefcase,
  fashion: Shirt,
  home: Home,
  beauty: Sparkles,
  industrial: Package,
  groceries: Carrot,
  vegetables: Carrot
};

export const CategoryIcon = ({ icon, className = "w-6 h-6" }) => {
  const IconComponent = ICON_MAP[icon] || ICON_MAP[icon?.toLowerCase()] || Package;
  return <IconComponent className={className} />;
};

export default CategoryIcon;

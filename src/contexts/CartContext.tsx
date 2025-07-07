"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Listen for BottleNexus cart open events
    const handleCartOpen = () => setIsCartOpen(true);
    const handleCartAdd = () => setIsCartOpen(true);
    
    window.addEventListener('bottlenexus:cart:open', handleCartOpen);
    window.addEventListener('bottlenexus:cart:add', handleCartAdd);
    
    return () => {
      window.removeEventListener('bottlenexus:cart:open', handleCartOpen);
      window.removeEventListener('bottlenexus:cart:add', handleCartAdd);
    };
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

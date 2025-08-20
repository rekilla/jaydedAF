"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products } from '../data/products';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cartItems: CartItem[];
  updateCartItems: (items: any[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {

    
    return () => {
      // No event listeners to remove if BottleNexus is removed
    };
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);
  const updateCartItems = (items: any[]) => {
    const newCartItems = items.map((item: any) => {
        const product = products.find(p => p.id === item.productId);
        return {
          id: item.productId,
          name: product?.name || 'Unknown Product',
          price: item.price,
          quantity: item.quantity,
          image: product?.bottleImage || '',
          sku: item.sku,
        };
      });
      setCartItems(newCartItems);
  }

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart, cartItems, updateCartItems }}>
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

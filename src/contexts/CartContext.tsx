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
    const handleCartOpen = () => setIsCartOpen(true);
    const handleCartUpdate = (event: any) => {
      const bnCart = event.detail;
      if (bnCart && bnCart.lineItems) {
        const newCartItems = bnCart.lineItems.map((item: any) => {
          console.log(`Looking for product with BottleNexus ID: ${item.productId} (type: ${typeof item.productId})`);
          const product = products.find(p => p.bottleNexusId == item.productId);
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
    };

    const handleCartAdd = (event: any) => {
      handleCartUpdate(event);
      setIsCartOpen(true);
    };

    window.addEventListener('bottlenexus:cart:open', handleCartOpen);
    window.addEventListener('bottlenexus:cart:add', handleCartAdd);
    window.addEventListener('bottlenexus:cart:update', handleCartUpdate);
    
    return () => {
      window.removeEventListener('bottlenexus:cart:open', handleCartOpen);
      window.removeEventListener('bottlenexus:cart:add', handleCartAdd);
      window.removeEventListener('bottlenexus:cart:update', handleCartUpdate);
    };
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);
  const updateCartItems = (items: any[]) => {
    const newCartItems = items.map((item: any) => {
        const product = products.find(p => p.bottleNexusId === item.productId);
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

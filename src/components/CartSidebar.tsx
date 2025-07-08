"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Lock, CreditCard, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      if ((window as any).BottleNexus) {
        (window as any).BottleNexus.checkout();
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax estimate
  const total = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-[480px] bg-white z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  Shopping Cart
                  {cartItems.length > 0 && (
                    <span className="bg-brand-gold text-black text-sm px-2 py-0.5 rounded-full font-medium">
                      {cartItems.length}
                    </span>
                  )}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 px-6 py-3 bg-gray-50 border-b">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Safe Payment</span>
                </div>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full px-6 py-12">
                    <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 text-center mb-6">
                      Add some premium cocktails to get started
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="px-6 py-4 space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                      >
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">${item.price.toFixed(2)} each</p>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button 
                                className="p-1.5 hover:bg-gray-50 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="px-4 py-1 text-gray-900 font-medium min-w-[50px] text-center">
                                {item.quantity}
                              </span>
                              <button 
                                className="p-1.5 hover:bg-gray-50 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            <button className="text-sm text-gray-500 hover:text-red-600 transition-colors">
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with Order Summary */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
                  {/* Order Summary */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estimated Tax</span>
                      <span className="text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-3 border-t">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium 
                             hover:bg-gray-900 transition-all duration-200 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent 
                                      rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Proceed to Secure Checkout
                      </>
                    )}
                  </button>

                  {/* Trust Text */}
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Your payment information is encrypted and secure.
                    We never store your credit card details.
                  </p>

                  {/* Payment Methods */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <img src="/images/payment/visa.svg" alt="Visa" className="h-6" />
                    <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-6" />
                    <img src="/images/payment/amex.svg" alt="American Express" className="h-6" />
                    <img src="/images/payment/paypal.svg" alt="PayPal" className="h-6" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

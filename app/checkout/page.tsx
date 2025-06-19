'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PortfolioLayout from '@/components/PortfolioLayout';

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  deliveryEmail: string;
  platform: string;
  phoneNumber: string;
  notes: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    deliveryEmail: '',
    platform: '',
    phoneNumber: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cart,
          total: calculateTotal().toFixed(2)
        }),
      });

      if (response.ok) {
        setOrderPlaced(true);
        localStorage.removeItem('cart'); // Clear cart after successful order
      } else {
        const errorData = await response.json();
        alert(`Error placing order: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Error placing order. Please try again.');
    }

    setIsSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <PortfolioLayout>
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1E1E1E] p-8 rounded-xl border border-gray-800 max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-8 h-8 text-green-500" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-400 mb-6">
              Thank you for your purchase. You will receive delivery instructions at {formData.deliveryEmail || formData.email} shortly.
            </p>
            <Link href="/store">
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </div>
      </PortfolioLayout>
    );
  }

  if (cart.length === 0) {
    return (
      <PortfolioLayout>
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-6">Add some products to your cart before checking out.</p>
            <Link href="/store">
              <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Go to Store
              </button>
            </Link>
          </div>
        </div>
      </PortfolioLayout>
    );
  }

  return (
    <PortfolioLayout>
      <div className="min-h-screen bg-[#121212] text-white p-4 sm:p-8 max-w-4xl mx-auto">
        <Link href="/store" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Store
        </Link>

        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-[#252525] rounded-lg">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-green-400">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="text-green-500" />
              <h2 className="text-xl font-semibold">Delivery Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Email (if different)</label>
                <input
                  type="email"
                  name="deliveryEmail"
                  value={formData.deliveryEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Platform/Technology</label>
                <select
                  name="platform"
                  required
                  value={formData.platform}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                >
                  <option value="">Select platform</option>
                  <option value="react">React</option>
                  <option value="nextjs">Next.js</option>
                  <option value="vue">Vue.js</option>
                  <option value="angular">Angular</option>
                  <option value="html">HTML/CSS/JS</option>
                  <option value="ios">iOS (Swift)</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number (optional)</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Truck size={18} />
                    </motion.div>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <Truck size={18} />
                    Place Order
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 p-4 bg-[#252525] rounded-lg">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Delivery Information:</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• Digital products delivered via email</li>
                <li>• Source code and documentation included</li>
                <li>• Lifetime updates and support</li>
                <li>• Commercial license included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PortfolioLayout>
  );
}

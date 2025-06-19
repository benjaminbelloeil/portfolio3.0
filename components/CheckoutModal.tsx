'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Lock,
  Clock,
  Shield,
  Check,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { state: cartState, calculateTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    platform: 'email',
    deliveryEmail: '',
    preferredContact: 'email',
    phoneNumber: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartState.items.length === 0) return;

    setIsSubmitting(true);
    try {
      const total = calculateTotal();

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          deliveryEmail: formData.deliveryEmail,
          platform: formData.platform,
          phoneNumber: formData.phoneNumber,
          notes: formData.notes,
          cart: cartState.items,
          total: total.toFixed(2)
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        clearCart();
        setTimeout(() => {
          setShowSuccess(false);
          setStep(1);
          setFormData({
            email: '',
            firstName: '',
            lastName: '',
            platform: 'email',
            deliveryEmail: '',
            preferredContact: 'email',
            phoneNumber: '',
            notes: '',
          });
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">Contact Information</h3>
        <p className="text-gray-400">Let&apos;s start with your contact details</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
            placeholder="your@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Doe"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!formData.email || !formData.firstName || !formData.lastName}
          className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Delivery
        </button>
      </form>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">Delivery Information</h3>
        <p className="text-gray-400">How would you like to receive your digital products?</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Preferred Platform *
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="email">Email</option>
            <option value="github">GitHub Repository</option>
            <option value="drive">Google Drive</option>
            <option value="dropbox">Dropbox</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Delivery Email *
          </label>
          <input
            type="email"
            name="deliveryEmail"
            value={formData.deliveryEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
            placeholder="delivery@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Special Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-700 text-white focus:border-blue-500 focus:outline-none resize-none"
            placeholder="Any special requirements or customizations..."
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!formData.deliveryEmail}
            className="flex-1 bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Review Order
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">Order Review</h3>
        <p className="text-gray-400">Please review your order before submitting</p>
      </div>

      {/* Order Summary */}
      <div className="bg-[#1E1E1E] rounded-lg p-6 space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">Order Summary</h4>
        {cartState.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <p className="text-white">{item.title}</p>
              <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
            </div>
            <p className="text-white font-medium">
              ${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span className="text-white">Total</span>
            <span className="text-white">${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-[#1E1E1E] rounded-lg p-6 space-y-3">
        <h4 className="text-lg font-semibold text-white mb-4">Delivery Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="text-white">{formData.firstName} {formData.lastName}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-white">{formData.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Platform</p>
            <p className="text-white capitalize">{formData.platform}</p>
          </div>
          <div>
            <p className="text-gray-400">Delivery Email</p>
            <p className="text-white">{formData.deliveryEmail}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || cartState.items.length === 0}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="mx-auto w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
        <Check size={40} className="text-white" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-white mb-2">Order Confirmed!</h3>
        <p className="text-gray-400">
          Thank you for your purchase. You&apos;ll receive your digital products via email shortly.
        </p>
      </div>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-[#121212] rounded-xl border border-gray-800 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              {!showSuccess && (
                <div className="flex space-x-2">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className={`w-2 h-2 rounded-full ${
                        step >= num ? 'bg-white' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}
              <h2 className="text-xl font-semibold text-white">
                {showSuccess ? 'Success' : 'Checkout'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {showSuccess ? (
                renderSuccess()
              ) : step === 1 ? (
                renderStep1()
              ) : step === 2 ? (
                renderStep2()
              ) : (
                renderStep3()
              )}
            </AnimatePresence>
          </div>

          {/* Security Info */}
          {!showSuccess && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Lock size={12} />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield size={12} />
                  <span>Protected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

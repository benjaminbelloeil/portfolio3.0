'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  User,
  ArrowLeft,
  Lock,
  Mail,
  Clock,
  Shield,
  HelpCircle,
  Check,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PortfolioLayout from '@/components/PortfolioLayout';
import { useCart } from '@/contexts/CartContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  platform: string;
  deliveryEmail: string;
  preferredContact: string;
  phoneNumber: string;
  notes: string;
}

export default function CheckoutPage() {
  const { state: cartState, clearCart, calculateTotal } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    platform: 'email',
    deliveryEmail: '',
    preferredContact: 'email',
    phoneNumber: '',
    notes: '',
  });
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateCart = () => {
    if (!cartState.items || cartState.items.length === 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 3 && !validateCart()) {
      setShowEmptyCartModal(true);
      return;
    }

    if (step === 3) {
      // Send order details via Resend API
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
          setShowCompletionModal(true);
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
          setTimeout(() => {
            clearCart();
          }, 500);
        } else {
          const errorData = await response.json();
          alert(`Error sending order details: ${errorData.error || 'Unknown error'}`);
        }
      } catch (error) {
        alert('Error sending order details. Please try again.');
        console.error('Order submit error:', error);
      }
    } else {
      setStep(step + 1);
    }
  };

  const total = calculateTotal();

  return (
    <PortfolioLayout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="min-h-screen bg-[#121212] text-white px-4 sm:px-8 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft size={20} />
            Back to Store
          </Link>

          <motion.div
            variants={itemVariants}
            className="bg-[#1E1E1E]/80 backdrop-blur-lg rounded-2xl border border-gray-800/50 overflow-hidden"
          >
            {/* Progress Bar */}
            <div className="p-6 border-b border-gray-800/50">
              <div className="flex items-center justify-between w-full max-w-md mx-auto relative">
                <div className="absolute top-[9px] left-0 w-full h-1 bg-gray-700 rounded-full" />

                <motion.div
                  className="absolute top-[9px] left-0 h-1 bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      step === 1
                        ? '33%'
                        : step === 2
                        ? '66%'
                        : '100%',
                  }}
                  transition={{ duration: 0.5 }}
                />

                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <motion.div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        step >= i ? 'bg-blue-500' : 'bg-gray-700'
                      }`}
                      initial={{ scale: 1 }}
                      animate={{ scale: step >= i ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 1 }}
                        animate={{ scale: step >= i ? 1 : 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.span
                      className={`mt-2 text-sm font-medium ${
                        step >= i ? 'text-blue-400' : 'text-gray-500'
                      }`}
                      initial={{ color: '#6B7280' }}
                      animate={{ color: step >= i ? '#60A5FA' : '#6B7280' }}
                      transition={{ duration: 0.3 }}
                    >
                      Step {i}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Order Summary */}
              <div className="col-span-12 lg:col-span-4 bg-[#1A1A1A] order-1 lg:order-2">
                <div className="p-4 sm:p-8 lg:sticky top-0">
                  <h2 className="text-xl sm:text-2xl font-medium mb-6">Order Summary</h2>

                  {cartState.items.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      Your cart is empty.
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {cartState.items.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={96}
                            height={96}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.price}</p>
                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {cartState.items.length > 0 && (
                    <div className="space-y-3 border-t border-gray-800/50 pt-4">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Processing Fee</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between font-medium text-lg pt-3 border-t border-gray-800/50">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {/* Delivery Information */}
                  <div className="mt-8 space-y-4">
                    <h3 className="font-medium text-sm text-gray-400 flex items-center gap-2">
                      <Clock size={16} />
                      Estimated Delivery
                    </h3>
                    <div className="bg-[#252525] p-4 rounded-lg">
                      <p className="text-sm">
                        Digital products will be delivered within 24 hours of payment confirmation.
                      </p>
                    </div>
                  </div>

                  {/* Security Information */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Lock size={14} />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Shield size={14} />
                      <span>Trusted Transactions</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MessageSquare size={14} />
                      <span>Personal Assistance</span>
                    </div>
                  </div>

                  {/* Help Section */}
                  <div className="mt-8 bg-blue-500/10 p-4 rounded-lg">
                    <h3 className="font-medium text-sm text-blue-400 mb-2 flex items-center gap-2">
                      <HelpCircle size={16} />
                      Need Help?
                    </h3>
                    <p className="text-xs text-gray-400">
                      Feel free to reach out to me at benjaminbelloeil@outlook.com for any questions or assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="col-span-12 lg:col-span-8 p-4 sm:p-8 order-2 lg:order-1">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h2 className="text-lg font-medium flex items-center gap-2">
                          <User size={20} className="text-blue-400" />
                          Contact Information
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800/50 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          />
                          <p className="mt-2 text-xs text-gray-400">
                            Your email will be used for order confirmation and delivery details.
                          </p>
                        </div>

                        {/* Information Box */}
                        <motion.div
                          className="bg-[#252525] p-6 rounded-xl border border-gray-800/50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h3 className="text-sm font-medium text-gray-300 mb-4 flex items-center gap-2">
                            <HelpCircle size={16} className="text-blue-400" />
                            Why we need this information
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-1" />
                              <span className="text-sm text-gray-400">
                                <span className="text-gray-300 font-medium">Name:</span> To personalize your experience and prepare your digital products
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-1" />
                              <span className="text-sm text-gray-400">
                                <span className="text-gray-300 font-medium">Email:</span> For order confirmation, delivery, and staying in touch about your purchase
                              </span>
                            </li>
                          </ul>
                        </motion.div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h2 className="text-lg font-medium flex items-center gap-2">
                          <Mail size={20} className="text-green-400" />
                          Delivery Preferences
                        </h2>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Preferred Platform for Digital Delivery
                          </label>
                          <select
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800/50 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                          >
                            <option value="email">Email</option>
                            <option value="drive">Google Drive</option>
                            <option value="dropbox">Dropbox</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Delivery Email (if different from contact email)
                          </label>
                          <input
                            type="email"
                            name="deliveryEmail"
                            value={formData.deliveryEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800/50 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                            placeholder="Optional"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h2 className="text-lg font-medium flex items-center gap-2">
                          <MessageSquare size={20} className="text-purple-400" />
                          Contact Preferences
                        </h2>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Preferred Contact Method
                          </label>
                          <select
                            name="preferredContact"
                            value={formData.preferredContact}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800/50 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                          >
                            <option value="email">Email</option>
                            <option value="whatsapp">WhatsApp</option>
                          </select>
                        </div>

                        {formData.preferredContact === 'whatsapp' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                          >
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              WhatsApp Number
                            </label>
                            <input
                              type="tel"
                              name="phoneNumber"
                              required
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              placeholder="+1 (234) 567-8900"
                              className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800/50 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            />
                          </motion.div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Additional Notes
                          </label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800/50 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                            placeholder="Any special requirements or preferred contact times..."
                          />
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-lg">
                          <p className="text-blue-400 text-sm">
                            After submitting, I will contact you shortly to discuss
                            payment options and complete your purchase.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between pt-6 border-t border-gray-800/50">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="mb-4 sm:mb-0 px-6 py-2.5 text-sm font-medium bg-[#2A2A2A] rounded-lg hover:bg-[#333] transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-sm font-medium bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors sm:ml-auto"
                    >
                      {step === 3 ? 'Complete Order' : 'Continue'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Order Completion Modal */}
          <AnimatePresence>
            {showCompletionModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="bg-[#1E1E1E] border border-gray-800/50 rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-8 h-8 text-green-500" />
                  </motion.div>

                  <h2 className="text-2xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Order Completed!
                  </h2>

                  <p className="text-gray-400 text-center mb-6">
                    Thank you for your order. I will contact you shortly at {formData.email} to discuss payment options and complete your purchase.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-[#252525] p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-300 mb-2">Next Steps:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-1.5" />
                          <span>You will receive a confirmation email shortly</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-1.5" />
                          <span>I will reach out to discuss payment details</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-1.5" />
                          <span>Products will be delivered within 24 hours after payment</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCompletionModal(false);
                        router.push('/store');
                      }}
                      className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Return to Store
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-50 pointer-events-none" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty Cart Modal */}
          <AnimatePresence>
            {showEmptyCartModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="bg-[#1E1E1E] border border-gray-800/50 rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <X className="w-8 h-8 text-red-500" />
                  </motion.div>

                  <h2 className="text-2xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Empty Cart
                  </h2>

                  <p className="text-gray-400 text-center mb-6">
                    Your cart is currently empty. Please add items to your cart before proceeding to checkout.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setShowEmptyCartModal(false);
                      router.push('/store');
                    }}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    Return to Store
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-purple-500/10 opacity-50 pointer-events-none" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </PortfolioLayout>
  );
}
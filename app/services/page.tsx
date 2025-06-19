'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Globe, Send, CheckCircle, Check, ChevronDown } from 'lucide-react';
import PortfolioLayout from '@/components/PortfolioLayout';
import { Service } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const services: Service[] = [
  {
    title: "Full-Stack Web Development",
    icon: Globe,
    description: "Enterprise-grade web applications built with modern technologies, optimized for performance, scalability, and exceptional user experience. From concept to deployment with ongoing support.",
    features: ["Responsive Design", "Performance Optimization", "SEO Implementation", "Security Best Practices", "API Integration", "Database Design"],
    price: "Starting at $2,500"
  },
  {
    title: "iOS Mobile Applications",
    icon: Smartphone,
    description: "Native iOS applications developed with Swift, featuring intuitive design, seamless functionality, and App Store optimization. Complete development cycle from wireframes to store submission.",
    features: ["Native iOS Development", "UI/UX Design", "App Store Optimization", "Push Notifications", "Core Data Integration", "Ongoing Maintenance"],
    price: "Starting at $3,500"
  },
  {
    title: "Enterprise Solutions",
    icon: Code,
    description: "Comprehensive full-stack solutions including custom APIs, database architecture, authentication systems, and cloud deployment. Designed for scalability and long-term growth.",
    features: ["Custom API Development", "Database Architecture", "Cloud Infrastructure", "Authentication & Security", "Performance Monitoring", "24/7 Support"],
    price: "Starting at $5,000"
  }
];

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export default function ServicesPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          formType: 'contact'
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setShowSuccessModal(true);
        setFormData({ name: '', email: '', service: '', message: '' }); // Reset form
        setIsSubmitting(false);
      } else {
        const errorData = await response.json();
        alert(`Error sending email: ${errorData.error || 'Unknown error'}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Error sending email. Please try again.');
      setIsSubmitting(false);
      console.error('Submit error:', error);
    }
  };

  // Generate particles once and store them in state
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    const generatedParticles = [...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          y: [0, -50, 0],
          x: [0, 50, 0]
        }}
        transition={{
          duration: Math.random() * 5 + 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
      />
    ));
    setParticles(generatedParticles);
  }, []);

  return (
    <PortfolioLayout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative min-h-screen bg-[#121212] text-white p-4 sm:p-8 max-w-6xl mx-auto"
      >
        {/* Background Particles */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {particles}
        </div>

        {/* Hero Section */}
        <div className="mb-16 relative">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Services
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-6"
          >
            Transform your business vision into reality with custom software solutions designed for scalability, performance, and exceptional user experience. From concept to deployment and beyond.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-gray-500 text-sm"
          >
            <span className="inline-block w-12 h-[1px] bg-gray-700"/>
            <span>Enterprise-Grade Development Services</span>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="rounded-xl border border-gray-800 bg-[#1E1E1E] p-6 hover:border-gray-700 transition-all duration-300"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="size-12 rounded-xl bg-[#2A2A2A] border border-gray-700 flex items-center justify-center mb-4"
              >
                <service.icon size={24} className="text-gray-400" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{service.description}</p>
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle size={14} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-gray-300">{service.price}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form Section */}
        <motion.div variants={itemVariants} className="bg-[#1E1E1E] p-8 rounded-xl border border-gray-800 max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="group">
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors duration-300"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors duration-300"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <label className="block text-sm font-medium text-gray-400 mb-2">Service</label>
              <div className="relative">
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-gray-500">
                    
                  </option>
                  {services.map((service, index) => (
                    <option 
                      key={index} 
                      value={service.title}
                      className="py-2 px-4 hover:bg-[#333] cursor-pointer flex items-center gap-2"
                    >
                      {service.title}
                    </option>
                  ))}
                </select>
                
                {/* Custom Select UI */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown 
                    size={20} 
                    className="text-gray-400 transition-transform duration-200 transform"
                  />
                </div>
                
                {/* Selected Service Preview */}
                {formData.service && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    {(() => {
                      const selectedService = services.find(s => s.title === formData.service);
                      return selectedService?.icon && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-gray-400"
                        >
                          {React.createElement(selectedService.icon, { size: 18 })}
                        </motion.div>
                      );
                    })()}
                  </div>
                )}
              </div>
              
              {/* Service Description */}
              {formData.service && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-gray-400"
                >
                  {services.find(s => s.title === formData.service)?.description}
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors duration-300 resize-none"
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 ${
                isSuccess 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              } transition-all duration-300`}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Send size={18} />
                </motion.div>
              ) : isSuccess ? (
                <>
                  <CheckCircle size={18} />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
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
                  Message Sent Successfully!
                </h2>

                <p className="text-gray-400 text-center mb-6">
                  Thank you for reaching out. I will get back to you shortly at {formData.email}.
                </p>

                <div className="space-y-4">
                  <div className="bg-[#252525] p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">What&apos;s Next:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-1.5" />
                        <span>You will receive a confirmation email shortly</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-1.5" />
                        <span>I will review your message and requirements</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-1.5" />
                        <span>Expected response time: within 24 hours</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-blue-500/10 opacity-50 pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PortfolioLayout>
  );
}

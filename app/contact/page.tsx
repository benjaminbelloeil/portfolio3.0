'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Code, Calendar, MapPin, ChevronDown, MessageSquare, Linkedin, Instagram, Check } from 'lucide-react';
import PortfolioLayout from '@/components/PortfolioLayout';

interface ContactFormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface ContactService {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  features: string[];
  type: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

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

const contactServices: ContactService[] = [
  {
    title: "General Inquiry",
    icon: MessageSquare,
    description: "General questions about services, availability, or collaboration opportunities.",
    features: ["24h Response Time", "Detailed Information", "Free Consultation", "No Commitment"],
    type: "Free"
  },
  {
    title: "Project Discussion",
    icon: Calendar,
    description: "Discuss specific project requirements, timeline, and budget considerations.",
    features: ["30min Call", "Project Scoping", "Cost Estimation", "Technical Planning"],
    type: "Free Consultation"
  },
  {
    title: "Platform Issues",
    icon: Code,
    description: "Technical issues, bug fixes, or platform-specific problems that need immediate attention.",
    features: ["Priority Response", "Expert Support", "Solution Design", "Documentation"],
    type: "Premium Support"
  }
];

const ShootingStarsBackground = () => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100]
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </motion.div>
  );
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="border-b border-gray-800 last:border-0">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ContactPage() {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
          name: formState.name,
          email: formState.email,
          service: formState.service,
          message: formState.message,
          formType: 'contact'
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setShowSuccessModal(true);
        setFormState({ name: '', email: '', service: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        setIsSubmitting(false);
        alert(`Error sending email: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      setIsSubmitting(false);
      alert('Error sending email. Please try again.');
      console.error('Submit error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const faqItems = [
    {
      question: "What services do you offer?",
      answer: "I specialize in full-stack development, mobile app development, and UI/UX design. Each project is tailored to meet specific client needs and objectives."
    },
    {
      question: "How can we start working together?",
      answer: "We can begin with a consultation call to discuss your project requirements. From there, I'll provide a detailed proposal outlining the scope, timeline, and costs."
    },
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary depending on complexity and scope. Most projects take 4-12 weeks from start to finish, with regular updates and milestones throughout."
    }
  ];

  return (
    <PortfolioLayout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="min-h-screen bg-[#121212] text-white p-8 max-w-6xl mx-auto relative"
      >
        <ShootingStarsBackground />
        
        <motion.div variants={itemVariants} className="mb-12 relative z-10">
          <h1 className="text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Let&apos;s Get in Touch
          </h1>
          <p className="text-xl text-gray-400">
            Let&apos;s connect and explore opportunities to create something amazing together.
          </p>
        </motion.div>

        <div className="space-y-12 relative z-10">
          {/* Contact Info Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Schedule Meeting */}
            <motion.div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold">Schedule a Meeting</h3>
              </div>
              <p className="text-gray-400 mb-4">Book a 30-minute consultation to discuss your project idea.</p>
              <a href="https://calendly.com/benjaminbelloeil" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#2A2A2A] px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#333] transition-colors duration-300"
                >
                  <Calendar size={18} />
                  Schedule Call
                </motion.button>
              </a>
            </motion.div>

            {/* Location & Hours */}
            <motion.div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-green-400" size={24} />
                <h3 className="text-xl font-semibold">Location & Hours</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Monterrey, MX</p>
                  <p className="text-gray-400">GMT-6 (CST)</p>
                </div>
                <div>
                  <p className="text-gray-400">Monday - Friday</p>
                  <p className="text-gray-400">9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Methods */}
            <motion.div className="bg-[#1E1E1E] p-6 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-purple-400" size={24} />
                <h3 className="text-xl font-semibold">Other Contact Methods</h3>
              </div>
              <div className="space-y-4">
                <a 
                  href="https://www.instagram.com/benjaminbelloeil_/?next=%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#2A2A2A] hover:bg-[#333] transition-all duration-300"
                >
                  <Instagram size={20} className="text-red-400" />
                  <span>Benjaminbelloeil_</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/benjamin-belloeil-15396b254/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#2A2A2A] hover:bg-[#333] transition-all duration-300"
                >
                  <Linkedin size={20} className="text-blue-400" />
                  <span>Benjaminbelloeil</span>
                </a>
              </div>
            </motion.div>
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
                  value={formState.name}
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
                  value={formState.email}
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
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-[#2A2A2A] border border-gray-800 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" disabled></option>
                    {contactServices.map((service, index) => (
                      <option 
                        key={index} 
                        value={service.title}
                        className="py-2 px-4 hover:bg-[#333] cursor-pointer"
                      >
                        {service.title}
                      </option>
                    ))}
                  </select>
                  
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={20} className="text-gray-400" />
                  </div>
                  
                  {formState.service && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                      {contactServices.find(s => s.title === formState.service)?.icon && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-gray-400"
                        >
                          {React.createElement(
                            contactServices.find(s => s.title === formState.service)?.icon as React.ComponentType<{ size: number }>,
                            { size: 18 }
                          )}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  value={formState.message}
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
                type="submit"
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
                    Thank you for reaching out. I will get back to you shortly at {formState.email}.
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

          {/* FAQ Section - Full Width */}
          <motion.div variants={itemVariants} className="bg-[#1E1E1E] p-8 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <FAQItem key={index} {...item} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PortfolioLayout>
  );
}

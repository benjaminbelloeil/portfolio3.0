'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, X, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'websites', label: 'Websites' },
  { id: 'templates', label: 'Templates' },
  { id: 'mobile', label: 'Mobiles' },
];

const products = [
  {
    id: 1,
    title: 'HTML Starter Website',
    description: 'A basic yet professional HTML website template.',
    price: '$50',
    image: '/assets/projects/ComingSoon.png',
    category: 'websites',
    rating: 4.5,
    reviews: 34,
    features: ['Responsive Layout', 'Basic Navigation', 'Static Pages'],
  },
  {
    id: 2,
    title: 'CSS Enhanced Website',
    description: 'A visually appealing website styled with CSS.',
    price: '$75',
    image: '/assets/projects/ComingSoon.png',
    category: 'templates',
    rating: 4.7,
    reviews: 45,
    features: ['Stylish Layouts', 'Mobile-Friendly', 'Easy Customization'],
  },
  {
    id: 3,
    title: 'JavaScript Dynamic Website',
    description: 'An interactive website template powered by JavaScript.',
    price: '$100',
    image: '/assets/projects/ComingSoon.png',
    category: 'websites',
    rating: 4.8,
    reviews: 56,
    features: ['Interactive Elements', 'Form Validation', 'Dynamic Updates'],
  },
  {
    id: 4,
    title: 'Swift iOS App Template',
    description: 'A user-friendly iOS app template built with Swift.',
    price: '$150',
    image: '/assets/projects/ComingSoon.png',
    category: 'mobile',
    rating: 4.9,
    reviews: 78,
    features: ['Clean Interface', 'Smooth Animations', 'Easy Deployment'],
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Michael Carter',
    role: 'Freelance Web Designer',
    comment:
      'These templates are a lifesaver! The design quality is top-notch, and they&apos;re incredibly easy to customize for my clients&apos; needs.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophia Hernandez',
    role: 'Front-End Developer at TechWave',
    comment:
      'The attention to detail in these products is outstanding. They&apos;ve streamlined my workflow and allowed me to deliver projects faster.',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Daniel Kim',
    role: 'Startup Founder',
    comment:
      'As a non-technical person, I appreciated how intuitive and user-friendly these solutions were. My website looks amazing, and I didn&apos;t need to hire a developer.',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Emily Johnson',
    role: 'Software Engineer at Innovatech',
    comment:
      'Excellent quality and performance. The components are modern, responsive, and just what I needed for my latest project.',
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Rajesh Patel',
    role: 'Full-Stack Developer',
    comment:
      'These products are an absolute game-changer. They&apos;ve not only saved me time but also impressed my clients with their sleek designs.',
    rating: 5,
  },
];

export default function StorePage() {
  const router = useRouter();
  const { state: cartState, addToCart, removeFromCart, updateQuantity, calculateTotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleQuantityChange = (e: React.MouseEvent, productId: number, newQuantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(productId);
  };

  const CartIcon = () => (
    <motion.div
      className="fixed right-6 top-6 z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={() => setIsCartOpen(true)}
        className="bg-[#1E1E1E] p-3 rounded-full shadow-lg hover:bg-[#252525] transition-colors relative"
      >
        <ShoppingCart size={24} />
        {cartState.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartState.items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>
    </motion.div>
  );

  const CartModal = () => (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6"
          >
            <div className="relative w-full max-w-lg bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Cart ({cartState.items.length})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[60vh] p-6 space-y-4">
                {cartState.items.length > 0 ? (
                  cartState.items.map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#252525] p-4 rounded-lg flex items-center gap-4"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-gray-400 text-sm">{product.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={(e) =>
                              handleQuantityChange(
                                e,
                                product.id,
                                product.quantity - 1
                              )
                            }
                            className="px-2 py-1 bg-gray-700 rounded-lg"
                          >
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            onClick={(e) =>
                              handleQuantityChange(
                                e,
                                product.id,
                                product.quantity + 1
                              )
                            }
                            className="px-2 py-1 bg-gray-700 rounded-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleRemoveItem(e, product.id)}
                        className="p-2 hover:bg-red-600/20 text-red-500 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    Your cart is empty
                  </p>
                )}
              </div>

              {cartState.items.length > 0 && (
                <div className="p-6 border-t border-gray-800 bg-[#1A1A1A]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Total</span>
                    <span className="text-xl font-bold">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/store/checkout');
                    }}
                    className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="rounded-xl border border-gray-800 bg-[#1E1E1E] p-6 hover:border-gray-700 transition-all duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={192}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="flex items-center gap-1 mb-2">
        {[...Array(Math.floor(product.rating))].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="text-yellow-400"
            fill="currentColor"
          />
        ))}
        {product.rating % 1 !== 0 && (
          <Star
            size={16}
            className="text-yellow-400"
            fill="currentColor"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        )}
        <span className="text-sm text-gray-400 ml-2">
          ({product.reviews} reviews)
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{product.description}</p>
      <ul className="space-y-2 mb-4">
        {product.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <CheckCircle size={14} className="text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold text-gray-300 mb-4">
        {product.price}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        <ShoppingCart size={16} />
        Add to Cart
      </motion.button>
    </motion.div>
  );

  return (
    <PortfolioLayout>
      <div className="min-h-screen bg-[#121212] text-white">
        <CartIcon />

        <div className="relative overflow-hidden py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="relative z-10">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-4 text-white">
                Store Development
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8">
                Discover our comprehensive collection of professionally designed
                templates and versatile components, meticulously crafted to
                accelerate and enhance your web development process. Whether
                you&apos;re building responsive websites or complex applications, our
                resources provide the perfect foundation to streamline your
                workflow and elevate your project&apos;s quality.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                  Browse Templates
                </p>
                <Link
                  href="/contact"
                  className="bg-[#252525] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#333] transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
          <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-[#252525] text-gray-400 hover:bg-[#333]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  className="bg-[#1E1E1E] p-6 rounded-xl"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <Star
                        size={16}
                        className="text-yellow-400"
                        fill="currentColor"
                        style={{ clipPath: 'inset(0 50% 0 0)' }}
                      />
                    )}
                    <span className="text-sm text-gray-400 ml-2">
                      ({testimonial.rating} stars)
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{testimonial.comment}</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <CartModal />
      </div>
    </PortfolioLayout>
  );
}

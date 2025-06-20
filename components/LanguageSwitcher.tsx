'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { languages } from '@/lib/translations';

interface LanguageSwitcherProps {
  isCollapsed?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isCollapsed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const currentLanguage = languages[language];

  if (isCollapsed) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-gray-600 rounded-md p-2 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 w-full"
          title="Language"
        >
          <Globe className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 left-14 top-0 bg-[#1E1E1E] border border-gray-800 rounded-lg shadow-xl overflow-hidden w-32"
            >
              <div className="py-1">
                {Object.entries(languages).map(([code, lang]) => (
                  <motion.button
                    key={code}
                    whileHover={{ backgroundColor: '#2A2A2A' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageChange(code as Language)}
                    className={`w-full flex items-center justify-center px-3 py-2 text-sm transition-colors duration-150 ${
                      language === code
                        ? 'bg-[#2A2A2A] text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-gray-600 rounded-md p-2 flex items-center justify-between text-gray-400 hover:text-white group transition-all duration-300 w-full"
      >
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5" />
          <span className="text-sm font-medium">
            {currentLanguage.name}
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-2 left-0 right-0 bg-[#1E1E1E] border border-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="py-1">
              {Object.entries(languages).map(([code, lang]) => (
                <motion.button
                  key={code}
                  whileHover={{ backgroundColor: '#2A2A2A' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLanguageChange(code as Language)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors duration-150 ${
                    language === code
                      ? 'bg-[#2A2A2A] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-medium">{lang.name}</span>
                  {language === code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;

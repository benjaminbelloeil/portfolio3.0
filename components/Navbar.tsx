'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Briefcase, 
  PenTool, 
  Settings, 
  User, 
  MessageSquare, 
  Layers, 
  PhoneCall, 
  Github, 
  Linkedin, 
  Instagram, 
  ChevronLeft, 
  Menu, 
  X, 
  ShoppingCart, 
  Twitter,
  LucideIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface MenuItem {
  id: number | string;
  label: string;
  icon: LucideIcon;
  path: string;
}

interface NavbarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const menuItems: MenuItem[] = useMemo(() => [
    { id: 1, label: t.explore, icon: Compass, path: '/' },
    { id: 2, label: t.about, icon: User, path: '/about' },
    { id: 3, label: t.experience, icon: Briefcase, path: '/experience' },
    { id: 4, label: t.projects, icon: PenTool, path: '/projects' },
    { id: 5, label: t.stack, icon: Layers, path: '/stack' },
  ], [t]);

  const resourceItems: MenuItem[] = useMemo(() => [
    { id: 6, label: t.services, icon: Settings, path: '/services' },
    { id: 7, label: t.store, icon: ShoppingCart, path: '/store' },
    { id: 8, label: t.thoughts, icon: MessageSquare, path: '/thoughts' },
  ], [t]);

  const connectItems: MenuItem[] = useMemo(() => [
    { id: 'c', label: t.contact, icon: PhoneCall, path: '/contact' },
    { id: 'l', label: 'LinkedIn', icon: Linkedin, path: 'https://www.linkedin.com/in/benjamin-belloeil-15396b254/' },
    { id: 'g', label: 'Github', icon: Github, path: 'https://github.com/benjaminbelloeil' },
    { id: 't', label: 'Twitter', icon: Twitter, path: 'https://twitter.com/BenBelloeil' },
    { id: 'i', label: 'Instagram', icon: Instagram, path: 'https://www.instagram.com/benjaminbelloeil_/?next=%2F' },
  ], [t]);

  const shortcutMap = useMemo(() => {
    return new Map<string, string>([
      ...menuItems.map(item => [item.id.toString(), item.path] as [string, string]),
      ...resourceItems.map(item => [item.id.toString(), item.path] as [string, string]),
      ...connectItems.map(item => [item.id.toString(), item.path] as [string, string])
    ]);
  }, [menuItems, resourceItems, connectItems]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Notify parent of initial collapse state to prevent flash
  useEffect(() => {
    onCollapse?.(isCollapsed);
  }, [onCollapse, isCollapsed]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).tagName === 'INPUT' || (event.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      const key = event.key.toLowerCase();
      const path = shortcutMap.get(key);

      if (path) {
        if (path.startsWith('http')) {
          window.open(path, '_blank');
        } else {
          router.push(path);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router, shortcutMap]);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse?.(!isCollapsed);
  };

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const renderNavItem = (item: MenuItem) => (
    <li key={item.id}>
      <Link href={item.path} className="flex items-center justify-between p-2 rounded-md hover:bg-[#1E1E1E] text-gray-400 hover:text-white group transition-colors">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-5 h-5">
            <item.icon className="w-5 h-5" />
          </div>
          <span className={`text-sm transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
            {item.label}
          </span>
        </div>
        <span className={`bg-[#1E1E1E] text-xs px-2 py-1 rounded-md group-hover:bg-[#2E2E2E] transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
          {item.id}
        </span>
      </Link>
    </li>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 h-screen bg-[#1b1b1b] flex flex-col ${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 ease-in-out z-50 ${isMobile ? 'hidden' : 'block'}`}>
        <div className="p-4 flex items-center space-x-4">
          <Image 
            src="/assets/Profile.jpg" 
            alt="Profile" 
            width={40}
            height={40}
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover" 
          />
          <div className={`transition-all duration-300 min-w-0 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
            <h2 className="font-semibold text-white text-lg truncate">Benjamin Belloeil</h2>
            <p className="text-gray-400 text-sm truncate">{t.role}</p>
          </div>
        </div>

        {/* Language Switcher - Minimalistic */}
        <div className={`px-4 pb-4 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <LanguageSwitcher isCollapsed={isCollapsed} />
        </div>

        {/* Collapse Button */}
        <button 
          onClick={handleCollapse} 
          className={`absolute -right-3 top-[1.625rem] text-gray-400 hover:text-white p-1 rounded-full bg-[#1b1b1b] hover:bg-[#1E1E1E] transition-all flex-shrink-0 border border-gray-800`}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex-grow overflow-y-auto px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map(item => renderNavItem(item))}
          </ul>

          <div className="mt-8">
            <h3 className={`text-sm font-semibold text-gray-400 mb-2 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100'}`}>{t.resources}</h3>
            <ul className="space-y-2">
              {resourceItems.map(item => renderNavItem(item))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className={`text-sm font-semibold text-gray-400 mb-2 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100'}`}>{t.connect}</h3>
            <ul className="space-y-2">
              {connectItems.map(item => (
                <li key={item.id}>
                  {item.path.startsWith('http') ? (
                    <a 
                      href={item.path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-2 rounded-md hover:bg-[#1E1E1E] text-gray-400 hover:text-white group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-5 h-5">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-sm transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                          {item.label}
                        </span>
                      </div>
                      <span className={`bg-[#1E1E1E] text-xs px-2 py-1 rounded-md group-hover:bg-[#2E2E2E] transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                        {item.id === 'c' ? 'C' : '↗'}
                      </span>
                    </a>
                  ) : (
                    <Link 
                      href={item.path} 
                      className="flex items-center justify-between p-2 rounded-md hover:bg-[#1E1E1E] text-gray-400 hover:text-white group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-5 h-5">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-sm transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                          {item.label}
                        </span>
                      </div>
                      <span className={`bg-[#1E1E1E] text-xs px-2 py-1 rounded-md group-hover:bg-[#2E2E2E] transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                        {item.id === 'c' ? 'C' : '↗'}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {isMobile && (
        <>
          <button 
            onClick={toggleMobileNav} 
            className="fixed bottom-4 right-4 bg-[#1b1b1b] text-white p-3 rounded-full shadow-lg z-50"
          >
            <Menu size={24} />
          </button>
          <AnimatePresence>
            {isMobileNavVisible && (
              <motion.nav 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-0 left-0 right-0 bg-[#1b1b1b] px-4 pt-2 pb-6 rounded-t-3xl shadow-lg z-50"
              >
                <div className="flex justify-end">
                  <button 
                    onClick={toggleMobileNav} 
                    className="text-white p-2 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <div className="flex space-x-8 px-4 min-w-max">
                    {/* Main Menu Items */}
                    <div className="flex items-center space-x-6">
                      {menuItems.map(item => (
                        <Link
                          key={item.id}
                          href={item.path}
                          className="group flex flex-col items-center min-w-[4rem]"
                          onClick={toggleMobileNav}
                        >
                          <motion.div 
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl bg-[#2A2A2A] group-hover:bg-[#333] transition-all duration-300"
                          >
                            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                          </motion.div>
                          <span className="mt-2 text-xs text-gray-400 group-hover:text-white transition-colors">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Separator */}
                    <div className="w-px h-12 bg-gray-800/50 self-center" />

                    {/* Resource Items */}
                    <div className="flex items-center space-x-6">
                      {resourceItems.map(item => (
                        <Link
                          key={item.id}
                          href={item.path}
                          className="group flex flex-col items-center min-w-[4rem]"
                          onClick={toggleMobileNav}
                        >
                          <motion.div 
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl bg-[#2A2A2A] group-hover:bg-[#333] transition-all duration-300"
                          >
                            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                          </motion.div>
                          <span className="mt-2 text-xs text-gray-400 group-hover:text-white transition-colors">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Separator */}
                    <div className="w-px h-12 bg-gray-800/50 self-center" />

                    {/* Connect Items */}
                    <div className="flex items-center space-x-6">
                      {connectItems.map(item => (
                        <a
                          key={item.id}
                          href={item.path}
                          target={item.path.startsWith('http') ? '_blank' : undefined}
                          rel={item.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="group flex flex-col items-center min-w-[4rem]"
                          onClick={toggleMobileNav}
                        >
                          <motion.div 
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl bg-[#2A2A2A] group-hover:bg-[#333] transition-all duration-300"
                          >
                            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                          </motion.div>
                          <span className="mt-2 text-xs text-gray-400 group-hover:text-white transition-colors">
                            {item.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Navbar;

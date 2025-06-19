'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div className="h-screen bg-[#121212] overflow-hidden">
      <Navbar onCollapse={setIsNavCollapsed} />
      <main className={`h-full overflow-y-auto transition-all duration-300 ${
        isNavCollapsed ? 'ml-20' : 'ml-72'
      }`}>
        {children}
      </main>
    </div>
  );
}

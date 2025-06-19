'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PortfolioLayout from '@/components/PortfolioLayout';
import { Copy, Pen, ChartBar, LayoutDashboard } from 'lucide-react';

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

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: { scale: 0.95 }
};

const ParticleBackground = () => {
  const [particles, setParticles] = React.useState<React.ReactElement[]>([]);

  React.useEffect(() => {
    const generatedParticles = [...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          y: [0, 100],
          x: Math.random() * 20 - 10
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
    ));
    setParticles(generatedParticles);
  }, []);

  return (
    <motion.div className="absolute inset-0 overflow-hidden">
      {particles}
    </motion.div>
  );
};

const thoughts = [
  {
    id: 1,
    title: "Summer Internship Goals",
    description: "Targeting software engineering internships at tech companies focusing on full-stack development.",
    category: "career",
    date: "2024-06",
    status: "Planning",
    tags: ["Internship", "Full-Stack", "Career"],
    details: "My goal for the summer is to secure an internship at a leading tech company. I am focusing on roles that involve full-stack development to gain comprehensive experience in both frontend and backend technologies.",
  },
  {
    id: 2,
    title: "Applying to Developer Academy in Italy",
    description: "Planning to apply to the Developer Academy in Italy as part of an exchange program.",
    category: "career",
    date: "2025-02",
    status: "Planning",
    tags: ["Developer Academy", "Italy", "Exchange Program"],
    details: "In February 2025, I will be applying to the Developer Academy in Italy. This will also serve as my exchange program, providing me with an opportunity to enhance my skills and gain international experience.",
  },
  {
    id: 3,
    title: "Preparing for Startup Job",
    description: "Studying Angular, C#, and other technologies to prepare for a job at a startup company.",
    category: "career",
    date: "2025-02",
    status: "Planning",
    tags: ["Angular", "C#", "Startup"],
    details: "In February 2025, I will be working with a startup company. To prepare for this role, I am studying various courses including Angular, C#, and other relevant technologies to ensure I am well-equipped for the job.",
  },
  {
    id: 4,
    title: "Developing Meetly App",
    description: "Collaborating with a friend to develop an app called Meetly, expected to be completed by summer.",
    category: "projects",
    date: "2024-06",
    status: "In Progress",
    tags: ["Meetly", "App Development", "Collaboration"],
    details: "I am currently working with a friend on an app called Meetly. We aim to complete it by this summer and continue improving it if we get the chance to attend the Apple Developer Academy in Italy.",
  }
];

const Explore = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('benjaminbelloeil@outlook.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleThoughtsClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <PortfolioLayout>
      <motion.div 
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="min-h-screen bg-[#121212] text-white py-4 sm:py-8 max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <motion.section 
          variants={itemVariants}
          className="space-y-4 sm:space-y-5 mb-8 sm:mb-16 px-4 sm:px-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight"
          >
            Hey, I&apos;m Benjamin,<br /> 
            I&apos;m A Software <span className="text-gray-400">Engineer.</span>
          </motion.h1>
          <motion.h3 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-400"
          >
            Full-stack developer and Computer Science student at ITESM with expertise in building scalable web applications.<br className="hidden lg:block" />
            Passionate about creating innovative solutions, exploring cutting-edge technologies, and delivering<br className="hidden lg:block" />
            high-quality software that drives business value and user satisfaction.
          </motion.h3>
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 mt-4 sm:mt-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/about">
                <button className="bg-[#1E1E1E] text-white px-6 py-2 rounded-md hover:bg-[#2A2A2A] transition-colors duration-300">
                  About
                </button>
              </Link>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1E1E1E] text-white px-6 py-2 rounded-md hover:bg-[#2A2A2A] transition-colors duration-300 flex items-center gap-2"
              onClick={handleCopyEmail}
            >
              <Copy size={16} />
              Email
            </motion.button>
            {copied && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500"
              >
                Email was copied!
              </motion.div>
            )}
          </motion.div>
        </motion.section>
        
        {/* New Projects Section */}
        <motion.section 
          variants={itemVariants}
          className="space-y-4 sm:space-y-5 mb-8 sm:mb-16 px-4 sm:px-8"
        >
          <motion.h3 
            variants={itemVariants}
            className="font-bold text-xl sm:text-2xl md:text-3xl text-white mb-4"
          >
            New Projects
          </motion.h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <Link href="/projects">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-gray-800 bg-[#1E1E1E] shadow w-full overflow-hidden relative cursor-pointer"
              >
                <div className="w-full aspect-[16/9] relative group overflow-hidden">
                  <Image
                    src="/assets/projects/Bufetec.png"
                    alt="bufetec"
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <motion.div 
                  className="px-6 py-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-[80%]">
                      <h3 className="font-medium truncate w-[90%]" title="Bufetec">Bufetec</h3>
                      <p className="text-xs text-gray-400 font-medium line-clamp-2">
                        BufeTec is an iOS app that provides access to legal and notarial services...
                      </p>
                    </div>
                    <motion.div 
                      className="inline-flex items-center rounded-md border border-gray-700 px-2.5 py-0.5 font-semibold text-gray-200 w-fit text-xs min-w-fit"
                    >
                      Swift
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
            <Link href="/projects">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-gray-800 bg-[#1E1E1E] shadow w-full overflow-hidden relative cursor-pointer"
              >
                <div className="w-full aspect-[16/9] relative group overflow-hidden">
                  <Image
                    src="/assets/projects/CalendarApp.png"
                    alt="calendar-app"
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <motion.div 
                  className="px-6 py-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-[80%]">
                      <h3 className="font-medium truncate w-[90%]" title="Student Calendar App">Student Calendar App</h3>
                      <p className="text-xs text-gray-400 font-medium line-clamp-2">
                        StudentCalendar is a Swift-based iOS app that helps students efficiently manage their class schedules. Users can add, edit, and delete classes while viewing their schedules in a simple, intuitive interface. It also includes a profile management feature for updating personal information.
                      </p>
                    </div>
                    <motion.div 
                      className="inline-flex items-center rounded-md border border-gray-700 px-2.5 py-0.5 font-semibold text-gray-200 w-fit text-xs min-w-fit"
                    >
                      Swift
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          </div>
        </motion.section>

        {/* Thoughts Section */}
        <motion.section 
          variants={itemVariants}
          className="mb-8 sm:mb-16 px-4 sm:px-8"
        >
          <motion.div 
            variants={itemVariants}
            className="rounded-xl border border-gray-800 bg-[#1E1E1E] shadow overflow-hidden"
          >
            <div className="h-full bg-[#1E1E1E]">
              <div className="p-4 sm:p-6">
                <h3 className="font-medium text-base sm:text-lg">Thoughts</h3>
                <p className="text-gray-400 font-medium text-xs sm:text-sm">Sharing experiences, knowledge and videos on system design &amp; tech.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 px-4 pb-4">
                {thoughts.map(thought => (
                  <Link 
                    key={thought.id}
                    href="/thoughts"
                    onClick={handleThoughtsClick}
                    className="flex items-center gap-3 group z-20 w-full cursor-pointer relative px-2 py-2"
                  >
                    <div className="w-full h-full z-10 bg-[#2A2A2A] absolute top-0 left-0 rounded-md opacity-0 border border-gray-700 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-500"></div>
                    <div className="bg-[#333] flex items-center justify-center size-10 rounded-md z-20 aspect-square">
                      <ChartBar size={16} />
                    </div>
                    <div className="z-20 w-[80%]">
                      <h3 className="font-medium text-sm w-full truncate">{thought.title}</h3>
                      <p className="text-gray-400 truncate w-full font-medium text-xs">{thought.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Store and Projects Section */}
        <motion.section 
          variants={itemVariants}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-16 px-4 sm:px-8"
        >
          <motion.div 
            variants={itemVariants}
            className="rounded-xl border border-gray-800 bg-[#1E1E1E] shadow w-full relative z-20 overflow-hidden"
          >
            <ParticleBackground />
            <div className="p-6 space-y-6 z-20 relative">
              <div className="size-10 rounded-full bg-[#333] border border-gray-700 flex items-center justify-center">
                <LayoutDashboard size={16} />
              </div>
              <div>
                <h3 className="font-medium text-lg">Store</h3>
                <p className="text-gray-400 font-medium text-xs">Explore and purchase my web development projects.</p>
              </div>
              <Link href="/store" className="block">
                <motion.button 
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 bg-[#333] border-gray-700 border text-white shadow hover:opacity-[0.64] transition-all duration-300 h-8 rounded-md px-3 text-xs"
                >
                  View Store
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="rounded-xl border border-gray-800 bg-[#1E1E1E] shadow w-full relative overflow-hidden"
          >
            <ParticleBackground />
            <div className="p-6 space-y-6 relative z-20">
              <div className="size-10 rounded-full bg-[#333] border border-gray-700 flex items-center justify-center">
                <Pen size={16} />
              </div>
              <div>
                <h3 className="font-medium text-lg">Projects</h3>
                <p className="text-gray-400 font-medium text-xs">Explore my diverse projects in web development and beyond.</p>
              </div>
              <Link href="/projects" className="block">
                <motion.button 
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 bg-[#333] border-gray-700 border text-white shadow hover:opacity-[0.64] transition-all duration-300 h-8 rounded-md px-3 text-xs"
                >
                  View Projects
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          variants={itemVariants}
          className="text-center text-gray-500 text-sm"
        >
          <p>© 2024 Portfolio. All rights reserved.</p>
          <p>Made by Benjamin Belloeil</p>
        </motion.footer>
      </motion.div>
    </PortfolioLayout>
  );
};

export default Explore;

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Code, Briefcase, Brain } from 'lucide-react';
import Image from 'next/image';
import PortfolioLayout from '@/components/PortfolioLayout';
import { Thought } from '@/types';

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

const thoughts: Thought[] = [
  {
    id: 1,
    title: "Securing Summer Tech Internships",
    description: "Strategic approach to landing software engineering internships at leading technology companies, focusing on full-stack development opportunities.",
    category: "career",
    date: "2024-06",
    status: "In Progress",
    tags: ["Internship", "Full-Stack", "Career Growth"],
    details: "My targeted approach involves building a strong portfolio of full-stack projects, contributing to open-source initiatives, and networking with industry professionals. Focusing on companies that value innovation and provide mentorship opportunities for junior developers.",
    image: "/assets/thoughts/Google.png"
  },
  {
    id: 2,
    title: "Apple Developer Academy Application",
    description: "Preparing for application to Apple's prestigious Developer Academy in Italy as part of international exchange program.",
    category: "career",
    date: "2025-02",
    status: "Planning",
    tags: ["Apple Developer Academy", "Italy", "Exchange Program"],
    details: "The Apple Developer Academy represents an incredible opportunity to enhance iOS development skills while gaining international experience. Preparing comprehensive application showcasing my Swift projects, design thinking, and passion for creating user-centered applications.",
    image: "/assets/thoughts/Swift.png"
  },
  {
    id: 3,
    title: "Mastering Modern Development Stack",
    description: "Expanding technical expertise in Angular, C#, and .NET ecosystem to meet evolving industry demands and startup requirements.",
    category: "technical",
    date: "2025-02",
    status: "Planning",
    tags: ["Angular", "C#", "Startup"],
    details: "In February 2025, I will be working with a startup company. To prepare for this role, I am studying various courses including Angular, C#, and other relevant technologies to ensure I am well-equipped for the job.",
    image: "https://img.freepik.com/free-vector/illustration-startup-business_53876-18154.jpg?semt=ais_hybrid"
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
    image: "/assets/projects/ComingSoon.png"
  },
  {
    id: 5,
    title: "Participating in Apple Event",
    description: "Participating in Apple's annual event to create an app and compete for a chance to visit Apple Park.",
    category: "projects",
    date: "2025-02",
    status: "Planning",
    tags: ["Apple Event", "App Development", "Competition"],
    details: "In February, I will be participating in Apple's annual event where developers create apps to compete for a chance to visit Apple Park. I am excited about the opportunity to showcase my skills and potentially win this prestigious competition.",
    image: "/assets/thoughts/Swift.png"
  },
  {
    id: 6,
    title: "Finishing Personal Portfolio",
    description: "Completing my personal portfolio by December to showcase my work and skills.",
    category: "career",
    date: "2024-12",
    status: "In Progress",
    tags: ["Portfolio", "Personal Branding", "Web Development"],
    details: "I am finalizing my personal portfolio by the start of December. This new and improved version will better showcase my work and skills, addressing the shortcomings of my previous portfolio.",
    image: "/assets/projects/Portfolio.png"
  }
];

const categories = [
  { id: 'all', label: 'All Thoughts', icon: Brain },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'learning', label: 'Learning', icon: Calendar }
] as const;

type CategoryId = typeof categories[number]['id'];

const ShootingStarsBackground = () => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden">
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

export default function ThoughtsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredThoughts = thoughts.filter(thought => 
    activeCategory === 'all' || thought.category === activeCategory
  );

  return (
    <PortfolioLayout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="min-h-screen bg-[#121212] text-white p-4 sm:p-8 max-w-6xl mx-auto relative"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Thoughts & Insights
          </h1>
          <p className="text-lg sm:text-xl text-gray-400">
            Strategic planning, career development, and technical insights from my journey as a software developer. Sharing experiences and future aspirations in technology.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-white text-black' 
                  : 'bg-[#1E1E1E] text-gray-400 hover:bg-[#2A2A2A]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon size={16} />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {filteredThoughts.map(thought => (
            <motion.div
              key={thought.id}
              variants={itemVariants}
              className="bg-[#1E1E1E] p-4 sm:p-6 rounded-xl hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
            >
              <ShootingStarsBackground />
              <div className="relative z-10">
                <div className="relative w-full h-40 sm:h-48 mb-4 sm:mb-6 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent opacity-60 z-10" />
                  <Image 
                    src={thought.image} 
                    alt={thought.title}
                    fill
                    className="object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">{thought.date}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    thought.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                    thought.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {thought.status}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{thought.title}</h3>
                <p className="text-gray-400 mb-4">{thought.description}</p>
                <div className="flex flex-wrap gap-2">
                  {thought.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#252525] rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </PortfolioLayout>
  );
}

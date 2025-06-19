'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code, Layout, Smartphone } from 'lucide-react';
import Image from 'next/image';
import PortfolioLayout from '@/components/PortfolioLayout';
import { Project } from '@/types';

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

const projects: Project[] = [
  {
    title: "Meetly - Social Location App",
    description: "A comprehensive iOS social networking application that enables users to discover friends' real-time locations, create collaborative groups, and coordinate events seamlessly. Features intelligent map integration, schedule synchronization, and streamlined group communication.",
    image: "/assets/projects/ComingSoon.png",
    tech: ["Swift", "MapKit", "Firebase", "Core Data"],
    category: "mobile",
    github: "",
    live: ""
  },
  {
    title: "BufeTec - Legal Services Platform",
    description: "Professional iOS application providing accessible legal and notarial services through the BufeTec program at Tecnológico de Monterrey. Designed to democratize legal assistance for underserved communities with secure document handling and appointment scheduling.",
    image: "/assets/projects/Bufetec.png",
    tech: ["Swift", "MongoDB", "Firebase", "Flask", "REST APIs"],
    category: "mobile",
    github: "https://github.com/benjaminbelloeil/BufetecApp",
    live: ""
  },
  {
    title: "StudentCalendar - Academic Management",
    description: "Intuitive iOS application designed specifically for academic schedule management. Features intelligent class scheduling, conflict detection, assignment tracking, and seamless calendar synchronization to optimize student productivity.",
    image: "/assets/projects/CalendarApp.png",
    tech: ["Swift", "Core Data", "EventKit", "UIKit"],
    category: "mobile",
    github: "https://github.com/benjaminbelloeil/StudentCalendar",
    live: ""
  },
  {
    title: "CineScope - Movie Discovery App",
    description: "Feature-rich iOS movie discovery application with advanced search capabilities, personalized recommendations, and social features. Integrates with multiple movie databases to provide comprehensive film information and reviews.",
    image: "/assets/projects/MovieApp.png",
    tech: ["Swift", "TMDb API", "Core Data", "Alamofire"],
    category: "mobile",
    github: "https://github.com/benjaminbelloeil/MovieApp",
    live: ""
  },
  {
    title: "Rockwell Interactive Platform",
    description: "Enterprise-grade web platform featuring gamification through Unity integration, comprehensive user management, and advanced analytics dashboard. Built for Rockwell Automation to increase product engagement and provide valuable user insights.",
    image: "/assets/projects/Rockwell.png",
    tech: ["Next.js", "Express.js", "MySQL", "Unity WebGL", "Chart.js"],
    category: "web",
    github: "https://github.com/benjaminbelloeil/RockwellWeb",
    live: "https://rockwell-web.vercel.app/LoginForm"
  },
  {
    title: "Portfolio v1.0 - Personal Brand",
    description: "Responsive portfolio website showcasing technical expertise and project portfolio. Features modern design principles, performance optimization, and interactive animations to create an engaging user experience.",
    image: "/assets/projects/PersonalPortafolio.png",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "web",
    github: "https://github.com/benjaminbelloeil/Portfolio_Benjamin",
    live: "https://benjaminbelloeilportfolio-benjamin-belloeils-projects.vercel.app/"
  },
  {
    title: "TaskFlow - Productivity Suite",
    description: "Advanced task management application with customizable workflows, theme personalization, and intelligent filtering. Demonstrates proficiency in vanilla JavaScript and modern web development practices.",
    image: "/assets/projects/todolist.png",
    tech: ["Vanilla JavaScript", "HTML5", "CSS3", "Local Storage"],
    category: "web",
    github: "https://github.com/benjaminbelloeil/TodoList",
    live: ""
  }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Layout },
  { id: 'web', label: 'Web Apps', icon: Code },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone }
] as const;

type CategoryId = typeof categories[number]['id'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  
  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <PortfolioLayout>
      <motion.div 
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="min-h-screen bg-[#121212] text-white p-8 max-w-6xl mx-auto"
      >
        <div className="mb-12">
          <motion.h1 
            variants={itemVariants}
            className="text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Projects
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl"
          >
            A comprehensive collection of my work in web and mobile development, showcasing expertise in creating scalable, user-focused applications that solve real-world problems and deliver measurable business value.
          </motion.p>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex gap-4 mb-8"
        >
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

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="rounded-xl border border-gray-800 bg-[#1E1E1E] overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-full"
                      >
                        <Github className="w-6 h-6" />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-full"
                      >
                        <ExternalLink className="w-6 h-6" />
                      </motion.a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#2A2A2A] rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </PortfolioLayout>
  );
}

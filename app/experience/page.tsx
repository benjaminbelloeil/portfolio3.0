'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PortfolioLayout from '@/components/PortfolioLayout';
import { Experience } from '@/types';

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

const getGradientByLetter = (letter: string): string => {
  const gradients: Record<string, string> = {
    'A': 'from-green-500 to-green-700',
    'T': 'from-blue-500 to-cyan-500',
    'S': 'from-purple-500 to-pink-500',
    'B': 'from-orange-500 to-red-500',
  };
  return gradients[letter] || 'from-gray-500 to-gray-700';
};

const experiences: Experience[] = [
  {
    title: "Junior Full-Stack Developer Intern",
    company: "AMN Technology and Investment",
    duration: "Nov 2024 - Feb 2025",
    details: [
      "Developing enterprise-level investment management platform features using C#, Angular, and .NET 8, serving 1000+ active users",
      "Implementing responsive frontend components with TypeScript and Angular, improving user experience by 25%",
      "Contributing to RESTful API development and database optimization, reducing query response time by 30%",
      "Collaborating in agile development environment with code reviews, testing protocols, and continuous integration practices",
      "Participating in technical decision-making for system architecture and performance optimization initiatives"
    ]
  },
  {
    title: "Technical Support Specialist",
    company: "Tuberia Industrial del Norte",
    duration: "Aug 2023 - Sep 2024",
    details: [
      "Led ERP system migration project for 9,000+ product catalog, ensuring 99.8% data integrity during transition",
      "Designed and delivered comprehensive training programs for 50+ end-users, achieving 95% system adoption rate",
      "Implemented technical documentation and user guides in both English and Spanish, expanding market reach by 40%",
      "Resolved 200+ technical issues with average resolution time of 2 hours, maintaining business continuity",
      "Collaborated with development team to identify system improvements, contributing to 20% efficiency increase"
    ]
  },
  {
    title: "Operations Manager & Server",
    company: "Senorita's Mexicana Taqueria",
    duration: "Aug 2021 - Aug 2022",
    details: [
      "Managed daily operations for high-volume restaurant, coordinating team of 8 staff members across multiple departments",
      "Implemented efficient service protocols that reduced customer wait time by 35% during peak hours",
      "Developed bilingual customer service standards, serving diverse clientele and increasing customer satisfaction scores to 4.8/5",
      "Optimized inventory management and order fulfillment processes, reducing food waste by 25%",
      "Trained new staff members on operational procedures and customer service best practices"
    ]
  },
  {
    title: "Volunteer Firefighter & Emergency Responder",
    company: "Bon Air Fire Company",
    duration: "Nov 2021 - Jul 2023",
    details: [
      "Completed comprehensive emergency response training including fire suppression, medical aid, and rescue operations",
      "Responded to 100+ emergency calls, demonstrating critical thinking and quick decision-making under pressure",
      "Developed strong teamwork and communication skills through coordinated emergency response operations",
      "Maintained and inspected safety equipment, ensuring 100% operational readiness for emergency situations",
      "Participated in community outreach programs, educating public on fire safety and emergency preparedness"
    ]
  }
];

interface CompanyAvatarProps {
  company: string;
}

const CompanyAvatar: React.FC<CompanyAvatarProps> = ({ company }) => {
  const firstLetter = company.charAt(0);
  const gradient = getGradientByLetter(firstLetter);

  return (
    <motion.div 
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className={`w-24 h-24 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} shadow-lg`}
    >
      <span className="text-4xl font-bold text-white">{firstLetter}</span>
    </motion.div>
  );
};

const ExperienceItem: React.FC<Experience> = ({ title, company, duration, details }) => (
  <motion.article 
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="border border-gray-700 p-6 rounded-lg hover:shadow-xl transition-all duration-500 hover:border-gray-500 relative overflow-hidden"
  >
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-semibold text-gray-200 mb-2"
        >
          {title}
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-400 mb-1"
        >
          {company}
        </motion.p>
        <motion.p 
          variants={itemVariants}
          className="text-md text-gray-500"
        >
          {duration}
        </motion.p>
      </div>

      <CompanyAvatar company={company} />
    </div>

    {details && (
      <motion.ul 
        variants={containerVariants}
        className="list-disc list-inside text-gray-400 space-y-3"
      >
        {details.map((detail, index) => (
          <motion.li 
            key={index}
            variants={itemVariants}
            whileHover={{ x: 10 }}
            className="hover:text-gray-300 transition-colors duration-300"
          >
            {detail}
          </motion.li>
        ))}
      </motion.ul>
    )}

    <motion.div
      className="absolute -bottom-20 -right-20 w-40 h-40 bg-gray-700/10 rounded-full blur-xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </motion.article>
);

export default function ExperiencePage() {
  return (
    <PortfolioLayout>
      <motion.section 
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="min-h-screen bg-[#121212] text-white p-8 max-w-6xl mx-auto"
      >
        <div className="mb-12 relative">
          <motion.h1 
            variants={itemVariants}
            className="text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Professional Experience
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mb-6"
          >
            A progressive journey through diverse roles that have shaped my expertise in software development, technical support, team leadership, and emergency response. Each position has contributed valuable skills and perspectives to my professional toolkit.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-gray-500 text-sm"
          >
            <span className="inline-block w-12 h-[1px] bg-gray-700"/>
            <span>3+ years of diverse professional experience</span>
          </motion.div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceItem 
              key={index}
              title={exp.title}
              company={exp.company}
              duration={exp.duration}
              details={exp.details}
            />
          ))}
        </div>
      </motion.section>
    </PortfolioLayout>
  );
}

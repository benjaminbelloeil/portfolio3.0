'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Wrench, Terminal, Palette, Cloud, Database } from 'lucide-react';
import Image from 'next/image';
import PortfolioLayout from '@/components/PortfolioLayout';
import { Skill } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const technologies: Record<string, Skill[]> = {
  languages: [
    {
      name: 'JavaScript',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      description: 'Core language for web development'
    },
    {
      name: 'TypeScript',
      level: 'Learning',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      description: 'Type-safe JavaScript development'
    },
    {
      name: 'Python',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      description: 'Backend development and automation'
    },
    {
      name: 'C++',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      description: 'General-purpose programming language'
    },
    {
      name: 'C#',
      level: 'Learning',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      description: 'Programming language for .NET development'
    },
    {
      name: 'Swift',
      level: 'Intermediate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
      description: 'Programming language for iOS development'
    }
  ],
  frontend: [
    {
      name: 'React',
      level: 'Intermediate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      description: 'Primary framework for building dynamic user interfaces'
    },
    {
      name: 'Next.js',
      level: 'Intermediate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      description: 'React framework for server-side rendering'
    },
    {
      name: 'Angular',
      level: 'Learning',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      description: 'Framework for building dynamic web apps'
    },
    {
      name: 'HTML5',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      description: 'Structure and semantics'
    },
    {
      name: 'CSS3',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      description: 'Styling and animations'
    },
    {
      name: 'Tailwind CSS',
      level: 'Advanced',
      icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
      description: 'Utility-first CSS framework'
    }
  ],
  backend: [
    {
      name: 'Node.js',
      level: 'Beginner',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      description: 'Server-side JavaScript runtime'
    },
    {
      name: 'Express.js',
      level: 'Beginner',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      description: 'Web application framework'
    },
    {
      name: 'Flask',
      level: 'Intermediate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
      description: 'Python web framework'
    }
  ],
  databases: [
    {
      name: 'MongoDB',
      level: 'Intermediate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      description: 'NoSQL database'
    },
    {
      name: 'MySQL',
      level: 'Intermediate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      description: 'Relational database'
    },
    {
      name: 'Firebase',
      level: 'Beginner',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      description: 'Backend as a Service'
    }
  ],
  devTools: [
    {
      name: 'Git',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      description: 'Version control system'
    },
    {
      name: 'GitHub',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      description: 'Code hosting platform'
    },
    {
      name: 'VS Code',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      description: 'Primary IDE'
    },
    {
      name: 'Docker',
      level: 'Beginner',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      description: 'Containerization platform'
    },
    {
      name: 'Postman',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
      description: 'API development and testing'
    }
  ],
  design: [
    {
      name: 'Figma',
      level: 'Intermediate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      description: 'Design and prototyping tool'
    },
    {
      name: 'Canva',
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
      description: 'Graphic design tool'
    }
  ],
  infrastructure: [
    {
      name: 'AWS',
      level: 'Beginner',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
      description: 'Cloud platform'
    },
    {
      name: 'Cisco',
      level: 'Intermediate',
      icon: 'https://www.vectorlogo.zone/logos/cisco/cisco-ar21.svg',
      description: 'Networking and IT'
    }
  ]
};

const renderSkillCard = (skill: Skill) => (
  <motion.div
    variants={itemVariants}
    className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-10 h-10 relative">
        <Image 
          src={skill.icon} 
          alt={skill.name} 
          fill
          className="object-contain"
          sizes="40px"
        />
      </div>
      <h3 className="text-xl font-semibold">{skill.name}</h3>
    </div>
    <div className="space-y-2">
      <p className="text-sm text-gray-400">{skill.description}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              skill.level === 'Advanced' ? 'bg-green-500' :
              skill.level === 'Intermediate' ? 'bg-blue-500' :
              skill.level === 'Beginner' ? 'bg-yellow-500' :
              'bg-purple-500'
            }`}
            style={{
              width: `${skill.level === 'Advanced' ? 100 :
                      skill.level === 'Intermediate' ? 75 :
                      skill.level === 'Beginner' ? 50 :
                      25}%`
            }}
          />
        </div>
        <span className="text-xs text-gray-400">{skill.level}</span>
      </div>
    </div>
  </motion.div>
);

const renderSection = (title: string, icon: React.ReactNode, skills: Skill[]) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="mb-16"
  >
    <div className="flex items-center space-x-3 mb-8">
      {icon}
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {skills.map((skill, index) => (
        <motion.div key={index} variants={itemVariants}>
          {renderSkillCard(skill)}
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
);

export default function StackPage() {
  return (
    <PortfolioLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#121212] text-white p-8 max-w-6xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tech Stack
          </h1>
          <p className="text-xl text-gray-400">
            Comprehensive overview of technologies, frameworks, and tools I&apos;ve mastered throughout my development journey. Each skill represents hands-on experience building real-world applications and solving complex technical challenges.
          </p>
          <br/>
          <div className="flex items-center text-sm text-gray-500">
            <span className="inline-block w-12 h-[1px] bg-gray-700 mr-2" />
            <span>4+ years of experience across multiple technology stacks</span>
          </div>
        </motion.div>

        {renderSection("Programming Languages", <Terminal className="w-8 h-8 text-purple-500" />, technologies.languages)}
        {renderSection("Frontend Development", <Layout className="w-8 h-8 text-blue-500" />, technologies.frontend)}
        {renderSection("Backend Development", <Server className="w-8 h-8 text-green-500" />, technologies.backend)}
        {renderSection("Databases", <Database className="w-8 h-8 text-yellow-500" />, technologies.databases)}
        {renderSection("Development Tools", <Wrench className="w-8 h-8 text-orange-500" />, technologies.devTools)}
        {renderSection("Design Tools", <Palette className="w-8 h-8 text-pink-500" />, technologies.design)}
        {renderSection("Infrastructure", <Cloud className="w-8 h-8 text-gray-500" />, technologies.infrastructure)}
      </motion.div>
    </PortfolioLayout>
  );
}

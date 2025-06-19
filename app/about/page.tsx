'use client';

import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Download, ChevronDown, Sparkles, Clock, MapPin, Code, Rocket, Dumbbell } from 'lucide-react';
import PortfolioLayout from '@/components/PortfolioLayout';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      duration: 0.5
    }
  }
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const GoalCard = ({ goal, status }: { goal: string; status: string }) => {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Just Started': 'from-yellow-500/20 to-orange-500/20 text-yellow-500',
      'In Progress': 'from-blue-500/20 to-purple-500/20 text-blue-500',
      'Almost There': 'from-green-500/20 to-emerald-500/20 text-green-500',
      'On Hold': 'from-red-500/20 to-pink-500/20 text-red-500',
      'Planning': 'from-yellow-500/20 to-orange-500/20 text-yellow-500',
      'Active': 'from-green-500/20 to-emerald-500/20 text-green-500',
    };
    return colors[status] || 'from-gray-500/20 to-gray-400/20 text-gray-500';
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg bg-gradient-to-r ${getStatusColor(status)} p-4 border border-gray-800/50`}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-gray-200">{goal}</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-current`} />
          <span className="text-sm">{status}</span>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]));

  const funFacts = [
    'Lived and worked in 4 different countries',
    'Fluent in 3 languages, learning Italian',
    'Early morning coder and fitness enthusiast',
    'Passionate about emerging technologies',
    'Travel enthusiast with global perspective',
  ];

  const currentGoals = [
    { goal: 'Complete Apple Developer Academy', status: 'In Progress' },
    { goal: 'Master Italian Language', status: 'In Progress' },
    { goal: 'Launch SaaS Product', status: 'Planning' },
    { goal: 'Contribute to Open Source', status: 'Active' },
  ];

  const dailyRoutine = [
    { time: '6:00 AM', activity: 'Morning workout & meditation' },
    { time: '7:30 AM', activity: 'Coding & skill development' },
    { time: '1:00 PM', activity: 'University classes & studies' },
    { time: '5:00 PM', activity: 'Client projects & freelance work' },
    { time: '8:00 PM', activity: 'Reading & technology research' },
  ];

  const countriesLived = ['Mexico', 'USA', 'Argentina', 'France'];

  return (
    <PortfolioLayout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="min-h-screen bg-[#121212] text-white relative"
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Enhanced Hero Section with 3D tilt */}
        <motion.section
          className="h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
          style={{ perspective: 2000 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - rect.left - rect.width / 2);
            y.set(e.clientY - rect.top - rect.height / 2);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
        >
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />

          <motion.div
            style={{ rotateX, rotateY }}
            className="text-center z-20 space-y-6"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              animate={{
                scale: [0.9, 1],
                opacity: [0, 1],
              }}
              transition={{ duration: 1 }}
            >
              About Me
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto"
              animate={{ y: [20, 0], opacity: [0, 1] }}
              transition={{ delay: 0.5 }}
            >
              Discover more about my daily activities and future aspirations.
            </motion.p>
          </motion.div>
          <motion.div className="flex flex-col items-center gap-2 absolute bottom-10 left-0 right-0 mx-auto md:left-1/2 md:-translate-x-1/2">
            <motion.p
              className="text-gray-400 text-sm uppercase tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to Learn About Me
            </motion.p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Content Grid */}
        <motion.div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Resume Download */}
              <motion.div className="bg-[#1E1E1E] p-6 sm:p-8 rounded-xl border border-gray-800 text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Get My Resume</h2>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                  Detailed overview of my experience and skills
                </p>
                <motion.button>
                  <motion.a
                    href="/Benjamin_Belloeil_Resume.pdf"
                    download="Benjamin_Belloeil_Resume.pdf"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 mx-auto"
                  >
                    <Download className="w-3 sm:w-4 h-3 sm:h-4" />
                    Download CV
                  </motion.a>
                </motion.button>
              </motion.div>

              {/* Fun Facts */}
              <motion.div className="bg-[#1E1E1E] p-6 sm:p-8 rounded-xl border border-gray-800">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Fun Facts</h2>
                <div className="space-y-4">
                  {funFacts.map((fact, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
                      <p className="text-gray-300 text-sm sm:text-base">{fact}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Current Goals */}
              <motion.div className="bg-[#1E1E1E] p-6 sm:p-8 rounded-xl border border-gray-800">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Current Goals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentGoals.map((goal, i) => (
                    <GoalCard 
                      key={i}
                      goal={goal.goal}
                      status={goal.status}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Countries Lived In */}
              <motion.div className="bg-[#1E1E1E] p-6 sm:p-8 rounded-xl border border-gray-800">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Countries I&apos;ve Lived In
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {countriesLived.map((country, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 bg-[#252525] p-2 sm:p-3 rounded-lg"
                      whileHover={{ y: -5 }}
                    >
                      <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                      <span className="text-gray-300 text-xs sm:text-sm">{country}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Daily Routine */}
              <motion.div className="bg-[#1E1E1E] p-6 sm:p-8 rounded-xl border border-gray-800">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">A Day in My Life</h2>
                <div className="space-y-4">
                  {dailyRoutine.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 sm:gap-4"
                      whileHover={{ x: 5 }}
                    >
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-300">
                          {item.time}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400">{item.activity}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Current Inspiration */}
              <motion.div className="bg-[#1E1E1E] p-6 sm:p-8 rounded-xl border border-gray-800">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Current Inspiration</h2>
                <div className="space-y-4">
                  <motion.div
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 border border-gray-800/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Code className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-300 mb-1">
                          Dev Contribution
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400">
                          Contributing to projects that help other developers
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 border border-gray-800/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <Rocket className="w-3 sm:w-4 h-3 sm:h-4 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-300 mb-1">
                          Project Exploration
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400">
                          Building side projects to learn new technologies
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 border border-gray-800/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-yellow-500/10">
                        <Dumbbell className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-300 mb-1">
                          Workout
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400">
                          Keeping a healthy lifestyle with daily workouts
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </PortfolioLayout>
  );
};

export default AboutPage;

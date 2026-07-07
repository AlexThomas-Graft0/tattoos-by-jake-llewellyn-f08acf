'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface Pillar {
  id: string;
  number: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}

const pillars: Pillar[] = [
  {
    id: 'artistic-integrity',
    number: '01',
    title: 'custom-drawn for your anatomy.',
    body: 'Every tattoo is drawn by hand specifically for the collector. I study the natural contours, muscle lines, and flow of your body to ensure the design sits naturally and complements your physical form. I do not copy other artists\' work.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Pencil path */}
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        {/* Tattoo Needle elements crossing */}
        <path d="m15 5 3 3" />
        <path d="m8 12 4 4" />
        <path d="M3 21l6-6" />
      </svg>
    ),
  },
  {
    id: 'clinical-standards',
    number: '02',
    title: 'uncompromising hygiene.',
    body: 'Your safety is non-negotiable. The studio operates under strict clinical sterilization guidelines. We use 100% single-use, disposable medical equipment, premium vegan-friendly inks, and hospital-grade barriers for every single session.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Shield with clinical cross */}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    id: 'clear-communication',
    number: '03',
    title: 'a structured process.',
    body: 'No more chasing artists through Instagram DMs or waiting months for an unhelpful email reply. Our booking system is transparent, structured, and reliable. You will always know your project status, pricing, and appointment details.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Calendar with checkmark */}
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ExperiencePillars() {
  return (
    <section
      id="experience-pillars"
      className="relative bg-[#121212] text-[#F5F5F7] py-24 md:py-32 overflow-hidden border-b border-[#C5A880]/10"
    >
      {/* Subtle atmospheric background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <img
          src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=1800&q=80"
          alt="Studio atmosphere texture"
          className="w-full h-full object-cover filter grayscale"
        />
      </div>

      {/* Ambient gradient shadows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8FA89B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mb-20 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={headerVariants}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C5A880]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C5A880]">
              The Tattoo Experience
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight leading-tight text-[#F5F5F7]">
            three pillars of a <br className="hidden md:block" />
            <span className="italic text-[#C5A880]">better tattoo experience.</span>
          </h2>
          
          <p className="mt-6 text-sm md:text-base text-[#F5F5F7]/70 font-light leading-relaxed max-w-2xl">
            Modern tattooing should be free from intimidation, uncertainty, and clinical compromise. 
            Every aspect of your session is optimized for absolute safety, technical precision, and creative collaboration.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              className="group relative flex flex-col justify-between bg-[#1C1C1C] border border-[#C5A880]/10 hover:border-[#C5A880]/30 rounded-lg p-8 md:p-10 transition-all duration-500 ease-out hover:shadow-[0_12px_40px_-12px_rgba(197,168,128,0.15)]"
            >
              {/* Card top border accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                {/* Header of Pillar Card */}
                <div className="flex items-start justify-between mb-8">
                  <div className="p-3 bg-[#121212] border border-[#C5A880]/10 rounded text-[#C5A880] group-hover:scale-110 transition-transform duration-500 ease-out">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-sm text-[#C5A880]/40 group-hover:text-[#C5A880] transition-colors duration-300 font-medium">
                    {pillar.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-serif font-light text-[#F5F5F7] tracking-tight mb-4 group-hover:text-white transition-colors">
                  {pillar.title}
                </h3>

                {/* Body Copy */}
                <p className="text-sm text-[#F5F5F7]/70 font-light leading-relaxed group-hover:text-[#F5F5F7]/90 transition-colors duration-300">
                  {pillar.body}
                </p>
              </div>

              {/* Decorative Subtle Line */}
              <div className="w-full h-[1px] bg-[#C5A880]/10 mt-8 group-hover:bg-[#C5A880]/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Section Footer / CTA */}
        <motion.div 
          className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-[#1C1C1C] border border-[#C5A880]/15 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-serif font-light text-[#F5F5F7]">
              Ready to collaborate on a custom concept?
            </h4>
            <p className="text-xs md:text-sm text-[#F5F5F7]/60 font-mono mt-1">
              Currently accepting custom illustrative blackwork and fine-line requests.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#intake-form"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C5A880] hover:bg-[#bfa076] text-[#121212] font-mono text-xs uppercase tracking-widest font-semibold rounded transition-colors duration-300 text-center"
            >
              Request Booking
            </a>
            <a
              href="#booking-policies"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#F5F5F7]/20 hover:border-[#C5A880] hover:text-[#C5A880] text-[#F5F5F7] font-mono text-xs uppercase tracking-widest rounded transition-all duration-300 text-center"
            >
              Read Policies
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
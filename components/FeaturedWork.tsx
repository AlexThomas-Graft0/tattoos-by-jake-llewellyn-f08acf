'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface CarouselItem {
  id: number;
  title: string;
  category: string;
  hours: string;
  placement: string;
  healingState: string;
  description: string;
  technicalNote: string;
  freshImage: string;
  healedImage: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    title: "The Alchemist's Study",
    category: "Fine-Line Illustrative",
    hours: "6 Hours",
    placement: "Arm Placement",
    healingState: "Healed 14 Months",
    description: "An intricate, fine-line anatomical heart interwoven with delicate botanical ferns. Designed to follow the natural musculature of the inner forearm, ensuring the design moves organically with physical rotation.",
    technicalNote: "Micro-fine stippling and 3RL needle configurations were balanced with deeper 5RL structural lines. After 14 months of natural skin cell regeneration, the ink has settled smoothly without bleeding or blurring, maintaining elegant contrast.",
    freshImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80",
    healedImage: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "The Sentinel of Memory",
    category: "Illustrative Blackwork",
    hours: "8 Hours",
    placement: "Shoulder Placement",
    healingState: "Healed 2 Years",
    description: "A highly detailed, dark illustrative raven with geometric stippling and heavy blackwork on the shoulder blade. Features deep charcoal gradients contrasted against razor-sharp negative space lines.",
    technicalNote: "High-density black packing was executed with a custom-tuned rotary machine to minimize skin trauma. Two years post-application, the dark pigments remain rich and deep black rather than fading to blue-grey, proving clinical-grade ink saturation.",
    freshImage: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1200&q=80",
    healedImage: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Celestial Alignment",
    category: "Single-Needle Fine-Line",
    hours: "3 Hours",
    placement: "Rib Placement",
    healingState: "Fresh Application",
    description: "A delicate, minimalist single-needle astronomical chart on a highly sensitive ribcage area. Clean geometry, celestial orbits, and microscopic alignment ticks designed for absolute elegance.",
    technicalNote: "Executed exclusively with a single-needle (1RL) configuration. Precision depth control was mandatory to prevent blowouts in the thin skin layer over the ribs. The linework is microscopic but perfectly continuous.",
    freshImage: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80",
    healedImage: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=1200&q=80"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const elementVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 }
  }
};

export function FeaturedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewHealed, setViewHealed] = useState(true);

  const activeItem = CAROUSEL_ITEMS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    setViewHealed(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
    setViewHealed(true);
  };

  return (
    <section 
      id="featured-work" 
      className="relative min-h-screen bg-[#121212] text-[#F5F5F7] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#1C1C1C]"
    >
      {/* Background Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      
      {/* Subtle Gold Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1C1C1C]">
          <motion.div className="max-w-2xl" variants={elementVariants}>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880] block mb-3">
              [ 01 / Signature Work ]
            </span>
            <h2 className="text-4xl sm:text-5xl font-light font-serif tracking-tight text-[#F5F5F7] mb-6">
              precision that <span className="italic text-[#C5A880]">endures.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
              A curated selection of signature pieces. Look closer to see how illustrative detail settles into the skin, retaining crisp contrast over years of healing. Use the interactive toggle to inspect the healed state.
            </p>
          </motion.div>

          {/* Navigation Controls */}
          <motion.div 
            className="flex items-center gap-4 mt-8 md:mt-0"
            variants={elementVariants}
          >
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 mr-4">
              <span className="text-[#C5A880]">{(activeIndex + 1).toString().padStart(2, '0')}</span>
              <span>/</span>
              <span>{CAROUSEL_ITEMS.length.toString().padStart(2, '0')}</span>
            </div>
            
            <button
              onClick={handlePrev}
              className="p-4 rounded-full border border-[#1C1C1C] bg-[#121212] hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              aria-label="Previous signature piece"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className="p-4 rounded-full border border-[#1C1C1C] bg-[#121212] hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              aria-label="Next signature piece"
            >
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Carousel Content Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Image Viewer */}
          <motion.div 
            className="lg:col-span-7 space-y-4"
            variants={elementVariants}
          >
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden bg-[#1C1C1C] border border-[#1C1C1C] group rounded-sm">
              
              {/* Image Transition Window */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeIndex}-${viewHealed}`}
                  src={viewHealed ? activeItem.healedImage : activeItem.freshImage}
                  alt={`${activeItem.title} - ${viewHealed ? 'Healed' : 'Fresh'}`}
                  className="w-full h-full object-cover grayscale brightness-90 hover:brightness-100 transition-all duration-700"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Live Image State Badge */}
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full backdrop-blur-md border ${
                  viewHealed 
                    ? 'bg-[#8FA89B]/10 text-[#8FA89B] border-[#8FA89B]/20' 
                    : 'bg-neutral-900/80 text-[#F5F5F7] border-neutral-700/50'
                }`}>
                  {viewHealed ? `✓ ${activeItem.healingState}` : '● Fresh Application'}
                </span>
              </div>

              {/* Bottom Interactive Prompt Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h4 className="text-lg font-serif text-[#F5F5F7]">{activeItem.title}</h4>
                  <p className="text-xs text-neutral-400 font-mono mt-1">{activeItem.category}</p>
                </div>

                {/* Micro-Switch for Fresh vs Healed */}
                <div className="flex items-center gap-1 bg-[#121212]/90 p-1 rounded border border-neutral-800 backdrop-blur-sm self-start sm:self-auto">
                  <button
                    onClick={() => setViewHealed(false)}
                    className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all duration-200 ${
                      !viewHealed 
                        ? 'bg-[#C5A880] text-[#121212] font-semibold' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Fresh
                  </button>
                  <button
                    onClick={() => setViewHealed(true)}
                    className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all duration-200 ${
                      viewHealed 
                        ? 'bg-[#8FA89B] text-[#121212] font-semibold' 
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Healed
                  </button>
                </div>
              </div>
            </div>

            {/* Slider Indicator Bar */}
            <div className="h-[2px] w-full bg-[#1C1C1C] relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#C5A880]"
                initial={{ width: '0%' }}
                animate={{ width: `${((activeIndex + 1) / CAROUSEL_ITEMS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Right Column: Deep Metadata & Specs */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between h-full space-y-8 lg:min-h-[500px]"
            variants={elementVariants}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#C5A880] uppercase tracking-widest">{activeItem.category}</span>
                <h3 className="text-3xl sm:text-4xl font-light font-serif text-[#F5F5F7]">
                  {activeItem.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                {activeItem.description}
              </p>

              {/* Technical Specifications Sheet */}
              <div className="grid grid-cols-2 gap-px bg-[#1C1C1C] border border-[#1C1C1C] rounded-sm overflow-hidden">
                <div className="p-4 bg-[#121212] flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Placement</span>
                  <span className="text-sm font-sans text-neutral-200 mt-1">{activeItem.placement}</span>
                </div>
                <div className="p-4 bg-[#121212] flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Session Duration</span>
                  <span className="text-sm font-sans text-neutral-200 mt-1">{activeItem.hours}</span>
                </div>
                <div className="p-4 bg-[#121212] flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Healing Status</span>
                  <span className="text-sm font-sans text-[#8FA89B] mt-1 font-medium">{activeItem.healingState}</span>
                </div>
                <div className="p-4 bg-[#121212] flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Style Technique</span>
                  <span className="text-sm font-sans text-neutral-200 mt-1">Single-Needle & 3RL</span>
                </div>
              </div>

              {/* Technical Healed Insights Panel */}
              <div className="p-5 bg-[#1C1C1C] border-l-2 border-[#C5A880]/60 rounded-r-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider">
                  <svg className="w-4 h-4 text-[#C5A880]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Technical Longevity Note</span>
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {activeItem.technicalNote}
                </p>
              </div>
            </div>

            {/* Structured CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#1C1C1C]">
              <a
                href="#intake-form"
                className="flex-1 text-center py-4 px-6 bg-[#C5A880] text-[#121212] font-semibold text-xs uppercase tracking-widest rounded-sm hover:bg-[#b0936b] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              >
                Inquire About Custom Design
              </a>
              <a
                href="#portfolio-gallery"
                className="flex-1 text-center py-4 px-6 bg-transparent text-[#F5F5F7] border border-neutral-700 font-semibold text-xs uppercase tracking-widest rounded-sm hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              >
                View Full Portfolio
              </a>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
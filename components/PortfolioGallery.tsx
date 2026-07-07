'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface PortfolioItem {
  id: string;
  title: string;
  imageAlt: string;
  imageUrl: string;
  styles: string[];
  placement: string;
  healingState: string;
  isHealed: boolean;
}

const portfolioData: PortfolioItem[] = [
  {
    id: 'item-1',
    title: "The Botanist's Compass",
    imageAlt: "Detailed fine-line tattoo of a vintage compass surrounded by wild lavender and sage on an inner forearm.",
    imageUrl: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80&w=800",
    styles: ["Fine-Line"],
    placement: "Forearm",
    healingState: "Healed (2 Years)",
    isHealed: true,
  },
  {
    id: 'item-2',
    title: "Monolithic Archways",
    imageAlt: "Large blackwork tattoo featuring clean architectural arches, geometric patterns, and deep black shading on a calf.",
    imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=800",
    styles: ["Illustrative Blackwork", "Large-Scale"],
    placement: "Calf / Lower Leg",
    healingState: "Fresh Application",
    isHealed: false,
  },
  {
    id: 'item-3',
    title: "The Lunar Moth",
    imageAlt: "Delicate fine-line single-needle tattoo of a luna moth with detailed wings and celestial symbols on an upper back.",
    imageUrl: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=800",
    styles: ["Fine-Line"],
    placement: "Upper Back / Spine",
    healingState: "Healed (1 Year)",
    isHealed: true,
  },
  {
    id: 'item-4',
    title: "Bramble & Thorn Sleeve",
    imageAlt: "Half-sleeve tattoo of detailed blackwork brambles, thorns, and wild roses wrapping around an arm.",
    imageUrl: "https://images.unsplash.com/photo-1621249616736-00fe2af779b5?auto=format&fit=crop&q=80&w=800",
    styles: ["Illustrative Blackwork", "Large-Scale"],
    placement: "Upper Arm / Shoulder",
    healingState: "Healed (3 Years)",
    isHealed: true,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60, damping: 15 }
  }
};

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('All Works');
  const [showHealedOnly, setShowHealedOnly] = useState<boolean>(false);
  
  // Slider states
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const isDragging = useRef<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // Filter logic
  const filteredItems = portfolioData.filter((item) => {
    const matchesCategory =
      activeFilter === 'All Works' ||
      item.styles.includes(activeFilter);
    const matchesHealed = !showHealedOnly || item.isHealed;
    return matchesCategory && matchesHealed;
  });

  const categories = ['All Works', 'Fine-Line', 'Illustrative Blackwork', 'Large-Scale'];

  return (
    <section 
      id="portfolio-gallery" 
      className="relative bg-[#121212] text-[#F5F5F7] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-900"
    >
      {/* Editorial Grid Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between px-8">
        <div className="w-px h-full bg-white"></div>
        <div className="w-px h-full bg-white hidden md:block"></div>
        <div className="w-px h-full bg-white hidden md:block"></div>
        <div className="w-px h-full bg-white"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs tracking-[0.2em] text-[#C5A880] uppercase block mb-3">
              Technical Precision & Longevity
            </span>
            <h2 className="text-4xl sm:text-5xl font-light font-serif tracking-tight text-white mb-6">
              healed work speaks for itself.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
              Tattoos are an investment for a lifetime. Every piece shown here is designed and applied 
              with technical precision to ensure clean lines, deep contrast, and clarity that holds for decades.
            </p>
          </div>
        </div>

        {/* Before/After & Healed Longevity Feature */}
        <div className="mb-24 bg-[#1C1C1C] border border-neutral-800 rounded-lg p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Interactive Slider */}
            <div className="lg:col-span-7">
              <div 
                ref={sliderRef}
                className="relative h-[350px] sm:h-[450px] w-full rounded overflow-hidden select-none cursor-ew-resize border border-neutral-900"
                onMouseDown={() => { isDragging.current = true; }}
                onTouchStart={() => { isDragging.current = true; }}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* Healed State (Base Image) */}
                <div className="absolute inset-0 bg-[#121212]">
                  <img 
                    src="https://images.unsplash.com/photo-1590246814883-57c511e76523?auto=format&fit=crop&q=80&w=1200"
                    alt="Healed Tattoo View"
                    className="absolute inset-0 w-full h-full object-cover select-none filter saturate-[0.85] contrast-[0.95] brightness-[0.9]"
                    draggable={false}
                  />
                  {/* Healed Tag */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-neutral-800 z-10">
                    <span className="font-mono text-[10px] tracking-wider text-[#8FA89B] uppercase block">
                      Healed (18 Months)
                    </span>
                    <span className="text-[10px] text-neutral-400 block font-light">Natural daylight</span>
                  </div>
                </div>

                {/* Fresh State (Overlay Image) */}
                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="absolute inset-0 w-[100vw] h-full">
                    {/* Width must match parent's bounding rect to prevent stretching. Handled via standard cover fit */}
                    <img 
                      src="https://images.unsplash.com/photo-1590246814883-57c511e76523?auto=format&fit=crop&q=80&w=1200"
                      alt="Fresh Tattoo View"
                      className="absolute inset-0 w-full h-full object-cover select-none filter brightness-105 contrast-110 saturate-110"
                      style={{ 
                        width: sliderRef.current?.getBoundingClientRect().width || '100%',
                        maxWidth: 'none'
                      }}
                      draggable={false}
                    />
                    {/* Red tint overlay simulating fresh skin swelling */}
                    <div className="absolute inset-0 bg-red-950/10 mix-blend-color-burn pointer-events-none" />
                    
                    {/* Fresh Tag */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-neutral-800 z-10">
                      <span className="font-mono text-[10px] tracking-wider text-[#C5A880] uppercase block">
                        Fresh Application
                      </span>
                      <span className="text-[10px] text-neutral-400 block font-light">Studio ring light</span>
                    </div>
                  </div>
                </div>

                {/* Sliding Bar Divider */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-[#C5A880] cursor-ew-resize z-20"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-black border border-[#C5A880] rounded-full flex items-center justify-center shadow-2xl">
                    <span className="font-mono text-[10px] tracking-tighter text-[#C5A880] select-none">
                      &lsaquo;&rsaquo;
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Copy & Technical Note */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full">
              <span className="font-mono text-xs tracking-wider text-[#C5A880] uppercase mb-2 block">
                Interactive Comparison
              </span>
              <h3 className="text-2xl font-serif text-white mb-4">
                Drag to reveal healing transition
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                Interact with the slider to see how clean blackwork settles into the dermis over time. 
                Slide left to reveal the settled, healed grey gradients; slide right to view the high-contrast intensity of a fresh session.
              </p>
              
              <div className="border-t border-neutral-800 pt-6">
                <p className="text-xs text-neutral-400 leading-relaxed font-light italic">
                  <strong className="text-white font-medium not-italic block mb-1 font-mono text-[11px] uppercase tracking-wider">
                    Technical Note on Longevity:
                  </strong>
                  Fresh tattoos often look incredibly sharp due to skin swelling and superficial ink retention. 
                  True technical mastery is revealed once the skin fully heals. Notice how our fine-line details 
                  remain crisp, and the soft grey stippling transitions smoothly without bleeding or blurring 
                  over 18 months of natural wear.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Gallery Controls & Live Filter UI */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-6 border-b border-neutral-900">
          
          {/* Style Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300 rounded ${
                  activeFilter === category
                    ? 'bg-[#C5A880] text-[#121212] font-semibold'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                [{category}]
              </button>
            ))}
          </div>

          {/* Show Healed Only Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-wider text-neutral-400">
              [ Show Healed Only ]
            </span>
            <button
              onClick={() => setShowHealedOnly(!showHealedOnly)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880] ${
                showHealedOnly ? 'bg-[#8FA89B]' : 'bg-neutral-800'
              }`}
              role="switch"
              aria-checked={showHealedOnly}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform duration-300 ${
                  showHealedOnly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Portfolio Grid Items */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="group relative bg-[#1C1C1C] border border-neutral-800 rounded overflow-hidden flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                  <img 
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-mono tracking-wider uppercase border ${
                      item.isHealed 
                        ? 'bg-[#8FA89B]/10 text-[#8FA89B] border-[#8FA89B]/30' 
                        : 'bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/30'
                    }`}>
                      {item.healingState}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-serif font-light text-white group-hover:text-[#C5A880] transition-colors duration-300 mb-2">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.styles.map((style) => (
                        <span key={style} className="text-[10px] font-mono text-neutral-400">
                          #{style.replace(/\s+/g, '').toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata Table */}
                  <div className="border-t border-neutral-800 pt-3 mt-auto">
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-neutral-500">PLACEMENT</span>
                      <span className="text-neutral-300">{item.placement}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono mt-1">
                      <span className="text-neutral-500">STATUS</span>
                      <span className={item.isHealed ? 'text-[#8FA89B]' : 'text-[#C5A880]'}>
                        {item.isHealed ? 'HEALED' : 'FRESH'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded">
            <p className="text-neutral-400 font-serif italic mb-4">No portfolio items match your active filters.</p>
            <button 
              onClick={() => { setActiveFilter('All Works'); setShowHealedOnly(false); }}
              className="text-xs font-mono text-[#C5A880] underline hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-400 text-xs sm:text-sm font-light mb-4">
            Ready to secure your custom tattoo or claim an exclusive flash design?
          </p>
          <a
            href="#intake-form"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] hover:bg-[#b0936b] text-[#121212] font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded font-semibold"
          >
            Request a Booking
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
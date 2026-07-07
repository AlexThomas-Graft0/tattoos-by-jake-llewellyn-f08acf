'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Check, 
  Clock, 
  Lock, 
  Sparkles, 
  Info, 
  X, 
  ChevronRight, 
  Maximize2,
  DollarSign,
  Maximize
} from 'lucide-react';

interface FlashItem {
  id: string;
  title: string;
  dimensions: string;
  price: number;
  status: 'AVAILABLE' | 'PENDING' | 'TAKEN';
  image: string;
  placement: string;
  description: string;
}

const flashDesigns: FlashItem[] = [
  {
    id: 'FL-902',
    title: "The Serpent's Rose",
    dimensions: "6.0\" x 4.0\"",
    price: 450,
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800',
    placement: 'Forearm, thigh, or calf',
    description: 'Clean, decorative linework of a coiled viper wrapped around a wild rose, optimized for longevity and high contrast.'
  },
  {
    id: 'FL-903',
    title: "Key to the Vault",
    dimensions: "4.5\" x 2.0\"",
    price: 300,
    status: 'PENDING',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=800',
    placement: 'Inner arm, ankle, or rib',
    description: 'Minimalist fine-line illustration of a hand holding a stylized key with celestial stars radiating from the teeth.'
  },
  {
    id: 'FL-904',
    title: "Shadow Panther",
    dimensions: "7.0\" x 5.0\"",
    price: 600,
    status: 'TAKEN',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    placement: 'Shoulder, thigh, or upper back',
    description: 'Bold illustrative blackwork of a stylized, roaring panther head with deep stippled shading.'
  },
  {
    id: 'FL-905',
    title: "Woodland Ferns",
    dimensions: "5.5\" x 3.0\"",
    price: 350,
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
    placement: 'Collarbone, rib, or forearm',
    description: 'Fine-line botanical cluster of three detailed fern leaves curving gently to match natural body contours.'
  },
  {
    id: 'FL-906',
    title: "The Alchemist's Hourglass",
    dimensions: "5.0\" x 3.0\"",
    price: 400,
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800',
    placement: 'Tricep, outer calf, or forearm',
    description: 'Stippled hourglass showcasing shifting celestial sands, framed by geometric planetary orbits.'
  },
  {
    id: 'FL-907',
    title: "Sovereign Falcon",
    dimensions: "6.5\" x 4.5\"",
    price: 500,
    status: 'PENDING',
    image: 'https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?auto=format&fit=crop&q=80&w=800',
    placement: 'Shoulder blade, chest, or thigh',
    description: 'Dynamic soaring falcon rendered with crisp woodcut-style linework and heavy contrast.'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15
    }
  }
};

export function FlashCatalog() {
  const [filter, setFilter] = useState<'ALL' | 'AVAILABLE' | 'PENDING' | 'TAKEN'>('ALL');
  const [selectedDesign, setSelectedDesign] = useState<FlashItem | null>(null);
  const [claimedId, setClaimedId] = useState<string | null>(null);

  // Filter logic
  const filteredDesigns = flashDesigns.filter((design) => {
    if (filter === 'ALL') return true;
    return design.status === filter;
  });

  const handleClaimInitiated = (design: FlashItem) => {
    setSelectedDesign(design);
  };

  const handleConfirmClaim = (designId: string) => {
    setClaimedId(designId);
    setSelectedDesign(null);
    
    // Smooth scroll to intake form
    setTimeout(() => {
      const element = document.getElementById('intake-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  return (
    <section 
      id="flash-catalog" 
      className="relative bg-[#121212] text-[#F5F5F7] py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#C5A880]/10"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(143,168,155,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="h-px w-8 bg-[#C5A880]/40"></span>
            <span className="font-mono text-xs tracking-[0.25em] text-[#C5A880] uppercase">Exclusive Release</span>
            <span className="h-px w-8 bg-[#C5A880]/40"></span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-light tracking-wide text-[#F5F5F7] mb-6"
          >
            the flash catalog.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-[#F5F5F7]/70 font-light leading-relaxed"
          >
            Pre-drawn, original illustrations ready to be tattooed. These designs are tattooed only once, exactly as drawn, with transparent pricing and streamlined booking.
          </motion.p>
        </div>

        {/* Educational Info Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#1C1C1C] border-l-2 border-[#C5A880] p-6 md:p-8 rounded-r-lg max-w-4xl mx-auto mb-16 shadow-xl relative overflow-hidden"
        >
          <div className="absolute right-4 top-4 text-[#C5A880]/10 pointer-events-none">
            <Sparkles className="w-24 h-24 stroke-[1]" />
          </div>
          <div className="flex gap-4 items-start relative z-10">
            <div className="p-2 bg-[#C5A880]/10 rounded text-[#C5A880] shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#F5F5F7] mb-2 font-medium">What is Flash?</h4>
              <p className="text-sm text-[#F5F5F7]/80 leading-relaxed font-light">
                Unlike custom tattoos where we spend weeks designing a concept from scratch, flash designs are pre-drawn illustrations that are ready to go. Booking a flash piece bypasses the custom design consultation, has a lower deposit requirement, and can usually be scheduled much faster. Once a design is claimed, it is permanently retired.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Live Filter UI */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#F5F5F7]/10 pb-6 mb-12 gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(['ALL', 'AVAILABLE', 'PENDING', 'TAKEN'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded ${
                  filter === status
                    ? 'bg-[#C5A880] text-[#121212] font-semibold shadow-md'
                    : 'border border-[#F5F5F7]/10 text-[#F5F5F7]/70 hover:text-[#F5F5F7] hover:border-[#C5A880]/40'
                }`}
              >
                {status === 'ALL' ? '[ All Works ]' : `[ ${status} ]`}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-[#F5F5F7]/50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8FA89B] animate-pulse"></span>
            Real-time Database Connection Active
          </div>
        </div>

        {/* Flash Catalog Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {filteredDesigns.map((design) => {
            const isAvailable = design.status === 'AVAILABLE';
            const isPending = design.status === 'PENDING';
            const isTaken = design.status === 'TAKEN';

            return (
              <motion.div
                key={design.id}
                variants={itemVariants}
                className={`group bg-[#1C1C1C] rounded-lg overflow-hidden border border-[#F5F5F7]/5 transition-all duration-500 hover:border-[#C5A880]/30 shadow-lg flex flex-col justify-between ${
                  isTaken ? 'opacity-60' : 'opacity-100'
                }`}
              >
                {/* Image Frame */}
                <div className="relative aspect-square overflow-hidden bg-[#121212] border-b border-[#F5F5F7]/5">
                  <img
                    src={design.image}
                    alt={design.title}
                    className={`w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 ${
                      isTaken ? 'opacity-30 blur-[1px]' : 'group-hover:grayscale-0'
                    }`}
                    loading="lazy"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    {isAvailable && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#8FA89B]/10 border border-[#8FA89B]/30 text-[#8FA89B] text-[10px] font-mono tracking-wider uppercase font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8FA89B]"></span>
                        AVAILABLE
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] font-mono tracking-wider uppercase font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
                        PENDING HOLD
                      </span>
                    )}
                    {isTaken && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#F5F5F7]/5 border border-[#F5F5F7]/10 text-[#F5F5F7]/40 text-[10px] font-mono tracking-wider uppercase font-semibold">
                        RETIRED
                      </span>
                    )}
                  </div>

                  {/* Dark Overlay for Taken Designs */}
                  {isTaken && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center z-10">
                      <Lock className="w-8 h-8 text-[#F5F5F7]/30 mb-2 stroke-[1.25]" />
                      <p className="font-serif text-lg text-[#F5F5F7]/50 italic">Claimed & Retired</p>
                      <p className="text-xs text-[#F5F5F7]/30 font-mono mt-1">Design Permanently Retired</p>
                    </div>
                  )}

                  {/* Interactive Details Trigger */}
                  {!isTaken && (
                    <button 
                      onClick={() => handleClaimInitiated(design)}
                      className="absolute bottom-4 right-4 p-2.5 rounded-full bg-[#121212]/90 border border-[#F5F5F7]/10 text-[#F5F5F7] hover:text-[#C5A880] hover:border-[#C5A880] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 duration-300 shadow-lg"
                      aria-label="View design details"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-serif text-xl font-light text-[#F5F5F7] group-hover:text-[#C5A880] transition-colors duration-300">
                        {design.title}
                      </h3>
                      <span className="font-mono text-base text-[#C5A880] font-medium shrink-0">
                        ${design.price}
                      </span>
                    </div>

                    <div className="space-y-2 mt-4 text-xs font-mono text-[#F5F5F7]/60">
                      <div className="flex items-center gap-2">
                        <Maximize className="w-3.5 h-3.5 text-[#C5A880]/60" />
                        <span>Size: {design.dimensions}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A880]/60 mt-0.5 shrink-0" />
                        <span>Flow: {design.placement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-[#F5F5F7]/5">
                    {isAvailable && (
                      <button
                        onClick={() => handleClaimInitiated(design)}
                        className="w-full py-3 px-4 text-center text-xs font-mono tracking-widest uppercase bg-transparent hover:bg-[#C5A880] text-[#C5A880] hover:text-[#121212] border border-[#C5A880]/40 hover:border-[#C5A880] rounded transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                      >
                        Claim This Design
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                    {isPending && (
                      <button
                        disabled
                        className="w-full py-3 px-4 text-center text-xs font-mono tracking-widest uppercase bg-[#1C1C1C] text-[#C5A880]/50 border border-[#C5A880]/10 rounded cursor-not-allowed font-medium flex items-center justify-center gap-2"
                      >
                        <Clock className="w-4 h-4 animate-pulse" />
                        Temporarily Held
                      </button>
                    )}
                    {isTaken && (
                      <button
                        disabled
                        className="w-full py-3 px-4 text-center text-xs font-mono tracking-widest uppercase bg-transparent text-[#F5F5F7]/20 border border-[#F5F5F7]/5 rounded cursor-not-allowed font-medium flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Claimed & Retired
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Notification Toast */}
        <AnimatePresence>
          {claimedId && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1C1C1C] border border-[#8FA89B] text-[#F5F5F7] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-md w-full mx-4"
            >
              <div className="p-1.5 bg-[#8FA89B]/10 text-[#8FA89B] rounded-full">
                <Check className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">Design {claimedId} Selected!</p>
                <p className="text-xs text-[#F5F5F7]/60 font-light">Navigating to intake form to secure booking...</p>
              </div>
              <button 
                onClick={() => setClaimedId(null)}
                className="text-[#F5F5F7]/40 hover:text-[#F5F5F7] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail Modal / Slide-over */}
        <AnimatePresence>
          {selectedDesign && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-[#1C1C1C] border border-[#C5A880]/30 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
              >
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-[#F5F5F7]/80 hover:text-[#F5F5F7] hover:bg-black/90 transition-all border border-[#F5F5F7]/10"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Side: High-res visual */}
                <div className="md:w-1/2 relative aspect-square md:aspect-auto bg-[#121212]">
                  <img
                    src={selectedDesign.image}
                    alt={selectedDesign.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none md:hidden" />
                </div>

                {/* Right Side: Metadata & Booking info */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase block mb-1">
                      {selectedDesign.id}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#F5F5F7] mb-4">
                      {selectedDesign.title}
                    </h3>
                    
                    <p className="text-sm text-[#F5F5F7]/70 font-light leading-relaxed mb-6">
                      {selectedDesign.description}
                    </p>

                    <div className="space-y-3 font-mono text-xs text-[#F5F5F7]/80 bg-[#121212] p-4 rounded border border-[#F5F5F7]/5">
                      <div className="flex justify-between border-b border-[#F5F5F7]/5 pb-2">
                        <span className="text-[#F5F5F7]/50">DIMENSIONS:</span>
                        <span className="text-[#F5F5F7] font-medium">{selectedDesign.dimensions}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#F5F5F7]/5 pb-2">
                        <span className="text-[#F5F5F7]/50">PLACEMENT:</span>
                        <span className="text-[#F5F5F7] font-medium">{selectedDesign.placement}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#F5F5F7]/5 pb-2">
                        <span className="text-[#F5F5F7]/50">FLAT RATE PRICE:</span>
                        <span className="text-[#C5A880] font-semibold">${selectedDesign.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#F5F5F7]/50">REQUIRED DEPOSIT:</span>
                        <span className="text-[#8FA89B] font-semibold">$100 (Deducted)</span>
                      </div>
                    </div>

                    {/* Policy Note Link */}
                    <p className="text-[10px] text-[#F5F5F7]/40 mt-3 italic leading-normal">
                      Deposits are non-refundable and lock your session date. Please review our{' '}
                      <a href="#booking-policies" onClick={() => setSelectedDesign(null)} className="text-[#C5A880] underline hover:text-[#C5A880]/80">
                        Booking Policies
                      </a>{' '}
                      before claiming.
                    </p>
                  </div>

                  {/* Modal Action CTA */}
                  <div className="mt-8">
                    <button
                      onClick={() => handleConfirmClaim(selectedDesign.id)}
                      className="w-full py-3.5 px-4 text-center text-xs font-mono tracking-widest uppercase bg-[#C5A880] text-[#121212] hover:bg-[#F5F5F7] transition-colors duration-300 font-bold flex items-center justify-center gap-2 shadow-lg"
                    >
                      Confirm Selection & Claim Design
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
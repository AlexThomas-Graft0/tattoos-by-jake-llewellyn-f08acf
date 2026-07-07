'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Menu, X, Calendar, ArrowRight, ShieldCheck, Clock, Sparkles, Sliders } from 'lucide-react';

export function HeroHeader() {
  const [isBooksOpen, setIsBooksOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 16,
      },
    },
  };

  const bannerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <header id="hero-header" className="relative min-h-screen w-full bg-[#121212] text-[#F5F5F7] overflow-hidden flex flex-col justify-between selection:bg-[#C5A880]/30 selection:text-white">
      
      {/* 1. Global Announcement & Status Banner */}
      <motion.div 
        variants={bannerVariants}
        initial="hidden"
        animate="visible"
        className="z-50 w-full bg-[#121212] border-b border-[#C5A880]/30 py-2.5 px-4 text-center text-xs md:text-sm relative"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4">
          <div className="flex items-center gap-2 font-mono tracking-wider uppercase text-[10px] md:text-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isBooksOpen ? 'bg-[#8FA89B]' : 'bg-[#C5A880]'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isBooksOpen ? 'bg-[#8FA89B]' : 'bg-[#C5A880]'}`}></span>
            </span>
            <span>Studio Status:</span>
          </div>

          <div className="font-sans text-[#F5F5F7]/90 text-xs md:text-sm">
            {isBooksOpen ? (
              <span>
                Books are currently open for winter custom projects and select flash designs.{' '}
                <a href="#intake-form" className="underline underline-offset-4 decoration-[#C5A880] hover:text-white transition-colors">
                  Request your session below.
                </a>
              </span>
            ) : (
              <span>
                Books are currently closed. Custom project waitlist is open for Spring.{' '}
                <a href="#intake-form" className="underline underline-offset-4 decoration-[#C5A880] hover:text-white transition-colors">
                  Join the waitlist.
                </a>
              </span>
            )}
          </div>

          {/* Interactive Toggle for Demo Showcase */}
          <button 
            onClick={() => setIsBooksOpen(!isBooksOpen)}
            className="sm:absolute sm:right-4 text-[9px] font-mono uppercase tracking-widest text-[#C5A880] bg-[#1C1C1C] border border-[#C5A880]/20 px-2 py-0.5 rounded hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300 flex items-center gap-1 mt-1 sm:mt-0"
            title="Toggle status to preview database state transitions"
          >
            <Sliders className="w-2.5 h-2.5" />
            <span>Simulate DB Toggle</span>
          </button>
        </div>
      </motion.div>

      {/* 2. Navigation Bar */}
      <nav className={`fixed top-[45px] sm:top-[37px] left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-[#121212]/95 backdrop-blur-md py-4 border-b border-[#C5A880]/10 shadow-lg' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logotype */}
          <a href="#hero-header" className="group flex flex-col">
            <span className="font-serif text-xl md:text-2xl font-light tracking-tight text-[#F5F5F7] group-hover:text-[#C5A880] transition-colors duration-300">
              jake llewellyn.
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#C5A880] uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              fine-line &amp; blackwork
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
            <a href="#portfolio-gallery" className="text-[#F5F5F7]/80 hover:text-[#C5A880] transition-colors duration-300 lowercase">
              portfolio
            </a>
            <a href="#flash-catalog" className="text-[#F5F5F7]/80 hover:text-[#C5A880] transition-colors duration-300 lowercase">
              flash designs
            </a>
            <a href="#booking-policies" className="text-[#F5F5F7]/80 hover:text-[#C5A880] transition-colors duration-300 lowercase">
              booking info
            </a>
            <a href="#about-and-studio" className="text-[#F5F5F7]/80 hover:text-[#C5A880] transition-colors duration-300 lowercase">
              about the studio
            </a>
          </div>

          {/* Primary Action Button */}
          <div className="hidden md:block">
            <a 
              href="#intake-form"
              className="inline-block font-mono text-xs uppercase tracking-widest border border-[#C5A880] text-[#F5F5F7] hover:text-[#121212] hover:bg-[#C5A880] px-6 py-3 transition-all duration-300"
            >
              {isBooksOpen ? 'book an appointment' : 'join waitlist'}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F5F5F7] hover:text-[#C5A880] transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[88px] left-0 right-0 bottom-0 bg-[#121212] z-30 px-8 py-12 flex flex-col justify-between border-t border-[#C5A880]/10 md:hidden"
          >
            <div className="flex flex-col gap-8 font-serif text-2xl tracking-wide">
              <a 
                href="#portfolio-gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F5F5F7] hover:text-[#C5A880] transition-colors"
              >
                portfolio
              </a>
              <a 
                href="#flash-catalog" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F5F5F7] hover:text-[#C5A880] transition-colors"
              >
                flash designs
              </a>
              <a 
                href="#booking-policies" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F5F5F7] hover:text-[#C5A880] transition-colors"
              >
                booking info
              </a>
              <a 
                href="#about-and-studio" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F5F5F7] hover:text-[#C5A880] transition-colors"
              >
                about the studio
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <a 
                href="#intake-form"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center font-mono text-sm uppercase tracking-widest bg-[#C5A880] text-[#121212] font-semibold py-4 hover:bg-white transition-colors"
              >
                {isBooksOpen ? 'book an appointment' : 'join waitlist'}
              </a>
              <p className="text-center font-mono text-[10px] text-[#F5F5F7]/40 tracking-wider">
                © 2026 TATTOOS BY JAKE LLEWELLYN. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hero Section & Background Visual */}
      <div className="relative flex-grow flex items-center justify-center pt-32 pb-16 md:py-24 px-6 md:px-12">
        
        {/* Background Image with Radial Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-[#121212]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125 brightness-75 scale-105"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=2000&q=80')` 
            }}
          />
          {/* Radial Overlay to ensure maximum contrast & readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/85 to-[#121212]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,18,18,0)_10%,rgba(18,18,18,0.95)_100%)]" />
        </div>

        {/* Hero Content Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Core Positioning Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Tagline / Sub-badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="h-[1px] w-8 bg-[#C5A880]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium">
                fine-line &amp; illustrative blackwork
              </span>
            </motion.div>

            {/* Core Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F7] leading-[1.1] mb-6 lowercase"
            >
              fine-line and illustrative blackwork <span className="italic text-[#C5A880]">built to age beautifully.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p 
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-[#F5F5F7]/80 leading-relaxed font-light max-w-2xl mb-8"
            >
              A collaborative, structured, and safe tattoo experience in a private, clinical-grade studio. Your design is custom-drawn, technically optimized for your anatomy, and applied to last.
            </motion.p>

            {/* Call To Actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <a 
                href="#intake-form"
                className="group flex items-center justify-center gap-3 bg-[#C5A880] text-[#121212] font-semibold font-mono text-xs uppercase tracking-widest py-4 px-8 border border-[#C5A880] hover:bg-transparent hover:text-[#C5A880] transition-all duration-300"
              >
                <span>{isBooksOpen ? 'Request a Booking' : 'Join Priority Waitlist'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a 
                href="#flash-catalog"
                className="flex items-center justify-center gap-2 border border-[#F5F5F7]/20 text-[#F5F5F7] font-mono text-xs uppercase tracking-widest py-4 px-8 hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-300"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Available Flash</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Booking Status Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md bg-[#1C1C1C]/90 backdrop-blur-md border border-[#C5A880]/30 p-8 shadow-2xl relative overflow-hidden group">
              
              {/* Subtle top bar accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#C5A880]" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C5A880]/10">
                <span className="font-mono text-[10px] tracking-widest text-[#F5F5F7]/60 uppercase">
                  CURRENT BOOKING STATUS
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider ${
                  isBooksOpen ? 'bg-[#8FA89B]/10 text-[#8FA89B]' : 'bg-[#C5A880]/10 text-[#C5A880]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isBooksOpen ? 'bg-[#8FA89B]' : 'bg-[#C5A880]'}`} />
                  {isBooksOpen ? 'Books Open' : 'Books Closed'}
                </span>
              </div>

              {/* Status Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <Calendar className="w-4.5 h-4.5 text-[#C5A880]" />
                    </div>
                    <div>
                      <p className="font-serif text-lg font-light text-[#F5F5F7] leading-tight">
                        {isBooksOpen 
                          ? 'Books are OPEN for custom illustrative blackwork.' 
                          : 'Books are CLOSED. Accepting priority waitlist.'
                        }
                      </p>
                      <p className="font-sans text-xs text-[#F5F5F7]/60 mt-1">
                        {isBooksOpen 
                          ? 'Winter custom projects & select flash designs.' 
                          : 'Custom project schedule is full for this quarter.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#C5A880]/10">
                  <div className="flex gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-mono text-[11px] tracking-wider text-[#C5A880] uppercase">
                        Current Focus
                      </h4>
                      <p className="font-sans text-xs text-[#F5F5F7]/80 mt-1 leading-relaxed">
                        Large-scale botanical illustrations, fine-line micro-detail, and blackwork geometry.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-mono text-[11px] tracking-wider text-[#C5A880] uppercase">
                        Response Time
                      </h4>
                      <p className="font-sans text-xs text-[#F5F5F7]/80 mt-1 leading-relaxed">
                        Active requests are reviewed and answered within 3-5 business days. Thank you for your patience and trust.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant CTA inside card */}
                <a 
                  href="#intake-form" 
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-transparent hover:bg-[#C5A880]/5 border border-[#C5A880]/50 text-[#C5A880] hover:text-white font-mono text-xs uppercase tracking-widest py-3.5 transition-all duration-300"
                >
                  <span>{isBooksOpen ? 'Submit Proposal' : 'Join Waitlist'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Decorative bottom element */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-8 z-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#C5A880]/10 pt-6">
        <div className="flex items-center gap-6 font-mono text-[10px] tracking-widest text-[#F5F5F7]/50 uppercase">
          <span>01 / INTRODUCTION</span>
          <span className="h-[1px] w-8 bg-[#C5A880]/30" />
          <span>FINE-LINE / ILLUSTRATIVE</span>
        </div>
        <div className="font-mono text-[10px] tracking-widest text-[#F5F5F7]/50 uppercase">
          <span>PRIVATE CLINICAL STUDIO — BY APPOINTMENT ONLY</span>
        </div>
      </div>

    </header>
  );
}
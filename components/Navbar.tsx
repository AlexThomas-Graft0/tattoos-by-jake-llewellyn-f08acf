'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

export function Navbar() {
  const [isBooksOpen, setIsBooksOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Track scroll position to update header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'portfolio', href: '#portfolio-gallery' },
    { label: 'flash designs', href: '#flash-catalog' },
    { label: 'booking info', href: '#booking-policies' },
    { label: 'about the studio', href: '#about-and-studio' },
  ];

  // Framer Motion Variants with explicit typing to prevent build errors
  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants: Variants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full select-none">
      {/* Dynamic Announcement Banner */}
      <div className="relative w-full bg-[#121212] border-b border-[#C5A880]/20 px-4 py-2.5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          {/* Status Indicator & Text */}
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 transition-colors duration-500 ${
                  isBooksOpen ? 'bg-[#8FA89B]' : 'bg-[#C5A880]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 ${
                  isBooksOpen ? 'bg-[#8FA89B]' : 'bg-[#C5A880]'
                }`}
              />
            </span>
            <p className="font-sans text-xs tracking-wider text-[#F5F5F7] font-light">
              {isBooksOpen ? (
                <>
                  Books are currently{' '}
                  <span className="text-[#8FA89B] font-medium">open</span> for
                  winter custom projects and select flash designs. Request your
                  session below.
                </>
              ) : (
                <>
                  Books are currently{' '}
                  <span className="text-[#C5A880] font-medium">closed</span>.
                  Custom project waitlist is open for Spring. Join the waitlist.
                </>
              )}
            </p>
          </div>

          {/* Interactive Toggle for Status Simulation */}
          <button
            onClick={() => setIsBooksOpen(!isBooksOpen)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#C5A880]/10 hover:border-[#C5A880]/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
            aria-label="Toggle Booking Status Simulation"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880]">
              Simulate Status
            </span>
            <svg
              className="w-2.5 h-2.5 text-[#C5A880]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#121212]/95 backdrop-blur-md py-4 border-white/[0.08]'
            : 'bg-[#121212]/90 backdrop-blur-sm py-5 border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Logotype */}
            <a
              href="#hero-header"
              className="group flex items-center focus-visible:ring-1 focus-visible:ring-[#C5A880] focus-visible:outline-none rounded-sm px-1 py-0.5"
            >
              <span className="font-serif text-xl md:text-2xl font-light tracking-wide text-[#F5F5F7] transition-colors duration-300 group-hover:text-[#C5A880]">
                jake llewellyn<span className="text-[#C5A880]">.</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-sans text-xs tracking-widest text-[#F5F5F7]/80 hover:text-[#C5A880] uppercase transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-[#C5A880] focus-visible:outline-none rounded-sm py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA & Mobile Hamburger */}
            <div className="flex items-center space-x-4">
              {/* Primary Call to Action Button */}
              <a
                href="#intake-form"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 border border-[#C5A880] bg-transparent text-[#C5A880] font-sans text-xs uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] focus-visible:ring-[#C5A880] focus-visible:outline-none"
              >
                {isBooksOpen ? 'book an appointment' : 'join waitlist'}
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center p-2 rounded-md text-[#F5F5F7] hover:text-[#C5A880] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current transition-opacity duration-200 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="absolute left-0 right-0 top-full bg-[#121212] border-b border-white/[0.08] shadow-2xl md:hidden overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-4">
                {navItems.map((item) => (
                  <motion.div key={item.href} variants={mobileItemVariants}>
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block font-sans text-sm tracking-widest text-[#F5F5F7] hover:text-[#C5A880] uppercase py-2 transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div variants={mobileItemVariants} className="pt-2">
                  <a
                    href="#intake-form"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 border border-[#C5A880] text-[#C5A880] bg-transparent font-sans text-xs uppercase tracking-widest hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300"
                  >
                    {isBooksOpen ? 'book an appointment' : 'join waitlist'}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
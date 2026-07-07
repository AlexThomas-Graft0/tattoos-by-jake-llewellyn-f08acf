'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { label: 'portfolio', href: '#portfolio-gallery' },
  { label: 'flash designs', href: '#flash-catalog' },
  { label: 'booking info', href: '#booking-policies' },
  { label: 'about the studio', href: '#about-and-studio' },
  { label: 'contact', href: '#intake-form' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 25, stiffness: 350 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export function Footer() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(true);
  const [announcementText, setAnnouncementText] = useState(
    'Books are currently open for winter custom projects and select flash designs. Request your session below.'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
  };

  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector('#hero-header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#121212] text-[#F5F5F7] border-t border-[#C5A880]/15 overflow-hidden">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(197,168,128,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-zinc-800/60"
        >
          {/* Logo & Narrative Column */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-6">
            <a
              href="#hero-header"
              className="inline-block text-2xl md:text-3xl font-serif tracking-tight text-[#F5F5F7] hover:text-[#C5A880] transition-colors duration-300"
            >
              jake llewellyn.
            </a>
            <p className="text-zinc-400 font-sans text-sm leading-relaxed max-w-sm">
              Precision in ink, safety in practice. A professional, private clinical-grade studio dedicated to custom illustrative blackwork and fine-line geometry built to age beautifully.
            </p>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#C5A880]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8FA89B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8FA89B]"></span>
              </span>
              <span className="tracking-wider uppercase">Books Open for Winter</span>
            </div>
          </motion.div>

          {/* Navigation Links Column */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-sans lowercase text-zinc-400 hover:text-[#C5A880] transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Studio Details / Contact Column */}
          <motion.div variants={itemVariants} className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Studio & Travel</h4>
            <div className="space-y-3 font-sans text-sm text-zinc-400">
              <p>
                <span className="text-[#F5F5F7]">Arts District, Suite 402</span>
                <br />
                Los Angeles, CA • By Appointment Only
              </p>
              <p>
                Tuesday – Saturday
                <br />
                11:00 AM – 7:00 PM
              </p>
              <p className="pt-2">
                <a
                  href="mailto:studio@jake-llewellyn-tattoo.com"
                  className="text-xs font-mono text-[#C5A880] hover:underline"
                >
                  studio@jake-llewellyn-tattoo.com
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <p className="text-xs font-sans text-zinc-500">
              © 2026 Tattoos by Jake Llewellyn. All rights reserved.
            </p>
            <p className="text-[11px] font-sans text-zinc-600 max-w-md">
              All designs are original property and may not be reproduced or copied without direct written consent.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs font-mono text-zinc-500 hover:text-[#C5A880] transition-colors duration-200 uppercase tracking-widest bg-zinc-900/50 hover:bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800"
            >
              [ Admin Login ]
            </button>

            <button
              onClick={handleScrollToTop}
              className="flex items-center justify-center p-2 rounded-full border border-zinc-800 text-zinc-400 hover:text-[#C5A880] hover:border-[#C5A880] transition-all duration-300 group"
              aria-label="Back to top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform duration-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Panel Modal Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-lg bg-[#1C1C1C] border border-[#C5A880]/30 rounded-lg shadow-2xl p-6 md:p-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAdminOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-[#F5F5F7] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-1">
                    System Administration
                  </span>
                  <h3 className="text-xl font-serif text-[#F5F5F7]">Global Settings Panel</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Update client-facing booking availability and dynamic site components in real-time.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-5">
                  {/* Toggle Booking Status */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                      Booking Availability Status
                    </label>
                    <div className="flex items-center space-x-4 p-3 bg-zinc-900/80 rounded border border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setBookingOpen(!bookingOpen)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          bookingOpen ? 'bg-[#8FA89B]' : 'bg-zinc-700'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            bookingOpen ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <span className="text-sm font-sans text-zinc-300">
                        Books are currently{' '}
                        <strong className={bookingOpen ? 'text-[#8FA89B]' : 'text-[#C5A880]'}>
                          {bookingOpen ? 'OPEN (State A)' : 'CLOSED / WAITLIST (State B)'}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Announcement Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                      Announcement Banner Text
                    </label>
                    <textarea
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      rows={3}
                      className="w-full bg-zinc-900/80 border border-zinc-800 rounded p-3 text-sm text-zinc-200 focus:outline-none focus:border-[#C5A880] transition-colors duration-200 resize-none font-sans"
                      placeholder="Enter announcement text shown at the absolute top of the site..."
                    />
                  </div>

                  {/* Status Indicator Details Preview */}
                  <div className="text-xs text-zinc-500 space-y-1 bg-zinc-900/30 p-3 rounded border border-zinc-800/40">
                    <span className="font-mono text-[#C5A880] block mb-1">Live Preview:</span>
                    <p className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          bookingOpen ? 'bg-[#8FA89B] animate-pulse' : 'bg-[#C5A880] animate-pulse'
                        }`}
                      />
                      <span className="italic">"{announcementText}"</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAdminOpen(false)}
                      className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="relative bg-[#C5A880] hover:bg-[#b4966e] text-[#121212] text-xs font-mono uppercase tracking-wider px-6 py-2.5 rounded font-bold transition-all duration-200 disabled:opacity-50"
                    >
                      {isSaving ? 'Saving Changes...' : 'Save Settings'}
                    </button>
                  </div>
                </form>

                {/* Success Message */}
                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-[#8FA89B]/10 border border-[#8FA89B]/30 rounded p-3 text-center"
                    >
                      <p className="text-xs font-sans text-[#8FA89B]">
                        ✓ Settings updated successfully. Real-time announcement states deployed.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
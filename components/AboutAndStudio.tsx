'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

// Hardcoded static data for the travel calendar as requested in the blueprint
interface TravelSpot {
  location: string;
  venue: string;
  dates: string;
  status: 'CLOSED' | 'OPEN' | 'WAITLIST';
  statusLabel: string;
}

const travelCalendar: TravelSpot[] = [
  {
    location: 'New York City, NY',
    venue: 'Sacred Tattoo',
    dates: 'Oct 12 – Oct 15',
    status: 'CLOSED',
    statusLabel: 'BOOKS CLOSED (Fully Booked)',
  },
  {
    location: 'London, UK',
    venue: 'Seven Doors Tattoo',
    dates: 'Nov 20 – Nov 24',
    status: 'OPEN',
    statusLabel: 'BOOKS OPEN (Limited Spots)',
  },
  {
    location: 'Los Angeles, CA',
    venue: 'Private Studio (LA Arts)',
    dates: 'Jan 15 – Jan 18',
    status: 'WAITLIST',
    statusLabel: 'WAITLIST ONLY',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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
      stiffness: 70,
      damping: 18,
    },
  },
};

export function AboutAndStudio() {
  const [activeTab, setActiveTab] = useState<'clinical' | 'inclusivity'>('clinical');

  return (
    <section
      id="about-and-studio"
      className="relative py-24 md:py-32 bg-[#121212] text-[#F5F5F7] overflow-hidden border-t border-[#1C1C1C]"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8FA89B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 6.1: Biography & Artistic Philosophy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28"
        >
          {/* Left Column: Portrait */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative group">
            <div className="absolute inset-0 border border-[#C5A880] translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="relative h-[480px] sm:h-[600px] w-full overflow-hidden bg-[#1C1C1C]">
              <img
                src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800"
                alt="Jake Llewellyn crafting a detailed blackwork tattoo in his private studio"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-xs tracking-[0.3em] text-[#C5A880] uppercase mb-3 block">
              about the artist
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#F5F5F7] leading-tight mb-6">
              precision in ink,<br />safety in practice.
            </h2>
            <h3 className="text-lg sm:text-xl font-sans font-normal text-[#C5A880] mb-8 max-w-2xl leading-relaxed">
              A professional space dedicated to modern tattooing, free from intimidation.
            </h3>
            
            <div className="space-y-6 text-[#F5F5F7]/80 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
              <p>
                For over a decade, I have dedicated myself to the craft of applying permanent art to skin. My journey began with a deep fascination for classical printmaking, copperplate engraving, and botanical illustration. Over the years, I translated those traditional medium techniques into a highly precise, fine-line, and illustrative blackwork tattoo style.
              </p>
              <p>
                I believe that a tattoo studio should be a welcoming, clean, and collaborative space. The historical gatekeeping of the tattoo industry has no place here. Every client who sits in my chair—whether it is their first small tattoo or their tenth full-day session—is treated with the utmost respect, patience, and professional care. We work together to create art that you will wear proudly for the rest of your life.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#intake-form"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#C5A880] bg-[#C5A880] text-[#121212] hover:bg-transparent hover:text-[#C5A880] transition-all duration-300 font-sans text-sm tracking-wider uppercase font-semibold"
              >
                Request a Session
              </a>
              <a
                href="#booking-policies"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#F5F5F7]/20 hover:border-[#C5A880] text-[#F5F5F7] transition-all duration-300 font-sans text-sm tracking-wider uppercase"
              >
                View Policies
              </a>
            </div>
          </motion.div>
        </motion.div>


        {/* SECTION 6.2: Clean Room Standards & Inclusivity Commitment */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-28"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs tracking-[0.3em] text-[#8FA89B] uppercase mb-3 block">
              studio environment
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#F5F5F7] mb-4">
              Uncompromising Standards
            </h2>
            <p className="text-[#F5F5F7]/60 text-sm sm:text-base max-w-xl mx-auto">
              Operating a private, clinical-grade space designed to prioritize your physical safety, peace of mind, and complete comfort.
            </p>

            {/* Interactive Tab Controls for Mobile/Desktop view toggle */}
            <div className="flex justify-center mt-8 p-1 bg-[#1C1C1C] rounded-lg max-w-xs mx-auto border border-white/5">
              <button
                onClick={() => setActiveTab('clinical')}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-mono rounded transition-all duration-200 ${
                  activeTab === 'clinical'
                    ? 'bg-[#C5A880] text-[#121212] font-semibold'
                    : 'text-[#F5F5F7]/60 hover:text-[#F5F5F7]'
                }`}
              >
                Clinical Safety
              </button>
              <button
                onClick={() => setActiveTab('inclusivity')}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-mono rounded transition-all duration-200 ${
                  activeTab === 'inclusivity'
                    ? 'bg-[#C5A880] text-[#121212] font-semibold'
                    : 'text-[#F5F5F7]/60 hover:text-[#F5F5F7]'
                }`}
              >
                Inclusivity
              </button>
            </div>
          </motion.div>

          {/* Grid Layout (Switches dynamically or displays as grid on large screens) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Column 1: Clinical Safety Standards */}
            <div
              className={`bg-[#1C1C1C] p-8 md:p-10 border border-white/5 transition-all duration-300 hover:border-[#C5A880]/30 rounded-lg ${
                activeTab === 'clinical' ? 'ring-1 ring-[#C5A880]/30' : 'opacity-40 lg:opacity-100'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#C5A880]/10 rounded-full text-[#C5A880]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F5F5F7]">sterile & safe.</h3>
              </div>
              <ul className="space-y-6 text-[#F5F5F7]/80 text-sm sm:text-base">
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <strong className="text-[#C5A880] block font-mono text-xs uppercase tracking-wider mb-1">Disposable-Only System</strong>
                  We use pre-sterilized, single-use needle cartridges and disposable grips. Absolutely zero components are re-used between clients.
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <strong className="text-[#C5A880] block font-mono text-xs uppercase tracking-wider mb-1">Autoclave & Chemical Sterilization</strong>
                  All working surfaces, lamps, and chairs are wrapped in single-use protective barriers and sanitized with hospital-grade, EPA-registered tuberculocidal disinfectants before and after every session.
                </li>
                <li>
                  <strong className="text-[#C5A880] block font-mono text-xs uppercase tracking-wider mb-1">Certified Training</strong>
                  I maintain active, up-to-date certifications in Bloodborne Pathogens (BBP), First Aid, and CPR.
                </li>
              </ul>
            </div>

            {/* Column 2: Inclusivity & Bodily Autonomy */}
            <div
              className={`bg-[#1C1C1C] p-8 md:p-10 border border-white/5 transition-all duration-300 hover:border-[#C5A880]/30 rounded-lg ${
                activeTab === 'inclusivity' ? 'ring-1 ring-[#C5A880]/30' : 'opacity-40 lg:opacity-100'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#8FA89B]/10 rounded-full text-[#8FA89B]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F5F5F7]">a safe space for every body.</h3>
              </div>
              <ul className="space-y-6 text-[#F5F5F7]/80 text-sm sm:text-base">
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <strong className="text-[#8FA89B] block font-mono text-xs uppercase tracking-wider mb-1">All Skin Tones</strong>
                  Illustrative blackwork and fine-line look beautiful on all skin tones. I am experienced in adjusting ink density, needle depth, and contrast to ensure your tattoo heals cleanly and vibrantly on your specific skin.
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <strong className="text-[#8FA89B] block font-mono text-xs uppercase tracking-wider mb-1">Privacy Screens</strong>
                  If your tattoo placement requires you to undress or if you simply prefer a quiet, private environment, full physical privacy screens are available upon request.
                </li>
                <li>
                  <strong className="text-[#8FA89B] block font-mono text-xs uppercase tracking-wider mb-1">Respect & Comfort</strong>
                  Your bodily autonomy is paramount. You can ask to pause, stretch, use the restroom, or stop the session at any moment. No pressure, no judgment.
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>


        {/* SECTION 7.1 & 7.2: Contact, Location & Travel Calendar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-white/5"
        >
          {/* Left Side: Location Details */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] text-[#C5A880] uppercase mb-3 block">
                the workspace
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#F5F5F7] mb-4">
                find the studio.
              </h2>
              <p className="text-[#F5F5F7]/70 text-sm sm:text-base leading-relaxed">
                Located in a quiet, private studio space designed for comfort and focus.
              </p>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base">
              <div>
                <span className="text-[#C5A880] font-mono text-xs uppercase tracking-wider block mb-1">General Area</span>
                <p className="text-[#F5F5F7]/90 font-light">
                  Arts District, Suite 402 <br />
                  <span className="text-xs text-[#F5F5F7]/50 italic">
                    (Exact address, door codes, and parking directions are emailed directly upon booking confirmation).
                  </span>
                </p>
              </div>
              <div>
                <span className="text-[#C5A880] font-mono text-xs uppercase tracking-wider block mb-1">Studio Hours</span>
                <p className="text-[#F5F5F7]/90 font-light">Tuesday through Saturday, 11:00 AM – 7:00 PM</p>
                <p className="text-xs text-[#F5F5F7]/50 italic">(By appointment only. No walk-ins accepted).</p>
              </div>
              <div>
                <span className="text-[#C5A880] font-mono text-xs uppercase tracking-wider block mb-1">General Inquiry Email</span>
                <p className="text-[#F5F5F7]/90 font-mono text-xs select-all">studio@jake-llewellyn-tattoo.com</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Travel Calendar */}
          <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] text-[#C5A880] uppercase mb-3 block">
                guest spots & touring
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#F5F5F7] mb-6">
                Travel Calendar
              </h2>
              
              {/* Responsive Table for Desktop & Stacked List for Mobile */}
              <div className="hidden md:block overflow-hidden border border-white/5 rounded-lg bg-[#1C1C1C]">
                <table className="min-w-full divide-y divide-white/5 font-sans">
                  <thead>
                    <tr className="bg-black/20 text-left text-xs uppercase tracking-wider text-[#C5A880] font-mono">
                      <th className="px-6 py-4 font-semibold">Location / City</th>
                      <th className="px-6 py-4 font-semibold">Venue / Studio</th>
                      <th className="px-6 py-4 font-semibold">Dates</th>
                      <th className="px-6 py-4 font-semibold text-right">Booking Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {travelCalendar.map((spot) => (
                      <tr key={spot.location} className="hover:bg-white/[0.02] transition-colors duration-150">
                        <td className="px-6 py-4 font-medium text-[#F5F5F7]">{spot.location}</td>
                        <td className="px-6 py-4 text-[#F5F5F7]/70 font-light">{spot.venue}</td>
                        <td className="px-6 py-4 text-[#F5F5F7]/70 font-mono text-xs">{spot.dates}</td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase border ${
                              spot.status === 'OPEN'
                                ? 'bg-[#8FA89B]/10 text-[#8FA89B] border-[#8FA89B]/20'
                                : spot.status === 'WAITLIST'
                                ? 'bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/20'
                                : 'bg-white/5 text-[#F5F5F7]/40 border-white/5'
                            }`}
                          >
                            {spot.statusLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Travel List */}
              <div className="md:hidden space-y-4">
                {travelCalendar.map((spot) => (
                  <div key={spot.location} className="p-5 bg-[#1C1C1C] border border-white/5 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-base text-[#F5F5F7]">{spot.location}</h4>
                        <p className="text-sm text-[#F5F5F7]/60">{spot.venue}</p>
                      </div>
                      <span className="text-xs font-mono text-[#C5A880]">{spot.dates}</span>
                    </div>
                    <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs text-[#F5F5F7]/40 uppercase tracking-wider font-mono">Status</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-wider uppercase border ${
                          spot.status === 'OPEN'
                            ? 'bg-[#8FA89B]/10 text-[#8FA89B] border-[#8FA89B]/20'
                            : spot.status === 'WAITLIST'
                            ? 'bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/20'
                            : 'bg-white/5 text-[#F5F5F7]/40 border-white/5'
                        }`}
                      >
                        {spot.statusLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel CTA */}
            <div className="mt-8 p-6 bg-[#C5A880]/5 border border-[#C5A880]/20 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-sans text-[#F5F5F7]/90 font-light">
                  Planning to collect a piece during a guest spot? Slots are highly limited.
                </p>
              </div>
              <a
                href="#intake-form"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#C5A880] text-[#121212] hover:bg-transparent hover:text-[#C5A880] border border-[#C5A880] transition-all duration-300 font-sans text-xs tracking-wider uppercase font-semibold"
              >
                Request a Travel Booking
              </a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
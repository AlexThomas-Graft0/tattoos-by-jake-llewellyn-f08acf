'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  DollarSign, 
  ShieldCheck, 
  AlertCircle, 
  ChevronDown, 
  ArrowUpRight, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How should I care for my new tattoo? (Aftercare instructions)",
    answer: "We will apply a medical-grade, waterproof adhesive barrier (Saniderm) over your new tattoo before you leave. Keep this barrier on for 3 to 5 days as instructed. Once removed gently under warm running water, wash the tattoo with a fragrance-free, antibacterial soap. Pat dry with a clean paper towel and apply a very thin layer of unscented, water-based lotion (such as Lubriderm) 2-3 times daily. Avoid swimming, hot tubs, direct sun exposure, and picking or scratching the peeling skin for at least 2 to 3 weeks."
  },
  {
    question: "Do you do freehand work or cover-ups?",
    answer: "I accept select cover-up and scarring integration projects depending on the size, age, and darkness of the existing tattoo. These projects always require an in-person consultation prior to booking. Freehand work is reserved for specific abstract floral or organic flow designs, which we will discuss during your consultation."
  },
  {
    question: "What should I do if I need a touch-up?",
    answer: "I offer one complimentary touch-up session within the first 6 months of your tattoo application to ensure the piece settled perfectly. Touch-ups due to poor aftercare, sun damage, or neglect will be billed at my standard hourly rate. Please email photos of your healed tattoo to request a touch-up."
  },
  {
    question: "Are your inks vegan and cruelty-free?",
    answer: "Yes, absolutely. All pigments, stencils, lubricants, and aftercare products used in the studio are 100% vegan, cruelty-free, and free from animal-derived ingredients. We source our supplies from industry-leading manufacturers who adhere to strict environmental and ethical standards."
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

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 60, damping: 15 }
  }
};

export function BookingPolicies() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section 
      id="booking-policies" 
      className="relative py-24 md:py-32 bg-[#121212] text-[#F5F5F7] overflow-hidden border-b border-[#C5A880]/10"
    >
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8FA89B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24 pb-12 border-b border-[#F5F5F7]/10"
        >
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="font-mono text-xs tracking-widest text-[#C5A880] uppercase">studio guidelines</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white mb-6"
            >
              expectations, pricing, &amp; policies.
            </motion.h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <motion.p 
              variants={itemVariants} 
              className="text-lg text-[#F5F5F7]/80 font-light leading-relaxed mb-6"
            >
              A successful tattoo requires clear guidelines. Please read through these policies carefully before submitting a booking request.
            </motion.p>
            <motion.div variants={itemVariants}>
              <a 
                href="#intake-form" 
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors duration-300 group"
              >
                Skip straight to intake form
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* 3-Column Pricing & Policies Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24"
        >
          {/* Pricing Structure */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-[#1C1C1C] border border-[#F5F5F7]/5 hover:border-[#C5A880]/30 transition-all duration-500 rounded-lg p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center mb-6 text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#121212] transition-all duration-300">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-6">transparent pricing.</h3>
              <ul className="space-y-6 text-[#F5F5F7]/80 font-light text-sm">
                <li className="border-b border-[#F5F5F7]/5 pb-4">
                  <strong className="block text-white font-medium mb-1">Hourly Rate for Custom Work:</strong>
                  $200 per hour. The clock runs only while the needle is in contact with your skin. Set-up, clean-up, and brief stretching breaks are never billed.
                </li>
                <li className="border-b border-[#F5F5F7]/5 pb-4">
                  <strong className="block text-white font-medium mb-1">Flat Rates for Flash:</strong>
                  All available flash designs have clear, fixed flat rates listed in the catalog. The price you see is the price you pay, regardless of how long the application takes.
                </li>
                <li>
                  <strong className="block text-white font-medium mb-1">Minimum Session Charge:</strong>
                  $150. This covers the cost of medical-grade setup, single-use sterilization packs, and administration for small, simple designs.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Deposit Policy */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-[#1C1C1C] border border-[#F5F5F7]/5 hover:border-[#C5A880]/30 transition-all duration-500 rounded-lg p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center mb-6 text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#121212] transition-all duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-6">non-refundable booking deposits.</h3>
              <ul className="space-y-6 text-[#F5F5F7]/80 font-light text-sm">
                <li className="border-b border-[#F5F5F7]/5 pb-4">
                  <strong className="block text-white font-medium mb-1">Securing Your Date:</strong>
                  A <span className="text-[#C5A880] font-semibold">non-refundable deposit of $100</span> is required to secure any appointment date.
                </li>
                <li className="border-b border-[#F5F5F7]/5 pb-4">
                  <strong className="block text-white font-medium mb-1">Deducted from Total:</strong>
                  The deposit amount is fully deducted from the final price of your tattoo on the day of your session (or the final session if your project requires multiple sittings).
                </li>
                <li>
                  <strong className="block text-white font-medium mb-1">Rescheduling Rules:</strong>
                  You may reschedule your appointment up to 48 hours in advance without losing your deposit. Rescheduling within 48 hours, failing to show up, or arriving more than 20 minutes late will result in forfeiture of your deposit, and a new deposit will be required to book again.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Studio Rules & Safety */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-[#1C1C1C] border border-[#F5F5F7]/5 hover:border-[#C5A880]/30 transition-all duration-500 rounded-lg p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center mb-6 text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#121212] transition-all duration-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-6">preparation &amp; safety rules.</h3>
              <ul className="space-y-6 text-[#F5F5F7]/80 font-light text-sm">
                <li className="border-b border-[#F5F5F7]/5 pb-4">
                  <strong className="block text-white font-medium mb-1">Age Requirement:</strong>
                  You must be 18 years of age or older on the day of your appointment. Valid government-issued photo ID is required. No exceptions.
                </li>
                <li className="border-b border-[#F5F5F7]/5 pb-4">
                  <strong className="block text-white font-medium mb-1">Health and Prep:</strong>
                  Ensure you eat a full meal 2-3 hours before your session and arrive well-hydrated. Avoid alcohol, excessive caffeine, and blood-thinning medications for 24 hours prior to your session.
                </li>
                <li>
                  <strong className="block text-white font-medium mb-1">Guests:</strong>
                  To maintain a quiet, sterile, and focused environment in our private studio, you are permitted to bring a maximum of <span className="text-[#C5A880] font-semibold">one guest</span> with you.
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Studio Image & Quote Callout Block */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="relative rounded-xl overflow-hidden mb-24 h-96 md:h-[450px]"
        >
          <img 
            src="https://images.unsplash.com/photo-1598252577533-b3c69c69300c?auto=format&fit=crop&w=1600&q=80" 
            alt="Sleek modern sterile tattoo studio tools and black ink bottles setup"
            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-[#121212]/30" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs tracking-widest text-[#C5A880] uppercase block mb-3">Clinical Grade Excellence</span>
              <p className="text-xl md:text-2xl font-serif text-white italic font-light leading-relaxed">
                "Our studio operates under strict clinical sterilization guidelines. We use 100% single-use, disposable medical equipment, premium vegan-friendly inks, and hospital-grade barriers."
              </p>
            </div>
            <div className="shrink-0">
              <a 
                href="#about-and-studio" 
                className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-white text-[#121212] font-mono text-xs uppercase tracking-widest px-6 py-4 rounded transition-all duration-300"
              >
                tour the studio
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* FAQ Accordion Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-[#F5F5F7]/10">
          
          {/* FAQ Intro Left */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-[#C5A880]" />
              <span className="font-mono text-xs tracking-widest text-[#C5A880] uppercase">frequently asked</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">common inquiries.</h3>
            <p className="text-[#F5F5F7]/70 font-light text-sm leading-relaxed mb-8">
              Can't find the answer you're looking for? Reach out through our general inquiry email or ask directly during your consultation process.
            </p>
            <div className="bg-[#1C1C1C] p-6 rounded border border-[#F5F5F7]/5">
              <span className="font-mono text-xs text-white block mb-2">Need a Touch-Up or Consultation?</span>
              <p className="text-xs text-[#F5F5F7]/60 font-light mb-4 leading-relaxed">
                We respond to active requests and inquiries within 3-5 business days.
              </p>
              <a 
                href="mailto:studio@jake-llewellyn-tattoo.com" 
                className="text-xs font-mono text-[#C5A880] hover:text-white transition-colors duration-200 underline underline-offset-4"
              >
                studio@jake-llewellyn-tattoo.com
              </a>
            </div>
          </div>

          {/* FAQ Accordion List Right */}
          <div className="lg:col-span-8 space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border-b border-[#F5F5F7]/10 pb-4 transition-colors duration-300 ${isOpen ? 'border-[#C5A880]/40' : ''}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center py-4 text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] rounded px-2"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg md:text-xl text-white group-hover:text-[#C5A880] transition-colors duration-300 pr-4">
                      {faq.question}
                    </span>
                    <span className={`w-8 h-8 rounded-full bg-[#1C1C1C] flex items-center justify-center shrink-0 border border-[#F5F5F7]/5 group-hover:border-[#C5A880]/40 transition-all duration-300 ${isOpen ? 'rotate-180 bg-[#C5A880] text-[#121212]' : 'text-[#F5F5F7]'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-2 pb-6 pt-2 text-[#F5F5F7]/80 font-light text-sm leading-relaxed space-y-4">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* Final Interactive Footer Callout */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="mt-24 p-8 md:p-12 bg-[#1C1C1C] border border-[#C5A880]/20 rounded-xl text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-[#8FA89B]/10 px-3 py-1 rounded-full border border-[#8FA89B]/20">
            <span className="w-2 h-2 rounded-full bg-[#8FA89B] animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-[#8FA89B] uppercase">Winter Booking Window Open</span>
          </div>
          <h4 className="font-serif text-2xl md:text-3xl text-white mb-4">Ready to start your project proposal?</h4>
          <p className="text-sm text-[#F5F5F7]/70 font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Please prepare your dimensions, placement thoughts, and reference material. Bypassing custom consultation is possible with pre-drawn flash.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#intake-form" 
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#C5A880] hover:bg-white text-[#121212] font-mono text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-300 font-semibold"
            >
              Submit Your Proposal
            </a>
            <a 
              href="#flash-catalog" 
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border border-[#F5F5F7]/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] font-mono text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-300"
            >
              Claim a Flash Design
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
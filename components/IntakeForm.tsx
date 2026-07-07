'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// --- TYPES & INTERFACES ---
interface FormState {
  fullName: string;
  email: string;
  instagram: string;
  requestType: 'custom' | 'flash';
  flashId: string;
  description: string;
  placement: string;
  size: string;
  budget: string;
  agreed: boolean;
  references: FileSimulated[];
}

interface FileSimulated {
  id: string;
  name: string;
  size: string;
  previewUrl: string;
}

interface WaitlistState {
  fullName: string;
  email: string;
  conceptIdea: string;
}

// --- CONSTANTS & DATA ---
const FLASH_DESIGNS = [
  { id: 'FL-902', title: "The Serpent's Rose", price: 450, dimensions: '6.0" x 4.0"', placement: 'Forearm, thigh, or calf' },
  { id: 'FL-905', title: 'Woodland Ferns', price: 350, dimensions: '5.5" x 3.0"', placement: 'Collarbone, rib, or forearm' },
];

const BUDGET_RANGES = [
  { value: 'under-300', label: 'Under $300 (Small fine-line / flash)' },
  { value: '300-600', label: '$300 - $600 (Medium illustrative / detailed flash)' },
  { value: '600-1200', label: '$600 - $1,200 (Large custom / multi-session starts)' },
  { value: '1200-plus', label: '$1,200+ (Full sleeves / multi-session projects)' },
  { value: 'flexible', label: 'Flexible / Focus on final quality' },
];

const SAMPLE_REFERENCES = [
  { id: 'ref-1', name: 'botanical_shading_reference.png', size: '2.4 MB', previewUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=120&q=80' },
  { id: 'ref-2', name: 'anatomical_heart_etching.jpg', size: '1.8 MB', previewUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=120&q=80' },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const stepVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  })
};

const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.15, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function IntakeForm() {
  // Simulator state: True = Books Open, False = Books Closed
  const [isBooksOpen, setIsBooksOpen] = useState<boolean>(true);
  
  // Intake Form Wizard state (Books Open)
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    instagram: '',
    requestType: 'custom',
    flashId: '',
    description: '',
    placement: '',
    size: '',
    budget: '',
    agreed: false,
    references: [],
  });
  
  // Waitlist Form state (Books Closed)
  const [waitlist, setWaitlist] = useState<WaitlistState>({
    fullName: '',
    email: '',
    conceptIdea: '',
  });

  // Submission UX States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // --- HANDLERS ---
  const toggleBookingState = () => {
    setIsBooksOpen(!isBooksOpen);
    setStep(1);
    setIsSubmitted(false);
    setErrorMsg('');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, agreed: e.target.checked }));
    setErrorMsg('');
  };

  const handleRequestTypeChange = (type: 'custom' | 'flash') => {
    setForm(prev => ({
      ...prev,
      requestType: type,
      // Auto-populate default flash if switching to flash
      flashId: type === 'flash' ? FLASH_DESIGNS[0].id : '',
    }));
  };

  const addSimulatedReference = (ref: typeof SAMPLE_REFERENCES[0]) => {
    if (form.references.some(r => r.id === ref.id)) return;
    setForm(prev => ({
      ...prev,
      references: [...prev.references, ref]
    }));
  };

  const removeReference = (id: string) => {
    setForm(prev => ({
      ...prev,
      references: prev.references.filter(r => r.id !== id)
    }));
  };

  // --- VALIDATION WIZARD ---
  const validateStep = (): boolean => {
    if (step === 1) {
      if (!form.fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return false;
      }
      if (!form.email.trim() || !form.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return false;
      }
      return true;
    }
    
    if (step === 2) {
      if (form.requestType === 'flash' && !form.flashId) {
        setErrorMsg('Please select a flash design to claim.');
        return false;
      }
      if (form.requestType === 'custom' && form.description.trim().length < 25) {
        setErrorMsg('Please provide a brief description (minimum 25 characters).');
        return false;
      }
      if (!form.placement.trim()) {
        setErrorMsg('Please specify body placement.');
        return false;
      }
      if (!form.size.trim()) {
        setErrorMsg('Please specify approximate dimensions.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!form.budget) {
        setErrorMsg('Please select your budget range.');
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!form.agreed) {
        setErrorMsg('You must agree to the booking guidelines and deposit policy.');
        return false;
      }
      return true;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setErrorMsg('');
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setErrorMsg('');
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  // --- SUBMISSIONS ---
  const submitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    // Simulate API Request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  const submitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlist.fullName.trim() || !waitlist.email.trim() || !waitlist.email.includes('@')) {
      setErrorMsg('Please fill in your name and a valid email address.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API Request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Reset form to write another
  const resetAll = () => {
    setForm({
      fullName: '',
      email: '',
      instagram: '',
      requestType: 'custom',
      flashId: '',
      description: '',
      placement: '',
      size: '',
      budget: '',
      agreed: false,
      references: [],
    });
    setWaitlist({
      fullName: '',
      email: '',
      conceptIdea: '',
    });
    setStep(1);
    setIsSubmitted(false);
    setErrorMsg('');
  };

  // Progress Calculations for Wizard
  const totalSteps = 4;
  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <section id="intake-form" className="relative bg-[#121212] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#1C1C1C] overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* 1. Global Announcement & Status Banner (Interactive Toggle Simulator) */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="text-center mb-4">
          <span className="text-[10px] font-mono tracking-[0.2em] text-[#C5A880]/60 uppercase">
            Interactive Live System Indicator (Click banner to simulate calendar toggle)
          </span>
        </div>
        
        <button
          onClick={toggleBookingState}
          className="w-full text-left focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-all"
          title="Click to toggle between Open & Closed states"
        >
          <div className="relative overflow-hidden bg-[#121212] border border-[#C5A880]/30 hover:border-[#C5A880]/80 rounded px-6 py-4 transition-all duration-300 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="relative flex h-3.5 w-3.5">
                <motion.span
                  variants={pulseVariants}
                  animate="pulse"
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isBooksOpen ? 'bg-[#8FA89B]' : 'bg-[#C5A880]'
                  }`}
                />
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${
                  isBooksOpen ? 'bg-[#8FA89B]' : 'bg-[#C5A880]'
                }`} />
              </span>
              <p className="text-sm font-sans text-[#F5F5F7] tracking-wide leading-relaxed">
                {isBooksOpen ? (
                  <>
                    <strong className="text-[#8FA89B]">Books are currently open</strong> for winter custom projects and select flash designs. Request your session below.
                  </>
                ) : (
                  <>
                    <strong className="text-[#C5A880]">Books are currently closed.</strong> Custom project waitlist is open for Spring. Join the waitlist.
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] shrink-0 border-t md:border-t-0 md:border-l border-[#C5A880]/20 pt-2 md:pt-0 md:pl-4">
              <span>SIMULATE {isBooksOpen ? 'CLOSED' : 'OPEN'} STATE</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* 2. Core Intake Card Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto bg-[#1C1C1C] border border-[#C5A880]/10 rounded-lg p-6 sm:p-10 shadow-2xl relative"
      >
        {/* Top subtle visual accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent" />

        {/* Dynamic State: Books OPEN */}
        {isBooksOpen ? (
          <div>
            {!isSubmitted ? (
              <form onSubmit={submitProposal} className="space-y-8">
                
                {/* Header Block */}
                <div className="border-b border-[#C5A880]/10 pb-6">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                    <h2 className="text-3xl font-serif text-[#F5F5F7] tracking-tight">
                      submit your project proposal.
                    </h2>
                    <span className="text-xs font-mono text-[#C5A880] tracking-widest uppercase">
                      Step {step} of {totalSteps}
                    </span>
                  </div>
                  <p className="text-sm font-sans text-[#F5F5F7]/70 leading-relaxed max-w-2xl">
                    Let&apos;s collaborate. Please fill out this form with as much detail as possible. This ensures we are an artistic fit and allows me to provide an accurate estimate.
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-6">
                    <div className="flex justify-between text-[11px] font-mono text-[#F5F5F7]/50 mb-2">
                      <span>PROGRESS</span>
                      <span>{progressPercent}% COMPLETE</span>
                    </div>
                    <div className="h-1 bg-[#121212] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#C5A880]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-mono p-4 rounded flex items-center gap-3">
                    <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Multi-step Form Content */}
                <div className="min-h-[300px] relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    
                    {/* STEP 1: Contact & Project Type */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-6"
                      >
                        <h3 className="text-xs font-mono tracking-[0.2em] text-[#C5A880] uppercase mb-4">
                          [Step 1: Client Contact & Request Type]
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                              Full Name <span className="text-[#C5A880]">*</span>
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={form.fullName}
                              onChange={handleFormChange}
                              placeholder="e.g., Sarah Jenkins"
                              className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                              Email Address <span className="text-[#C5A880]">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleFormChange}
                              placeholder="e.g., sarah@example.com"
                              className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                            Instagram Handle <span className="text-xs text-[#F5F5F7]/40 font-sans tracking-normal lowercase">(optional)</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono text-[#C5A880]">@</span>
                            <input
                              type="text"
                              name="instagram"
                              value={form.instagram}
                              onChange={handleFormChange}
                              placeholder="sarah_inked"
                              className="w-full bg-[#121212] border border-[#C5A880]/20 rounded pl-8 pr-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                            />
                          </div>
                          <p className="text-[11px] font-sans text-[#F5F5F7]/40 mt-1.5">
                            Used as an alternative contact method and to view your aesthetic style.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#C5A880]/10">
                          <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-3">
                            What type of project are we booking? <span className="text-[#C5A880]">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => handleRequestTypeChange('custom')}
                              className={`p-4 rounded border text-left transition-all ${
                                form.requestType === 'custom'
                                  ? 'bg-[#C5A880]/5 border-[#C5A880] text-[#F5F5F7]'
                                  : 'bg-[#121212] border-[#C5A880]/10 text-[#F5F5F7]/60 hover:border-[#C5A880]/30'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold tracking-wide">Custom Design</span>
                                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  form.requestType === 'custom' ? 'border-[#C5A880]' : 'border-neutral-700'
                                }`}>
                                  {form.requestType === 'custom' && <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />}
                                </span>
                              </div>
                              <p className="text-xs font-sans text-[#F5F5F7]/50 leading-relaxed">
                                A brand new concept drawn from scratch tailored specifically for your anatomy.
                              </p>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRequestTypeChange('flash')}
                              className={`p-4 rounded border text-left transition-all ${
                                form.requestType === 'flash'
                                  ? 'bg-[#C5A880]/5 border-[#C5A880] text-[#F5F5F7]'
                                  : 'bg-[#121212] border-[#C5A880]/10 text-[#F5F5F7]/60 hover:border-[#C5A880]/30'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold tracking-wide">Available Flash Design</span>
                                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  form.requestType === 'flash' ? 'border-[#C5A880]' : 'border-neutral-700'
                                }`}>
                                  {form.requestType === 'flash' && <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full" />}
                                </span>
                              </div>
                              <p className="text-xs font-sans text-[#F5F5F7]/50 leading-relaxed">
                                Choose an original, pre-drawn illustration from the catalog. Tattooed only once.
                              </p>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Project Specifications */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-6"
                      >
                        <h3 className="text-xs font-mono tracking-[0.2em] text-[#C5A880] uppercase mb-4">
                          [Step 2: Project Specifications]
                        </h3>

                        {/* Flash Selection Dropdown (Conditional) */}
                        {form.requestType === 'flash' ? (
                          <div className="p-4 bg-[#121212] border border-[#C5A880]/20 rounded">
                            <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                              Select Available Flash ID <span className="text-[#C5A880]">*</span>
                            </label>
                            <select
                              name="flashId"
                              value={form.flashId}
                              onChange={handleFormChange}
                              className="w-full bg-[#121212] border border-[#C5A880]/30 rounded px-3 py-2 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#C5A880] transition-colors"
                            >
                              {FLASH_DESIGNS.map(design => (
                                <option key={design.id} value={design.id} className="bg-[#121212] text-[#F5F5F7]">
                                  {design.id}: {design.title} (${design.price})
                                </option>
                              ))}
                            </select>
                            <p className="text-[11px] font-sans text-[#8FA89B] mt-2 flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              This selection will temporarily hold this flash piece for 48 hours pending deposit.
                            </p>
                          </div>
                        ) : (
                          /* Custom Concept Details */
                          <div>
                            <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                              Tell me about your concept <span className="text-[#C5A880]">*</span>
                            </label>
                            <textarea
                              name="description"
                              value={form.description}
                              onChange={handleFormChange}
                              rows={5}
                              placeholder="Please describe the key elements, desired mood, references, and overall concept of your custom tattoo. Be as specific or as open-ended as you like."
                              className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                            />
                            <div className="flex justify-between items-center mt-1.5 text-[11px] font-mono text-[#F5F5F7]/40">
                              <span>Be descriptive (minimum 25 characters)</span>
                              <span>{form.description.length} chars</span>
                            </div>
                          </div>
                        )}

                        {/* Placement & Size Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#C5A880]/10">
                          <div>
                            <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                              Placement on the Body <span className="text-[#C5A880]">*</span>
                            </label>
                            <input
                              type="text"
                              name="placement"
                              value={form.placement}
                              onChange={handleFormChange}
                              placeholder="e.g., Left forearm (outer), right calf"
                              className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                              Approximate Size in Inches <span className="text-[#C5A880]">*</span>
                            </label>
                            <input
                              type="text"
                              name="size"
                              value={form.size}
                              onChange={handleFormChange}
                              placeholder="e.g., 6 inches tall by 4 inches wide"
                              className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                            />
                            <p className="text-[11px] font-sans text-[#F5F5F7]/40 mt-1.5">
                              Please use a physical tape measure. Precise inches help me scale the drawing.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: References & Budget */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-6"
                      >
                        <h3 className="text-xs font-mono tracking-[0.2em] text-[#C5A880] uppercase mb-4">
                          [Step 3: References & Budget]
                        </h3>

                        {/* Reference Images simulated upload */}
                        <div>
                          <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                            Upload Reference Images <span className="text-xs text-[#F5F5F7]/40 lowercase">(optional)</span>
                          </label>
                          <div className="border border-dashed border-[#C5A880]/20 rounded-lg p-6 bg-[#121212] text-center">
                            <svg className="w-8 h-8 text-[#C5A880]/60 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-[#F5F5F7]/80 font-semibold">Drag & drop up to 3 references</p>
                            <p className="text-xs text-[#F5F5F7]/40 mt-1">JPEG, PNG only (Max 5MB each)</p>

                            {/* Simulated Quick Insert for prototype */}
                            <div className="mt-4 pt-4 border-t border-[#C5A880]/10">
                              <p className="text-[11px] font-mono text-[#C5A880] mb-2">SIMULATE ADDING TYPICAL REFERENCES:</p>
                              <div className="flex flex-wrap justify-center gap-2">
                                {SAMPLE_REFERENCES.map(ref => (
                                  <button
                                    key={ref.id}
                                    type="button"
                                    onClick={() => addSimulatedReference(ref)}
                                    className="px-2.5 py-1.5 bg-[#1C1C1C] hover:bg-[#C5A880]/10 border border-[#C5A880]/20 rounded text-[11px] text-[#F5F5F7]/80 flex items-center gap-1.5 transition-colors"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FA89B]" />
                                    {ref.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Render Added References */}
                          {form.references.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-xs font-mono text-[#C5A880]">UPLOADED FILES ({form.references.length}/3)</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {form.references.map(file => (
                                  <div key={file.id} className="flex items-center justify-between p-2.5 bg-[#121212] border border-[#C5A880]/20 rounded">
                                    <div className="flex items-center gap-3">
                                      {/* Mini Thumbnail */}
                                      <img
                                        src={file.previewUrl}
                                        alt={file.name}
                                        className="w-10 h-10 object-cover rounded border border-[#C5A880]/20"
                                      />
                                      <div className="overflow-hidden">
                                        <p className="text-xs text-[#F5F5F7] font-mono truncate max-w-[160px]">{file.name}</p>
                                        <p className="text-[10px] text-[#F5F5F7]/40">{file.size}</p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeReference(file.id)}
                                      className="p-1.5 text-red-400 hover:bg-red-950/30 rounded transition-colors"
                                      title="Remove"
                                    >
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Budget Section */}
                        <div className="pt-4 border-t border-[#C5A880]/10">
                          <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                            What is your budget range for this project? <span className="text-[#C5A880]">*</span>
                          </label>
                          <select
                            name="budget"
                            value={form.budget}
                            onChange={handleFormChange}
                            className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#C5A880] transition-colors"
                          >
                            <option value="">Select budget range...</option>
                            {BUDGET_RANGES.map(range => (
                              <option key={range.value} value={range.value} className="bg-[#121212] text-[#F5F5F7]">
                                {range.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Policy Agreement & Final Submission */}
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-6"
                      >
                        <h3 className="text-xs font-mono tracking-[0.2em] text-[#C5A880] uppercase mb-4">
                          [Step 4: Policy Agreement & Submit]
                        </h3>

                        {/* Brief Summary Box */}
                        <div className="bg-[#121212] border border-[#C5A880]/10 rounded p-5 space-y-3">
                          <h4 className="text-xs font-mono text-[#C5A880] tracking-wider uppercase">Project Summary</h4>
                          <div className="grid grid-cols-2 gap-4 text-xs font-sans text-[#F5F5F7]/80">
                            <div>
                              <span className="text-[#F5F5F7]/40 block text-[10px] font-mono uppercase">Collector</span>
                              {form.fullName} ({form.email})
                            </div>
                            <div>
                              <span className="text-[#F5F5F7]/40 block text-[10px] font-mono uppercase">Request Type</span>
                              {form.requestType === 'custom' ? 'Custom Tattoo Design' : `Flash Design (${form.flashId})`}
                            </div>
                            <div>
                              <span className="text-[#F5F5F7]/40 block text-[10px] font-mono uppercase">Placement</span>
                              {form.placement}
                            </div>
                            <div>
                              <span className="text-[#F5F5F7]/40 block text-[10px] font-mono uppercase">Approx. Dimensions</span>
                              {form.size}
                            </div>
                          </div>
                        </div>

                        {/* Policy Details / Core Rules */}
                        <div className="p-4 bg-[#121212] border-l-2 border-[#C5A880] rounded-r space-y-2">
                          <p className="text-xs font-semibold text-[#F5F5F7]">Quick Booking Guidelines Reminder:</p>
                          <ul className="text-[11px] font-sans text-[#F5F5F7]/70 space-y-1.5 list-disc pl-4">
                            <li>All booking deposits are <strong>non-refundable</strong> ($100).</li>
                            <li>Rescheduling within 48 hours or failure to attend will forfeit your deposit.</li>
                            <li>You must be <strong>18 years of age</strong> or older on the day of the appointment.</li>
                            <li>Please read full terms under <a href="#booking-policies" className="text-[#C5A880] underline hover:text-[#F5F5F7]">expectations, pricing, & policies</a>.</li>
                          </ul>
                        </div>

                        {/* Agreement Checkbox */}
                        <div className="pt-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name="agreed"
                              checked={form.agreed}
                              onChange={handleCheckboxChange}
                              className="mt-1 accent-[#C5A880] rounded border-[#C5A880]/30 bg-[#121212] text-[#C5A880] focus:ring-0"
                            />
                            <span className="text-xs font-sans text-[#F5F5F7]/80 leading-relaxed">
                              I have read, understood, and agree to the Booking Guidelines and Deposit Policies. I understand that my deposit is non-refundable. <span className="text-[#C5A880]">*</span>
                            </span>
                          </label>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Form Navigation Controls */}
                <div className="border-t border-[#C5A880]/10 pt-6 flex justify-between items-center">
                  <div>
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-5 py-2.5 bg-[#121212] hover:bg-[#1C1C1C] border border-[#C5A880]/20 rounded text-xs font-mono text-[#F5F5F7] tracking-wider uppercase transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                      </button>
                    )}
                  </div>

                  <div>
                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#C5A880]/90 text-[#121212] rounded text-xs font-mono tracking-wider uppercase font-semibold transition-colors flex items-center gap-2"
                      >
                        Next Step
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-[#C5A880] hover:bg-[#C5A880]/90 text-[#121212] rounded text-xs font-mono tracking-wider uppercase font-semibold transition-all flex items-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-[#121212]" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting Proposal...
                          </>
                        ) : (
                          <>
                            Submit Project Proposal
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

              </form>
            ) : (
              /* Success / Thank You View (Open State) */
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-[#8FA89B]/10 border border-[#8FA89B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#8FA89B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-serif text-[#F5F5F7] tracking-tight">Proposal Submitted Successfully.</h3>
                <p className="text-sm font-sans text-[#F5F5F7]/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#C5A880]">{form.fullName}</strong>. Your project proposal has been safely received. I review active requests and answer within <strong className="text-[#F5F5F7]">3-5 business days</strong>.
                </p>
                <div className="p-4 bg-[#121212] border border-[#C5A880]/10 rounded max-w-sm mx-auto text-xs text-[#F5F5F7]/50 font-mono">
                  A verification email was sent to {form.email}. Please check your spam folder if you do not receive it shortly.
                </div>
                <div className="pt-6">
                  <button
                    onClick={resetAll}
                    className="px-6 py-2.5 bg-[#121212] hover:bg-[#1C1C1C] border border-[#C5A880]/20 rounded text-xs font-mono text-[#F5F5F7] tracking-wider uppercase transition-colors"
                  >
                    Submit Another Proposal
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Dynamic State: Books CLOSED (Waitlist Form) */
          <div>
            {!isSubmitted ? (
              <form onSubmit={submitWaitlist} className="space-y-6">
                
                {/* Header Block */}
                <div className="border-b border-[#C5A880]/10 pb-6 text-center">
                  <span className="text-[11px] font-mono tracking-[0.2em] text-[#C5A880] uppercase block mb-2">
                    Priority Waitlist Registration
                  </span>
                  <h2 className="text-4xl font-serif text-[#F5F5F7] tracking-tight mb-4">
                    the waitlist.
                  </h2>
                  <p className="text-sm font-sans text-[#F5F5F7]/70 leading-relaxed max-w-xl mx-auto">
                    My books are currently fully booked for this quarter. Join the waitlist to receive priority access when the next booking window opens, and to be notified of any last-minute cancellations.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-xs font-mono p-4 rounded flex items-center gap-3">
                    <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Waitlist Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                        Full Name <span className="text-[#C5A880]">*</span>
                      </label>
                      <input
                        type="text"
                        value={waitlist.fullName}
                        onChange={(e) => {
                          setErrorMsg('');
                          setWaitlist(prev => ({ ...prev, fullName: e.target.value }));
                        }}
                        placeholder="e.g., Sarah Jenkins"
                        className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                        Email Address <span className="text-[#C5A880]">*</span>
                      </label>
                      <input
                        type="email"
                        value={waitlist.email}
                        onChange={(e) => {
                          setErrorMsg('');
                          setWaitlist(prev => ({ ...prev, email: e.target.value }));
                        }}
                        placeholder="e.g., sarah@example.com"
                        className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#F5F5F7]/80 tracking-wider uppercase mb-2">
                      What general idea, style, or flash piece are you hoping to get?
                    </label>
                    <textarea
                      value={waitlist.conceptIdea}
                      onChange={(e) => setWaitlist(prev => ({ ...prev, conceptIdea: e.target.value }))}
                      rows={4}
                      placeholder="e.g., Botanical sleeve with ferns and lavender, or a fine-line astronomical chart on the ribs."
                      className="w-full bg-[#121212] border border-[#C5A880]/20 rounded px-4 py-3 text-sm text-[#F5F5F7] placeholder-[#F5F5F7]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                {/* Waitlist Submit Button */}
                <div className="pt-6 text-center border-t border-[#C5A880]/10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 bg-[#C5A880] hover:bg-[#C5A880]/90 text-[#121212] rounded text-xs font-mono tracking-wider uppercase font-semibold transition-all inline-flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#121212]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining Waitlist...
                      </>
                    ) : (
                      <>
                        Join the Priority Waitlist
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

              </form>
            ) : (
              /* Success / Thank You View (Closed/Waitlist State) */
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-[#C5A880]/10 border border-[#C5A880] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#C5A880]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-serif text-[#F5F5F7] tracking-tight">You&apos;re on the Waitlist.</h3>
                <p className="text-sm font-sans text-[#F5F5F7]/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#C5A880]">{waitlist.fullName}</strong>. You have been added to the priority waitlist for the Spring booking cycle. You will receive an email as soon as new dates are announced.
                </p>
                <div className="p-4 bg-[#121212] border border-[#C5A880]/10 rounded max-w-sm mx-auto text-xs text-[#F5F5F7]/50 font-mono">
                  Waitlist confirmation sent to: {waitlist.email}
                </div>
                <div className="pt-6">
                  <button
                    onClick={resetAll}
                    className="px-6 py-2.5 bg-[#121212] hover:bg-[#1C1C1C] border border-[#C5A880]/20 rounded text-xs font-mono text-[#F5F5F7] tracking-wider uppercase transition-colors"
                  >
                    Register Another Person
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* 3. Bottom Contextual Help / Redirection Links */}
      <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F5F5F7]/40 px-4">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#C5A880]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Clinical-grade secure server
        </span>
        <div className="flex gap-4">
          <a href="#booking-policies" className="hover:text-[#C5A880] transition-colors underline">
            Review Booking Policies
          </a>
          <span>•</span>
          <a href="#about-and-studio" className="hover:text-[#C5A880] transition-colors underline">
            About the Studio
          </a>
        </div>
      </div>
    </section>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Sparkles, 
  Info, 
  Camera, 
  Gift,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Footprints,
  Compass,
  Eye,
  Leaf
} from 'lucide-react';
import VolunteerForm from '@/components/VolunteerForm';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import DonateModal from '@/components/DonateModal';

const GALLERY_ITEMS = [
  {
    title: "Foraging in the Forest",
    subtitle: "Natural Grazing Habitats",
    description: "Rescued elephants exploring the natural jungle habitats freely without the pressure of tourism.",
    id: "01"
  },
  {
    title: "Feed Preparation",
    subtitle: "Nutritional Care",
    description: "Volunteers and mahouts crafting nutritional grass & molasses bundles to sustain their health.",
    id: "02"
  },
  {
    title: "Rapti River Bathing",
    subtitle: "Observation at a Distance",
    description: "Watching elephants splash and swim naturally in the river from a safe, non-intrusive distance.",
    id: "03"
  },
  {
    title: "Mahout Training",
    subtitle: "Empowerment & Education",
    description: "Empowering local handlers with positive-reinforcement techniques to phase out heavy hooks.",
    id: "04"
  },
  {
    title: "Volunteer Work",
    subtitle: "Community Collaboration",
    description: "Community builders assisting in shelter upkeep, trail building, and spreading local conservation advocacy.",
    id: "05"
  },
  {
    title: "Conservation Rallies",
    subtitle: "Ethical Tourism Outreach",
    description: "Engaging tourist agencies in Sauraha to promote rides-free and chain-free sanctuary practices.",
    id: "06"
  }
];

export default function ElephantCampaignLanding() {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#f1f6f1] dark:bg-[#07130a] text-[#1c2e22] dark:text-[#e0ebe4] font-sans selection:bg-emerald-300/40 dark:selection:bg-emerald-900/50 transition-colors duration-500">
      
      {/* HEADER / NAVIGATION - Glassmorphism */}
      <header className="sticky top-0 z-50 bg-[#f1f6f1]/70 dark:bg-[#07130a]/70 backdrop-blur-xl border-b border-[#2d5a3f]/10 dark:border-[#2d5a3f]/20 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-[#14532d] dark:text-[#34d399] text-sm tracking-widest uppercase hover:scale-105 transition-transform duration-300 group">
            <span className="text-2xl group-hover:-rotate-12 transition-transform duration-300">🐘</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#14532d] to-[#047857] dark:from-[#34d399] dark:to-[#10b981]">The Chain Free Project</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-[#2f5c43] dark:text-[#8cb89f]">
            <a href="#about" className="relative hover:text-[#047857] dark:hover:text-[#10b981] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-[#10b981] hover:after:w-full after:transition-all after:duration-300">Mission</a>
            <a href="#herd" className="relative hover:text-[#047857] dark:hover:text-[#10b981] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-[#10b981] hover:after:w-full after:transition-all after:duration-300">Campaign</a>
            <a href="#experiences" className="relative hover:text-[#047857] dark:hover:text-[#10b981] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-[#10b981] hover:after:w-full after:transition-all after:duration-300">Experiences</a>
            <a href="#gallery" className="relative hover:text-[#047857] dark:hover:text-[#10b981] transition-colors duration-300 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-[#10b981] hover:after:w-full after:transition-all after:duration-300">Gallery</a>
          </nav>
          <a 
            href="#volunteer" 
            className="bg-gradient-to-r from-[#047857] to-[#059669] hover:from-[#065f46] hover:to-[#047857] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_8px_30px_rgb(4,120,87,0.2)] hover:shadow-[0_8px_30px_rgb(4,120,87,0.4)] hover:-translate-y-1"
          >
            Book Visit
          </a>
        </div>
      </header>

      {/* HERO SECTION - Deep Jungle Vibes */}
      <section className="relative bg-gradient-to-br from-[#061c11] via-[#0b291a] to-[#05170d] text-white py-32 md:py-48 px-4 overflow-hidden border-b border-[#1b3d2b]">
        {/* Abstract Jungle Leaf Pattern / Lighting */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#10b981]/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-10000"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-[#d97706]/10 blur-[100px] rounded-full mix-blend-screen animate-pulse duration-7000 delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-10 animate-fadeInUp">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#10b981]/10 text-[#34d399] border border-[#10b981]/30 backdrop-blur-sm shadow-[0_0_20px_rgb(16,185,129,0.1)]">
            <Leaf className="w-3.5 h-3.5 text-[#34d399]" /> Sauraha, Chitwan • Nepal
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tight leading-[1.1] drop-shadow-2xl">
            Elephants belong in the wild, <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#059669]">not bound in heavy chains.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9ca3af] max-w-2xl mx-auto font-light leading-relaxed">
            We are building a lush, chain-free sanctuary in Sauraha. By eliminating saddles and restraints, we promote observant experiences—walking alongside elephants, preparing nutrition, and observing river baths.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <a 
              href="#volunteer" 
              className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#34d399] hover:to-[#10b981] text-[#064e3b] font-extrabold px-8 py-4 rounded-xl transition-all duration-300 text-xs uppercase tracking-widest shadow-[0_10px_40px_rgb(16,185,129,0.3)] hover:shadow-[0_15px_50px_rgb(16,185,129,0.4)] hover:-translate-y-1"
            >
              Book Inquiries
            </a>
            <a 
              href="#volunteer" 
              className="bg-white/5 hover:bg-white/10 text-white font-bold backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl transition-all duration-300 text-xs uppercase tracking-widest hover:-translate-y-1"
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>

      {/* MISSION & STRATEGIC GOALS SECTION */}
      <section id="about" className="py-28 max-w-6xl mx-auto px-4 space-y-24">
        
        {/* Core Mission */}
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 space-y-4">
            <span className="text-[#059669] dark:text-[#34d399] text-xs font-black uppercase tracking-[0.3em]">Our Vision</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#064e3b] dark:text-white">Core Mission</h2>
            <div className="w-16 h-1 bg-[#10b981] rounded-full"></div>
          </div>
          <div className="md:col-span-2">
            <p className="text-xl md:text-2xl font-light text-[#2d5a3f] dark:text-[#8cb89f] leading-relaxed">
              To pioneer an ethical, <strong className="font-semibold text-[#064e3b] dark:text-white">ride-free sanctuary model</strong> in Sauraha that frees working elephants from chains and saddles, while establishing a sustainable livelihoods structure for local mahouts through compassionate care methods.
            </p>
          </div>
        </div>

        {/* Strategic Goals Cards - Glassmorphism & Hover effects */}
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <span className="text-[#059669] dark:text-[#34d399] text-xs font-black uppercase tracking-[0.3em]">Target Actions</span>
            <h2 className="text-3xl font-light tracking-tight text-[#064e3b] dark:text-white">Strategic Goals</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Goal 1 */}
            <div className="group bg-white/60 dark:bg-[#0b1c12]/60 backdrop-blur-lg border border-[#34d399]/20 p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(16,185,129,0.1)] transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#ecfdf5] dark:bg-[#064e3b] flex items-center justify-center text-[#059669] dark:text-[#34d399] mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="font-black text-xl">01</span>
              </div>
              <h3 className="font-bold text-[#064e3b] dark:text-white text-xl mb-4">Sanctuary & Safety</h3>
              <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm leading-relaxed font-light">
                Directly acquiring working elephants from commercial tourism to provide permanent shelter, medical rehabilitation, and chain-free forest grazing.
              </p>
            </div>

            {/* Goal 2 */}
            <div className="group bg-gradient-to-b from-[#10b981] to-[#047857] p-10 rounded-3xl shadow-[0_15px_40px_rgb(16,185,129,0.2)] hover:shadow-[0_25px_50px_rgb(16,185,129,0.4)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-white/10 transform rotate-12 group-hover:scale-125 transition-transform duration-700">
                <Leaf className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                  <span className="font-black text-xl">02</span>
                </div>
                <h3 className="font-bold text-white text-xl mb-4">Cooperative Livelihoods</h3>
                <p className="text-[#ecfdf5] text-sm leading-relaxed font-light mb-6">
                  Employing local handlers (mahouts) and training them in positive reinforcement techniques, transforming traditional restraint habits into cooperative care.
                </p>
                <a 
                  href="https://your-fundraiser-link.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#a7f3d0] transition-colors"
                >
                  Support training <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Goal 3 */}
            <div className="group bg-white/60 dark:bg-[#0b1c12]/60 backdrop-blur-lg border border-[#34d399]/20 p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(16,185,129,0.1)] transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#ecfdf5] dark:bg-[#064e3b] flex items-center justify-center text-[#059669] dark:text-[#34d399] mb-6 group-hover:scale-110 transition-transform duration-500">
                <span className="font-black text-xl">03</span>
              </div>
              <h3 className="font-bold text-[#064e3b] dark:text-white text-xl mb-4">Hands-Off Advocacy</h3>
              <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm leading-relaxed font-light">
                Providing visitors with educational, observant experiences (nutrition prep, walking, bathing) to inspire conservation awareness without animal stress.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* MEET THE HERD SECTION (SINGLE RESCUE CARD) */}
      <section id="herd" className="py-28 bg-[#e8f0e8] dark:bg-[#040e07] border-y border-[#d1e0d1] dark:border-[#0f2416] px-4 transition-colors relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-[100px]"></div>
        
        <div className="relative max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-[#059669] dark:text-[#34d399] text-xs font-black uppercase tracking-[0.3em]">Active Campaign</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#064e3b] dark:text-white">Elephant Rescue Fund</h2>
            <p className="text-[#4b6b58] dark:text-[#8cb89f] max-w-xl mx-auto text-sm md:text-base font-light">
              Help buy out and liberate a working tourist elephant in Sauraha. <strong className="font-semibold text-[#064e3b] dark:text-[#34d399]">100% of contributions</strong> go directly to rescue and veterinary care.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="group bg-white dark:bg-[#0a170e] rounded-[2rem] overflow-hidden border border-[#34d399]/20 shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgb(16,185,129,0.15)] transition-all duration-500 flex flex-col md:flex-row">
              <div className="md:w-1/2 relative bg-[#f4f7f4] dark:bg-[#050f08] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#34d399]/20 p-12 text-center group-hover:bg-[#ecfdf5] dark:group-hover:bg-[#06140b] transition-colors duration-500">
                <div className="w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Camera className="w-8 h-8 text-[#10b981]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#064e3b] dark:text-white mb-2">Rescue in Progress</span>
                <span className="text-[10px] text-[#4b6b58] dark:text-[#6b9b7e] font-light">Details will be updated as soon as rescue contracts are finalized.</span>
              </div>
              <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="self-start bg-[#ecfdf5] dark:bg-[#064e3b]/40 text-[#059669] dark:text-[#34d399] border border-[#10b981]/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                      Active Pledge
                    </span>
                    <h3 className="text-2xl font-bold text-[#064e3b] dark:text-white">Upcoming Rescue Candidate</h3>
                  </div>
                  <p className="text-xs font-bold text-[#d97706] dark:text-[#fbbf24] flex items-center gap-2 bg-[#fffbeb] dark:bg-[#78350f]/20 p-3 rounded-xl">
                    <Info className="w-4 h-4" /> Campaign Goal: Rs. 2,000,000
                  </p>
                  <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm leading-relaxed font-light">
                    Your contribution guarantees direct liberation from commercial riding tours and provides full lifetime shelter support.
                  </p>
                </div>
                
                <button 
                  onClick={() => setIsDonateModalOpen(true)}
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_8px_20px_rgb(16,185,129,0.25)] hover:shadow-[0_12px_25px_rgb(16,185,129,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Gift className="w-4 h-4" />
                  Donate to Rescue
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ETHICAL VISITOR EXPERIENCES SECTION */}
      <section id="experiences" className="py-28 max-w-7xl mx-auto px-4 space-y-16">
        
        <div className="text-center space-y-4">
          <span className="text-[#059669] dark:text-[#34d399] text-xs font-black uppercase tracking-[0.3em]">Sauraha Encounters</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#064e3b] dark:text-white">Educational Program</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Exp 1 */}
          <div className="group bg-white/50 dark:bg-[#07130a]/50 backdrop-blur-md border border-[#34d399]/20 p-8 rounded-[2rem] space-y-6 hover:bg-white dark:hover:bg-[#0b1c12] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] hover:-translate-y-2 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981]/20 to-[#047857]/10 flex items-center justify-center text-[#059669] dark:text-[#34d399] group-hover:scale-110 transition-transform duration-500">
                <Footprints className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#064e3b] dark:text-white text-lg">Forest Walks</h3>
              <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm leading-relaxed font-light">
                Walk alongside elephants through natural pathways. Observe foraging habits up close from a safe distance.
              </p>
            </div>
            <div className="pt-6 border-t border-[#34d399]/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#064e3b] dark:text-[#34d399]">
              <span>2 hrs</span>
              <span className="bg-[#10b981]/10 px-3 py-1.5 rounded-lg border border-[#10b981]/20">Price: TBD</span>
            </div>
          </div>

          {/* Exp 2 */}
          <div className="group bg-white/50 dark:bg-[#07130a]/50 backdrop-blur-md border border-[#34d399]/20 p-8 rounded-[2rem] space-y-6 hover:bg-white dark:hover:bg-[#0b1c12] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] hover:-translate-y-2 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981]/20 to-[#047857]/10 flex items-center justify-center text-[#059669] dark:text-[#34d399] group-hover:scale-110 transition-transform duration-500">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#064e3b] dark:text-white text-lg">Feed Prep</h3>
              <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm leading-relaxed font-light">
                Craft supplementary food bundles using grass, salt, and molasses, and feed them with care.
              </p>
            </div>
            <div className="pt-6 border-t border-[#34d399]/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#064e3b] dark:text-[#34d399]">
              <span>1.5 hrs</span>
              <span className="bg-[#10b981]/10 px-3 py-1.5 rounded-lg border border-[#10b981]/20">Price: TBD</span>
            </div>
          </div>

          {/* Exp 3 */}
          <div className="group bg-white/50 dark:bg-[#07130a]/50 backdrop-blur-md border border-[#34d399]/20 p-8 rounded-[2rem] space-y-6 hover:bg-white dark:hover:bg-[#0b1c12] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] hover:-translate-y-2 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981]/20 to-[#047857]/10 flex items-center justify-center text-[#059669] dark:text-[#34d399] group-hover:scale-110 transition-transform duration-500">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#064e3b] dark:text-white text-lg">Bathing</h3>
              <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm leading-relaxed font-light">
                Observe elephants splash and bathe in the Rapti River. A natural highlight for photography.
              </p>
            </div>
            <div className="pt-6 border-t border-[#34d399]/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#064e3b] dark:text-[#34d399]">
              <span>1 hr</span>
              <span className="bg-[#10b981]/10 px-3 py-1.5 rounded-lg border border-[#10b981]/20">Price: TBD</span>
            </div>
          </div>

          {/* Exp 4 */}
          <div className="group bg-white/50 dark:bg-[#07130a]/50 backdrop-blur-md border border-[#34d399]/20 p-8 rounded-[2rem] space-y-6 hover:bg-white dark:hover:bg-[#0b1c12] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] hover:-translate-y-2 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981]/20 to-[#047857]/10 flex items-center justify-center text-[#059669] dark:text-[#34d399] group-hover:scale-110 transition-transform duration-500">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#064e3b] dark:text-white text-lg">Volunteer</h3>
              <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm leading-relaxed font-light">
                Assist mahouts with shelter management, fodder harvesting, and community outreach.
              </p>
            </div>
            <div className="pt-6 border-t border-[#34d399]/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#064e3b] dark:text-[#34d399]">
              <span>Flexible</span>
              <span className="bg-[#10b981]/10 px-3 py-1.5 rounded-lg border border-[#10b981]/20">Price: TBD</span>
            </div>
          </div>
        </div>

      </section>

      {/* MEDIA / GALLERY SECTION (SLIDING CAROUSEL) */}
      <section id="gallery" className="py-28 bg-[#e8f0e8] dark:bg-[#040e07] border-y border-[#d1e0d1] dark:border-[#0f2416] px-4 transition-colors relative">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-[#059669] dark:text-[#34d399] text-xs font-black uppercase tracking-[0.3em]">Visual updates</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#064e3b] dark:text-white">Sanctuary Gallery</h2>
            <p className="text-[#4b6b58] dark:text-[#8cb89f] text-base font-light">Flip through updates of our ongoing campaign.</p>
          </div>

          {/* Image Slider Container */}
          <div className="relative bg-white dark:bg-[#0a170e] border border-[#34d399]/20 rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgb(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row transition-all duration-500 min-h-[400px]">
            
            {/* Left Image Box */}
            <div className="md:w-3/5 relative bg-[#f1f6f1] dark:bg-[#050f08] border-b md:border-b-0 md:border-r border-[#34d399]/20 overflow-hidden group">
              <img 
                src={`/elephant-${activeSlide + 1}.jpg`} 
                alt={GALLERY_ITEMS[activeSlide].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-white">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#10b981]/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  {GALLERY_ITEMS[activeSlide].subtitle}
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div className="md:w-2/5 p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#10b981]/20 dark:text-[#10b981]/10">
                    {GALLERY_ITEMS[activeSlide].id}
                  </span>
                  <span className="text-[10px] text-[#4b6b58] dark:text-[#6b9b7e] font-bold font-mono tracking-widest uppercase">
                    Slide {activeSlide + 1} of 6
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#064e3b] dark:text-white leading-tight">
                    {GALLERY_ITEMS[activeSlide].title}
                  </h3>
                  <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm leading-relaxed font-light">
                    {GALLERY_ITEMS[activeSlide].description}
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between border-t border-[#34d399]/10 pt-8 mt-8">
                <div className="flex gap-2">
                  {GALLERY_ITEMS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        activeSlide === index 
                          ? 'bg-[#10b981] w-8' 
                          : 'bg-[#d1e0d1] dark:bg-[#132c1c] hover:bg-[#a3c2a3] w-2'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePrevSlide}
                    className="p-3 border border-[#34d399]/30 rounded-xl bg-white hover:bg-[#ecfdf5] dark:bg-[#0a170e] dark:hover:bg-[#102b1c] text-[#064e3b] dark:text-[#34d399] transition-all hover:scale-105 active:scale-95 shadow-sm"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-3 border border-[#34d399]/30 rounded-xl bg-white hover:bg-[#ecfdf5] dark:bg-[#0a170e] dark:hover:bg-[#102b1c] text-[#064e3b] dark:text-[#34d399] transition-all hover:scale-105 active:scale-95 shadow-sm"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* VOLUNTEER & BOOKING INQUIRY FORM */}
      <section id="volunteer" className="py-28 max-w-2xl mx-auto px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[#10b981]/5 blur-[120px] rounded-full -z-10"></div>
        <VolunteerForm />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#040e07] text-[#6b9b7e] py-16 px-4 border-t border-[#0f2416] transition-colors text-xs text-center font-light">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="flex items-center justify-center gap-2">
            © 2026 The Chain Free Project. <Leaf className="w-3 h-3 text-[#10b981]" /> Ethical elephant welfare.
          </p>
          <div className="flex gap-8 uppercase tracking-[0.2em] font-bold text-[9px]">
            <a href="#about" className="hover:text-[#34d399] transition-colors duration-300">Our Mission</a>
            <a href="#herd" className="hover:text-[#34d399] transition-colors duration-300">Campaign</a>
            <a href="#volunteer" className="hover:text-[#34d399] transition-colors duration-300">Bookings</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP CHAT WIDGET */}
      <WhatsAppWidget />

      {/* INTERACTIVE DONATION MODAL */}
      <DonateModal 
        isOpen={isDonateModalOpen} 
        onClose={() => setIsDonateModalOpen(false)} 
        elephantName="Upcoming Rescue Candidate" 
      />

    </div>
  );
}
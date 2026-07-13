'use client';

import React, { useState } from 'react';
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
  Eye
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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-200 font-sans selection:bg-emerald-100 dark:selection:bg-emerald-900 transition-colors duration-300">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/40 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-450 text-sm tracking-widest uppercase hover:scale-[1.01] transition-transform duration-250">
            <span>🐘</span> <span>The Chain Free Project</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <a href="#about" className="hover:text-emerald-700 dark:hover:text-emerald-450 transition-colors duration-200">Mission & Goals</a>
            <a href="#herd" className="hover:text-emerald-700 dark:hover:text-emerald-450 transition-colors duration-200">Rescue Campaign</a>
            <a href="#experiences" className="hover:text-emerald-700 dark:hover:text-emerald-450 transition-colors duration-200">Experiences</a>
            <a href="#gallery" className="hover:text-emerald-700 dark:hover:text-emerald-450 transition-colors duration-200">Gallery</a>
          </nav>
          <a 
            href="#volunteer" 
            className="bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            Book Visit
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-stone-900 to-stone-950 dark:from-stone-950 dark:to-stone-900 text-white py-24 md:py-32 px-4 overflow-hidden border-b border-stone-200/30 dark:border-stone-850/30">
        <div className="absolute inset-0 bg-[radial-gradient(#2d3d31_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        
        <div className="relative max-w-3xl mx-auto text-center space-y-8 animate-fadeInUp">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Sauraha, Chitwan • Nepal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.2]">
            Elephants belong in the wild, <br />
            <span className="font-semibold text-emerald-400">not bound in heavy chains.</span>
          </h1>
          <p className="text-base text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            We are building a chain-free sanctuary in Sauraha. By eliminating saddles and restraints, we promote observant experiences—walking alongside elephants, preparing nutrition, and observing river baths.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a 
              href="#volunteer" 
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 text-xs uppercase tracking-wider"
            >
              Book Inquiries
            </a>
            <a 
              href="#volunteer" 
              className="bg-transparent hover:bg-white/5 text-white font-semibold border border-stone-700 hover:border-stone-500 px-6 py-3 rounded-lg transition-all duration-200 text-xs uppercase tracking-wider"
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>

      {/* MISSION & STRATEGIC GOALS SECTION */}
      <section id="about" className="py-20 max-w-5xl mx-auto px-4 space-y-16">
        
        {/* Core Mission */}
        <div className="grid md:grid-cols-3 gap-8 items-start border-b border-stone-200/50 dark:border-stone-850/50 pb-16">
          <div className="md:col-span-1 space-y-1">
            <span className="text-emerald-700 dark:text-emerald-450 text-[10px] font-bold uppercase tracking-widest">Our Vision</span>
            <h2 className="text-2xl font-light tracking-tight text-stone-900 dark:text-white">Core Mission</h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-lg font-light text-stone-600 dark:text-stone-300 leading-relaxed">
              To pioneer an ethical, ride-free sanctuary model in Sauraha that frees working elephants from chains and saddles, while establishing a sustainable livelihoods structure for local mahouts through compassionate care methods.
            </p>
          </div>
        </div>

        {/* Strategic Goals */}
        <div className="space-y-10">
          <div className="space-y-1">
            <span className="text-emerald-700 dark:text-emerald-450 text-[10px] font-bold uppercase tracking-widest">Target Actions</span>
            <h2 className="text-2xl font-light tracking-tight text-stone-900 dark:text-white">Strategic Goals</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Goal 1 */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-450">01 / Direct Liberation</span>
              <h3 className="font-semibold text-stone-900 dark:text-white text-base">Sanctuary & Safety</h3>
              <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed font-light">
                Directly acquiring working elephants from commercial tourism to provide permanent shelter, medical rehabilitation, and chain-free forest grazing.
              </p>
            </div>

            {/* Goal 2 */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-450">02 / Mahout Empowerment</span>
              <h3 className="font-semibold text-stone-900 dark:text-white text-base">Cooperative Livelihoods</h3>
              <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed font-light">
                Employing local handlers (mahouts) and training them in positive reinforcement techniques, transforming traditional restraint habits into cooperative care.
              </p>
              <div className="pt-2">
                <a 
                  href="https://your-fundraiser-link.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-450 hover:underline"
                >
                  Support training fund <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Goal 3 */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-450">03 / Educational Encounters</span>
              <h3 className="font-semibold text-stone-900 dark:text-white text-base">Hands-Off Advocacy</h3>
              <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed font-light">
                Providing visitors with educational, observant experiences (nutrition prep, walking, bathing) to inspire conservation awareness without animal stress.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* MEET THE HERD SECTION (SINGLE RESCUE CARD) */}
      <section id="herd" className="py-20 bg-stone-100/40 dark:bg-stone-900/20 border-t border-b border-stone-200/50 dark:border-stone-850/50 px-4 transition-colors">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-emerald-700 dark:text-emerald-450 text-[10px] font-bold uppercase tracking-widest">Active Campaign</span>
            <h2 className="text-2xl font-light tracking-tight text-stone-900 dark:text-white">Elephant Rescue Fund</h2>
            <p className="text-stone-500 dark:text-stone-450 max-w-md mx-auto text-xs font-light">
              Help buy out and liberate a working tourist elephant in Sauraha. 100% of contributions go directly to rescue and veterinary care.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Centered Single Elephant Card */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 shadow-md flex flex-col">
              <div className="relative aspect-video w-full bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center border-b border-stone-200/60 dark:border-stone-850/50 text-stone-400 dark:text-stone-500 p-6 gap-2 text-center">
                <Camera className="w-10 h-10 text-stone-300 dark:text-stone-800" />
                <span className="text-xs font-medium">Rescue in Progress • Photo Coming Soon</span>
                <span className="text-[9px] text-stone-400 dark:text-stone-600 max-w-xs font-light">Elephant details will be updated as soon as rescue contracts are finalized.</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-stone-800 dark:text-white">Upcoming Rescue Candidate</h3>
                    <span className="bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider animate-pulse">
                      Active Pledge
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-500" /> Campaign Goal: Rs. 2,000,000
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed font-light">
                    Your contribution guarantees direct liberation from commercial riding tours and provides full lifetime shelter support at the sanctuary.
                  </p>
                </div>
                
                <button 
                  onClick={() => setIsDonateModalOpen(true)}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  Donate to Rescue this Elephant
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ETHICAL VISITOR EXPERIENCES SECTION */}
      <section id="experiences" className="py-20 max-w-5xl mx-auto px-4 space-y-12">
        
        <div className="text-center space-y-2">
          <span className="text-emerald-700 dark:text-emerald-450 text-[10px] font-bold uppercase tracking-widest">Sauraha Encounters</span>
          <h2 className="text-2xl font-light tracking-tight text-stone-900 dark:text-white">Educational Program</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Exp 1 */}
          <div className="border border-stone-200/60 dark:border-stone-850/50 p-6 rounded-xl space-y-3 bg-white dark:bg-stone-900/50 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-450">
                <Footprints className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Forest Walks</h3>
              <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-light">
                Walk alongside elephants through natural pathways. Observe foraging habits up close from a safe distance.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              <span>Duration: 2 hrs</span>
              <span className="text-emerald-750 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-100/50 dark:border-emerald-900/30">Price: TBD</span>
            </div>
          </div>

          {/* Exp 2 */}
          <div className="border border-stone-200/60 dark:border-stone-850/50 p-6 rounded-xl space-y-3 bg-white dark:bg-stone-900/50 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-450">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Feed Preparation</h3>
              <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-light">
                Craft supplementary food bundles using grass, salt, and molasses, and feed them with care.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              <span>Duration: 1.5 hrs</span>
              <span className="text-emerald-750 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-100/50 dark:border-emerald-900/30">Price: TBD</span>
            </div>
          </div>

          {/* Exp 3 */}
          <div className="border border-stone-200/60 dark:border-stone-850/50 p-6 rounded-xl space-y-3 bg-white dark:bg-stone-900/50 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-450">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Bathing Observation</h3>
              <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-light">
                Observe elephants splash and bathe in the Rapti River. A natural highlight for photography.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              <span>Duration: 1 hr</span>
              <span className="text-emerald-750 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-100/50 dark:border-emerald-900/30">Price: TBD</span>
            </div>
          </div>

          {/* Exp 4 */}
          <div className="border border-stone-200/60 dark:border-stone-850/50 p-6 rounded-xl space-y-3 bg-white dark:bg-stone-900/50 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-450">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-stone-900 dark:text-white text-sm">Volunteer Program</h3>
              <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-light">
                Assist mahouts with shelter management, fodder harvesting, and community outreach.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              <span>Flexible Slots</span>
              <span className="text-emerald-750 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-100/50 dark:border-emerald-900/30">Price: TBD</span>
            </div>
          </div>
        </div>

      </section>

      {/* MEDIA / GALLERY SECTION (SLIDING CAROUSEL) */}
      <section id="gallery" className="py-20 bg-stone-100/40 dark:bg-stone-900/20 border-t border-b border-stone-200/50 dark:border-stone-850/50 px-4 transition-colors">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-emerald-700 dark:text-emerald-450 text-[10px] font-bold uppercase tracking-widest">Visual updates</span>
            <h2 className="text-2xl font-light tracking-tight text-stone-900 dark:text-white">Sanctuary Gallery</h2>
            <p className="text-stone-500 dark:text-stone-400 text-xs font-light">Flip through updates of our ongoing campaign.</p>
          </div>

          {/* Image Slider Container */}
          <div className="relative bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row transition-all duration-300">
            
            {/* Left Image Placeholder */}
            <div className="sm:w-1/2 aspect-video sm:aspect-auto bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-6 text-stone-450 dark:text-stone-500 border-b sm:border-b-0 sm:border-r border-stone-200/60 dark:border-stone-850/50 min-h-[220px]">
              <Camera className="w-10 h-10 text-stone-300 dark:text-stone-800" />
              <span className="text-[10px] font-bold tracking-widest uppercase mt-2">Coming Soon</span>
              <span className="text-[9px] text-stone-400 dark:text-stone-605 mt-1">Image {GALLERY_ITEMS[activeSlide].id}</span>
            </div>

            {/* Right Content */}
            <div className="sm:w-1/2 p-8 flex flex-col justify-between min-h-[260px] space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-450">
                    {GALLERY_ITEMS[activeSlide].subtitle}
                  </span>
                  <span className="text-[10px] text-stone-450 dark:text-stone-500 font-bold font-mono">
                    {GALLERY_ITEMS[activeSlide].id} / 06
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-800 dark:text-white">
                  {GALLERY_ITEMS[activeSlide].title}
                </h3>
                <p className="text-stone-550 dark:text-stone-400 text-xs leading-relaxed font-light">
                  {GALLERY_ITEMS[activeSlide].description}
                </p>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-850 pt-4">
                <div className="flex gap-2">
                  {GALLERY_ITEMS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        activeSlide === index 
                          ? 'bg-emerald-750 dark:bg-emerald-500 w-4' 
                          : 'bg-stone-200 dark:bg-stone-800 hover:bg-stone-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="p-1.5 border border-stone-200 dark:border-stone-800 rounded-lg bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-850 text-stone-600 dark:text-stone-400 transition"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-1.5 border border-stone-200 dark:border-stone-800 rounded-lg bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-850 text-stone-600 dark:text-stone-400 transition"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* VOLUNTEER & BOOKING INQUIRY FORM */}
      <section id="volunteer" className="py-20 max-w-xl mx-auto px-4">
        <VolunteerForm />
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 dark:bg-stone-950 text-stone-450 dark:text-stone-500 py-16 px-4 border-t border-stone-850 dark:border-stone-900 transition-colors text-xs text-center font-light">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p>© 2026 The Chain Free Project. Local movement for ethical elephant welfare and conservation.</p>
          <div className="flex gap-6 uppercase tracking-wider text-[10px] font-bold">
            <a href="#about" className="hover:text-white dark:hover:text-stone-200 transition-colors duration-200">Our Mission</a>
            <a href="#herd" className="hover:text-white dark:hover:text-stone-200 transition-colors duration-200">Rescue Campaign</a>
            <a href="#volunteer" className="hover:text-white dark:hover:text-stone-200 transition-colors duration-200">Bookings</a>
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
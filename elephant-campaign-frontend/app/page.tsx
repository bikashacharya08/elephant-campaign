'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Heart, Users, MessageCircle, Share2, ShieldAlert, CheckCircle } from 'lucide-react';

export default function ElephantCampaignLanding() {
  // JavaScript State: Short-term memory to handle form inputs
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // JavaScript Handler: Manages changes inside the form fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // JavaScript Handler: Triggered when user clicks "Submit Application"
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    // Send the form data to our fresh XAMPP Laravel API endpoint
    const response = await fetch('https://elephant-campaign-production.up.railway.app/api/volunteer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // If the backend says "201 Created", flip the success screen and clear form!
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      const errorData = await response.json();
      alert('Oops! Something went wrong: ' + (errorData.message || 'Server error'));
    }
  } catch (error) {
    console.error('API Error:', error);
    alert('Could not connect to the backend server. Make sure php artisan serve is running!');
  }
};

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-emerald-800 text-lg tracking-tight">
            <span>🐘 The Chain Free Project</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-emerald-700 transition">Our Mission</a>
            <a href="#gallery" className="hover:text-emerald-700 transition">Media</a>
            <a href="#volunteer" className="hover:text-emerald-700 transition">Volunteer</a>
          </nav>
          <a 
            href="#donate" 
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm"
          >
            Donate Now
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-stone-900 text-white py-24 md:py-32 px-4 overflow-hidden">
        {/* Subtle background overlay pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#2c3e2e_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldAlert className="w-3.5 h-3.5" /> Stop Elephant Riding
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Born to Rule the Wild forests, <br />
            <span className="text-emerald-400">Not to Spend Life in Chains.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-light">
            Elephants belong in nature, not chains. Help us secure funding, organize community action, and transition working elephants into peaceful, ethical sanctuaries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a 
              href="#donate" 
              className="bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-bold px-8 py-3.5 rounded-lg transition shadow-lg text-center"
            >
              Support the Fundraiser
            </a>
            <a 
              href="#volunteer" 
              className="bg-transparent hover:bg-white/10 text-white font-semibold border border-stone-500 px-8 py-3.5 rounded-lg transition text-center"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>

      {/* MISSION & ABOUT SECTION */}
      <section id="about" className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Set Chains Free</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              We advocate directly against the practice of tourist elephant riding. Our core mission focuses on shifting systems toward cruelty-free sanctuary spaces.
            </p>
          </div>

          <div id="donate" className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-4 ring-2 ring-emerald-600/20">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Raise Critical Funding</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Your donations directly support elephant handlers (mahouts) adopting ethical care models, food supplies, and veterinary care.
            </p>
            <a 
              href="https://your-fundraiser-link.com" 
              target="_blank" 
              className="inline-block w-full text-center text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 py-2.5 rounded-lg transition"
            >
              Go to Donation Link →
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Community Action</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Real change happens on the ground. We provide educational templates, public media distribution, and coordinate on-site volunteer support teams.
            </p>
          </div>
        </div>
      </section>

      {/* MEDIA / GALLERY SECTION */}
      <section id="gallery" className="py-16 bg-stone-100 border-y border-stone-200 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Campaign Media Hub</h2>
            <p className="text-stone-600 max-w-md mx-auto text-sm">Visual truth and awareness directly from our monitoring efforts.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm">
            <img 
              src="/elephant-1.jpg" 
              alt="Rescued elephant in sanctuary" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            />
            </div>
            <div className="aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm">
            <img 
              src="/elephant-2.jpg" 
              alt="Rescued elephant in sanctuary" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            />
            </div>
            <div className="aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm">
            <img 
              src="/elephant-3.jpg" 
              alt="Rescued elephant in sanctuary" 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
            />
            </div>
            <div className="aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm">
  <img 
    src="/elephant-4.jpg" 
    alt="Closer shot of elephant trunk" 
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
  />
</div>
<div className="aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm">
  <img 
    src="/elephant-5.jpg" 
    alt="Closer shot of elephant trunk" 
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
  />
</div>
<div className="aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm">
  <img 
    src="/elephant-6.jpg" 
    alt="Closer shot of elephant trunk" 
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
  />
</div>
          </div>
        </div>
      </section>

      {/* VOLUNTEER CAPTURE FORM */}
      <section id="volunteer" className="py-20 max-w-xl mx-auto px-4">
        <div className="bg-white border border-stone-200 p-8 rounded-2xl shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-stone-900">Join as a Volunteer</h2>
            <p className="text-stone-500 text-sm">Fill your details below to become part of the active campaign team.</p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Application Received!</p>
                <p className="text-xs text-emerald-700 mt-0.5">Thank you for joining the campaign. We will be in touch soon!</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name" 
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@example.com" 
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">How can you help?</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us why you'd like to help free elephants..." 
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-stone-900 hover:bg-stone-850 text-white font-semibold py-2.5 rounded-lg text-sm transition"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 border-t border-stone-800 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 The Chain Free Project.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#volunteer" className="hover:text-white transition">Volunteer</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP CHAT WIDGET */}
      <a 
        href="https://wa.me/9779865345753?text=Hi!%20I%20want%20to%20know%20more%20about%20The%20Chain%20Free%20Project." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
          Chat With Us (Whatsapp)
        </span>
      </a>

    </div>
  );
}

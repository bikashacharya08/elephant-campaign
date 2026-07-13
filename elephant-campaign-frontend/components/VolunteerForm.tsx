'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CheckCircle, Calendar, Users } from 'lucide-react';

export default function VolunteerForm() {
  const [formType, setFormType] = useState<'volunteer' | 'booking'>('volunteer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'volunteer',
    date: '',
    guests: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTypeChange = (type: 'volunteer' | 'booking') => {
    setFormType(type);
    setFormData({
      ...formData,
      type: type,
      date: '',
      guests: ''
    });
    setFormErrors({});
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setIsSubmitting(true);

    // Prepare payload
    const payload = {
      ...formData,
      // Convert guests to integer if present
      guests: formData.guests ? parseInt(formData.guests, 10) : null,
      // If type is volunteer, clear out date
      date: formData.type === 'booking' ? formData.date : null,
    };

    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const isMissingEnv = !baseApiUrl || baseApiUrl === 'undefined' || baseApiUrl.trim() === '';
    const apiUrl = isMissingEnv ? 'http://localhost:8000/api' : baseApiUrl;

    console.log('[Volunteer Form API Request] Posting to URL:', `${apiUrl}/volunteer`);

    try {
      const response = await fetch(`${apiUrl}/volunteer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          name: '',
          email: '',
          type: formType,
          date: '',
          guests: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        if (response.status === 422 && errorData.errors) {
          setFormErrors(errorData.errors);
        } else {
          alert('Sorry, an error occurred: ' + (errorData.message || 'Server error'));
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      let errorMsg = 'Could not connect to the server. Please verify the backend is running!';
      if (isMissingEnv) {
        errorMsg += '\n\n(Debugging Note: The NEXT_PUBLIC_API_URL environment variable is not defined. Please configure it in your Railway dashboard to point to your backend API, e.g. https://your-backend.up.railway.app/api)';
      }
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date string for min date in date picker
  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white/80 dark:bg-[#0b1c12]/80 backdrop-blur-xl border border-[#34d399]/20 p-6 sm:p-10 rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgb(16,185,129,0.05)] hover:shadow-[0_30px_60px_rgb(16,185,129,0.1)] transition-all duration-500 space-y-8">
      
      {/* FORM TAB SELECTORS */}
      <div className="flex border-b border-stone-150 dark:border-stone-800">
        <button
          type="button"
          onClick={() => handleTypeChange('volunteer')}
          className={`flex-1 text-center pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 border-b-2 ${
            formType === 'volunteer'
              ? 'border-emerald-600 text-emerald-800 dark:text-emerald-450 dark:border-emerald-500'
              : 'border-transparent text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-305'
          }`}
        >
          Volunteer Application
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('booking')}
          className={`flex-1 text-center pb-3.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 border-b-2 ${
            formType === 'booking'
              ? 'border-emerald-600 text-emerald-800 dark:text-emerald-450 dark:border-emerald-500'
              : 'border-transparent text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-305'
          }`}
        >
          Experience Booking
        </button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-light tracking-tight text-[#064e3b] dark:text-white">
          {formType === 'volunteer' ? 'Join the Movement' : 'Schedule an Ethical Visit'}
        </h2>
        <p className="text-[#4b6b58] dark:text-[#8cb89f] text-sm font-light">
          {formType === 'volunteer' 
            ? 'Fill in your details below to become a vital part of our elephant conservation team.'
            : 'Book a sensitive, hands-off ethical visit with our elephants in Sauraha.'}
        </p>
      </div>

      {formSubmitted ? (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/10 text-emerald-950 dark:text-emerald-350 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-8 flex flex-col items-center text-center gap-4 transition duration-500 ease-out animate-fadeInUp">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shadow-inner">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-lg">
              {formType === 'volunteer' ? 'Application Received!' : 'Booking Request Received!'}
            </p>
            <p className="text-sm text-emerald-850/85 dark:text-emerald-400/85 mt-1 max-w-sm font-light">
              {formType === 'volunteer'
                ? 'Thank you for joining our campaign. Our team will review your application and reach out to you shortly!'
                : 'Thank you! We have received your booking inquiry and will contact you soon to confirm availability.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormSubmitted(false)}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-850 dark:hover:text-emerald-305 underline mt-2"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your Name" 
              className={`w-full px-3.5 py-2.5 bg-white dark:bg-stone-950 text-stone-900 dark:text-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 dark:focus:ring-emerald-500/20 focus:border-emerald-700 dark:focus:border-emerald-500 transition ${formErrors.name ? 'border-red-400 dark:border-red-550 bg-red-50/50 dark:bg-red-950/20' : 'border-stone-300 dark:border-stone-700'}`}
            />
            {formErrors.name && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.name[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="name@example.com" 
              className={`w-full px-3.5 py-2.5 bg-white dark:bg-stone-950 text-stone-900 dark:text-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 dark:focus:ring-emerald-500/20 focus:border-emerald-700 dark:focus:border-emerald-500 transition ${formErrors.email ? 'border-red-400 dark:border-red-550 bg-red-50/50 dark:bg-red-950/20' : 'border-stone-300 dark:border-stone-700'}`}
            />
            {formErrors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.email[0]}</p>
            )}
          </div>

          {/* DYNAMIC BOOKING FIELDS */}
          {formType === 'booking' && (
            <div className="grid grid-cols-2 gap-4 animate-fadeInUp">
              <div>
                <label className="flex items-center gap-1 block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" /> Preferred Date
                </label>
                <input 
                  type="date" 
                  name="date"
                  min={getTomorrowString()}
                  value={formData.date}
                  onChange={handleInputChange}
                  required={formType === 'booking'}
                  className={`w-full px-3.5 py-2.5 bg-white dark:bg-stone-950 text-stone-900 dark:text-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 dark:focus:ring-emerald-500/20 focus:border-emerald-700 dark:focus:border-emerald-500 transition ${formErrors.date ? 'border-red-400 dark:border-red-550 bg-red-50/50 dark:bg-red-950/20' : 'border-stone-300 dark:border-stone-700'}`}
                />
                {formErrors.date && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.date[0]}</p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-1 block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                  <Users className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" /> No. of Guests
                </label>
                <input 
                  type="number" 
                  name="guests"
                  min="1"
                  max="50"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required={formType === 'booking'}
                  placeholder="2" 
                  className={`w-full px-3.5 py-2.5 bg-white dark:bg-stone-950 text-stone-900 dark:text-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 dark:focus:ring-emerald-500/20 focus:border-emerald-700 dark:focus:border-emerald-500 transition ${formErrors.guests ? 'border-red-400 dark:border-red-550 bg-red-50/50 dark:bg-red-950/20' : 'border-stone-300 dark:border-stone-700'}`}
                />
                {formErrors.guests && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.guests[0]}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              {formType === 'volunteer' ? 'How can you help?' : 'Special Notes or Comments'}
            </label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              placeholder={formType === 'volunteer' ? "Tell us why you want to support chain-free elephant welfare..." : "Specify any requests, preferences, or details here..."}
              className={`w-full px-4 py-3 bg-[#f1f6f1]/50 dark:bg-[#050f08]/50 text-[#064e3b] dark:text-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]/30 dark:focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all ${formErrors.message ? 'border-red-400 bg-red-50/50' : 'border-[#34d399]/30 hover:border-[#10b981]/50'}`}
            ></textarea>
            {formErrors.message && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.message[0]}</p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_20px_rgb(16,185,129,0.25)] hover:shadow-[0_12px_25px_rgb(16,185,129,0.4)] hover:-translate-y-1 active:scale-[0.98]"
          >
            {isSubmitting 
              ? 'Submitting...' 
              : formType === 'volunteer' 
                ? 'Submit Application' 
                : 'Send Booking Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
}

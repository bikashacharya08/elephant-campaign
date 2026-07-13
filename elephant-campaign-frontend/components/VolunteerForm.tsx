'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CheckCircle } from 'lucide-react';

export default function VolunteerForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/volunteer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        if (response.status === 422 && errorData.errors) {
          setFormErrors(errorData.errors);
        } else {
          alert('Oops! Something went wrong: ' + (errorData.message || 'Server error'));
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Could not connect to the backend server. Make sure the API server is running!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-stone-200 p-8 rounded-2xl shadow-sm space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-stone-900">Join as a Volunteer</h2>
        <p className="text-stone-500 text-sm">Fill your details below to become part of the active campaign team.</p>
      </div>

      {formSubmitted ? (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 text-emerald-950 border border-emerald-100 rounded-2xl p-8 flex flex-col items-center text-center gap-4 transition duration-500 ease-out animate-fadeInUp">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-inner">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-lg">Application Received!</p>
            <p className="text-sm text-emerald-800/85 mt-1 max-w-sm">Thank you for joining the campaign. We will review your application and be in touch soon!</p>
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
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition ${formErrors.name ? 'border-red-400 bg-red-50/50' : 'border-stone-300'}`}
            />
            {formErrors.name && (
              <p className="mt-1 text-xs text-red-600">{formErrors.name[0]}</p>
            )}
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
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition ${formErrors.email ? 'border-red-400 bg-red-50/50' : 'border-stone-300'}`}
            />
            {formErrors.email && (
              <p className="mt-1 text-xs text-red-600">{formErrors.email[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">How can you help?</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              placeholder="Tell us why you'd like to help free elephants..." 
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition ${formErrors.message ? 'border-red-400 bg-red-50/50' : 'border-stone-300'}`}
            ></textarea>
            {formErrors.message && (
              <p className="mt-1 text-xs text-red-600">{formErrors.message[0]}</p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  );
}

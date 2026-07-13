'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Heart, ShieldCheck, QrCode, Coins, CheckCircle } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  elephantName: string;
}

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

export default function DonateModal({ isOpen, onClose, elephantName }: DonateModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: ''
  });
  const [selectedPreset, setSelectedPreset] = useState<number | null>(1000); // Default preset
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  if (!isOpen) return null;

  const handlePresetSelect = (amount: number) => {
    setSelectedPreset(amount);
    setIsCustomAmount(false);
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
    setErrors(prev => ({ ...prev, amount: [] }));
  };

  const handleCustomMode = () => {
    setSelectedPreset(null);
    setIsCustomAmount(true);
    setFormData(prev => ({ ...prev, amount: '' }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const donationAmount = selectedPreset !== null ? selectedPreset : parseFloat(formData.amount);

    if (isNaN(donationAmount) || donationAmount <= 0) {
      setErrors({ amount: ['Please specify a valid donation amount (Minimum Rs. 1)'] });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      type: 'donation',
      amount: donationAmount,
      message: formData.message || `Fundraising contribution for ${elephantName}`
    };

    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const isMissingEnv = !baseApiUrl || baseApiUrl === 'undefined' || baseApiUrl.trim() === '';
    const apiUrl = isMissingEnv ? 'http://localhost:8000/api' : baseApiUrl;

    console.log('[Donation Form API Request] Posting to URL:', `${apiUrl}/volunteer`);

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
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        if (response.status === 422 && errorData.errors) {
          setErrors(errorData.errors);
        } else {
          alert('Error occurred: ' + (errorData.message || 'Server error.'));
        }
      }
    } catch (error) {
      console.error('Donation Submission Error:', error);
      let errorMsg = 'Could not connect to the server. Please verify the backend is running!';
      if (isMissingEnv) {
        errorMsg += '\n\n(Debugging Note: The NEXT_PUBLIC_API_URL environment variable is not defined. Please configure it in your Railway dashboard to point to your backend API, e.g. https://your-backend.up.railway.app/api)';
      }
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', amount: '', message: '' });
    setSelectedPreset(1000);
    setIsCustomAmount(false);
    setErrors({});
    onClose();
  };

  const finalAmount = selectedPreset !== null ? selectedPreset : parseFloat(formData.amount || '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 dark:bg-stone-950/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn" 
        onClick={resetAndClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white dark:bg-stone-900 rounded-2xl w-full max-w-lg shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-scaleUp">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 dark:from-emerald-900 dark:to-stone-950 text-white p-6 relative">
          <button 
            onClick={resetAndClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700/50 flex items-center justify-center border border-emerald-500/30">
              <Heart className="w-5 h-5 fill-emerald-400 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Elephant Rescue Campaign</h3>
              <p className="text-emerald-300 dark:text-emerald-400 text-xs">{elephantName} Rescue & Support Fund</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-stone-900">
          {isSubmitted ? (
            /* Success Screen */
            <div className="space-y-6 text-stone-700 dark:text-stone-300 animate-fadeInUp">
              <div className="text-center space-y-3 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 mx-auto flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 dark:text-white">Pledge Submitted Successfully!</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Thank you, <span className="font-semibold text-stone-850 dark:text-stone-100">{formData.name}</span>, for your generous pledge of <span className="font-semibold text-stone-850 dark:text-stone-100">Rs. {finalAmount.toLocaleString()}</span>.
                </p>
              </div>

              {/* Payment Instructions */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm">
                  <Coins className="w-4 h-4" /> Next Steps to Complete Donation:
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Our team will send a verification and details email to <span className="font-semibold text-stone-800 dark:text-stone-200">{formData.email}</span>. If you wish to complete the transfer right away, please use the details below:
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {/* Bank Transfer Details */}
                  <div className="bg-white dark:bg-stone-950 p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 text-[11px] space-y-1.5 shadow-sm text-stone-700 dark:text-stone-300">
                    <span className="font-bold text-stone-800 dark:text-stone-200 text-xs block border-b dark:border-stone-800 pb-1 mb-1 text-emerald-700 dark:text-emerald-400">Bank Transfer:</span>
                    <div><span className="text-stone-400 dark:text-stone-500">Bank:</span> Nepal Bank Limited</div>
                    <div><span className="text-stone-400 dark:text-stone-500">Account Name:</span> The Chain Free Project</div>
                    <div><span className="text-stone-400 dark:text-stone-500">Account No:</span> 0120100012345</div>
                    <div><span className="text-stone-400 dark:text-stone-500">Branch:</span> Sauraha, Chitwan</div>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="bg-white dark:bg-stone-950 p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center gap-2 shadow-sm text-center">
                    <div className="w-20 h-20 bg-stone-100 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800 flex items-center justify-center relative group">
                      <QrCode className="w-12 h-12 text-stone-400 dark:text-stone-500" />
                      <span className="absolute text-[8px] bg-emerald-850 dark:bg-emerald-750 text-white font-bold px-1 py-0.5 rounded bottom-1 uppercase">Fonepay</span>
                    </div>
                    <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300">Scan QR Code</span>
                  </div>
                </div>
                
                <div className="text-[10px] text-stone-400 dark:text-stone-500 flex items-center gap-1.5 justify-center border-t dark:border-stone-850 pt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Secure & Transparent Contribution System
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full bg-stone-900 dark:bg-stone-800 hover:bg-stone-850 dark:hover:bg-stone-750 text-white font-semibold py-3 rounded-lg text-sm transition"
              >
                Close
              </button>
            </div>
          ) : (
            /* Donation Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                We are raising funds to buy out and rescue an elephant currently working in tourist riding in Sauraha, freeing them forever from heavy saddles and chains. Your donation directly funds their rescue, veterinary checkup, and freedom.
              </p>

              {/* Amount Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">Select Donation Amount</label>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AMOUNTS.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handlePresetSelect(amount)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold transition border ${
                        selectedPreset === amount
                          ? 'bg-emerald-800 dark:bg-emerald-700 text-white border-emerald-800 dark:border-emerald-700 shadow-sm'
                          : 'bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-705 text-stone-705 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      Rs. {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleCustomMode}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition border ${
                      isCustomAmount
                        ? 'bg-emerald-800 dark:bg-emerald-705 text-white border-emerald-800 dark:border-emerald-750 shadow-sm'
                        : 'bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-750 border-dashed'
                    }`}
                  >
                    + Custom Amount
                  </button>
                </div>

                {isCustomAmount && (
                  <div className="animate-fadeInUp relative mt-2">
                    <span className="absolute left-3.5 top-2.5 text-stone-400 dark:text-stone-500 font-bold text-sm">Rs.</span>
                    <input
                      type="number"
                      name="amount"
                      min="1"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required={isCustomAmount}
                      placeholder="1000, 5000, 10000..."
                      className="w-full pl-10 pr-4 py-2 bg-white dark:bg-stone-950 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-705/20 focus:border-emerald-700 dark:focus:ring-emerald-500/20 dark:focus:border-emerald-500 transition"
                    />
                  </div>
                )}
                {errors.amount && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.amount[0]}</p>
                )}
              </div>

              {/* Personal Details */}
              <div className="space-y-3.5 border-t border-stone-100 dark:border-stone-800 pt-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-stone-950 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 dark:focus:ring-emerald-500/20 dark:focus:border-emerald-500 transition"
                  />
                  {errors.name && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.name[0]}</p>}
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
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-stone-950 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 dark:focus:ring-emerald-500/20 dark:focus:border-emerald-500 transition"
                  />
                  {errors.email && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.email[0]}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Message or Comments (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Words of encouragement or notes..."
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-stone-950 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 dark:focus:ring-emerald-500/20 dark:focus:border-emerald-500 transition"
                  />
                  {errors.message && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.message[0]}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold py-3.5 rounded-lg text-sm transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white" />
                    Pledge Rs. {finalAmount.toLocaleString()} to Rescue
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

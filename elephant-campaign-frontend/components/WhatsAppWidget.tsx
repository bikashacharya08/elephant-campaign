'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  return (
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
  );
}

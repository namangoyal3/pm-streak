"use client";

import React from 'react';
import { Check, Zap, Star, Shield, Rocket, Target, Users } from 'lucide-react';

const BENEFITS = [
  {
    icon: <Zap size={20} className="text-yellow-400" />,
    title: "50 Monthly Credits",
    desc: "Unlock lessons 5x faster than free users with a massive credit boost."
  },
  {
    icon: <Rocket size={20} className="text-blue-400" />,
    title: "All 292+ Archive Lessons",
    desc: "Instant access to the full Lenny's Podcast archive—no batch waiting."
  },
  {
    icon: <Star size={20} className="text-purple-400" />,
    title: "Unlimited AI Lessons",
    desc: "Generate custom lessons on any PM topic with our grounded AI engine."
  },
  {
    icon: <Target size={20} className="text-green-400" />,
    title: "PM Jobs Board",
    desc: "Access the hidden job market with curated roles updated weekly."
  },
  {
    icon: <Shield size={20} className="text-cyan-400" />,
    title: "Interview Prep",
    desc: "Master strategy, metrics, and execution with AI interview simulations."
  },
  {
    icon: <Users size={20} className="text-pink-400" />,
    title: "WhatsApp Community",
    desc: "Network with active PMs for job referrals and peer accountability."
  }
];

export default function PricingBenefits() {
  return (
    <div className="py-12 border-t border-white/10 mt-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black mb-3 text-white">Why Go Pro?</h2>
        <p className="text-white/60 text-sm max-w-lg mx-auto">
          Join 500+ product managers accelerating their careers with the full PM Streak experience.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map((b, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex gap-4 transition-all hover:bg-white/10">
            <div className="p-2.5 rounded-xl bg-white/5 h-fit">
              {b.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">{b.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

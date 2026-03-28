"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ORIGINAL_PRICE = 499;
const SALE_PRICE = Math.round(ORIGINAL_PRICE * 0.3);

export default function PricingBannerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    const closed = localStorage.getItem("pricing-banner-closed");
    if (closed) {
      setHasClosed(true);
    } else {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasClosed(true);
    localStorage.setItem("pricing-banner-closed", "true");
  };

  if (hasClosed && !isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl border-2 border-purple-500/50 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1.5 text-xs font-black text-red-300 uppercase tracking-wider mb-4">
                <Zap size={14} className="animate-pulse" /> Limited Time
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                🎉 70% OFF
              </h2>
              <p className="text-purple-200 text-sm mb-4">
                Special launch pricing for the first <span className="text-white font-black">500 users</span> only!
              </p>
              
              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <p className="text-white/60 text-xs mb-2">Monthly Pro</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-black text-white">₹{SALE_PRICE}</span>
                  <span className="text-white/40 line-through text-lg">₹{ORIGINAL_PRICE}</span>
                </div>
                <p className="text-green-400 text-xs font-bold mt-2">You save ₹{ORIGINAL_PRICE - SALE_PRICE}!</p>
              </div>

              <Link
                href="/pricing"
                onClick={handleClose}
                className="block w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles size={16} className="inline mr-2" />
                Claim Your Discount
              </Link>
              
              <p className="text-white/40 text-[10px] mt-4">
                Offer valid for first 500 users. Prices go up after limit reached.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

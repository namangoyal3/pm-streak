"use client";

import { useState, useEffect } from "react";
import { Sparkles, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            backgroundColor: ["#f472b6", "#a855f7", "#22c55e", "#3b82f6", "#facc15", "#ef4444"][i % 6],
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}

export default function PricingBannerModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIndia, setIsIndia] = useState(true);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setIsIndia(tz === "Asia/Calcutta" || tz === "Asia/Kolkata");
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };



  if (!isVisible) return null;

  return (
    <>
      {/* CSS for confetti animation */}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
      
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />
        <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl border-2 border-purple-500/50 shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
          <Confetti />
          
          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1.5 text-xs font-black text-red-300 uppercase tracking-wider mb-4">
              <Zap size={14} className="animate-pulse" /> Limited Time Offer
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
              🎉 SPECIAL OFFER
            </h2>
            <p className="text-purple-200 text-sm mb-6">
              Exclusive Founder&apos;s Discount is <span className="text-green-400 font-black italic underline decoration-green-400/30">already applied</span> to your account.
            </p>
            
            <div className="bg-white/10 rounded-xl p-4 mb-6 border-2 border-dashed border-purple-400/30">
              <div className="flex items-center justify-center gap-2">
                <Check size={24} className="text-green-400" />
                <span className="text-xl font-black tracking-wider text-green-400 uppercase">Discount Applied</span>
              </div>
              <p className="text-white/40 text-[10px] mt-2">Prices below reflect your exclusive launch discount</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-white/60 text-xs mb-3">Your special launch pricing:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Monthly</span>
                  {isIndia ? (
                    <span className="whitespace-nowrap"><span className="line-through text-white/30">₹423</span> <span className="text-green-400 font-black">₹249 <span className="text-[10px] opacity-80">(SPECIAL)</span></span></span>
                  ) : (
                    <span className="whitespace-nowrap"><span className="line-through text-white/30">$10</span> <span className="text-green-400 font-black">$6 <span className="text-[10px] opacity-80">(SPECIAL)</span></span></span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Quarterly</span>
                  {isIndia ? (
                    <span className="whitespace-nowrap"><span className="line-through text-white/30">₹1,137</span> <span className="text-green-400 font-black">₹669 <span className="text-[10px] opacity-80">(SPECIAL)</span></span></span>
                  ) : (
                    <span className="whitespace-nowrap"><span className="line-through text-white/30">$19</span> <span className="text-green-400 font-black">$11 <span className="text-[10px] opacity-80">(SPECIAL)</span></span></span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Yearly</span>
                  {isIndia ? (
                    <span className="whitespace-nowrap"><span className="line-through text-white/30">₹2,123</span> <span className="text-green-400 font-black">₹1,249 <span className="text-[10px] opacity-80">(SPECIAL)</span></span></span>
                  ) : (
                    <span className="whitespace-nowrap"><span className="line-through text-white/30">$54</span> <span className="text-green-400 font-black">$32 <span className="text-[10px] opacity-80">(SPECIAL)</span></span></span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Claim My Discount
            </button>
            
            <p className="text-white/40 text-[10px] mt-4">
              Discount automatically applied • Valid for first 500 users
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

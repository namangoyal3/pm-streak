"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Zap, Check, Loader2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CouponInputModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const DEFAULT_COUPON = "FLAT70";

export default function CouponInputModal({ onClose, onSuccess }: CouponInputModalProps) {
  const [couponCode, setCouponCode] = useState(DEFAULT_COUPON);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim().toUpperCase() }),
      });

      const data = await res.json();

      if (data.valid) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1500);
      } else {
        setError(data.error || "Invalid coupon code");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl border-2 border-purple-500/50 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
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
          <p className="text-purple-200 text-sm mb-6">
            Enter your exclusive coupon code to unlock <span className="text-white font-black">70% OFF</span> on all plans!
          </p>
          
          {success ? (
            <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-6 mb-6">
              <Check size={48} className="text-green-400 mx-auto mb-2" />
              <p className="text-green-300 font-black text-lg">Coupon Applied!</p>
              <p className="text-green-200/70 text-sm mt-1">Redirecting to checkout...</p>
            </div>
          ) : (
            <>
              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <label className="text-white/60 text-xs mb-2 block text-left">Your Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
                    placeholder="FLAT70"
                    className={cn(
                      "flex-1 bg-white/10 border rounded-lg px-4 py-3 text-center font-black text-xl tracking-widest text-white placeholder:text-white/30",
                      error ? "border-red-500" : "border-white/20 focus:border-purple-500"
                    )}
                    maxLength={20}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-xs mt-2 text-left">{error}</p>
                )}
              </div>

              <button
                onClick={handleApply}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Apply Coupon
                  </>
                )}
              </button>
            </>
          )}
          
          <p className="text-white/40 text-[10px] mt-4">
            Coupon codes are case-insensitive
          </p>
        </div>
      </div>
    </div>
  );
}

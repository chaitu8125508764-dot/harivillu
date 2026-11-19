import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('entering'); // 'entering' -> 'active' -> 'exiting' -> 'done'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    // Phase 1: Logo enters & progress fills
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    // Phase 2: Start smooth fade out at 2000ms
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 2000);

    // Phase 3: Fully unmount at 2600ms
    const completeTimer = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('exiting');
    setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 300);
  };

  if (phase === 'done') return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome to Harivillu Collections"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-out select-none ${
        phase === 'exiting'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #2e0510 0%, #170208 60%, #0c0104 100%)'
      }}
    >
      {/* Background Decorative Gold Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/20 via-rose-500/15 to-amber-300/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      {/* Top Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-amber-200 border border-amber-300/30 text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow"
        >
          <span>Enter Store</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Brand Showcase Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm sm:max-w-md">
        
        {/* Floating Auspicious Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-300 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 shadow-sm animate-in fade-in duration-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '5s' }} />
          <span>Pure Silk Heritage</span>
        </div>

        {/* The Official Harivillu Logo with Glowing Frame */}
        <div className="relative group cursor-pointer" onClick={handleSkip}>
          {/* Subtle outer rotating gold aura ring */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-300 opacity-40 blur-md group-hover:opacity-70 transition-opacity animate-pulse"></div>
          
          {/* Circular Gold Bezel */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-600 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white overflow-hidden p-1 flex items-center justify-center shadow-inner">
              <img
                src="/images/harivillu-logo.jpg"
                alt="Harivillu Collections"
                className="w-full h-full object-contain rounded-full transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Brand Typography */}
        <div className="mt-6 space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            <span className="gold-gradient-text">Harivillu</span>
            <span className="block text-xl sm:text-2xl font-normal text-amber-100/90 tracking-widest mt-0.5">
              COLLECTIONS
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-pink-200/80 font-normal tracking-wide max-w-xs">
            Exclusive Pure Silk Sarees, 1-Min Ready-to-Wear & Pattu Half Sarees
          </p>
        </div>

        {/* Elegant Hairline Progress Indicator */}
        <div className="mt-8 w-48 sm:w-56 space-y-2">
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden border border-amber-400/20">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(251,191,36,0.8)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-amber-300/80 font-medium tracking-wider">
            <span>Loading Handloom Vault</span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>

      {/* Bottom Heritage Seal */}
      <div className="absolute bottom-6 inset-x-0 text-center">
        <span className="text-[11px] text-amber-200/50 font-medium tracking-widest uppercase">
          Silk Mark Certified • 100% Handcrafted Tradition
        </span>
      </div>

    </div>
  );
}

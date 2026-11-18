import React from 'react';
import { Clock, ShieldCheck, Video, Sparkles, Smile, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Step In Like A Skirt',
    desc: 'No complicated tucking or separate petticoat needed. Built-in ultra-soft breathable 100% cotton cambric lining touches your child’s skin.',
    icon: '👗'
  },
  {
    step: '02',
    title: 'Fasten Soft Velcro Clasp',
    desc: 'Concealed medical-grade micro-velcro with 4-inch growth expander band. Snug and comfortable, even after festive feast and sweets!',
    icon: '✨'
  },
  {
    step: '03',
    title: 'Toss Pleated Pallu Over Shoulder',
    desc: 'Pre-pressed waterfall pleats fall gracefully over the left shoulder. Zero safety pin pricks. Ready to twirl and dance in 60 seconds flat.',
    icon: '👑'
  }
];

export default function DrapeGuideSection() {
  return (
    <section id="drape-guide" className="py-16 sm:py-24 bg-white border-b border-amber-900/10 relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-rose-700" />
            Zero Fuss • Zero Pins • Zero Tears
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            The 60-Second Ready-to-Wear Magic
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Engineered so young girls feel like royal princesses without the weight, itchiness, or complicated draping of traditional sarees.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, idx) => (
            <div
              key={s.step}
              className="relative p-8 rounded-3xl bg-[#FAF7F2] border border-amber-900/10 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl">{s.icon}</span>
                <span className="font-serif text-3xl font-extrabold text-amber-900/20 group-hover:text-amber-800/40 transition-colors">
                  {s.step}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live Video Shopping Call Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-temple-crimson via-rani-800 to-temple-crimson p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle gold pattern overlay */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-semibold">
                <Video className="w-3.5 h-3.5 text-amber-300" />
                Live Video Call Shopping Experience
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                See The Silk Sheen Live Before You Buy
              </h3>
              <p className="text-sm text-pink-100">
                Unsure about size, length, or color under room lighting? Our master drapers will jump on a 1-on-1 WhatsApp video call with you, drape the saree live, and measure to your daughter's exact height.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://wa.me/?text=Hi%20Harivillu!%20I%20would%20like%20to%20book%20a%2010-min%20Live%20Video%20Call%20to%20see%20girls%20sarees"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
              >
                <Video className="w-4 h-4 fill-slate-950" />
                <span>Book Free Video Call</span>
              </a>
              <span className="text-[11px] text-pink-200">
                ⚡ Available 9 AM - 9 PM IST
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

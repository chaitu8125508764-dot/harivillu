import React from 'react';
import { Award, Feather, Sparkles, RefreshCcw, Heart, Scissors } from 'lucide-react';

const REASONS = [
  {
    icon: Award,
    title: '100% Silk Mark Certified',
    desc: 'Woven strictly from pure natural mulberry silk filaments and certified authentic gold zari. Never synthetic polyester.',
    color: 'text-amber-600 bg-amber-50 border-amber-200'
  },
  {
    icon: Feather,
    title: 'Zero-Itch Cotton Underlay',
    desc: 'Every waistband, pleat, and hem is lined with soft 100% cotton cambric so children stay comfortable without scratching.',
    color: 'text-rose-600 bg-rose-50 border-rose-200'
  },
  {
    icon: Scissors,
    title: 'Free Custom Blouse Stitching',
    desc: 'Each saree order includes custom tailoring with inner growth seams, soft linings, and handmade silk tassel latkans.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  },
  {
    icon: RefreshCcw,
    title: '7-Day Easy Exchange Policy',
    desc: 'Child had a sudden growth spurt? Exchange sizes or styles effortlessly with free doorstep pickup across India & fast US returns.',
    color: 'text-sky-600 bg-sky-50 border-sky-200'
  }
];

export default function WhyHarivillu() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            The Harivillu Difference
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Why 12,000+ Mothers Trust Harivillu
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Crafting royal heirloom ethnic wear designed specifically around how kids move, play, and celebrate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map(r => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${r.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

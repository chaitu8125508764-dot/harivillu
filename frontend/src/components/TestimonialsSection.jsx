import React from 'react';
import { Star, CheckCircle, Quote, Heart } from 'lucide-react';
import { CUSTOMER_TESTIMONIALS } from '../data/products';

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rani-600">
              Heartfelt Words from Parents
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Smiles, Celebrations & Pure Silk Memories
            </h2>
          </div>

          {/* Social Proof Counter */}
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs">
              <strong className="text-slate-900">4.9 / 5 Average Rating</strong>
              <span className="text-slate-500 block">Across 12,400+ Orders Worldwide</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-amber-900/10 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" /> Verified Mom
                  </span>
                </div>

                {/* Saree Bought Tag */}
                <div className="text-[11px] font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-md inline-block mb-3">
                  Wore: {t.sareeName} ({t.daughterAge})
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-amber-900/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.city}</p>
                </div>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

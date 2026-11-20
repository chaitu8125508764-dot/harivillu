import React from 'react';
import { Zap, Crown, Award, Heart, Tag, Video, Palette } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const STORIES = [
  {
    id: 'aubergine-checks',
    label: 'Jamun Silk',
    badge: 'NEW #1',
    icon: Crown,
    gradient: 'from-purple-600 via-rose-600 to-amber-500',
    type: 'category',
    value: 'all',
    image: '/images/saree-aubergine-purple.jpg'
  },
  {
    id: 'ready-to-wear',
    label: '1-Min Drape',
    badge: 'HOT',
    icon: Zap,
    gradient: 'from-amber-400 via-rose-500 to-pink-600',
    type: 'category',
    value: 'ready-to-wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'pattu-half-sarees',
    label: 'Half Sarees',
    badge: 'ROYAL',
    icon: Crown,
    gradient: 'from-pink-500 via-rose-600 to-purple-700',
    type: 'category',
    value: 'pattu-half-sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'kanchi-silks',
    label: 'Pure Silks',
    badge: 'SILK MARK',
    icon: Award,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    type: 'category',
    value: 'kanchi-silks',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'twinning',
    label: 'Mom & Me',
    badge: 'TWIN',
    icon: Heart,
    gradient: 'from-rose-500 via-pink-500 to-amber-500',
    type: 'category',
    value: 'twinning-combos',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'color-lab',
    label: 'Color Lab',
    badge: 'TRY-ON',
    icon: Palette,
    gradient: 'from-purple-500 via-indigo-600 to-sky-500',
    type: 'scroll',
    value: 'virtual-studio',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'video-call',
    label: 'Video Call',
    badge: 'LIVE',
    icon: Video,
    gradient: 'from-emerald-400 via-green-600 to-teal-700',
    type: 'scroll',
    value: 'drape-guide',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];

export default function MobileStoriesBar() {
  const { setSelectedCategory, selectedCategory } = useShop();

  const handleStoryClick = (story) => {
    if (story.type === 'category') {
      setSelectedCategory(story.value);
      const el = document.getElementById('featured-collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (story.type === 'scroll') {
      const el = document.getElementById(story.value);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden w-full bg-white/70 border-b border-amber-900/10 py-3 px-3 overflow-x-auto no-scrollbar">
      <div className="flex items-center space-x-3.5 min-w-max px-1">
        {STORIES.map(s => {
          const isSelected = selectedCategory === s.value;
          return (
            <button
              key={s.id}
              onClick={() => handleStoryClick(s)}
              className="flex flex-col items-center space-y-1.5 focus:outline-none active:scale-95 transition-transform"
            >
              {/* Outer gradient story ring */}
              <div className={`p-[2px] rounded-full bg-gradient-to-tr ${s.gradient} ${isSelected ? 'ring-2 ring-temple-crimson ring-offset-2' : ''} shadow-sm`}>
                <div className="w-14 h-14 rounded-full p-[2px] bg-white overflow-hidden relative">
                  <img
                    src={s.image}
                    alt={s.label}
                    className="w-full h-full object-cover rounded-full"
                  />
                  {/* Subtle overlay pill badge */}
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] font-extrabold text-amber-300 text-center py-0.5 leading-none">
                    {s.badge}
                  </span>
                </div>
              </div>
              
              <span className={`text-[11px] font-semibold tracking-tight ${isSelected ? 'text-temple-crimson font-bold' : 'text-slate-700'}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

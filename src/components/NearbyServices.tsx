import React, { useRef } from 'react';
import { Compass, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { ServiceCard } from './ServiceCard';

interface NearbyServicesProps {
  services: ServiceItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (service: ServiceItem) => void;
  onViewAllNearby: () => void;
}

export const NearbyServices: React.FC<NearbyServicesProps> = ({
  services,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onViewAllNearby,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-5">
      {/* Section Header */}
      <div className="px-3 flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#087A50] flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            কাছাকাছি সেবা
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Scroll Nav buttons for desktop/tablet */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => handleScroll('left')}
              className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              aria-label="বামে স্ক্রোল"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              aria-label="ডানে স্ক্রোল"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onViewAllNearby}
            className="text-xs font-semibold text-[#087A50] hover:text-[#066341] flex items-center gap-1 group py-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 px-3 overflow-x-auto pb-3 pt-0.5 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.slice(0, 8).map((service) => (
          <div key={service.id} className="snap-start">
            <ServiceCard
              service={service}
              isFavorite={favorites.includes(service.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDetails={onOpenDetails}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

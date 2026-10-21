import React from 'react';
import { Phone, MapPin, Heart, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string) => void;
  onOpenDetails: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group flex-shrink-0 w-[240px] sm:w-[260px]">
      {/* Image Container with Badges */}
      <div className="relative h-32 w-full overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.banglaName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Verified Badge */}
        {service.verified && (
          <span className="absolute top-2 left-2 bg-[#087A50]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <ShieldCheck className="w-3 h-3" />
            যাচাইকৃত
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(service.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-sm ${
            isFavorite
              ? 'bg-rose-50 text-rose-500'
              : 'bg-white/80 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isFavorite ? 'পছন্দের তালিকা থেকে সরান' : 'পছন্দে যোগ করুন'}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
          />
        </button>

        {/* Live Open/Closed Status pill */}
        <span
          className={`absolute bottom-2 left-2 text-[9px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1 ${
            service.isOpenNow
              ? 'bg-emerald-600/90 text-white'
              : 'bg-slate-800/80 text-slate-200'
          }`}
        >
          <Clock className="w-2.5 h-2.5" />
          {service.isOpenNow ? 'এখন খোলা' : 'বন্ধ'}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Bengali Title */}
          <h3
            onClick={() => onOpenDetails(service)}
            className="text-sm font-bold text-slate-900 group-hover:text-[#087A50] transition-colors line-clamp-1 cursor-pointer"
            title={service.banglaName}
          >
            {service.banglaName}
          </h3>

          {/* Category Tag */}
          <p className="text-[11px] font-medium text-slate-500 mt-0.5">
            {service.categoryBangla}
          </p>

          {/* Details Row: Phone & Distance */}
          <div className="mt-2.5 space-y-1.5 text-xs text-slate-600 font-medium">
            {/* Phone (Direct tel link) */}
            <a
              href={`tel:${service.phone.replace(/[^0-9]/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 hover:text-[#087A50] transition-colors py-0.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#087A50] fill-[#087A50]/20 flex-shrink-0" />
              <span className="font-semibold text-slate-700 hover:underline">
                {service.phone}
              </span>
            </a>

            {/* Distance */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#087A50] flex-shrink-0" />
              <span>{service.distance}</span>
            </div>
          </div>
        </div>

        {/* Action Button: বিস্তারিত দেখুন */}
        <button
          type="button"
          onClick={() => onOpenDetails(service)}
          className="mt-3 w-full bg-[#087A50] hover:bg-[#066341] active:bg-[#054f34] text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs group/btn cursor-pointer"
        >
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { MapPin } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick?: () => void;
  selectedUpazila: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  selectedUpazila,
}) => {
  return (
    <div className="relative mx-3 mt-3 rounded-2xl overflow-hidden shadow-lg border border-emerald-900/10 group">
      {/* Background Scenic River & Bridge Image */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
          alt="চরফ্যাশন মেঘনা ও তেঁতুলিয়া নদী ব্রিজ"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 brightness-[0.88]"
        />
        {/* Scenic River Gradient Overlay to guarantee contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-transparent to-black/50" />

        {/* Content Container */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          {/* Top row with Calligraphic / Stylized Watermark on Right */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-semibold tracking-wider text-emerald-200 bg-emerald-950/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30">
                লাইভ সেবা তথ্য
              </span>
            </div>

            {/* Right Side Watermark: "চরফ্যাশন আমাদের গর্ব" */}
            <div className="text-right select-none opacity-95">
              <span className="block text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-serif">
                {selectedUpazila}
              </span>
              <span className="block text-[11px] sm:text-xs text-emerald-300 font-medium tracking-widest drop-shadow">
                আমাদের গর্ব
              </span>
            </div>
          </div>

          {/* Bottom Heading & Subtitle */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-yellow-400">
              <MapPin className="w-5 h-5 fill-yellow-400 text-yellow-500 flex-shrink-0 animate-bounce" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {selectedUpazila} উপজেলা
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-100 font-medium drop-shadow">
              সকল ধরনের সেবা এখন এক অ্যাপে
            </p>

            {/* Sub-pill */}
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm hover:bg-white transition-colors cursor-pointer"
                onClick={onExploreClick}
              >
                <span className="w-2 h-2 rounded-full bg-[#087A50]" />
                ভোলা জেলার একটি গুরুত্বপূর্ণ উপজেলা
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

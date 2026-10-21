import React from 'react';
import { Bookmark, Heart, Phone, ArrowRight, Trash2, Compass } from 'lucide-react';
import { ServiceItem } from '../types';

interface FavoritesViewProps {
  favorites: string[];
  services: ServiceItem[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (service: ServiceItem) => void;
  onExploreHome: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  services,
  onToggleFavorite,
  onOpenDetails,
  onExploreHome,
}) => {
  const favoriteServices = services.filter((s) => favorites.includes(s.id));

  return (
    <div className="pb-24 pt-2 px-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#087A50] fill-[#087A50]" />
            <span>পছন্দের সেবা তালিকা</span>
          </h2>
          <p className="text-xs text-slate-500">
            আপনার সংরক্ষিত জরুরি ও দরকারি সেবাসমূহ ({favoriteServices.length}টি)
          </p>
        </div>
      </div>

      {favoriteServices.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm mt-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            পছন্দের তালিকায় কিছু নেই
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            যেকোনো সেবার কার্ডে থাকা হার্ট (❤️) আইকনে চাপ দিলে সেটি এখানে সংরক্ষিত থাকবে এবং প্রয়োজনে দ্রুত কল করতে পারবেন।
          </p>
          <button
            onClick={onExploreHome}
            className="mt-4 bg-[#087A50] hover:bg-[#066341] text-white text-xs font-semibold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 shadow-md shadow-emerald-900/10 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>হোমে সেবা অনুসন্ধান করুন</span>
          </button>
        </div>
      ) : (
        /* List of Saved Services */
        <div className="space-y-3">
          {favoriteServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onOpenDetails(service)}
              className="bg-white rounded-2xl border border-slate-200 p-3 flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={service.image}
                  alt={service.banglaName}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-[#087A50] bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    {service.categoryBangla}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#087A50] transition-colors mt-0.5">
                    {service.banglaName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    📍 {service.address}
                  </p>
                  <p className="text-[11px] font-bold text-[#087A50] mt-0.5">
                    📞 {service.phone}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(service.id);
                  }}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                  title="পছন্দের তালিকা থেকে মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${service.phone.replace(/[^0-9]/g, '')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#087A50] hover:bg-[#066341] text-white p-2 rounded-xl shadow-xs"
                  title="সরাসরি কল করুন"
                >
                  <Phone className="w-3.5 h-3.5 fill-white" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

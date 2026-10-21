import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  LayoutGrid,
  List,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
  ShieldCheck,
  X,
  Clock,
} from 'lucide-react';
import { ServiceItem, ServiceCategory, Upazila } from '../types';
import { CATEGORIES, UPAZILAS } from '../data/servicesData';

interface ServicesDirectoryViewProps {
  services: ServiceItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (service: ServiceItem) => void;
  initialCategory?: ServiceCategory | null;
  selectedUpazila: Upazila;
  onSelectUpazila: (upz: Upazila) => void;
  onOpenAddService: () => void;
}

export const ServicesDirectoryView: React.FC<ServicesDirectoryViewProps> = ({
  services,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  initialCategory,
  selectedUpazila,
  onSelectUpazila,
  onOpenAddService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and search logic
  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Upazila filter: prioritize selected upazila
      if (selectedUpazila && item.upazila !== selectedUpazila && selectedUpazila !== 'চরফ্যাশন') {
        // If user specifically picked another upazila, filter by it
        if (item.upazila !== selectedUpazila) return false;
      }
      // Verified only
      if (verifiedOnly && !item.verified) {
        return false;
      }
      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName =
          item.banglaName.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
        const matchesCategory =
          item.categoryBangla.toLowerCase().includes(q) ||
          (item.subCategory && item.subCategory.toLowerCase().includes(q));
        const matchesAddress =
          item.address.toLowerCase().includes(q) ||
          (item.union && item.union.toLowerCase().includes(q));
        const matchesServices = item.servicesOffered.some((s) => s.toLowerCase().includes(q));
        const matchesPhone = item.phone.includes(q);

        if (!matchesName && !matchesCategory && !matchesAddress && !matchesServices && !matchesPhone) {
          return false;
        }
      }
      return true;
    });
  }, [services, selectedCategory, selectedUpazila, verifiedOnly, searchQuery]);

  return (
    <div className="pb-24 pt-2">
      {/* Search & Filter Header */}
      <div className="px-3 space-y-3">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">সকল সেবা তালিকা</h2>
            <p className="text-xs text-slate-500">
              {filteredServices.length}টি সেবা পাওয়া গেছে ({selectedUpazila} উপজেলা)
            </p>
          </div>

          <button
            onClick={onOpenAddService}
            className="text-xs font-bold text-white bg-[#087A50] hover:bg-[#066341] px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1 transition-all active:scale-95"
          >
            <span>+ সেবা যুক্ত করুন</span>
          </button>
        </div>

        {/* Search input in directory */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ফোন বা সেবার ধরন দিয়ে খুঁজুন..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#087A50] focus:ring-1 focus:ring-[#087A50]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Upazila and Verified Filters Row */}
        <div className="flex items-center justify-between gap-2 text-xs">
          {/* Upazila Select */}
          <select
            value={selectedUpazila}
            onChange={(e) => onSelectUpazila(e.target.value as Upazila)}
            className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:border-[#087A50]"
          >
            {UPAZILAS.map((upz) => (
              <option key={upz} value={upz}>
                {upz} উপজেলা
              </option>
            ))}
          </select>

          {/* Verified Toggle */}
          <button
            type="button"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-medium transition-colors ${
              verifiedOnly
                ? 'bg-emerald-50 text-[#087A50] border-emerald-200 font-bold'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>যাচাইকৃত</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'grid' ? 'bg-white text-[#087A50] shadow-xs' : 'text-slate-400'
              }`}
              title="গ্রিড ভিউ"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'list' ? 'bg-white text-[#087A50] shadow-xs' : 'text-slate-400'
              }`}
              title="লিস্ট ভিউ"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Horizontal Scrolling Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#087A50] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            সকল সেবা ({services.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#087A50] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.banglaName}
            </button>
          ))}
        </div>
      </div>

      {/* Services List / Grid */}
      <div className="px-3 mt-4">
        {filteredServices.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm mt-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              কোনো সেবা খুঁজে পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              অনুগ্রহ করে ভিন্ন কোনো শব্দ বা ক্যাটাগরি দিয়ে চেষ্টা করুন। অথবা আপনার সেবাটি তালিকায় যুক্ত করুন।
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setVerifiedOnly(false);
                }}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl font-semibold"
              >
                ফিল্টার রিসেট করুন
              </button>
              <button
                onClick={onOpenAddService}
                className="text-xs bg-[#087A50] hover:bg-[#066341] text-white px-3.5 py-2 rounded-xl font-semibold"
              >
                + সেবা যুক্ত করুন
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {filteredServices.map((service) => {
              const isFav = favorites.includes(service.id);
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-28 w-full bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.banglaName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(service.id);
                      }}
                      className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md shadow-xs ${
                        isFav
                          ? 'bg-rose-50 text-rose-500'
                          : 'bg-white/80 text-slate-600 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>

                    <span className="absolute bottom-1.5 left-2 bg-[#087A50]/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                      {service.categoryBangla}
                    </span>
                  </div>

                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => onOpenDetails(service)}
                        className="text-xs font-bold text-slate-900 group-hover:text-[#087A50] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {service.banglaName}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        📍 {service.address}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                      <a
                        href={`tel:${service.phone.replace(/[^0-9]/g, '')}`}
                        className="bg-emerald-50 hover:bg-emerald-100 text-[#087A50] p-1.5 rounded-xl flex items-center justify-center flex-1 text-[11px] font-bold gap-1"
                      >
                        <Phone className="w-3 h-3 fill-[#087A50]" />
                        <span>কল</span>
                      </a>
                      <button
                        onClick={() => onOpenDetails(service)}
                        className="bg-[#087A50] hover:bg-[#066341] text-white p-1.5 rounded-xl flex items-center justify-center flex-1 text-[11px] font-bold gap-1"
                      >
                        <span>বিবরণ</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-2.5">
            {filteredServices.map((service) => {
              const isFav = favorites.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => onOpenDetails(service)}
                  className="bg-white rounded-2xl border border-slate-200 p-2.5 flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer group"
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
                        📍 {service.address} • {service.distance}
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
                      className={`p-1.5 rounded-full ${
                        isFav
                          ? 'text-rose-500 bg-rose-50'
                          : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>
                    <a
                      href={`tel:${service.phone.replace(/[^0-9]/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#087A50] hover:bg-[#066341] text-white p-2 rounded-xl shadow-xs"
                      title="কল করুন"
                    >
                      <Phone className="w-3.5 h-3.5 fill-white" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

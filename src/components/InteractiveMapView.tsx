import React, { useState } from 'react';
import { X, MapPin, Navigation, Phone, ExternalLink, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types';

interface InteractiveMapViewProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  onOpenServiceDetails: (service: ServiceItem) => void;
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  isOpen,
  onClose,
  services,
  onOpenServiceDetails,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!isOpen) return null;

  // Filter markers based on selected category
  const filteredServices = services.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  // Category filter tabs
  const filterOptions = [
    { id: 'all', label: 'সকল সেবা' },
    { id: 'health', label: 'হাসপাতাল' },
    { id: 'transport', label: 'যাতায়াত ও লঞ্চ' },
    { id: 'market', label: 'কাঁচাবাজার' },
    { id: 'repair', label: 'মেরামত' },
    { id: 'other', label: 'জরুরি সেবা' },
  ];

  // Map markers placed on a schematic map of Char Fasson & Bhola
  const markerPositions: Record<string, { x: number; y: number; label: string }> = {
    'char-fasson-health-complex': { x: 50, y: 55, label: 'স্বাস্থ্য কমপ্লেক্স' },
    'char-fasson-kacha-bazar': { x: 48, y: 58, label: 'নতুন কাঁচাবাজার' },
    'fast-track-mobile-repair': { x: 52, y: 57, label: 'Fast Track মোবাইল' },
    'char-fasson-bhola-bus-counter': { x: 50, y: 50, label: 'বাস কাউন্টার' },
    'betua-launch-ghat': { x: 65, y: 46, label: 'বেতুয়া লঞ্চ ঘাট' },
    'char-fasson-fire-service': { x: 53, y: 62, label: 'ফায়ার সার্ভিস' },
    'char-fasson-police-thana': { x: 47, y: 53, label: 'চরফ্যাশন থানা' },
    'bismillah-electric-ac': { x: 51, y: 59, label: 'বিসমিল্লাহ ইলেকট্রিক' },
    'kukri-mukri-eco-resort': { x: 55, y: 85, label: 'চর কুকরি-মুকরি রিসোর্ট' },
    'char-fasson-govt-college': { x: 46, y: 51, label: 'চরফ্যাশন সরকারি কলেজ' },
    'al-arafah-diagnostic': { x: 49, y: 56, label: 'আল-আরাফাহ ডায়াগনস্টিক' },
    'shohid-ambulance-service': { x: 51, y: 54, label: 'অ্যাম্বুলেন্স সেবা' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] border border-slate-700">
        {/* Top Header */}
        <div className="bg-slate-800/90 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#087A50] text-white flex items-center justify-center">
              <MapPin className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                চরফ্যাশন ও ভোলা লাইভ মানচিত্র
              </h3>
              <p className="text-[11px] text-slate-400">
                সেবা কেন্দ্র সমূহের ভৌগোলিক অবস্থান ও দিকনির্দেশনা
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills on Map */}
        <div className="bg-slate-800/70 px-3 py-2 border-b border-slate-700/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-slate-400 flex items-center gap-1 mr-1 flex-shrink-0">
            <Layers className="w-3 h-3" /> ফিল্টার:
          </span>
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setFilterCategory(opt.id);
                setSelectedService(null);
              }}
              className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                filterCategory === opt.id
                  ? 'bg-[#087A50] text-white shadow-xs'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Map Canvas / Schematic View */}
        <div className="relative flex-1 bg-[#102436] overflow-hidden select-none">
          {/* Zoom controls */}
          <div className="absolute top-3 right-3 z-30 flex flex-col gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 shadow-md">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.0))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg"
              title="জুম ইন"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg"
              title="জুম আউট"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg"
              title="রিসেট"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Map of Bhola Island and Char Fasson */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full max-h-[600px] object-contain drop-shadow-2xl"
            >
              {/* Water background waves */}
              <defs>
                <pattern id="water" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 0 4 Q 2 2 4 4 T 8 4" fill="none" stroke="#17344f" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="islandGlow" cx="50%" cy="55%" r="45%">
                  <stop offset="0%" stopColor="#1e4620" />
                  <stop offset="70%" stopColor="#133318" />
                  <stop offset="100%" stopColor="#0d2411" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill="url(#water)" />

              {/* Waterway Names */}
              <text x="12" y="45" fill="#476d8c" fontSize="3" fontWeight="bold" opacity="0.6">
                তেঁতুলিয়া নদী (Tentulia)
              </text>
              <text x="75" y="40" fill="#476d8c" fontSize="3" fontWeight="bold" opacity="0.6">
                মেঘনা নদী (Meghna)
              </text>
              <text x="45" y="96" fill="#38bdf8" fontSize="2.8" fontWeight="bold" opacity="0.7">
                বঙ্গোপসাগর (Bay of Bengal)
              </text>

              {/* Bhola Main Island Outline */}
              <path
                d="M 52,8 Q 58,18 56,28 Q 54,36 58,45 Q 63,55 58,70 Q 52,78 45,74 Q 40,68 42,55 Q 40,40 44,24 Q 48,12 52,8 Z"
                fill="url(#islandGlow)"
                stroke="#2d6a36"
                strokeWidth="0.8"
              />

              {/* Char Kukri-Mukri & Dhal Char Islands (South) */}
              <ellipse cx="55" cy="85" rx="6" ry="3.5" fill="#1b4d24" stroke="#2d6a36" strokeWidth="0.5" />
              <text x="50" y="85" fill="#86efac" fontSize="2" fontWeight="bold">
                কুকরি-মুকরি
              </text>

              <ellipse cx="44" cy="88" rx="4" ry="2" fill="#1b4d24" stroke="#2d6a36" strokeWidth="0.5" />
              <text x="41" y="88.5" fill="#86efac" fontSize="1.8" fontWeight="bold">
                ঢালচর
              </text>

              {/* Monpura Island (East) */}
              <ellipse cx="80" cy="58" rx="5" ry="12" fill="#163e1f" stroke="#2d6a36" strokeWidth="0.5" />
              <text x="76" y="58" fill="#86efac" fontSize="2.2" fontWeight="bold">
                মনপুরা
              </text>

              {/* Roads / Highway Lines across Bhola & Char Fasson */}
              <path
                d="M 52,10 L 53,25 L 51,40 L 50,55 L 48,72"
                fill="none"
                stroke="#eab308"
                strokeWidth="0.6"
                strokeDasharray="1 0.5"
                opacity="0.8"
              />
              <path
                d="M 50,55 L 65,46"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="0.5"
                strokeDasharray="1 0.5"
                opacity="0.8"
              />

              {/* Upazila Labels on Map */}
              <text x="48" y="16" fill="#cbd5e1" fontSize="2.5" opacity="0.6">ভোলা সদর</text>
              <text x="47" y="30" fill="#cbd5e1" fontSize="2.3" opacity="0.6">বোরহানউদ্দিন</text>
              <text x="46" y="42" fill="#cbd5e1" fontSize="2.3" opacity="0.6">লালমোহন</text>
              <text x="41" y="63" fill="#facc15" fontSize="3.2" fontWeight="bold">
                চরফ্যাশন
              </text>

              {/* Interactive Service Location Markers */}
              {filteredServices.map((service) => {
                const pos = markerPositions[service.id] || {
                  x: 48 + ((service.id.length * 7) % 10),
                  y: 52 + ((service.id.length * 11) % 15),
                  label: service.banglaName,
                };
                const isSelected = selectedService?.id === service.id;

                let markerColor = '#087A50';
                if (service.category === 'health') markerColor = '#ef4444';
                if (service.category === 'transport') markerColor = '#3b82f6';
                if (service.category === 'market') markerColor = '#10b981';
                if (service.category === 'repair') markerColor = '#f97316';
                if (service.category === 'housing') markerColor = '#ec4899';

                return (
                  <g
                    key={service.id}
                    className="cursor-pointer transition-transform"
                    onClick={() => setSelectedService(service)}
                  >
                    {/* Pulsing ring for selected */}
                    {isSelected && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="3.5"
                        fill="none"
                        stroke="#facc15"
                        strokeWidth="0.6"
                        className="animate-ping"
                      />
                    )}

                    {/* Marker pin circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '2.4' : '1.8'}
                      fill={markerColor}
                      stroke="#ffffff"
                      strokeWidth="0.5"
                    />

                    {/* Mini Icon or Dot */}
                    <circle cx={pos.x} cy={pos.y} r="0.6" fill="#ffffff" />

                    {/* Label Tag */}
                    <text
                      x={pos.x}
                      y={pos.y - 2.5}
                      textAnchor="middle"
                      fill={isSelected ? '#facc15' : '#ffffff'}
                      fontSize="1.9"
                      fontWeight="bold"
                      className="pointer-events-none drop-shadow"
                    >
                      {pos.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Service Popup Card on bottom of Map */}
          {selectedService && (
            <div className="absolute bottom-3 left-3 right-3 z-30 bg-white rounded-2xl p-3 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <img
                    src={selectedService.image}
                    alt={selectedService.banglaName}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#087A50] bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      {selectedService.categoryBangla}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1">
                      {selectedService.banglaName}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      📍 {selectedService.address} • {selectedService.distance}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons in card */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${selectedService.phone.replace(/[^0-9]/g, '')}`}
                  className="flex-1 bg-[#087A50] hover:bg-[#066341] text-white py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 fill-white" />
                  <span>কল: {selectedService.phone}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenServiceDetails(selectedService);
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <span>সম্পূর্ণ বিবরণ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Legend */}
        <div className="bg-slate-800 px-3 py-2 border-t border-slate-700 text-[10px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" /> হাসপাতাল
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> লঞ্চ ও পরিবহন
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> বাজার
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> কারিগরি
            </span>
          </div>
          <span className="text-emerald-400 font-semibold">চরফ্যাশন ম্যাপ</span>
        </div>
      </div>
    </div>
  );
};

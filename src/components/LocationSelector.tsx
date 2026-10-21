import React, { useState } from 'react';
import { MapPin, ChevronDown, Map, Check } from 'lucide-react';
import { Upazila } from '../types';
import { UPAZILAS } from '../data/servicesData';

interface LocationSelectorProps {
  selectedUpazila: Upazila;
  onSelectUpazila: (upazila: Upazila) => void;
  onOpenMap: () => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedUpazila,
  onSelectUpazila,
  onOpenMap,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative px-3 mt-3 z-30">
      <div className="bg-white rounded-2xl p-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-200/90 flex items-center justify-between">
        {/* Left: Location Dropdown Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-left py-1 px-1.5 rounded-xl hover:bg-slate-50 transition-colors group"
            aria-expanded={dropdownOpen}
          >
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#087A50] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 fill-[#087A50]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-400 font-medium leading-none">
                আপনার এলাকা:
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-slate-800 leading-tight">
                  {selectedUpazila} উপজেলা
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180 text-[#087A50]' : ''
                  }`}
                />
              </div>
            </div>
          </button>

          {/* Upazila Selection Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-700">উপজেলা নির্বাচন করুন</p>
                  <p className="text-[11px] text-slate-400">ভোলা জেলার মোট ৭টি উপজেলা</p>
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {UPAZILAS.map((upazila) => {
                    const isSelected = upazila === selectedUpazila;
                    return (
                      <button
                        key={upazila}
                        type="button"
                        onClick={() => {
                          onSelectUpazila(upazila);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-medium transition-colors ${
                          isSelected
                            ? 'bg-emerald-50 text-[#087A50] font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-[#087A50]' : 'bg-slate-300'
                            }`}
                          />
                          {upazila} উপজেলা
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#087A50]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-7 bg-slate-200 mx-1" />

        {/* Right: Map View Trigger */}
        <button
          type="button"
          onClick={onOpenMap}
          className="flex items-center gap-1.5 px-3 py-2 text-[#087A50] hover:text-[#066341] hover:bg-emerald-50 rounded-xl transition-all font-semibold text-xs cursor-pointer group active:scale-95"
          aria-label="চরফ্যাশন মানচিত্রে দেখুন"
        >
          <Map className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="whitespace-nowrap">মানচিত্রে দেখুন</span>
        </button>
      </div>
    </div>
  );
};

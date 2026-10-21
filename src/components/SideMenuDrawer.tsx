import React from 'react';
import {
  X,
  Home,
  LayoutGrid,
  Map,
  PlusCircle,
  PhoneCall,
  Download,
  Share2,
  TowerControl as Tower,
  Info,
  Compass,
} from 'lucide-react';
import { TabType } from './BottomNavigation';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenMap: () => void;
  onOpenAddService: () => void;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenMap,
  onOpenAddService,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 bg-white w-72 max-w-[85vw] h-full shadow-2xl flex flex-col justify-between p-4 animate-in slide-in-from-right duration-300">
        <div>
          {/* Top Brand Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#087A50] text-white flex items-center justify-center font-bold text-sm">
                ভো
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#087A50] leading-none">
                  ভোলা সেবা
                </h3>
                <span className="text-[10px] text-slate-400">চরফ্যাশন উপজেলা</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1 text-xs font-semibold text-slate-700">
            <button
              onClick={() => {
                onNavigateTab('home');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-[#087A50] transition-colors"
            >
              <Home className="w-4 h-4 text-[#087A50]" />
              <span>হোমপেজ</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('directory');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-[#087A50] transition-colors"
            >
              <LayoutGrid className="w-4 h-4 text-[#087A50]" />
              <span>সকল সেবা তালিকা</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenMap();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-[#087A50] transition-colors"
            >
              <Map className="w-4 h-4 text-[#087A50]" />
              <span>লাইভ ম্যাপ ভিউ</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAddService();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-[#087A50] transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-[#087A50]" />
              <span>আপনার ব্যবসা যুক্ত করুন</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('account');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-[#087A50] transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#087A50]" />
              <span>জরুরি হেল্পলাইন নম্বর</span>
            </button>
          </nav>

          {/* Char Fasson Notable Tourist Highlights */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-3">
              চরফ্যাশনের দর্শনীয় স্থান
            </span>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="px-3 py-1.5 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <span>জ্যাকব ওয়াচ টাওয়ার (২২৫ ফুট)</span>
                <span className="text-[10px] text-emerald-600 font-bold">আইকনিক</span>
              </div>
              <div className="px-3 py-1.5 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <span>চর কুকরি-মুকরি দ্বীপ ও হরিণ</span>
                <span className="text-[10px] text-slate-400">ইকো পার্ক</span>
              </div>
              <div className="px-3 py-1.5 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <span>তারুয়া সমুদ্র সৈকত</span>
                <span className="text-[10px] text-slate-400">সৈকত</span>
              </div>
              <div className="px-3 py-1.5 flex items-center justify-between rounded-lg hover:bg-slate-50">
                <span>বেতুয়া প্রশান্তি পার্ক ও মেঘনা ঘাট</span>
                <span className="text-[10px] text-slate-400">নদীর তীর</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer in drawer */}
        <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
          <p className="font-semibold text-slate-600">ভোলা সেবা ডিজিটাল পোর্টাল</p>
          <p className="mt-0.5">চরফ্যাশন, ভোলা, বাংলাদেশ</p>
        </div>
      </div>
    </div>
  );
};

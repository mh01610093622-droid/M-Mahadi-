import React from 'react';
import { Home, LayoutGrid, Search, Bookmark, User } from 'lucide-react';

export type TabType = 'home' | 'directory' | 'search' | 'favorites' | 'account';

interface BottomNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  favoritesCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-1 relative">
        {/* 1. হোম */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#087A50]' : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-label="হোম"
        >
          <Home
            className={`w-5 h-5 transition-transform ${
              activeTab === 'home' ? 'stroke-[2.4] scale-110' : 'stroke-[1.8]'
            }`}
          />
          <span
            className={`text-[10px] sm:text-[11px] mt-1 ${
              activeTab === 'home' ? 'font-bold' : 'font-medium'
            }`}
          >
            হোম
          </span>
        </button>

        {/* 2. সেবা তালিকা */}
        <button
          type="button"
          onClick={() => setActiveTab('directory')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'directory' ? 'text-[#087A50]' : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-label="সেবা তালিকা"
        >
          <LayoutGrid
            className={`w-5 h-5 transition-transform ${
              activeTab === 'directory' ? 'stroke-[2.4] scale-110' : 'stroke-[1.8]'
            }`}
          />
          <span
            className={`text-[10px] sm:text-[11px] mt-1 ${
              activeTab === 'directory' ? 'font-bold' : 'font-medium'
            }`}
          >
            সেবা তালিকা
          </span>
        </button>

        {/* 3. সার্চ - Elevated center circular floating action button */}
        <div className="relative -top-3 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className={`w-13 h-13 rounded-full bg-[#087A50] text-white flex items-center justify-center shadow-lg shadow-emerald-900/30 transition-transform active:scale-95 border-4 border-slate-100 cursor-pointer ${
              activeTab === 'search' ? 'ring-2 ring-emerald-600 ring-offset-2' : 'hover:scale-105'
            }`}
            aria-label="অনুসন্ধান"
          >
            <Search className="w-6 h-6 stroke-[2.5]" />
          </button>
          <span
            className={`text-[10px] sm:text-[11px] mt-0.5 ${
              activeTab === 'search' ? 'text-[#087A50] font-bold' : 'text-slate-500 font-medium'
            }`}
          >
            সার্চ
          </span>
        </div>

        {/* 4. পছন্দের তালিকা */}
        <button
          type="button"
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer relative ${
            activeTab === 'favorites' ? 'text-[#087A50]' : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-label="পছন্দের তালিকা"
        >
          <div className="relative">
            <Bookmark
              className={`w-5 h-5 transition-transform ${
                activeTab === 'favorites' ? 'stroke-[2.4] scale-110 fill-[#087A50]' : 'stroke-[1.8]'
              }`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] sm:text-[11px] mt-1 ${
              activeTab === 'favorites' ? 'font-bold' : 'font-medium'
            }`}
          >
            পছন্দের তালিকা
          </span>
        </button>

        {/* 5. আমার অ্যাকাউন্ট */}
        <button
          type="button"
          onClick={() => setActiveTab('account')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
            activeTab === 'account' ? 'text-[#087A50]' : 'text-slate-500 hover:text-slate-700'
          }`}
          aria-label="আমার অ্যাকাউন্ট"
        >
          <User
            className={`w-5 h-5 transition-transform ${
              activeTab === 'account' ? 'stroke-[2.4] scale-110' : 'stroke-[1.8]'
            }`}
          />
          <span
            className={`text-[10px] sm:text-[11px] mt-1 ${
              activeTab === 'account' ? 'font-bold' : 'font-medium'
            }`}
          >
            আমার অ্যাকাউন্ট
          </span>
        </button>
      </div>
    </nav>
  );
};

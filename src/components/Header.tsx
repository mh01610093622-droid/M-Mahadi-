import React from 'react';
import { Bell, Menu, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenMenu: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  unreadCount,
  onOpenNotifications,
  onOpenMenu,
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] px-4 py-2.5 transition-all">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#087A50] rounded-xl p-0.5"
          aria-label="ভোলা সেবা হোমপেজ"
        >
          {/* Custom SVG Location Pin Logo with Water / Island Wave */}
          <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-[#087A50] rounded-2xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            {/* Outer Pin SVG */}
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
              <MapPin className="w-5 h-5 text-[#087A50] fill-[#087A50]/20" />
            </div>
            {/* Wave / river accent badge */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
              ~
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-[#087A50] leading-tight">
                ভোলা সেবা
              </span>
              <span className="bg-emerald-100 text-[#087A50] text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> চরফ্যাশন
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 leading-tight">
              ভোলার সব সেবা, হাতের মুঠোয়
            </span>
          </div>
        </button>

        {/* Right actions: Bell & Hamburger Menu */}
        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-700 hover:text-[#087A50] hover:bg-emerald-50 active:scale-95 transition-all focus:outline-none"
            aria-label="বিজ্ঞপ্তি সমূহ"
          >
            <Bell className="w-6 h-6 stroke-[1.8]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Menu Button */}
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-xl text-slate-700 hover:text-[#087A50] hover:bg-emerald-50 active:scale-95 transition-all focus:outline-none"
            aria-label="মেনু খুলুন"
          >
            <Menu className="w-6 h-6 stroke-[1.8]" />
          </button>
        </div>
      </div>
    </header>
  );
};

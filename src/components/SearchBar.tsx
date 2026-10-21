import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit?: () => void;
  onTagClick?: (tag: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onTagClick,
  placeholder = 'কী সেবা খুঁজছেন? যেমন: হাসপাতাল, বাস, দোকান, মিস্ত্রি...',
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const popularKeywords = [
    'হাসপাতাল',
    'বাস কাউন্টার',
    'মোবাইল মেরামত',
    'কাঁচাবাজার',
    'লঞ্চ',
    'অ্যাম্বুলেন্স',
    'ইলেকট্রিশিয়ান',
  ];

  return (
    <div className="px-3 -mt-3.5 relative z-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(8,122,80,0.12)] border border-slate-200/80 p-1.5 flex items-center transition-all focus-within:ring-2 focus-within:ring-[#087A50]/30 focus-within:border-[#087A50]"
      >
        {/* Search Icon */}
        <div className="pl-3 pr-2 text-slate-400 flex items-center justify-center">
          <Search className="w-5 h-5 stroke-[2] text-slate-500" />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full bg-transparent py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
        />

        {/* Clear Button */}
        {searchQuery.trim().length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors mr-1"
            aria-label="মুছে ফেলুন"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Green Search Action Button */}
        <button
          type="submit"
          className="bg-[#087A50] hover:bg-[#066341] active:bg-[#054f34] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 flex-shrink-0 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>সার্চ</span>
        </button>
      </form>

      {/* Quick Search Tag Pills (optional helpful pills) */}
      {onTagClick && (
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap pl-1">
            জনপ্রিয়:
          </span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => onTagClick(kw)}
              className="text-[11px] font-medium bg-emerald-50/80 hover:bg-emerald-100 text-[#087A50] px-2.5 py-0.5 rounded-full whitespace-nowrap transition-colors border border-emerald-100/80"
            >
              {kw}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

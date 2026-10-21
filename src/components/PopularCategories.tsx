import React from 'react';
import {
  HeartPulse,
  Ship,
  ShoppingCart,
  Wrench,
  GraduationCap,
  Briefcase,
  Home,
  MoreHorizontal,
  ArrowRight,
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface PopularCategoriesProps {
  onSelectCategory: (category: ServiceCategory) => void;
  onViewAllCategories: () => void;
  activeCategory?: ServiceCategory | null;
}

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  onSelectCategory,
  onViewAllCategories,
  activeCategory,
}) => {
  const categoryConfig = [
    {
      id: 'health' as ServiceCategory,
      title: 'স্বাস্থ্যসেবা',
      icon: HeartPulse,
      bgCard: 'bg-[#FEE2E2]/70 hover:bg-[#FEE2E2] border-red-100',
      iconBg: 'bg-[#EF4444]',
      textColor: 'text-[#991B1B]',
      count: '২৪+ সেবা',
    },
    {
      id: 'transport' as ServiceCategory,
      title: 'যাতায়াত ও পরিবহন',
      icon: Ship,
      bgCard: 'bg-[#DBEAFE]/70 hover:bg-[#DBEAFE] border-blue-100',
      iconBg: 'bg-[#2563EB]',
      textColor: 'text-[#1E40AF]',
      count: '১৮+ সেবা',
    },
    {
      id: 'market' as ServiceCategory,
      title: 'দোকান ও বাজার',
      icon: ShoppingCart,
      bgCard: 'bg-[#DCFCE7]/70 hover:bg-[#DCFCE7] border-emerald-100',
      iconBg: 'bg-[#16A34A]',
      textColor: 'text-[#166534]',
      count: '৩২+ সেবা',
    },
    {
      id: 'repair' as ServiceCategory,
      title: 'বাসা ও কারিগরি সেবা',
      icon: Wrench,
      bgCard: 'bg-[#FFEDD5]/70 hover:bg-[#FFEDD5] border-orange-100',
      iconBg: 'bg-[#EA580C]',
      textColor: 'text-[#9A3412]',
      count: '১৯+ সেবা',
    },
    {
      id: 'education' as ServiceCategory,
      title: 'শিক্ষা ও প্রশিক্ষণ',
      icon: GraduationCap,
      bgCard: 'bg-[#F3E8FF]/70 hover:bg-[#F3E8FF] border-purple-100',
      iconBg: 'bg-[#9333EA]',
      textColor: 'text-[#6B21A8]',
      count: '১৫+ সেবা',
    },
    {
      id: 'jobs' as ServiceCategory,
      title: 'চাকরি ও নিয়োগ',
      icon: Briefcase,
      bgCard: 'bg-[#CCFBF1]/70 hover:bg-[#CCFBF1] border-teal-100',
      iconBg: 'bg-[#0D9488]',
      textColor: 'text-[#115E59]',
      count: '৮+ সেবা',
    },
    {
      id: 'housing' as ServiceCategory,
      title: 'বাসা ভাড়া ও হোটেল',
      icon: Home,
      bgCard: 'bg-[#FFE4E6]/70 hover:bg-[#FFE4E6] border-rose-100',
      iconBg: 'bg-[#E11D48]',
      textColor: 'text-[#9F1239]',
      count: '১২+ সেবা',
    },
    {
      id: 'other' as ServiceCategory,
      title: 'অন্যান্য সেবা',
      icon: MoreHorizontal,
      bgCard: 'bg-[#E0E7FF]/70 hover:bg-[#E0E7FF] border-indigo-100',
      iconBg: 'bg-[#4F46E5]',
      textColor: 'text-[#3730A3]',
      count: '১৬+ সেবা',
    },
  ];

  return (
    <div className="px-3 mt-5">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          জনপ্রিয় সেবা
        </h2>
        <button
          onClick={onViewAllCategories}
          className="text-xs font-semibold text-[#087A50] hover:text-[#066341] flex items-center gap-1 group py-1"
        >
          <span>সব সেবা দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {categoryConfig.map((item) => {
          const IconComponent = item.icon;
          const isSelected = activeCategory === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`${item.bgCard} rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center text-center transition-all duration-200 border cursor-pointer group active:scale-95 shadow-sm hover:shadow-md ${
                isSelected ? 'ring-2 ring-[#087A50] ring-offset-1 scale-[1.02]' : ''
              }`}
            >
              {/* Circular Icon Container */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${item.iconBg} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-1.5`}
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>

              {/* Title */}
              <span
                className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 ${item.textColor}`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import {
  User,
  PlusCircle,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Info,
  MapPin,
  ExternalLink,
  HeartHandshake,
  CheckCircle,
} from 'lucide-react';
import { Upazila } from '../types';

interface AccountViewProps {
  onOpenAddService: () => void;
  selectedUpazila: Upazila;
  userAddedServicesCount: number;
}

export const AccountView: React.FC<AccountViewProps> = ({
  onOpenAddService,
  selectedUpazila,
  userAddedServicesCount,
}) => {
  // Emergency direct dial hotlines for Char Fasson & Bhola
  const emergencyHotlines = [
    {
      title: 'জাতীয় জরুরি সেবা',
      number: '999',
      sub: 'পুলিশ, ফায়ার ও অ্যাম্বুলেন্স',
      badge: 'টোল ফ্রি',
      color: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      title: 'চরফ্যাশন থানা পুলিশ',
      number: '01320154678',
      sub: 'অফিসার ইনচার্জ (OC)',
      badge: 'সার্বক্ষণিক',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'চরফ্যাশন ফায়ার সার্ভিস',
      number: '01730002457',
      sub: 'জরুরি উদ্ধার ও অগ্নিনির্বাপণ',
      badge: '২৪ ঘন্টা',
      color: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      title: 'উপজেলা স্বাস্থ্য কমপ্লেক্স',
      number: '0493374123',
      sub: 'হাসপাতাল জরুরি বিভাগ',
      badge: '২৪ ঘন্টা',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'চরফ্যাশন অ্যাম্বুলেন্স',
      number: '01825990011',
      sub: 'জরুরি অক্সিজেন ও রোগী পরিবহন',
      badge: 'কল করুন',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      title: 'চরফ্যাশন বিদ্যুৎ অভিযোগ',
      number: '01769400000',
      sub: 'পল্লী বিদ্যুৎ অভিযোগ কেন্দ্র',
      badge: 'বিদ্যুৎ সেবা',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <div className="pb-24 pt-2 px-3 space-y-4">
      {/* User Header Profile Card */}
      <div className="bg-gradient-to-br from-[#087A50] to-emerald-800 rounded-3xl p-4 text-white shadow-lg shadow-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl font-bold shadow-inner">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold">ভোলা সেবা ব্যবহারকারী</h2>
              <span className="bg-emerald-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.2 rounded-full">
                সক্রিয়
              </span>
            </div>
            <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" /> {selectedUpazila} উপজেলা, ভোলা
            </p>
          </div>
        </div>

        {/* Quick provider stats */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/20 text-xs text-center">
          <div className="bg-white/10 rounded-xl p-2">
            <span className="block text-lg font-bold">
              {userAddedServicesCount}
            </span>
            <span className="text-[11px] text-emerald-100">আমার যুক্তকৃত সেবা</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2">
            <span className="block text-lg font-bold">১০০%</span>
            <span className="text-[11px] text-emerald-100">ফ্রি ও স্থানীয় সেবা</span>
          </div>
        </div>
      </div>

      {/* Provider Registration CTA */}
      <div className="bg-white rounded-3xl p-4 border border-emerald-200/90 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#087A50] flex items-center justify-center flex-shrink-0 mt-0.5">
            <PlusCircle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-800">
              আপনি কি সেবা প্রদানকারী বা ব্যবসায়ী?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              চরফ্যাশন ও ভোলাবাসীর কাছে আপনার ডাক্তার চেম্বার, দোকান, পরিবহন বা কারিগরি সেবার তথ্য পৌঁছান।
            </p>
            <button
              onClick={onOpenAddService}
              className="mt-3 bg-[#087A50] hover:bg-[#066341] text-white text-xs font-bold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            >
              <span>আপনার সেবা যুক্ত করুন</span>
              <PlusCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Hotlines Directory */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              চরফ্যাশন জরুরি হেল্পলাইন
            </h3>
          </div>
          <span className="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
            এক ক্লিকে কল
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {emergencyHotlines.map((hotline, idx) => (
            <a
              key={idx}
              href={`tel:${hotline.number}`}
              className={`${hotline.color} border rounded-2xl p-2.5 flex items-center justify-between hover:brightness-95 transition-all`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold">{hotline.title}</span>
                  <span className="text-[9px] font-semibold bg-white px-1.5 py-0.2 rounded-md shadow-2xs">
                    {hotline.badge}
                  </span>
                </div>
                <span className="text-[10px] opacity-80 block">{hotline.sub}</span>
                <span className="text-xs font-extrabold tracking-wide mt-0.5 block">
                  📞 {hotline.number}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs flex-shrink-0">
                <PhoneCall className="w-4 h-4 stroke-[2.2]" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* About Bhola Seba & Char Fasson */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm text-xs text-slate-600 space-y-2">
        <div className="flex items-center gap-2 text-slate-900 font-bold">
          <Info className="w-4 h-4 text-[#087A50]" />
          <span>ভোলা সেবা সম্পর্কে</span>
        </div>
        <p className="leading-relaxed">
          “ভোলা সেবা” হলো ভোলা জেলা ও চরফ্যাশন উপজেলার গণমানুষের দৈনন্দিন ও জরুরি প্রয়োজন মেটানোর একটি উন্মুক্ত ডিজিটাল ডিরেক্টরি। হাসপাতাল, বিশেষজ্ঞ ডাক্তার, অ্যাম্বুলেন্স, ঢাকা-চরফ্যাশন লঞ্চ ও বাস শিডিউল, কাঁচাবাজার ও স্থানীয় কারিগরি সেবাকে এক প্লাটফর্মে নিয়ে আসাই আমাদের লক্ষ্য।
        </p>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>সংস্করণ ২.৪.০ • মোবাইল ফ্রেন্ডলি</span>
          <span className="text-[#087A50] font-semibold">চরফ্যাশন, ভোলা</span>
        </div>
      </div>
    </div>
  );
};

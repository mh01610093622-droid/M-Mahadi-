import React from 'react';
import { ShieldCheck, PhoneCall, MapPin } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <div className="px-3 mt-4">
      <div className="bg-emerald-50/70 border border-emerald-100/90 rounded-2xl p-3 shadow-xs">
        <div className="grid grid-cols-3 gap-2 divide-x divide-emerald-200/60">
          {/* Pillar 1: Verified Info */}
          <div className="flex items-start gap-2 pr-1">
            <div className="w-7 h-7 rounded-full bg-[#087A50] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
              <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                যাচাইকৃত তথ্য
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                নির্ভরযোগ্য সেবা প্রদানকারী
              </span>
            </div>
          </div>

          {/* Pillar 2: Direct Contact */}
          <div className="flex items-start gap-2 px-1.5">
            <div className="w-7 h-7 rounded-full bg-[#087A50] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
              <PhoneCall className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                সরাসরি যোগাযোগ
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                কল করুন / WhatsApp
              </span>
            </div>
          </div>

          {/* Pillar 3: Local Services */}
          <div className="flex items-start gap-2 pl-1.5">
            <div className="w-7 h-7 rounded-full bg-[#087A50] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
              <MapPin className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                স্থানীয় সেবা
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                চরফ্যাশন উপজেলার সকল ইউনিয়ন
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Check, X, Share2, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const AppInstallBanner: React.FC = () => {
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowInstallGuide(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ভোলা সেবা (Bhola Seba)',
        text: 'চরফ্যাশন ও ভোলা জেলার সকল ধরনের সেবা এখন এক অ্যাপে!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="px-3 my-4">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100/70 border border-emerald-200/80 p-3 sm:p-4 shadow-sm">
        {/* Decorative Background Island Palms Graphic */}
        <div className="absolute right-0 bottom-0 top-0 w-36 opacity-25 pointer-events-none flex items-end justify-end overflow-hidden">
          <svg viewBox="0 0 200 150" className="w-full h-full text-emerald-800 fill-current">
            <path d="M10,140 Q60,110 120,135 T200,125 L200,150 L0,150 Z" opacity="0.6" />
            {/* Coconut Palm silhouette */}
            <path d="M160,150 Q162,90 145,50 Q130,20 100,25 Q130,40 140,60 Q135,10 160,5 Q150,30 152,60 Q180,20 195,35 Q170,55 155,70 L168,150 Z" />
            {/* Small river boat */}
            <path d="M40,135 C50,135 60,130 75,130 C85,130 90,135 95,135 L90,138 L45,138 Z" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-3">
          {/* Left: Phone Graphic & Text */}
          <div className="flex items-center gap-3">
            {/* Phone Illustration Mockup */}
            <div className="w-12 h-16 sm:w-14 sm:h-20 bg-slate-900 rounded-xl p-1 shadow-md flex flex-col justify-between border border-slate-700 flex-shrink-0 relative transform -rotate-3 hover:rotate-0 transition-transform">
              {/* Speaker bar */}
              <div className="w-4 h-1 bg-slate-700 rounded-full mx-auto" />
              {/* Inner screen */}
              <div className="bg-[#087A50] rounded-lg h-full my-1 flex flex-col items-center justify-center p-1 text-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white mb-0.5" />
                <span className="text-[7px] font-bold text-white leading-none">ভোলা</span>
                <span className="text-[5px] text-emerald-200">সেবা</span>
              </div>
              {/* Home indicator */}
              <div className="w-5 h-0.5 bg-slate-600 rounded-full mx-auto" />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                অ্যাপটি আপনার ফোনে ইনস্টল করুন
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-600 font-medium leading-snug mt-0.5">
                আরও দ্রুত, সহজ ও অফলাইনে ব্যবহার করুন
              </p>
            </div>
          </div>

          {/* Right: Install CTA Button */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="bg-[#087A50] hover:bg-[#066341] active:bg-[#054f34] text-white text-xs font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-emerald-900/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
              <span>অ্যাপ ইনস্টল করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Install Guide Modal */}
      {showInstallGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowInstallGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-100 text-[#087A50] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                ভোলা সেবা অ্যাপ ইনস্টল করুন
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                কোনো প্লে স্টোর একাউন্ট ছাড়াই এক ক্লিকে আপনার ফোনে যুক্ত করুন
              </p>
            </div>

            <div className="mt-4 space-y-3 bg-slate-50 rounded-2xl p-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#087A50] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  ১
                </span>
                <p>
                  ব্রাউজারের (Chrome/Safari) মেনু আইকন <strong>(⋮ বা Share <Share2 className="w-3 h-3 inline" />)</strong> চাপুন।
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#087A50] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  ২
                </span>
                <p>
                  <strong>"Install App"</strong> অথবা <strong>"Add to Home Screen" <PlusSquare className="w-3 h-3 inline" /></strong> অপশনে ক্লিক করুন।
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#087A50] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  ৩
                </span>
                <p>
                  আপনার মোবাইল স্ক্রিনে সরাসরি অ্যাপ আইকন হিসেবে যুক্ত হয়ে যাবে!
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'লিংক কপি হয়েছে!' : 'বন্ধুদের সাথে শেয়ার'}</span>
              </button>
              <button
                onClick={() => setShowInstallGuide(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#087A50] text-white hover:bg-[#066341] font-semibold text-xs transition-colors"
              >
                বুঝেছি
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

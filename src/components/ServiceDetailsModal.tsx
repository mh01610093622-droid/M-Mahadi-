import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Share2,
  Heart,
  Navigation,
  CheckCircle2,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailsModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  service,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  if (!service) return null;

  const cleanPhone = service.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = (service.whatsapp || service.phone).replace(/[^0-9]/g, '');

  const shareText = `*ভোলা সেবা: ${service.banglaName}*\n📌 ক্যাটাগরি: ${service.categoryBangla}\n📍 ঠিকানা: ${service.address}, ${service.upazila}\n📞 যোগাযোগ: ${service.phone}\n⏰ সময়সূচী: ${service.openingHours}\n\nলিংক: ${window.location.origin}`;

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${service.banglaName} - ভোলা সেবা`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {
        handleCopyDetails();
      });
    } else {
      handleCopyDetails();
    }
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(`${service.banglaName}, ${service.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Content */}
      <div className="relative z-10 bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Top Header / Image Area */}
        <div className="relative h-52 sm:h-56 w-full bg-slate-900 flex-shrink-0">
          <img
            src={service.image}
            alt={service.banglaName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top action buttons: Favorite & Share */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(service.id)}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}
              aria-label="পছন্দ"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              aria-label="শেয়ার করুন"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Bottom Title & Badges inside Image Header */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="bg-[#087A50] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                {service.categoryBangla}
              </span>
              {service.verified && (
                <span className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  যাচাইকৃত প্রতিষ্ঠান
                </span>
              )}
              {service.isEmergency && (
                <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  ২৪ ঘন্টা জরুরি সেবা
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {service.banglaName}
            </h2>
            <p className="text-xs text-slate-300 font-medium">{service.name}</p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Quick Rating & Status row */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{service.rating}</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  ({service.reviewCount} রিভিউ)
                </span>
              </div>

              <div
                className={`text-xs font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                  service.isOpenNow
                    ? 'bg-emerald-50 text-[#087A50] border border-emerald-200'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{service.isOpenNow ? 'এখন খোলা আছে' : 'বর্তমানে বন্ধ'}</span>
              </div>
            </div>

            <span className="text-xs font-semibold text-[#087A50]">
              📍 {service.distance} দূরে
            </span>
          </div>

          {/* Quick Primary Actions: Call, WhatsApp & Share */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${cleanPhone}`}
              className="bg-[#087A50] hover:bg-[#066341] active:bg-[#054f34] text-white py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>সরাসরি কল</span>
            </a>

            <a
              href={`https://wa.me/88${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#169C4B] text-white py-3 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp চ্যাট</span>
            </a>
          </div>

          {/* Prominent Share Button & Options Panel */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#087A50]" />
                <span>সেবাটি শেয়ার করুন</span>
              </span>
              {copied && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3 h-3" /> কপি হয়েছে!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-0.5">
              {/* Share via WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `*ভোলা সেবা: ${service.banglaName}*\n📌 ক্যাটাগরি: ${service.categoryBangla}\n📍 ঠিকানা: ${service.address}, ${service.upazila}\n📞 ফোন: ${service.phone}\n⏰ সময়সূচী: ${service.openingHours}\n\nভোলা সেবা অ্যাপে দেখুন: ${window.location.origin}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-emerald-50 text-slate-800 border border-emerald-300 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs group"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]/20 group-hover:scale-110 transition-transform" />
                <span>WhatsApp-এ শেয়ার</span>
              </a>

              {/* Copy Link & Details to Clipboard */}
              <button
                type="button"
                onClick={handleCopyDetails}
                className="bg-white hover:bg-emerald-50 text-slate-800 border border-emerald-300 py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs group cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#087A50] group-hover:scale-110 transition-transform" />
                )}
                <span>{copied ? 'কপি হয়েছে' : 'লিংক ও তথ্য কপি'}</span>
              </button>
            </div>
          </div>

          {/* Contact & Location Details */}
          <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2.5 border border-slate-100 text-xs">
            {/* Phone numbers */}
            <div className="flex items-start gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-[#087A50] mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold block text-slate-900">ফোন নম্বর:</span>
                <div className="flex items-center gap-3 mt-0.5">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="text-[#087A50] font-bold hover:underline"
                  >
                    {service.phone}
                  </a>
                  {service.secondaryPhone && (
                    <a
                      href={`tel:${service.secondaryPhone.replace(/[^0-9]/g, '')}`}
                      className="text-slate-600 hover:text-[#087A50]"
                    >
                      , {service.secondaryPhone}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Address & Google Maps Direction */}
            <div className="flex items-start gap-2.5 text-slate-700 pt-1 border-t border-slate-200/60">
              <MapPin className="w-4 h-4 text-[#087A50] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="font-semibold block text-slate-900">ঠিকানা ও এলাকা:</span>
                <p className="text-slate-600 mt-0.5">{service.address}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[11px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                    {service.upazila} {service.union ? `• ${service.union}` : ''}
                  </span>
                  <button
                    type="button"
                    onClick={openGoogleMaps}
                    className="text-[11px] text-[#087A50] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    ম্যাপে দিকনির্দেশনা (Directions)
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-2.5 text-slate-700 pt-1 border-t border-slate-200/60">
              <Clock className="w-4 h-4 text-[#087A50] mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold block text-slate-900">সেবার সময়সূচী:</span>
                <p className="text-slate-600 mt-0.5 font-medium">{service.openingHours}</p>
              </div>
            </div>

            {/* Fee/Price range if available */}
            {service.priceRange && (
              <div className="pt-1 border-t border-slate-200/60 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-800">খরচ / সার্ভিস ফি: </span>
                <span>{service.priceRange}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">বিবরণ</h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-white">
              {service.description}
            </p>
          </div>

          {/* Services Offered checklist */}
          {service.servicesOffered && service.servicesOffered.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">উপলব্ধ সেবাসমূহ</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {service.servicesOffered.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-emerald-50/50 border border-emerald-100 rounded-xl p-2 text-xs text-slate-800 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#087A50] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Disclaimer */}
          <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 leading-normal border border-slate-100">
            <strong>সতর্কতা ও তথ্য নোট:</strong> ভোলা সেবা ডিরেক্টরিতে তালিকাভুক্ত তথ্যাদি স্থানীয় সেবা প্রদানকারীদের দেওয়া তথ্যের ভিত্তিতে সংগৃহীত ও নিয়মিত যাচাই করা হয়। জরুরি কোনো পরিস্থিতিতে সরাসরি সংশ্লিষ্ট প্রতিষ্ঠানের ফোন নম্বরে যোগাযোগের পরামর্শ দেয়া হচ্ছে।
          </div>
        </div>
      </div>
    </div>
  );
};

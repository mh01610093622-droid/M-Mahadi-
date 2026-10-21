import React, { useState } from 'react';
import { X, Plus, Store, Check, AlertCircle } from 'lucide-react';
import { ServiceCategory, ServiceItem, Upazila } from '../types';
import { UPAZILAS, CHAR_FASSON_UNIONS, CATEGORIES } from '../data/servicesData';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (newService: ServiceItem) => void;
  defaultUpazila?: Upazila;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onAddService,
  defaultUpazila = 'চরফ্যাশন',
}) => {
  const [banglaName, setBanglaName] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('market');
  const [subCategory, setSubCategory] = useState('');
  const [upazila, setUpazila] = useState<Upazila>(defaultUpazila);
  const [union, setUnion] = useState(CHAR_FASSON_UNIONS[0]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [openingHours, setOpeningHours] = useState('সকাল ৯:০০ - রাত ৯:০০');
  const [description, setDescription] = useState('');
  const [servicesOfferedText, setServicesOfferedText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // Preset sample images by category for easy selection
  const presetImages: Record<ServiceCategory, string> = {
    health: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    transport: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    market: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    repair: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    education: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    jobs: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    housing: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    other: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!banglaName.trim()) {
      setError('অনুগ্রহ করে প্রতিষ্ঠানের বাংলা নাম লিখুন');
      return;
    }
    if (!phone.trim()) {
      setError('যোগাযোগের ফোন নম্বর আবশ্যক');
      return;
    }
    if (!address.trim()) {
      setError('প্রতিষ্ঠানের সঠিক ঠিকানা লিখুন');
      return;
    }

    const categoryObj = CATEGORIES.find((c) => c.id === category);

    const servicesList = servicesOfferedText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newServiceItem: ServiceItem = {
      id: `user-service-${Date.now()}`,
      name: englishName.trim() || banglaName.trim(),
      banglaName: banglaName.trim(),
      category: category,
      categoryBangla: categoryObj ? categoryObj.banglaName : 'সাধারণ সেবা',
      subCategory: subCategory.trim() || undefined,
      upazila: upazila,
      union: union,
      address: address.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      openingHours: openingHours.trim(),
      isOpenNow: true,
      distance: '০.৩ কিমি',
      distanceKm: 0.3,
      rating: 5.0,
      reviewCount: 1,
      image: imageUrl.trim() || presetImages[category],
      verified: true, // Auto-verified for submission demo
      description:
        description.trim() ||
        `${banglaName} চরফ্যাশন উপজেলার একটি নির্ভরযোগ্য সেবা প্রতিষ্ঠান। বিস্তারিত তথ্যের জন্য সরাসরি কল করুন।`,
      servicesOffered:
        servicesList.length > 0
          ? servicesList
          : ['গুণগত মানসম্মত সেবা', 'সরাসরি যোগাযোগ', 'দ্রুত সমাধান'],
      isUserAdded: true,
    };

    onAddService(newServiceItem);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#087A50] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                আপনার সেবা বা ব্যবসা যুক্ত করুন
              </h3>
              <p className="text-[11px] text-emerald-100">
                ভোলা সেবায় সম্পূর্ণ বিনামূল্যে আপনার প্রতিষ্ঠান নিবন্ধন করুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="p-8 text-center flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 bg-emerald-100 text-[#087A50] rounded-full flex items-center justify-center mb-3 animate-bounce shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">
              সফলভাবে যুক্ত হয়েছে!
            </h4>
            <p className="text-sm text-slate-600 mt-1 max-w-xs">
              আপনার প্রতিষ্ঠান <strong>“{banglaName}”</strong> ভোলা সেবা ডিরেক্টরিতে তাৎক্ষণিকভাবে যুক্ত হয়েছে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Business Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  প্রতিষ্ঠানের নাম (বাংলায়) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={banglaName}
                  onChange={(e) => setBanglaName(e.target.value)}
                  placeholder="যেমন: মা ফার্মেসি ও ডায়াগনস্টিক"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50] focus:ring-1 focus:ring-[#087A50]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  প্রতিষ্ঠানের নাম (ইংরেজি - ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={englishName}
                  onChange={(e) => setEnglishName(e.target.value)}
                  placeholder="e.g. Maa Pharmacy"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50] focus:ring-1 focus:ring-[#087A50]"
                />
              </div>
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  সেবার ক্যাটাগরি <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white focus:outline-none focus:border-[#087A50]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.banglaName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  উপ-ক্যাটাগরি / বিশেষত্ব
                </label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="যেমন: চর্ম ও যৌন বিশেষজ্ঞ, ইলেকট্রিশিয়ান"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50]"
                />
              </div>
            </div>

            {/* Upazila & Union */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  উপজেলা <span className="text-rose-500">*</span>
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value as Upazila)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 bg-white focus:outline-none focus:border-[#087A50]"
                >
                  {UPAZILAS.map((upz) => (
                    <option key={upz} value={upz}>
                      {upz} উপজেলা
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  ইউনিয়ন / এলাকা
                </label>
                <input
                  type="text"
                  value={union}
                  onChange={(e) => setUnion(e.target.value)}
                  placeholder="যেমন: পৌরসভা এলাকা, আসলামপুর"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50]"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                পূর্ণাঙ্গ ঠিকানা <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="যেমন: ফ্যাশন মোড়, সোনালী ব্যাংক সংলগ্ন, চরফ্যাশন"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50]"
              />
            </div>

            {/* Phones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  ফোন / মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="যেমন: ০১৭XXXXXXXX"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  হোয়াটসঅ্যাপ নম্বর (যদি থাকে)
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="যেমন: ০১৮XXXXXXXX"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50]"
                />
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                সেবা প্রদানের সময়সূচী
              </label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="যেমন: সকাল ৮:০০ - রাত ১০:০০ অথবা ২৪ ঘন্টা"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50]"
              />
            </div>

            {/* Services checklist tags */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                উপলব্ধ সেবাসমূহ (কমা দিয়ে লিখুন)
              </label>
              <input
                type="text"
                value={servicesOfferedText}
                onChange={(e) => setServicesOfferedText(e.target.value)}
                placeholder="যেমন: হোম ডেলিভারি, জরুরি সার্ভিস, ডিজিটাল টেস্ট"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#087A50]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                প্রতিষ্ঠানের সংক্ষিপ্ত বিবরণ
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="আপনার প্রতিষ্ঠান বা সেবার বিশেষত্ব সম্পর্কে লিখুন..."
                className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#087A50]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#087A50] hover:bg-[#066341] active:bg-[#054f34] text-white py-3 rounded-2xl font-bold text-sm shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>ডিরেক্টরিতে যুক্ত করুন</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

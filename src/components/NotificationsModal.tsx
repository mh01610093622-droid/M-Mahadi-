import React from 'react';
import { X, Bell, Check, AlertTriangle, Info, Calendar } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#087A50] flex items-center justify-center">
              <Bell className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">
                বিজ্ঞপ্তি ও জরুরি বার্তা
              </h3>
              <p className="text-[11px] text-slate-500">
                চরফ্যাশন ও ভোলা সংক্রান্ত তাজা খবর
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] font-semibold text-[#087A50] hover:underline px-2 py-1"
            >
              পড়া হিসেবে চিহ্নিত করুন
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl border transition-all ${
                item.isRead
                  ? 'bg-slate-50/70 border-slate-200/80 text-slate-700'
                  : 'bg-emerald-50/60 border-emerald-200/90 text-slate-900 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    item.type === 'alert'
                      ? 'bg-amber-100 text-amber-700'
                      : item.type === 'service'
                      ? 'bg-emerald-100 text-[#087A50]'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {item.type === 'alert' ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : item.type === 'service' ? (
                    <Calendar className="w-4 h-4" />
                  ) : (
                    <Info className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold leading-tight">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

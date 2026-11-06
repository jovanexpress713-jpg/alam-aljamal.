import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <aside aria-label="الإشعارات الفورية" className="fixed top-20 sm:top-24 inset-x-4 sm:inset-x-auto sm:right-6 rtl:sm:right-auto rtl:sm:left-6 z-50 pointer-events-none transition-all duration-300">
      <div className="flex items-center space-x-3 rtl:space-x-reverse px-5 py-3 rounded-xl bg-[#121212]/95 backdrop-blur-xl border border-[#D7AD55]/40 text-[#F4EAD5] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_15px_rgba(215,173,85,0.2)] max-w-md pointer-events-auto">
        {toast.type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : toast.type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <Sparkles className="w-5 h-5 text-[#D7AD55] shrink-0 animate-pulse" />
        )}
        <span className="text-xs sm:text-sm font-medium leading-snug">{toast.message}</span>
      </div>
    </aside>
  );
};

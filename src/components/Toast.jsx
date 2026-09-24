import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-[#4A2E25] text-[#FAF7F2] border border-[#E5A93C]/40 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold">
        <Sparkles className="w-4 h-4 text-[#E5A93C] shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

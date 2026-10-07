import React from 'react';
import { Sparkles, CheckCircle, Info, X } from 'lucide-react';
import clsx from 'clsx';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300",
            toast.type === 'success' 
              ? "bg-[#080d08]/95 border-emerald-500/40 text-emerald-200"
              : toast.type === 'error'
              ? "bg-[#100707]/95 border-rose-800 text-rose-200"
              : "bg-[#090b09]/95 border-stone-800 text-stone-200"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={clsx(
              "p-1.5 rounded-xl shrink-0",
              toast.type === 'success' ? "bg-emerald-950 text-emerald-400" : "bg-stone-900 text-stone-300"
            )}>
              {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <p className="text-xs font-mono font-medium leading-snug">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-300 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (type: ToastType, message: string) => {
        switch (type) {
          case 'success':
            sonnerToast.success(message);
            break;
          case 'error':
            sonnerToast.error(message);
            break;
          case 'warning':
            sonnerToast.warning(message);
            break;
          case 'info':
          default:
            sonnerToast(message);
        }
      },
      success: (message: string) => sonnerToast.success(message),
      error: (message: string) => sonnerToast.error(message),
      warning: (message: string) => sonnerToast.warning(message),
      info: (message: string) => sonnerToast(message),
    };
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 5000) => {
      const id = Math.random().toString(36).substring(7);
      const toast: Toast = { id, type, message, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, duration?: number) => showToast('success', message, duration),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => showToast('error', message, duration),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => showToast('warning', message, duration),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => showToast('info', message, duration),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'bg-[var(--neon-green)]/10',
      border: 'border-[var(--neon-green)]/50',
      text: 'text-[var(--neon-green)]',
      icon: 'text-[var(--neon-green)]',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/50',
      text: 'text-red-400',
      icon: 'text-red-400',
    },
    warning: {
      bg: 'bg-[var(--neon-orange)]/10',
      border: 'border-[var(--neon-orange)]/50',
      text: 'text-[var(--neon-orange)]',
      icon: 'text-[var(--neon-orange)]',
    },
    info: {
      bg: 'bg-[var(--neon-cyan)]/10',
      border: 'border-[var(--neon-cyan)]/50',
      text: 'text-[var(--neon-cyan)]',
      icon: 'text-[var(--neon-cyan)]',
    },
  };

  const Icon = icons[toast.type];
  const color = colors[toast.type];

  return (
    <div
      className={`flex items-start gap-3 p-4 ${color.bg} border-2 ${color.border} rounded-xl backdrop-blur-xl shadow-lg animate-slide-in-right`}
    >
      <Icon className={`w-5 h-5 ${color.icon} flex-shrink-0 mt-0.5`} />
      <p className={`flex-1 text-sm font-bold ${color.text}`}>{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-white/40 hover:text-white transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Add animation to globals.css
const styles = `
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}
`;

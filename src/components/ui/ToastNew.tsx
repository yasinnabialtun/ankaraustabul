import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToasts } from '../../store';
import type { ToastProps } from '../../types';

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

function Toast({ toast }: { toast: ToastProps }) {
  const { removeToast } = useToasts();
  const Icon = toastIcons[toast.type];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, removeToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border max-w-md ${toastStyles[toast.type]}`}
    >
      <Icon className="h-5 w-5" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      {toast.action && (
        <button onClick={toast.action.onClick} className="text-sm underline">
          {toast.action.label}
        </button>
      )}
      <button onClick={() => removeToast(toast.id)}>
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function ToastContainer() {
  const { toasts } = useToasts();

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}

export const toast = {
  success: (message: string) => {
    const { addToast } = useToasts.getState();
    addToast({ type: 'success', message });
  },
  error: (message: string) => {
    const { addToast } = useToasts.getState();
    addToast({ type: 'error', message });
  },
  warning: (message: string) => {
    const { addToast } = useToasts.getState();
    addToast({ type: 'warning', message });
  },
  info: (message: string) => {
    const { addToast } = useToasts.getState();
    addToast({ type: 'info', message });
  },
};

export default ToastContainer;
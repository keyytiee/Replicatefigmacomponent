import { useEffect } from 'react';

interface UndoToastProps {
  isOpen: boolean;
  message: string;
  onUndo: () => void;
  onClose: () => void;
}

export default function UndoToast({ isOpen, message, onUndo, onClose }: UndoToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[100px] left-1/2 transform -translate-x-1/2 z-50 animate-[slideUpToast_0.3s_ease-out]">
      <div className="bg-[#303030] border border-black rounded-[15px] shadow-[4px_4px_0px_0px_#000000] px-6 py-3 flex items-center gap-4">
        <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-white text-[14px] tracking-[-0.14px]">
          {message}
        </p>
        <button
          onClick={onUndo}
          className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#ffcb3d] text-[14px] tracking-[-0.14px] hover:text-[#ffd55a] transition-colors"
        >
          UNDO
        </button>
        <button
          onClick={onClose}
          className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-white/60 text-[18px] hover:text-white/80 transition-colors ml-2"
        >
          ×
        </button>
      </div>
    </div>
  );
}
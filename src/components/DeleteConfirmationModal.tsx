import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transactionAmount?: number;
  itemType?: 'transaction' | 'income';
}

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, transactionAmount, itemType = 'transaction' }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  const displayType = itemType === 'income' ? 'income' : 'transaction';
  const displayTypeCapitalized = displayType.charAt(0).toUpperCase() + displayType.slice(0);

  return (
    <div className="absolute inset-0 bg-black/50 z-[100] flex items-center justify-center" onClick={onClose}>
      <div 
        className="relative bg-white rounded-[20px] w-[340px] h-[220px] shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 rounded-[20px] overflow-hidden">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-[30px]">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-[#303030] text-center mb-[15px] tracking-[-0.2px]">
            Delete {displayTypeCapitalized}?
          </p>
          
          <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[#303030] text-center mb-[25px] leading-relaxed">
            {transactionAmount !== undefined ? (
              <>Are you sure you want to delete this {displayType} of <span className="font-['Inter:Bold',sans-serif] font-bold">₱{transactionAmount.toFixed(2)}</span>?</>
            ) : (
              <>Are you sure you want to delete this {displayType}?</>
            )}
          </p>

          {/* Buttons */}
          <div className="flex gap-[15px] w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-[rgba(217,217,217,0.5)] border border-[#303030] border-solid rounded-[12px] h-[45px] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[16px] text-[#303030] hover:bg-[rgba(217,217,217,0.7)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 bg-[#ff6b6b] border border-[#303030] border-solid rounded-[12px] h-[45px] font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[16px] text-white hover:bg-[#ff5252] transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import svgPaths from "../imports/svg-view-transaction";
import svgPathsDashboard from "../imports/svg-dashboard";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import imgImage10 from "figma:asset/a6cfeb7085c4ee84b1b8792b91b756a68007fb5a.png";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import type { Transaction } from "../App";

interface ViewTransactionModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (transaction: Transaction) => void;
  isDarkMode?: boolean;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Transportation":
      return (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
          <path d={svgPathsDashboard.p133d6180} fill="var(--fill-0, #303030)" id="Vector" />
        </svg>
      );
    case "Food & Grocery":
      return (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <path d={svgPathsDashboard.p3025aa80} fill="var(--fill-0, #303030)" id="Vector" />
        </svg>
      );
    case "Healthcare":
      return (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 17">
          <path clipRule="evenodd" d={svgPathsDashboard.p2df08180} fill="var(--fill-0, #303030)" fillRule="evenodd" id="Vector" />
        </svg>
      );
    case "Education":
      return (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="tdesign:education-filled">
            <path d={svgPathsDashboard.p1a7bff00} fill="var(--fill-0, black)" id="Vector" />
            <path d={svgPathsDashboard.p252e3900} fill="var(--fill-0, black)" id="Vector_2" />
          </g>
        </svg>
      );
    case "Utilities":
      return (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
          <g clipPath="url(#clip0_modal_utilities)" id="streamline-sharp:eco-house-remix">
            <path clipRule="evenodd" d={svgPathsDashboard.p31c4a7f0} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
          </g>
          <defs>
            <clipPath id="clip0_modal_utilities">
              <rect fill="white" height="21" width="21" />
            </clipPath>
          </defs>
        </svg>
      );
    case "Leisure":
      return (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d="M7 16C7 17.1046 6.10457 18 5 18C3.89543 18 3 17.1046 3 16C3 14.8954 3.89543 14 5 14C6.10457 14 7 14.8954 7 16ZM17 16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16C13 14.8954 13.8954 14 15 14C16.1046 14 17 14.8954 17 16ZM6.5 13L4.85 5H2V3H6L7.85 11.5H16.5L18.5 6H8.5L9.15 4H20L17.35 12C17.1478 12.5911 16.5891 13 15.95 13H6.5Z" fill="var(--fill-0, black)" id="Vector" />
        </svg>
      );
    case "Bills":
      return (
        <svg className="block size-full" fill="none" viewBox="0 0 20 20">
          <path d="M3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V7H13C12.4477 7 12 6.55228 12 6V1H3ZM14 1.5V6H18.5L14 1.5ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z" fill="var(--fill-0, #303030)" />
        </svg>
      );
    case "Miscellaneous":
      return (
        <svg className="block size-full" fill="none" viewBox="0 0 20 20">
          <path d="M6 2H2V6H4V4H6V2ZM10 2H14V4H16V6H18V10H16V8H14V6H10V2ZM8 6V10H10V14H6V16H2V12H4V10H6V8H8V6ZM12 10V14H10V18H14V16H12V14H14V12H16V8H14V10H12ZM16 12V16H14V18H18V14H16V12Z" fill="var(--fill-0, #303030)" id="Vector" />
        </svg>
      );
    default:
      return null;
  }
}

function Sidebar({ isDarkMode }: { isDarkMode?: boolean }) {
  const strokeColor = isDarkMode ? '#FFFFFF' : '#303030';
  const fillColor = isDarkMode ? '#FFFFFF' : '#303030';
  const polygonFill = isDarkMode ? '#FFFFFF' : '#D9D9D9';
  
  return (
    <div className="absolute h-[133px] left-[419px] top-[375px] w-[21px]" data-name="Sidebar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 133">
        <g id="Sidebar">
          <rect fill={fillColor} height="26" id="Sidebar_2" rx="6.5" stroke={strokeColor} width="20" x="0.5" y="54.5" />
          <line id="Line 10" stroke={strokeColor} strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p25a9b40} fill={polygonFill} id="Polygon 1" stroke={strokeColor} />
        </g>
      </svg>
    </div>
  );
}

function ReturnButton({ onClick, isDarkMode }: { onClick: () => void; isDarkMode?: boolean }) {
  return (
    <div className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px] cursor-pointer hover:opacity-70 transition-opacity" data-name="Return Button" onClick={onClick}>
      <div className="absolute inset-[0_-8.6%_-2.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
          <g id="Return Button">
            <line id="Line 11" stroke={isDarkMode ? '#FFFFFF' : 'black'} x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
            <line id="Line 12" stroke={isDarkMode ? '#FFFFFF' : 'black'} x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute contents left-[32px] top-[826px] cursor-pointer" data-name="Edit Button" onClick={onClick}>
      <div className="absolute bg-[#e5d0ac] h-[53.541px] left-[32px] rounded-[15px] top-[826px] w-[285px] hover:bg-[#d9c49d] transition-colors">
        <div aria-hidden="true" className="absolute border border-[#303030] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] leading-[normal] left-[174.5px] text-[#303030] text-[20px] text-center top-[838px] tracking-[-0.2px] translate-x-[-50%] w-[148.073px] pointer-events-none">Edit</p>
    </div>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute left-[327px] top-[826px] cursor-pointer" data-name="Delete Button" onClick={onClick}>
      <div className="absolute bg-[#b45c4c] h-[53.541px] left-0 rounded-[15px] top-0 w-[68px] hover:bg-[#a04e3f] transition-colors flex items-center justify-center">
        <div aria-hidden="true" className="absolute border border-[#303030] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
        <Trash2 className="relative h-[20px] w-[20px] text-black opacity-75 pointer-events-none" />
      </div>
    </div>
  );
}

export default function ViewTransactionModal({ transaction, isOpen, onClose, onDelete, onEdit, isDarkMode }: ViewTransactionModalProps) {
  if (!transaction) return null;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(transaction.id);
    }
    setIsDeleteModalOpen(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 z-[95] ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`absolute left-0 top-0 w-[428px] h-[926px] z-[100] transition-transform duration-500 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className={`relative size-full transition-colors duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`} data-name="View Transac">
          <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]" data-name="Untitled design (4) 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
          </div>
          <div className="absolute bg-[rgba(217,217,217,0.5)] border border-black border-solid h-[310px] left-[32px] rounded-[12px] shadow-[4px_4px_0px_0px_#000000] top-[119px] w-[363px]" />
          <Sidebar isDarkMode={isDarkMode} />
          <ReturnButton onClick={onClose} isDarkMode={isDarkMode} />
          <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[167px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Transaction</p>
          <div className="absolute bg-[rgba(217,217,217,0.5)] border border-black border-solid h-[58px] left-[32px] rounded-[12px] shadow-[4px_4px_0px_0px_#000000] top-[503px] w-[363px]" />
          <div className="absolute bg-[rgba(48,48,48,0.3)] h-[36px] left-[45px] rounded-[10px] top-[514px] w-[76px] flex items-center justify-center">
            <div className="w-[20px] h-[20px]">
              {getCategoryIcon(transaction.category)}
            </div>
          </div>
          <div className={`absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[18px] leading-[normal] left-[132px] text-[18px] top-[520px] tracking-[-0.18px] w-[177px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <p className="mb-0">{transaction.title || transaction.description}</p>
            <p>&nbsp;</p>
          </div>
          <p className={`absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] right-[45px] text-[18px] top-[520px] tracking-[-0.18px] text-right ${isDarkMode ? 'text-white' : 'text-black'}`}>-₱{transaction.amount.toFixed(2)}</p>
          <div className={`absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[38px] not-italic text-[0px] top-[443px] tracking-[-0.16px] w-[259px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <p className="font-['Inter:Bold',sans-serif] font-bold mb-0 text-[16px]">{transaction.date}</p>
            <p className="text-[11px]">{transaction.time}</p>
          </div>
          <div className="absolute bg-[rgba(217,217,217,0.3)] border border-[rgba(0,0,0,0.3)] border-solid h-[174px] left-[32px] rounded-[10px] top-[585px] w-[367px]" />
          <p className={`absolute font-['Inter:Italic',sans-serif] font-normal h-[21px] italic leading-[normal] left-[54px] text-[11px] top-[600px] tracking-[-0.11px] w-[307px] ${isDarkMode ? 'text-white/70' : 'text-[rgba(0,0,0,0.5)]'}`}>Description</p>
          {transaction.description && (
            <p className={`absolute font-['Inter:Regular',sans-serif] font-normal left-[54px] text-[12px] top-[625px] w-[307px] leading-relaxed ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {transaction.description}
            </p>
          )}
          <EditButton onClick={() => onEdit && onEdit(transaction)} />
          <DeleteButton onClick={handleDelete} />
          <div className="absolute h-[286px] left-[45px] rounded-[12px] top-[130px] w-[341px]" data-name="image 10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
              {transaction.attachedImage ? (
                <img alt="Transaction attachment" className="absolute inset-0 w-full h-full object-cover" src={transaction.attachedImage} />
              ) : (
                <img alt="" className="absolute h-full left-[-12.07%] max-w-none top-0 w-[160.13%]" src={imgImage10} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        transactionAmount={transaction.amount}
      />
    </>
  );
}
import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-add-transaction";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import DescriptionModal from "./DescriptionModal";
import PawPrint from "./PawPrint";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardType: 'bank' | 'cash' | 'savings';
  currentBalance: number;
  onAddTransaction: (transaction: { category: string; title: string; description: string; amount: number; cardType: 'bank' | 'cash' | 'savings'; date: string; time: string }) => void;
  editMode?: boolean;
  existingTransaction?: {
    id: string;
    category: string;
    title: string;
    description: string;
    amount: number;
    cardType: 'bank' | 'cash' | 'savings';
    date: string;
    time: string;
  };
  onEditTransaction?: (id: string, transaction: { category: string; title: string; description: string; amount: number; cardType: 'bank' | 'cash' | 'savings'; date: string; time: string }) => void;
}

type Category = 'Food & Grocery' | 'Transportation' | 'Bills' | 'Utilities' | 'Healthcare' | 'Leisure' | 'Education' | 'Miscellaneous';

function ReturnButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px] cursor-pointer hover:opacity-70 transition-opacity z-20" 
      data-name="Return Button"
      onClick={onClick}
    >
      <div className="absolute inset-[0_-8.6%_-2.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
          <g id="Return Button">
            <line id="Line 11" stroke="var(--stroke-0, black)" x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
            <line id="Line 12" stroke="var(--stroke-0, black)" x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
          </g>
        </svg>
      </div>
    </button>
  );
}

function IconoirAttachment() {
  return (
    <div className="absolute left-[258px] size-[15px] top-[780px]" data-name="iconoir:attachment">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="iconoir:attachment">
          <path d={svgPaths.p79df8d2} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ConfirmButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="absolute contents left-[35px] top-[860px] cursor-pointer" 
      data-name="Confirm Button"
      onClick={onClick}
    >
      <div className="absolute bg-[#e5d0ac] h-[53.541px] left-[35px] rounded-[15px] top-[860px] w-[357.999px] hover:bg-[#d9c49d] transition-colors">
        <div aria-hidden="true" className="absolute border border-[#303030] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] leading-[normal] left-[214px] text-[#303030] text-[20px] text-center top-[872px] tracking-[-0.2px] translate-x-[-50%] w-[186px] pointer-events-none">Confirm</p>
    </button>
  );
}

export default function AddTransactionModal({ isOpen, onClose, cardType, currentBalance, onAddTransaction, editMode, existingTransaction, onEditTransaction }: AddTransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setAmount('');
      setSelectedCategory(null);
      setDescription('');
      setTitle('');
      setShowDescriptionModal(false);
    } else if (editMode && existingTransaction) {
      // Populate form with existing transaction data
      setAmount(existingTransaction.amount.toString());
      setSelectedCategory(existingTransaction.category as Category);
      setDescription(existingTransaction.description);
      setTitle(existingTransaction.title);
    }
  }, [isOpen, editMode, existingTransaction]);

  if (!isOpen) return null;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleConfirm = () => {
    if (!amount || !selectedCategory) {
      alert('Please enter an amount and select a category');
      return;
    }
    
    // Here you would typically save the transaction
    const transaction = {
      amount: parseFloat(amount),
      category: selectedCategory,
      description,
      title,
      cardType,
      date,
      time
    };
    if (editMode && existingTransaction && onEditTransaction) {
      onEditTransaction(existingTransaction.id, transaction);
    } else {
      onAddTransaction(transaction);
    }
    
    onClose();
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return { date: dateStr, time: timeStr };
  };

  const { date, time } = getCurrentDateTime();

  const getCardName = () => {
    if (cardType === 'bank') return 'Bank Money';
    if (cardType === 'cash') return 'Cash Money';
    return 'Savings Money';
  };

  const getCardColor = () => {
    if (cardType === 'bank') return '#ffcb3d';
    if (cardType === 'cash') return '#701c1c';
    return '#303030';
  };

  const getTextColor = () => {
    if (cardType === 'bank') return '#303030';
    return 'white';
  };

  return (
    <div className="absolute inset-0 bg-white z-[70]" data-name="Add Transac">
      <div className="absolute h-[926px] left-[-2px] opacity-10 top-0 w-[428px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      
      <ReturnButton onClick={onClose} />
      
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[#303030] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[167px]">
        {editMode ? 'Edit Transaction' : 'Add Transaction'}
      </p>
      
      {/* Date and Time */}
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[213.5px] not-italic text-[0px] text-black text-center top-[345px] tracking-[-0.16px] translate-x-[-50%] w-[259px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold mb-0 text-[20px]">{date} </p>
        <p className="text-[15px]">{time}</p>
      </div>
      
      {/* Amount Input */}
      <div className="absolute bg-[rgba(217,217,217,0.5)] border border-black border-solid h-[41px] left-[124px] rounded-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] top-[414px] w-[179px]" />
      <input
        type="text"
        value={amount ? `P ${amount}` : ''}
        onChange={(e) => {
          const value = e.target.value.replace('P ', '');
          handleAmountChange({ target: { value } } as any);
        }}
        placeholder="P 00.00"
        className="absolute font-['Inter:Regular',sans-serif] font-normal h-[41px] leading-[normal] left-[124px] not-italic text-[15px] text-[rgba(0,0,0,0.5)] text-center top-[414px] tracking-[-0.15px] w-[179px] bg-transparent border-none outline-none placeholder:text-[rgba(0,0,0,0.5)]"
        style={{ color: amount ? 'black' : 'rgba(0,0,0,0.5)' }}
      />
      
      {/* Card Display */}
      <div 
        className="absolute border border-black border-solid h-[195px] left-[19px] rounded-[30px] shadow-[4px_4px_0px_0px_#000000] top-[108px] w-[387px]" 
        style={{ backgroundColor: getCardColor() }}
      />
      <p 
        className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[27px] leading-[normal] left-[47px] text-[12px] top-[135px] tracking-[-0.12px] w-[175px]"
        style={{ color: getTextColor() }}
      >
        {getCardName()}
      </p>
      <p 
        className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[71px] leading-[normal] left-[47px] text-[36px] top-[159px] tracking-[-0.36px] w-[400px]"
        style={{ color: getTextColor() }}
      >
        ₱ {amount ? (currentBalance - parseFloat(amount)).toFixed(2) : currentBalance.toFixed(2)}
      </p>
      <p 
        className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[46px] text-[12px] top-[262px] tracking-[-0.12px] w-[99px]"
        style={{ color: getTextColor(), opacity: 0.75 }}
      >
        Current Balance
      </p>
      
      {/* Category Icons - Food & Grocery */}
      <button 
        className="absolute cursor-pointer hover:opacity-80 transition-opacity h-[60px] w-[138px] left-[69px] top-[481px]"
        onClick={() => handleCategoryClick('Food & Grocery')}
      >
        {selectedCategory === 'Food & Grocery' && (
          <div className="absolute bg-[rgba(217,217,217,0.5)] h-[60px] left-0 rounded-[10px] top-0 w-[138px]" />
        )}
        <div className="absolute left-[58px] size-[22px] top-[8px] -translate-x-1/2" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p3025aa80} fill="var(--fill-0, black)" fillOpacity={selectedCategory === 'Food & Grocery' ? "1" : "0.75"} id="Vector" />
          </svg>
        </div>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-1/2 -translate-x-1/2 text-[11px] ${selectedCategory === 'Food & Grocery' ? 'text-black' : 'text-[rgba(0,0,0,0.75)]'} text-center top-[35px] tracking-[-0.11px] w-[110px]`}>{`Food & Grocery`}</p>
      </button>

      {/* Transportation */}
      <button 
        className="absolute cursor-pointer hover:opacity-80 transition-opacity h-[60px] w-[138px] left-[231px] top-[481px]"
        onClick={() => handleCategoryClick('Transportation')}
      >
        {selectedCategory === 'Transportation' && (
          <div className="absolute bg-[rgba(217,217,217,0.5)] h-[60px] left-0 rounded-[10px] top-0 w-[138px]" />
        )}
        <div className="absolute left-[58px] size-[20px] top-[9px] -translate-x-1/2" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
            <path d={svgPaths.p133d6180} fill="var(--fill-0, black)" fillOpacity={selectedCategory === 'Transportation' ? "1" : "0.75"} id="Vector" />
          </svg>
        </div>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-1/2 -translate-x-1/2 text-[11px] ${selectedCategory === 'Transportation' ? 'text-black' : 'text-[rgba(0,0,0,0.75)]'} text-center top-[35px] tracking-[-0.11px] w-[110px]`}>Transportation</p>
      </button>

      {/* Bills */}
      <button 
        className="absolute cursor-pointer hover:opacity-80 transition-opacity h-[60px] w-[138px] left-[69px] top-[551px]"
        onClick={() => handleCategoryClick('Bills')}
      >
        {selectedCategory === 'Bills' && (
          <div className="absolute bg-[rgba(217,217,217,0.5)] h-[60px] left-0 rounded-[10px] top-0 w-[138px]" />
        )}
        <div className="absolute left-[58px] overflow-clip size-[24px] top-[7px] -translate-x-1/2" data-name="streamline-ultimate:cash-payment-bills">
          <div className="absolute inset-[3.13%_13.21%_3.14%_13.21%]" data-name="Group">
            <div className="absolute inset-[-3.33%_-4.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 24">
                <g id="Group">
                  <path d={svgPaths.p380b0d58} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={selectedCategory === 'Bills' ? "1" : "0.75"} strokeWidth="1.5" />
                  <path d={svgPaths.p2a16f740} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={selectedCategory === 'Bills' ? "1" : "0.75"} strokeWidth="1.5" />
                  <path d={svgPaths.p3470a000} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={selectedCategory === 'Bills' ? "1" : "0.75"} strokeWidth="1.5" />
                  <path d={svgPaths.p30231500} id="Vector_4" stroke="var(--stroke-0, black)" strokeOpacity={selectedCategory === 'Bills' ? "1" : "0.75"} strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-1/2 -translate-x-1/2 text-[11px] ${selectedCategory === 'Bills' ? 'text-black' : 'text-[rgba(0,0,0,0.75)]'} text-center top-[36px] tracking-[-0.11px] w-[110px]`}>Bills</p>
      </button>

      {/* Utilities */}
      <button 
        className="absolute cursor-pointer hover:opacity-80 transition-opacity h-[60px] w-[138px] left-[231px] top-[551px]"
        onClick={() => handleCategoryClick('Utilities')}
      >
        {selectedCategory === 'Utilities' && (
          <div className="absolute bg-[rgba(217,217,217,0.5)] h-[60px] left-0 rounded-[10px] top-0 w-[138px]" />
        )}
        <div className="absolute left-[58px] size-[24px] top-[6px] -translate-x-1/2" data-name="streamline-sharp:eco-house-remix">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g clipPath="url(#clip0_6_517)" id="streamline-sharp:eco-house-remix">
              <path clipRule="evenodd" d={svgPaths.p1f791600} fill="var(--fill-0, black)" fillOpacity={selectedCategory === 'Utilities' ? "1" : "0.75"} fillRule="evenodd" id="Vector" />
            </g>
            <defs>
              <clipPath id="clip0_6_517">
                <rect fill="white" height="24" width="24" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-1/2 -translate-x-1/2 text-[11px] ${selectedCategory === 'Utilities' ? 'text-black' : 'text-[rgba(0,0,0,0.75)]'} text-center top-[35px] tracking-[-0.11px] w-[110px]`}>Utilities</p>
      </button>

      {/* Healthcare */}
      <button 
        className="absolute cursor-pointer hover:opacity-80 transition-opacity h-[60px] w-[138px] left-[69px] top-[621px]"
        onClick={() => handleCategoryClick('Healthcare')}
      >
        {selectedCategory === 'Healthcare' && (
          <div className="absolute bg-[rgba(217,217,217,0.5)] h-[60px] left-0 rounded-[10px] top-0 w-[138px]" />
        )}
        <div className="absolute left-[58px] size-[20px] top-[9px] -translate-x-1/2" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 17">
            <path clipRule="evenodd" d={svgPaths.p2df08180} fill="var(--fill-0, black)" fillOpacity={selectedCategory === 'Healthcare' ? "1" : "0.75"} fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-1/2 -translate-x-1/2 text-[11px] ${selectedCategory === 'Healthcare' ? 'text-black' : 'text-[rgba(0,0,0,0.75)]'} text-center top-[35px] tracking-[-0.11px] w-[110px]`}>Healthcare</p>
      </button>

      {/* Leisure */}
      <button 
        className="absolute cursor-pointer hover:opacity-80 transition-opacity h-[60px] w-[138px] left-[231px] top-[621px]"
        onClick={() => handleCategoryClick('Leisure')}
      >
        {selectedCategory === 'Leisure' && (
          <div className="absolute bg-[rgba(217,217,217,0.5)] h-[60px] left-0 rounded-[10px] top-0 w-[138px]" />
        )}
        <div className="absolute left-[58px] size-[20px] top-[9px] -translate-x-1/2" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p10e0fd80} fill="var(--fill-0, black)" fillOpacity={selectedCategory === 'Leisure' ? "1" : "0.75"} id="Vector" />
          </svg>
        </div>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-1/2 -translate-x-1/2 text-[11px] ${selectedCategory === 'Leisure' ? 'text-black' : 'text-[rgba(0,0,0,0.75)]'} text-center top-[35px] tracking-[-0.11px] w-[110px]`}>Leisure</p>
      </button>

      {/* Education */}
      <button 
        className="absolute cursor-pointer hover:opacity-80 transition-opacity h-[60px] w-[138px] left-[69px] top-[691px]"
        onClick={() => handleCategoryClick('Education')}
      >
        {selectedCategory === 'Education' && (
          <div className="absolute bg-[rgba(217,217,217,0.5)] h-[60px] left-0 rounded-[10px] top-0 w-[138px]" />
        )}
        <div className="absolute left-[58px] size-[24px] top-[6px] -translate-x-1/2" data-name="tdesign:education-filled">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="tdesign:education-filled">
              <path d={svgPaths.p1a7bff00} fill="var(--fill-0, black)" fillOpacity={selectedCategory === 'Education' ? "1" : "0.75"} id="Vector" />
              <path d={svgPaths.p252e3900} fill="var(--fill-0, black)" fillOpacity={selectedCategory === 'Education' ? "1" : "0.75"} id="Vector_2" />
            </g>
          </svg>
        </div>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-1/2 -translate-x-1/2 text-[11px] ${selectedCategory === 'Education' ? 'text-black' : 'text-[rgba(0,0,0,0.75)]'} text-center top-[35px] tracking-[-0.11px] w-[110px]`}>Education</p>
      </button>

      {/* Miscellaneous */}
      <button 
        className="absolute cursor-pointer hover:opacity-80 transition-opacity h-[60px] w-[138px] left-[231px] top-[691px]"
        onClick={() => handleCategoryClick('Miscellaneous')}
      >
        {selectedCategory === 'Miscellaneous' && (
          <div className="absolute bg-[rgba(217,217,217,0.5)] h-[60px] left-0 rounded-[10px] top-0 w-[138px]" />
        )}
        <div className="absolute left-[58px] size-[24px] top-[6px] -translate-x-1/2" data-name="eos-icons:miscellaneous">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="eos-icons:miscellaneous">
              <path d={svgPaths.p4bcebf2} fill="var(--fill-0, black)" fillOpacity={selectedCategory === 'Miscellaneous' ? "1" : "0.75"} id="Vector" />
            </g>
          </svg>
        </div>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-1/2 -translate-x-1/2 text-[11px] ${selectedCategory === 'Miscellaneous' ? 'text-black' : 'text-[rgba(0,0,0,0.75)]'} text-center top-[35px] tracking-[-0.11px] w-[110px]`}>Miscellaneous</p>
      </button>

      {/* Description Area - Clickable Button */}
      <button 
        className="absolute bg-[rgba(217,217,217,0.3)] h-[78px] left-[69px] rounded-[5px] top-[768px] w-[300px] cursor-pointer hover:bg-[rgba(217,217,217,0.4)] transition-colors"
        onClick={() => setShowDescriptionModal(true)}
      />
      <p className="absolute font-['Inter:Italic',sans-serif] font-normal h-[21px] italic leading-[normal] left-[82px] text-[11px] text-[rgba(0,0,0,0.5)] top-[780px] tracking-[-0.11px] w-[259px] pointer-events-none">
        {title || 'Add Description'}
      </p>
      {description && (
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal left-[82px] text-[11px] text-black top-[800px] w-[274px] h-[36px] overflow-hidden pointer-events-none">
          {description.substring(0, 100)}
        </p>
      )}
      
      {/* Attach Image Button */}
      <div className="absolute bg-[#d9d9d9] h-[20px] left-[244px] rounded-[10px] top-[778px] w-[113px] cursor-pointer hover:bg-[#c9c9c9] transition-colors" />
      <p className="absolute font-['Inter:Italic',sans-serif] font-normal h-[23px] italic leading-[normal] left-[274px] text-[11px] text-[rgba(0,0,0,0.5)] top-[781px] tracking-[-0.11px] w-[259px] pointer-events-none">Attach Image</p>
      <IconoirAttachment />
      
      <ConfirmButton onClick={handleConfirm} />
      
      {/* Decorative Paw Prints */}
      <PawPrint className="absolute top-[320px] left-[12px] opacity-8 pointer-events-none rotate-[12deg]" size={25} color={getTextColor() === '#303030' ? '#303030' : 'rgba(255,255,255,0.3)'} />
      <PawPrint className="absolute top-[460px] right-[18px] opacity-8 pointer-events-none rotate-[-18deg]" size={22} color="#303030" />
      <PawPrint className="absolute top-[740px] left-[15px] opacity-8 pointer-events-none rotate-[25deg]" size={24} color="#303030" />
      
      {/* Description Modal */}
      <DescriptionModal
        isOpen={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}
        onSave={(newTitle, newDescription) => {
          setTitle(newTitle);
          setDescription(newDescription);
        }}
        initialTitle={title}
        initialDescription={description}
      />
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import svgPaths from "../imports/svg-add-income";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import DescriptionModal from "./DescriptionModal";
import PawPrint from "./PawPrint";
import type { Income } from "../App";

interface EditIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  income: Income | null;
  balances: {
    bank: number;
    cash: number;
    savings: number;
  };
  onEditIncome: (id: string, income: { amount: number; cardType: 'bank' | 'cash' | 'savings'; title: string; description: string; date: string; time: string }) => void;
}

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

function ConfirmButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="absolute contents left-[35px] top-[788px] cursor-pointer" 
      data-name="Confirm Button"
      onClick={onClick}
    >
      <div className="absolute bg-[#e5d0ac] h-[53.541px] left-[35px] rounded-[15px] top-[788px] w-[357.999px] hover:bg-[#d9c49d] transition-colors">
        <div aria-hidden="true" className="absolute border border-[#303030] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] leading-[normal] left-[214px] text-[#303030] text-[20px] text-center top-[800px] tracking-[-0.2px] translate-x-[-50%] w-[186px] pointer-events-none">Save Changes</p>
    </button>
  );
}

export default function EditIncomeModal({ isOpen, onClose, income, balances, onEditIncome }: EditIncomeModalProps) {
  const [amount, setAmount] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const cards: Array<'bank' | 'cash' | 'savings'> = ['bank', 'cash', 'savings'];

  // Pre-fill with existing income data
  useEffect(() => {
    if (income && isOpen) {
      setAmount(income.amount.toString());
      setTitle(income.title);
      setDescription(income.description);
      setCurrentCardIndex(
        income.cardType === 'bank' ? 0 : income.cardType === 'cash' ? 1 : 2
      );
    }
  }, [income, isOpen]);

  if (!isOpen || !income) return null;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return { date: dateStr, time: timeStr };
  };

  const { date, time } = getCurrentDateTime();

  const getCardName = (type: 'bank' | 'cash' | 'savings') => {
    if (type === 'bank') return 'Bank Money';
    if (type === 'cash') return 'Cash Money';
    return 'Savings Money';
  };

  const getCardColor = (type: 'bank' | 'cash' | 'savings') => {
    if (type === 'bank') return '#ffcb3d';
    if (type === 'cash') return '#701c1c';
    return '#303030';
  };

  const getTextColor = (type: 'bank' | 'cash' | 'savings') => {
    if (type === 'bank') return '#303030';
    return 'white';
  };

  const getCurrentBalance = () => {
    const cardType = cards[currentCardIndex];
    return balances ? balances[cardType] : 0;
  };

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid income amount');
      return;
    }

    const incomeData = {
      amount: parseFloat(amount),
      cardType: cards[currentCardIndex],
      title,
      description,
      date,
      time
    };

    onEditIncome(income.id, incomeData);
    onClose();
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(translateX) > 50) {
      if (translateX > 0 && currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      } else if (translateX < 0 && currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }
    setTranslateX(0);
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(translateX) > 50) {
      if (translateX > 0 && currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      } else if (translateX < 0 && currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }
    setTranslateX(0);
  };

  const currentCardType = cards[currentCardIndex];
  const newBalance = getCurrentBalance() + (parseFloat(amount) || 0);

  return (
    <>
      <div className="absolute inset-0 bg-white z-[105]" data-name="Edit Income">
        <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        
        <ReturnButton onClick={onClose} />
        
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[#303030] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[167px]">Edit Income</p>
        
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
        
        {/* Swipeable Card Container */}
        <div className="absolute left-[19px] top-[108px] w-[387px] h-[195px] overflow-visible">
          <div
            ref={cardRef}
            className="relative h-full transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div 
              className="absolute border border-black border-solid h-[195px] left-0 rounded-[30px] shadow-[4px_4px_0px_0px_black] top-0 w-[387px]" 
              style={{ backgroundColor: getCardColor(currentCardType) }}
            />
            <p 
              className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[27px] leading-[normal] left-[28px] text-[12px] top-[27px] tracking-[-0.12px] w-[175px]"
              style={{ color: getTextColor(currentCardType) }}
            >
              {getCardName(currentCardType)}
            </p>
            <p 
              className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[71px] leading-[normal] left-[28px] text-[36px] top-[47px] tracking-[-0.36px] w-[400px]"
              style={{ color: getTextColor(currentCardType) }}
            >
              ₱ {newBalance.toFixed(2)}
            </p>
            <p 
              className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[27px] text-[12px] top-[154px] tracking-[-0.12px] w-[99px]"
              style={{ color: getTextColor(currentCardType), opacity: 0.75 }}
            >
              New Balance
            </p>
          </div>
        </div>

        {/* Card Indicators */}
        <div className="absolute left-[213.5px] top-[320px] flex gap-2 -translate-x-1/2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-[10px] rounded-full transition-all duration-300 ${
                currentCardIndex === index 
                  ? 'bg-[#303030] w-[24px]' 
                  : 'bg-[rgba(48,48,48,0.3)] w-[10px]'
              }`}
            />
          ))}
        </div>

        {/* Title and Description */}
        <div 
          className="absolute h-[109.199px] left-[35px] top-[476px] w-[357.999px] cursor-pointer hover:opacity-90 transition-opacity" 
          data-name="Title and Description"
          onClick={() => setShowDescriptionModal(true)}
        >
          <div className="absolute border border-black border-solid h-[109.199px] inset-0 rounded-[10.77px] shadow-[6.17px_6.17px_0px_0px_#000000]" />
          <div className="absolute bg-white h-[107.199px] inset-[0.617px] rounded-[10.77px]" />
          <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] left-[13.86px] text-[#303030] text-[19.4px] top-[9.38px] tracking-[-0.19px]">Title and Description</p>
          {title ? (
            <div className="absolute left-[13.86px] top-[42.09px] w-[330px] pr-[10px]">
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[15.43px] text-[#303030] tracking-[-0.15px] mb-[4px] overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </p>
              {description && (
                <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[12px] text-[rgba(0,0,0,0.5)] tracking-[-0.12px] overflow-hidden text-ellipsis line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          ) : (
            <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[13.86px] text-[rgba(0,0,0,0.5)] text-[15.43px] top-[42.09px] tracking-[-0.15px] w-[330px]">
              Click to add title and description
            </p>
          )}
        </div>

        <ConfirmButton onClick={handleConfirm} />

        {/* Paw prints */}
        <PawPrint size={60} rotation={15} opacity={0.15} style={{ position: 'absolute', left: '320px', top: '630px' }} />
        <PawPrint size={45} rotation={-20} opacity={0.12} style={{ position: 'absolute', left: '50px', top: '760px' }} />
      </div>

      <DescriptionModal
        isOpen={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}
        title={title}
        description={description}
        onSave={(newTitle, newDescription) => {
          setTitle(newTitle);
          setDescription(newDescription);
          setShowDescriptionModal(false);
        }}
      />
    </>
  );
}
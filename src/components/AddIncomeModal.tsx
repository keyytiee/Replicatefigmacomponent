import { useState, useEffect, useRef } from "react";
import svgPaths from "../imports/svg-add-income";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import DescriptionModal from "./DescriptionModal";
import PawPrint from "./PawPrint";

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  balances?: {
    bank: number;
    cash: number;
    savings: number;
  };
  cardType?: 'bank' | 'cash' | 'savings';
  onAddIncome: (income: { amount: number; cardType: 'bank' | 'cash' | 'savings'; title: string; description: string; date: string; time: string }) => void;
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
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] leading-[normal] left-[214px] text-[#303030] text-[20px] text-center top-[800px] tracking-[-0.2px] translate-x-[-50%] w-[186px] pointer-events-none">Confirm</p>
    </button>
  );
}

function IconoirAttachment() {
  return (
    <div className="absolute left-[256px] size-[15px] top-[498px]" data-name="iconoir:attachment">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="iconoir:attachment">
          <path d={svgPaths.p79df8d2} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function AddIncomeModal({ isOpen, onClose, balances, cardType, onAddIncome }: AddIncomeModalProps) {
  const [amount, setAmount] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const cards: Array<'bank' | 'cash' | 'savings'> = ['bank', 'cash', 'savings'];

  useEffect(() => {
    if (!isOpen) {
      setAmount('');
      setCurrentCardIndex(0);
      setDescription('');
      setTitle('');
      setShowDescriptionModal(false);
      setTranslateX(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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

    const income = {
      amount: parseFloat(amount),
      cardType: cards[currentCardIndex],
      title,
      description,
      date,
      time
    };

    onAddIncome(income);
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
    <div className="absolute inset-0 bg-white z-[70]" data-name="Add Income">
      <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      
      <ReturnButton onClick={onClose} />
      
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[#303030] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[167px]">Add Income</p>
      
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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentCardIndex ? 'bg-[#303030] w-6' : 'bg-[rgba(48,48,48,0.3)]'
            }`}
          />
        ))}
      </div>
      
      {/* Description Area */}
      <button 
        className="absolute bg-[rgba(217,217,217,0.3)] h-[196px] left-[67px] rounded-[5px] top-[486px] w-[300px] cursor-pointer hover:bg-[rgba(217,217,217,0.4)] transition-colors"
        onClick={() => setShowDescriptionModal(true)}
      />
      <p className="absolute font-['Inter:Italic',sans-serif] font-normal h-[21px] italic leading-[normal] left-[80px] text-[11px] text-[rgba(0,0,0,0.5)] top-[498px] tracking-[-0.11px] w-[259px] pointer-events-none">
        {title || 'Add Description'}
      </p>
      {description && (
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal left-[80px] text-[11px] text-black top-[518px] w-[274px] h-[150px] overflow-hidden pointer-events-none">
          {description.substring(0, 200)}
        </p>
      )}
      
      {/* Attach Image Button */}
      <div className="absolute bg-[#d9d9d9] h-[20px] left-[242px] rounded-[10px] top-[496px] w-[113px] cursor-pointer hover:bg-[#c9c9c9] transition-colors" />
      <p className="absolute font-['Inter:Italic',sans-serif] font-normal h-[23px] italic leading-[normal] left-[272px] text-[11px] text-[rgba(0,0,0,0.5)] top-[499px] tracking-[-0.11px] w-[259px] pointer-events-none">Attach Image</p>
      <IconoirAttachment />
      
      <ConfirmButton onClick={handleConfirm} />
      
      {/* Decorative Paw Prints */}
      <PawPrint className="absolute top-[320px] left-[12px] opacity-8 pointer-events-none rotate-[12deg]" size={25} color={getTextColor(currentCardType) === '#303030' ? '#303030' : 'rgba(255,255,255,0.3)'} />
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
import { useState, useEffect, useRef } from "react";
import svgPaths from "../imports/svg-income-history";
import imgAlablav2 from "figma:asset/9422bc98a614e179daee1421f39c6c0dfc7ddfc7.png";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import BankMoneyCard from "./BankMoneyCard";
import CashMoneyCard from "./CashMoneyCard";
import SavingsMoneyCard from "./SavingsMoneyCard";
import NavigationSidebar from "./NavigationSidebar";
import ViewIncomeModal from "./ViewIncomeModal";
import type { CardBalances, Income } from "../App";

interface IncomeHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardType: 'bank' | 'cash' | 'savings';
  balances: CardBalances;
  incomes: Income[];
  onAddIncomeClick: () => void;
  onDeleteIncome?: (id: string) => void;
  onEditIncome?: (income: Income) => void;
  setIncomeHistoryOpen: (isOpen: boolean) => void;
  onSettingsClick?: () => void;
  onExportClick?: () => void;
  onAnalyticsClick?: () => void;
  onHomeClick?: () => void;
}

interface IncomeEntry {
  id: number;
  amount: number;
  date: string;
  time: string;
}

const mockIncomeData: IncomeEntry[] = [
  { id: 1, amount: 22, date: "November 27, 2025", time: "8:00 p.m." },
  { id: 2, amount: 99, date: "November 27, 2025", time: "8:00 p.m." },
  { id: 3, amount: 500, date: "November 27, 2025", time: "8:00 p.m." },
  { id: 4, amount: 1000, date: "November 27, 2025", time: "8:00 p.m." },
  { id: 5, amount: 3000, date: "November 27, 2025", time: "8:00 p.m." },
  { id: 6, amount: 300, date: "November 27, 2025", time: "8:00 p.m." },
];

function AddIncomeButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute contents left-[35px] top-[816px]" data-name="Add Income Button">
      <button 
        className="absolute bg-[#e5d0ac] h-[53.541px] left-[35px] rounded-[15px] top-[816px] w-[361px] border border-[#303030] border-solid shadow-[0_0_0_0_transparent] hover:shadow-[2px_2px_0px_0px_#000000] active:shadow-[0_0_0_0_transparent] transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <p className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[#303030] text-[20px] text-center tracking-[-0.2px]">Add Income</p>
      </button>
    </div>
  );
}

function Sidebar({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="absolute h-[133px] left-[419px] top-[377px] w-[21px] cursor-pointer hover:opacity-80 transition-opacity z-30" 
      data-name="Sidebar"
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 133">
        <g id="Sidebar">
          <rect fill="#303030" height="26" id="Sidebar_2" rx="6.5" stroke="#303030" width="20" x="0.5" y="54.5" />
          <line id="Line 10" stroke="#303030" strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p27ff7900} fill="#D9D9D9" id="Polygon 1" stroke="#303030" />
        </g>
      </svg>
    </div>
  );
}

function IncomeTransaction({ income, top, delay, onClick }: { income: Income; top: number; delay: number; onClick: () => void }) {
  // Determine font size based on amount length
  const amountString = income.amount.toFixed(2);
  const fontSize = amountString.length > 8 ? '16px' : '20px';

  // Determine card type label
  const getCardTypeLabel = (cardType: 'bank' | 'cash' | 'savings') => {
    switch (cardType) {
      case 'bank':
        return 'Bank Money';
      case 'cash':
        return 'Cash Money';
      case 'savings':
        return 'Savings Money';
      default:
        return 'Add Money';
    }
  };

  return (
    <div className="absolute contents" style={{ left: '36px', top: `${top}px` }}>
      <div 
        className="absolute bg-[#D9D9D9] border border-black border-solid h-[58px] left-[36px] rounded-[12px] shadow-[4px_4px_0px_0px_#000000] w-[363px] cursor-pointer hover:translate-y-[-4px] hover:shadow-[4px_8px_0px_0px_#000000] transition-all duration-200 animate-[slideUp_0.5s_ease-out_forwards]" 
        style={{ 
          top: `${top}px`,
          animationDelay: `${delay}ms`,
          opacity: 0,
          transform: 'translateY(20px)'
        }} 
        onClick={onClick}
      />
      <div 
        className="absolute bg-[rgba(48,48,48,0.3)] h-[36px] left-[49px] rounded-[10px] w-[76px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]" 
        style={{ 
          top: `${top + 11}px`,
          animationDelay: `${delay}ms`,
          opacity: 0,
          transform: 'translateY(20px)'
        }} 
      />
      <div 
        className="absolute left-[76px] size-[21px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]" 
        style={{ 
          top: `${top + 18}px`,
          animationDelay: `${delay}ms`,
          opacity: 0,
          transform: 'translateY(20px)'
        }} 
        data-name="Dollar sign"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
          <g clipPath="url(#clip0_6_292)" id="Dollar sign">
            <path d={svgPaths.p48e69c0} id="Icon" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
          <defs>
            <clipPath id="clip0_6_292">
              <rect fill="white" height="21" width="21" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p 
        className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[138px] text-[18px] text-black tracking-[-0.18px] w-[120px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards] overflow-hidden text-ellipsis whitespace-nowrap" 
        style={{ 
          top: `${top + 11}px`,
          animationDelay: `${delay}ms`,
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        {getCardTypeLabel(income.cardType)}
      </p>
      <p 
        className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[138px] not-italic text-[8px] text-black tracking-[-0.08px] w-[182px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards] overflow-hidden text-ellipsis whitespace-nowrap" 
        style={{ 
          top: `${top + 36}px`,
          animationDelay: `${delay}ms`,
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        {income.date} | {income.time}
      </p>
      <p 
        className="absolute font-['Inter:SemiBold',sans-serif] font-semibold leading-[normal] text-black text-right tracking-[-0.2px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]" 
        style={{ 
          left: '260px',
          width: '128px',
          top: fontSize === '16px' ? `${top + 19}px` : `${top + 15}px`,
          fontSize,
          animationDelay: `${delay}ms`,
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        +₱{income.amount.toFixed(2)}
      </p>
    </div>
  );
}

export default function IncomeHistoryModal({ isOpen, onClose, cardType, balances, incomes, onAddIncomeClick, onDeleteIncome, onEditIncome, setIncomeHistoryOpen, onSettingsClick, onExportClick, onAnalyticsClick, onHomeClick }: IncomeHistoryModalProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(
    cardType === 'bank' ? 0 : cardType === 'cash' ? 1 : 2
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const cardAreaRef = useRef<HTMLDivElement>(null);

  // Handle modal open/close animation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Update card index when cardType prop changes
  useEffect(() => {
    setCurrentCardIndex(cardType === 'bank' ? 0 : cardType === 'cash' ? 1 : 2);
  }, [cardType]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const offset = e.touches[0].clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 80;
    const totalCards = 3;
    if (dragOffset > threshold) {
      setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
    } else if (dragOffset < -threshold) {
      setCurrentCardIndex((prev) => (prev + 1) % totalCards);
    }

    setDragOffset(0);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 bg-white z-[60]"
      data-name="Income History"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Background pattern */}
      <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>

      {/* Card Stack Area with Swipe Detection */}
      <div 
        ref={cardAreaRef}
        className="absolute left-0 top-0 w-[428px] h-[307px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: isDragging ? `translateX(${dragOffset}px)` : undefined,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {currentCardIndex === 0 && <BankMoneyCard balance={balances.bank} />}
          {currentCardIndex === 1 && <CashMoneyCard balance={balances.cash} />}
          {currentCardIndex === 2 && <SavingsMoneyCard balance={balances.savings} />}
        </div>
      </div>

      {/* Home icon */}
      <div className="absolute h-[15px] left-[206px] top-[52px] w-[13px]">
        <div className="absolute inset-[-4.21%_-3.85%_-3.33%_-3.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
            <path d={svgPaths.p21a8f900} id="Vector 10" stroke="#303030" />
          </svg>
        </div>
      </div>

      {/* Incomes header */}
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[88px] text-[#303030] text-[20px] text-center top-[331px] tracking-[-0.2px] translate-x-[-50%] w-[176px]">Incomes</p>
      
      {/* Close arrow - fixed scale */}
      <button
        onClick={onClose}
        className="absolute h-[18px] left-[383px] top-[334px] w-[14px] cursor-pointer hover:opacity-70 transition-opacity z-20"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
          <g id="Group 73">
            <path d="M8.07107 0.292893C7.68054 -0.0976311 7.04738 -0.0976311 6.65685 0.292893L0.292893 6.65685C-0.0976309 7.04738 -0.0976309 7.68054 0.292893 8.07107C0.683418 8.46159 1.31658 8.46159 1.70711 8.07107L7.36396 2.41421L13.0208 8.07107C13.4113 8.46159 14.0445 8.46159 14.435 8.07107C14.8256 7.68054 14.8256 7.04738 14.435 6.65685L8.07107 0.292893ZM7.36396 17H8.36396V1H7.36396H6.36396L6.36396 17H7.36396Z" fill="black" id="Arrow 25" />
            <path d="M6.6569 17.7071C7.0474 18.0976 7.6805 18.0976 8.0711 17.7071L14.435 11.3431C14.8256 10.9526 14.8256 10.3195 14.435 9.92893C14.0445 9.53841 13.4113 9.53841 13.0208 9.92893L7.364 15.5858L1.7071 9.92893C1.3166 9.53841 0.6834 9.53841 0.2929 9.92893C-0.0976 10.3195 -0.0976 10.9526 0.2929 11.3431L6.6569 17.7071ZM7.364 1L6.364 1L6.364 17L7.364 17L8.364 17L8.364 1L7.364 1Z" fill="black" id="Arrow 26" />
          </g>
        </svg>
      </button>

      {/* Scrollable Income transactions list */}
      <div className="absolute left-0 top-[375px] w-[428px] h-[430px] overflow-hidden">
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide pb-[70px]">
          {incomes.map((income, index) => (
            <IncomeTransaction 
              key={income.id} 
              income={income} 
              top={index * 70} 
              delay={index * 100} 
              onClick={() => {
                setSelectedIncome(income);
                setViewModalOpen(true);
              }}
            />
          ))}
        </div>
        {/* Fade effect at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Add Income button */}
      <AddIncomeButton onClick={onAddIncomeClick} />
      
      {/* Sidebar - only show when ViewIncomeModal is closed */}
      {!isViewModalOpen && (
        <>
          <Sidebar onClick={() => setSidebarOpen(true)} />
          <NavigationSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            onSettingsClick={onSettingsClick}
            onExportClick={onExportClick}
            onAnalyticsClick={onAnalyticsClick}
            onHomeClick={onHomeClick}
          />
        </>
      )}
      
      {/* View Income Modal */}
      <ViewIncomeModal
        income={selectedIncome}
        isOpen={isViewModalOpen}
        onClose={() => setViewModalOpen(false)}
        onDelete={onDeleteIncome}
        onEdit={(income) => {
          setViewModalOpen(false);
          if (onEditIncome) {
            setIncomeHistoryOpen(false);
            // Signal to parent to open Edit modal
            onEditIncome(income);
          }
        }}
      />
    </div>
  );
}
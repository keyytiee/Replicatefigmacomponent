import { useState, useEffect, useRef } from "react";
import svgPaths from "../imports/svg-income-history";
import imgAlablav2 from "figma:asset/9422bc98a614e179daee1421f39c6c0dfc7ddfc7.png";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import catLogoCard from 'figma:asset/9422bc98a614e179daee1421f39c6c0dfc7ddfc7.png';
import BankMoneyCard from "./BankMoneyCard";
import CashMoneyCard from "./CashMoneyCard";
import SavingsMoneyCard from "./SavingsMoneyCard";
import NavigationSidebar from "./NavigationSidebar";
import ViewIncomeModal from "./ViewIncomeModal";
import PawPrint from "./PawPrint";
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
  onSearchClick?: () => void;
  isDarkMode?: boolean;
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

function Sidebar({ onClick, isDarkMode }: { onClick: () => void; isDarkMode?: boolean }) {
  const fillColor = isDarkMode ? '#FFFFFF' : '#303030';
  const strokeColor = isDarkMode ? '#FFFFFF' : '#303030';
  const rectFill = isDarkMode ? '#FFFFFF' : '#303030';
  
  return (
    <div 
      className="absolute h-[133px] left-[419px] top-[377px] w-[21px] cursor-pointer hover:opacity-80 transition-opacity z-30" 
      data-name="Sidebar"
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 133">
        <g id="Sidebar">
          <rect fill={rectFill} height="26" id="Sidebar_2" rx="6.5" stroke={strokeColor} width="20" x="0.5" y="54.5" />
          <line id="Line 10" stroke={strokeColor} strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p27ff7900} fill={isDarkMode ? '#FFFFFF' : '#D9D9D9'} id="Polygon 1" stroke={strokeColor} />
        </g>
      </svg>
    </div>
  );
}

function IncomeTransaction({ income, delay, onClick }: { income: Income; delay: number; onClick: () => void }) {
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

  const animationDelay = `${delay}ms`;

  return (
    <div className="relative w-full h-[73px]">
      {/* Wrapper that contains all elements and moves together on hover */}
      <div 
        className="absolute left-0 top-0 w-full h-full cursor-pointer transition-all duration-200 hover:translate-y-[-4px] group"
        onClick={onClick}
      >
        {/* Main card background with shadow */}
        <div 
          className="absolute bg-[#D9D9D9] border border-black border-solid h-[58px] left-[36px] top-0 rounded-[12px] shadow-[4px_4px_0px_0px_#000000] group-hover:shadow-[4px_8px_0px_0px_#000000] w-[363px] animate-[slideUp_0.5s_ease-out_forwards]" 
          style={{ 
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          }} 
        />
        
        {/* Icon background - moves with the group */}
        <div 
          className="absolute bg-[rgba(48,48,48,0.3)] h-[36px] left-[49px] top-[11px] rounded-[10px] w-[76px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]" 
          style={{ 
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          }} 
        />
        
        {/* Dollar sign icon - moves with the group */}
        <div 
          className="absolute left-[76px] top-[18px] size-[21px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]" 
          style={{ 
            animationDelay,
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
        
        {/* Card type label - moves with the group */}
        <p 
          className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[138px] top-[11px] text-[18px] text-black tracking-[-0.18px] w-[120px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards] overflow-hidden text-ellipsis whitespace-nowrap" 
          style={{ 
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          }}
        >
          {getCardTypeLabel(income.cardType)}
        </p>
        
        {/* Amount - moves with the group */}
        <p 
          className="absolute font-['Inter:SemiBold',sans-serif] font-semibold leading-[normal] text-black text-right tracking-[-0.2px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]" 
          style={{ 
            left: '260px',
            width: '128px',
            top: fontSize === '16px' ? '19px' : '15px',
            fontSize,
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          }}
        >
          +₱{income.amount.toFixed(2)}
        </p>
        
        {/* Date/Time - moves with the group */}
        <p 
          className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[138px] top-[36px] not-italic text-[8px] text-black tracking-[-0.08px] w-[182px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards] overflow-hidden text-ellipsis whitespace-nowrap" 
          style={{ 
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          }}
        >
          {income.date} | {income.time}
        </p>
      </div>
    </div>
  );
}

export default function IncomeHistoryModal({ isOpen, onClose, cardType, balances, incomes, onAddIncomeClick, onDeleteIncome, onEditIncome, setIncomeHistoryOpen, onSettingsClick, onExportClick, onAnalyticsClick, onHomeClick, onSearchClick, isDarkMode }: IncomeHistoryModalProps) {
  const [cardOrder, setCardOrder] = useState([0, 1, 2]); // Track which card is at which position
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [cardRotation, setCardRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipingCardIndex, setSwipingCardIndex] = useState<number | null>(null);
  const [isReturningToBack, setIsReturningToBack] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const cardAreaRef = useRef<HTMLDivElement>(null);

  // Update card order when cardType prop changes
  useEffect(() => {
    const newCardIndex = cardType === 'bank' ? 0 : cardType === 'cash' ? 1 : 2;
    // Reorder array so the specified card is at position 0 (front)
    const reordered = [newCardIndex];
    for (let i = 0; i < 3; i++) {
      if (i !== newCardIndex) reordered.push(i);
    }
    setCardOrder(reordered);
  }, [cardType]);

  // Card swipe handlers - Tinder-style
  const handleCardMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleCardTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isAnimating) return;
    const deltaX = e.clientX - startX;
    setDragOffset(deltaX);
    setCardRotation(deltaX / 15);
  };

  const handleCardTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isAnimating) return;
    const deltaX = e.touches[0].clientX - startX;
    setDragOffset(deltaX);
    setCardRotation(deltaX / 15);
  };

  const handleCardDragEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);

    const sensitivity = 80;

    if (Math.abs(dragOffset) > sensitivity) {
      // Phase 1: Swipe detected - animate front card away
      setIsAnimating(true);
      setSwipingCardIndex(cardOrder[0]); // Mark which card is swiping away
      
      setTimeout(() => {
        // Phase 2: Return animation - card comes back to position 2 (back of deck)
        setIsReturningToBack(true);
        
        setTimeout(() => {
          // Phase 3: Complete - reorder cards array silently
          setCardOrder(prev => [...prev.slice(1), prev[0]]);
          
          // Small delay to allow DOM to stabilize, then clear animation states
          setTimeout(() => {
            setDragOffset(0);
            setCardRotation(0);
            setIsAnimating(false);
            setSwipingCardIndex(null);
            setIsReturningToBack(false);
          }, 50); // 50ms buffer for smooth state transition
        }, 550); // Slightly shorter to overlap with cleanup
      }, 500); // Wait for swipe away animation
    } else {
      // Not enough swipe - snap back
      setDragOffset(0);
      setCardRotation(0);
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        handleCardDragEnd();
      }
    };

    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute inset-0 z-[60] transition-colors duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
      data-name="Income History"
      onMouseDown={handleCardMouseDown}
      onMouseMove={handleCardMouseMove}
      onTouchStart={handleCardTouchStart}
      onTouchMove={handleCardTouchMove}
      onTouchEnd={handleCardDragEnd}
    >
      {/* Background pattern */}
      <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>

      {/* Card Stack Area - Tinder-style Deck */}
      <div 
        ref={cardAreaRef}
        className="absolute left-0 top-0 w-[428px] h-[344px] overflow-visible"
      >
        {/* Visible stacked card deck container */}
        <div className="relative w-full h-full">
          {/* Render all 3 cards visibly stacked */}
          {[0, 1, 2].map((position) => {
            const actualCardIndex = cardOrder[position];
            const isFrontCard = position === 0;
            const isThisCardSwiping = actualCardIndex === swipingCardIndex;
            
            // Position cards: visible stack with back cards peeking from TOP
            let yOffset = -position * 12; // Back cards ABOVE front card (negative Y)
            let xOffset = 0; // Centered horizontally
            let scale = 1 - position * 0.03; // Slight scale difference (1.0, 0.97, 0.94)
            let zIndex = 10 - position; // Front card has highest z-index
            let opacity = 1; // All cards visible
            
            // Apply drag transform only to front card
            let transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
            let shouldAnimate = true;
            
            if (isFrontCard && isDragging) {
              // Front card being dragged - ONLY this card moves
              transform = `translate(calc(${xOffset}px + ${dragOffset}px), ${yOffset}px) scale(${scale}) rotate(${cardRotation}deg)`;
              shouldAnimate = false; // No transition while dragging
            } else if (isThisCardSwiping && !isReturningToBack) {
              // Phase 1: Card being swiped away - flies off in swipe direction
              const swipeDirection = dragOffset > 0 ? 1 : -1;
              transform = `translate(calc(${xOffset}px + ${swipeDirection * 600}px), calc(${yOffset}px + 50px)) scale(${scale - 0.2}) rotate(${swipeDirection * 35}deg)`;
              opacity = 0.3;
              zIndex = 15; // Keep on top during swipe
              shouldAnimate = true; // Smooth animation when flying away
            } else if (isThisCardSwiping && isReturningToBack) {
              // Phase 2: Card returning to back of deck (position 2)
              yOffset = -2 * 12; // Position 2's Y offset
              xOffset = 0;
              scale = 1 - 2 * 0.03; // Position 2's scale
              transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale}) rotate(0deg)`;
              opacity = 1;
              zIndex = 5; // Behind all other cards
              shouldAnimate = true; // Smooth return animation
            } else if (!isFrontCard && isAnimating) {
              // Other cards smoothly transition to their new forward positions
              // This runs during BOTH phase 1 and phase 2 to prevent snap-back
              const newPosition = position - 1;
              yOffset = -newPosition * 12;
              xOffset = 0;
              scale = 1 - newPosition * 0.03;
              transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
              shouldAnimate = true;
            }
            
            return (
              <div
                key={`card-${actualCardIndex}-${position}`}
                className="absolute left-0 top-0 w-full h-full"
                style={{
                  zIndex,
                  transform,
                  opacity,
                  transition: shouldAnimate 
                    ? 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                    : 'none',
                  cursor: isFrontCard ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  pointerEvents: isFrontCard ? 'auto' : 'none',
                }}
                onMouseDown={isFrontCard ? handleCardMouseDown : undefined}
                onMouseMove={isFrontCard ? handleCardMouseMove : undefined}
                onMouseUp={isFrontCard ? handleCardDragEnd : undefined}
                onTouchStart={isFrontCard ? handleCardTouchStart : undefined}
                onTouchMove={isFrontCard ? handleCardTouchMove : undefined}
                onTouchEnd={isFrontCard ? handleCardDragEnd : undefined}
              >
                {/* Inline Card Design - Bank */}
                {actualCardIndex === 0 && (
                  <div className="absolute left-[21px] top-[120px] w-[387px] h-[268px]">
                    <div className="absolute border border-black border-solid h-[195px] left-0 rounded-[30px] shadow-[4px_4px_0px_0px_#000000] top-0 w-[387px] bg-[#ffcb3d]" />
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[27px] leading-[normal] left-[28px] text-[#303030] text-[12px] top-[17px] tracking-[-0.12px] w-[175px]">
                      Bank Money
                    </p>
                    <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[71px] leading-[normal] left-[28px] text-[#303030] text-[36px] top-[41px] tracking-[-0.36px] w-[400px]">
                      ₱ {balances.bank.toFixed(2)}
                    </p>
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[27px] text-[#303030] text-[12px] top-[144px] tracking-[-0.12px] w-[99px] opacity-75">
                      Current Balance
                    </p>
                    {/* Cat Logo - positioned inside card, bottom aligned */}
                    <img 
                      src={catLogoCard} 
                      alt="Cat Logo" 
                      className="absolute right-[15px] bottom-[35px] w-[128px] h-auto pointer-events-none z-10"
                    />
                  </div>
                )}

                {/* Inline Card Design - Cash */}
                {actualCardIndex === 1 && (
                  <div className="absolute left-[21px] top-[120px] w-[387px] h-[268px]">
                    <div className="absolute border border-black border-solid h-[195px] left-0 rounded-[30px] shadow-[4px_4px_0px_0px_#000000] top-0 w-[387px] bg-[#701c1c]" />
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[27px] leading-[normal] left-[28px] text-white text-[12px] top-[17px] tracking-[-0.12px] w-[175px]">
                      Cash Money
                    </p>
                    <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[71px] leading-[normal] left-[28px] text-white text-[36px] top-[41px] tracking-[-0.36px] w-[400px]">
                      ₱ {balances.cash.toFixed(2)}
                    </p>
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[27px] text-white text-[12px] top-[144px] tracking-[-0.12px] w-[99px] opacity-75">
                      Current Balance
                    </p>
                    {/* Cat Logo - positioned inside card, bottom aligned */}
                    <img 
                      src={catLogoCard} 
                      alt="Cat Logo" 
                      className="absolute right-[15px] bottom-[35px] w-[128px] h-auto pointer-events-none z-10"
                    />
                  </div>
                )}

                {/* Inline Card Design - Savings */}
                {actualCardIndex === 2 && (
                  <div className="absolute left-[21px] top-[120px] w-[387px] h-[268px]">
                    <div className="absolute border border-black border-solid h-[195px] left-0 rounded-[30px] shadow-[4px_4px_0px_0px_#000000] top-0 w-[387px] bg-[#303030]" />
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[27px] leading-[normal] left-[28px] text-white text-[12px] top-[17px] tracking-[-0.12px] w-[175px]">
                      Savings Money
                    </p>
                    <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[71px] leading-[normal] left-[28px] text-white text-[36px] top-[41px] tracking-[-0.36px] w-[400px]">
                      ₱ {balances.savings.toFixed(2)}
                    </p>
                    <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[27px] text-white text-[12px] top-[144px] tracking-[-0.12px] w-[99px] opacity-75">
                      Current Balance
                    </p>
                    {/* Cat Logo - positioned inside card, bottom aligned */}
                    <img 
                      src={catLogoCard} 
                      alt="Cat Logo" 
                      className="absolute right-[15px] bottom-[35px] w-[128px] h-auto pointer-events-none z-10"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Home icon */}
      <div className="absolute h-[15px] left-[206px] top-[52px] w-[13px]">
        <div className="absolute inset-[-4.21%_-3.85%_-3.33%_-3.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
            <path d={svgPaths.p21a8f900} id="Vector 10" stroke={isDarkMode ? '#FFFFFF' : '#303030'} />
          </svg>
        </div>
      </div>

      {/* Incomes header */}
      <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[88px] text-[20px] text-center top-[331px] tracking-[-0.2px] translate-x-[-50%] w-[176px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Incomes</p>
      
      {/* Close arrow - fixed scale */}
      <button
        onClick={onClose}
        className="absolute h-[18px] left-[383px] top-[334px] w-[14px] cursor-pointer hover:opacity-70 transition-opacity z-20"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
          <g id="Group 73">
            <path d="M8.07107 0.292893C7.68054 -0.0976311 7.04738 -0.0976311 6.65685 0.292893L0.292893 6.65685C-0.0976309 7.04738 -0.0976309 7.68054 0.292893 8.07107C0.683418 8.46159 1.31658 8.46159 1.70711 8.07107L7.36396 2.41421L13.0208 8.07107C13.4113 8.46159 14.0445 8.46159 14.435 8.07107C14.8256 7.68054 14.8256 7.04738 14.435 6.65685L8.07107 0.292893ZM7.36396 17H8.36396V1H7.36396H6.36396L6.36396 17H7.36396Z" fill={isDarkMode ? '#FFFFFF' : 'black'} id="Arrow 25" />
            <path d="M6.6569 17.7071C7.0474 18.0976 7.6805 18.0976 8.0711 17.7071L14.435 11.3431C14.8256 10.9526 14.8256 10.3195 14.435 9.92893C14.0445 9.53841 13.4113 9.53841 13.0208 9.92893L7.364 15.5858L1.7071 9.92893C1.3166 9.53841 0.6834 9.53841 0.2929 9.92893C-0.0976 10.3195 -0.0976 10.9526 0.2929 11.3431L6.6569 17.7071ZM7.364 1L6.364 1L6.364 17L7.364 17L8.364 17L8.364 1L7.364 1Z" fill={isDarkMode ? '#FFFFFF' : 'black'} id="Arrow 26" />
          </g>
        </svg>
      </button>

      {/* Scrollable Income transactions list */}
      <div className="absolute left-0 top-[375px] w-[428px] h-[430px] overflow-hidden">
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide pb-[70px] pt-[8px]">
          {incomes.map((income, index) => (
            <IncomeTransaction 
              key={income.id} 
              income={income} 
              delay={index * 100} 
              onClick={() => {
                setSelectedIncome(income);
                setViewModalOpen(true);
              }}
            />
          ))}
        </div>
        {/* Fade effect at bottom */}
        <div className={`absolute bottom-0 left-0 w-full h-[100px] pointer-events-none bg-gradient-to-t ${isDarkMode ? 'from-[#1E1E1E] via-[#1E1E1E]/80' : 'from-white via-white/80'} to-transparent`} />
      </div>

      {/* Add Income button */}
      <AddIncomeButton onClick={onAddIncomeClick} />
      
      {/* Decorative Paw Prints */}
      <div className="absolute top-[360px] left-[10px] pointer-events-none z-[1]">
        <PawPrint size={35} opacity={0.08} rotation={0} color={isDarkMode ? '#FFFFFF' : '#303030'} />
      </div>
      <div className="absolute top-[450px] right-[15px] pointer-events-none z-[1]">
        <PawPrint size={30} opacity={0.08} rotation={-15} color={isDarkMode ? '#FFFFFF' : '#303030'} />
      </div>
      <div className="absolute top-[650px] left-[8px] pointer-events-none z-[1]">
        <PawPrint size={28} opacity={0.08} rotation={20} color={isDarkMode ? '#FFFFFF' : '#303030'} />
      </div>
      <div className="absolute top-[785px] right-[12px] pointer-events-none z-[1]">
        <PawPrint size={32} opacity={0.08} rotation={-25} color={isDarkMode ? '#FFFFFF' : '#303030'} />
      </div>
      
      {/* Sidebar - only show when ViewIncomeModal is closed */}
      {!isViewModalOpen && (
        <>
          <Sidebar onClick={() => setSidebarOpen(true)} isDarkMode={isDarkMode} />
          <NavigationSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            onSettingsClick={onSettingsClick}
            onExportClick={onExportClick}
            onAnalyticsClick={onAnalyticsClick}
            onHomeClick={onHomeClick}
            onSearchClick={onSearchClick}
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
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-dashboard";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import catImage from 'figma:asset/381c6e21276e90d23982de9a213d2e800eee37e1.png';
import catLogoCard from 'figma:asset/9422bc98a614e179daee1421f39c6c0dfc7ddfc7.png';
import NavigationSidebar from "./NavigationSidebar";
import ViewTransactionModal from "./ViewTransactionModal";
import AddTransactionModal from "./AddTransactionModal";
import AddIncomeModal from "./AddIncomeModal";
import EditIncomeModal from "./EditIncomeModal";
import IncomeHistoryModal from "./IncomeHistoryModal";
import ActivityHistory from "./ActivityHistory";
import Settings from "./Settings";
import Export from "./Export";
import Analytics from "./Analytics";
import Search from "./Search";
import UndoToast from "./UndoToast";
import PawPrint from "./PawPrint";
import type { Transaction, Income, CardBalances } from "../App";
import { mergeSort } from "../utils/dsa";

interface DashboardProps {
  balances: CardBalances;
  transactions: Transaction[];
  incomes: Income[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onAddIncome: (income: { amount: number; cardType: 'bank' | 'cash' | 'savings'; title: string; description: string; date: string; time: string }) => void;
  onDeleteTransaction: (transactionId: string) => void;
  onEditTransaction?: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  onDeleteIncome?: (incomeId: string) => void;
  onEditIncome?: (id: string, income: Omit<Income, 'id'>) => void;
  showUndoToast: boolean;
  undoMessage: string;
  onUndo: () => void;
  onRedo: () => void;
  canRedo: boolean;
  onCloseUndoToast: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
}

function AddTransactionButton() {
  return (
    <div className="absolute contents left-[35px] top-[816px]" data-name="Add Transaction Button">
      <div className="absolute bg-[#e5d0ac] h-[53.541px] left-[35px] rounded-[15px] top-[816px] w-[361px] cursor-pointer hover:bg-[#d9c49d] transition-colors">
        <div aria-hidden="true" className="absolute border border-[#303030] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] leading-[normal] left-[215.5px] text-[#303030] text-[20px] text-center top-[828px] tracking-[-0.2px] translate-x-[-50%] w-[187.559px] pointer-events-none">Add Transaction</p>
    </div>
  );
}

// Category colors mapping
const categoryColors: { [key: string]: string } = {
  'Transportation': 'rgba(110,134,169,0.5)',
  'Food & Grocery': 'rgba(139,170,78,0.5)',
  'Healthcare': 'rgba(180,92,76,0.5)',
  'Education': 'rgba(117,104,156,0.5)',
  'Utilities': 'rgba(74,80,111,0.5)',
  'Leisure': 'rgba(232,200,94,0.5)',
  'Bills': 'rgba(200,150,100,0.5)',
  'Miscellaneous': 'rgba(150,150,150,0.5)'
};

// Dark mode category colors - brighter and more vibrant
const categoryColorsDark: { [key: string]: string } = {
  'Transportation': 'rgba(150,174,209,0.85)',
  'Food & Grocery': 'rgba(169,200,108,0.85)',
  'Healthcare': 'rgba(220,122,106,0.85)',
  'Education': 'rgba(147,134,186,0.85)',
  'Utilities': 'rgba(104,110,141,0.85)',
  'Leisure': 'rgba(255,230,124,0.85)',
  'Bills': 'rgba(230,180,130,0.85)',
  'Miscellaneous': 'rgba(180,180,180,0.85)'
};

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
  onClick: () => void;
  isDarkMode?: boolean;
  shouldAnimate?: boolean;
}

function TransactionItem({ transaction, index, onClick, isDarkMode, shouldAnimate = true }: TransactionItemProps) {
  const backgroundColor = isDarkMode ? categoryColorsDark[transaction.category] || 'rgba(150,150,150,0.5)' : categoryColors[transaction.category] || 'rgba(150,150,150,0.5)';
  const animationDelay = `${index * 100}ms`;
  
  // Determine font size based on amount length
  const amountString = transaction.amount.toFixed(2);
  const fontSize = amountString.length > 8 ? '16px' : '20px';

  // Render icon based on category - all centered in the 76px container
  const renderIcon = () => {
    const iconProps = {
      className: `absolute pointer-events-none ${shouldAnimate ? 'animate-[slideUp_0.5s_ease-out_forwards]' : ''}`,
      style: shouldAnimate ? { 
        animationDelay,
        opacity: 0,
        transform: 'translateY(20px)'
      } : {
        opacity: 1,
        transform: 'translateY(0)'
      }
    };

    switch(transaction.category) {
      case 'Food & Grocery':
        return (
          <div {...iconProps} className={`${iconProps.className} size-[22px] left-[76px] top-[18px]`} style={iconProps.style}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
              <path d={svgPaths.p3025aa80} fill="var(--fill-0, #303030)" />
            </svg>
          </div>
        );
      case 'Transportation':
        return (
          <div {...iconProps} className={`${iconProps.className} size-[20px] left-[77px] top-[19px]`} style={iconProps.style}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
              <path d={svgPaths.p133d6180} fill="var(--fill-0, #303030)" />
            </svg>
          </div>
        );
      case 'Healthcare':
        return (
          <div {...iconProps} className={`${iconProps.className} size-[20px] left-[77px] top-[19px]`} style={iconProps.style}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 17">
              <path clipRule="evenodd" d={svgPaths.p2df08180} fill="var(--fill-0, #303030)" fillRule="evenodd" />
            </svg>
          </div>
        );
      case 'Education':
        return (
          <div {...iconProps} className={`${iconProps.className} size-[24px] left-[75px] top-[17px]`} style={iconProps.style}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path d={svgPaths.p1a7bff00} fill="var(--fill-0, black)" />
                <path d={svgPaths.p252e3900} fill="var(--fill-0, black)" />
              </g>
            </svg>
          </div>
        );
      case 'Utilities':
        return (
          <div {...iconProps} className={`${iconProps.className} size-[21px] left-[76.5px] top-[18.5px]`} style={iconProps.style}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
              <g clipPath={`url(#clip0_utilities_${index})`}>
                <path clipRule="evenodd" d={svgPaths.p31c4a7f0} fill="var(--fill-0, black)" fillRule="evenodd" />
              </g>
              <defs>
                <clipPath id={`clip0_utilities_${index}`}>
                  <rect fill="white" height="21" width="21" />
                </clipPath>
              </defs>
            </svg>
          </div>
        );
      case 'Leisure':
        return (
          <div {...iconProps} className={`${iconProps.className} size-[20px] left-[77px] top-[19px]`} style={iconProps.style}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d="M7 16C7 17.1046 6.10457 18 5 18C3.89543 18 3 17.1046 3 16C3 14.8954 3.89543 14 5 14C6.10457 14 7 14.8954 7 16ZM17 16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16C13 14.8954 13.8954 14 15 14C16.1046 14 17 14.8954 17 16ZM6.5 13L4.85 5H2V3H6L7.85 11.5H16.5L18.5 6H8.5L9.15 4H20L17.35 12C17.1478 12.5911 16.5891 13 15.95 13H6.5Z" fill="var(--fill-0, black)" />
            </svg>
          </div>
        );
      case 'Bills':
        return (
          <div {...iconProps} className={`${iconProps.className} size-[20px] left-[77px] top-[19px]`} style={iconProps.style}>
            <svg className="block size-full" fill="none" viewBox="0 0 20 20">
              <path d="M3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V7H13C12.4477 7 12 6.55228 12 6V1H3ZM14 1.5V6H18.5L14 1.5ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z" fill="var(--fill-0, #303030)" />
            </svg>
          </div>
        );
      case 'Miscellaneous':
        return (
          <div {...iconProps} className={`${iconProps.className} size-[20px] left-[77px] top-[19px]`} style={iconProps.style}>
            <svg className="block size-full" fill="none" viewBox="0 0 20 20">
              <path d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9H9V4C9 3.44772 9.44772 3 10 3Z" fill="var(--fill-0, #303030)" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-[73px]" data-name={transaction.category}>
      {/* Wrapper that contains all elements and moves together on hover */}
      <div 
        className="absolute left-0 top-0 w-full h-full cursor-pointer transition-all duration-200 hover:translate-y-[-4px] group"
        onClick={onClick}
      >
        {/* Main card border with shadow */}
        <div 
          className={`absolute border border-black border-solid h-[58px] left-[36px] top-0 rounded-[12px] shadow-[4px_4px_0px_0px_#000000] group-hover:shadow-[4px_8px_0px_0px_#000000] w-[363px] ${shouldAnimate ? 'animate-[slideUp_0.5s_ease-out_forwards]' : ''}`}
          style={shouldAnimate ? { 
            backgroundColor,
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          } : {
            backgroundColor,
            opacity: 1,
            transform: 'translateY(0)'
          }}
        />
        
        {/* Icon background - moves with the group */}
        <div 
          className={`absolute bg-[rgba(48,48,48,0.3)] h-[36px] left-[49px] top-[11px] rounded-[10px] w-[76px] pointer-events-none ${shouldAnimate ? 'animate-[slideUp_0.5s_ease-out_forwards]' : ''}`}
          style={shouldAnimate ? { 
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          } : {
            opacity: 1,
            transform: 'translateY(0)'
          }}
        />
        
        {/* Icon - moves with the group */}
        {renderIcon()}
        
        {/* Category name - moves with the group */}
        <p 
          className={`absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[138px] top-[11px] text-[18px] text-black tracking-[-0.18px] w-[120px] pointer-events-none ${shouldAnimate ? 'animate-[slideUp_0.5s_ease-out_forwards]' : ''} overflow-hidden text-ellipsis whitespace-nowrap`}
          style={shouldAnimate ? { 
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          } : {
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          {transaction.category}
        </p>
        
        {/* Price - moves with the group */}
        <p 
          className={`absolute font-['Inter:SemiBold',sans-serif] font-semibold leading-[normal] text-black tracking-[-0.2px] text-right pointer-events-none ${shouldAnimate ? 'animate-[slideUp_0.5s_ease-out_forwards]' : ''}`}
          style={shouldAnimate ? { 
            left: '260px',
            width: '128px',
            top: fontSize === '16px' ? '19px' : '17px',
            fontSize,
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          } : {
            left: '260px',
            width: '128px',
            top: fontSize === '16px' ? '19px' : '17px',
            fontSize,
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          -₱{transaction.amount.toFixed(2)}
        </p>
        
        {/* Date/Time - moves with the group */}
        <p 
          className={`absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[138px] top-[36px] not-italic text-[8px] text-black tracking-[-0.08px] w-[182px] pointer-events-none ${shouldAnimate ? 'animate-[slideUp_0.5s_ease-out_forwards]' : ''} overflow-hidden text-ellipsis whitespace-nowrap`}
          style={shouldAnimate ? { 
            animationDelay,
            opacity: 0,
            transform: 'translateY(20px)'
          } : {
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          {transaction.date} | {transaction.time}
        </p>
      </div>
    </div>
  );
}

function Sidebar({ onClick, isDarkMode }: { onClick: () => void; isDarkMode?: boolean }) {
  const fillColor = isDarkMode ? '#FFFFFF' : '#303030';
  const strokeColor = isDarkMode ? '#FFFFFF' : '#303030';
  
  return (
    <div 
      className="absolute h-[133px] left-[419px] top-[377px] w-[21px] cursor-pointer hover:opacity-80 transition-opacity z-30" 
      data-name="Sidebar"
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 133">
        <g id="Sidebar">
          <rect fill={fillColor} height="26" id="Sidebar_2" rx="6.5" stroke={strokeColor} width="20" x="0.5" y="54.5" />
          <line id="Line 10" stroke={strokeColor} strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p25a9b40} fill="#D9D9D9" id="Polygon 1" stroke={strokeColor} />
        </g>
      </svg>
    </div>
  );
}

export default function Dashboard({ balances, transactions, incomes, onAddTransaction, onAddIncome, onDeleteTransaction, onEditTransaction, onDeleteIncome, onEditIncome, showUndoToast, undoMessage, onUndo, onRedo, canRedo, onCloseUndoToast, isDarkMode, onToggleDarkMode }: DashboardProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [cardOrder, setCardOrder] = useState([0, 1, 2]); // Track which card is at which position
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [cardRotation, setCardRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipingCardIndex, setSwipingCardIndex] = useState<number | null>(null);
  const [isReturningToBack, setIsReturningToBack] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarSwipeActive, setIsSidebarSwipeActive] = useState(false);
  const [sidebarSwipeStart, setSidebarSwipeStart] = useState(0);
  const [sidebarSwipeOffset, setSidebarSwipeOffset] = useState(0);
  const [isIncomeHistoryOpen, setIncomeHistoryOpen] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);
  const [isAddIncomeOpen, setAddIncomeOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [incomeToEdit, setIncomeToEdit] = useState<Income | null>(null);
  const [isEditIncomeOpen, setEditIncomeOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isExportOpen, setExportOpen] = useState(false);
  const [isAnalyticsOpen, setAnalyticsOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isActivityHistoryOpen, setActivityHistoryOpen] = useState(false);
  const [shouldAnimateTransactions, setShouldAnimateTransactions] = useState(false);
  const cardAreaRef = useRef<HTMLDivElement>(null);
  const prevCardOrderRef = useRef<number[]>([0, 1, 2]);

  // Track when we're returning from income history to trigger animation
  useEffect(() => {
    if (!isIncomeHistoryOpen && isDashboardVisible) {
      setShouldAnimateTransactions(true);
      // Reset after animation completes
      const timer = setTimeout(() => {
        setShouldAnimateTransactions(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isIncomeHistoryOpen, isDashboardVisible]);

  // Trigger animation when card order changes (card swipe)
  useEffect(() => {
    // Check if card order actually changed (front card changed)
    if (prevCardOrderRef.current[0] !== cardOrder[0]) {
      setShouldAnimateTransactions(true);
      // Reset after animation completes
      const timer = setTimeout(() => {
        setShouldAnimateTransactions(false);
      }, 1000);
      
      // Update the ref to current card order
      prevCardOrderRef.current = cardOrder;
      
      return () => clearTimeout(timer);
    }
  }, [cardOrder]);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsEditMode(true);
    setModalOpen(false);
    setAddTransactionOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    onDeleteTransaction(id);
  };

  // Card swipe handlers - Only front card moves
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
          // The animation states ensure smooth visual transition
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
      if (isSidebarSwipeActive) {
        handleSidebarSwipeEnd();
      }
    };

    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, [isDragging, dragOffset, isSidebarSwipeActive, sidebarSwipeOffset]);

  const handleSidebarSwipeStart = (clientX: number, clientY: number) => {
    // Only trigger if:
    // 1. Swipe starts from the right edge (within 30px)
    // 2. NOT in the card area (avoid conflict with card swipe)
    if (clientX >= 398 && clientY > 307) { // 428 - 30 = 398, card area height = 307
      setIsSidebarSwipeActive(true);
      setSidebarSwipeStart(clientX);
    }
  };

  const handleSidebarSwipeMove = (clientX: number) => {
    if (!isSidebarSwipeActive) return;
    const offset = clientX - sidebarSwipeStart;
    // Only allow leftward swipe (negative offset)
    if (offset < 0) {
      setSidebarSwipeOffset(offset);
    }
  };

  const handleSidebarSwipeEnd = () => {
    if (!isSidebarSwipeActive) return;
    setIsSidebarSwipeActive(false);

    const threshold = -50; // Need to swipe at least 50px left
    if (sidebarSwipeOffset < threshold) {
      setSidebarOpen(true);
    }

    setSidebarSwipeOffset(0);
  };

  const handleGlobalMouseDown = (e: React.MouseEvent) => {
    // Get position relative to the app container
    const rect = e.currentTarget.getBoundingClientRect();
    const clientY = e.clientY - rect.top;
    handleSidebarSwipeStart(e.clientX, clientY);
  };

  const handleGlobalTouchStart = (e: React.TouchEvent) => {
    // Get position relative to the app container
    const rect = e.currentTarget.getBoundingClientRect();
    const clientY = e.touches[0].clientY - rect.top;
    handleSidebarSwipeStart(e.touches[0].clientX, clientY);
  };

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    handleSidebarSwipeMove(e.clientX);
  };

  const handleGlobalTouchMove = (e: React.TouchEvent) => {
    handleSidebarSwipeMove(e.touches[0].clientX);
  };

  return (
    <div 
      className={`relative w-[428px] h-[926px] transition-colors duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
      data-name="Dashboard"
      onMouseDown={handleGlobalMouseDown}
      onMouseMove={handleGlobalMouseMove}
      onTouchStart={handleGlobalTouchStart}
      onTouchMove={handleGlobalTouchMove}
    >
      <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      
      {/* Card Stack Area - Deck Carousel Style */}
      <div 
        ref={cardAreaRef}
        className="absolute left-0 top-0 w-[428px] h-[344px] overflow-visible"
      >
        {/* Visible stacked card deck container */}
        <div className="relative w-full h-full">
          {/* Render all 3 cards visibly stacked */}
          {[0, 1, 2].map((position) => {
            // Calculate which card this is (0=front, 1=middle, 2=back)
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

      <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[88px] text-[20px] text-center top-[331px] tracking-[-0.2px] translate-x-[-50%] w-[176px] cursor-pointer hover:opacity-70 transition-opacity ${isDarkMode ? 'text-white' : 'text-[#303030]'}`} onClick={() => setActivityHistoryOpen(true)}>Transactions</p>
      
      {/* Scrollable Transactions Container */}
      <div className="absolute left-0 top-[375px] w-[428px] h-[430px] overflow-visible">
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide pb-[70px] pt-[8px]">
          {(() => {
            // Filter transactions based on which card is currently in front
            const currentCardType = cardOrder[0] === 0 ? 'bank' : cardOrder[0] === 1 ? 'cash' : 'savings';
            const filteredTransactions = transactions.filter(transaction => 
              transaction.cardType === currentCardType
            );

            // Sort transactions chronologically using Merge Sort (newest first)
            // Merge Sort guarantees O(n log n) stable sorting
            const sortedTransactions = mergeSort(filteredTransactions, (a, b) => {
              // Create timestamp from date and time for accurate sorting
              const dateTimeA = new Date(`${a.date} ${a.time}`).getTime();
              const dateTimeB = new Date(`${b.date} ${b.time}`).getTime();
              return dateTimeB - dateTimeA; // Descending order (newest first)
            });

            return sortedTransactions.map((transaction, index) => (
              <TransactionItem 
                key={shouldAnimateTransactions ? `${transaction.id}-animate` : transaction.id} 
                transaction={transaction} 
                index={index} 
                onClick={() => handleTransactionClick(transaction)} 
                isDarkMode={isDarkMode} 
                shouldAnimate={shouldAnimateTransactions}
              />
            ));
          })()}
        </div>
        {/* Fade effect at bottom */}
        <div className={`absolute bottom-0 left-0 w-full h-[100px] pointer-events-none bg-gradient-to-t ${isDarkMode ? 'from-[#1E1E1E] via-[#1E1E1E]/80' : 'from-white via-white/80'} to-transparent`} />
      </div>
      
      <button onClick={() => setAddTransactionOpen(true)} className="contents">
        <AddTransactionButton />
      </button>
      <div className="absolute h-[15px] left-[206px] top-[52px] w-[13px]">
        <div className="absolute inset-[-4.21%_-3.85%_-3.33%_-3.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
            <path d={svgPaths.p21a8f900} id="Vector 10" stroke="var(--stroke-0, #303030)" />
          </svg>
        </div>
      </div>
      <Sidebar onClick={() => setSidebarOpen(true)} isDarkMode={isDarkMode} />
      {/* Hide sidebar when ViewTransactionModal is open */}
      {!isModalOpen && (
        <NavigationSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onSettingsClick={() => {
            setSidebarOpen(false);
            // Close all other screens
            setAnalyticsOpen(false);
            setExportOpen(false);
            setSearchOpen(false);
            setActivityHistoryOpen(false);
            // Open settings
            setSettingsOpen(true);
          }}
          onExportClick={() => {
            setSidebarOpen(false);
            // Close all other screens
            setSettingsOpen(false);
            setAnalyticsOpen(false);
            setSearchOpen(false);
            setActivityHistoryOpen(false);
            // Open export
            setExportOpen(true);
          }}
          onAnalyticsClick={() => {
            setSidebarOpen(false);
            // Close all other screens
            setSettingsOpen(false);
            setExportOpen(false);
            setSearchOpen(false);
            setActivityHistoryOpen(false);
            // Open analytics
            setAnalyticsOpen(true);
          }}
          onSearchClick={() => {
            setSidebarOpen(false);
            // Close all other screens
            setSettingsOpen(false);
            setExportOpen(false);
            setAnalyticsOpen(false);
            setActivityHistoryOpen(false);
            // Open search
            setSearchOpen(true);
          }}
          onHomeClick={() => {
            setSidebarOpen(false);
            // Close all modals to return to dashboard
            setSettingsOpen(false);
            setExportOpen(false);
            setAnalyticsOpen(false);
            setSearchOpen(false);
            setActivityHistoryOpen(false);
          }}
          isDarkMode={isDarkMode}
        />
      )}
      <button 
        className="absolute h-[18px] left-[383px] top-[334px] w-[14px] cursor-pointer hover:opacity-70 transition-opacity z-20"
        onClick={() => setIncomeHistoryOpen(true)}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
          <g id="Group 73">
            <path d="M8.07107 0.292893C7.68054 -0.0976311 7.04738 -0.0976311 6.65685 0.292893L0.292893 6.65685C-0.0976309 7.04738 -0.0976309 7.68054 0.292893 8.07107C0.683418 8.46159 1.31658 8.46159 1.70711 8.07107L7.36396 2.41421L13.0208 8.07107C13.4113 8.46159 14.0445 8.46159 14.435 8.07107C14.8256 7.68054 14.8256 7.04738 14.435 6.65685L8.07107 0.292893ZM7.36396 17H8.36396V1H7.36396H6.36396L6.36396 17H7.36396Z" fill={isDarkMode ? '#FFFFFF' : 'black'} id="Arrow 25" />
            <path d="M6.6569 17.7071C7.0474 18.0976 7.6805 18.0976 8.0711 17.7071L14.435 11.3431C14.8256 10.9526 14.8256 10.3195 14.435 9.92893C14.0445 9.53841 13.4113 9.53841 13.0208 9.92893L7.364 15.5858L1.7071 9.92893C1.3166 9.53841 0.6834 9.53841 0.2929 9.92893C-0.0976 10.3195 -0.0976 10.9526 0.2929 11.3431L6.6569 17.7071ZM7.364 1L6.364 1L6.364 17L7.364 17L8.364 17L8.364 1L7.364 1Z" fill={isDarkMode ? '#FFFFFF' : 'black'} id="Arrow 26" />
          </g>
        </svg>
      </button>
      <ViewTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        transaction={selectedTransaction} 
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
        isDarkMode={isDarkMode}
      />
      <IncomeHistoryModal 
        isOpen={isIncomeHistoryOpen} 
        onClose={() => setIncomeHistoryOpen(false)} 
        cardType={cardOrder[0] === 0 ? 'bank' : cardOrder[0] === 1 ? 'cash' : 'savings'}
        balances={balances}
        incomes={incomes}
        onAddIncomeClick={() => {
          setIncomeHistoryOpen(false);
          setAddIncomeOpen(true);
        }}
        onDeleteIncome={onDeleteIncome}
        onEditIncome={(income) => {
          setIncomeToEdit(income);
          setEditIncomeOpen(true);
        }}
        setIncomeHistoryOpen={setIncomeHistoryOpen}
        onSettingsClick={() => setSettingsOpen(true)}
        onExportClick={() => setExportOpen(true)}
        onAnalyticsClick={() => setAnalyticsOpen(true)}
        onHomeClick={() => setIncomeHistoryOpen(false)}
        onSearchClick={() => {
          setIncomeHistoryOpen(false);
          setSearchOpen(true);
        }}
        isDarkMode={isDarkMode}
      />
      <AddTransactionModal 
        isOpen={isAddTransactionOpen}
        onClose={() => {
          setAddTransactionOpen(false);
          setIsEditMode(false);
          setTransactionToEdit(null);
        }}
        cardType={transactionToEdit?.cardType || (cardOrder[0] === 0 ? 'bank' : cardOrder[0] === 1 ? 'cash' : 'savings')}
        currentBalance={balances[transactionToEdit?.cardType || (cardOrder[0] === 0 ? 'bank' : cardOrder[0] === 1 ? 'cash' : 'savings')]}
        onAddTransaction={onAddTransaction}
        editMode={isEditMode}
        existingTransaction={transactionToEdit}
        onEditTransaction={onEditTransaction}
      />
      <AddIncomeModal
        isOpen={isAddIncomeOpen}
        onClose={() => {
          setAddIncomeOpen(false);
          // Reopen income history modal after closing add income
          setIncomeHistoryOpen(true);
        }}
        balances={balances}
        cardType={cardOrder[0] === 0 ? 'bank' : cardOrder[0] === 1 ? 'cash' : 'savings'}
        onAddIncome={onAddIncome}
      />
      <EditIncomeModal
        isOpen={isEditIncomeOpen}
        onClose={() => {
          setEditIncomeOpen(false);
          setIncomeToEdit(null);
          // Reopen income history modal after closing edit income
          setIncomeHistoryOpen(true);
        }}
        income={incomeToEdit}
        balances={balances}
        onEditIncome={onEditIncome!}
      />
      <UndoToast 
        isOpen={showUndoToast} 
        onClose={onCloseUndoToast} 
        onUndo={onUndo} 
        onRedo={onRedo}
        canRedo={canRedo}
        message={undoMessage} 
      />
      
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
      
      {/* Settings Screen */}
      <Settings 
        isOpen={isSettingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        onExportClick={() => {
          setSettingsOpen(false);
          setExportOpen(true);
        }}
        onAnalyticsClick={() => {
          setSettingsOpen(false);
          setAnalyticsOpen(true);
        }}
        onSearchClick={() => {
          setSettingsOpen(false);
          setSearchOpen(true);
        }}
      />
      <Export 
        isOpen={isExportOpen} 
        onClose={() => setExportOpen(false)} 
        transactions={transactions}
        incomes={incomes}
        cardType={cardOrder[0] === 0 ? 'bank' : cardOrder[0] === 1 ? 'cash' : 'savings'}
        balance={cardOrder[0] === 0 ? balances.bank : cardOrder[0] === 1 ? balances.cash : balances.savings}
        isDarkMode={isDarkMode}
        onSettingsClick={() => {
          setExportOpen(false);
          setSettingsOpen(true);
        }}
        onAnalyticsClick={() => {
          setExportOpen(false);
          setAnalyticsOpen(true);
        }}
        onSearchClick={() => {
          setExportOpen(false);
          setSearchOpen(true);
        }}
      />
      <Analytics 
        isOpen={isAnalyticsOpen} 
        onClose={() => setAnalyticsOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        onSettingsClick={() => {
          setAnalyticsOpen(false);
          setSettingsOpen(true);
        }}
        onExportClick={() => {
          setAnalyticsOpen(false);
          setExportOpen(true);
        }}
        onSearchClick={() => {
          setAnalyticsOpen(false);
          setSearchOpen(true);
        }}
      />
      <Search 
        isOpen={isSearchOpen} 
        onClose={() => setSearchOpen(false)}
        onSettingsClick={() => setSettingsOpen(true)}
        onExportClick={() => setExportOpen(true)}
        onAnalyticsClick={() => setAnalyticsOpen(true)}
        transactions={transactions}
        incomes={incomes}
        balances={balances}
        onDeleteTransaction={handleDeleteTransaction}
        onEditTransaction={onEditTransaction}
        onDeleteIncome={onDeleteIncome}
        onEditIncome={onEditIncome}
        isDarkMode={isDarkMode}
      />
      <ActivityHistory 
        isOpen={isActivityHistoryOpen} 
        onClose={() => setActivityHistoryOpen(false)}
        cardType={cardOrder[0] === 0 ? 'bank' : cardOrder[0] === 1 ? 'cash' : 'savings'}
        balances={balances}
        transactions={transactions}
        incomes={incomes}
        onSettingsClick={() => setSettingsOpen(true)}
        onExportClick={() => setExportOpen(true)}
        onAnalyticsClick={() => setAnalyticsOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
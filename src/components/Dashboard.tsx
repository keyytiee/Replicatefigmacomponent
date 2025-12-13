import { useState, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-dashboard";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import BankMoneyCard from "./BankMoneyCard";
import CashMoneyCard from "./CashMoneyCard";
import SavingsMoneyCard from "./SavingsMoneyCard";
import NavigationSidebar from "./NavigationSidebar";
import ViewTransactionModal from "./ViewTransactionModal";
import AddTransactionModal from "./AddTransactionModal";
import AddIncomeModal from "./AddIncomeModal";
import EditIncomeModal from "./EditIncomeModal";
import IncomeHistoryModal from "./IncomeHistoryModal";
import Settings from "./Settings";
import Export from "./Export";
import Analytics from "./Analytics";
import Search from "./Search";
import UndoToast from "./UndoToast";
import PawPrint from "./PawPrint";
import type { Transaction, Income, CardBalances } from "../App";
import { mergeSort, binarySearchClosest, TransactionHashMap } from "../utils/dsa";

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
  onCloseUndoToast: () => void;
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

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
  onClick: () => void;
}

function TransactionItem({ transaction, index, onClick }: TransactionItemProps) {
  const backgroundColor = categoryColors[transaction.category] || 'rgba(150,150,150,0.5)';
  const animationDelay = `${index * 100}ms`;
  
  // Determine font size based on amount length
  const amountString = transaction.amount.toFixed(2);
  const fontSize = amountString.length > 8 ? '16px' : '20px';

  // Render icon based on category - all centered in the 76px container
  const renderIcon = () => {
    const iconProps = {
      className: "absolute pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]",
      style: { 
        animationDelay,
        opacity: 0,
        transform: 'translateY(20px)'
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
      <div 
        className="absolute border border-black border-solid h-[58px] left-[36px] top-0 rounded-[12px] shadow-[4px_4px_0px_0px_#000000] w-[363px] cursor-pointer hover:translate-y-[-4px] hover:shadow-[4px_8px_0px_0px_#000000] transition-all duration-200 animate-[slideUp_0.5s_ease-out_forwards]"
        style={{ 
          backgroundColor,
          animationDelay,
          opacity: 0,
          transform: 'translateY(20px)'
        }}
        onClick={onClick}
      />
      <div 
        className="absolute bg-[rgba(48,48,48,0.3)] h-[36px] left-[49px] top-[11px] rounded-[10px] w-[76px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]"
        style={{ 
          animationDelay,
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      />
      {renderIcon()}
      <p 
        className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-[138px] top-[11px] text-[18px] text-black tracking-[-0.18px] w-[120px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards] overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ 
          animationDelay,
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        {transaction.category}
      </p>
      <p 
        className="absolute font-['Inter:SemiBold',sans-serif] font-semibold leading-[normal] text-black tracking-[-0.2px] text-right pointer-events-none animate-[slideUp_0.5s_ease-out_forwards]"
        style={{ 
          left: '260px',
          width: '128px',
          top: fontSize === '16px' ? '19px' : '17px',
          fontSize,
          animationDelay,
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        -₱{transaction.amount.toFixed(2)}
      </p>
      <p 
        className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[138px] top-[36px] not-italic text-[8px] text-black tracking-[-0.08px] w-[182px] pointer-events-none animate-[slideUp_0.5s_ease-out_forwards] overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ 
          animationDelay,
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        {transaction.date} | {transaction.time}
      </p>
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
          <rect fill="var(--fill-0, #303030)" height="26" id="Sidebar_2" rx="6.5" stroke="var(--stroke-0, #303030)" width="20" x="0.5" y="54.5" />
          <line id="Line 10" stroke="var(--stroke-0, #303030)" strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p25a9b40} fill="var(--fill-0, #D9D9D9)" id="Polygon 1" stroke="var(--stroke-0, #303030)" />
        </g>
      </svg>
    </div>
  );
}

export default function Dashboard({ balances, transactions, incomes, onAddTransaction, onAddIncome, onDeleteTransaction, onEditTransaction, onDeleteIncome, onEditIncome, showUndoToast, undoMessage, onUndo, onCloseUndoToast }: DashboardProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
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
  const cardAreaRef = useRef<HTMLDivElement>(null);

  const handleTransactionClick = (category: string) => {
    const transaction = transactions.find(t => t.category === category);
    if (transaction) {
      setSelectedTransaction(transaction);
      setModalOpen(true);
    }
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
    const totalCards = 3; // Bank, Cash, Savings
    if (dragOffset > threshold) {
      // Swipe right - go to previous card
      setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
    } else if (dragOffset < -threshold) {
      // Swipe left - go to next card
      setCurrentCardIndex((prev) => (prev + 1) % totalCards);
    }

    setDragOffset(0);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging) {
        handleDragEnd();
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
      className="bg-white relative w-[428px] h-[926px]" 
      data-name="Dashboard"
      onMouseDown={handleGlobalMouseDown}
      onMouseMove={handleGlobalMouseMove}
      onTouchStart={handleGlobalTouchStart}
      onTouchMove={handleGlobalTouchMove}
    >
      <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      
      {/* Card Stack Area with Swipe Detection */}
      <div 
        ref={cardAreaRef}
        className="absolute left-0 top-0 w-[428px] h-[344px] overflow-visible"
      >
        <div
          className="relative w-[1284px] h-full flex transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing overflow-visible"
          style={{
            transform: `translateX(calc(-${currentCardIndex * 428}px + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="relative w-[428px] h-[344px] flex-shrink-0 overflow-visible">
            <BankMoneyCard balance={balances.bank} />
          </div>
          <div className="relative w-[428px] h-[344px] flex-shrink-0 overflow-visible">
            <CashMoneyCard balance={balances.cash} />
          </div>
          <div className="relative w-[428px] h-[344px] flex-shrink-0 overflow-visible">
            <SavingsMoneyCard balance={balances.savings} />
          </div>
        </div>
      </div>

      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[88px] text-[#303030] text-[20px] text-center top-[331px] tracking-[-0.2px] translate-x-[-50%] w-[176px]">Transactions</p>
      
      {/* Scrollable Transactions Container */}
      <div className="absolute left-0 top-[375px] w-[428px] h-[430px] overflow-hidden">
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide pb-[70px]">
          {transactions.map((transaction, index) => (
            <TransactionItem key={transaction.id} transaction={transaction} index={index} onClick={() => handleTransactionClick(transaction.category)} />
          ))}
        </div>
        {/* Fade effect at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none bg-gradient-to-t from-white via-white/80 to-transparent" />
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
      <Sidebar onClick={() => setSidebarOpen(true)} />
      {/* Hide sidebar when ViewTransactionModal is open */}
      {!isModalOpen && (
        <NavigationSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onSettingsClick={() => setSettingsOpen(true)}
          onExportClick={() => setExportOpen(true)}
          onAnalyticsClick={() => setAnalyticsOpen(true)}
          onSearchClick={() => setSearchOpen(true)}
          onHomeClick={() => {
            // Close all modals to return to dashboard
            setSettingsOpen(false);
            setExportOpen(false);
            setAnalyticsOpen(false);
            setSearchOpen(false);
          }}
        />
      )}
      <button 
        className="absolute h-[18px] left-[383px] top-[334px] w-[14px] cursor-pointer hover:opacity-70 transition-opacity z-20"
        onClick={() => setIncomeHistoryOpen(true)}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
          <g id="Group 73">
            <path d="M8.07107 0.292893C7.68054 -0.0976311 7.04738 -0.0976311 6.65685 0.292893L0.292893 6.65685C-0.0976309 7.04738 -0.0976309 7.68054 0.292893 8.07107C0.683418 8.46159 1.31658 8.46159 1.70711 8.07107L7.36396 2.41421L13.0208 8.07107C13.4113 8.46159 14.0445 8.46159 14.435 8.07107C14.8256 7.68054 14.8256 7.04738 14.435 6.65685L8.07107 0.292893ZM7.36396 17H8.36396V1H7.36396H6.36396L6.36396 17H7.36396Z" fill="black" id="Arrow 25" />
            <path d="M6.6569 17.7071C7.0474 18.0976 7.6805 18.0976 8.0711 17.7071L14.435 11.3431C14.8256 10.9526 14.8256 10.3195 14.435 9.92893C14.0445 9.53841 13.4113 9.53841 13.0208 9.92893L7.364 15.5858L1.7071 9.92893C1.3166 9.53841 0.6834 9.53841 0.2929 9.92893C-0.0976 10.3195 -0.0976 10.9526 0.2929 11.3431L6.6569 17.7071ZM7.364 1L6.364 1L6.364 17L7.364 17L8.364 17L8.364 1L7.364 1Z" fill="black" id="Arrow 26" />
          </g>
        </svg>
      </button>
      <ViewTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        transaction={selectedTransaction} 
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
      />
      <IncomeHistoryModal 
        isOpen={isIncomeHistoryOpen} 
        onClose={() => setIncomeHistoryOpen(false)} 
        cardType={currentCardIndex === 0 ? 'bank' : currentCardIndex === 1 ? 'cash' : 'savings'}
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
      />
      <AddTransactionModal 
        isOpen={isAddTransactionOpen}
        onClose={() => {
          setAddTransactionOpen(false);
          setIsEditMode(false);
          setTransactionToEdit(null);
        }}
        cardType={transactionToEdit?.cardType || (currentCardIndex === 0 ? 'bank' : currentCardIndex === 1 ? 'cash' : 'savings')}
        currentBalance={balances[transactionToEdit?.cardType || (currentCardIndex === 0 ? 'bank' : currentCardIndex === 1 ? 'cash' : 'savings')]}
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
        cardType={currentCardIndex === 0 ? 'bank' : currentCardIndex === 1 ? 'cash' : 'savings'}
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
        message={undoMessage} 
      />
      
      {/* Decorative Paw Prints */}
      <PawPrint className="absolute top-[360px] left-[10px] opacity-10 pointer-events-none" size={35} color="#303030" />
      <PawPrint className="absolute top-[450px] right-[15px] opacity-10 pointer-events-none rotate-[-15deg]" size={30} color="#303030" />
      <PawPrint className="absolute top-[650px] left-[8px] opacity-10 pointer-events-none rotate-[20deg]" size={28} color="#303030" />
      <PawPrint className="absolute top-[785px] right-[12px] opacity-10 pointer-events-none rotate-[-25deg]" size={32} color="#303030" />
      
      {/* Settings Screen */}
      <Settings isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />
      <Export 
        isOpen={isExportOpen} 
        onClose={() => setExportOpen(false)} 
        transactions={transactions}
        cardType={currentCardIndex === 0 ? 'bank' : currentCardIndex === 1 ? 'cash' : 'savings'}
      />
      <Analytics 
        isOpen={isAnalyticsOpen} 
        onClose={() => setAnalyticsOpen(false)}
      />
      <Search 
        isOpen={isSearchOpen} 
        onClose={() => setSearchOpen(false)}
        onSettingsClick={() => setSettingsOpen(true)}
        onExportClick={() => setExportOpen(true)}
        onAnalyticsClick={() => setAnalyticsOpen(true)}
        transactions={transactions}
      />
    </div>
  );
}
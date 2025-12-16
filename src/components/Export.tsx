import svgPaths from "../imports/svg-hlhubp1lfw";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import type { Transaction, Income } from "../App";
import { useState } from "react";
import ExportReceipt from "./ExportReceipt";
import NavigationSidebar from "./NavigationSidebar";

interface ExportProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  incomes: Income[];
  cardType: 'bank' | 'cash' | 'savings';
  balance: number;
  isDarkMode?: boolean;
  onSettingsClick?: () => void;
  onAnalyticsClick?: () => void;
  onSearchClick?: () => void;
}

interface ActivityItem {
  id: string;
  type: 'transaction' | 'income';
  title: string;
  amount: number;
  date: string;
  time: string;
  category?: string;
  timestamp: number;
}

function ReturnButton({ onClick, isDarkMode }: { onClick: () => void; isDarkMode?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px] cursor-pointer hover:opacity-70 transition-opacity"
      data-name="Return Button"
    >
      <div className="absolute inset-[0_-8.6%_-2.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
          <g id="Return Button">
            <line id="Line 11" stroke={isDarkMode ? '#FFFFFF' : 'black'} x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
            <line id="Line 12" stroke={isDarkMode ? '#FFFFFF' : 'black'} x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
          </g>
        </svg>
      </div>
    </button>
  );
}

function ExportButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[71px] top-[833px] cursor-pointer hover:opacity-80 transition-opacity"
      data-name="Export Button"
    >
      <div className="absolute bg-[#e5d0ac] h-[53.541px] left-0 top-0 rounded-[15px] w-[285px] border border-[#303030] border-solid shadow-[0_0_0_0_transparent] hover:shadow-[2px_2px_0px_0px_#000000] active:shadow-[0_0_0_0_transparent] transition-shadow">
        <div aria-hidden="true" className="absolute border border-[#303030] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] leading-[normal] left-[142.5px] text-[#303030] text-[20px] text-center top-[12px] tracking-[-0.2px] translate-x-[-50%] w-[148.073px] pointer-events-none">Export</p>
    </button>
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
          <path d="M9.6 80.675 15.5 74.1 9.6 67.525 9.6 80.675Z" fill={isDarkMode ? '#FFFFFF' : '#D9D9D9'} id="Polygon 1" stroke={strokeColor} />
        </g>
      </svg>
    </div>
  );
}

function TransactionRow({ transaction, top }: { transaction: Transaction; top: number }) {
  // Determine font size based on amount length
  const amountString = transaction.amount.toFixed(2);
  const fontSize = amountString.length > 5 ? '18px' : '20px';

  // Render icon based on category
  const renderIcon = () => {
    switch(transaction.category) {
      case 'Transportation':
        return (
          <div className="absolute left-[74px] size-[20px]" style={{ top: `${top + 11}px` }} data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
              <path d={svgPaths.p133d6180} fill="#303030" id="Vector" />
            </svg>
          </div>
        );
      case 'Food & Grocery':
        return (
          <div className="absolute left-[72px] size-[22px]" style={{ top: `${top + 10}px` }} data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
              <path d={svgPaths.p3025aa80} fill="#303030" id="Vector" />
            </svg>
          </div>
        );
      case 'Healthcare':
        return (
          <div className="absolute left-[74px] size-[20px]" style={{ top: `${top + 11}px` }} data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 17">
              <path clipRule="evenodd" d={svgPaths.p2df08180} fill="#303030" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        );
      case 'Education':
        return (
          <div className="absolute left-[74px] size-[20px]" style={{ top: `${top + 11}px` }} data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p10e0fd80} fill="#303030" id="Vector" />
            </svg>
          </div>
        );
      case 'Utilities':
        return (
          <div className="absolute h-[15px] left-[78px] w-[13px]" style={{ top: `${top + 14}px` }}>
            <div className="absolute inset-[-4.21%_-3.85%_-3.33%_-3.85%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
                <g id="Vector 11">
                  <path d={svgPaths.p390d4ea0} fill="#303030" fillOpacity="0.09" />
                  <path d={svgPaths.p21a8f900} stroke="#303030" />
                </g>
              </svg>
            </div>
          </div>
        );
      case 'Leisure':
        return (
          <div className="absolute h-[17px] left-[72px] w-[23px]" style={{ top: `${top + 10}px` }} data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 17">
              <path d={svgPaths.p4de4b80} fill="black" id="Vector" />
            </svg>
          </div>
        );
      case 'Bills':
        return (
          <div className="absolute left-[74px] size-[20px]" style={{ top: `${top + 11}px` }} data-name="Vector">
            <svg className="block size-full" fill="none" viewBox="0 0 20 20">
              <path d="M3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V7H13C12.4477 7 12 6.55228 12 6V1H3ZM14 1.5V6H18.5L14 1.5ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z" fill="#303030" />
            </svg>
          </div>
        );
      case 'Miscellaneous':
        return (
          <div className="absolute left-[74px] size-[20px]" style={{ top: `${top + 11}px` }} data-name="Vector">
            <svg className="block size-full" fill="none" viewBox="0 0 20 20">
              <path d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9H9V4C9 3.44772 9.44772 3 10 3Z" fill="#303030" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="absolute bg-[rgba(48,48,48,0.3)] h-[36px] rounded-[10px] w-[76px]" style={{ left: '46px', top: `${top + 11}px` }} />
      {renderIcon()}
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[18px] leading-[normal] left-[135px] text-[18px] text-black tracking-[-0.18px] w-[177px]" style={{ top: `${top + 11}px` }}>
        {transaction.category}
      </p>
      <p 
        className="absolute font-['Inter:SemiBold',sans-serif] font-semibold leading-[normal] text-black tracking-[-0.2px] text-right"
        style={{ 
          left: fontSize === '18px' ? '312px' : '335px',
          width: fontSize === '18px' ? '78px' : '60px',
          height: fontSize === '18px' ? '23px' : '25px',
          top: `${top + 15}px`,
          fontSize
        }}
      >
        -₱{transaction.amount.toFixed(0)}
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[135px] not-italic text-[8px] text-black tracking-[-0.08px] w-[182px]" style={{ top: `${top + 36}px` }}>
        {transaction.date} | {transaction.time}
      </p>
    </>
  );
}

function ActivityRow({ item, top, isDarkMode }: { item: ActivityItem; top: number; isDarkMode?: boolean }) {
  // Determine font size based on amount length
  const amountString = item.amount.toFixed(2);
  const fontSize = amountString.length > 5 ? '18px' : '20px';
  
  const textColor = isDarkMode ? '#FFFFFF' : 'black';
  const iconColor = isDarkMode ? '#FFFFFF' : '#303030';

  // Render icon based on category (for transactions) or income icon
  const renderIcon = () => {
    if (item.type === 'income') {
      // Income icon - upward arrow
      return (
        <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
          <svg className="block flex-shrink-0" width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M10 2L10 18M10 2L6 6M10 2L14 6" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    }

    // Transaction icons
    switch(item.category) {
      case 'Transportation':
        return (
          <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
            <svg className="block flex-shrink-0" width="20" height="16" fill="none" viewBox="0 0 20 16">
              <path d={svgPaths.p133d6180} fill={iconColor} />
            </svg>
          </div>
        );
      case 'Food & Grocery':
        return (
          <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
            <svg className="block flex-shrink-0" width="22" height="22" fill="none" viewBox="0 0 22 22">
              <path d={svgPaths.p3025aa80} fill={iconColor} />
            </svg>
          </div>
        );
      case 'Healthcare':
        return (
          <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
            <svg className="block flex-shrink-0" width="20" height="17" fill="none" viewBox="0 0 20 17">
              <path clipRule="evenodd" d={svgPaths.p2df08180} fill={iconColor} fillRule="evenodd" />
            </svg>
          </div>
        );
      case 'Education':
        return (
          <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
            <svg className="block flex-shrink-0" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d={svgPaths.p10e0fd80} fill={iconColor} />
            </svg>
          </div>
        );
      case 'Utilities':
        return (
          <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
            <svg className="block flex-shrink-0" width="13" height="15" fill="none" viewBox="0 0 14 17">
              <g>
                <path d={svgPaths.p390d4ea0} fill={iconColor} fillOpacity="0.09" />
                <path d={svgPaths.p21a8f900} stroke={iconColor} />
              </g>
            </svg>
          </div>
        );
      case 'Leisure':
        return (
          <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
            <svg className="block flex-shrink-0" width="23" height="17" fill="none" viewBox="0 0 23 17">
              <path d={svgPaths.p4de4b80} fill={iconColor} />
            </svg>
          </div>
        );
      case 'Bills':
        return (
          <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
            <svg className="block flex-shrink-0" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V7H13C12.4477 7 12 6.55228 12 6V1H3ZM14 1.5V6H18.5L14 1.5ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z" fill={iconColor} />
            </svg>
          </div>
        );
      case 'Miscellaneous':
        return (
          <div className="absolute left-[46px] w-[76px] h-[36px] rounded-[10px] bg-[rgba(48,48,48,0.3)] flex items-center justify-center" style={{ top: `${top + 11}px` }}>
            <svg className="block flex-shrink-0" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9H9V4C9 3.44772 9.44772 3 10 3Z" fill={iconColor} />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderIcon()}
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[18px] leading-[normal] left-[135px] text-[18px] tracking-[-0.18px] w-[177px]" style={{ top: `${top + 11}px`, color: textColor }}>
        {item.title}
      </p>
      <p 
        className="absolute font-['Inter:SemiBold',sans-serif] font-semibold leading-[normal] tracking-[-0.2px] text-right"
        style={{ 
          left: fontSize === '18px' ? '312px' : '335px',
          width: fontSize === '18px' ? '78px' : '60px',
          height: fontSize === '18px' ? '23px' : '25px',
          top: `${top + 15}px`,
          fontSize,
          color: textColor
        }}
      >
        {item.type === 'income' ? '+' : '-'}₱{item.amount.toFixed(0)}
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[135px] not-italic text-[8px] tracking-[-0.08px] whitespace-nowrap w-[250px]\" style={{ top: `${top + 36}px`, color: textColor }}>
        {item.date} | {item.time}
      </p>
    </>
  );
}

export default function Export({ isOpen, onClose, transactions, incomes, cardType, balance, isDarkMode, onSettingsClick, onAnalyticsClick, onSearchClick }: ExportProps) {
  const [isReceiptOpen, setReceiptOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  
  if (!isOpen && !isAnimatingOut) return null;

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 300); // Match animation duration
  };
  
  const cardTypeLabel = cardType === 'bank' ? 'Bank Money' : cardType === 'cash' ? 'Cash Money' : 'Savings Money';
  
  // Filter transactions by card type
  const filteredTransactions = transactions.filter(t => t.cardType === cardType);
  const filteredIncomes = incomes.filter(i => i.cardType === cardType);

  // Combine transactions and incomes into a single list of activity items
  const activityItems: ActivityItem[] = [
    ...filteredTransactions.map(t => ({
      id: `transaction-${t.id}`,
      type: 'transaction' as const,
      title: t.category,
      amount: t.amount,
      date: t.date,
      time: t.time,
      category: t.category,
      timestamp: new Date(t.date + ' ' + t.time).getTime()
    })),
    ...filteredIncomes.map(i => ({
      id: `income-${i.id}`,
      type: 'income' as const,
      title: i.title,
      amount: i.amount,
      date: i.date,
      time: i.time,
      timestamp: new Date(i.date + ' ' + i.time).getTime()
    }))
  ];

  // Sort activity items by timestamp in descending order
  activityItems.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      <div 
        className={`absolute inset-0 z-[70] transition-all duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} ${
          isAnimatingOut ? 'animate-[slideOutRight_0.3s_ease-in-out_forwards]' : 'animate-[slideInRight_0.3s_ease-in-out]'
        }`} 
        data-name="Export"
      >
        <div className="absolute h-[932px] left-0 opacity-10 top-[-5px] w-[431px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        <ReturnButton onClick={handleClose} isDarkMode={isDarkMode} />
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[171px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>{cardTypeLabel}</p>
        
        {/* Current Balance Display */}
        <div className="absolute left-[36px] top-[85px] w-[356px]">
          <p className={`font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[14px] tracking-[-0.14px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Current Balance</p>
          <p className={`font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[28px] tracking-[-0.28px] mt-[2px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>₱{balance.toFixed(2)}</p>
        </div>
        
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[36px] text-[16px] top-[175px] tracking-[-0.16px] w-[90px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Activity</p>
        <div className="absolute h-0 left-[36px] top-[164px] w-[356px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356 1">
              <line id="Line 13" stroke={isDarkMode ? '#FFFFFF' : 'black'} x2="356" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        
        {/* Scrollable Transactions List */}
        <div className="absolute left-0 top-[206px] w-[428px] h-[612px] overflow-hidden">
          <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide pb-[20px]">
            {activityItems.map((item, index) => (
              <ActivityRow key={item.id} item={item} top={index * 70} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
        
        <ExportButton onClick={() => setReceiptOpen(true)} />
        <Sidebar onClick={() => setSidebarOpen(true)} isDarkMode={isDarkMode} />
      </div>
      
      <ExportReceipt 
        isOpen={isReceiptOpen} 
        onClose={() => setReceiptOpen(false)} 
        transactions={filteredTransactions}
        incomes={filteredIncomes}
        cardType={cardType}
        balance={balance}
        isDarkMode={isDarkMode}
      />
      
      <NavigationSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onSettingsClick={onSettingsClick}
        onAnalyticsClick={onAnalyticsClick}
        onSearchClick={onSearchClick}
        isDarkMode={isDarkMode}
      />
    </>
  );
}
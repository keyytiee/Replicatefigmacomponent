import { useState } from "react";
import svgPaths from "../imports/svg-dashboard";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import NavigationSidebar from "./NavigationSidebar";
import type { Transaction, Income, CardBalances } from "../App";
import { ChevronLeft } from "lucide-react";

interface ActivityHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  cardType: 'bank' | 'cash' | 'savings';
  transactions: Transaction[];
  incomes: Income[];
  balances: CardBalances;
  onSettingsClick?: () => void;
  onExportClick?: () => void;
  onAnalyticsClick?: () => void;
  onSearchClick?: () => void;
  isDarkMode?: boolean;
}

// Category colors and icons
const categoryColors: { [key: string]: string } = {
  "Food & Grocery": "#8baa4e",
  "Transportation": "#6e86a9",
  "Bills": "#d99c42",
  "Utilities": "#4a506f",
  "Healthcare": "#b45c4c",
  "Leisure": "#e8c85e",
  "Education": "#75689c",
  "Miscellaneous": "#b5afa8",
};

interface ActivityItem {
  id: string;
  type: 'transaction' | 'income';
  title: string;
  description: string;
  amount: number;
  date: string;
  time: string;
  category?: string;
  timestamp: number;
}

function ReturnButton({ onClick, isDarkMode }: { onClick: () => void; isDarkMode?: boolean }) {
  return (
    <button 
      className="absolute left-[36px] top-[49px] cursor-pointer hover:opacity-70 transition-opacity z-10"
      onClick={onClick}
    >
      <ChevronLeft className={`size-[28px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`} strokeWidth={2.5} />
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
          <rect fill={fillColor} height="26" rx="6.5" stroke={strokeColor} width="20" x="0.5" y="54.5" />
          <line stroke={strokeColor} strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p25a9b40} fill="#D9D9D9" stroke={strokeColor} />
        </g>
      </svg>
    </div>
  );
}

function CategoryIcon({ category, className = "" }: { category: string; className?: string }) {
  const iconClass = `${className} pointer-events-none`;

  switch(category) {
    case 'Healthcare':
      return (
        <div className={iconClass}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 17">
            <path clipRule="evenodd" d={svgPaths.p2df08180} fill="black" fillRule="evenodd" />
          </svg>
        </div>
      );
    case 'Leisure':
      return (
        <div className={iconClass}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d="M7 16C7 17.1046 6.10457 18 5 18C3.89543 18 3 17.1046 3 16C3 14.8954 3.89543 14 5 14C6.10457 14 7 14.8954 7 16ZM17 16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16C13 14.8954 13.8954 14 15 14C16.1046 14 17 14.8954 17 16ZM6.5 13L4.85 5H2V3H6L7.85 11.5H16.5L18.5 6H8.5L9.15 4H20L17.35 12C17.1478 12.5911 16.5891 13 15.95 13H6.5Z" fill="black" />
          </svg>
        </div>
      );
    case 'Food & Grocery':
      return (
        <div className={iconClass}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p3025aa80} fill="black" />
          </svg>
        </div>
      );
    case 'Transportation':
      return (
        <div className={iconClass}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
            <path d={svgPaths.p133d6180} fill="black" />
          </svg>
        </div>
      );
    case 'Education':
      return (
        <div className={iconClass}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d={svgPaths.p1a7bff00} fill="black" />
              <path d={svgPaths.p252e3900} fill="black" />
            </g>
          </svg>
        </div>
      );
    case 'Bills':
      return (
        <div className={iconClass}>
          <svg className="block size-full" fill="none" viewBox="0 0 20 20">
            <path d="M3 2C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H17C17.5523 18 18 17.5523 18 17V7H13C12.4477 7 12 6.55228 12 6V1H3ZM14 1.5V6H18.5L14 1.5ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z" fill="black" />
          </svg>
        </div>
      );
    case 'Utilities':
      return (
        <div className={iconClass}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
            <g clipPath="url(#clip0_utilities_activity)">
              <path clipRule="evenodd" d={svgPaths.p31c4a7f0} fill="black" fillRule="evenodd" />
            </g>
            <defs>
              <clipPath id="clip0_utilities_activity">
                <rect fill="white" height="21" width="21" />
              </clipPath>
            </defs>
          </svg>
        </div>
      );
    case 'Miscellaneous':
      return (
        <div className={iconClass}>
          <svg className="block size-full" fill="none" viewBox="0 0 20 20">
            <path d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9H9V4C9 3.44772 9.44772 3 10 3Z" fill="black" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export default function ActivityHistory({
  isOpen,
  onClose,
  cardType,
  transactions,
  incomes,
  balances,
  onSettingsClick,
  onExportClick,
  onAnalyticsClick,
  onSearchClick,
  isDarkMode
}: ActivityHistoryProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!isOpen) return null;

  const cardTitle = cardType === 'bank' ? 'Bank Money' : cardType === 'cash' ? 'Cash Money' : 'Savings Money';
  const currentBalance = balances[cardType];

  // Filter transactions and incomes for this card
  const cardTransactions = transactions.filter(t => t.cardType === cardType);
  const cardIncomes = incomes.filter(i => i.cardType === cardType);

  // Convert to unified activity items with timestamps for sorting
  const activityItems: ActivityItem[] = [
    ...cardTransactions.map(t => ({
      id: t.id,
      type: 'transaction' as const,
      title: t.title,
      description: t.description,
      amount: t.amount,
      date: t.date,
      time: t.time,
      category: t.category,
      timestamp: new Date(`${t.date} ${t.time}`).getTime()
    })),
    ...cardIncomes.map(i => ({
      id: i.id,
      type: 'income' as const,
      title: i.title,
      description: i.description,
      amount: i.amount,
      date: i.date,
      time: i.time,
      timestamp: new Date(`${i.date} ${i.time}`).getTime()
    }))
  ];

  // Sort by recency (most recent first)
  activityItems.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      <div className={`absolute inset-0 z-[70] transition-colors duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`} data-name="Activity History">
        <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>

        <ReturnButton onClick={onClose} isDarkMode={isDarkMode} />

        {/* Title */}
        <p className={`absolute font-['Plus_Jakarta_Sans'] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[171px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>
          {cardTitle}
        </p>

        {/* Divider line */}
        <div className="absolute h-0 left-[36px] top-[111px] w-[356px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356 1">
              <line stroke={isDarkMode ? '#FFFFFF' : '#303030'} strokeWidth="2" x1="0" x2="356" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>

        {/* Activity Label */}
        <p className={`absolute font-['Plus_Jakarta_Sans'] font-extrabold h-[20px] leading-[normal] left-[36px] text-[16px] top-[122px] tracking-[-0.16px] w-[90px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>
          Activity
        </p>

        {/* Activity List */}
        <div className="absolute left-[36px] top-[158px] w-[356px] h-[610px] overflow-y-auto scrollbar-hide">
          {activityItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-[100px]">
              <p className={`font-['Plus_Jakarta_Sans'] font-semibold text-[16px] text-center ${isDarkMode ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(48,48,48,0.5)]'}`}>
                No activity yet
              </p>
              <p className={`font-['Plus_Jakarta_Sans'] text-[13px] text-center mt-2 ${isDarkMode ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(48,48,48,0.4)]'}`}>
                {cardType === 'bank' ? 'Bank' : cardType === 'cash' ? 'Cash' : 'Savings'} transactions and incomes will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3 pb-6">
              {activityItems.map((item, index) => {
                const bgColor = item.type === 'transaction' && item.category
                  ? categoryColors[item.category] || "#d9d9d9"
                  : "#d9d9d9";

                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="relative bg-[#d9d9d9] border border-black rounded-[12px] h-[68px] w-full hover:shadow-[2px_2px_0px_0px_black] transition-shadow"
                    style={{
                      backgroundColor: bgColor,
                    }}
                  >
                    {/* Icon container - vertically centered */}
                    <div className="absolute left-[16px] top-1/2 -translate-y-1/2 bg-[rgba(48,48,48,0.2)] rounded-[10px] w-[68px] h-[48px] flex items-center justify-center">
                      {item.type === 'transaction' && item.category ? (
                        <CategoryIcon category={item.category} className="size-[24px]" />
                      ) : (
                        // Income icon
                        <div className="size-[24px]">
                          <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                            <path d="M12 2L12 22M12 2L6 8M12 2L18 8" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content - vertically centered */}
                    <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-[145px]">
                      <p className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-black leading-tight mb-1 truncate">
                        {item.type === 'transaction' && item.category ? item.category : item.title}
                      </p>
                      <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[rgba(0,0,0,0.7)] leading-tight">
                        {item.date} | {item.time}
                      </p>
                    </div>

                    {/* Amount - vertically centered */}
                    <div className="absolute right-[16px] top-1/2 -translate-y-1/2 text-right">
                      <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-black">
                        {item.type === 'transaction' ? '-' : '+'}₱{item.amount.toFixed(0)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Current Balance Footer */}
        <div className="absolute left-[36px] bottom-[30px] w-[356px] bg-[#e5d0ac] border-2 border-black rounded-[15px] p-4 shadow-[4px_4px_0px_0px_black]">
          <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#303030] mb-1">
            Current Balance
          </p>
          <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[32px] text-[#303030] leading-tight">
            ₱{currentBalance.toFixed(2)}
          </p>
        </div>

        <Sidebar onClick={() => setSidebarOpen(true)} isDarkMode={isDarkMode} />
      </div>

      <NavigationSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onHomeClick={onClose}
        onSettingsClick={() => {
          if (onSettingsClick) {
            onClose();
            onSettingsClick();
          }
        }}
        onExportClick={() => {
          if (onExportClick) {
            onClose();
            onExportClick();
          }
        }}
        onAnalyticsClick={() => {
          if (onAnalyticsClick) {
            onClose();
            onAnalyticsClick();
          }
        }}
        onSearchClick={() => {
          if (onSearchClick) {
            onClose();
            onSearchClick();
          }
        }}
        isDarkMode={isDarkMode}
      />
    </>
  );
}
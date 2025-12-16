import svgPaths from "../imports/svg-jlo188t4qc";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NavigationSidebar from "./NavigationSidebar";
import TransportationDetail from "./TransportationDetail";
import FoodGroceryDetail from "./FoodGroceryDetail";
import HealthcareDetail from "./HealthcareDetail";
import LeisureDetail from "./LeisureDetail";
import UtilitiesDetail from "./UtilitiesDetail";
import EducationDetail from "./EducationDetail";
import BillsDetail from "./BillsDetail";
import MiscellaneousDetail from "./MiscellaneousDetail";
import DynamicPieChart from "./DynamicPieChart";
import CategoryListItem from "./CategoryListItem";
import type { Transaction } from "../App";

interface AnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  transactions: Transaction[];
  onSettingsClick?: () => void;
  onExportClick?: () => void;
  onSearchClick?: () => void;
}

type TimePeriod = 'week' | 'month' | 'year' | 'all';

// Helper functions for date calculations
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekEnd(date: Date): Date {
  const d = new Date(getWeekStart(date));
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

function getMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function getYearStart(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
}

function getYearEnd(date: Date): Date {
  return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
}

function formatPeriodLabel(period: TimePeriod, referenceDate: Date): string {
  switch (period) {
    case 'week': {
      const start = getWeekStart(referenceDate);
      const end = getWeekEnd(referenceDate);
      const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
      const startDay = start.getDate();
      const endDay = end.getDate();
      const year = end.getFullYear();
      
      // If same month, show "Dec 8 - 14, 2025"
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`;
      }
      // If different months, show "Nov 29 - Dec 5, 2025"
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
    case 'month':
      return referenceDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    case 'year':
      return referenceDate.getFullYear().toString();
    case 'all':
      return 'All Time';
  }
}

function ReturnButton({ onClick, isDarkMode }: { onClick: () => void; isDarkMode?: boolean }) {
  const strokeColor = isDarkMode ? '#FFFFFF' : '#000000';
  
  return (
    <button
      onClick={onClick}
      className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px] cursor-pointer hover:opacity-70 transition-opacity z-20"
      data-name="Return Button"
    >
      <div className="absolute inset-[0_-8.6%_-2.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
          <g id="Return Button">
            <line id="Line 11" stroke={strokeColor} x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
            <line id="Line 12" stroke={strokeColor} x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
          </g>
        </svg>
      </div>
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
          <path d={svgPaths.p25a9b40} fill="#D9D9D9" id="Polygon 1" stroke={strokeColor} />
        </g>
      </svg>
    </div>
  );
}

export default function Analytics({ isOpen, onClose, isDarkMode, transactions, onSettingsClick, onExportClick, onSearchClick }: AnalyticsProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTransportationDetailOpen, setTransportationDetailOpen] = useState(false);
  const [isFoodGroceryDetailOpen, setFoodGroceryDetailOpen] = useState(false);
  const [isHealthcareDetailOpen, setHealthcareDetailOpen] = useState(false);
  const [isLeisureDetailOpen, setLeisureDetailOpen] = useState(false);
  const [isUtilitiesDetailOpen, setUtilitiesDetailOpen] = useState(false);
  const [isEducationDetailOpen, setEducationDetailOpen] = useState(false);
  const [isBillsDetailOpen, setBillsDetailOpen] = useState(false);
  const [isMiscellaneousDetailOpen, setMiscellaneousDetailOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('week');
  const [referenceDate, setReferenceDate] = useState(new Date(2025, 11, 13)); // December 13, 2025
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 300); // Match animation duration
  };

  // Filter transactions based on selected time period
  const filteredTransactions = useMemo(() => {
    if (timePeriod === 'all') return transactions;

    let startDate: Date, endDate: Date;

    switch (timePeriod) {
      case 'week':
        startDate = getWeekStart(referenceDate);
        endDate = getWeekEnd(referenceDate);
        break;
      case 'month':
        startDate = getMonthStart(referenceDate);
        endDate = getMonthEnd(referenceDate);
        break;
      case 'year':
        startDate = getYearStart(referenceDate);
        endDate = getYearEnd(referenceDate);
        break;
    }

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }, [transactions, timePeriod, referenceDate]);

  // Navigation handlers
  const handlePrevious = () => {
    if (timePeriod === 'all') return;
    
    const newDate = new Date(referenceDate);
    switch (timePeriod) {
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
    }
    setReferenceDate(newDate);
  };

  const handleNext = () => {
    if (timePeriod === 'all') return;
    
    const newDate = new Date(referenceDate);
    switch (timePeriod) {
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }
    setReferenceDate(newDate);
  };

  const totalExpenses = useMemo(() => filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  const transportationExpenses = useMemo(() => filteredTransactions
    .filter(transaction => transaction.category === 'Transportation')
    .reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  const foodGroceryExpenses = useMemo(() => filteredTransactions
    .filter(transaction => transaction.category === 'Food & Grocery')
    .reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  const healthcareExpenses = useMemo(() => filteredTransactions
    .filter(transaction => transaction.category === 'Healthcare')
    .reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  const leisureExpenses = useMemo(() => filteredTransactions
    .filter(transaction => transaction.category === 'Leisure')
    .reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  const utilitiesExpenses = useMemo(() => filteredTransactions
    .filter(transaction => transaction.category === 'Utilities')
    .reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  const educationExpenses = useMemo(() => filteredTransactions
    .filter(transaction => transaction.category === 'Education')
    .reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  const miscellaneousExpenses = useMemo(() => filteredTransactions
    .filter(transaction => transaction.category === 'Miscellaneous')
    .reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  const billsExpenses = useMemo(() => filteredTransactions
    .filter(transaction => transaction.category === 'Bills')
    .reduce((acc, transaction) => acc + transaction.amount, 0), [filteredTransactions]);

  // Calculate percentages for each category
  const transportationPercent = totalExpenses > 0 ? (transportationExpenses / totalExpenses) * 100 : 0;
  const foodGroceryPercent = totalExpenses > 0 ? (foodGroceryExpenses / totalExpenses) * 100 : 0;
  const healthcarePercent = totalExpenses > 0 ? (healthcareExpenses / totalExpenses) * 100 : 0;
  const leisurePercent = totalExpenses > 0 ? (leisureExpenses / totalExpenses) * 100 : 0;
  const utilitiesPercent = totalExpenses > 0 ? (utilitiesExpenses / totalExpenses) * 100 : 0;
  const educationPercent = totalExpenses > 0 ? (educationExpenses / totalExpenses) * 100 : 0;
  const miscellaneousPercent = totalExpenses > 0 ? (miscellaneousExpenses / totalExpenses) * 100 : 0;
  const billsPercent = totalExpenses > 0 ? (billsExpenses / totalExpenses) * 100 : 0;

  // Prepare data for dynamic pie chart
  const categoryData = useMemo(() => [
    { name: 'Transportation', value: transportationExpenses, percentage: transportationPercent, color: '#6E86A9' },
    { name: 'Food & Grocery', value: foodGroceryExpenses, percentage: foodGroceryPercent, color: '#8BAA4E' },
    { name: 'Healthcare', value: healthcareExpenses, percentage: healthcarePercent, color: '#B45C4C' },
    { name: 'Leisure', value: leisureExpenses, percentage: leisurePercent, color: '#E8C85E' },
    { name: 'Utilities', value: utilitiesExpenses, percentage: utilitiesPercent, color: '#4A506F' },
    { name: 'Education', value: educationExpenses, percentage: educationPercent, color: '#75689C' },
    { name: 'Miscellaneous', value: miscellaneousExpenses, percentage: miscellaneousPercent, color: '#B5AFA8' },
    { name: 'Bills', value: billsExpenses, percentage: billsPercent, color: '#D99C42' },
  ], [transportationExpenses, foodGroceryExpenses, healthcareExpenses, leisureExpenses, utilitiesExpenses, educationExpenses, miscellaneousExpenses, billsExpenses, transportationPercent, foodGroceryPercent, healthcarePercent, leisurePercent, utilitiesPercent, educationPercent, miscellaneousPercent, billsPercent]);

  // Sort categories by percentage (highest to lowest)
  const sortedCategories = useMemo(() => 
    [...categoryData].sort((a, b) => b.percentage - a.percentage),
    [categoryData]
  );

  const handleCategoryClick = (categoryName: string) => {
    switch (categoryName) {
      case 'Transportation':
        setTransportationDetailOpen(true);
        break;
      case 'Food & Grocery':
        setFoodGroceryDetailOpen(true);
        break;
      case 'Healthcare':
        setHealthcareDetailOpen(true);
        break;
      case 'Leisure':
        setLeisureDetailOpen(true);
        break;
      case 'Utilities':
        setUtilitiesDetailOpen(true);
        break;
      case 'Education':
        setEducationDetailOpen(true);
        break;
      case 'Miscellaneous':
        setMiscellaneousDetailOpen(true);
        break;
      case 'Bills':
        setBillsDetailOpen(true);
        break;
    }
  };

  if (!isOpen && !isAnimatingOut) return null;

  return (
    <>
      <div 
        className={`absolute inset-0 z-[70] transition-all duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} ${
          isAnimatingOut ? 'animate-[slideOutRight_0.3s_ease-in-out_forwards]' : 'animate-[slideInRight_0.3s_ease-in-out]'
        }`} 
        data-name="Analytics"
      >
        {/* Background */}
        <div className="absolute h-[932px] left-[-3px] opacity-10 top-px w-[431px]" data-name="Untitled design (4) 1">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
            src={imgUntitledDesign41}
          />
        </div>

        <ReturnButton onClick={handleClose} isDarkMode={isDarkMode} />
        <Sidebar onClick={() => setSidebarOpen(true)} isDarkMode={isDarkMode} />
        <NavigationSidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onHomeClick={handleClose}
          onSettingsClick={onSettingsClick}
          onExportClick={onExportClick}
          onAnalyticsClick={() => setSidebarOpen(false)}
          onSearchClick={onSearchClick}
          isDarkMode={isDarkMode}
        />

        {/* Activity Icon at Top - Inline with Back Button */}
        <div className="absolute h-[12.5px] left-[209px] top-[58px] w-[19.5px]">
          <div className="absolute inset-[-11.1%_0_-11.55%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
              <path d={svgPaths.p36ebe700} id="Vector 13" stroke={isDarkMode ? '#FFFFFF' : '#303030'} />
            </svg>
          </div>
        </div>

        {/* Time Period Selector - Below Activity Icon */}
        <div className="absolute left-[12px] top-[90px] w-[404px] flex flex-col gap-[6px]">
          {/* Time Period Buttons */}
          <div className="flex gap-[8px] justify-center">
            <button
              onClick={() => setTimePeriod('week')}
              className={`px-[16px] py-[6px] rounded-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[13px] transition-all ${
                timePeriod === 'week' 
                  ? 'bg-[#ffcb3d] text-[#303030]' 
                  : 'bg-white border border-[#303030] text-[#303030] hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimePeriod('month')}
              className={`px-[16px] py-[6px] rounded-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[13px] transition-all ${
                timePeriod === 'month' 
                  ? 'bg-[#ffcb3d] text-[#303030]' 
                  : 'bg-white border border-[#303030] text-[#303030] hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimePeriod('year')}
              className={`px-[16px] py-[6px] rounded-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[13px] transition-all ${
                timePeriod === 'year' 
                  ? 'bg-[#ffcb3d] text-[#303030]' 
                  : 'bg-white border border-[#303030] text-[#303030] hover:bg-gray-100'
              }`}
            >
              Year
            </button>
          </div>

          {/* Navigation and Label Row */}
          {timePeriod !== 'all' && (
            <div className="flex items-center justify-center gap-[10px]">
              <button
                onClick={handlePrevious}
                className={`p-[3px] rounded-full transition-all ${isDarkMode ? 'hover:bg-[#444]' : 'hover:bg-[#f0f0f0]'}`}
              >
                <ChevronLeft className={`size-[18px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`} strokeWidth={2.5} />
              </button>
              <p className={`font-['Plus_Jakarta_Sans:Bold',sans-serif] text-[11px] min-w-[180px] text-center ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>
                {formatPeriodLabel(timePeriod, referenceDate)}
              </p>
              <button
                onClick={handleNext}
                className={`p-[3px] rounded-full transition-all ${isDarkMode ? 'hover:bg-[#444]' : 'hover:bg-[#f0f0f0]'}`}
              >
                <ChevronRight className={`size-[18px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Pie Chart */}
        <DynamicPieChart 
          categories={sortedCategories}
          totalExpenses={totalExpenses}
          onCategoryClick={handleCategoryClick}
        />

        {/* Total Expenses Bar */}
        <div className="absolute bg-[#ffcb3d] h-[18px] left-[12px] rounded-[12px] top-[520px] w-[409px]" />
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[79px] text-[#303030] text-[15px] text-center top-[519px] tracking-[-0.15px] translate-x-[-50%] w-[176px]">Total Expenses</p>
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[368px] text-[#303030] text-[15px] text-center top-[519px] tracking-[-0.15px] translate-x-[-50%] w-[176px]">₱{totalExpenses.toLocaleString()}</p>

        {/* Dynamic Sorted Category List */}
        {sortedCategories.map((category, index) => (
          <CategoryListItem
            key={category.name}
            name={category.name}
            value={category.value}
            percentage={category.percentage}
            color={category.color}
            position={index}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </div>
      <TransportationDetail
        isOpen={isTransportationDetailOpen}
        onClose={() => setTransportationDetailOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        timePeriod={timePeriod}
        referenceDate={referenceDate}
      />
      <FoodGroceryDetail
        isOpen={isFoodGroceryDetailOpen}
        onClose={() => setFoodGroceryDetailOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        timePeriod={timePeriod}
        referenceDate={referenceDate}
      />
      <HealthcareDetail
        isOpen={isHealthcareDetailOpen}
        onClose={() => setHealthcareDetailOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        timePeriod={timePeriod}
        referenceDate={referenceDate}
      />
      <LeisureDetail
        isOpen={isLeisureDetailOpen}
        onClose={() => setLeisureDetailOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        timePeriod={timePeriod}
        referenceDate={referenceDate}
      />
      <UtilitiesDetail
        isOpen={isUtilitiesDetailOpen}
        onClose={() => setUtilitiesDetailOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        timePeriod={timePeriod}
        referenceDate={referenceDate}
      />
      <EducationDetail
        isOpen={isEducationDetailOpen}
        onClose={() => setEducationDetailOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        timePeriod={timePeriod}
        referenceDate={referenceDate}
      />
      <BillsDetail
        isOpen={isBillsDetailOpen}
        onClose={() => setBillsDetailOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        timePeriod={timePeriod}
        referenceDate={referenceDate}
      />
      <MiscellaneousDetail
        isOpen={isMiscellaneousDetailOpen}
        onClose={() => setMiscellaneousDetailOpen(false)}
        isDarkMode={isDarkMode}
        transactions={transactions}
        timePeriod={timePeriod}
        referenceDate={referenceDate}
      />
    </>
  );
}
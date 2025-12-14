import { useMemo } from 'react';
import type { Transaction } from '../App';

type TimePeriod = 'week' | 'month' | 'year';

interface WeeklyReportProps {
  transactions: Transaction[];
  categoryName: string;
  categoryColor: string;
  isDarkMode?: boolean;
  timePeriod?: TimePeriod;
  referenceDate?: Date;
}

export default function WeeklyReport({ 
  transactions, 
  categoryName, 
  categoryColor, 
  isDarkMode,
  timePeriod = 'week',
  referenceDate = new Date()
}: WeeklyReportProps) {
  // Calculate data based on time period
  const reportData = useMemo(() => {
    if (timePeriod === 'week') {
      // Weekly data - show 7 days (Mon-Sun)
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const currentDay = referenceDate.getDay();
      const diff = currentDay === 0 ? -6 : 1 - currentDay;
      const monday = new Date(referenceDate);
      monday.setDate(referenceDate.getDate() + diff);
      monday.setHours(0, 0, 0, 0);

      return days.map((day, index) => {
        const dayDate = new Date(monday);
        dayDate.setDate(monday.getDate() + index);
        
        const dayTransactions = transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return (
            t.category === categoryName &&
            transactionDate.getFullYear() === dayDate.getFullYear() &&
            transactionDate.getMonth() === dayDate.getMonth() &&
            transactionDate.getDate() === dayDate.getDate()
          );
        });

        const amount = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        return { label: day, amount };
      });
    } else if (timePeriod === 'month') {
      // Monthly data - show 4 weeks
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      const monthStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
      
      return weeks.map((week, index) => {
        const weekStart = new Date(monthStart);
        weekStart.setDate(1 + (index * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        const weekTransactions = transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return (
            t.category === categoryName &&
            transactionDate >= weekStart &&
            transactionDate <= weekEnd
          );
        });

        const amount = weekTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        return { label: week, amount };
      });
    } else {
      // Yearly data - show 12 months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const year = referenceDate.getFullYear();
      
      return months.map((month, index) => {
        const monthStart = new Date(year, index, 1);
        const monthEnd = new Date(year, index + 1, 0, 23, 59, 59);
        
        const monthTransactions = transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return (
            t.category === categoryName &&
            transactionDate >= monthStart &&
            transactionDate <= monthEnd
          );
        });

        const amount = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        return { label: month, amount };
      });
    }
  }, [transactions, categoryName, timePeriod, referenceDate]);

  // Calculate dynamic scale based on max value
  const maxAmount = Math.max(...reportData.map(d => d.amount), 1);
  
  // Dynamic Y-axis scale
  const getYAxisScale = (maxVal: number) => {
    if (maxVal <= 1000) return { max: 1000, step: 250, labels: [1000, 750, 500, 250, 0] };
    if (maxVal <= 2000) return { max: 2000, step: 500, labels: [2000, 1500, 1000, 500, 0] };
    if (maxVal <= 3000) return { max: 3000, step: 750, labels: [3000, 2250, 1500, 750, 0] };
    if (maxVal <= 4000) return { max: 4000, step: 1000, labels: [4000, 3000, 2000, 1000, 0] };
    if (maxVal <= 5000) return { max: 5000, step: 1250, labels: [5000, 3750, 2500, 1250, 0] };
    if (maxVal <= 8000) return { max: 8000, step: 2000, labels: [8000, 6000, 4000, 2000, 0] };
    if (maxVal <= 10000) return { max: 10000, step: 2500, labels: [10000, 7500, 5000, 2500, 0] };
    
    // For values above 10000, round up to nearest 5000
    const roundedMax = Math.ceil(maxVal / 5000) * 5000;
    const step = roundedMax / 4;
    return { 
      max: roundedMax, 
      step, 
      labels: [roundedMax, roundedMax * 0.75, roundedMax * 0.5, roundedMax * 0.25, 0] 
    };
  };

  const scale = getYAxisScale(maxAmount);

  // Get report title based on time period
  const getReportTitle = () => {
    if (timePeriod === 'week') return 'Weekly Report';
    if (timePeriod === 'month') return 'Monthly Report';
    return 'Yearly Report';
  };

  // Calculate grid lines based on number of bars
  const gridLineCount = reportData.length;

  return (
    <>
      {/* Report Header */}
      <div className="relative w-full h-[35px] mb-[10px]">
        <div 
          className="absolute inset-0 rounded-[10px] border-2 border-black flex items-center justify-center"
          style={{ backgroundColor: categoryColor }}
        >
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-white text-[16px] tracking-[-0.16px]">
            {getReportTitle()}
          </p>
        </div>
      </div>

      {/* Chart Container */}
      <div className={`relative w-full h-[285px] rounded-[10px] border-2 border-black p-[20px] ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-white'}`}>
        {/* Y-axis labels */}
        <div className="absolute left-[5px] top-[20px] bottom-[35px] flex flex-col justify-between text-right pr-[5px] w-[35px]">
          {scale.labels.map((label, i) => {
            let displayLabel: string;
            if (label >= 1000) {
              const kValue = label / 1000;
              // Show decimal only if it's not a whole number
              displayLabel = kValue % 1 === 0 ? `${kValue}k` : `${kValue.toFixed(1)}k`;
            } else {
              displayLabel = label.toString();
            }
            
            return (
              <p key={i} className={`font-['Inter:Regular',sans-serif] text-[10px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {displayLabel}
              </p>
            );
          })}
        </div>

        {/* Chart area */}
        <div className="absolute left-[45px] top-[20px] right-[20px] bottom-[35px]">
          {/* Grid lines - horizontal */}
          <div className="absolute inset-0 pointer-events-none">
            {[0, 25, 50, 75, 100].map((percent, i) => (
              <div 
                key={i}
                className={`absolute w-full border-t ${isDarkMode ? 'border-[#444444]' : 'border-[#E0E0E0]'}`}
                style={{ top: `${percent}%` }}
              />
            ))}
          </div>

          {/* Grid lines - vertical */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: gridLineCount + 1 }).map((_, i) => (
              <div 
                key={i}
                className={`absolute h-full border-l ${isDarkMode ? 'border-[#444444]' : 'border-[#E0E0E0]'}`}
                style={{ left: `${(i / gridLineCount) * 100}%` }}
              />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-around gap-[4px] px-[8px]">
            {reportData.map((data, index) => {
              // Calculate bar height as percentage of chart area, capped at 100%
              const barHeightPercent = Math.min((data.amount / scale.max) * 100, 100);
              
              return (
                <div 
                  key={data.label}
                  className="relative flex-1 flex flex-col items-center justify-end group"
                  style={{ height: '100%' }}
                >
                  {/* Tooltip */}
                  {data.amount > 0 && (
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      <div className="bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                        ₱{data.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  )}
                  
                  {/* Bar */}
                  <div 
                    className="w-full rounded-t-[6px] transition-all duration-200 hover:brightness-110 bar-animate relative"
                    style={{ 
                      backgroundColor: categoryColor,
                      height: `${barHeightPercent}%`,
                      animationDelay: `${0.4 + index * 0.1}s`,
                      minHeight: data.amount > 0 ? '8px' : '0',
                      border: '2px solid black',
                      borderRightWidth: '4px',
                      borderBottomWidth: '4px'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Highest Expense marker */}
          {maxAmount > 0 && (
            <div 
              className={`absolute right-0 font-['Inter:Regular',sans-serif] text-[10px] flex items-center gap-[5px] highest-marker ${isDarkMode ? 'text-white' : 'text-black'}`}
              style={{ 
                top: `${Math.max(0, 100 - (maxAmount / scale.max * 100))}%`,
                transform: 'translateY(-50%)'
              }}
            >
              <div className={`w-[15px] border-t-2 border-dashed ${isDarkMode ? 'border-white' : 'border-black'}`} />
              <span>Highest Expense</span>
            </div>
          )}
        </div>

        {/* X-axis labels */}
        <div className="absolute left-[45px] right-[20px] bottom-[5px] flex justify-around gap-[4px]">
          {reportData.map((data) => (
            <p 
              key={data.label}
              className={`font-['Inter:Regular',sans-serif] text-[9px] text-center flex-1 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              {data.label}
            </p>
          ))}
        </div>
      </div>

      <style>{`
        .bar-animate {
          animation: barGrow 0.8s ease-out forwards;
          transform-origin: bottom;
          transform: scaleY(0);
        }

        @keyframes barGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        .highest-marker {
          animation: fadeIn 0.5s ease-out 1.2s forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

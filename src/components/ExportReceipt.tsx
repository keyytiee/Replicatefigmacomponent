import svgPaths from "../imports/svg-me7y8go45w";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import type { Transaction, Income, CardBalances } from "../App";
import { useRef } from "react";
import { domToPng } from "modern-screenshot";

interface ExportReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  incomes: Income[];
  cardType: 'bank' | 'cash' | 'savings';
  balance: number;
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

function ReturnButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px] cursor-pointer hover:opacity-70 transition-opacity"
      data-name="Return Button"
    >
      <div className="absolute inset-[0_-8.6%_-2.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
          <g id="Return Button">
            <line id="Line 11" stroke="black" x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
            <line id="Line 12" stroke="black" x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
          </g>
        </svg>
      </div>
    </button>
  );
}

function DownloadButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[71px] top-[833px] cursor-pointer hover:opacity-80 transition-opacity"
      data-name="Download Button"
    >
      <div className="bg-[#e5d0ac] border border-[#303030] border-solid absolute h-[53.541px] left-0 top-0 w-[285px] rounded-[14px] flex items-center justify-center">
        <p className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[20px] text-[#303030] tracking-[-0.2px]">Download</p>
      </div>
    </button>
  );
}

export default function ExportReceipt({ isOpen, onClose, transactions, incomes, cardType, balance }: ExportReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  
  if (!isOpen) return null;

  const cardTitle = cardType === 'bank' ? 'Bank Money' : cardType === 'cash' ? 'Cash Money' : 'Savings Money';

  // Get category icon
  const getCategoryIcon = (category: string, top: number) => {
    const iconTop = top + 15;
    
    switch (category) {
      case 'Transportation':
        return (
          <svg className="block flex-shrink-0" width="17" height="13" fill="none" viewBox="0 0 17 13">
            <path d={svgPaths.pcba8c00} fill="#303030" />
          </svg>
        );
      case 'Food & Grocery':
        return (
          <svg className="block flex-shrink-0" width="18" height="18" fill="none" viewBox="0 0 18 18">
            <path d={svgPaths.p3a9a4d00} fill="#303030" />
          </svg>
        );
      case 'Healthcare':
        return (
          <svg className="block flex-shrink-0" width="16" height="14" fill="none" viewBox="0 0 16 14">
            <path clipRule="evenodd" d={svgPaths.p3e1e6700} fill="#303030" fillRule="evenodd" />
          </svg>
        );
      case 'Education':
        return (
          <svg className="block flex-shrink-0" width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path d={svgPaths.p127d230} fill="#303030" />
          </svg>
        );
      case 'Utilities':
        return (
          <svg className="block flex-shrink-0" width="12" height="14" fill="none" viewBox="0 0 12 14">
            <g>
              <path d={svgPaths.p3de7ca80} fill="#303030" fillOpacity="0.09" />
              <path d={svgPaths.pdff1a00} stroke="#303030" />
            </g>
          </svg>
        );
      case 'Leisure':
        return (
          <svg className="block flex-shrink-0" width="18" height="13" fill="none" viewBox="0 0 18 13">
            <path d={svgPaths.p36862000} fill="black" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Get income icon
  const getIncomeIcon = () => {
    return (
      <svg className="block flex-shrink-0" width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path d="M8 2L8 14M8 2L5 5M8 2L11 5" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const handleDownload = () => {
    // Helper function to truncate and pad strings
    const formatField = (text: string, maxLength: number = 50): string => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
      }
      return text.padEnd(maxLength);
    };

    // Create a comprehensive text export with all data
    const receiptText = `
┏${'━'.repeat(70)}┓
┃${' '.repeat(70)}┃
┃  ${cardTitle.toUpperCase()}${' '.repeat(68 - cardTitle.length)}┃
┃${' '.repeat(70)}┃
┗${'━'.repeat(70)}┛

╔═══════════════════════════════════════════════════════════════════════╗
║                          ACCOUNT SUMMARY                              ║
╚═══════════════════════════════════════════════════════════════════════╝

  Current Balance: ₱${balance.toFixed(2)}
  Account Type:    ${cardTitle}
  Export Date:     ${new Date().toLocaleString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })}

╔═══════════════════════════════════════════════════════════════════════╗
║                      TRANSACTION HISTORY (${transactions.length} records)${' '.repeat(Math.max(0, 21 - transactions.length.toString().length))}║
╚═══════════════════════════════════════════════════════════════════════╝

${transactions.length === 0 ? '  No transactions found.\n' : transactions.map((t, index) => `
┌─────────────────────────────────────────────────────────────────────┐
│ Transaction #${(index + 1).toString().padEnd(3)} ${' '.repeat(52)}│
├─────────────────────────────────────────────────────────────────────┤
│  Category:        ${formatField(t.category)}│
│  Title:           ${formatField(t.title)}│
│  Description:     ${formatField(t.description)}│
│  Amount:          -₱${t.amount.toFixed(2).padEnd(47)}│
│  Date:            ${formatField(t.date)}│
│  Time:            ${formatField(t.time)}│
│  Account:         ${t.cardType.toUpperCase().padEnd(50)}│
${t.attachedImage ? '│  Attachment:      YES' + ' '.repeat(48) + '│\n' : ''}└─────────────────────────────────────────────────────────────────────┘
`).join('\n')}

╔═══════════════════════════════════════════════════════════════════════╗
║                        INCOME HISTORY (${incomes.length} records)${' '.repeat(Math.max(0, 25 - incomes.length.toString().length))}║
╚═══════════════════════════════════════════════════════════════════════╝

${incomes.length === 0 ? '  No income records found.\n' : incomes.map((inc, index) => `
┌─────────────────────────────────────────────────────────────────────┐
│ Income #${(index + 1).toString().padEnd(3)} ${' '.repeat(56)}│
├─────────────────────────────────────────────────────────────────────┤
│  Title:           ${formatField(inc.title)}│
│  Description:     ${formatField(inc.description)}│
│  Amount:          +₱${inc.amount.toFixed(2).padEnd(47)}│
│  Date:            ${formatField(inc.date)}│
│  Time:            ${formatField(inc.time)}│
│  Account:         ${inc.cardType.toUpperCase().padEnd(50)}│
└─────────────────────────────────────────────────────────────────────┘
`).join('\n')}

╔═══════════════════════════════════════════════════════════════════════╗
║                          FINANCIAL SUMMARY                            ║
╚═══════════════════════════════════════════════════════════════════════╝

  Total Transactions:     ${transactions.length}
  Total Income Records:   ${incomes.length}
  
  Total Expenses:         -₱${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
  Total Income:           +₱${incomes.reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
  
  Current Balance:        ₱${balance.toFixed(2)}

╔═══════════════════════════════════════════════════════════════════════╗
║                       TRANSACTION BREAKDOWN                           ║
╚═══════════════════════════════════════════════════════════════════════╝

${(() => {
  // Group transactions by category
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const categories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  
  if (categories.length === 0) {
    return '  No category data available.\n';
  }
  
  return categories.map(([category, total]) => 
    `  ${formatField(category, 30)} -₱${total.toFixed(2)}`
  ).join('\n');
})()}

${'═'.repeat(73)}

  Generated by: Financial Tracker - Map your money. Master your life.
  File Format:  Plain Text (UTF-8)
  Card Type:    ${cardTitle}

${'═'.repeat(73)}
    `.trim();

    // Create blob and download
    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cardTitle.replace(/\s+/g, '_')}_Export_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = async () => {
    if (receiptRef.current) {
      try {
        const dataUrl = await domToPng(receiptRef.current, {
          scale: 2,
          backgroundColor: '#ffffff',
        });
        
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${cardType}-receipt-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        console.error('Error generating image:', err);
        alert('Image download failed. Please try again.');
      }
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-[80]" data-name="Export Receipt">
      <div className="absolute h-[932px] left-[-3px] opacity-10 top-px w-[431px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      <ReturnButton onClick={onClose} />
      <DownloadButton onClick={handleDownload} />
      
      {/* Scrollable Receipt Preview */}
      <div className="absolute left-[14px] top-[94px] w-[400px] h-[720px] overflow-hidden">
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          {/* Receipt Content */}
          <div 
            ref={receiptRef} 
            className="relative w-[400px] min-h-[720px] pb-[40px]"
            style={{ 
              backgroundColor: '#ffffff',
              color: '#000000',
              isolation: 'isolate'
            }}
          >
            {/* Top zigzag pattern */}
            {[16, 52, 87, 123, 157, 194, 228, 261, 294, 330].map((left, i) => (
              <div key={`top-${i}`} className="absolute h-[26px] top-0" style={{ left: `${left}px`, width: i % 2 === 0 ? '44px' : '42px' }}>
                <div className="absolute bottom-0 left-[6.7%] right-[6.7%] top-0">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${i % 2 === 0 ? '39' : '37'} 20`} >
                    <path d={i % 4 === 0 ? svgPaths.p2accd980 : i % 4 === 1 ? svgPaths.p3c617930 : i % 4 === 2 ? svgPaths.p36b9a900 : svgPaths.p20b04d00} fill="#D9D9D9" />
                  </svg>
                </div>
              </div>
            ))}
            
            {/* Main receipt container - dynamically sized */}
            <div className="absolute bg-[#d9d9d9] left-[16px] top-[26px] w-[350px]" style={{ height: `${Math.max(600, 200 + transactions.length * 59 + incomes.length * 59)}px` }} />
            
            {/* Title */}
            <p 
              className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold leading-[normal] left-[191px] text-[15px] text-[#303030] text-center top-[50px] tracking-[-0.15px] translate-x-[-50%]"
              style={{ backgroundColor: 'transparent' }}
            >
              {cardTitle}
            </p>
            
            {/* Current Balance */}
            <div className="absolute left-[37px] top-[75px]" style={{ backgroundColor: 'transparent' }}>
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[12px] text-[#303030] tracking-[-0.12px]" style={{ backgroundColor: 'transparent' }}>Current Balance</p>
              <p className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[20px] text-[#303030] tracking-[-0.2px]" style={{ backgroundColor: 'transparent' }}>₱{balance.toFixed(2)}</p>
            </div>
            
            {/* Transactions Section */}
            <p 
              className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] left-[37px] text-[14px] text-[#303030] top-[130px] tracking-[-0.14px]"
              style={{ backgroundColor: 'transparent' }}
            >
              Transactions ({transactions.length})
            </p>
            
            {/* Divider line */}
            <div className="absolute h-0 left-[37px] top-[122px] w-[291px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291 1">
                  <line id="Line 13" stroke="black" x2="291" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>

            {/* Transaction list - ALL transactions */}
            {transactions.map((transaction, index) => {
              const topPosition = 160 + (index * 59);
              
              return (
                <div key={transaction.id}>
                  {/* Icon background with centered icon */}
                  <div 
                    className="bg-[rgba(48,48,48,0.3)] absolute rounded-[8px] h-[30px] left-[45px] w-[62px] flex items-center justify-center" 
                    style={{ top: `${topPosition}px` }}
                  >
                    {getCategoryIcon(transaction.category, topPosition)}
                  </div>
                  
                  {/* Category name */}
                  <p 
                    className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] left-[118px] text-[11px] text-black tracking-[-0.11px] w-[90px] overflow-hidden text-ellipsis whitespace-nowrap" 
                    style={{ top: `${topPosition + 3}px`, backgroundColor: 'transparent' }}
                  >
                    {transaction.category}
                  </p>
                  
                  {/* Price */}
                  <p 
                    className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] text-[12px] text-black tracking-[-0.12px] text-right" 
                    style={{ top: `${topPosition + 3}px`, left: '240px', width: '88px', backgroundColor: 'transparent' }}
                  >
                    -₱{transaction.amount.toFixed(2)}
                  </p>
                  
                  {/* Date and time */}
                  <p 
                    className="absolute font-['Inter:Regular',sans-serif] leading-[normal] left-[118px] text-[8px] text-black tracking-[-0.08px] whitespace-nowrap" 
                    style={{ top: `${topPosition + 17}px`, backgroundColor: 'transparent' }}
                  >
                    {transaction.date} | {transaction.time}
                  </p>
                </div>
              );
            })}
            
            {/* Incomes Section */}
            <p 
              className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] left-[37px] text-[14px] text-[#303030] tracking-[-0.14px]"
              style={{ top: `${190 + transactions.length * 59}px`, backgroundColor: 'transparent' }}
            >
              Incomes ({incomes.length})
            </p>
            
            {/* Divider line */}
            <div className="absolute h-0 left-[37px] w-[291px]" style={{ top: `${182 + transactions.length * 59}px` }}>
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291 1">
                  <line stroke="black" x2="291" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>

            {/* Income list - ALL incomes */}
            {incomes.map((income, index) => {
              const topPosition = 220 + transactions.length * 59 + (index * 59);
              
              return (
                <div key={income.id}>
                  {/* Icon background with income icon */}
                  <div 
                    className="bg-[rgba(48,48,48,0.3)] absolute rounded-[8px] h-[30px] left-[45px] w-[62px] flex items-center justify-center" 
                    style={{ top: `${topPosition}px` }}
                  >
                    {getIncomeIcon()}
                  </div>
                  
                  {/* Income title */}
                  <p 
                    className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] left-[118px] text-[11px] text-black tracking-[-0.11px] w-[90px] overflow-hidden text-ellipsis whitespace-nowrap" 
                    style={{ top: `${topPosition + 3}px`, backgroundColor: 'transparent' }}
                  >
                    {income.title}
                  </p>
                  
                  {/* Amount */}
                  <p 
                    className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] text-[12px] text-black tracking-[-0.12px] text-right" 
                    style={{ top: `${topPosition + 3}px`, left: '240px', width: '88px', backgroundColor: 'transparent' }}
                  >
                    +₱{income.amount.toFixed(2)}
                  </p>
                  
                  {/* Date and time */}
                  <p 
                    className="absolute font-['Inter:Regular',sans-serif] leading-[normal] left-[118px] text-[8px] text-black tracking-[-0.08px] whitespace-nowrap" 
                    style={{ top: `${topPosition + 17}px`, backgroundColor: 'transparent' }}
                  >
                    {income.date} | {income.time}
                  </p>
                </div>
              );
            })}
            
            {/* Bottom zigzag pattern - positioned at the bottom */}
            {[16, 52, 87, 123, 157, 194, 228, 261, 294, 330].map((left, i) => (
              <div key={`bottom-${i}`} className="absolute h-[26px]" style={{ left: `${left}px`, top: `${Math.max(600, 200 + transactions.length * 59 + incomes.length * 59) + 26}px`, width: i % 2 === 0 ? '44px' : '42px' }}>
                <div className="absolute bottom-0 left-[6.7%] right-[6.7%] top-0" style={{ transform: 'scaleY(-1)' }}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${i % 2 === 0 ? '39' : '37'} 20`} >
                    <path d={i % 4 === 0 ? svgPaths.p2accd980 : i % 4 === 1 ? svgPaths.p3c617930 : i % 4 === 2 ? svgPaths.p36b9a900 : svgPaths.p20b04d00} fill="#D9D9D9" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
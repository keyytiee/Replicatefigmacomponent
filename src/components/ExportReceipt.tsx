import svgPaths from "../imports/svg-me7y8go45w";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import type { Transaction } from "../App";

interface ExportReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  cardType: 'bank' | 'cash' | 'savings';
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
      <div className="bg-[#e5d0ac] border border-[#303030] border-solid absolute h-[53.541px] left-0 top-0 w-[285px] rounded-[14px]" />
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] left-[71.5px] text-[20px] text-[#303030] text-center top-[12px] tracking-[-0.2px] translate-x-[-50%] w-[148.073px]">Download</p>
    </button>
  );
}

export default function ExportReceipt({ isOpen, onClose, transactions, cardType }: ExportReceiptProps) {
  if (!isOpen) return null;

  const cardTitle = cardType === 'bank' ? 'Bank Money' : cardType === 'cash' ? 'Cash Money' : 'Savings Money';

  // Get category icon
  const getCategoryIcon = (category: string, top: number) => {
    const iconTop = top + 8;
    const iconLeft = 85;
    
    switch (category) {
      case 'Transportation':
        return (
          <div className="absolute w-[17px] h-[13px]" style={{ left: `${iconLeft}px`, top: `${iconTop}px` }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 13">
              <path d={svgPaths.pcba8c00} fill="#303030" />
            </svg>
          </div>
        );
      case 'Food & Grocery':
        return (
          <div className="absolute w-[18px] h-[18px]" style={{ left: `${iconLeft - 1}px`, top: `${iconTop - 2}px` }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p3a9a4d00} fill="#303030" />
            </svg>
          </div>
        );
      case 'Healthcare':
        return (
          <div className="absolute w-[16px] h-[14px]" style={{ left: `${iconLeft}px`, top: `${iconTop}px` }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path clipRule="evenodd" d={svgPaths.p3e1e6700} fill="#303030" fillRule="evenodd" />
            </svg>
          </div>
        );
      case 'Education':
        return (
          <div className="absolute w-[16px] h-[16px]" style={{ left: `${iconLeft}px`, top: `${iconTop - 1}px` }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p127d230} fill="#303030" />
            </svg>
          </div>
        );
      case 'Utilities':
        return (
          <div className="absolute w-[12px] h-[14px]" style={{ left: `${iconLeft + 3}px`, top: `${iconTop}px` }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
              <g>
                <path d={svgPaths.p3de7ca80} fill="#303030" fillOpacity="0.09" />
                <path d={svgPaths.pdff1a00} stroke="#303030" />
              </g>
            </svg>
          </div>
        );
      case 'Leisure':
        return (
          <div className="absolute w-[18px] h-[13px]" style={{ left: `${iconLeft - 1}px`, top: `${iconTop}px` }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 13">
              <path d={svgPaths.p36862000} fill="black" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const handleDownload = () => {
    // Create a simple text receipt
    const receiptText = `
${cardTitle.toUpperCase()}
${'='.repeat(40)}

Activity
${'-'.repeat(40)}

${transactions.map(t => `
${t.category}
${new Date(t.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | ${t.time}
-P${t.amount}
`).join('\n')}

${'='.repeat(40)}
Generated on ${new Date().toLocaleDateString()}
    `.trim();

    // Create blob and download
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cardType}-transactions-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute inset-0 bg-white z-[80]" data-name="Export Receipt">
      <div className="absolute h-[932px] left-[-3px] opacity-10 top-px w-[431px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      <ReturnButton onClick={onClose} />
      <DownloadButton onClick={handleDownload} />
      
      {/* Main receipt container */}
      <div className="absolute bg-[#d9d9d9] h-[508px] left-[40px] top-[158px] w-[350px]" />
      
      {/* Title */}
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[15px] text-[#303030] text-center top-[182px] tracking-[-0.15px] translate-x-[-50%] w-[171px]">{cardTitle}</p>
      
      {/* Activity label */}
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[21px] leading-[normal] left-[61px] text-[16px] text-[#303030] top-[231px] tracking-[-0.16px] w-[94px]">Activity</p>
      
      {/* Divider line */}
      <div className="absolute h-0 left-[61px] top-[223px] w-[291px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291 1">
            <line id="Line 13" stroke="black" x2="291" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>

      {/* Transaction list */}
      {transactions.slice(0, 6).map((transaction, index) => {
        const topPosition = 268 + (index * 59);
        
        return (
          <div key={transaction.id}>
            {/* Icon background */}
            <div className={`bg-[rgba(48,48,48,0.3)] absolute rounded-[8px] h-[30px] left-[69px] top-[${topPosition}px] w-[62px]`} style={{ top: `${topPosition}px` }} />
            
            {/* Category icon - simplified for now */}
            {getCategoryIcon(transaction.category, topPosition)}
            
            {/* Category name */}
            <p className={`absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium h-[15px] leading-[normal] left-[142px] text-[12px] text-black top-[${topPosition}px] tracking-[-0.12px] w-[147px]`} style={{ top: `${topPosition}px` }}>
              {transaction.category}
            </p>
            
            {/* Amount */}
            <p className={`absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] text-[16px] text-black top-[${topPosition + 4}px] tracking-[-0.16px] text-right`} style={{ top: `${topPosition + 4}px`, right: '33px' }}>
              -P{transaction.amount}
            </p>
            
            {/* Date and time */}
            <p className={`absolute font-['Inter:Regular',sans-serif] h-[15px] leading-[normal] left-[142px] text-[10px] text-black top-[${topPosition + 21}px] tracking-[-0.1px] w-[155px]`} style={{ top: `${topPosition + 21}px` }}>
              {new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | {transaction.time}
            </p>
          </div>
        );
      })}

      {/* Top zigzag pattern */}
      {[37, 73, 108, 144, 178, 215, 249, 282, 315, 351].map((left, i) => (
        <div key={`top-${i}`} className="absolute h-[26px] top-[139px]" style={{ left: `${left}px`, width: i % 2 === 0 ? '44px' : '42px' }}>
          <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${i % 2 === 0 ? '39' : '37'} 20`}>
              <path d={i % 4 === 0 ? svgPaths.p2accd980 : i % 4 === 1 ? svgPaths.p3c617930 : i % 4 === 2 ? svgPaths.p36b9a900 : svgPaths.p20b04d00} fill="#D9D9D9" />
            </svg>
          </div>
        </div>
      ))}

      {/* Bottom zigzag pattern */}
      {[37, 73, 108, 144, 178, 215, 249, 282, 315, 351].map((left, i) => (
        <div key={`bottom-${i}`} className="absolute h-[34px] top-[657px]" style={{ left: `${left}px`, width: i % 2 === 0 ? '44px' : '42px' }}>
          <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${i % 2 === 0 ? '39' : '37'} ${i < 2 ? '26' : '25'}`}>
              <path d={i % 4 === 0 ? svgPaths.p7d2e300 : i % 4 === 1 ? svgPaths.p2d90ac00 : i % 4 === 2 ? svgPaths.p11121e00 : svgPaths.p2bacd600} fill="#D9D9D9" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
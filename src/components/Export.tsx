import svgPaths from "../imports/svg-hlhubp1lfw";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import type { Transaction } from "../App";
import { useState } from "react";
import ExportReceipt from "./ExportReceipt";

interface ExportProps {
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

export default function Export({ isOpen, onClose, transactions, cardType }: ExportProps) {
  const [isReceiptOpen, setReceiptOpen] = useState(false);
  
  if (!isOpen) return null;

  const cardTypeLabel = cardType === 'bank' ? 'Bank Money' : cardType === 'cash' ? 'Cash Money' : 'Savings Money';
  
  // Filter transactions by card type
  const filteredTransactions = transactions.filter(t => t.cardType === cardType);

  return (
    <>
      <div className="absolute inset-0 bg-white z-[70]" data-name="Export">
        <div className="absolute h-[932px] left-0 opacity-10 top-[-5px] w-[431px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        <ReturnButton onClick={onClose} />
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[#303030] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[171px]">{cardTypeLabel}</p>
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[36px] text-[#303030] text-[16px] top-[122px] tracking-[-0.16px] w-[90px]">Activity</p>
        <div className="absolute h-0 left-[36px] top-[111px] w-[356px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356 1">
              <line id="Line 13" stroke="black" x2="356" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        
        {/* Scrollable Transactions List */}
        <div className="absolute left-0 top-[153px] w-[428px] h-[665px] overflow-hidden">
          <div className="relative w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide pb-[20px]">
            {filteredTransactions.map((transaction, index) => (
              <TransactionRow key={transaction.id} transaction={transaction} top={index * 70} />
            ))}
          </div>
        </div>
        
        <ExportButton onClick={() => setReceiptOpen(true)} />
      </div>
      
      <ExportReceipt 
        isOpen={isReceiptOpen} 
        onClose={() => setReceiptOpen(false)} 
        transactions={filteredTransactions}
        cardType={cardType}
      />
    </>
  );
}
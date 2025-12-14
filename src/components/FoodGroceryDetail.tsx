import imgCatShopping from "figma:asset/0cce95144bde7a5f521516da910bd4d7a3c7c1a1.png";
import WeeklyReport from "./WeeklyReport";
import type { Transaction } from "../App";

type TimePeriod = 'week' | 'month' | 'year';

interface FoodGroceryDetailProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  transactions: Transaction[];
  timePeriod?: TimePeriod;
  referenceDate?: Date;
}

export default function FoodGroceryDetail({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  transactions,
  timePeriod = 'week',
  referenceDate = new Date()
}: FoodGroceryDetailProps) {
  if (!isOpen) return null;

  return (
    <div 
      className={`absolute inset-0 z-[80] transition-colors duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
      style={{
        animation: 'slideInFromRight 0.4s ease-out forwards'
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Close button (back arrow) */}
      <button 
        onClick={onClose}
        className="absolute left-[35px] top-[53px] w-[9px] h-[22px] cursor-pointer hover:opacity-70 transition-opacity z-10"
      >
        <svg className="block size-full" fill="none" viewBox="0 0 10 23">
          <line stroke={isDarkMode ? '#FFFFFF' : 'black'} x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
          <line stroke={isDarkMode ? '#FFFFFF' : 'black'} x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
        </svg>
      </button>

      {/* Title */}
      <h1 
        className={`absolute left-1/2 -translate-x-1/2 top-[49px] font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[20px] tracking-[-0.2px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}
        style={{
          animation: 'fadeInDown 0.5s ease-out 0.1s forwards',
          opacity: 0
        }}
      >
        Food & Grocery
      </h1>

      {/* Cat Shopping Image Card */}
      <div 
        className="absolute left-[27px] top-[93px] w-[374px] h-[308px]"
        style={{
          animation: 'scaleIn 0.6s ease-out 0.2s forwards',
          opacity: 0,
          transform: 'scale(0.8)'
        }}
      >
        <div className="relative w-full h-full rounded-[20px] border-4 border-black shadow-[8px_8px_0px_0px_#000000] overflow-hidden bg-white">
          <img 
            src={imgCatShopping} 
            alt="Cat shopping in grocery store" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Weekly Report Section */}
      <div 
        className="absolute left-[10px] top-[420px] w-[408px]"
        style={{
          animation: 'slideUp 0.6s ease-out 0.3s forwards',
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        <WeeklyReport 
          transactions={transactions}
          categoryName="Food & Grocery"
          categoryColor="#8BAA4E"
          isDarkMode={isDarkMode}
          timePeriod={timePeriod}
          referenceDate={referenceDate}
        />
      </div>

      {/* Recent Achievements Section */}
      <div 
        className="absolute left-[10px] top-[745px] w-[408px]"
        style={{
          animation: 'slideUp 0.6s ease-out 0.5s forwards',
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        {/* Header */}
        <div className="relative w-full h-[35px] mb-[15px]">
          <div className="absolute inset-0 bg-[#8BAA4E] rounded-[10px] border-2 border-black flex items-center justify-center">
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-white text-[16px] tracking-[-0.16px]">
              Recent Achievements
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="flex justify-around items-center px-[20px]">
          {/* Smart Shopper */}
          <div 
            className="flex flex-col items-center gap-[8px]"
            style={{
              animation: 'popIn 0.5s ease-out 0.8s forwards',
              opacity: 0,
              transform: 'scale(0.5)'
            }}
          >
            <div className="w-[80px] h-[80px] rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
              <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#E8C85E] to-[#8BAA4E] flex items-center justify-center">
                <span className="text-[40px]">🛍️</span>
              </div>
            </div>
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[12px] text-black">Smart Shopper</p>
          </div>

          {/* Meal Prep Pro */}
          <div 
            className="flex flex-col items-center gap-[8px]"
            style={{
              animation: 'popIn 0.5s ease-out 0.9s forwards',
              opacity: 0,
              transform: 'scale(0.5)'
            }}
          >
            <div className="w-[80px] h-[80px] rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
              <div className="w-[60px] h-[60px] rounded-full bg-[#353B48] flex items-center justify-center">
                <span className="text-[40px]">🍜</span>
              </div>
            </div>
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[12px] text-black">Meal Prep Pro</p>
          </div>

          {/* Weekly Feast */}
          <div 
            className="flex flex-col items-center gap-[8px]"
            style={{
              animation: 'popIn 0.5s ease-out 1.0s forwards',
              opacity: 0,
              transform: 'scale(0.5)'
            }}
          >
            <div className="w-[80px] h-[80px] rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
              <div className="w-[60px] h-[60px] rounded-full bg-[#B45C4C] flex items-center justify-center">
                <span className="text-[40px]">🍽️</span>
              </div>
            </div>
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[12px] text-black">Weekly Feast</p>
          </div>

          {/* Locked */}
          <div 
            className="flex flex-col items-center gap-[8px]"
            style={{
              animation: 'popIn 0.5s ease-out 1.1s forwards',
              opacity: 0,
              transform: 'scale(0.5)'
            }}
          >
            <div className="w-[80px] h-[80px] rounded-full border-4 border-black bg-[#D9D9D9] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
              <span className="text-[40px]">🔒</span>
            </div>
            <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[12px] text-[#888888]">Locked</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes barGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
    </div>
  );
}
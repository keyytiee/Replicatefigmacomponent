import svgPaths from "../imports/svg-7xps7bhzz9";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import { useState, useEffect } from "react";
import NavigationSidebar from "./NavigationSidebar";
import { Check } from "lucide-react";
import type { Income } from "../App";

interface IncomeSearchFilterProps {
  isOpen: boolean;
  onClose: (cardTypes: string[]) => void;
  selectedCardTypes: string[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  incomes: Income[];
  onIncomeClick: (income: Income) => void;
  isDarkMode?: boolean;
}

function Sidebar({ onClick, isDarkMode }: { onClick: () => void; isDarkMode?: boolean }) {
  const fillColor = isDarkMode ? '#FFFFFF' : '#303030';
  const strokeColor = isDarkMode ? '#FFFFFF' : '#303030';
  const polygonFill = isDarkMode ? '#FFFFFF' : '#D9D9D9';
  
  return (
    <div 
      className="absolute h-[133px] left-[420px] top-[314px] w-[21px] cursor-pointer hover:opacity-80 transition-opacity z-30" 
      data-name="Sidebar"
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 133">
        <g id="Sidebar">
          <rect fill={fillColor} height="26" id="Rectangle 59" rx="6.5" stroke={strokeColor} width="20" x="0.5" y="54.5" />
          <line id="Line 10" stroke={strokeColor} strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p25a9b40} fill={polygonFill} id="Polygon 1" stroke={strokeColor} />
        </g>
      </svg>
    </div>
  );
}

function SearchBar({ value, onChange, onFilterClick, isDarkMode }: { value: string; onChange: (value: string) => void; onFilterClick: () => void; isDarkMode?: boolean }) {
  return (
    <div className="absolute left-[15px] top-[49px]" data-name="Search Incomes">
      <div className={`absolute h-[44px] left-0 rounded-[12px] top-0 w-[397px] ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-[#d9d9d9]'}`} />
      <div className="absolute h-[18px] left-[27px] top-[13px] w-[18px] pointer-events-none" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3568180} fill={isDarkMode ? '#FFFFFF' : '#303030'} fillOpacity="0.75" id="Vector" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search incomes"
        className={`absolute font-['Plus_Jakarta_Sans'] font-bold h-[21px] leading-[normal] left-[47px] text-[14px] top-[11px] tracking-[-0.14px] w-[290px] bg-transparent border-none outline-none ${
          isDarkMode 
            ? 'text-white placeholder:text-white/75' 
            : 'text-[rgba(48,48,48,0.75)] placeholder:text-[rgba(48,48,48,0.75)]'
        }`}
      />
      <button 
        className="absolute left-[363px] size-[23px] top-[10px] cursor-pointer hover:opacity-70 transition-opacity"
        onClick={onFilterClick}
        data-name="stash:filter"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <g id="stash:filter">
            <path d={svgPaths.p39941b80} fill={isDarkMode ? '#FFFFFF' : '#303030'} fillOpacity="0.75" id="Vector" />
          </g>
        </svg>
      </button>
    </div>
  );
}

function BankMoneyCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[15px] top-[122px] cursor-pointer" data-name="Bank Money Category" onClick={onClick}>
      <div className={`relative bg-[#6e86a9] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[24px] flex-shrink-0" data-name="bank-icon">
          <svg className="block size-full" fill="none" viewBox="0 0 24 24">
            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="black"/>
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Bank Money</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function CashMoneyCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[217px] top-[122px] cursor-pointer" data-name="Cash Money Category" onClick={onClick}>
      <div className={`relative bg-[#8baa4e] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[24px] flex-shrink-0" data-name="cash-icon">
          <svg className="block size-full" fill="none" viewBox="0 0 24 24">
            <path d="M5 8H19C20.1046 8 21 8.89543 21 10V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V10C3 8.89543 3.89543 8 5 8ZM12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16ZM7 4H17V6H7V4Z" fill="black"/>
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Cash Money</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function SavingsMoneyCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[15px] top-[177px] cursor-pointer" data-name="Savings Money Category" onClick={onClick}>
      <div className={`relative bg-[#e8c85e] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[24px] flex-shrink-0" data-name="savings-icon">
          <svg className="block size-full" fill="none" viewBox="0 0 24 24">
            <path d="M15.5 1H8.5L7 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H17L15.5 1ZM12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 15.76 14.76 18 12 18ZM12 10C10.35 10 9 11.35 9 13C9 14.65 10.35 16 12 16C13.65 16 15 14.65 15 13C15 11.35 13.65 10 12 10Z" fill="black"/>
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Savings Money</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

export default function IncomeSearchFilter({ isOpen, onClose, selectedCardTypes, searchValue, onSearchChange, incomes, onIncomeClick, isDarkMode }: IncomeSearchFilterProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [localSelectedCardTypes, setLocalSelectedCardTypes] = useState<string[]>(selectedCardTypes);

  useEffect(() => {
    setLocalSelectedCardTypes(selectedCardTypes);
  }, [selectedCardTypes]);

  if (!isOpen) return null;

  const toggleCardType = (cardType: string) => {
    setLocalSelectedCardTypes(prev => {
      if (prev.includes(cardType)) {
        return prev.filter(c => c !== cardType);
      } else {
        return [...prev, cardType];
      }
    });
  };

  const handleFilterClick = () => {
    onClose(localSelectedCardTypes);
  };

  // Filter incomes based on search value and selected card types
  const filteredIncomes = searchValue.trim() === ""
    ? [] 
    : incomes.filter((income) => {
        const searchLower = searchValue.toLowerCase();
        const matchesSearch = (
          income.title.toLowerCase().includes(searchLower) ||
          income.description.toLowerCase().includes(searchLower) ||
          income.amount.toString().includes(searchLower) ||
          income.cardType.toLowerCase().includes(searchLower) ||
          "income".includes(searchLower)
        );
        
        // If no card types selected, show all matching search results
        if (localSelectedCardTypes.length === 0) return matchesSearch;
        
        // Otherwise, filter by selected card types
        return matchesSearch && localSelectedCardTypes.includes(income.cardType);
      });

  const showResults = searchValue.trim() !== "";

  return (
    <>
      <div className={`absolute inset-0 z-[90] transition-colors duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`} data-name="Income Search Filter">
        <div className="absolute h-[932px] left-0 opacity-10 top-0 w-[431px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        
        <SearchBar value={searchValue} onChange={onSearchChange} onFilterClick={handleFilterClick} isDarkMode={isDarkMode} />
        
        <p className={`absolute font-['Plus_Jakarta_Sans'] font-bold h-[21px] leading-[normal] left-[47px] text-[12px] top-[105px] tracking-[-0.12px] w-[49px] ${isDarkMode ? 'text-white/75' : 'text-[rgba(48,48,48,0.75)]'}`}>Filter</p>
        
        <BankMoneyCategory isSelected={localSelectedCardTypes.includes("bank")} onClick={() => toggleCardType("bank")} />
        <CashMoneyCategory isSelected={localSelectedCardTypes.includes("cash")} onClick={() => toggleCardType("cash")} />
        <SavingsMoneyCategory isSelected={localSelectedCardTypes.includes("savings")} onClick={() => toggleCardType("savings")} />
        
        {/* Search Results */}
        {showResults && (
          <div className="absolute left-[15px] right-[15px] top-[235px] bottom-[20px] overflow-y-auto z-20">
            {filteredIncomes.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-[50px]">
                <p className={`font-['Plus_Jakarta_Sans'] font-semibold text-[16px] text-center ${isDarkMode ? 'text-white/50' : 'text-[rgba(48,48,48,0.5)]'}`}>No incomes found</p>
                <p className={`font-['Plus_Jakarta_Sans'] text-[13px] text-center mt-2 ${isDarkMode ? 'text-white/40' : 'text-[rgba(48,48,48,0.4)]'}`}>Try a different search term or adjust filters</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className={`font-['Plus_Jakarta_Sans'] font-semibold text-[14px] mb-3 ${isDarkMode ? 'text-white/75' : 'text-[rgba(48,48,48,0.75)]'}`}>
                  {filteredIncomes.length} {filteredIncomes.length === 1 ? 'result' : 'results'} found
                </p>
                {filteredIncomes.map((income) => {
                  return (
                    <div
                      key={income.id}
                      className={`border-2 border-black rounded-[12px] p-3 shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-white'}`}
                      onClick={() => onIncomeClick(income)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className={`font-['Plus_Jakarta_Sans'] font-bold text-[15px] mb-1 ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>
                            {income.title}
                          </h3>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[12px] mb-2 ${isDarkMode ? 'text-white/70' : 'text-[rgba(48,48,48,0.7)]'}`}>
                            {income.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 bg-gray-200 rounded-[6px] border border-black">
                              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[9px] text-black uppercase">
                                {income.cardType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-3">
                          <p className={`font-['Plus_Jakarta_Sans'] font-extrabold text-[16px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>
                            +₱{income.amount.toFixed(2)}
                          </p>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[10px] mt-1 ${isDarkMode ? 'text-white/60' : 'text-[rgba(48,48,48,0.6)]'}`}>
                            {income.date}
                          </p>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[9px] ${isDarkMode ? 'text-white/50' : 'text-[rgba(48,48,48,0.5)]'}`}>
                            {income.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        
        <Sidebar onClick={() => setSidebarOpen(true)} isDarkMode={isDarkMode} />
      </div>

      <NavigationSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onHomeClick={() => {}}
        onSettingsClick={() => {}}
        onExportClick={() => {}}
        onAnalyticsClick={() => {}}
        onSearchClick={() => {}}
        isDarkMode={isDarkMode}
      />
    </>
  );
}
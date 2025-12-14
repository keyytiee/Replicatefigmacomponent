import svgPaths from "../imports/svg-0aesjwf68r";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import { useState, useEffect } from "react";
import NavigationSidebar from "./NavigationSidebar";
import { Check } from "lucide-react";
import type { Transaction } from "../App";

interface SearchFilterProps {
  isOpen: boolean;
  onClose: (selectedCategories: string[]) => void;
  selectedCategories: string[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
  isDarkMode?: boolean;
}

function SearchTransactions({ value, onChange, onFilterClick, isDarkMode }: { value: string; onChange: (value: string) => void; onFilterClick: () => void; isDarkMode?: boolean }) {
  return (
    <div className="absolute contents left-[15px] top-[24px]" data-name="Search Transactions">
      <div className={`absolute h-[44px] left-[15px] rounded-[12px] top-[24px] w-[397px] ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-[#d9d9d9]'}`} />
      <div className="absolute h-[18px] left-[42px] top-[37px] w-[18px] pointer-events-none" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3568180} fill={isDarkMode ? '#FFFFFF' : '#303030'} fillOpacity="0.75" id="Vector" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search transactions"
        className={`absolute font-['Plus_Jakarta_Sans'] font-bold h-[21px] leading-[normal] left-[62px] text-[14px] top-[35px] tracking-[-0.14px] w-[290px] bg-transparent border-none outline-none ${
          isDarkMode 
            ? 'text-white placeholder:text-white/75' 
            : 'text-[rgba(48,48,48,0.75)] placeholder:text-[rgba(48,48,48,0.75)]'
        }`}
      />
      <button 
        className="absolute left-[378px] size-[23px] top-[34px] cursor-pointer hover:opacity-70 transition-opacity z-10"
        onClick={onFilterClick}
        data-name="stash:filter"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <g id="stash:filter">
            <path d={svgPaths.p1b112c80} fill={isDarkMode ? '#FFFFFF' : '#303030'} fillOpacity="0.75" id="Vector" />
          </g>
        </svg>
      </button>
    </div>
  );
}

function Sidebar({ onClick, isDarkMode }: { onClick: () => void; isDarkMode?: boolean }) {
  const fillColor = isDarkMode ? '#FFFFFF' : '#303030';
  const strokeColor = isDarkMode ? '#FFFFFF' : '#303030';
  const polygonFill = isDarkMode ? '#FFFFFF' : '#D9D9D9';
  
  return (
    <div 
      className="absolute h-[133px] left-[420px] top-[314px] w-[21px] cursor-pointer hover:opacity-80 transition-opacity" 
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

function LeisureCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[212px] top-[220px] cursor-pointer" data-name="Leisure Category" onClick={onClick}>
      <div className={`relative bg-[#e8c85e] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[20px] flex-shrink-0" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p10e0fd80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Leisure</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function TransportationCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[212px] top-[114px] cursor-pointer" data-name="Transportation Category" onClick={onClick}>
      <div className={`relative bg-[#6e86a9] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[20px] flex-shrink-0" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
            <path d={svgPaths.p133d6180} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Transportation</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function FoodGroceryCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[15px] top-[114px] cursor-pointer" data-name="Food & Grocery Category" onClick={onClick}>
      <div className={`relative bg-[#8baa4e] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[22px] flex-shrink-0" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p3025aa80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">{`Food & Grocery`}</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function HealthcareCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[15px] top-[218px] cursor-pointer" data-name="Healthcare Category" onClick={onClick}>
      <div className={`relative bg-[#b45c4c] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[20px] flex-shrink-0" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 17">
            <path clipRule="evenodd" d={svgPaths.p2df08180} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Healthcare</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function EducationCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[15px] top-[273px] cursor-pointer" data-name="Education Category" onClick={onClick}>
      <div className={`relative bg-[#75689c] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[24px] flex-shrink-0" data-name="tdesign:education-filled">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="tdesign:education-filled">
              <path d={svgPaths.p1a7bff00} fill="var(--fill-0, black)" id="Vector" />
              <path d={svgPaths.p252e3900} fill="var(--fill-0, black)" id="Vector_2" />
            </g>
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Education</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function BillsCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[15px] top-[166px] cursor-pointer" data-name="Bills Category" onClick={onClick}>
      <div className={`relative bg-[#d99c42] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[24px] flex-shrink-0" data-name="bills-icon">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="black" strokeWidth="1.5" fill="none"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="black" strokeWidth="1.5"/>
              <line x1="3" y1="14" x2="21" y2="14" stroke="black" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="1.5" fill="black"/>
            </g>
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Bills</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function MiscellaneousCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[212px] top-[273px] cursor-pointer" data-name="Miscellaneous Category" onClick={onClick}>
      <div className={`relative bg-[#b5afa8] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[190px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[24px] flex-shrink-0" data-name="eos-icons:miscellaneous">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="eos-icons:miscellaneous">
              <path d={svgPaths.p4bcebf2} fill="var(--fill-0, black)" id="Vector" />
            </g>
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Miscellaneous</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

function UtilitiesCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute left-[212px] top-[165px] cursor-pointer" data-name="Utilities Category" onClick={onClick}>
      <div className={`relative bg-[#4a506f] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-solid border-black'} h-[41px] rounded-[12px] shadow-[4px_4px_0px_0px_black] w-[192px] hover:opacity-90 transition-all flex items-center justify-center gap-2 px-3`}>
        <div className="size-[24px] flex-shrink-0" data-name="streamline-sharp:eco-house-remix">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g clipPath="url(#clip0_utilities)" id="streamline-sharp:eco-house-remix">
              <path clipRule="evenodd" d={svgPaths.p1f791600} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
            </g>
            <defs>
              <clipPath id="clip0_utilities">
                <rect fill="white" height="24" width="24" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[11px] text-black text-center tracking-[-0.11px] whitespace-nowrap">Utilities</p>
        {isSelected && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Check className="size-[16px] text-black" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}

export default function SearchFilter({ isOpen, onClose, selectedCategories, searchValue, onSearchChange, transactions, onTransactionClick, isDarkMode }: SearchFilterProps) {
  const [localSelectedCategories, setLocalSelectedCategories] = useState<string[]>(selectedCategories);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLocalSelectedCategories(selectedCategories);
  }, [selectedCategories]);

  if (!isOpen) return null;

  const toggleCategory = (category: string) => {
    setLocalSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleDone = () => {
    onClose(localSelectedCategories);
  };

  // Category colors mapping
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

  // Filter transactions based on search value and selected categories
  const filteredTransactions = searchValue.trim() === ""
    ? [] 
    : transactions.filter((transaction) => {
        const searchLower = searchValue.toLowerCase();
        const matchesSearch = (
          transaction.title.toLowerCase().includes(searchLower) ||
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower) ||
          transaction.amount.toString().includes(searchLower) ||
          transaction.cardType.toLowerCase().includes(searchLower)
        );
        
        // If no categories selected, show all matching search results
        if (localSelectedCategories.length === 0) return matchesSearch;
        
        // Otherwise, filter by selected categories
        return matchesSearch && localSelectedCategories.includes(transaction.category);
      });

  const showResults = searchValue.trim() !== "";

  return (
    <>
      <div className={`absolute inset-0 z-[90] transition-colors duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`} data-name="Search Filter">
        <div className="absolute h-[932px] left-0 opacity-10 top-0 w-[431px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        <SearchTransactions value={searchValue} onChange={onSearchChange} onFilterClick={handleDone} isDarkMode={isDarkMode} />
        <p className={`absolute font-['Plus_Jakarta_Sans'] font-bold h-[21px] leading-[normal] left-[47px] text-[12px] top-[88px] tracking-[-0.12px] w-[49px] ${isDarkMode ? 'text-white/75' : 'text-[rgba(48,48,48,0.75)]'}`}>Filter</p>
        <Sidebar onClick={() => setSidebarOpen(true)} isDarkMode={isDarkMode} />
        <LeisureCategory isSelected={localSelectedCategories.includes("Leisure")} onClick={() => toggleCategory("Leisure")} />
        <TransportationCategory isSelected={localSelectedCategories.includes("Transportation")} onClick={() => toggleCategory("Transportation")} />
        <FoodGroceryCategory isSelected={localSelectedCategories.includes("Food & Grocery")} onClick={() => toggleCategory("Food & Grocery")} />
        <HealthcareCategory isSelected={localSelectedCategories.includes("Healthcare")} onClick={() => toggleCategory("Healthcare")} />
        <EducationCategory isSelected={localSelectedCategories.includes("Education")} onClick={() => toggleCategory("Education")} />
        <BillsCategory isSelected={localSelectedCategories.includes("Bills")} onClick={() => toggleCategory("Bills")} />
        <MiscellaneousCategory isSelected={localSelectedCategories.includes("Miscellaneous")} onClick={() => toggleCategory("Miscellaneous")} />
        <UtilitiesCategory isSelected={localSelectedCategories.includes("Utilities")} onClick={() => toggleCategory("Utilities")} />
        
        {/* Search Results */}
        {showResults && (
          <div className="absolute left-[15px] right-[15px] top-[330px] bottom-[20px] overflow-y-auto z-20">
            {filteredTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-[50px]">
                <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] text-[rgba(48,48,48,0.5)] text-center">No transactions found</p>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[rgba(48,48,48,0.4)] text-center mt-2">Try a different search term or adjust filters</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[rgba(48,48,48,0.75)] mb-3">
                  {filteredTransactions.length} {filteredTransactions.length === 1 ? 'result' : 'results'} found
                </p>
                {filteredTransactions.map((transaction) => {
                  const categoryColor = categoryColors[transaction.category] || "#b5afa8";
                  return (
                    <div
                      key={transaction.id}
                      className="bg-white border-2 border-black rounded-[12px] p-3 shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                      onClick={() => onTransactionClick(transaction)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#303030] mb-1">
                            {transaction.title}
                          </h3>
                          <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[rgba(48,48,48,0.7)] mb-2">
                            {transaction.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <div
                              className="px-2 py-1 rounded-[8px] border border-black"
                              style={{ backgroundColor: categoryColor }}
                            >
                              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[10px] text-black">
                                {transaction.category}
                              </p>
                            </div>
                            <div className="px-2 py-1 bg-gray-200 rounded-[6px] border border-black">
                              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[9px] text-black uppercase">
                                {transaction.cardType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-3">
                          <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[16px] text-[#303030]">
                            -₱{transaction.amount.toFixed(2)}
                          </p>
                          <p className="font-['Plus_Jakarta_Sans'] text-[10px] text-[rgba(48,48,48,0.6)] mt-1">
                            {transaction.date}
                          </p>
                          <p className="font-['Plus_Jakarta_Sans'] text-[9px] text-[rgba(48,48,48,0.5)]">
                            {transaction.time}
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
      </div>

      <NavigationSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onHomeClick={() => {
          setSidebarOpen(false);
          onClose(localSelectedCategories);
        }}
        onSettingsClick={() => setSidebarOpen(false)}
        onExportClick={() => setSidebarOpen(false)}
        onAnalyticsClick={() => setSidebarOpen(false)}
        onSearchClick={() => setSidebarOpen(false)}
      />
    </>
  );
}
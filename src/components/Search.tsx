import svgPaths from "../imports/svg-7xps7bhzz9";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import { useState } from "react";
import NavigationSidebar from "./NavigationSidebar";
import SearchFilter from "./SearchFilter";
import type { Transaction } from "../App";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsClick?: () => void;
  onExportClick?: () => void;
  onAnalyticsClick?: () => void;
  transactions: Transaction[];
}

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

function Sidebar({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="absolute h-[133px] left-[420px] top-[314px] w-[21px] cursor-pointer hover:opacity-80 transition-opacity z-30" 
      data-name="Sidebar"
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 133">
        <g id="Sidebar">
          <rect fill="var(--fill-0, #303030)" height="26" id="Rectangle 59" rx="6.5" stroke="var(--stroke-0, #303030)" width="20" x="0.5" y="54.5" />
          <line id="Line 10" stroke="var(--stroke-0, #303030)" strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
          <path d={svgPaths.p25a9b40} fill="var(--fill-0, #D9D9D9)" id="Polygon 1" stroke="var(--stroke-0, #303030)" />
        </g>
      </svg>
    </div>
  );
}

function SearchBar({ value, onChange, onFilterClick }: { value: string; onChange: (value: string) => void; onFilterClick: () => void }) {
  return (
    <div className="absolute left-[15px] top-[49px]" data-name="Search Transactions">
      <div className="bg-[#d9d9d9] absolute h-[44px] left-0 rounded-[12px] top-0 w-[397px]" />
      <div className="absolute h-[18px] left-[27px] top-[13px] w-[18px] pointer-events-none" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3568180} fill="var(--fill-0, #303030)" fillOpacity="0.75" id="Vector" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search transactions"
        className="absolute font-['Plus_Jakarta_Sans'] font-bold h-[21px] leading-[normal] left-[47px] text-[14px] text-[rgba(48,48,48,0.75)] placeholder:text-[rgba(48,48,48,0.75)] top-[11px] tracking-[-0.14px] w-[290px] bg-transparent border-none outline-none"
      />
      <button 
        className="absolute left-[363px] size-[23px] top-[10px] cursor-pointer hover:opacity-70 transition-opacity"
        onClick={onFilterClick}
        data-name="stash:filter"
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <g id="stash:filter">
            <path d={svgPaths.p39941b80} fill="var(--fill-0, #303030)" fillOpacity="0.75" id="Vector" />
          </g>
        </svg>
      </button>
    </div>
  );
}

export default function Search({ isOpen, onClose, onSettingsClick, onExportClick, onAnalyticsClick, transactions }: SearchProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  if (!isOpen) return null;

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
        if (selectedCategories.length === 0) return matchesSearch;
        
        // Otherwise, filter by selected categories
        return matchesSearch && selectedCategories.includes(transaction.category);
      });

  const showResults = searchValue.trim() !== "";

  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = (categories: string[]) => {
    setSelectedCategories(categories);
    setFilterOpen(false);
  };

  return (
    <>
      <div className="bg-white absolute inset-0 z-[80]" data-name="Search">
        <div className="absolute h-[932px] left-0 opacity-10 top-0 w-[431px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        
        <SearchBar value={searchValue} onChange={setSearchValue} onFilterClick={handleFilterClick} />
        
        {!showResults && (
          <div className="absolute left-[15px] right-[15px] top-[120px] flex flex-col items-center justify-center pt-[100px]">
            <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] text-[rgba(48,48,48,0.4)] text-center">
              Start typing to search transactions
            </p>
          </div>
        )}

        {showResults && (
          <div className="absolute left-[15px] right-[15px] top-[110px] bottom-[20px] overflow-y-auto">
            {filteredTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-[100px]">
                <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] text-[rgba(48,48,48,0.5)] text-center">No transactions found</p>
                <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[rgba(48,48,48,0.4)] text-center mt-2">Try a different search term</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] text-[rgba(48,48,48,0.75)] mb-4">
                  {filteredTransactions.length} {filteredTransactions.length === 1 ? 'result' : 'results'} found
                  {selectedCategories.length > 0 && ` in ${selectedCategories.join(', ')}`}
                </p>
                {filteredTransactions.map((transaction) => {
                  const categoryColor = categoryColors[transaction.category] || "#b5afa8";
                  return (
                    <div
                      key={transaction.id}
                      className="bg-white border-2 border-black rounded-[12px] p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#303030] mb-1">
                            {transaction.title}
                          </h3>
                          <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[rgba(48,48,48,0.7)] mb-2">
                            {transaction.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <div
                              className="px-3 py-1 rounded-[8px] border border-black"
                              style={{ backgroundColor: categoryColor }}
                            >
                              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] text-black">
                                {transaction.category}
                              </p>
                            </div>
                            <div className="px-2 py-1 bg-gray-200 rounded-[6px] border border-black">
                              <p className="font-['Plus_Jakarta_Sans'] font-medium text-[10px] text-black uppercase">
                                {transaction.cardType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#303030]">
                            -₱{transaction.amount.toFixed(2)}
                          </p>
                          <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[rgba(48,48,48,0.6)] mt-1">
                            {transaction.date}
                          </p>
                          <p className="font-['Plus_Jakarta_Sans'] text-[10px] text-[rgba(48,48,48,0.5)]">
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

        <Sidebar onClick={() => setSidebarOpen(true)} />
        <NavigationSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onHomeClick={onClose}
          onSettingsClick={() => {
            onClose();
            if (onSettingsClick) onSettingsClick();
          }}
          onExportClick={() => {
            onClose();
            if (onExportClick) onExportClick();
          }}
          onAnalyticsClick={() => {
            onClose();
            if (onAnalyticsClick) onAnalyticsClick();
          }}
          onSearchClick={() => setSidebarOpen(false)}
        />
      </div>

      <SearchFilter 
        isOpen={isFilterOpen} 
        onClose={handleFilterClose}
        selectedCategories={selectedCategories}
      />
    </>
  );
}
import { useState } from "react";
import svgPaths from "../imports/svg-0aesjwf68r";
import imgUntitledDesign41 from "figma:asset/c99aba11ea0cd59e2b73f19e6fc8c88e62c1de76.png";
import NavigationSidebar from "./NavigationSidebar";
import SearchFilter from "./SearchFilter";
import IncomeSearchFilter from "./IncomeSearchFilter";
import ViewTransactionModal from "./ViewTransactionModal";
import ViewIncomeModal from "./ViewIncomeModal";
import AddTransactionModal from "./AddTransactionModal";
import EditIncomeModal from "./EditIncomeModal";
import type { Transaction, Income } from "../App";
import { linearSearch, CategoryManager } from "../utils/dsa";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsClick?: () => void;
  onExportClick?: () => void;
  onAnalyticsClick?: () => void;
  transactions: Transaction[];
  incomes: Income[];
  balances: {
    bank: number;
    cash: number;
    savings: number;
  };
  onDeleteTransaction?: (transactionId: string) => void;
  onEditTransaction?: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  onDeleteIncome?: (incomeId: string) => void;
  onEditIncome?: (id: string, income: Omit<Income, 'id'>) => void;
  isDarkMode?: boolean;
}

// Initialize CategoryManager singleton for O(1) category lookups using HashMap 
const categoryManager = CategoryManager.getInstance();

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

function SearchBar({ value, onChange, onFilterClick, isDarkMode, searchMode }: { value: string; onChange: (value: string) => void; onFilterClick: () => void; isDarkMode?: boolean; searchMode?: 'transactions' | 'incomes' }) {
  const placeholder = searchMode === 'incomes' ? 'Search incomes' : 'Search transactions';
  
  return (
    <div className="absolute left-[15px] top-[49px]" data-name="Search Transactions">
      <div className={`absolute h-[44px] left-0 rounded-[12px] top-0 w-[397px] ${isDarkMode ? 'bg-[#404040]' : 'bg-[#d9d9d9]'}`} />
      <div className="absolute h-[18px] left-[27px] top-[13px] w-[18px] pointer-events-none" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3568180} fill={isDarkMode ? '#FFFFFF' : '#303030'} fillOpacity="0.75" id="Vector" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`absolute font-['Plus_Jakarta_Sans'] font-bold h-[21px] leading-[normal] left-[47px] text-[14px] top-[11px] tracking-[-0.14px] w-[290px] bg-transparent border-none outline-none ${
          isDarkMode 
            ? 'text-[rgba(255,255,255,0.75)] placeholder:text-[rgba(255,255,255,0.5)]' 
            : 'text-[rgba(48,48,48,0.75)] placeholder:text-[rgba(48,48,48,0.75)]'
        }`}
      />
      <button 
        className="absolute left-[363px] size-[23px] top-[10px] cursor-pointer hover:opacity-70 transition-opacity z-10"
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

export default function Search({ isOpen, onClose, onSettingsClick, onExportClick, onAnalyticsClick, transactions, incomes, balances, onDeleteTransaction, onEditTransaction, onDeleteIncome, onEditIncome, isDarkMode }: SearchProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCardTypes, setSelectedCardTypes] = useState<string[]>([]);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [searchMode, setSearchMode] = useState<'transactions' | 'incomes'>('transactions');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isViewTransactionOpen, setViewTransactionOpen] = useState(false);
  const [isViewIncomeOpen, setViewIncomeOpen] = useState(false);
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);
  const [isAddIncomeOpen, setAddIncomeOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [incomeToEdit, setIncomeToEdit] = useState<Income | null>(null);

  if (!isOpen && !isAnimatingOut) return null;

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 300); // Match animation duration
  };

  // Filter transactions based on search value and selected categories using Linear Search DSA
  const filteredTransactions = searchValue.trim() === ""
    ? [] 
    : linearSearch(transactions, (transaction) => {
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

  // Filter incomes based on search value and selected card types using Linear Search DSA
  const filteredIncomes = searchValue.trim() === ""
    ? [] 
    : linearSearch(incomes, (income) => {
        const searchLower = searchValue.toLowerCase();
        const matchesSearch = (
          income.title.toLowerCase().includes(searchLower) ||
          income.description.toLowerCase().includes(searchLower) ||
          income.amount.toString().includes(searchLower) ||
          income.cardType.toLowerCase().includes(searchLower) ||
          "income".includes(searchLower)
        );
        
        // If no card types selected, show all matching search results
        if (selectedCardTypes.length === 0) return matchesSearch;
        
        // Otherwise, filter by selected card types
        return matchesSearch && selectedCardTypes.includes(income.cardType);
      });

  const totalResults = filteredTransactions.length + filteredIncomes.length;
  const showResults = searchValue.trim() !== "";

  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const handleTransactionFilterClose = (categories: string[]) => {
    setSelectedCategories(categories);
    setFilterOpen(false);
  };

  const handleIncomeFilterClose = (cardTypes: string[]) => {
    setSelectedCardTypes(cardTypes);
    setFilterOpen(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsEditMode(true);
    setViewTransactionOpen(false);
    setAddTransactionOpen(true);
  };

  const handleEditIncome = (income: Income) => {
    setIncomeToEdit(income);
    setIsEditMode(true);
    setViewIncomeOpen(false);
    setAddIncomeOpen(true);
  };

  return (
    <>
      <div 
        className={`absolute inset-0 z-[80] transition-all duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} ${
          isAnimatingOut ? 'animate-[slideOutRight_0.3s_ease-in-out_forwards]' : 'animate-[slideInRight_0.3s_ease-in-out]'
        }`} 
        data-name="Search"
      >
        <div className="absolute h-[932px] left-0 opacity-10 top-0 w-[431px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        
        <SearchBar value={searchValue} onChange={setSearchValue} onFilterClick={handleFilterClick} isDarkMode={isDarkMode} searchMode={searchMode} />
        
        {/* Toggle Switch */}
        <div className="absolute left-[15px] top-[105px] w-[397px] flex items-center gap-2">
          <button
            className={`flex-1 h-[36px] rounded-[10px] border-2 border-black transition-all ${
              searchMode === 'transactions' 
                ? 'bg-[#6e86a9] shadow-[3px_3px_0px_0px_black]' 
                : isDarkMode ? 'bg-[#404040] hover:bg-[#4a4a4a]' : 'bg-[#d9d9d9] hover:bg-[#c9c9c9]'
            }`}
            onClick={() => {
              setSearchMode('transactions');
              setSearchValue('');
            }}
          >
            <p className={`font-['Plus_Jakarta_Sans'] font-extrabold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#303030]'} tracking-[-0.14px]`}>
              Transactions
            </p>
          </button>
          <button
            className={`flex-1 h-[36px] rounded-[10px] border-2 border-black transition-all ${
              searchMode === 'incomes' 
                ? 'bg-[#8baa4e] shadow-[3px_3px_0px_0px_black]' 
                : isDarkMode ? 'bg-[#404040] hover:bg-[#4a4a4a]' : 'bg-[#d9d9d9] hover:bg-[#c9c9c9]'
            }`}
            onClick={() => {
              setSearchMode('incomes');
              setSearchValue('');
            }}
          >
            <p className={`font-['Plus_Jakarta_Sans'] font-extrabold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#303030]'} tracking-[-0.14px]`}>
              Incomes
            </p>
          </button>
        </div>
        
        {!showResults && (
          <div className="absolute left-[15px] right-[15px] top-[160px] flex flex-col items-center justify-center pt-[100px]">
            <p className={`font-['Plus_Jakarta_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(48,48,48,0.4)]'} text-center`}>
              Start typing to search {searchMode}
            </p>
          </div>
        )}

        {showResults && (
          <div className="absolute left-[15px] right-[15px] top-[155px] bottom-[20px] overflow-y-auto">
            {totalResults === 0 ? (
              <div className="flex flex-col items-center justify-center pt-[100px]">
                <p className={`font-['Plus_Jakarta_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(48,48,48,0.5)]'} text-center`}>No {searchMode} found</p>
                <p className={`font-['Plus_Jakarta_Sans'] text-[14px] ${isDarkMode ? 'text-[rgba(255,255,255,0.4)]' : 'text-[rgba(48,48,48,0.4)]'} text-center mt-2`}>Try a different search term</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className={`font-['Plus_Jakarta_Sans'] font-semibold text-[16px] ${isDarkMode ? 'text-[rgba(255,255,255,0.75)]' : 'text-[rgba(48,48,48,0.75)]'} mb-4`}>
                  {totalResults} {totalResults === 1 ? 'result' : 'results'} found
                  {selectedCategories.length > 0 && ` in ${selectedCategories.join(', ')}`}
                  {selectedCardTypes.length > 0 && ` in ${selectedCardTypes.map(ct => ct === 'bank' ? 'Bank Money' : ct === 'cash' ? 'Cash Money' : 'Savings Money').join(', ')}`}
                </p>
                {filteredTransactions.map((transaction) => {
                  // Use HashMap DSA for O(1) category color lookup
                  const categoryColor = categoryManager.getCategoryColor(transaction.category);
                  return (
                    <div
                      key={transaction.id}
                      className={`border-2 border-black rounded-[12px] p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-white'}`}
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setViewTransactionOpen(true);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className={`font-['Plus_Jakarta_Sans'] font-bold text-[16px] ${isDarkMode ? 'text-white' : 'text-[#303030]'} mb-1`}>
                            {transaction.title}
                          </h3>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[13px] ${isDarkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(48,48,48,0.7)]'} mb-2`}>
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
                            <div className={`px-2 py-1 rounded-[6px] border border-black ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              <p className={`font-['Plus_Jakarta_Sans'] font-medium text-[10px] ${isDarkMode ? 'text-white' : 'text-black'} uppercase`}>
                                {transaction.cardType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className={`font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>
                            -₱{transaction.amount.toFixed(2)}
                          </p>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[11px] ${isDarkMode ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(48,48,48,0.6)]'} mt-1`}>
                            {transaction.date}
                          </p>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[10px] ${isDarkMode ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(48,48,48,0.5)]'}`}>
                            {transaction.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredIncomes.map((income) => {
                  return (
                    <div
                      key={income.id}
                      className={`border-2 border-black rounded-[12px] p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-white'}`}
                      onClick={() => {
                        setSelectedIncome(income);
                        setViewIncomeOpen(true);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className={`font-['Plus_Jakarta_Sans'] font-bold text-[16px] ${isDarkMode ? 'text-white' : 'text-[#303030]'} mb-1`}>
                            {income.title}
                          </h3>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[13px] ${isDarkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(48,48,48,0.7)]'} mb-2`}>
                            {income.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded-[6px] border border-black ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              <p className={`font-['Plus_Jakarta_Sans'] font-medium text-[10px] ${isDarkMode ? 'text-white' : 'text-black'} uppercase`}>
                                {income.cardType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className={`font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>
                            +₱{income.amount.toFixed(2)}
                          </p>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[11px] ${isDarkMode ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(48,48,48,0.6)]'} mt-1`}>
                            {income.date}
                          </p>
                          <p className={`font-['Plus_Jakarta_Sans'] text-[10px] ${isDarkMode ? 'text-[rgba(255,255,255,0.5)]' : 'text-[rgba(48,48,48,0.5)]'}`}>
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
        <NavigationSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onHomeClick={handleClose}
          onSettingsClick={() => {
            handleClose();
            if (onSettingsClick) onSettingsClick();
          }}
          onExportClick={() => {
            handleClose();
            if (onExportClick) onExportClick();
          }}
          onAnalyticsClick={() => {
            handleClose();
            if (onAnalyticsClick) onAnalyticsClick();
          }}
          onSearchClick={() => setSidebarOpen(false)}
          isDarkMode={isDarkMode}
        />
      </div>

      {searchMode === 'transactions' && (
        <SearchFilter 
          isOpen={isFilterOpen} 
          onClose={handleTransactionFilterClose}
          selectedCategories={selectedCategories}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          transactions={transactions}
          onTransactionClick={(transaction) => {
            setSelectedTransaction(transaction);
            setViewTransactionOpen(true);
          }}
          isDarkMode={isDarkMode}
        />
      )}
      {searchMode === 'incomes' && (
        <IncomeSearchFilter 
          isOpen={isFilterOpen} 
          onClose={handleIncomeFilterClose}
          selectedCardTypes={selectedCardTypes}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          incomes={incomes}
          onIncomeClick={(income) => {
            setSelectedIncome(income);
            setViewIncomeOpen(true);
          }}
          isDarkMode={isDarkMode}
        />
      )}
      {isViewTransactionOpen && selectedTransaction && (
        <ViewTransactionModal
          isOpen={isViewTransactionOpen}
          onClose={() => setViewTransactionOpen(false)}
          transaction={selectedTransaction}
          onDelete={onDeleteTransaction}
          onEdit={handleEditTransaction}
        />
      )}
      {isViewIncomeOpen && selectedIncome && (
        <ViewIncomeModal
          isOpen={isViewIncomeOpen}
          onClose={() => setViewIncomeOpen(false)}
          income={selectedIncome}
          onDelete={onDeleteIncome}
          onEdit={handleEditIncome}
        />
      )}
      {isAddTransactionOpen && transactionToEdit && (
        <AddTransactionModal
          isOpen={isAddTransactionOpen}
          onClose={() => {
            setAddTransactionOpen(false);
            setIsEditMode(false);
            setTransactionToEdit(null);
          }}
          cardType={transactionToEdit.cardType}
          currentBalance={balances[transactionToEdit.cardType]}
          onAddTransaction={() => {}}
          editMode={isEditMode}
          existingTransaction={transactionToEdit}
          onEditTransaction={onEditTransaction}
        />
      )}
      {isAddIncomeOpen && (
        <EditIncomeModal
          isOpen={isAddIncomeOpen}
          onClose={() => {
            setAddIncomeOpen(false);
            setIncomeToEdit(null);
          }}
          income={incomeToEdit}
          balances={balances}
          onEditIncome={onEditIncome!}
        />
      )}
    </>
  );
}
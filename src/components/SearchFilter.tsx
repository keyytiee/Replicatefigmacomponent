import svgPaths from "../imports/svg-0aesjwf68r";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import { useState, useEffect } from "react";
import NavigationSidebar from "./NavigationSidebar";

interface SearchFilterProps {
  isOpen: boolean;
  onClose: (selectedCategories: string[]) => void;
  selectedCategories: string[];
}

function SearchTransactions() {
  return (
    <div className="absolute contents left-[15px] top-[24px]" data-name="Search Transactions">
      <div className="absolute bg-[#d9d9d9] h-[44px] left-[15px] rounded-[12px] top-[24px] w-[397px]" />
      <div className="absolute h-[18px] left-[42px] top-[37px] w-[18px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3568180} fill="var(--fill-0, #303030)" fillOpacity="0.75" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans'] font-bold h-[21px] leading-[normal] left-[62px] text-[14px] text-[rgba(48,48,48,0.75)] top-[35px] tracking-[-0.14px] w-[142px]">Search transactions</p>
    </div>
  );
}

function Sidebar({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="absolute h-[133px] left-[420px] top-[314px] w-[21px] cursor-pointer hover:opacity-80 transition-opacity" 
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

function LeisureCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute contents left-[212px] top-[220px] cursor-pointer" data-name="Leisure Category" onClick={onClick}>
      <div className={`absolute bg-[#e8c85e] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] left-[212px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[220px] w-[190px] hover:opacity-90 transition-all`} />
      <p className="absolute font-['Plus_Jakarta_Sans'] font-extrabold leading-[normal] left-[270.5px] text-[11px] text-black text-center text-nowrap top-[232px] tracking-[-0.11px] translate-x-[-50%] pointer-events-none">Leisure</p>
      <div className="absolute left-[235px] size-[20px] top-[231px] pointer-events-none" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d={svgPaths.p10e0fd80} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </button>
  );
}

function TransportationCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute contents left-[212px] top-[114px] cursor-pointer" data-name="Transportation Category" onClick={onClick}>
      <div className={`absolute bg-[#6e86a9] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] left-[212px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[114px] w-[190px] hover:opacity-90 transition-all`} />
      <div className="absolute left-[235px] size-[20px] top-[125px] pointer-events-none" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
          <path d={svgPaths.p133d6180} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans'] font-extrabold h-[14px] leading-[normal] left-[289.5px] text-[11px] text-black text-center top-[127px] tracking-[-0.11px] translate-x-[-50%] w-[79px] pointer-events-none">Transportation</p>
    </button>
  );
}

function FoodGroceryCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute contents left-[15px] top-[114px] cursor-pointer" data-name="Food & Grocery Category" onClick={onClick}>
      <div className={`absolute bg-[#8baa4e] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] left-[15px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[114px] w-[190px] hover:opacity-90 transition-all`} />
      <div className="absolute left-[38px] size-[22px] top-[123px] pointer-events-none" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <path d={svgPaths.p3025aa80} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans'] font-extrabold h-[13px] leading-[normal] left-[94.5px] text-[11px] text-black text-center top-[127px] tracking-[-0.11px] translate-x-[-50%] w-[87px] pointer-events-none">{`Food & Grocery`}</p>
    </button>
  );
}

function HealthcareCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute contents left-[15px] top-[218px] cursor-pointer" data-name="Healthcare Category" onClick={onClick}>
      <div className={`absolute bg-[#b45c4c] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] left-[15px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[218px] w-[190px] hover:opacity-90 transition-all`} />
      <div className="absolute left-[38px] size-[20px] top-[229px] pointer-events-none" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 17">
          <path clipRule="evenodd" d={svgPaths.p2df08180} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans'] font-extrabold h-[13px] leading-[normal] left-[80.5px] text-[11px] text-black text-center top-[230px] tracking-[-0.11px] translate-x-[-50%] w-[59px] pointer-events-none">Healthcare</p>
    </button>
  );
}

function EducationCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute contents left-[15px] top-[273px] cursor-pointer" data-name="Education Category" onClick={onClick}>
      <div className={`absolute bg-[#75689c] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] left-[15px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[273px] w-[190px] hover:opacity-90 transition-all`} />
      <p className="absolute font-['Plus_Jakarta_Sans'] font-extrabold h-[13px] leading-[normal] left-[80.5px] text-[11px] text-black text-center top-[287px] tracking-[-0.11px] translate-x-[-50%] w-[59px] pointer-events-none">Education</p>
      <div className="absolute left-[38px] size-[24px] top-[282px] pointer-events-none" data-name="tdesign:education-filled">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="tdesign:education-filled">
            <path d={svgPaths.p1a7bff00} fill="var(--fill-0, black)" id="Vector" />
            <path d={svgPaths.p252e3900} fill="var(--fill-0, black)" id="Vector_2" />
          </g>
        </svg>
      </div>
    </button>
  );
}

function BillsCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute contents left-[15px] top-[166px] cursor-pointer" data-name="Bills Category" onClick={onClick}>
      <div className={`absolute bg-[#d99c42] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] left-[15px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[166px] w-[190px] hover:opacity-90 transition-all`} />
      <p className="absolute font-['Plus_Jakarta_Sans'] font-extrabold leading-[normal] left-[62px] text-[11px] text-black text-center text-nowrap top-[180px] tracking-[-0.11px] translate-x-[-50%] pointer-events-none">Bills</p>
      <div className="absolute left-[38px] overflow-clip size-[24px] top-[175px] pointer-events-none" data-name="streamline-ultimate:cash-payment-bills">
        <div className="absolute inset-[-3.33%_-4.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 24">
            <g id="Group">
              <path d={svgPaths.p380b0d58} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d={svgPaths.p2a16f740} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d={svgPaths.p3470a000} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d={svgPaths.p30231500} id="Vector_4" stroke="var(--stroke-0, black)" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </button>
  );
}

function MiscellaneousCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute contents left-[212px] top-[273px] cursor-pointer" data-name="Miscellaneous Category" onClick={onClick}>
      <div className={`absolute bg-[#b5afa8] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-black border-solid'} h-[41px] left-[212px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[273px] w-[190px] hover:opacity-90 transition-all`} />
      <p className="absolute font-['Plus_Jakarta_Sans'] font-extrabold h-[13px] leading-[normal] left-[289.5px] text-[11px] text-black text-center top-[287px] tracking-[-0.11px] translate-x-[-50%] w-[83px] pointer-events-none">Miscellaneous</p>
      <div className="absolute left-[235px] size-[24px] top-[282px] pointer-events-none" data-name="eos-icons:miscellaneous">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="eos-icons:miscellaneous">
            <path d={svgPaths.p4bcebf2} fill="var(--fill-0, black)" id="Vector" />
          </g>
        </svg>
      </div>
    </button>
  );
}

function UtilitiesCategory({ isSelected, onClick }: { isSelected: boolean; onClick: () => void }) {
  return (
    <button className="absolute contents left-[212px] top-[165px] cursor-pointer" data-name="Utilities Category" onClick={onClick}>
      <div className={`absolute bg-[#4a506f] ${isSelected ? 'border-[3px] border-[#303030]' : 'border border-solid border-black'} h-[41px] left-[212px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[165px] w-[192px] hover:opacity-90 transition-all`} />
      <p className="absolute font-['Plus_Jakarta_Sans'] font-extrabold h-[14px] leading-[normal] left-[271.5px] text-[11px] text-black text-center top-[179px] tracking-[-0.11px] translate-x-[-50%] w-[41px] pointer-events-none">Utilities</p>
      <div className="absolute left-[235px] size-[24px] top-[172px] pointer-events-none" data-name="streamline-sharp:eco-house-remix">
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
    </button>
  );
}

function StashFilter() {
  return (
    <div className="absolute left-[27px] size-[20px] top-[85px]" data-name="stash:filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="stash:filter">
          <path d={svgPaths.p1b112c80} fill="var(--fill-0, #303030)" fillOpacity="0.75" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function SearchFilter({ isOpen, onClose, selectedCategories }: SearchFilterProps) {
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

  return (
    <>
      <div className="bg-white absolute inset-0 z-[90]" data-name="Search Filter">
        <div className="absolute h-[932px] left-0 opacity-10 top-0 w-[431px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        <SearchTransactions />
        <p className="absolute font-['Plus_Jakarta_Sans'] font-bold h-[21px] leading-[normal] left-[47px] text-[12px] text-[rgba(48,48,48,0.75)] top-[88px] tracking-[-0.12px] w-[49px]">Filter</p>
        <Sidebar onClick={() => setSidebarOpen(true)} />
        <LeisureCategory isSelected={localSelectedCategories.includes("Leisure")} onClick={() => toggleCategory("Leisure")} />
        <TransportationCategory isSelected={localSelectedCategories.includes("Transportation")} onClick={() => toggleCategory("Transportation")} />
        <FoodGroceryCategory isSelected={localSelectedCategories.includes("Food & Grocery")} onClick={() => toggleCategory("Food & Grocery")} />
        <HealthcareCategory isSelected={localSelectedCategories.includes("Healthcare")} onClick={() => toggleCategory("Healthcare")} />
        <EducationCategory isSelected={localSelectedCategories.includes("Education")} onClick={() => toggleCategory("Education")} />
        <BillsCategory isSelected={localSelectedCategories.includes("Bills")} onClick={() => toggleCategory("Bills")} />
        <MiscellaneousCategory isSelected={localSelectedCategories.includes("Miscellaneous")} onClick={() => toggleCategory("Miscellaneous")} />
        <UtilitiesCategory isSelected={localSelectedCategories.includes("Utilities")} onClick={() => toggleCategory("Utilities")} />
        <StashFilter />

        {/* Done Button */}
        <button
          className="absolute left-[15px] top-[840px] w-[397px] h-[50px] bg-[#e5d0ac] rounded-[12px] border-2 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          onClick={handleDone}
        >
          <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#303030]">
            Done {localSelectedCategories.length > 0 && `(${localSelectedCategories.length} selected)`}
          </p>
        </button>
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

import svgPaths from "../imports/svg-01sewv8v9z";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import NavigationSidebar from './NavigationSidebar';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: (value: boolean) => void;
  onExportClick?: () => void;
  onAnalyticsClick?: () => void;
  onSearchClick?: () => void;
}

function Group() {
  return (
    <div className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px]">
      <div className="absolute inset-[0_-8.6%_-2.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
          <g id="Return Button">
            <line id="Line 11" stroke="black" x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
            <line id="Line 12" stroke="black" x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Trash() {
  return (
    <div className="absolute h-[36px] left-[48px] top-[517px] w-[37px]" data-name="Trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 36">
        <g id="Trash">
          <path d={svgPaths.p294dc368} id="Icon" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Moon() {
  return (
    <div className="absolute left-[36px] size-[24px] top-[170px]" data-name="Moon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Moon">
          <path d={svgPaths.p1d2f8df0} id="Icon" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Bell() {
  return (
    <div className="absolute left-[36px] size-[24px] top-[213px]" data-name="Bell">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Bell">
          <path d={svgPaths.pdb17d40} id="Icon" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Book() {
  return (
    <div className="absolute h-[34px] left-[48px] top-[297px] w-[37px]" data-name="Book">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 34">
        <g id="Book">
          <path d={svgPaths.p3dc41200} id="Icon" stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

export default function Settings({ isOpen, onClose, isDarkMode, onToggleDarkMode, onExportClick, onAnalyticsClick, onSearchClick }: SettingsProps) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!isOpen) return null;

  // Use the isDarkMode prop directly from parent
  const handleDarkModeToggle = () => {
    if (onToggleDarkMode) {
      onToggleDarkMode(!isDarkMode);
    }
  };

  return (
    <>
      <div className={`absolute inset-0 z-[70] transition-colors duration-300 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`} data-name="Settings">
        <div className="absolute h-[932px] left-[-3px] opacity-10 top-[-6px] w-[431px]" data-name="Untitled design (4) 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
        </div>
        <button 
          onClick={onClose}
          className="cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px]">
            <div className="absolute inset-[0_-8.6%_-2.67%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
                <g id="Return Button">
                  <line id="Line 11" stroke={isDarkMode ? '#FFFFFF' : 'black'} x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
                  <line id="Line 12" stroke={isDarkMode ? '#FFFFFF' : 'black'} x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
                </g>
              </svg>
            </div>
          </div>
        </button>
        <div className={`absolute h-[57px] left-[36px] rounded-[5px] top-[287px] w-[356px] ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#d9d9d9]'}`} />
        <div className={`absolute h-[57px] left-[36px] rounded-[5px] top-[508px] w-[356px] ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#d9d9d9]'}`} />
        <div className={`absolute h-[25px] left-[312px] rounded-[5px] top-[427px] w-[80px] ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#d9d9d9]'}`} />
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[85px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Settings</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[66px] text-[16px] top-[171px] tracking-[-0.16px] w-[90px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Dark Mode</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[36px] text-[16px] top-[116px] tracking-[-0.16px] w-[90px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Preference</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[36px] text-[16px] top-[257px] tracking-[-0.16px] w-[49px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Guide</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[66px] text-[16px] top-[427px] tracking-[-0.16px] w-[136px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Weekly Start Day</p>
        <p className={`absolute font-['Inter:Regular',sans-serif] font-normal h-[17px] leading-[normal] left-[369px] not-italic text-[14px] text-right top-[430px] tracking-[-0.14px] translate-x-[-100%] w-[53px] ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#303030]'}`}>Sunday</p>
        <p className={`absolute font-['Inter:Regular',sans-serif] font-normal h-[14px] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[10px] text-center top-[882px] tracking-[-0.1px] translate-x-[-50%] w-[145px] ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#303030]'}`}>MoneyMap | CCC121 Project</p>
        <div className={`absolute h-[25px] left-[356px] rounded-[5px] top-[467px] w-[36px] ${isDarkMode ? 'bg-[#2D2D2D]' : 'bg-[#d9d9d9]'}`} />
        <p className={`absolute font-['Inter:Regular',sans-serif] font-normal h-[17px] leading-[normal] left-[369px] not-italic text-[14px] text-right top-[470px] tracking-[-0.14px] translate-x-[-100%] w-[8px] ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#303030]'}`}>1</p>
        <p className={`absolute font-['Poller_One:Regular',sans-serif] h-[30px] leading-[normal] left-[39px] not-italic text-[25px] top-[423px] tracking-[-0.25px] w-[20px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>7</p>
        <p className={`absolute font-['Poller_One:Regular',sans-serif] h-[20px] leading-[normal] left-[31px] not-italic text-[21px] top-[466px] tracking-[-0.21px] w-[29px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>31</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[66px] text-[16px] top-[467px] tracking-[-0.16px] w-[151px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Monthly Start Date</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[36px] text-[16px] top-[372px] tracking-[-0.16px] w-[151px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Data Configuration</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[86px] text-[16px] top-[296px] tracking-[-0.16px] w-[87px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>User Guide</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[86px] text-[16px] top-[518px] tracking-[-0.16px] w-[87px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Clear Data</p>
        <p className={`absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[calc(50%-148px)] text-[16px] top-[211px] tracking-[-0.16px] w-[158px] ${isDarkMode ? 'text-white' : 'text-[#303030]'}`}>Enable Notifications</p>
        <div className="absolute h-0 left-[36px] top-[111px] w-[356px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356 1">
              <line id="Line 13" stroke={isDarkMode ? '#FFFFFF' : 'black'} x2="356" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[36px] top-[252px] w-[356px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356 1">
              <line id="Line 13" stroke={isDarkMode ? '#FFFFFF' : 'black'} x2="356" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[35px] top-[367px] w-[356px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 356 1">
              <line id="Line 13" stroke={isDarkMode ? '#FFFFFF' : 'black'} x2="356" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <p className={`absolute font-['Inter:Extra_Light',sans-serif] font-extralight h-[15px] leading-[normal] left-[36px] not-italic text-[12px] top-[139px] tracking-[-0.12px] w-[175px] ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#303030]'}`}>Customize your experience.</p>
        <div className={`absolute font-['Inter:Extra_Light',sans-serif] font-extralight h-[15px] leading-[normal] left-[36px] not-italic text-[12px] top-[395px] tracking-[-0.12px] w-[104px] ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#303030]'}`}>
          <p className="mb-0">Your expenditures.</p>
          <p>&nbsp;</p>
        </div>
        <p className={`absolute font-['Inter:Extra_Light',sans-serif] font-extralight h-[15px] leading-[normal] left-[86px] not-italic text-[12px] top-[317px] tracking-[-0.12px] w-[220px] ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#303030]'}`}>A guide in tracking your expenses.</p>
        <p className={`absolute font-['Inter:Extra_Light',sans-serif] font-extralight h-[15px] leading-[normal] left-[86px] not-italic text-[12px] top-[539px] tracking-[-0.12px] w-[220px] ${isDarkMode ? 'text-[#E5E5E5]' : 'text-[#303030]'}`}>Wipe out all data.</p>
        <div className="absolute flex h-[6px] items-center justify-center left-[375px] top-[437px] w-[11px]">
          <div className="flex-none rotate-[180deg]">
            <div className="h-[6px] relative w-[11px]">
              <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5">
                  <path d={svgPaths.p189cef00} fill={isDarkMode ? '#FFFFFF' : '#303030'} id="Polygon 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[6px] items-center justify-center left-[375px] top-[475px] w-[11px]">
          <div className="flex-none rotate-[180deg]">
            <div className="h-[6px] relative w-[11px]">
              <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 5">
                  <path d={svgPaths.p189cef00} fill={isDarkMode ? '#FFFFFF' : '#303030'} id="Polygon 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dark Mode Toggle */}
        <ToggleSwitch 
          isOn={isDarkMode || false} 
          onToggle={handleDarkModeToggle} 
          className="absolute left-[354px] top-[161px]"
          isDarkMode={isDarkMode}
        />
        
        {/* Notifications Toggle */}
        <ToggleSwitch 
          isOn={isNotificationsEnabled} 
          onToggle={() => setIsNotificationsEnabled(!isNotificationsEnabled)} 
          className="absolute left-[354px] top-[203px]"
          isDarkMode={isDarkMode}
        />
        
        <div className="absolute h-[36px] left-[48px] top-[517px] w-[37px]" data-name="Trash">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 36">
            <g id="Trash">
              <path d={svgPaths.p294dc368} id="Icon" stroke={isDarkMode ? '#FFFFFF' : '#1E1E1E'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </g>
          </svg>
        </div>
        <div className="absolute left-[36px] size-[24px] top-[170px]" data-name="Moon">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="Moon">
              <path d={svgPaths.p1d2f8df0} id="Icon" stroke={isDarkMode ? '#FFFFFF' : '#1E1E1E'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </g>
          </svg>
        </div>
        <div className="absolute left-[36px] size-[24px] top-[213px]" data-name="Bell">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="Bell">
              <path d={svgPaths.pdb17d40} id="Icon" stroke={isDarkMode ? '#FFFFFF' : '#1E1E1E'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </g>
          </svg>
        </div>
        <div className="absolute h-[34px] left-[48px] top-[297px] w-[37px]" data-name="Book">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 34">
            <g id="Book">
              <path d={svgPaths.p3dc41200} id="Icon" stroke={isDarkMode ? '#FFFFFF' : '#1E1E1E'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </g>
          </svg>
        </div>
        
        {/* Sidebar Button */}
        <div 
          className="absolute h-[133px] left-[419px] top-[377px] w-[21px] cursor-pointer hover:opacity-80 transition-opacity z-30" 
          data-name="Sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 133">
            <g id="Sidebar">
              <rect fill={isDarkMode ? '#FFFFFF' : '#303030'} height="26" id="Sidebar_2" rx="6.5" stroke={isDarkMode ? '#FFFFFF' : '#303030'} width="20" x="0.5" y="54.5" />
              <line id="Line 10" stroke={isDarkMode ? '#FFFFFF' : '#303030'} strokeLinecap="round" strokeWidth="5" x1="7.5" x2="7.5" y1="2.5" y2="130.5" />
              <path d="M9.6 80.675 15.5 74.1 9.6 67.525 9.6 80.675Z" fill={isDarkMode ? '#FFFFFF' : '#D9D9D9'} id="Polygon 1" stroke={isDarkMode ? '#FFFFFF' : '#303030'} />
            </g>
          </svg>
        </div>
      </div>
      <NavigationSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onHomeClick={onClose}
        onExportClick={onExportClick}
        onAnalyticsClick={onAnalyticsClick}
        onSearchClick={onSearchClick}
        onSettingsClick={() => setSidebarOpen(false)}
        isDarkMode={isDarkMode}
      />
    </>
  );
}
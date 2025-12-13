import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-navigation-sidebar";

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen?: string;
  onSettingsClick?: () => void;
  onExportClick?: () => void;
  onAnalyticsClick?: () => void;
  onHomeClick?: () => void;
  onSearchClick?: () => void;
}

function MaterialSymbolsLightFileExportOutlineRounded() {
  return (
    <div className="absolute left-[125px] size-[35px] top-[43px]" data-name="material-symbols-light:file-export-outline-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="material-symbols-light:file-export-outline-rounded">
          <path d={svgPaths.p15a70c00} fill="white" fillOpacity="0.8" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function NavigationSidebar({ isOpen, onClose, currentScreen = "Home", onSettingsClick, onExportClick, onAnalyticsClick, onHomeClick, onSearchClick }: NavigationSidebarProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
      onClose();
    }
  };

  const handleExportClick = () => {
    if (onExportClick) {
      onExportClick();
      onClose();
    }
  };

  const handleAnalyticsClick = () => {
    if (onAnalyticsClick) {
      onAnalyticsClick();
      onClose();
    }
  };

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
      onClose();
    }
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
      onClose();
    }
  };

  if (!isAnimating && !isOpen) return null;

  return (
    <>
      {/* Dark overlay - lower z-index */}
      <div 
        className={`absolute bg-[rgba(0,0,0,0.75)] h-[926px] left-0 top-0 w-[428px] z-[45] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar Container - matching exact Figma positions relative to left-[246px] top-[250px] */}
      <div 
        className={`absolute left-[246px] top-[250px] z-[50] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-[200px]'
        }`}
        data-name="Sidebar"
      >
        {/* Background rounded rect - left: 346-246=100, top: 250-250=0 */}
        <div className="absolute bg-[#303030] h-[395px] left-[100px] rounded-[40px] shadow-[4px_4px_0px_0px_#000000] top-0 w-[145px]" />
        
        {/* Clickable Export button area */}
        <button
          onClick={handleExportClick}
          className="absolute left-[100px] top-[20px] w-[145px] h-[70px] cursor-pointer hover:opacity-80 transition-opacity z-10"
          aria-label="Export"
        />
        
        {/* Clickable Analytics button area */}
        <button
          onClick={handleAnalyticsClick}
          className="absolute left-[100px] top-[90px] w-[145px] h-[70px] cursor-pointer hover:opacity-80 transition-opacity z-10"
          aria-label="Analytics"
        />
        
        {/* Clickable Home button area */}
        <button
          onClick={handleHomeClick}
          className="absolute left-[100px] top-[160px] w-[145px] h-[70px] cursor-pointer hover:opacity-80 transition-opacity z-10"
          aria-label="Home"
        />
        
        {/* Clickable Settings button area */}
        <button
          onClick={handleSettingsClick}
          className="absolute left-[100px] top-[305px] w-[145px] h-[70px] cursor-pointer hover:opacity-80 transition-opacity z-10"
          aria-label="Settings"
        />
        
        {/* Clickable Search button area */}
        <button
          onClick={handleSearchClick}
          className="absolute left-[100px] top-[230px] w-[145px] h-[70px] cursor-pointer hover:opacity-80 transition-opacity z-10"
          aria-label="Search"
        />
        
        {/* Settings icon - inset positioning converted to absolute */}
        <div className="absolute left-[133px] size-[25px] top-[328px] pointer-events-none" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <path d={svgPaths.p63135f0} fill="white" fillOpacity="0.6" id="Vector" />
          </svg>
        </div>
        
        {/* Home icon - left: 379-246=133, top: 426-250=176 */}
        <div className="absolute h-[25px] left-[133px] top-[176px] w-[22px] pointer-events-none">
          <div className="absolute inset-[-2.51%_-2.27%_-2%_-2.27%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 27">
              <path d={svgPaths.p2c5ae480} id="Vector 14" stroke="white" strokeOpacity="0.8" />
            </svg>
          </div>
        </div>
        
        {/* Search icon - inset positioning converted to absolute */}
        <div className="absolute left-[133px] size-[25px] top-[249px] pointer-events-none" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <path d={svgPaths.p205e8900} fill="white" fillOpacity="0.6" id="Vector" />
          </svg>
        </div>
        
        {/* Analytics icon - left: 376-246=130, top: 362-250=112 */}
        <div className="absolute left-[130px] size-[25px] top-[112px] pointer-events-none">
          <div className="absolute inset-[-0.54%_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 26">
              <path d={svgPaths.p250edc00} id="Vector 13" stroke="white" strokeOpacity="0.8" />
            </svg>
          </div>
        </div>
        
        {/* Export icon - left: 371-246=125, top: 293-250=43 */}
        <MaterialSymbolsLightFileExportOutlineRounded />
        
        {/* Labels - exact positions from Figma relative to container */}
        {/* Home - left: 302-246=56, top: 429-250=179 */}
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[56px] text-[18px] text-center text-white top-[179px] tracking-[-0.18px] translate-x-[-50%] w-[64px] pointer-events-none">Home</p>
        
        {/* Search - left: 297-246=51, top: 499-250=249 */}
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[51px] text-[18px] text-center text-white top-[249px] tracking-[-0.18px] translate-x-[-50%] w-[76px] pointer-events-none">Search</p>
        
        {/* Settings - left: 294-246=48, top: 578-250=328 */}
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[48px] text-[18px] text-center text-white top-[328px] tracking-[-0.18px] translate-x-[-50%] w-[76px] pointer-events-none">Settings</p>
        
        {/* Analytics - left: 289-246=43, top: 365-250=115 */}
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[43px] text-[18px] text-center text-white top-[115px] tracking-[-0.18px] translate-x-[-50%] w-[86px] pointer-events-none">Analytics</p>
        
        {/* Export - left: 302.5-246=56.5, top: 297-250=47 */}
        <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[56.5px] text-[18px] text-center text-white top-[47px] tracking-[-0.18px] translate-x-[-50%] w-[59px] pointer-events-none">Export</p>
      </div>
    </>
  );
}
import svgPaths from "../imports/svg-jlo188t4qc";
import { useState } from 'react';

interface CategoryListItemProps {
  name: string;
  value: number;
  percentage: number;
  color: string;
  position: number; // Position in the list (0-based)
  onClick: () => void;
}

export default function CategoryListItem({ name, value, percentage, color, position, onClick }: CategoryListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const topPosition = 545 + (position * 46); // 545 is starting position, 46px spacing between items

  const getCategoryIcon = () => {
    switch (name) {
      case 'Transportation':
        return (
          <div className="absolute left-[49px] size-[15px] top-[4px] pointer-events-none">
            <div className="absolute inset-[0_0_-33.33%_-53.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 20">
                <g id="Frame 6">
                  <circle cx="10" cy="10" fill="#6E86A9" id="Ellipse 18" r="10" />
                  <g id="Vector">
                    <path d={svgPaths.p1b839b00} fill="#6E86A9" />
                    <path d={svgPaths.p33ce4360} stroke="black" strokeOpacity="0.78" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        );
      case 'Food & Grocery':
        return (
          <div className="absolute left-[43px] size-[20px] top-[5px] pointer-events-none">
            <div className="absolute inset-[0_0_0_-10%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20">
                <g id="Frame 4">
                  <circle cx="10" cy="10" fill="#8BAA4E" id="Ellipse 19" r="10" />
                  <path d={svgPaths.p1a00fd00} fill="black" id="Vector" />
                </g>
              </svg>
            </div>
          </div>
        );
      case 'Healthcare':
        return (
          <>
            <div className="absolute left-[41px] size-[20px] top-[5px] pointer-events-none">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" fill="#B45C4C" id="Ellipse 20" r="10" />
              </svg>
            </div>
            <div className="absolute left-[46px] size-[11px] top-[9px] pointer-events-none">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12">
                <g>
                  <path d={svgPaths.p9e2b800} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p5195e40} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p8958d00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p2ac652a} stroke="black" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </>
        );
      case 'Leisure':
        return (
          <div className="absolute left-[41px] size-[21px] top-[4px]">
            <div className="absolute inset-[-4.76%_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 22">
                <g id="Frame 5">
                  <circle cx="10" cy="10" fill="#E8C85E" id="Ellipse 20" r="10" />
                  <path d={svgPaths.p2547f3c0} fill="black" id="Vector" />
                </g>
              </svg>
            </div>
          </div>
        );
      case 'Utilities':
        return (
          <>
            <div className="absolute left-[41px] size-[20px] top-[4px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" fill="#4A506F" id="Ellipse 21" r="10" />
              </svg>
            </div>
            <div className="absolute left-[44px] size-[13px] top-[7px]" data-name="streamline-sharp:eco-house-remix">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                <g clipPath="url(#clip0_32_821)" id="streamline-sharp:eco-house-remix">
                  <path clipRule="evenodd" d={svgPaths.p34fb9500} fill="black" fillRule="evenodd" id="Vector" />
                </g>
                <defs>
                  <clipPath id="clip0_32_821">
                    <rect fill="white" height="13" width="13" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </>
        );
      case 'Education':
        return (
          <>
            <div className="absolute left-[41px] size-[20px] top-[4px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" fill="#75689C" id="Ellipse 22" r="10" />
              </svg>
            </div>
            <div className="absolute left-[45px] size-[12px] top-[8px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 11">
                <path d={svgPaths.p27b3a000} fill="black" stroke="black" />
              </svg>
            </div>
            <div className="absolute left-[46px] size-[7px] top-[9px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
                <path d={svgPaths.p24f72f00} fill="black" stroke="black" />
              </svg>
            </div>
          </>
        );
      case 'Miscellaneous':
        return (
          <>
            <div className="absolute left-[41px] size-[20px] top-[2px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" fill="#B5AFA8" id="Ellipse 23" r="10" />
              </svg>
            </div>
            <div className="absolute left-[44px] size-[14px] top-[5px]" data-name="eos-icons:miscellaneous">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                <g id="eos-icons:miscellaneous">
                  <path d={svgPaths.p2b3ee140} fill="black" id="Vector" />
                </g>
              </svg>
            </div>
          </>
        );
      case 'Bills':
        return (
          <>
            <div className="absolute left-[42px] size-[20px] top-[3px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" fill="#D99C42" id="Ellipse 24" r="10" />
              </svg>
            </div>
            <div className="absolute left-[46px] size-[12px] top-[7px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
                <g>
                  <path d={svgPaths.p3eaf3d00} fill="black" />
                </g>
              </svg>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getNamePosition = () => {
    switch (name) {
      case 'Transportation':
        return { left: '113px', width: '112px' };
      case 'Food & Grocery':
        return { left: '122px', width: '128px' };
      case 'Healthcare':
        return { left: '101.5px', width: '105px' };
      case 'Leisure':
        return { left: '93px', width: '88px' };
      case 'Utilities':
        return { left: '90px', width: '84px' };
      case 'Education':
        return { left: '96.5px', width: '97px' };
      case 'Miscellaneous':
        return { left: '127px', width: '144px' };
      case 'Bills':
        return { left: '80.5px', width: '69px' };
      default:
        return { left: '100px', width: '100px' };
    }
  };

  const namePos = getNamePosition();
  const displayName = name === 'Miscellaneous' ? 'Miscellaneous Fee' : name;

  return (
    <>
      {/* Button overlay */}
      <button
        onClick={onClick}
        className="absolute left-[35px] w-[363px] h-[45px] cursor-pointer z-10 transition-all duration-200"
        style={{ top: `${topPosition}px` }}
        aria-label={`View ${name} Details`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Background */}
      <div 
        className="absolute h-[45px] left-[35px] rounded-[12px] w-[363px] pointer-events-none transition-all duration-200" 
        style={{ 
          top: `${topPosition}px`,
          backgroundColor: isHovered ? '#d8d8d8' : '#ececec',
          boxShadow: isHovered ? '0px 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
        }}
      />
      
      {/* Icon */}
      <div 
        style={{ 
          position: 'absolute', 
          top: `${topPosition}px`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 200ms ease',
        }}
      >
        {getCategoryIcon()}
      </div>
      
      {/* Category Name */}
      <p 
        className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[16px] leading-[normal] text-[13px] text-black text-center tracking-[-0.13px] translate-x-[-50%] pointer-events-none transition-all duration-200"
        style={{ 
          top: `${topPosition + 6}px`, 
          left: namePos.left, 
          width: namePos.width,
        }}
      >
        {displayName}
      </p>
      
      {/* Value */}
      <p 
        className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[16px] leading-[normal] left-[368px] text-[13px] text-black text-center tracking-[-0.13px] translate-x-[-50%] w-[112px] pointer-events-none transition-all duration-200"
        style={{ 
          top: `${topPosition + 6}px`,
        }}
      >
        ₱{value.toLocaleString()}
      </p>
      
      {/* Progress Bar Background */}
      <div 
        className="absolute bg-[rgba(255,250,250,0.5)] border border-black border-solid h-[13px] left-[44px] rounded-[12px] w-[348px] pointer-events-none transition-all duration-200" 
        style={{ 
          top: `${topPosition + 29}px`,
          borderWidth: isHovered ? '1.5px' : '1px',
        }}
      />
      
      {/* Progress Bar Fill */}
      <div 
        className="absolute border border-black border-solid h-[13px] left-[44px] rounded-[12px] pointer-events-none transition-all duration-200" 
        style={{ 
          top: `${topPosition + 29}px`,
          width: `${Math.min(percentage / 100 * 348, 348)}px`,
          backgroundColor: color,
          filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
          borderWidth: isHovered ? '1.5px' : '1px',
        }}
      />
      
      {/* Percentage */}
      <p 
        className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[14px] leading-[normal] left-[375px] text-[10px] text-black text-center tracking-[-0.1px] translate-x-[-50%] w-[34px] pointer-events-none transition-all duration-200"
        style={{ 
          top: `${topPosition + 29}px`,
          opacity: isHovered ? 0.8 : 0.5,
        }}
      >
        {percentage.toFixed(0)}%
      </p>
    </>
  );
}
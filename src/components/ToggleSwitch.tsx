import { useState } from 'react';
import svgPaths from "../imports/svg-01sewv8v9z";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  className?: string;
  isDarkMode?: boolean;
}

export default function ToggleSwitch({ isOn, onToggle, className = '', isDarkMode = false }: ToggleSwitchProps) {
  return (
    <div 
      className={`size-[35px] cursor-pointer transition-opacity hover:opacity-80 ${className}`} 
      onClick={onToggle}
      data-name="Toggle"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g clipPath="url(#clip0_toggle)" id="Toggle">
          <rect fill={isDarkMode ? '#303030' : 'white'} height="35" width="35" />
          <g id="Icon">
            {/* Toggle background track - changes fill color based on state */}
            <path 
              d={svgPaths.p2df703f0} 
              stroke="#1E1E1E" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="4"
              fill={isOn ? '#E5D0AC' : 'transparent'}
              style={{
                transition: 'fill 200ms ease-out'
              }}
            />
            {/* Toggle knob - slides based on state */}
            <g
              style={{
                transform: isOn ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'transform 200ms ease-out',
                transformOrigin: 'center'
              }}
            >
              <path 
                d={svgPaths.p71f4000} 
                stroke="#1E1E1E" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="4"
                fill="transparent"
              />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_toggle">
            <rect fill={isDarkMode ? '#303030' : 'white'} height="35" width="35" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
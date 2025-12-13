interface PawPrintProps {
  className?: string;
  color?: string;
  size?: number;
}

export default function PawPrint({ className = '', color = '#303030', size = 40 }: PawPrintProps) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main pad */}
      <ellipse cx="20" cy="26" rx="8" ry="6" fill={color} />
      
      {/* Toe pads */}
      <ellipse cx="12" cy="15" rx="4" ry="5" fill={color} transform="rotate(-15 12 15)" />
      <ellipse cx="20" cy="12" rx="4" ry="5" fill={color} />
      <ellipse cx="28" cy="15" rx="4" ry="5" fill={color} transform="rotate(15 28 15)" />
      <ellipse cx="16" cy="18" rx="3.5" ry="4.5" fill={color} transform="rotate(-5 16 18)" />
    </svg>
  );
}

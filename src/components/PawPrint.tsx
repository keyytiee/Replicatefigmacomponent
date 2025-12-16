interface PawPrintProps {
  size?: number;
  opacity?: number;
  rotation?: number;
  color?: string;
}

export default function PawPrint({ 
  size = 40, 
  opacity = 0.1, 
  rotation = 0,
  color = "#303030"
}: PawPrintProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      style={{ 
        opacity, 
        transform: `rotate(${rotation}deg)`,
        pointerEvents: 'none'
      }}
    >
      {/* Main pad */}
      <ellipse cx="12" cy="16" rx="4.5" ry="5.5" fill={color} />
      
      {/* Toe pads */}
      <ellipse cx="7" cy="9" rx="2" ry="3" fill={color} />
      <ellipse cx="11" cy="7" rx="2" ry="3" fill={color} />
      <ellipse cx="15" cy="7" rx="2" ry="3" fill={color} />
      <ellipse cx="19" cy="9" rx="2" ry="3" fill={color} />
    </svg>
  );
}

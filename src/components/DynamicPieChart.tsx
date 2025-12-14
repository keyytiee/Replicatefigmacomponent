import { useState } from 'react';
import svgPaths from "../imports/svg-jlo188t4qc";

interface Category {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface DynamicPieChartProps {
  categories: Category[];
  totalExpenses: number;
  onCategoryClick?: (categoryName: string) => void;
}

export default function DynamicPieChart({ categories, totalExpenses, onCategoryClick }: DynamicPieChartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const centerX = 194;
  const centerY = 194;
  const outerRadius = 170;
  const innerRadius = 120;

  // Get current month name
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

  // Helper function to convert polar coordinates to cartesian
  const polarToCartesian = (angle: number, radius: number) => {
    const radian = (angle - 90) * Math.PI / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  // Helper function to get category icon SVG
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Transportation':
        return (
          <g>
            <path d={svgPaths.p1b839b00} fill="black" opacity="0.8" />
            <path d={svgPaths.p33ce4360} stroke="black" strokeOpacity="0.78" strokeWidth="0.5" />
          </g>
        );
      case 'Food & Grocery':
        return <path d={svgPaths.p1a00fd00} fill="black" opacity="0.8" />;
      case 'Healthcare':
        return (
          <g>
            <path d={svgPaths.p9e2b800} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" opacity="0.8" />
            <path d={svgPaths.p5195e40} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" opacity="0.8" />
            <path d={svgPaths.p8958d00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" opacity="0.8" />
            <path d={svgPaths.p2ac652a} stroke="black" strokeWidth="1" opacity="0.8" />
          </g>
        );
      case 'Leisure':
        return <path d={svgPaths.p2547f3c0} fill="black" opacity="0.8" />;
      case 'Utilities':
        return (
          <g>
            <path clipRule="evenodd" d={svgPaths.p34fb9500} fill="black" fillRule="evenodd" opacity="0.8" />
          </g>
        );
      case 'Education':
        return (
          <g>
            <path d={svgPaths.p27b3a000} fill="black" stroke="black" strokeWidth="0.5" opacity="0.8" />
            <path d={svgPaths.p24f72f00} fill="black" stroke="black" strokeWidth="0.5" opacity="0.8" />
          </g>
        );
      case 'Miscellaneous':
        return <path d={svgPaths.p2b3ee140} fill="black" opacity="0.8" />;
      case 'Bills':
        return <path d={svgPaths.p3eaf3d00} fill="black" opacity="0.8" />;
      default:
        return null;
    }
  };

  // Generate pie segments with labels
  let currentAngle = 0;
  const segments = categories.map((category) => {
    const angle = (category.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Calculate midpoint angle for label positioning
    const midAngle = startAngle + (angle / 2);
    const labelRadius = (outerRadius + innerRadius) / 2; // Middle of the donut
    const labelPos = polarToCartesian(midAngle, labelRadius);

    // Calculate positions for slice path
    const startOuter = polarToCartesian(startAngle, outerRadius);
    const endOuter = polarToCartesian(endAngle, outerRadius);
    const startInner = polarToCartesian(startAngle, innerRadius);
    const endInner = polarToCartesian(endAngle, innerRadius);

    const largeArcFlag = angle > 180 ? 1 : 0;

    // Create path for donut segment
    const path = [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
      'Z'
    ].join(' ');

    currentAngle = endAngle;

    // Determine if slice is large enough for both icon and text
    const isLargeSlice = category.percentage > 12;
    const isMediumSlice = category.percentage > 6;
    
    // Only show icon if slice is large enough (>7%)
    const showIcon = category.percentage > 7;

    return {
      ...category,
      path,
      labelPos,
      midAngle,
      showIcon
    };
  });

  return (
    <div className="absolute h-[380px] left-[24px] top-[125px] w-[380px]" data-name="Pie Chart">
      {/* Donut Chart Container */}
      <div className="absolute left-[0px] size-[380px] top-[0px] overflow-visible">
        <svg
          viewBox="0 0 388 388"
          className="w-full h-full overflow-visible"
          style={{ transform: 'rotate(0deg)', transformOrigin: 'center', overflow: 'visible' }}
        >
          {segments.map((segment) => (
            <g key={segment.name}>
              {/* Pie Slice */}
              <path
                d={segment.path}
                fill={segment.color}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  filter: hoveredCategory === segment.name ? 'brightness(1.2) drop-shadow(0px 0px 8px rgba(0,0,0,0.4))' : 'none',
                  transform: hoveredCategory === segment.name ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: `${centerX}px ${centerY}px`,
                }}
                onMouseEnter={() => setHoveredCategory(segment.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => onCategoryClick && onCategoryClick(segment.name)}
              />
              
              {/* Label: Icon only (only for slices > 7%) */}
              {segment.showIcon && (
                <g
                  className="pointer-events-none transition-all duration-300"
                  style={{
                    filter: hoveredCategory === segment.name ? 'brightness(1.3) drop-shadow(0px 0px 4px rgba(0,0,0,0.6))' : 'none',
                  }}
                >
                  {/* Icon centered in slice */}
                  <g transform={`translate(${segment.labelPos.x - 7}, ${segment.labelPos.y - 7}) scale(${hoveredCategory === segment.name ? 1.25 : 1.1})`}>
                    {getCategoryIcon(segment.name)}
                  </g>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Center Circle with Month */}
      <div className="absolute left-[115px] size-[150px] top-[115px] pointer-events-none">
        <div className="relative size-full">
          <svg className="absolute inset-0" viewBox="0 0 150 150">
            <circle cx="75" cy="75" fill="white" r="73" stroke="black" strokeWidth="3" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[18px] text-black text-center leading-tight">
              {currentMonth}
            </p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[15px] text-black text-center mt-1.5 leading-tight">
              ₱{totalExpenses.toLocaleString()}
            </p>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[12px] text-black text-center mt-1 opacity-60">
              100%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
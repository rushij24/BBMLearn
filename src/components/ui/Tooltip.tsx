import React, { useState, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  width?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  text, 
  position = 'top',
  width = 'max-content'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  
  const arrows = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      
      {showTooltip && (
        <div 
          className={cn(
            "absolute z-50 px-3 py-2 text-xs bg-gray-800 text-gray-200 rounded-md border border-gray-700 shadow-md",
            positions[position]
          )}
          style={{ width }}
        >
          {text}
          <div 
            className={cn(
              "absolute w-0 h-0 border-solid border-[6px] border-gray-800",
              arrows[position]
            )}
          />
        </div>
      )}
    </div>
  );
}; 
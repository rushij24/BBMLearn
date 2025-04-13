import React from 'react';

interface CircularProgressProps {
  percentage: number;
  color: string;
  icon: any;
  label: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, color, icon: Icon, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <svg className="w-32 h-32">
        {/* Background circle */}
        <circle
          className="text-gray-700"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="58"
          cx="64"
          cy="64"
        />
        {/* Progress circle */}
        <circle
          className={color}
          strokeWidth="8"
          strokeDasharray={`${percentage * 3.64} 364`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="58"
          cx="64"
          cy="64"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon size={32} className={`${color} mb-1`} />
      </div>
    </div>
    <div className="mt-4 text-center">
      <h3 className="font-mono font-bold text-lg">{label}</h3>
      <p className={`${color} font-mono`}>{percentage}% Complete</p>
    </div>
  </div>
);

export default CircularProgress; 
import React from 'react';
import { BookOpen, Construction, Hammer, Shield as ShieldIcon } from 'lucide-react';

interface PhaseProgressProps {
  name: string;
  color: string;
  icon: any;
  percentage: number;
  completedModules: number;
  totalModules: number;
}

const PhaseProgress: React.FC<PhaseProgressProps> = ({
  name,
  color,
  icon: Icon,
  percentage,
  completedModules,
  totalModules
}) => (
  <div className={`bg-gray-700/50 rounded-lg p-4 border-t-2 border-${color}-500`}>
    <div className="flex items-center mb-2">
      <Icon className={`text-${color}-400 mr-2`} size={18} />
      <h3 className="font-mono font-bold">{name}</h3>
    </div>
    <div className="w-full bg-gray-600 rounded-full h-2.5 mb-2">
      <div className={`bg-${color}-400 h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
    <div className="flex justify-between text-xs text-gray-400">
      <span>{percentage}% Complete</span>
      <span>{completedModules}/{totalModules} Modules</span>
    </div>
  </div>
);

const LearningPath: React.FC = () => {
  const phases = [
    {
      name: 'Build',
      color: 'emerald',
      icon: Construction,
      percentage: 65,
      completedModules: 4,
      totalModules: 6,
    },
    {
      name: 'Break',
      color: 'red',
      icon: Hammer,
      percentage: 45,
      completedModules: 3,
      totalModules: 6,
    },
    {
      name: 'Mitigate',
      color: 'blue',
      icon: ShieldIcon,
      percentage: 30,
      completedModules: 2,
      totalModules: 6,
    },
  ];

  const overallPercentage = Math.round(
    phases.reduce((sum, phase) => sum + phase.percentage, 0) / phases.length
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-mono flex items-center">
          <BookOpen className="mr-2 text-cyan-400" /> Learning Path Progress
        </h2>
        <div className="text-sm text-gray-400">
          Overall: <span className="text-cyan-400 font-bold">{overallPercentage}%</span> completed
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {phases.map((phase, index) => (
          <PhaseProgress key={index} {...phase} />
        ))}
      </div>
    </div>
  );
};

export default LearningPath; 
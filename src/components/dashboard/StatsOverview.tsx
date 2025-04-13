import React from 'react';
import { Activity, Trophy, Terminal, Flag } from 'lucide-react';

// Stats data type
interface StatItem {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}

interface StatsOverviewProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { label: 'Rank', value: '#42', icon: Trophy, color: 'text-yellow-400' },
  { label: 'Points', value: '3,750', icon: Activity, color: 'text-emerald-400' },
  { label: 'Completed Labs', value: '12', icon: Terminal, color: 'text-purple-400' },
  { label: 'CTF Flags', value: '8', icon: Flag, color: 'text-red-400' },
];

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats = defaultStats }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 font-mono flex items-center">
        <Activity className="mr-2 text-cyan-400" /> Progress Overview
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-700 rounded-lg p-4 flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${stat.color.replace('text', 'bg')}/10`}>
              <stat.icon className={stat.color} size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-mono text-xs">{stat.label}</p>
              <p className="text-xl font-bold font-mono">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview; 
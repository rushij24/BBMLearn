import React from 'react';
import { Terminal, Flag } from 'lucide-react';

interface WelcomeHeaderProps {
  username?: string;
  rank?: string;
  points?: string | number;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ 
  username = 'User', 
  rank = '#42', 
  points = '3,750' 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-cyan-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome back, {username}</h1>
          <p className="text-gray-400">
            Your current rank is <span className="text-yellow-400 font-bold">{rank}</span> with{' '}
            <span className="text-emerald-400 font-bold">{points}</span> points
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
            <Terminal size={18} />
            <span>Start New Lab</span>
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
            <Flag size={18} />
            <span>Join CTF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader; 
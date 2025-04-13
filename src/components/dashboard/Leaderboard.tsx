import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';

interface LeaderboardUser {
  position: number;
  username: string;
  points: number;
}

interface LeaderboardProps {
  users?: LeaderboardUser[];
}

const defaultUsers: LeaderboardUser[] = [
  { position: 1, username: 'user1', points: 15000 },
  { position: 2, username: 'user2', points: 12500 },
  { position: 3, username: 'user3', points: 10000 },
  { position: 4, username: 'user4', points: 7500 },
  { position: 5, username: 'user5', points: 5000 },
];

const Leaderboard: React.FC<LeaderboardProps> = ({ users = defaultUsers }) => {
  const topUsers = users.filter(user => user.position <= 3);
  const otherUsers = users.filter(user => user.position > 3);
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-mono flex items-center">
          <Trophy className="mr-2 text-yellow-400" /> Leaderboard
        </h2>
        <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition-colors">
          <span>View All</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Top 3 users - detailed view */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {topUsers.map((user) => (
          <div key={user.position} className={`text-center p-3 rounded-lg ${
            user.position === 1 ? 'bg-yellow-400/10 border border-yellow-400/30' :
            user.position === 2 ? 'bg-gray-400/10 border border-gray-400/30' :
            'bg-orange-400/10 border border-orange-400/30'
          }`}>
            <div className={`text-xl font-bold mb-1 ${
              user.position === 1 ? 'text-yellow-400' :
              user.position === 2 ? 'text-gray-400' :
              'text-orange-400'
            }`}>
              #{user.position}
            </div>
            <div className="font-mono">{user.username}</div>
            <div className="text-sm text-indigo-400 font-bold mt-1">
              {user.points} pts
            </div>
          </div>
        ))}
      </div>

      {/* Remaining users - list view */}
      <div className="space-y-2">
        {otherUsers.map((user) => (
          <div key={user.position} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 font-bold">#{user.position}</span>
              <span className="font-mono">{user.username}</span>
            </div>
            <span className="font-mono text-indigo-400">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 
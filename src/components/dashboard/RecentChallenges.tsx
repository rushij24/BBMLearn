import React from 'react';
import { Terminal, ChevronRight, Construction, Hammer, Shield as ShieldIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Challenge {
  id: number;
  title: string;
  phase: string;
  description: string;
  difficulty: string;
  points: number;
  completed: boolean;
  topics: string[];
  tools: string[];
  resources: string[];
  template?: string;
}

interface RecentChallengesProps {
  challenges: Challenge[];
  limit?: number;
}

const RecentChallenges: React.FC<RecentChallengesProps> = ({ challenges, limit = 3 }) => {
  const navigate = useNavigate();

  const handleChallengeClick = (challengeId: number) => {
    navigate(`/learning/lab/${challengeId}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-mono flex items-center">
          <Terminal className="mr-2 text-cyan-400" /> Recent Labs
        </h2>
        <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition-colors">
          <span>View All</span>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="space-y-4">
        {challenges
          .slice(0, limit)
          .map((challenge) => (
            <div
              key={challenge.id}
              onClick={() => handleChallengeClick(challenge.id)}
              className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-all cursor-pointer flex items-start gap-3"
            >
              <div className={`p-2 rounded-lg mt-1 ${
                challenge.phase === 'build' ? 'bg-emerald-400/10 text-emerald-400' :
                challenge.phase === 'break' ? 'bg-red-400/10 text-red-400' :
                'bg-blue-400/10 text-blue-400'
              }`}>
                {challenge.phase === 'build' ? <Construction size={20} /> :
                 challenge.phase === 'break' ? <Hammer size={20} /> :
                 <ShieldIcon size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-mono font-bold">{challenge.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full text-xs">
                      {challenge.points} pts
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{challenge.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentChallenges; 
import React, { useState } from 'react';
import { Flag, Trophy, Clock, ShieldAlert, Zap, Lock, Terminal, Shield, Cpu, Braces, Code, FileCode, ChevronRight, Award, Users, Star, History, AlertTriangle, CheckCircle, XCircle, ArrowUpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface CTFChallenge {
  id: number;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  points: number;
  description: string;
  solvedBy: number;
  isSolved?: boolean;
}

interface TeamRanking {
  position: number;
  name: string;
  points: number;
  solved: number;
  avatar: string;
  isYourTeam?: boolean;
}

const CTFPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'scoreboard' | 'teams' | 'solves'>('challenges');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<CTFChallenge | null>(null);
  
  const challenges: CTFChallenge[] = [
    {
      id: 1,
      title: 'SQL Injection Basics',
      category: 'web',
      difficulty: 'easy',
      points: 500,
      description: 'Find the hidden flag by exploiting SQL injection vulnerabilities in this web application.',
      solvedBy: 87,
      isSolved: true
    },
    {
      id: 2,
      title: 'Crypto Puzzle',
      category: 'crypto',
      difficulty: 'medium',
      points: 750,
      description: 'Decrypt the message using the right encryption algorithm to find the hidden flag.',
      solvedBy: 45
    },
    {
      id: 3,
      title: 'Binary Exploitation',
      category: 'binary',
      difficulty: 'hard',
      points: 1000,
      description: 'Reverse engineer this binary to find the flag hidden in the memory.',
      solvedBy: 22
    },
    {
      id: 4,
      title: 'Broken Authentication',
      category: 'web',
      difficulty: 'medium',
      points: 800,
      description: 'Bypass the authentication mechanism to gain admin privileges and capture the flag.',
      solvedBy: 38
    },
    {
      id: 5,
      title: 'Network Packet Analysis',
      category: 'network',
      difficulty: 'expert',
      points: 1200,
      description: 'Analyze the network traffic to find anomalies and extract the hidden flag.',
      solvedBy: 15
    },
    {
      id: 6,
      title: 'Firmware Reverse Engineering',
      category: 'iot',
      difficulty: 'expert',
      points: 1500,
      description: 'Extract and analyze the firmware to find hardcoded credentials and security flaws.',
      solvedBy: 8
    }
  ];
  
  const teams: TeamRanking[] = [
    { position: 1, name: 'Binary Bandits', points: 4200, solved: 6, avatar: '👾', isYourTeam: true },
    { position: 2, name: 'Packet Pirates', points: 3800, solved: 5, avatar: '🏴‍☠️' },
    { position: 3, name: 'Cyber Sentinels', points: 3500, solved: 4, avatar: '🛡️' },
    { position: 4, name: 'Code Breakers', points: 3100, solved: 4, avatar: '💻' },
    { position: 5, name: 'Hack Attack', points: 2700, solved: 3, avatar: '⚡' },
    { position: 6, name: 'Shell Shocked', points: 2400, solved: 3, avatar: '🐚' },
    { position: 7, name: 'Buffer Overflow', points: 2000, solved: 2, avatar: '🔄' },
    { position: 8, name: 'SQL Injectors', points: 1800, solved: 2, avatar: '💉' },
  ];
  
  const categories = [
    { id: 'all', name: 'All Challenges', icon: Flag, count: challenges.length },
    { id: 'web', name: 'Web Exploitation', icon: Braces, count: challenges.filter(c => c.category === 'web').length },
    { id: 'crypto', name: 'Cryptography', icon: ShieldAlert, count: challenges.filter(c => c.category === 'crypto').length },
    { id: 'binary', name: 'Binary Analysis', icon: FileCode, count: challenges.filter(c => c.category === 'binary').length },
    { id: 'network', name: 'Network Security', icon: Cpu, count: challenges.filter(c => c.category === 'network').length },
    { id: 'iot', name: 'IoT Security', icon: Shield, count: challenges.filter(c => c.category === 'iot').length },
  ];
  
  const getCategoryIcon = (category: string) => {
    const foundCategory = categories.find(c => c.id === category);
    return foundCategory ? <foundCategory.icon size={18} /> : <Flag size={18} />;
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'web': return 'text-blue-400';
      case 'crypto': return 'text-green-400';
      case 'binary': return 'text-red-400';
      case 'network': return 'text-purple-400';
      case 'iot': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-blue-400';
      case 'hard': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  const getSolveTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  
  const recentSolves = [
    { team: "Binary Bandits", challenge: "SQL Injection Basics", timestamp: Date.now() - 1000 * 60 * 5, points: 500 },
    { team: "Cyber Sentinels", challenge: "Crypto Puzzle", timestamp: Date.now() - 1000 * 60 * 15, points: 750 },
    { team: "Packet Pirates", challenge: "Broken Authentication", timestamp: Date.now() - 1000 * 60 * 25, points: 800 },
    { team: "Code Breakers", challenge: "SQL Injection Basics", timestamp: Date.now() - 1000 * 60 * 35, points: 500 },
  ];
  
  const filteredChallenges = activeCategory === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === activeCategory);
  
  const handleChallengeClick = (challenge: CTFChallenge) => {
    setSelectedChallenge(challenge);
  };
  
  const closeModal = () => {
    setSelectedChallenge(null);
  };
  
  const ChallengeModal = () => {
    if (!selectedChallenge) return null;
    
    const [flagInput, setFlagInput] = useState('');
    const [submitStatus, setSubmitStatus] = useState<'none' | 'correct' | 'incorrect'>('none');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (flagInput.trim().toLowerCase() === 'flag{example_flag}') {
        setSubmitStatus('correct');
      } else {
        setSubmitStatus('incorrect');
      }
    };
    
    return (
      <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-lg", getCategoryColor(selectedChallenge.category))}>
                {getCategoryIcon(selectedChallenge.category)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedChallenge.title}</h3>
                <div className="text-sm text-gray-400">
                  {selectedChallenge.points} points • {selectedChallenge.category} • {selectedChallenge.difficulty}
                </div>
              </div>
            </div>
            <button onClick={closeModal} className="text-gray-400 hover:text-white">
              <XCircle size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h4 className="font-medium mb-2">Description</h4>
              <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
                {selectedChallenge.description}
              </div>
            </div>
            
            {selectedChallenge.isSolved ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-900/20 border border-green-700/30 text-green-400">
                <CheckCircle size={20} />
                <span>You've already solved this challenge!</span>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Submit Flag</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="flag{...}" 
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                      />
                      <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  
                  {submitStatus === 'correct' && (
                    <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-green-900/20 border border-green-700/30 text-green-400">
                      <CheckCircle size={20} />
                      <span>Correct! You've earned {selectedChallenge.points} points.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'incorrect' && (
                    <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-red-900/20 border border-red-700/30 text-red-400">
                      <XCircle size={20} />
                      <span>Incorrect flag, please try again.</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Hints</h4>
                  <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
                    <div className="flex justify-between items-center cursor-pointer hover:bg-gray-700/50 p-2 rounded">
                      <span>First hint</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-400">-100 points</span>
                        <ArrowUpCircle size={16} className="text-gray-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center cursor-pointer hover:bg-gray-700/50 p-2 rounded">
                      <span>Second hint</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-400">-200 points</span>
                        <ArrowUpCircle size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="pb-6 min-h-[calc(100vh-96px)]">
      {selectedChallenge && <ChallengeModal />}
      
      {/* Competition header */}
      <div className="bg-gray-800 p-4 mb-4 rounded-lg border border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Flag className="text-red-400" size={20} />
            Cyber Defense CTF
          </h1>
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <span>Team: Binary Bandits</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-400">
              Rank #1
            </span>
            <span className="px-2 py-0.5 rounded-full bg-yellow-900/50 text-yellow-400">
              4200 points
            </span>
          </div>
        </div>
        
        <div className="flex items-center bg-gray-700/50 rounded-lg p-2 text-gray-300 text-sm">
          <Clock className="text-red-400 mr-2" size={16} />
          <span>Competition Ends In: </span>
          <span className="font-mono ml-1">02:14:32:17</span>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto bg-gray-800 mb-6 border border-gray-700 rounded-lg">
        <button 
          onClick={() => setActiveTab('challenges')} 
          className={cn(
            "py-3 px-4 font-medium whitespace-nowrap",
            activeTab === 'challenges' 
              ? "border-b-2 border-blue-500 text-blue-400" 
              : "text-gray-400 hover:text-gray-300"
          )}
        >
          <div className="flex items-center gap-2">
            <Flag size={16} />
            <span>Challenges</span>
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('scoreboard')} 
          className={cn(
            "py-3 px-4 font-medium whitespace-nowrap",
            activeTab === 'scoreboard' 
              ? "border-b-2 border-blue-500 text-blue-400" 
              : "text-gray-400 hover:text-gray-300"
          )}
        >
          <div className="flex items-center gap-2">
            <Trophy size={16} />
            <span>Scoreboard</span>
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('teams')} 
          className={cn(
            "py-3 px-4 font-medium whitespace-nowrap",
            activeTab === 'teams' 
              ? "border-b-2 border-blue-500 text-blue-400" 
              : "text-gray-400 hover:text-gray-300"
          )}
        >
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>Teams</span>
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('solves')} 
          className={cn(
            "py-3 px-4 font-medium whitespace-nowrap",
            activeTab === 'solves' 
              ? "border-b-2 border-blue-500 text-blue-400" 
              : "text-gray-400 hover:text-gray-300"
          )}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Solves</span>
          </div>
        </button>
      </div>
      
      {activeTab === 'challenges' && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Categories Sidebar */}
          <div className="w-full md:w-64 bg-gray-800 p-4 rounded-lg border border-gray-700 h-fit">
            <h3 className="font-medium mb-3 text-gray-300">Categories</h3>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "flex items-center justify-between w-full py-2 px-3 rounded-lg",
                      activeCategory === category.id
                        ? "bg-gray-700 text-blue-400"
                        : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-300"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <category.icon size={16} />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-700/50">
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg text-sm text-gray-300">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <AlertTriangle size={16} />
                <h4 className="font-medium">Info</h4>
              </div>
              <p>Solving challenges gives your team points. The team with the most points wins!</p>
            </div>
          </div>
          
          {/* Challenge Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChallenges.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => handleChallengeClick(challenge)}
                  className={cn(
                    "text-left bg-gray-800 rounded-lg p-4 border transition-all",
                    challenge.isSolved 
                      ? "border-green-500/50 hover:border-green-500" 
                      : "border-gray-700 hover:border-gray-500"
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("p-1.5 rounded-lg", getCategoryColor(challenge.category))}>
                        {getCategoryIcon(challenge.category)}
                      </div>
                      <h3 className="font-bold">{challenge.title}</h3>
                    </div>
                    {challenge.isSolved && (
                      <CheckCircle size={18} className="text-green-400" />
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className={cn("font-mono", getDifficultyColor(challenge.difficulty))}>
                      {challenge.difficulty}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-500" />
                      <span className="text-gray-400">{challenge.solvedBy}</span>
                      <span className="text-yellow-400 font-bold">{challenge.points}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'scoreboard' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold">Team Rankings</h3>
            <div className="text-sm text-gray-400">
              Last updated: Just now
            </div>
          </div>
          
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50 text-left text-sm">
                <th className="py-2 px-4 w-16">Place</th>
                <th className="py-2 px-4">Team</th>
                <th className="py-2 px-4 text-center">Solved</th>
                <th className="py-2 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {teams.map((team) => (
                <tr 
                  key={team.position} 
                  className={cn(
                    "hover:bg-gray-700/50",
                    team.isYourTeam && "bg-blue-900/10"
                  )}
                >
                  <td className="py-3 px-4 font-mono">{team.position}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        {team.avatar}
                      </div>
                      <div className="flex items-center gap-2">
                        {team.name}
                        {team.isYourTeam && (
                          <span className="text-xs bg-blue-800/60 text-blue-300 px-2 py-0.5 rounded">You</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{team.solved} / {challenges.length}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-yellow-400">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'solves' && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-bold">Recent Solves</h3>
          </div>
          
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50 text-left text-sm">
                <th className="py-2 px-4">Team</th>
                <th className="py-2 px-4">Challenge</th>
                <th className="py-2 px-4">Points</th>
                <th className="py-2 px-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {recentSolves.map((solve, index) => (
                <tr key={index} className="hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{solve.team}</div>
                  </td>
                  <td className="py-3 px-4">{solve.challenge}</td>
                  <td className="py-3 px-4 font-mono text-yellow-400">{solve.points}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{getSolveTime(solve.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'teams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div 
              key={team.position}
              className={cn(
                "bg-gray-800 rounded-lg border p-4",
                team.isYourTeam ? "border-blue-500/50" : "border-gray-700"
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                  {team.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{team.name}</h3>
                    {team.isYourTeam && (
                      <span className="text-xs bg-blue-800/60 text-blue-300 px-2 py-0.5 rounded">You</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">Rank: #{team.position}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-gray-700 rounded p-2 text-center">
                  <div className="text-xs text-gray-400">Score</div>
                  <div className="font-bold text-yellow-400">{team.points}</div>
                </div>
                <div className="bg-gray-700 rounded p-2 text-center">
                  <div className="text-xs text-gray-400">Solved</div>
                  <div className="font-bold">{team.solved} / {challenges.length}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CTFPage; 
import React, { useState, useEffect } from 'react';
import { 
  Construction, Hammer, Shield as ShieldIcon, Terminal, PlayCircle, Trophy, 
  Search, Filter, Star, Clock, Book, Calendar, ArrowUpRight, ChevronRight,
  CheckCircle, BarChart3, CpuIcon, BookOpen, Code, Layers, Bookmark
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { challenges, phaseThemes, learningPaths } from '../data/mockData';
import { cn } from '../lib/utils';

const LabsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState<string>('build');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Current theme based on active phase
  const currentTheme = phaseThemes[activePhase as keyof typeof phaseThemes];
  
  // Filter challenges based on search, difficulty, and status
  const filteredChallenges = challenges
    .filter(challenge => challenge.phase === activePhase)
    .filter(challenge => 
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(challenge => 
      difficultyFilter === 'all' || 
      challenge.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
    )
    .filter(challenge => 
      statusFilter === 'all' || 
      (statusFilter === 'completed' ? challenge.completed : !challenge.completed)
    );
  
  // Calculate completion stats
  const totalChallenges = challenges.filter(c => c.phase === activePhase).length;
  const completedChallenges = challenges.filter(c => c.phase === activePhase && c.completed).length;
  const completionPercentage = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;
  
  const handleChallengeClick = (challengeId: number) => {
    navigate(`/learning/lab/${challengeId}`);
  };

  const PhaseButton = ({ icon: Icon, label, id, color, selectedColor }: { 
    icon: any; 
    label: string; 
    id: string; 
    color: string;
    selectedColor: string;
  }) => (
    <button
      onClick={() => setActivePhase(id)}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all border",
        activePhase === id
          ? `${selectedColor} border-current text-white`
          : 'bg-gray-800 border-transparent text-gray-400 hover:bg-gray-750 hover:text-gray-200'
      )}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  // Learning path cards based on the active phase
  const learningPathsForPhase = learningPaths[activePhase as keyof typeof learningPaths] || [];

  return (
    <div className={cn("space-y-6")}>
      {/* Page Header */}
      <div className={cn("flex justify-between items-start")}>
        <div>
          <h1 className={cn("text-2xl font-bold mb-1")}>Labs</h1>
          <p className={cn("text-gray-400")}>
            Practice hands-on security skills with our guided labs
          </p>
        </div>
        <div className={cn("flex items-center gap-2")}>
          <div className={cn("flex items-center bg-gray-800 rounded-full h-2 w-32")}>
            <div 
              className={cn(`rounded-full h-2 ${currentTheme.primary}`)} 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className={cn("text-sm", currentTheme.text)}>
            {completedChallenges}/{totalChallenges} completed
          </span>
        </div>
      </div>

      {/* Learning Phases Toggle */}
      <div className={cn("flex space-x-3")}>
        <PhaseButton 
          icon={Construction} 
          label="Build" 
          id="build" 
          color="text-emerald-400"
          selectedColor="bg-emerald-600"
        />
        <PhaseButton 
          icon={Hammer} 
          label="Break" 
          id="break" 
          color="text-red-400"
          selectedColor="bg-red-600"
        />
        <PhaseButton 
          icon={ShieldIcon} 
          label="Mitigate" 
          id="mitigate" 
          color="text-blue-400"
          selectedColor="bg-blue-600"
        />
      </div>

      {/* Phase Header */}
      <div className={cn(`rounded-lg overflow-hidden bg-gray-800 border ${currentTheme.border}`)}>
        <div className={cn(`p-6 bg-gradient-to-r ${currentTheme.gradient}`)}>
          <div className={cn("flex items-center gap-4")}>
            <div className={cn(`p-3 rounded-lg ${currentTheme.secondary}`)}>
              <currentTheme.icon size={28} className={cn(currentTheme.text)} />
            </div>
            <div>
              <h1 className={cn("text-xl font-bold")}>
                {activePhase.charAt(0).toUpperCase() + activePhase.slice(1)} Phase
              </h1>
              <p className={cn("text-gray-300")}>{currentTheme.description}</p>
            </div>
          </div>
        </div>
        
        {/* Learning Paths for the phase */}
        <div className={cn("p-6 border-t border-gray-700")}>
          <div className={cn("flex items-center justify-between mb-4")}>
            <h2 className={cn("text-lg font-semibold")}>Learning Paths</h2>
            <button className={cn("text-xs text-gray-400 flex items-center hover:text-white transition-colors")}>
              View All <ArrowUpRight size={14} className={cn("ml-1")} />
            </button>
          </div>
          <div className={cn("grid grid-cols-4 gap-4")}>
            {learningPathsForPhase.map((path, index) => (
              <div 
                key={index} 
                className={cn("bg-gray-750 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer")}
              >
                <div className={cn("flex items-center mb-3")}>
                  <div className={cn(`p-2 rounded-lg ${currentTheme.secondary} mr-3`)}>
                    <path.icon size={18} className={cn(currentTheme.text)} />
                  </div>
                  <h3 className={cn("font-medium text-sm")}>{path.title}</h3>
                </div>
                <p className={cn("text-gray-400 text-xs mb-3 line-clamp-2")}>{path.description}</p>
                <div className={cn("flex justify-between items-center")}>
                  <span className={cn("text-xs text-gray-500")}>4 labs</span>
                  <ChevronRight size={16} className={cn("text-gray-500")} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={cn("flex items-center justify-between")}>
        <div className={cn("relative w-64")}>
          <Search size={16} className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-gray-400")} />
          <input
            type="text"
            placeholder="Search labs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn("w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600")}
          />
        </div>
        
        <div className={cn("flex items-center gap-2")}>
          <div className={cn("flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg")}>
            <label className={cn("text-sm text-gray-400")}>Difficulty:</label>
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className={cn("bg-transparent text-sm focus:outline-none cursor-pointer")}
            >
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div className={cn("flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg")}>
            <label className={cn("text-sm text-gray-400")}>Status:</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={cn("bg-transparent text-sm focus:outline-none cursor-pointer")}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Not Started</option>
            </select>
          </div>
          
          <div className={cn("flex rounded-lg overflow-hidden")}>
            <button 
              onClick={() => setViewMode('grid')} 
              className={cn("p-2 flex items-center justify-center", 
                viewMode === 'grid' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              )}
            >
              <Layers size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={cn("p-2 flex items-center justify-center", 
                viewMode === 'list' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              )}
            >
              <BarChart3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Labs Content */}
      <div className={cn("bg-gray-800 rounded-lg border border-gray-700 overflow-hidden")}>
        <div className={cn("border-b border-gray-700 p-4 flex justify-between items-center")}>
          <h2 className={cn("font-semibold flex items-center text-lg")}>
            <Terminal className={cn(`mr-2 ${currentTheme.text}`)} size={18} /> Available Labs
            <span className={cn("ml-2 text-sm text-gray-400")}>
              {filteredChallenges.length} labs
            </span>
          </h2>
        </div>
        
        {viewMode === 'grid' ? (
          <div className={cn("grid grid-cols-2 gap-6 p-6")}>
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => handleChallengeClick(challenge.id)}
                className={cn("bg-gray-750 rounded-lg overflow-hidden hover:border-gray-600 transition-all cursor-pointer border border-gray-700")}
              >
                <div className={cn(`h-2 ${currentTheme.primary} ${challenge.completed ? 'w-full' : 'w-1/3'}`)}></div>
                <div className={cn("p-5")}>
                  <div className={cn("flex items-center justify-between mb-4")}>
                    <div className={cn("flex items-center gap-2")}>
                      <h3 className={cn("font-medium text-base")}>{challenge.title}</h3>
                      {challenge.completed && (
                        <CheckCircle size={16} className={cn(currentTheme.text)} />
                      )}
                    </div>
                    <span className={cn(`px-2 py-1 rounded-full text-xs ${currentTheme.secondary} ${currentTheme.text}`)}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className={cn("text-gray-400 text-sm mb-4")}>{challenge.description}</p>
                  <div className={cn("flex flex-wrap gap-2 mb-4")}>
                    {challenge.topics.slice(0, 3).map((topic, i) => (
                      <span 
                        key={i} 
                        className={cn("text-xs bg-gray-800 px-2 py-1 rounded")}
                      >
                        {topic}
                      </span>
                    ))}
                    {challenge.topics.length > 3 && (
                      <span className={cn("text-xs bg-gray-800 px-2 py-1 rounded")}>
                        +{challenge.topics.length - 3}
                      </span>
                    )}
                  </div>
                  <div className={cn("flex items-center justify-between")}>
                    <div className={cn("flex items-center gap-3")}>
                      <span className={cn("flex items-center text-yellow-400 text-xs")}>
                        <Star size={14} className="mr-1" /> {challenge.points} pts
                      </span>
                      <span className={cn("flex items-center text-gray-400 text-xs")}>
                        <Clock size={14} className="mr-1" /> 45 min
                      </span>
                    </div>
                    <button className={cn(`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      challenge.completed 
                        ? 'bg-gray-700 text-gray-300' 
                        : `${currentTheme.primary} text-white`
                    }`)}>
                      {challenge.completed ? 'Revisit Lab' : 'Start Lab'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={cn("divide-y divide-gray-700")}>
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => handleChallengeClick(challenge.id)}
                className={cn("hover:bg-gray-750 cursor-pointer transition-colors")}
              >
                <div className={cn("flex items-center p-4")}>
                  <div className={cn("w-8 h-8 flex items-center justify-center")}>
                    {challenge.completed ? (
                      <CheckCircle size={18} className={cn(currentTheme.text)} />
                    ) : (
                      <div className={cn(`w-5 h-5 rounded-full border ${currentTheme.border}`)}></div>
                    )}
                  </div>
                  <div className={cn("flex-1 ml-2 mr-4")}>
                    <div className={cn("flex items-center gap-2")}>
                      <h3 className={cn("font-medium")}>{challenge.title}</h3>
                      <span className={cn(`px-2 py-0.5 rounded-full text-xs ${currentTheme.secondary} ${currentTheme.text}`)}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <p className={cn("text-gray-400 text-sm")}>{challenge.description}</p>
                  </div>
                  <div className={cn("flex items-center gap-4")}>
                    <span className={cn("flex items-center text-yellow-400 text-xs")}>
                      <Star size={14} className="mr-1" /> {challenge.points} pts
                    </span>
                    <button className={cn(`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      challenge.completed 
                        ? 'bg-gray-700 text-gray-300' 
                        : `${currentTheme.primary} text-white`
                    }`)}>
                      {challenge.completed ? 'Revisit' : 'Start'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredChallenges.length === 0 && (
          <div className={cn("p-12 flex flex-col items-center justify-center text-center")}>
            <BookOpen size={48} className={cn("text-gray-600 mb-4")} />
            <h3 className={cn("text-xl font-medium mb-2")}>No labs found</h3>
            <p className={cn("text-gray-400 mb-6")}>
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setDifficultyFilter('all');
                setStatusFilter('all');
              }}
              className={cn("text-sm underline text-gray-400 hover:text-white")}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabsPage; 
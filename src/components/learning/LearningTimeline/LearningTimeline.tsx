import React from 'react';
import { 
  BookOpen, 
  Beaker, 
  CheckCircle, 
  Lock, 
  Clock, 
  ArrowRight, 
  Trophy,
  Target,
  Star,
  Users,
  Brain
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Lab {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'hands-on' | 'guided' | 'challenge';
  completed: boolean;
  locked: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  type: 'theory' | 'practical' | 'assessment';
  duration: string;
  completed: boolean;
  locked: boolean;
  labs: Lab[];
  dependencies: string[];
  skills: string[];
  points: number;
}

interface TimelineSection {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  requiredPoints: number;
}

interface LearningTimelineProps {
  sections: TimelineSection[];
  currentPoints: number;
  onModuleClick: (moduleId: string) => void;
  onLabClick: (labId: string) => void;
}

const LearningTimeline: React.FC<LearningTimelineProps> = ({
  sections,
  currentPoints,
  onModuleClick,
  onLabClick,
}) => {
  const getDifficultyColor = (difficulty: Lab['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'intermediate':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'advanced':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
    }
  };

  const getTypeIcon = (type: Module['type']) => {
    switch (type) {
      case 'theory':
        return <BookOpen className="w-5 h-5" />;
      case 'practical':
        return <Beaker className="w-5 h-5" />;
      case 'assessment':
        return <Target className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Module['type']) => {
    switch (type) {
      case 'theory':
        return 'bg-blue-500/10 text-blue-400';
      case 'practical':
        return 'bg-green-500/10 text-green-400';
      case 'assessment':
        return 'bg-amber-500/10 text-amber-400';
    }
  };

  const getLabTypeColor = (type: Lab['type']) => {
    switch (type) {
      case 'hands-on':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'guided':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'challenge':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-900 [&_*]:!bg-opacity-100 overflow-visible">
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className="mb-8 bg-transparent">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-300">
                {section.title}
                {currentPoints >= section.requiredPoints ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </h2>
              <p className="text-gray-400 mt-1 text-base">{section.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="font-medium text-amber-300">{section.requiredPoints} points required</span>
              </div>
              <div className="h-8 w-px bg-gray-700"></div>
              <div className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-indigo-400" />
                <span className="font-medium text-indigo-300">{section.modules.length} modules</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[35px] top-0 bottom-0 w-px bg-gray-700"></div>

            {/* Modules */}
            <div className="space-y-6">
              {section.modules.map((module, moduleIndex) => (
                <div key={module.id} className="relative">
                  {/* Module card */}
                  <div 
                    className={cn(
                      "ml-20 bg-gray-800 rounded-lg shadow-md transition-all border border-gray-700 overflow-hidden duration-300 relative",
                      module.locked ? 'opacity-60' : 'shadow-md',
                      module.completed && 'ring-1 ring-green-500/20'
                    )}
                    style={{ backgroundColor: 'rgb(31 41 55)' }}
                  >
                    {/* Module header */}
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "p-1.5 rounded-lg",
                            getTypeColor(module.type)
                          )}>
                            {getTypeIcon(module.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-indigo-200">{module.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </div>
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-4 h-4" />
                            <span className="font-medium">{module.points} points</span>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      {module.skills.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-400">Skills:</span>
                          <div className="flex flex-wrap gap-1">
                            {module.skills.map((skill, i) => (
                              <span 
                                key={i}
                                className="px-1.5 py-0.5 text-sm rounded-full bg-gray-700 text-gray-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Labs */}
                    {module.labs.length > 0 && (
                      <div className="p-4 bg-gray-800 border-t border-gray-700" style={{ backgroundColor: 'rgb(31 41 55)' }}>
                        <h4 className="text-sm font-medium text-indigo-300 mb-2 flex items-center gap-2">
                          <Beaker className="w-4 h-4 text-indigo-400" />
                          Associated Labs
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {module.labs.map(lab => (
                            <button
                              key={lab.id}
                              onClick={() => onLabClick(lab.id)}
                              disabled={lab.locked}
                              className={cn(
                                "flex items-start gap-2 p-2 rounded-lg border text-left transition-all bg-gray-800",
                                lab.locked ? 'cursor-not-allowed opacity-60' : 'hover:shadow-md hover:border-opacity-80 hover:bg-gray-700',
                                getLabTypeColor(lab.type)
                              )}
                              style={{ backgroundColor: 'rgb(31 41 55)' }}
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                {lab.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : lab.locked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <Beaker className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-sm text-cyan-200 truncate">{lab.title}</div>
                                <div className="text-sm mt-1 text-gray-400 line-clamp-1">{lab.description}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={cn(
                                    "px-1.5 py-0.5 rounded-full text-sm border",
                                    getDifficultyColor(lab.difficulty)
                                  )}>
                                    {lab.difficulty}
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    {lab.duration}
                                  </span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dependencies */}
                    {module.dependencies.length > 0 && (
                      <div className="px-4 py-3 border-t border-gray-700 bg-gray-800 overflow-x-auto" style={{ backgroundColor: 'rgb(31 41 55)' }}>
                        <div className="flex items-center gap-2 text-sm text-gray-400 min-w-max">
                          <Users className="w-4 h-4" />
                          <span>Requires:</span>
                          {module.dependencies.map((dep, i) => (
                            <React.Fragment key={dep}>
                              <span className="font-medium text-gray-300">
                                Module {dep}
                              </span>
                              {i < module.dependencies.length - 1 && (
                                <ArrowRight className="w-4 h-4" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="p-3 border-t border-gray-700 flex justify-between items-center bg-gray-800" style={{ backgroundColor: 'rgb(31 41 55)' }}>
                      <div className="flex items-center gap-2">
                        {module.completed ? (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/20 text-green-400 font-medium text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Completed</span>
                          </div>
                        ) : module.locked ? (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-700/50 text-gray-400 font-medium text-sm">
                            <Lock className="w-4 h-4" />
                            <span>Locked</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 font-medium text-sm">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            <span>Ready to start</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (!module.locked) onModuleClick(module.id);
                        }}
                        disabled={module.locked}
                        className={cn(
                          "px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none",
                          module.locked 
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                            : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 focus:ring-indigo-500/50"
                        )}
                      >
                        {module.locked ? (
                          <span>Complete Prerequisites</span>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4" />
                            <span>{module.completed ? "View Module" : "Begin Learning"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Timeline marker */}
                  <div className="absolute left-0 top-6">
                    <div className={cn(
                      "w-10 h-10 rounded-full border-3 flex items-center justify-center",
                      module.completed
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : module.locked
                          ? 'border-gray-700 bg-gray-800 text-gray-500'
                          : 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                    )}>
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : module.locked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        <span className="font-bold">{moduleIndex + 1}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningTimeline; 
import React from 'react';
import { Lock, CheckCircle, Play, ArrowRight, BookOpen, Bug, Shield } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: 'core' | 'optional';
  dependencies: string[];
  phase: 'build' | 'break' | 'mitigate';
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

interface LearningRoadmapProps {
  path: LearningPath;
}

const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ path }) => {
  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'build':
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 'break':
        return <Bug className="w-5 h-5 text-red-400" />;
      case 'mitigate':
        return <Shield className="w-5 h-5 text-blue-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'build':
        return 'border-emerald-500/50 bg-emerald-500/5';
      case 'break':
        return 'border-red-500/50 bg-red-500/5';
      case 'mitigate':
        return 'border-blue-500/50 bg-blue-500/5';
      default:
        return 'border-gray-500/50 bg-gray-500/5';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{path.title}</h1>
        <p className="text-gray-600">{path.description}</p>
      </div>

      <div className="space-y-6">
        {path.modules.map((module, index) => (
          <div
            key={module.id}
            className={`relative border rounded-lg p-6 ${getPhaseColor(module.phase)}`}
          >
            {/* Connection lines */}
            {index < path.modules.length - 1 && (
              <div className="absolute left-1/2 bottom-0 w-0.5 h-6 bg-gray-300 transform translate-y-full"></div>
            )}

            <div className="flex items-start gap-6">
              {/* Module icon and status */}
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 
                  ${module.completed 
                    ? 'border-green-500 bg-green-50' 
                    : module.locked 
                      ? 'border-gray-300 bg-gray-50' 
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  {module.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : module.locked ? (
                    <Lock className="w-6 h-6 text-gray-400" />
                  ) : (
                    <Play className="w-6 h-6 text-blue-500" />
                  )}
                </div>
              </div>

              {/* Module content */}
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {module.title}
                      <span className="flex items-center text-sm font-normal text-gray-500">
                        {getPhaseIcon(module.phase)}
                        <span className="ml-1 capitalize">{module.phase}</span>
                      </span>
                    </h3>
                    <p className="text-gray-600 mt-1">{module.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{module.duration}</span>
                    {module.type === 'optional' && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Optional</span>
                    )}
                  </div>
                </div>

                {/* Dependencies */}
                {module.dependencies.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <span>Requires:</span>
                    {module.dependencies.map((dep, i) => (
                      <React.Fragment key={dep}>
                        <span className="font-medium">
                          {path.modules.find(m => m.id === dep)?.title}
                        </span>
                        {i < module.dependencies.length - 1 && (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Action button */}
                <div className="mt-4">
                  <button
                    disabled={module.locked}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${module.completed
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : module.locked
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                  >
                    {module.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Review Module
                      </>
                    ) : module.locked ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Module
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningRoadmap; 
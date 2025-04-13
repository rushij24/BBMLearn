import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, Clock, Target, BookOpen, Users, Shield, Award } from 'lucide-react';
import { timelineSections } from '../data/mockLearningData';
import LearningTimeline from '../components/learning/LearningTimeline';

const LearningPathPage: React.FC = () => {
  const { pathId } = useParams<{ pathId: string }>();
  const navigate = useNavigate();

  // Find the current path data
  const currentPath = timelineSections.find(section => section.id === pathId);

  if (!currentPath) {
    return (
      <div className="min-h-screen bg-gray-900 py-8 px-4 overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/learning')}
            className="flex items-center text-gray-400 hover:text-white mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Learning
          </button>
          
          <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-4">Learning Path Not Found</h1>
            <p className="text-gray-400 mb-6">
              Sorry, we couldn't find the learning path you're looking for.
            </p>
            <button
              onClick={() => navigate('/learning')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Return to Learning Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate path statistics
  const totalModules = currentPath.modules.length;
  const completedModules = currentPath.modules.filter(module => module.completed).length;
  const totalDuration = currentPath.modules.reduce((total, module) => {
    const hours = parseInt(module.duration.split(' ')[0]);
    return total + hours;
  }, 0);
  const totalLabs = currentPath.modules.reduce((total, module) => total + module.labs.length, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 dark-theme-override overflow-x-hidden">
      {/* Force dark mode styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .dark-theme-override * {
          background-color: transparent; 
        }
        .dark-theme-override .bg-white,
        .dark-theme-override [class*="bg-white"],
        .dark-theme-override [class*="bg-gray-50"],
        .dark-theme-override [class*="bg-gray-100"] {
          background-color: rgb(31 41 55) !important;
          color: rgb(209 213 219) !important;
        }
      `}} />
      
      <div className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="max-w-full mx-auto">
          {/* Navigation */}
          <button
            onClick={() => navigate('/learning')}
            className="flex items-center text-gray-400 hover:text-white mb-4 bg-transparent"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Learning
          </button>

          {/* Main content */}
          <div>
            {/* Path Header */}
            <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 border border-gray-700">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="px-2 py-0.5 bg-indigo-500/30 text-indigo-300 rounded-full text-sm font-medium">
                      Learning Path
                    </div>
                    {completedModules === totalModules ? (
                      <div className="px-2 py-0.5 bg-green-500/30 text-green-300 rounded-full text-sm font-medium">
                        Completed
                      </div>
                    ) : (
                      <div className="px-2 py-0.5 bg-amber-500/30 text-amber-300 rounded-full text-sm font-medium">
                        In Progress
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold mb-1 text-indigo-200">{currentPath.title}</h1>
                  <p className="text-gray-400 max-w-2xl text-base">{currentPath.description}</p>
                </div>
                <div className="flex flex-col items-center px-4 py-3 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                  <Trophy className="w-6 h-6 text-amber-400 mb-1" />
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-300">{currentPath.requiredPoints}</div>
                    <div className="text-xs text-gray-400">points required</div>
                  </div>
                </div>
              </div>

              {/* Path progress bar */}
              <div className="mt-4 mb-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Course Progress</span>
                  <span className="text-indigo-200 font-medium">{Math.round((completedModules / totalModules) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-green-500 transition-all duration-500"
                    style={{ width: `${(completedModules / totalModules) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Path Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700 hover:border-indigo-700/50 transition-colors">
                  <div className="flex items-center gap-2 text-gray-400 mb-1 text-base">
                    <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>Modules</span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-200">
                    {completedModules}/{totalModules}
                  </div>
                  <div className="text-sm text-gray-400 mt-0.5">Completed</div>
                </div>

                <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700 hover:border-amber-700/50 transition-colors">
                  <div className="flex items-center gap-2 text-gray-400 mb-1 text-base">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Duration</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-200">{totalDuration}h</div>
                  <div className="text-sm text-gray-400 mt-0.5">Total hours</div>
                </div>

                <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700 hover:border-blue-700/50 transition-colors">
                  <div className="flex items-center gap-2 text-gray-400 mb-1 text-base">
                    <Target className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Labs</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-200">{totalLabs}</div>
                  <div className="text-sm text-gray-400 mt-0.5">Hands-on practice</div>
                </div>

                <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700 hover:border-green-700/50 transition-colors">
                  <div className="flex items-center gap-2 text-gray-400 mb-1 text-base">
                    <Award className="w-5 h-5 text-green-400 shrink-0" />
                    <span>Certification</span>
                  </div>
                  <div className="text-base font-bold text-green-200 truncate">
                    {currentPath.title.includes("Web") ? "Web Security" : 
                     currentPath.title.includes("Cloud") ? "Cloud Security" : "Security Expert"}
                  </div>
                  <div className="text-sm text-gray-400 mt-0.5">Upon completion</div>
                </div>
              </div>
            </div>

            {/* Skills section */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-300">Skills You'll Learn</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(currentPath.modules.flatMap(module => module.skills || []))).map((skill, index) => (
                  <div key={index} className="px-2 py-0.5 bg-gray-700 rounded-full text-cyan-200 text-sm border border-gray-600 hover:border-cyan-700/50 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 bg-indigo-900/30 px-4 py-2 rounded-lg border-l-4 border-indigo-500">
                <Users className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-300">Learning Journey</span>
                <div className="ml-auto flex items-center gap-2 text-sm text-indigo-300">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span>Interactive modules below</span>
                </div>
              </h2>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <LearningTimeline
                  sections={[currentPath]}
                  currentPoints={250}
                  onModuleClick={(moduleId: string) => navigate(`/learning/module/${moduleId}`)}
                  onLabClick={(labId: string) => navigate(`/learning/lab/${labId}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathPage; 
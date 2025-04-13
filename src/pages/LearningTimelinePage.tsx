import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Brain, Target, ChevronLeft } from 'lucide-react';
import LearningTimeline from '../components/learning/LearningTimeline';
import { timelineSections } from '../data/mockLearningData';

const LearningTimelinePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPoints, setCurrentPoints] = useState(100); // Mock user points

  const handleModuleClick = (moduleId: string) => {
    navigate(`/learning/module/${moduleId}`);
  };

  const handleLabClick = (labId: string) => {
    navigate(`/learning/lab/${labId}`);
  };

  // Calculate total available points
  const totalPoints = timelineSections.reduce((total, section) => {
    return total + section.modules.reduce((sectionTotal, module) => {
      return sectionTotal + module.points;
    }, 0);
  }, 0);

  // Calculate total modules and labs
  const totalModules = timelineSections.reduce((total, section) => {
    return total + section.modules.length;
  }, 0);

  const totalLabs = timelineSections.reduce((total, section) => {
    return total + section.modules.reduce((moduleTotal, module) => {
      return moduleTotal + module.labs.length;
    }, 0);
  }, 0);

  return (
    <>
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

      <div className="dark-theme-override w-full">
        {/* Navigation */}
        <div className="mb-6 bg-transparent">
          <button
            onClick={() => navigate('/learning')}
            className="flex items-center text-gray-400 hover:text-white transition-colors bg-transparent"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Learning
          </button>
        </div>
        
        {/* Header Stats */}
        <div className="mb-8 bg-transparent">
          <h1 className="text-3xl font-bold mb-6 text-white bg-transparent">Learning Journey</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 bg-transparent">
            {/* Points Card */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700" style={{ backgroundColor: 'rgb(31 41 55)' }}>
              <div className="flex items-center justify-between mb-4 bg-transparent">
                <h3 className="text-lg font-semibold text-white bg-transparent">Your Progress</h3>
                <Trophy className="w-6 h-6 text-amber-400 shrink-0" />
              </div>
              <div className="flex items-end gap-2 bg-transparent">
                <div className="text-3xl font-bold text-amber-400 bg-transparent">{currentPoints}</div>
                <div className="text-gray-400 mb-1 bg-transparent">/ {totalPoints} points</div>
              </div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${(currentPoints / totalPoints) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Modules Card */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700" style={{ backgroundColor: 'rgb(31 41 55)' }}>
              <div className="flex items-center justify-between mb-4 bg-transparent">
                <h3 className="text-lg font-semibold text-white bg-transparent">Total Modules</h3>
                <Brain className="w-6 h-6 text-indigo-400 shrink-0" />
              </div>
              <div className="text-3xl font-bold text-indigo-400 bg-transparent">{totalModules}</div>
              <p className="text-gray-400 mt-2 bg-transparent">Learning modules available</p>
            </div>

            {/* Labs Card */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700" style={{ backgroundColor: 'rgb(31 41 55)' }}>
              <div className="flex items-center justify-between mb-4 bg-transparent">
                <h3 className="text-lg font-semibold text-white bg-transparent">Hands-on Labs</h3>
                <Target className="w-6 h-6 text-blue-400 shrink-0" />
              </div>
              <div className="text-3xl font-bold text-blue-400 bg-transparent">{totalLabs}</div>
              <p className="text-gray-400 mt-2 bg-transparent">Practice labs to complete</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <LearningTimeline
            sections={timelineSections}
            currentPoints={currentPoints}
            onModuleClick={handleModuleClick}
            onLabClick={handleLabClick}
          />
        </div>
      </div>
    </>
  );
};

export default LearningTimelinePage; 
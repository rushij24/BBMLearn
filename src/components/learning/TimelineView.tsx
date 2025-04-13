import React from 'react';
import { BookOpen, CheckCircle, Lock } from 'lucide-react';

interface TimelineProps {
  sections: Array<{
    id: string;
    title: string;
    description: string;
    modules: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  }>;
  currentPoints: number;
  onModuleClick: (moduleId: string) => void;
}

const TimelineView: React.FC<TimelineProps> = ({
  sections,
  currentPoints,
  onModuleClick,
}) => {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.id} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-2">{section.title}</h2>
          <p className="text-gray-600 mb-6">{section.description}</p>
          
          <div className="space-y-4">
            {section.modules.map((module) => (
              <button
                key={module.id}
                onClick={() => onModuleClick(module.id)}
                className="w-full text-left p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <h3 className="font-medium">{module.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{module.description}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView; 
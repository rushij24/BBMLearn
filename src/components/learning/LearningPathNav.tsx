import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningPathNavProps } from '../../types/learning';

const LearningPathNav: React.FC<LearningPathNavProps> = ({ currentPathId, paths }) => {
  const navigate = useNavigate();

  const handlePathChange = (pathId: string) => {
    navigate(`/learning-path/${pathId}`);
  };

  return (
    <div className="bg-white shadow rounded-lg mb-6 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Learning Paths</h3>
        <p className="text-sm text-gray-500">Select a learning path to view its roadmap</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paths.map((path) => (
          <div 
            key={path.id}
            onClick={() => handlePathChange(path.id)}
            className={`cursor-pointer p-4 rounded-lg border transition-all ${
              currentPathId === path.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <h4 className="font-medium text-gray-800">{path.title}</h4>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{path.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathNav; 
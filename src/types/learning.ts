export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed?: boolean;
  locked?: boolean;
  type?: string;
  dependencies?: string[];
  phase?: 'learn' | 'build' | 'defend' | 'advanced';
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export interface LearningPathNavProps {
  currentPathId: string;
  paths: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface LearningRoadmapProps {
  path: LearningPath;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  points: number;
  category: string;
  phase?: 'learn' | 'build' | 'defend' | 'advanced';
  completed?: boolean;
  tags?: string[];
  templateCode?: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty?: string;
  duration?: string;
  environment?: string;
  templateCode?: string;
  phase?: 'learn' | 'build' | 'defend' | 'advanced';
  points?: number;
} 
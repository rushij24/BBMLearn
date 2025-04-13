import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Lock, Database, Network, FileCode2, Bug, Target, FileWarning, 
  Server, ShieldCheck, Workflow, Cpu, Shield, Search, Filter, Star, Clock, 
  Bookmark, Play, CheckCircle, ArrowRight, BarChart3, Layers, Zap, X, HelpCircle,
  Home, ChevronRight, Info, Video, Award, UserCircle, Users
} from 'lucide-react';
import { cn } from '../lib/utils';
import { learningPaths, phaseThemes } from '../data/mockData';
import { Tooltip } from '../components/ui/Tooltip';

// Create additional mock data for courses
const courses = [
  {
    id: 1,
    title: 'Web Security Fundamentals',
    description: 'Learn the basics of web security, including common vulnerabilities and defenses.',
    phase: 'build',
    progress: 75,
    duration: '4 hours',
    lessons: 12,
    level: 'Beginner',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    reviews: 127,
    tags: ['OWASP Top 10', 'Web Security', 'Authentication'],
    featured: true,
  },
  {
    id: 2,
    title: 'Advanced Penetration Testing',
    description: 'Master advanced techniques for identifying and exploiting security vulnerabilities.',
    phase: 'break',
    progress: 30,
    duration: '8 hours',
    lessons: 24,
    level: 'Advanced',
    instructor: 'Alex Rivera',
    rating: 4.9,
    reviews: 94,
    tags: ['Penetration Testing', 'Ethical Hacking', 'Exploitation'],
    featured: true,
  },
  {
    id: 3,
    title: 'Secure Coding Practices',
    description: 'Write more secure code by understanding common vulnerabilities and how to prevent them.',
    phase: 'build',
    progress: 0,
    duration: '6 hours',
    lessons: 18,
    level: 'Intermediate',
    instructor: 'Michael Chen',
    rating: 4.7,
    reviews: 86,
    tags: ['Secure Coding', 'SAST', 'Code Review'],
    featured: false,
  },
  {
    id: 4,
    title: 'Incident Response Planning',
    description: 'Learn to create and implement effective incident response plans for security breaches.',
    phase: 'mitigate',
    progress: 100,
    duration: '3 hours',
    lessons: 9,
    level: 'Intermediate',
    instructor: 'Emma Wilson',
    rating: 4.6,
    reviews: 72,
    tags: ['Incident Response', 'Crisis Management', 'Recovery'],
    featured: false,
  },
  {
    id: 5,
    title: 'Network Defense Strategies',
    description: 'Protect your organization with layered network security defenses and monitoring.',
    phase: 'mitigate',
    progress: 50,
    duration: '5 hours',
    lessons: 15,
    level: 'Intermediate',
    instructor: 'David Thompson',
    rating: 4.8,
    reviews: 103,
    tags: ['Network Security', 'Firewalls', 'IDS/IPS'],
    featured: true,
  },
  {
    id: 6,
    title: 'Mobile App Security Testing',
    description: 'Identify and exploit vulnerabilities in mobile applications across platforms.',
    phase: 'break',
    progress: 0,
    duration: '7 hours',
    lessons: 21,
    level: 'Advanced',
    instructor: 'Jasmine Patel',
    rating: 4.9,
    reviews: 58,
    tags: ['Mobile Security', 'Android', 'iOS'],
    featured: false,
  },
];

// Learning resources
const resources = [
  {
    id: 1,
    title: 'OWASP Top 10 Cheat Sheet',
    type: 'cheatsheet',
    format: 'PDF',
    size: '2.4 MB',
  },
  {
    id: 2,
    title: 'Security Tools Reference Guide',
    type: 'reference',
    format: 'HTML',
    size: '1.8 MB',
  },
  {
    id: 3,
    title: 'Secure Code Review Checklist',
    type: 'checklist',
    format: 'PDF',
    size: '1.2 MB',
  },
  {
    id: 4,
    title: 'Incident Response Playbook',
    type: 'guide',
    format: 'DOCX',
    size: '3.5 MB',
  },
];

const LearningPage: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'all' | 'build' | 'break' | 'mitigate'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [previewCourse, setPreviewCourse] = useState<typeof courses[0] | null>(null);
  const navigate = useNavigate();

  // Check if user is new (could be stored in localStorage in a real app)
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenLearningGuide');
    if (hasSeenGuide) {
      setShowWelcomeGuide(false);
    }
  }, []);

  const dismissWelcomeGuide = () => {
    setShowWelcomeGuide(false);
    localStorage.setItem('hasSeenLearningGuide', 'true');
  };

  // Filter courses based on active phase and search term
  const filteredCourses = courses.filter(course => 
    (activePhase === 'all' || course.phase === activePhase) &&
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Get theme colors based on phase
  const getThemeColors = (phase: string) => {
    return phaseThemes[phase as keyof typeof phaseThemes] || phaseThemes.build;
  };

  const PhaseButton = ({ label, id, color }: { label: string; id: string; color: string }) => (
    <button
      onClick={() => setActivePhase(id as any)}
      className={cn(
        "flex items-center gap-2 py-2 px-4 rounded-lg transition-all border",
        activePhase === id
          ? `${color} border-current text-white`
          : 'bg-gray-800/50 border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'
      )}
    >
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  const CoursePreviewModal = ({ course, onClose }: { course: typeof courses[0]; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
        <div className="bg-gray-800 rounded-lg max-w-5xl w-full border border-gray-700 shadow-lg overflow-hidden">
          <div className="relative">
            {/* Placeholder for video preview - in a real app, this would be a video player */}
            <div className="w-full aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Video size={48} className="mx-auto mb-4 text-indigo-400 opacity-50" />
                <p className="text-gray-400">Course preview video</p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-300">{course.description}</p>
                
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 font-medium">{course.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({course.reviews} reviews)</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {course.duration} • {course.level}
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "px-3 py-1 rounded-lg text-sm font-medium",
                course.phase === 'build' ? 'bg-emerald-500/20 text-emerald-400' :
                course.phase === 'break' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
              )}>
                {course.phase.charAt(0).toUpperCase() + course.phase.slice(1)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mb-6">
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <Award size={18} className="mr-2 text-indigo-400" /> What You'll Learn
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex">
                    <CheckCircle size={16} className="mr-2 text-green-400 shrink-0 mt-0.5" />
                    <span>Security fundamentals and best practices</span>
                  </li>
                  <li className="flex">
                    <CheckCircle size={16} className="mr-2 text-green-400 shrink-0 mt-0.5" />
                    <span>Practical implementation skills</span>
                  </li>
                  <li className="flex">
                    <CheckCircle size={16} className="mr-2 text-green-400 shrink-0 mt-0.5" />
                    <span>Real-world security scenarios</span>
                  </li>
                  <li className="flex">
                    <CheckCircle size={16} className="mr-2 text-green-400 shrink-0 mt-0.5" />
                    <span>How to identify and mitigate risks</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <UserCircle size={18} className="mr-2 text-indigo-400" /> Instructor
                </h3>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-gray-400">Security Expert</div>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Expert with over 10 years of experience in the cybersecurity field.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <Users size={18} className="mr-2 text-indigo-400" /> This Course Includes
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <Video size={16} className="mr-2 text-indigo-400" />
                    <span>{course.lessons} video lessons</span>
                  </li>
                  <li className="flex items-center">
                    <FileCode2 size={16} className="mr-2 text-indigo-400" />
                    <span>4 practical exercises</span>
                  </li>
                  <li className="flex items-center">
                    <Target size={16} className="mr-2 text-indigo-400" />
                    <span>2 hands-on labs</span>
                  </li>
                  <li className="flex items-center">
                    <Award size={16} className="mr-2 text-indigo-400" />
                    <span>Completion certificate</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium"
              >
                Close Preview
              </button>
              
              <button
                className={cn(
                  "py-2 px-4 rounded-lg text-white font-medium flex items-center",
                  course.phase === 'build' ? 'bg-emerald-600 hover:bg-emerald-700' :
                  course.phase === 'break' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-blue-600 hover:bg-blue-700'
                )}
              >
                <Play size={16} className="mr-2" />
                {course.progress > 0 && course.progress < 100 ? 'Continue Learning' : 'Start Learning'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CourseCard = ({ course }: { course: typeof courses[0] }) => {
    const theme = getThemeColors(course.phase);
    const navigate = useNavigate();
    
    const handleStartCourse = () => {
      // Convert the course title to a URL-friendly slug
      const moduleId = course.title.toLowerCase().replace(/\s+/g, '-');
      navigate(`/learning/module/${moduleId}`);
    };
    
    return (
      <div 
        className={cn(
          "bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-all",
          course.featured && "ring-2 ring-indigo-500/20",
          course.level === 'Beginner' && "ring-2 ring-emerald-500/30"
        )}
      >
        <div className={cn(
          "h-2",
          theme.primary,
          course.progress > 0 && `w-[${course.progress}%]`
        )} style={{ width: `${course.progress}%` }}></div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium text-lg mb-1">{course.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{course.description}</p>
            </div>
            <div className="flex flex-col gap-1">
              {course.featured && (
                <div className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded font-medium">
                  Featured
                </div>
              )}
              {course.level === 'Beginner' && (
                <div className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded font-medium">
                  Beginner Friendly
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Layers size={14} />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <BarChart3 size={14} />
              <span className={cn(
                course.level === 'Beginner' && 'text-emerald-400',
                course.level === 'Intermediate' && 'text-yellow-400',
                course.level === 'Advanced' && 'text-red-400'
              )}>
                {course.level}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400" size={14} />
              <span className="text-sm font-medium">{course.rating}</span>
              <span className="text-xs text-gray-400">({course.reviews})</span>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors">
                <Bookmark size={16} />
              </button>
              
              {course.progress === 0 ? (
                <button 
                  onClick={handleStartCourse}
                  className={cn(
                    "flex items-center gap-1 py-1.5 px-3 rounded-lg text-white text-sm font-medium",
                    theme.primary
                  )}>
                  <Play size={14} />
                  <span>Start</span>
                </button>
              ) : course.progress === 100 ? (
                <button 
                  onClick={handleStartCourse}
                  className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-gray-700 text-white text-sm font-medium"
                >
                  <CheckCircle size={14} className="text-green-400" />
                  <span>Review</span>
                </button>
              ) : (
                <button 
                  onClick={handleStartCourse}
                  className={cn(
                    "flex items-center gap-1 py-1.5 px-3 rounded-lg text-white text-sm font-medium",
                    theme.primary
                  )}>
                  <Zap size={14} />
                  <span>Continue</span>
                </button>
              )}
            </div>
          </div>
          
          {course.level === 'Beginner' && course.phase === 'build' && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-emerald-400 flex items-start">
                <Info size={12} className="mr-1 mt-0.5 flex-shrink-0" />
                Perfect starting point for cybersecurity beginners. No prior knowledge required.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const WelcomeGuide = () => (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg max-w-3xl w-full border border-indigo-500 shadow-lg shadow-indigo-500/20">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-400">Welcome to Your Cybersecurity Learning Journey!</h2>
            <button 
              onClick={dismissWelcomeGuide}
              className="text-gray-400 hover:text-white p-2"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-gray-300">
            New to cybersecurity? Don't worry! We've designed this platform to help you learn step-by-step, 
            even if you're starting from zero knowledge.
          </p>
          
          <div className="bg-gray-700/30 p-4 rounded-lg border border-indigo-700/30 mb-2">
            <h3 className="font-bold text-white mb-2 flex items-center">
              <Target size={18} className="mr-2 text-indigo-400" /> Where to Start:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li><span className="text-indigo-400 font-semibold">Begin with the "Start Here" section</span> at the top of the page</li>
              <li>Choose the <span className="text-emerald-400 font-semibold">BUILD</span> category first to learn fundamentals</li>
              <li>Select courses marked <span className="text-yellow-400 font-semibold">Beginner</span> level</li>
            </ol>
          </div>
          
          <p className="text-gray-300">
            Your cybersecurity learning is organized into three core areas:
          </p>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
              <h3 className="font-bold text-emerald-400 flex items-center mb-2">
                <Lock size={18} className="mr-2" /> BUILD
              </h3>
              <p className="text-sm text-gray-300">Learn to create secure systems and applications from the ground up.</p>
              <div className="mt-2 text-xs bg-emerald-900/50 p-2 rounded border border-emerald-800/50">
                <span className="font-semibold">Start here if you're new!</span> These courses teach the foundations.
              </div>
            </div>
            
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h3 className="font-bold text-red-400 flex items-center mb-2">
                <Bug size={18} className="mr-2" /> BREAK
              </h3>
              <p className="text-sm text-gray-300">Master techniques to identify vulnerabilities and security weaknesses.</p>
              <div className="mt-2 text-xs bg-red-900/50 p-2 rounded border border-red-800/50">
                <span className="font-semibold">Next step after BUILD.</span> Learn to find security flaws.
              </div>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h3 className="font-bold text-blue-400 flex items-center mb-2">
                <Shield size={18} className="mr-2" /> MITIGATE
              </h3>
              <p className="text-sm text-gray-300">Develop strategies to protect systems against identified threats.</p>
              <div className="mt-2 text-xs bg-blue-900/50 p-2 rounded border border-blue-800/50">
                <span className="font-semibold">Advanced concepts.</span> Learn after mastering BUILD and BREAK.
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => {
                dismissWelcomeGuide();
                setActivePhase('build');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <BookOpen size={16} className="mr-2" />
              Start with BUILD
            </button>
            
            <button 
              onClick={dismissWelcomeGuide}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Explore Platform
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      {/* Show welcome guide for new users */}
      {showWelcomeGuide && <WelcomeGuide />}
      
      {/* Course preview modal */}
      {previewCourse && (
        <CoursePreviewModal 
          course={previewCourse} 
          onClose={() => setPreviewCourse(null)} 
        />
      )}
      
      {/* Breadcrumbs navigation */}
      <div className="flex items-center text-sm text-gray-400 mb-2">
        <a href="#" className="hover:text-white flex items-center">
          <Home size={14} className="mr-1" /> Home
        </a>
        <ChevronRight size={14} className="mx-1" />
        <span className="text-white">Learning</span>
      </div>

      {/* Page Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Learning</h1>
          <p className="text-gray-400">
            Explore courses, learning paths, and resources to build your cybersecurity skills
          </p>
        </div>
        
        <div className="relative">
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full"
            onClick={() => setActiveTooltip(activeTooltip === 'help' ? null : 'help')}
          >
            <HelpCircle size={18} />
          </button>
          
          {activeTooltip === 'help' && (
            <div className="absolute right-0 top-10 w-64 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 z-10">
              <h4 className="font-bold mb-2 text-white">Need Help?</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="bg-indigo-500/20 text-indigo-400 p-1 rounded mr-2">
                    <Filter size={12} />
                  </span>
                  Filter courses by phase
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-500/20 text-indigo-400 p-1 rounded mr-2">
                    <Search size={12} />
                  </span>
                  Search for specific topics
                </li>
                <li className="flex items-start">
                  <span className="bg-indigo-500/20 text-indigo-400 p-1 rounded mr-2">
                    <Bookmark size={12} />
                  </span>
                  Save courses for later
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main content area with scrolling */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Learning Roadmaps Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="border-b border-gray-700 p-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg flex items-center">
              <Workflow className="mr-2 text-indigo-400" size={18} /> Learning Paths
            </h2>
            <button className="text-xs text-gray-400 flex items-center hover:text-white transition-colors">
              View Details <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Beginner Path */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-emerald-600/10 rounded-lg transition-all group-hover:from-emerald-600/30 group-hover:to-emerald-600/20"></div>
                <div className="relative bg-gray-850/50 rounded-lg border border-emerald-600/30 p-4 hover:border-emerald-500 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-emerald-400 mb-1 flex items-center">
                        <Target size={16} className="mr-2" /> Beginner Path
                      </h3>
                      <p className="text-sm text-gray-300">Perfect starting point for cybersecurity</p>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">Recommended</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-2">1</div>
                      <span className="text-gray-300">Cybersecurity Fundamentals</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-2">2</div>
                      <span className="text-gray-300">Basic Web Security</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-2">3</div>
                      <span className="text-gray-300">Network Security Basics</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>Duration: ~3 months</span>
                    <span>12 courses</span>
                  </div>
                  <button 
                    onClick={() => navigate('/learning/path/fundamentals')}
                    className="mt-3 w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Start Beginner Path
                  </button>
                </div>
              </div>

              {/* Intermediate Path */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-600/10 rounded-lg transition-all group-hover:from-blue-600/30 group-hover:to-blue-600/20"></div>
                <div className="relative bg-gray-850/50 rounded-lg border border-blue-600/30 p-4 hover:border-blue-500 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-blue-400 mb-1 flex items-center">
                        <Shield size={16} className="mr-2" /> Intermediate Path
                      </h3>
                      <p className="text-sm text-gray-300">Advance your security expertise</p>
                    </div>
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">Popular</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-2">1</div>
                      <span className="text-gray-300">Advanced Web Security</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-2">2</div>
                      <span className="text-gray-300">Secure Development</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-2">3</div>
                      <span className="text-gray-300">Security Testing</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>Duration: ~6 months</span>
                    <span>18 courses</span>
                  </div>
                  <button 
                    onClick={() => navigate('/learning/path/web-security')}
                    className="mt-3 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Start Intermediate Path
                  </button>
                </div>
              </div>

              {/* Expert Path */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-600/10 rounded-lg transition-all group-hover:from-purple-600/30 group-hover:to-purple-600/20"></div>
                <div className="relative bg-gray-850/50 rounded-lg border border-purple-600/30 p-4 hover:border-purple-500 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-purple-400 mb-1 flex items-center">
                        <Zap size={16} className="mr-2" /> Expert Path
                      </h3>
                      <p className="text-sm text-gray-300">Master advanced security concepts</p>
                    </div>
                    <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">Advanced</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-2">1</div>
                      <span className="text-gray-300">Advanced Exploitation</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-2">2</div>
                      <span className="text-gray-300">Reverse Engineering</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-2">3</div>
                      <span className="text-gray-300">Advanced Defense</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>Duration: ~9 months</span>
                    <span>24 courses</span>
                  </div>
                  <button 
                    onClick={() => navigate('/learning/path/advanced-security')}
                    className="mt-3 w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Start Expert Path
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Tooltip text="View all available courses">
                <PhaseButton label="All Courses" id="all" color="bg-indigo-600" />
              </Tooltip>
              <Tooltip text="Courses on building secure systems">
                <PhaseButton label="Build" id="build" color="bg-emerald-600" />
              </Tooltip>
              <Tooltip text="Courses on finding vulnerabilities">
                <PhaseButton label="Break" id="break" color="bg-red-600" />
              </Tooltip>
              <Tooltip text="Courses on implementing defenses">
                <PhaseButton label="Mitigate" id="mitigate" color="bg-blue-600" />
              </Tooltip>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>
              
              <div className="flex rounded-lg overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={cn(
                    "p-2 flex items-center justify-center", 
                    viewMode === 'grid' 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  )}
                >
                  <Layers size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={cn(
                    "p-2 flex items-center justify-center", 
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
        </div>

        {/* Interactive quick filters sidebar */}
        <div className="flex gap-6">
          <div className="w-1/5 bg-gray-800 rounded-lg p-4 border border-gray-700 h-min">
            <h3 className="font-medium mb-3 flex items-center">
              <Filter size={16} className="mr-2 text-indigo-400" /> Quick Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-400 mb-2">Difficulty</h4>
                <div className="space-y-1">
                  <label className="flex items-center text-sm cursor-pointer bg-emerald-900/20 p-1.5 rounded border border-emerald-900/30">
                    <input type="checkbox" className="mr-2" /> 
                    <span className="flex items-center">
                      Beginner
                      <span className="ml-2 text-xs bg-emerald-900/50 px-1.5 py-0.5 rounded text-emerald-300">Recommended</span>
                    </span>
                  </label>
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> Intermediate
                  </label>
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> Advanced
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-400 mb-2">Learning Phase</h4>
                <div className="space-y-1">
                  <label className="flex items-center text-sm cursor-pointer bg-emerald-900/20 p-1.5 rounded border border-emerald-900/30">
                    <input type="checkbox" className="mr-2" /> 
                    <span className="flex items-center">
                      BUILD
                      <span className="ml-2 text-xs bg-emerald-900/50 px-1.5 py-0.5 rounded text-emerald-300">Start Here</span>
                    </span>
                  </label>
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> BREAK
                  </label>
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> MITIGATE
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-400 mb-2">Duration</h4>
                <div className="space-y-1">
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> &lt; 2 hours
                  </label>
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> 2-5 hours
                  </label>
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> &gt; 5 hours
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-400 mb-2">Progress</h4>
                <div className="space-y-1">
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> Not Started
                  </label>
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> In Progress
                  </label>
                  <label className="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2" /> Completed
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-4/5">
            {/* Beginner guidance heading */}
            {activePhase === 'all' && (
              <div className="mb-4 pb-4 border-b border-gray-700">
                <h3 className="text-lg font-medium mb-2">Recommended Learning Path</h3>
                <p className="text-gray-400 text-sm">
                  New to cybersecurity? We recommend starting with <span className="text-emerald-400 font-medium">BUILD</span> courses at the <span className="text-emerald-400 font-medium">Beginner</span> level, 
                  then progressing to more advanced topics.
                </p>
              </div>
            )}
            
            {/* Courses grid */}
            <div className="grid grid-cols-3 gap-4">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>

        {/* Resources section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="border-b border-gray-700 p-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg flex items-center">
              <FileCode2 className="mr-2 text-indigo-400" size={18} /> Resources
            </h2>
            <button className="text-xs text-gray-400 flex items-center hover:text-white transition-colors">
              View All <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
          <div className="p-6 grid grid-cols-4 gap-4">
            {resources.map(resource => (
              <div 
                key={resource.id} 
                className="bg-gray-750 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-sm">{resource.title}</h3>
                  <div className={cn(
                    "text-xs px-2 py-0.5 rounded",
                    resource.type === 'cheatsheet' ? "bg-indigo-500/20 text-indigo-400" :
                    resource.type === 'reference' ? "bg-blue-500/20 text-blue-400" :
                    resource.type === 'checklist' ? "bg-green-500/20 text-green-400" :
                    "bg-amber-500/20 text-amber-400"
                  )}>
                    {resource.type}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{resource.format}</span>
                  <span>{resource.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage; 
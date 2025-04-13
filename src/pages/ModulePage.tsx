import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Home, BookOpen, Video, FileText, 
  CheckCircle, Lock, Play, ArrowLeft, List, Layout,
  MessageSquare, Users, Award, Download, Terminal,
  MonitorPlay, FileQuestion, Code2, ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data for a module
const moduleData = {
  'web-security-fundamentals': {
    id: 'web-security-fundamentals',
    title: 'Web Security Fundamentals',
    description: 'Learn the basics of web security, including common vulnerabilities and defenses.',
    instructor: 'Dr. Sarah Johnson',
    duration: '4 hours',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Web Security',
        duration: '15:00',
        type: 'theory',
        completed: true,
        content: {
          video: {
            url: 'https://example.com/video1',
            transcript: 'Video transcript here...'
          },
          text: {
            sections: [
              {
                title: 'What is Web Security?',
                content: `Web security is the practice of protecting websites, web applications, and web services 
                from various security threats. In this module, we'll explore the fundamental concepts and 
                practical approaches to securing web applications.`,
                type: 'text'
              },
              {
                title: 'Key Concepts',
                content: [
                  'Confidentiality - Keeping data private',
                  'Integrity - Ensuring data hasn\'t been tampered with',
                  'Availability - Making sure systems are accessible',
                  'Authentication - Verifying user identity',
                  'Authorization - Controlling access to resources'
                ],
                type: 'list'
              },
              {
                title: 'Interactive Example',
                content: `Let's look at a simple example of how a web request works:`,
                type: 'terminal',
                command: 'curl -v https://api.example.com/users',
                output: `* Connected to api.example.com
> GET /users HTTP/1.1
> Host: api.example.com
> User-Agent: curl/7.64.1
< HTTP/1.1 200 OK
< Content-Type: application/json`
              }
            ]
          }
        }
      },
      {
        id: 2,
        title: 'Understanding HTTP Security',
        duration: '20:00',
        type: 'practical',
        completed: true,
        content: {
          video: {
            url: 'https://example.com/video2',
            transcript: 'Video transcript here...'
          },
          text: {
            sections: [
              {
                title: 'HTTP Security Headers',
                content: `Security headers are HTTP response headers that your application can use to increase
                the security of your application. Once set, these HTTP response headers can prevent browsers
                from running into easily preventable vulnerabilities.`,
                type: 'text'
              },
              {
                title: 'Hands-on Exercise',
                type: 'interactive',
                challenge: {
                  description: 'Analyze the following HTTP response headers and identify security issues:',
                  setup: `HTTP/1.1 200 OK
Server: Apache/2.4.29
X-Powered-By: PHP/7.2.24
Content-Type: text/html`,
                  question: 'Which security headers are missing from this response?',
                  hints: [
                    'Think about XSS protection',
                    'Consider frame injection protection',
                    'What about transport security?'
                  ],
                  answer: [
                    'X-XSS-Protection',
                    'X-Frame-Options',
                    'Strict-Transport-Security'
                  ]
                }
              },
              {
                title: 'Practice Terminal',
                type: 'terminal',
                command: 'curl -I https://example.com',
                interactive: true,
                expectedCommands: [
                  'curl -I',
                  'curl --head',
                  'wget --spider'
                ]
              }
            ]
          }
        }
      },
      {
        id: 3,
        title: 'Common Web Vulnerabilities',
        duration: '25:00',
        type: 'video',
        completed: false,
      },
      {
        id: 4,
        title: 'Hands-on: Finding XSS Vulnerabilities',
        duration: '30:00',
        type: 'lab',
        completed: false,
      },
      {
        id: 5,
        title: 'Secure Authentication Practices',
        duration: '25:00',
        type: 'video',
        completed: false,
        locked: true,
      },
      {
        id: 6,
        title: 'Final Assessment',
        duration: '45:00',
        type: 'assessment',
        completed: false,
        locked: true,
      },
    ],
    materials: [
      {
        title: 'Course Slides',
        type: 'pdf',
        size: '2.4 MB',
      },
      {
        title: 'Lab Environment Setup Guide',
        type: 'pdf',
        size: '1.1 MB',
      },
      {
        title: 'Security Tools Reference',
        type: 'doc',
        size: '850 KB',
      },
    ],
  }
};

const ModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [learningMode, setLearningMode] = useState<'video' | 'text'>('text');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const module = moduleData[moduleId as keyof typeof moduleData];
  
  if (!module) {
    return <div>Module not found</div>;
  }

  const progress = Math.round(
    (module.lessons.filter(lesson => lesson.completed).length / module.lessons.length) * 100
  );

  const LessonTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'theory':
        return <BookOpen size={16} className="text-blue-400" />;
      case 'practical':
        return <Terminal size={16} className="text-green-400" />;
      case 'assessment':
        return <FileQuestion size={16} className="text-purple-400" />;
      default:
        return <Video size={16} />;
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentLesson = module.lessons[activeLesson];
    if (currentLesson.content?.text.sections.find(s => s.type === 'terminal')?.expectedCommands?.includes(terminalInput)) {
      setTerminalOutput(prev => [...prev, `$ ${terminalInput}`, '✓ Correct command! Moving to next step...']);
    } else {
      setTerminalOutput(prev => [...prev, `$ ${terminalInput}`, 'Command not recognized. Try again.']);
    }
    setTerminalInput('');
  };

  const renderContent = () => {
    const lesson = module.lessons[activeLesson];
    if (!lesson.content) return null;

    if (learningMode === 'video' && lesson.content.video) {
      return (
        <div className="space-y-6">
          <div className="aspect-video bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center">
              <Video size={48} className="mx-auto mb-4 text-indigo-400 opacity-50" />
              <p className="text-gray-400">Video lesson</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Transcript</h3>
            <p className="text-sm text-gray-400">{lesson.content.video.transcript}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {lesson.content.text.sections.map((section, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">{section.title}</h3>
            
            {section.type === 'text' && (
              <p className="text-gray-300">{section.content}</p>
            )}

            {section.type === 'list' && Array.isArray(section.content) && (
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {section.type === 'terminal' && (
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                {section.interactive ? (
                  <div>
                    <div className="mb-4 text-gray-400">
                      {terminalOutput.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                    <form onSubmit={handleTerminalSubmit} className="flex items-center">
                      <span className="text-green-400 mr-2">$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-white"
                        placeholder="Enter your command..."
                      />
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="text-green-400">$ {section.command}</div>
                    <pre className="text-gray-300 mt-2">{section.output}</pre>
                  </div>
                )}
              </div>
            )}

            {section.type === 'interactive' && section.challenge && (
              <div className="space-y-4">
                <p className="text-gray-300">{section.challenge.description}</p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300">
                  {section.challenge.setup}
                </div>
                <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-lg p-4">
                  <h4 className="font-medium text-indigo-400 mb-2">Challenge</h4>
                  <p className="text-gray-300">{section.challenge.question}</p>
                </div>
                <div className="space-y-2">
                  <button className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
                    <ExternalLink size={14} />
                    <span>Need a hint?</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      {/* Breadcrumb navigation */}
      <div className="flex items-center text-sm text-gray-400 mb-4">
        <a href="#" className="hover:text-white flex items-center">
          <Home size={14} className="mr-1" /> Home
        </a>
        <ChevronRight size={14} className="mx-1" />
        <a href="#" className="hover:text-white" onClick={() => navigate('/learning')}>
          Learning
        </a>
        <ChevronRight size={14} className="mx-1" />
        <span className="text-white">{module.title}</span>
      </div>

      {/* Module overview panel */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-indigo-300">{module.title}</h1>
            <p className="text-gray-400 mt-1">{module.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Duration</div>
                <div className="font-medium text-indigo-200">{module.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center">
                <Award className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Progress</div>
                <div className="font-medium text-green-300">{progress}% Complete</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-green-500 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className={cn(
          "bg-gray-800 border-r border-gray-700 transition-all rounded-l-lg",
          showSidebar ? "w-80" : "w-0"
        )}>
          {showSidebar && (
            <div className="p-4">
              <div className="mb-6">
                <h2 className="text-md font-semibold mb-2 text-indigo-300">Course Instructor</h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-200 font-semibold">
                    {module.instructor.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-indigo-100">{module.instructor}</div>
                    <div className="text-sm text-gray-400">Instructor</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2 text-indigo-300">Course Content</h3>
              </div>

              {/* Lessons list */}
              <div className="space-y-2">
                {module.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => !lesson.locked && setActiveLesson(index)}
                    className={cn(
                      "w-full p-3 rounded-lg text-left transition-all",
                      activeLesson === index ? "bg-indigo-500/20 border border-indigo-500/30" : "hover:bg-gray-700/50",
                      lesson.locked && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <LessonTypeIcon type={lesson.type} />
                        <span className={cn(
                          "ml-2 font-medium",
                          lesson.locked ? "text-gray-400" : "text-white"
                        )}>
                          {lesson.title}
                        </span>
                      </div>
                      {lesson.locked ? (
                        <Lock size={14} className="text-gray-500" />
                      ) : lesson.completed ? (
                        <CheckCircle size={14} className="text-green-400" />
                      ) : (
                        <Play size={14} className="text-blue-400" />
                      )}
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{lesson.duration}</span>
                      <span className="italic">{getStatusText(lesson)}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Materials section */}
              {module.materials && module.materials.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-3 text-indigo-300">Course Materials</h3>
                  <div className="space-y-2">
                    {module.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                        <div className="flex items-center gap-2">
                          <Download size={14} className="text-cyan-400" />
                          <span className="text-cyan-100">{material.title}</span>
                        </div>
                        <span className="text-xs text-gray-400">{material.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-gray-900 rounded-r-lg">
          {/* Top bar */}
          <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between rounded-tr-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 hover:bg-gray-700 rounded-lg text-cyan-300"
                title={showSidebar ? "Hide sidebar" : "Show sidebar"}
              >
                <List size={20} />
              </button>

              {/* Learning mode toggle */}
              <div className="bg-gray-700 rounded-lg p-1 flex">
                <button
                  onClick={() => setLearningMode('text')}
                  className={cn(
                    "px-3 py-1 rounded flex items-center gap-2 text-sm transition-colors",
                    learningMode === 'text' 
                      ? "bg-gray-600 text-white" 
                      : "text-gray-400 hover:text-cyan-300"
                  )}
                >
                  <FileText size={14} />
                  <span>Text</span>
                </button>
                <button
                  onClick={() => setLearningMode('video')}
                  className={cn(
                    "px-3 py-1 rounded flex items-center gap-2 text-sm transition-colors",
                    learningMode === 'video'
                      ? "bg-gray-600 text-white"
                      : "text-gray-400 hover:text-cyan-300"
                  )}
                >
                  <MonitorPlay size={14} />
                  <span>Video</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-900/40 hover:bg-indigo-800/50 rounded-lg border border-indigo-700/50">
                <MessageSquare size={16} className="text-indigo-400" />
                <span className="text-indigo-200">Discussion</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-900/40 hover:bg-purple-800/50 rounded-lg border border-purple-700/50">
                <Users size={16} className="text-purple-400" />
                <span className="text-purple-200">Study Group</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-900/40 hover:bg-cyan-800/50 rounded-lg border border-cyan-700/50">
                <Download size={16} className="text-cyan-400" />
                <span className="text-cyan-200">Resources</span>
              </button>
            </div>
          </div>

          {/* Lesson content */}
          <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(100vh - 15rem)' }}>
            <div className="max-w-4xl mx-auto">
              <div className="mb-4 flex items-center">
                <div className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mr-3",
                  getLessonStatusClass(module.lessons[activeLesson])
                )}>
                  {getLessonStatusText(module.lessons[activeLesson])}
                </div>
                <h2 className="text-2xl font-bold">
                  {module.lessons[activeLesson].title}
                </h2>
              </div>
              
              {renderContent()}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => activeLesson > 0 && setActiveLesson(activeLesson - 1)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg",
                    activeLesson > 0
                      ? "bg-gray-700 hover:bg-gray-600 text-cyan-200"
                      : "bg-gray-800 opacity-50 cursor-not-allowed text-gray-500"
                  )}
                >
                  <ArrowLeft size={16} />
                  <span>Previous Lesson</span>
                </button>

                <button
                  onClick={() => {
                    if (activeLesson < module.lessons.length - 1 && !module.lessons[activeLesson + 1].locked) {
                      setActiveLesson(activeLesson + 1);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg",
                    activeLesson < module.lessons.length - 1 && !module.lessons[activeLesson + 1].locked
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white"
                      : "bg-gray-800 opacity-50 cursor-not-allowed text-gray-500"
                  )}
                >
                  <span>Next Lesson</span>
                  <Play size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these helper functions above the return statement
const getStatusText = (lesson: any) => {
  if (lesson.locked) return "Locked";
  if (lesson.completed) return "Completed";
  return "Not started";
};

const getLessonStatusText = (lesson: any) => {
  if (lesson.locked) return "Locked";
  if (lesson.completed) return "Completed";
  return "In Progress";
};

const getLessonStatusClass = (lesson: any) => {
  if (lesson.locked) return "bg-gray-600/50 text-gray-400";
  if (lesson.completed) return "bg-green-500/20 text-green-400";
  return "bg-blue-500/20 text-blue-400";
};

export default ModulePage; 
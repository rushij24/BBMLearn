import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Terminal, Play, Pause, RotateCcw, Download, Upload, BookOpen, Beaker, Target, Clock, Construction, Hammer, Shield } from 'lucide-react';
import Editor from "@monaco-editor/react";
import ReactMarkdown from 'react-markdown';
import { challenges, labTemplates } from '../data/mockData';

// Extend Lab interface to include Challenge type properties
interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  type: 'hands-on' | 'guided' | 'challenge';
  moduleId: string;
  moduleName: string;
  instructions: string;
  tasks: string[];
  resources: string[];
  codeTemplate: string;
  completed: boolean;
  phase?: string;
  points?: number;
}

const LabPage: React.FC = () => {
  const { labId } = useParams<{ labId: string }>();
  const navigate = useNavigate();
  const [isLabRunning, setIsLabRunning] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [currentTask, setCurrentTask] = useState(0);
  const [targetSystem, setTargetSystem] = useState<'server' | 'application' | 'network'>('application');
  const [findings, setFindings] = useState<string[]>([]);

  // Check if labId is numeric (challenge) or string (module lab)
  const isChallenge = /^\d+$/.test(labId || '');
  
  // Get challenge data if it's a challenge
  const challenge = isChallenge ? challenges.find(c => c.id === parseInt(labId || '0')) : null;
  
  // If it's a challenge, get the template from labTemplates
  const challengeTemplate = challenge?.template && challenge.phase 
    ? labTemplates[challenge.phase as keyof typeof labTemplates][challenge.template as keyof (typeof labTemplates)[keyof typeof labTemplates]]
    : null;

  // Mock lab data - used if not a challenge or challenge data not found
  const defaultLab: Lab = {
    id: labId || 'lab-1',
    title: 'Web Security Headers Implementation',
    description: 'Learn how to implement proper security headers in a web application to protect against common web vulnerabilities.',
    difficulty: 'intermediate',
    duration: '45 min',
    type: 'hands-on',
    moduleId: 'web-security-fundamentals',
    moduleName: 'Web Security Fundamentals',
    instructions: `# Lab Instructions

In this lab, you will implement security headers for a web application to defend against common web attacks.

1. Review the server.js file provided in the editor
2. Add appropriate security headers to protect against:
   - Cross-Site Scripting (XSS)
   - Clickjacking
   - MIME type sniffing
   - Content Security Policy violations
3. Test your implementation using the built-in security scanner
4. Submit your solution when all security checks pass`,
    tasks: [
      'Implement X-XSS-Protection header',
      'Add Content-Security-Policy header',
      'Add X-Frame-Options header to prevent clickjacking',
      'Configure Strict-Transport-Security header',
      'Add X-Content-Type-Options: nosniff header'
    ],
    resources: [
      'OWASP Secure Headers Project',
      'Content Security Policy Documentation',
      'Mozilla Web Security Guidelines'
    ],
    codeTemplate: `// server.js
const express = require('express');
const app = express();

app.use(express.static('public'));

// TODO: Implement security headers middleware
app.use((req, res, next) => {
  // Add your security headers here
  
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    completed: false
  };

  // Create lab from challenge if it exists
  const lab: Lab = challenge ? {
    id: challenge.id.toString(),
    title: challenge.title,
    description: challenge.description,
    difficulty: mapDifficulty(challenge.difficulty),
    duration: '45 min', // Default
    type: mapPhaseToType(challenge.phase),
    moduleId: '',
    moduleName: mapPhaseToName(challenge.phase),
    instructions: challengeTemplate?.description || defaultLab.instructions,
    tasks: challengeTemplate?.tests || challenge.topics,
    resources: challenge.resources,
    codeTemplate: extractCodeTemplate(challengeTemplate?.description) || defaultLab.codeTemplate,
    completed: challenge.completed,
    phase: challenge.phase,
    points: challenge.points
  } : defaultLab;

  // Map difficulty from challenge to lab difficulty
  function mapDifficulty(difficulty: string): 'beginner' | 'intermediate' | 'advanced' {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'beginner';
      case 'medium': return 'intermediate';
      case 'hard':
      case 'expert': 
        return 'advanced';
      default: return 'intermediate';
    }
  }

  // Map phase to lab type
  function mapPhaseToType(phase: string): 'hands-on' | 'guided' | 'challenge' {
    switch (phase) {
      case 'build': return 'hands-on';
      case 'break': return 'challenge';
      case 'mitigate': return 'guided';
      default: return 'hands-on';
    }
  }

  // Map phase to module name
  function mapPhaseToName(phase: string): string {
    switch (phase) {
      case 'build': return 'Build Phase';
      case 'break': return 'Break Phase';
      case 'mitigate': return 'Mitigate Phase';
      default: return 'Security Lab';
    }
  }

  // Extract code template from description markdown
  function extractCodeTemplate(markdown?: string): string | null {
    if (!markdown) return null;
    
    const codeBlockRegex = /```(?:javascript|js|)\n([\s\S]*?)```/;
    const match = markdown.match(codeBlockRegex);
    
    return match ? match[1] : null;
  }

  const startLab = () => {
    setIsLabRunning(true);
  };

  const stopLab = () => {
    setIsLabRunning(false);
  };

  const resetLab = () => {
    setEditorContent(lab.codeTemplate);
    setIsLabRunning(false);
  };

  // Set initial editor content
  React.useEffect(() => {
    if (lab.codeTemplate) {
      setEditorContent(lab.codeTemplate);
    }
  }, [lab.codeTemplate]);

  const getDifficultyColor = (difficulty: Lab['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400';
      case 'intermediate':
        return 'bg-amber-500/20 text-amber-400';
      case 'advanced':
        return 'bg-red-500/20 text-red-400';
    }
  };

  const getTypeIcon = (type: Lab['type']) => {
    switch (type) {
      case 'hands-on':
        return <Beaker className="w-4 h-4 text-blue-400" />;
      case 'guided':
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'challenge':
        return <Target className="w-4 h-4 text-orange-400" />;
    }
  };

  const getPhaseIcon = () => {
    if (!lab.phase) return null;
    
    switch (lab.phase) {
      case 'build':
        return <Construction className="w-4 h-4 text-emerald-400" />;
      case 'break':
        return <Hammer className="w-4 h-4 text-red-400" />;
      case 'mitigate':
        return <Shield className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const addFinding = () => {
    const newFinding = `Vulnerability found in ${targetSystem} component: ${
      targetSystem === 'server' ? 'Outdated dependencies with known CVEs' :
      targetSystem === 'application' ? 'Cross-site scripting (XSS) in user input form' :
      'Weak SSH configuration'
    }`;
    
    setFindings([...findings, newFinding]);
    
    // Advance to next task if we haven't completed all tasks
    if (currentTask < lab.tasks.length - 1) {
      setCurrentTask(currentTask + 1);
    }
  };

  // Render different layouts based on lab phase
  const renderLabContent = () => {
    switch (lab.phase) {
      case 'break':
        return (
          <div className="flex flex-col gap-6">
            {/* Main lab area with browser, proxy, etc. */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Browser View */}
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex flex-col col-span-2">
                <div className="p-2 border-b border-gray-700 bg-gray-750 flex items-center gap-2">
                  <h3 className="font-semibold text-sm flex items-center">
                    <span className="bg-red-500 rounded-full w-3 h-3 mr-2"></span>
                    <span className="bg-yellow-500 rounded-full w-3 h-3 mr-2"></span>
                    <span className="bg-green-500 rounded-full w-3 h-3 mr-2"></span>
                    Browser
                  </h3>
                  <div className="flex-grow mx-2 bg-gray-700 rounded px-2 py-1 text-sm flex items-center text-gray-400">
                    <span>https://vulnerable-app.example.com</span>
                  </div>
                  <button className="text-gray-400 hover:text-white px-2 py-1 rounded">
                    <RotateCcw size={14} />
                  </button>
                </div>
                <div className="flex-grow overflow-auto bg-white">
                  {/* Mock browser content */}
                  <div className="p-4 text-gray-800">
                    <div className="border-b border-gray-300 pb-4 mb-4">
                      <h1 className="text-2xl font-bold mb-2">Example Vulnerable Application</h1>
                      <p className="text-gray-600">This application contains several security vulnerabilities that you need to identify.</p>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">User Login</h2>
                      <div className="flex flex-col gap-2 max-w-md">
                        <input type="text" placeholder="Username" className="border border-gray-300 rounded p-2" />
                        <input type="password" placeholder="Password" className="border border-gray-300 rounded p-2" />
                        <button className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">Search Products</h2>
                      <div className="flex gap-2 max-w-md">
                        <input type="text" placeholder="Search term" className="border border-gray-300 rounded p-2 flex-grow" />
                        <button className="bg-gray-200 py-2 px-4 rounded">Search</button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {['Product 1', 'Product 2', 'Product 3', 'Product 4'].map((product, i) => (
                        <div key={i} className="border border-gray-200 rounded p-4">
                          <h3 className="font-semibold mb-1">{product}</h3>
                          <p className="text-gray-600 text-sm mb-2">Description of this product with potentially exploitable details.</p>
                          <button className="text-blue-500 text-sm">View details</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* HTTP Proxy/Interceptor/Inspector */}
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex flex-col">
                <div className="p-2 border-b border-gray-700 bg-gray-750 flex justify-between">
                  <h3 className="font-semibold text-sm">HTTP Proxy</h3>
                  <div className="flex gap-1">
                    <button className={`px-2 py-0.5 rounded text-xs ${isLabRunning ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                      Intercept {isLabRunning ? 'On' : 'Off'}
                    </button>
                    <button className="px-2 py-0.5 rounded text-xs bg-gray-700 text-gray-400">
                      Forward
                    </button>
                  </div>
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="flex border-b border-gray-700">
                    <button className="px-4 py-2 bg-gray-750 text-gray-300 border-r border-gray-700">Request</button>
                    <button className="px-4 py-2 bg-gray-800 text-gray-400">Response</button>
                  </div>
                  <div className="flex-grow overflow-auto font-mono text-xs p-2 text-gray-300 bg-gray-850">
                    {isLabRunning ? (
                      <pre className="whitespace-pre-wrap">
{`GET /login HTTP/1.1
Host: vulnerable-app.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Accept: text/html,application/xhtml+xml,application/xml
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: close
Cookie: session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Cache-Control: max-age=0`}
                      </pre>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        Start the lab environment to intercept traffic
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lab information and controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Instructions and Objectives */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4 text-red-200">Instructions</h2>
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>
                      {lab.instructions}
                    </ReactMarkdown>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4 text-red-200">Objectives</h2>
                  <div className="space-y-2">
                    {lab.tasks.map((task, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          index === currentTask ? 'bg-red-500/20 border border-red-500/40' : ''
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500"
                          checked={index < currentTask}
                          onChange={() => setCurrentTask(index)}
                        />
                        <span className={index < currentTask ? 'text-red-300 line-through' : 'text-gray-300'}>
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Terminal and Tools */}
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4 text-red-200">Target Info</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Target System:</label>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setTargetSystem('server')}
                          className={`px-3 py-1 rounded-lg text-sm ${targetSystem === 'server' ? 'bg-red-600/80 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                          Server
                        </button>
                        <button
                          onClick={() => setTargetSystem('application')}
                          className={`px-3 py-1 rounded-lg text-sm ${targetSystem === 'application' ? 'bg-red-600/80 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                          Application
                        </button>
                        <button
                          onClick={() => setTargetSystem('network')}
                          className={`px-3 py-1 rounded-lg text-sm ${targetSystem === 'network' ? 'bg-red-600/80 text-white' : 'bg-gray-700 text-gray-300'}`}
                        >
                          Network
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        onClick={addFinding}
                        disabled={!isLabRunning}
                        className={`w-full py-2 rounded-lg ${isLabRunning 
                          ? 'bg-red-600/80 text-white hover:bg-red-600' 
                          : 'bg-gray-700 text-gray-500'} transition-colors`}
                      >
                        Run Vulnerability Scan
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4 text-red-200">Terminal</h2>
                  <div className="bg-black rounded-lg p-3 h-[200px] font-mono text-xs overflow-auto">
                    {isLabRunning ? (
                      <pre className="text-red-400 whitespace-pre-wrap">
                        {`$ nmap -sV -T4 vulnerable-app.example.com
Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for vulnerable-app.example.com
Host is up (0.0092s latency).
Not shown: 995 closed tcp ports
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 8.2p1
80/tcp   open  http        Apache httpd 2.4.46
443/tcp  open  ssl/https   Apache httpd 2.4.46
8080/tcp open  http-proxy  nginx 1.19.5
`}
                        {findings.map((finding, i) => `$ ${finding}\n`)}
                        {currentTask >= 5 ? '\nAll vulnerabilities successfully identified!\n' : ''}
                      </pre>
                    ) : (
                      <pre className="text-gray-400">Start the lab environment to begin penetration testing...</pre>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-4 text-red-200">Findings</h2>
                  <div className="space-y-2 max-h-[200px] overflow-auto">
                    {findings.length > 0 ? (
                      findings.map((finding, index) => (
                        <div key={index} className="p-3 bg-gray-750 rounded-lg border border-red-500/30 text-sm">
                          {finding}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-gray-750 rounded-lg text-gray-400 text-sm">
                        No vulnerabilities found yet. Run scans to identify security issues.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'mitigate':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="h-[600px]">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={editorContent}
                  onChange={(value) => setEditorContent(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Instructions and Resources */}
            <div className="space-y-6 flex flex-col">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex-grow">
                <h2 className="text-xl font-bold mb-4 text-blue-200">Mitigation Plan</h2>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {lab.instructions}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-blue-200">Security Controls</h2>
                <div className="space-y-2">
                  {lab.tasks.map((task, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        index === currentTask ? 'bg-blue-500/20 border border-blue-500/40' : ''
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                        checked={index < currentTask}
                        onChange={() => setCurrentTask(index)}
                      />
                      <span className={index < currentTask ? 'text-blue-300 line-through' : 'text-gray-300'}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-blue-200">Security Analysis</h2>
                <div className="bg-black rounded-lg p-4 h-[200px] font-mono text-sm overflow-auto">
                  {isLabRunning ? (
                    <pre className="text-blue-400">
                      Security analysis is running...{'\n\n'}
                      {`$ Running security checks...\n`}
                      {currentTask > 0 ? '✓ Authentication mechanism improved\n' : ''}
                      {currentTask > 1 ? '✓ Input validation implemented\n' : ''}
                      {currentTask > 2 ? '✓ Security headers configured\n' : ''}
                      {currentTask > 3 ? '✓ Encrypted connections enforced\n' : ''}
                      {currentTask > 4 ? '✓ Audit logging implemented\n' : ''}
                      {currentTask >= 5 ? '\nAll security controls implemented correctly!\n' : ''}
                    </pre>
                  ) : (
                    <pre className="text-gray-400">Start the lab environment to begin security analysis...</pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'build':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="h-[600px]">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={editorContent}
                  onChange={(value) => setEditorContent(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Instructions and Resources */}
            <div className="space-y-6 flex flex-col">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex-grow">
                <h2 className="text-xl font-bold mb-4 text-emerald-200">Instructions</h2>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {lab.instructions}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-emerald-200">Task Checklist</h2>
                <div className="space-y-2">
                  {lab.tasks.map((task, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        index === currentTask ? 'bg-emerald-500/20 border border-emerald-500/40' : ''
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
                        checked={index < currentTask}
                        onChange={() => setCurrentTask(index)}
                      />
                      <span className={index < currentTask ? 'text-emerald-300 line-through' : 'text-gray-300'}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-emerald-200">Terminal</h2>
                <div className="bg-black rounded-lg p-4 h-[200px] font-mono text-sm overflow-auto">
                  {isLabRunning ? (
                    <pre className="text-emerald-400">
                      Lab environment is running...{'\n\n'}
                      {`$ Server started on port 3000\n`}
                      {`$ Running security header checks...\n`}
                      {currentTask > 0 ? '✓ X-XSS-Protection header found\n' : ''}
                      {currentTask > 1 ? '✓ Content-Security-Policy header found\n' : ''}
                      {currentTask > 2 ? '✓ X-Frame-Options header found\n' : ''}
                      {currentTask > 3 ? '✓ Strict-Transport-Security header found\n' : ''}
                      {currentTask > 4 ? '✓ X-Content-Type-Options header found\n' : ''}
                      {currentTask >= 5 ? '\nAll security headers implemented correctly!\n' : ''}
                    </pre>
                  ) : (
                    <pre className="text-gray-400">Start the lab environment to begin testing...</pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // If no lab found, show not found page
  if (!lab && !defaultLab) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
        <div className="max-w-3xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Lab Not Found</h1>
          <p className="text-gray-400 mb-8">The lab you're looking for doesn't exist or has been moved.</p>
          <button 
            onClick={() => navigate('/labs')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Return to Labs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => isChallenge ? navigate('/labs') : navigate(`/learning/module/${lab.moduleId}`)}
            className="text-gray-400 hover:text-white transition-colors flex items-center"
          >
            ← Back to {isChallenge ? 'Labs' : `Module: ${lab.moduleName}`}
          </button>
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getDifficultyColor(lab.difficulty)}`}>
              {lab.difficulty}
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
              {getTypeIcon(lab.type)} {lab.type}
            </span>
            {lab.phase && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">
                {getPhaseIcon()} {lab.phase}
              </span>
            )}
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-400">
              <Clock className="w-4 h-4" /> {lab.duration}
            </span>
            {lab.points && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300">
                {lab.points} points
              </span>
            )}
          </div>
        </div>

        {/* Lab Header */}
        <div className={`bg-gray-800 rounded-lg p-6 border ${
          lab.phase === 'build' ? 'border-emerald-700/50' :
          lab.phase === 'break' ? 'border-red-700/50' :
          lab.phase === 'mitigate' ? 'border-blue-700/50' :
          'border-gray-700'
        }`}>
          <h1 className={`text-2xl font-bold mb-2 ${
            lab.phase === 'build' ? 'text-emerald-200' :
            lab.phase === 'break' ? 'text-red-200' :
            lab.phase === 'mitigate' ? 'text-blue-200' :
            'text-indigo-200'
          }`}>{lab.title}</h1>
          <p className="text-gray-300">{lab.description}</p>
        </div>

        {/* Lab Controls */}
        <div className={`bg-gray-800 rounded-lg p-4 flex items-center justify-between border ${
          lab.phase === 'build' ? 'border-emerald-700/50' :
          lab.phase === 'break' ? 'border-red-700/50' :
          lab.phase === 'mitigate' ? 'border-blue-700/50' :
          'border-gray-700'
        }`}>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              isLabRunning ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
            }`}>
              {isLabRunning ? 'Environment Running' : 'Environment Stopped'}
            </span>
            {lab.completed && (
              <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                Completed
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isLabRunning ? (
              <button
                onClick={stopLab}
                className="bg-red-600/80 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <Pause size={16} />
                <span>Stop</span>
              </button>
            ) : (
              <button
                onClick={startLab}
                className="bg-green-600/80 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <Play size={16} />
                <span>Start</span>
              </button>
            )}
            <button
              onClick={resetLab}
              className="bg-yellow-600/80 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
            <button className="bg-indigo-600/80 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2">
              <Download size={16} />
              <span>Save</span>
            </button>
            <button className={`bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-colors flex items-center space-x-2`}>
              <Upload size={16} />
              <span>Submit Solution</span>
            </button>
          </div>
        </div>

        {/* Lab Content - different based on phase */}
        {renderLabContent()}
      </div>
    </div>
  );
};

export default LabPage; 
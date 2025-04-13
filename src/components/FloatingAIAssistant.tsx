import React, { useState, useEffect } from 'react';
import { Bot, Send, Sparkles, X, Shield, Terminal, Lock, Unlock, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

const FloatingAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: 'assistant',
      content: "INITIALIZING SECURE CONNECTION...\n\nSECURE CHANNEL ESTABLISHED\n\nHello, I'm your AI Security Mentor. I'm here to guide you through your cybersecurity journey. How can I assist you today?",
      timestamp: new Date().toISOString()
    },
  ]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = {
      role: 'user' as const,
      content: userInput,
      timestamp: new Date().toISOString()
    };

    setConversation([...conversation, newMessage]);
    setUserInput('');
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: "ANALYZING QUERY...\n\nI understand you're interested in cybersecurity. Let's explore the Build-Break-Mitigate methodology:\n\n1. **[BUILD]** Secure authentication system implementation\n2. **[BREAK]** Vulnerability assessment and exploitation\n3. **[MITIGATE]** Security control implementation\n\nWhich area would you like to focus on?",
        timestamp: new Date().toISOString()
      };
      setConversation(prev => [...prev, aiResponse]);
      setIsThinking(false);
    }, 1000);
  };

  const toggleAssistant = () => {
    if (!isOpen) {
      setIsUnlocking(true);
      setTimeout(() => {
        setIsUnlocking(false);
        setIsOpen(true);
      }, 1000);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-gray-900 rounded-lg shadow-xl w-96 flex flex-col border border-cyan-500/30 animate-fadeIn">
          {/* Header */}
          <div className="bg-gray-800 rounded-t-lg p-4 border-b border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bot className="text-cyan-400" size={24} />
                  <Sparkles className="text-cyan-400 absolute -top-1 -right-1" size={12} />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-cyan-400">SECURITY MENTOR</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-mono">SECURE CONNECTION ACTIVE</span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleAssistant}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'assistant'
                      ? 'bg-gray-800 border border-cyan-500/30'
                      : 'bg-cyan-600'
                  }`}
                >
                  <ReactMarkdown className="prose prose-invert prose-sm">
                    {message.content}
                  </ReactMarkdown>
                  <div className={`text-xs mt-2 ${
                    message.role === 'assistant' ? 'text-cyan-400' : 'text-cyan-200'
                  } font-mono`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-3 border border-cyan-500/30">
                  <div className="flex items-center space-x-2">
                    <Terminal className="text-cyan-400 animate-pulse" size={16} />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-cyan-500/30">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Enter your command..."
                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white font-mono border border-cyan-500/30 placeholder-gray-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-cyan-600 text-white rounded-lg px-4 py-2 hover:bg-cyan-700 transition-colors flex items-center space-x-2"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleAssistant}
          className="relative group"
        >
          <div className="absolute inset-0 bg-cyan-400 rounded-full blur group-hover:blur-md transition-all"></div>
          <div className={`relative bg-gray-900 text-cyan-400 p-4 rounded-full shadow-lg border-2 border-cyan-400 hover:border-cyan-300 transition-all flex items-center justify-center ${
            isUnlocking ? 'animate-spin' : ''
          }`}>
            {isUnlocking ? (
              <Unlock className="animate-pulse" size={24} />
            ) : (
              <div className="relative">
                <Bot size={24} />
                <Zap className="absolute -top-1 -right-1" size={12} />
              </div>
            )}
          </div>
        </button>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </div>
  );
};

export default FloatingAIAssistant; 
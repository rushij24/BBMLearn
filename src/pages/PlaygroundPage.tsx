import React from 'react';
import { Code2 } from 'lucide-react';
import Editor from "@monaco-editor/react";

const PlaygroundPage: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 font-mono flex items-center">
        <Code2 className="mr-2" /> Code Playground
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-[600px]">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue="// Start coding here..."
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
        <div className="space-y-6">
          <div className="bg-black rounded-lg p-4 h-[300px] font-mono text-sm overflow-y-auto">
            <pre className="text-green-400">// Output will appear here...</pre>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-mono font-bold mb-3">Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Run Code
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                Format Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage; 
import React from 'react';
import { Smile } from 'lucide-react';

export const AuthLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Smile className="w-12 h-12 text-blue-600 animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dad Jokes Generator
          </h1>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    </div>
  );
}; 
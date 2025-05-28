
import React from 'react';
import { Sparkles, Target } from 'lucide-react';

export const Header = () => {
  return (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="flex justify-center items-center space-x-3 mb-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-ocean-500 to-lavender-500 animate-glow">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold gradient-text">
          AI Roadmap Generator
        </h1>
        <div className="p-3 rounded-full bg-gradient-to-r from-lavender-500 to-ocean-500 animate-glow">
          <Target className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Get personalized learning paths for any tech framework or stack, 
        powered by AI intelligence
      </p>
    </div>
  );
};

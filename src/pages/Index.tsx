
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { FrameworkSelector } from '@/components/FrameworkSelector';
import { RoadmapGenerator } from '@/components/RoadmapGenerator';
import { RoadmapDisplay } from '@/components/RoadmapDisplay';
import { FloatingOrbs } from '@/components/FloatingOrbs';

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  projects: string[];
  resources: string[];
  skills: string[];
}

const Index = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>('');
  const [difficultyLevel, setDifficultyLevel] = useState<string>('');
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-12 space-y-12">
          <FrameworkSelector 
            selectedFramework={selectedFramework}
            setSelectedFramework={setSelectedFramework}
            learningGoal={difficultyLevel}
            setLearningGoal={setDifficultyLevel}
          />
          
          <RoadmapGenerator
            selectedFramework={selectedFramework}
            learningGoal={difficultyLevel}
            onRoadmapGenerated={setRoadmap}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
          
          {roadmap.length > 0 && (
            <RoadmapDisplay roadmap={roadmap} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

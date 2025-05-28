import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Database, Globe, Smartphone, Server, Brain } from 'lucide-react';

interface Framework {
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

const frameworks: Framework[] = [
  { name: 'React', category: 'Frontend', icon: <Code className="w-6 h-6" />, color: 'from-ocean-400 to-ocean-600' },
  { name: 'Vue.js', category: 'Frontend', icon: <Code className="w-6 h-6" />, color: 'from-sage-400 to-sage-600' },
  { name: 'Angular', category: 'Frontend', icon: <Code className="w-6 h-6" />, color: 'from-red-400 to-red-600' },
  { name: 'Next.js', category: 'Full-stack', icon: <Globe className="w-6 h-6" />, color: 'from-gray-400 to-gray-600' },
  { name: 'Node.js', category: 'Backend', icon: <Server className="w-6 h-6" />, color: 'from-green-400 to-green-600' },
  { name: 'Django', category: 'Backend', icon: <Server className="w-6 h-6" />, color: 'from-green-600 to-green-800' },
  { name: 'Flask', category: 'Backend', icon: <Server className="w-6 h-6" />, color: 'from-blue-400 to-blue-600' },
  { name: 'React Native', category: 'Mobile', icon: <Smartphone className="w-6 h-6" />, color: 'from-ocean-500 to-lavender-500' },
  { name: 'Flutter', category: 'Mobile', icon: <Smartphone className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
  { name: 'MongoDB', category: 'Database', icon: <Database className="w-6 h-6" />, color: 'from-green-500 to-green-700' },
  { name: 'PostgreSQL', category: 'Database', icon: <Database className="w-6 h-6" />, color: 'from-blue-600 to-blue-800' },
  { name: 'Machine Learning', category: 'AI/ML', icon: <Brain className="w-6 h-6" />, color: 'from-lavender-500 to-lavender-700' },
];

interface Props {
  selectedFramework: string;
  setSelectedFramework: (framework: string) => void;
  learningGoal: string;
  setLearningGoal: (goal: string) => void;
}

export const FrameworkSelector: React.FC<Props> = ({
  selectedFramework,
  setSelectedFramework,
  learningGoal,
  setLearningGoal
}) => {
  const categories = [...new Set(frameworks.map(f => f.category))];

  return (
    <div className="space-y-8 animate-slide-up">
      <Card className="p-8 bg-white/90 backdrop-blur-sm">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center gradient-text">
            Choose Your Learning Path
          </h2>
          
          <div className="grid gap-6">
            {categories.map(category => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-ocean-200 pb-2">
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {frameworks
                    .filter(f => f.category === category)
                    .map(framework => (
                      <button
                        key={framework.name}
                        onClick={() => setSelectedFramework(framework.name)}
                        className={`p-4 rounded-xl border transition-colors duration-200 ${
                          selectedFramework === framework.name
                            ? `border-ocean-500 bg-gradient-to-r ${framework.color} text-white`
                            : 'border-gray-200 bg-white hover:border-ocean-300'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          {framework.icon}
                          <span className={`text-sm font-medium ${
                            selectedFramework === framework.name ? 'text-white' : 'text-slate-700'
                          }`}>
                            {framework.name}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-2">
              <Label htmlFor="framework" className="text-base font-medium text-slate-700">
                Or type a custom framework/stack
              </Label>
              <Input
                id="framework"
                placeholder="e.g., Express.js, Laravel, Spring Boot..."
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="bg-white border-ocean-200 focus:border-ocean-500 focus:ring-ocean-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-base font-medium text-slate-700">
                Difficulty Level
              </Label>
              <Select value={learningGoal} onValueChange={setLearningGoal}>
                <SelectTrigger className="bg-white border-ocean-200 focus:border-ocean-500 focus:ring-ocean-500">
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

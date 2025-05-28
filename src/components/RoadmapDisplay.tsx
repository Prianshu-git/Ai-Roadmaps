
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Clock, 
  Target, 
  BookOpen, 
  Code2, 
  Lightbulb,
  Star,
  Trophy,
  Zap
} from 'lucide-react';
import type { RoadmapStep } from '@/pages/Index';

interface Props {
  roadmap: RoadmapStep[];
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  advanced: 'bg-red-100 text-red-800 border-red-200'
};

const difficultyIcons = {
  beginner: <Star className="w-4 h-4" />,
  intermediate: <Zap className="w-4 h-4" />,
  advanced: <Trophy className="w-4 h-4" />
};

export const RoadmapDisplay: React.FC<Props> = ({ roadmap }) => {
  const [completedSteps, setCompletedSteps] = React.useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const progress = (completedSteps.size / roadmap.length) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="p-8 glass-effect">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold gradient-text">
            Your Learning Roadmap
          </h2>
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Progress</span>
              <span>{completedSteps.size} of {roadmap.length} completed</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-slate-500">
              {progress.toFixed(0)}% Complete
            </p>
          </div>
        </div>
      </Card>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-ocean-300 via-lavender-300 to-ocean-300"></div>

        <div className="space-y-6">
          {roadmap.map((step, index) => {
            const isCompleted = completedSteps.has(step.id);
            
            return (
              <div
                key={step.id}
                className={`relative ml-16 roadmap-step transition-all duration-500 ${
                  isCompleted ? 'opacity-75 scale-95' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline node */}
                <button
                  onClick={() => toggleStep(step.id)}
                  className={`absolute -left-20 top-6 w-8 h-8 rounded-full border-4 transition-all duration-300 hover:scale-110 ${
                    isCompleted
                      ? 'bg-ocean-500 border-ocean-300 text-white'
                      : 'bg-white border-ocean-300 hover:border-ocean-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 mx-auto" />
                  ) : (
                    <span className="text-xs font-bold text-ocean-600">
                      {index + 1}
                    </span>
                  )}
                </button>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-800">
                      {step.title}
                    </h3>
                    <Badge className={`${difficultyColors[step.difficulty]} border`}>
                      {difficultyIcons[step.difficulty]}
                      <span className="ml-1 capitalize">{step.difficulty}</span>
                    </Badge>
                    <Badge variant="outline" className="border-slate-300">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    {step.skills.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Target className="w-4 h-4 text-ocean-500" />
                          Skills to Learn
                        </div>
                        <div className="space-y-1">
                          {step.skills.map((skill, i) => (
                            <div key={i} className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded">
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.projects.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <Code2 className="w-4 h-4 text-lavender-500" />
                          Practice Projects
                        </div>
                        <div className="space-y-1">
                          {step.projects.map((project, i) => (
                            <div key={i} className="text-sm text-slate-600 bg-lavender-50 px-2 py-1 rounded">
                              {project}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.resources.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <BookOpen className="w-4 h-4 text-sage-500" />
                          Resources
                        </div>
                        <div className="space-y-1">
                          {step.resources.map((resource, i) => (
                            <div key={i} className="text-sm text-slate-600 bg-sage-50 px-2 py-1 rounded">
                              {resource}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {completedSteps.size === roadmap.length && roadmap.length > 0 && (
        <Card className="p-8 glass-effect text-center animate-glow">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-ocean-500 to-lavender-500 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">
              Congratulations! 🎉
            </h3>
            <p className="text-slate-600">
              You've completed your learning roadmap! You're now ready to build amazing projects.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

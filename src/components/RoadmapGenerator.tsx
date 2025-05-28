import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { RoadmapStep } from '@/pages/Index';

interface Props {
  selectedFramework: string;
  learningGoal: string;
  onRoadmapGenerated: (roadmap: RoadmapStep[]) => void;
  isGenerating: boolean;
  setIsGenerating: (loading: boolean) => void;
}

export const RoadmapGenerator: React.FC<Props> = ({
  selectedFramework,
  learningGoal,
  onRoadmapGenerated,
  isGenerating,
  setIsGenerating
}) => {
  const [apiKey, setApiKey] = React.useState('');
  const [showApiInput, setShowApiInput] = React.useState(true);
  const { toast } = useToast();

  const generateRoadmap = async () => {
    if (!selectedFramework.trim()) {
      toast({
        title: "Framework Required",
        description: "Please select or enter a framework to generate a roadmap.",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to generate the roadmap.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const difficultyText = learningGoal ? ` for ${learningGoal} level` : '';
      const prompt = `Create a detailed learning roadmap for ${selectedFramework}${difficultyText}.

Return a JSON array of learning steps with this exact structure:
[
  {
    "id": "step-1",
    "title": "Step Title",
    "description": "Detailed description of what to learn",
    "duration": "2-3 weeks",
    "difficulty": "beginner|intermediate|advanced",
    "projects": ["Project idea 1", "Project idea 2"],
    "resources": ["Resource 1", "Resource 2"],
    "skills": ["Skill 1", "Skill 2"]
  }
]

Include 6-8 steps that progress appropriately for the ${learningGoal || 'selected'} level. Make each step practical with specific learning objectives, project ideas, and useful resources.`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }

      const responseText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const roadmapData = JSON.parse(jsonMatch[0]);
      
      if (!Array.isArray(roadmapData)) {
        throw new Error('Response is not an array');
      }

      onRoadmapGenerated(roadmapData);
      setShowApiInput(false);
      
      toast({
        title: "Roadmap Generated! 🎉",
        description: `Created a personalized learning path for ${selectedFramework}`,
      });

    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate roadmap. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-8 bg-white/90 backdrop-blur-sm animate-slide-up">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Generate Your Roadmap
          </h2>
          <p className="text-slate-600">
            AI-powered personalized learning path just for you
          </p>
        </div>

        {showApiInput && (
          <Alert className="border border-ocean-200 bg-white/90 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4 text-ocean-600" />
            <AlertDescription className="text-slate-700">
              To generate roadmaps, you'll need a Gemini API key. Get one free at{' '}
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline font-medium text-ocean-600 hover:text-ocean-700"
              >
                Google AI Studio
              </a>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {showApiInput && (
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-base font-medium text-slate-700">
                Gemini API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Gemini API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-white/90 backdrop-blur-sm border-ocean-200 focus:border-ocean-500 focus:ring-ocean-500"
              />
            </div>
          )}

          <Button
            onClick={generateRoadmap}
            disabled={isGenerating || !selectedFramework.trim()}
            className="w-full h-14 text-lg bg-gradient-to-r from-ocean-500 to-lavender-500 hover:from-ocean-600 hover:to-lavender-600 transition-all duration-300"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Your Roadmap...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Roadmap
              </>
            )}
          </Button>
        </div>

        {selectedFramework && (
          <div className="text-center p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-ocean-200">
            <p className="text-slate-700">
              <span className="font-medium">Framework:</span> {selectedFramework}
              {learningGoal && (
                <>
                  <br />
                  <span className="font-medium">Level:</span> {learningGoal}
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

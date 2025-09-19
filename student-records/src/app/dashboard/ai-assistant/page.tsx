"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Send, Bot, User, Sparkles, TrendingUp, Target, Award, Briefcase, BookOpen, Lightbulb } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "recommendation" | "analysis" | "guidance";
}

interface CareerRecommendation {
  title: string;
  description: string;
  matchScore: number;
  requiredSkills: string[];
  suggestedActions: string[];
  salaryRange: string;
  growth: string;
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  priority: "high" | "medium" | "low";
  resources: string[];
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  // Mock data for demonstrations
  const [careerRecommendations] = useState<CareerRecommendation[]>([
    {
      title: "Full Stack Developer",
      description: "Build end-to-end web applications using modern technologies.",
      matchScore: 92,
      requiredSkills: ["React", "Node.js", "TypeScript", "Database Design"],
      suggestedActions: ["Complete a MERN stack project", "Learn Docker", "Practice system design"],
      salaryRange: "$70k - $120k",
      growth: "+22% (2023-2033)"
    },
    {
      title: "Data Scientist",
      description: "Analyze complex data to drive business decisions and insights.",
      matchScore: 78,
      requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL"],
      suggestedActions: ["Complete ML certification", "Build portfolio projects", "Learn cloud platforms"],
      salaryRange: "$80k - $140k",
      growth: "+35% (2023-2033)"
    },
    {
      title: "UX/UI Designer",
      description: "Design intuitive and engaging user experiences for digital products.",
      matchScore: 85,
      requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      suggestedActions: ["Build design portfolio", "Complete UX course", "Practice user interviews"],
      salaryRange: "$65k - $110k",
      growth: "+13% (2023-2033)"
    }
  ]);

  const [skillGaps] = useState<SkillGap[]>([
    {
      skill: "System Design",
      currentLevel: 2,
      targetLevel: 4,
      priority: "high",
      resources: ["System Design Interview", "High Scalability Blog", "AWS Architecture Center"]
    },
    {
      skill: "Machine Learning",
      currentLevel: 1,
      targetLevel: 3,
      priority: "medium",
      resources: ["Coursera ML Course", "Kaggle Learn", "Python ML Handbook"]
    },
    {
      skill: "Cloud Computing",
      currentLevel: 2,
      targetLevel: 4,
      priority: "high",
      resources: ["AWS Certified Solutions Architect", "Azure Fundamentals", "Cloud Architecture Patterns"]
    }
  ]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI Career Assistant. I can help you with career guidance, skill recommendations, job market insights, and personalized learning paths. What would you like to explore today?",
      timestamp: new Date(),
      type: "guidance"
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        type: aiResponse.type
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("career") || lowerInput.includes("job")) {
      return {
        content: "Based on your profile, I see you have strong technical skills in web development. Here are some personalized career recommendations:\n\n🎯 **Top Match: Full Stack Developer (92% match)**\n- Great fit for your React and TypeScript skills\n- Average salary: $70k-$120k\n- High growth potential (+22%)\n\n💡 **Next Steps:**\n1. Build a portfolio with 3-5 full-stack projects\n2. Learn system design principles\n3. Practice coding interviews\n\nWould you like me to create a detailed learning roadmap for any of these paths?",
        type: "recommendation" as const
      };
    }
    
    if (lowerInput.includes("skill") || lowerInput.includes("learn")) {
      return {
        content: "I've analyzed your current skills and identified key areas for growth:\n\n🔥 **Priority Skills to Develop:**\n\n**System Design** (High Priority)\n- Current: Beginner → Target: Advanced\n- Why: Essential for senior roles\n- Resources: System Design Interview book, AWS Architecture Center\n\n**Cloud Computing** (High Priority)\n- Current: Basic → Target: Advanced\n- Why: 90% of companies use cloud\n- Resources: AWS Certified Solutions Architect\n\n**Machine Learning** (Medium Priority)\n- Current: None → Target: Intermediate\n- Why: High-demand skill with great salary potential\n- Resources: Coursera ML Course, Kaggle competitions\n\nShall I create a personalized 3-month learning plan for any of these?",
        type: "analysis" as const
      };
    }
    
    return {
      content: "I'd be happy to help! I can assist you with:\n\n🎯 **Career Guidance** - Personalized job recommendations based on your skills\n📈 **Skill Analysis** - Identify gaps and create learning roadmaps\n💼 **Job Market Insights** - Latest trends and salary information\n🏆 **Achievement Planning** - Set goals and track progress\n📚 **Learning Resources** - Curated courses and certifications\n\nWhat specific area would you like to explore? You can ask questions like:\n- \"What careers match my skills?\"\n- \"What skills should I learn next?\"\n- \"How can I improve my profile?\"\n- \"What certifications should I pursue?\"",
      type: "guidance" as const
    };
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold">AI Career Assistant</h1>
        </div>
        <p className="text-muted-foreground">
          Get personalized career guidance, skill recommendations, and learning paths powered by AI
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Chat Assistant
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Career Matches
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Skill Analysis
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Market Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-purple-600" />
                    AI Assistant Chat
                  </CardTitle>
                  <CardDescription>
                    Ask me anything about your career, skills, or professional development
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 ${
                          message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div className={`p-2 rounded-full ${
                          message.role === "user" 
                            ? "bg-blue-100" 
                            : "bg-purple-100"
                        }`}>
                          {message.role === "user" ? (
                            <User className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Bot className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                        <div className={`max-w-[80%] ${
                          message.role === "user" ? "text-right" : ""
                        }`}>
                          <div className={`p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border"
                          }`}>
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-100">
                          <Bot className="h-4 w-4 text-purple-600 animate-pulse" />
                        </div>
                        <div className="bg-white border p-3 rounded-lg">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me about your career, skills, or professional development..."
                      className="resize-none"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("What careers match my skills?")}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Career Matches
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("What skills should I learn next?")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Skill Recommendations
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("How can I improve my profile?")}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Profile Tips
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleQuickAction("What certifications should I pursue?")}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Certification Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Profile Strength</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Strong technical skills. Consider adding more project diversity.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Personalized Career Recommendations</h2>
                <p className="text-muted-foreground">Based on your skills, interests, and market trends</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                Updated daily
              </Badge>
            </div>

            <div className="grid gap-6">
              {careerRecommendations.map((recommendation, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{recommendation.title}</h3>
                      <p className="text-muted-foreground mb-3">{recommendation.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {recommendation.matchScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Match Score</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {recommendation.requiredSkills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Market Info
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Salary Range:</span>
                          <span className="font-medium">{recommendation.salaryRange}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Job Growth:</span>
                          <span className="font-medium text-green-600">{recommendation.growth}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Suggested Actions
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {recommendation.suggestedActions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <Button size="sm">
                      Create Learning Path
                    </Button>
                    <Button size="sm" variant="outline">
                      View Similar Jobs
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold">Skill Gap Analysis</h2>
              <p className="text-muted-foreground">Identify areas for improvement and get personalized learning recommendations</p>
            </div>

            <div className="grid gap-4">
              {skillGaps.map((gap, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{gap.skill}</h3>
                      <Badge 
                        className={`text-xs ${getPriorityColor(gap.priority)}`}
                        variant="outline"
                      >
                        {gap.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Progress Needed</div>
                      <div className="text-lg font-bold">
                        {gap.currentLevel} → {gap.targetLevel}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current Level</span>
                      <span>Target Level</span>
                    </div>
                    <div className="relative">
                      <Progress value={(gap.currentLevel / 5) * 100} className="h-2" />
                      <div 
                        className="absolute top-0 h-2 bg-green-200 rounded-full"
                        style={{
                          left: `${(gap.currentLevel / 5) * 100}%`,
                          width: `${((gap.targetLevel - gap.currentLevel) / 5) * 100}%`
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Recommended Resources
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {gap.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button size="sm" className="mr-2">
                      Create Learning Plan
                    </Button>
                    <Button size="sm" variant="outline">
                      Find Courses
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold">Job Market Insights</h2>
              <p className="text-muted-foreground">Stay updated with the latest trends and opportunities in your field</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hot Skills</h3>
                    <p className="text-sm text-muted-foreground">Trending this month</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">AI/ML</span>
                    <Badge variant="secondary">+45%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cloud Computing</span>
                    <Badge variant="secondary">+32%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cybersecurity</span>
                    <Badge variant="secondary">+28%</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Salary Trends</h3>
                    <p className="text-sm text-muted-foreground">Your field average</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600">$95k</div>
                  <div className="text-sm text-muted-foreground">
                    +8% from last year
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    75th percentile for your experience
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Job Opportunities</h3>
                    <p className="text-sm text-muted-foreground">In your area</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm text-muted-foreground">
                    Open positions
                  </div>
                  <div className="text-xs text-green-600">
                    +15% this week
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Industry Insights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Emerging Technologies</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Generative AI integration in development workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Edge computing and serverless architectures
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Web3 and blockchain development
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Market Predictions</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Remote work opportunities increasing by 25%
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Focus on full-stack and specialized skills
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Emphasis on soft skills and collaboration
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
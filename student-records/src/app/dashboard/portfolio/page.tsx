"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  Eye, 
  Settings, 
  Sparkles, 
  FileText, 
  Award, 
  Briefcase, 
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Calendar,
  Star,
  Edit,
  Save,
  Palette,
  Layout,
  Zap
} from "lucide-react";

interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date: string;
    type: string;
  }>;
  experiences: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  certificates: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
  }>;
}

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: "modern" | "classic" | "creative" | "minimal";
}

export default function EPortfolioPage() {
  const [activeTab, setActiveTab] = useState("generator");
  const [selectedTemplate, setSelectedTemplate] = useState("modern-tech");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // Mock portfolio data
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personalInfo: {
      name: "John Smith",
      title: "Full Stack Developer & AI Enthusiast",
      email: "john.smith@university.edu",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "www.johnsmith.dev",
      linkedin: "linkedin.com/in/johnsmith",
      github: "github.com/johnsmith",
      summary: "Passionate full-stack developer with 3+ years of experience building scalable web applications. Strong background in React, Node.js, and cloud technologies. Recently completed Advanced AI/ML certification and looking to contribute to innovative projects in tech."
    },
    skills: [
      { name: "JavaScript", level: 90, category: "Frontend" },
      { name: "React", level: 85, category: "Frontend" },
      { name: "Node.js", level: 80, category: "Backend" },
      { name: "Python", level: 75, category: "Backend" },
      { name: "AWS", level: 70, category: "Cloud" },
      { name: "Machine Learning", level: 65, category: "AI/ML" }
    ],
    achievements: [
      {
        title: "Hackathon Winner - Tech Innovation 2024",
        description: "First place in university-wide hackathon for developing AI-powered study assistant",
        date: "2024-03-15",
        type: "Competition"
      },
      {
        title: "Dean's List Recognition",
        description: "Achieved Dean's List for maintaining 3.8+ GPA for consecutive semesters",
        date: "2024-05-20",
        type: "Academic"
      }
    ],
    experiences: [
      {
        title: "Software Engineer Intern",
        company: "Google",
        duration: "Jun 2024 - Aug 2024",
        description: "Developed microservices for Google Cloud Platform, improving system efficiency by 25%",
        skills: ["Go", "Kubernetes", "GCP", "Microservices"]
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "Jan 2024 - May 2024",
        description: "Built and maintained e-commerce platform serving 10k+ users",
        skills: ["React", "Node.js", "MongoDB", "Stripe API"]
      }
    ],
    certificates: [
      {
        name: "AWS Solutions Architect Associate",
        issuer: "Amazon Web Services",
        date: "2024-04-10",
        url: "aws.amazon.com/certification"
      },
      {
        name: "Machine Learning Specialization",
        issuer: "Stanford University (Coursera)",
        date: "2024-02-28"
      }
    ],
    projects: [
      {
        name: "AI Study Assistant",
        description: "React-based web app using OpenAI API to help students with personalized study plans",
        technologies: ["React", "OpenAI API", "Node.js", "MongoDB"],
        url: "study-assistant.demo.com",
        github: "github.com/johnsmith/ai-study-assistant"
      },
      {
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with payment processing and inventory management",
        technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
        github: "github.com/johnsmith/ecommerce-platform"
      }
    ]
  });

  const templates: TemplateOption[] = [
    {
      id: "modern-tech",
      name: "Modern Tech",
      description: "Clean, professional design perfect for tech roles",
      preview: "Modern layout with blue accents and tech-focused sections",
      category: "modern"
    },
    {
      id: "creative-design",
      name: "Creative Portfolio",
      description: "Vibrant design for creative professionals",
      preview: "Colorful layout with portfolio showcase emphasis",
      category: "creative"
    },
    {
      id: "minimal-clean",
      name: "Minimal Clean",
      description: "Simple, elegant design that focuses on content",
      preview: "Clean white background with minimalist typography",
      category: "minimal"
    },
    {
      id: "classic-corporate",
      name: "Classic Corporate",
      description: "Traditional design suitable for corporate environments",
      preview: "Professional layout with formal structure",
      category: "classic"
    }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI generation process
    const steps = [
      "Analyzing your achievements...",
      "Optimizing content layout...",
      "Applying AI enhancements...",
      "Generating visual elements...",
      "Finalizing portfolio..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerationProgress((i + 1) * 20);
    }

    setIsGenerating(false);
    setActiveTab("preview");
  };

  const handleExportPDF = () => {
    // In real implementation, this would generate and download a PDF
    console.log("Exporting PDF...");
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${portfolioData.personalInfo.name.replace(/\s+/g, '_')}_Portfolio.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real implementation, this would save to the database
    console.log("Portfolio saved:", portfolioData);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold">AI E-Portfolio Generator</h1>
        </div>
        <p className="text-muted-foreground">
          Create professional portfolios automatically from your achievements and experience
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="customize" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Customize
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          {/* AI Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Portfolio Generator
              </CardTitle>
              <CardDescription>
                Our AI will analyze your profile and create a professional portfolio automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Template Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        selectedTemplate === template.id 
                          ? "ring-2 ring-purple-600 border-purple-200" 
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{template.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {template.description}
                        </p>
                        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                          {template.preview}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Data Source */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Portfolio Content</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Profile Info</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Personal details and summary
                    </p>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Achievements</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {portfolioData.achievements.length} achievements, {portfolioData.certificates.length} certificates
                    </p>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Experience</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {portfolioData.experiences.length} work experiences, {portfolioData.projects.length} projects
                    </p>
                  </Card>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Generating your portfolio...</div>
                    <Progress value={generationProgress} className="max-w-md mx-auto" />
                    <div className="text-xs text-muted-foreground">
                      {generationProgress}% complete
                    </div>
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={handleGenerate}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate AI Portfolio
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Customize Portfolio
              </CardTitle>
              <CardDescription>
                Edit your portfolio content and styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <Save className="h-4 w-4 mr-1" /> : <Edit className="h-4 w-4 mr-1" />}
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input
                      value={portfolioData.personalInfo.name}
                      onChange={(e) => updatePersonalInfo("name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Professional Title</label>
                    <Input
                      value={portfolioData.personalInfo.title}
                      onChange={(e) => updatePersonalInfo("title", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      value={portfolioData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input
                      value={portfolioData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Professional Summary</label>
                  <Textarea
                    value={portfolioData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </div>

              {/* Template Customization */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Template & Styling</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color Scheme</label>
                    <div className="flex gap-2">
                      {["blue", "purple", "green", "red", "gray"].map((color) => (
                        <div
                          key={color}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200 bg-${color}-600`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Layout Style</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Single Column</option>
                      <option>Two Column</option>
                      <option>Three Column</option>
                    </select>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Portfolio Preview
              </CardTitle>
              <CardDescription>
                Live preview of your generated portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Portfolio Preview */}
              <div className="bg-white border rounded-lg p-8 shadow-sm">
                {/* Header */}
                <div className="text-center mb-8 border-b pb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {portfolioData.personalInfo.name}
                  </h1>
                  <h2 className="text-xl text-blue-600 mb-4">
                    {portfolioData.personalInfo.title}
                  </h2>
                  <div className="flex justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {portfolioData.personalInfo.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {portfolioData.personalInfo.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {portfolioData.personalInfo.location}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {portfolioData.personalInfo.summary}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Skills</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {portfolioData.skills.map((skill, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 w-8">{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Work Experience</h3>
                  <div className="space-y-4">
                    {portfolioData.experiences.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-600 pl-4">
                        <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                        <div className="text-blue-600 text-sm mb-1">{exp.company} • {exp.duration}</div>
                        <p className="text-gray-700 text-sm mb-2">{exp.description}</p>
                        <div className="flex gap-1 flex-wrap">
                          {exp.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h3>
                  <div className="space-y-3">
                    {portfolioData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-700">{achievement.description}</p>
                          <div className="text-xs text-gray-500 mt-1">{achievement.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Featured Projects</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {portfolioData.projects.map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{project.name}</h4>
                        <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                        <div className="flex gap-1 flex-wrap mb-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        {(project.url || project.github) && (
                          <div className="flex gap-2 text-xs">
                            {project.url && (
                              <div className="flex items-center gap-1 text-blue-600">
                                <Globe className="h-3 w-3" />
                                Live Demo
                              </div>
                            )}
                            {project.github && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Github className="h-3 w-3" />
                                Code
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export & Share
              </CardTitle>
              <CardDescription>
                Download your portfolio or share it online
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Export Options */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">PDF Export</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download a professional PDF version of your portfolio
                    </p>
                    <Button onClick={handleExportPDF} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Web Portfolio</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get a shareable web link to your portfolio
                    </p>
                    <Button variant="outline" className="w-full">
                      <Globe className="h-4 w-4 mr-2" />
                      Generate Web Link
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Share Options */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Share Your Portfolio</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    Share on LinkedIn
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Portfolio
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    Add to GitHub
                  </Button>
                </div>
              </div>

              {/* Portfolio Stats */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Portfolio Analytics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">247</div>
                    <div className="text-sm text-muted-foreground">Profile Views</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">18</div>
                    <div className="text-sm text-muted-foreground">PDF Downloads</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-sm text-muted-foreground">Shared Links</div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
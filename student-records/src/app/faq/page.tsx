"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  BookOpen,
  Shield,
  Zap,
  Users,
  Settings,
  Download,
  Star,
  MessageCircle,
  ExternalLink
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful?: number;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  count: number;
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories: FAQCategory[] = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: BookOpen,
      description: "First steps and account setup",
      count: 8
    },
    {
      id: "features",
      name: "Features & Usage",
      icon: Zap,
      description: "How to use platform features",
      count: 12
    },
    {
      id: "verification",
      name: "Verification",
      icon: Shield,
      description: "Achievement verification process",
      count: 6
    },
    {
      id: "portfolio",
      name: "Portfolio Creation",
      icon: Download,
      description: "Creating and exporting portfolios",
      count: 7
    },
    {
      id: "account",
      name: "Account Management",
      icon: Settings,
      description: "Account settings and preferences",
      count: 5
    },
    {
      id: "institutions",
      name: "For Institutions",
      icon: Users,
      description: "Information for educational institutions",
      count: 4
    }
  ];

  const faqs: FAQItem[] = [
    // Getting Started
    {
      id: "gs1",
      question: "How do I create an account?",
      answer: "To create an account, click the &apos;Sign Up&apos; button on our homepage and sign up using your educational email address. You&apos;ll receive a verification email to activate your account. Once verified, you can start building your student profile immediately.",
      category: "getting-started",
      tags: ["signup", "account", "email"],
      helpful: 45
    },
    {
      id: "gs2",
      question: "Do I need to use my university email address?",
      answer: "Yes, we recommend using your official educational email address (.edu, .ac.uk, etc.) as it helps with automatic institutional verification and unlocks additional features that may be available through your institution&apos;s partnership with us.",
      category: "getting-started",
      tags: ["email", "university", "verification"],
      helpful: 32
    },
    {
      id: "gs3",
      question: "Is the platform free for students?",
      answer: "Yes! All core features are completely free for students, including profile creation, achievement tracking, certificate management, and basic portfolio generation. Premium features may be available through your institution or via subscription.",
      category: "getting-started",
      tags: ["pricing", "free", "premium"],
      helpful: 67
    },
    {
      id: "gs4",
      question: "What should I add to my profile first?",
      answer: "Start with your basic information and professional summary, then add your most significant achievements, certificates, and work experiences. The platform will guide you through completing your profile with a progress indicator.",
      category: "getting-started",
      tags: ["profile", "setup", "achievements"],
      helpful: 28
    },

    // Features & Usage
    {
      id: "f1",
      question: "How do I add certificates to my profile?",
      answer: "Navigate to the Certificates section in your dashboard, click &apos;Add Certificate&apos;, and upload your certificate files (PDF, JPG, PNG). Include details like issuing organization, date, and any verification URLs. Our system will automatically extract information when possible.",
      category: "features",
      tags: ["certificates", "upload", "documents"],
      helpful: 41
    },
    {
      id: "f2",
      question: "Can I track work experiences and internships?",
      answer: "Absolutely! Use the Jobs & Internships section to record all your work experiences, internships, and part-time jobs. You can add detailed descriptions, skills gained, achievements, and even upload supporting documents like offer letters or completion certificates.",
      category: "features",
      tags: ["jobs", "internships", "experience"],
      helpful: 35
    },
    {
      id: "f3",
      question: "How does the AI Assistant work?",
      answer: "Our AI Assistant analyzes your profile data to provide personalized career guidance, skill recommendations, and job market insights. It can suggest improvements to your profile, recommend relevant certifications, and help you discover career paths that match your skills and interests.",
      category: "features",
      tags: ["ai", "assistant", "recommendations"],
      helpful: 52
    },
    {
      id: "f4",
      question: "What types of achievements can I record?",
      answer: "You can record academic achievements (Dean&apos;s List, honors), competition wins (hackathons, contests), leadership roles, volunteer work, publications, presentations, projects, and any other accomplishments that demonstrate your skills and capabilities.",
      category: "features",
      tags: ["achievements", "types", "recording"],
      helpful: 29
    },

    // Verification
    {
      id: "v1",
      question: "How are my achievements verified?",
      answer: "We use a multi-step verification process including document analysis, institutional verification (when available), and AI-powered authenticity checks. Our verification team reviews submissions and may request additional documentation if needed.",
      category: "verification",
      tags: ["verification", "process", "authenticity"],
      helpful: 38
    },
    {
      id: "v2",
      question: "How long does verification take?",
      answer: "Verification typically takes 2-5 business days for most submissions. Complex cases or those requiring additional documentation may take longer. You&apos;ll receive email notifications about your verification status.",
      category: "verification",
      tags: ["time", "duration", "status"],
      helpful: 43
    },
    {
      id: "v3",
      question: "What if my verification is rejected?",
      answer: "If verification is rejected, you&apos;ll receive detailed feedback about why and what additional information or documentation is needed. You can resubmit with the requested materials, and our team will review again.",
      category: "verification",
      tags: ["rejection", "feedback", "resubmission"],
      helpful: 26
    },

    // Portfolio Creation
    {
      id: "p1",
      question: "How do I generate a portfolio?",
      answer: "Go to the E-Portfolio section, choose from our professional templates, and click &apos;Generate AI Portfolio&apos;. Our AI will analyze your data and create a polished portfolio automatically. You can then customize the content and design before exporting.",
      category: "portfolio",
      tags: ["portfolio", "generation", "templates"],
      helpful: 55
    },
    {
      id: "p2",
      question: "Can I export my portfolio as a PDF?",
      answer: "Yes! Once your portfolio is generated, you can export it as a high-quality PDF document. The PDF maintains professional formatting and is perfect for job applications, graduate school applications, or sharing with potential employers.",
      category: "portfolio",
      tags: ["pdf", "export", "download"],
      helpful: 48
    },
    {
      id: "p3",
      question: "Can I customize the portfolio design?",
      answer: "Absolutely! Choose from multiple professional templates, customize colors, fonts, and layout. You can also edit content, rearrange sections, and add or remove elements to match your personal brand and career goals.",
      category: "portfolio",
      tags: ["customization", "design", "templates"],
      helpful: 31
    },

    // Account Management
    {
      id: "a1",
      question: "How do I change my email address?",
      answer: "Go to Account Settings, click &apos;Change Email&apos;, enter your new email address, and verify it through the confirmation email. Note that changing to a non-educational email may affect some institutional features.",
      category: "account",
      tags: ["email", "change", "settings"],
      helpful: 22
    },
    {
      id: "a2",
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account from the Account Settings page. This action is permanent and will remove all your data. We recommend exporting your portfolio first. Account deletion takes effect within 24 hours.",
      category: "account",
      tags: ["delete", "account", "data"],
      helpful: 15
    },
    {
      id: "a3",
      question: "How do I update my privacy settings?",
      answer: "Navigate to Privacy Settings in your account preferences. You can control who can view your profile, what information is public, and manage data sharing preferences. Your academic records are always kept private by default.",
      category: "account",
      tags: ["privacy", "settings", "data"],
      helpful: 27
    },

    // For Institutions
    {
      id: "i1",
      question: "How can our institution partner with you?",
      answer: "We offer institutional partnerships that provide enhanced features for students and analytics for administrators. Contact our partnerships team at partnerships@studentrecords.com to discuss custom solutions for your institution.",
      category: "institutions",
      tags: ["partnership", "institutions", "contact"],
      helpful: 33
    },
    {
      id: "i2",
      question: "What data do institutions have access to?",
      answer: "Institutions only have access to aggregated, anonymized analytics about their students&apos; platform usage. Individual student data remains private unless explicitly shared by the student or required for verification purposes.",
      category: "institutions",
      tags: ["data", "privacy", "access"],
      helpful: 19
    }
  ];

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqs
    .filter(faq => faq.helpful && faq.helpful > 30)
    .sort((a, b) => (b.helpful || 0) - (a.helpful || 0))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find answers to common questions about our platform, features, and services.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 space-y-12">
        {/* Popular Questions */}
        {!searchTerm && selectedCategory === "all" && (
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Most Popular Questions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularFAQs.map((faq) => (
                <Card key={faq.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => toggleExpanded(faq.id)}>
                  <CardHeader>
                    <CardTitle className="text-lg flex justify-between items-start">
                      <span className="flex-1">{faq.question}</span>
                      <div className="flex items-center gap-2 ml-2">
                        <Badge variant="outline" className="text-xs">
                          {faq.helpful} helpful
                        </Badge>
                        {expandedItems.has(faq.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  {expandedItems.has(faq.id) && (
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category.id 
                      ? "ring-2 ring-blue-600 border-blue-200 bg-blue-50" 
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? "all" : category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                      <h3 className="font-semibold">{category.name}</h3>
                      <Badge variant="outline" className="ml-auto">
                        {category.count}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedCategory !== "all" && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Showing:</span>
              <Badge variant="outline" className="flex items-center gap-1">
                {categories.find(c => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:bg-gray-200 rounded">
                  ×
                </button>
              </Badge>
            </div>
          )}
        </section>

        {/* FAQ List */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {searchTerm || selectedCategory !== "all" ? "Search Results" : "All Questions"}
            </h2>
            <div className="text-sm text-muted-foreground">
              {filteredFAQs.length} question{filteredFAQs.length !== 1 ? "s" : ""} found
            </div>
          </div>

          {filteredFAQs.length === 0 ? (
            <Card className="p-12 text-center">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg flex-1">{faq.question}</CardTitle>
                      <div className="flex items-center gap-2 ml-4">
                        {faq.helpful && (
                          <Badge variant="outline" className="text-xs">
                            {faq.helpful} helpful
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === faq.category)?.name}
                        </Badge>
                        {expandedItems.has(faq.id) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {expandedItems.has(faq.id) && (
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{faq.answer}</p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex gap-1">
                          {faq.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            👍 Helpful
                          </Button>
                          <Button variant="outline" size="sm">
                            👎 Not helpful
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Still Need Help */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help you with any questions or issues.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <CardContent className="pt-6 text-center">
                  <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Contact Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get help from our support team
                  </p>
                  <Button className="w-full">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="pt-6 text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Community Forum</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other users
                  </p>
                  <Button variant="outline" className="w-full">
                    Join Forum
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed guides and tutorials
                  </p>
                  <Button variant="outline" className="w-full">
                    Browse Docs
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
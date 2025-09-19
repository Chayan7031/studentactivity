"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  Users,
  Building,
  HelpCircle,
  CheckCircle,
  ExternalLink
} from "lucide-react";

interface ContactOption {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  action: string;
  contact: string;
  availability: string;
  category: "general" | "support" | "business" | "press";
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactOptions: ContactOption[] = [
    {
      icon: MessageCircle,
      title: "General Inquiries",
      description: "Questions about our platform, features, or getting started",
      action: "Send Email",
      contact: "hello@studentrecords.com",
      availability: "Response within 24 hours",
      category: "general"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Need help with technical issues or account problems",
      action: "Get Support",
      contact: "support@studentrecords.com",
      availability: "Response within 4 hours",
      category: "support"
    },
    {
      icon: Building,
      title: "Institutional Partnerships",
      description: "Universities and institutions interested in partnerships",
      action: "Contact Sales",
      contact: "partnerships@studentrecords.com",
      availability: "Response within 2 business days",
      category: "business"
    },
    {
      icon: Users,
      title: "Media & Press",
      description: "Press inquiries, interviews, and media requests",
      action: "Media Contact",
      contact: "press@studentrecords.com",
      availability: "Response within 1 business day",
      category: "press"
    }
  ];

  const quickFAQs: FAQ[] = [
    {
      question: "How do I get started with the platform?",
      answer: "Simply sign up with your educational email address, verify your account, and start adding your achievements, certificates, and experiences.",
      category: "Getting Started"
    },
    {
      question: "Is the platform free for students?",
      answer: "Yes! Our core features are completely free for students. Premium features and advanced analytics are available through our institutional partnerships.",
      category: "Pricing"
    },
    {
      question: "How are achievements verified?",
      answer: "We use a combination of institutional verification, document analysis, and AI-powered validation to ensure the authenticity of all recorded achievements.",
      category: "Verification"
    },
    {
      question: "Can I export my portfolio?",
      answer: "Absolutely! You can export your portfolio as a PDF, generate a web link, or integrate with your existing professional profiles.",
      category: "Features"
    }
  ];

  const officeLocations = [
    {
      city: "San Francisco, CA",
      address: "123 Innovation Drive, Suite 400",
      phone: "+1 (555) 123-4567",
      isPrimary: true
    },
    {
      city: "Austin, TX",
      address: "456 Tech Boulevard, Floor 2",
      phone: "+1 (555) 987-6543",
      isPrimary: false
    },
    {
      city: "Boston, MA",
      address: "789 Education Square, Suite 200",
      phone: "+1 (555) 456-7890",
      isPrimary: false
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "general",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We&apos;re here to help you succeed. Reach out to us for support, partnerships, 
            or just to say hello.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* Contact Options */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">How Can We Help?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        onClick={() => window.location.href = `mailto:${option.contact}`}
                      >
                        {option.action}
                      </Button>
                      <div className="text-xs text-muted-foreground">{option.availability}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnerships">Partnerships</option>
                      <option value="press">Media & Press</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject *</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Our Offices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {officeLocations.map((office, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${office.isPrimary ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{office.city}</h4>
                        {office.isPrimary && (
                          <Badge className="bg-blue-600">Headquarters</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{office.address}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {office.phone}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 2:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                  <div className="pt-2 mt-2 border-t text-xs text-muted-foreground">
                    * Technical support available 24/7 through our online portal
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For critical platform issues affecting institutional operations:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">+1 (555) 911-HELP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">emergency@studentrecords.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quickFAQs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {faq.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="flex items-center gap-2 mx-auto">
              <HelpCircle className="h-4 w-4" />
              View All FAQs
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Alternative Contact Methods */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Other Ways to Connect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Available 24/7 for immediate assistance
                </p>
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Community Forum</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with other students and get peer support
                </p>
                <Button variant="outline" className="w-full">
                  Join Forum
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <HelpCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Help Center</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive guides and tutorials
                </p>
                <Button variant="outline" className="w-full">
                  Browse Articles
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Response Time Commitment */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto p-8">
            <CardContent className="pt-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Our Response Commitment</h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re committed to providing timely, helpful responses to all inquiries. 
                Our team monitors all communication channels and will get back to you as quickly as possible.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold">General Inquiries</div>
                  <div className="text-muted-foreground">Within 24 hours</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold">Technical Support</div>
                  <div className="text-muted-foreground">Within 4 hours</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
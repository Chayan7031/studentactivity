"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Globe, 
  Zap,
  Shield,
  Star,
  CheckCircle,
  TrendingUp,
  BookOpen,
  Lightbulb
} from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
}

interface Statistic {
  number: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function AboutUsPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Founder",
      image: "SJ",
      bio: "Former VP of Student Services at Tech University with 15+ years in higher education technology.",
      expertise: ["Higher Education", "EdTech Innovation", "Student Success"]
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "MC",
      bio: "Ex-Google engineer specializing in scalable web applications and AI integration.",
      expertise: ["Full Stack Development", "AI/ML", "System Architecture"]
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      image: "ER",
      bio: "UX researcher turned product manager, passionate about student-centered design.",
      expertise: ["Product Strategy", "UX Design", "User Research"]
    },
    {
      name: "David Park",
      role: "Lead Developer",
      image: "DP",
      bio: "Full-stack developer with expertise in modern web technologies and cloud infrastructure.",
      expertise: ["React", "Node.js", "Cloud Computing"]
    }
  ];

  const statistics: Statistic[] = [
    { number: "10,000+", label: "Active Students", icon: Users },
    { number: "500+", label: "Partner Institutions", icon: Globe },
    { number: "50,000+", label: "Verified Achievements", icon: Award },
    { number: "99.9%", label: "Platform Uptime", icon: Shield }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Student-Centric",
      description: "Everything we build is designed with students&apos; success and career growth in mind."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Trust & Verification",
      description: "We maintain the highest standards of verification to ensure credibility and authenticity."
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Innovation",
      description: "Leveraging cutting-edge AI and technology to transform how students showcase their achievements."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Accessibility",
      description: "Making professional portfolio creation accessible to students from all backgrounds and institutions."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Founded",
      description: "Started with a vision to revolutionize student achievement tracking"
    },
    {
      year: "2023",
      title: "Beta Launch",
      description: "Launched beta version with 5 partner universities"
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Introduced AI-powered portfolio generation and career guidance"
    },
    {
      year: "2024",
      title: "10K Users",
      description: "Reached 10,000+ active students across 500+ institutions"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Student Success
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We&apos;re building the future of student achievement tracking and career development,
            one profile at a time.
          </p>
          <div className="flex justify-center">
            <Badge className="bg-white/20 text-white border-white/30 px-6 py-2 text-lg">
              Trusted by 10,000+ Students
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* Mission Statement */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To democratize access to professional portfolio creation and career development tools, 
            ensuring every student can effectively showcase their achievements and secure their dream opportunities. 
            We believe that talent is everywhere, but opportunity isn&apos;t always accessible.
          </p>
        </section>

        {/* Statistics */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <IconComponent className="h-8 w-8 mx-auto mb-4 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Our Story */}
        <section>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Student Activity Record Portal was born from a simple observation: talented students 
                  were struggling to effectively communicate their achievements to potential employers and 
                  graduate programs.
                </p>
                <p>
                  As educators and technologists, our founding team witnessed countless students with 
                  impressive accomplishments fail to land opportunities simply because they couldn&apos;t 
                  present their experiences in a compelling, professional format.
                </p>
                <p>
                  We set out to solve this problem by creating an intelligent platform that not only 
                  organizes student achievements but actively helps them craft compelling narratives 
                  and professional portfolios.
                </p>
              </div>
            </div>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span>AI-powered content optimization</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span>Industry-standard verification processes</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span>Seamless integration with institutions</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span>Professional portfolio generation</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="pt-6">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center gap-8">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold z-10">
                    {milestone.year}
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mx-auto mb-4">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.expertise.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recognition */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Recognition & Awards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">EdTech Innovation Award</h3>
                <p className="text-sm text-muted-foreground">2024 Higher Education Technology Conference</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fastest Growing Platform</h3>
                <p className="text-sm text-muted-foreground">Student Success Technology Awards 2024</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Best Student Platform</h3>
                <p className="text-sm text-muted-foreground">Education Technology Review 2024</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Future Vision */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Looking Forward</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
            We&apos;re just getting started. Our roadmap includes expanded AI capabilities, 
            global university partnerships, and innovative features that will continue 
            to revolutionize how students present their achievements to the world.
          </p>
          <div className="flex justify-center">
            <Card className="p-6 max-w-md">
              <CardContent className="pt-6 text-center">
                <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Join Our Mission</h3>
                <p className="text-sm text-muted-foreground">
                  Interested in shaping the future of student success? We&apos;re always looking for 
                  passionate individuals to join our team.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
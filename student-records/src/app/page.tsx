import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap,
  Award,
  Brain,
  Users,
  Globe,
  CheckCircle,
  BarChart3,
  FileText,
  Verified,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SARP</span>
              <span className="text-sm text-gray-600">Student Activity Record Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline">Student Login</Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline">Admin Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">One Profile.</span> All Achievements. <span className="text-green-600">Verified.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate digital platform for Higher Education Institutions to document, track, verify, and showcase student&apos;s complete academic and non-academic activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25,000+</div>
              <div className="text-gray-600">Students Onboarded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">150,000+</div>
              <div className="text-gray-600">Certificates Uploaded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Skills Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Partner Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage, verify, and showcase student achievements in one comprehensive platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Student Records</CardTitle>
                <CardDescription>
                  Centralized digital portfolio of all academic and non-academic achievements
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Certificates & Awards</CardTitle>
                <CardDescription>
                  Upload, organize, and verify certificates, competitions, and achievements
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>AI Career Guidance</CardTitle>
                <CardDescription>
                  Personalized recommendations for career paths, skills, and opportunities
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Verified className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Faculty Verification</CardTitle>
                <CardDescription>
                  Secure verification system for authenticity and credibility
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-cyan-600 mb-4" />
                <CardTitle>National-Level Scaling</CardTitle>
                <CardDescription>
                  Designed for seamless integration across educational institutions
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Comprehensive analytics for students, faculty, and institutions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Revolutionizing Student Record Management
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our platform eliminates the fragmentation of student records, simplifies NAAC/NBA accreditation, 
                builds employability with verified achievements, and promotes eco-friendly digital documentation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Centralized digital portfolio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Verified achievements & certificates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">AI-powered career guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Seamless accreditation support</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Platform Benefits</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Eliminates fragmentation of student records</li>
                <li>• Simplifies NAAC/NBA accreditation processes</li>
                <li>• Builds employability with verified achievements</li>
                <li>• Reduces paperwork with eco-friendly solution</li>
                <li>• Provides AI-driven career insights</li>
                <li>• Enables institutional analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Student Records?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students and institutions already using SARP to showcase achievements and build careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create Student Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                Contact for Institution Setup
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-lg font-bold">SARP</span>
              </div>
              <p className="text-gray-400">
                Student Activity Record Portal - Empowering education through digital innovation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Student Activity Record Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

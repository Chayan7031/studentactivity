import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">SARP</span>
              <span className="hidden sm:block text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">Student Activity Record Portal</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                <Link href="/about">
                  <Button variant="ghost">About</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost">Contact</Button>
                </Link>
              </div>
              <ThemeToggle />
              <Link href="/sign-in">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
                  <span className="hidden sm:inline">Student Login</span>
                  <span className="sm:hidden">Login</span>
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
                  <span className="hidden sm:inline">Admin Login</span>
                  <span className="sm:hidden">Admin</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            <span className="text-blue-600">One Profile.</span> All Achievements. <span className="text-green-600">Verified.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            The ultimate digital platform for Higher Education Institutions to document, track, verify, and showcase student&apos;s complete academic and non-academic activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link href="/sign-up" className="w-full sm:w-auto">
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
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">25,000+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Students Onboarded</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">150,000+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Certificates Uploaded</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Skills Tracked</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">50+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Partner Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
              Everything you need to manage, verify, and showcase student achievements in one comprehensive platform.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Student Records</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Centralized digital portfolio of all academic and non-academic achievements
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <Award className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Certificates & Awards</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Upload, organize, and verify certificates, competitions, and achievements
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">AI Career Guidance</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Personalized recommendations for career paths, skills, and opportunities
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <Verified className="h-10 w-10 sm:h-12 sm:w-12 text-orange-600 mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Faculty Verification</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Secure verification system for authenticity and credibility
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <Globe className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-600 mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">National-Level Scaling</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Designed for seamless integration across educational institutions
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-red-600 mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Analytics & Insights</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Comprehensive analytics for students, faculty, and institutions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Revolutionizing Student Record Management
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                Our platform eliminates the fragmentation of student records, simplifies NAAC/NBA accreditation, 
                builds employability with verified achievements, and promotes eco-friendly digital documentation.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Centralized digital portfolio</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Verified achievements & certificates</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">AI-powered career guidance</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Seamless accreditation support</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Platform Benefits</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
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
      <section className="py-12 sm:py-16 md:py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Student Records?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of students and institutions already using SARP to showcase achievements and build careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg sm:max-w-none mx-auto">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create Student Account
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                <span className="hidden sm:inline">Contact for Institution Setup</span>
                <span className="sm:hidden">Contact Us</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-base sm:text-lg font-bold">SARP</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Student Activity Record Portal - Empowering education through digital innovation.
              </p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Platform</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Support</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Company</h3>
              <ul className="space-y-1 sm:space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-400">&copy; 2024 Student Activity Record Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

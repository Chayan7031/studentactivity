"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  User,
  FileText,
  Award,
  Briefcase,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  Bell,
  BookOpen,
  ExternalLink,
  Lightbulb
} from "lucide-react"
import Link from "next/link"

interface StudentProfile {
  id: string
  firstName: string
  lastName: string
  department: string
  course: string
  year: number
  semester: number
  completionPercentage: number
  certificates: any[]
  skills: any[]
  achievements: any[]
  jobs: any[]
  internships: any[]
  experiences: any[]
  notifications: any[]
}

interface StudentStats {
  certificates: {
    total: number
    verified: number
    pending: number
  }
  skills: number
  achievements: {
    total: number
    verified: number
    pending: number
  }
  experience: {
    jobs: number
    internships: number
    other: number
  }
  recentActivities: any[]
}

interface AIInsight {
  type: string
  priority: string
  title: string
  message: string
  action: string
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null)
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [showWizard, setShowWizard] = useState(false)

  // Fetch student data
  useEffect(() => {
    if (isLoaded && user) {
      fetchStudentData()
    }
  }, [isLoaded, user])

  const fetchStudentData = async () => {
    try {
      setLoading(true)
      
      // Fetch student profile
      const profileResponse = await fetch('/api/student/profile')
      if (profileResponse.ok) {
        const profile = await profileResponse.json()
        setStudentProfile(profile)
        
        if (profile.completionPercentage < 70) {
          setShowWizard(true)
        }
        
        // Fetch student stats
        const statsResponse = await fetch('/api/student/stats')
        if (statsResponse.ok) {
          const stats = await statsResponse.json()
          setStudentStats(stats)
        }
        
        // Fetch AI insights
        const insightsResponse = await fetch('/api/student/insights')
        if (insightsResponse.ok) {
          const insights = await insightsResponse.json()
          setAIInsights(insights)
        }
      }
    } catch (error) {
      console.error('Error fetching student data:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: "Upload Certificate",
      description: "Add a new certificate or achievement",
      icon: FileText,
      href: "/dashboard/certificates",
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Update Skills",
      description: "Add or update your skills portfolio",
      icon: Award,
      href: "/dashboard/achievements",
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Add Job Experience",
      description: "Record internship or job experience",
      icon: Briefcase,
      href: "/dashboard/jobs",
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Complete Profile",
      description: "Finish setting up your profile",
      icon: User,
      href: "/dashboard/profile",
      color: "text-orange-600 bg-orange-100"
    }
  ]

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!studentProfile) {
    return (
      <div className="space-y-8">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              It looks like your student profile hasn't been created yet.
            </p>
            <Link href="/dashboard/profile">
              <Button>Create Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {studentProfile.firstName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {studentProfile.department} • {studentProfile.course} • Year {studentProfile.year}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {studentProfile.notifications.length > 0 && (
            <Link href="/dashboard/notifications">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                {studentProfile.notifications.length}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Profile Completion Wizard */}
      {showWizard && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-900 dark:text-orange-200">Complete Your Profile</CardTitle>
            </div>
            <CardDescription className="text-orange-700 dark:text-orange-300">
              Your profile is {studentProfile.completionPercentage}% complete. Finish setting up to unlock all features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-orange-700 dark:text-orange-300 mb-2">
                  <span>Profile Completion</span>
                  <span>{studentProfile.completionPercentage}%</span>
                </div>
                <Progress value={studentProfile.completionPercentage} className="h-2" />
              </div>
              <div className="flex space-x-3">
                <Link href="/dashboard/profile">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Complete Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => setShowWizard(false)}>
                  Remind Me Later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-900 dark:text-blue-200">AI Insights & Recommendations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
                  <div className={`p-1 rounded ${
                    insight.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                    insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{insight.message}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    {insight.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{profileStats.certificatesCount}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>2 added this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Skills</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{profileStats.skillsCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>3 improved this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Achievements</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{profileStats.achievementsCount}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>1 verified this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Experience</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{profileStats.jobsCount}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Briefcase className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Updated recently</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${action.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Certificate verified</p>
                  <p className="text-sm text-gray-500">AWS Cloud Practitioner certificate was verified by admin</p>
                </div>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New certificate uploaded</p>
                  <p className="text-sm text-gray-500">Added Python Programming certificate</p>
                </div>
                <span className="text-sm text-gray-400">1 day ago</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Skill level updated</p>
                  <p className="text-sm text-gray-500">JavaScript skill upgraded to Advanced</p>
                </div>
                <span className="text-sm text-gray-400">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
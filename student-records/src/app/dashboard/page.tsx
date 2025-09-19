"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  User,
  FileText,
  Award,
  Briefcase,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target
} from "lucide-react"
import Link from "next/link"

interface ProfileStats {
  completionPercentage: number
  certificatesCount: number
  skillsCount: number
  achievementsCount: number
  jobsCount: number
}

export default function DashboardPage() {
  const { user } = useUser()
  const [profileStats, setProfileStats] = useState<ProfileStats>({
    completionPercentage: 35,
    certificatesCount: 3,
    skillsCount: 8,
    achievementsCount: 2,
    jobsCount: 1
  })

  const [showWizard, setShowWizard] = useState(false)

  // Check if profile is incomplete (for demo purposes)
  useEffect(() => {
    if (profileStats.completionPercentage < 70) {
      setShowWizard(true)
    }
  }, [profileStats.completionPercentage])

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

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName || "Student"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Track your progress and manage your achievements in one place.
        </p>
      </div>

      {/* Profile Completion Wizard */}
      {showWizard && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-900">Complete Your Profile</CardTitle>
            </div>
            <CardDescription className="text-orange-700">
              Your profile is {profileStats.completionPercentage}% complete. Finish setting up to unlock all features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-orange-700 mb-2">
                  <span>Profile Completion</span>
                  <span>{profileStats.completionPercentage}%</span>
                </div>
                <Progress value={profileStats.completionPercentage} className="h-2" />
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-3xl font-bold text-gray-900">{profileStats.certificatesCount}</p>
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
                <p className="text-sm font-medium text-gray-600">Skills</p>
                <p className="text-3xl font-bold text-gray-900">{profileStats.skillsCount}</p>
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
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-3xl font-bold text-gray-900">{profileStats.achievementsCount}</p>
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
                <p className="text-sm font-medium text-gray-600">Experience</p>
                <p className="text-3xl font-bold text-gray-900">{profileStats.jobsCount}</p>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
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
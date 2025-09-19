"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  FileCheck, 
  Award, 
  TrendingUp, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  AlertCircle,
  Settings
} from "lucide-react";

interface PendingVerification {
  id: string;
  studentName: string;
  studentEmail: string;
  type: "certificate" | "achievement" | "job" | "skill";
  title: string;
  description: string;
  submittedAt: Date;
  attachments?: string[];
  priority: "high" | "medium" | "low";
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  pendingVerifications: number;
  completedVerifications: number;
  certificates: number;
  achievements: number;
  jobs: number;
  dailySignups: number;
}

interface AnalyticsData {
  userGrowth: { month: string; users: number }[];
  verificationTrends: { month: string; verified: number; pending: number }[];
  popularSkills: { skill: string; count: number }[];
  institutionStats: { name: string; students: number }[];
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data for demonstration
  const [systemStats] = useState<SystemStats>({
    totalUsers: 2847,
    activeUsers: 1923,
    pendingVerifications: 89,
    completedVerifications: 1456,
    certificates: 3421,
    achievements: 2156,
    jobs: 1834,
    dailySignups: 23
  });

  const [pendingVerifications] = useState<PendingVerification[]>([
    {
      id: "cert_001",
      studentName: "John Smith",
      studentEmail: "john.smith@university.edu",
      type: "certificate",
      title: "AWS Solutions Architect Associate",
      description: "Cloud architecture certification with hands-on experience in AWS services",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      attachments: ["certificate.pdf", "verification_letter.pdf"],
      priority: "high"
    },
    {
      id: "ach_002",
      studentName: "Sarah Johnson",
      studentEmail: "sarah.j@college.edu",
      type: "achievement",
      title: "Hackathon Winner - Tech Innovation 2024",
      description: "First place in university-wide hackathon developing AI-powered study assistant",
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      attachments: ["award_certificate.jpg", "project_demo.mp4"],
      priority: "medium"
    },
    {
      id: "job_003",
      studentName: "Michael Chen",
      studentEmail: "m.chen@institute.edu",
      type: "job",
      title: "Software Engineer Intern - Google",
      description: "12-week internship in Google's Cloud Platform team",
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      attachments: ["offer_letter.pdf", "completion_certificate.pdf"],
      priority: "high"
    },
    {
      id: "skill_004",
      studentName: "Emily Davis",
      studentEmail: "emily.davis@university.edu",
      type: "skill",
      title: "Advanced React Development",
      description: "Completed advanced React course with project portfolio",
      submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      attachments: ["course_completion.pdf", "portfolio_link.txt"],
      priority: "low"
    }
  ]);

  const [analyticsData] = useState<AnalyticsData>({
    userGrowth: [
      { month: "Jan", users: 2100 },
      { month: "Feb", users: 2300 },
      { month: "Mar", users: 2500 },
      { month: "Apr", users: 2650 },
      { month: "May", users: 2780 },
      { month: "Jun", users: 2847 }
    ],
    verificationTrends: [
      { month: "Jan", verified: 180, pending: 45 },
      { month: "Feb", verified: 220, pending: 38 },
      { month: "Mar", verified: 195, pending: 52 },
      { month: "Apr", verified: 240, pending: 41 },
      { month: "May", verified: 268, pending: 36 },
      { month: "Jun", verified: 289, pending: 43 }
    ],
    popularSkills: [
      { skill: "JavaScript", count: 456 },
      { skill: "Python", count: 423 },
      { skill: "React", count: 389 },
      { skill: "AWS", count: 345 },
      { skill: "Node.js", count: 312 },
      { skill: "Machine Learning", count: 298 }
    ],
    institutionStats: [
      { name: "Tech University", students: 892 },
      { name: "State College", students: 654 },
      { name: "Engineering Institute", students: 543 },
      { name: "Business School", students: 421 },
      { name: "Community College", students: 337 }
    ]
  });

  const handleVerificationAction = (id: string, action: "approve" | "reject", comment?: string) => {
    console.log(`${action} verification ${id}`, comment);
    // In real implementation, this would call the API
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "certificate": return <FileCheck className="h-4 w-4" />;
      case "achievement": return <Award className="h-4 w-4" />;
      case "job": return <Users className="h-4 w-4" />;
      case "skill": return <TrendingUp className="h-4 w-4" />;
      default: return <FileCheck className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "certificate": return "bg-blue-100 text-blue-800";
      case "achievement": return "bg-purple-100 text-purple-800";
      case "job": return "bg-green-100 text-green-800";
      case "skill": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredVerifications = pendingVerifications.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Manage verifications, view analytics, and oversee platform operations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="verifications" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Verifications
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{systemStats.dailySignups} new today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((systemStats.activeUsers / systemStats.totalUsers) * 100)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{systemStats.pendingVerifications}</div>
                <p className="text-xs text-muted-foreground">
                  Requires attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Verifications</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{systemStats.completedVerifications.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  All time
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Quick Stats */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
                <CardDescription>Overview of platform content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Certificates</span>
                  <span className="font-medium">{systemStats.certificates.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Achievements</span>
                  <span className="font-medium">{systemStats.achievements.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Job Experiences</span>
                  <span className="font-medium">{systemStats.jobs.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Records</span>
                    <span className="font-bold">
                      {(systemStats.certificates + systemStats.achievements + systemStats.jobs).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Institutions</CardTitle>
                <CardDescription>Most active educational institutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.institutionStats.slice(0, 5).map((institution, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{institution.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(institution.students / analyticsData.institutionStats[0].students) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-sm w-12 text-right">{institution.students}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileCheck className="h-6 w-6" />
                  <span className="text-sm">Review Verifications</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Download className="h-6 w-6" />
                  <span className="text-sm">Export Data</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Users</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">System Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verifications" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Queue</CardTitle>
              <CardDescription>Review and approve student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by student name or submission title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="certificate">Certificates</option>
                  <option value="achievement">Achievements</option>
                  <option value="job">Job Experiences</option>
                  <option value="skill">Skills</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredVerifications.map((verification) => (
                  <Card key={verification.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(verification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{verification.title}</h3>
                            <Badge className={`text-xs ${getTypeColor(verification.type)}`}>
                              {verification.type}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(verification.priority)}`}
                            >
                              {verification.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {verification.description}
                          </p>
                          <div className="text-sm">
                            <strong>Student:</strong> {verification.studentName} ({verification.studentEmail})
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Submitted: {verification.submittedAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-2">
                          {verification.submittedAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {verification.attachments && verification.attachments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Attachments:</h4>
                        <div className="flex gap-2 flex-wrap">
                          {verification.attachments.map((attachment, index) => (
                            <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                              <Eye className="h-3 w-3 mr-1" />
                              {attachment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleVerificationAction(verification.id, "approve")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleVerificationAction(verification.id, "reject")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Review Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* User Growth Chart */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>Monthly user registration over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.userGrowth.map((month, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{month.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(month.users / Math.max(...analyticsData.userGrowth.map(m => m.users))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-sm w-16 text-right">{month.users}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Trends</CardTitle>
                <CardDescription>Monthly verification statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.verificationTrends.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{month.month}</span>
                        <span className="text-sm text-muted-foreground">
                          {month.verified + month.pending} total
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Verified: {month.verified}</span>
                          <span>Pending: {month.pending}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 flex">
                          <div 
                            className="bg-green-600 h-2 rounded-l-full" 
                            style={{ width: `${(month.verified / (month.verified + month.pending)) * 100}%` }}
                          ></div>
                          <div 
                            className="bg-orange-400 h-2 rounded-r-full" 
                            style={{ width: `${(month.pending / (month.verified + month.pending)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Skills</CardTitle>
              <CardDescription>Skills most frequently added by students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {analyticsData.popularSkills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${(skill.count / analyticsData.popularSkills[0].count) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-sm w-12 text-right">{skill.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Data Export</CardTitle>
              <CardDescription>Download analytics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Download className="h-5 w-5" />
                  <span className="text-sm">User Report</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Download className="h-5 w-5" />
                  <span className="text-sm">Verification Report</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1">
                  <Download className="h-5 w-5" />
                  <span className="text-sm">Skills Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>General platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Auto-approval for verified institutions</span>
                    <p className="text-sm text-muted-foreground">Automatically approve submissions from trusted sources</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Email notifications</span>
                    <p className="text-sm text-muted-foreground">Send alerts for pending verifications</p>
                  </div>
                  <Button variant="outline" size="sm">Settings</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Verification deadlines</span>
                    <p className="text-sm text-muted-foreground">Set SLA for verification response times</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security & Access</CardTitle>
                <CardDescription>Admin permissions and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Admin users</span>
                    <p className="text-sm text-muted-foreground">Manage administrator accounts</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Activity logs</span>
                    <p className="text-sm text-muted-foreground">View system audit trail</p>
                  </div>
                  <Button variant="outline" size="sm">View Logs</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">Backup settings</span>
                    <p className="text-sm text-muted-foreground">Configure data backup schedule</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor platform performance and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2.1GB</div>
                  <div className="text-sm text-muted-foreground">Storage Used</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
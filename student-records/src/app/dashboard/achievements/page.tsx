"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  Trophy,
  Target,
  Plus,
  Star,
  TrendingUp,
  Brain,
  Code,
  Palette,
  Users,
  MessageSquare,
  BarChart3,
  Globe,
  Zap,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Schemas
const skillSchema = z.object({
  name: z.string().min(2, "Skill name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  proficiency: z.string().min(1, "Proficiency level is required"),
  description: z.string().optional(),
})

const achievementSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  achievementDate: z.string().min(1, "Achievement date is required"),
  organization: z.string().optional(),
  position: z.string().optional(),
  level: z.string().min(1, "Level is required"),
})

type SkillFormData = z.infer<typeof skillSchema>
type AchievementFormData = z.infer<typeof achievementSchema>

interface Skill {
  id: string
  name: string
  category: string
  proficiency: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"
  description?: string
  acquiredDate: string
}

interface Achievement {
  id: string
  title: string
  description: string
  category: string
  achievementDate: string
  organization?: string
  position?: string
  level: string
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED"
}

export default function AchievementsPage() {
  // Skills State
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "1",
      name: "JavaScript",
      category: "PROGRAMMING",
      proficiency: "ADVANCED",
      description: "Frontend and backend development with modern frameworks",
      acquiredDate: "2023-01-15"
    },
    {
      id: "2", 
      name: "React",
      category: "WEB_DEVELOPMENT",
      proficiency: "ADVANCED",
      description: "Building complex web applications with hooks and state management",
      acquiredDate: "2023-03-20"
    },
    {
      id: "3",
      name: "Python",
      category: "PROGRAMMING",
      proficiency: "INTERMEDIATE",
      description: "Data analysis, web development, and automation",
      acquiredDate: "2022-09-10"
    },
    {
      id: "4",
      name: "Communication",
      category: "COMMUNICATION",
      proficiency: "ADVANCED",
      description: "Public speaking and presentation skills",
      acquiredDate: "2023-05-12"
    }
  ])

  // Achievements State
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "First Place - College Hackathon 2024",
      description: "Won first place in the annual college hackathon by developing an innovative student management system using React and Node.js",
      category: "TECHNICAL",
      achievementDate: "2024-01-20",
      organization: "ABC College",
      position: "1st Place",
      level: "INSTITUTIONAL",
      verificationStatus: "VERIFIED"
    },
    {
      id: "2",
      title: "Best Volunteer Award",
      description: "Recognized for outstanding community service and leadership in organizing blood donation camps",
      category: "COMMUNITY_SERVICE",
      achievementDate: "2023-12-15",
      organization: "Red Cross Society",
      level: "LOCAL",
      verificationStatus: "PENDING"
    }
  ])

  // Dialog states
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false)
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form hooks
  const skillForm = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema)
  })

  const achievementForm = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema)
  })

  const skillCategories = [
    { value: "PROGRAMMING", label: "Programming", icon: Code },
    { value: "WEB_DEVELOPMENT", label: "Web Development", icon: Globe },
    { value: "MOBILE_DEVELOPMENT", label: "Mobile Development", icon: Zap },
    { value: "DATA_SCIENCE", label: "Data Science", icon: BarChart3 },
    { value: "DESIGN", label: "Design", icon: Palette },
    { value: "COMMUNICATION", label: "Communication", icon: MessageSquare },
    { value: "LEADERSHIP", label: "Leadership", icon: Users },
    { value: "OTHER", label: "Other", icon: Star }
  ]

  const achievementCategories = [
    { value: "ACADEMIC", label: "Academic", icon: Award },
    { value: "TECHNICAL", label: "Technical", icon: Code },
    { value: "SPORTS", label: "Sports", icon: Trophy },
    { value: "CULTURAL", label: "Cultural", icon: Star },
    { value: "LEADERSHIP", label: "Leadership", icon: Users },
    { value: "COMMUNITY_SERVICE", label: "Community Service", icon: Users },
    { value: "COMPETITION", label: "Competition", icon: Trophy }
  ]

  const proficiencyLevels = [
    { value: "BEGINNER", label: "Beginner", progress: 25 },
    { value: "INTERMEDIATE", label: "Intermediate", progress: 50 },
    { value: "ADVANCED", label: "Advanced", progress: 75 },
    { value: "EXPERT", label: "Expert", progress: 100 }
  ]

  const achievementLevels = [
    { value: "INSTITUTIONAL", label: "Institutional" },
    { value: "LOCAL", label: "Local" },
    { value: "STATE", label: "State" },
    { value: "NATIONAL", label: "National" },
    { value: "INTERNATIONAL", label: "International" }
  ]

  // Skill submission
  const onSubmitSkill = async (data: SkillFormData) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newSkill: Skill = {
        id: Date.now().toString(),
        ...data,
        proficiency: data.proficiency as Skill['proficiency'],
        acquiredDate: new Date().toISOString()
      }

      setSkills(prev => [newSkill, ...prev])
      skillForm.reset()
      setIsSkillDialogOpen(false)
      alert('Skill added successfully!')
    } catch {
      alert('Error adding skill. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Achievement submission
  const onSubmitAchievement = async (data: AchievementFormData) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newAchievement: Achievement = {
        id: Date.now().toString(),
        ...data,
        verificationStatus: "PENDING"
      }

      setAchievements(prev => [newAchievement, ...prev])
      achievementForm.reset()
      setIsAchievementDialogOpen(false)
      alert('Achievement added successfully!')
    } catch {
      alert('Error adding achievement. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getSkillCategoryIcon = (category: string) => {
    const found = skillCategories.find(c => c.value === category)
    return found ? found.icon : Star
  }

  const getAchievementCategoryIcon = (category: string) => {
    const found = achievementCategories.find(c => c.value === category)
    return found ? found.icon : Award
  }

  const getProficiencyColor = (proficiency: string) => {
    const colors = {
      BEGINNER: "text-red-600 bg-red-100",
      INTERMEDIATE: "text-yellow-600 bg-yellow-100", 
      ADVANCED: "text-blue-600 bg-blue-100",
      EXPERT: "text-green-600 bg-green-100"
    }
    return colors[proficiency as keyof typeof colors] || "text-gray-600 bg-gray-100"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Skills & Achievements</h1>
        <p className="text-gray-600 mt-1">Track your skills development and showcase your achievements</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Skills</p>
                <p className="text-3xl font-bold text-gray-900">{skills.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              2 skills added this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-3xl font-bold text-gray-900">{achievements.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600">
              <CheckCircle className="inline h-4 w-4 mr-1" />
              1 verified this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expert Skills</p>
                <p className="text-3xl font-bold text-gray-900">
                  {skills.filter(s => s.proficiency === 'EXPERT').length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-purple-600">
              <Target className="inline h-4 w-4 mr-1" />
              Keep developing skills
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Skills and Achievements */}
      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="skills">Skills Portfolio</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Skills Portfolio</h2>
            
            <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Skill</DialogTitle>
                  <DialogDescription>
                    Add a skill to your portfolio and track your proficiency level
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={skillForm.handleSubmit(onSubmitSkill)} className="space-y-4">
                  <div>
                    <Label htmlFor="skillName">Skill Name *</Label>
                    <Input
                      id="skillName"
                      {...skillForm.register("name")}
                      placeholder="e.g., JavaScript, Public Speaking"
                      className={skillForm.formState.errors.name ? "border-red-500" : ""}
                    />
                    {skillForm.formState.errors.name && (
                      <p className="text-sm text-red-500 mt-1">{skillForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="skillCategory">Category *</Label>
                    <Select onValueChange={(value: string) => skillForm.setValue("category", value)}>
                      <SelectTrigger className={skillForm.formState.errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillCategories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {skillForm.formState.errors.category && (
                      <p className="text-sm text-red-500 mt-1">{skillForm.formState.errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="skillProficiency">Proficiency Level *</Label>
                    <Select onValueChange={(value: string) => skillForm.setValue("proficiency", value)}>
                      <SelectTrigger className={skillForm.formState.errors.proficiency ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {skillForm.formState.errors.proficiency && (
                      <p className="text-sm text-red-500 mt-1">{skillForm.formState.errors.proficiency.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="skillDescription">Description</Label>
                    <Input
                      id="skillDescription"
                      {...skillForm.register("description")}
                      placeholder="How did you acquire this skill?"
                    />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsSkillDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Skill"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map(skill => {
              const SkillIcon = getSkillCategoryIcon(skill.category)
              const proficiencyLevel = proficiencyLevels.find(p => p.value === skill.proficiency)
              
              return (
                <Card key={skill.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <SkillIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                          <p className="text-sm text-gray-500">{skill.category.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
                        {skill.proficiency}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Proficiency</span>
                        <span>{proficiencyLevel?.progress}%</span>
                      </div>
                      <Progress value={proficiencyLevel?.progress || 0} className="h-2" />
                    </div>

                    {skill.description && (
                      <p className="text-sm text-gray-600 mt-3">{skill.description}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
            
            <Dialog open={isAchievementDialogOpen} onOpenChange={setIsAchievementDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Achievement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Achievement</DialogTitle>
                  <DialogDescription>
                    Record a new achievement or recognition you&apos;ve received
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={achievementForm.handleSubmit(onSubmitAchievement)} className="space-y-4">
                  <div>
                    <Label htmlFor="achievementTitle">Title *</Label>
                    <Input
                      id="achievementTitle"
                      {...achievementForm.register("title")}
                      placeholder="e.g., First Place in Hackathon"
                      className={achievementForm.formState.errors.title ? "border-red-500" : ""}
                    />
                    {achievementForm.formState.errors.title && (
                      <p className="text-sm text-red-500 mt-1">{achievementForm.formState.errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="achievementDescription">Description *</Label>
                    <Input
                      id="achievementDescription"
                      {...achievementForm.register("description")}
                      placeholder="Describe your achievement in detail"
                      className={achievementForm.formState.errors.description ? "border-red-500" : ""}
                    />
                    {achievementForm.formState.errors.description && (
                      <p className="text-sm text-red-500 mt-1">{achievementForm.formState.errors.description.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="achievementCategory">Category *</Label>
                      <Select onValueChange={(value: string) => achievementForm.setValue("category", value)}>
                        <SelectTrigger className={achievementForm.formState.errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {achievementCategories.map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="achievementLevel">Level *</Label>
                      <Select onValueChange={(value: string) => achievementForm.setValue("level", value)}>
                        <SelectTrigger className={achievementForm.formState.errors.level ? "border-red-500" : ""}>
                          <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                          {achievementLevels.map(level => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="achievementDate">Achievement Date *</Label>
                    <Input
                      id="achievementDate"
                      type="date"
                      {...achievementForm.register("achievementDate")}
                      className={achievementForm.formState.errors.achievementDate ? "border-red-500" : ""}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        {...achievementForm.register("organization")}
                        placeholder="e.g., ABC College"
                      />
                    </div>

                    <div>
                      <Label htmlFor="position">Position/Rank</Label>
                      <Input
                        id="position"
                        {...achievementForm.register("position")}
                        placeholder="e.g., 1st Place"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAchievementDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Achievement"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Achievements List */}
          <div className="space-y-4">
            {achievements.map(achievement => {
              const AchievementIcon = getAchievementCategoryIcon(achievement.category)
              
              return (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                          <AchievementIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                            {achievement.position && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {achievement.position}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{achievement.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{achievement.organization}</span>
                            <span>•</span>
                            <span>{new Date(achievement.achievementDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{achievement.level.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {achievement.verificationStatus === 'VERIFIED' ? (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-yellow-600">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
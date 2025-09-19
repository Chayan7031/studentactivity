"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  GraduationCap,
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Simplified schemas
const experienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  type: z.string().min(1, "Type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  compensation: z.string().optional(),
})

type ExperienceFormData = z.infer<typeof experienceSchema>

interface Experience {
  id: string
  company: string
  position: string
  type: "JOB" | "INTERNSHIP"
  startDate: string
  endDate?: string
  description?: string
  location?: string
  compensation?: string
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED"
  technologies: string[]
}

export default function JobsPage() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      company: "TechCorp Solutions",
      position: "Frontend Developer",
      type: "JOB",
      startDate: "2024-01-15",
      description: "Working on building modern web applications using React and TypeScript",
      location: "San Francisco, CA",
      compensation: "$75,000/year",
      verificationStatus: "VERIFIED",
      technologies: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
      id: "2",
      company: "Google",
      position: "Software Engineering Intern",
      type: "INTERNSHIP",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      description: "Summer internship working on Google Search infrastructure",
      location: "Mountain View, CA",
      compensation: "$8,000/month",
      verificationStatus: "VERIFIED",
      technologies: ["Python", "Java", "TensorFlow"]
    },
    {
      id: "3",
      company: "Microsoft",
      position: "UX Design Intern",
      type: "INTERNSHIP",
      startDate: "2023-01-15",
      endDate: "2023-04-15",
      description: "Worked on improving user experience for Microsoft Office products",
      location: "Seattle, WA",
      compensation: "$7,500/month",
      verificationStatus: "PENDING",
      technologies: ["Figma", "React", "CSS"]
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema)
  })

  const onSubmit = async (data: ExperienceFormData) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newExperience: Experience = {
        id: Date.now().toString(),
        ...data,
        type: data.type as Experience['type'],
        verificationStatus: "PENDING",
        technologies: []
      }

      setExperiences(prev => [newExperience, ...prev])
      form.reset()
      setIsDialogOpen(false)
      alert('Experience added successfully!')
    } catch {
      alert('Error adding experience. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const months = Math.floor(diffDays / 30)
    return months > 0 ? `${months} month${months > 1 ? 's' : ''}` : `${diffDays} days`
  }

  const jobs = experiences.filter(exp => exp.type === 'JOB')
  const internships = experiences.filter(exp => exp.type === 'INTERNSHIP')

  // Timeline Component
  const TimelineView = () => (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        
        {experiences.map((experience) => (
          <div key={experience.id} className="relative flex items-start space-x-6 pb-8">
            <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
              experience.type === 'JOB' ? 'bg-blue-100' : 'bg-green-100'
            }`}>
              {experience.type === 'JOB' ? (
                <Briefcase className="h-8 w-8 text-blue-600" />
              ) : (
                <GraduationCap className="h-8 w-8 text-green-600" />
              )}
            </div>
            
            <Card className="flex-1 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{experience.position}</CardTitle>
                    <CardDescription className="text-base font-medium text-gray-900 mt-1">
                      {experience.company}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      experience.type === 'JOB' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {experience.type === 'JOB' ? 'Job' : 'Internship'}
                    </span>
                    {experience.verificationStatus === 'VERIFIED' && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(experience.startDate)} - {
                        experience.endDate ? formatDate(experience.endDate) : 'Present'
                      }
                    </span>
                  </div>
                  <span>•</span>
                  <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
                  {experience.location && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    </>
                  )}
                </div>

                {experience.description && (
                  <p className="text-gray-700">{experience.description}</p>
                )}

                {experience.technologies.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {experience.compensation && (
                  <div className="flex items-center space-x-1 text-sm text-green-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{experience.compensation}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Jobs & Internships</h1>
        <p className="text-gray-600 mt-1">Track your professional experience and career journey</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Internships</p>
                <p className="text-3xl font-bold text-gray-900">{internships.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Experience</p>
                <p className="text-3xl font-bold text-gray-900">{experiences.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-3xl font-bold text-gray-900">
                  {experiences.filter(exp => exp.verificationStatus === 'VERIFIED').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="timeline" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({jobs.length})</TabsTrigger>
            <TabsTrigger value="internships">Internships ({internships.length})</TabsTrigger>
          </TabsList>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Work Experience</DialogTitle>
                <DialogDescription>
                  Add details about your job or internship experience
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      {...form.register("company")}
                      placeholder="e.g., Google, Microsoft"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      {...form.register("position")}
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select onValueChange={(value: string) => form.setValue("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JOB">Job</SelectItem>
                        <SelectItem value="INTERNSHIP">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...form.register("startDate")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      {...form.register("endDate")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      {...form.register("location")}
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="compensation">Compensation</Label>
                    <Input
                      id="compensation"
                      {...form.register("compensation")}
                      placeholder="e.g., $75,000/year"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    placeholder="Brief description of your role and responsibilities"
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Experience"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Timeline View */}
        <TabsContent value="timeline">
          <TimelineView />
        </TabsContent>

        {/* Jobs View */}
        <TabsContent value="jobs">
          <div className="grid grid-cols-1 gap-6">
            {jobs.map(job => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{job.position}</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-900 mt-1">
                        {job.company}
                      </CardDescription>
                    </div>
                    {job.verificationStatus === 'VERIFIED' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
                    </span>
                    {job.location && (
                      <>
                        <span>•</span>
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </>
                    )}
                  </div>
                  {job.description && <p className="text-gray-700">{job.description}</p>}
                  {job.compensation && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.compensation}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Internships View */}
        <TabsContent value="internships">
          <div className="grid grid-cols-1 gap-6">
            {internships.map(internship => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{internship.position}</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-900 mt-1">
                        {internship.company}
                      </CardDescription>
                    </div>
                    {internship.verificationStatus === 'VERIFIED' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(internship.startDate)} - {
                        internship.endDate ? formatDate(internship.endDate) : 'Present'
                      }
                    </span>
                    {internship.location && (
                      <>
                        <span>•</span>
                        <MapPin className="h-4 w-4" />
                        <span>{internship.location}</span>
                      </>
                    )}
                  </div>
                  {internship.description && <p className="text-gray-700">{internship.description}</p>}
                  {internship.compensation && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{internship.compensation}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
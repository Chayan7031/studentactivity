"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Camera,
  Save,
  Edit,
  MapPin,
  Calendar,
  GraduationCap,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  X
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Profile form schema
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  rollNumber: z.string().min(1, "Roll number is required"),
  department: z.string().min(1, "Department is required"),
  course: z.string().min(1, "Course is required"),
  year: z.string().min(1, "Year is required"),
  semester: z.string().min(1, "Semester is required"),
  batch: z.string().min(1, "Batch is required"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  bloodGroup: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  currentGPA: z.string().optional(),
  overallGPA: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface StudentProfile {
  id: string
  firstName: string
  lastName: string
  rollNumber: string
  department: string
  course: string
  year: number
  semester: number
  batch: string
  dateOfBirth?: string
  gender?: string
  bloodGroup?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  currentGPA?: number
  overallGPA?: number
  profilePhoto?: string
  profileCompleted: boolean
}

export default function StudentProfilePage() {
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileCompletion, setProfileCompletion] = useState(35)
  const [profile, setProfile] = useState<StudentProfile>({
    id: "1",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    rollNumber: "",
    department: "",
    course: "",
    year: 1,
    semester: 1,
    batch: "",
    profileCompleted: false
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      rollNumber: profile.rollNumber,
      department: profile.department,
      course: profile.course,
      year: profile.year.toString(),
      semester: profile.semester.toString(),
      batch: profile.batch,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      bloodGroup: profile.bloodGroup,
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      pincode: profile.pincode,
      currentGPA: profile.currentGPA?.toString(),
      overallGPA: profile.overallGPA?.toString(),
    }
  })

  // Watch form values for dynamic updates
  const watchedValues = watch()

  // Calculate profile completion dynamically
  useEffect(() => {
    const requiredFields = [
      watchedValues.firstName,
      watchedValues.lastName,
      watchedValues.rollNumber,
      watchedValues.department,
      watchedValues.course,
      watchedValues.year,
      watchedValues.semester,
      watchedValues.batch
    ]
    
    const optionalFields = [
      watchedValues.dateOfBirth,
      watchedValues.gender,
      watchedValues.bloodGroup,
      watchedValues.phone,
      watchedValues.address,
      watchedValues.city,
      watchedValues.state,
      watchedValues.pincode,
      watchedValues.currentGPA,
      watchedValues.overallGPA
    ]

    const requiredCompleted = requiredFields.filter(field => field && field.length > 0).length
    const optionalCompleted = optionalFields.filter(field => field && field.length > 0).length
    
    // Required fields are 70% weight, optional are 30%
    const completion = Math.round(
      (requiredCompleted / requiredFields.length) * 70 + 
      (optionalCompleted / optionalFields.length) * 30
    )
    
    setProfileCompletion(completion)
  }, [watchedValues])

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update profile state dynamically
      setProfile(prev => ({
        ...prev,
        ...data,
        year: parseInt(data.year),
        semester: parseInt(data.semester),
        currentGPA: data.currentGPA ? parseFloat(data.currentGPA) : undefined,
        overallGPA: data.overallGPA ? parseFloat(data.overallGPA) : undefined,
        profileCompleted: profileCompletion >= 70
      }))
      
      setIsEditing(false)
      // Show success message (you could add a toast here)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error updating profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const departments = [
    "Computer Science", "Information Technology", "Electronics", "Mechanical",
    "Civil", "Electrical", "Chemical", "Biotechnology", "Mathematics", "Physics"
  ]

  const courses = [
    "B.Tech", "B.E.", "M.Tech", "M.E.", "B.Sc", "M.Sc", "BCA", "MCA", "MBA"
  ]

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal and academic information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Completion */}
      <Card className={`border-2 ${
        profileCompletion >= 70 ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'
      }`}>
        <CardHeader>
          <div className="flex items-center space-x-2">
            {profileCompletion >= 70 ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-600" />
            )}
            <CardTitle className={profileCompletion >= 70 ? 'text-green-900' : 'text-orange-900'}>
              Profile Completion: {profileCompletion}%
            </CardTitle>
          </div>
          <CardDescription className={profileCompletion >= 70 ? 'text-green-700' : 'text-orange-700'}>
            {profileCompletion >= 70 
              ? "Great! Your profile is complete and ready for verification."
              : "Complete your profile to unlock all features and improve visibility."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={profileCompletion} className="h-3" />
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Photo Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Profile Photo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {profile.profilePhoto ? (
                    <Image
                      src={profile.profilePhoto}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <Button
                    type="button"
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900\">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-gray-500\">{profile.rollNumber}</p>
                <p className="text-sm text-gray-500\">{profile.department}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  disabled={!isEditing}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  disabled={!isEditing}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select disabled={!isEditing} onValueChange={(value: string) => setValue("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select disabled={!isEditing} onValueChange={(value: string) => setValue("bloodGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  disabled={!isEditing}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Academic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  {...register("rollNumber")}
                  disabled={!isEditing}
                  className={errors.rollNumber ? "border-red-500" : ""}
                />
                {errors.rollNumber && (
                  <p className="text-sm text-red-500 mt-1">{errors.rollNumber.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select disabled={!isEditing} onValueChange={(value: string) => setValue("department", value)}>
                  <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-500 mt-1">{errors.department.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="course">Course *</Label>
                <Select disabled={!isEditing} onValueChange={(value: string) => setValue("course", value)}>
                  <SelectTrigger className={errors.course ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.course && (
                  <p className="text-sm text-red-500 mt-1">{errors.course.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="year">Year *</Label>
                <Select disabled={!isEditing} onValueChange={(value: string) => setValue("year", value)}>
                  <SelectTrigger className={errors.year ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
                {errors.year && (
                  <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="semester">Semester *</Label>
                <Select disabled={!isEditing} onValueChange={(value: string) => setValue("semester", value)}>
                  <SelectTrigger className={errors.semester ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <SelectItem key={sem} value={sem.toString()}>{sem}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.semester && (
                  <p className="text-sm text-red-500 mt-1">{errors.semester.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="batch">Batch *</Label>
                <Input
                  id="batch"
                  {...register("batch")}
                  disabled={!isEditing}
                  placeholder="e.g., 2021-2025"
                  className={errors.batch ? "border-red-500" : ""}
                />
                {errors.batch && (
                  <p className="text-sm text-red-500 mt-1">{errors.batch.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="currentGPA">Current GPA</Label>
                <Input
                  id="currentGPA"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  {...register("currentGPA")}
                  disabled={!isEditing}
                  placeholder="e.g., 8.5"
                />
              </div>
              <div>
                <Label htmlFor="overallGPA">Overall GPA</Label>
                <Input
                  id="overallGPA"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  {...register("overallGPA")}
                  disabled={!isEditing}
                  placeholder="e.g., 8.2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Address Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address")}
                  disabled={!isEditing}
                  placeholder="Enter your full address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    disabled={!isEditing}
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    {...register("state")}
                    disabled={!isEditing}
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    {...register("pincode")}
                    disabled={!isEditing}
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !isDirty}>
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
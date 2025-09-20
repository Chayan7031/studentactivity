"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  FileText,
  Upload,
  Eye,
  Download,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Loader2,
  Edit,
  Trash2
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Certificate form schema
const certificateSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  issuer: z.string().min(2, "Issuer organization is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
})

type CertificateFormData = z.infer<typeof certificateSchema>

interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  description?: string
  category: string
  filePath: string
  fileType: string
  fileSize: number
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED" | "UNDER_REVIEW"
  rejectionReason?: string
  createdAt: string
  verifier?: {
    user: {
      firstName: string
      lastName: string
    }
  }
  verifiedAt?: string
}

export default function CertificatesPage() {
  const { toast } = useToast()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch certificates on component mount
  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/student/certificates')
      if (response.ok) {
        const data = await response.json()
        setCertificates(data)
      } else {
        throw new Error('Failed to fetch certificates')
      }
    } catch (error) {
      console.error('Error fetching certificates:', error)
      toast({
        title: "Error",
        description: "Failed to load certificates. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema)
  })

  const categories = [
    { value: "TECHNICAL", label: "Technical" },
    { value: "SOFT_SKILLS", label: "Soft Skills" },
    { value: "LANGUAGE", label: "Language" },
    { value: "PROFESSIONAL", label: "Professional" },
    { value: "ACADEMIC", label: "Academic" },
    { value: "WORKSHOP", label: "Workshop" },
    { value: "CONFERENCE", label: "Conference" },
    { value: "COMPETITION", label: "Competition" },
    { value: "OTHER", label: "Other" }
  ]

  const statusColors = {
    PENDING: "text-yellow-600 bg-yellow-100",
    VERIFIED: "text-green-600 bg-green-100", 
    REJECTED: "text-red-600 bg-red-100",
    UNDER_REVIEW: "text-blue-600 bg-blue-100"
  }

  const statusIcons = {
    PENDING: Clock,
    VERIFIED: CheckCircle,
    REJECTED: XCircle,
    UNDER_REVIEW: AlertTriangle
  }

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = selectedCategory === "all" || cert.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || cert.verificationStatus === selectedStatus
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (!allowedTypes.includes(file.type)) {
        alert('Please select a PDF, JPEG, or PNG file')
        return
      }

      if (file.size > maxSize) {
        alert('File size must be less than 10MB')
        return
      }

      setSelectedFile(file)
    }
  }

  const onSubmit = async (data: CertificateFormData) => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      })
      return
    }

    setIsUploading(true)
    try {
      // First upload the file
      const fileFormData = new FormData()
      fileFormData.append('file', selectedFile)
      fileFormData.append('title', data.title)
      
      const uploadResponse = await fetch('/api/upload/certificate', {
        method: 'POST',
        body: fileFormData
      })
      
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json()
        throw new Error(errorData.error || 'File upload failed')
      }
      
      const uploadResult = await uploadResponse.json()
      
      // Then create the certificate record
      const certificateData = {
        ...data,
        filePath: uploadResult.filePath,
        fileType: uploadResult.fileType,
        fileSize: uploadResult.fileSize
      }
      
      const createResponse = await fetch('/api/student/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(certificateData)
      })
      
      if (!createResponse.ok) {
        const errorData = await createResponse.json()
        throw new Error(errorData.error || 'Failed to create certificate')
      }
      
      // Refresh certificates list
      await fetchCertificates()
      
      // Reset form and close dialog
      reset()
      setSelectedFile(null)
      setIsUploadDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Certificate uploaded successfully! It's now pending verification."
      })
    } catch (error: any) {
      console.error('Upload error:', error)
      toast({
        title: "Error",
        description: error.message || "Error uploading certificate. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteCertificate = async (certificateId: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) {
      return
    }
    
    setDeletingId(certificateId)
    try {
      const response = await fetch(`/api/student/certificates/${certificateId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete certificate')
      }
      
      // Remove from local state
      setCertificates(prev => prev.filter(cert => cert.id !== certificateId))
      
      toast({
        title: "Success",
        description: "Certificate deleted successfully"
      })
    } catch (error: any) {
      console.error('Delete error:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete certificate",
        variant: "destructive"
      })
    } finally {
      setDeletingId(null)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600 mt-1">Upload and manage your certificates and achievements</p>
        </div>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Certificate</DialogTitle>
              <DialogDescription>
                Add a new certificate or achievement to your profile
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* File Upload */}
              <div>
                <Label>Certificate File *</Label>
                <div className="mt-2">
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {selectedFile ? (
                      <div className="space-y-2">
                        <FileText className="mx-auto h-8 w-8 text-blue-600" />
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to upload certificate</p>
                        <p className="text-xs text-gray-500">PDF, JPEG, PNG up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Certificate Title *</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="e.g., AWS Cloud Practitioner"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="issuer">Issuing Organization *</Label>
                  <Input
                    id="issuer"
                    {...register("issuer")}
                    placeholder="e.g., Amazon Web Services"
                    className={errors.issuer ? "border-red-500" : ""}
                  />
                  {errors.issuer && (
                    <p className="text-sm text-red-500 mt-1">{errors.issuer.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value: string) => setValue("category", value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issueDate">Issue Date *</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      {...register("issueDate")}
                      className={errors.issueDate ? "border-red-500" : ""}
                    />
                    {errors.issueDate && (
                      <p className="text-sm text-red-500 mt-1">{errors.issueDate.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      {...register("expiryDate")}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="credentialId">Credential ID</Label>
                  <Input
                    id="credentialId"
                    {...register("credentialId")}
                    placeholder="e.g., AWS-CP-123456"
                  />
                </div>

                <div>
                  <Label htmlFor="credentialUrl">Verification URL</Label>
                  <Input
                    id="credentialUrl"
                    {...register("credentialUrl")}
                    placeholder="https://verify.example.com/123456"
                    className={errors.credentialUrl ? "border-red-500" : ""}
                  />
                  {errors.credentialUrl && (
                    <p className="text-sm text-red-500 mt-1">{errors.credentialUrl.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    {...register("description")}
                    placeholder="Brief description of the certificate"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Certificates Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map(certificate => {
            const StatusIcon = statusIcons[certificate.verificationStatus]
            return (
              <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{certificate.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-1">
                      {certificate.issuer}
                    </CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusColors[certificate.verificationStatus]}`}>
                    <StatusIcon className="h-3 w-3" />
                    {certificate.verificationStatus.replace('_', ' ')}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Issued: {formatDate(certificate.issueDate)}</span>
                  <span>{formatFileSize(certificate.fileSize)}</span>
                </div>
                
                {certificate.verifiedAt && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Verified: {formatDate(certificate.verifiedAt)}
                    {certificate.verifier && (
                      <span className="ml-2">by {certificate.verifier.user.firstName} {certificate.verifier.user.lastName}</span>
                    )}
                  </div>
                )}

                {certificate.credentialId && (
                  <div className="text-sm">
                    <span className="text-gray-600">ID: </span>
                    <span className="font-mono text-gray-900">{certificate.credentialId}</span>
                  </div>
                )}

                {certificate.verificationStatus === 'REJECTED' && certificate.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">{certificate.rejectionReason}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(certificate.filePath, '_blank')}
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = certificate.filePath
                      link.download = certificate.title
                      link.click()
                    }}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                  {certificate.verificationStatus !== 'VERIFIED' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteCertificate(certificate.id)}
                      disabled={deletingId === certificate.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {deletingId === certificate.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            )
          })}
        </div>
      )}

      {!loading && filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                ? "Try adjusting your filters or search terms"
                : "Upload your first certificate to get started"}
            </p>
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Upload Certificate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
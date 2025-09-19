"use client"

import { ReactNode } from "react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  User,
  FileText,
  Award,
  Briefcase,
  Brain,
  Download,
  Settings,
  Menu,
  X,
  Shield
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: ReactNode
}

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User
  },
  {
    title: "Certificates",
    href: "/dashboard/certificates",
    icon: FileText
  },
  {
    title: "Skills & Achievements",
    href: "/dashboard/achievements",
    icon: Award
  },
  {
    title: "Jobs & Internships",
    href: "/dashboard/jobs",
    icon: Briefcase
  },
  {
    title: "AI Assistant",
    href: "/dashboard/ai-assistant",
    icon: Brain
  },
  {
    title: "E-Portfolio",
    href: "/dashboard/portfolio",
    icon: Download
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  }
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Student Portal</h2>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Admin Access Button - Show for admin users */}
              <Link href="/admin">
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Button>
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
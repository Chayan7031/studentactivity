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
import { ThemeToggle } from "@/components/ui/theme-toggle"

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
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col lg:relative lg:transform-none lg:shadow-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b bg-card">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary rounded-lg">
              <Home className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Student Portal</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )} />
                <span className="truncate">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t bg-muted/50">
          <div className="text-xs text-muted-foreground text-center">
            Student Activity Record Portal
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navigation bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-x-2 sm:gap-x-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 sm:px-4 lg:px-8">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          {/* Breadcrumb or page title - mobile friendly */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-foreground truncate sm:text-xl">
              {sidebarItems.find(item => item.href === pathname)?.title || "Dashboard"}
            </h1>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* Admin panel link - responsive visibility */}
            <Link href="/admin" className="hidden sm:block">
              <Button variant="outline" size="sm" className="gap-1 sm:gap-2 px-2 sm:px-3">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden lg:inline text-xs sm:text-sm">Admin Panel</span>
              </Button>
            </Link>
            
            {/* User menu */}
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-7 w-7 sm:h-8 sm:w-8 ring-2 ring-border hover:ring-primary transition-all"
                }
              }}
            />
          </div>
        </header>
        
        {/* Page content with improved responsive padding */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
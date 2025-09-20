"use client";

import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  BarChart3,
  Settings,
  Shield,
  Menu,
  X,
  AlertTriangle,
  Activity
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface AdminLayoutProps {
  children: ReactNode;
}

const adminSidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users
  },
  {
    title: "Verifications",
    href: "/admin/verifications",
    icon: FileCheck
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: Settings
  }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Simple role check - in real implementation, this would check actual user roles
  const isAdmin = true; // This should be replaced with actual role checking

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Access Denied</h2>
                <p className="text-sm text-muted-foreground">
                  You don&apos;t have permission to access the admin panel.
                </p>
              </div>
              <Link href="/dashboard">
                <Button>Return to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Admin Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 dark:bg-slate-950 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col lg:relative lg:transform-none lg:shadow-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-slate-800 h-8 w-8"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {adminSidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-white" : "text-slate-400"
                )} />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats in Sidebar - Mobile responsive */}
        <div className="p-3 m-3 bg-slate-800 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <Activity className="h-3 w-3" />
            <span>Quick Stats</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300">Pending:</span>
              <span className="text-orange-400 font-medium">89</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300">Active Users:</span>
              <span className="text-green-400 font-medium">1,923</span>
            </div>
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
          
          {/* Admin mode indicator */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Administrator Mode</span>
                <span className="sm:hidden">Admin</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-border" />
              <h1 className="hidden md:block text-lg font-semibold text-foreground truncate">
                {adminSidebarItems.find(item => item.href === pathname)?.title || "Dashboard"}
              </h1>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* Switch to student view */}
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-1 sm:gap-2 px-2 sm:px-3">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden md:inline text-xs sm:text-sm">Student View</span>
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
  );
}
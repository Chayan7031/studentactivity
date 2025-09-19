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
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Admin Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-slate-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {adminSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Stats in Sidebar */}
        <div className="absolute bottom-4 left-3 right-3">
          <div className="bg-slate-800 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-2">Quick Stats</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Pending:</span>
                <span className="text-orange-400 font-medium">89</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Active Users:</span>
                <span className="text-green-400 font-medium">1,923</span>
              </div>
            </div>
          </div>
        </div>
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
            <div className="flex flex-1 items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Administrator Mode</span>
              </div>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Switch to Student View
                  </Button>
                </Link>
              </div>
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
          {children}
        </main>
      </div>
    </div>
  );
}
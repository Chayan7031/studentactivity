"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  UserCheck, 
  UserX, 
  Mail, 
  Calendar,
  MoreHorizontal,
  Shield,
  Edit,
  Trash2
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "moderator";
  status: "active" | "inactive" | "suspended";
  joinDate: Date;
  lastLogin: Date;
  institution: string;
  verified: boolean;
}

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock user data
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@university.edu",
      role: "student",
      status: "active",
      joinDate: new Date("2024-01-15"),
      lastLogin: new Date("2024-06-18"),
      institution: "Tech University",
      verified: true
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.admin@platform.com",
      role: "admin",
      status: "active",
      joinDate: new Date("2023-11-20"),
      lastLogin: new Date("2024-06-19"),
      institution: "Platform Admin",
      verified: true
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "m.chen@institute.edu",
      role: "student",
      status: "inactive",
      joinDate: new Date("2024-03-10"),
      lastLogin: new Date("2024-05-22"),
      institution: "Engineering Institute",
      verified: false
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.mod@platform.com",
      role: "moderator",
      status: "active",
      joinDate: new Date("2024-02-05"),
      lastLogin: new Date("2024-06-19"),
      institution: "Platform Staff",
      verified: true
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "r.wilson@college.edu",
      role: "student",
      status: "suspended",
      joinDate: new Date("2024-04-12"),
      lastLogin: new Date("2024-06-10"),
      institution: "State College",
      verified: true
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "moderator": return "bg-purple-100 text-purple-800";
      case "student": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    admins: users.filter(u => u.role === "admin").length,
    verified: users.filter(u => u.verified).length
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        <p className="text-muted-foreground">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{userStats.admins}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{userStats.verified}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Search and filter platform users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or institution..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="admin">Administrators</option>
              <option value="moderator">Moderators</option>
            </select>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        {user.verified && (
                          <UserCheck className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div>{user.institution}</div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined {user.joinDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right space-y-1">
                      <div className="flex gap-2">
                        <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                          {user.role}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last login: {user.lastLogin.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
          <CardDescription>Perform actions on multiple users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Send Notification
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <UserX className="h-4 w-4" />
              Suspend Users
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Verify Users
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bus,
  Users,
  MapPin,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  LogOut,
  Shield,
  Bell,
  BarChart3,
  Route,
  UserCheck,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Download,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalBuses: number;
  activeBuses: number;
  totalRoutes: number;
  dailyTrips: number;
  systemHealth: "excellent" | "good" | "warning" | "critical";
  alerts: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  joinDate: Date;
  status: "active" | "pending" | "suspended";
  tripCount: number;
}

interface SystemAlert {
  id: string;
  type: "info" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [stats] = useState<DashboardStats>({
    totalUsers: 12458,
    activeUsers: 8234,
    totalBuses: 2156,
    activeBuses: 1987,
    totalRoutes: 347,
    dailyTrips: 45678,
    systemHealth: "good",
    alerts: 3,
  });

  const [recentUsers] = useState<RecentUser[]>([
    {
      id: "u1",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      joinDate: new Date("2024-12-14"),
      status: "active",
      tripCount: 25,
    },
    {
      id: "u2",
      name: "Priya Sharma",
      email: "priya@example.com",
      joinDate: new Date("2024-12-13"),
      status: "pending",
      tripCount: 0,
    },
    {
      id: "u3",
      name: "Amit Singh",
      email: "amit@example.com",
      joinDate: new Date("2024-12-12"),
      status: "active",
      tripCount: 42,
    },
    {
      id: "u4",
      name: "Neha Gupta",
      email: "neha@example.com",
      joinDate: new Date("2024-12-11"),
      status: "active",
      tripCount: 18,
    },
    {
      id: "u5",
      name: "Suresh Patel",
      email: "suresh@example.com",
      joinDate: new Date("2024-12-10"),
      status: "suspended",
      tripCount: 156,
    },
  ]);

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: "a1",
      type: "warning",
      title: "High CPU Usage",
      message: "Server CPU usage is at 85%. Consider optimizing queries.",
      timestamp: new Date("2024-12-15T10:30:00"),
      resolved: false,
    },
    {
      id: "a2",
      type: "error",
      title: "Payment Gateway Down",
      message: "Primary payment gateway is experiencing issues.",
      timestamp: new Date("2024-12-15T09:15:00"),
      resolved: false,
    },
    {
      id: "a3",
      type: "info",
      title: "Scheduled Maintenance",
      message: "Database maintenance scheduled for tonight at 2 AM.",
      timestamp: new Date("2024-12-15T08:00:00"),
      resolved: true,
    },
  ]);

  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }
    setIsAuthenticated(true);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRememberMe");
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage Bus नियोजक system</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button variant="outline" asChild>
              <Link to="/admin/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* System Health Alert */}
        {stats.systemHealth === "warning" && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              System is running with {stats.alerts} active alerts. Please review system status.
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">{stats.activeUsers.toLocaleString()} active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Bus className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Buses</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBuses.toLocaleString()}</p>
                  <p className="text-xs text-green-600">{stats.activeBuses.toLocaleString()} active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Route className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Routes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRoutes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Daily Trips</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.dailyTrips.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="buses">Buses</TabsTrigger>
                <TabsTrigger value="routes">Routes</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Users</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/admin/users">
                            <Eye className="h-4 w-4 mr-2" />
                            View All
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to="/admin/users/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Add User
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{user.name}</h4>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getStatusColor(user.status)}>
                                  {user.status}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {user.tripCount} trips
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="buses" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Bus Management</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/admin/buses">
                            <Eye className="h-4 w-4 mr-2" />
                            View All
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to="/admin/buses/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bus
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Bus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bus Fleet Management</h3>
                      <p className="text-gray-600 mb-4">Manage bus fleet, routes, and schedules</p>
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" asChild>
                          <Link to="/admin/buses">Manage Buses</Link>
                        </Button>
                        <Button asChild>
                          <Link to="/admin/routes">Manage Routes</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="routes" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Route Management</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/admin/routes">
                            <Eye className="h-4 w-4 mr-2" />
                            View All
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to="/admin/routes/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Route
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Route Network</h3>
                      <p className="text-gray-600 mb-4">Configure routes, stops, and schedules</p>
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" asChild>
                          <Link to="/admin/routes">View Routes</Link>
                        </Button>
                        <Button asChild>
                          <Link to="/admin/stops">Manage Stops</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Analytics</h3>
                      <p className="text-gray-600 mb-4">View detailed system usage and performance metrics</p>
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" asChild>
                          <Link to="/admin/analytics">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Analytics
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to="/admin/reports">
                            <Download className="h-4 w-4 mr-2" />
                            Download Reports
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" asChild>
                  <Link to="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/buses">
                    <Bus className="h-4 w-4 mr-2" />
                    Manage Buses
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/routes">
                    <Route className="h-4 w-4 mr-2" />
                    Manage Routes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>System Alerts</CardTitle>
                  <Badge variant="destructive">{systemAlerts.filter(a => !a.resolved).length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${
                        alert.resolved 
                          ? "bg-gray-50 border-gray-200" 
                          : alert.type === "error"
                          ? "bg-red-50 border-red-200"
                          : alert.type === "warning"
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {alert.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {alert.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        {alert.resolved && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/admin/alerts">View All Alerts</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

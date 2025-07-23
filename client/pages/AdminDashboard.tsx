import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  const stats = [
    {
      title: "Active Buses",
      value: "24",
      change: "+2 from yesterday",
      icon: Bus,
      color: "text-blue-600",
    },
    {
      title: "Total Routes",
      value: "12",
      change: "No change",
      icon: MapPin,
      color: "text-green-600",
    },
    {
      title: "Crew Members",
      value: "48",
      change: "+3 new this week",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Daily Passengers",
      value: "1,234",
      change: "+5.2% from last week",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "bus",
      message: "Bus 101 completed route successfully",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "alert",
      message: "Bus 205 delayed by 10 minutes",
      time: "15 minutes ago",
      status: "warning",
    },
    {
      id: 3,
      type: "crew",
      message: "New driver assigned to route 3",
      time: "1 hour ago",
      status: "info",
    },
    {
      id: 4,
      type: "maintenance",
      message: "Bus 150 maintenance completed",
      time: "3 hours ago",
      status: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground">
                Manage your bus operations, routes, and crew
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-2 px-1 min-w-5 h-5">
                  3
                </Badge>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Security Alert */}
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <Shield className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Admin Access:</strong> You are logged in as an
            administrator. All actions are logged for security purposes.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <Bus className="h-6 w-6" />
                    <span className="text-sm">Manage Buses</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Crew</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <MapPin className="h-6 w-6" />
                    <span className="text-sm">Routes</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2" variant="outline">
                    <Clock className="h-6 w-6" />
                    <span className="text-sm">Schedules</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bus Status */}
            <Card>
              <CardHeader>
                <CardTitle>Active Buses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      number: "101",
                      route: "Central → Airport",
                      status: "On Time",
                      passengers: "32/50",
                    },
                    {
                      number: "205",
                      route: "Mall → University",
                      status: "Delayed",
                      passengers: "45/45",
                    },
                    {
                      number: "150",
                      route: "Station → Hospital",
                      status: "On Time",
                      passengers: "28/40",
                    },
                  ].map((bus, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 text-primary rounded-lg p-2">
                          <Bus className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Bus {bus.number}</h4>
                          <p className="text-sm text-muted-foreground">
                            {bus.route}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            bus.status === "On Time" ? "default" : "destructive"
                          }
                          className="mb-1"
                        >
                          {bus.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {bus.passengers}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="mt-1">
                        {activity.status === "success" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {activity.status === "warning" && (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                        {activity.status === "info" && (
                          <Settings className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GPS Tracking</span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Status</span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      Operational
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

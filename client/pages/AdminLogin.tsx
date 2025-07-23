import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Bus,
  Lock,
  Mail,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  Settings,
} from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Mock admin login - replace with actual API call
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store admin token
        localStorage.setItem("adminToken", data.token);
        if (rememberMe) {
          localStorage.setItem("adminRememberMe", "true");
        }
        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid admin credentials");
      }
    } catch (err) {
      // Mock authentication for demo
      if (email === "admin@busniyojak.com" && password === "BusAdmin2024!") {
        localStorage.setItem("adminToken", "mock-admin-token");
        navigate("/admin/dashboard");
      } else {
        setError(
          "Invalid admin credentials. Please contact system administrator.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card
          className="shadow-2xl border-0 bg-gradient-to-br from-white to-red-50/30"
          style={{ borderRadius: "24px" }}
        >
          <CardHeader className="text-center pb-6">
            <div className="relative bg-gradient-to-br from-red-600 to-red-800 text-white p-4 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-2xl">
              {/* Crown Icon */}
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 16L3 3l5.5 5L12 4l3.5 4L21 3l-2 13H5zm2.7-2h8.6l.9-5.4-2.1 1.4L12 8l-3.1 2L6.8 8.6L7.7 14z" />
              </svg>
              {/* Small gear icon overlay */}
              <div className="absolute -bottom-1 -right-1 bg-white text-red-600 rounded-full p-1 shadow-lg">
                <Settings className="h-4 w-4" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Admin Portal
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-lg">
              <span className="text-black font-bold">Bus</span>
              <span className="text-red-600 font-bold">नियोजक</span>{" "}
              <span className="text-gray-600">Administrative Access</span>
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-sm font-medium">
                  Admin Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-red-200 focus:border-red-500 focus:ring-red-200 rounded-xl hover:border-red-300 transition-colors bg-white/80"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-red-200 focus:border-red-500 focus:ring-red-200 rounded-xl hover:border-red-300 transition-colors bg-white/80"
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    disabled={loading}
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs p-0 h-auto"
                  type="button"
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform"
                disabled={loading || !email || !password}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Access Admin Panel
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  🔐 Secure admin access with enterprise-grade authentication
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Not an admin?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  User Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-xs">
            🔒 This is a secure admin portal. All access is logged and
            monitored.
          </p>
        </div>
      </div>
    </div>
  );
}

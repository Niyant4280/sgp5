import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  X,
  Bus,
  Search,
  MapPin,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) {
      setIsAdmin(true);
      setIsLoggedIn(true);
      setUser({ name: "Admin", email: "admin@busniyojak.com" });
    } else if (userToken) {
      setIsLoggedIn(true);
      setIsAdmin(false);
      // In a real app, you'd fetch user data from the token
      setUser({ name: "John Doe", email: "john@example.com" });
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRememberMe");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    window.location.href = "/";
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4 flex-1">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
            >
              <div className="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors">
                <Bus className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-black">Bus</span>
                <span className="text-[rgba(220,38,38,1)]">नियोजक</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-2 justify-center">
            <Link
              to="/search"
              className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/search")
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:text-white hover:bg-red-600"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Search Buses</span>
            </Link>
            <Link
              to="/routes"
              className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/routes")
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:text-white hover:bg-red-600"
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>Routes</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:text-white hover:bg-red-600"
              }`}
            >
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:text-white hover:bg-red-600"
              }`}
            >
              <span>Contact</span>
            </Link>
            <Link
              to="/faq"
              className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/faq") || isActive("/help")
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:text-white hover:bg-red-600"
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3 flex-1 justify-end">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  asChild
                >
                  <Link to={isAdmin ? "/admin" : "/dashboard"}>
                    <Settings className="h-4 w-4 mr-2" />
                    {isAdmin ? "Admin Panel" : "Dashboard"}
                  </Link>
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name.split(' ').map(n => n[0]).join('') || "U"}
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                asChild
              >
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/search"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/search")
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:text-red-700 hover:bg-red-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-5 w-5" />
                <span>Search Buses</span>
              </Link>
              <Link
                to="/routes"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/routes")
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:text-red-700 hover:bg-red-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="h-5 w-5" />
                <span>Routes</span>
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-700 hover:bg-red-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-700 hover:bg-red-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/faq") || isActive("/help")
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:text-red-700 hover:bg-red-100"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="h-5 w-5" />
                <span>Help & FAQ</span>
              </Link>
              <div className="border-t border-border pt-2 mt-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to={isAdmin ? "/admin" : "/dashboard"}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-5 w-5" />
                      <span>{isAdmin ? "Admin Panel" : "Dashboard"}</span>
                    </Link>
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user?.name.split(' ').map(n => n[0]).join('') || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full text-left"
                    >
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

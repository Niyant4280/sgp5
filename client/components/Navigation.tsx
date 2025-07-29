import { useState } from "react";
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
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
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
              <div className="bg-red-600 dark:bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors">
                <Bus className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-black dark:text-gray-100">Bus</span>
                <span className="text-red-500 dark:text-red-400">नियोजक</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-2 justify-center">
            <Link
              to="/search"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/search")
                  ? "bg-red-600 dark:bg-red-500 text-white"
                  : "text-gray-700 dark:text-gray-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-500"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Search Buses</span>
            </Link>
            <Link
              to="/routes"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/routes")
                  ? "bg-red-600 dark:bg-red-500 text-white"
                  : "text-gray-700 dark:text-gray-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-500"
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>Routes</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "bg-red-600 dark:bg-red-500 text-white"
                  : "text-gray-700 dark:text-gray-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-500"
              }`}
            >
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "bg-red-600 dark:bg-red-500 text-white"
                  : "text-gray-700 dark:text-gray-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-500"
              }`}
            >
              <span>Contact</span>
            </Link>
            <Link
              to="/faq"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/faq") || isActive("/help")
                  ? "bg-red-600 dark:bg-red-500 text-white"
                  : "text-gray-700 dark:text-gray-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-500"
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>
          </div>

          {/* Theme Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              asChild
            >
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 ml-auto">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          <div className="md:hidden border-t border-border bg-white dark:bg-gray-950">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/search"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/search")
                    ? "bg-red-600 dark:bg-red-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-white hover:bg-red-100 dark:hover:bg-gray-700"
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
                    ? "bg-red-600 dark:bg-red-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-white hover:bg-red-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="h-5 w-5" />
                <span>Routes</span>
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-white hover:bg-red-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-white hover:bg-red-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/faq") || isActive("/help")
                    ? "bg-red-600 dark:bg-red-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-white hover:bg-red-100 dark:hover:bg-gray-700"
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="h-5 w-5" />
                <span>Help & FAQ</span>
              </Link>
              <div className="border-t border-border pt-2 mt-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

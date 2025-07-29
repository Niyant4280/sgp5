import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Bus,
  MapPin,
  Users,
  Shield,
  Zap,
  Search,
  Clock,
  Route,
  Settings,
  BarChart3,
  Globe,
  Database,
  Server,
  Smartphone,
  CheckCircle,
  Target,
  Lightbulb,
  ArrowRight,
  Star,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navigation />
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white dark:from-gray-950 dark:via-red-950/10 dark:to-gray-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-black dark:text-white">Bus</span>
              <span className="text-red-600 dark:text-red-400">नियोजक</span>
            </h1>
            <span className="inline-block text-lg text-gray-700 dark:text-gray-300 font-medium mb-2">
              Empowering DTC with Smart Transit Solutions
            </span>
          </div>

          <div className="space-y-8">
            <Card className="border-l-4 border-blue-500 bg-blue-50/40 dark:bg-blue-900/10">
              <CardContent className="py-6">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="h-7 w-7 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
                    Our Mission
                  </h2>
                </div>
                <div className="flex flex-col gap-2 ml-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-1 text-blue-500" />
                    <span>
                      Automate and optimize bus and crew scheduling for Delhi
                      Transport Corporation (DTC).
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-1 text-blue-500" />
                    <span>
                      Enhance route planning and operational efficiency using
                      advanced technology.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-1 text-blue-500" />
                    <span>
                      Deliver reliable, data-driven public transport for a
                      better city experience.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500 bg-green-50/40 dark:bg-green-900/10">
              <CardContent className="py-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-7 w-7 text-green-600" />
                  <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300">
                    Key Features for Passengers
                  </h2>
                </div>
                <div className="flex flex-col gap-2 ml-2">
                  <div className="flex items-start gap-2">
                    <Zap className="mt-1 text-green-500" />
                    <span>Search for buses by number or stop with ease.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="mt-1 text-green-500" />
                    <span>Access real-time route information and mapping.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="mt-1 text-green-500" />
                    <span>
                      Submit advertisement requests directly through the
                      platform.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-yellow-500 bg-yellow-50/40 dark:bg-yellow-900/10">
              <CardContent className="py-6">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-7 w-7 text-yellow-600" />
                  <h2 className="text-2xl font-semibold text-yellow-700 dark:text-yellow-300">
                    Technology Highlights
                  </h2>
                </div>
                <div className="flex flex-col gap-2 ml-2">
                  <div className="flex items-start gap-2">
                    <Globe className="mt-1 text-yellow-500" />
                    <span>
                      GIS-powered route mapping for accurate and efficient
                      planning.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="mt-1 text-yellow-500" />
                    <span>
                      Modern, web-based platform accessible on any device.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="mt-1 text-yellow-500" />
                    <span>
                      Supports both traditional and innovative scheduling
                      models.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-red-500 bg-red-50/40 dark:bg-red-900/10">
              <CardContent className="py-6">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-7 w-7 text-red-600" />
                  <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300">
                    Why Choose Busनियोजक?
                  </h2>
                </div>
                <div className="flex flex-col gap-2 ml-2">
                  <div className="flex items-start gap-2">
                    <BarChart3 className="mt-1 text-red-500" />
                    <span>
                      Boosts efficiency and reliability for DTC operations.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BarChart3 className="mt-1 text-red-500" />
                    <span>
                      Improves passenger experience with smart, user-friendly
                      tools.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BarChart3 className="mt-1 text-red-500" />
                    <span>
                      Enables data-driven decisions for better public transport
                      management.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-red-600 text-white p-2 rounded-lg">
                  <Bus className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  <span className="text-black dark:text-white">Bus</span>
                  <span className="text-red-600 dark:text-red-400">नियोजक</span>
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Smart transit platform for modern urban transportation
                operations. Built with advanced technology for efficiency and
                reliability.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                  Terms of Service
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/search"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Bus Search
                  </Link>
                </li>
                <li>
                  <Link
                    to="/routes"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Route Planning
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Live Tracking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/advertise-with-us"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Advertisement
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support & Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Help & FAQ
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    System Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              Moving Delhi Forward — One Smart Bus at a Time. Experience
              seamless, data-driven transit with{" "}
              <span className="text-black dark:text-white font-semibold">
                Bus
              </span>
              <span className="text-red-600 dark:text-red-400 font-semibold">
                नियोजक
              </span>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

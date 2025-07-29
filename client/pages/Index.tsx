import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BusSearchForm from "@/components/BusSearchForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Search,
} from "lucide-react";

export default function Index() {
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = (type: "number" | "route", data: any) => {
    // Mock search results - in real app, this would call the API
    if (type === "number") {
      setSearchResults({
        type: "bus",
        busNumber: data.busNumber,
        route: "Central Station → Airport",
        stops: [
          "Central Station",
          "City Mall",
          "University",
          "Hospital",
          "Airport Terminal",
        ],
        nextDeparture: "15 mins",
        frequency: "Every 20 mins",
      });
    } else {
      setSearchResults({
        type: "route",
        buses: [
          {
            number: "101",
            route: "Central → Airport",
            nextDeparture: "5 mins",
            frequency: "Every 15 mins",
          },
          {
            number: "205",
            route: "Mall �� Airport",
            nextDeparture: "12 mins",
            frequency: "Every 25 mins",
          },
        ],
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 pb-7">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
              Welcome to <span className="text-black">Bus</span>
              <span className="text-red-600">नियोजक</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Plan your journey, discover the best routes, and experience
              seamless bus travel—all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-4">
              <Badge className="text-xs sm:text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors px-3 sm:px-4 py-1 sm:py-2 font-semibold">
                <Clock className="h-3 w-3 mr-1" />
                Real-time Tracking
              </Badge>
              <Badge className="text-xs sm:text-sm bg-red-600 text-white hover:bg-red-700 transition-colors px-3 sm:px-4 py-1 sm:py-2 font-semibold">
                <MapPin className="h-3 w-3 mr-1" />
                Route Planning
              </Badge>
              <Badge className="text-xs sm:text-sm bg-green-600 text-white hover:bg-green-700 transition-colors px-3 sm:px-4 py-1 sm:py-2 font-semibold">
                <Shield className="h-3 w-3 mr-1" />
                Secure & Reliable
              </Badge>
            </div>
          </div>

          {/* Search Form */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <BusSearchForm onSearch={handleSearch} />
          </div>

          {/* Search Results */}
          {searchResults && (
            <div className="mb-8 sm:mb-12 lg:mb-16 px-4">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bus className="h-5 w-5 text-primary" />
                    <span>Search Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {searchResults.type === "bus" ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            Bus {searchResults.busNumber}
                          </h3>
                          <p className="text-muted-foreground">
                            {searchResults.route}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Next Departure
                          </p>
                          <p className="font-medium">
                            {searchResults.nextDeparture}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Frequency
                          </p>
                          <p className="font-medium">
                            {searchResults.frequency}
                          </p>
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <Link to="/search">
                          <MapPin className="h-4 w-4 mr-2" />
                          View on Map
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {searchResults.buses.map((bus: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h3 className="font-semibold">Bus {bus.number}</h3>
                            <p className="text-sm text-muted-foreground">
                              {bus.route}
                            </p>
                            <p className="text-sm">
                              Next: {bus.nextDeparture} • {bus.frequency}
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-black dark:text-white">Bus</span>
              <span className="text-red-600 dark:text-red-400">नियोजक</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Smart tools and real-time insights for a smoother, more connected
              bus experience—for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center transition-shadow transform hover:shadow-2xl hover:-translate-y-1 duration-200">
              <CardHeader>
                <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Real-time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track buses in real-time with accurate GPS positioning and
                  live updates on arrival times.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow transform hover:shadow-2xl hover:-translate-y-1 duration-200">
              <CardHeader>
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Bus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Route Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find the best routes between any two stops with multiple bus
                  options and transfer details.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow transform hover:shadow-2xl hover:-translate-y-1 duration-200">
              <CardHeader>
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Community Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Empowering users with helpful resources and working together
                  to improve public transport for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow transform hover:shadow-2xl hover:-translate-y-1 duration-200">
              <CardHeader>
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Smart Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get helpful tips and trends to make your daily commute
                  smoother and more predictable.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow transform hover:shadow-2xl hover:-translate-y-1 duration-200">
              <CardHeader>
                <div className="bg-orange-100 dark:bg-orange-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your data and journeys are protected with the latest security
                  standards and privacy features.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow transform hover:shadow-2xl hover:-translate-y-1 duration-200">
              <CardHeader>
                <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <CardTitle>Instant Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay informed with real-time notifications and quick updates
                  for a hassle-free experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[rgba(220,38,38,1)] text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of users already using&nbsp;
            <span className="font-bold text-white">Bus</span>
            <span className="font-bold text-white">नियोजक</span> for their daily
            transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-lg hover:scale-[1.05] transition-all duration-200 font-semibold border-2 border-red-200 hover:border-red-300"
              asChild
            >
              <Link to="/search">
                <Search className="h-5 w-5 mr-2" />
                <span className="text-[rgba(220,38,38,1)]">
                  Start Searching
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary p-2 rounded-lg">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  <span className="text-black dark:text-white">Bus</span>
                  <span className="text-[rgba(220,38,38,1)]">नियोजक</span>
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your trusted partner for seamless, smart, and reliable bus
                journeys.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Link to="/privacy">Privacy Policy</Link>
                </Button>
                <Button variant="ghost" size="sm">
                  <Link to="/terms">Terms of Service</Link>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
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
                    to="/advertise-with-us"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Advertisement
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Help & FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-foreground transition-colors hover:text-red-600"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>Empowering your journey. Made with care for every commuter.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

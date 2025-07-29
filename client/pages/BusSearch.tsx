import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BusSearchForm from "@/components/BusSearchForm";
import RouteMap from "@/components/RouteMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bus,
  MapPin,
  Clock,
  Users,
  Navigation as NavigationIcon,
  Star,
  AlertCircle,
} from "lucide-react";

interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface BusRoute {
  busNumber: string;
  routeName: string;
  stops: Stop[];
  frequency: string;
  nextDeparture: string;
  isActive: boolean;
  rating: number;
  capacity: number;
  currentPassengers: number;
}

export default function BusSearch() {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<BusRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockRoutes: BusRoute[] = [
    {
      busNumber: "101",
      routeName: "Central Station → Airport Terminal",
      frequency: "Every 15 minutes",
      nextDeparture: "5 minutes",
      isActive: true,
      rating: 4.5,
      capacity: 50,
      currentPassengers: 32,
      stops: [
        {
          id: "1",
          name: "Central Station",
          lat: 28.6448,
          lng: 77.216721,
        },
        {
          id: "2",
          name: "City Mall",
          lat: 28.6304,
          lng: 77.2177,
        },
        {
          id: "3",
          name: "University Campus",
          lat: 28.6236,
          lng: 77.2085,
        },
        {
          id: "4",
          name: "Metro Junction",
          lat: 28.6129,
          lng: 77.2295,
        },
        {
          id: "5",
          name: "Airport Terminal",
          lat: 28.5562,
          lng: 77.1,
        },
      ],
    },
    {
      busNumber: "205",
      routeName: "Mall Circle → Airport via Highway",
      frequency: "Every 20 minutes",
      nextDeparture: "12 minutes",
      isActive: true,
      rating: 4.2,
      capacity: 45,
      currentPassengers: 28,
      stops: [
        {
          id: "6",
          name: "Mall Circle",
          lat: 28.6304,
          lng: 77.2177,
        },
        {
          id: "7",
          name: "Tech Park",
          lat: 28.6189,
          lng: 77.209,
        },
        {
          id: "8",
          name: "Highway Junction",
          lat: 28.592,
          lng: 77.15,
        },
        {
          id: "9",
          name: "Airport Terminal",
          lat: 28.5562,
          lng: 77.1,
        },
      ],
    },
  ];

  const handleSearch = async (type: "number", data: any) => {
    setLoading(true);
    setSearchResults([]);
    setSelectedRoute(null);

    try {
      const apiUrl = `/api/buses/search?busNumber=${encodeURIComponent(data.busNumber)}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
        const routes = result.buses || [];
        setSearchResults(routes);

        // Auto-select first result if available
        if (routes.length > 0) {
          setSelectedRoute(routes[0]);
        }
      } else {
        console.error("Search failed:", result.error);
        // For demo purposes, show mock data if API fails
        const matchingRoutes = mockRoutes.filter(route =>
          route.busNumber.toLowerCase().includes(data.busNumber.toLowerCase())
        );
        setSearchResults(matchingRoutes);
        if (matchingRoutes.length > 0) {
          setSelectedRoute(matchingRoutes[0]);
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      // For demo purposes, show mock data if API fails
      const matchingRoutes = mockRoutes.filter(route =>
        route.busNumber.toLowerCase().includes(data.busNumber.toLowerCase())
      );
      setSearchResults(matchingRoutes);
      if (matchingRoutes.length > 0) {
        setSelectedRoute(matchingRoutes[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Handle initial search from URL params
    const busNumber = searchParams.get("bus");
    if (busNumber) {
      handleSearch("number", { busNumber });
    }
  }, [searchParams]);

  const getOccupancyColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getOccupancyLabel = (percentage: number) => {
    if (percentage < 50) return "Available";
    if (percentage < 80) return "Moderate";
    return "Crowded";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bus Number Search
          </h1>
          <p className="text-muted-foreground">
            Search for specific buses by their number and track their routes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search and Results Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bus className="h-5 w-5 text-primary" />
                  <span>Search Bus by Number</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const busNumber = formData.get("busNumber") as string;
                  if (busNumber.trim()) {
                    handleSearch("number", { busNumber: busNumber.trim() });
                  }
                }} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="bus-number" className="text-sm font-medium">
                      Enter Bus Number
                    </label>
                    <input
                      id="bus-number"
                      name="busNumber"
                      type="text"
                      placeholder="e.g., 101, AC-42, DLB-205"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[rgba(220,38,38,1)] hover:bg-[rgba(220,38,38,0.9)]">
                    <Bus className="h-4 w-4 mr-2" />
                    Find This Bus
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mt-0.5">
                      <Bus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                        How Bus Search Works
                      </h4>
                      <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Enter the exact bus number you want to find</li>
                        <li>• View the complete route and all stops</li>
                        <li>• See real-time location and next departure</li>
                        <li>• Check current passenger capacity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {loading && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span>Searching...</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && searchResults.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Search Results</h2>
                  <Badge variant="secondary" className="text-sm">
                    {searchResults.length}{" "}
                    {searchResults.length === 1 ? "result" : "results"} found
                  </Badge>
                </div>
                {searchResults.map((route, index) => {
                  const occupancyPercentage = Math.round(
                    (route.currentPassengers / route.capacity) * 100,
                  );

                  return (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                        selectedRoute?.busNumber === route.busNumber
                          ? "ring-2 ring-primary bg-primary/5"
                          : "hover:ring-1 hover:ring-primary/30"
                      }`}
                      onClick={() => {
                        setSelectedRoute(route);
                        // Scroll to map on mobile
                        if (window.innerWidth < 1024) {
                          document
                            .getElementById("route-map-section")
                            ?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <Bus className="h-5 w-5 text-primary" />
                              <span>Bus {route.busNumber}</span>
                              {route.isActive && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Live
                                </Badge>
                              )}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {route.routeName}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {route.rating}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>Next in</span>
                            </div>
                            <p className="font-medium text-sm">
                              {route.nextDeparture}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <NavigationIcon className="h-3 w-3" />
                              <span>Frequency</span>
                            </div>
                            <p className="font-medium text-sm">
                              {route.frequency}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Occupancy
                            </span>
                            <span className="font-medium">
                              {route.currentPassengers}/{route.capacity}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getOccupancyColor(
                                occupancyPercentage,
                              )}`}
                              style={{ width: `${occupancyPercentage}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {getOccupancyLabel(occupancyPercentage)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {occupancyPercentage}% full
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {!loading && searchResults.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Bus Not Found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The bus number you entered was not found. Please check the number and try again.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Clear form and reset search
                        setSearchResults([]);
                        setSelectedRoute(null);
                      }}
                    >
                      Clear Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map Panel */}
          <div className="lg:col-span-2" id="route-map-section">
            <Card className="h-[400px] md:h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>
                    {selectedRoute
                      ? `Bus ${selectedRoute.busNumber} - Live Route Map`
                      : "Search for a bus to view its route"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-5rem)]">
                {selectedRoute ? (
                  <RouteMap
                    stops={selectedRoute.stops}
                    busPosition={{
                      lat: selectedRoute.stops[1].lat,
                      lng: selectedRoute.stops[1].lng,
                    }}
                    className="h-full"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-muted/10">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Bus Route Visualization
                      </h3>
                      <p className="text-muted-foreground">
                        Search for a bus number to see its route and live location
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedRoute && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Route Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">All Stops</h4>
                      <div className="space-y-2">
                        {selectedRoute.stops.map((stop, index) => (
                          <div
                            key={stop.id}
                            className="flex items-center space-x-3"
                          >
                            <div className="flex-shrink-0">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  index === 0
                                    ? "bg-green-500"
                                    : index === selectedRoute.stops.length - 1
                                      ? "bg-red-500"
                                      : "bg-primary"
                                }`}
                              ></div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{stop.name}</p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Stop {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

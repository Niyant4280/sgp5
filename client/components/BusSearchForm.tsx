import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  ArrowRight,
  Clock,
  Zap,
  Navigation as NavigationIcon,
} from "lucide-react";

interface BusSearchFormProps {
  onSearch: (type: "number" | "route", data: any) => void;
}

export default function BusSearchForm({ onSearch }: BusSearchFormProps) {
  const [busNumber, setBusNumber] = useState("");
  const [fromStop, setFromStop] = useState("");
  const [toStop, setToStop] = useState("");
  const [activeTab, setActiveTab] = useState<"number" | "route">("number");

  const handleBusNumberSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busNumber.trim()) {
      onSearch("number", { busNumber: busNumber.trim() });
    }
  };

  const handleRouteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromStop.trim() && toStop.trim()) {
      onSearch("route", { from: fromStop.trim(), to: toStop.trim() });
    }
  };

  const quickActions = [
    { icon: Search, label: "Track Bus", desc: "Live location" },
    { icon: Clock, label: "Schedules", desc: "Timing info" },
    { icon: MapPin, label: "Routes", desc: "All stops" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto bg-red-500 rounded-3xl p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="bg-red-500 p-3 rounded-2xl shadow-lg">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Find Your Bus
          </h2>
        </div>
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-4">
          Search by bus number or plan your route between stops. Get real-time
          updates and never miss your ride.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/20 backdrop-blur-sm"
          >
            <CardContent className="p-4 text-center">
              <action.icon className="h-6 w-6 mx-auto mb-2 text-white" />
              <div className="text-sm font-semibold text-white">
                {action.label}
              </div>
              <div className="text-xs text-white/80">{action.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Search Section */}
      <Card className="border-0 shadow-2xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          {/* Tab Selection */}
          <div className="bg-red-500 p-6">
            <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-2xl p-2">
              <button
                onClick={() => setActiveTab("number")}
                className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 ${
                  activeTab === "number"
                    ? "bg-white text-red-600 shadow-lg font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Search className="h-5 w-5" />
                <span>Bus Number</span>
              </button>
              <button
                onClick={() => setActiveTab("route")}
                className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 ${
                  activeTab === "route"
                    ? "bg-white text-black shadow-lg font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <MapPin className="h-5 w-5" />
                <span>Route Planning</span>
              </button>
            </div>
          </div>

          {/* Search Content */}
          <div className="p-8">
            {activeTab === "number" ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Search by Bus Number
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Enter the bus number to get live tracking and route
                    information
                  </p>
                </div>

                <form onSubmit={handleBusNumberSearch} className="space-y-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="e.g., 101, AC-42, DLB-205"
                      value={busNumber}
                      onChange={(e) => setBusNumber(e.target.value)}
                      className="h-14 text-lg pl-12 pr-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-400 transition-colors bg-gray-50 dark:bg-gray-800"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>

                  <Button
                    type="submit"
                    disabled={!busNumber.trim()}
                    className="w-full h-14 text-lg font-semibold bg-white text-red-500 hover:bg-gray-50 hover:text-red-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Track This Bus
                  </Button>
                </form>

                {/* Popular Buses */}
                <div className="mt-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Popular buses:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["101", "205", "AC-42", "DLB-104", "Red Line"].map(
                      (bus) => (
                        <Badge
                          key={bus}
                          variant="outline"
                          className="cursor-pointer hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setBusNumber(bus)}
                        >
                          {bus}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Plan Your Route
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Find the best buses between any two stops
                  </p>
                </div>

                <form onSubmit={handleRouteSearch} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="From (Starting point)"
                        value={fromStop}
                        onChange={(e) => setFromStop(e.target.value)}
                        className="h-14 text-lg pl-12 pr-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-400 transition-colors bg-gray-50 dark:bg-gray-800"
                      />
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-gradient-to-r from-red-700 to-black p-3 rounded-full shadow-lg">
                        <ArrowRight className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="To (Destination)"
                        value={toStop}
                        onChange={(e) => setToStop(e.target.value)}
                        className="h-14 text-lg pl-12 pr-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-400 transition-colors bg-gray-50 dark:bg-gray-800"
                      />
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!fromStop.trim() || !toStop.trim()}
                    className="w-full h-14 text-lg font-semibold bg-white text-red-500 hover:bg-gray-50 hover:text-red-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <NavigationIcon className="h-5 w-5 mr-2" />
                    Find Best Routes
                  </Button>
                </form>

                {/* Quick Route Suggestions */}
                <div className="mt-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Popular routes:
                  </p>
                  <div className="space-y-2">
                    {[
                      { from: "Central Station", to: "Airport" },
                      { from: "City Mall", to: "University" },
                      { from: "Tech Park", to: "Metro Station" },
                    ].map((route, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => {
                          setFromStop(route.from);
                          setToStop(route.to);
                        }}
                      >
                        <span className="text-sm font-medium">
                          {route.from} → {route.to}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="text-center p-4">
          <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-3">
            <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Real-time Updates
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Live bus locations and arrival times
          </p>
        </div>
        <div className="text-center p-4">
          <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-3">
            <MapPin className="h-6 w-6 text-black dark:text-gray-400" />
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Smart Routing
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Best routes with transfer options
          </p>
        </div>
        <div className="text-center p-4">
          <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-3">
            <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            Instant Results
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Fast search with accurate data
          </p>
        </div>
      </div>
    </div>
  );
}

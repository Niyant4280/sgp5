import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, ArrowRight } from "lucide-react";

interface BusSearchFormProps {
  onSearch: (type: "number" | "route", data: any) => void;
}

export default function BusSearchForm({ onSearch }: BusSearchFormProps) {
  const [busNumber, setBusNumber] = useState("");
  const [fromStop, setFromStop] = useState("");
  const [toStop, setToStop] = useState("");

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

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8">
      <Card className="w-full max-w-2xl lg:w-2/3 bg-primary text-white border-2 border-white shadow-lg p-8 flex flex-col items-center text-center rounded-3xl lg:rounded-l-[3rem] lg:rounded-r-3xl dark:bg-primary dark:text-primary-foreground dark:border-red-200">
        <CardHeader className="mb-2 border-none">
          <Search className="h-10 w-10 mx-auto mb-4 text-white dark:text-primary-foreground" />
          <CardTitle className="text-3xl font-bold mb-2 text-white">Find Your Bus</CardTitle>
          <p className="text-lg mb-6 text-white/90">
            Search for your next ride by bus number or plan your route with ease. Fast, accurate, and always up-to-date!
          </p>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-6">
          <Tabs defaultValue="number" className="w-full">
            <TabsList className="flex w-full justify-center gap-2 bg-transparent mb-4">
              <TabsTrigger value="number" className="flex items-center space-x-2 px-4 py-2 rounded-md font-semibold bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-lg hover:scale-[1.05] transition-all duration-200 border-2 border-red-200 hover:border-red-300 data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:border-red-300 data-[state=active]:shadow-lg">
                <Search className="h-4 w-4" />
                <span>By Bus Number</span>
              </TabsTrigger>
              <TabsTrigger value="route" className="flex items-center space-x-2 px-4 py-2 rounded-md font-semibold bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-lg hover:scale-[1.05] transition-all duration-200 border-2 border-red-200 hover:border-red-300 data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:border-red-300 data-[state=active]:shadow-lg">
                <MapPin className="h-4 w-4" />
                <span>By Route</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="number" className="mt-2">
              <form onSubmit={handleBusNumberSearch} className="flex flex-col gap-4 items-center">
                <Input
                  id="bus-number"
                  type="text"
                  placeholder="e.g., 101, AC-42, DLB-205"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  className="text-lg max-w-xs text-center bg-white text-red-600 placeholder:text-red-300 border-2 border-red-200 focus:border-red-400 hover:border-red-300 transition-colors"
                />
                <Button
                  type="submit"
                  className="w-full max-w-xs bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-lg hover:scale-[1.05] transition-all duration-200 font-semibold border-2 border-white hover:border-red-300 disabled:opacity-70 disabled:grayscale-0 dark:bg-white dark:text-red-600 dark:hover:bg-red-50 dark:hover:text-red-700 dark:border-red-200 dark:hover:border-red-300"
                  disabled={!busNumber.trim()}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Bus Route
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="route" className="mt-2">
              <form onSubmit={handleRouteSearch} className="flex flex-col gap-4 items-center">
                <Input
                  id="from-stop"
                  type="text"
                  placeholder="From Stop"
                  value={fromStop}
                  onChange={(e) => setFromStop(e.target.value)}
                  className="max-w-xs text-center bg-white text-red-600 placeholder:text-red-300 border-2 border-red-200 focus:border-red-400 hover:border-red-300 transition-colors"
                />
                <div className="flex justify-center">
                  <div className="bg-muted rounded-full p-2">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Input
                  id="to-stop"
                  type="text"
                  placeholder="To Stop"
                  value={toStop}
                  onChange={(e) => setToStop(e.target.value)}
                  className="max-w-xs text-center bg-white text-red-600 placeholder:text-red-300 border-2 border-red-200 focus:border-red-400 hover:border-red-300 transition-colors"
                />
                <Button
                  type="submit"
                  className="w-full max-w-xs bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-lg hover:scale-[1.05] transition-all duration-200 font-semibold border-2 border-white hover:border-red-300 disabled:opacity-70 disabled:grayscale-0 dark:bg-white dark:text-red-600 dark:hover:bg-red-50 dark:hover:text-red-700 dark:border-red-200 dark:hover:border-red-300"
                  disabled={!fromStop.trim() || !toStop.trim()}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Buses
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {/* Animated Emoji/Sticker on the right for large screens */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/3">
        <div className="flex flex-col items-center justify-center w-full">
          <svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
            <rect x="10" y="60" width="140" height="20" rx="8" fill="#e5e7eb"/>
            <rect x="30" y="30" width="30" height="30" rx="6" fill="#fca5a5"/>
            <rect x="60" y="20" width="40" height="40" rx="8" fill="#f87171"/>
            <rect x="100" y="40" width="25" height="25" rx="5" fill="#fca5a5"/>
            <rect x="50" y="70" width="60" height="18" rx="6" fill="#ef4444"/>
            <rect x="60" y="75" width="15" height="8" rx="2" fill="#fff"/>
            <rect x="85" y="75" width="15" height="8" rx="2" fill="#fff"/>
            <circle cx="60" cy="88" r="5" fill="#222" stroke="#fff" strokeWidth="2"/>
            <circle cx="100" cy="88" r="5" fill="#222" stroke="#fff" strokeWidth="2"/>
          </svg>
          <span className="text-lg font-semibold text-red-600 dark:text-white text-center">Travel smart, travel together.</span>
        </div>
      </div>
    </div>
  );
}

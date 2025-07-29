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
    <div className="w-full flex flex-col lg:flex-row items-center justify-center">
      <Card className="w-full max-w-[993px] bg-[rgba(208,2,27,1)] text-white border-0 shadow-2xl p-16 flex flex-col items-center text-center rounded-3xl transform hover:scale-[1.02] transition-all duration-300 -ml-1">
        <CardHeader className="mb-6 border-none">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 mb-8 shadow-lg">
            <Search className="h-16 w-16 mx-auto text-white" />
          </div>
          <CardTitle className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-lg">
            Find Your Bus
          </CardTitle>
          <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            Search for your next ride by bus number or plan your route with
            ease. Fast, accurate, and always up-to-date!
          </p>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-8">
          <Tabs defaultValue="number" className="w-full">
            <TabsList className="flex w-full justify-center gap-4 bg-white/10 backdrop-blur-sm p-2 rounded-2xl mb-8 shadow-lg">
              <TabsTrigger
                value="number"
                className="flex items-center space-x-3 px-6 py-4 rounded-xl font-bold text-lg bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-xl hover:scale-[1.05] transition-all duration-200 border-0 shadow-md data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-xl data-[state=active]:scale-[1.05]"
              >
                <Search className="h-5 w-5" />
                <span>By Bus Number</span>
              </TabsTrigger>
              <TabsTrigger
                value="route"
                className="flex items-center space-x-3 px-6 py-4 rounded-xl font-bold text-lg bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-xl hover:scale-[1.05] transition-all duration-200 border-0 shadow-md data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-xl data-[state=active]:scale-[1.05]"
              >
                <MapPin className="h-5 w-5" />
                <span>By Route</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="number" className="mt-4">
              <form
                onSubmit={handleBusNumberSearch}
                className="flex flex-col gap-6 items-center"
              >
                <Input
                  id="bus-number"
                  type="text"
                  placeholder="e.g., 101, AC-42, DLB-205"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  className="text-xl h-16 max-w-md w-full text-center bg-white text-red-600 placeholder:text-red-300 border-0 focus:ring-4 focus:ring-white/30 hover:shadow-lg transition-all duration-200 rounded-2xl shadow-lg font-semibold"
                />
                <Button
                  type="submit"
                  className="w-full max-w-md h-16 text-xl bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-xl hover:scale-[1.05] transition-all duration-200 font-bold border-0 rounded-2xl shadow-lg disabled:opacity-70"
                  disabled={!busNumber.trim()}
                >
                  <Search className="h-6 w-6 mr-3" />
                  Search Bus Route
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="route" className="mt-4">
              <form
                onSubmit={handleRouteSearch}
                className="flex flex-col gap-6 items-center"
              >
                <Input
                  id="from-stop"
                  type="text"
                  placeholder="From Stop"
                  value={fromStop}
                  onChange={(e) => setFromStop(e.target.value)}
                  className="text-xl h-16 max-w-md w-full text-center bg-white text-red-600 placeholder:text-red-300 border-0 focus:ring-4 focus:ring-white/30 hover:shadow-lg transition-all duration-200 rounded-2xl shadow-lg font-semibold"
                />
                <div className="flex justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-lg">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                </div>
                <Input
                  id="to-stop"
                  type="text"
                  placeholder="To Stop"
                  value={toStop}
                  onChange={(e) => setToStop(e.target.value)}
                  className="text-xl h-16 max-w-md w-full text-center bg-white text-red-600 placeholder:text-red-300 border-0 focus:ring-4 focus:ring-white/30 hover:shadow-lg transition-all duration-200 rounded-2xl shadow-lg font-semibold"
                />
                <Button
                  type="submit"
                  className="w-full max-w-md h-16 text-xl bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-xl hover:scale-[1.05] transition-all duration-200 font-bold border-0 rounded-2xl shadow-lg disabled:opacity-70"
                  disabled={!fromStop.trim() || !toStop.trim()}
                >
                  <MapPin className="h-6 w-6 mr-3" />
                  Find Buses
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

import Navigation from "@/components/Navigation";
import RouteMap from "@/components/RouteMap";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MapPin, Navigation as NavigationIcon, Search } from "lucide-react";
import { useState } from "react";

const allRoutes = [
  {
    id: "r1",
    name: "Central Station → Airport Terminal",
    stops: [
      { id: "1", name: "Central Station", lat: 28.6448, lng: 77.216721 },
      { id: "2", name: "City Mall", lat: 28.6304, lng: 77.2177 },
      { id: "3", name: "University Campus", lat: 28.6236, lng: 77.2085 },
      { id: "4", name: "Metro Junction", lat: 28.6129, lng: 77.2295 },
      { id: "5", name: "Airport Terminal", lat: 28.5562, lng: 77.1 },
    ],
    buses: ["101", "205"],
  },
  {
    id: "r2",
    name: "Mall Circle → Airport via Highway",
    stops: [
      { id: "6", name: "Mall Circle", lat: 28.6304, lng: 77.2177 },
      { id: "7", name: "Tech Park", lat: 28.6189, lng: 77.209 },
      { id: "8", name: "Highway Junction", lat: 28.592, lng: 77.15 },
      { id: "9", name: "Airport Terminal", lat: 28.5562, lng: 77.1 },
    ],
    buses: ["205"],
  },
];

export default function RoutesPage() {
  const [search, setSearch] = useState("");
  const filteredRoutes = allRoutes.filter((route) =>
    route.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100/40 ">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="rounded-3xl bg-[rgba(220,38,38,1)] text-white shadow-xl px-8 py-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3 justify-center md:justify-start">
              <NavigationIcon className="h-9 w-9 text-white" />
              Explore Bus Routes
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto md:mx-0">
              Discover the best routes, view all stops, and plan your journey
              with confidence. Find the most efficient way to reach your
              destination!
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="bg-white/90  rounded-2xl shadow-lg p-6 flex flex-col items-center w-full max-w-xs">
              <Search className="h-6 w-6 text-primary mb-2" />
              <input
                type="text"
                placeholder="Search routes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-primary/30 px-4 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white "
              />
            </div>
          </div>
        </div>

        {/* Routes List */}
        <Accordion
          type="single"
          collapsible
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredRoutes.length === 0 && (
            <div className="col-span-full text-center text-lg text-muted-foreground py-12">
              No routes found. Try a different search.
            </div>
          )}
          {filteredRoutes.map((route) => (
            <AccordionItem
              key={route.id}
              value={route.id}
              className="rounded-2xl border-2 border-primary/10 bg-white/90  shadow hover:shadow-2xl transition-shadow"
            >
              <AccordionTrigger className="px-6 py-4 flex flex-col items-start gap-1">
                <span className="flex items-center gap-2 text-primary text-lg font-semibold">
                  <MapPin className="h-5 w-5" />
                  {route.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Buses:</span>{" "}
                  {route.buses.join(", ")}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="mb-2">
                  <span className="font-semibold text-primary">Stops:</span>
                  <ul className="list-disc list-inside ml-2">
                    {route.stops.map((stop) => (
                      <li key={stop.id}>{stop.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <RouteMap stops={route.stops} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

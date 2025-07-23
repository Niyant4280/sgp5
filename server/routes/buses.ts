import { RequestHandler } from "express";
import {
  BusSearchResponse,
  RouteSearchResponse,
  BusRoute,
  Stop,
  DashboardStats,
} from "@shared/types";

// Real sample bus data for demonstration
const mockStops: Stop[] = [
  // Green Line Express stops
  {
    id: "central-station",
    name: "Central Railway Station",
    lat: 28.6139,
    lng: 77.209,
    address: "New Delhi Railway Station, Paharganj, New Delhi",
  },
  {
    id: "tech-park-1",
    name: "Cyber City Tech Park",
    lat: 28.5355,
    lng: 77.391,
    address: "Cyber City, Sector 24, Gurugram, Haryana",
  },
  {
    id: "dlf-mall",
    name: "DLF Mall of India",
    lat: 28.4595,
    lng: 77.0266,
    address: "Mall of India, Sector 18, Noida, Uttar Pradesh",
  },
  {
    id: "igi-airport",
    name: "IGI Airport Terminal 3",
    lat: 28.5562,
    lng: 77.1,
    address: "Indira Gandhi International Airport, New Delhi",
  },

  // Orange Metro Connect stops
  {
    id: "delhi-university",
    name: "Delhi University North Campus",
    lat: 28.6868,
    lng: 77.2167,
    address: "University of Delhi, North Campus, Delhi",
  },
  {
    id: "aiims-hospital",
    name: "AIIMS Hospital",
    lat: 28.6289,
    lng: 77.2065,
    address: "All India Institute of Medical Sciences, New Delhi",
  },
  {
    id: "cp-downtown",
    name: "Connaught Place",
    lat: 28.6304,
    lng: 77.2177,
    address: "Connaught Place, New Delhi",
  },
  {
    id: "india-gate",
    name: "India Gate",
    lat: 28.6129,
    lng: 77.2295,
    address: "India Gate, Rajpath, New Delhi",
  },

  // Purple City Circle stops
  {
    id: "old-delhi-station",
    name: "Old Delhi Railway Station",
    lat: 28.6448,
    lng: 77.2167,
    address: "Delhi Junction, Chandni Chowk, Old Delhi",
  },
  {
    id: "karol-bagh",
    name: "Karol Bagh Shopping Center",
    lat: 28.6139,
    lng: 77.275,
    address: "Karol Bagh Market, New Delhi",
  },
  {
    id: "rohini-sector",
    name: "Rohini Residential Area",
    lat: 28.5672,
    lng: 77.21,
    address: "Rohini Sector 15, New Delhi",
  },
  {
    id: "central-park",
    name: "Central Park Rajouri Garden",
    lat: 28.5478,
    lng: 77.1734,
    address: "Central Park, Rajouri Garden, New Delhi",
  },

  // Additional stops for variety
  {
    id: "saket-mall",
    name: "Select City Walk Saket",
    lat: 28.5245,
    lng: 77.2066,
    address: "Select City Walk, Saket, New Delhi",
  },
  {
    id: "khan-market",
    name: "Khan Market",
    lat: 28.5983,
    lng: 77.231,
    address: "Khan Market, New Delhi",
  },
  {
    id: "lajpat-nagar",
    name: "Lajpat Nagar Market",
    lat: 28.5677,
    lng: 77.2438,
    address: "Lajpat Nagar Central Market, New Delhi",
  },
];

const mockRoutes: BusRoute[] = [
  {
    id: "green-line-express",
    busNumber: "GL-101",
    routeName: "Green Line Express",
    stops: [
      mockStops.find((s) => s.id === "central-station")!,
      mockStops.find((s) => s.id === "tech-park-1")!,
      mockStops.find((s) => s.id === "dlf-mall")!,
      mockStops.find((s) => s.id === "igi-airport")!,
    ],
    frequency: "Every 12 minutes",
    operatingHours: { start: "05:30", end: "23:30" },
    isActive: true,
    rating: 4.7,
    capacity: 50,
    currentPassengers: 32,
  },
  {
    id: "orange-metro-connect",
    busNumber: "OM-205",
    routeName: "Orange Metro Connect",
    stops: [
      mockStops.find((s) => s.id === "delhi-university")!,
      mockStops.find((s) => s.id === "aiims-hospital")!,
      mockStops.find((s) => s.id === "cp-downtown")!,
      mockStops.find((s) => s.id === "india-gate")!,
      mockStops.find((s) => s.id === "saket-mall")!,
    ],
    frequency: "Every 15 minutes",
    operatingHours: { start: "06:00", end: "22:30" },
    isActive: true,
    rating: 4.5,
    capacity: 45,
    currentPassengers: 28,
  },
  {
    id: "purple-city-circle",
    busNumber: "PC-150",
    routeName: "Purple City Circle",
    stops: [
      mockStops.find((s) => s.id === "old-delhi-station")!,
      mockStops.find((s) => s.id === "karol-bagh")!,
      mockStops.find((s) => s.id === "rohini-sector")!,
      mockStops.find((s) => s.id === "central-park")!,
    ],
    frequency: "Every 20 minutes",
    operatingHours: { start: "07:00", end: "21:00" },
    isActive: true,
    rating: 4.2,
    capacity: 40,
    currentPassengers: 35,
  },
  {
    id: "heritage-route",
    busNumber: "HR-88",
    routeName: "Heritage Tour Route",
    stops: [
      mockStops.find((s) => s.id === "old-delhi-station")!,
      mockStops.find((s) => s.id === "india-gate")!,
      mockStops.find((s) => s.id === "khan-market")!,
      mockStops.find((s) => s.id === "cp-downtown")!,
    ],
    frequency: "Every 25 minutes",
    operatingHours: { start: "08:00", end: "20:00" },
    isActive: true,
    rating: 4.8,
    capacity: 35,
    currentPassengers: 22,
  },
  {
    id: "shopping-express",
    busNumber: "SE-299",
    routeName: "Shopping Express",
    stops: [
      mockStops.find((s) => s.id === "karol-bagh")!,
      mockStops.find((s) => s.id === "cp-downtown")!,
      mockStops.find((s) => s.id === "khan-market")!,
      mockStops.find((s) => s.id === "lajpat-nagar")!,
      mockStops.find((s) => s.id === "saket-mall")!,
    ],
    frequency: "Every 18 minutes",
    operatingHours: { start: "09:00", end: "22:00" },
    isActive: true,
    rating: 4.4,
    capacity: 42,
    currentPassengers: 38,
  },
];

// Search buses by number
export const searchBusByNumber: RequestHandler = (req, res) => {
  const { busNumber } = req.query;

  if (!busNumber) {
    return res.status(400).json({ error: "Bus number is required" });
  }

  const matchingRoutes = mockRoutes.filter((route) =>
    route.busNumber.toLowerCase().includes((busNumber as string).toLowerCase()),
  );

  const response: BusSearchResponse = {
    buses: matchingRoutes,
    total: matchingRoutes.length,
  };

  res.json(response);
};

// Search routes between two stops with intelligent matching
export const searchRoutesBetweenStops: RequestHandler = (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res
      .status(400)
      .json({ error: "Both 'from' and 'to' stops are required" });
  }

  const fromStop = (from as string).toLowerCase();
  const toStop = (to as string).toLowerCase();

  const matchingRoutes = mockRoutes.filter((route) => {
    const stopNames = route.stops.map((stop) => stop.name.toLowerCase());
    const stopAddresses = route.stops.map((stop) =>
      stop.address?.toLowerCase(),
    );

    // Check if route contains both stops (by name or address)
    const hasFrom = stopNames.some(
      (name) =>
        name.includes(fromStop) ||
        stopAddresses.some((addr) => addr?.includes(fromStop)),
    );
    const hasTo = stopNames.some(
      (name) =>
        name.includes(toStop) ||
        stopAddresses.some((addr) => addr?.includes(toStop)),
    );

    return hasFrom && hasTo;
  });

  const response: RouteSearchResponse = {
    routes: matchingRoutes,
    total: matchingRoutes.length,
  };

  res.json(response);
};

// Get all available stops
export const getAllStops: RequestHandler = (req, res) => {
  res.json({
    stops: mockStops,
    total: mockStops.length,
  });
};

// Get all routes
export const getAllRoutes: RequestHandler = (req, res) => {
  res.json({
    routes: mockRoutes,
    total: mockRoutes.length,
  });
};

// Get route by ID
export const getRouteById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const route = mockRoutes.find((r) => r.id === id);

  if (!route) {
    return res.status(404).json({ error: "Route not found" });
  }

  res.json(route);
};

// Get dashboard statistics
export const getDashboardStats: RequestHandler = (req, res) => {
  const stats: DashboardStats = {
    activeBuses: mockRoutes.filter((r) => r.isActive).length,
    totalRoutes: mockRoutes.length,
    crewMembers: 48,
    dailyPassengers: 3247,
    pendingAds: 7,
  };

  res.json(stats);
};

// Get live bus locations with realistic movement simulation
export const getLiveBusLocations: RequestHandler = (req, res) => {
  const liveLocations = mockRoutes.map((route, index) => {
    // Simulate bus movement along the route
    const progress = (Date.now() / 10000 + index * 100) % route.stops.length;
    const currentStopIndex = Math.floor(progress);
    const nextStopIndex = (currentStopIndex + 1) % route.stops.length;

    const currentStop = route.stops[currentStopIndex];
    const nextStop = route.stops[nextStopIndex];

    // Interpolate position between current and next stop
    const interpolation = progress - currentStopIndex;
    const lat =
      currentStop.lat + (nextStop.lat - currentStop.lat) * interpolation;
    const lng =
      currentStop.lng + (nextStop.lng - currentStop.lng) * interpolation;

    return {
      busId: route.id,
      busNumber: route.busNumber,
      lat,
      lng,
      timestamp: new Date(),
      speed: Math.floor(Math.random() * 40) + 20, // 20-60 km/h
      direction: Math.floor(Math.random() * 360),
      nextStop: nextStop.name,
      passengers: route.currentPassengers,
      capacity: route.capacity,
    };
  });

  res.json({
    locations: liveLocations,
    total: liveLocations.length,
  });
};

// Search stops with auto-complete functionality
export const searchStops: RequestHandler = (req, res) => {
  const { query, limit = 10 } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const searchTerm = (query as string).toLowerCase();
  const matchingStops = mockStops
    .filter(
      (stop) =>
        stop.name.toLowerCase().includes(searchTerm) ||
        stop.address?.toLowerCase().includes(searchTerm),
    )
    .slice(0, parseInt(limit as string));

  res.json({
    stops: matchingStops,
    total: matchingStops.length,
  });
};

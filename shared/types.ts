// Shared types for Bus Management System

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
}

export interface BusRoute {
  id: string;
  busNumber: string;
  routeName: string;
  stops: Stop[];
  frequency: string;
  operatingHours: {
    start: string;
    end: string;
  };
  isActive: boolean;
  rating?: number;
  capacity: number;
  currentPassengers?: number;
}

export interface BusLocation {
  busId: string;
  busNumber: string;
  lat: number;
  lng: number;
  timestamp: Date;
  speed?: number;
  direction?: number;
}

export interface CrewMember {
  id: string;
  name: string;
  role: "driver" | "conductor";
  licenseNumber?: string;
  phone: string;
  email: string;
  shiftStart: string;
  shiftEnd: string;
  assignedBus?: string;
  isActive: boolean;
}

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  advertiserName: string;
  advertiserEmail: string;
  advertiserPhone: string;
  adType: "stop" | "in-bus";
  targetStops?: string[];
  targetRoutes?: string[];
  duration: number; // in days
  budget: number;
  status: "pending" | "approved" | "rejected" | "active" | "expired";
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  startDate?: Date;
  endDate?: Date;
  attachments?: string[];
}

export interface BusSchedule {
  id: string;
  busNumber: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  dayOfWeek: number; // 0-6, Sunday to Saturday
  isWeekend: boolean;
  crewAssignments: {
    driverId: string;
    conductorId?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  phone?: string;
  isVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

// API Response Types
export interface BusSearchResponse {
  buses: BusRoute[];
  total: number;
}

export interface RouteSearchResponse {
  routes: BusRoute[];
  total: number;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface DashboardStats {
  activeBuses: number;
  totalRoutes: number;
  crewMembers: number;
  dailyPassengers: number;
  pendingAds: number;
}

// API Request Types
export interface BusSearchRequest {
  busNumber?: string;
  from?: string;
  to?: string;
  date?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AdvertisementRequest {
  title: string;
  description: string;
  advertiserName: string;
  advertiserEmail: string;
  advertiserPhone: string;
  adType: "stop" | "in-bus";
  targetStops?: string[];
  targetRoutes?: string[];
  duration: number;
  budget: number;
  attachments?: File[];
}

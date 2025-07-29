import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bus,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Users,
  Fuel,
  ArrowLeft,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface BusInfo {
  id: string;
  number: string;
  type: "regular" | "ac" | "electric" | "cng";
  capacity: number;
  route: string;
  status: "active" | "maintenance" | "retired" | "out_of_service";
  driver: string;
  conductor?: string;
  lastMaintenance: Date;
  mileage: number;
  fuelType: "diesel" | "cng" | "electric";
  registrationNumber: string;
  manufacturingYear: number;
  currentLocation?: string;
  nextService: Date;
}

export default function AdminBuses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  const [buses] = useState<BusInfo[]>([
    {
      id: "bus1",
      number: "101",
      type: "regular",
      capacity: 50,
      route: "Rajouri Garden - Connaught Place",
      status: "active",
      driver: "Rajesh Kumar",
      conductor: "Amit Singh",
      lastMaintenance: new Date("2024-11-15"),
      mileage: 145000,
      fuelType: "diesel",
      registrationNumber: "DL-1PC-1234",
      manufacturingYear: 2018,
      currentLocation: "Rajouri Garden Metro Station",
      nextService: new Date("2024-12-20"),
    },
    {
      id: "bus2",
      number: "205",
      type: "regular",
      capacity: 45,
      route: "Dwarka - Karol Bagh",
      status: "active",
      driver: "Suresh Patel",
      conductor: "Vikram Singh",
      lastMaintenance: new Date("2024-12-01"),
      mileage: 98000,
      fuelType: "cng",
      registrationNumber: "DL-1PA-5678",
      manufacturingYear: 2020,
      currentLocation: "Dwarka Sector 21",
      nextService: new Date("2025-01-05"),
    },
    {
      id: "bus3",
      number: "AC-42",
      type: "ac",
      capacity: 40,
      route: "Airport Express",
      status: "active",
      driver: "Manoj Sharma",
      lastMaintenance: new Date("2024-11-28"),
      mileage: 87000,
      fuelType: "diesel",
      registrationNumber: "DL-1PB-9012",
      manufacturingYear: 2021,
      currentLocation: "IGI Airport Terminal 3",
      nextService: new Date("2024-12-25"),
    },
    {
      id: "bus4",
      number: "718",
      type: "regular",
      capacity: 50,
      route: "Karol Bagh - Dwarka",
      status: "maintenance",
      driver: "Deepak Yadav",
      conductor: "Ravi Kumar",
      lastMaintenance: new Date("2024-12-10"),
      mileage: 156000,
      fuelType: "cng",
      registrationNumber: "DL-1PC-3456",
      manufacturingYear: 2017,
      nextService: new Date("2024-12-18"),
    },
    {
      id: "bus5",
      number: "E-101",
      type: "electric",
      capacity: 35,
      route: "Green Line Express",
      status: "active",
      driver: "Ankit Gupta",
      lastMaintenance: new Date("2024-12-05"),
      mileage: 42000,
      fuelType: "electric",
      registrationNumber: "DL-1PE-7890",
      manufacturingYear: 2023,
      currentLocation: "Central Secretariat",
      nextService: new Date("2025-01-10"),
    },
    {
      id: "bus6",
      number: "512",
      type: "regular",
      capacity: 50,
      route: "Rohini - Nehru Place",
      status: "out_of_service",
      driver: "Krishan Kumar",
      conductor: "Santosh Singh",
      lastMaintenance: new Date("2024-09-15"),
      mileage: 189000,
      fuelType: "diesel",
      registrationNumber: "DL-1PA-2468",
      manufacturingYear: 2016,
      nextService: new Date("2024-12-22"),
    },
  ]);

  const filteredBuses = buses.filter((bus) => {
    const matchesSearch = 
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || bus.status === statusFilter;
    const matchesType = typeFilter === "all" || bus.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "retired":
        return "bg-gray-100 text-gray-800";
      case "out_of_service":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ac":
        return "bg-blue-100 text-blue-800";
      case "electric":
        return "bg-green-100 text-green-800";
      case "cng":
        return "bg-purple-100 text-purple-800";
      case "regular":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFuelIcon = (fuelType: string) => {
    switch (fuelType) {
      case "electric":
        return "⚡";
      case "cng":
        return "🟢";
      case "diesel":
        return "⛽";
      default:
        return "⛽";
    }
  };

  const totalBuses = buses.length;
  const activeBuses = buses.filter(b => b.status === "active").length;
  const maintenanceBuses = buses.filter(b => b.status === "maintenance").length;
  const outOfServiceBuses = buses.filter(b => b.status === "out_of_service").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bus Fleet Management</h1>
              <p className="text-gray-600">Manage bus fleet, routes, and maintenance</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button asChild>
              <Link to="/admin/buses/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Bus
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bus className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Fleet</p>
                  <p className="text-2xl font-bold text-gray-900">{totalBuses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{activeBuses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Maintenance</p>
                  <p className="text-2xl font-bold text-gray-900">{maintenanceBuses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Out of Service</p>
                  <p className="text-2xl font-bold text-gray-900">{outOfServiceBuses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by number, route, driver..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="out_of_service">Out of Service</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="ac">AC</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buses Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bus Fleet ({filteredBuses.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBuses.length === 0 ? (
              <div className="text-center py-12">
                <Bus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Get started by adding your first bus to the fleet."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bus Details</TableHead>
                      <TableHead>Route & Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type & Fuel</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead>Maintenance</TableHead>
                      <TableHead>Specifications</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBuses.map((bus) => (
                      <TableRow key={bus.id}>
                        <TableCell>
                          <div>
                            <div className="font-semibold text-gray-900">Bus {bus.number}</div>
                            <div className="text-sm text-gray-500">{bus.registrationNumber}</div>
                            <div className="text-xs text-gray-400">Year: {bus.manufacturingYear}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{bus.route}</div>
                            {bus.currentLocation && (
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <MapPin className="h-3 w-3" />
                                {bus.currentLocation}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(bus.status)}>
                            {bus.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={getTypeColor(bus.type)}>
                              {bus.type.toUpperCase()}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <span>{getFuelIcon(bus.fuelType)}</span>
                              <span>{bus.fuelType}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm font-medium">{bus.driver}</div>
                            {bus.conductor && (
                              <div className="text-xs text-gray-500">{bus.conductor}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">
                              Last: {bus.lastMaintenance.toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              Next: {bus.nextService.toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-3 w-3" />
                              {bus.capacity} seats
                            </div>
                            <div className="text-xs text-gray-500">
                              {bus.mileage.toLocaleString()} km
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/admin/buses/${bus.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/admin/buses/${bus.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

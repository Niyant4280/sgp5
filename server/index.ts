import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  searchBusByNumber,
  searchRoutesBetweenStops,
  getAllStops,
  getAllRoutes,
  getRouteById,
  getDashboardStats,
  getLiveBusLocations,
} from "./routes/buses";
import {
  adminLogin,
  verifyAdminToken,
  adminLogout,
  getAdminProfile,
  requireAdmin,
} from "./routes/admin";
import {
  userLogin,
  userRegister,
  verifyUserToken,
  userLogout,
  getUserProfile,
  updateUserProfile,
  requireUser,
  forgotPassword,
} from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  // Legacy demo route
  app.get("/api/demo", handleDemo);

  // Bus Management API Routes
  app.get("/api/buses/search", searchBusByNumber);
  app.get("/api/routes/search", searchRoutesBetweenStops);
  app.get("/api/stops", getAllStops);
  app.get("/api/routes", getAllRoutes);
  app.get("/api/routes/:id", getRouteById);
  app.get("/api/dashboard/stats", getDashboardStats);
  app.get("/api/buses/locations", getLiveBusLocations);

  // User Authentication API Routes
  app.post("/api/auth/register", userRegister);
  app.post("/api/auth/login", userLogin);
  app.post("/api/auth/logout", userLogout);
  app.get("/api/auth/verify", verifyUserToken);
  app.get("/api/auth/profile", requireUser, getUserProfile);
  app.put("/api/auth/profile", requireUser, updateUserProfile);
  app.post("/api/auth/forgot-password", forgotPassword);

  // Admin Authentication API Routes
  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", adminLogout);
  app.get("/api/admin/verify", verifyAdminToken);
  app.get("/api/admin/profile", requireAdmin, getAdminProfile);

  // Protected admin routes (require authentication)
  app.get("/api/admin/dashboard/stats", requireAdmin, getDashboardStats);

  return app;
}

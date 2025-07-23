import { RequestHandler } from "express";
import { LoginResponse, User } from "@shared/types";

// Mock admin user for demo
const mockAdminUser: User = {
  id: "admin-1",
  email: "admin@busniyojak.com",
  name: "System Administrator",
  role: "admin",
  phone: "+91-9876543210",
  isVerified: true,
  createdAt: new Date("2024-01-01"),
  lastLogin: new Date(),
};

// Admin login endpoint
export const adminLogin: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  // Mock authentication - replace with actual authentication logic
  if (email === "admin@busniyojak.com" && password === "BusAdmin2024!") {
    // Generate mock JWT token
    const token = `admin-jwt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const refreshToken = `refresh-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const response: LoginResponse = {
      user: mockAdminUser,
      token,
      refreshToken,
    };

    res.json(response);
  } else {
    res.status(401).json({
      error: "Invalid admin credentials",
      message: "The email or password you entered is incorrect",
    });
  }
};

// Verify admin token
export const verifyAdminToken: RequestHandler = (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  // Mock token validation - replace with actual JWT verification
  if (token.startsWith("admin-jwt-")) {
    res.json({
      valid: true,
      user: mockAdminUser,
    });
  } else {
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

// Admin logout (optional - mostly client-side)
export const adminLogout: RequestHandler = (req, res) => {
  // In a real implementation, you might want to blacklist the token
  res.json({
    message: "Logged out successfully",
  });
};

// Get admin profile
export const getAdminProfile: RequestHandler = (req, res) => {
  // This would typically get the user from the verified token
  res.json(mockAdminUser);
};

// Admin-only middleware for protecting routes
export const requireAdmin: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Admin access required",
    });
  }

  // Mock token validation
  if (token.startsWith("admin-jwt-")) {
    // Add user to request object for downstream handlers
    (req as any).user = mockAdminUser;
    next();
  } else {
    res.status(403).json({
      error: "Admin privileges required",
    });
  }
};

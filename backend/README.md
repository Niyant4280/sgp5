# Bus नियोजक Backend API

A comprehensive backend system for Nepal's leading bus booking platform built with Node.js, Express, and MongoDB.

## 🚀 Features

### Core Systems
- **User Authentication & Management** - JWT-based authentication with role-based access control
- **Bus Fleet Management** - Complete CRUD operations for bus management with seat allocation
- **Route Management** - Dynamic route creation and management with intermediate stops
- **Booking System** - Real-time seat booking with payment integration
- **Real-time Tracking** - GPS-based bus location tracking and trip monitoring
- **Notification System** - Multi-channel notifications (email, SMS, push)
- **Analytics & Reporting** - Comprehensive business intelligence and reporting

### Advanced Features
- **Seat Management** - Dynamic seat allocation and availability checking
- **Payment Processing** - Multiple payment method support with transaction tracking
- **Rating & Reviews** - Customer feedback system for buses and routes
- **Loyalty Program** - Point-based rewards system
- **Emergency Contacts** - Safety features with emergency contact management
- **Maintenance Tracking** - Bus maintenance schedules and history
- **Weather Integration** - Route condition monitoring
- **Tourist Attractions** - Points of interest along routes

## 🏗️ Architecture

### Database Models
- **User** - User profiles, preferences, and authentication
- **Bus** - Bus details, capacity, amenities, and real-time location
- **Route** - Route information, stops, pricing, and schedules
- **Booking** - Booking details, passengers, payment, and journey information

### API Endpoints

#### Authentication (`/api/auth`)
```
POST   /register          - User registration
POST   /login             - User login
POST   /refresh           - Refresh JWT token
GET    /me                - Get current user profile
PUT    /change-password   - Change user password
POST   /logout            - User logout
POST   /verify-email      - Email verification
POST   /forgot-password   - Password reset request
```

#### User Management (`/api/users`)
```
GET    /:userId           - Get user profile
PUT    /:userId           - Update user profile
GET    /:userId/bookings  - Get user bookings
GET    /:userId/travel-history - Get travel history with stats
POST   /:userId/saved-routes - Add saved route
DELETE /:userId/saved-routes/:routeId - Remove saved route
PUT    /:userId/preferences - Update user preferences
GET    /:userId/dashboard - Get user dashboard data
DELETE /:userId           - Delete user account
```

#### Bus Management (`/api/buses`)
```
GET    /                  - Get all buses (with filters)
GET    /:busId            - Get single bus details
POST   /                  - Create new bus (operators/admins)
PUT    /:busId            - Update bus details
PUT    /:busId/location   - Update bus GPS location
GET    /:busId/seats      - Get seat availability
POST   /:busId/reviews    - Add bus review
GET    /:busId/reviews    - Get bus reviews
DELETE /:busId            - Delete bus (soft delete)
```

#### Route Management (`/api/routes`)
```
GET    /search            - Search routes between cities
GET    /                  - Get all routes
GET    /popular           - Get popular routes
GET    /:routeId          - Get route details
POST   /                  - Create new route
PUT    /:routeId          - Update route
POST   /:routeId/rating   - Add route rating
GET    /:routeId/schedules - Get route schedules
GET    /:routeId/analytics - Get route analytics
DELETE /:routeId          - Delete route
```

#### Booking System (`/api/bookings`)
```
POST   /                  - Create new booking
GET    /my-bookings       - Get user bookings
GET    /:bookingId        - Get booking details
PUT    /:bookingId/payment - Update payment status
PUT    /:bookingId/cancel - Cancel booking
PUT    /:bookingId/checkin - Check-in passenger
POST   /:bookingId/feedback - Add trip feedback
GET    /stats/overview    - Get booking statistics
GET    /:bookingId/ticket - Generate ticket/receipt
```

#### Real-time Tracking (`/api/tracking`)
```
GET    /bus/:busId/location - Get real-time bus location
PUT    /bus/:busId/location - Update bus location
GET    /booking/:bookingId/track - Track trip progress
GET    /buses/nearby      - Get nearby buses
PUT    /bus/:busId/tracking - Toggle bus tracking
GET    /bus/:busId/history - Get location history
```

#### Notifications (`/api/notifications`)
```
GET    /                  - Get user notifications
PUT    /:notificationId/read - Mark as read
PUT    /mark-all-read     - Mark all as read
DELETE /:notificationId   - Delete notification
POST   /broadcast         - Broadcast to all users (admin)
POST   /send              - Send custom notification (admin)
GET    /settings          - Get notification settings
PUT    /settings          - Update notification settings
```

#### Analytics (`/api/analytics`)
```
GET    /dashboard         - Dashboard analytics (admin)
GET    /revenue           - Revenue analytics
GET    /users             - User analytics
GET    /bookings          - Booking analytics
GET    /operator/:operatorId - Operator analytics
GET    /routes            - Route analytics
GET    /export            - Export analytics data
```

#### Admin Management (`/api/admin`)
```
GET    /dashboard         - Admin dashboard stats
GET    /users             - User management
PUT    /users/:userId     - Update user
DELETE /users/:userId     - Delete user
GET    /bookings          - Booking management
PUT    /bookings/:bookingId - Update booking
GET    /settings          - System settings
PUT    /settings          - Update settings
GET    /analytics/revenue - Revenue reports
GET    /export/:type      - Export data
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "user_id",
  "role": "user|operator|admin",
  "iat": 1703123456,
  "exp": 1703123456
}
```

### Role-based Access Control
- **User** - Basic booking and profile management
- **Operator** - Bus and route management for owned vehicles
- **Admin** - Full system access and management

### Authentication Flow
1. User registers/logs in with credentials
2. Server validates and returns JWT token
3. Client includes token in Authorization header
4. Server validates token on protected routes
5. Refresh token system for extended sessions

## 📊 Database Schema

### Key Relationships
- Users have many Bookings
- Buses belong to Operators (Users)
- Routes have many Buses
- Bookings reference User, Bus, and Route

### Indexing Strategy
- Compound indexes on frequently queried fields
- Geospatial indexes for location-based queries
- Text indexes for search functionality

## 🚌 Real-time Features

### GPS Tracking
- Real-time location updates from bus operators
- Location history and route optimization
- Geofencing for stop notifications

### Live Updates
- Seat availability in real-time
- Bus delay notifications
- Dynamic pricing based on demand

## 💳 Payment Integration

### Supported Methods
- Cash on boarding
- Mobile payments (eSewa, Khalti)
- Bank transfers
- Digital wallets
- Credit/Debit cards

### Payment Flow
1. Booking creation with pending payment
2. Payment method selection
3. Payment processing and verification
4. Booking confirmation and ticket generation

## 📧 Notification System

### Notification Types
- **Booking Confirmation** - Immediate booking confirmation
- **Journey Reminders** - 24 hours before travel
- **Boarding Alerts** - 30 minutes before departure
- **Payment Reminders** - For pending payments
- **System Announcements** - Important updates

### Delivery Channels
- In-app notifications
- Email notifications
- SMS alerts
- Push notifications (mobile app)

## 📈 Analytics & Reports

### Business Intelligence
- Revenue tracking and forecasting
- User behavior analysis
- Route performance metrics
- Operational efficiency reports

### Key Metrics
- Daily/Monthly revenue
- User acquisition and retention
- Booking conversion rates
- Bus utilization rates
- Route popularity trends

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (v5+)
- NPM/Yarn

### Environment Variables
```bash
MONGODB_URI=mongodb+srv://busniyojak:busniyojak@busniyojak.zfxad14.mongodb.net/?retryWrites=true&w=majority&appName=BusNiyojak
JWT_SECRET=your-super-secret-jwt-key-for-busniyojak-2024
PORT=5000
```

### Installation
```bash
cd backend
npm install
npm start
```

### Development
```bash
npm run dev  # Run with nodemon for auto-restart
```

## 🧪 Testing

### API Testing
Use tools like Postman or curl to test endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# User registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"9876543210","password":"password123"}'

# User login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"john@example.com","password":"password123"}'
```

## 🚀 Deployment

### Production Considerations
- Use PM2 for process management
- Set up MongoDB replica sets
- Configure proper logging
- Implement rate limiting
- Set up monitoring and alerts

### Environment Setup
- Configure production MongoDB cluster
- Set secure JWT secrets
- Enable CORS for frontend domains
- Set up SSL certificates

## 📋 API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... },
  "pagination": { ... } // For paginated responses
}
```

### Error Response
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": { ... } // Optional additional details
  }
}
```

## 🔍 Common Error Codes

- `AUTH_REQUIRED` - Authentication required
- `ACCESS_DENIED` - Insufficient permissions
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Duplicate data conflict
- `RATE_LIMIT_EXCEEDED` - Too many requests

## 📞 Support

For technical support or questions:
- Email: support@busniyojak.com
- Phone: +977-1-4567890

## 📄 License

MIT License - See LICENSE file for details

---

**Bus नियोजक Backend v1.0.0**  
*Connecting Nepal, One Journey at a Time* 🇳🇵

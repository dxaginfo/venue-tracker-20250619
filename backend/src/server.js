require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth.routes');
const venueRoutes = require('./routes/venue.routes');
const contactRoutes = require('./routes/contact.routes');
const bookingRoutes = require('./routes/booking.routes');
const communicationRoutes = require('./routes/communication.routes');
const ratingRoutes = require('./routes/rating.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const userRoutes = require('./routes/user.routes');

// Import middleware
const { errorHandler } = require('./middleware/error.middleware');
const { authMiddleware } = require('./middleware/auth.middleware');

// Import socket service
const { setupSocketService } = require('./services/socket.service');

// Import API documentation
const { setupSwagger } = require('./utils/swagger');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Set up socket service
setupSocketService(io);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API documentation
setupSwagger(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/venues', authMiddleware, venueRoutes);
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/bookings', authMiddleware, bookingRoutes);
app.use('/api/communications', authMiddleware, communicationRoutes);
app.use('/api/ratings', authMiddleware, ratingRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/users', authMiddleware, userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // In production, we might want to exit the process and let a process manager restart it
  // process.exit(1);
});

module.exports = { app, server };
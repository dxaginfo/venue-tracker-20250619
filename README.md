# Venue Relationship Tracker

A comprehensive web application for music industry professionals to track and manage their relationships with venues.

## Overview

The Venue Relationship Tracker helps music industry professionals centralize and optimize their venue relationships by tracking communications, bookings, performance history, and other critical data points.

## Features

- **Venue Management**: Create, view, edit, and archive venue profiles
- **Contact Management**: Maintain a database of venue contacts with roles and communication preferences
- **Booking History**: Log and view all past, current, and future bookings with venues
- **Communication Tracker**: Record all communications with venue representatives
- **Performance Notes**: Document details about each performance including attendance, issues, and successes
- **Venue Rating System**: Rate venues based on multiple factors (professionalism, payment promptness, audience quality)
- **Revenue Tracking**: Record financial details of each booking
- **Search and Filter**: Advanced search capabilities across all venue data
- **Reporting and Analytics**: Generate reports and visualizations of venue relationships and performance metrics
- **Integration Capabilities**: Connect with calendar apps, email, and other music industry tools
- **Collaborative Access**: Team-based access with role permissions
- **Mobile Responsiveness**: Fully functional mobile interface
- **Media Library**: Store photos, videos, and documents related to each venue

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux for global state management
- Material-UI for responsive design components
- Chart.js for analytics dashboards
- Google Maps API for venue location visualization

### Backend
- Node.js with Express.js
- RESTful API architecture
- JWT (JSON Web Tokens) for secure authentication
- Socket.io for real-time notifications

### Database
- PostgreSQL for relational data storage
- Redis for performance optimization
- Elasticsearch for advanced search capabilities

### DevOps & Deployment
- Docker
- GitHub Actions
- AWS (EC2, S3, RDS)
- Sentry for error tracking, New Relic for performance monitoring

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Docker and Docker Compose
- PostgreSQL (v14 or higher)
- Redis (v6 or higher)
- AWS account (for production deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/venue-tracker-20250619.git
   cd venue-tracker-20250619
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables with your configuration

5. Start the development environment:
   ```bash
   # In the root directory
   docker-compose up -d
   ```

6. Run database migrations:
   ```bash
   cd backend
   npm run migrate
   ```

7. Start the development servers:
   ```bash
   # For backend
   cd backend
   npm run dev
   
   # For frontend (in a separate terminal)
   cd frontend
   npm start
   ```

8. Access the application at `http://localhost:3000`

### Production Deployment

1. Build the Docker images:
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. Deploy to AWS:
   ```bash
   # Using AWS CLI
   aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-aws-account-id.dkr.ecr.your-region.amazonaws.com
   docker-compose -f docker-compose.prod.yml push
   ```

3. Configure your AWS ECS or Elastic Beanstalk to use the pushed images

## Project Structure

```
venue-tracker-20250619/
├── backend/                # Node.js Express backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── db/             # Database models and migrations
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── app.js          # Express application setup
│   ├── tests/              # Backend tests
│   └── package.json
├── frontend/               # React.js frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux state management
│   │   ├── services/       # API service calls
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Root component
│   │   └── index.tsx       # Entry point
│   ├── tests/              # Frontend tests
│   └── package.json
├── docker-compose.yml      # Development Docker setup
├── docker-compose.prod.yml # Production Docker setup
└── README.md
```

## API Documentation

The API documentation is available at `/api/docs` when running the application. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/dxaginfo/venue-tracker-20250619](https://github.com/dxaginfo/venue-tracker-20250619)
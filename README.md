# Venue Relationship Tracker

A comprehensive web application for music industry professionals to efficiently track and manage their relationships with venues.

## Project Overview

The Venue Relationship Tracker helps music industry professionals solve common challenges:

- **Information Centralization**: Store all venue data in one place
- **Contact Management**: Keep track of venue staff and their roles
- **Booking History**: Maintain records of past and upcoming bookings
- **Performance Notes**: Document venue experiences for future reference
- **Communication Tracking**: Log all interactions with venue representatives

## Features

### Core Features

- **Venue Management**: Create detailed venue profiles with location, capacity, and amenities
- **Contact Management**: Store venue staff information with roles and communication preferences
- **Booking History**: Track all past and upcoming bookings with payment details
- **Performance Notes**: Record venue experiences including sound quality and audience
- **Venue Rating System**: Rate venues on multiple factors (sound, staff, etc.)
- **Communication Tracker**: Log all interactions with venue representatives
- **Search and Reporting**: Generate reports and search across all venue data
- **Mobile Responsiveness**: Access the application from any device

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux for global state management
- Material-UI for responsive design
- Chart.js for analytics dashboards
- Google Maps API for venue location visualization

### Backend
- Node.js with Express.js
- RESTful API architecture
- JWT authentication
- Socket.io for real-time notifications

### Database
- PostgreSQL for relational data
- Redis for caching
- Elasticsearch for advanced search

### DevOps
- Docker containerization
- GitHub Actions for CI/CD
- AWS cloud infrastructure (EC2, S3, RDS)

## Setup and Installation

### Prerequisites
- Node.js (v16+)
- Docker and Docker Compose
- PostgreSQL
- Redis

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/dxaginfo/venue-tracker-20250619.git
cd venue-tracker-20250619
```

2. Install dependencies:
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
```bash
# In backend directory
cp .env.example .env
# Edit .env with your database credentials and other settings

# In frontend directory
cp .env.example .env
# Edit .env with API URL and other frontend settings
```

4. Start development environment with Docker:
```bash
# From project root
docker-compose up -d
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api-docs

### Production Deployment

1. Build and start production containers:
```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

2. Setup Nginx as a reverse proxy (recommended)

3. Configure SSL certificates for secure access

## Database Schema

The application uses the following core tables:

- **venues**: Store venue details (name, location, capacity, amenities)
- **contacts**: Track venue staff information
- **bookings**: Record booking history and details
- **communications**: Log all interactions with venues
- **ratings**: Store venue ratings and reviews
- **users**: Manage application users and authentication

See the database migration files for detailed schema information.

## API Documentation

The API documentation is available at `/api-docs` when running the application. Key endpoints include:

- `/api/auth`: Authentication and user management
- `/api/venues`: Venue CRUD operations
- `/api/contacts`: Contact management
- `/api/bookings`: Booking history
- `/api/communications`: Communication logs
- `/api/ratings`: Venue ratings
- `/api/analytics`: Reporting and analytics

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was developed as part of the Music Industry Web App Development initiative.
- Thanks to all the musicians and industry professionals who provided requirements and feedback.
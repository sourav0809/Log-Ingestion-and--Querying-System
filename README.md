# Loglyzer - Log Ingestion and Querying System

A modern, full-stack application for ingesting and querying system logs with real-time filtering capabilities.

## Live Demo

- Frontend: [https://loglyzer.devsourav.online](https://loglyzer.devsourav.online)
- API: [https://loglyzerapi.devsourav.online/api](https://loglyzerapi.devsourav.online/api)

## Overview

Loglyzer is a robust log management system that allows you to:

- Ingest logs with structured data
- Query logs with multiple filter criteria
- View logs in a beautiful, responsive UI
- Filter logs by level, message, resource ID, and more

## Features

- [x] Log ingestion with validation
- [x] Multi-criteria log querying
- [x] Beautiful UI with dark mode support
- [x] Responsive design
- [x] Type-safe implementation
- [x] Error handling and validation
- [x] Production-ready build setup

## Tech Stack

### Backend

- Node.js + Express
- TypeScript
- Joi (validation)
- Winston (logging)
- Express Validator
- File-based storage with JSON
- PM2 for process management

### Frontend

- React 19
- TypeScript
- Vite
- TailwindCSS
- Radix UI Components
- Axios

## Project Setup

### Prerequisites

- Node.js (v18)
- npm
- Git

### Environment Variables

Before starting the application, you need to set up environment variables for both backend and frontend.

#### Backend (.env)

Create a `.env` file in the `Server` directory:

```env
PORT=8001
NODE_ENV=development
```

#### Frontend (.env)

Create a `.env` file in the `Client` directory:

```env
VITE_API_URL="http://localhost:8001/api"
```

### Installation & Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sourav0809/Log-Ingestion-and-Querying-System.git
   ```

2. Setup Backend:

   ```bash
   # Navigate to Server directory
   cd Server

   # Install dependencies
   npm install

   # Create .env file (as shown above)
   cp .env.example .env  # if .env.example exists, or create manually

   # Start development server
   npm run dev
   ```

   The backend server will be running at: `http://localhost:8001`

3. Setup Frontend:

   ```bash
   # Navigate to Client directory
   cd Client

   # Install dependencies
   npm install

   # Create .env file (as shown above)
   cp .env.example .env  # if .env.example exists, or create manually

   # Start development server
   npm run dev
   ```

   The frontend application will be running at: `http://localhost:5173`

### Accessing the Application

Once both servers are running, you can access:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8001/api](http://localhost:8001/api)

> Note: Make sure both backend and frontend servers are running simultaneously for the application to work properly.

## API Reference

### POST /logs

Ingest a new log entry.

#### Request Body

```json
{
  "level": "error" | "warn" | "info" | "debug",
  "message": "string",
  "resourceId": "string",
  "timestamp": "ISO-8601 date string",
  "traceId": "string",
  "spanId": "string",
  "commit": "string",
  "metadata": {
    [key: string]: any
  }
}
```

#### Response

```json
{
  "success": true,
  "message": "Log created successfully",
  "data": {
    // Log entry data
  }
}
```

### GET /logs

Query logs with filters.

#### Query Parameters

- `level`: Log level filter
- `message`: Search in log messages
- `resourceId`: Filter by resource ID
- `timestamp_start`: Start date (ISO-8601)
- `timestamp_end`: End date (ISO-8601)
- `traceId`: Filter by trace ID
- `spanId`: Filter by span ID
- `commit`: Filter by commit hash

#### Response

```json
{
  "success": true,
  "message": "Logs fetched successfully",
  "data": [
    // Array of log entries
  ]
}
```

## Architecture and Design

### Project Structure

```
├── Client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│
└── Server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── middleware/   # Express middleware
    │   ├── services/     # Business logic
    │   ├── types/        # TypeScript types
    │   ├── utils/        # Utility functions
    │   └── validation/   # Request validation
```

### Design Decisions and Trade-offs

1. **Storage Solution**

   - Currently using file-based JSON storage for simplicity
   - Trade-off: Not suitable for high-volume production use
   - Future improvement: Implement database storage

2. **Frontend Architecture**

   - Component-based structure with shared UI components
   - Custom hooks for data fetching and state management
   - Responsive design with TailwindCSS

3. **API Design**
   - RESTful endpoints with consistent response format
   - Comprehensive validation using Joi
   - Error handling middleware

## Deployment

The application is deployed on AWS with Github CI/CD

- Automatic builds on push to master branch
- Separate workflows for frontend and backend

# Log Ingestion and Querying System

A modern full-stack application for ingesting and querying logs with real-time filtering capabilities.

## 🚀 Features

- **Backend**

  - RESTful API with TypeScript and Express
  - File-based JSON storage
  - Advanced filtering and search capabilities
  - Proper error handling and validation

- **Frontend**
  - Modern React with TypeScript
  - Real-time filtering
  - Responsive design with Tailwind CSS
  - Clean and intuitive UI

## 🛠️ Tech Stack

### Backend

- Node.js
- TypeScript
- Express
- File system-based storage

### Frontend

- React
- TypeScript
- Tailwind CSS
- Axios

## 📦 Project Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will start on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at `http://localhost:5173`

## 🔍 API Endpoints

### POST /logs

- Ingests a single log entry
- Requires a JSON body matching the Log interface
- Returns 201 on success

### GET /logs

- Retrieves logs with optional filters
- Query Parameters:
  - level: Log level filter
  - message: Case-insensitive text search
  - resourceId: Resource identifier
  - timestamp_start: Start date (ISO format)
  - timestamp_end: End date (ISO format)
  - traceId: Trace identifier
  - spanId: Span identifier
  - commit: Commit hash

## 📝 Log Schema

```typescript
interface Log {
  level: "error" | "warn" | "info" | "debug";
  message: string;
  resourceId: string;
  timestamp: string; // ISO 8601
  traceId: string;
  spanId: string;
  commit: string;
  metadata: Record<string, any>;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

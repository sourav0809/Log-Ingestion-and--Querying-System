import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logRoutes from "./routes/logRoutes";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(helmet());
app.use(cors());
// app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", logRoutes);

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Healthy",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route Not Found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

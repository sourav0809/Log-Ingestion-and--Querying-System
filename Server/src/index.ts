/* eslint-disable no-console */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import logRoutes from "./routes/logRoutes";
import { config } from "dotenv";
import { notFound } from "./middleware/common.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { envConfig } from "./config/envConfig";

config();

const app = express();
const PORT = envConfig.port;

// Middleware

app.use(helmet());
app.use(cors());

// app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", logRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Healthy",
  });
});

app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

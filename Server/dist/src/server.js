"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// app.use(morgan("dev"));
app.use(express_1.default.json());
// Routes
app.use("/api", logRoutes_1.default);
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: "Internal Server Error",
    });
});
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
exports.default = app;

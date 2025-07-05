"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const storage_1 = require("../utils/storage");
const log_1 = require("../types/log");
class LogController {
    static async createLog(req, res) {
        try {
            const validatedLog = log_1.LogSchema.parse(req.body);
            await storage_1.StorageManager.addLog(validatedLog);
            return res.status(201).json({
                success: true,
                data: validatedLog,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    success: false,
                    error: error.message,
                });
            }
            return res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    }
    static async getLogs(req, res) {
        try {
            const queryParams = {
                level: req.query.level,
                message: req.query.message,
                resourceId: req.query.resourceId,
                timestamp_start: req.query.timestamp_start,
                timestamp_end: req.query.timestamp_end,
                traceId: req.query.traceId,
                spanId: req.query.spanId,
                commit: req.query.commit,
            };
            const logs = await storage_1.StorageManager.queryLogs(queryParams);
            return res.status(200).json({
                success: true,
                data: logs,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    }
}
exports.LogController = LogController;

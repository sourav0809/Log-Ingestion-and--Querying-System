import { Request, Response } from "express";
import { StorageManager } from "../utils/storage";
import { LogSchema, LogQueryParams } from "../types/log";

export class LogController {
  static async createLog(req: Request, res: Response) {
    try {
      const validatedLog = LogSchema.parse(req.body);
      await StorageManager.addLog(validatedLog);
      return res.status(201).json({
        success: true,
        data: validatedLog,
      });
    } catch (error) {
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

  static async getLogs(req: Request, res: Response) {
    try {
      const queryParams: LogQueryParams = {
        level: req.query.level as any,
        message: req.query.message as string,
        resourceId: req.query.resourceId as string,
        timestamp_start: req.query.timestamp_start as string,
        timestamp_end: req.query.timestamp_end as string,
        traceId: req.query.traceId as string,
        spanId: req.query.spanId as string,
        commit: req.query.commit as string,
      };

      const logs = await StorageManager.queryLogs(queryParams);
      return res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
}

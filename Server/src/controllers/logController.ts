import { Request, Response } from "express";
import { LogSchema, LogQueryParams } from "../types/log";
import catchAsync from "../utils/catchAsync";
import { response } from "../utils/response";
import httpStatus from "http-status";
import { logService } from "../services/logService";

const createLog = catchAsync(async (req: Request, res: Response) => {
  const validatedLog = LogSchema.parse(req.body);
  await logService.addLog(validatedLog);
  return response(
    res,
    httpStatus.CREATED,
    "Log created successfully",
    validatedLog
  );
});

const getLogs = catchAsync(async (req: Request, res: Response) => {
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

  const logs = await logService.queryLogs(queryParams);
  return response(res, httpStatus.OK, "Logs fetched successfully", logs);
});

export const logController = {
  createLog,
  getLogs,
};

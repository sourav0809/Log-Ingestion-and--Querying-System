import { z } from "zod";

export const LogLevel = z.enum(["error", "warn", "info", "debug"]);
export type LogLevel = z.infer<typeof LogLevel>;

export const LogSchema = z.object({
  level: LogLevel,
  message: z.string().min(1),
  resourceId: z.string().min(1),
  timestamp: z.string().datetime({ offset: true }),
  traceId: z.string().min(1),
  spanId: z.string().min(1),
  commit: z.string().min(1),
  metadata: z.record(z.string(), z.any()),
});

export type Log = z.infer<typeof LogSchema>;

export interface LogQueryParams {
  level?: LogLevel;
  message?: string;
  resourceId?: string;
  timestamp_start?: string;
  timestamp_end?: string;
  traceId?: string;
  spanId?: string;
  commit?: string;
}

export interface LogResponse {
  success: boolean;
  data?: Log | Log[];
  error?: string;
}

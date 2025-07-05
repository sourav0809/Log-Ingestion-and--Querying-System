export type LogLevel = "error" | "warn" | "info" | "debug";

export interface Log {
  level: LogLevel;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: Record<string, any>;
}

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

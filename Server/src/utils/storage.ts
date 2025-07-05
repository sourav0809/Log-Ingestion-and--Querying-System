import fs from "fs/promises";
import path from "path";
import { Log, LogQueryParams } from "../types/log";

const LOGS_FILE = path.join(__dirname, "../../logs.json");

export class StorageManager {
  private static async ensureFile(): Promise<void> {
    try {
      await fs.access(LOGS_FILE);
    } catch {
      await fs.writeFile(LOGS_FILE, JSON.stringify([]));
    }
  }

  static async readLogs(): Promise<Log[]> {
    await this.ensureFile();
    const data = await fs.readFile(LOGS_FILE, "utf-8");
    return JSON.parse(data);
  }

  static async writeLogs(logs: Log[]): Promise<void> {
    await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2));
  }

  static async addLog(log: Log): Promise<void> {
    const logs = await this.readLogs();
    logs.push(log);
    await this.writeLogs(logs);
  }

  static async queryLogs(params: LogQueryParams): Promise<Log[]> {
    const logs = await this.readLogs();

    return logs
      .filter((log) => {
        const matchIncludes = (field?: string, value?: string) =>
          !value ||
          (field && field.toLowerCase().includes(value.toLowerCase()));

        if (!matchIncludes(log.level, params.level)) return false;
        if (!matchIncludes(log.message, params.message)) return false;
        if (!matchIncludes(log.resourceId, params.resourceId)) return false;
        if (!matchIncludes(log.traceId, params.traceId)) return false;
        if (!matchIncludes(log.spanId, params.spanId)) return false;
        if (!matchIncludes(log.commit, params.commit)) return false;

        const timestamp = new Date(log.timestamp).getTime();

        if (params.timestamp_start) {
          const startTime = new Date(params.timestamp_start).getTime();
          if (timestamp < startTime) return false;
        }

        if (params.timestamp_end) {
          const endTime = new Date(params.timestamp_end).getTime();
          if (timestamp > endTime) return false;
        }

        return true;
      })
      .sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
  }
}

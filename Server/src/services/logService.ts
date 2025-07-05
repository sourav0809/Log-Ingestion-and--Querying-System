import fs from "fs/promises";
import path from "path";
import { Log, LogQueryParams } from "../types/log";
import { containsIgnoreCase } from "../utils/common";

const LOGS_FILE = path.join(__dirname, "../../logs.json");

/**
 * Ensure the log file exists and is empty if it does not.
 *
 * This function is used internally to ensure the log file exists and is empty
 * before writing logs to it.
 *
 **/
async function ensureFile(): Promise<void> {
  try {
    await fs.access(LOGS_FILE);
  } catch {
    await fs.writeFile(LOGS_FILE, JSON.stringify([]));
  }
}

/**
 * Read the logs from the log file.
 *
 * This function ensures the log file exists, reads its contents, and parses the
 * data into a collection of log objects.
 *
 * @returns A promise that resolves to an array of log objects.
 */
async function readLogs(): Promise<Log[]> {
  await ensureFile();
  const data = await fs.readFile(LOGS_FILE, "utf-8");
  return JSON.parse(data);
}

/**
 * Write the given log collection to the log file.
 *
 * This function will overwrite the entire log file with the given collection.
 *
 * @param logs The log collection to write to the file.
 */
async function writeLogs(logs: Log[]): Promise<void> {
  await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2));
}

/**
 * Add a log to the log collection.
 *
 * This function will read the logs from the log file, append the given log, and
 * then write the updated log collection back to the log file.
 *
 * @param log The log to add to the collection.
 */
async function addLog(log: Log): Promise<void> {
  const logs = await readLogs();
  logs.push(log);
  await writeLogs(logs);
}

/**
 * Query logs based on the given filter parameters.
 *
 * This function will first filter out logs that do not match the given
 * filter parameters. The filter parameters are "inclusive", meaning that
 * if the value of the parameter is undefined or an empty string, it will
 * not be used to filter the logs.
 *
 * After filtering, the logs will be sorted in descending order by
 * timestamp.
 *
 * @param {LogQueryParams} params The filter parameters to apply to the
 *   logs. See the definition of `LogQueryParams` for more information.
 *
 * @returns {Promise<Log[]>} A promise that resolves with the filtered and
 *   sorted logs.
 */
async function queryLogs(params: LogQueryParams): Promise<Log[]> {
  const logs = await readLogs();

  return logs
    .filter((log) => {
      if (!containsIgnoreCase(log.level, params.level)) return false;
      if (!containsIgnoreCase(log.message, params.message)) return false;
      if (!containsIgnoreCase(log.resourceId, params.resourceId)) return false;
      if (!containsIgnoreCase(log.traceId, params.traceId)) return false;
      if (!containsIgnoreCase(log.spanId, params.spanId)) return false;
      if (!containsIgnoreCase(log.commit, params.commit)) return false;

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
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
}

export const logService = {
  readLogs,
  writeLogs,
  addLog,
  queryLogs,
};

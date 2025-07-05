"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageManager = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const LOGS_FILE = path_1.default.join(__dirname, "../../logs.json");
class StorageManager {
    static async ensureFile() {
        try {
            await promises_1.default.access(LOGS_FILE);
        }
        catch {
            await promises_1.default.writeFile(LOGS_FILE, JSON.stringify([]));
        }
    }
    static async readLogs() {
        await this.ensureFile();
        const data = await promises_1.default.readFile(LOGS_FILE, "utf-8");
        return JSON.parse(data);
    }
    static async writeLogs(logs) {
        await promises_1.default.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2));
    }
    static async addLog(log) {
        const logs = await this.readLogs();
        logs.push(log);
        await this.writeLogs(logs);
    }
    static async queryLogs(params) {
        const logs = await this.readLogs();
        return logs
            .filter((log) => {
            const matchIncludes = (field, value) => !value ||
                (field && field.toLowerCase().includes(value.toLowerCase()));
            if (!matchIncludes(log.level, params.level))
                return false;
            if (!matchIncludes(log.message, params.message))
                return false;
            if (!matchIncludes(log.resourceId, params.resourceId))
                return false;
            if (!matchIncludes(log.traceId, params.traceId))
                return false;
            if (!matchIncludes(log.spanId, params.spanId))
                return false;
            if (!matchIncludes(log.commit, params.commit))
                return false;
            const timestamp = new Date(log.timestamp).getTime();
            if (params.timestamp_start) {
                const startTime = new Date(params.timestamp_start).getTime();
                if (timestamp < startTime)
                    return false;
            }
            if (params.timestamp_end) {
                const endTime = new Date(params.timestamp_end).getTime();
                if (timestamp > endTime)
                    return false;
            }
            return true;
        })
            .sort((a, b) => {
            return (new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        });
    }
}
exports.StorageManager = StorageManager;

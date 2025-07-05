"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSchema = exports.LogLevel = void 0;
const zod_1 = require("zod");
exports.LogLevel = zod_1.z.enum(["error", "warn", "info", "debug"]);
exports.LogSchema = zod_1.z.object({
    level: exports.LogLevel,
    message: zod_1.z.string().min(1),
    resourceId: zod_1.z.string().min(1),
    timestamp: zod_1.z.string().datetime({ offset: true }),
    traceId: zod_1.z.string().min(1),
    spanId: zod_1.z.string().min(1),
    commit: zod_1.z.string().min(1),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
});

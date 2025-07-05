import Joi from "joi";
import { JoiValidationSchema } from "../types/common";

/**
 * Log ingestion schema
 * @type {Joi.ObjectSchema}
 */
export const createLogsSchema: JoiValidationSchema = {
  body: Joi.object().keys({
    level: Joi.string().valid("error", "warn", "info", "debug").required(),
    message: Joi.string().required(),
    resourceId: Joi.string().required(),
    timestamp: Joi.string().isoDate().required(),
    traceId: Joi.string().required(),
    spanId: Joi.string().required(),
    commit: Joi.string().required(),
    metadata: Joi.object().required(),
  }),
};

/**
 * Log query (filter) schema
 * @type {Joi.ObjectSchema}
 */
export const getLogsSchema: JoiValidationSchema = {
  query: Joi.object().keys({
    level: Joi.string().valid("error", "warn", "info", "debug"),
    message: Joi.string(),
    resourceId: Joi.string(),
    timestamp_start: Joi.string().isoDate(),
    timestamp_end: Joi.string().isoDate(),
    traceId: Joi.string(),
    spanId: Joi.string(),
    commit: Joi.string(),
  }),
};

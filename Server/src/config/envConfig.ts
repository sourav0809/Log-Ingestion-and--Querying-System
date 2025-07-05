import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(8001),
  })
  .unknown();

const { value, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

interface EnvConfig {
  nodeEnv: string;
  port: number;
}

export const envConfig: EnvConfig = {
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
};

import axios from "axios";
import type { Log, LogQueryParams } from "../types/log";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const API_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const LogService = {
  async createLog(log: Log): Promise<ApiResponse<Log>> {
    try {
      const response = await api.post<ApiResponse<Log>>("/logs", log);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || "Failed to create log",
        };
      }
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  },

  async getLogs(params: LogQueryParams): Promise<ApiResponse<Log[]>> {
    try {
      const response = await api.get<ApiResponse<Log[]>>("/logs", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || "Failed to fetch logs",
        };
      }
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  },
};

import axios from "axios";
import type { Log, LogQueryParams } from "../types/log";
import toast from "react-hot-toast";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || error.message;
    }
    toast.error(message);
    return Promise.reject(error);
  }
);

export const LogService = {
  async createLog(log: Log): Promise<ApiResponse<Log>> {
    try {
      const response = await api.post<ApiResponse<Log>>("/logs", log);
      if (response.data.success) {
        toast.success("Log created successfully");
      }
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
      // Clean up undefined values from params
      const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== "") {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

      const response = await api.get<ApiResponse<Log[]>>("/logs", {
        params: cleanParams,
      });
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

import axios, { AxiosError, type AxiosResponse } from "axios";
import toast from "react-hot-toast";
import type { Log, LogQueryParams } from "@/types/log";
import { getErrorMessage } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL;

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    toast.error(getErrorMessage(error));
    return Promise.reject(error);
  }
);

// Extract data from response
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// Generic HTTP methods
const requests = {
  get: <T>(url: string, params?: Record<string, unknown>) =>
    axiosInstance.get<T>(url, { params }).then(responseBody),
  post: <T, B>(url: string, body: B) =>
    axiosInstance.post<T>(url, body).then(responseBody),
};

const Logs = {
  createLogs: (log: Log) =>
    requests.post<ApiResponse<Log>, Log>("/logs/create", log),

  getAllLogs: (params: LogQueryParams) => {
    const cleanedParams = Object.entries(params).reduce((acc, [key, val]) => {
      if (val !== undefined && val !== "") acc[key] = val;
      return acc;
    }, {} as Record<string, string>);

    return requests.get<ApiResponse<Log[]>>("/logs/get", cleanedParams);
  },
};

// Export the log agent
const logAgent = {
  Logs,
};

export default logAgent;

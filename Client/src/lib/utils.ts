import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes
 * intelligently to prevent conflicts and redundancies.
 *
 * @param inputs - A variable number of class name arguments, which can be strings
 * or objects with boolean values indicating whether to include the class.
 * @returns A single merged string of class names.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string | { message?: string };
      data?: {
        message?: string;
      };
    };
  };
  message?: string;
}

/**
 * Extracts a meaningful error message from an error object.
 *
 * @param error - The error object to extract a message from.
 * @returns A human-readable error message, or a default message if none is found.
 *
 * This function is useful for converting error objects into strings that can be
 * displayed to users. It is opinionated about what makes a good error message,
 * but should work for most cases. If the error object has a `response.data`
 * property with a `message` string, that is used. If the error object itself has
 * a `message` string, that is used. If the error object has a `response.data.data`
 * property with a `message` string, that is used. Finally, if none of the above
 * are present, a default error message is returned.
 */
export const getErrorMessage = (error: unknown): string => {
  const err = error as ErrorResponse;
  return (
    (typeof err?.response?.data?.message === "object"
      ? err.response.data.message?.message
      : err.response?.data?.message) ||
    err?.message ||
    err?.response?.data?.data?.message ||
    "An unexpected error occurred. Please try again later."
  );
};

/**
 * Returns a Tailwind CSS style object for a given log level.
 *
 * @param level - The log level to get the style for.
 * @returns A style object with a `variant` and `className` property.
 *
 * The returned style object can be spread onto a component to apply the
 * correct background and text colors for the log level.
 *
 * @example
 * const style = getLogLevelStyle("error");
 * return <div style={style}>This is an error message</div>;
 */
export const getLogLevelStyle = (level: string) => {
  switch (level.toLowerCase()) {
    case "error":
      return {
        variant: "destructive" as const,
        className:
          "bg-red-500 text-red-500 hover:bg-red-700 text-white text-xs",
      };
    case "warn":
      return {
        variant: "default" as const,
        className: "bg-yellow-500 text-white hover:bg-yellow-800 text-xs",
      };
    case "info":
      return {
        variant: "default" as const,
        className: "bg-blue-500 text-white hover:bg-blue-800 text-xs",
      };
    case "debug":
      return {
        variant: "default" as const,
        className: "bg-purple-500 text-white hover:bg-purple-800 text-xs",
      };
    default:
      return {
        variant: "secondary" as const,
        className: " text-xs",
      };
  }
};

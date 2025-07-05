import { Calendar, Search } from "lucide-react";
import type { LogQueryParams } from "../types/log";

export interface FilterFieldConfig {
  key: keyof LogQueryParams;
  label: string;
  placeholder?: string;
  type?: string;
  icon: React.ElementType;
}

export const filterFieldConfig: FilterFieldConfig[] = [
  {
    key: "message",
    label: "Message",
    placeholder: "Search messages...",
    icon: Search,
  },
  {
    key: "resourceId",
    label: "Resource ID",
    placeholder: "Filter by resource...",
    icon: Search,
  },
  {
    key: "timestamp_start",
    label: "Start Date",
    type: "datetime-local",
    icon: Calendar,
  },
  {
    key: "timestamp_end",
    label: "End Date",
    type: "datetime-local",
    icon: Calendar,
  },
  {
    key: "commit",
    label: "Commit",
    placeholder: "Filter by commit...",
    icon: Search,
  },
  {
    key: "traceId",
    label: "Trace ID",
    placeholder: "Filter by trace ID...",
    icon: Search,
  },
  {
    key: "spanId",
    label: "Span ID",
    placeholder: "Filter by span ID...",
    icon: Search,
  },
];

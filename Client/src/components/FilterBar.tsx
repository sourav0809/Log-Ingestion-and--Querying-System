import React, { useCallback } from "react";
import type { LogLevel, LogQueryParams } from "../types/log";
import { Input } from "@/components/common/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { Button } from "@/components/common/ui/button";
import { Card } from "@/components/common/ui/card";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  X,
  Settings2,
  Search,
  RefreshCw,
  Calendar,
} from "lucide-react";

interface FilterBarProps {
  filters: LogQueryParams;
  onFilterChange: (filters: LogQueryParams) => void;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const LOG_LEVELS: LogLevel[] = ["error", "warn", "info", "debug"];

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onRefresh,
  isLoading,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleChange = useCallback(
    (field: keyof LogQueryParams, value: string) => {
      onFilterChange({
        ...filters,
        [field]: value || undefined,
      });
    },
    [filters, onFilterChange]
  );

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 cursor-pointer"
            >
              {isExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronUp className="h-5 w-5" />
              )}
            </Button>
            <h2 className="text-xl font-medium">Log Filters</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 text-sm cursor-pointer"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="h-8 text-sm cursor-pointer"
            >
              <RefreshCw
                className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Settings2 className="size-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">Log Level</span>
            </div>
            <Select
              value={filters.level || "all"}
              onValueChange={(value) =>
                handleChange(
                  "level",
                  value === "all" ? "" : (value as LogLevel)
                )
              }
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">
                  All Levels
                </SelectItem>
                {LOG_LEVELS.map((level) => (
                  <SelectItem key={level} value={level} className="text-sm">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="size-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">Message</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/50" />
              <Input
                type="text"
                value={filters.message || ""}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Search messages..."
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="size-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">Resource ID</span>
            </div>
            <Input
              type="text"
              value={filters.resourceId || ""}
              onChange={(e) => handleChange("resourceId", e.target.value)}
              placeholder="Filter by resource..."
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="size-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">Start Date</span>
            </div>
            <Input
              type="datetime-local"
              value={filters.timestamp_start || ""}
              onChange={(e) => handleChange("timestamp_start", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="size-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">Trace ID</span>
            </div>
            <Input
              type="text"
              value={filters.traceId || ""}
              onChange={(e) => handleChange("traceId", e.target.value)}
              placeholder="Filter by trace ID..."
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="size-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">Span ID</span>
            </div>
            <Input
              type="text"
              value={filters.spanId || ""}
              onChange={(e) => handleChange("spanId", e.target.value)}
              placeholder="Filter by span ID..."
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="size-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">End Date</span>
            </div>
            <Input
              type="datetime-local"
              value={filters.timestamp_end || ""}
              onChange={(e) => handleChange("timestamp_end", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="size-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">Commit</span>
            </div>
            <Input
              type="text"
              value={filters.commit || ""}
              onChange={(e) => handleChange("commit", e.target.value)}
              placeholder="Filter by commit..."
              className="h-9 text-sm"
            />
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default FilterBar;

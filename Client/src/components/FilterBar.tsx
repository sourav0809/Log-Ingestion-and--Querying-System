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
  isLoading,
  onRefresh,
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
              className="h-8 w-8"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
            <h2 className="text-sm font-medium">Log Filters</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={isLoading}
              className="h-8 text-xs"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="h-8 text-xs"
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
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Settings2 className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-medium">Log Level</span>
            </div>
            <Select
              value={filters.level || "all"}
              onValueChange={(value) =>
                handleChange(
                  "level",
                  value === "all" ? "" : (value as LogLevel)
                )
              }
              disabled={isLoading}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  All Levels
                </SelectItem>
                {LOG_LEVELS.map((level) => (
                  <SelectItem key={level} value={level} className="text-xs">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-medium">Message</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/50" />
              <Input
                type="text"
                value={filters.message || ""}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Search messages..."
                disabled={isLoading}
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-medium">Resource ID</span>
            </div>
            <Input
              type="text"
              value={filters.resourceId || ""}
              onChange={(e) => handleChange("resourceId", e.target.value)}
              placeholder="Filter by resource..."
              disabled={isLoading}
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-medium">Start Date</span>
            </div>
            <Input
              type="datetime-local"
              value={filters.timestamp_start || ""}
              onChange={(e) => handleChange("timestamp_start", e.target.value)}
              disabled={isLoading}
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-medium">Trace ID</span>
            </div>
            <Input
              type="text"
              value={filters.traceId || ""}
              onChange={(e) => handleChange("traceId", e.target.value)}
              placeholder="Filter by trace ID..."
              disabled={isLoading}
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-medium">Span ID</span>
            </div>
            <Input
              type="text"
              value={filters.spanId || ""}
              onChange={(e) => handleChange("spanId", e.target.value)}
              placeholder="Filter by span ID..."
              disabled={isLoading}
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-medium">End Date</span>
            </div>
            <Input
              type="datetime-local"
              value={filters.timestamp_end || ""}
              onChange={(e) => handleChange("timestamp_end", e.target.value)}
              disabled={isLoading}
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs font-medium">Commit</span>
            </div>
            <Input
              type="text"
              value={filters.commit || ""}
              onChange={(e) => handleChange("commit", e.target.value)}
              placeholder="Filter by commit..."
              disabled={isLoading}
              className="h-9 text-xs"
            />
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default FilterBar;

import React, { useCallback } from "react";
import type { LogLevel, LogQueryParams } from "../types/log";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { Button } from "@/components/common/ui/button";
import { Card } from "@/components/common/ui/card";
import { X } from "lucide-react";

interface FilterBarProps {
  filters: LogQueryParams;
  onFilterChange: (filters: LogQueryParams) => void;
  isLoading?: boolean;
}

const LOG_LEVELS: LogLevel[] = ["error", "warn", "info", "debug"];

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
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
    <Card className="p-6 mb-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Log Filters</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Log Level</Label>
          <Select
            value={filters.level || "all"}
            onValueChange={(value) =>
              handleChange("level", value === "all" ? "" : (value as LogLevel))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {LOG_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Message</Label>
          <Input
            type="text"
            value={filters.message || ""}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Search messages..."
          />
        </div>

        <div className="space-y-2">
          <Label>Resource ID</Label>
          <Input
            type="text"
            value={filters.resourceId || ""}
            onChange={(e) => handleChange("resourceId", e.target.value)}
            placeholder="Filter by resource ID..."
          />
        </div>

        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input
            type="datetime-local"
            value={filters.timestamp_start || ""}
            onChange={(e) => handleChange("timestamp_start", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>End Date</Label>
          <Input
            type="datetime-local"
            value={filters.timestamp_end || ""}
            onChange={(e) => handleChange("timestamp_end", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Trace ID</Label>
          <Input
            type="text"
            value={filters.traceId || ""}
            onChange={(e) => handleChange("traceId", e.target.value)}
            placeholder="Filter by trace ID..."
          />
        </div>

        <div className="space-y-2">
          <Label>Span ID</Label>
          <Input
            type="text"
            value={filters.spanId || ""}
            onChange={(e) => handleChange("spanId", e.target.value)}
            placeholder="Filter by span ID..."
          />
        </div>

        <div className="space-y-2">
          <Label>Commit</Label>
          <Input
            type="text"
            value={filters.commit || ""}
            onChange={(e) => handleChange("commit", e.target.value)}
            placeholder="Filter by commit..."
          />
        </div>
      </div>
    </Card>
  );
};

export default FilterBar;

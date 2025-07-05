import React, { useCallback, useState } from "react";
import type { LogQueryParams } from "../../types/log";
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
import { ChevronDown, ChevronUp, X, Settings2, RefreshCw } from "lucide-react";
import { filterFieldConfig } from "@/constant/filterFields.const";
import { LOG_LEVELS } from "@/constant/log.const";
import FilterField from "./FilterFields";

interface FilterBarProps {
  filters: LogQueryParams;
  onFilterChange: (filters: LogQueryParams) => void;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onRefresh,
  isLoading,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChange = useCallback(
    (field: keyof LogQueryParams, value: string) => {
      onFilterChange({
        ...filters,
        [field]: value || undefined,
      });
    },
    [filters, onFilterChange]
  );

  const clearFilters = useCallback(() => {
    onFilterChange({});
  }, [onFilterChange]);

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="h-8 w-8"
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
              className="h-8 text-sm"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="h-8 text-sm"
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
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
          scaleY: isExpanded ? 1 : 0.95,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden origin-top"
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FilterField
            icon={<Settings2 className="size-3.5 text-primary" />}
            label="Log Level"
          >
            <Select
              value={filters.level || "all"}
              onValueChange={(value) =>
                handleChange("level", value === "all" ? "" : value)
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
                  <SelectItem
                    key={level}
                    value={level}
                    className="text-sm capitalize"
                  >
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterField>

          {filterFieldConfig.map(
            ({ key, label, placeholder, type = "text", icon: Icon }) => (
              <FilterField
                key={key}
                icon={<Icon className="size-3.5 text-primary" />}
                label={label}
              >
                <Input
                  type={type}
                  value={filters[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="h-9 text-sm"
                />
              </FilterField>
            )
          )}
        </div>
      </motion.div>
    </Card>
  );
};

export default FilterBar;

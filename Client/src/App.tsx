import React from "react";

import FilterBar from "./components/filters/FilterBar";
import type { LogQueryParams } from "./types/log";
import { Moon, Sun, Activity } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { useDarkMode } from "./hooks/useDarkMode";
import { useLogs } from "./hooks/useLogs";
import AllLogs from "@/components/logs/AllLogs";

const App: React.FC = () => {
  const { logs, filters, setFilters, loading, refresh } = useLogs();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleFilterChange = (newFilters: LogQueryParams) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[100rem] mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Loglyzer</h1>
              <p className="text-sm text-muted-foreground">
                View and filter system logs in real-time
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="h-10 w-10 relative overflow-hidden cursor-pointer"
          >
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{
                transform: isDarkMode ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              <Moon className="h-5 w-5" />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{
                transform: isDarkMode ? "translateY(0)" : "translateY(100%)",
              }}
            >
              <Sun className="h-5 w-5" />
            </div>
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>

        <div className="space-y-4">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            isLoading={loading}
            onRefresh={refresh}
          />

          <div className="rounded-lg">
            <AllLogs logs={logs} isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

//

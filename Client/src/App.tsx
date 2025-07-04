import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import type { DebouncedFunc } from "lodash";
import FilterBar from "./components/FilterBar";
import LogTable from "./components/LogTable";
import { LogService } from "./api/agent";
import type { Log, LogQueryParams } from "./types/log";
import { Toaster } from "react-hot-toast";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/common/ui/button";

const App: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filters, setFilters] = useState<LogQueryParams>({});
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Create a memoized fetch function
  const fetchLogs = useCallback(async (currentFilters: LogQueryParams) => {
    setLoading(true);
    try {
      const response = await LogService.getLogs(currentFilters);
      if (response.success && response.data) {
        setLogs(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a debounced version of fetchLogs with proper typing
  const debouncedFetchLogs: DebouncedFunc<typeof fetchLogs> = useCallback(
    debounce(fetchLogs, 150, {
      leading: false, // Don't execute on the leading edge
      trailing: true, // Execute on the trailing edge
      maxWait: 1000, // Maximum time to wait before executing
    }),
    [fetchLogs]
  );

  useEffect(() => {
    debouncedFetchLogs(filters);
    return () => {
      debouncedFetchLogs.cancel();
    };
  }, [filters, debouncedFetchLogs]);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleFilterChange = (newFilters: LogQueryParams) => {
    setFilters(newFilters);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[90rem] mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Log Viewer</h1>
              <p className="text-sm text-muted-foreground mt-2">
                View and filter system logs in real-time
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="h-10 w-10"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          </div>

          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            isLoading={loading}
          />

          <LogTable logs={logs} isLoading={loading} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;

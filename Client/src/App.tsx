import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import type { DebouncedFunc } from "lodash";
import FilterBar from "./components/FilterBar";
import LogTable from "./components/LogTable";
import { LogService } from "./api/agent";
import type { Log, LogQueryParams } from "./types/log";
import { Toaster } from "react-hot-toast";
import { Moon, Sun, Activity } from "lucide-react";
import { Button } from "@/components/common/ui/button";

const App: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filters, setFilters] = useState<LogQueryParams>({});
  const [loading, setLoading] = useState(true);
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
      leading: false,
      trailing: true,
      maxWait: 1000,
    }),
    [fetchLogs]
  );

  // Effect to trigger debounced fetch when filters change
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

  const handleRefresh = () => {
    fetchLogs(filters);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
              <h1 className="text-xl font-semibold tracking-tight">
                Log Viewer
              </h1>
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
            onRefresh={handleRefresh}
          />

          <div className="rounded-lg">
            <LogTable logs={logs} isLoading={loading} />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;

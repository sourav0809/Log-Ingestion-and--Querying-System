/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import type { DebouncedFunc } from "lodash";
import type { Log, LogQueryParams } from "@/types/log";
import logAgent from "@/api/agent";
import { getErrorMessage } from "@/lib/utils";
import toast from "react-hot-toast";

export function useLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filters, setFilters] = useState<LogQueryParams>({});
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async (currentFilters: LogQueryParams) => {
    setLoading(true);
    try {
      const response = await logAgent.Logs.getAllLogs(currentFilters);
      if (response.data) {
        setLogs(response.data);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  // A debounced version of fetchLogs
  const debouncedFetchLogs: DebouncedFunc<typeof fetchLogs> = debounce(
    fetchLogs,
    700,
    { trailing: true, maxWait: 1000 }
  );

  useEffect(() => {
    debouncedFetchLogs(filters);
    return () => {
      debouncedFetchLogs.cancel();
    };
  }, [filters]);

  const refresh = () => fetchLogs(filters);

  return {
    logs,
    filters,
    setFilters,
    loading,
    refresh,
  };
}

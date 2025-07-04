import React from "react";
import { format } from "date-fns";
import type { Log, LogLevel } from "../types/log";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/table";
import { Card } from "@/components/common/ui/card";
import { Badge } from "@/components/common/ui/badge";
import { Loader2 } from "lucide-react";

interface LogTableProps {
  logs: Log[];
  isLoading?: boolean;
}

const getLevelStyle = (
  level: LogLevel
): { variant: "default" | "destructive" | "secondary" | "outline" } => {
  switch (level) {
    case "error":
      return { variant: "destructive" };
    case "warn":
      return { variant: "secondary" };
    case "info":
      return { variant: "default" };
    case "debug":
      return { variant: "outline" };
  }
};

const LogTable: React.FC<LogTableProps> = ({ logs, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          No logs found. Try adjusting your filters.
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Level</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Resource ID</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Trace ID</TableHead>
            <TableHead>Span ID</TableHead>
            <TableHead>Commit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <></>
          {logs.map((log, index) => (
            <TableRow key={`${log.traceId}-${index}`}>
              <TableCell>
                <Badge {...getLevelStyle(log.level)}>{log.level}</Badge>
              </TableCell>
              <TableCell className="font-medium max-w-md truncate">
                {log.message}
              </TableCell>
              <TableCell className="font-mono text-xs">
                {log.resourceId}
              </TableCell>
              <TableCell>
                {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell className="font-mono text-xs">{log.traceId}</TableCell>
              <TableCell className="font-mono text-xs">{log.spanId}</TableCell>
              <TableCell className="font-mono text-xs">{log.commit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LogTable;

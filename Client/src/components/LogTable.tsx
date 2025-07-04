import React from "react";
import { format } from "date-fns";
import type { Log } from "../types/log";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/table";
import { Badge } from "@/components/common/ui/badge";
import { Card } from "@/components/common/ui/card";
import { motion } from "framer-motion";

interface LogTableProps {
  logs: Log[];
  isLoading: boolean;
}

const getLevelStyle = (level: string) => {
  switch (level.toLowerCase()) {
    case "error":
      return {
        variant: "destructive" as const,
        className: "bg-red-500/15 text-red-500 hover:bg-red-500/25 text-white",
      };
    case "warn":
      return {
        variant: "default" as const,
        className: "bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25",
      };
    case "info":
      return {
        variant: "default" as const,
        className: "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25",
      };
    case "debug":
      return {
        variant: "default" as const,
        className: "bg-purple-500/15 text-purple-500 hover:bg-purple-500/25",
      };
    default:
      return {
        variant: "secondary" as const,
        className: "",
      };
  }
};

const TableSkeleton = () => (
  <TableRow>
    {Array.from({ length: 7 }).map((_, i) => (
      <TableCell key={i}>
        <div className="h-6 bg-muted/10 rounded animate-pulse" />
      </TableCell>
    ))}
  </TableRow>
);

const LogTable: React.FC<LogTableProps> = ({ logs, isLoading }) => {
  return (
    <Card className="overflow-hidden border rounded-lg">
      <div className="relative">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent ">
              <TableHead className="w-24 text-sm">Level</TableHead>
              <TableHead className="text-sm">Message</TableHead>
              <TableHead className="text-sm">Resource ID</TableHead>
              <TableHead className="text-sm">Timestamp</TableHead>
              <TableHead className="text-sm">Trace ID</TableHead>
              <TableHead className="text-sm">Span ID</TableHead>
              <TableHead className="text-sm">Commit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableSkeleton key={index} />
                ))}
              </>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-2xl text-muted-foreground p-10 gap-1">
                    <p>No logs found.</p>
                    <p className="text-lg">Try adjusting your filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log, index) => (
                <motion.tr
                  key={`${log.traceId}-${index}`}
                  // initial={{ opacity: 0, y: 20 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-medium py-3">
                    <Badge
                      {...getLevelStyle(log.level)}
                      className="text-xs font-medium"
                    >
                      {log.level.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md truncate py-3">
                    <span className="text-sm">{log.message}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm font-mono text-muted-foreground">
                      {log.resourceId}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm">
                      {format(new Date(log.timestamp), "MMM dd, HH:mm:ss")}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm font-mono text-muted-foreground">
                      {log.traceId}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm font-mono text-muted-foreground">
                      {log.spanId}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm font-mono text-muted-foreground">
                      {log.commit}
                    </span>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default LogTable;

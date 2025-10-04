"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Download, RotateCw, TrendingUp } from "lucide-react"
import { LogDetailModal } from "@/components/modals/log-detail-modal"

const logs = [
  {
    id: "run-001",
    template: "Order Notify",
    timestamp: "2025-01-04 14:32:15",
    status: "success",
    duration: "1.2s",
  },
  {
    id: "run-002",
    template: "Lead Capture",
    timestamp: "2025-01-04 14:17:42",
    status: "success",
    duration: "0.8s",
  },
  {
    id: "run-003",
    template: "Daily Summary",
    timestamp: "2025-01-04 13:45:20",
    status: "success",
    duration: "2.1s",
  },
  {
    id: "run-004",
    template: "Order Notify",
    timestamp: "2025-01-04 12:28:33",
    status: "failed",
    duration: "0.5s",
  },
  {
    id: "run-005",
    template: "Lead Capture",
    timestamp: "2025-01-04 11:15:18",
    status: "success",
    duration: "0.9s",
  },
  {
    id: "run-006",
    template: "Order Notify",
    timestamp: "2025-01-04 10:42:07",
    status: "success",
    duration: "1.1s",
  },
]

const statusFilters = ["all", "success", "failed", "pending"]
const dateFilters = ["today", "7d", "30d", "all"]

export function LogsContent() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")
  const [templateFilter, setTemplateFilter] = useState("all")
  const [selectedLog, setSelectedLog] = useState<string | null>(null)

  const filteredLogs = logs.filter((log) => {
    if (statusFilter !== "all" && log.status !== statusFilter) return false
    if (templateFilter !== "all" && log.template !== templateFilter) return false
    return true
  })

  const successRate = (logs.filter((l) => l.status === "success").length / logs.length) * 100

  return (
    <>
      <div className="h-full p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-balance">Logs & Monitoring</h1>
          <p className="text-sm text-muted-foreground">Track and analyze automation runs</p>
        </div>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {/* Left: Filters & Metrics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Template</label>
                  <Select value={templateFilter} onValueChange={setTemplateFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Templates</SelectItem>
                      <SelectItem value="Order Notify">Order Notify</SelectItem>
                      <SelectItem value="Lead Capture">Lead Capture</SelectItem>
                      <SelectItem value="Daily Summary">Daily Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {statusFilters.map((filter) => (
                      <Badge
                        key={filter}
                        variant={statusFilter === filter ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setStatusFilter(filter)}
                      >
                        {filter}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="flex flex-wrap gap-2">
                    {dateFilters.map((filter) => (
                      <Badge
                        key={filter}
                        variant={dateFilter === filter ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setDateFilter(filter)}
                      >
                        {filter}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{logs.length}</div>
                  <div className="text-xs text-muted-foreground">Total Executions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1.1s</div>
                  <div className="text-xs text-muted-foreground">Avg Duration</div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Download className="h-3 w-3 mr-2" />
                  Export CSV
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right: Logs Table */}
          <div className="col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-base">Recent Runs</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  {filteredLogs.slice(0, 6).map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-accent transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{log.id}</span>
                          <Badge variant="outline" className="text-xs">
                            {log.template}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {log.timestamp} • {log.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={log.status === "success" ? "default" : "destructive"} className="text-xs">
                          {log.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedLog(log.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredLogs.length > 6 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      View More ({filteredLogs.length - 6} more)
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <LogDetailModal logId={selectedLog} open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)} />
    </>
  )
}

import { MetricsGrid } from "./metrics-grid"
import { ConnectorStatus } from "./connector-status"
import { RecentActivity } from "./recent-activity"
import { AIQueryPanel } from "./ai-query-panel"

export function DashboardContent() {
  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Monitor your operations at a glance</p>
      </div>

      <div className="grid grid-cols-2 gap-6 h-[calc(100%-5rem)]">
        {/* Top Left: Metrics */}
        <div className="space-y-6">
          <MetricsGrid />
          <RecentActivity />
        </div>

        {/* Top Right: Connectors & AI */}
        <div className="space-y-6">
          <ConnectorStatus />
          <AIQueryPanel />
        </div>
      </div>
    </div>
  )
}

import { NextResponse } from "next/server"

export async function GET() {
  const stats = {
    totalExecutions: 127,
    successRate: 94.5,
    avgDuration: 1.2,
    activeTemplates: 6,
    connectedServices: 3,
    scheduledJobs: 2,
    recentActivity: [
      {
        id: "1",
        type: "execution",
        message: "Order Notify executed successfully",
        timestamp: "2025-01-04T14:32:15Z",
      },
      {
        id: "2",
        type: "schedule",
        message: "Daily Summary scheduled for 9:00 AM",
        timestamp: "2025-01-04T14:15:00Z",
      },
      {
        id: "3",
        type: "connector",
        message: "Slack connector updated",
        timestamp: "2025-01-04T13:45:00Z",
      },
    ],
  }

  return NextResponse.json(stats)
}

import { NextResponse } from "next/server"

const schedules = [
  {
    id: "sched-001",
    name: "Daily Summary Report",
    template: "Daily Summary",
    templateId: "daily-summary",
    cron: "0 9 * * *",
    description: "Every day at 9:00 AM",
    enabled: true,
    lastRun: "2025-01-04T09:00:00Z",
    nextRun: "2025-01-05T09:00:00Z",
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "sched-002",
    name: "Weekly Lead Review",
    template: "Lead Capture",
    templateId: "lead-capture",
    cron: "0 10 * * 1",
    description: "Every Monday at 10:00 AM",
    enabled: true,
    lastRun: "2024-12-30T10:00:00Z",
    nextRun: "2025-01-06T10:00:00Z",
    createdAt: "2025-01-01T11:00:00Z",
  },
]

export async function GET() {
  return NextResponse.json({ schedules })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newSchedule = {
    id: `sched-${Date.now()}`,
    ...body,
    enabled: true,
    createdAt: new Date().toISOString(),
  }
  return NextResponse.json({ schedule: newSchedule }, { status: 201 })
}

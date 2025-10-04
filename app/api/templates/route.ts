import { NextResponse } from "next/server"

const templates = [
  {
    id: "order-notify",
    name: "Order Notify",
    description: "Send notifications when new orders are received",
    tags: ["orders", "notifications", "slack", "email"],
    trigger: "webhook",
    actions: 2,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "lead-capture",
    name: "Lead Capture",
    description: "Capture and route new leads to your CRM",
    tags: ["leads", "crm", "sheets"],
    trigger: "webhook",
    actions: 2,
    createdAt: "2025-01-01T11:00:00Z",
  },
  {
    id: "daily-summary",
    name: "Daily Summary",
    description: "Generate and send daily operations summary",
    tags: ["reports", "email", "scheduled"],
    trigger: "schedule",
    actions: 3,
    createdAt: "2025-01-01T12:00:00Z",
  },
]

export async function GET() {
  return NextResponse.json({ templates })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newTemplate = {
    id: `template-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  }
  return NextResponse.json({ template: newTemplate }, { status: 201 })
}

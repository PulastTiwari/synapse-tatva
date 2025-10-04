import { NextResponse } from "next/server"

const connectors = [
  {
    id: "sheets",
    name: "Google Sheets",
    description: "Read and write data to Google Sheets",
    icon: "📊",
    status: "connected",
    category: "storage",
    connectedAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send messages and notifications to Slack channels",
    icon: "💬",
    status: "connected",
    category: "communication",
    connectedAt: "2025-01-01T11:00:00Z",
  },
  {
    id: "trello",
    name: "Trello",
    description: "Manage cards and boards in Trello",
    icon: "📋",
    status: "connected",
    category: "productivity",
    connectedAt: "2025-01-01T12:00:00Z",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Send and receive emails via Gmail",
    icon: "✉️",
    status: "disconnected",
    category: "communication",
  },
]

export async function GET() {
  return NextResponse.json({ connectors })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newConnector = {
    id: body.id,
    status: "connected",
    connectedAt: new Date().toISOString(),
  }
  return NextResponse.json({ connector: newConnector }, { status: 201 })
}

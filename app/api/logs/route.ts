import { NextResponse } from "next/server"

const logs = [
  {
    id: "run-001",
    template: "Order Notify",
    templateId: "order-notify",
    timestamp: "2025-01-04T14:32:15Z",
    status: "success",
    duration: 1200,
    sampleData: {
      orderId: "ORD-12345",
      customerEmail: "customer@example.com",
      amount: "$299.99",
    },
  },
  {
    id: "run-002",
    template: "Lead Capture",
    templateId: "lead-capture",
    timestamp: "2025-01-04T14:17:42Z",
    status: "success",
    duration: 800,
    sampleData: {
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "run-003",
    template: "Daily Summary",
    templateId: "daily-summary",
    timestamp: "2025-01-04T13:45:20Z",
    status: "success",
    duration: 2100,
    sampleData: {
      date: "2025-01-04",
      totalOrders: 42,
    },
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const templateId = searchParams.get("templateId")

  let filteredLogs = logs

  if (status && status !== "all") {
    filteredLogs = filteredLogs.filter((log) => log.status === status)
  }

  if (templateId && templateId !== "all") {
    filteredLogs = filteredLogs.filter((log) => log.templateId === templateId)
  }

  return NextResponse.json({ logs: filteredLogs })
}

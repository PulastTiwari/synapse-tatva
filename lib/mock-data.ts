export const mockTemplates = [
  {
    id: "order-notify",
    name: "Order Notify",
    description: "Send notifications when new orders are received",
    tags: ["orders", "notifications", "slack", "email"],
    trigger: "webhook",
    actions: 2,
  },
  {
    id: "lead-capture",
    name: "Lead Capture",
    description: "Capture and route new leads to your CRM",
    tags: ["leads", "crm", "sheets"],
    trigger: "webhook",
    actions: 2,
  },
  {
    id: "daily-summary",
    name: "Daily Summary",
    description: "Generate and send daily operations summary",
    tags: ["reports", "email", "scheduled"],
    trigger: "schedule",
    actions: 3,
  },
]

export const mockLogs = [
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
]

export const mockConnectors = [
  {
    id: "sheets",
    name: "Google Sheets",
    description: "Read and write data to Google Sheets",
    icon: "📊",
    status: "connected",
    category: "storage",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send messages and notifications to Slack channels",
    icon: "💬",
    status: "connected",
    category: "communication",
  },
  {
    id: "trello",
    name: "Trello",
    description: "Manage cards and boards in Trello",
    icon: "📋",
    status: "connected",
    category: "productivity",
  },
]

export const mockSchedules = [
  {
    id: "sched-001",
    name: "Daily Summary Report",
    template: "Daily Summary",
    cron: "0 9 * * *",
    description: "Every day at 9:00 AM",
    enabled: true,
    lastRun: "2025-01-04 09:00:00",
    nextRun: "2025-01-05 09:00:00",
  },
  {
    id: "sched-002",
    name: "Weekly Lead Review",
    template: "Lead Capture",
    cron: "0 10 * * 1",
    description: "Every Monday at 10:00 AM",
    enabled: true,
    lastRun: "2024-12-30 10:00:00",
    nextRun: "2025-01-06 10:00:00",
  },
]

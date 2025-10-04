"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { TemplateCard } from "./template-card"
import { CreateTemplateModal } from "@/components/modals/create-template-modal"

const templates = [
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
  {
    id: "invoice-reminder",
    name: "Invoice Reminder",
    description: "Send reminders for overdue invoices",
    tags: ["invoices", "email", "scheduled"],
    trigger: "schedule",
    actions: 2,
  },
  {
    id: "task-assignment",
    name: "Task Assignment",
    description: "Automatically assign tasks to team members",
    tags: ["tasks", "trello", "slack"],
    trigger: "webhook",
    actions: 2,
  },
  {
    id: "customer-feedback",
    name: "Customer Feedback",
    description: "Collect and route customer feedback",
    tags: ["feedback", "sheets", "slack"],
    trigger: "webhook",
    actions: 2,
  },
]

export function TemplatesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      <div className="h-full p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-balance">Templates</h1>
          <p className="text-sm text-muted-foreground">Browse and manage automation templates</p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {filteredTemplates.slice(0, 6).map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length > 6 && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View More ({filteredTemplates.length - 6} more)
            </Button>
          </div>
        )}
      </div>

      <CreateTemplateModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </>
  )
}

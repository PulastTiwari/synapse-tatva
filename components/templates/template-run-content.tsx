"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Play, Save, Calendar, Sparkles, FileJson } from "lucide-react"
import { EditSampleDataModal } from "@/components/modals/edit-sample-data-modal"

interface TemplateRunContentProps {
  templateId: string
}

const templateData: Record<string, any> = {
  "order-notify": {
    name: "Order Notify",
    description: "Send notifications when new orders are received",
    trigger: "webhook",
    mappings: [
      { source: "order_id", placeholder: "{{orderId}}" },
      { source: "customer_email", placeholder: "{{customerEmail}}" },
      { source: "amount", placeholder: "{{amount}}" },
      { source: "items", placeholder: "{{items}}" },
    ],
    actions: [
      { name: "Send Slack Notification", type: "slack" },
      { name: "Send Email Confirmation", type: "email" },
    ],
    sampleData: {
      order_id: "ORD-12345",
      customer_email: "customer@example.com",
      amount: "$299.99",
      items: "2 items",
    },
  },
  "lead-capture": {
    name: "Lead Capture",
    description: "Capture and route new leads to your CRM",
    trigger: "webhook",
    mappings: [
      { source: "name", placeholder: "{{leadName}}" },
      { source: "email", placeholder: "{{leadEmail}}" },
      { source: "company", placeholder: "{{company}}" },
      { source: "source", placeholder: "{{source}}" },
    ],
    actions: [
      { name: "Append to Leads Sheet", type: "sheets" },
      { name: "Notify Sales Team", type: "slack" },
    ],
    sampleData: {
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      source: "Website Form",
    },
  },
  "daily-summary": {
    name: "Daily Summary",
    description: "Generate and send daily operations summary",
    trigger: "schedule",
    mappings: [
      { source: "date", placeholder: "{{date}}" },
      { source: "total_orders", placeholder: "{{totalOrders}}" },
      { source: "total_revenue", placeholder: "{{totalRevenue}}" },
      { source: "new_leads", placeholder: "{{newLeads}}" },
    ],
    actions: [
      { name: "Aggregate Sheet Data", type: "sheets" },
      { name: "Generate Summary", type: "compute" },
      { name: "Send Email Report", type: "email" },
    ],
    sampleData: {
      date: "2025-01-04",
      total_orders: "42",
      total_revenue: "$12,450",
      new_leads: "15",
    },
  },
}

export function TemplateRunContent({ templateId }: TemplateRunContentProps) {
  const template = templateData[templateId] || templateData["order-notify"]
  const [mockMode, setMockMode] = useState(true)
  const [editDataOpen, setEditDataOpen] = useState(false)
  const [sampleData, setSampleData] = useState(template.sampleData)

  return (
    <>
      <div className="h-full p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-balance">{template.name}</h1>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column: Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Trigger Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Trigger Type</Label>
                  <Select value={template.trigger}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webhook">Webhook</SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {template.trigger === "webhook" && (
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input value="https://api.synapse.app/webhook/abc123" readOnly />
                  </div>
                )}

                {template.trigger === "schedule" && (
                  <div className="space-y-2">
                    <Label>Schedule</Label>
                    <Input placeholder="0 9 * * *" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select defaultValue="sheets">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sheets">Google Sheets</SelectItem>
                      <SelectItem value="trello">Trello</SelectItem>
                      <SelectItem value="webhook">Webhook Payload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Field Mapping</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Auto-suggest
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {template.mappings.map((mapping: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={mapping.source} placeholder="Source field" className="flex-1" />
                      <span className="text-muted-foreground">→</span>
                      <Input value={mapping.placeholder} placeholder="{{placeholder}}" className="flex-1" readOnly />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Controls & Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sample Data</CardTitle>
                <CardDescription className="text-xs">Test data for running this template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-3 rounded-md">
                  <pre className="text-xs overflow-x-auto">{JSON.stringify(sampleData, null, 2)}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setEditDataOpen(true)}
                >
                  <FileJson className="h-3 w-3 mr-2" />
                  Edit JSON
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Run Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mock-mode">Mock Mode</Label>
                  <Switch id="mock-mode" checked={mockMode} onCheckedChange={setMockMode} />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Run Now
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Save className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {template.actions.map((action: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-border rounded-md">
                      <span className="text-sm">{action.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {action.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EditSampleDataModal
        open={editDataOpen}
        onOpenChange={setEditDataOpen}
        data={sampleData}
        onSave={setSampleData}
      />
    </>
  )
}

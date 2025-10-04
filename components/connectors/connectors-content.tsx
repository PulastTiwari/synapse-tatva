"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { ConnectorCard } from "./connector-card"
import { AddConnectorModal } from "@/components/modals/add-connector-modal"

const connectors = [
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
  {
    id: "gmail",
    name: "Gmail",
    description: "Send and receive emails via Gmail",
    icon: "✉️",
    status: "disconnected",
    category: "communication",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Create and update Notion pages and databases",
    icon: "📝",
    status: "disconnected",
    category: "productivity",
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "Manage records in Airtable bases",
    icon: "🗂️",
    status: "disconnected",
    category: "storage",
  },
]

export function ConnectorsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [addModalOpen, setAddModalOpen] = useState(false)

  const filteredConnectors = connectors.filter(
    (connector) =>
      connector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connector.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connector.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const connectedCount = connectors.filter((c) => c.status === "connected").length

  return (
    <>
      <div className="h-full p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-balance">Connectors</h1>
          <p className="text-sm text-muted-foreground">
            Manage integrations with external services ({connectedCount} connected)
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search connectors by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Connector
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 flex-1 content-start">
          {filteredConnectors.map((connector) => (
            <ConnectorCard key={connector.id} connector={connector} />
          ))}
        </div>
      </div>

      <AddConnectorModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </>
  )
}

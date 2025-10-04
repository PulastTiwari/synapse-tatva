"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface AddConnectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const availableConnectors = [
  { id: "github", name: "GitHub", category: "development", icon: "🐙" },
  { id: "stripe", name: "Stripe", category: "payments", icon: "💳" },
  { id: "twilio", name: "Twilio", category: "communication", icon: "📱" },
  { id: "sendgrid", name: "SendGrid", category: "communication", icon: "📧" },
  { id: "dropbox", name: "Dropbox", category: "storage", icon: "📦" },
  { id: "hubspot", name: "HubSpot", category: "crm", icon: "🎯" },
]

export function AddConnectorModal({ open, onOpenChange }: AddConnectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")

  const filteredConnectors = availableConnectors.filter((connector) => {
    if (category !== "all" && connector.category !== category) return false
    if (searchQuery && !connector.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add Connector</DialogTitle>
          <DialogDescription>Choose a service to connect to your automation workflows</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search connectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="crm">CRM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {filteredConnectors.map((connector) => (
              <div
                key={connector.id}
                className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{connector.icon}</div>
                  <div>
                    <div className="text-sm font-medium">{connector.name}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {connector.category}
                    </Badge>
                  </div>
                </div>
                <Button size="sm">Add</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

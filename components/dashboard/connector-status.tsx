"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Mail, MessageSquare, Sheet, Calendar } from "lucide-react"

const connectors = [
  { name: "Slack", icon: MessageSquare, status: "connected" },
  { name: "Gmail", icon: Mail, status: "connected" },
  { name: "Google Sheets", icon: Sheet, status: "connected" },
  { name: "Trello", icon: Calendar, status: "disconnected" },
]

export function ConnectorStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Connector Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {connectors.map((connector) => {
            const Icon = connector.icon
            const isConnected = connector.status === "connected"
            return (
              <div
                key={connector.name}
                className="flex items-center justify-between p-3 border border-border rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{connector.name}</span>
                </div>
                {isConnected ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

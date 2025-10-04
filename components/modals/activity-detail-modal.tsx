"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RotateCw, Download } from "lucide-react"

interface ActivityDetailModalProps {
  activityId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActivityDetailModal({ activityId, open, onOpenChange }: ActivityDetailModalProps) {
  if (!activityId) return null

  // Mock data - would be fetched based on activityId
  const activity = {
    id: activityId,
    template: "Order Notify",
    timestamp: "2025-01-04 14:32:15",
    status: "success",
    duration: "1.2s",
    sampleData: {
      orderId: "ORD-12345",
      customerEmail: "customer@example.com",
      amount: "$299.99",
    },
    actions: [
      {
        name: "Send Slack Notification",
        status: "success",
        duration: "0.5s",
        request: { channel: "#orders", message: "New order received" },
        response: { ok: true, ts: "1704376335.123456" },
      },
      {
        name: "Send Email Confirmation",
        status: "success",
        duration: "0.7s",
        request: { to: "customer@example.com", subject: "Order Confirmation" },
        response: { messageId: "msg-abc123" },
      },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Run Details: {activity.id}</DialogTitle>
          <DialogDescription>
            {activity.template} • {activity.timestamp}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 pr-4">
            <div className="flex items-center gap-4">
              <Badge variant={activity.status === "success" ? "default" : "destructive"}>{activity.status}</Badge>
              <span className="text-sm text-muted-foreground">Duration: {activity.duration}</span>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Sample Data</h4>
              <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                {JSON.stringify(activity.sampleData, null, 2)}
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Actions</h4>
              <div className="space-y-3">
                {activity.actions.map((action, index) => (
                  <div key={index} className="border border-border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{action.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {action.duration}
                      </Badge>
                    </div>
                    <details className="text-xs">
                      <summary className="cursor-pointer text-muted-foreground mb-1">Request</summary>
                      <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                        {JSON.stringify(action.request, null, 2)}
                      </pre>
                    </details>
                    <details className="text-xs mt-1">
                      <summary className="cursor-pointer text-muted-foreground mb-1">Response</summary>
                      <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                        {JSON.stringify(action.response, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <RotateCw className="h-4 w-4 mr-2" />
            Replay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

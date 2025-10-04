"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCw, Download, CheckCircle2, XCircle } from "lucide-react"

interface LogDetailModalProps {
  logId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LogDetailModal({ logId, open, onOpenChange }: LogDetailModalProps) {
  if (!logId) return null

  // Mock data - would be fetched based on logId
  const log = {
    id: logId,
    template: "Order Notify",
    timestamp: "2025-01-04 14:32:15",
    status: "success",
    duration: "1.2s",
    sampleData: {
      orderId: "ORD-12345",
      customerEmail: "customer@example.com",
      amount: "$299.99",
      items: "2 items",
    },
    actions: [
      {
        name: "Send Slack Notification",
        status: "success",
        duration: "0.5s",
        request: {
          channel: "#orders",
          message: "New order ORD-12345 received for $299.99",
        },
        response: {
          ok: true,
          ts: "1704376335.123456",
        },
      },
      {
        name: "Send Email Confirmation",
        status: "success",
        duration: "0.7s",
        request: {
          to: "customer@example.com",
          subject: "Order Confirmation - ORD-12345",
          body: "Thank you for your order!",
        },
        response: {
          messageId: "msg-abc123",
          status: "sent",
        },
      },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Run Details: {log.id}</DialogTitle>
          <DialogDescription>
            {log.template} • {log.timestamp}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="raw">Raw Data</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[50vh] mt-4">
            <TabsContent value="overview" className="space-y-4 pr-4">
              <div className="flex items-center gap-4">
                <Badge variant={log.status === "success" ? "default" : "destructive"}>{log.status}</Badge>
                <span className="text-sm text-muted-foreground">Duration: {log.duration}</span>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Sample Data</h4>
                <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                  {JSON.stringify(log.sampleData, null, 2)}
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Actions Summary</h4>
                <div className="space-y-2">
                  {log.actions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-border rounded-md">
                      <div className="flex items-center gap-2">
                        {action.status === "success" ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                        <span className="text-sm">{action.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{action.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4 pr-4">
              {log.actions.map((action, index) => (
                <div key={index} className="border border-border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold">{action.name}</h4>
                    <Badge variant={action.status === "success" ? "default" : "destructive"} className="text-xs">
                      {action.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Request</div>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(action.request, null, 2)}
                      </pre>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Response</div>
                      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(action.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="raw" className="pr-4">
              <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">{JSON.stringify(log, null, 2)}</pre>
            </TabsContent>
          </ScrollArea>
        </Tabs>

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

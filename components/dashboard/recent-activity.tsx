"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useState } from "react"
import { ActivityDetailModal } from "@/components/modals/activity-detail-modal"

const activities = [
  {
    id: "run-001",
    template: "Order Notify",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: "run-002",
    template: "Lead Capture",
    time: "15 minutes ago",
    status: "success",
  },
  {
    id: "run-003",
    template: "Daily Summary",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: "run-004",
    template: "Order Notify",
    time: "2 hours ago",
    status: "failed",
  },
  {
    id: "run-005",
    template: "Lead Capture",
    time: "3 hours ago",
    status: "success",
  },
  {
    id: "run-006",
    template: "Order Notify",
    time: "4 hours ago",
    status: "success",
  },
]

export function RecentActivity() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.template}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={activity.status === "success" ? "default" : "destructive"} className="text-xs">
                    {activity.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setSelectedActivity(activity.id)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ActivityDetailModal
        activityId={selectedActivity}
        open={!!selectedActivity}
        onOpenChange={(open) => !open && setSelectedActivity(null)}
      />
    </>
  )
}

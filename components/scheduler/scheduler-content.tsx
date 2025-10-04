"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Clock, Edit, Trash2, Play } from "lucide-react"
import { CreateScheduleModal } from "@/components/modals/create-schedule-modal"

const schedules = [
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
  {
    id: "sched-003",
    name: "Invoice Reminders",
    template: "Invoice Reminder",
    cron: "0 14 * * *",
    description: "Every day at 2:00 PM",
    enabled: false,
    lastRun: "2025-01-03 14:00:00",
    nextRun: "-",
  },
]

export function SchedulerContent() {
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const activeSchedules = schedules.filter((s) => s.enabled).length

  return (
    <>
      <div className="h-full p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-balance">Scheduler</h1>
          <p className="text-sm text-muted-foreground">Manage automated schedules ({activeSchedules} active)</p>
        </div>

        <div className="flex justify-end mb-6">
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Schedule
          </Button>
        </div>

        <div className="space-y-4 flex-1">
          {schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <CardTitle className="text-base">{schedule.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {schedule.description} • {schedule.cron}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <Switch checked={schedule.enabled} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs">
                      {schedule.template}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      Last: {schedule.lastRun} • Next: {schedule.nextRun}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Run Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CreateScheduleModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </>
  )
}

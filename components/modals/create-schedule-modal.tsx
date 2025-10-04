"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface CreateScheduleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const cronPresets = [
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at 9 AM", value: "0 9 * * *" },
  { label: "Every Monday at 10 AM", value: "0 10 * * 1" },
  { label: "Every 1st of month", value: "0 0 1 * *" },
  { label: "Custom", value: "custom" },
]

export function CreateScheduleModal({ open, onOpenChange }: CreateScheduleModalProps) {
  const [name, setName] = useState("")
  const [template, setTemplate] = useState("")
  const [cronPreset, setCronPreset] = useState("")
  const [customCron, setCustomCron] = useState("")

  const handleCreate = () => {
    console.log("Creating schedule:", { name, template, cron: cronPreset === "custom" ? customCron : cronPreset })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Schedule</DialogTitle>
          <DialogDescription>Set up a new automated schedule for a template</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="schedule-name">Schedule Name</Label>
            <Input
              id="schedule-name"
              placeholder="e.g., Daily Summary Report"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily-summary">Daily Summary</SelectItem>
                <SelectItem value="invoice-reminder">Invoice Reminder</SelectItem>
                <SelectItem value="lead-capture">Lead Capture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cron-preset">Schedule</Label>
            <Select value={cronPreset} onValueChange={setCronPreset}>
              <SelectTrigger id="cron-preset">
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent>
                {cronPresets.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {cronPreset === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="custom-cron">Custom Cron Expression</Label>
              <Input
                id="custom-cron"
                placeholder="0 9 * * *"
                value={customCron}
                onChange={(e) => setCustomCron(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Format: minute hour day month weekday</p>
            </div>
          )}

          {cronPreset && cronPreset !== "custom" && (
            <div className="p-3 bg-muted rounded-md">
              <div className="text-xs font-medium mb-1">Cron Expression</div>
              <Badge variant="outline" className="font-mono text-xs">
                {cronPreset}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name || !template || !cronPreset}>
            Create Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

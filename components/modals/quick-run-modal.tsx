"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Play } from "lucide-react"

interface QuickRunModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickRunModal({ open, onOpenChange }: QuickRunModalProps) {
  const [template, setTemplate] = useState("")
  const [preset, setPreset] = useState("")

  const handleRun = () => {
    // TODO: Implement run logic
    console.log("Running template:", template, "with preset:", preset)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Run Template</DialogTitle>
          <DialogDescription>Select a template and sample data preset to run immediately</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order-notify">Order Notify</SelectItem>
                <SelectItem value="lead-capture">Lead Capture</SelectItem>
                <SelectItem value="daily-summary">Daily Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preset">Sample Data Preset</Label>
            <Select value={preset} onValueChange={setPreset}>
              <SelectTrigger id="preset">
                <SelectValue placeholder="Select preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="test">Test Data</SelectItem>
                <SelectItem value="demo">Demo Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleRun} disabled={!template}>
            <Play className="h-4 w-4 mr-2" />
            Run Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

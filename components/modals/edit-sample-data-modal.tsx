"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface EditSampleDataModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: any
  onSave: (data: any) => void
}

export function EditSampleDataModal({ open, onOpenChange, data, onSave }: EditSampleDataModalProps) {
  const [jsonText, setJsonText] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (open) {
      setJsonText(JSON.stringify(data, null, 2))
      setError("")
    }
  }, [open, data])

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText)
      onSave(parsed)
      onOpenChange(false)
    } catch (e) {
      setError("Invalid JSON format")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Sample Data</DialogTitle>
          <DialogDescription>Modify the JSON data used for testing this template</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value)
              setError("")
            }}
            className="font-mono text-xs min-h-[300px]"
            placeholder='{"key": "value"}'
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

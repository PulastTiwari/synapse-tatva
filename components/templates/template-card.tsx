"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Edit, Copy, Trash2, Clock, Webhook } from "lucide-react"
import Link from "next/link"

interface TemplateCardProps {
  template: {
    id: string
    name: string
    description: string
    tags: string[]
    trigger: string
    actions: number
  }
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base">{template.name}</CardTitle>
            <CardDescription className="text-xs mt-1">{template.description}</CardDescription>
          </div>
          {template.trigger === "schedule" ? (
            <Clock className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Webhook className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {template.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{template.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="text-xs text-muted-foreground">{template.actions} actions</div>

        <div className="flex gap-2">
          <Link href={`/run/${template.id}`} className="flex-1">
            <Button size="sm" className="w-full">
              <Play className="h-3 w-3 mr-1" />
              Run
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Edit className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

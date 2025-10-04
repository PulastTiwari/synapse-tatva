"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Trash2, CheckCircle2, Circle } from "lucide-react"

interface ConnectorCardProps {
  connector: {
    id: string
    name: string
    description: string
    icon: string
    status: string
    category: string
  }
}

export function ConnectorCard({ connector }: ConnectorCardProps) {
  const isConnected = connector.status === "connected"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{connector.icon}</div>
            <div>
              <CardTitle className="text-base">{connector.name}</CardTitle>
              <CardDescription className="text-xs mt-1">{connector.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground" />
          )}
          <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
            {connector.status}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {connector.category}
          </Badge>
        </div>

        <div className="flex gap-2">
          {isConnected ? (
            <>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Settings className="h-3 w-3 mr-1" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <Button size="sm" className="w-full">
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

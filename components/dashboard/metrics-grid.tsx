"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

const metrics = [
  {
    title: "Pending Tasks",
    value: "12",
    icon: AlertCircle,
    color: "text-warning",
    href: "/logs?status=pending",
  },
  {
    title: "Overdue Invoices",
    value: "3",
    icon: AlertCircle,
    color: "text-destructive",
    href: "/logs?status=overdue",
  },
  {
    title: "New Leads",
    value: "24",
    icon: Users,
    color: "text-primary",
    href: "/logs?template=lead-capture",
  },
  {
    title: "Success Rate",
    value: "98.5%",
    icon: TrendingUp,
    color: "text-success",
    href: "/logs",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Link key={metric.title} href={metric.href}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Play,
  ScrollText,
  Plug,
  Clock,
  Settings,
  HelpCircle,
  ChevronLeft,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/run", label: "Run", icon: Play },
  { href: "/logs", label: "Logs", icon: ScrollText },
  { href: "/connectors", label: "Connectors", icon: Plug },
  { href: "/scheduler", label: "Scheduler", icon: Clock },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-[72px] bottom-0 bg-card border-r border-border transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        {!collapsed && (
          <div className="p-4 border-t border-border">
            <Button className="w-full" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Quick Run
            </Button>
          </div>
        )}

        <div className="p-2 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full justify-center" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>
    </aside>
  )
}

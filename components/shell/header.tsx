"use client"

import { Bell, Search, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { QuickRunModal } from "@/components/modals/quick-run-modal"

export function Header() {
  const [quickRunOpen, setQuickRunOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-background border-b border-border z-50 flex items-center px-6 gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/synapse-logo.png" alt="Synapse" width={32} height={32} className="w-8 h-8" />
          <span className="font-semibold text-lg">Synapse</span>
        </Link>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search templates, logs..." className="pl-9 h-9" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setQuickRunOpen(true)} title="Quick Run">
            <Zap className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 text-sm text-muted-foreground">No new notifications</div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Demo User
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <QuickRunModal open={quickRunOpen} onOpenChange={setQuickRunOpen} />
    </>
  )
}

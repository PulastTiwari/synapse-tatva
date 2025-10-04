import type React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <Sidebar />
      <main className="fixed top-[72px] left-60 right-0 bottom-0 overflow-hidden">
        <div className="h-full overflow-auto">{children}</div>
      </main>
    </div>
  )
}

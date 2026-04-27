import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ProfilePreferenceRowProps {
  icon: ReactNode
  label: string
  enabled: boolean
}

export function ProfilePreferenceRow({ icon, label, enabled }: ProfilePreferenceRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-b-0">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="shrink-0 text-muted-foreground">{icon}</span>
        <span className="truncate text-[12px] font-semibold text-foreground">{label}</span>
      </div>
      <span
        className={cn(
          "inline-flex h-5 w-9 shrink-0 items-center border px-0.5 transition-colors",
          enabled ? "justify-end border-primary/30 bg-primary/20" : "justify-start border-border bg-secondary",
        )}
      >
        <span className={cn("h-3.5 w-3.5 rounded-full", enabled ? "bg-primary" : "bg-muted-foreground")} />
      </span>
    </div>
  )
}

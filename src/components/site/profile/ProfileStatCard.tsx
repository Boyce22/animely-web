import type { ComponentType } from "react"
import { compactProfileNumber } from "./profileUtils"

interface ProfileStatCardProps {
  label: string
  value: number
  icon: ComponentType<{ className?: string }>
}

export function ProfileStatCard({ label, value, icon: Icon }: ProfileStatCardProps) {
  return (
    <div className="min-w-0 border border-border bg-card px-3 py-3 transition-colors hover:bg-secondary/40">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </div>
      <p className="font-mono text-xl font-bold leading-none text-foreground">
        {compactProfileNumber(value)}
      </p>
    </div>
  )
}

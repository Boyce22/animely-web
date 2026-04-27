import { cn } from "@/lib/utils"

interface ProfilePanelProps {
  children: React.ReactNode
  className?: string
}

interface ProfilePanelHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function ProfilePanel({ children, className }: ProfilePanelProps) {
  return (
    <section className={cn("border border-border bg-card", className)}>
      {children}
    </section>
  )
}

export function ProfilePanelHeader({ title, subtitle, action }: ProfilePanelHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 className="truncate text-sm font-bold text-foreground">{title}</h2>
        {subtitle && <p className="mt-1 text-[12px] text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function ProfileMetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </p>
  )
}

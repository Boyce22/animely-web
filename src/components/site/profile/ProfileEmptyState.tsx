import type { ReactNode } from "react"

interface ProfileEmptyStateProps {
  icon: ReactNode
  title: string
  description: string
}

export function ProfileEmptyState({ icon, title, description }: ProfileEmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center border border-dashed border-border bg-secondary/40 px-5 py-8 text-center">
      <div className="mb-3 flex h-9 w-9 items-center justify-center border border-border bg-card text-muted-foreground">
        {icon}
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 max-w-xs text-[12px] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

import type { ReactNode } from "react"

interface ProfileInfoRowProps {
  icon: ReactNode
  label: string
  value: string
}

export function ProfileInfoRow({ icon, label, value }: ProfileInfoRowProps) {
  return (
    <div className="flex items-center gap-2.5 text-[12px] text-muted-foreground">
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <span className="min-w-0">
        <span className="mr-1 text-muted-foreground">{label}:</span>
        <span className="break-words text-foreground">{value}</span>
      </span>
    </div>
  )
}

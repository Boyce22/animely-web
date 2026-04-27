import { cn } from "@/lib/utils"

interface ProfileTabButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export function ProfileTabButton({ label, isActive, onClick }: ProfileTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-11 shrink-0 items-center border-b-2 px-4 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors",
        isActive
          ? "border-primary bg-secondary text-foreground"
          : "border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
      )}
    >
      {label}
    </button>
  )
}

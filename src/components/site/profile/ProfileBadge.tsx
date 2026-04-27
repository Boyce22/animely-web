import { cn } from "@/lib/utils"

interface ProfileBadgeProps {
  label: string
  value: string
  tone?: "neutral" | "primary"
}

export function ProfileBadge({ label, value, tone = "neutral" }: ProfileBadgeProps) {
  return (
    <div
      className={cn(
        "min-w-0 border px-3 py-2",
        tone === "primary"
          ? "border-primary/20 bg-primary/10"
          : "border-border bg-secondary/50",
      )}
    >
      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 truncate text-[12px] font-bold",
          tone === "primary" ? "text-primary-soft" : "text-foreground/85",
        )}
      >
        {value}
      </p>
    </div>
  )
}

import type { TFunction } from "i18next"
import { ChevronDown, Edit, UserPlus } from "lucide-react"

interface ProfileHeroActionsProps {
  onEdit: () => void
  t: TFunction
}

export function ProfileHeroActions({ onEdit, t }: ProfileHeroActionsProps) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2">
      <button className="inline-flex h-9 items-center gap-1.5 border border-border bg-secondary px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-secondary-foreground transition-colors hover:bg-secondary/80">
        <UserPlus className="h-3.5 w-3.5" />
        {t("profile.following")}
      </button>
      <button
        onClick={onEdit}
        className="inline-flex h-9 items-center gap-1.5 bg-primary px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Edit className="h-3.5 w-3.5" />
        {t("profile.edit_profile")}
      </button>
      <button className="flex h-9 w-9 items-center justify-center border border-border bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

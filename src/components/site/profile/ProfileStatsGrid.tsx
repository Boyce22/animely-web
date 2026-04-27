import type { ComponentType } from "react"
import type { TFunction } from "i18next"
import { Bookmark, Edit, Heart, MessageSquare, Star, UserPlus } from "lucide-react"
import type { ProfileData } from "./profileTypes"
import { compactProfileNumber } from "./profileUtils"

interface ProfileStatsGridProps {
  profile: ProfileData
  t: TFunction
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: ComponentType<{ className?: string }> }) {
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

export function ProfileStatsGrid({ profile, t }: ProfileStatsGridProps) {
  const stats = [
    { label: t("profile.followers"), value: profile.followersCount, icon: Heart },
    { label: t("profile.following"), value: profile.followingCount, icon: UserPlus },
    { label: "Works", value: profile.worksCreated, icon: Edit },
    { label: t("profile.tab_comments"), value: profile.commentsCount, icon: MessageSquare },
    { label: t("profile.activity_rating"), value: profile.ratingsCount, icon: Star },
    { label: t("profile.activity_bookmark"), value: profile.favoritesCount, icon: Heart },
    { label: t("profile.collection"), value: profile.collectionsCount, icon: Bookmark },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
      {stats.map(({ label, value, icon: Icon }) => (
        <StatCard key={label} label={label} value={value} icon={Icon} />
      ))}
    </div>
  )
}

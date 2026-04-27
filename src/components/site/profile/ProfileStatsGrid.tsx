import type { TFunction } from "i18next"
import { Bookmark, Edit, Heart, MessageSquare, Star, UserPlus } from "lucide-react"
import { ProfileStatCard } from "./ProfileStatCard"
import type { ProfileData } from "./profileTypes"

interface ProfileStatsGridProps {
  profile: ProfileData
  t: TFunction
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
        <ProfileStatCard key={label} label={label} value={value} icon={Icon} />
      ))}
    </div>
  )
}

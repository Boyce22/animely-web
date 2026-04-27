import type { TFunction } from "i18next"
import { Activity, Ban, Bookmark, Calendar, Clock, Globe2, Mail, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfileBadge } from "./ProfileBadge"
import { ProfileMetaLabel, ProfilePanel } from "./ProfilePanel"
import type { ProfileData } from "./profileTypes"
import { formatProfileDate } from "./profileUtils"

interface ProfileSidePanelProps {
  profile: ProfileData
  t: TFunction
  className?: string
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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

function PreferenceRow({ icon, label, enabled }: { icon: React.ReactNode; label: string; enabled: boolean }) {
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

export function ProfileSidePanel({ profile, t, className }: ProfileSidePanelProps) {
  return (
    <aside className={cn("space-y-3", className)}>
      <ProfilePanel className="p-4">
        <ProfileMetaLabel>{t("profile.about")}</ProfileMetaLabel>
        <div className="mt-3 space-y-2.5">
          <InfoRow icon={<Mail className="h-3.5 w-3.5" />} label={t("profile.email")} value={profile.email} />
          <InfoRow icon={<Calendar className="h-3.5 w-3.5" />} label={t("profile.birth_date")} value={formatProfileDate(profile.birthDate)} />
          <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label={t("profile.last_active")} value={formatProfileDate(profile.lastLoginAt)} />
          <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="Location" value={profile.address} />
        </div>
      </ProfilePanel>

      <ProfilePanel className="p-4">
        <ProfileMetaLabel>Account</ProfileMetaLabel>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <ProfileBadge label="Role" value={profile.role} />
          <ProfileBadge label="Plan" value={profile.subscriptionTier} tone="primary" />
          <ProfileBadge label="Theme" value={profile.theme} />
          <ProfileBadge label="Lang" value={profile.preferredLanguage.slice(0, 2)} />
        </div>
      </ProfilePanel>

      <ProfilePanel className="p-4">
        <ProfileMetaLabel>Visibility</ProfileMetaLabel>
        <p className="mb-2 mt-1 text-[11px] text-muted-foreground">{profile.timeZone}</p>
        <PreferenceRow icon={<Globe2 className="h-3.5 w-3.5" />} label="Public profile" enabled={profile.isProfilePublic} />
        <PreferenceRow icon={<Activity className="h-3.5 w-3.5" />} label="Show activity" enabled={profile.showActivity} />
        <PreferenceRow icon={<Bookmark className="h-3.5 w-3.5" />} label="Show collections" enabled={profile.showCollections} />
        <PreferenceRow icon={<Ban className="h-3.5 w-3.5" />} label="Mature content" enabled={profile.showMatureContent} />
      </ProfilePanel>
    </aside>
  )
}

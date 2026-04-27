import type { TFunction } from "i18next"
import { cn } from "@/lib/utils"
import { ProfileAboutPanel } from "./ProfileAboutPanel"
import { ProfileAccountPanel } from "./ProfileAccountPanel"
import { ProfileVisibilityPanel } from "./ProfileVisibilityPanel"
import type { ProfileData } from "./profileTypes"

interface ProfileSidePanelProps {
  profile: ProfileData
  t: TFunction
  className?: string
}

export function ProfileSidePanel({ profile, t, className }: ProfileSidePanelProps) {
  return (
    <aside className={cn("space-y-3", className)}>
      <ProfileAboutPanel profile={profile} t={t} />
      <ProfileAccountPanel profile={profile} />
      <ProfileVisibilityPanel profile={profile} />
    </aside>
  )
}

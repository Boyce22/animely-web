import { Activity, Ban, Bookmark, Globe2 } from "lucide-react"
import { ProfileMetaLabel, ProfilePanel } from "./ProfilePanel"
import { ProfilePreferenceRow } from "./ProfilePreferenceRow"
import type { ProfileData } from "./profileTypes"

interface ProfileVisibilityPanelProps {
  profile: ProfileData
}

export function ProfileVisibilityPanel({ profile }: ProfileVisibilityPanelProps) {
  return (
    <ProfilePanel className="p-4">
      <ProfileMetaLabel>Visibility</ProfileMetaLabel>
      <p className="mb-2 mt-1 text-[11px] text-muted-foreground">{profile.timeZone}</p>
      <ProfilePreferenceRow icon={<Globe2 className="h-3.5 w-3.5" />} label="Public profile" enabled={profile.isProfilePublic} />
      <ProfilePreferenceRow icon={<Activity className="h-3.5 w-3.5" />} label="Show activity" enabled={profile.showActivity} />
      <ProfilePreferenceRow icon={<Bookmark className="h-3.5 w-3.5" />} label="Show collections" enabled={profile.showCollections} />
      <ProfilePreferenceRow icon={<Ban className="h-3.5 w-3.5" />} label="Mature content" enabled={profile.showMatureContent} />
    </ProfilePanel>
  )
}

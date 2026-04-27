import { ProfileBadge } from "./ProfileBadge"
import { ProfileMetaLabel, ProfilePanel } from "./ProfilePanel"
import type { ProfileData } from "./profileTypes"

interface ProfileAccountPanelProps {
  profile: ProfileData
}

export function ProfileAccountPanel({ profile }: ProfileAccountPanelProps) {
  return (
    <ProfilePanel className="p-4">
      <ProfileMetaLabel>Account</ProfileMetaLabel>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <ProfileBadge label="Role" value={profile.role} />
        <ProfileBadge label="Plan" value={profile.subscriptionTier} tone="primary" />
        <ProfileBadge label="Theme" value={profile.theme} />
        <ProfileBadge label="Lang" value={profile.preferredLanguage.slice(0, 2)} />
      </div>
    </ProfilePanel>
  )
}

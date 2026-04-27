import type { TFunction } from "i18next"
import { Calendar, Clock, Mail, MapPin } from "lucide-react"
import { ProfileInfoRow } from "./ProfileInfoRow"
import { ProfileMetaLabel, ProfilePanel } from "./ProfilePanel"
import type { ProfileData } from "./profileTypes"
import { formatProfileDate } from "./profileUtils"

interface ProfileAboutPanelProps {
  profile: ProfileData
  t: TFunction
}

export function ProfileAboutPanel({ profile, t }: ProfileAboutPanelProps) {
  return (
    <ProfilePanel className="p-4">
      <ProfileMetaLabel>{t("profile.about")}</ProfileMetaLabel>
      <div className="mt-3 space-y-2.5">
        <ProfileInfoRow icon={<Mail className="h-3.5 w-3.5" />} label={t("profile.email")} value={profile.email} />
        <ProfileInfoRow icon={<Calendar className="h-3.5 w-3.5" />} label={t("profile.birth_date")} value={formatProfileDate(profile.birthDate)} />
        <ProfileInfoRow icon={<Clock className="h-3.5 w-3.5" />} label={t("profile.last_active")} value={formatProfileDate(profile.lastLoginAt)} />
        <ProfileInfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="Location" value={profile.address} />
      </div>
    </ProfilePanel>
  )
}

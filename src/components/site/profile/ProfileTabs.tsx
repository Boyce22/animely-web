import type { TFunction } from "i18next"
import { ProfileTabButton } from "./ProfileTabButton"
import { ProfileTabStatus } from "./ProfileTabStatus"
import type { ProfileData, ProfileTab } from "./profileTypes"

interface ProfileTabsProps {
  activeTab: ProfileTab
  tabs: ProfileTab[]
  profile: ProfileData
  onTabChange: (tab: ProfileTab) => void
  t: TFunction
}

export function ProfileTabs({ activeTab, tabs, profile, onTabChange, t }: ProfileTabsProps) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border border-border bg-card">
      <div className="flex min-w-0 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <ProfileTabButton
            key={tab}
            label={t(`profile.tab_${tab}`)}
            isActive={activeTab === tab}
            onClick={() => onTabChange(tab)}
          />
        ))}
      </div>

      <ProfileTabStatus profile={profile} />
    </div>
  )
}

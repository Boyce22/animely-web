import type { TFunction } from "i18next"
import { Eye, EyeOff, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProfileData, ProfileTab } from "./profileTypes"

interface ProfileTabsProps {
  activeTab: ProfileTab
  tabs: ProfileTab[]
  profile: ProfileData
  onTabChange: (tab: ProfileTab) => void
  t: TFunction
}

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-11 shrink-0 items-center border-b-2 px-4 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors",
        isActive
          ? "border-primary bg-secondary text-foreground"
          : "border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
      )}
    >
      {label}
    </button>
  )
}

function TabStatus({ profile }: { profile: ProfileData }) {
  return (
    <div className="hidden shrink-0 items-center gap-3 px-3 text-[11px] text-muted-foreground md:flex">
      <span className="inline-flex items-center gap-1.5">
        {profile.isProfilePublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        {profile.isProfilePublic ? "Public" : "Private"}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Shield className="h-3 w-3" />
        {profile.role}
      </span>
    </div>
  )
}

export function ProfileTabs({ activeTab, tabs, profile, onTabChange, t }: ProfileTabsProps) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border border-border bg-card">
      <div className="flex min-w-0 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <TabButton
            key={tab}
            label={t(`profile.tab_${tab}`)}
            isActive={activeTab === tab}
            onClick={() => onTabChange(tab)}
          />
        ))}
      </div>

      <TabStatus profile={profile} />
    </div>
  )
}

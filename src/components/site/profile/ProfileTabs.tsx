import type { TFunction } from "i18next"
import { cn } from "@/lib/utils"
import type { ProfileData, ProfileTab } from "./profileTypes"

interface ProfileTabsProps {
  activeTab: ProfileTab
  tabs: ProfileTab[]
  profile: ProfileData
  onTabChange: (tab: ProfileTab) => void
  t: TFunction
}

export function ProfileTabs({ activeTab, tabs, onTabChange, t }: ProfileTabsProps) {
  return (
    <div className="flex bg-[#111]/80 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden p-1.5 shadow-xl">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "flex-1 h-12 text-[14px] font-black uppercase tracking-wider transition-all rounded-lg",
            activeTab === tab
              ? "bg-white/10 text-white shadow-lg shadow-black/20 border border-white/5"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
          )}
        >
          {t(`profile.tab_${tab}`)}
        </button>
      ))}
    </div>
  )
}

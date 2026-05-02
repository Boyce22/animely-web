import { memo } from "react"
import { useTranslation } from "react-i18next"
import { ShareIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import type { ProfilePageTab } from "./profileTypes"

interface ProfileTopBarProps {
  activeTab: ProfilePageTab
  onTabChange: (tab: ProfilePageTab) => void
  editMode: boolean
  onEnterEdit: () => void
  onShare: () => void
  isDraft: boolean
}

const TABS: { id: ProfilePageTab; key: string }[] = [
  { id: "profile",    key: "profile.tab_profile"    },
  { id: "anime_list", key: "profile.tab_anime_list" },
  { id: "manga_list", key: "profile.tab_manga_list" },
  { id: "favorites",  key: "profile.following"       },
  { id: "activity",   key: "profile.tab_activity"   },
  { id: "reviews",    key: "profile.tab_reviews"    },
]

function ProfileTopBarComponent({ activeTab, onTabChange, editMode, onEnterEdit, onShare, isDraft }: ProfileTopBarProps) {
  const { t } = useTranslation()

  if (editMode) return null

  return (
    <div className="flex h-[52px] shrink-0 items-center border-b border-white/[0.07] bg-[#0a0a0a] px-8 z-20">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={[
            "flex h-[52px] cursor-pointer items-center gap-1.5 border-b-2 px-5 text-[15px] font-[600] whitespace-nowrap transition-[color,border-color] bg-transparent border-t-0 border-l-0 border-r-0 font-[inherit]",
            activeTab === tab.id
              ? "border-b-red-500 text-white"
              : "border-b-transparent text-white/40 hover:text-white/80",
          ].join(" ")}
        >
          {t(tab.key)}
        </button>
      ))}

      <div className="ml-auto flex items-center gap-2.5">
        {isDraft && (
          <span className="border border-orange-400/30 bg-orange-400/15 px-3 py-[3px] text-[11px] font-[800] uppercase tracking-[0.08em] text-orange-300">
            {t("profile.draft")}
          </span>
        )}
        <button
          onClick={onEnterEdit}
          className="flex cursor-pointer items-center gap-1.5 border border-white/[0.07] bg-transparent px-4 py-[9px] text-[13px] font-[600] text-white/50 transition-[color,border-color] hover:border-white/[0.12] hover:text-white font-[inherit]"
        >
          <PencilSquareIcon className="h-4 w-4" />
          {t("profile.edit_profile")}
        </button>
        <button
          onClick={onShare}
          className="flex cursor-pointer items-center gap-1.5 border border-white/[0.07] bg-transparent px-4 py-[9px] text-[13px] font-[600] text-white/50 transition-[color,border-color] hover:border-white/[0.12] hover:text-white font-[inherit]"
        >
          <ShareIcon className="h-4 w-4" />
          {t("profile.share")}
        </button>
      </div>
    </div>
  )
}

export const ProfileTopBar = memo(ProfileTopBarComponent)

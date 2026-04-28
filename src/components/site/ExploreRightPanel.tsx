import { useTranslation } from "react-i18next"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { FriendActivitySection } from "@/components/site/explore-right/FriendActivitySection"
import { NewsSection } from "@/components/site/explore-right/NewsSection"
import { RecommendedSection } from "@/components/site/explore-right/RecommendedSection"
import { TopWeekSection } from "@/components/site/explore-right/TopWeekSection"
import { FRIEND_ACTIVITY, NEWS, RECOMMENDED, TOP_WEEK } from "@/components/site/explore-right/exploreRightData"
import { cn } from "@/lib/utils"
import { useRightPanelState } from "@/hooks/use-right-panel-state"

export function ExploreRightPanel() {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useRightPanelState()

  return (
    <aside
      className={cn(
        "flex-shrink-0 border-l border-white/[0.07] bg-background relative transition-[width] duration-300 ease-in-out flex flex-col h-full",
        isExpanded ? "w-[320px]" : "w-[0px] border-l-0"
      )}
    >
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className={cn(
          "absolute top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-black/40 backdrop-blur-xl text-white/50 shadow-xl transition-all duration-300 hover:scale-110 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white",
          isExpanded ? "left-[-16px]" : "left-[-44px]"
        )}
        title={isExpanded ? t("explore.collapse_panel", "Recolher painel") : t("explore.expand_panel", "Expandir painel")}
      >
        {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide transition-all duration-300 w-[320px]",
          isExpanded ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <TopWeekSection
          items={TOP_WEEK}
          title={t("explore.top_week")}
          link={t("explore.see_ranking")}
        />
        <FriendActivitySection
          items={FRIEND_ACTIVITY}
          title={t("explore.friend_activity")}
          link={t("explore.see_all")}
        />
        <NewsSection
          items={NEWS}
          title={t("explore.news")}
          link={t("explore.see_all_news")}
        />
        <RecommendedSection
          items={RECOMMENDED}
          title={t("explore.recommended")}
        />
      </div>
    </aside>
  )
}

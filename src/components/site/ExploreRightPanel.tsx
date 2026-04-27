import { useTranslation } from "react-i18next"
import { FriendActivitySection } from "@/components/site/explore-right/FriendActivitySection"
import { NewsSection } from "@/components/site/explore-right/NewsSection"
import { RecommendedSection } from "@/components/site/explore-right/RecommendedSection"
import { TopWeekSection } from "@/components/site/explore-right/TopWeekSection"
import { FRIEND_ACTIVITY, NEWS, RECOMMENDED, TOP_WEEK } from "@/components/site/explore-right/exploreRightData"

export function ExploreRightPanel() {
  const { t } = useTranslation()

  return (
    <aside
      className="w-[320px] flex-shrink-0 border-l border-white/[0.07] overflow-y-auto overflow-x-hidden bg-background scrollbar-hide"
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
    </aside>
  )
}

import { useTranslation } from "react-i18next"
import { ContentCard } from "./ContentCard"
import { CONTENT_CARDS } from "./content-feed/contentFeedData"

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 bg-[#050505] px-5 pt-6 pb-3.5 text-[#3a3a3a] text-[12px] font-black tracking-widest uppercase">
      {label}
      <div className="flex-1 h-[1px] bg-[#3a3a3a] opacity-30" />
    </div>
  )
}

export function ContentFeedGrid() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2 bg-black pb-12">
      {/* SECTION 1: 1 Hero (Left) + 2 Featured (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:h-[560px]">
        <div className="md:col-span-8 h-[400px] md:h-full">
          <ContentCard data={CONTENT_CARDS.hero} className="w-full h-full" />
        </div>
        <div className="md:col-span-4 flex flex-col gap-2 h-[400px] md:h-full">
          <div className="flex-1 min-h-0">
            <ContentCard data={CONTENT_CARDS.featuredTop} className="w-full h-full" />
          </div>
          <div className="flex-1 min-h-0">
            <ContentCard data={CONTENT_CARDS.featuredBottom} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* SECTION 2: 3 Squares */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[900px] md:h-[360px]">
        <ContentCard data={CONTENT_CARDS.squareLeft} className="w-full h-full" />
        <ContentCard data={CONTENT_CARDS.squareCenter} className="w-full h-full" />
        <ContentCard data={CONTENT_CARDS.squareRight} className="w-full h-full" />
      </div>

      <SectionDivider label={t("explore.recommended_for_you")} />

      {/* SECTION 3: 1 Tall (Left) + 2 Squares top / 1 Wide bottom (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:h-[480px]">
        <div className="md:col-span-5 h-[400px] md:h-full">
          <ContentCard data={CONTENT_CARDS.recommendationHero} className="w-full h-full" />
        </div>
        <div className="md:col-span-7 flex flex-col gap-2 h-[400px] md:h-full">
          <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
            <ContentCard data={CONTENT_CARDS.recommendationTopLeft} className="w-full h-full" />
            <ContentCard data={CONTENT_CARDS.recommendationTopRight} className="w-full h-full" />
          </div>
          <div className="h-[140px] md:h-[200px]">
            <ContentCard data={CONTENT_CARDS.recommendationWide} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

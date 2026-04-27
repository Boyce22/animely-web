import { ExploreRightSectionHeader } from "./ExploreRightSectionHeader"
import type { RecommendedItem } from "./exploreRightData"

interface RecommendedSectionProps {
  items: readonly RecommendedItem[]
  title: string
}

export function RecommendedSection({ items, title }: RecommendedSectionProps) {
  return (
    <div className="p-4">
      <ExploreRightSectionHeader title={title} />
      <div>
        {items.map(item => (
          <div
            key={item.title}
            className="flex gap-2.5 items-center py-2 border-b border-white/[0.07] last:border-b-0 cursor-pointer"
          >
            <div className="w-12 h-[68px] flex-shrink-0 bg-[repeating-linear-gradient(-45deg,#151515_0,#151515_5px,#111_5px,#111_10px)] rounded-sm" />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold truncate text-foreground/90">{item.title}</p>
              <p className="text-[12px] font-medium text-muted-foreground/70 mt-1">{item.genre}</p>
              <p className="text-[13px] text-[#f4a261] font-black mt-1 font-mono">★ {item.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

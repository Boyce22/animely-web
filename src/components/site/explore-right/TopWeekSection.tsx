import { ExploreRightSectionHeader } from "./ExploreRightSectionHeader"
import type { TopWeekItem } from "./exploreRightData"

interface TopWeekSectionProps {
  items: readonly TopWeekItem[]
  title: string
  link: string
}

export function TopWeekSection({ items, title, link }: TopWeekSectionProps) {
  return (
    <div className="border-b border-white/[0.07] p-4">
      <ExploreRightSectionHeader title={title} link={link} />
      <div className="flex flex-col">
        {items.map(item => (
          <div
            key={item.rank}
            className="flex items-center gap-2 py-[7px] border-b border-white/[0.07] last:border-b-0 cursor-pointer"
          >
            <span
              className={`text-[11px] font-black font-mono w-4 flex-shrink-0 ${item.rank <= 2 ? "text-primary" : "text-white/20"}`}
            >
              {item.rank}
            </span>
            <span className="text-[12px] font-semibold flex-1 min-w-0 truncate text-foreground/90">
              {item.title}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground/60 flex-shrink-0">
              {item.score.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

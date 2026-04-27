import { ExploreRightSectionHeader } from "./ExploreRightSectionHeader"
import type { NewsItem } from "./exploreRightData"

interface NewsSectionProps {
  items: readonly NewsItem[]
  title: string
  link: string
}

export function NewsSection({ items, title, link }: NewsSectionProps) {
  return (
    <div className="border-b border-white/[0.07] p-4">
      <ExploreRightSectionHeader title={title} link={link} />
      <div>
        {items.map(item => (
          <div
            key={item.title}
            className="py-[9px] border-b border-white/[0.07] last:border-b-0 cursor-pointer group"
          >
            <p className="text-[11px] font-bold tracking-widest uppercase text-primary mb-1">
              {item.source}
            </p>
            <p className="text-[14px] font-bold leading-relaxed text-foreground/90 group-hover:text-foreground/60 transition-colors">
              {item.title}
            </p>
            <p className="text-[12px] font-bold text-white/30 font-mono mt-1">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

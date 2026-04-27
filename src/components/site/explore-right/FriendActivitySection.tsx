import { ExploreRightSectionHeader } from "./ExploreRightSectionHeader"
import type { FriendActivityItem } from "./exploreRightData"

interface FriendActivitySectionProps {
  items: readonly FriendActivityItem[]
  title: string
  link: string
}

export function FriendActivitySection({ items, title, link }: FriendActivitySectionProps) {
  return (
    <div className="border-b border-white/[0.07] p-4">
      <ExploreRightSectionHeader title={title} link={link} />
      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.user} className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-[14px] font-black text-white"
              style={{ background: item.gradient }}
            >
              {item.initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-foreground/90 leading-none mb-1">
                {item.user}
              </p>
              <p className="text-[13px] font-medium text-muted-foreground/70 truncate">{item.action}</p>
            </div>
            <span className="text-[12px] font-bold text-white/30 font-mono flex-shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

import type { RefObject } from "react"
import { FeedCard } from "@/components/site/FeedCard"
import type { FeedCardData } from "@/components/site/feed-card/feedCardTypes"

interface FeedCardScrollerProps {
  cards: FeedCardData[]
  scrollRef: RefObject<HTMLDivElement | null>
  onScroll: () => void
  onOpenComments: (count: number) => void
}

export function FeedCardScroller({ cards, scrollRef, onScroll, onOpenComments }: FeedCardScrollerProps) {
  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="h-full overflow-y-scroll scrollbar-hide"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {cards.map(card => (
        <FeedCard
          key={card.id}
          data={card}
          onComment={() => onOpenComments(card.comments)}
          onShare={() => {}}
        />
      ))}
    </div>
  )
}

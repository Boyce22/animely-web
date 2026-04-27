import { useState, useRef, useEffect, useCallback } from "react"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { FeedCommentsDrawer } from "@/components/site/FeedCommentsDrawer"
import { FeedCardScroller } from "@/components/site/feed/FeedCardScroller"
import { FEED_CARDS, FEED_TABS } from "@/components/site/feed/feedData"
import { FeedProgressCounter } from "@/components/site/feed/FeedProgressCounter"
import { FeedScrollHint } from "@/components/site/feed/FeedScrollHint"
import { FeedTopBar } from "@/components/site/feed/FeedTopBar"

export default function Feed() {
  const [activeTab, setActiveTab] = useState(0)
  const [currentCard, setCurrentCard] = useState(0)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [commentsCount, setCommentsCount] = useState(0)
  const [scrollHintVisible, setScrollHintVisible] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    hintTimerRef.current = setTimeout(() => setScrollHintVisible(false), 3000)
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current)
    }
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollTop / el.clientHeight)
    setCurrentCard(idx)
    setScrollHintVisible(false)
  }, [])

  const openComments = useCallback((count: number) => {
    setCommentsCount(count)
    setCommentsOpen(true)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <ExploreSidebar />

      <main className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 relative overflow-hidden" style={{ background: "#050505" }}>
          <FeedTopBar tabs={FEED_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
          <FeedProgressCounter current={currentCard + 1} total={FEED_CARDS.length} />
          <FeedCardScroller
            cards={FEED_CARDS}
            scrollRef={scrollRef}
            onScroll={handleScroll}
            onOpenComments={openComments}
          />
          <FeedScrollHint visible={scrollHintVisible} />
        </div>
      </main>

      <FeedCommentsDrawer
        open={commentsOpen}
        count={commentsCount}
        onClose={() => setCommentsOpen(false)}
      />
    </div>
  )
}

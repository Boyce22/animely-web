import { useState, useRef, useEffect, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import { FeedCard, FeedCardData } from "@/components/site/FeedCard"
import { FeedCommentsDrawer } from "@/components/site/FeedCommentsDrawer"
import { cn } from "@/lib/utils"

const FEED_CARDS: FeedCardData[] = [
  {
    id: "1",
    type: "cinematic",
    bgGradient: "linear-gradient(160deg, #0d1b2a 0%, #1b2838 40%, #2d1b0e 100%)",
    seriesTag: "ATTACK ON TITAN",
    epTag: "EP 87 · FINAL",
    caption: "The Rumbling approaches — humanity's last stand.",
    user: { initial: "E", gradient: "linear-gradient(135deg,#e63946,#6930c3)", username: "eren_cosplay" },
    timeAgo: "2h",
    series: { gradient: "linear-gradient(135deg,#2d6a4f,#52b788)", initial: "A" },
    likes: 4821,
    comments: 312,
    shares: 198,
    initialLiked: false,
  },
  {
    id: "2",
    type: "manga",
    bgGradient: "linear-gradient(160deg,#0a0012 0%,#1a0038 100%)",
    mangaLayout: "2x2",
    panels: [
      { label: "JJK · CH 261", gradient: "linear-gradient(135deg,#0d0020,#2d0060)", brightness: 0.7, spanRow: true },
      { label: "SUKUNA", gradient: "linear-gradient(135deg,#1a0020,#3d0010)", brightness: 0.65 },
      { label: "GOJO REBORN", gradient: "linear-gradient(135deg,#001020,#002860)", brightness: 0.7 },
    ],
    seriesTag: "JUJUTSU KAISEN",
    caption: "Chapter 261 just dropped and I'm not okay.",
    user: { initial: "M", gradient: "linear-gradient(135deg,#6930c3,#e63946)", username: "miyamoto_rei" },
    timeAgo: "45min",
    series: { gradient: "linear-gradient(135deg,#6930c3,#e040fb)", initial: "J" },
    likes: 7203,
    comments: 891,
    shares: 445,
    initialLiked: true,
  },
  {
    id: "3",
    type: "text",
    bgGradient: "linear-gradient(160deg,#0a1628 0%,#1a2840 50%,#0a0a18 100%)",
    bgDecorCross: true,
    quoteBody: <>Frieren não é sobre morte.<br />É sobre o que fica depois dela.</>,
    quoteBodyBebas: false,
    quoteSub: "Frieren: Beyond Journey's End — uma das obras mais belas dos últimos anos.",
    quoteScore: 9.4,
    customScrim: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.75) 90%, rgba(0,0,0,0.95) 100%)",
    seriesTag: "FRIEREN",
    user: { initial: "Y", gradient: "linear-gradient(135deg,#2d6a4f,#52b788)", username: "yuna_reads" },
    timeAgo: "1h",
    series: { gradient: "linear-gradient(135deg,#457b9d,#1d3557)", initial: "F" },
    likes: 3104,
    comments: 167,
    shares: 89,
    initialLiked: false,
  },
  {
    id: "4",
    type: "episode",
    bgGradient: "linear-gradient(160deg,#0a0806 0%,#1c1208 40%,#2a1800 100%)",
    bgDecorHLines: true,
    epTitle: "ARISE FROM THE SHADOW",
    epSubtitle: "Solo Leveling · Season 2 · Episode 4",
    seriesTag: "SOLO LEVELING",
    user: { initial: "K", gradient: "linear-gradient(135deg,#e63946,#6930c3)", username: "kurumi_fan" },
    timeAgo: "30min",
    series: { gradient: "linear-gradient(135deg,#e63946,#ff6b35)", initial: "S" },
    likes: 9512,
    comments: 623,
    shares: 801,
    initialLiked: false,
  },
  {
    id: "5",
    type: "spoiler",
    bgGradient: "linear-gradient(160deg,#06100a 0%,#0f2010 50%,#051008 100%)",
    hasSpoiler: true,
    spoilerSeriesLabel: "BLUE LOCK · CH 263",
    seriesTag: "BLUE LOCK",
    caption: "Isagi's final awakening — this panel broke the internet.",
    user: { initial: "L", gradient: "linear-gradient(135deg,#457b9d,#1d3557)", username: "luka_anime" },
    timeAgo: "3h",
    series: { gradient: "linear-gradient(135deg,#0096c7,#023e8a)", initial: "B" },
    likes: 5881,
    comments: 742,
    shares: 320,
    initialLiked: false,
  },
  {
    id: "6",
    type: "manga",
    bgGradient: "linear-gradient(160deg,#100008 0%,#20000e 100%)",
    mangaLayout: "strip",
    panels: [
      { label: "CSM · CH 168", gradient: "linear-gradient(135deg,#200008,#400010)", brightness: 0.6 },
      { label: "DENJI vs FELL", gradient: "linear-gradient(135deg,#080020,#180040)", brightness: 0.55 },
    ],
    seriesTag: "CHAINSAW MAN",
    caption: "Fujimoto did it again. Every panel is a painting.",
    user: { initial: "R", gradient: "linear-gradient(135deg,#e63946,#f4a261)", username: "rei_reads" },
    timeAgo: "5h",
    series: { gradient: "linear-gradient(135deg,#e63946,#c1121f)", initial: "C" },
    likes: 6340,
    comments: 489,
    shares: 271,
    initialLiked: true,
  },
  {
    id: "7",
    type: "text",
    bgGradient: "linear-gradient(160deg,#120a00 0%,#1e1000 50%,#0a0600 100%)",
    bgDecorHLines: true,
    quoteBodyBebas: true,
    quoteBody: "HUNTER × HUNTER VAI VOLTAR. EU ACREDITO.",
    quoteSub: "Togashi postou mais 10 páginas esta semana. A saga continua.",
    customScrim: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.8) 85%, rgba(0,0,0,0.95) 100%)",
    seriesTag: "HUNTER × HUNTER",
    user: { initial: "H", gradient: "linear-gradient(135deg,#f4a261,#e76f51)", username: "hxh_enjoyer" },
    timeAgo: "6h",
    series: { gradient: "linear-gradient(135deg,#f4a261,#e9c46a)", initial: "H" },
    likes: 11240,
    comments: 1083,
    shares: 932,
    initialLiked: false,
  },
]

const TABS = [
  { key: "tab_for_you" },
  { key: "tab_following" },
  { key: "tab_trending" },
  { key: "tab_manga" },
] as const

export default function Feed() {
  const { t } = useTranslation()
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
          <div
            className="absolute top-0 left-0 right-0 z-[20] flex items-center justify-between px-5"
            style={{
              height: 56,
              background: "linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.5) 80%, transparent 100%)",
            }}
          >
            <div className="flex items-center gap-0.5">
              {TABS.map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "px-3 py-1.5 text-[12px] font-bold tracking-[0.06em] uppercase transition-colors bg-transparent border-none cursor-pointer",
                    activeTab === i ? "text-foreground" : "text-white/35 hover:text-white/60",
                  )}
                >
                  {t(`feed.${tab.key}`)}
                  {activeTab === i && (
                    <div className="h-[2px] bg-primary mt-0.5 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <button className="text-[11px] font-black tracking-[0.08em] uppercase bg-primary text-white border-none px-3 py-1.5 cursor-pointer hover:opacity-85 transition-opacity">
              {t("feed.post_btn")}
            </button>
          </div>

          <div className="absolute top-4 right-4 z-[20] font-mono text-[10px] text-white/30 tracking-[0.1em] tabular-nums pointer-events-none">
            {currentCard + 1} / {FEED_CARDS.length}
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full overflow-y-scroll scrollbar-hide"
            style={{ scrollSnapType: "y mandatory" }}
          >
            {FEED_CARDS.map(card => (
              <FeedCard
                key={card.id}
                data={card}
                onComment={() => openComments(card.comments)}
                onShare={() => {}}
              />
            ))}
          </div>

          <div
            className={cn(
              "absolute bottom-8 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-1 pointer-events-none transition-opacity duration-500",
              scrollHintVisible ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30">
              {t("feed.scroll_hint")}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-white/25"
              style={{ animation: "blink 1.4s ease infinite" }}
            >
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
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

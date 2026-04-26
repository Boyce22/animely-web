import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FeedCardActions } from "./FeedCardActions"

const TEXTURE =
  "repeating-linear-gradient(-52deg, transparent, transparent 20px, rgba(255,255,255,0.013) 20px, rgba(255,255,255,0.013) 21px)"

const SCRIM =
  "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 25%, transparent 45%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)"

export interface FeedMangaPanel {
  gradient: string
  label: string
  brightness?: number
  spanRow?: boolean
}

export interface FeedCardData {
  id: string
  type: "cinematic" | "manga" | "text" | "episode" | "spoiler"

  bgGradient: string

  // manga
  mangaLayout?: "2x2" | "big-small" | "strip"
  panels?: FeedMangaPanel[]

  // text card
  quoteBody?: React.ReactNode
  quoteBodyBebas?: boolean
  quoteSub?: string
  quoteScore?: number
  bgDecorCross?: boolean
  bgDecorHLines?: boolean
  customScrim?: string

  // episode card
  epTitle?: string
  epSubtitle?: string

  // bottom info
  seriesTag?: string
  epTag?: string
  caption?: string

  // spoiler
  hasSpoiler?: boolean
  spoilerSeriesLabel?: string

  // user
  user: { initial: string; gradient: string; username: string }
  timeAgo: string

  // actions
  series: { gradient: string; initial: string }
  likes: number
  comments: number
  shares: number
  initialLiked?: boolean
}

interface Props {
  data: FeedCardData
  onComment: () => void
  onShare: () => void
}

function MangaGrid({ layout, panels }: { layout: string; panels: FeedMangaPanel[] }) {
  const gridStyle: React.CSSProperties =
    layout === "2x2"
      ? { gridTemplateColumns: "55% 45%", gridTemplateRows: "50% 50%", gap: 3 }
      : layout === "big-small"
      ? { gridTemplateColumns: "60% 40%", gridTemplateRows: "1fr", gap: 3 }
      : { gridTemplateColumns: "1fr", gridTemplateRows: "45% 55%", gap: 3 }

  return (
    <div
      className="absolute inset-0 grid"
      style={{ background: "#000", ...gridStyle }}
    >
      {panels.map((panel, i) => (
        <div
          key={i}
          className="overflow-hidden relative"
          style={{
            gridRow: panel.spanRow ? "span 2" : undefined,
            background: panel.gradient,
          }}
        >
          {/* diagonal texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: TEXTURE }}
          />
          {/* speed lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                i % 2 === 0
                  ? "repeating-conic-gradient(from 0deg at 110% 50%, rgba(255,255,255,0.015) 0deg, transparent 3deg, transparent 6deg)"
                  : "repeating-conic-gradient(from 0deg at -10% 50%, rgba(255,255,255,0.015) 0deg, transparent 4deg, transparent 8deg)",
            }}
          />
          {panel.brightness !== undefined && (
            <div
              className="absolute inset-0"
              style={{ background: `rgba(0,0,0,${1 - panel.brightness})` }}
            />
          )}
          <span className="absolute bottom-2 left-2.5 text-[8px] font-mono text-white/15 tracking-[0.06em] uppercase pointer-events-none">
            {panel.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function FeedCard({ data, onComment, onShare }: Props) {
  const { t } = useTranslation()
  const [spoilerRevealed, setSpoilerRevealed] = useState(false)

  const isManga = data.type === "manga"
  const isText = data.type === "text"
  const isEpisode = data.type === "episode"
  const hasSpoiler = data.hasSpoiler && !spoilerRevealed

  return (
    <div className="relative h-screen overflow-hidden flex flex-col snap-start" style={{ background: "#0a0a0a" }}>

      {/* ── Background ── */}
      {isManga && data.panels ? (
        <MangaGrid layout={data.mangaLayout ?? "strip"} panels={data.panels} />
      ) : (
        <div className="absolute inset-0">
          <div className="w-full h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0,0,1)] group-hover:scale-[1.025]"
            style={{ background: `${TEXTURE}, ${data.bgGradient}` }}
          />
          {/* text card decorative lines */}
          {data.bgDecorCross && (
            <>
              <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "40%", width: 1, background: "rgba(255,255,255,0.04)" }} />
              <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "30%", height: 1, background: "rgba(255,255,255,0.04)" }} />
            </>
          )}
          {data.bgDecorHLines && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 40px)" }}
            />
          )}
        </div>
      )}

      {/* ── Scrim ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: data.customScrim ?? SCRIM }}
      />

      {/* ── Text card center content ── */}
      {isText && (
        <div className="absolute inset-0 flex flex-col justify-center px-8 z-[5]"
          style={{ paddingTop: 60, paddingBottom: 160 }}
        >
          <div
            className="leading-[0.8] mb-4 text-white/[0.06] tracking-[-4px]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 100 }}
          >
            "
          </div>
          <div
            style={{
              fontFamily: data.quoteBodyBebas === false
                ? "'Space Grotesk', sans-serif"
                : "'Bebas Neue', sans-serif",
              fontSize: data.quoteBodyBebas === false ? 22 : 42,
              fontWeight: data.quoteBodyBebas === false ? 700 : 400,
              lineHeight: data.quoteBodyBebas === false ? 1.4 : 1.05,
              letterSpacing: data.quoteBodyBebas === false ? "-0.3px" : "0.04em",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {data.quoteBody}
          </div>
          {data.quoteSub && (
            <p className="mt-3.5 text-[13px] font-medium text-white/35 leading-[1.55]">
              {data.quoteSub}
            </p>
          )}
          {data.quoteScore !== undefined && (
            <div className="mt-5 flex items-center gap-2">
              <span className="text-[#f4a261] text-sm tracking-[2px]">★★★★★</span>
              <span className="font-mono text-lg font-black text-[#f4a261]">
                {data.quoteScore.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Episode card content ── */}
      {isEpisode && (
        <div className="absolute left-0 right-20 z-[5]"
          style={{ bottom: 140, padding: "0 20px" }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className="w-[5px] h-[5px] rounded-full bg-primary"
              style={{ animation: "blink 1.4s ease infinite" }}
            />
            <span className="text-[10px] font-black tracking-[0.16em] uppercase text-primary">
              {t("feed.new_episode")}
            </span>
          </div>
          <div
            className="text-white leading-none mb-1.5"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 46, letterSpacing: "0.03em" }}
          >
            {data.epTitle}
          </div>
          <p className="text-sm text-white/50 font-medium mb-5">{data.epSubtitle}</p>
          <button className="inline-flex items-center gap-2 bg-primary text-white font-black text-[12px] tracking-[0.08em] uppercase px-[22px] py-[10px] border-none cursor-pointer hover:opacity-85 hover:scale-[1.02] transition-all">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 2l9 5-9 5V2z" fill="white" />
            </svg>
            {t("feed.watch_now")}
          </button>
        </div>
      )}

      {/* ── Spoiler veil ── */}
      {hasSpoiler && (
        <div
          className="absolute inset-0 z-[15] flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)" }}
        >
          <span className="text-[10px] font-black tracking-[0.16em] uppercase text-white/25">
            {data.spoilerSeriesLabel
              ? `${t("feed.spoiler_label")} — ${data.spoilerSeriesLabel}`
              : t("feed.spoiler_label")}
          </span>
          <button
            onClick={() => setSpoilerRevealed(true)}
            className="border border-white/20 text-white/45 bg-transparent font-bold text-[12px] tracking-[0.1em] uppercase px-6 py-2 cursor-pointer hover:border-white/40 hover:text-white transition-all"
          >
            {t("feed.spoiler_reveal")}
          </button>
        </div>
      )}

      {/* ── Bottom info ── */}
      {(data.seriesTag || data.caption || !isEpisode) && (
        <div className="absolute z-[10]" style={{ bottom: 0, left: 0, right: 80, padding: "0 20px 28px" }}>
          {(data.seriesTag || data.epTag) && (
            <div className="flex items-center gap-2 mb-2">
              {data.seriesTag && (
                <span className="text-[10px] font-black tracking-[0.12em] uppercase text-primary bg-primary/[0.12] border border-primary/35 px-2.5 py-[3px]">
                  {data.seriesTag}
                </span>
              )}
              {data.epTag && (
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase text-white/45 border border-white/12 px-2.5 py-[3px]">
                  {data.epTag}
                </span>
              )}
            </div>
          )}

          {data.caption && (
            <p
              className="text-white mb-2.5"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: "0.04em",
                lineHeight: 1.05,
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
              }}
            >
              {data.caption}
            </p>
          )}

          {/* User meta */}
          <div className="flex items-center gap-2">
            <div
              className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-black border border-white/25 text-white"
              style={{ background: data.user.gradient }}
            >
              {data.user.initial}
            </div>
            <span className="text-[12px] font-semibold text-white/60">@{data.user.username}</span>
            <span className="text-white/20 text-[10px]">·</span>
            <span className="text-[11px] text-white/35 font-mono">{data.timeAgo}</span>
          </div>
        </div>
      )}

      {/* ── Action bar (right) ── */}
      <div className="absolute z-[10]" style={{ right: 18, bottom: 140 }}>
        <FeedCardActions
          series={data.series}
          likes={data.likes}
          comments={data.comments}
          shares={data.shares}
          initialLiked={data.initialLiked}
          onComment={onComment}
          onShare={onShare}
        />
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.08] z-[10]">
        <div className="h-full bg-primary w-0" />
      </div>
    </div>
  )
}

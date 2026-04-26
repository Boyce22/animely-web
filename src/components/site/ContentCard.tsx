import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heart, MessageCircle, Bookmark } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

const TEXTURE =
  "repeating-linear-gradient(-55deg, transparent, transparent 18px, rgba(255,255,255,0.012) 18px, rgba(255,255,255,0.012) 19px)"

const SCRIM_BOTTOM =
  "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.85) 100%)"

const SCRIM_TOP_LEFT =
  "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, transparent 35%)"

export interface ContentCardData {
  phGradient: string
  user: { initial: string; gradient: string; username: string }
  badge?: { type: "new" | "ep" | "score"; text: string }
  href: string
  series: string
  caption: string
  bigCaption?: boolean
  likes: number
  comments: number
  initialLiked?: boolean
  hasSpoiler?: boolean
  hasBookmark?: boolean
}

interface Props {
  data: ContentCardData
  height?: number
  className?: string
  style?: React.CSSProperties
}

export function ContentCard({ data, height, className, style }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(data.initialLiked ?? false)
  const [likeCount, setLikeCount] = useState(data.likes)
  const [saved, setSaved] = useState(false)
  const [spoilerRevealed, setSpoilerRevealed] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(v => !v)
    setLikeCount(c => (liked ? c - 1 : c + 1))
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(v => !v)
  }

  const openContent = () => {
    navigate(data.href)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openContent()
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openContent}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative overflow-hidden cursor-pointer group flex-shrink-0 bg-[#111] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      style={{ height: height ?? "100%", ...style }}
    >
      {/* Gradient placeholder + diagonal texture */}
      <div
        className="absolute inset-0"
        style={{ background: `${TEXTURE}, ${data.phGradient}` }}
      />

      {/* Top-left corner scrim (for user tag readability) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: SCRIM_TOP_LEFT }}
      />

      {/* Bottom gradient scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: SCRIM_BOTTOM }}
      />

      {/* Hover red overlay */}
      <div className="absolute inset-0 bg-[rgba(230,57,70,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* User tag — top-left */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-[5]">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black border border-white/20 flex-shrink-0 text-white"
          style={{ background: data.user.gradient }}
        >
          {data.user.initial}
        </div>
        <span
          className="text-[10px] font-semibold text-white/70 tracking-[0.04em]"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
        >
          @{data.user.username}
        </span>
      </div>

      {/* Badge — top-right */}
      {data.badge && (
        <div
          className={cn(
            "absolute top-2.5 right-2.5 text-[9px] font-black tracking-[0.1em] uppercase px-2 py-0.5 z-[5]",
            data.badge.type === "new" && "bg-primary text-white",
            data.badge.type === "ep" &&
              "bg-black/70 text-white/80 border border-white/15",
            data.badge.type === "score" &&
              "bg-black/70 text-[#f4a261] border border-[#f4a261]/30 font-mono",
          )}
        >
          {data.badge.text}
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3.5 pt-3 z-[5]">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
          <span className="text-[9px] font-black tracking-[0.14em] uppercase text-primary">
            {data.series}
          </span>
        </div>

        <p
          className={cn(
            "text-white/95",
            data.bigCaption
              ? "text-[22px] leading-[1.1] tracking-[0.04em]"
              : "text-[13px] font-semibold leading-[1.35]",
          )}
          style={{
            fontFamily: data.bigCaption ? "'Bebas Neue', sans-serif" : undefined,
            textShadow: "0 1px 8px rgba(0,0,0,0.9)",
          }}
        >
          {data.caption}
        </p>

        <div className="flex items-center gap-3.5 mt-2">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1 text-[11px] transition-colors bg-transparent border-none p-0 cursor-pointer",
              liked ? "text-primary" : "text-white/50 hover:text-white/90",
            )}
          >
            <Heart
              className="w-3 h-3"
              fill={liked ? "currentColor" : "none"}
              strokeWidth={1.2}
            />
            <span>{likeCount}</span>
          </button>

          <button className="flex items-center gap-1 text-[11px] text-white/50 hover:text-white/90 transition-colors bg-transparent border-none p-0 cursor-pointer">
            <MessageCircle className="w-3 h-3" strokeWidth={1.2} />
            <span>{data.comments}</span>
          </button>

          {data.hasBookmark && (
            <button
              onClick={handleBookmark}
              className={cn(
                "flex items-center gap-1 text-[11px] transition-colors bg-transparent border-none p-0 cursor-pointer",
                saved ? "text-primary" : "text-white/50 hover:text-white/90",
              )}
            >
              <Bookmark
                className="w-3 h-3"
                fill={saved ? "currentColor" : "none"}
                strokeWidth={1.2}
              />
            </button>
          )}
        </div>
      </div>

      {/* Spoiler veil */}
      {data.hasSpoiler && !spoilerRevealed && (
        <div
          className="absolute inset-0 z-[6] flex flex-col items-center justify-center gap-2 transition-opacity duration-200"
          style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)" }}
        >
          <span className="text-[9px] font-black tracking-[0.14em] uppercase text-white/30">
            {t("explore.spoiler_label")}
          </span>
          <button
            onClick={e => {
              e.stopPropagation()
              setSpoilerRevealed(true)
            }}
            className="text-[11px] font-bold tracking-[0.06em] uppercase border border-white/20 text-white/50 hover:border-white/40 hover:text-white bg-transparent cursor-pointer px-4 py-1.5 transition-colors"
          >
            {t("explore.spoiler_reveal")}
          </button>
        </div>
      )}
    </div>
  )
}

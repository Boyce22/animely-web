import type { MouseEvent } from "react"
import { Bookmark, Heart, MessageCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { ContentCardData } from "./contentCardTypes"

const TEXTURE =
  "repeating-linear-gradient(-55deg, transparent, transparent 18px, rgba(255,255,255,0.012) 18px, rgba(255,255,255,0.012) 19px)"

const SCRIM_BOTTOM =
  "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.85) 100%)"

const SCRIM_TOP_LEFT =
  "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, transparent 35%)"

export function ContentCardBackground({ gradient }: { gradient: string }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: `${TEXTURE}, ${gradient}` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: SCRIM_TOP_LEFT }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: SCRIM_BOTTOM }}
      />
      <div className="absolute inset-0 bg-[rgba(230,57,70,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </>
  )
}

export function ContentCardUserBadge({ user, badge }: { user: ContentCardData["user"]; badge?: ContentCardData["badge"] }) {
  return (
    <>
      <div className="absolute top-5 left-5 flex items-center gap-3 z-[5]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-black border-2 border-white/20 flex-shrink-0 text-white"
          style={{ background: user.gradient }}
        >
          {user.initial}
        </div>
        <span
          className="text-[15px] font-bold text-white/80 tracking-[0.04em]"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
        >
          @{user.username}
        </span>
      </div>

      {badge && (
        <div
          className={cn(
            "absolute top-5 right-5 text-[14px] font-black tracking-widest uppercase px-4 py-1.5 rounded-md z-[5]",
            badge.type === "new" && "bg-primary text-white",
            badge.type === "ep" &&
            "bg-black/70 text-white/80 border border-white/15",
            badge.type === "score" &&
            "bg-black/70 text-[#f4a261] border border-[#f4a261]/30 font-mono",
          )}
        >
          {badge.text}
        </div>
      )}
    </>
  )
}

interface ContentCardBottomContentProps {
  data: ContentCardData
  liked: boolean
  likeCount: number
  saved: boolean
  onLike: (e: MouseEvent) => void
  onBookmark: (e: MouseEvent) => void
}

export function ContentCardBottomContent({ data, liked, likeCount, saved, onLike, onBookmark }: ContentCardBottomContentProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-5 z-[5]">
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
        <span className="text-[14px] font-black tracking-widest uppercase text-primary">
          {data.series}
        </span>
      </div>

      <p
        className={cn(
          "text-white/95",
          data.bigCaption
            ? "text-[36px] leading-[1.1] tracking-[0.04em]"
            : "text-[22px] font-bold leading-[1.3]",
        )}
        style={{
          fontFamily: data.bigCaption ? "'Bebas Neue', sans-serif" : undefined,
          textShadow: "0 1px 8px rgba(0,0,0,0.9)",
        }}
      >
        {data.caption}
      </p>

      <div className="flex items-center gap-5 mt-4">
        <button
          onClick={onLike}
          className={cn(
            "flex items-center gap-2 text-[15px] font-bold transition-colors bg-transparent border-none p-0 cursor-pointer",
            liked ? "text-primary" : "text-white/50 hover:text-white/90",
          )}
        >
          <Heart
            className="w-5 h-5"
            fill={liked ? "currentColor" : "none"}
            strokeWidth={1.2}
          />
          <span>{likeCount}</span>
        </button>

        <button className="flex items-center gap-2 text-[15px] font-bold text-white/50 hover:text-white/90 transition-colors bg-transparent border-none p-0 cursor-pointer">
          <MessageCircle className="w-5 h-5" strokeWidth={1.2} />
          <span>{data.comments}</span>
        </button>

        {data.hasBookmark && (
          <button
            onClick={onBookmark}
            className={cn(
              "flex items-center gap-2 text-[15px] font-bold transition-colors bg-transparent border-none p-0 cursor-pointer",
              saved ? "text-primary" : "text-white/50 hover:text-white/90",
            )}
          >
            <Bookmark
              className="w-5 h-5"
              fill={saved ? "currentColor" : "none"}
              strokeWidth={1.2}
            />
          </button>
        )}
      </div>
    </div>
  )
}

export function ContentCardSpoilerOverlay({ onReveal }: { onReveal: () => void }) {
  const { t } = useTranslation()

  return (
    <div
      className="absolute inset-0 z-[6] flex flex-col items-center justify-center gap-2 transition-opacity duration-200"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)" }}
    >
      <span className="text-[12px] font-black tracking-widest uppercase text-white/40">
        {t("explore.spoiler_label")}
      </span>
      <button
        onClick={e => {
          e.stopPropagation()
          onReveal()
        }}
        className="text-[14px] font-bold tracking-widest uppercase border-2 rounded-md border-white/20 text-white/60 hover:border-white/50 hover:text-white bg-transparent cursor-pointer px-6 py-2 transition-all"
      >
        {t("explore.spoiler_reveal")}
      </button>
    </div>
  )
}

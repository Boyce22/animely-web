import { useState } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

export interface FeedCardActionsProps {
  series: { gradient: string; initial: string }
  likes: number
  comments: number
  shares: number
  initialLiked?: boolean
  initialSaved?: boolean
  onComment?: () => void
  onShare?: () => void
}

const DROP_SHADOW = { filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }

function ActionBtn({
  onClick,
  liked,
  label,
  children,
}: {
  onClick: () => void
  liked?: boolean
  label: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 bg-transparent border-none p-0 cursor-pointer",
        "transition-[color,transform] duration-150 hover:scale-[1.12]",
        liked ? "text-primary" : "text-white/85",
      )}
    >
      {children}
      <span
        className="text-[11px] font-bold text-white/70 leading-none tracking-[0.02em]"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
      >
        {label}
      </span>
    </button>
  )
}

export function FeedCardActions({
  series,
  likes,
  comments,
  shares,
  initialLiked = false,
  initialSaved = false,
  onComment,
  onShare,
}: FeedCardActionsProps) {
  const { t } = useTranslation()
  const [liked, setLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(likes)
  const [saved, setSaved] = useState(initialSaved)

  const handleLike = () => {
    setLiked(v => !v)
    setLikeCount(c => (liked ? c - 1 : c + 1))
  }

  const handleSave = () => {
    setSaved(v => !v)
  }

  const formatCount = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k"
    return String(n)
  }

  return (
    <div className="flex flex-col items-center gap-[22px]">
      {/* Series avatar */}
      <div className="flex flex-col items-center gap-1.5">
        <div
          className="w-11 h-11 border-2 border-white/30 overflow-hidden relative flex items-center justify-center text-base font-black text-white"
          style={{ background: series.gradient }}
        >
          {series.initial}
        </div>
        <div
          className="w-4 h-4 rounded-full bg-primary border-2 border-black flex items-center justify-center -mt-2.5 relative z-10"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4 1v6M1 4h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Like */}
      <ActionBtn onClick={handleLike} liked={liked} label={formatCount(likeCount)}>
        <svg width="28" height="28" viewBox="0 0 28 28" style={DROP_SHADOW}
          fill={liked ? "currentColor" : "none"}
          stroke={liked ? undefined : "currentColor"}
          strokeWidth={liked ? undefined : 1.8}
        >
          <path d="M14 25S3 18 3 10.5a7 7 0 0 1 11-5.74A7 7 0 0 1 25 10.5C25 18 14 25 14 25z" />
        </svg>
      </ActionBtn>

      {/* Comment */}
      <ActionBtn onClick={onComment ?? (() => {})} label={formatCount(comments)}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
          style={DROP_SHADOW}
        >
          <path d="M3 3h22v18H16l-3 3.5L10 21H3V3z" />
        </svg>
      </ActionBtn>

      {/* Share */}
      <ActionBtn onClick={onShare ?? (() => {})} label={formatCount(shares)}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          style={DROP_SHADOW}
        >
          <path d="M5 18V10a4 4 0 0 1 4-4h9M19 5l4 4-4 4" />
          <path d="M23 18v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4" />
        </svg>
      </ActionBtn>

      {/* Save */}
      <ActionBtn onClick={handleSave} liked={saved} label={saved ? t("feed.saved") : t("feed.save")}>
        <svg width="26" height="26" viewBox="0 0 26 26"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
          style={DROP_SHADOW}
        >
          <path d="M4 3h18v21l-9-5-9 5V3z" />
        </svg>
      </ActionBtn>
    </div>
  )
}

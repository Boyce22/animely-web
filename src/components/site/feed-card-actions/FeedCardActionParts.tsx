import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FeedActionButtonProps {
  onClick: () => void
  liked?: boolean
  label: ReactNode
  children: ReactNode
}

export function FeedActionButton({ onClick, liked, label, children }: FeedActionButtonProps) {
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

interface FeedSeriesActionAvatarProps {
  series: { gradient: string; initial: string }
}

export function FeedSeriesActionAvatar({ series }: FeedSeriesActionAvatarProps) {
  return (
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
  )
}

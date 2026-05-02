import { memo, useCallback, useEffect, useRef, useState } from "react"
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {}

function WidgetMusicComponent(context: Props) {
  const { t } = useTranslation()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  const rafRef = useRef<number | null>(null)

  const animate = useCallback(() => {
    setProgress((p) => {
      if (p >= 100) return 0
      return p + 0.015
    })
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (playing) {
      rafRef.current = requestAnimationFrame(animate)
    } else if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [playing, animate])

  return (
    <Widget
      id="music"
      title={t("profile.now_playing")}
      {...context}
    >
      <div className="flex h-full flex-col items-center justify-center gap-[7px] p-2.5">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-purple-500/35",
            "bg-gradient-to-br from-[#1a0a2e] to-[#4a1a6e]",
            playing ? "animate-spin" : "",
          ].join(" ")}
          style={{ animationDuration: "4s" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2.5" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" />
            <path d="M8 1v2.5M8 12.5V15M1 8h2.5M12.5 8H15" stroke="rgba(167,139,250,0.25)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-center">
          <div className="text-[11px] font-[700] leading-tight">Kabeneri OST — Unato</div>
          <div className="mt-0.5 text-[10px] text-white/40">Hiroyuki Sawano</div>
        </div>
        <div className="h-[2px] w-full cursor-pointer bg-white/10">
          <div className="h-full bg-red-500 transition-none" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-2.5">
          <button className="text-white/40 hover:text-white transition-colors p-0 border-none bg-transparent cursor-pointer">
            <BackwardIcon className="h-[13px] w-[13px]" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-red-500 text-white hover:opacity-85 transition-opacity cursor-pointer border-none"
          >
            {playing
              ? <PauseIcon className="h-[9px] w-[9px]" />
              : <PlayIcon className="h-[9px] w-[9px]" />
            }
          </button>
          <button className="text-white/40 hover:text-white transition-colors p-0 border-none bg-transparent cursor-pointer">
            <ForwardIcon className="h-[13px] w-[13px]" />
          </button>
        </div>
      </div>
    </Widget>
  )
}

export const WidgetMusic = memo(WidgetMusicComponent)

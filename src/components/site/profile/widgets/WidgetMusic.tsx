import { memo, useCallback, useEffect, useRef, useState } from "react"
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

type Props = WidgetContextValue

const TRACK_DURATION = 204
const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

const WV_H  = [5, 10, 18, 26, 32, 28, 20, 12, 22, 8, 15]
const WV_D  = ["0s","0.08s","0.18s","0.12s","0.04s","0.22s","0.16s","0.28s","0.06s","0.20s","0.10s"]
const WV_PD = ["0.62s","0.50s","0.44s","0.56s","0.48s","0.60s","0.52s","0.42s","0.58s","0.66s","0.46s"]

function WidgetMusicComponent(context: Props) {
  const { t } = useTranslation()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  const rafRef = useRef<number | null>(null)

  const animate = useCallback(() => {
    setProgress((p) => (p >= 100 ? 0 : p + 0.012))
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (playing) {
      rafRef.current = requestAnimationFrame(animate)
    } else if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [playing, animate])

  const elapsed = Math.floor((progress / 100) * TRACK_DURATION)

  const accent    = "#e63946"
  const accentRgb = "230,57,70"

  return (
    <Widget id="music" title={t("profile.now_playing")} {...context}>
      <div className="relative flex h-full flex-col overflow-hidden">

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-[2000ms]"
          style={{
            background: `radial-gradient(ellipse 90% 55% at 50% 15%, rgba(${accentRgb},0.11) 0%, transparent 70%)`,
          }}
        />

        <div className="relative flex flex-1 flex-col items-center justify-center gap-[10px] px-4 py-3">

          {/* Vinyl disc */}
          <div className="relative flex shrink-0 items-center justify-center">
            <div
              className="absolute h-[100px] w-[100px] rounded-full transition-all duration-[1400ms]"
              style={{
                background: `radial-gradient(circle, rgba(${accentRgb},0.18) 0%, transparent 65%)`,
                filter: "blur(10px)",
              }}
            />
            <div
              className="absolute h-[80px] w-[80px] rounded-full border border-dashed transition-[border-color] duration-[1200ms]"
              style={{
                borderColor: playing ? "rgba(230,57,70,0.18)" : "rgba(230,57,70,0.14)",
                animation: playing ? "spin 10s linear infinite" : "none",
              }}
            />
            <div
              className={[
                "relative flex h-[64px] w-[64px] items-center justify-center rounded-full border-[1.5px]",
                "transition-[border-color,box-shadow] duration-[1200ms]",
                playing ? "animate-spin border-red-500/35" : "border-red-500/30",
              ].join(" ")}
              style={{
                background: "radial-gradient(circle at 40% 35%, #3a0e6a 0%, #1a0a2e 40%, #0d0618 100%)",
                animationDuration: "4s",
                boxShadow: `0 0 0 1px rgba(230,57,70,0.22), 0 0 22px rgba(230,57,70,0.18), 0 8px 24px rgba(0,0,0,0.65)`,
              }}
            >
              <div
                className="absolute inset-[6px] rounded-full"
                style={{
                  background: "repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 3px, rgba(255,255,255,0.022) 3px, rgba(255,255,255,0.022) 3.5px)",
                }}
              />
              <div
                className="relative z-10 h-[18px] w-[18px] rounded-full border border-red-300/20"
                style={{ background: "linear-gradient(135deg,#3a1a6a,#5a2a9a)" }}
              >
                <div className="absolute inset-[5px] rounded-full bg-black/50" />
              </div>
            </div>
          </div>

          {/* Track info */}
          <div className="w-full text-center">
            <div className="flex items-center justify-center gap-1.5">
              {playing && (
                <span className="relative flex h-[7px] w-[7px] shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                  <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-red-400" />
                </span>
              )}
              <span className="truncate text-[13px] font-[700] leading-[1.3] text-white/88">
                Kabeneri OST — Unato
              </span>
            </div>
            <div className="mt-[4px] text-[11px] text-white/40">Hiroyuki Sawano</div>
          </div>

          {/* Waveform */}
          <div className="flex items-end justify-center gap-[3px]" style={{ height: "36px" }}>
            {WV_H.map((h, i) => (
              <div
                key={i}
                className={playing ? "animate-wv-play" : "animate-wv-idle"}
                style={{
                  width: "3px",
                  height: `${h}px`,
                  borderRadius: "2px",
                  background: `rgba(230,57,70,${0.4 + (h / 32) * 0.55})`,
                  transformOrigin: "bottom",
                  animationDelay: WV_D[i],
                  animationDuration: playing ? WV_PD[i] : "1.4s",
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div className="group relative h-[3px] w-full cursor-pointer rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full transition-[background] duration-[800ms]"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #c1121f, #e63946, #ff6b6b)",
                }}
              />
              <div
                className="absolute h-[10px] w-[10px] rounded-full opacity-0 shadow-[0_0_0_2px_rgba(0,0,0,0.7)] transition-[opacity,background] duration-[800ms] group-hover:opacity-100"
                style={{
                  left: `${progress}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: accent,
                }}
              />
            </div>
            <div className="mt-[5px] flex justify-between font-mono text-[10px] text-white/[0.22]">
              <span>{formatTime(elapsed)}</span>
              <span>{formatTime(TRACK_DURATION)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button className="cursor-pointer border-none bg-transparent p-0 text-white/25 transition-[color,transform] hover:scale-110 hover:text-white/75">
              <BackwardIcon className="h-[16px] w-[16px]" />
            </button>

            <button
              onClick={() => setPlaying((p) => !p)}
              className="relative flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border-none text-white transition-[transform,background,box-shadow] duration-[400ms] hover:scale-[1.1]"
              style={{
                background: accent,
                boxShadow: `0 4px 14px rgba(${accentRgb},0.4)`,
              }}
            >
              {playing
                ? <PauseIcon className="h-[12px] w-[12px]" />
                : <PlayIcon  className="h-[12px] w-[12px]" />
              }
            </button>

            <button className="cursor-pointer border-none bg-transparent p-0 text-white/25 transition-[color,transform] hover:scale-110 hover:text-white/75">
              <ForwardIcon className="h-[16px] w-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </Widget>
  )
}

export const WidgetMusic = memo(WidgetMusicComponent)

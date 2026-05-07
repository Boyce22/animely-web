import { memo } from "react"
import { useTranslation } from "react-i18next"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface StatusLine {
  labelKey: string
  value: number
  color: string
}

interface Props extends WidgetContextValue {
  id: string
  titleKey: string
  bigNumber: number | string
  bigLabelKey: string
  statuses: StatusLine[]
  barColor: string
  barPercent: number
  meanScore?: string
  scoreDist?: number[]
}

const GAUGE_R = 30
const GAUGE_C = 2 * Math.PI * GAUGE_R

function WidgetStatsComponent({
  id, titleKey, bigNumber, bigLabelKey, statuses, barColor, barPercent,
  meanScore, scoreDist,
  ...context
}: Props) {
  const { t } = useTranslation()

  const maxDist  = scoreDist ? Math.max(...scoreDist, 1) : 1
  const total    = statuses.reduce((sum, s) => sum + s.value, 0)
  const scoreNum = meanScore ? parseFloat(meanScore) : 0

  return (
    <Widget id={id} title={t(titleKey)} {...context}>
      <div className="relative flex h-full flex-col gap-4 px-4 py-4">

        {/* ── Hero: big number + mean score gauge ───────────────────── */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div
              className="font-mono text-[50px] font-[900] leading-none tracking-[-0.02em] text-white"
              style={{ textShadow: `0 0 48px ${barColor}35` }}
            >
              {typeof bigNumber === "number" ? bigNumber.toLocaleString() : bigNumber}
            </div>
            <div className="mt-[7px] text-[11px] font-[800] uppercase tracking-[0.16em] text-white/[0.28]">
              {t(bigLabelKey)}
            </div>
          </div>

          {meanScore && (
            <div className="flex shrink-0 flex-col items-center gap-[6px]">
              <div className="relative flex h-[72px] w-[72px] items-center justify-center">
                <svg
                  style={{ overflow: "visible" }}
                  className="absolute inset-0 -rotate-90"
                  viewBox="0 0 72 72"
                  width="72"
                  height="72"
                >
                  <circle cx="36" cy="36" r={GAUGE_R}
                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4.5" />
                  <circle cx="36" cy="36" r={GAUGE_R}
                    fill="none" stroke={barColor} strokeWidth="4.5" strokeLinecap="butt"
                    strokeDasharray={GAUGE_C}
                    strokeDashoffset={GAUGE_C * (1 - scoreNum / 10)}
                    style={{ filter: `drop-shadow(0 0 5px ${barColor}90)` }}
                  />
                </svg>
                <span
                  className="relative font-mono text-[20px] font-[900] leading-none"
                  style={{ color: barColor }}
                >
                  {meanScore}
                </span>
              </div>
              <span className="text-[10px] font-[700] uppercase tracking-[0.12em] text-white/[0.25]">
                {t("profile.mean_score")}
              </span>
            </div>
          )}
        </div>

        {/* ── Score distribution ────────────────────────────────────── */}
        {scoreDist && (
          <div>
            <div className="mb-[8px] text-[11px] font-[700] uppercase tracking-[0.13em] text-white/[0.22]">
              {t("profile.score_dist")}
            </div>
            <div className="flex items-end gap-[3px]" style={{ height: "40px" }}>
              {scoreDist.map((count, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center justify-end"
                  style={{ height: "40px" }}
                >
                  <div
                    className="w-full rounded-t-[1.5px]"
                    style={{
                      height: count > 0 ? `${Math.max(2, (count / maxDist) * 40)}px` : "2px",
                      background: barColor,
                      opacity: 0.12 + (i / 9) * 0.88,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-[5px] flex justify-between font-mono text-[9px] text-white/[0.2]">
              <span>1</span><span>5</span><span>10</span>
            </div>
          </div>
        )}

        {/* ── Status breakdown ─────────────────────────────────────── */}
        <div className="mt-auto flex flex-col gap-[10px]">
          {/* Stacked proportional bar */}
          <div className="flex h-[5px] w-full overflow-hidden rounded-full bg-white/[0.05]">
            {statuses.map((s) => (
              <div
                key={s.labelKey}
                style={{
                  width: `${total > 0 ? (s.value / total) * 100 : 0}%`,
                  background: s.color,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* 2×2 legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-[7px]">
            {statuses.map((s) => (
              <div key={s.labelKey} className="flex items-center gap-[7px]">
                <div className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: s.color }} />
                <span className="flex-1 truncate text-[12px] text-white/[0.35]">{t(s.labelKey)}</span>
                <span className="font-mono text-[13px] font-[700] text-white/[0.55]">
                  {s.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Completion accent bar (bottom edge) ──────────────────── */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
          <div
            className="h-full transition-all duration-[1200ms]"
            style={{
              width: `${barPercent}%`,
              background: `linear-gradient(90deg, ${barColor}33, ${barColor}cc)`,
            }}
          />
        </div>
      </div>
    </Widget>
  )
}

export const WidgetStats = memo(WidgetStatsComponent)

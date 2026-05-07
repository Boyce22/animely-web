import { memo } from "react"
import { useTranslation } from "react-i18next"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {}

const SCORE_ROWS = [
  { score: "10", desc: "obra-prima que muda perspectiva", color: "#f59e0b", bar: 100 },
  { score: "9",  desc: "excepcional, poucas falhas",      color: "#84cc16", bar: 88 },
  { score: "8",  desc: "muito boa, recomendo fortemente", color: "#22d3ee", bar: 76 },
  { score: "7",  desc: "boa, vale o tempo",               color: "#60a5fa", bar: 62 },
  { score: "6",  desc: "mediana, abaixo do esperado",     color: "#a78bfa", bar: 48 },
  { score: "≤5", desc: "não recomendo",                   color: "#ef4444", bar: 28 },
]

function WidgetTextComponent(context: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="text"
      title={t("profile.rating_criteria")}
      {...context}
      action={
        <button className="text-[10px] font-[600] text-white/30 hover:text-white/70 transition-colors">
          {t("profile.editing")}
        </button>
      }
    >
      <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-3">
        {SCORE_ROWS.map(({ score, desc, color, bar }) => (
          <div key={score} className="flex items-center gap-2.5 border-b border-white/[0.04] py-[6px] last:border-b-0">
            <span
              className="w-6 shrink-0 font-mono text-[17px] font-[800] leading-none"
              style={{ color }}
            >
              {score}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-[4px] h-[2px] rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${bar}%`, background: color, opacity: 0.5 }}
                />
              </div>
              <span className="text-[11px] leading-none text-white/[0.42]">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  )
}

export const WidgetText = memo(WidgetTextComponent)

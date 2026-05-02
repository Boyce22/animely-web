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
}

function WidgetStatsComponent({
  id, titleKey, bigNumber, bigLabelKey, statuses, barColor, barPercent,
  ...context
}: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id={id}
      title={t(titleKey)}
      {...context}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="font-mono text-[40px] font-[800] leading-none" style={{ letterSpacing: "-1.5px" }}>
            {typeof bigNumber === "number" ? bigNumber.toLocaleString() : bigNumber}
          </div>
          <div className="mt-1 text-[12px] font-[700] uppercase tracking-[0.08em] text-white/40">
            {t(bigLabelKey)}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-1.5">
            {statuses.map((s) => (
              <div key={s.labelKey} className="flex items-center text-[13px]">
                <div className="h-[8px] w-[8px] shrink-0 rounded-full" style={{ background: s.color }} />
                <span className="ml-2 flex-1 text-white/40">{t(s.labelKey)}</span>
                <span className="font-mono text-[12px] text-white/25">{s.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 h-[3px] overflow-hidden bg-white/10">
            <div className="h-full transition-all" style={{ width: `${barPercent}%`, background: barColor }} />
          </div>
        </div>
      </div>
    </Widget>
  )
}

export const WidgetStats = memo(WidgetStatsComponent)

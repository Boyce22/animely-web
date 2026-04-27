import { useRef } from "react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { PeriodState } from "./catalogFilterTypes"
import { PERIOD_PRESETS } from "./catalogTopBarData"

interface CatalogPeriodPanelProps {
  value: PeriodState
  onChange: (p: PeriodState) => void
  onClose: () => void
}

export function CatalogPeriodPanel({ value, onChange, onClose }: CatalogPeriodPanelProps) {
  const { t } = useTranslation()
  const fromRef = useRef<HTMLInputElement>(null)
  const toRef   = useRef<HTMLInputElement>(null)

  const select = (preset: typeof PERIOD_PRESETS[number]) => {
    if (preset.key === "all") { onChange({ key: "all", label: null }); return }
    onChange({ key: preset.key, label: t(preset.tKey) })
  }

  const applyCustom = () => {
    const from = parseInt(fromRef.current?.value ?? "")
    const to   = parseInt(toRef.current?.value ?? "")
    if (!from && !to) return
    const label = `${from || "?"}â€“${to || "?"}`
    onChange({ key: "custom", label, from: from || 0, to: to || 9999 })
    onClose()
  }

  return (
    <div className="w-[260px]">
      <div className="border-b border-white/[0.07]">
        {PERIOD_PRESETS.map(preset => (
          <button
            key={preset.key}
            onClick={() => select(preset)}
            className={cn(
              "w-full flex items-center justify-between px-3.5 py-2 text-[13px] font-medium transition-colors text-left",
              value.key === preset.key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]",
            )}
          >
            <div>
              <span>{t(preset.tKey)}</span>
              {preset.sub && (
                <span className="block text-[11px] text-white/25">{preset.sub}</span>
              )}
            </div>
            {value.key === preset.key && (
              <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      <div className="px-3.5 py-3">
        <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/20 mb-2">
          {t("catalog.period_custom")}
        </p>
        <div className="flex items-center gap-2">
          <input
            ref={fromRef}
            type="number"
            min={1950}
            max={2030}
            placeholder={t("catalog.period_from")}
            className="w-[76px] bg-secondary border border-white/[0.07] text-foreground font-mono text-[13px] px-2 py-1.5 text-center outline-none focus:border-white/20 transition-colors [appearance:textfield]"
          />
          <span className="text-white/25 text-[12px]">â€”</span>
          <input
            ref={toRef}
            type="number"
            min={1950}
            max={2030}
            placeholder={t("catalog.period_to")}
            className="w-[76px] bg-secondary border border-white/[0.07] text-foreground font-mono text-[13px] px-2 py-1.5 text-center outline-none focus:border-white/20 transition-colors [appearance:textfield]"
          />
        </div>
        <button
          onClick={applyCustom}
          className="mt-2.5 w-full bg-primary text-white text-[12px] font-bold py-1.5 tracking-[0.06em] uppercase hover:opacity-85 transition-opacity"
        >
          {t("catalog.period_apply")}
        </button>
      </div>
    </div>
  )
}

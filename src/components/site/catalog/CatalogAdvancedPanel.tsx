import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { AdvFilters } from "./catalogFilterTypes"
import { RATING_OPTIONS, STATUS_OPTIONS } from "./catalogTopBarData"

interface CatalogAdvancedPanelProps {
  open: boolean
  value: AdvFilters
  onChange: (value: AdvFilters) => void
  onToggle: (field: keyof AdvFilters, item: string) => void
  onClose: () => void
}

export function CatalogAdvancedPanel({ open, value, onChange, onToggle, onClose }: CatalogAdvancedPanelProps) {
  const { t } = useTranslation()

  return (
    <div className={cn(
      "overflow-hidden transition-[max-height] duration-200",
      open ? "max-h-[300px]" : "max-h-0",
    )}>
      <div className="border-t border-white/[0.07] bg-[#111] px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-[12px] font-black tracking-widest uppercase text-white/30 mb-3">
              {t("catalog.adv_status")}
            </p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => onToggle("status", s)}
                  className={cn(
                    "text-[13px] font-bold px-3 py-1.5 rounded-md border transition-all",
                    value.status.includes(s)
                      ? "border-violet-500/40 bg-violet-500/[0.08] text-foreground"
                      : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/[0.02]",
                  )}
                >
                  {t(`catalog.${s}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-black tracking-widest uppercase text-white/30 mb-3">
              {t("catalog.adv_rating")}
            </p>
            <div className="flex flex-wrap gap-2">
              {RATING_OPTIONS.map(r => (
                <button
                  key={r}
                  onClick={() => onToggle("rating", r)}
                  className={cn(
                    "text-[13px] font-bold px-3 py-1.5 rounded-md border transition-all",
                    value.rating.includes(r)
                      ? "border-violet-500/40 bg-violet-500/[0.08] text-foreground"
                      : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/[0.02]",
                  )}
                >
                  {t(`catalog.${r}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-black tracking-widest uppercase text-white/30 mb-3">
              {t("catalog.adv_min_score")}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-mono font-bold text-foreground w-8">
                {value.minScore.toFixed(1)}
              </span>
              <input
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={value.minScore}
                onChange={e => onChange({ ...value, minScore: parseFloat(e.target.value) })}
                className="flex-1 accent-primary"
              />
            </div>
          </div>

          <div>
            <p className="text-[12px] font-black tracking-widest uppercase text-white/30 mb-3">
              {t("catalog.adv_author")}
            </p>
            <input
              type="text"
              value={value.author}
              onChange={e => onChange({ ...value, author: e.target.value })}
              placeholder={t("catalog.adv_author_placeholder")}
              className="w-full bg-secondary rounded-md border border-white/[0.07] text-[14px] font-medium text-foreground placeholder:text-muted-foreground/40 px-3.5 py-2 outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/[0.07]">
          <button
            onClick={() => onChange({ status: [], rating: [], minScore: 0, author: "" })}
            className="text-[14px] font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            {t("catalog.adv_reset")}
          </button>
          <button
            onClick={onClose}
            className="bg-primary rounded-md text-white text-[14px] font-black px-6 py-2 tracking-widest uppercase hover:opacity-85 transition-opacity"
          >
            {t("catalog.adv_apply")}
          </button>
        </div>
      </div>
    </div>
  )
}

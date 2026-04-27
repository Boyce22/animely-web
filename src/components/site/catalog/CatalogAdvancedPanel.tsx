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
      <div className="border-t border-white/[0.07] bg-[#0d0d0d] px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2">
              {t("catalog.adv_status")}
            </p>
            <div className="flex flex-wrap gap-1">
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => onToggle("status", s)}
                  className={cn(
                    "text-[11px] font-semibold px-2.5 py-1 border transition-all",
                    value.status.includes(s)
                      ? "border-violet-500/40 bg-violet-500/[0.08] text-foreground"
                      : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20",
                  )}
                >
                  {t(`catalog.${s}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2">
              {t("catalog.adv_rating")}
            </p>
            <div className="flex flex-wrap gap-1">
              {RATING_OPTIONS.map(r => (
                <button
                  key={r}
                  onClick={() => onToggle("rating", r)}
                  className={cn(
                    "text-[11px] font-semibold px-2.5 py-1 border transition-all",
                    value.rating.includes(r)
                      ? "border-violet-500/40 bg-violet-500/[0.08] text-foreground"
                      : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20",
                  )}
                >
                  {t(`catalog.${r}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2">
              {t("catalog.adv_min_score")}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-foreground w-7">
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
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2">
              {t("catalog.adv_author")}
            </p>
            <input
              type="text"
              value={value.author}
              onChange={e => onChange({ ...value, author: e.target.value })}
              placeholder={t("catalog.adv_author_placeholder")}
              className="w-full bg-secondary border border-white/[0.07] text-[12px] text-foreground placeholder:text-muted-foreground/40 px-2.5 py-1.5 outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 mt-4 pt-3.5 border-t border-white/[0.07]">
          <button
            onClick={() => onChange({ status: [], rating: [], minScore: 0, author: "" })}
            className="text-[12px] font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            {t("catalog.adv_reset")}
          </button>
          <button
            onClick={onClose}
            className="bg-primary text-white text-[12px] font-bold px-5 py-1.5 tracking-[0.06em] uppercase hover:opacity-85 transition-opacity"
          >
            {t("catalog.adv_apply")}
          </button>
        </div>
      </div>
    </div>
  )
}

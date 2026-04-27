import { useState } from "react"
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { ALL_GENRES, MAIN_GENRES, SUB_GENRES } from "./catalogTopBarData"

interface CatalogGenrePanelProps {
  selected: string[]
  onChange: (genres: string[]) => void
}

export function CatalogGenrePanel({ selected, onChange }: CatalogGenrePanelProps) {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")

  const toggle = (g: string) =>
    onChange(selected.includes(g) ? selected.filter(x => x !== g) : [...selected, g])

  const visible = query
    ? ALL_GENRES.filter(g => g.toLowerCase().includes(query.toLowerCase()))
    : SUB_GENRES

  return (
    <div className="w-[480px] bg-[#111] rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07]">
        <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t("catalog.genre_search_placeholder")}
          className="flex-1 bg-transparent border-none text-[15px] font-medium text-foreground placeholder:text-muted-foreground/40 outline-none"
        />
      </div>

      {!query && (
        <>
          <p className="text-[11px] font-black tracking-widest uppercase text-white/30 px-4 pt-4 pb-2">
            {t("catalog.genre_main")}
          </p>
          <div className="flex flex-wrap gap-2 px-4 pb-4 border-b border-white/[0.07]">
            {MAIN_GENRES.map(g => (
              <button
                key={g}
                onClick={() => toggle(g)}
                className={cn(
                  "text-[13px] font-bold px-3.5 py-1.5 border rounded-md transition-all",
                  selected.includes(g)
                    ? "border-white/30 bg-white/[0.07] text-foreground"
                    : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </>
      )}

      <p className="text-[11px] font-black tracking-widest uppercase text-white/30 px-4 pt-4 pb-2">
        {query ? t("catalog.genre_results") : t("catalog.genre_sub")}
      </p>
      <div className="max-h-[280px] overflow-y-auto scrollbar-hide pb-2">
        {visible.length === 0 ? (
          <p className="text-[14px] font-medium text-muted-foreground/40 text-center py-6">{t("catalog.genre_no_results")}</p>
        ) : visible.map(g => {
          const checked = selected.includes(g)
          return (
            <button
              key={g}
              onClick={() => toggle(g)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                checked ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
              )}
            >
              <span className={cn(
                "w-4 h-4 flex-shrink-0 border rounded-sm flex items-center justify-center transition-colors",
                checked ? "bg-primary border-primary" : "border-white/20",
              )}>
                {checked && <CheckIcon className="w-3 h-3 text-white" />}
              </span>
              <span className="text-[14px] font-bold text-foreground flex-1">{g}</span>
              <span className="text-[12px] font-bold text-white/20">{MAIN_GENRES.includes(g) ? "Main" : "Sub"}</span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.07]">
        <span className="text-[13px] font-bold text-muted-foreground">
          {t("catalog.genre_selected", { count: selected.length })}
        </span>
        <button
          onClick={() => onChange([])}
          className="text-[13px] font-bold text-muted-foreground hover:text-primary transition-colors"
        >
          {t("catalog.genre_clear")}
        </button>
      </div>
    </div>
  )
}

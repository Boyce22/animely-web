import { useState } from "react"
import {
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CatalogGenrePanel } from "./CatalogGenrePanel"
import { CatalogPeriodPanel } from "./CatalogPeriodPanel"
import type { CatalogFilters, SortKey } from "./catalogFilterTypes"
import { MEDIA_TABS, SORT_OPTIONS } from "./catalogTopBarData"

export interface ActiveCatalogFilterTag {
  id: string
  label: string
  onRemove: () => void
}

interface CatalogTopBarSectionProps {
  value: CatalogFilters
  onSet: <K extends keyof CatalogFilters>(key: K, val: CatalogFilters[K]) => void
}

interface CatalogMediaTabsProps extends CatalogTopBarSectionProps {
  resultsCount: number
}

export function CatalogMediaTabs({ value, onSet, resultsCount }: CatalogMediaTabsProps) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center border-b border-white/[0.07] px-6">
      {MEDIA_TABS.map(({ key, icon: Icon, count }) => (
        <button
          key={key}
          onClick={() => onSet("mediaType", key)}
          className={cn(
            "flex items-center gap-2 px-5 h-12 text-[15px] font-bold transition-colors border-b-[3px] flex-shrink-0",
            value.mediaType === key
              ? "text-foreground border-primary"
              : "text-muted-foreground border-transparent hover:text-foreground",
          )}
        >
          <Icon className="w-4 h-4" />
          {t(`catalog.tab_${key.replace("-", "_")}`)}
          <span className={cn(
            "text-[12px] font-black font-mono px-2 py-0.5 rounded-md",
            value.mediaType === key ? "bg-primary/15 text-primary" : "bg-secondary text-white/30",
          )}>
            {count}
          </span>
        </button>
      ))}

      <div className="ml-auto flex items-center gap-3">
        <span className="text-[13px] font-bold text-white/30 font-mono whitespace-nowrap mr-2">
          {t("catalog.titles", { count: resultsCount })}
        </span>
        <button
          onClick={() => onSet("view", "grid")}
          className={cn("w-9 h-9 rounded-md flex items-center justify-center border transition-all", value.view === "grid" ? "border-white/20 text-foreground bg-white/[0.04]" : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20")}
          title={t("catalog.view_grid")}
        >
          <Squares2X2Icon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onSet("view", "list")}
          className={cn("w-9 h-9 rounded-md flex items-center justify-center border transition-all", value.view === "list" ? "border-white/20 text-foreground bg-white/[0.04]" : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20")}
          title={t("catalog.view_list")}
        >
          <QueueListIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function CatalogSearchRow({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.07]">
      <div className="flex-1 flex items-center gap-3 bg-secondary rounded-lg border border-white/[0.07] px-4 py-2.5 focus-within:border-white/20 transition-colors">
        <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground/60 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={t("catalog.search_placeholder")}
          className="flex-1 bg-transparent border-none text-[15px] font-medium text-foreground placeholder:text-muted-foreground/50 outline-none min-w-0"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

interface CatalogFilterControlsProps extends CatalogTopBarSectionProps {
  advOpen: boolean
  hasAdv: boolean
  onAdvOpenChange: (open: boolean | ((open: boolean) => boolean)) => void
  genreOpen: boolean
  onGenreOpenChange: (open: boolean) => void
  periodOpen: boolean
  onPeriodOpenChange: (open: boolean) => void
}

export function CatalogFilterControls({
  value,
  onSet,
  advOpen,
  hasAdv,
  onAdvOpenChange,
  genreOpen,
  onGenreOpenChange,
  periodOpen,
  onPeriodOpenChange,
}: CatalogFilterControlsProps) {
  const { t } = useTranslation()
  const [sortOpen, setSortOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 px-6 py-3 overflow-x-auto scrollbar-hide">
      <Popover open={genreOpen} onOpenChange={onGenreOpenChange}>
        <PopoverTrigger asChild>
          <button className={cn(
            "flex items-center gap-2 rounded-md border text-[14px] font-bold px-3.5 py-2 whitespace-nowrap flex-shrink-0 transition-all",
            value.genres.length > 0
              ? "border-primary/40 bg-primary/[0.07] text-foreground"
              : genreOpen
                ? "border-white/20 text-foreground bg-white/[0.04]"
                : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/[0.02]",
          )}>
            <FunnelIcon className="w-4 h-4" />
            {t("catalog.filter_genre")}
            {value.genres.length > 0 && (
              <span className="bg-primary text-white text-[11px] font-black px-2 py-0.5 rounded-sm">
                {value.genres.length}
              </span>
            )}
            <ChevronDownIcon className={cn("w-3 h-3 transition-transform ml-1", genreOpen && "rotate-180")} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-white/[0.12] bg-[#111] shadow-2xl rounded-xl" align="start">
          <CatalogGenrePanel selected={value.genres} onChange={g => onSet("genres", g)} />
        </PopoverContent>
      </Popover>

      <Popover open={periodOpen} onOpenChange={onPeriodOpenChange}>
        <PopoverTrigger asChild>
          <button className={cn(
            "flex items-center gap-2 rounded-md border text-[14px] font-bold px-3.5 py-2 whitespace-nowrap flex-shrink-0 transition-all",
            value.period.label
              ? "border-primary/40 bg-primary/[0.07] text-foreground"
              : periodOpen
                ? "border-white/20 text-foreground bg-white/[0.04]"
                : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/[0.02]",
          )}>
            <CalendarDaysIcon className="w-4 h-4" />
            {t("catalog.filter_period")}
            {value.period.label && (
              <span className="bg-primary text-white text-[11px] font-black px-2 py-0.5 rounded-sm">
                {value.period.label}
              </span>
            )}
            <ChevronDownIcon className={cn("w-3 h-3 transition-transform ml-1", periodOpen && "rotate-180")} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-white/[0.12] bg-[#111] shadow-2xl rounded-xl" align="start">
          <CatalogPeriodPanel
            value={value.period}
            onChange={p => onSet("period", p)}
            onClose={() => onPeriodOpenChange(false)}
          />
        </PopoverContent>
      </Popover>

      <div className="w-px h-6 bg-white/[0.07] flex-shrink-0 mx-2" />

      <Popover open={sortOpen} onOpenChange={setSortOpen}>
        <PopoverTrigger asChild>
          <button className={cn(
            "flex items-center gap-2 rounded-md border text-[14px] font-bold px-3.5 py-2 whitespace-nowrap flex-shrink-0 transition-all",
            sortOpen
              ? "border-white/20 text-foreground bg-white/[0.04]"
              : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/[0.02]"
          )}>
            {t(SORT_OPTIONS.find(o => o.key === value.sort)?.tKey || "catalog.sort_popularity")}
            <ChevronDownIcon className={cn("w-3 h-3 transition-transform ml-1", sortOpen && "rotate-180")} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-1.5 w-48 border-white/[0.12] bg-[#111] shadow-2xl rounded-xl" align="start">
          <div className="flex flex-col gap-0.5">
            {SORT_OPTIONS.map(({ key, tKey }) => (
              <button
                key={key}
                onClick={() => {
                  onSet("sort", key as SortKey)
                  setSortOpen(false)
                }}
                className={cn(
                  "flex items-center w-full px-3 py-2.5 text-[13px] font-bold rounded-lg transition-colors text-left",
                  value.sort === key
                    ? "bg-primary/15 text-primary"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                {t(tKey)}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <button
        onClick={() => onAdvOpenChange(v => !v)}
        className={cn(
          "ml-auto flex items-center gap-2 rounded-md border text-[14px] font-bold px-3.5 py-2 whitespace-nowrap flex-shrink-0 transition-all",
          advOpen || hasAdv
            ? "border-white/20 text-foreground bg-white/[0.04]"
            : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/[0.02]",
        )}
      >
        {hasAdv && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mr-1" />}
        <AdjustmentsHorizontalIcon className="w-4 h-4" />
        {t("catalog.filter_more")}
      </button>
    </div>
  )
}

export function CatalogActiveFilterTags({ tags, onClearAll }: { tags: ActiveCatalogFilterTag[]; onClearAll: () => void }) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center flex-wrap gap-2 px-6 pb-3">
      <span className="text-[12px] font-black tracking-widest uppercase text-white/30 flex-shrink-0 mr-1">
        {t("catalog.active_filters")}
      </span>
      {tags.map(tag => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-2 rounded-md bg-white/[0.04] border border-white/[0.12] text-[13px] font-bold text-foreground px-3 py-1"
        >
          {tag.label}
          <button
            onClick={tag.onRemove}
            className="text-white/40 hover:text-primary transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-[13px] font-bold text-muted-foreground hover:text-primary transition-colors ml-2"
      >
        {t("catalog.clear_all")}
      </button>
    </div>
  )
}

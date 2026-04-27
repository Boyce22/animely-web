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
            "flex items-center gap-1.5 px-4 h-11 text-[13px] font-bold transition-colors border-b-2 flex-shrink-0",
            value.mediaType === key
              ? "text-foreground border-primary"
              : "text-muted-foreground border-transparent hover:text-foreground",
          )}
        >
          <Icon className="w-3 h-3" />
          {t(`catalog.tab_${key.replace("-", "_")}`)}
          <span className={cn(
            "text-[10px] font-mono px-1.5 py-px rounded-sm",
            value.mediaType === key ? "bg-primary/15 text-primary" : "bg-secondary text-white/25",
          )}>
            {count}
          </span>
        </button>
      ))}

      <div className="ml-auto flex items-center gap-2">
        <span className="text-[11px] text-white/25 font-mono whitespace-nowrap">
          {t("catalog.titles", { count: resultsCount })}
        </span>
        <button
          onClick={() => onSet("view", "grid")}
          className={cn("w-7 h-7 flex items-center justify-center border transition-all", value.view === "grid" ? "border-white/20 text-foreground bg-white/[0.04]" : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20")}
          title={t("catalog.view_grid")}
        >
          <Squares2X2Icon className="w-3 h-3" />
        </button>
        <button
          onClick={() => onSet("view", "list")}
          className={cn("w-7 h-7 flex items-center justify-center border transition-all", value.view === "list" ? "border-white/20 text-foreground bg-white/[0.04]" : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20")}
          title={t("catalog.view_list")}
        >
          <QueueListIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

export function CatalogSearchRow({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2 px-6 py-2.5 border-b border-white/[0.07]">
      <div className="flex-1 flex items-center gap-2.5 bg-secondary border border-white/[0.07] px-3 py-2 focus-within:border-white/20 transition-colors">
        <MagnifyingGlassIcon className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={t("catalog.search_placeholder")}
          className="flex-1 bg-transparent border-none text-[13px] text-foreground placeholder:text-muted-foreground/40 outline-none min-w-0"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
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

  return (
    <div className="flex items-center gap-1.5 px-6 py-2 overflow-x-auto scrollbar-hide">
      <Popover open={genreOpen} onOpenChange={onGenreOpenChange}>
        <PopoverTrigger asChild>
          <button className={cn(
            "flex items-center gap-1.5 border text-[12px] font-semibold px-2.5 py-1.5 whitespace-nowrap flex-shrink-0 transition-all",
            value.genres.length > 0
              ? "border-primary/40 bg-primary/[0.07] text-foreground"
              : genreOpen
                ? "border-white/20 text-foreground"
                : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20",
          )}>
            <FunnelIcon className="w-3 h-3" />
            {t("catalog.filter_genre")}
            {value.genres.length > 0 && (
              <span className="bg-primary text-white text-[9px] font-bold px-1.5 py-px rounded-sm">
                {value.genres.length}
              </span>
            )}
            <ChevronDownIcon className={cn("w-2.5 h-2.5 transition-transform", genreOpen && "rotate-180")} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-white/[0.12] bg-card" align="start">
          <CatalogGenrePanel selected={value.genres} onChange={g => onSet("genres", g)} />
        </PopoverContent>
      </Popover>

      <Popover open={periodOpen} onOpenChange={onPeriodOpenChange}>
        <PopoverTrigger asChild>
          <button className={cn(
            "flex items-center gap-1.5 border text-[12px] font-semibold px-2.5 py-1.5 whitespace-nowrap flex-shrink-0 transition-all",
            value.period.label
              ? "border-primary/40 bg-primary/[0.07] text-foreground"
              : periodOpen
                ? "border-white/20 text-foreground"
                : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20",
          )}>
            <CalendarDaysIcon className="w-3 h-3" />
            {value.period.label ?? t("catalog.filter_period")}
            <ChevronDownIcon className={cn("w-2.5 h-2.5 transition-transform", periodOpen && "rotate-180")} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-white/[0.12] bg-card" align="start">
          <CatalogPeriodPanel
            value={value.period}
            onChange={p => onSet("period", p)}
            onClose={() => onPeriodOpenChange(false)}
          />
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-white/[0.07] flex-shrink-0 mx-0.5" />

      <select
        value={value.sort}
        onChange={e => onSet("sort", e.target.value as SortKey)}
        className="bg-transparent border border-white/[0.07] text-muted-foreground text-[12px] font-semibold px-2.5 py-1.5 outline-none hover:border-white/20 hover:text-foreground transition-all cursor-pointer flex-shrink-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 3.5l3 3 3-3' stroke='%23666' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 8px center",
          paddingRight: "28px",
          appearance: "none",
        }}
      >
        {SORT_OPTIONS.map(({ key, tKey }) => (
          <option key={key} value={key} className="bg-card text-foreground">
            {t(tKey)}
          </option>
        ))}
      </select>

      <button
        onClick={() => onAdvOpenChange(v => !v)}
        className={cn(
          "ml-auto flex items-center gap-1.5 border text-[12px] font-semibold px-2.5 py-1.5 whitespace-nowrap flex-shrink-0 transition-all",
          advOpen || hasAdv
            ? "border-white/20 text-foreground bg-white/[0.04]"
            : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20",
        )}
      >
        {hasAdv && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
        <AdjustmentsHorizontalIcon className="w-3 h-3" />
        {t("catalog.filter_more")}
      </button>
    </div>
  )
}

export function CatalogActiveFilterTags({ tags, onClearAll }: { tags: ActiveCatalogFilterTag[]; onClearAll: () => void }) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center flex-wrap gap-1.5 px-6 pb-2.5">
      <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-white/20 flex-shrink-0">
        {t("catalog.active_filters")}
      </span>
      {tags.map(tag => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.12] text-[11px] font-semibold text-foreground px-2.5 py-0.5"
        >
          {tag.label}
          <button
            onClick={tag.onRemove}
            className="text-white/30 hover:text-primary transition-colors"
          >
            <XMarkIcon className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors ml-1"
      >
        {t("catalog.clear_all")}
      </button>
    </div>
  )
}

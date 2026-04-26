import { useState, useRef } from "react"
import {
  MagnifyingGlassIcon, XMarkIcon, FunnelIcon, CalendarDaysIcon,
  AdjustmentsHorizontalIcon, ChevronDownIcon, Squares2X2Icon,
  QueueListIcon, CheckIcon, TvIcon, BookOpenIcon, BookmarkIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────────

export type MediaType = "anime" | "manga" | "light-novel" | "characters"
export type SortKey   = "popular" | "score" | "recent" | "updated" | "az"
export type PeriodKey = "all" | "season" | "3m" | "year" | "2020s" | "2010s" | "classic" | "custom"

export interface PeriodState {
  key: PeriodKey
  label: string | null
  from?: number
  to?: number
}

export interface AdvFilters {
  status:   string[]
  rating:   string[]
  minScore: number
  author:   string
}

export interface CatalogFilters {
  mediaType: MediaType
  view:      "grid" | "list"
  search:    string
  genres:    string[]
  period:    PeriodState
  sort:      SortKey
  adv:       AdvFilters
}

export const DEFAULT_CATALOG_FILTERS: CatalogFilters = {
  mediaType: "anime",
  view:      "grid",
  search:    "",
  genres:    [],
  period:    { key: "all", label: null },
  sort:      "popular",
  adv:       { status: [], rating: [], minScore: 0, author: "" },
}

// ── Static data ────────────────────────────────────────────────────────────────

const MEDIA_TABS: { key: MediaType; icon: React.ComponentType<{ className?: string }>; count: string }[] = [
  { key: "anime",       icon: TvIcon,           count: "3.2k" },
  { key: "manga",       icon: BookOpenIcon,     count: "8.4k" },
  { key: "light-novel", icon: DocumentTextIcon, count: "1.1k" },
  { key: "characters",  icon: BookmarkIcon,     count: "24k" },
]

const MAIN_GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life",
]

const SUB_GENRES = [
  "Martial Arts", "Cooking", "Sports", "School", "Isekai", "Mecha", "Military",
  "Music", "Psychological", "Supernatural", "Vampire", "Zombie",
  "Josei", "Seinen", "Shoujo", "Shounen",
  "Harem", "Mahou Shoujo", "Yaoi", "Yuri",
  "Dark Fantasy", "Dungeon", "Cyberpunk", "Steampunk", "Time Travel",
  "Gore", "Survival", "Historical", "Competition", "Detective",
  "Idol", "Mythology", "Ninja", "Pirate", "Reincarnation", "Samurai", "Yakuza",
]

const ALL_GENRES = [...MAIN_GENRES, ...SUB_GENRES]

const SORT_OPTIONS: { key: SortKey; tKey: string }[] = [
  { key: "popular", tKey: "catalog.sort_popular" },
  { key: "score",   tKey: "catalog.sort_score"   },
  { key: "recent",  tKey: "catalog.sort_recent"  },
  { key: "updated", tKey: "catalog.sort_updated" },
  { key: "az",      tKey: "catalog.sort_az"       },
]

const PERIOD_PRESETS: { key: PeriodKey; tKey: string; sub?: string }[] = [
  { key: "all",     tKey: "catalog.period_all"    },
  { key: "season",  tKey: "catalog.period_season" },
  { key: "3m",      tKey: "catalog.period_3m"     },
  { key: "year",    tKey: "catalog.period_year"   },
  { key: "2020s",   tKey: "catalog.period_2020s", sub: "2020–today"   },
  { key: "2010s",   tKey: "catalog.period_2010s", sub: "2010–2019"    },
  { key: "classic", tKey: "catalog.period_classic", sub: "before 2010" },
]

const STATUS_OPTIONS = ["status_ongoing", "status_completed", "status_hiatus", "status_cancelled"]
const RATING_OPTIONS = ["rating_free", "rating_10", "rating_14", "rating_18"]

// ── Sub-components ─────────────────────────────────────────────────────────────

interface GenrePanelProps {
  selected: string[]
  onChange: (genres: string[]) => void
}

function GenrePanel({ selected, onChange }: GenrePanelProps) {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")

  const toggle = (g: string) =>
    onChange(selected.includes(g) ? selected.filter(x => x !== g) : [...selected, g])

  const visible = query
    ? ALL_GENRES.filter(g => g.toLowerCase().includes(query.toLowerCase()))
    : SUB_GENRES

  return (
    <div className="w-[400px]">
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.07]">
        <MagnifyingGlassIcon className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t("catalog.genre_search_placeholder")}
          className="flex-1 bg-transparent border-none text-[13px] text-foreground placeholder:text-muted-foreground/40 outline-none"
        />
      </div>

      {/* Main genres (quick chips) */}
      {!query && (
        <>
          <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/20 px-3 pt-2.5 pb-1.5">
            {t("catalog.genre_main")}
          </p>
          <div className="flex flex-wrap gap-1 px-3 pb-2.5 border-b border-white/[0.07]">
            {MAIN_GENRES.map(g => (
              <button
                key={g}
                onClick={() => toggle(g)}
                className={cn(
                  "text-[11px] font-600 px-2.5 py-1 border transition-all",
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

      {/* Scrollable sub-genre list */}
      <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/20 px-3 pt-2.5 pb-1">
        {query ? t("catalog.genre_results") : t("catalog.genre_sub")}
      </p>
      <div className="max-h-[200px] overflow-y-auto scrollbar-hide pb-1">
        {visible.length === 0 ? (
          <p className="text-[12px] text-muted-foreground/40 text-center py-4">{t("catalog.genre_no_results")}</p>
        ) : visible.map(g => {
          const checked = selected.includes(g)
          return (
            <button
              key={g}
              onClick={() => toggle(g)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-[7px] text-left transition-colors",
                checked ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
              )}
            >
              <span className={cn(
                "w-3.5 h-3.5 flex-shrink-0 border flex items-center justify-center transition-colors",
                checked ? "bg-primary border-primary" : "border-white/20",
              )}>
                {checked && <CheckIcon className="w-2.5 h-2.5 text-white" />}
              </span>
              <span className="text-[12px] font-medium text-foreground flex-1">{g}</span>
              <span className="text-[10px] text-white/20">{MAIN_GENRES.includes(g) ? "Main" : "Sub"}</span>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-white/[0.07]">
        <span className="text-[11px] text-muted-foreground">
          {t("catalog.genre_selected", { count: selected.length })}
        </span>
        <button
          onClick={() => onChange([])}
          className="text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          {t("catalog.genre_clear")}
        </button>
      </div>
    </div>
  )
}

interface PeriodPanelProps {
  value: PeriodState
  onChange: (p: PeriodState) => void
  onClose: () => void
}

function PeriodPanel({ value, onChange, onClose }: PeriodPanelProps) {
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
    const label = `${from || "?"}–${to || "?"}`
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
          <span className="text-white/25 text-[12px]">—</span>
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

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  value:         CatalogFilters
  onChange:      (f: CatalogFilters) => void
  resultsCount?: number
}

export function CatalogTopBar({ value, onChange, resultsCount = 0 }: Props) {
  const { t } = useTranslation()
  const [advOpen,    setAdvOpen]    = useState(false)
  const [genreOpen,  setGenreOpen]  = useState(false)
  const [periodOpen, setPeriodOpen] = useState(false)

  const set = <K extends keyof CatalogFilters>(key: K, val: CatalogFilters[K]) =>
    onChange({ ...value, [key]: val })

  const toggleAdv = (field: keyof AdvFilters, item: string) => {
    const arr = value.adv[field] as string[]
    set("adv", {
      ...value.adv,
      [field]: arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item],
    })
  }

  const removeGenre = (g: string) => set("genres", value.genres.filter(x => x !== g))
  const clearPeriod = () => set("period", { key: "all", label: null })

  const activeTags = [
    ...value.genres.map(g => ({ id: `genre-${g}`,   label: g,                  onRemove: () => removeGenre(g) })),
    ...(value.period.label ? [{ id: "period", label: value.period.label, onRemove: clearPeriod }] : []),
    ...value.adv.status.map(s => ({ id: `status-${s}`, label: t(`catalog.${s}`), onRemove: () => toggleAdv("status", s) })),
    ...value.adv.rating.map(r => ({ id: `rating-${r}`, label: t(`catalog.${r}`), onRemove: () => toggleAdv("rating", r) })),
  ]

  const hasAdv = value.adv.status.length > 0 || value.adv.rating.length > 0 || value.adv.minScore > 0 || value.adv.author

  const clearAll = () => onChange({ ...DEFAULT_CATALOG_FILTERS, mediaType: value.mediaType })

  return (
    <div className="border-b border-white/[0.07] bg-background flex-shrink-0">

      {/* ① Media type tabs */}
      <div className="flex items-center border-b border-white/[0.07] px-6">
        {MEDIA_TABS.map(({ key, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => set("mediaType", key)}
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
            onClick={() => set("view", "grid")}
            className={cn("w-7 h-7 flex items-center justify-center border transition-all", value.view === "grid" ? "border-white/20 text-foreground bg-white/[0.04]" : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20")}
            title={t("catalog.view_grid")}
          >
            <Squares2X2Icon className="w-3 h-3" />
          </button>
          <button
            onClick={() => set("view", "list")}
            className={cn("w-7 h-7 flex items-center justify-center border transition-all", value.view === "list" ? "border-white/20 text-foreground bg-white/[0.04]" : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20")}
            title={t("catalog.view_list")}
          >
            <QueueListIcon className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ② Search */}
      <div className="flex items-center gap-2 px-6 py-2.5 border-b border-white/[0.07]">
        <div className="flex-1 flex items-center gap-2.5 bg-secondary border border-white/[0.07] px-3 py-2 focus-within:border-white/20 transition-colors">
          <MagnifyingGlassIcon className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />
          <input
            type="text"
            value={value.search}
            onChange={e => set("search", e.target.value)}
            placeholder={t("catalog.search_placeholder")}
            className="flex-1 bg-transparent border-none text-[13px] text-foreground placeholder:text-muted-foreground/40 outline-none min-w-0"
          />
          {value.search && (
            <button
              onClick={() => set("search", "")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ③ Filter controls */}
      <div className="flex items-center gap-1.5 px-6 py-2 overflow-x-auto scrollbar-hide">

        {/* Genre */}
        <Popover open={genreOpen} onOpenChange={setGenreOpen}>
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
            <GenrePanel selected={value.genres} onChange={g => set("genres", g)} />
          </PopoverContent>
        </Popover>

        {/* Period */}
        <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
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
            <PeriodPanel
              value={value.period}
              onChange={p => set("period", p)}
              onClose={() => setPeriodOpen(false)}
            />
          </PopoverContent>
        </Popover>

        <div className="w-px h-5 bg-white/[0.07] flex-shrink-0 mx-0.5" />

        {/* Sort */}
        <select
          value={value.sort}
          onChange={e => set("sort", e.target.value as SortKey)}
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

        {/* More filters */}
        <button
          onClick={() => setAdvOpen(v => !v)}
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

      {/* ④ Active filter tags */}
      {activeTags.length > 0 && (
        <div className="flex items-center flex-wrap gap-1.5 px-6 pb-2.5">
          <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-white/20 flex-shrink-0">
            {t("catalog.active_filters")}
          </span>
          {activeTags.map(tag => (
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
            onClick={clearAll}
            className="text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors ml-1"
          >
            {t("catalog.clear_all")}
          </button>
        </div>
      )}

      {/* ⑤ Advanced panel */}
      <div className={cn(
        "overflow-hidden transition-[max-height] duration-200",
        advOpen ? "max-h-[300px]" : "max-h-0",
      )}>
        <div className="border-t border-white/[0.07] bg-[#0d0d0d] px-6 py-4">
          <div className="grid grid-cols-4 gap-4">

            {/* Status */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2">
                {t("catalog.adv_status")}
              </p>
              <div className="flex flex-wrap gap-1">
                {STATUS_OPTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleAdv("status", s)}
                    className={cn(
                      "text-[11px] font-semibold px-2.5 py-1 border transition-all",
                      value.adv.status.includes(s)
                        ? "border-violet-500/40 bg-violet-500/[0.08] text-foreground"
                        : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20",
                    )}
                  >
                    {t(`catalog.${s}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2">
                {t("catalog.adv_rating")}
              </p>
              <div className="flex flex-wrap gap-1">
                {RATING_OPTIONS.map(r => (
                  <button
                    key={r}
                    onClick={() => toggleAdv("rating", r)}
                    className={cn(
                      "text-[11px] font-semibold px-2.5 py-1 border transition-all",
                      value.adv.rating.includes(r)
                        ? "border-violet-500/40 bg-violet-500/[0.08] text-foreground"
                        : "border-white/[0.07] text-muted-foreground hover:text-foreground hover:border-white/20",
                    )}
                  >
                    {t(`catalog.${r}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Min score */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2">
                {t("catalog.adv_min_score")}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-foreground w-7">
                  {value.adv.minScore.toFixed(1)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={value.adv.minScore}
                  onChange={e => set("adv", { ...value.adv, minScore: parseFloat(e.target.value) })}
                  className="flex-1 accent-primary"
                />
              </div>
            </div>

            {/* Author */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-2">
                {t("catalog.adv_author")}
              </p>
              <input
                type="text"
                value={value.adv.author}
                onChange={e => set("adv", { ...value.adv, author: e.target.value })}
                placeholder={t("catalog.adv_author_placeholder")}
                className="w-full bg-secondary border border-white/[0.07] text-[12px] text-foreground placeholder:text-muted-foreground/40 px-2.5 py-1.5 outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 mt-4 pt-3.5 border-t border-white/[0.07]">
            <button
              onClick={() => {
                set("adv", { status: [], rating: [], minScore: 0, author: "" })
              }}
              className="text-[12px] font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              {t("catalog.adv_reset")}
            </button>
            <button
              onClick={() => setAdvOpen(false)}
              className="bg-primary text-white text-[12px] font-bold px-5 py-1.5 tracking-[0.06em] uppercase hover:opacity-85 transition-opacity"
            >
              {t("catalog.adv_apply")}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

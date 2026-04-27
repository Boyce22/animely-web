import { useState } from "react"
import { useTranslation } from "react-i18next"
import { CatalogAdvancedPanel } from "@/components/site/catalog/CatalogAdvancedPanel"
import {
  CatalogActiveFilterTags,
  CatalogFilterControls,
  CatalogMediaTabs,
  CatalogSearchRow,
  type ActiveCatalogFilterTag,
} from "@/components/site/catalog/CatalogTopBarSections"
import { DEFAULT_CATALOG_FILTERS, type AdvFilters, type CatalogFilters } from "@/components/site/catalog/catalogFilterTypes"

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

  const activeTags: ActiveCatalogFilterTag[] = [
    ...value.genres.map(g => ({ id: `genre-${g}`,   label: g,                  onRemove: () => removeGenre(g) })),
    ...(value.period.label ? [{ id: "period", label: value.period.label, onRemove: clearPeriod }] : []),
    ...value.adv.status.map(s => ({ id: `status-${s}`, label: t(`catalog.${s}`), onRemove: () => toggleAdv("status", s) })),
    ...value.adv.rating.map(r => ({ id: `rating-${r}`, label: t(`catalog.${r}`), onRemove: () => toggleAdv("rating", r) })),
  ]

  const hasAdv = value.adv.status.length > 0 || value.adv.rating.length > 0 || value.adv.minScore > 0 || value.adv.author
  const clearAll = () => onChange({ ...DEFAULT_CATALOG_FILTERS, mediaType: value.mediaType })

  return (
    <div className="border-b border-white/[0.07] bg-background flex-shrink-0">
      <CatalogMediaTabs value={value} onSet={set} resultsCount={resultsCount} />
      <CatalogSearchRow value={value.search} onChange={search => set("search", search)} />
      <CatalogFilterControls
        value={value}
        onSet={set}
        advOpen={advOpen}
        hasAdv={Boolean(hasAdv)}
        onAdvOpenChange={setAdvOpen}
        genreOpen={genreOpen}
        onGenreOpenChange={setGenreOpen}
        periodOpen={periodOpen}
        onPeriodOpenChange={setPeriodOpen}
      />

      {activeTags.length > 0 && (
        <CatalogActiveFilterTags tags={activeTags} onClearAll={clearAll} />
      )}

      <CatalogAdvancedPanel
        open={advOpen}
        value={value.adv}
        onChange={adv => set("adv", adv)}
        onToggle={toggleAdv}
        onClose={() => setAdvOpen(false)}
      />
    </div>
  )
}

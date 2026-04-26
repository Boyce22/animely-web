import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { ExploreSidebar } from "@/components/site/ExploreSidebar"
import {
  CatalogTopBar,
  DEFAULT_CATALOG_FILTERS,
  type CatalogFilters,
  type MediaType,
} from "@/components/site/CatalogTopBar"
import { CatalogGrid, CATALOG_DATA } from "@/components/site/CatalogGrid"

const PER_PAGE = 24

const STATUS_MAP: Record<string, string> = {
  status_ongoing:   "ongoing",
  status_completed: "completed",
  status_hiatus:    "hiatus",
  status_cancelled: "cancelled",
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const mediaTypeParam = searchParams.get("type") as MediaType | null

  const [filters, setFilters] = useState<CatalogFilters>(() => ({
    ...DEFAULT_CATALOG_FILTERS,
    mediaType: mediaTypeParam ?? DEFAULT_CATALOG_FILTERS.mediaType,
  }))
  const [page, setPage] = useState(1)

  // Sync mediaType when sidebar navigation changes the URL param
  useEffect(() => {
    if (mediaTypeParam && mediaTypeParam !== filters.mediaType) {
      setFilters(f => ({ ...f, mediaType: mediaTypeParam }))
      setPage(1)
    }
    if (!mediaTypeParam) {
      setSearchParams({ type: filters.mediaType }, { replace: true })
    }
  }, [filters.mediaType, mediaTypeParam, setSearchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFiltersChange = (f: CatalogFilters) => {
    if (f.mediaType !== filters.mediaType) {
      setSearchParams({ type: f.mediaType }, { replace: true })
    }
    setFilters(f)
    setPage(1)
  }

  const filtered = useMemo(() => {
    let items = [...CATALOG_DATA]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) || i.author.toLowerCase().includes(q)
      )
    }

    if (filters.genres.length > 0) {
      items = items.filter(i => filters.genres.every(g => i.genres.includes(g)))
    }

    if (filters.period.key !== "all") {
      const now = new Date().getFullYear()
      items = items.filter(i => {
        switch (filters.period.key) {
          case "season":  return i.year === now
          case "3m":      return i.year === now
          case "year":    return i.year >= now - 1
          case "2020s":   return i.year >= 2020
          case "2010s":   return i.year >= 2010 && i.year <= 2019
          case "classic": return i.year < 2010
          case "custom":  return i.year >= (filters.period.from ?? 0) && i.year <= (filters.period.to ?? 9999)
          default:        return true
        }
      })
    }

    if (filters.adv.status.length > 0) {
      items = items.filter(i => filters.adv.status.some(s => STATUS_MAP[s] === i.status))
    }

    if (filters.adv.minScore > 0) {
      items = items.filter(i => i.score >= filters.adv.minScore)
    }

    if (filters.adv.author) {
      const q = filters.adv.author.toLowerCase()
      items = items.filter(i => i.author.toLowerCase().includes(q))
    }

    switch (filters.sort) {
      case "score":   items = [...items].sort((a, b) => b.score - a.score); break
      case "recent":  items = [...items].sort((a, b) => b.year - a.year);   break
      case "updated": items = [...items].sort((a, b) => b.year - a.year);   break
      case "az":      items = [...items].sort((a, b) => a.title.localeCompare(b.title)); break
    }

    return items
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const pageItems  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ExploreSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <CatalogTopBar
          value={filters}
          onChange={handleFiltersChange}
          resultsCount={filtered.length}
        />
        <CatalogGrid
          items={pageItems}
          view={filters.view}
          page={page}
          perPage={PER_PAGE}
          totalItems={filtered.length}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>
    </div>
  )
}

import type { CatalogItem } from "@/components/site/catalog/catalogData"
import type { CatalogFilters } from "@/components/site/CatalogTopBar"

export const CATALOG_PER_PAGE = 24

const STATUS_MAP: Record<string, string> = {
  status_ongoing:   "ongoing",
  status_completed: "completed",
  status_hiatus:    "hiatus",
  status_cancelled: "cancelled",
}

export function filterCatalogItems(items: CatalogItem[], filters: CatalogFilters) {
  let filtered = [...items]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    filtered = filtered.filter(i =>
      i.title.toLowerCase().includes(q) || i.author.toLowerCase().includes(q)
    )
  }

  if (filters.genres.length > 0) {
    filtered = filtered.filter(i => filters.genres.every(g => i.genres.includes(g)))
  }

  if (filters.period.key !== "all") {
    const now = new Date().getFullYear()
    filtered = filtered.filter(i => {
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
    filtered = filtered.filter(i => filters.adv.status.some(s => STATUS_MAP[s] === i.status))
  }

  if (filters.adv.minScore > 0) {
    filtered = filtered.filter(i => i.score >= filters.adv.minScore)
  }

  if (filters.adv.author) {
    const q = filters.adv.author.toLowerCase()
    filtered = filtered.filter(i => i.author.toLowerCase().includes(q))
  }

  switch (filters.sort) {
    case "score":   filtered = [...filtered].sort((a, b) => b.score - a.score); break
    case "recent":  filtered = [...filtered].sort((a, b) => b.year - a.year);   break
    case "updated": filtered = [...filtered].sort((a, b) => b.year - a.year);   break
    case "az":      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title)); break
  }

  return filtered
}

export function getCatalogTotalPages(totalItems: number, perPage: number) {
  return Math.max(1, Math.ceil(totalItems / perPage))
}

export function getCatalogPageItems(items: CatalogItem[], page: number, perPage: number) {
  return items.slice((page - 1) * perPage, page * perPage)
}

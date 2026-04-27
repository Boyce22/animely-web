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

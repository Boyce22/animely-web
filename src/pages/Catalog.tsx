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
import {
  CATALOG_PER_PAGE,
  filterCatalogItems,
  getCatalogPageItems,
  getCatalogTotalPages,
} from "@/features/catalog/catalogFilters"

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
  }, [filters.mediaType, mediaTypeParam, setSearchParams])

  const handleFiltersChange = (f: CatalogFilters) => {
    if (f.mediaType !== filters.mediaType) {
      setSearchParams({ type: f.mediaType }, { replace: true })
    }
    setFilters(f)
    setPage(1)
  }

  const filtered = useMemo(() => filterCatalogItems(CATALOG_DATA, filters), [filters])
  const totalPages = getCatalogTotalPages(filtered.length, CATALOG_PER_PAGE)
  const pageItems  = getCatalogPageItems(filtered, page, CATALOG_PER_PAGE)

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
          perPage={CATALOG_PER_PAGE}
          totalItems={filtered.length}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>
    </div>
  )
}

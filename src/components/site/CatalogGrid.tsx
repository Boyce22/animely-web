import { DocumentIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { useEffect, useRef } from "react"
import { CatalogMangaCard, CatalogMangaRow } from "@/components/site/catalog/CatalogResultItem"
import type { CatalogItem } from "@/components/site/catalog/catalogData"

interface Props {
  items:        CatalogItem[]
  view:         "grid" | "list"
  page:         number
  perPage:      number
  totalItems:   number
  totalPages:   number
  onPageChange: (p: number) => void
}

export function CatalogGrid({ items, view, page, perPage, totalItems, totalPages, onPageChange }: Props) {
  const { t } = useTranslation()
  const hasMore = page * perPage < totalItems
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onPageChange(page + 1)
        }
      },
      { rootMargin: "100px" } // Load a bit before it enters the viewport
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, page, onPageChange])

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 pt-6 pb-6 scrollbar-hide">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
            <DocumentIcon className="w-16 h-16 opacity-20" />
            <p className="text-[18px] font-bold">{t("catalog.no_results")}</p>
            <p className="text-[14px] text-white/30">{t("catalog.no_results_sub")}</p>
          </div>
        ) : view === "grid" ? (
          <div
            className="grid gap-6 pb-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
          >
            {items.map(item => <CatalogMangaCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="pb-6">
            {items.map((item, i) => (
              <CatalogMangaRow key={item.id} item={item} rank={i + 1} />
            ))}
          </div>
        )}

        {hasMore && (
          <div ref={loadMoreRef} className="flex justify-center pt-8 pb-16">
            <div className="w-6 h-6 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}

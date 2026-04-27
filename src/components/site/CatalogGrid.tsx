import { DocumentIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { CatalogMangaCard, CatalogMangaRow } from "@/components/site/catalog/CatalogResultItem"
import { CatalogPagination } from "@/components/site/catalog/CatalogPagination"
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

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-4 pb-4 scrollbar-hide">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
            <DocumentIcon className="w-10 h-10 opacity-25" />
            <p className="text-[14px] font-semibold">{t("catalog.no_results")}</p>
            <p className="text-[12px] text-white/25">{t("catalog.no_results_sub")}</p>
          </div>
        ) : view === "grid" ? (
          <div
            className="grid gap-6 pb-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {items.map(item => <CatalogMangaCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div>
            {items.map((item, i) => (
              <CatalogMangaRow key={item.id} item={item} rank={(page - 1) * perPage + i + 1} />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <CatalogPagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          perPage={perPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

import { useRef, type KeyboardEvent } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

interface CatalogPaginationProps {
  page:       number
  totalPages: number
  totalItems: number
  perPage:    number
  onPageChange: (p: number) => void
}

function getPageButtons(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const result: (number | "...")[] = [1]
  if (current > 3) result.push("...")
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    result.push(p)
  }
  if (current < total - 2) result.push("...")
  result.push(total)
  return result
}

export function CatalogPagination({ page, totalPages, totalItems, perPage, onPageChange }: CatalogPaginationProps) {
  const { t } = useTranslation()
  const jumpRef = useRef<HTMLInputElement>(null)
  const from    = (page - 1) * perPage + 1
  const to      = Math.min(page * perPage, totalItems)
  const buttons = getPageButtons(page, totalPages)

  const handleJump = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return
    const v = parseInt((e.target as HTMLInputElement).value)
    if (!isNaN(v) && v >= 1 && v <= totalPages) onPageChange(v)
  }

  return (
    <div className="border-t border-white/[0.07] px-6 py-2.5 flex items-center justify-between flex-shrink-0 bg-background">
      <span className="text-[11px] text-white/25 font-mono whitespace-nowrap">
        {t("catalog.showing_range", { from, to, total: totalItems })}
      </span>

      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="w-7 h-7 flex items-center justify-center border border-transparent text-muted-foreground hover:text-foreground hover:border-white/[0.07] transition-all disabled:text-white/20 disabled:cursor-default disabled:hover:border-transparent"
        >
          <ChevronLeftIcon className="w-3.5 h-3.5" />
        </button>

        {buttons.map((b, i) =>
          b === "..." ? (
            <span key={`dots-${i}`} className="text-white/25 text-[12px] px-1">â€¦</span>
          ) : (
            <button
              key={b}
              onClick={() => onPageChange(b as number)}
              className={cn(
                "w-[30px] h-[30px] flex items-center justify-center border text-[12px] font-semibold transition-all",
                page === b
                  ? "border-primary/50 bg-primary/[0.08] text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-white/[0.07]",
              )}
            >
              {b}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="w-7 h-7 flex items-center justify-center border border-transparent text-muted-foreground hover:text-foreground hover:border-white/[0.07] transition-all disabled:text-white/20 disabled:cursor-default disabled:hover:border-transparent"
        >
          <ChevronRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">{t("catalog.go_to_page")}</span>
        <input
          ref={jumpRef}
          type="number"
          min={1}
          max={totalPages}
          defaultValue={page}
          onKeyDown={handleJump}
          className="w-10 bg-secondary border border-white/[0.07] text-foreground font-mono text-[12px] px-1.5 py-1 text-center outline-none focus:border-white/20 transition-colors [appearance:textfield]"
        />
      </div>
    </div>
  )
}

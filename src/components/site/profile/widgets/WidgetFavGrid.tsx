import { memo } from "react"
import { useTranslation } from "react-i18next"
import type { FavItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  id: string
  titleKey: string
  items: FavItem[]
}

function WidgetFavGridComponent({
  id, titleKey, items, ...context
}: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id={id}
      title={t(titleKey)}
      {...context}
      action={
        <button className="text-[11px] font-[600] text-white/30 hover:text-white/70 transition-colors">
          {t("profile.view_all_arr")}
        </button>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col px-[10px] pb-[10px]">
        <div className="grid flex-1 grid-cols-3 gap-[5px]">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group/fav relative cursor-pointer overflow-hidden border border-white/[0.06] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-white/[0.2] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            >
              {/* Cover */}
              <div className="relative min-h-[88px] w-full" style={{ background: item.gradient }}>
                <div className="absolute inset-0" style={{
                  backgroundImage: "repeating-linear-gradient(-52deg,transparent,transparent 18px,rgba(255,255,255,0.018) 18px,rgba(255,255,255,0.018) 19px)",
                }} />
              </div>

              {/* Rank badge */}
              <div className="absolute left-[5px] top-[5px] flex h-[17px] w-[17px] items-center justify-center bg-black/[0.7] text-[8px] font-[800] text-white/60 backdrop-blur-sm">
                #{i + 1}
              </div>

              {/* Score badge */}
              {item.score && (
                <div className="absolute right-[5px] top-[5px] bg-black/[0.75] px-[5px] py-[2px] text-[10px] font-[800] text-orange-300 backdrop-blur-sm">
                  ★ {item.score}
                </div>
              )}

              {/* Always-visible title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent px-[6px] pb-[5px] pt-[18px]">
                <span className="block truncate text-[9px] font-[700] leading-tight text-white/80">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  )
}

export const WidgetFavGrid = memo(WidgetFavGridComponent)

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
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-3">
        <div className="grid flex-1 grid-cols-3 gap-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="group/fav relative cursor-pointer overflow-hidden border border-white/[0.07] transition-[border-color,transform] duration-[180ms] hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="relative min-h-[110px] w-full" style={{ background: item.gradient }}>
                <div className="absolute inset-0" style={{
                  backgroundImage: "repeating-linear-gradient(-52deg,transparent,transparent 20px,rgba(255,255,255,0.012) 20px,rgba(255,255,255,0.012) 21px)",
                }} />
              </div>
              {item.score && (
                <div className="absolute right-1.5 top-1.5 bg-black/80 px-[6px] py-[2px] font-mono text-[11px] font-[800] text-orange-300">
                  ★ {item.score}
                </div>
              )}
              <div className="absolute inset-0 flex items-end bg-black/0 p-2 opacity-0 transition-opacity duration-[180ms] group-hover/fav:bg-black/72 group-hover/fav:opacity-100">
                <span className="text-[11px] font-[700] leading-tight text-white">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  )
}

export const WidgetFavGrid = memo(WidgetFavGridComponent)

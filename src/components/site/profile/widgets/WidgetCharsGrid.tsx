import { memo } from "react"
import { useTranslation } from "react-i18next"
import type { CharItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  id: string
  titleKey: string
  items: CharItem[]
}

function WidgetCharsGridComponent({ id, titleKey, items, ...context }: Props) {
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
        <div className="grid flex-1 grid-cols-4 gap-1">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="relative cursor-pointer overflow-hidden border border-white/[0.06] transition-[border-color,transform] duration-[180ms] hover:scale-[1.02] hover:border-white/[0.22]"
            >
              <div
                className="relative min-h-[72px] w-full"
                style={{ background: item.gradient }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-52deg,transparent,transparent 18px,rgba(255,255,255,0.018) 18px,rgba(255,255,255,0.018) 19px)",
                  }}
                />
              </div>

              {/* Rank */}
              <div className="absolute left-[4px] top-[4px] text-[8px] font-[800] text-white/40">
                #{i + 1}
              </div>

              {/* Name + series */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/92 to-transparent px-1 pb-[4px] pt-[16px] text-center">
                <div className="text-[9px] font-[700] leading-[1.2] tracking-[0.01em] text-white/90">{item.name}</div>
                {item.series && (
                  <div className="mt-[1px] truncate text-[7px] text-white/38">{item.series}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  )
}

export const WidgetCharsGrid = memo(WidgetCharsGridComponent)

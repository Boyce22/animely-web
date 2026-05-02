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
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-3">
        <div className="grid flex-1 grid-cols-4 gap-1.5">
          {items.map((item) => (
            <div
              key={item.name}
              className="relative cursor-pointer overflow-hidden border border-white/[0.07] transition-[border-color] hover:border-white/20"
            >
              <div
                className="relative min-h-[88px] w-full"
                style={{ background: item.gradient }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-52deg,transparent,transparent 20px,rgba(255,255,255,0.012) 20px,rgba(255,255,255,0.012) 21px)",
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/88 to-transparent px-1.5 pb-1.5 pt-3 text-center text-[10px] font-[700] leading-tight">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  )
}

export const WidgetCharsGrid = memo(WidgetCharsGridComponent)

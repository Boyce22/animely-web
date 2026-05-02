import { memo } from "react"
import { useTranslation } from "react-i18next"
import type { WidgetActivityItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  items: WidgetActivityItem[]
}

function WidgetActivityComponent({ items, ...context }: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="activity"
      title={t("profile.recent_activity_widget")}
      {...context}
      action={
        <button className="text-[11px] font-[600] text-white/30 hover:text-white/70 transition-colors">
          {t("profile.view_all_arr")}
        </button>
      }
    >
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 border-b border-white/[0.07] px-4 py-3 last:border-b-0"
          >
            <div
              className="h-[54px] w-[38px] shrink-0 border border-white/[0.07]"
              style={{ background: item.gradient }}
            />
            <div className="min-w-0 flex-1">
              <div className="mb-[3px] text-[13px] text-white/40">
                {item.action}{" "}
                <strong className="font-[700] text-white/85">{item.title}</strong>
              </div>
              <div className="font-mono text-[12px] text-white/25">
                {item.episode} · {item.time} atrás
              </div>
            </div>
            {item.score && (
              <div className="shrink-0 font-mono text-[13px] font-[800] text-orange-300">
                ★ {item.score}
              </div>
            )}
          </div>
        ))}
      </div>
    </Widget>
  )
}

export const WidgetActivity = memo(WidgetActivityComponent)

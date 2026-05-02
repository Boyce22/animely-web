import { memo } from "react"
import { useTranslation } from "react-i18next"
import type { BadgeItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  items: BadgeItem[]
}

function WidgetBadgesComponent({ items, ...context }: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="badges"
      title={t("profile.achievements")}
      {...context}
      action={
        <button className="text-[10px] font-[600] text-white/30 hover:text-white/70 transition-colors">
          {t("profile.view_all_arr")}
        </button>
      }
    >
      <div className="flex flex-wrap content-start gap-[7px] p-2.5">
        {items.map((badge) => (
          <div
            key={badge.name}
            className="flex min-w-[56px] cursor-pointer flex-col items-center gap-1 border border-white/[0.07] px-2.5 py-[7px] transition-[border-color] hover:border-white/[0.18]"
          >
            <div
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[15px]"
              style={{ background: badge.bg }}
            >
              {badge.emoji}
            </div>
            <div className="text-center text-[8px] font-[700] uppercase tracking-[0.06em] text-white/40">
              {badge.name}
            </div>
          </div>
        ))}
      </div>
    </Widget>
  )
}

export const WidgetBadges = memo(WidgetBadgesComponent)

import { memo } from "react"
import { useTranslation } from "react-i18next"
import type { BadgeItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

const RARITY_BORDER: Record<string, string> = {
  common:    "border-white/[0.07]",
  rare:      "border-blue-400/[0.3]",
  epic:      "border-purple-400/[0.4]",
  legendary: "border-amber-400/[0.5]",
}

const RARITY_GLOW: Record<string, string> = {
  common:    "",
  rare:      "hover:shadow-[0_0_10px_rgba(96,165,250,0.22)]",
  epic:      "hover:shadow-[0_0_12px_rgba(167,139,250,0.28)]",
  legendary: "hover:shadow-[0_0_14px_rgba(251,191,36,0.32)]",
}

interface Props extends WidgetContextValue {
  items: BadgeItem[]
  totalBadges?: number
}

function WidgetBadgesComponent({ items, totalBadges = 24, ...context }: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="badges"
      title={t("profile.achievements")}
      {...context}
      action={
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-white/[0.2]">
            {items.length} / {totalBadges} {t("profile.unlocked")}
          </span>
          <button className="text-[10px] font-[600] text-white/30 hover:text-white/70 transition-colors">
            {t("profile.view_all_arr")}
          </button>
        </div>
      }
    >
      <div className="flex flex-wrap content-start gap-[5px] p-[10px]">
        {items.map((badge) => {
          const rarity = badge.rarity ?? "common"
          return (
            <div
              key={badge.name}
              className={[
                "flex min-w-[54px] cursor-pointer flex-col items-center gap-[5px] border px-[10px] py-[7px] transition-[border-color,transform,box-shadow] duration-[180ms] hover:-translate-y-0.5",
                RARITY_BORDER[rarity],
                RARITY_GLOW[rarity],
              ].join(" ")}
            >
              <div
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[15px]"
                style={{ background: badge.bg }}
              >
                {badge.emoji}
              </div>
              <div className="text-center text-[8px] font-[700] uppercase tracking-[0.06em] text-white/30">
                {badge.name}
              </div>
            </div>
          )
        })}
      </div>
    </Widget>
  )
}

export const WidgetBadges = memo(WidgetBadgesComponent)

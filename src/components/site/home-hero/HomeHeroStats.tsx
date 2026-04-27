import { useTranslation } from "react-i18next"
import { HOME_HERO_STATIC_STATS } from "./homeHeroData"

export function HomeHeroStats() {
  const { t } = useTranslation()
  const stats = [
    ...HOME_HERO_STATIC_STATS,
    { num: t("home.hero_daily"), suffix: "", labelKey: "discussions" },
  ]

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[2] flex items-center gap-12 px-10 lg:px-16 py-5 border-t border-white/[0.08]"
      style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(4px)" }}
    >
      {stats.map(({ num, suffix, labelKey }) => (
        <div key={labelKey}>
          <div className="text-[22px] font-extrabold text-white">
            {num}
            {suffix && <span className="text-primary">{suffix}</span>}
          </div>
          <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#888] mt-0.5">
            {t(`home.hero_stat_${labelKey}`)}
          </div>
        </div>
      ))}
    </div>
  )
}

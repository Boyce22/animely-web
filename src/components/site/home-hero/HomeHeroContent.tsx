import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { HOME_HERO_FEATURE_KEYS } from "./homeHeroData"

export function HomeHeroContent() {
  const { t } = useTranslation()

  return (
    <div className="relative z-[2] px-10 lg:px-16 max-w-[560px]">
      <p className="section-label mb-[18px]">{t("home.hero_label")}</p>

      <h1
        className="font-extrabold leading-[0.95] text-white mb-5"
        style={{ fontSize: "clamp(52px, 6vw, 88px)" }}
      >
        <span className="text-primary">A</span>nimely
      </h1>

      <p className="text-[15px] leading-[1.6] text-[#aaa] mb-[22px] max-w-[400px]">
        {t("home.hero_tagline")}
      </p>

      <ul className="flex flex-col gap-2 mb-8">
        {HOME_HERO_FEATURE_KEYS.map(key => (
          <li key={key} className="flex items-center gap-[10px] text-[13px] text-[#aaa]">
            <span className="w-[5px] h-[5px] rounded-full bg-primary shrink-0" />
            {t(`home.${key}`)}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Link
          to="/feed"
          className="group flex items-center gap-[10px] bg-primary text-white font-bold text-[13px] tracking-[0.04em] uppercase px-6 py-3 hover:opacity-80 transition-opacity"
        >
          {t("home.hero_cta")}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="group-hover:translate-x-1 transition-transform duration-200"
          >
            <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link
          to="/register"
          className="border border-white/20 text-white font-semibold text-[13px] px-[22px] py-3 hover:border-white/40 transition-colors"
        >
          {t("home.hero_secondary_cta")}
        </Link>
      </div>
    </div>
  )
}

import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { HOME_HERO_FEATURE_KEYS } from "./homeHeroData"

export function HomeHeroContent() {
  const { t } = useTranslation()

  return (
    <div className="relative z-[2] px-10 lg:px-16 max-w-[650px]">
      <p className="section-label mb-[24px] text-[14px] font-black">{t("home.hero_label")}</p>

      <h1
        className="font-extrabold leading-[0.95] text-white mb-6"
        style={{ fontSize: "clamp(60px, 7vw, 100px)" }}
      >
        <span className="text-primary">A</span>nimely
      </h1>

      <p className="text-[16px] font-medium leading-[1.6] text-[#aaa] mb-[28px] max-w-[460px]">
        {t("home.hero_tagline")}
      </p>

      <ul className="flex flex-col gap-3 mb-10">
        {HOME_HERO_FEATURE_KEYS.map(key => (
          <li key={key} className="flex items-center gap-[10px] text-[14px] font-bold text-[#aaa]">
            <span className="w-[5px] h-[5px] rounded-full bg-primary shrink-0" />
            {t(`home.${key}`)}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <Link
          to="/feed"
          className="group flex items-center gap-[10px] bg-primary text-white font-black text-[14px] tracking-[0.06em] uppercase px-8 py-4 hover:bg-primary/90 transition-all rounded-md"
        >
          {t("home.hero_cta")}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="group-hover:translate-x-1 transition-transform duration-300"
          >
            <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link
          to="/register"
          className="border-2 border-white/20 text-white font-black text-[14px] tracking-widest px-[28px] py-[14px] hover:border-white/50 hover:bg-white/[0.03] transition-all rounded-md uppercase"
        >
          {t("home.hero_secondary_cta")}
        </Link>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { heroFeatured } from "@/lib/manga-data"
import { cn } from "@/lib/utils"

const DURATION = 5000

const SLIDE_GLOWS = [
  "radial-gradient(ellipse at 70% 40%, rgba(230,57,70,0.05), transparent 60%)",
  "radial-gradient(ellipse at 70% 30%, rgba(100,57,230,0.04), transparent 60%)",
  "radial-gradient(ellipse at 60% 50%, rgba(57,150,230,0.04), transparent 60%)",
  "radial-gradient(ellipse at 75% 60%, rgba(230,57,70,0.06), transparent 60%)",
  "radial-gradient(ellipse at 65% 35%, rgba(57,230,150,0.04), transparent 60%)",
]

function SlideDot({ active, onClick }: { active: boolean; onClick: () => void }) {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    if (active) {
      el.style.transition = "none"
      el.style.width = "0"
      el.getBoundingClientRect()
      el.style.transition = `width ${DURATION}ms linear`
      el.style.width = "100%"
    } else {
      el.style.transition = "none"
      el.style.width = "0"
    }
  }, [active])

  return (
    <button
      onClick={onClick}
      aria-label="Go to slide"
      className={cn(
        "relative overflow-hidden h-[3px] p-0 cursor-pointer border-none transition-[width] duration-200",
        active ? "w-9" : "w-6",
      )}
      style={{ background: "rgba(255,255,255,0.12)" }}
    >
      <div ref={fillRef} className="absolute inset-y-0 left-0 bg-primary" style={{ width: 0 }} />
    </button>
  )
}

export function HomeHero() {
  const { t } = useTranslation()
  const items = heroFeatured
  const n = items.length
  const [active, setActive] = useState(0)
  const timerRef = useRef<number | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      if (timerRef.current) clearInterval(timerRef.current)
      const next = ((idx % n) + n) % n
      setActive(next)
      timerRef.current = window.setInterval(() => {
        setActive(i => (i + 1) % n)
      }, DURATION)
    },
    [n],
  )

  useEffect(() => {
    goTo(0)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [goTo])

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              linear-gradient(to right, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.75) 35%, rgba(10,10,10,0.2) 65%, transparent 100%),
              linear-gradient(to top, rgba(10,10,10,0.90) 0%, transparent 30%)
            `,
          }}
        />

        {items.map((item, i) => (
          <div
            key={item.id}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[800ms] ease-out"
            style={{ backgroundImage: `url(${item.image})`, opacity: i === active ? 1 : 0 }}
          >
            <div className="absolute inset-0" style={{ background: SLIDE_GLOWS[i % SLIDE_GLOWS.length] }} />
          </div>
        ))}
      </div>

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
          {(["hero_feat_1", "hero_feat_2", "hero_feat_3"] as const).map(key => (
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

      <div
        className="absolute bottom-0 left-0 right-0 z-[2] flex items-center gap-12 px-10 lg:px-16 py-5 border-t border-white/[0.08]"
        style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(4px)" }}
      >
        {[
          { num: "10k", suffix: "+", labelKey: "titles" },
          { num: "50k", suffix: "+", labelKey: "members" },
          { num: t("home.hero_daily"), suffix: "", labelKey: "discussions" },
        ].map(({ num, suffix, labelKey }) => (
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

      <div className="absolute z-[3] flex items-center gap-[5px]" style={{ bottom: 76, right: 20 }}>
        {items.map((_, i) => (
          <SlideDot key={i} active={i === active} onClick={() => goTo(i)} />
        ))}
      </div>
    </section>
  )
}

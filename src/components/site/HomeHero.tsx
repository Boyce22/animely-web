import { useState, useRef, useEffect, useCallback } from "react"
import { HomeHeroBackground } from "@/components/site/home-hero/HomeHeroBackground"
import { HomeHeroContent } from "@/components/site/home-hero/HomeHeroContent"
import { HomeHeroDots } from "@/components/site/home-hero/HomeHeroDots"
import { HomeHeroStats } from "@/components/site/home-hero/HomeHeroStats"
import { DURATION } from "@/components/site/home-hero/homeHeroData"
import { heroFeatured } from "@/lib/manga-data"

export function HomeHero() {
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
      <HomeHeroBackground items={items} active={active} />
      <HomeHeroContent />
      <HomeHeroStats />
      <HomeHeroDots total={items.length} active={active} onGoTo={goTo} />
    </section>
  )
}

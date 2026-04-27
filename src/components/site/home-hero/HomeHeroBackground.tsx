import type { FeaturedHero } from "@/lib/manga-data"
import { SLIDE_GLOWS } from "./homeHeroData"

interface HomeHeroBackgroundProps {
  items: FeaturedHero[]
  active: number
}

export function HomeHeroBackground({ items, active }: HomeHeroBackgroundProps) {
  return (
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
  )
}

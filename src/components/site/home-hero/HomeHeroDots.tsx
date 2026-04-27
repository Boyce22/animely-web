import { HomeHeroSlideDot } from "./HomeHeroSlideDot"

interface HomeHeroDotsProps {
  total: number
  active: number
  onGoTo: (index: number) => void
}

export function HomeHeroDots({ total, active, onGoTo }: HomeHeroDotsProps) {
  return (
    <div className="absolute z-[3] flex items-center gap-[5px]" style={{ bottom: 76, right: 20 }}>
      {Array.from({ length: total }, (_, i) => (
        <HomeHeroSlideDot key={i} active={i === active} onClick={() => onGoTo(i)} />
      ))}
    </div>
  )
}

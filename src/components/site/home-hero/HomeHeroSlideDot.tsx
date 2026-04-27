import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { DURATION } from "./homeHeroData"

interface HomeHeroSlideDotProps {
  active: boolean
  onClick: () => void
}

export function HomeHeroSlideDot({ active, onClick }: HomeHeroSlideDotProps) {
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

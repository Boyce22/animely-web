import { cn } from "@/lib/utils"
import type { UserCollection } from "./profileTypes"

const STACK_CONFIG = [
  { className: "right-24 bottom-0 z-[1] h-[126px] w-[88px] -rotate-12 group-hover:-translate-x-2 group-hover:-rotate-[15deg]" },
  { className: "right-14 bottom-3 z-[3] h-[136px] w-[96px] group-hover:-translate-y-1.5" },
  { className: "right-3 bottom-0 z-[2] h-[126px] w-[88px] rotate-12 group-hover:translate-x-2 group-hover:rotate-[15deg]" },
] as const

interface ProfileStackedCoversProps {
  images: UserCollection["images"]
}

export function ProfileStackedCovers({ images }: ProfileStackedCoversProps) {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 h-36 w-full">
      {images.map((src, index) => {
        const config = STACK_CONFIG[index]
        if (!config) return null

        return (
          <div
            key={src}
            className={cn(
              "absolute overflow-hidden border border-border bg-secondary shadow-xl transition-transform duration-300",
              config.className,
            )}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        )
      })}
    </div>
  )
}

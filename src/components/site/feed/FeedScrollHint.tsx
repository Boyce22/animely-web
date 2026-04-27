import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

interface FeedScrollHintProps {
  visible: boolean
}

export function FeedScrollHint({ visible }: FeedScrollHintProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-1 pointer-events-none transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <span className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30">
        {t("feed.scroll_hint")}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="text-white/25"
        style={{ animation: "blink 1.4s ease infinite" }}
      >
        <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

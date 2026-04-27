import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { FeedTab } from "./feedData"

interface FeedTopBarProps {
  tabs: readonly FeedTab[]
  activeTab: number
  onTabChange: (index: number) => void
}

export function FeedTopBar({ tabs, activeTab, onTabChange }: FeedTopBarProps) {
  const { t } = useTranslation()

  return (
    <div
      className="absolute top-0 left-0 right-0 z-[20] flex items-center justify-between px-5"
      style={{
        height: 56,
        background: "linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.5) 80%, transparent 100%)",
      }}
    >
      <div className="flex items-center gap-0.5">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(i)}
            className={cn(
              "px-3 py-1.5 text-[12px] font-bold tracking-[0.06em] uppercase transition-colors bg-transparent border-none cursor-pointer",
              activeTab === i ? "text-foreground" : "text-white/35 hover:text-white/60",
            )}
          >
            {t(`feed.${tab.key}`)}
            {activeTab === i && (
              <div className="h-[2px] bg-primary mt-0.5 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <button className="text-[11px] font-black tracking-[0.08em] uppercase bg-primary text-white border-none px-3 py-1.5 cursor-pointer hover:opacity-85 transition-opacity">
        {t("feed.post_btn")}
      </button>
    </div>
  )
}

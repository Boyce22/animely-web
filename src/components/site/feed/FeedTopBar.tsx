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
        height: 64,
        background: "linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.5) 80%, transparent 100%)",
      }}
    >
      <div className="flex items-center gap-0.5">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(i)}
            className={cn(
              "px-4 py-2 text-[14px] font-bold tracking-widest uppercase transition-colors bg-transparent border-none cursor-pointer",
              activeTab === i ? "text-foreground" : "text-white/40 hover:text-white/70",
            )}
          >
            {t(`feed.${tab.key}`)}
            {activeTab === i && (
              <div className="h-[3px] bg-primary mt-1 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <button className="text-[13px] font-black tracking-widest uppercase bg-primary rounded-md text-white border-none px-4 py-2 cursor-pointer hover:opacity-85 transition-opacity">
        {t("feed.post_btn")}
      </button>
    </div>
  )
}

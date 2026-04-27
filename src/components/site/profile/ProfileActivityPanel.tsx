import type { TFunction } from "i18next"
import { cn } from "@/lib/utils"
import type { ProfileActivityItem } from "./profileTypes"

interface ProfileActivityPanelProps {
  items: ProfileActivityItem[]
  t: TFunction
}

export function ProfileActivityPanel({ items, t }: ProfileActivityPanelProps) {
  return (
    <div className="bg-[#111]/80 backdrop-blur-xl border border-white/5 rounded-xl p-8 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-red-600 rounded-full" />
          Recent Activity
        </h2>
        <p className="text-[15px] text-gray-400 mt-2 font-medium">Timeline of your latest anime and manga interactions</p>
      </div>

      <div className="space-y-0 pl-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <div key={`${item.title}-${item.date}`} className="relative flex gap-6 hover:bg-white/[0.02] p-4 -ml-4 rounded-xl transition-colors group">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border-[3px] border-red-600 bg-[#0f0f0f] mt-1 z-10 group-hover:scale-110 group-hover:bg-red-600 transition-all" />
                {!isLast && <div className="w-px h-[calc(100%+16px)] bg-white/10 -mt-2 group-hover:bg-white/20 transition-colors" />}
              </div>
              
              <div className={cn("pb-6 w-full", isLast && "pb-0")}>
                <div className="flex flex-wrap items-baseline gap-3 mb-2.5">
                  <span className="text-[17px] font-black text-white group-hover:text-red-400 transition-colors">{item.title}</span>
                  <span className="text-[12px] font-medium text-gray-500">{item.date}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                  <span className="bg-red-600/10 border border-red-500/20 text-red-400 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                    {t(`profile.activity_${item.type}`)}
                  </span>
                  <span className="text-[14px] font-medium text-gray-300">{item.text}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

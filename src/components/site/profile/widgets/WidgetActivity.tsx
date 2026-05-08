import { memo } from "react"
import { useTranslation } from "react-i18next"
import type { WidgetActivityItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  items: WidgetActivityItem[]
}

function WidgetActivityComponent({ items, ...context }: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="activity"
      title={t("profile.recent_activity_widget")}
      {...context}
      action={
        <button className="text-[11px] font-[600] text-white/30 hover:text-white/70 transition-colors">
          {t("profile.view_all_arr")}
        </button>
      }
    >
      <div className="scrollbar-hide flex-1 overflow-y-auto">
        {items.map((item, i) => {
          const typeColor: Record<string, string> = {
            watch: "#52b788", read: "#60a5fa", rate: "#f4a261", fav: "#e63946", review: "#e63946",
          }
          const accent = item.type ? (typeColor[item.type] ?? "rgba(255,255,255,0.15)") : "rgba(255,255,255,0.15)"
          return (
            <div
              key={i}
              className="flex items-start gap-[9px] border-b border-white/[0.04] px-3.5 py-[9px] last:border-b-0 hover:bg-white/[0.025] transition-colors"
            >
              {/* Cover thumbnail with accent strip */}
              <div
                className="relative h-[48px] w-[33px] shrink-0 overflow-hidden border border-white/[0.07]"
                style={{ background: item.gradient }}
              >
                <div className="absolute inset-0" style={{
                  backgroundImage: "repeating-linear-gradient(-52deg,transparent,transparent 18px,rgba(255,255,255,0.012) 18px,rgba(255,255,255,0.012) 19px)",
                }} />
                <div className="absolute bottom-0 left-0 top-0 w-[2.5px]" style={{ background: accent }} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-[3px] text-[11px] leading-[1.4] text-white/[0.32]">
                  {item.action}{" "}
                  <strong className="font-[700] text-white/[0.82]">{item.title}</strong>
                </div>
                <div className="font-mono text-[9.5px] tracking-[0.01em] text-white/[0.2]">
                  {item.episode !== "—" ? `${item.episode} · ` : ""}{t("profile.time_ago", { time: item.time })}
                </div>
              </div>

              {item.score && (
                <div className="mt-[1px] shrink-0 font-mono text-[12px] font-[800] text-orange-300">
                  {item.score}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Widget>
  )
}

export const WidgetActivity = memo(WidgetActivityComponent)

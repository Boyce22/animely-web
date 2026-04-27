import type { ComponentType } from "react"
import type { TFunction } from "i18next"
import { Bookmark, MessageSquare, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfilePanel, ProfilePanelHeader } from "./ProfilePanel"
import type { ActivityType, ProfileActivityItem } from "./profileTypes"

const activityIcons = {
  comment: MessageSquare,
  rating: Star,
  bookmark: Bookmark,
} satisfies Record<ActivityType, ComponentType<{ className?: string }>>

interface ProfileActivityPanelProps {
  items: ProfileActivityItem[]
  t: TFunction
}

function ActivityItemRow({ item, isLast, activityLabel }: { item: ProfileActivityItem; isLast: boolean; activityLabel: string }) {
  const Icon = activityIcons[item.type]

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="mt-0.5 flex h-7 w-7 items-center justify-center border border-primary/25 bg-primary/10 text-primary-soft">
          <Icon className="h-3.5 w-3.5" />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>

      <div className={cn("min-w-0 flex-1", !isLast && "pb-5")}>
        <div className="mb-1 flex flex-wrap items-baseline gap-2">
          <span className="text-[14px] font-bold text-foreground">{item.title}</span>
          <span className="font-mono text-[10px] text-muted-foreground">{item.date}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="border border-border bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
            {activityLabel}
          </span>
          <span className="text-[12px] text-muted-foreground">{item.text}</span>
        </div>
      </div>
    </div>
  )
}

export function ProfileActivityPanel({ items, t }: ProfileActivityPanelProps) {
  return (
    <ProfilePanel className="border-t-0 p-4">
      <ProfilePanelHeader
        title={t("profile.activity_title")}
        subtitle={t("profile.activity_subtitle")}
        action={<span className="font-mono text-[11px] text-muted-foreground">{items.length} logs</span>}
      />

      <div>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <ActivityItemRow
              key={`${item.title}-${item.date}`}
              item={item}
              isLast={isLast}
              activityLabel={t(`profile.activity_${item.type}`)}
            />
          )
        })}
      </div>
    </ProfilePanel>
  )
}

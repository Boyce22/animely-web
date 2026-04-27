import type { TFunction } from "i18next"
import { ProfileActivityItemRow } from "./ProfileActivityItemRow"
import { ProfilePanel, ProfilePanelHeader } from "./ProfilePanel"
import type { ProfileActivityItem } from "./profileTypes"

interface ProfileActivityPanelProps {
  items: ProfileActivityItem[]
  t: TFunction
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
            <ProfileActivityItemRow
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

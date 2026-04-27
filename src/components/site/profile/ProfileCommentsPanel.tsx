import type { TFunction } from "i18next"
import { Lock, MessageSquare } from "lucide-react"
import { ProfilePanel, ProfilePanelHeader } from "./ProfilePanel"

interface ProfileCommentsPanelProps {
  commentsCount: number
  t: TFunction
}

export function ProfileCommentsPanel({ commentsCount, t }: ProfileCommentsPanelProps) {
  return (
    <ProfilePanel className="border-t-0 p-4">
      <ProfilePanelHeader
        title={t("profile.comments_title")}
        subtitle={`${commentsCount} total comments`}
        action={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
      />

      <div className="mx-auto flex max-w-md flex-col items-center border border-dashed border-border bg-secondary/40 px-5 py-8 text-center">
        <div className="mb-3 flex h-9 w-9 items-center justify-center border border-border bg-card text-muted-foreground">
          <Lock className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold text-foreground">{t("profile.comments_empty")}</p>
        <p className="mt-1 max-w-xs text-[12px] leading-relaxed text-muted-foreground">
          Comment history will appear here when connected to the API.
        </p>
      </div>
    </ProfilePanel>
  )
}

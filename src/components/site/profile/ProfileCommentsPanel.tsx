import type { TFunction } from "i18next"
import { Lock, MessageSquare } from "lucide-react"
import { ProfileEmptyState } from "./ProfileEmptyState"
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

      <ProfileEmptyState
        icon={<Lock className="h-4 w-4" />}
        title={t("profile.comments_empty")}
        description="Comment history will appear here when connected to the API."
      />
    </ProfilePanel>
  )
}

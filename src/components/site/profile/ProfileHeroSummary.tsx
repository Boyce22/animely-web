import type { TFunction } from "i18next"
import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProfileData, UserStatus } from "./profileTypes"
import { formatProfileDate, getProfileFullName } from "./profileUtils"

const statusTone: Record<UserStatus, string> = {
  ACTIVE: "border-primary/30 bg-primary/10 text-primary-soft",
  SUSPENDED: "border-border bg-secondary text-muted-foreground",
  BANNED: "border-destructive/30 bg-destructive/10 text-destructive-foreground",
  DELETED: "border-border bg-muted text-muted-foreground",
}

interface ProfileHeroSummaryProps {
  profile: ProfileData
  t: TFunction
}

export function ProfileHeroSummary({ profile, t }: ProfileHeroSummaryProps) {
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-card bg-secondary sm:h-24 sm:w-24">
        <img src={profile.profilePictureUrl} alt={profile.username} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <span className={cn("border px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em]", statusTone[profile.status])}>
            {profile.status}
          </span>
          {profile.isVerified && (
            <span className="inline-flex items-center gap-1 border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-primary-soft">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          )}
          <span className="border border-border bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            {profile.subscriptionTier}
          </span>
        </div>

        <h1 className="max-w-[760px] truncate text-2xl font-black leading-none tracking-tight text-foreground sm:text-[28px]">
          {getProfileFullName(profile)}
        </h1>
        <p className="mt-1 text-[13px] font-semibold text-muted-foreground">@{profile.username}</p>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
          {profile.biography}
        </p>
        <p className="mt-2 text-[12px] text-muted-foreground">
          {t("profile.member_since", { date: formatProfileDate(profile.createdAt) })} / Updated {formatProfileDate(profile.updatedAt)}
        </p>
      </div>
    </div>
  )
}

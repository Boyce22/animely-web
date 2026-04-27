import type { TFunction } from "i18next"
import { BadgeCheck, ChevronDown, Edit, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProfileData, UserStatus } from "./profileTypes"
import { formatProfileDate, getProfileFullName } from "./profileUtils"

const statusTone: Record<UserStatus, string> = {
  ACTIVE: "border-primary/30 bg-primary/10 text-primary-soft",
  SUSPENDED: "border-border bg-secondary text-muted-foreground",
  BANNED: "border-destructive/30 bg-destructive/10 text-destructive-foreground",
  DELETED: "border-border bg-muted text-muted-foreground",
}

interface ProfileHeroProps {
  profile: ProfileData
  onEdit: () => void
  t: TFunction
}

function HeroBanner({ bannerUrl }: { bannerUrl: string }) {
  return (
    <div className="px-4 pt-4 sm:px-5">
      <div className="relative h-36 overflow-hidden border border-border bg-card sm:h-44 lg:h-48">
        <img
          src={bannerUrl}
          alt=""
          className="h-full w-full object-cover object-[center_38%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
      </div>
    </div>
  )
}

function HeroSummary({ profile, t }: { profile: ProfileData; t: TFunction }) {
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

function HeroActions({ onEdit, t }: { onEdit: () => void; t: TFunction }) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2">
      <button className="inline-flex h-9 items-center gap-1.5 border border-border bg-secondary px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-secondary-foreground transition-colors hover:bg-secondary/80">
        <UserPlus className="h-3.5 w-3.5" />
        {t("profile.following")}
      </button>
      <button
        onClick={onEdit}
        className="inline-flex h-9 items-center gap-1.5 bg-primary px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Edit className="h-3.5 w-3.5" />
        {t("profile.edit_profile")}
      </button>
      <button className="flex h-9 w-9 items-center justify-center border border-border bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export function ProfileHero({ profile, onEdit, t }: ProfileHeroProps) {
  return (
    <section className="border-b border-border bg-background">
      <HeroBanner bannerUrl={profile.bannerUrl} />

      <div className="px-4 pb-4 sm:px-5">
        <div className="relative -mt-10 border border-border bg-card p-4 sm:-mt-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <HeroSummary profile={profile} t={t} />
            <HeroActions onEdit={onEdit} t={t} />
          </div>
        </div>
      </div>
    </section>
  )
}

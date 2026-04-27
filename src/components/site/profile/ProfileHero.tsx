import type { TFunction } from "i18next"
import { ProfileHeroActions } from "./ProfileHeroActions"
import { ProfileHeroBanner } from "./ProfileHeroBanner"
import { ProfileHeroSummary } from "./ProfileHeroSummary"
import type { ProfileData } from "./profileTypes"

interface ProfileHeroProps {
  profile: ProfileData
  onEdit: () => void
  t: TFunction
}

export function ProfileHero({ profile, onEdit, t }: ProfileHeroProps) {
  return (
    <section className="border-b border-border bg-background">
      <ProfileHeroBanner bannerUrl={profile.bannerUrl} />

      <div className="px-4 pb-4 sm:px-5">
        <div className="relative -mt-10 border border-border bg-card p-4 sm:-mt-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <ProfileHeroSummary profile={profile} t={t} />
            <ProfileHeroActions onEdit={onEdit} t={t} />
          </div>
        </div>
      </div>
    </section>
  )
}

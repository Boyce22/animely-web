import { memo } from "react"
import { useTranslation } from "react-i18next"
import type { ProfileData } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  profile: ProfileData
}

function WidgetBioComponent({ profile, ...context }: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="bio"
      title={t("profile.bio_about")}
      {...context}
      action={
        <button className="text-[11px] font-[600] text-white/30 hover:text-white/70 transition-colors">
          {t("profile.editing")}
        </button>
      }
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="relative px-4 py-3.5">
          <div className="absolute left-0 top-3.5 bottom-3.5 w-[2px] bg-gradient-to-b from-red-500/70 via-red-500/20 to-transparent" />
          <p className="text-[13px] leading-[1.75] text-white/[0.7]">
            {profile.biography}
          </p>
        </div>

        {profile.genres && profile.genres.length > 0 && (
          <div className="flex flex-wrap items-center gap-[5px] border-t border-white/[0.055] px-4 py-2.5">
            <span className="mr-1 text-[9px] font-[700] uppercase tracking-[0.12em] text-white/[0.22]">
              {t("profile.genres")}
            </span>
            {profile.genres.map((g) => (
              <span
                key={g}
                className="border border-white/[0.07] bg-white/[0.035] px-[8px] py-[2px] text-[10px] font-[600] text-white/[0.48] transition-colors hover:border-white/[0.14] hover:text-white/[0.72]"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </Widget>
  )
}

export const WidgetBio = memo(WidgetBioComponent)

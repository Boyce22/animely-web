import { memo } from "react"
import { useTranslation } from "react-i18next"
import type { ProfileData } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  profile: ProfileData
}

const TAGS = ["Dark Fantasy", "Seinen", "Mangá", "Berserk", "Valinhos / SP"]

function WidgetBioComponent({ profile, ...context }: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="bio"
      title={t("profile.bio_about")}
      {...context}
      action={
        <button className="text-[11px] font-[600] text-white/30 hover:text-white/70 transition-colors">
          Editar
        </button>
      }
    >
      <div className="flex h-full flex-col gap-3 p-4">
        <p className="flex-1 text-[15px] leading-[1.7] text-white/70">
          {profile.biography}
        </p>
        <div className="flex flex-wrap gap-[6px]">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="border border-white/[0.07] bg-white/[0.05] px-2.5 py-[3px] text-[12px] font-[600] text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Widget>
  )
}

export const WidgetBio = memo(WidgetBioComponent)

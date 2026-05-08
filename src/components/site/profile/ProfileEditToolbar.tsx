import { memo } from "react"
import { useTranslation } from "react-i18next"
import { SquaresPlusIcon, PaintBrushIcon, PhotoIcon } from "@heroicons/react/24/outline"

interface ProfileEditToolbarProps {
  onOpenWidgets: () => void
  onOpenTheme: () => void
  onOpenBanner: () => void
  onDiscard: () => void
  onPublish: () => void
  isDraft: boolean
}

function ProfileEditToolbarComponent({
  onOpenWidgets,
  onOpenTheme,
  onOpenBanner,
  onDiscard,
  onPublish,
  isDraft,
}: ProfileEditToolbarProps) {
  const { t } = useTranslation()

  return (
    <div className="flex shrink-0 items-center gap-2 flex-wrap border-b border-purple-500/20 bg-purple-500/[0.06] px-7 py-2">
      <span className="text-[11px] font-[700] uppercase tracking-[0.1em] text-purple-300">
        {t("profile.edit_profile")}
      </span>

      <div className="h-4 w-px bg-purple-500/30" />

      <button
        onClick={onOpenWidgets}
        className="flex cursor-pointer items-center gap-[5px] border border-purple-500/30 bg-transparent px-[10px] py-[5px] text-[11px] font-[600] text-purple-300 transition-[background,border-color] hover:border-purple-500/50 hover:bg-purple-500/12 font-[inherit]"
      >
        <SquaresPlusIcon className="h-3.5 w-3.5" />
        Widget
      </button>

      <button
        onClick={onOpenTheme}
        className="flex cursor-pointer items-center gap-[5px] border border-purple-500/30 bg-transparent px-[10px] py-[5px] text-[11px] font-[600] text-purple-300 transition-[background,border-color] hover:border-purple-500/50 hover:bg-purple-500/12 font-[inherit]"
      >
        <PaintBrushIcon className="h-3.5 w-3.5" />
        Tema
      </button>

      <button
        onClick={onOpenBanner}
        className="flex cursor-pointer items-center gap-[5px] border border-purple-500/30 bg-transparent px-[10px] py-[5px] text-[11px] font-[600] text-purple-300 transition-[background,border-color] hover:border-purple-500/50 hover:bg-purple-500/12 font-[inherit]"
      >
        <PhotoIcon className="h-3.5 w-3.5" />
        Banner
      </button>

      <div className="ml-auto flex items-center gap-2">
        <span className="flex items-center gap-[5px] text-[11px] text-white/40">
          <span className="h-[6px] w-[6px] rounded-full bg-emerald-500" />
          {t("profile.auto_saved")}
        </span>

        {isDraft && (
          <>
            <button
              onClick={onDiscard}
              className="flex cursor-pointer items-center gap-[5px] border border-white/[0.07] bg-transparent px-[10px] py-[5px] text-[11px] font-[600] text-white/40 transition-[color,border-color] hover:border-red-500/30 hover:text-red-400 font-[inherit]"
            >
              {t("profile.discard")}
            </button>
            <button
              onClick={onPublish}
              className="flex cursor-pointer items-center gap-[5px] border border-transparent bg-red-500 px-[10px] py-[5px] text-[11px] font-[700] text-white transition-opacity hover:opacity-85 font-[inherit]"
            >
              {t("profile.publish")}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export const ProfileEditToolbar = memo(ProfileEditToolbarComponent)

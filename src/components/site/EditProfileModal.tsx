import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { X, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileData {
  username: string
  bio: string
  email: string
  birthDate: string
  avatarUrl: string
  bannerUrl: string
}

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
  initial: ProfileData
  onSave: (data: ProfileData) => void
}

const inputCls =
  "w-full bg-secondary border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"

export function EditProfileModal({ open, onClose, initial, onSave }: EditProfileModalProps) {
  const { t } = useTranslation()
  const [form, setForm] = useState<ProfileData>(initial)

  // — hooks always before any early return —
  useEffect(() => { if (open) setForm(initial) }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const hasChanged = JSON.stringify(form) !== JSON.stringify(initial)

  if (!open) return null

  const set = (key: keyof ProfileData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-[540px] max-h-[90vh] flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[2px] bg-gradient-to-r from-red-900 via-primary to-primary-soft shrink-0" />

        <div className="overflow-y-auto">
          <div className="relative shrink-0">
            <button onClick={onClose} className="absolute top-3 right-3 z-20 p-1.5 rounded bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors backdrop-blur-sm">
              <X className="w-4 h-4" />
            </button>

            <div className="group/banner h-32 bg-secondary overflow-hidden">
              {form.bannerUrl && (
                <img src={form.bannerUrl} alt="" className="w-full h-full object-cover object-center" />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/banner:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                  <Camera className="w-3.5 h-3.5" />
                  {t("edit_profile.change_banner")}
                </div>
              </div>
            </div>

            {/* Avatar — sibling so it's never clipped by banner's overflow-hidden */}
            <div className="absolute left-6 -bottom-12 group/avatar cursor-pointer z-10">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-[3px] border-card shadow-xl">
                {form.avatarUrl
                  ? <img src={form.avatarUrl} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-muted" />
                }
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pt-16 pb-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-foreground">{t("edit_profile.title")}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{t("edit_profile.subtitle")}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t("edit_profile.username")}</label>
                  <input value={form.username} onChange={set("username")} placeholder={t("edit_profile.username")} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t("edit_profile.birth_date")}</label>
                  <input type="date" value={form.birthDate} onChange={set("birthDate")} className={cn(inputCls, "[color-scheme:dark]")} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t("edit_profile.email")}</label>
                <input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" className={inputCls} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t("edit_profile.bio")}</label>
                <textarea rows={3} value={form.bio} onChange={set("bio")} placeholder={t("edit_profile.bio_placeholder")} className={cn(inputCls, "resize-none leading-relaxed")} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t("edit_profile.avatar_url")}</label>
                  <input value={form.avatarUrl} onChange={set("avatarUrl")} placeholder="https://..." className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{t("edit_profile.banner_url")}</label>
                  <input value={form.bannerUrl} onChange={set("bannerUrl")} placeholder="https://..." className={inputCls} />
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-6 pt-4 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary border border-border rounded-sm transition-colors"
              >
                {t("edit_profile.cancel")}
              </button>
              <button
                disabled={!hasChanged}
                onClick={() => { onSave(form); onClose() }}
                className={cn(
                  "px-5 py-2 text-sm font-semibold rounded-sm transition-all",
                  hasChanged
                    ? "bg-primary text-primary-foreground hover:bg-primary/85 active:scale-[0.98]"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                )}
              >
                {t("edit_profile.save_changes")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState, type ChangeEvent } from "react"
import { useTranslation } from "react-i18next"
import {
  EditProfileActions,
  EditProfileFields,
  EditProfileMediaHeader,
} from "./edit-profile/EditProfileModalParts"
import type { EditProfileData } from "./profile/profileTypes"

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
  initial: EditProfileData
  onSave: (data: EditProfileData) => void
}

export function EditProfileModal({ open, onClose, initial, onSave }: EditProfileModalProps) {
  const { t } = useTranslation()
  const [form, setForm] = useState<EditProfileData>(initial)

  useEffect(() => { if (open) setForm(initial) }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const hasChanged = JSON.stringify(form) !== JSON.stringify(initial)

  if (!open) return null

  const set = (key: keyof EditProfileData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
          <EditProfileMediaHeader form={form} onClose={onClose} t={t} />

          <div className="px-6 pt-16 pb-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-foreground">{t("edit_profile.title")}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{t("edit_profile.subtitle")}</p>
            </div>

            <EditProfileFields form={form} onFieldChange={set} t={t} />

            <EditProfileActions
              hasChanged={hasChanged}
              onCancel={onClose}
              onSave={() => { onSave(form); onClose() }}
              t={t}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

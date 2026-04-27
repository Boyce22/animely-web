import { Eye, EyeOff, Shield } from "lucide-react"
import type { ProfileData } from "./profileTypes"

interface ProfileTabStatusProps {
  profile: ProfileData
}

export function ProfileTabStatus({ profile }: ProfileTabStatusProps) {
  return (
    <div className="hidden shrink-0 items-center gap-3 px-3 text-[11px] text-muted-foreground md:flex">
      <span className="inline-flex items-center gap-1.5">
        {profile.isProfilePublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        {profile.isProfilePublic ? "Public" : "Private"}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Shield className="h-3 w-3" />
        {profile.role}
      </span>
    </div>
  )
}

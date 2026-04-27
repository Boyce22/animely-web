import type { ReactNode } from "react"
import type { TFunction } from "i18next"
import { Calendar, Clock, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProfileData } from "./profileTypes"
import { formatProfileDate } from "./profileUtils"

interface ProfileSidePanelProps {
  profile: ProfileData
  t: TFunction
  className?: string
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 text-[14px] text-gray-400">
      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/5">
        {icon}
      </div>
      <span className="min-w-0 flex flex-col justify-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</span>
        <span className="text-gray-200 font-medium">{value}</span>
      </span>
    </div>
  )
}

function AboutPanel({ profile, t }: { profile: ProfileData; t: TFunction }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#111]/80 backdrop-blur-xl p-6 shadow-2xl">
      <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-red-600 rounded-full" />
        About
      </h2>
      <p className="text-[14px] text-gray-300 leading-relaxed mb-6 font-medium">
        {profile.biography}
      </p>
      <div className="space-y-4">
        <InfoRow icon={<Mail className="h-4 w-4 text-red-500" />} label="Email" value={profile.email} />
        <InfoRow icon={<Calendar className="h-4 w-4 text-red-500" />} label="Birth Date" value={formatProfileDate(profile.birthDate)} />
        <InfoRow icon={<Clock className="h-4 w-4 text-red-500" />} label="Last Active" value={formatProfileDate(profile.lastLoginAt)} />
      </div>
    </div>
  )
}

function ReadingStatsPanel({ profile }: { profile: ProfileData }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#111]/80 backdrop-blur-xl p-6 shadow-2xl">
      <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-5 bg-red-600 rounded-full" />
        Reading Stats
      </h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-[13px] mb-2 font-bold">
            <span className="text-gray-400">Total Chapters</span>
            <span className="text-white">1247</span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full" style={{ width: '80%' }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[13px] mb-2 font-bold">
            <span className="text-gray-400">Reading Time</span>
            <span className="text-white">438h 15m</span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full" style={{ width: '45%' }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[13px] mb-2 font-bold">
            <span className="text-gray-400">Completed Series</span>
            <span className="text-white">18/42</span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full" style={{ width: '35%' }} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-4">Favorite Genres</h3>
        <div className="flex flex-wrap gap-2">
          {["Action", "Fantasy", "Romance", "Adventure"].map(genre => (
            <span key={genre} className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[12px] font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProfileSidePanel({ profile, t, className }: ProfileSidePanelProps) {
  return (
    <aside className={cn("space-y-6", className)}>
      <AboutPanel profile={profile} t={t} />
      <ReadingStatsPanel profile={profile} />
    </aside>
  )
}

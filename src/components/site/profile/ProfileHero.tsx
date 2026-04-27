import type { TFunction } from "i18next";
import { Edit } from "lucide-react";
import type { ProfileData } from "./profileTypes";
import { formatProfileDate } from "./profileUtils";

interface ProfileHeroProps {
  profile: ProfileData;
  onEdit: () => void;
  t: TFunction;
}

export function ProfileHero({ profile, onEdit, t }: ProfileHeroProps) {
  return (
    <div className="mb-10">
      <div className="relative h-48 sm:h-64 lg:h-80 w-full overflow-hidden">
        <img
          src={profile.bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
      </div>
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8">
            <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full border-[5px] border-[#0a0a0a] overflow-hidden bg-[#111] shrink-0 relative z-10 shadow-2xl">
              <img
                src={profile.profilePictureUrl}
                alt={profile.username}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-2 sm:mb-6">
              <div className="flex items-center gap-4 mb-1">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {profile.name}
                </h1>
                <span className="bg-gradient-to-r from-red-600 to-red-800 text-white border border-red-500/50 text-xs font-black px-3 py-1 rounded-md uppercase tracking-widest shadow-lg">
                  Pro
                </span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base font-medium flex items-center gap-2">
                <span className="text-gray-300">@{profile.username}</span>
                <span>•</span>
                <span>
                  {t("profile.member_since", {
                    date: formatProfileDate(profile.createdAt),
                  })}
                </span>
              </p>
            </div>
          </div>
          <div className="mb-2 sm:mb-6">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-xl"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { EditProfileData, ProfileData } from "./profileTypes"

export function formatProfileDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value))
}

export function compactProfileNumber(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export function getProfileFullName(profile: ProfileData) {
  return `${profile.name} ${profile.lastName}`.trim()
}

export function toEditProfileData(profile: ProfileData): EditProfileData {
  return {
    username: profile.username,
    bio: profile.biography,
    email: profile.email,
    birthDate: profile.birthDate,
    avatarUrl: profile.profilePictureUrl,
    bannerUrl: profile.bannerUrl,
  }
}

export function applyEditProfileData(profile: ProfileData, data: EditProfileData): ProfileData {
  return {
    ...profile,
    username: data.username,
    biography: data.bio,
    email: data.email,
    birthDate: data.birthDate,
    profilePictureUrl: data.avatarUrl,
    bannerUrl: data.bannerUrl,
    updatedAt: new Date().toISOString(),
  }
}

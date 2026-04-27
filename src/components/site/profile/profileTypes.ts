export type ProfileTab = "activity" | "library" | "comments"
export type UserStatus = "ACTIVE" | "SUSPENDED" | "BANNED" | "DELETED"
export type SubscriptionTier = "FREE" | "PRO" | "PREMIUM"
export type UserRole = "USER" | "MODERATOR" | "ADMIN" | "OWNER"
export type PreferredLanguage = "ENGLISH" | "PORTUGUESE" | "SPANISH"
export type UserTheme = "DARK" | "LIGHT" | "SYSTEM"
export type ActivityType = "comment" | "rating" | "bookmark"

export interface ProfileData {
  id: string
  name: string
  lastName: string
  username: string
  biography: string
  birthDate: string
  email: string
  role: UserRole
  status: UserStatus
  subscriptionTier: SubscriptionTier
  isVerified: boolean
  emailVerifiedAt: string
  profilePictureUrl: string
  bannerUrl: string
  address: string
  createdAt: string
  updatedAt: string
  lastLoginAt: string
  worksCreated: number
  commentsCount: number
  favoritesCount: number
  ratingsCount: number
  collectionsCount: number
  followingCount: number
  followersCount: number
  showMatureContent: boolean
  preferredLanguage: PreferredLanguage
  theme: UserTheme
  isProfilePublic: boolean
  showActivity: boolean
  showCollections: boolean
  timeZone: string
}

export interface EditProfileData {
  username: string
  bio: string
  email: string
  birthDate: string
  avatarUrl: string
  bannerUrl: string
}

export interface UserCollection {
  id: string
  title: string
  count: number
  updatedAt: string
  images: [string, string, string]
}

export interface ProfileActivityItem {
  title: string
  date: string
  type: ActivityType
  text: string
}

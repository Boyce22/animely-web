interface ProfileHeroBannerProps {
  bannerUrl: string
}

export function ProfileHeroBanner({ bannerUrl }: ProfileHeroBannerProps) {
  return (
    <div className="px-4 pt-4 sm:px-5">
      <div className="relative h-36 overflow-hidden border border-border bg-card sm:h-44 lg:h-48">
        <img
          src={bannerUrl}
          alt=""
          className="h-full w-full object-cover object-[center_38%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
      </div>
    </div>
  )
}

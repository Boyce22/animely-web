interface ExploreRightSectionHeaderProps {
  title: string
  link?: string
}

export function ExploreRightSectionHeader({ title, link }: ExploreRightSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3.5">
      <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20">
        {title}
      </span>
      {link && (
        <a className="text-[9px] font-bold text-primary uppercase cursor-pointer hover:text-primary/80 transition-colors">
          {link}
        </a>
      )}
    </div>
  )
}

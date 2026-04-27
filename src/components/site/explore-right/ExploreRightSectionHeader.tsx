interface ExploreRightSectionHeaderProps {
  title: string
  link?: string
}

export function ExploreRightSectionHeader({ title, link }: ExploreRightSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-[12px] font-black tracking-widest uppercase text-white/30">
        {title}
      </span>
      {link && (
        <a className="text-[10px] font-bold text-primary uppercase tracking-wider cursor-pointer hover:text-primary/80 transition-colors">
          {link}
        </a>
      )}
    </div>
  )
}

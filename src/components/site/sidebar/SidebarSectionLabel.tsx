import type { ReactNode } from "react"

interface SidebarSectionLabelProps {
  children: ReactNode
}

export function SidebarSectionLabel({ children }: SidebarSectionLabelProps) {
  return (
    <p className="overflow-hidden whitespace-nowrap px-5 pb-1.5 pt-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/15 opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-h-8 group-hover/sidebar:opacity-100">
      {children}
    </p>
  )
}

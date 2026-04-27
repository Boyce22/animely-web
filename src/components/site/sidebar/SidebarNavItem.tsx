import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface SidebarNavItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  active: boolean
  dot?: boolean
  badge?: number
  count?: number
}

export function SidebarNavItem({ icon: Icon, label, href, active, dot, badge, count }: SidebarNavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-4 border-l-[3px] px-4 py-3 text-[15px] font-bold transition-all duration-150",
        active
          ? "border-primary bg-primary/[0.06] text-foreground"
          : "border-transparent text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
      )}
    >
      <Icon className="h-[20px] w-[20px] flex-shrink-0" />
      <span className="max-w-0 flex-1 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[160px] group-hover/sidebar:opacity-100">
        {label}
      </span>
      {dot && (
        <span className="h-1.5 w-1.5 max-w-0 flex-shrink-0 overflow-hidden rounded-full bg-primary opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[10px] group-hover/sidebar:opacity-100" />
      )}
      {badge !== undefined && (
        <span className="min-w-[18px] max-w-0 flex-shrink-0 overflow-hidden whitespace-nowrap bg-primary px-1.5 py-px text-center text-[10px] font-bold leading-tight text-white opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[30px] group-hover/sidebar:opacity-100">
          {badge}
        </span>
      )}
      {count !== undefined && (
        <span className="max-w-0 flex-shrink-0 overflow-hidden whitespace-nowrap font-mono text-[11px] font-semibold text-white/20 opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[30px] group-hover/sidebar:opacity-100">
          {count}
        </span>
      )}
    </Link>
  )
}

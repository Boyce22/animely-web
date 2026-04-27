import { useNavigate } from "react-router-dom"

export function SidebarUserSummary() {
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate("/profile")}
      className="flex flex-shrink-0 cursor-pointer items-center gap-3 border-t border-white/[0.07] px-3 py-4 transition-colors hover:bg-white/[0.04]"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#6930c3] text-[13px] font-black text-white shadow-lg">
        K
      </div>
      <div className="min-w-0 max-w-0 overflow-hidden opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[140px] group-hover/sidebar:opacity-100">
        <p className="mb-0.5 whitespace-nowrap text-[14px] font-bold leading-none text-foreground">kurumi_fan</p>
        <p className="whitespace-nowrap text-[12px] font-medium text-white/40">Pro · 847 eps</p>
      </div>
    </div>
  )
}

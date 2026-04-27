export function SidebarUserSummary() {
  return (
    <div className="flex flex-shrink-0 cursor-pointer items-center gap-2.5 border-t border-white/[0.07] px-3 py-3.5 transition-colors hover:bg-white/[0.03]">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#6930c3] text-[12px] font-black text-white">
        K
      </div>
      <div className="min-w-0 max-w-0 overflow-hidden opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[140px] group-hover/sidebar:opacity-100">
        <p className="mb-0.5 whitespace-nowrap text-[13px] font-bold leading-none text-foreground">kurumi_fan</p>
        <p className="whitespace-nowrap text-[11px] text-muted-foreground/60">Pro Â· 847 eps</p>
      </div>
    </div>
  )
}

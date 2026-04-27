import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface SidebarSearchProps {
  placeholder: string
}

export function SidebarSearch({ placeholder }: SidebarSearchProps) {
  return (
    <div className="mx-2 my-3 flex flex-shrink-0 items-center gap-2 border border-white/[0.07] bg-[#161616] px-2.5 py-2">
      <MagnifyingGlassIcon className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/50" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-0 max-w-0 overflow-hidden border-none bg-transparent text-[12px] text-foreground opacity-0 outline-none transition-all duration-200 delay-75 placeholder:text-muted-foreground/40 group-hover/sidebar:w-full group-hover/sidebar:max-w-[140px] group-hover/sidebar:opacity-100"
      />
    </div>
  )
}

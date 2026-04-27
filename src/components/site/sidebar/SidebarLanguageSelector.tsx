import { useEffect, useRef, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import i18n from "@/i18n"
import { cn } from "@/lib/utils"
import { LANGUAGES, type LangCode } from "./sidebarData"

function changeLang(code: LangCode) {
  i18n.changeLanguage(code)
  try { localStorage.setItem("animely-lang", code) } catch { /* noop */ }
}

export function SidebarLanguageSelector() {
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const currentLang = LANGUAGES.find(lang => lang.code === i18n.language) ?? LANGUAGES[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="relative flex-shrink-0 border-t border-white/[0.07] px-3 py-2.5" ref={langRef}>
      <button
        onClick={() => setLangOpen(open => !open)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border bg-transparent px-3 py-2.5 text-[13px] font-bold transition-all",
          langOpen
            ? "border-white/20 text-foreground bg-white/[0.04]"
            : "border-white/[0.07] text-muted-foreground hover:border-white/20 hover:text-foreground hover:bg-white/[0.02]",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex-shrink-0 text-[16px] leading-none">{currentLang.flag}</span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[80px] group-hover/sidebar:opacity-100">
            {currentLang.native}
          </span>
        </div>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 max-w-0 flex-shrink-0 overflow-hidden opacity-0 transition-all duration-200 group-hover/sidebar:max-w-[16px] group-hover/sidebar:opacity-100",
            langOpen && "rotate-180",
          )}
        />
      </button>

      {langOpen && (
        <div className="absolute bottom-full left-3 right-3 z-50 mb-2 overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { changeLang(lang.code); setLangOpen(false) }}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-[13px] font-bold transition-colors",
                i18n.language === lang.code
                  ? "bg-primary/10 text-primary"
                  : "text-white/50 hover:bg-white/[0.04] hover:text-white",
              )}
            >
              <span className="text-[16px] leading-none">{lang.flag}</span>
              <span>{lang.native}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-[10px] font-black text-primary uppercase">OK</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

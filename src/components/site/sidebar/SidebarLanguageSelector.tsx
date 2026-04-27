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
          "flex w-full items-center justify-between rounded-md border bg-transparent px-2.5 py-[7px] text-[12px] font-semibold transition-all",
          langOpen
            ? "border-white/20 text-foreground"
            : "border-white/[0.07] text-muted-foreground hover:border-white/20 hover:text-foreground",
        )}
      >
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0">{currentLang.flag}</span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 delay-75 group-hover/sidebar:max-w-[80px] group-hover/sidebar:opacity-100">
            {currentLang.native}
          </span>
        </div>
        <ChevronDownIcon
          className={cn(
            "h-3 w-3 max-w-0 flex-shrink-0 overflow-hidden opacity-0 transition-all duration-200 group-hover/sidebar:max-w-[12px] group-hover/sidebar:opacity-100",
            langOpen && "rotate-180",
          )}
        />
      </button>

      {langOpen && (
        <div className="absolute bottom-full left-3 right-3 z-50 mb-1.5 overflow-hidden rounded-sm border border-border bg-card shadow-2xl shadow-black/60">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { changeLang(lang.code); setLangOpen(false) }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-xs transition-colors",
                i18n.language === lang.code
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <span>{lang.flag}</span>
              <span>{lang.native}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-[9px] font-black text-primary">OK</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

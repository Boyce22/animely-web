import type { TFunction } from "i18next"
import { X } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const NAV_KEYS = [
  { key: "catalog", href: "/catalog" },
  { key: "community", href: "/community" },
  { key: "changelog", href: "/changelog" },
] as const

interface HeaderNavigationProps {
  isTransparent: boolean
  t: TFunction
}

export function HeaderDesktopNav({ isTransparent, t }: HeaderNavigationProps) {
  return (
    <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
      {NAV_KEYS.map(({ key, href }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            "relative text-[14px] font-bold tracking-wide transition-colors duration-200",
            "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
            isTransparent
              ? "text-white/70 hover:text-white"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t(`nav.${key}`)}
        </Link>
      ))}
    </nav>
  )
}

interface HeaderMobileDrawerProps extends HeaderNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export function HeaderMobileDrawer({ isOpen, isTransparent, onClose, t }: HeaderMobileDrawerProps) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-300 ease-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
          isTransparent ? "bg-black/95 backdrop-blur-xl" : "bg-background",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border/20">
            <span className="text-sm font-semibold text-foreground">{t("header.menu")}</span>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {NAV_KEYS.map(({ key, href }) => (
              <Link
                key={href}
                to={href}
                onClick={onClose}
                className="block px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border/20 space-y-2">
            <Link
              to="/login"
              onClick={onClose}
              className="block w-full text-center px-4 py-2.5 text-sm font-medium uppercase tracking-wide border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
            >
              {t("header.login")}
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="block w-full text-center px-4 py-2.5 text-sm font-bold uppercase tracking-wide bg-primary text-white hover:bg-primary/90 transition-all"
            >
              {t("header.register")}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

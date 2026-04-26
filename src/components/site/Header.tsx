import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

const NAV_KEYS = [
  { key: "catalog",   href: "/catalog" },
  { key: "community", href: "/community" },
  { key: "changelog", href: "/changelog" },
] as const

interface HeaderProps {
  variant?: "transparent" | "solid"
}

export function Header({ variant = "transparent" }: HeaderProps) {
  const { t } = useTranslation()
  const isTransparent = variant === "transparent"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 sm:px-6 lg:px-12",
          isTransparent
            ? "backdrop-blur-md bg-gradient-to-b from-black/70 via-black/30 to-transparent"
            : "bg-background border-b border-border/60",
        )}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-[15px] lg:text-base font-black tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="text-primary">a</span>nimely
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_KEYS.map(({ key, href }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                "relative text-sm font-medium tracking-wide transition-colors duration-200",
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

        {/* Right: auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/login"
              className={cn(
                "px-3 md:px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors duration-200",
                isTransparent
                  ? "text-white/70 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t("header.login")}
            </Link>
            <Link
              to="/register"
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary text-white transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
            >
              {t("header.register")}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "md:hidden p-2 transition-colors",
              isTransparent
                ? "text-white/70 hover:text-white hover:bg-white/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
            aria-label={t("header.menu")}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-300 ease-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          isTransparent ? "bg-black/95 backdrop-blur-xl" : "bg-background",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border/20">
            <span className="text-sm font-semibold text-foreground">{t("header.menu")}</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
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
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border/20 space-y-2">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-medium uppercase tracking-wide border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
            >
              {t("header.login")}
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
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

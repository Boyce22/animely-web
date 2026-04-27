import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { HeaderDesktopNav, HeaderMobileDrawer } from "./header/HeaderNavigation"

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

        <HeaderDesktopNav isTransparent={isTransparent} t={t} />

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

      <HeaderMobileDrawer
        isOpen={isMobileMenuOpen}
        isTransparent={isTransparent}
        onClose={() => setIsMobileMenuOpen(false)}
        t={t}
      />
    </>
  )
}

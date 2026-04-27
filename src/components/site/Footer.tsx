import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FooterSocialLinks } from "./footer/FooterSocialLinks"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border mt-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 lg:px-12 py-8">
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold tracking-tight text-foreground/80">
            <span className="text-primary">K</span>urosaw
          </span>
          <div className="h-3 w-px bg-border" aria-hidden />
          <nav className="flex items-center gap-5">
            <Link to="/terms"    className="section-label hover:text-foreground/60 transition-colors duration-150">{t("footer.terms")}</Link>
            <Link to="/contacts" className="section-label hover:text-foreground/60 transition-colors duration-150">{t("footer.contacts")}</Link>
          </nav>
        </div>
        <FooterSocialLinks />
      </div>
    </footer>
  )
}

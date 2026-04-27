import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { SidebarBrand } from "@/components/site/sidebar/SidebarBrand"
import { SidebarDivider } from "@/components/site/sidebar/SidebarDivider"
import { SidebarLanguageSelector } from "@/components/site/sidebar/SidebarLanguageSelector"
import { SidebarNavItem } from "@/components/site/sidebar/SidebarNavItem"
import { SidebarSearch } from "@/components/site/sidebar/SidebarSearch"
import { SidebarSectionLabel } from "@/components/site/sidebar/SidebarSectionLabel"
import { SidebarUserSummary } from "@/components/site/sidebar/SidebarUserSummary"
import { BASE_NAV, DISCUSSION_SUBNAV, LISTS_SUBNAV, UTILITY_NAV } from "@/components/site/sidebar/sidebarData"
import { getSidebarActiveRoot, isSidebarItemActive } from "@/components/site/sidebar/sidebarUtils"

export function ExploreSidebar() {
  const { t } = useTranslation()
  const location = useLocation()
  const section = new URLSearchParams(location.search).get("section") ?? "discussions"
  const activeRoot = getSidebarActiveRoot(location.pathname)
  const contextualNav =
    activeRoot === "my_lists" ? { label: t("explore.nav_my_lists"), items: LISTS_SUBNAV } :
    activeRoot === "discussions" ? { label: t("explore.nav_discussions"), items: DISCUSSION_SUBNAV } :
    null

  const isActive = (key: string, href: string) => (
    isSidebarItemActive(key, href, location.pathname, section)
  )

  return (
    <div className="group/sidebar relative z-50 h-screen w-[64px] flex-shrink-0">
      <aside className="absolute left-0 top-0 flex h-full w-[64px] flex-col overflow-hidden border-r border-white/[0.07] bg-background transition-[width] duration-200 group-hover/sidebar:w-[260px]">
        <SidebarBrand />
        <SidebarSearch placeholder={t("header.search_placeholder")} />

        <nav className="flex-1 overflow-y-auto scrollbar-hide pt-1">
          {BASE_NAV.map(({ icon, key, href, tKey }) => (
            <SidebarNavItem
              key={key}
              icon={icon}
              label={t(tKey)}
              href={href}
              active={isActive(key, href)}
            />
          ))}

          {contextualNav && (
            <>
              <SidebarDivider />
              <SidebarSectionLabel>{contextualNav.label}</SidebarSectionLabel>
              {contextualNav.items.map(({ icon, key, href, tKey, ...rest }) => (
                <SidebarNavItem
                  key={key}
                  icon={icon}
                  label={t(tKey)}
                  href={href}
                  active={isActive(key, href)}
                  {...rest}
                />
              ))}
            </>
          )}

          <SidebarDivider />
          <SidebarSectionLabel>{t("explore.nav_activities")}</SidebarSectionLabel>
          {UTILITY_NAV.map(({ icon, key, href, tKey, badge }) => (
            <SidebarNavItem
              key={key}
              icon={icon}
              label={t(tKey)}
              href={href}
              active={isActive(key, href)}
              badge={badge}
            />
          ))}
        </nav>

        <SidebarLanguageSelector />
        <SidebarUserSummary />
      </aside>
    </div>
  )
}

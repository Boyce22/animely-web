import { memo } from "react"
import { useTranslation } from "react-i18next"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import type { SocialLinkItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  items: SocialLinkItem[]
}

const NETWORK_STYLE: Record<string, { bg: string; iconColor: string }> = {
  twitter:   { bg: "rgba(0,0,0,0.4)",     iconColor: "#888" },
  instagram: { bg: "rgba(228,64,95,0.15)", iconColor: "#e4405f" },
  youtube:   { bg: "rgba(255,0,0,0.1)",   iconColor: "#f00" },
  discord:   { bg: "rgba(88,101,242,0.15)", iconColor: "#5865f2" },
}

function NetworkIcon({ network }: { network: string }) {
  if (network === "twitter") return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 1h3.5l2.5 3.5-4 5.5H1l3.5-4.5L1 1z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M10 1L6.5 5.5 10 10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
  if (network === "instagram") return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="9.3" cy="3.7" r=".7" fill="currentColor" />
    </svg>
  )
  if (network === "youtube") return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="2" width="11" height="9" rx="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M5.5 5l3 2-3 2V5z" fill="currentColor" />
    </svg>
  )
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 8.5c0-1.8.7-3.5 2.5-3.5 1.8 0 2.5 1.7 2.5 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function WidgetSocialComponent({ items, ...context }: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="social"
      title={t("profile.social_links_widget")}
      {...context}
    >
      <div className="flex flex-col gap-1.5 p-3">
        {items.map((link) => {
          const ns = NETWORK_STYLE[link.network]
          return (
            <a
              key={link.network}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2.5 border border-white/[0.07] px-2 py-[7px] transition-[border-color,background] hover:border-white/[0.12] hover:bg-white/[0.03]"
            >
              <div
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[4px]"
                style={{ background: ns.bg, color: ns.iconColor }}
              >
                <NetworkIcon network={link.network} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-[600]">{link.name}</div>
                <div className="text-[10px] text-white/40">{link.handle}</div>
              </div>
              <ChevronRightIcon className="h-[9px] w-[9px] shrink-0 text-white/25" />
            </a>
          )
        })}
      </div>
    </Widget>
  )
}

export const WidgetSocial = memo(WidgetSocialComponent)

import { memo } from "react"
import { useTranslation } from "react-i18next"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import type { SocialLinkItem } from "../profileTypes"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  items: SocialLinkItem[]
}

interface NetCfg {
  bg: string
  color: string
  borderHover: string
  glow: string
}

const NETWORK_CONFIG: Record<string, NetCfg> = {
  twitter: {
    bg:          "rgba(139,155,173,0.06)",
    color:       "#8b9bad",
    borderHover: "rgba(139,155,173,0.35)",
    glow:        "rgba(139,155,173,0.12)",
  },
  instagram: {
    bg:          "rgba(228,64,95,0.07)",
    color:       "#e4405f",
    borderHover: "rgba(228,64,95,0.42)",
    glow:        "rgba(228,64,95,0.13)",
  },
  youtube: {
    bg:          "rgba(255,34,0,0.07)",
    color:       "#ff2200",
    borderHover: "rgba(255,34,0,0.40)",
    glow:        "rgba(255,34,0,0.12)",
  },
  discord: {
    bg:          "rgba(88,101,242,0.08)",
    color:       "#5865f2",
    borderHover: "rgba(88,101,242,0.45)",
    glow:        "rgba(88,101,242,0.13)",
  },
}

function WidgetSocialComponent({ items, ...context }: Props) {
  const { t } = useTranslation()

  return (
    <Widget id="social" title={t("profile.social_links_widget")} {...context}>
      <div className="grid grid-cols-2 gap-[6px] p-[10px]">
        {items.map((link) => {
          const cfg = NETWORK_CONFIG[link.network] ?? NETWORK_CONFIG.twitter
          return (
            <a
              key={link.network}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group/soc flex flex-col gap-[7px] rounded-[7px] border border-white/[0.07] p-[10px] no-underline transition-[box-shadow,transform] duration-[260ms] hover:-translate-y-[1px] hover:shadow-[0_0_0_1px_var(--bc),0_8px_22px_var(--gw)]"
              style={
                {
                  background: cfg.bg,
                  "--bc": cfg.borderHover,
                  "--gw": cfg.glow,
                } as React.CSSProperties
              }
            >
              {/* Network label + arrow */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[8px] font-[900] uppercase tracking-[0.14em]"
                  style={{ color: cfg.color }}
                >
                  {link.network}
                </span>
                <ArrowTopRightOnSquareIcon className="h-[9px] w-[9px] text-white/[0.14] transition-[color,transform] duration-[180ms] group-hover/soc:-translate-y-[1px] group-hover/soc:translate-x-[1px] group-hover/soc:text-white/[0.48]" />
              </div>

              {/* Display name */}
              <div className="text-[11px] font-[700] leading-none text-white/[0.72] transition-colors duration-[180ms] group-hover/soc:text-white/[0.92]">
                {link.name}
              </div>

              {/* Handle */}
              <div className="truncate font-mono text-[9px] text-white/[0.26]">
                {link.handle}
              </div>
            </a>
          )
        })}
      </div>
    </Widget>
  )
}

export const WidgetSocial = memo(WidgetSocialComponent)

import { Fragment, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowLeft, QrCode, Zap, Shield, Sparkles, BookOpen, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const AMOUNTS = [5, 10, 25, 50]

const PERK_KEYS = [
  { Icon: Zap,      titleKey: "early_access_title", descKey: "early_access_desc" },
  { Icon: Shield,   titleKey: "ad_free_title",       descKey: "ad_free_desc"      },
  { Icon: Sparkles, titleKey: "exclusive_title",     descKey: "exclusive_desc"    },
  { Icon: BookOpen, titleKey: "credit_title",        descKey: "credit_desc"       },
] as const

const STAT_KEYS = [
  { value: "2.4k", labelKey: "supporters"    },
  { value: "270",  labelKey: "chapters_free" },
  { value: "100%", labelKey: "independent"   },
] as const

export default function Donate() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState("")
  const [customActive, setCustomActive] = useState(false)
  const customRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const donationValue = customActive
    ? (parseFloat(custom) > 0 ? parseFloat(custom) : null)
    : selected

  function pickPreset(amount: number) {
    setSelected(amount)
    setCustomActive(false)
    setCustom("")
  }

  function activateCustom() {
    setSelected(null)
    setCustomActive(true)
    setTimeout(() => customRef.current?.focus(), 0)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">

      {/* Nav */}
      <div className="sticky top-0 z-50 shrink-0 h-12 flex items-center px-6 sm:px-10 border-b border-border/30 bg-background/90 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t("donate.back")}
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
          {t("donate.support")}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-0">

          {/* ── Left: hero + actions ── */}
          <div className="flex-1 sm:pr-12">

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/55 mb-5">
              Animely
            </p>

            <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-black leading-[1.05] tracking-tight mb-3">
              {t("donate.headline_1")}<br />
              <span className="text-primary">{t("donate.headline_2")}</span>
            </h1>

            <p className="text-[13px] text-muted-foreground leading-relaxed mb-8 max-w-[340px]">
              {t("donate.body")}
            </p>

            {/* Stats inline */}
            <div className="flex items-center gap-5 mb-8">
              {STAT_KEYS.map(({ value, labelKey }, i) => (
                <Fragment key={labelKey}>
                  {i > 0 && <div className="w-px h-6 bg-border/60 shrink-0" />}
                  <div>
                    <p className="text-lg font-black tabular-nums text-foreground leading-none mb-0.5">{value}</p>
                    <p className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-wide">{t(`donate.${labelKey}`)}</p>
                  </div>
                </Fragment>
              ))}
            </div>

            {/* Amount selector */}
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/35 mb-2.5">
              {t("donate.choose_amount")}
            </p>
            <div className="flex border border-border overflow-hidden rounded-sm mb-2.5">
              {AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => pickPreset(amount)}
                  className={cn(
                    "flex-1 py-3 text-sm font-bold transition-colors border-r border-border",
                    selected === amount
                      ? "bg-primary text-white"
                      : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  ${amount}
                </button>
              ))}
              {customActive ? (
                <div className="flex-1 flex items-center border-l border-border bg-secondary/50 px-2">
                  <span className="text-sm font-bold text-muted-foreground shrink-0">$</span>
                  <input
                    ref={customRef}
                    type="number"
                    min="1"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent text-sm font-bold text-foreground placeholder:text-muted-foreground/30 focus:outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              ) : (
                <button
                  onClick={activateCustom}
                  className="flex-1 py-3 text-sm font-bold transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {t("donate.other")}
                </button>
              )}
            </div>

            {/* CTA */}
            <button
              disabled={!donationValue}
              onClick={() => {}}
              className={cn(
                "w-full py-3 text-sm font-bold rounded-sm transition-all duration-200 flex items-center justify-center gap-2",
                donationValue
                  ? "bg-primary text-white hover:bg-primary/90 active:scale-[0.99]"
                  : "border border-dashed border-border text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              {donationValue
                ? t("donate.donate_amount", { amount: Number.isInteger(donationValue) ? donationValue : donationValue.toFixed(2) })
                : <><ChevronUp className="w-3.5 h-3.5 animate-pulse" /> {t("donate.pick_amount")}</>
              }
            </button>
          </div>

          {/* ── Divider (desktop) ── */}
          <div className="hidden sm:block w-px bg-border/30 self-stretch mx-0" />

          {/* ── Right: perks + QR (desktop only) ── */}
          <div className="hidden sm:flex flex-col w-[280px] shrink-0 pl-12">

            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/35 mb-5">
              {t("donate.what_you_get")}
            </p>

            <div className="space-y-4 mb-8">
              {PERK_KEYS.map(({ Icon, titleKey, descKey }) => (
                <div key={titleKey} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-primary/70" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{t(`donate.${titleKey}`)}</p>
                    <p className="text-[11px] text-muted-foreground/45 leading-snug mt-0.5">{t(`donate.${descKey}`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/30 pt-6 flex items-center gap-3">
              <div className="bg-white rounded-sm p-2 shrink-0">
                <QrCode className="w-[56px] h-[56px] text-black" strokeWidth={0.75} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-1">{t("donate.prefer_scan")}</p>
                <p className="text-[11px] text-muted-foreground/45 leading-relaxed">
                  {t("donate.scan_desc")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <img
        src={`${import.meta.env.BASE_URL}donate_background.png`}
        alt=""
        aria-hidden
        className="pointer-events-none select-none fixed bottom-0 right-0 h-[340px] sm:h-[420px] object-contain object-bottom z-10"
      />

    </div>
  )
}

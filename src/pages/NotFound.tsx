import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden relative">

      {/* 404 + chibi — desktop only */}
      <div aria-hidden className="pointer-events-none select-none hidden sm:flex absolute inset-0 flex-col items-center justify-center -translate-y-16">
        <img src={`${import.meta.env.BASE_URL}404_lost_chibi_without_text.png`} alt="" className="h-[clamp(130px,14vw,190px)] object-contain opacity-80" />
        <span className="text-[clamp(72px,12vw,140px)] font-black leading-none text-foreground/[0.06] tracking-tighter -mt-2">
          404
        </span>
      </div>

      {/* Status bar */}
      <div className="shrink-0 h-12 flex items-center px-6 sm:px-12 gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
          {t("not_found.error_label")}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center sm:items-end px-6 sm:px-12 pb-0 sm:pb-16">
        <div className="max-w-sm w-full">

          {/* Chibi — mobile only */}
          <div className="flex justify-center mb-6 sm:hidden">
            <img src={`${import.meta.env.BASE_URL}404_lost_chibi_without_text.png`} alt="" aria-hidden className="h-[160px] object-contain" />
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-4">Animely</p>

          <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] font-black leading-[1.0] tracking-tight mb-4">
            {t("not_found.title")}
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-[280px]">
            {t("not_found.body")}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-foreground text-background hover:bg-foreground/85 active:scale-[0.98] transition-all rounded-sm"
            >
              <Home className="w-3.5 h-3.5" />
              {t("not_found.go_home")}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("not_found.go_back")}
            </button>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="shrink-0 h-12 flex items-center px-6 sm:px-12 border-t border-border/20">
        <span className="text-[10px] text-muted-foreground/25 font-mono">animely.app / 404</span>
      </div>

    </div>
  )
}

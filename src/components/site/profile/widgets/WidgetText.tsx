import { memo } from "react"
import { useTranslation } from "react-i18next"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {}

function WidgetTextComponent(context: Props) {
  const { t } = useTranslation()

  return (
    <Widget
      id="text"
      title={t("profile.rating_criteria")}
      {...context}
      action={
        <button className="text-[10px] font-[600] text-white/30 hover:text-white/70 transition-colors">
          Editar
        </button>
      }
    >
      <div className="scrollbar-hide flex-1 overflow-y-auto p-3 text-[13px] leading-[1.7] text-white/70">
        <strong className="mb-1.5 block text-[12px] text-white/85">Como avalio:</strong>
        10 — obra-prima que muda perspectiva<br />
        9 — excepcionais, poucas falhas<br />
        8 — muito boas, recomendo fortemente<br />
        7 — boas, valem o tempo<br />
        6 — medianas, abaixo da expectativa<br />
        ≤5 — não recomendo
      </div>
    </Widget>
  )
}

export const WidgetText = memo(WidgetTextComponent)

import { memo, useEffect, useState } from "react"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  timeZone: string
}

function pad(n: number) { return String(n).padStart(2, "0") }

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

function getTimeParts() {
  const now = new Date()
  return {
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    date: `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`,
  }
}

function WidgetClockComponent({ ...context }: Props) {
  const [{ time, date }, setTime] = useState(getTimeParts)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeParts()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <Widget id="clock" {...context}>
      <div className="flex h-full flex-col items-center justify-center gap-1 p-3">
        <div className="font-mono text-[26px] font-[800] tracking-tight" style={{ letterSpacing: "-1px" }}>
          {time}
        </div>
        <div className="text-center text-[11px] text-white/40">{date}</div>
        <div className="font-mono text-[10px] text-white/25">{context.timeZone}</div>
      </div>
    </Widget>
  )
}

export const WidgetClock = memo(WidgetClockComponent)

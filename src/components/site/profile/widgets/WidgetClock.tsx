import { memo, useEffect, useState } from "react"
import { Widget } from "./Widget"
import type { WidgetContextValue } from "./Widget"

interface Props extends WidgetContextValue {
  timeZone: string
  location?: string
}

const R_H = 76
const R_M = 60
const R_S = 44
const C_H = 2 * Math.PI * R_H
const C_M = 2 * Math.PI * R_M
const C_S = 2 * Math.PI * R_S

interface TimeParts {
  time: string
  date: string
  hours: number
  minutes: number
  seconds: number
  utcOffset: string
}

function getTimeParts(timeZone: string): TimeParts {
  const now = new Date()
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
      weekday: "short", day: "numeric", month: "short",
      timeZone,
    }).formatToParts(now)

    const offsetParts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(now)

    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
    const rawH = parseInt(get("hour"))
    const m    = parseInt(get("minute"))
    const s    = parseInt(get("second"))
    const h    = rawH === 24 ? 0 : rawH

    return {
      time:      `${String(isNaN(h) ? 0 : h).padStart(2, "0")}:${String(isNaN(m) ? 0 : m).padStart(2, "0")}`,
      date:      `${get("weekday")}, ${get("day")} ${get("month")}`,
      hours:     isNaN(h) ? 0 : h,
      minutes:   isNaN(m) ? 0 : m,
      seconds:   isNaN(s) ? 0 : s,
      utcOffset: offsetParts.find((p) => p.type === "timeZoneName")?.value ?? "",
    }
  } catch {
    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds()
    return {
      time:      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      date:      now.toDateString(),
      hours: h, minutes: m, seconds: s,
      utcOffset: "",
    }
  }
}

interface WeatherData { temp: number; code: number; isDay: boolean }

function wxInfo(code: number, isDay: boolean): { label: string; color: string } {
  if (code === 0)  return { label: "Clear",   color: isDay ? "#fbbf24" : "#818cf8" }
  if (code <= 3)   return { label: "Cloudy",  color: "#94a3b8" }
  if (code <= 48)  return { label: "Foggy",   color: "#94a3b8" }
  if (code <= 55)  return { label: "Drizzle", color: "#60a5fa" }
  if (code <= 65)  return { label: "Rain",    color: "#3b82f6" }
  if (code <= 75)  return { label: "Snow",    color: "#e2e8f0" }
  if (code <= 82)  return { label: "Showers", color: "#60a5fa" }
  return                  { label: "Storm",   color: "#a78bfa" }
}

function useWeather(city: string | undefined) {
  const [data, setData] = useState<WeatherData | null>(null)

  useEffect(() => {
    if (!city) return
    let cancelled = false

    async function load() {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        )
        const geo = await geoRes.json()
        if (cancelled || !geo.results?.[0]) return

        const { latitude, longitude } = geo.results[0]
        const wxRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`
        )
        const wx = await wxRes.json()
        if (cancelled) return

        const cw = wx.current_weather
        setData({ temp: Math.round(cw.temperature), code: cw.weathercode, isDay: cw.is_day === 1 })
      } catch { /* fail silently */ }
    }

    load()
    const id = setInterval(load, 30 * 60 * 1000)
    return () => { cancelled = true; clearInterval(id) }
  }, [city])

  return data
}

function WidgetClockComponent({ timeZone, location, ...context }: Props) {
  const [{ time, date, hours, minutes, seconds, utcOffset }, setState] = useState(
    () => getTimeParts(timeZone)
  )

  useEffect(() => {
    const id = setInterval(() => setState(getTimeParts(timeZone)), 1000)
    return () => clearInterval(id)
  }, [timeZone])

  const city    = location?.split("/")?.[0]?.trim() ?? timeZone.split("/")[1]?.replace(/_/g, " ") ?? timeZone
  const tzLabel = timeZone.replace(/_/g, " ")

  const weather = useWeather(city)
  const wx      = weather ? wxInfo(weather.code, weather.isDay) : null

  const offsetH = C_H * (1 - (hours + minutes / 60) / 24)
  const offsetM = C_M * (1 - (minutes + seconds / 60) / 60)
  const offsetS = C_S * (1 - seconds / 60)

  return (
    <Widget id="clock" {...context}>
      <div className="flex h-full flex-col items-center justify-center gap-[12px] px-4 py-5">

        {/* Concentric rings */}
        <div className="relative h-[180px] w-[180px] shrink-0">
          <svg
            style={{ overflow: "visible" }}
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 180 180"
            width="180"
            height="180"
          >
            <defs>
              <filter id="ck-glow-h" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="ck-glow-m" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="ck-glow-s" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <circle cx="90" cy="90" r={R_H} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <circle cx="90" cy="90" r={R_M} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <circle cx="90" cy="90" r={R_S} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />

            <circle cx="90" cy="90" r={R_H} fill="none" stroke="rgba(139,92,246,0.85)" strokeWidth="5"
              strokeLinecap="butt" strokeDasharray={C_H} strokeDashoffset={offsetH}
              filter="url(#ck-glow-h)" style={{ transition: "stroke-dashoffset 0.95s linear" }} />

            <circle cx="90" cy="90" r={R_M} fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="5"
              strokeLinecap="butt" strokeDasharray={C_M} strokeDashoffset={offsetM}
              filter="url(#ck-glow-m)" style={{ transition: "stroke-dashoffset 0.95s linear" }} />

            <circle cx="90" cy="90" r={R_S} fill="none" stroke="rgba(244,63,94,0.9)" strokeWidth="5"
              strokeLinecap="butt" strokeDasharray={C_S} strokeDashoffset={offsetS}
              filter="url(#ck-glow-s)" style={{ transition: "stroke-dashoffset 0.95s linear" }} />
          </svg>

          {/* Center display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-mono text-[28px] font-[800] leading-none tracking-[0.04em] text-white/[0.88]">
              {time}
            </div>
            <div className="mt-[6px] font-mono text-[13px] text-white/[0.22]">
              :{String(seconds).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="flex w-full flex-col items-center gap-[7px]">

          {/* H / M / S legend */}
          <div className="flex items-center gap-[14px]">
            {([
              { label: "H", color: "rgba(139,92,246,0.9)"  },
              { label: "M", color: "rgba(56,189,248,0.85)" },
              { label: "S", color: "rgba(244,63,94,0.9)"   },
            ] as const).map(({ label, color }) => (
              <span key={label} className="flex items-center gap-[6px]">
                <span className="inline-block h-[7px] w-[7px] rounded-full" style={{ background: color }} />
                <span className="font-mono text-[11px] text-white/[0.32]">{label}</span>
              </span>
            ))}
          </div>

          {/* Date */}
          <div className="text-[12px] text-white/[0.36]">{date}</div>

          {/* City · UTC offset */}
          <div className="flex items-center gap-[6px]">
            <span className="text-[12px] font-[600] text-white/[0.5]">{city}</span>
            {utcOffset && (
              <>
                <span className="text-white/[0.18]">·</span>
                <span className="font-mono text-[11px] text-white/[0.28]">{utcOffset}</span>
              </>
            )}
          </div>

          {/* Timezone label */}
          <div className="font-mono text-[10px] tracking-[0.04em] text-white/[0.16]">{tzLabel}</div>

          {/* Weather pill */}
          {wx && weather && (
            <div className="mt-[2px] flex items-center gap-[8px] rounded-[5px] border border-white/[0.06] bg-white/[0.03] px-[12px] py-[6px]">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: wx.color }} />
              <span className="text-[11px] text-white/[0.42]">{wx.label}</span>
              <span className="font-mono text-[13px] font-[700]" style={{ color: wx.color }}>
                {weather.temp}°C
              </span>
            </div>
          )}
        </div>
      </div>
    </Widget>
  )
}

export const WidgetClock = memo(WidgetClockComponent)

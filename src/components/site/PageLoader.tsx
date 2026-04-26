import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

function RouteLoaderOverlay({ renderKey }: { renderKey: number }) {
  return (
    <div
      key={renderKey}
      className="fixed font-mono inset-0 z-[9999] bg-background flex items-center justify-center pointer-events-none animate-loader-fade"
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-[56px] font-extrabold leading-none tracking-tight select-none">
          <span className="text-primary">A</span>
          <span className="text-foreground/70">nimely</span>
        </p>
        <div className="w-full h-px bg-border overflow-hidden">
          <div className="h-full bg-primary origin-left animate-loader-progress" />
        </div>
      </div>
    </div>
  )
}

interface PageLoaderProps {
  show?: boolean
}

export function PageLoader({ show }: PageLoaderProps) {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const [renderKey, setRenderKey] = useState(0)
  const [routeVisible, setRouteVisible] = useState(false)

  // Controlled mode: stays visible while show=true, fades out when show=false
  const [controlledMounted, setControlledMounted] = useState(!!show)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (show) {
      setControlledMounted(true)
      setFadingOut(false)
    } else if (controlledMounted) {
      setFadingOut(true)
      const t = setTimeout(() => {
        setControlledMounted(false)
        setFadingOut(false)
      }, 350)
      return () => clearTimeout(t)
    }
  }, [show])

  // Route transition loader
  useEffect(() => {
    if (location.pathname === prevPath.current) return
    prevPath.current = location.pathname
    window.scrollTo(0, 0)
    setRenderKey((k) => k + 1)
    setRouteVisible(true)
    const t = setTimeout(() => setRouteVisible(false), 700)
    return () => clearTimeout(t)
  }, [location.pathname])

  if (controlledMounted) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-[9999] bg-background flex items-center justify-center pointer-events-none transition-opacity duration-300",
          fadingOut ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-[56px] font-extrabold leading-none tracking-tight select-none">
            <span className="text-primary">K</span>
            <span className="text-foreground/70">urosaw</span>
          </p>
          <div className="w-full h-px bg-border overflow-hidden">
            <div className="h-full w-1/3 bg-primary animate-loader-indeterminate" />
          </div>
        </div>
      </div>
    )
  }

  if (!routeVisible) return null
  return <RouteLoaderOverlay renderKey={renderKey} />
}

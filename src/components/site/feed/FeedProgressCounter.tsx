interface FeedProgressCounterProps {
  current: number
  total: number
}

export function FeedProgressCounter({ current, total }: FeedProgressCounterProps) {
  return (
    <div className="absolute top-4 right-4 z-[20] font-mono text-[10px] text-white/30 tracking-[0.1em] tabular-nums pointer-events-none">
      {current} / {total}
    </div>
  )
}

interface FlagIconProps {
  country: "us" | "br" | "es"
  className?: string
}

const SIZES = { w: 20, h: 15 }

function USFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" className={className}>
      <rect width="20" height="15" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map(y => (
        <rect key={y} x="0" y={y} width="20" height="1" fill="#b22234" />
      ))}
      <rect width="9" height="8" fill="#3c3b6e" />
      {[0, 1, 2, 3, 4].map(row =>
        [0, 1, 2, 3, 4].map(col => (
          <circle
            key={`${row}-${col}`}
            cx={1 + col * 1.8}
            cy={0.8 + row * 1.6}
            r="0.4"
            fill="#fff"
          />
        ))
      )}
    </svg>
  )
}

function BRFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" className={className}>
      <rect width="20" height="15" fill="#009739" />
      <polygon points="10,1 18,7.5 10,14 2,7.5" fill="#ffcc29" />
      <circle cx="10" cy="7.5" r="3.5" fill="#002776" />
    </svg>
  )
}

function ESFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" className={className}>
      <rect width="20" height="15" fill="#c60b1e" />
      <rect y="4" width="20" height="7" fill="#ffc400" />
    </svg>
  )
}

export function FlagIcon({ country, className }: FlagIconProps) {
  const props = { className }
  switch (country) {
    case "us": return <USFlag {...props} />
    case "br": return <BRFlag {...props} />
    case "es": return <ESFlag {...props} />
  }
}

export const FLAG_MAP = { en: "us", pt: "br", es: "es" } as const

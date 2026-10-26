import { useEffect, useState } from 'react'
import './StatusDots.css'

type Health = {
  api: string
  db: string
}

type Status = 'pending' | 'ok' | 'ko'

const STATUS_TEXT: Record<Status, string> = {
  pending: 'verifica in corso',
  ok: 'ok',
  ko: 'non raggiungibile',
}

export function StatusDots() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<Health>
      })
      .then(setHealth)
      .catch(() => setError(true))
  }, [])

  const apiStatus: Status = error ? 'ko' : health ? 'ok' : 'pending'
  let dbStatus: Status = 'pending'
  if (health) dbStatus = health.db === 'ok' ? 'ok' : 'ko'

  const dots: { label: string; status: Status }[] = [
    { label: 'App', status: 'ok' },
    { label: 'API', status: apiStatus },
    { label: 'Database', status: dbStatus },
  ]

  return (
    <div className="status-dots">
      {dots.map((dot) => {
        const text = `${dot.label}: ${STATUS_TEXT[dot.status]}`
        return (
          <span
            key={dot.label}
            className={`status-dots__dot status-dots__dot--${dot.status}`}
            role="img"
            aria-label={text}
            title={text}
          />
        )
      })}
    </div>
  )
}

import { Suspense } from 'react'
import type { Metadata } from 'next'
import GenerateDashboard from './GenerateDashboard'

export const metadata: Metadata = { title: 'Generating Story' }

function LoadingShell() {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[240, 1, 280].map((w, i) => (
          <div
            key={i}
            className="na-card"
            style={{ flex: i === 1 ? 1 : `0 0 ${w}px`, minHeight: 340, animation: 'na-pulse 1.4s ease-in-out infinite' }}
          />
        ))}
      </div>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <GenerateDashboard />
    </Suspense>
  )
}

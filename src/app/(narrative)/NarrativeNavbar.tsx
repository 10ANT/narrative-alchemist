'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function NarrativeNavbar() {
  const path = usePathname()
  const isHome = path === '/'

  return (
    <nav className="na-navbar">
      <Link href="/" className="na-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
        <Image src="/logo.png" alt="Narrative Alchemist" width={32} height={32} style={{ borderRadius: '6px', objectFit: 'contain' }} priority />
        <span className="na-gradient-text" style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>Narrative Alchemist</span>
      </Link>

      <div className="na-nav-links">
        <Link href="/library">Library</Link>
        <Link href="/#how-it-works">How It Works</Link>
        {!isHome && (
          <Link href="/" className="na-nav-cta">
            New Story
          </Link>
        )}
      </div>
    </nav>
  )
}

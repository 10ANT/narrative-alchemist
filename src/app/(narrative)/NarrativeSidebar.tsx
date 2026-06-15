'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useNarrativeTheme } from '@/context/NarrativeTheme'
import type { StoryBundle } from '@/types/story'

export default function NarrativeSidebar() {
  const path = usePathname()
  const { theme, toggle } = useNarrativeTheme()
  const [recent, setRecent] = useState<StoryBundle[]>([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    fetch('/api/story')
      .then(r => r.json())
      .then((s: StoryBundle[]) => setRecent(s.filter(x => x.status === 'done').slice(0, 5)))
      .catch(() => {})
  }, [path])

  return (
    <aside className={`na-sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo block */}
      <div className="na-sidebar-header">
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', width: '100%' }}>
          <Image
            src="/logo.png"
            alt="Narrative Alchemist"
            width={collapsed ? 32 : 44}
            height={collapsed ? 32 : 44}
            style={{ borderRadius: '8px', objectFit: 'contain' }}
          />
          {!collapsed && (
            <span style={{ color: 'var(--na-text)', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.01em', textAlign: 'center', lineHeight: 1.2 }}>
              Narrative Alchemist
            </span>
          )}
        </Link>
        <button
          className="na-sidebar-collapse-btn"
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expand' : 'Collapse'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><polygon points="2,1 9,5 2,9"/></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><polygon points="8,1 1,5 8,9"/></svg>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="na-sidebar-nav">
        <Link
          href="/"
          className={`na-sidebar-link${path === '/' ? ' active' : ''}`}
          title={collapsed ? 'New Story' : undefined}
        >
          <span className="na-sidebar-link-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </span>
          {!collapsed && <span>New Story</span>}
        </Link>
        <Link
          href="/library"
          className={`na-sidebar-link${path === '/library' ? ' active' : ''}`}
          title={collapsed ? 'Library' : undefined}
        >
          <span className="na-sidebar-link-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </span>
          {!collapsed && <span>Library</span>}
        </Link>
      </nav>

      {/* Recent stories */}
      {!collapsed && recent.length > 0 && (
        <div className="na-sidebar-section">
          <p className="na-sidebar-section-label">Recent Stories</p>
          {recent.map(s => (
            <Link
              key={s.id}
              href={`/story/${s.id}`}
              className={`na-sidebar-recent${path === `/story/${s.id}` ? ' active' : ''}`}
              title={s.title}
            >
              <span className="na-sidebar-recent-dot" />
              <span>{s.title.length > 20 ? s.title.slice(0, 20) + '…' : s.title}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Theme toggle */}
      <div className="na-sidebar-footer">
        <button className="na-sidebar-theme-btn" onClick={toggle} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
          {theme === 'dark' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
          {!collapsed && (
            <span style={{ fontSize: '0.75rem' }}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          )}
        </button>
      </div>
    </aside>
  )
}

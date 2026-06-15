'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { StoryBundle, StoryTone } from '@/types/story'

const TONE_OPTIONS: (StoryTone | 'All')[] = ['All', 'Epic', 'Whimsical', 'Thriller', 'Educational']
const REGION_OPTIONS = ['All', 'Caribbean', 'Africa', 'Global', 'South America', 'Southeast Asia', 'Custom']

export default function LibraryPage() {
  const [stories, setStories] = useState<StoryBundle[]>([])
  const [toneFilter, setToneFilter] = useState<StoryTone | 'All'>('All')
  const [regionFilter, setRegionFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = () =>
      fetch('/api/story')
        .then(r => r.json())
        .then((data: StoryBundle[]) => { setStories(data); setLoading(false) })
        .catch(() => setLoading(false))
    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  const filtered = stories.filter(s => {
    if (toneFilter !== 'All' && s.tone !== toneFilter) return false
    if (regionFilter !== 'All' && s.region !== regionFilter) return false
    return true
  })

  const ready = filtered.filter(s => s.status === 'done')
  const inProgress = filtered.filter(s => s.status !== 'done' && s.status !== 'error')

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--na-text)', margin: 0, letterSpacing: '-0.02em' }}>
            Story Library
          </h1>
          <p style={{ color: 'var(--na-muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
            {ready.length} {ready.length === 1 ? 'story' : 'stories'} ready to play
          </p>
        </div>
        <Link href="/" className="na-btn-primary" style={{ textDecoration: 'none' }}>
          Create New Story
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label className="na-label" style={{ marginBottom: '0.35rem' }}>Tone</label>
          <div className="na-pill-group">
            {TONE_OPTIONS.map(t => (
              <button
                key={t}
                type="button"
                className={`na-pill ${toneFilter === t ? 'active' : ''}`}
                onClick={() => setToneFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="na-label" style={{ marginBottom: '0.35rem' }}>Region</label>
          <select
            className="na-select"
            style={{ minWidth: 160 }}
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
          >
            {REGION_OPTIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* In-progress */}
      {inProgress.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <p className="na-section-label">Generating</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {inProgress.map(s => (
              <Link key={s.id} href={`/generate?id=${s.id}`} style={{ textDecoration: 'none' }}>
                <div className="na-card na-card-hover" style={{ padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className={`na-status-badge ${s.status}`}>{s.status}</span>
                  <span style={{ flex: 1, fontSize: '0.88rem', fontWeight: 600, color: 'var(--na-text)' }}>
                    {s.title === 'Generating...' ? s.prompt.slice(0, 60) + '…' : s.title}
                  </span>
                  <div className="na-progress" style={{ width: 120, flexShrink: 0 }}>
                    <div className="na-progress-fill" style={{ width: `${s.progress}%` }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--na-muted)', flexShrink: 0 }}>
                    {s.progress}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Ready stories grid */}
      {loading ? (
        <div className="na-empty">Loading stories...</div>
      ) : ready.length === 0 ? (
        <div className="na-empty">
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.3 }}>&#9670;</div>
          <p>No stories match your filters.</p>
          <Link href="/" className="na-btn-primary" style={{ marginTop: '1rem', display: 'inline-flex', textDecoration: 'none' }}>
            Create your first story
          </Link>
        </div>
      ) : (
        <div className="na-story-grid">
          {ready.map(s => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>
      )}
    </div>
  )
}

function StoryCard({ story }: { story: StoryBundle }) {
  return (
    <div className="na-story-card">
      {story.coverImageUrl ? (
        <Image
          src={story.coverImageUrl}
          alt={story.title}
          width={420}
          height={236}
          className="na-story-cover"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <div className="na-story-cover-placeholder">&#9670;</div>
      )}
      <div className="na-story-body">
        <div className="na-story-title">{story.title}</div>
        <div style={{ marginBottom: '0.5rem' }}>
          <span className="na-tag tone">{story.tone}</span>
          <span className="na-tag region">{story.region}</span>
          <span className="na-tag length">{story.length}</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--na-muted)', lineHeight: 1.55, marginBottom: '0.75rem' }}>
          {story.prompt.length > 90 ? story.prompt.slice(0, 90) + '…' : story.prompt}
        </p>
        <div className="na-story-actions">
          <Link
            href={`/story/${story.id}`}
            className="na-btn-primary"
            style={{ flex: 1, justifyContent: 'center', padding: '0.55rem 0.75rem', fontSize: '0.85rem', textDecoration: 'none' }}
          >
            Play
          </Link>
          <a
            href={`/stories/${story.id}.json`}
            download
            className="na-btn-secondary"
            style={{ fontSize: '0.78rem', padding: '0.55rem 0.75rem', textDecoration: 'none' }}
          >
            JSON
          </a>
        </div>
      </div>
    </div>
  )
}

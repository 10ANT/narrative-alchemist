'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { StoryBundle, AgentStatus } from '@/types/story'
import Image from 'next/image'

const AGENT_META = [
  { key: 'plot',  label: 'PlotAgent',  icon: '&#9998;',  desc: 'Querying Foundry IQ + crafting story outline' },
  { key: 'world', label: 'WorldAgent', icon: '&#127758;', desc: 'Expanding scenes with narrative text' },
  { key: 'media', label: 'MediaAgent', icon: '&#9673;',   desc: 'Generating scene illustrations with GPT Image 2' },
  { key: 'code',  label: 'CodeAgent',  icon: '&#128195;', desc: 'Packaging final StoryBundle' },
] as const

function StatusBadge({ status }: { status: AgentStatus }) {
  return <span className={`na-step-badge ${status}`}>{status}</span>
}

export default function GenerateDashboard() {
  const params = useSearchParams()
  const router = useRouter()
  const id = params.get('id')
  const [story, setStory] = useState<StoryBundle | null>(null)
  const [allStories, setAllStories] = useState<StoryBundle[]>([])
  const esRef = useRef<EventSource | null>(null)

  useEffect(() => {
    fetch('/api/story').then(r => r.json()).then(setAllStories).catch(() => {})
  }, [])

  useEffect(() => {
    if (!id) return

    esRef.current?.close()
    const es = new EventSource(`/api/story/stream/${id}`)
    esRef.current = es

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as StoryBundle
        setStory(data)
        setAllStories(prev => {
          const idx = prev.findIndex(s => s.id === data.id)
          if (idx >= 0) {
            const updated = [...prev]
            updated[idx] = data
            return updated
          }
          return [data, ...prev]
        })
        if (data.status === 'done' || data.status === 'error') {
          es.close()
        }
      } catch {}
    }

    es.onerror = () => { es.close() }

    return () => { es.close() }
  }, [id])

  const images = (story?.scenes ?? []).filter(s => s.imageUrl).map(s => s.imageUrl!)

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" className="na-btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          &#8592; New Story
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left — Job list */}
        <div>
          <p className="na-section-label">Your stories</p>
          {allStories.length === 0 && (
            <p style={{ fontSize: '0.82rem', color: 'var(--na-muted)' }}>No stories yet</p>
          )}
          {allStories.map(s => (
            <Link
              key={s.id}
              href={`/generate?id=${s.id}`}
              className={`na-job-item ${s.id === id ? 'active' : ''}`}
              style={{ display: 'flex', textDecoration: 'none' }}
            >
              <div className="na-job-title">{s.title === 'Generating...' ? s.prompt.slice(0, 30) + '…' : s.title}</div>
              <span className={`na-status-badge ${s.status}`}>{s.status}</span>
            </Link>
          ))}
        </div>

        {/* Center — Agent pipeline */}
        <div>
          <p className="na-section-label">Agent pipeline</p>
          {!story ? (
            <div className="na-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--na-muted)' }}>
              {id ? 'Connecting...' : 'Select or create a story'}
            </div>
          ) : (
            <div className="na-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{story.title}</span>
                <span className={`na-status-badge ${story.status}`}>{story.status}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--na-muted)', marginBottom: '1.25rem' }}>
                {story.prompt.length > 80 ? story.prompt.slice(0, 80) + '…' : story.prompt}
              </p>

              {/* Progress bar */}
              <div className="na-progress" style={{ marginBottom: '1.5rem' }}>
                <div className="na-progress-fill" style={{ width: `${story.progress}%` }} />
              </div>

              {/* Agent steps */}
              <div className="na-agent-steps">
                {AGENT_META.map(agent => {
                  const status: AgentStatus = story.agents[agent.key]
                  return (
                    <div key={agent.key} className={`na-agent-step ${status}`}>
                      <div className="na-step-icon" dangerouslySetInnerHTML={{ __html: agent.icon }} />
                      <div className="na-step-info">
                        <div className="na-step-name">{agent.label}</div>
                        <div className="na-step-desc">
                          {status === 'running' ? agent.desc : agent.label + ' — ' + agent.desc.split(' ')[0]}
                        </div>
                      </div>
                      <StatusBadge status={status} />
                    </div>
                  )
                })}
              </div>

              {story.status === 'done' && (
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href={`/story/${story.id}`}
                    className="na-btn-primary"
                    style={{ display: 'inline-flex', textDecoration: 'none', width: '100%', justifyContent: 'center' }}
                  >
                    Open Story Viewer
                  </Link>
                </div>
              )}

              {story.status === 'error' && (
                <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', borderRadius: 8, background: 'rgba(232,85,85,0.08)', border: '1px solid rgba(232,85,85,0.2)', color: '#e85555', fontSize: '0.82rem' }}>
                  {story.error ?? 'An error occurred. Please try again.'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right — Asset preview */}
        <div>
          <p className="na-section-label">Scene assets</p>
          <div className="na-image-gallery">
            {images.length === 0 ? (
              <div className="na-img-placeholder">
                Illustrations appear as MediaAgent runs
              </div>
            ) : (
              images.map((url, i) => (
                <Image
                  key={i}
                  src={url}
                  alt={`Scene ${i + 1}`}
                  width={280}
                  height={158}
                  className="na-scene-thumb"
                  style={{ display: 'block' }}
                />
              ))
            )}
          </div>
          {story && story.status !== 'done' && (
            <p style={{ fontSize: '0.75rem', color: 'var(--na-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
              Images populate as scenes are generated
            </p>
          )}
          {story?.status === 'done' && (
            <div style={{ marginTop: '1rem' }}>
              <a
                href={`/stories/${story.id}.json`}
                download
                className="na-btn-ghost"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '0.5rem' }}
              >
                Download bundle (.json)
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

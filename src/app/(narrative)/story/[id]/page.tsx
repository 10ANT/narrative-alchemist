'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { StoryBundle, Scene } from '@/types/story'

export default function StoryViewerPage() {
  const { id } = useParams<{ id: string }>()
  const [story, setStory] = useState<StoryBundle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentSceneId, setCurrentSceneId] = useState<string | null>(null)
  const [visited, setVisited] = useState<string[]>([])
  const [fading, setFading] = useState(false)
  const [flipKey, setFlipKey] = useState(0)
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/story/${id}`)
      .then(r => r.json())
      .then((data: StoryBundle) => {
        setStory(data)
        setCurrentSceneId(data.scenes[0]?.id ?? null)
        setVisited([data.scenes[0]?.id ?? ''])
        setLoading(false)
      })
      .catch(() => { setError('Failed to load story.'); setLoading(false) })
  }, [id])

  const currentScene: Scene | undefined = story?.scenes.find(s => s.id === currentSceneId)

  const navigateTo = useCallback((nextId: string) => {
    setFading(true)
    stopSpeech()
    setTimeout(() => {
      setCurrentSceneId(nextId)
      setVisited(prev => prev.includes(nextId) ? prev : [...prev, nextId])
      setFlipKey(k => k + 1)
      setFading(false)
      setInsightsOpen(false)
    }, 320)
  }, [])

  async function startSpeech() {
    if (!currentScene?.audioScript) return
    stopSpeech()
    setSpeaking(true)
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: currentScene.audioScript }),
      })
      if (!res.ok) throw new Error('TTS failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url) }
      audio.onerror = () => { setSpeaking(false); URL.revokeObjectURL(url) }
      await audio.play()
    } catch {
      setSpeaking(false)
    }
  }

  function stopSpeech() {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setSpeaking(false)
  }

  const sceneIndex = story?.scenes.findIndex(s => s.id === currentSceneId) ?? 0
  const totalScenes = story?.scenes.length ?? 0
  const isEnding = (currentScene?.choices.length ?? 0) === 0

  if (loading) {
    return (
      <div className="na-viewer-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--na-muted)' }}>Loading story...</div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="na-viewer-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--na-muted)' }}>{error || 'Story not found.'}</p>
          <Link href="/" className="na-btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex', textDecoration: 'none' }}>Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="na-viewer-shell">
      {/* Top bar */}
      <div className="na-viewer-topbar">
        <Link href="/generate" className="na-btn-ghost" style={{ textDecoration: 'none', fontSize: '0.82rem' }}>
          &#8592; Back
        </Link>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h2 className="na-viewer-title">{story.title}</h2>
          <div className="na-scene-nav">
            {story.scenes.map((s, i) => (
              <div
                key={s.id}
                className={`na-dot ${s.id === currentSceneId ? 'active' : visited.includes(s.id) ? 'visited' : ''}`}
                onClick={() => visited.includes(s.id) && navigateTo(s.id)}
                title={`Scene ${i + 1}: ${s.title}`}
              />
            ))}
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--na-muted)', textAlign: 'right', minWidth: 80 }}>
          {sceneIndex + 1} / {totalScenes}
        </div>
      </div>

      {/* Split screen body */}
      <div
        className="na-viewer-split"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.3s ease' }}
        key={flipKey}
      >
        {/* Left: image + audio */}
        <div className="na-viewer-left">
          <div className="na-viewer-image-wrap">
            {currentScene?.imageUrl ? (
              <Image
                src={currentScene.imageUrl}
                alt={currentScene.title}
                fill
                className="na-viewer-image"
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            ) : (
              <div className="na-scene-image-placeholder">
                <span style={{ color: 'var(--na-muted)', fontSize: '0.85rem' }}>Illustration</span>
              </div>
            )}
          </div>

          {/* Audio bar */}
          <div className="na-audio-bar">
            <button
              className="na-audio-btn"
              onClick={speaking ? stopSpeech : startSpeech}
              title={speaking ? 'Stop narration' : 'Narrate scene'}
            >
              {speaking ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              )}
            </button>
            <div className="na-audio-wave">
              <div className="na-audio-fill" style={{ width: speaking ? '100%' : '0%', transition: speaking ? 'width 10s linear' : 'width 0.2s' }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--na-muted)', whiteSpace: 'nowrap' }}>
              {speaking ? 'Narrating...' : 'Click to narrate'}
            </span>
          </div>
        </div>

        {/* Right: title + text + choices */}
        <div className="na-viewer-right">
          <div style={{ marginBottom: '0.75rem' }}>
            <span className="na-tag tone" style={{ marginBottom: '0.3rem', display: 'inline-block' }}>{story.tone}</span>
            <h3 className="na-viewer-scene-title">{currentScene?.title}</h3>
          </div>

          <div className="na-card na-viewer-text-card">
            <p className="na-scene-text">{currentScene?.text}</p>
          </div>

          <div className="na-viewer-choices">
            {!isEnding ? (
              <>
                <p className="na-section-label" style={{ marginBottom: '0.5rem' }}>What do you do?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentScene?.choices.map(choice => (
                    <button
                      key={choice.id}
                      className="na-choice-btn"
                      onClick={() => navigateTo(choice.nextSceneId)}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--na-muted)', marginBottom: '1rem' }}>
                  — The End —
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    className="na-btn-secondary"
                    onClick={() => {
                      setVisited([story.scenes[0]?.id ?? ''])
                      navigateTo(story.scenes[0]?.id ?? '')
                    }}
                  >
                    Read Again
                  </button>
                  <Link href="/" className="na-btn-primary" style={{ textDecoration: 'none' }}>
                    New Story
                  </Link>
                </div>
              </div>
            )}
          </div>

          {currentScene && currentScene.facts.length > 0 && (
            <div className="na-insights">
              <div className="na-insights-header" onClick={() => setInsightsOpen(o => !o)}>
                <span>Agent Insights &mdash; Foundry IQ</span>
                <span>{insightsOpen ? '&#8963;' : '&#8964;'}</span>
              </div>
              {insightsOpen && (
                <div className="na-insights-body">
                  <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                    {currentScene.facts.map((f, i) => (
                      <li key={i}>{f.slice(0, 200)}</li>
                    ))}
                  </ul>
                  <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    Retrieved from <strong>Azure AI Search</strong> &mdash; grounded via Foundry IQ.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

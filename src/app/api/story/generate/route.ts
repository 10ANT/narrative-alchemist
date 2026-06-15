import { NextRequest, NextResponse, after } from 'next/server'
import { setStory } from '@/lib/storyStore'
import { runPipeline } from '@/lib/pipeline'
import type { GenerateRequest, StoryBundle } from '@/types/story'

function nanoid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as GenerateRequest

  if (!body.prompt?.trim()) {
    return NextResponse.json({ error: 'prompt is required' }, { status: 400 })
  }

  const id = nanoid()
  const bundle: StoryBundle = {
    id,
    title: 'Generating...',
    prompt: body.prompt.trim(),
    tone: body.tone ?? 'Epic',
    region: body.region ?? 'Caribbean',
    length: body.length ?? 'Short',
    scenes: [],
    status: 'queued',
    agents: { plot: 'pending', world: 'pending', media: 'pending', code: 'pending' },
    progress: 0,
    createdAt: new Date().toISOString(),
  }

  setStory(id, bundle)

  // Run pipeline after response — keeps work alive on Vercel serverless
  after(runPipeline(id).catch(err => console.error('Pipeline uncaught:', err)))

  return NextResponse.json({ id })
}

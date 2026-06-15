import { NextRequest, NextResponse } from 'next/server'
import { getStory } from '@/lib/storyStore'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const story = getStory(id)
  if (!story) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
  return NextResponse.json(story)
}

import { NextResponse } from 'next/server'
import { listStories } from '@/lib/storyStore'

export async function GET() {
  const stories = listStories()
  return NextResponse.json(stories)
}

import { NextRequest } from 'next/server'
import { getStory } from '@/lib/storyStore'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      let closed = false
      function send(data: unknown) {
        if (closed) return
        try { controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`)) } catch {}
      }
      function close() {
        if (closed) return
        closed = true
        try { controller.close() } catch {}
      }

      const interval = setInterval(() => {
        const story = getStory(id)
        if (!story) {
          send({ error: 'not_found' })
          clearInterval(interval)
          close()
          return
        }
        send(story)
        if (story.status === 'done' || story.status === 'error') {
          clearInterval(interval)
          setTimeout(close, 200)
        }
      }, 600)

      req.signal.addEventListener('abort', () => {
        clearInterval(interval)
        close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}

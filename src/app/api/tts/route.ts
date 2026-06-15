import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { text, voice = 'en-US-AriaNeural' } = await req.json()
  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'text required' }, { status: 400 })
  }

  const key = process.env.AZURE_TTS_KEY!
  const region = process.env.AZURE_TTS_REGION ?? 'eastus'
  const ttsUrl = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`

  const ssml = `<speak version='1.0' xml:lang='en-US'>
  <voice xml:lang='en-US' name='${voice}'>
    <prosody rate='0%' pitch='+2%'>${escapeXml(text.slice(0, 2000))}</prosody>
  </voice>
</speak>`

  const res = await fetch(ttsUrl, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
      'User-Agent': 'NarrativeAlchemist',
    },
    body: ssml,
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Azure TTS error:', err)
    return NextResponse.json({ error: 'TTS failed' }, { status: 502 })
  }

  const audio = await res.arrayBuffer()
  return new NextResponse(audio, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

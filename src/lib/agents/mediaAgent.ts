import type { Scene } from '@/types/story'

async function generateImage(imagePrompt: string): Promise<string | undefined> {
  try {
    const endpoint = process.env.AZURE_IMAGE_ENDPOINT!
    const apiKey = process.env.AZURE_IMAGE_API_KEY!

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Image generation error:', errText)
      return undefined
    }

    const data = await res.json()
    const b64 = data?.data?.[0]?.b64_json
    if (!b64) return undefined

    // Return as data URL — works on any platform (no disk required)
    return `data:image/png;base64,${b64}`
  } catch (err) {
    console.error('generateImage error:', err)
    return undefined
  }
}

export async function runMediaAgent(
  scenes: Omit<Scene, 'imageUrl'>[]
): Promise<Scene[]> {
  const withImages = await Promise.all(
    scenes.map(async scene => {
      const imageUrl = await generateImage(scene.imagePrompt)
      return { ...scene, imageUrl }
    })
  )
  return withImages
}

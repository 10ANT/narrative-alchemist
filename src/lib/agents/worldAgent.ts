import type { Scene, StoryTone } from '@/types/story'
import OpenAI from 'openai'

const aoai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION! },
  defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY! },
})

async function expandScene(
  scene: Pick<Scene, 'id' | 'title' | 'choices'>,
  storyTitle: string,
  tone: StoryTone,
  region: string,
  facts: string[]
): Promise<Omit<Scene, 'imageUrl'>> {
  const factsHint = facts.length
    ? `Weave in these real facts naturally: ${facts.slice(0, 3).join('; ')}`
    : ''

  const userPrompt = `Story: "${storyTitle}" | Tone: ${tone} | Setting: ${region}
Scene: "${scene.title}"
${factsHint}

Expand this scene. Respond with JSON only:
{
  "text": "Immersive 180-220 word narrative scene text, second person, present tense",
  "imagePrompt": "Detailed 50-word visual scene description for image generation. Include lighting, mood, characters, environment. ${region} setting.",
  "audioScript": "90-word narration script (natural spoken language, no stage directions)"
}`

  const res = await aoai.chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT!,
    messages: [
      {
        role: 'system',
        content:
          'You are WorldAgent, a cinematic scene writer. Respond only with valid JSON. No markdown.',
      },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.85,
    max_completion_tokens: 800,
  })

  const raw = res.choices[0].message.content ?? '{}'
  const parsed = JSON.parse(raw)

  return {
    id: scene.id,
    title: scene.title,
    text: parsed.text ?? '',
    imagePrompt: parsed.imagePrompt ?? `${scene.title} scene in ${region}`,
    audioScript: parsed.audioScript ?? parsed.text?.slice(0, 200) ?? '',
    choices: scene.choices,
    facts: [],
  }
}

export async function runWorldAgent(
  scenes: Pick<Scene, 'id' | 'title' | 'choices'>[],
  storyTitle: string,
  tone: StoryTone,
  region: string,
  facts: string[]
): Promise<Omit<Scene, 'imageUrl'>[]> {
  const results = await Promise.all(
    scenes.map(scene => expandScene(scene, storyTitle, tone, region, facts))
  )
  if (facts.length && results.length > 0) {
    results[0].facts = facts.slice(0, 3)
  }
  return results
}

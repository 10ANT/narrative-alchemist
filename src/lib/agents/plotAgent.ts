import type { Scene, StoryTone, StoryLength } from '@/types/story'
import OpenAI from 'openai'

const aoai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION! },
  defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY! },
})

const SCENE_COUNTS: Record<StoryLength, number> = { Short: 3, Medium: 5, Long: 8 }

async function queryFoundryIQ(prompt: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${process.env.AZURE_SEARCH_ENDPOINT}/indexes/${process.env.AZURE_SEARCH_INDEX_NAME}/docs/search?api-version=2023-11-01`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_SEARCH_API_KEY!,
        },
        body: JSON.stringify({ search: prompt, top: 5, queryType: 'simple' }),
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.value ?? [])
      .slice(0, 5)
      .map((doc: Record<string, unknown>) => {
        const content = doc['content'] ?? doc['chunk'] ?? doc['text'] ?? ''
        return String(content).slice(0, 300)
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

export type PlotResult = {
  title: string
  scenes: Pick<Scene, 'id' | 'title' | 'choices'>[]
  globalFacts: string[]
}

export async function runPlotAgent(
  prompt: string,
  tone: StoryTone,
  region: string,
  length: StoryLength
): Promise<PlotResult> {
  const sceneCount = SCENE_COUNTS[length]
  const facts = await queryFoundryIQ(prompt)
  const factsText = facts.length
    ? `Ground the story in these verified facts:\n${facts.map((f, i) => `${i + 1}. ${f}`).join('\n')}`
    : ''

  const systemPrompt = `You are PlotAgent, an expert story architect. Create compelling multi-scene narratives.
Always respond with valid JSON only. No markdown, no explanations outside the JSON.`

  const userPrompt = `Create a ${tone.toLowerCase()} story set in ${region} based on this prompt: "${prompt}"

${factsText}

Generate exactly ${sceneCount} scenes. Each scene except the last must have exactly 2 choices.
The last scene has 0 choices (it is the ending).

Respond with this exact JSON structure:
{
  "title": "Story Title",
  "scenes": [
    {
      "id": "scene_1",
      "title": "Scene Title",
      "summary": "One-paragraph scene summary",
      "choices": [
        { "id": "c1", "text": "Choice text (max 8 words)", "nextSceneId": "scene_2" },
        { "id": "c2", "text": "Choice text (max 8 words)", "nextSceneId": "scene_2" }
      ]
    }
  ]
}

Important: choices should both point to the next scene id in sequence (scene_1 choices → scene_2, scene_2 choices → scene_3, etc). Last scene has empty choices array.`

  const response = await aoai.chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT!,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.8,
    max_completion_tokens: 2000,
  })

  const raw = response.choices[0].message.content ?? '{}'
  const parsed = JSON.parse(raw)

  return {
    title: parsed.title ?? 'Untitled Story',
    scenes: (parsed.scenes ?? []).map((s: Record<string, unknown>) => ({
      id: s.id ?? `scene_${Math.random()}`,
      title: s.title ?? 'Untitled Scene',
      choices: s.choices ?? [],
    })),
    globalFacts: facts,
  }
}

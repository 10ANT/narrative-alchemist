import type { StoryBundle } from '@/types/story'
import { getStory, setStory } from '@/lib/storyStore'
import { runPlotAgent } from '@/lib/agents/plotAgent'
import { runWorldAgent } from '@/lib/agents/worldAgent'
import { runMediaAgent } from '@/lib/agents/mediaAgent'
import { runCodeAgent } from '@/lib/agents/codeAgent'

function update(id: string, patch: Partial<StoryBundle>) {
  const current = getStory(id)
  if (!current) return
  setStory(id, { ...current, ...patch })
}

export async function runPipeline(id: string): Promise<void> {
  const bundle = getStory(id)
  if (!bundle) return

  try {
    // --- PlotAgent ---
    update(id, {
      status: 'plot',
      progress: 5,
      agents: { plot: 'running', world: 'pending', media: 'pending', code: 'pending' },
    })

    const plotResult = await runPlotAgent(bundle.prompt, bundle.tone, bundle.region, bundle.length)

    update(id, {
      title: plotResult.title,
      agents: { plot: 'done', world: 'running', media: 'pending', code: 'pending' },
      status: 'world',
      progress: 30,
    })

    // --- WorldAgent ---
    const worldScenes = await runWorldAgent(
      plotResult.scenes,
      plotResult.title,
      bundle.tone,
      bundle.region,
      plotResult.globalFacts
    )

    update(id, {
      agents: { plot: 'done', world: 'done', media: 'running', code: 'pending' },
      status: 'media',
      progress: 55,
    })

    // --- MediaAgent ---
    const mediaScenes = await runMediaAgent(worldScenes)

    update(id, {
      agents: { plot: 'done', world: 'done', media: 'done', code: 'running' },
      status: 'media',
      progress: 88,
    })

    // --- CodeAgent ---
    const currentBundle = getStory(id)!
    await runCodeAgent(currentBundle, mediaScenes)

  } catch (err) {
    console.error('Pipeline error:', err)
    update(id, {
      status: 'error',
      error: err instanceof Error ? err.message : 'Pipeline failed',
      agents: {
        ...(getStory(id)?.agents ?? { plot: 'pending', world: 'pending', media: 'pending', code: 'pending' }),
        code: 'error',
      },
    })
  }
}

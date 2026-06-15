import type { Scene, StoryBundle } from '@/types/story'
import { setStory } from '@/lib/storyStore'

export async function runCodeAgent(bundle: StoryBundle, scenes: Scene[]): Promise<StoryBundle> {
  const coverImageUrl = scenes[0]?.imageUrl

  const finalBundle: StoryBundle = {
    ...bundle,
    scenes,
    coverImageUrl,
    status: 'done',
    progress: 100,
    agents: { plot: 'done', world: 'done', media: 'done', code: 'done' },
  }

  setStory(bundle.id, finalBundle)
  return finalBundle
}

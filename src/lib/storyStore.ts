import type { StoryBundle } from '@/types/story'
import fs from 'fs'
import path from 'path'

declare global {
  // eslint-disable-next-line no-var
  var __storyStore: Map<string, StoryBundle> | undefined
}

const store: Map<string, StoryBundle> = global.__storyStore ?? new Map()
global.__storyStore = store

const STORIES_DIR = path.join(process.cwd(), 'public', 'stories')

function ensureDir() {
  if (!fs.existsSync(STORIES_DIR)) {
    fs.mkdirSync(STORIES_DIR, { recursive: true })
  }
}

export function getStory(id: string): StoryBundle | undefined {
  if (store.has(id)) return store.get(id)
  try {
    const file = path.join(STORIES_DIR, `${id}.json`)
    if (fs.existsSync(file)) {
      const bundle = JSON.parse(fs.readFileSync(file, 'utf-8')) as StoryBundle
      store.set(id, bundle)
      return bundle
    }
  } catch {}
  return undefined
}

export function setStory(id: string, bundle: StoryBundle): void {
  store.set(id, bundle)
  try {
    ensureDir()
    fs.writeFileSync(path.join(STORIES_DIR, `${id}.json`), JSON.stringify(bundle, null, 2))
  } catch {}
}

export function listStories(): StoryBundle[] {
  const inMemory = Array.from(store.values())
  const ids = new Set(inMemory.map(s => s.id))

  try {
    ensureDir()
    const files = fs.readdirSync(STORIES_DIR).filter(f => f.endsWith('.json'))
    for (const file of files) {
      const id = file.replace('.json', '')
      if (!ids.has(id)) {
        try {
          const bundle = JSON.parse(
            fs.readFileSync(path.join(STORIES_DIR, file), 'utf-8')
          ) as StoryBundle
          store.set(id, bundle)
          inMemory.push(bundle)
          ids.add(id)
        } catch {}
      }
    }
  } catch {}

  return Array.from(store.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export type Choice = {
  id: string
  text: string
  nextSceneId: string
}

export type Scene = {
  id: string
  title: string
  text: string
  imagePrompt: string
  imageUrl?: string
  audioScript: string
  choices: Choice[]
  facts: string[]
}

export type AgentStatus = 'pending' | 'running' | 'done' | 'error'

export type AgentStates = {
  plot: AgentStatus
  world: AgentStatus
  media: AgentStatus
  code: AgentStatus
}

export type StoryTone = 'Whimsical' | 'Epic' | 'Thriller' | 'Educational'
export type StoryLength = 'Short' | 'Medium' | 'Long'
export type StoryStatus = 'queued' | 'plot' | 'world' | 'media' | 'done' | 'error'

export type StoryBundle = {
  id: string
  title: string
  prompt: string
  tone: StoryTone
  region: string
  length: StoryLength
  coverImageUrl?: string
  scenes: Scene[]
  status: StoryStatus
  agents: AgentStates
  progress: number
  error?: string
  createdAt: string
}

export type GenerateRequest = {
  prompt: string
  tone: StoryTone
  region: string
  length: StoryLength
}

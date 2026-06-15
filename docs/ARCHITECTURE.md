# Narrative Alchemist — System Architecture

> This document describes the full system architecture for **Narrative Alchemist**.  
> The Mermaid diagrams below can be rendered at [mermaid.live](https://mermaid.live) or imported into Archi / ArchiMate tools.

---

## 1. High-Level System Overview

```mermaid
graph LR
    subgraph Client["Browser Client"]
        HP[Home Page\nPrompt Form]
        GD[Generate Dashboard\nSSE Live View]
        SV[Story Viewer\nVisual Novel]
        LIB[Library\nStory Grid]
    end

    subgraph NextJS["Next.js 16 App Server (localhost:3000)"]
        direction TB
        GEN[POST /api/story/generate]
        STREAM[GET /api/story/stream/:id\nSSE]
        STORYAPI[GET /api/story/:id]
        TTS_API[POST /api/tts]
        PIPE[pipeline.ts\nOrchestrator]
        STORE[(StoryStore\nIn-Memory Map)]
        DISK[(public/stories/*.json\nDisk Persistence)]
        IMGS[(public/generated-images/\nLocal PNG files)]
    end

    subgraph Azure["Microsoft Azure Services"]
        AOAI[Azure OpenAI\nGPT-5.4\ncalendar-climate-foundry]
        IMG2[GPT Image 2\ngpt-image-2 deployment]
        AIS[Azure AI Search\ncarib-ai-search\nFoundry IQ Index]
        SPEECH[Azure AI Speech\neastus\nen-US-AriaNeural]
    end

    HP -->|POST prompt + tone + region + length| GEN
    GEN -->|returns {id}| HP
    HP -->|router.push| GD
    GD -->|EventSource| STREAM
    STREAM -->|poll every 600ms| STORE
    GD -->|GET| STORYAPI
    SV -->|GET /api/tts| TTS_API
    LIB -->|GET /api/story| STORYAPI

    GEN --> PIPE
    PIPE --> STORE
    PIPE --> DISK
    PIPE -->|images| IMGS

    TTS_API -->|SSML POST| SPEECH
    SPEECH -->|MP3 audio/mpeg| TTS_API
    TTS_API -->|stream MP3| SV

    PIPE --> AOAI
    PIPE --> IMG2
    PIPE --> AIS
```

---

## 2. Agent Pipeline Flow

```mermaid
sequenceDiagram
    participant User
    participant API as Next.js API
    participant Store as StoryStore
    participant Plot as PlotAgent
    participant AIS as Azure AI Search
    participant AOAI as Azure OpenAI GPT-5.4
    participant World as WorldAgent
    participant Media as MediaAgent
    participant IMG2 as GPT Image 2
    participant Code as CodeAgent
    participant Browser as Browser (SSE)

    User->>API: POST /api/story/generate {prompt, tone, region, length}
    API->>Store: setStory(id, {status: 'queued', progress: 0})
    API-->>User: {id}
    API->>Plot: runPlotAgent() [async, non-blocking]

    Browser->>API: EventSource /api/story/stream/:id
    loop Every 600ms
        API->>Store: getStory(id)
        Store-->>Browser: SSE data: {status, progress, agents, scenes}
    end

    Note over Plot: PlotAgent
    Plot->>AIS: POST /indexes/.../docs/search {search: prompt, top: 5}
    AIS-->>Plot: [{content: "fact1"}, ...]
    Plot->>AOAI: chat.completions.create {system: PlotAgent, max_completion_tokens: 2000}
    AOAI-->>Plot: {title, scenes: [{id, title, choices}], facts}
    Plot->>Store: setStory(id, {status: 'world', progress: 30%, agents.plot: 'done'})

    Note over World: WorldAgent
    World->>AOAI: [parallel] expandScene × N {text, imagePrompt, audioScript}
    AOAI-->>World: {text, imagePrompt, audioScript} per scene
    World->>Store: setStory(id, {status: 'media', progress: 55%})

    Note over Media: MediaAgent
    Media->>IMG2: [parallel] POST /images/generations {prompt, n:1, size:1024x1024} × N
    IMG2-->>Media: {data: [{b64_json: "..."}]} per scene
    Media->>Media: Buffer.from(b64, 'base64') → writeFile(public/generated-images/)
    Media->>Store: setStory(id, {agents.media: 'done', scenes[i].imageUrl: '/generated-images/...'})

    Note over Code: CodeAgent
    Code->>Store: setStory(id, {status: 'done', progress: 100%, agents.code: 'done'})
    Code->>Code: writeFile(public/stories/{id}.json)

    Browser->>API: [SSE detects status=done, closes]
    Browser->>Browser: Show "Open Story Viewer" button
```

---

## 3. Data Model

```mermaid
classDiagram
    class StoryBundle {
        +String id
        +String title
        +String prompt
        +StoryTone tone
        +String region
        +StoryLength length
        +String coverImageUrl
        +Scene[] scenes
        +StoryStatus status
        +AgentStates agents
        +Number progress
        +String error
        +String createdAt
    }

    class Scene {
        +String id
        +String title
        +String text
        +String imagePrompt
        +String imageUrl
        +String audioScript
        +Choice[] choices
        +String[] facts
    }

    class Choice {
        +String id
        +String text
        +String nextSceneId
    }

    class AgentStates {
        +AgentStatus plot
        +AgentStatus world
        +AgentStatus media
        +AgentStatus code
    }

    StoryBundle "1" --> "1" AgentStates
    StoryBundle "1" --> "3..8" Scene
    Scene "1" --> "0..2" Choice
```

---

## 4. Azure Service Map

```mermaid
graph TD
    subgraph Foundry["Azure AI Foundry Resource\ncarib-climate-foundry-resource.cognitiveservices.azure.com"]
        GPT54[GPT-5.4\nDeployment\nChat Completions]
        GPTI2[gpt-image-2\nDeployment\nImage Generation]
    end

    subgraph Search["Azure AI Search\ncarib-ai-search.search.windows.net"]
        IDX[carib-climate-blob-ks-index\nFoundry IQ Knowledge Index]
        BLOB[caribclimatestrorage\nSource Documents]
    end

    subgraph Speech["Azure AI Speech\neastus.tts.speech.microsoft.com"]
        ARIA[en-US-AriaNeural\nNeural TTS Voice]
    end

    PlotAgent -->|"search: user prompt\ntop: 5 docs"| IDX
    PlotAgent -->|"system: PlotAgent\nmax_completion_tokens: 2000"| GPT54
    WorldAgent -->|"system: WorldAgent\nmax_completion_tokens: 800\n× N scenes parallel"| GPT54
    MediaAgent -->|"prompt: imagePrompt\nn: 1, size: 1024x1024"| GPTI2
    TTSRoute -->|"SSML: audioScript\nX-Microsoft-OutputFormat: audio-16khz-128kbitrate-mono-mp3"| ARIA

    BLOB -.->|indexed into| IDX
```

---

## 5. Frontend Route Map

```mermaid
graph LR
    ROOT["/\nHome — Prompt Form"]
    GEN["/generate?id=:id\nAgent Pipeline Dashboard"]
    VIEWER["/story/:id\nVisual Novel Viewer"]
    LIB["/library\nStory Library"]

    ROOT -->|POST /api/story/generate → redirect| GEN
    GEN -->|status=done → click| VIEWER
    LIB -->|Play button| VIEWER
    VIEWER -->|New Story button| ROOT
    VIEWER -->|Back button| GEN

    subgraph API["API Routes"]
        A1["POST /api/story/generate"]
        A2["GET /api/story/stream/:id (SSE)"]
        A3["GET /api/story/:id"]
        A4["GET /api/story"]
        A5["POST /api/tts"]
    end
```

---

## Architecture Notes for Archi / ArchiMate

When rendering this in ArchiMate / Archi, use the following layer mapping:

| Mermaid Node | ArchiMate Layer | Element Type |
|:-------------|:----------------|:-------------|
| Browser Client | Application Layer | Application Component |
| Next.js API Routes | Application Layer | Application Service |
| PlotAgent / WorldAgent / MediaAgent / CodeAgent | Application Layer | Application Function |
| StoryStore (in-memory) | Technology Layer | Artifact |
| public/ (disk) | Technology Layer | Artifact |
| Azure OpenAI GPT-5.4 | Application Layer | Application Service (External) |
| GPT Image 2 | Application Layer | Application Service (External) |
| Azure AI Search | Application Layer | Application Service (External) |
| Azure AI Speech | Application Layer | Application Service (External) |
| Azure AI Foundry | Technology Layer | Node (Cloud) |

**Relationships:**
- `PlotAgent` **uses** `Azure AI Search` (Serving)
- `PlotAgent` **uses** `Azure OpenAI` (Serving)
- `WorldAgent` **uses** `Azure OpenAI` (Serving)
- `MediaAgent` **uses** `GPT Image 2` (Serving)
- `pipeline.ts` **triggers** `PlotAgent → WorldAgent → MediaAgent → CodeAgent` (Triggering)
- `SSE Route` **accesses** `StoryStore` (Access)
- `Browser` **realizes** `User Prompt` (Realization)

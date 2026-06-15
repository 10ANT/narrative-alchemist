import type { Metadata } from 'next'
import '@/assets/scss/narrative.scss'
import { NarrativeThemeProvider } from '@/context/NarrativeTheme'
import NarrativeSidebar from './NarrativeSidebar'

export const metadata: Metadata = {
  title: {
    template: '%s | Narrative Alchemist',
    default: 'Narrative Alchemist — AI Storytelling Agent',
  },
  description:
    'Multi-modal, knowledge-grounded storytelling powered by Azure AI agents. One prompt in — a playable visual novel out.',
}

export default function NarrativeLayout({ children }: { children: React.ReactNode }) {
  return (
    <NarrativeThemeProvider>
      <NarrativeSidebar />
      <div className="na-main">
        <main className="na-content">{children}</main>
        <footer className="na-footer">
          Built with Azure AI Foundry &middot; Azure OpenAI &middot; GPT Image 2 &middot; Azure AI Search &mdash; Microsoft Agents League 2026
        </footer>
      </div>
    </NarrativeThemeProvider>
  )
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AGENT_LIST } from './mock-data';
export interface PromptSnippet {
  id: string;
  title: string;
  content: string;
  category: string;
}
export interface AgentConfig {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  status: 'Online' | 'Idle' | 'Offline';
  description: string;
  enabledTools: string[];
}
interface AgentState {
  isEditing: boolean;
  draftAgent: AgentConfig | null;
  personas: AgentConfig[];
  prompts: PromptSnippet[];
  // Actions
  setIsEditing: (editing: boolean) => void;
  setDraftAgent: (agent: AgentConfig | null) => void;
  updateDraft: (updates: Partial<AgentConfig>) => void;
  savePersona: (agent: AgentConfig) => void;
  deletePersona: (id: string) => void;
  addPrompt: (prompt: PromptSnippet) => void;
  deletePrompt: (id: string) => void;
}
const DEFAULT_PROMPTS: PromptSnippet[] = [
  { id: 'p1', title: 'JSON Formatter', content: 'Always respond in valid JSON format. Do not include markdown blocks.', category: 'Format' },
  { id: 'p2', title: 'Safety Guardrails', content: 'Do not execute destructive operations without secondary confirmation.', category: 'Safety' },
];
export const useAgentStore = create<AgentState>()(
  persist(
    (set) => ({
      isEditing: false,
      draftAgent: null,
      personas: AGENT_LIST.map(a => ({
        ...a,
        systemPrompt: 'You are a helpful AI assistant.',
        enabledTools: ['web_search'],
        status: a.status as any
      })),
      prompts: DEFAULT_PROMPTS,
      setIsEditing: (isEditing) => set({ isEditing }),
      setDraftAgent: (draftAgent) => set({ draftAgent }),
      updateDraft: (updates) => set((state) => ({
        draftAgent: state.draftAgent ? { ...state.draftAgent, ...updates } : null
      })),
      savePersona: (agent) => set((state) => {
        const exists = state.personas.some(p => p.id === agent.id);
        return {
          personas: exists 
            ? state.personas.map(p => p.id === agent.id ? agent : p)
            : [...state.personas, agent],
          isEditing: false,
          draftAgent: null
        };
      }),
      deletePersona: (id) => set((state) => ({
        personas: state.personas.filter(p => p.id !== id)
      })),
      addPrompt: (prompt) => set((state) => ({
        prompts: [...state.prompts, prompt]
      })),
      deletePrompt: (id) => set((state) => ({
        prompts: state.prompts.filter(p => p.id !== id)
      })),
    }),
    { name: 'agent-studio-storage' }
  )
);
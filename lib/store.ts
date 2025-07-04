import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GeneratedProject {
  files: { path: string; content: string }[]
  preview: string
}

interface ProjectState {
  // Current project
  currentProject: GeneratedProject | null
  setCurrentProject: (project: GeneratedProject | null) => void

  // Project history
  projectHistory: GeneratedProject[]
  addToHistory: (project: GeneratedProject) => void
  clearHistory: () => void

  // UI state
  isGenerating: boolean
  setIsGenerating: (loading: boolean) => void

  error: string | null
  setError: (error: string | null) => void

  // Editor state
  showEditor: boolean
  setShowEditor: (show: boolean) => void

  selectedFile: string
  setSelectedFile: (file: string) => void

  activeTab: "preview" | "code"
  setActiveTab: (tab: "preview" | "code") => void

  // Deployment state
  isDeploying: boolean
  setIsDeploying: (deploying: boolean) => void

  deploymentUrl: string | null
  setDeploymentUrl: (url: string | null) => void

  // User preferences
  preferences: {
    theme: "light" | "dark"
    autoSave: boolean
    showLineNumbers: boolean
  }
  updatePreferences: (prefs: Partial<ProjectState["preferences"]>) => void
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      // Current project
      currentProject: null,
      setCurrentProject: (project) => set({ currentProject: project }),

      // Project history
      projectHistory: [],
      addToHistory: (project) => {
        const history = get().projectHistory
        const newHistory = [project, ...history.slice(0, 9)] // Keep last 10 projects
        set({ projectHistory: newHistory })
      },
      clearHistory: () => set({ projectHistory: [] }),

      // UI state
      isGenerating: false,
      setIsGenerating: (loading) => set({ isGenerating: loading }),

      error: null,
      setError: (error) => set({ error }),

      // Editor state
      showEditor: false,
      setShowEditor: (show) => set({ showEditor: show }),

      selectedFile: "",
      setSelectedFile: (file) => set({ selectedFile: file }),

      activeTab: "preview",
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Deployment state
      isDeploying: false,
      setIsDeploying: (deploying) => set({ isDeploying: deploying }),

      deploymentUrl: null,
      setDeploymentUrl: (url) => set({ deploymentUrl: url }),

      // User preferences
      preferences: {
        theme: "light",
        autoSave: true,
        showLineNumbers: true,
      },
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
    }),
    {
      name: "v0-project-store",
      partialize: (state) => ({
        projectHistory: state.projectHistory,
        preferences: state.preferences,
      }),
    },
  ),
)

// Separate store for API state (not persisted)
interface ApiState {
  apiKey: string | null
  setApiKey: (key: string | null) => void

  isApiKeyValid: boolean
  setIsApiKeyValid: (valid: boolean) => void

  usage: {
    tokensUsed: number
    requestsCount: number
    lastReset: string
  }
  updateUsage: (tokens: number) => void
  resetUsage: () => void
}

export const useApiStore = create<ApiState>((set, get) => ({
  apiKey: null,
  setApiKey: (key) => set({ apiKey: key }),

  isApiKeyValid: false,
  setIsApiKeyValid: (valid) => set({ isApiKeyValid: valid }),

  usage: {
    tokensUsed: 0,
    requestsCount: 0,
    lastReset: new Date().toISOString(),
  },
  updateUsage: (tokens) => {
    const currentUsage = get().usage
    set({
      usage: {
        ...currentUsage,
        tokensUsed: currentUsage.tokensUsed + tokens,
        requestsCount: currentUsage.requestsCount + 1,
      },
    })
  },
  resetUsage: () =>
    set({
      usage: {
        tokensUsed: 0,
        requestsCount: 0,
        lastReset: new Date().toISOString(),
      },
    }),
}))

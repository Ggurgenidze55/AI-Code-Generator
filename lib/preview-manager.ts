/**
 * Placeholder Preview manager.
 * Swap with real Docker / serverless logic later.
 */
import { v4 as uuidv4 } from "uuid"

interface PreviewInfo {
  previewId: string
  url: string
  containerId: string
}

export class PreviewManager {
  /** Pretend to build & run a preview container */
  async createPreview(repoUrl: string, commitSha: string | null = null): Promise<PreviewInfo> {
    const previewId = uuidv4()
    return {
      previewId,
      url: `https://preview-${previewId}.example.com`,
      containerId: `container-${previewId}`,
    }
  }

  /** Pretend to destroy a running preview */
  async destroyPreview(containerId: string) {
    // No-op for now
    return { success: true }
  }
}

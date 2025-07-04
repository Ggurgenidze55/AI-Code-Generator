/**
 * Placeholder Git integration.
 * Replace these stubs with real logic once
 * you connect the GitHub API & webhooks.
 */
export class GitManager {
  constructor(private token = "") {}

  /** Simulates repository creation */
  async createRepository(name: string, isPrivate = true) {
    return {
      name,
      private: isPrivate,
      html_url: `https://github.com/demo/${name}`,
      clone_url: `https://github.com/demo/${name}.git`,
      owner: { login: "demo" },
    }
  }

  /** Simulates creating or updating a file */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async createOrUpdateFile(owner: string, repo: string, path: string, content: string, message: string) {
    // No-op for now
    return { success: true }
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  /** Simulates branch creation */
  async createBranch(owner: string, repo: string, branchName: string) {
    return { success: true }
  }
}

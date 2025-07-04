import { NextRequest, NextResponse } from 'next/server'
import { PreviewManager } from '@/lib/preview-manager'
import { GitManager } from '@/lib/git-integration'

const previewManager = new PreviewManager()
const gitManager = new GitManager(process.env.GITHUB_TOKEN!)

export async function POST(req: NextRequest) {
  try {
    const { files } = await req.json()
    
    // Create temporary repository
    const repoName = `preview-${Date.now()}`
    const repo = await gitManager.createRepository(repoName)
    
    // Add files to repository
    for (const file of files) {
      await gitManager.createOrUpdateFile(
        repo.owner.login,
        repo.name,
        file.path,
        file.content,
        `Add ${file.path}`
      )
    }
    
    // Create preview deployment
    const preview = await previewManager.createPreview(
      repo.clone_url,
      'main'
    )
    
    return NextResponse.json({
      previewUrl: preview.url,
      repoUrl: repo.html_url,
      previewId: preview.previewId,
    })
    
  } catch (error) {
    console.error('Preview deployment failed:', error)
    return NextResponse.json(
      { error: 'Deployment failed' },
      { status: 500 }
    )
  }
}

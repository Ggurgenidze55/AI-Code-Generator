# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Option 1: One-Click Deploy
Click the "Deploy to Vercel" button in the app or use this link:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fai-code-generator&project-name=ai-code-generator&repository-name=ai-code-generator)

### Option 2: Manual Deploy

1. **Fork this repository** on GitHub
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
   - Click "Deploy"

3. **Environment Variables (Optional):**
   - Add `OPENAI_API_KEY` for AI-powered generation
   - Add `NEXT_PUBLIC_APP_URL` for production URL

### Option 3: Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
\`\`\`

## Other Deployment Options

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for AI generation |
| `NEXT_PUBLIC_APP_URL` | No | Your app's public URL |
| `NODE_ENV` | Auto | Environment (production/development) |

## Post-Deployment

1. **Test the deployment** - Visit your live URL
2. **Add custom domain** (optional)
3. **Set up analytics** (optional)
4. **Configure environment variables** as needed

## Troubleshooting

### Build Errors
- Check Node.js version (18+)
- Verify all dependencies are installed
- Check TypeScript errors

### Runtime Errors
- Check environment variables
- Verify API endpoints
- Check browser console for errors

## Performance Tips

1. **Enable caching** in Vercel settings
2. **Optimize images** using Next.js Image component
3. **Use CDN** for static assets
4. **Monitor performance** with Vercel Analytics

---

**Your app will be live at:** `https://your-project-name.vercel.app`

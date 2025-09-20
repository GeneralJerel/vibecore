# Building a Real Startup with VibeCore: portfolioagents.io

This guide shows how to transform a complex startup idea into structured, deterministic code using VibeCore cartridges.

## The Original Prompt

> "Build me a startup that takes a resume and instantly turns it into a professional landing page plus an AI-powered agent that answers questions about the person's experience. The startup is called portfolioagents.io, and it's designed for job seekers, freelancers, and professionals who want a modern, interactive way to showcase their skills. The first task is to build the Dashboard where users can upload their resume, go through AI-guided onboarding (VAPI asking clarifying questions), and preview their generated portfolio. The product should feel sleek, simple, and professional—like a cross between a personal website builder and an AI assistant. Use mockdata at first. Focus on design before functionality, working page by page, feature by feature."

## Breaking It Down

### Step 1: Analyze Requirements

From the prompt, we identify:
- **Core Features**: Resume upload, AI agent, portfolio generation, dashboard
- **User Types**: Job seekers, freelancers, professionals
- **Tech Needs**: File upload, AI integration, public pages, authentication
- **Approach**: Design-first, mock data, incremental development

### Step 2: Choose Your Stack and Tier

For a modern SaaS with AI features:
- **Stack**: `next-react-trpc-prisma` (full-stack TypeScript with great DX)
- **Tier**: Start with `productizing` (team-ready, but not over-engineered)

### Step 3: Apply Cartridges Sequentially

## Implementation Plan

### Phase 1: Foundation (Day 1)

```markdown
# Prompt 1: Base Application
You are an AI coding assistant. Follow the Cartridge strictly.

[Paste contents of cartridges/productizing/next-baseline.md]

## My Inputs
appName: portfolioagents
description: Turn resumes into AI-powered portfolio sites
features: 
  - dashboard
  - resume-upload
  - ai-agent
  - portfolio-generation
  - public-profiles
authProviders: [google, github, email]
primaryColor: indigo
darkMode: true
analytics: vercel
```

### Phase 2: Data Model (Day 1)

```markdown
# Prompt 2: User Profile CRUD
[Paste cartridges/productizing/crud-trpc-prisma.md]

## My Inputs
resourceName: UserProfile
resourceNamePlural: UserProfiles
fields:
  - name: userId
    type: relation
    relation:
      to: User
      type: one-to-one
    required: true
    unique: true
  - name: headline
    type: string
    required: false
    validation:
      max: 100
  - name: bio
    type: string
    required: false
    validation:
      max: 500
  - name: skills
    type: json
    required: false
  - name: experience
    type: json
    required: false
  - name: publicSlug
    type: string
    required: true
    unique: true
  - name: isPublished
    type: boolean
    required: true
    default: false
permissions:
  create: [authenticated]
  read: [owner, public-if-published]
  update: [owner]
  delete: [owner]
```

```markdown
# Prompt 3: Resume CRUD
[Paste cartridges/productizing/crud-trpc-prisma.md]

## My Inputs
resourceName: Resume
resourceNamePlural: Resumes
fields:
  - name: userId
    type: relation
    relation:
      to: User
      type: one-to-many
    required: true
  - name: fileName
    type: string
    required: true
  - name: fileUrl
    type: string
    required: true
  - name: mimeType
    type: string
    required: true
  - name: fileSize
    type: number
    required: true
  - name: rawContent
    type: string
    required: false
  - name: parsedData
    type: json
    required: false
  - name: aiAnalysis
    type: json
    required: false
  - name: status
    type: enum
    validation:
      enum: [uploading, processing, ready, error]
    required: true
    default: uploading
  - name: errorMessage
    type: string
    required: false
permissions:
  create: [authenticated]
  read: [owner]
  update: [owner]
  delete: [owner]
```

### Phase 3: Dashboard UI with Mock Data (Day 2)

```markdown
# Prompt 4: Dashboard Page
Create a dashboard page at app/(app)/dashboard/page.tsx with these sections:

## Layout
- Left sidebar with navigation: Overview, Resumes, Portfolio, Settings
- Main content area with cards layout
- Top bar with user menu and notifications

## Mock Data
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  plan: "pro"
}

const mockResumes = [
  {
    id: "1",
    fileName: "john-doe-resume-2024.pdf",
    fileSize: 245000,
    uploadedAt: "2024-01-15",
    status: "ready",
    parsedData: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 555-0123",
      location: "San Francisco, CA",
      summary: "Experienced full-stack developer with 8 years building scalable web applications",
      experience: [
        {
          company: "TechCorp",
          role: "Senior Developer",
          duration: "2020-Present",
          highlights: ["Led team of 5", "Increased performance by 40%"]
        }
      ],
      skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
      education: [
        {
          degree: "BS Computer Science",
          school: "Stanford University",
          year: "2016"
        }
      ]
    }
  }
]

const mockPortfolio = {
  id: "portfolio-1",
  publicUrl: "https://portfolioagents.io/john-doe",
  isPublished: true,
  views: 234,
  agentInteractions: 45,
  lastUpdated: "2024-01-15"
}

## Components to Create

1. **UploadCard** (components/dashboard/UploadCard.tsx)
   - Drag-and-drop zone using react-dropzone
   - File type validation (PDF, DOCX)
   - Max size: 5MB
   - Upload progress indicator
   - Error states

2. **ResumeList** (components/dashboard/ResumeList.tsx)
   - Table with columns: File Name, Upload Date, Status, Actions
   - Status badges (processing, ready, error)
   - Actions: View, Delete, Set as Primary
   - Empty state with upload CTA

3. **PortfolioPreview** (components/dashboard/PortfolioPreview.tsx)
   - Live preview iframe
   - Public URL with copy button
   - View/interaction stats
   - Publish/Unpublish toggle
   - Edit button → links to portfolio editor

4. **AIAgentCard** (components/dashboard/AIAgentCard.tsx)
   - Agent status (training, ready, needs update)
   - Sample questions the agent can answer
   - Test interface to try questions
   - Training data sources (resumes used)

## Styling
- Use shadcn/ui components
- Tailwind classes for layout
- Subtle animations on hover
- Professional color scheme (indigo primary)
- Dark mode support
```

### Phase 4: File Upload Integration (Day 3)

```markdown
# Prompt 5: File Upload API
Create file upload functionality:

## API Routes
1. Create tRPC mutation for file upload in server/api/routers/resume.ts:
   - Accept file via multipart/form-data or base64
   - Store in cloud storage (use mock for now, prepare for S3/Cloudinary)
   - Create database record
   - Trigger processing job (mock)

2. Add upload utilities in lib/upload.ts:
   - File validation (type, size)
   - Virus scanning stub
   - Generate unique file names
   - Mock storage that saves to public/uploads/ temporarily

## Frontend Integration
Update UploadCard component:
- Connect to upload mutation
- Show real progress
- Handle errors gracefully
- Update resume list on success

## Mock Processing
Create a mock processor that:
- Sets status to "processing" immediately
- After 3 seconds, updates to "ready"
- Generates fake parsed data based on file name
```

### Phase 5: AI Agent Setup (Day 4)

```markdown
# Prompt 6: AI Agent Integration
Create the AI agent foundation:

## Data Model
Add AgentConfig to database:
- userId (relation)
- personality (professional, friendly, casual)
- knowledgeSources (array of resume IDs)
- customInstructions (text)
- isActive (boolean)

## API Integration
Create server/api/routers/agent.ts:
- chatWithAgent mutation
- Mock responses initially based on resume data
- Prepare structure for OpenAI/Claude integration
- Rate limiting setup

## Components
Create components/ai-agent/ChatInterface.tsx:
- Chat bubble UI
- Typing indicators
- Message history
- Suggested questions
- Mock responses like:
  "Based on John's resume, he has 8 years of experience in full-stack development, 
   specializing in TypeScript and React. He led a team of 5 at TechCorp where he 
   increased application performance by 40%."
```

### Phase 6: Public Portfolio Page (Day 5)

```markdown
# Prompt 7: Public Portfolio
Create the public-facing portfolio page at app/[slug]/page.tsx:

## Layout
- Hero section with name, headline, photo
- Skills showcase with proficiency levels
- Experience timeline
- Education section
- Embedded AI chat widget
- Contact form (protected by captcha)

## SEO
- Dynamic meta tags from profile data
- Open Graph images
- Structured data for job seekers

## Design
- Clean, minimal design
- Mobile-first responsive
- Print-friendly CSS
- Accessibility compliant
```

## Development Tips

### 1. Use Mock Data First
Always start with comprehensive mock data. This lets you:
- Build UI without backend dependencies
- Test edge cases easily
- Share progress with stakeholders quickly

### 2. Apply Cartridges Incrementally
Don't try to apply all cartridges at once. Follow this order:
1. Base application scaffold
2. Authentication
3. Data models (one at a time)
4. UI with mock data
5. Real integrations
6. Polish and optimization

### 3. Validate at Each Step
After each cartridge application:
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

### 4. Keep Prompts Focused
Instead of one massive prompt, break it down:
- ❌ "Build the entire portfolioagents.io startup"
- ✅ "Create the dashboard upload section with mock data"

### 5. Iterate on Design
Start with basic functionality, then enhance:
1. Working components with mock data
2. Styling and animations
3. Real data integration
4. Error handling and edge cases
5. Performance optimization

## Common Patterns for Startups

### File Upload Pattern
```typescript
// Always include in file upload features:
- File type validation
- Size limits
- Virus scanning (at least stub it)
- Progress indicators
- Error recovery
- Cleanup of failed uploads
```

### AI Integration Pattern
```typescript
// Standard AI agent setup:
- Rate limiting
- Context windowing
- Fallback responses
- Error messages
- Token counting
- Cost tracking
- Conversation history
```

### Public Profile Pattern
```typescript
// Public pages need:
- SEO optimization
- Social sharing
- Privacy controls
- Analytics
- Abuse prevention
- Performance optimization
```

## Deployment Checklist

Before going live with your startup:

- [ ] All cartridge quality gates pass
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] File storage configured (S3/Cloudinary)
- [ ] AI API keys secured
- [ ] Rate limiting enabled
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured
- [ ] Terms of Service and Privacy Policy
- [ ] GDPR compliance if needed
- [ ] Payment integration (Stripe)
- [ ] Email service (SendGrid/Resend)
- [ ] Domain and SSL configured
- [ ] Backup strategy implemented
- [ ] Monitoring and alerts

## Troubleshooting

### Problem: AI generates inconsistent code styles
**Solution**: Always include the same base cartridge in every prompt

### Problem: Features don't integrate well
**Solution**: Use cartridges from the same stack family

### Problem: Too much complexity at once
**Solution**: Start with prototype tier, upgrade to productizing later

### Problem: Mock data gets out of sync
**Solution**: Create a central mockData.ts file and import everywhere

## Next Steps

1. Start with Phase 1 (Foundation)
2. Test each phase before moving on
3. Get user feedback early with mock data
4. Iterate based on real usage
5. Upgrade to production tier when ready to scale

Remember: The goal is **deterministic, consistent code generation** even for complex startup ideas. By breaking down the requirements and applying cartridges systematically, you get reliable results every time.

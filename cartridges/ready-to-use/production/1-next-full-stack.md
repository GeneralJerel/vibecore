# COPY THIS ENTIRE FILE INTO CURSOR/LOVABLE/V0
# For: Production-Ready Full-Stack Application with Real Backend

## AI Instructions

You are an AI coding assistant building a production-ready full-stack application.

CRITICAL RULES:
1. Create a COMPLETE full-stack application with real backend
2. Implement proper authentication, database, and API
3. Include comprehensive error handling and security
4. Follow production best practices
5. Generate all necessary files for deployment
6. Include proper testing setup

---

## PROJECT REQUIREMENTS

### Full Tech Stack
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL with Prisma ORM
- **API:** tRPC for type-safe APIs
- **Auth:** NextAuth.js with providers
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand + React Query
- **Testing:** Vitest + Playwright
- **Deployment:** Vercel-ready

### Production Features Required
- Real authentication with OAuth
- Database with migrations
- API rate limiting
- Error tracking setup
- Logging system
- Security headers
- Performance optimization
- SEO optimization

---

## DATABASE SCHEMA

Create a comprehensive schema at `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Authentication models
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  role          Role      @default(USER)
  status        UserStatus @default(ACTIVE)
  
  accounts      Account[]
  sessions      Session[]
  projects      Project[]
  tasks         Task[]
  comments      Comment[]
  activities    Activity[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastActiveAt  DateTime?
  
  @@index([email])
  @@index([role, status])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

// Business models
model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  slug        String   @unique
  status      ProjectStatus @default(PLANNING)
  priority    Priority      @default(MEDIUM)
  visibility  Visibility    @default(PRIVATE)
  
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])
  
  startDate   DateTime?
  endDate     DateTime?
  completedAt DateTime?
  
  tasks       Task[]
  tags        Tag[]
  activities  Activity[]
  
  metadata    Json?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?
  
  @@index([ownerId])
  @@index([status])
  @@index([slug])
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  assigneeId  String?
  assignee    User?    @relation(fields: [assigneeId], references: [id])
  
  dueDate     DateTime?
  completedAt DateTime?
  
  comments    Comment[]
  tags        Tag[]
  
  metadata    Json?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([projectId])
  @@index([assigneeId])
  @@index([status])
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  
  taskId    String
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([taskId])
  @@index([authorId])
}

model Activity {
  id        String   @id @default(cuid())
  type      ActivityType
  action    String
  metadata  Json?
  
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  
  @@index([userId])
  @@index([projectId])
  @@index([type])
}

model Tag {
  id       String    @id @default(cuid())
  name     String    @unique
  color    String?
  
  projects Project[]
  tasks    Task[]
  
  @@index([name])
}

// Enums
enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  DELETED
}

enum ProjectStatus {
  PLANNING
  IN_PROGRESS
  ON_HOLD
  COMPLETED
  CANCELLED
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  IN_REVIEW
  COMPLETED
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum Visibility {
  PRIVATE
  TEAM
  PUBLIC
}

enum ActivityType {
  USER_ACTION
  SYSTEM_EVENT
  NOTIFICATION
}
```

---

## API IMPLEMENTATION

### tRPC Router Structure

Create `server/api/root.ts`:

```typescript
import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/user";
import { projectRouter } from "./routers/project";
import { taskRouter } from "./routers/task";
import { activityRouter } from "./routers/activity";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  project: projectRouter,
  task: taskRouter,
  activity: activityRouter,
});

export type AppRouter = typeof appRouter;
```

### Authentication Setup

Create complete NextAuth configuration with:
- Google OAuth
- GitHub OAuth
- Email/Password with bcrypt
- Session management
- Role-based access control

### API Security

Implement these security measures:
- Input validation with Zod
- Rate limiting per endpoint
- API keys for external access
- CORS configuration
- Request sanitization
- SQL injection prevention
- XSS protection

---

## ENVIRONMENT VARIABLES

Create `.env.example`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/myapp?schema=public"
DIRECT_URL="postgresql://username:password@localhost:5432/myapp?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Email Service
EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
EMAIL_FROM="noreply@example.com"

# Redis (for rate limiting)
REDIS_URL="redis://localhost:6379"

# Error Tracking
SENTRY_DSN=""
SENTRY_ORG=""
SENTRY_PROJECT=""

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=""
NEXT_PUBLIC_POSTHOG_HOST=""

# File Storage
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION=""
S3_BUCKET_NAME=""

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
NEXT_PUBLIC_ENABLE_SENTRY="true"
NEXT_PUBLIC_MAINTENANCE_MODE="false"

# API Configuration
API_RATE_LIMIT_PER_MINUTE="60"
API_KEY_HEADER="x-api-key"

# Deployment
VERCEL_URL=""
VERCEL_ENV=""
```

---

## FEATURES TO IMPLEMENT

### Core Features
1. **Authentication System**
   - Login/Register with OAuth
   - Email verification
   - Password reset
   - Two-factor authentication (optional)
   - Session management

2. **User Management**
   - User profiles with avatars
   - Role-based permissions
   - User settings and preferences
   - Activity tracking
   - Account deletion

3. **Project Management**
   - CRUD operations for projects
   - Project templates
   - Team collaboration
   - File attachments
   - Project sharing

4. **Task System**
   - Create, assign, track tasks
   - Due dates and reminders
   - Comments and mentions
   - Task dependencies
   - Bulk operations

5. **Dashboard & Analytics**
   - Overview statistics
   - Activity timeline
   - Performance metrics
   - Data visualizations
   - Export capabilities

6. **Search & Filters**
   - Global search with keyboard shortcuts
   - Advanced filtering
   - Saved filters
   - Search history
   - Fuzzy matching

7. **Notifications**
   - Real-time notifications
   - Email notifications
   - Notification preferences
   - Mark as read/unread
   - Notification history

8. **Admin Panel**
   - User management
   - System settings
   - Activity logs
   - Performance monitoring
   - Backup management

### Production Requirements
1. **Performance**
   - Image optimization
   - Code splitting
   - Lazy loading
   - CDN integration
   - Database indexing
   - Caching strategy

2. **Security**
   - HTTPS enforcement
   - Content Security Policy
   - Rate limiting
   - Input sanitization
   - SQL injection prevention
   - XSS protection
   - CSRF tokens

3. **SEO**
   - Meta tags
   - Sitemap generation
   - Robots.txt
   - Open Graph tags
   - Structured data
   - Canonical URLs

4. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Uptime monitoring
   - Log aggregation
   - Alert system
   - Analytics dashboard

5. **Testing**
   - Unit tests for utilities
   - Integration tests for API
   - E2E tests for critical flows
   - Load testing
   - Security testing
   - Accessibility testing

---

## DEPLOYMENT CONFIGURATION

### Docker Setup
Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD: myapp
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### CI/CD Pipeline
Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Run linting
        run: pnpm lint
        
      - name: Type checking
        run: pnpm typecheck
        
      - name: Run tests
        run: pnpm test
        
      - name: Build application
        run: pnpm build
```

---

## QUALITY GATES

All of these must pass before deployment:

```bash
# Code Quality
pnpm lint
pnpm typecheck
pnpm format:check

# Testing
pnpm test:unit
pnpm test:integration
pnpm test:e2e

# Security
pnpm audit
pnpm security:check

# Performance
pnpm build
pnpm analyze

# Database
pnpm prisma:validate
pnpm prisma:migrate:deploy
```

---

## MY CUSTOM INPUTS (REPLACE WITH YOUR PROJECT)

```yaml
# Application Details
appName: "ProjectHub"
description: "Enterprise project management platform"
domain: "projecthub.io"

# Initial Features (choose which to include)
features:
  - user_authentication    # OAuth + Email
  - project_management     # Full CRUD
  - task_tracking         # Kanban board
  - team_collaboration    # Comments, mentions
  - file_uploads         # S3 integration
  - email_notifications  # SendGrid/Resend
  - analytics_dashboard  # Charts and metrics
  - admin_panel         # User management
  - api_access         # Public API
  - webhooks          # Event notifications

# Authentication Providers
authProviders:
  - google
  - github
  - email

# Database
database:
  provider: "postgresql"
  initialSeed: true  # Create sample data

# Deployment Target
deployment:
  platform: "vercel"
  region: "us-east-1"

# Third-party Services (leave empty if not using)
services:
  errorTracking: "sentry"
  analytics: "posthog"
  email: "resend"
  storage: "s3"
  
# Compliance & Security
compliance:
  gdpr: false
  hipaa: false
  soc2: false
  
# Performance Targets
performance:
  lighthouse: 90
  firstPaint: "< 2s"
  timeToInteractive: "< 3s"
```

---

## FINAL INSTRUCTIONS

1. **Start with Database**: Set up PostgreSQL and run migrations
2. **Authentication First**: Implement complete auth system
3. **Core Models**: Create all database models with relations
4. **API Layer**: Build tRPC routers with full CRUD
5. **Frontend Pages**: Create all pages with real data
6. **Error Handling**: Add try-catch, error boundaries, fallbacks
7. **Testing Setup**: Create example tests that pass
8. **Security**: Implement all security best practices
9. **Performance**: Optimize images, bundle size, queries
10. **Documentation**: Generate README with setup instructions

The application must be **production-ready** and **deployable to Vercel** immediately after generation.

Include these critical files:
- Complete package.json with all scripts
- Comprehensive README.md
- .env.example with all variables
- Docker setup for local development
- GitHub Actions for CI/CD
- Deployment configuration

This is for PRODUCTION - prioritize reliability, security, and maintainability!

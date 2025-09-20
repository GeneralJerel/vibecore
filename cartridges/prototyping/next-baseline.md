---
cartridge: true
name: "Next.js Baseline (Prototyping)"
tier: prototyping
stack: next-react-trpc-prisma
version: 1.0.0
owner: "@vibecore"
status: stable
---

# Next.js Baseline (Prototyping) — v1.0.0

## Purpose
- **What:** Frontend-only Next.js app with mock data for rapid UI/UX prototyping
- **For whom:** Designers and developers creating UI mockups and user flows
- **When to use:** Design sprints, client demos, UI/UX testing, concept validation

## Stack Contract (Hard Requirements)
- **Runtime:** node@20
- **Package Manager:** pnpm
- **Language:** typescript (relaxed mode for speed)
- **Framework/Router:** next@15 with App Router
- **UI & Styling:** react@18, tailwindcss@3, shadcn-ui
- **State & Data:** zustand for UI state, mock data only
- **API Pattern:** Mock functions returning static data
- **ORM/Database:** None - mock data only
- **Auth:** Mock auth with localStorage
- **Testing:** None required for prototyping
- **Lint/Format/Build:** prettier only
- **Repo Mode:** single
- **Target/Hosting:** vercel or local

## Development Style
- **Branching:** Work directly on main
- **Commit Convention:** Simple descriptive commits
- **PR Requirements:** None
- **Testing Approach:** Manual UI testing only
- **File/Folder Structure:** Simple and flat

## Inputs
### Required
- `appName`: Application name (string)
- `description`: Brief description (string)
- `pages`: List of pages to create (array)

### Optional
- `primaryColor`: Tailwind color (default: "indigo")
- `darkMode`: Enable dark mode (boolean, default: true)
- `mockDataTheme`: Type of mock data (e-commerce|saas|social|portfolio)

## Outputs
### Files & Routes
- `/app` pages with mock data
- `/components/ui` shadcn components
- `/lib/mock-data.ts` centralized mock data
- `/lib/mock-auth.ts` fake authentication
- Beautiful UI with animations
- Responsive design

### Database
- None - mock data only

### Tests
- None - prototyping phase

## Guardrails
### Allowed
- Hardcoded mock data
- localStorage for state persistence
- Fake delays to simulate loading
- Lorem ipsum content
- Placeholder images

### Forbidden
- Real database connections
- External API calls
- Real authentication
- Production error handling
- Complex state management

## Steps the Agent Must Follow
1. Create Next.js app with TypeScript
2. Set up Tailwind CSS and shadcn-ui
3. Create mock data file with rich examples
4. Build beautiful UI components
5. Add smooth animations and transitions
6. Create all requested pages with mock data
7. Add fake loading states for realism
8. Implement mock auth with localStorage
9. Make fully responsive design
10. Add interactive elements for demos

## Quality Gates
### Local Validation
```bash
pnpm build
# That's it! Just needs to build successfully
```

## Integration Points
### Environment Variables
```env
# Only needed for prototyping
NEXT_PUBLIC_APP_NAME="My App"
NEXT_PUBLIC_MOCK_DELAY="1000" # Fake loading delay in ms
```

## Examples (Golden Implementation)

### Example 1: Mock Data Structure
```typescript
// lib/mock-data.ts
export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png",
    role: "Admin",
    status: "active",
    lastSeen: "2 minutes ago",
    projects: 12,
    tasks: 34
  },
  // ... more mock users
];

export const mockProjects = [
  {
    id: "1",
    name: "Project Alpha",
    description: "Revolutionary new product launch",
    status: "in-progress",
    progress: 65,
    team: ["John Doe", "Jane Smith"],
    deadline: "2024-03-15",
    priority: "high",
    budget: "$50,000",
    thumbnail: "https://via.placeholder.com/300x200"
  },
  // ... more mock projects
];

// Fake API delay
export const fakeDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Fake data fetcher
export async function fetchMockData<T>(data: T): Promise<T> {
  await fakeDelay();
  return data;
}
```

### Example 2: Mock Authentication
```typescript
// lib/mock-auth.ts
export const mockAuth = {
  login: async (email: string, password: string) => {
    await fakeDelay(1500);
    if (email && password) {
      const user = { id: "1", email, name: "Demo User" };
      localStorage.setItem("mockUser", JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: "Invalid credentials" };
  },
  
  logout: () => {
    localStorage.removeItem("mockUser");
  },
  
  getUser: () => {
    const stored = localStorage.getItem("mockUser");
    return stored ? JSON.parse(stored) : null;
  }
};
```

## Anti-patterns
- **Don't:** Connect to real APIs
  **Do instead:** Use mock data with fake delays

- **Don't:** Implement complex business logic
  **Do instead:** Focus on UI/UX and user flows

- **Don't:** Worry about performance optimization
  **Do instead:** Prioritize beautiful design

## Version History & Migration
### Changelog
- **v1.0.0**: Initial prototyping version
  - Frontend-only focus
  - Rich mock data
  - Beautiful UI templates
  - No backend complexity

## Notes for AI Agents
- Focus on BEAUTIFUL DESIGN over functionality
- Use lots of mock data to make it feel real
- Add loading skeletons and animations
- Make it responsive on all devices
- Use placeholder images from Unsplash or Placeholder.com
- Add fake delays to simulate real API calls
- Create impressive UI that sells the concept
- Don't worry about security or optimization
- Make it demo-ready with impressive interactions
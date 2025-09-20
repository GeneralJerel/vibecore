# COPY THIS ENTIRE FILE INTO CURSOR/LOVABLE/V0
# For: Rapid UI Prototyping with Mock Data (No Backend)

## AI Instructions

You are an AI coding assistant specialized in creating beautiful UI prototypes with mock data.

CRITICAL RULES:
1. Create a FRONTEND-ONLY application with no backend
2. Use mock data for everything - no real APIs or databases
3. Focus on BEAUTIFUL DESIGN and smooth interactions
4. Make it look real with rich mock data and fake delays
5. Prioritize speed of development over code quality
6. Create a complete, runnable application

---

## PROJECT REQUIREMENTS

### Tech Stack (Frontend Only)
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript (relaxed mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand for UI state
- **Data:** Mock data with localStorage
- **Auth:** Fake auth with localStorage
- **Icons:** Lucide React
- **Images:** Placeholder images from Unsplash

### No Backend Required
- NO database setup
- NO API routes (except mock)
- NO authentication providers
- NO external services
- Everything runs in the browser

---

## MOCK DATA STRUCTURE

Create a comprehensive mock data file at `lib/mock-data.ts`:

```typescript
// User mock data
export const mockUsers = [
  {
    id: "usr_001",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    role: "Product Manager",
    department: "Product",
    status: "active",
    joinedDate: "2023-01-15",
    lastActive: "2 minutes ago",
    stats: {
      projects: 12,
      tasks: 48,
      completed: 203,
      rating: 4.8
    }
  },
  // Add 10+ more users with varied data
];

// Project mock data
export const mockProjects = [
  {
    id: "prj_001",
    name: "Mobile App Redesign",
    description: "Complete overhaul of our mobile application with modern UI/UX",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
    status: "in_progress",
    priority: "high",
    progress: 72,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    budget: "$125,000",
    spent: "$89,000",
    team: ["Sarah Chen", "Mike Johnson", "Lisa Wang"],
    tags: ["mobile", "design", "urgent"],
    milestones: [
      { name: "Research", completed: true },
      { name: "Design", completed: true },
      { name: "Development", completed: false },
      { name: "Testing", completed: false }
    ]
  },
  // Add 15+ more projects
];

// Dashboard stats
export const mockStats = {
  revenue: {
    current: 284650,
    previous: 246890,
    change: 15.3,
    chart: [120, 132, 145, 152, 168, 185, 195, 210, 235, 268, 284]
  },
  users: {
    total: 12453,
    active: 8921,
    new: 423,
    change: 12.5
  },
  performance: {
    uptime: 99.9,
    responseTime: 245,
    errorRate: 0.02,
    satisfaction: 4.7
  }
};

// Activity feed
export const mockActivities = [
  {
    id: "act_001",
    user: "Sarah Chen",
    action: "completed",
    target: "User Research Report",
    time: "5 minutes ago",
    type: "task"
  },
  // Add 20+ activities
];

// Notifications
export const mockNotifications = [
  {
    id: "notif_001",
    title: "New comment on your project",
    message: "Mike Johnson commented on Mobile App Redesign",
    time: "2 minutes ago",
    read: false,
    type: "comment",
    actionUrl: "/projects/prj_001"
  },
  // Add 10+ notifications
];
```

---

## MOCK AUTHENTICATION

Create `lib/mock-auth.ts`:

```typescript
interface MockUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

class MockAuth {
  private readonly STORAGE_KEY = 'mock_auth_user';
  private readonly DELAY = 1000; // Simulate network delay

  async login(email: string, password: string): Promise<{ success: boolean; user?: MockUser; error?: string }> {
    // Fake delay
    await new Promise(resolve => setTimeout(resolve, this.DELAY));
    
    // Accept any email/password for demo
    if (email && password) {
      const user: MockUser = {
        id: "usr_demo",
        email,
        name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        role: "Admin"
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    
    return { success: false, error: "Invalid credentials" };
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.href = '/login';
  }

  getCurrentUser(): MockUser | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}

export const mockAuth = new MockAuth();
```

---

## PAGES TO CREATE (CUSTOMIZE THIS)

```yaml
pages:
  - path: /
    name: Landing Page
    description: Beautiful marketing page with hero, features, pricing
    
  - path: /login
    name: Login Page
    description: Modern login with social buttons (fake)
    
  - path: /signup
    name: Sign Up Page
    description: Registration with multi-step wizard
    
  - path: /dashboard
    name: Dashboard
    description: Stats cards, charts, activity feed, quick actions
    
  - path: /projects
    name: Projects
    description: Grid/list view, filters, search, creation modal
    
  - path: /projects/[id]
    name: Project Detail
    description: Kanban board, team, files, comments
    
  - path: /team
    name: Team
    description: Team members grid with roles and stats
    
  - path: /calendar
    name: Calendar
    description: Monthly view with events and tasks
    
  - path: /messages
    name: Messages
    description: Chat interface with conversations list
    
  - path: /settings
    name: Settings
    description: Tabbed settings with forms
    
  - path: /profile
    name: User Profile
    description: User info, activity, achievements
```

---

## UI COMPONENTS TO CREATE

### Layout Components
- `AppShell.tsx` - Main layout with sidebar and header
- `Sidebar.tsx` - Collapsible navigation
- `Header.tsx` - Top bar with search and user menu
- `MobileNav.tsx` - Mobile responsive navigation

### Data Display
- `DataTable.tsx` - Sortable, filterable table
- `StatCard.tsx` - Metric display cards
- `Chart.tsx` - Beautiful charts (use recharts)
- `ActivityFeed.tsx` - Timeline of activities
- `EmptyState.tsx` - When no data exists

### Interactive Components
- `SearchCommand.tsx` - Global search (Cmd+K)
- `CreateModal.tsx` - Multi-step creation forms
- `FilterBar.tsx` - Advanced filtering UI
- `NotificationPopover.tsx` - Notification center
- `ThemeToggle.tsx` - Dark/light mode switch

### Feedback Components
- `LoadingSpinner.tsx` - Loading states
- `SkeletonCard.tsx` - Loading skeletons
- `Toast.tsx` - Success/error messages
- `ConfirmDialog.tsx` - Confirmation modals

---

## DESIGN REQUIREMENTS

### Visual Style
- Modern, clean design with plenty of whitespace
- Subtle shadows and borders
- Smooth animations (framer-motion if needed)
- Glass morphism effects for cards
- Gradient accents on important elements

### Color Scheme (Customize This)
```typescript
colors: {
  primary: 'indigo',     // Main brand color
  success: 'emerald',    // Positive actions
  warning: 'amber',      // Warnings
  error: 'rose',         // Errors
  info: 'sky',          // Information
}
```

### Typography
- Headers: Bold, large, clear hierarchy
- Body: Readable, proper line-height
- Use Inter or similar modern font

### Animations
- Page transitions: 200ms fade
- Hover effects: Scale 1.02 with shadow
- Loading: Smooth skeleton animations
- Modals: Slide up with backdrop

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## FAKE FEATURES TO ADD REALISM

### Fake Loading States
```typescript
// Add random delays to simulate API calls
const fakeDelay = (min = 300, max = 1500) => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Use in components
const [loading, setLoading] = useState(false);
const handleAction = async () => {
  setLoading(true);
  await fakeDelay();
  // Update mock data
  setLoading(false);
  toast.success("Changes saved!");
};
```

### Fake Real-time Updates
```typescript
// Simulate real-time notifications
useEffect(() => {
  const interval = setInterval(() => {
    const randomNotification = generateRandomNotification();
    addNotification(randomNotification);
  }, 30000); // Every 30 seconds
  
  return () => clearInterval(interval);
}, []);
```

### Fake Progress
```typescript
// Simulate progress updates
const [progress, setProgress] = useState(0);
useEffect(() => {
  const timer = setInterval(() => {
    setProgress(prev => {
      if (prev >= 100) {
        clearInterval(timer);
        return 100;
      }
      return prev + Math.random() * 10;
    });
  }, 500);
}, []);
```

---

## PROJECT CONFIGURATION

### package.json Dependencies
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "^3.4.0",
    "zustand": "^4.5.0",
    "lucide-react": "latest",
    "recharts": "^2.10.0",
    "date-fns": "^3.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "sonner": "^1.3.0",
    "react-dropzone": "^14.2.0",
    "@faker-js/faker": "^8.3.0"
  }
}
```

### Environment Variables
```env
NEXT_PUBLIC_APP_NAME=My Awesome App
NEXT_PUBLIC_MOCK_DELAY=1000
NEXT_PUBLIC_DEMO_MODE=true
```

---

## MY CUSTOM INPUTS (REPLACE WITH YOUR DETAILS)

```yaml
# App Configuration
appName: "DemoHub"
description: "Professional SaaS Dashboard Demo"
primaryColor: "violet"
darkMode: true

# Mock Data Theme
dataTheme: "saas"  # Options: e-commerce, saas, social, portfolio, healthcare

# Features to Emphasize
features:
  - Beautiful dashboard with charts
  - Project management with kanban
  - Team collaboration
  - Real-time notifications
  - Advanced search
  - File management
  - Calendar integration
  - Dark mode

# Sample Company Names (for mock data)
companies:
  - "TechCorp Solutions"
  - "Digital Dynamics"
  - "CloudFirst Inc"
  - "DataDrive Systems"
```

---

## FINAL INSTRUCTIONS

1. **Start Fresh**: Create a new Next.js app from scratch
2. **Install Everything**: Set up all dependencies and Tailwind CSS
3. **Mock Data First**: Create comprehensive mock data before UI
4. **Build Beautiful UI**: Focus on aesthetics and animations
5. **Make It Interactive**: Add click handlers, modals, dropdowns
6. **Add Loading States**: Fake delays and skeletons everywhere
7. **Responsive Design**: Must work on mobile, tablet, desktop
8. **Dark Mode**: Implement working dark mode toggle
9. **Fake Auth**: Login/logout should work with localStorage
10. **Polish**: Add micro-interactions, hover effects, transitions

The final result should look like a **premium SaaS application** that could be shown to investors or clients, even though it's all mock data!

Remember: This is for PROTOTYPING - prioritize beautiful UI over clean code!

---
cartridge: true
name: "Dashboard UI Mockup"
tier: prototyping
stack: next-react-trpc-prisma
version: 1.0.0
owner: "@vibecore"
status: stable
---

# Dashboard UI Mockup — v1.0.0

## Purpose
- **What:** Beautiful dashboard interface with mock data and interactions
- **For whom:** Designers, product managers, and stakeholders reviewing UI concepts
- **When to use:** Design reviews, user testing, investor demos, concept validation

## Stack Contract (Hard Requirements)
- **Runtime:** node@20
- **Package Manager:** pnpm
- **Language:** typescript
- **Framework/Router:** next@15 with App Router
- **UI & Styling:** react@18, tailwindcss@3, shadcn-ui
- **State & Data:** Mock data only, localStorage for persistence
- **API Pattern:** None - mock functions only
- **ORM/Database:** None
- **Auth:** Mock auth with localStorage
- **Testing:** None
- **Lint/Format/Build:** prettier
- **Repo Mode:** single
- **Target/Hosting:** vercel or local

## Development Style
- **Branching:** Direct to main
- **Commit Convention:** Simple commits
- **PR Requirements:** None
- **Testing Approach:** Manual UI testing
- **File/Folder Structure:** Simple, component-focused

## Inputs
### Required
- `appName`: Application name (string)
- `dashboardType`: Type of dashboard (analytics|project|ecommerce|social)
- `colorScheme`: Primary color theme (string)

### Optional
- `widgets`: List of dashboard widgets to include
- `chartTypes`: Types of charts to display
- `sidebarCollapsible`: Collapsible sidebar (boolean, default: true)
- `darkMode`: Dark mode support (boolean, default: true)

## Outputs
### Files & Routes
- Beautiful dashboard layout with sidebar
- Widget-based dashboard with mock data
- Interactive charts and graphs
- Responsive design for all devices
- Smooth animations and transitions

### Database
- None

### Tests
- None

## Guardrails
### Allowed
- Hardcoded mock data
- Fake charts with random data
- localStorage for preferences
- Demo interactions

### Forbidden
- Real API calls
- Database connections
- Complex business logic
- Production-level error handling

## Steps the Agent Must Follow
1. Create dashboard shell with sidebar and header
2. Build widget components with mock data
3. Add interactive charts using recharts
4. Create beautiful data tables
5. Implement filter and search UI
6. Add loading skeletons
7. Create empty states
8. Make fully responsive
9. Add smooth animations
10. Implement theme switching

## Quality Gates
### Local Validation
```bash
pnpm build
```

## Integration Points
### Environment Variables
```env
NEXT_PUBLIC_APP_NAME="Dashboard Demo"
```

## Examples (Golden Implementation)

### Example 1: Dashboard Widget
```typescript
// components/widgets/StatsWidget.tsx
export function StatsWidget({ title, value, change, icon, color }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <p className={`text-sm mt-2 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </p>
        </div>
        <div className={`p-4 rounded-lg bg-${color}-100 dark:bg-${color}-900`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
```

### Example 2: Mock Data Generator
```typescript
// lib/mock-dashboard.ts
export const generateDashboardData = () => ({
  stats: [
    { title: "Total Revenue", value: "$45,231", change: 12.5, trend: "up" },
    { title: "Active Users", value: "2,341", change: -2.4, trend: "down" },
    { title: "Conversion Rate", value: "3.4%", change: 8.1, trend: "up" },
    { title: "Avg. Session", value: "4m 32s", change: 23.5, trend: "up" }
  ],
  chart: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { name: "Revenue", data: [30, 40, 35, 50, 45, 60] },
      { name: "Users", data: [20, 30, 25, 35, 30, 40] }
    ]
  },
  recentActivity: [
    { user: "John Doe", action: "Completed task", time: "2 min ago" },
    { user: "Jane Smith", action: "Uploaded file", time: "5 min ago" }
  ]
});
```

## Anti-patterns
- **Don't:** Connect to real APIs
  **Do instead:** Use mock data generators

- **Don't:** Implement complex state management
  **Do instead:** Keep state simple and local

## Version History & Migration
### Changelog
- **v1.0.0**: Initial dashboard mockup version

## Notes for AI Agents
- Focus on VISUAL APPEAL over functionality
- Use beautiful gradients and shadows
- Add hover effects and micro-animations
- Include various chart types (line, bar, pie, donut)
- Create realistic looking mock data
- Make it feel interactive even though it's fake
- Use modern design patterns (cards, glass morphism)
- Ensure perfect responsive behavior

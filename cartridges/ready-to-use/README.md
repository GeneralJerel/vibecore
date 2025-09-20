# Ready-to-Use Cartridges

These are complete, copy-paste ready prompts for AI coding tools like Cursor, Lovable, and v0.

## How to Use

1. **Choose Your Tier:**
   - `prototyping/` - For UI mockups with mock data (no backend)
   - `production/` - For full-stack applications with real backend

2. **Copy the Entire File:**
   - Open the `.md` file you want
   - Select ALL content (Cmd+A / Ctrl+A)
   - Copy it (Cmd+C / Ctrl+C)

3. **Paste into Your AI Tool:**
   - Open Cursor/Lovable/v0 in an empty project
   - Paste the entire content
   - Customize the inputs section at the bottom
   - Press Enter and let the AI build!

## Available Cartridges

### 🎨 Prototyping (Frontend Only)
- `prototyping/1-next-mockup.md` - Beautiful Next.js app with mock data
  - Perfect for: Demos, design validation, client presentations
  - Output: Interactive mockup with fake data and animations
  - Time to prototype: ~5 minutes

### 🚀 Production (Full Stack)
- `production/1-next-full-stack.md` - Complete Next.js app with backend
  - Perfect for: Real products, SaaS applications, startups
  - Output: Deployable app with auth, database, API
  - Time to production: ~15 minutes

## Customization Tips

### For Prototyping
Focus on these inputs:
```yaml
appName: "YourAppName"
pages: [dashboard, projects, team]  # Pages to create
dataTheme: "saas"  # Type of mock data
primaryColor: "violet"  # Your brand color
```

### For Production
Configure these critical inputs:
```yaml
appName: "YourAppName"
features: [authentication, project_management, file_uploads]
authProviders: [google, github, email]
database:
  provider: "postgresql"
deployment:
  platform: "vercel"
```

## Workflow Examples

### Example 1: Quick Demo for Client
1. Use `prototyping/1-next-mockup.md`
2. Customize with client's branding
3. Get beautiful mockup in 5 minutes
4. Present interactive demo

### Example 2: Building a Real SaaS
1. Start with `prototyping/1-next-mockup.md` to validate UI
2. Once approved, use `production/1-next-full-stack.md`
3. Deploy to Vercel
4. Iterate based on user feedback

## Important Notes

- **Prototyping cartridges** generate frontend-only code with no backend
- **Production cartridges** generate complete applications with real databases
- Always customize the inputs section before running
- The AI will generate ALL files needed - be patient
- Run quality gates after generation to verify everything works

## Troubleshooting

**Issue:** AI doesn't generate all files
**Solution:** Ask: "Please continue generating the remaining files"

**Issue:** Generated code has errors
**Solution:** Ask: "Please fix the TypeScript/build errors"

**Issue:** Want to switch from prototype to production
**Solution:** Start fresh in a new folder with the production cartridge

## Next Steps

After generating your application:

### For Prototypes
1. Run `pnpm install && pnpm dev`
2. View at `http://localhost:3000`
3. Show to stakeholders
4. Iterate on design

### For Production
1. Set up `.env` with real values
2. Run database migrations
3. Configure OAuth providers
4. Deploy to Vercel
5. Set up monitoring

Happy building! 🚀

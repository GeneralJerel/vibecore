---
cartridge: true
name: "CRUD Resource (Full Stack)"
tier: production
stack: next-react-trpc-prisma
version: 2.0.0
owner: "@vibecore"
status: stable
---

# CRUD Resource (Full Stack) — v2.0.0

## Purpose
- **What:** Complete CRUD operations with database, API, and UI for a resource
- **For whom:** Teams building production data management features
- **When to use:** Creating admin panels, resource management, data-driven features

## Stack Contract (Hard Requirements)
- **Runtime:** node@20
- **Package Manager:** pnpm
- **Language:** typescript-strict
- **Framework/Router:** next@15 with App Router
- **UI & Styling:** react@18, tailwindcss@3, shadcn-ui
- **State & Data:** react-query@5, zustand
- **API Pattern:** tRPC@10 with full validation
- **ORM/Database:** prisma@5, postgres
- **Auth:** authjs@5 with RBAC
- **Testing:** vitest, playwright
- **Lint/Format/Build:** eslint-prettier
- **Repo Mode:** Inherited
- **Target/Hosting:** vercel

## Development Style
- **Branching:** Feature branches
- **Commit Convention:** Conventional Commits
- **PR Requirements:** Tests must pass, code review required
- **Testing Approach:** Unit + Integration + E2E tests
- **File/Folder Structure:** Domain-driven design

## Inputs
### Required
- `resourceName`: Resource name singular (string, PascalCase)
- `resourceNamePlural`: Resource name plural (string)
- `fields`: Array of field definitions with full specifications
- `permissions`: RBAC configuration
- `validation`: Comprehensive validation rules
- `relations`: Database relationships

### Optional
- `audit`: Audit logging (boolean, default: true)
- `softDelete`: Soft delete support (boolean, default: true)
- `versioning`: Version history (boolean, default: false)
- `search`: Full-text search config
- `export`: Export formats (csv|json|excel)
- `import`: Import capability (boolean, default: false)
- `realtime`: WebSocket updates (boolean, default: false)

## Outputs
### Files & Routes
- Complete Prisma schema with indexes
- tRPC routers with error handling
- React components with loading/error states
- Form validation with Zod
- Data tables with sorting/filtering
- Export/import functionality
- Audit trail UI
- API documentation

### Database
- Optimized schema with indexes
- Migration files
- Seed data
- Backup procedures
- Query optimization

### Tests
- Unit tests for utilities
- Integration tests for API
- E2E tests for user flows
- Performance tests
- Security tests

## Guardrails
### Allowed
- Optimistic updates
- Batch operations
- Advanced filtering
- Real-time sync
- File attachments

### Forbidden
- Direct DB access from client
- Unvalidated inputs
- Missing authorization
- N+1 queries
- Memory leaks
- SQL injection vulnerabilities

### Error Conditions
- Handle all database errors gracefully
- Implement retry logic
- Provide user-friendly error messages
- Log errors for debugging
- Alert on critical failures

## Steps the Agent Must Follow
1. Design and validate database schema
2. Create Prisma models with relationships
3. Run and verify migrations
4. Build comprehensive tRPC routers
5. Implement authorization middleware
6. Create React Query hooks
7. Build UI components with Radix/shadcn
8. Add form validation and error handling
9. Implement search and filtering
10. Add export/import functionality
11. Create audit logging
12. Write comprehensive tests
13. Add performance monitoring
14. Document API endpoints

## Quality Gates
### Local Validation
```bash
# Must all pass
pnpm prisma validate
pnpm prisma migrate dev
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm test:e2e
pnpm build
```

### Test Coverage
- Minimum 80% coverage overall
- 100% coverage for critical paths
- Performance benchmarks met
- Security scan passed

### Performance Requirements
- API response < 200ms (p95)
- UI interaction < 100ms
- Database queries < 50ms
- Bundle size impact < 50KB

## Integration Points
### Providers & Context
- SessionProvider for auth
- QueryClient for caching
- WebSocket for realtime

### Environment Variables
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
NEXT_PUBLIC_WS_URL=ws://...
```

### Middleware & Hooks
- `useResource()` - Main data hook
- `useResourceMutation()` - Mutations
- `useResourceSubscription()` - Real-time
- `useResourceExport()` - Export data
- `useResourceImport()` - Import data

### Dependencies on Other Cartridges
- Requires: next-baseline (production)
- Enhances: auth, notifications
- Integrates with: file-upload, audit-log

## Examples (Golden Implementation)

### Example 1: Complete tRPC Router
```typescript
// server/api/routers/[resource].ts
import { z } from 'zod';
import { 
  createTRPCRouter,
  protectedProcedure,
  enforceRateLimit,
  auditLog 
} from '~/server/api/trpc';

export const resourceRouter = createTRPCRouter({
  list: protectedProcedure
    .use(enforceRateLimit)
    .input(z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(20),
      search: z.string().optional(),
      filters: z.record(z.any()).optional(),
      sort: z.object({
        field: z.string(),
        order: z.enum(['asc', 'desc'])
      }).optional()
    }))
    .query(async ({ ctx, input }) => {
      const { page, limit, search, filters, sort } = input;
      
      // Build where clause with filters
      const where = buildWhereClause(filters, search);
      
      // Execute with transaction
      const result = await ctx.prisma.$transaction(async (tx) => {
        const [items, total] = await Promise.all([
          tx.resource.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: sort ? { [sort.field]: sort.order } : undefined,
            include: {
              _count: true,
              relations: true
            }
          }),
          tx.resource.count({ where })
        ]);
        
        return { items, total };
      });
      
      // Add to cache
      await ctx.cache.set(
        `resource:list:${JSON.stringify(input)}`,
        result,
        60
      );
      
      return {
        ...result,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit)
      };
    }),
    
  create: protectedProcedure
    .use(enforceRateLimit)
    .use(auditLog('resource.create'))
    .input(createResourceSchema)
    .mutation(async ({ ctx, input }) => {
      // Validate permissions
      await validatePermission(ctx, 'resource.create');
      
      // Create with audit trail
      const resource = await ctx.prisma.resource.create({
        data: {
          ...input,
          createdBy: ctx.session.user.id,
          updatedBy: ctx.session.user.id,
        }
      });
      
      // Trigger webhooks
      await ctx.webhooks.trigger('resource.created', resource);
      
      // Invalidate cache
      await ctx.cache.invalidate('resource:list:*');
      
      return resource;
    })
});
```

### Example 2: Advanced Data Table Component
```typescript
// components/resources/ResourceTable.tsx
import { useResourceList } from '~/hooks/useResource';

export function ResourceTable() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ field: 'createdAt', order: 'desc' });
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = useResourceList({
    page,
    limit: 20,
    filters,
    sort
  });
  
  if (error) {
    return <ErrorBoundary error={error} retry={() => window.location.reload()} />;
  }
  
  return (
    <div className="space-y-4">
      <FilterBar onFilterChange={setFilters} />
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {columns.map(column => (
              <TableHead
                key={column.id}
                onClick={() => handleSort(column.id)}
                className="cursor-pointer"
              >
                {column.label}
                <SortIndicator field={column.id} current={sort} />
              </TableHead>
            ))}
          </TableHeader>
          
          <TableBody>
            {isLoading ? (
              <SkeletonRows count={5} columns={columns.length} />
            ) : (
              data?.items.map(item => (
                <TableRow key={item.id}>
                  {/* Render cells */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Pagination
        page={page}
        totalPages={data?.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
```

## Anti-patterns
- **Don't:** Load all records at once
  **Do instead:** Implement pagination

- **Don't:** Trust client-side filtering
  **Do instead:** Filter on server with validation

- **Don't:** Expose internal IDs
  **Do instead:** Use UUIDs or slugs

- **Don't:** Skip audit logging
  **Do instead:** Log all data modifications

## Version History & Migration
### Changelog
- **v2.0.0**: Production-ready with full features
  - Complete error handling
  - Performance optimization
  - Security hardening
  - Audit logging
  - Real-time updates

### Migration from v1.0.0
1. Update schema with audit fields
2. Add migration for soft deletes
3. Implement permission checks
4. Add rate limiting
5. Enable audit logging

## Notes for AI Agents
- Implement comprehensive error handling
- Add loading states for all async operations
- Include keyboard shortcuts for power users
- Generate TypeScript types from Prisma schema
- Add JSDoc comments for all functions
- Implement proper connection pooling
- Use database transactions for consistency
- Add request ID tracking for debugging
- Include performance timing metrics
- Generate OpenAPI documentation
- Test with large datasets
- Implement proper cleanup in useEffect
- Add memory leak prevention
- Handle race conditions properly
- Include rollback procedures

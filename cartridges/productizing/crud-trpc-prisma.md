---
cartridge: true
name: "CRUD Resource (tRPC + Prisma)"
tier: productizing
stack: next-react-trpc-prisma
version: 1.0.0
owner: "@vibecore"
status: stable
---

# CRUD Resource (tRPC + Prisma) — v1.0.0

## Purpose
- **What:** Generate type-safe CRUD operations for a resource with tRPC and Prisma
- **For whom:** Teams building data-driven features with consistent patterns
- **When to use:** Creating new resources, admin panels, data management interfaces

## Stack Contract (Hard Requirements)
- **Runtime:** node@20
- **Package Manager:** pnpm
- **Language:** typescript-strict
- **Framework/Router:** next@15 with App Router
- **UI & Styling:** react@18, tailwindcss@3, shadcn-ui
- **State & Data:** react-query@5 for caching
- **API Pattern:** tRPC@10 with Zod validation
- **ORM/Database:** prisma@5, postgres
- **Auth:** authjs@5 for authorization
- **Testing:** vitest for API tests
- **Lint/Format/Build:** eslint-prettier
- **Repo Mode:** Inherited from base
- **Target/Hosting:** Inherited from base

## Development Style
- **Branching:** Feature branches
- **Commit Convention:** Conventional Commits
- **PR Requirements:** Tests must pass
- **Testing Approach:** API integration tests required
- **File/Folder Structure:** Domain-based organization

## Inputs
### Required
- `resourceName`: Resource name singular (string, PascalCase, e.g., "Project")
- `resourceNamePlural`: Resource name plural (string, e.g., "Projects")
- `fields`: Array of field definitions
  ```typescript
  {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'relation';
    required: boolean;
    unique?: boolean;
    default?: any;
    validation?: {
      min?: number;
      max?: number;
      pattern?: string;
      enum?: string[];
    };
    relation?: {
      to: string;
      type: 'one-to-one' | 'one-to-many' | 'many-to-many';
    };
  }[]
  ```
- `permissions`: RBAC configuration
  ```typescript
  {
    create: string[]; // roles that can create
    read: string[];   // roles that can read
    update: string[]; // roles that can update
    delete: string[]; // roles that can delete
  }
  ```

### Optional
- `softDelete`: Enable soft deletes (boolean, default: true)
- `audit`: Add audit fields (boolean, default: true)
- `search`: Searchable fields (string[], default: ['name'])
- `pagination`: Enable pagination (boolean, default: true)
- `filters`: Filterable fields (string[], default: all)
- `sorting`: Sortable fields (string[], default: ['createdAt'])
- `bulkOperations`: Enable bulk operations (boolean, default: false)

### Defaults
- Soft deletes enabled
- Audit fields (createdAt, updatedAt, createdBy, updatedBy)
- Pagination with 20 items per page
- Search on name fields
- Sort by creation date descending

## Outputs
### Files & Routes
- `/server/api/routers/{resourceName}.ts` - tRPC router with CRUD operations
- `/server/api/schemas/{resourceName}.ts` - Zod schemas for validation
- `/app/(app)/{resourceNamePlural}/page.tsx` - List view with table
- `/app/(app)/{resourceNamePlural}/[id]/page.tsx` - Detail view
- `/app/(app)/{resourceNamePlural}/new/page.tsx` - Create form
- `/app/(app)/{resourceNamePlural}/[id]/edit/page.tsx` - Edit form
- `/components/features/{resourceName}/` - Resource-specific components
- `/lib/hooks/use{ResourceName}.ts` - Custom hooks for data fetching

### Database
- Schema: Resource model with all fields
- Schema: Audit fields if enabled
- Migration: Create table and indexes
- Indexes: On foreign keys and searchable fields
- Seed: Example data for development

### Tests
- API route tests for all CRUD operations
- Permission tests for RBAC
- Validation tests for input schemas
- Edge case tests (not found, duplicates, etc.)

### Documentation
- API documentation with examples
- Type definitions exported

## Guardrails
### Allowed
- Optimistic updates with rollback
- Real-time updates via React Query
- Export to CSV/JSON
- Bulk import from CSV

### Forbidden
- Direct database access from client
- Unvalidated inputs
- Missing authorization checks
- Raw SQL queries
- Exposing internal IDs in URLs
- Client-side data filtering of sensitive data

### Error Conditions
- Missing required fields
- Duplicate unique fields
- Invalid foreign key references
- Unauthorized access attempts
- Rate limit exceeded

## Steps the Agent Must Follow
1. Define Prisma schema for the resource
2. Run Prisma migration to create tables
3. Create Zod schemas for validation
4. Implement tRPC router with CRUD operations
5. Add authorization checks to each operation
6. Create React Query hooks for data fetching
7. Build list view with sorting, filtering, and pagination
8. Create forms with client and server validation
9. Implement optimistic updates for better UX
10. Add error handling and loading states
11. Write comprehensive tests
12. Generate TypeScript types from Prisma schema

## Quality Gates
### Local Validation
```bash
pnpm prisma generate
pnpm prisma migrate dev
pnpm typecheck
pnpm test:api --grep={resourceName}
pnpm lint
```

### Test Coverage
- Minimum coverage: 80% for API routes
- Critical paths:
  - Create with valid data
  - Update with partial data
  - Delete (soft and hard)
  - List with pagination
  - Authorization for each operation

## Integration Points
### Providers & Context
- Uses SessionProvider for user context
- Uses QueryClient for caching
- Uses TRPCProvider for API calls

### Environment Variables
- Inherits from base cartridge

### Middleware & Hooks
- `useResource()` - List resources with filters
- `useResourceById()` - Get single resource
- `useCreateResource()` - Create mutation
- `useUpdateResource()` - Update mutation
- `useDeleteResource()` - Delete mutation

### Dependencies on Other Cartridges
- Requires: next-baseline (productizing or production)
- Enhances: auth-standard

## Examples (Golden Implementation)

### Example 1: tRPC Router with CRUD Operations
```typescript
// server/api/routers/project.ts
import { z } from 'zod';
import { 
  createTRPCRouter,
  publicProcedure,
  protectedProcedure 
} from '~/server/api/trpc';
import { 
  createProjectSchema,
  updateProjectSchema,
  projectFilterSchema 
} from '~/server/api/schemas/project';

export const projectRouter = createTRPCRouter({
  list: protectedProcedure
    .input(projectFilterSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, limit = 20, search, sortBy = 'createdAt', sortOrder = 'desc' } = input;
      
      const where = {
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
        deletedAt: null,
      };
      
      const [items, total] = await Promise.all([
        ctx.prisma.project.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { [sortBy]: sortOrder },
          include: {
            owner: {
              select: { id: true, name: true, email: true },
            },
          },
        }),
        ctx.prisma.project.count({ where }),
      ]);
      
      return {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    }),
    
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: { id: input.id, deletedAt: null },
        include: {
          owner: true,
          members: true,
          _count: {
            select: { tasks: true },
          },
        },
      });
      
      if (!project) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }
      
      // Check read permission
      const canRead = await checkPermission(ctx.session.user, 'project.read', project);
      if (!canRead) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to view this project',
        });
      }
      
      return project;
    }),
    
  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      // Check create permission
      const canCreate = await checkPermission(ctx.session.user, 'project.create');
      if (!canCreate) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to create projects',
        });
      }
      
      const project = await ctx.prisma.project.create({
        data: {
          ...input,
          ownerId: ctx.session.user.id,
          createdBy: ctx.session.user.id,
          updatedBy: ctx.session.user.id,
        },
      });
      
      // Invalidate cache
      await ctx.queryClient.invalidateQueries(['project.list']);
      
      return project;
    }),
    
  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      
      // Check update permission
      const existing = await ctx.prisma.project.findUnique({
        where: { id },
      });
      
      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }
      
      const canUpdate = await checkPermission(ctx.session.user, 'project.update', existing);
      if (!canUpdate) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to update this project',
        });
      }
      
      const project = await ctx.prisma.project.update({
        where: { id },
        data: {
          ...data,
          updatedBy: ctx.session.user.id,
          updatedAt: new Date(),
        },
      });
      
      return project;
    }),
    
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid(), hard: z.boolean().default(false) }))
    .mutation(async ({ ctx, input }) => {
      // Check delete permission
      const existing = await ctx.prisma.project.findUnique({
        where: { id: input.id },
      });
      
      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found',
        });
      }
      
      const canDelete = await checkPermission(ctx.session.user, 'project.delete', existing);
      if (!canDelete) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to delete this project',
        });
      }
      
      if (input.hard) {
        await ctx.prisma.project.delete({
          where: { id: input.id },
        });
      } else {
        await ctx.prisma.project.update({
          where: { id: input.id },
          data: {
            deletedAt: new Date(),
            deletedBy: ctx.session.user.id,
          },
        });
      }
      
      return { success: true };
    }),
});
```

### Example 2: React Query Hook with Optimistic Updates
```typescript
// lib/hooks/useProject.ts
import { api } from '~/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateProject() {
  const queryClient = useQueryClient();
  
  return api.project.create.useMutation({
    onMutate: async (newProject) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['project.list']);
      
      // Snapshot previous value
      const previousProjects = queryClient.getQueryData(['project.list']);
      
      // Optimistically update
      queryClient.setQueryData(['project.list'], (old: any) => {
        return {
          ...old,
          items: [{ ...newProject, id: 'temp-id', createdAt: new Date() }, ...old.items],
        };
      });
      
      return { previousProjects };
    },
    
    onError: (err, newProject, context) => {
      // Rollback on error
      queryClient.setQueryData(['project.list'], context?.previousProjects);
      toast.error('Failed to create project');
    },
    
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(['project.list']);
    },
    
    onSuccess: (data) => {
      toast.success('Project created successfully');
    },
  });
}
```

## Anti-patterns
- **Don't:** Fetch all records without pagination
  **Do instead:** Always paginate large datasets

- **Don't:** Filter sensitive data on client
  **Do instead:** Filter on server based on permissions

- **Don't:** Use sequential database calls
  **Do instead:** Use Promise.all for parallel queries

- **Don't:** Expose internal database IDs
  **Do instead:** Use UUIDs or public identifiers

## Version History & Migration
### Changelog
- **v1.0.0**: Production-ready CRUD operations
  - Full RBAC implementation
  - Optimistic updates
  - Comprehensive validation
  - Audit logging
  - Soft deletes

## Notes for AI Agents
- Always validate inputs on both client and server
- Include loading and error states in UI components
- Generate comprehensive tests for all operations
- Use optimistic updates for better perceived performance
- Include proper TypeScript types throughout
- Generate helpful error messages for validation failures
- Implement proper index management for performance
- Consider implementing cursor-based pagination for large datasets
- Add data export functionality if requested
- Include keyboard shortcuts for power users

## References
- [tRPC CRUD Patterns](https://trpc.io/docs/quickstart)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [React Query Optimistic Updates](https://tanstack.com/query/latest/docs/guides/optimistic-updates)

---
cartridge: true
name: "Next.js Baseline (Production Enterprise)"
tier: production
stack: next-react-trpc-prisma
version: 2.0.0
owner: "@vibecore"
status: stable
---

# Next.js Baseline (Production Enterprise) — v2.0.0

## Purpose
- **What:** Enterprise-grade Next.js application with full observability, security, and reliability
- **For whom:** Teams deploying mission-critical applications
- **When to use:** Production deployments, regulated environments, high-traffic applications

## Stack Contract (Hard Requirements)
- **Runtime:** node@20 LTS with security patches
- **Package Manager:** pnpm with strict peer deps
- **Language:** typescript-strict with custom rules
- **Framework/Router:** next@15 with App Router, ISR, and edge optimization
- **UI & Styling:** react@18, tailwindcss@3, shadcn-ui with custom theme
- **State & Data:** zustand with persistence, react-query@5 with caching strategy
- **API Pattern:** tRPC@10 with OpenAPI generation
- **ORM/Database:** prisma@5 with read replicas, postgres with connection pooling
- **Auth:** authjs@5 with MFA, rate limiting, and session management
- **Testing:** vitest, playwright, artillery for load testing
- **Lint/Format/Build:** eslint-prettier, biome as backup, turbopack
- **Repo Mode:** turborepo with shared packages
- **Target/Hosting:** vercel with edge functions, CDN, and WAF

## Development Style
- **Branching:** GitFlow with protected main, develop, and release branches
- **Commit Convention:** Conventional Commits enforced via commitizen
- **PR Requirements:** 2+ reviews, all checks passing, security scan, performance check
- **Testing Approach:** TDD, 90% coverage minimum, contract testing, load testing
- **File/Folder Structure:** Domain-driven design with bounded contexts

## Inputs
### Required
- `appName`: Application identifier (string, kebab-case, validated)
- `organization`: Organization name for telemetry (string)
- `domain`: Production domain for configuration (string, FQDN)
- `features`: Initial feature modules (array, validated against allowed list)
- `authProviders`: Authentication providers with config (object)
- `complianceMode`: Compliance requirements (GDPR|HIPAA|SOC2|none)

### Optional
- `primaryColor`: Brand color system (object with full palette)
- `designTokens`: Complete design system tokens (object)
- `featureFlags`: Initial feature flags (object)
- `rateLimit`: API rate limit config (object)
- `cacheStrategy`: Caching configuration (object)
- `monitoringLevel`: Telemetry detail (minimal|standard|detailed)

### Defaults
- APM with OpenTelemetry
- Error tracking with Sentry
- Analytics with privacy-first approach
- Security headers enabled
- OWASP compliance

## Outputs
### Files & Routes
- Multi-tenant architecture support
- Feature flag system with LaunchDarkly/Unleash
- API versioning with deprecation notices
- GraphQL/REST adapter layers for tRPC
- Admin dashboard with RBAC
- Health check and readiness endpoints
- OpenAPI documentation auto-generated

### Database
- Multi-schema setup for tenant isolation
- Audit log tables with compliance fields
- Soft deletes with recovery capability
- Database migrations with rollback plan
- Read replica configuration
- Connection pool optimization
- Backup and restore procedures

### Tests
- Unit tests with 90% coverage
- Integration tests for all API endpoints
- E2E tests for critical user journeys
- Performance tests with Artillery
- Security tests with OWASP ZAP
- Accessibility tests with axe-core
- Visual regression tests with Percy
- Contract tests for API consumers

### Documentation
- Technical architecture document
- API reference with examples
- Runbook for operations
- Security compliance checklist
- Performance optimization guide
- Disaster recovery plan
- Deployment procedures

## Guardrails
### Allowed
- Approved npm packages only (via allow-list)
- Specific Node.js APIs
- Validated third-party services
- Approved CDN endpoints

### Forbidden
- Direct database access from frontend
- Synchronous external API calls
- Unencrypted data transmission
- Console.* in any environment
- Dynamic requires or eval
- Prototype pollution vectors
- Any packages with known vulnerabilities
- Client-side environment secrets
- Pages Router
- Non-approved state management
- Direct file system access in edge functions

### Error Conditions
- No test coverage below 90%
- Security vulnerabilities in dependencies
- Performance regression >10%
- Accessibility score <95
- Missing error boundaries
- Unhandled promise rejections
- Missing rate limiting
- No input validation
- Missing CORS configuration
- No CSP headers

## Steps the Agent Must Follow
1. Set up monorepo structure with Turborepo
2. Initialize Next.js with enterprise configuration
3. Configure multi-environment setup (dev/staging/prod)
4. Implement security headers and CSP
5. Set up observability with OpenTelemetry
6. Configure structured logging with correlation IDs
7. Implement authentication with MFA and session management
8. Set up authorization with RBAC and permissions
9. Configure database with read replicas and pooling
10. Implement caching strategy (Redis/Edge/CDN)
11. Set up feature flags with gradual rollout
12. Implement rate limiting and DDoS protection
13. Configure error handling and recovery
14. Set up monitoring and alerting
15. Implement health checks and graceful shutdown
16. Configure CI/CD with security scanning
17. Set up load balancing and auto-scaling
18. Implement backup and disaster recovery
19. Configure APM and distributed tracing
20. Document all architectural decisions

## Quality Gates
### Local Validation
```bash
# All must pass with zero warnings
pnpm audit --audit-level=moderate
pnpm lint:strict
pnpm typecheck:strict
pnpm test:unit --coverage
pnpm test:integration
pnpm test:e2e
pnpm test:security
pnpm test:accessibility
pnpm test:performance
pnpm build:production
pnpm analyze:bundle
```

### Test Coverage
- Minimum coverage: 90% overall, 95% for critical paths
- Branch coverage: 85% minimum
- Critical paths requiring 100% coverage:
  - Authentication and authorization
  - Payment processing
  - Data validation and sanitization
  - Error recovery mechanisms
  - Security boundaries

### Performance Budget
- Lighthouse scores: all >95
- Core Web Vitals:
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1
  - INP: <200ms
- Bundle size: <200KB initial JS
- API response time: p50<100ms, p99<1s
- Database query time: p50<10ms, p99<100ms

### Security Requirements
- OWASP Top 10 compliance
- Security headers score: A+
- CSP implementation: strict
- No high/critical vulnerabilities
- Secrets rotation: 90 days
- PCI DSS compliance if handling payments
- GDPR compliance for EU users

## Integration Points
### Providers & Context
```typescript
// Strictly ordered provider hierarchy
<SecurityProvider>
  <TelemetryProvider>
    <ErrorBoundary>
      <AuthProvider>
        <FeatureFlagProvider>
          <ThemeProvider>
            <QueryClientProvider>
              <TRPCProvider>
                {children}
              </TRPCProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </FeatureFlagProvider>
      </AuthProvider>
    </ErrorBoundary>
  </TelemetryProvider>
</SecurityProvider>
```

### Environment Variables
```env
# Core (Required)
NODE_ENV=production
APP_ENV=production|staging|development
DATABASE_URL=postgresql://...
DATABASE_URL_REPLICA=postgresql://...
REDIS_URL=redis://...

# Security (Required)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<min-32-chars>
ENCRYPTION_KEY=<base64-encoded>
SESSION_DURATION=3600
MFA_ISSUER=YourApp

# Observability (Required)
OTEL_EXPORTER_OTLP_ENDPOINT=
SENTRY_DSN=
SENTRY_ENVIRONMENT=
LOG_LEVEL=info|debug|warn|error

# Feature Flags (Required)
FEATURE_FLAG_SERVICE=launchdarkly|unleash
FEATURE_FLAG_SDK_KEY=

# Rate Limiting (Required)
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# External Services
AWS_REGION=
S3_BUCKET=
CLOUDFRONT_DISTRIBUTION=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Monitoring
DATADOG_API_KEY=
NEW_RELIC_LICENSE_KEY=
GRAFANA_ENDPOINT=
```

### Middleware & Hooks
- Security middleware (CSP, CORS, rate limiting)
- Authentication middleware with MFA
- Authorization middleware with RBAC
- Request ID injection
- Distributed tracing headers
- Request/response logging
- Performance monitoring
- Error recovery middleware
- Circuit breaker for external services

### Dependencies on Other Cartridges
- Requires: security-headers, observability-opentelemetry
- Composes with: payment-processing, multi-tenant, websocket-realtime
- Conflicts with: prototype cartridges

## Examples (Golden Implementation)

### Example 1: Secure API Endpoint with Full Observability
```typescript
// server/api/routers/secure.ts
import { z } from 'zod';
import { 
  createTRPCRouter,
  protectedProcedure,
  rateLimitedProcedure,
} from '~/server/api/trpc';
import { trace, SpanStatusCode } from '@opentelemetry/api';
import { logger } from '~/lib/logger';
import { metrics } from '~/lib/metrics';
import { cache } from '~/lib/cache';

const tracer = trace.getTracer('api.secure');

export const secureRouter = createTRPCRouter({
  sensitiveOperation: rateLimitedProcedure
    .meta({ 
      requiredPermissions: ['admin.write'],
      auditLog: true,
    })
    .input(z.object({
      userId: z.string().uuid(),
      action: z.enum(['update', 'delete']),
      data: z.record(z.unknown()),
    }).strict())
    .mutation(async ({ ctx, input }) => {
      const span = tracer.startSpan('secure.sensitiveOperation');
      const startTime = performance.now();
      
      try {
        // Check cache first
        const cacheKey = `sensitive:${input.userId}:${input.action}`;
        const cached = await cache.get(cacheKey);
        if (cached && input.action === 'update') {
          span.addEvent('cache_hit');
          metrics.increment('cache.hit');
          return cached;
        }
        
        // Validate permissions
        span.addEvent('checking_permissions');
        const hasPermission = await ctx.auth.checkPermission(
          ctx.session.user.id,
          'admin.write',
          input.userId
        );
        
        if (!hasPermission) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Insufficient permissions',
          });
        }
        
        // Execute operation with transaction
        const result = await ctx.prisma.$transaction(async (tx) => {
          // Audit log entry
          await tx.auditLog.create({
            data: {
              userId: ctx.session.user.id,
              action: input.action,
              targetId: input.userId,
              metadata: input.data,
              ipAddress: ctx.req.ip,
              userAgent: ctx.req.headers['user-agent'],
            },
          });
          
          // Perform actual operation
          if (input.action === 'delete') {
            return await tx.user.update({
              where: { id: input.userId },
              data: { 
                deletedAt: new Date(),
                deletedBy: ctx.session.user.id,
              },
            });
          } else {
            return await tx.user.update({
              where: { id: input.userId },
              data: input.data,
            });
          }
        });
        
        // Update cache
        await cache.set(cacheKey, result, 300); // 5 minutes
        
        // Record metrics
        const duration = performance.now() - startTime;
        metrics.histogram('api.duration', duration, {
          operation: 'sensitiveOperation',
          action: input.action,
        });
        
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
        
      } catch (error) {
        span.setStatus({ 
          code: SpanStatusCode.ERROR,
          message: error.message,
        });
        
        logger.error('Sensitive operation failed', {
          error,
          input,
          userId: ctx.session.user.id,
          correlationId: ctx.correlationId,
        });
        
        metrics.increment('api.error', {
          operation: 'sensitiveOperation',
          code: error.code || 'UNKNOWN',
        });
        
        throw error;
      } finally {
        span.end();
      }
    }),
});
```

### Example 2: Feature Flag with Gradual Rollout
```typescript
// lib/feature-flags.ts
import { createContext, useContext } from 'react';
import LaunchDarkly from 'launchdarkly-node-server-sdk';

class FeatureFlags {
  private client: LaunchDarkly.LDClient;
  
  async initialize() {
    this.client = LaunchDarkly.init(process.env.LAUNCH_DARKLY_SDK_KEY!, {
      logger: logger,
      diagnosticOptOut: false,
      sendEvents: true,
      flushInterval: 10,
    });
    
    await this.client.waitForInitialization();
  }
  
  async evaluate(
    flag: string,
    user: { id: string; email?: string; groups?: string[] },
    defaultValue: any
  ): Promise<any> {
    const span = tracer.startSpan('feature_flag.evaluate');
    
    try {
      const context = {
        kind: 'user',
        key: user.id,
        email: user.email,
        custom: {
          groups: user.groups || [],
          tier: user.tier || 'free',
        },
      };
      
      const value = await this.client.variation(
        flag,
        context,
        defaultValue
      );
      
      metrics.increment('feature_flag.evaluation', {
        flag,
        value: String(value),
      });
      
      return value;
    } finally {
      span.end();
    }
  }
}

export const featureFlags = new FeatureFlags();
```

## Anti-patterns
- **Don't:** Use synchronous operations in API routes
  **Do instead:** Use async/await with proper error handling

- **Don't:** Store PII in logs
  **Do instead:** Use structured logging with PII redaction

- **Don't:** Implement custom crypto
  **Do instead:** Use established libraries (crypto, bcrypt)

- **Don't:** Trust client-side validation
  **Do instead:** Always validate on server with Zod

- **Don't:** Use mutable global state
  **Do instead:** Use dependency injection and context

- **Don't:** Ignore error boundaries
  **Do instead:** Implement at every level with fallbacks

## Version History & Migration
### Changelog
- **v2.0.0**: Enterprise production version
  - Multi-tenant architecture
  - Full observability stack
  - Advanced security features
  - Compliance frameworks
  - Performance optimization
  - Disaster recovery

### Breaking Changes
- v1.0.0 → v2.0.0: 
  - New provider hierarchy required
  - Database schema includes audit fields
  - Environment variables restructured
  - Monorepo structure mandatory

### Migration Guide
From v1.0.0 to v2.0.0:
1. Set up new monorepo structure
2. Migrate to new database schema with audit tables
3. Update all environment variables
4. Implement new provider hierarchy
5. Add observability instrumentation
6. Configure feature flags
7. Set up monitoring and alerting
8. Run security audit
9. Performance testing
10. Update CI/CD pipelines

## Notes for AI Agents
- **Critical**: Every operation must have error handling, logging, and metrics
- Generate comprehensive tests for all code paths
- Include distributed tracing in all async operations
- Implement circuit breakers for external dependencies
- Use dependency injection for testability
- Generate OpenAPI specs for all endpoints
- Include performance hints (React.memo, useMemo, etc.)
- Implement progressive enhancement
- Follow SOLID principles strictly
- Generate ADRs for architectural decisions
- Include rollback procedures for all changes
- Implement feature flags for gradual rollouts
- Use structured logging with correlation IDs
- Generate runbooks for operational procedures

## References
- [Next.js Enterprise Guide](https://nextjs.org/docs/deployment)
- [OWASP Security Checklist](https://owasp.org/www-project-application-security-verification-standard/)
- [OpenTelemetry Best Practices](https://opentelemetry.io/docs/best-practices/)
- [12 Factor App](https://12factor.net/)
- [Production Readiness Checklist](https://gruntwork.io/devops-checklist/)

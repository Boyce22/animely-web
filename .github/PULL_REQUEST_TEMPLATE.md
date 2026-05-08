## Description

<!-- Briefly describe the purpose of this PR. What does it do and why? -->

## Type of Change

- [ ] Feature
- [ ] Bugfix
- [ ] Refactor
- [ ] Performance
- [ ] Dependencies
- [ ] CI / Infra
- [ ] Documentation

## Frontend Change Detection

<!-- The CI performance gate automatically detects frontend file changes.
Only check this box if you are certain this PR touches NO frontend code. -->

- [ ] This PR contains **no** frontend file changes (skip performance gate)

## Performance Checklist (for frontend changes)

<!-- If this PR touches frontend files, fill this checklist.
The performance gate will block merge until PerfEngineer approves. -->

- [ ] Bundle size impact assessed (check CI `gate/performance-review` status)
- [ ] Code splitting / lazy loading used for new route-level components
- [ ] No unnecessary re-renders introduced (checked with React DevTools Profiler)
- [ ] Heavy dependencies justified or replaced with lighter alternatives
- [ ] Data fetching uses built-in caching (`staleTime`, `gcTime` in TanStack Query)
- [ ] No N+1 queries in data fetching hooks
- [ ] API responses use cache headers (ETag / Cache-Control)
- [ ] Performance reviewer assigned

## Testing

- [ ] Unit tests added / updated
- [ ] Tests pass locally (`npm test`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build passes (`npm run build`)

## Screenshots (if applicable)

<!-- Add screenshots for UI changes. -->

## Related Issues

<!-- List related issues, e.g. "Closes TSUAA-X" or "Related to TSUAA-Y". -->

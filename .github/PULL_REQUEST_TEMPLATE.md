## Description

<!-- Describe what this PR does and why. -->

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Performance improvement
- [ ] Refactoring
- [ ] Documentation
- [ ] CI/CD
- [ ] Other: <!-- describe -->

## Performance Impact Statement

<!-- REQUIRED for all PRs. PerfEngineer reviews this section. -->

- **Bundle size impact:** <!-- e.g., +12 KB (+2%), No change, N/A (backend) -->
- **Render impact:** <!-- e.g., New lazy-loaded component, No new renders, N/A -->
- **Core Web Vitals risk:** <!-- e.g., Low (CSS-only change), Medium (new page), High (new heavy component) -->
- **Caching strategy:** <!-- e.g., React Query staleTime 5min, HTTP Cache-Control, N/A -->

## Testing

- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] Performance profile reviewed (flamegraph / Lighthouse)
- [ ] Bundle size compared to base branch

## Screenshots

<!-- If applicable, add screenshots or screen recordings. -->

## Checklist

- [ ] Code follows project conventions
- [ ] No console.log or debug code left in
- [ ] Imports are tree-shakeable (no side-effect imports)
- [ ] New dependencies justified (no duplicate functionality)
- [ ] This PR follows [Git Flow](../../docs/GIT_FLOW.md) — targeting correct branch

---

**PerfEngineer review required for frontend changes.**
See [PERFORMANCE_GATE.md](docs/PERFORMANCE_GATE.md) for review criteria.

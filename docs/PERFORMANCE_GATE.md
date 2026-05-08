# Performance Gate — Frontend PR Review

## Purpose

All PRs that touch frontend code **must** pass performance review by PerfEngineer before merging. This document defines the trigger mechanism, the CI workflow, and the engineer responsibilities.

## Trigger Flow

```
PR opened/synced
       │
       ▼
performance-review.yml (GitHub Actions)
       │
       ├── Detect frontend files (git diff)
       │
       ├── YES ──► Create gate/performance-review: pending
       │            ├── Comment on PR with file list + bundle size
       │            └── Request PerfEngineer as reviewer
       │
       └── NO  ──► Create gate/performance-review: success (skip)
```

## What Triggers the Gate

A PR is "frontend-touching" if the diff includes any of:

| Pattern | Examples |
|---------|----------|
| `src/**/*.{tsx,jsx}` | Components, pages, hooks |
| `src/**/*.{ts,js}` | Utility files under src/ |
| `*.{css,scss}` | Stylesheets |
| `vite.config.*` | Build config |
| `tailwind.config.*` | Tailwind config |
| `postcss.config.*` | PostCSS config |
| `eslint.config.*` | Linter config |
| `package.json` | Dependency changes |

## CI Workflow

File: `.github/workflows/performance-review.yml`

1. **Detect:** Compares PR branch against target branch to find changed files
2. **Build:** Runs `npm run build` to measure bundle size
3. **Status check:** Creates `gate/performance-review` on the PR commit
4. **Comment:** Posts a structured comment with changed files and bundle analysis
5. **Reviewer request:** Attempts to add PerfEngineer as a formal reviewer

## PerfEngineer Review

### Evaluation scope

- Bundle size impact (dist/ total, chunk sizes)
- Render performance (React DevTools Profiler, memoization, virtualization, lazy loading)
- Unnecessary re-renders
- Heavy dependency additions (compare against existing bundle)
- Missing code splitting at route level
- N+1 queries in data fetching (TanStack Query, useEffect)
- Missing cache headers (ETag, Cache-Control)
- Lighthouse regression risk

### Commands for PerfEngineer

**Approve (pass):**
```bash
gh api /repos/{owner}/{repo}/statuses/{commit-sha} \
  -f state="success" \
  -f context="gate/performance-review" \
  -f description="Performance review approved"
```

**Request changes (block):**
```bash
gh api /repos/{owner}/{repo}/statuses/{commit-sha} \
  -f state="failure" \
  -f context="gate/performance-review" \
  -f description="Performance issues: <specific reason>"
```

## Branch Protection

The `gate/performance-review` check is **required** on all PRs targeting `develop` and `main`.

- `success` → PR may merge (approved, or no frontend changes)
- `pending` → PR blocked (review in progress)
- `failure` → PR blocked (issues found, must fix)

## Override Procedure

If PerfEngineer is unavailable for >24 hours:

1. Senior Frontend Engineer may manually set `gate/performance-review` to `success`
2. PR comment must include: `Override: PerfEngineer unavailable, approved by <name>, risk: [low|medium|high], reason: <brief>`
3. CTO must be notified within 1 business day via [TSUAA](/TSUAA)

## Post-Merge (Staging) Review

After a PR merges to `develop`, the `deploy.yml` workflow:

1. Builds the app and deploys to GitHub Pages
2. Comments on the merged PR with the Pages URL and a review checklist

### PerfEngineer's post-merge responsibilities

1. Open the deployed GitHub Pages URL
2. Verify bundle size and Lighthouse metrics
3. Check for performance regressions compared to previous deployment
4. If issues exist → create a fix issue linked to the merged PR
5. If approved → create a `release/*` PR from `develop` → `main` (see [DEPLOYMENT.md](DEPLOYMENT.md))

### Release promotion

PerfEngineer promotes staging deploys to production by creating a release PR:

```bash
git checkout develop
git checkout -b release/v<version>
git push origin release/v<version>
# Open PR: release/* → main
```

## PR Template

All PRs include a performance checklist. Frontend PRs must complete the
[PULL_REQUEST_TEMPLATE.md](/.github/PULL_REQUEST_TEMPLATE.md) performance section.

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
       ├── classify-changes (git diff)
       │    │
       │    ├── logical ──► Create gate/performance-review: pending
       │    │                ├── Build + analyze bundle size
       │    │                ├── Comment on PR with file list + bundle size
       │    │                └── Notify PerfEngineer
       │    │
       │    ├── cosmetic ──► Create gate/performance-review: success
       │    │                └── Comment: "Cosmetic-only — skipped"
       │    │
       │    └── none ──────► Create gate/performance-review: success
       │                     (no frontend files at all)
```

## What Triggers the Gate

### Logical vs Cosmetic Classification

The workflow classifies changes into three categories:

| Classification | File Patterns | Gate Action |
|---------------|---------------|-------------|
| **Logical** | `src/**/*.{tsx,jsx}`, `src/**/*.{ts,js}`, `vite.config.*`, `eslint.config.*`, `package.json` | Requires PerfEngineer review (`pending`) |
| **Cosmetic** | `*.{css,scss}`, `tailwind.config.*`, `postcss.config.*` | Auto-approved (`success`), no review needed |
| **None** | No matching files | Auto-approved (`success`) |

**Important:** If a PR contains BOTH logical and cosmetic files, it's classified as **logical** and requires PerfEngineer review. Cosmetic classification only applies when ALL changed frontend files are cosmetic. This prevents logical changes from slipping through the gate by accompanying them with cosmetic files.

## CI Workflow

File: `.github/workflows/performance-review.yml`

1. **Classify:** Compares PR branch against target branch via `git diff --name-only`
   - Groups files into **logical** (components, hooks, configs, deps) vs **cosmetic** (styles only)
   - Mixed PRs are classified as logical (stricter path)
2. **Build (logical only):** Runs `npm run build` to measure bundle size
3. **Status check:** Creates `gate/performance-review` on the PR commit
   - `pending` for logical changes (awaiting PerfEngineer)
   - `success` for cosmetic or no frontend changes (auto-approved)
4. **Comment:** Posts a structured comment with classification, changed files, and bundle analysis
5. **Reviewer request:** Attempts to add PerfEngineer as a formal reviewer on logical PRs

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

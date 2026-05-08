# Workflow Playbook — TSUAA Pipeline

This playbook documents the complete TSUAA workflow from feature branch to production deployment, including gates, reviews, and failure recovery.

## Overview Diagram

```
                         FEATURE DEVELOPMENT
                               │
   Engineer                   ▼
   ┌──────────┐    ┌──────────────────────┐
   │feature/* │    │ 1. Create feature    │
   │ branch   │───►│    branch from develop│
   └──────────┘    └──────────┬───────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │ 2. Open PR to        │
                    │    develop/main      │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  performance-review  │
                    │       .yml           │
                    │                      │
                    │  ┌─────────────────┐ │
                    │  │ detect frontend │ │
                    │  │    changes?     │ │
                    │  └───┬─────────┬───┘ │
                    │      │YES      │NO   │
                    │      ▼         ▼     │
                    │  ┌────────┐ ┌──────┐│
                    │  │ gate:  │ │ gate:││
                    │  │pending │ │success││
                    │  └───┬────┘ └──┬───┘│
                    └──────┼─────────┼────┘
                           │         │
              ┌────────────▼──┐      │
              │  PerfEngineer │      │
              │    reviews    │      │
              │               │      │
              │  ┌─────────┐  │      │
              │  │ approve?│  │      │
              │  └──┬───┬──┘  │      │
              │     │YES│NO   │      │
              │     │   ▼     │      │
              │     │ ┌─────┐ │      │
              │     │ │ fix │ │      │
              │     │ │loop │ │      │
              │     │ └──┬──┘ │      │
              └─────┼────┼────┘      │
                    │    │           │
                    ▼    │           │
            ┌──────────┐│           │
            │ 3. Merge ││           │
            │ develop  │◄───────────┘
            └────┬─────┘
                 │
                 ▼
         ┌───────────────┐
         │   deploy.yml  │
         │ (develop=auto) │
         │                │
         │  ┌──────────┐  │
         │  │ build &  │  │
         │  │ deploy   │  │
         │  │(Pages)   │  │
         │  └────┬─────┘  │
         └───────┼────────┘
                 │
      ┌──────────▼──────────┐
      │ 4. Post-deploy      │
      │    verification     │
      │                     │
      │  ┌───────────────┐  │
      │  │ PerfEngineer  │  │
      │  │ staging review│  │
      │  └───┬───────────┘  │
      │      │              │
      │  ┌───▼──────────┐   │
      │  │  approved?   │   │
      │  └──┬────────┬──┘   │
      │     │YES     │NO    │
      └─────┼────────┼──────┘
            │        │
            ▼        ▼
   ┌────────────┐  ┌──────────┐
   │ 5. Release │  │ fix PR   │
   │  develop→  │  │  loop    │
   │   main     │  └──────────┘
   └─────┬──────┘
         │
         ▼
   ┌─────────────────────┐
   │ 6. DevSecOps        │
   │    approves +       │
   │    triggers prod    │
   │    deploy           │
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │ 7. Deploy to        │
   │    production       │
   │                     │
   │ deploy.yml (main)   │
   │ workflow_dispatch   │
   └──────────┬──────────┘
              │
   ┌──────────▼──────────┐
   │    Deploy OK?       │
   └──────┬──────────┬───┘
          │YES       │NO
          ▼          ▼
   ┌──────────┐ ┌───────────────┐
   │    ✅    │ │ 8. Rollback + │
   │  DONE    │ │  reassign to  │
   └──────────┘ │  engineer     │
                └───────────────┘
```

## Roles and Responsibilities

| Role | Scope | Responsibilities |
|------|-------|------------------|
| **Engineer** (any) | Feature implementation | Creates feature branches, opens PRs, fixes review feedback, resolves deploy failures |
| **PerfEngineer** | Performance quality | Reviews logical changes for performance, approves/blocks the performance gate, post-merge staging review, creates release PRs |
| **DevSecOps** | Deploy gatekeeping | Sole gatekeeper for production deploys (via `workflow_dispatch`), reviews deploy readiness, manages rollbacks, monitors infra health |
| **CTO** | Architecture governance | Enforces Git Flow, approves architectural decisions, handles overrides and escalations |

### Interaction Matrix

| From / To | Engineer | PerfEngineer | DevSecOps | CTO |
|-----------|----------|-------------|-----------|-----|
| **Engineer** | — | Requests perf review via PR | — | Escalates blocks |
| **PerfEngineer** | Returns PR with issues | — | Promotes to production via release PR | Requests override when blocked |
| **DevSecOps** | Reassigns failed deploys | — | — | Reports deployment incidents |
| **CTO** | Assigns corrective tasks | Assigns review tasks | Assigns infra tasks | — |

## Step-by-Step Flow

### 1. Engineer Creates Feature Branch and Opens PR

```bash
git checkout develop
git pull origin develop
git checkout -b feature/TSUAA-XX-short-description
# implement changes
git add .
git commit -m "feat: description"
git push origin feature/TSUAA-XX-short-description
```

Open a PR targeting `develop` (or `main` for hotfixes). Fill out the PR template completely, including the performance checklist.

### 2. CI Runs Performance Gate

| Workflow | `.github/workflows/performance-review.yml` |
|----------|---------------------------------------------|
| Trigger | PR opened, synchronized, or reopened targeting `develop` or `main` |
| Input | PR diff (detects frontend file changes) |
| Output | `gate/performance-review` status check on PR commit |

**How detection works:** The workflow runs `git diff` between the PR branch and the target, then checks for frontend-adjacent file patterns (`src/**/*.{tsx,jsx}`, `src/**/*.{ts,js}`, `*.css`, `vite.config.*`, `tailwind.config.*`, `package.json`, etc.).

**Cosmetic changes** (no frontend files touched): Gate auto-passes with `success`. PR proceeds to code review only.

**Logical changes** (frontend files detected): Gate set to `pending`. PerfEngineer is requested as reviewer and receives an automated PR comment listing changed files and bundle size analysis.

### 3. Code Review + PerfEngineer Approval → Merge to Develop

PerfEngineer reviews the PR for:
- Bundle size impact (compare `dist/` output against baseline)
- Render performance (React DevTools Profiler, memoization, virtualization, lazy loading)
- Unnecessary re-renders
- Heavy dependency additions
- Missing code splitting at route level
- N+1 queries in data fetching (TanStack Query, `useEffect`)
- Cache headers (ETag, Cache-Control)
- Lighthouse regression risk

**Approve:** PerfEngineer sets `gate/performance-review` to `success`:
```bash
gh api /repos/{owner}/{repo}/statuses/{commit-sha} \
  -f state="success" \
  -f context="gate/performance-review" \
  -f description="Performance review approved"
```

**Block:** PerfEngineer sets `gate/performance-review` to `failure` with a specific reason. Engineer fixes and pushes new commits — the gate auto-resets to `pending` for re-review.

Once the gate is `success` AND code review is approved, merge the PR to `develop`.

### 4. Deploy to Staging (Auto)

On push to `develop`, `deploy.yml` triggers automatically:

| Step | Action |
|------|--------|
| Git Flow check | Skipped on `develop` (applies only to `main` workflow_dispatch) |
| Setup Pages | Configures GitHub Pages deployment settings |
| Install + Build | `npm ci` → `npm run build` |
| SPA fallback | Copies `dist/index.html` → `dist/404.html` for client-side routing |
| Upload artifact | Uploads `./dist` as GitHub Pages artifact |
| Deploy | Deploys to GitHub Pages via `actions/deploy-pages` |
| Notify | Automated comment on merged PR with Pages URL, PerfEngineer checklist, and DevSecOps staging-live notice |

### 5. Post-Deploy Verification

After staging deploy, PerfEngineer:
1. Opens the deployed Pages URL from the automated PR comment
2. Runs Lighthouse on key pages
3. Verifies bundle size and checks for performance regressions

**Issues found:** PerfEngineer creates a new issue with findings, links the merged PR, and notifies the engineer.

**Approved:** PerfEngineer proceeds to create the release PR.

### 6. Release PR: develop → main

PerfEngineer creates the release branch:

```bash
git checkout develop
git checkout -b release/v<version>
git push origin release/v<version>
```

Open a PR from `release/*` → `main`. Include:
- List of changes since the last release
- Performance report (bundle comparison, Lighthouse scores)
- Any known risks or post-deploy monitors

Per [Git Flow](GIT_FLOW.md), only `release/*` and `hotfix/*` branches may merge into `main`.

### 7. DevSecOps Triggers Production Deploy

Production deploys are **gated behind DevSecOps**. After the release PR merges to `main`:

1. **No auto-deploy on main** — production uses `workflow_dispatch` only
2. DevSecOps reviews deploy readiness:
   - PerfEngineer sign-off is complete
   - All CI checks passed on `main`
   - Git Flow check passes (main not ahead of develop)
3. DevSecOps triggers the deploy:

```bash
gh workflow run deploy.yml --ref main
```

Or via GitHub UI: `Actions → Deploy to GitHub Pages → Run workflow → main`

### 8. Deploy to Production

On the `workflow_dispatch` trigger for `main`, `deploy.yml` runs:

| Step | Action |
|------|--------|
| Git Flow check | Verifies `main` is not ahead of `develop` (blocks deploy if violated) |
| Setup Pages | Configures GitHub Pages deployment settings |
| Install + Build | `npm ci` → `npm run build` |
| SPA fallback | Copies `dist/index.html` → `dist/404.html` |
| Upload artifact | Uploads `./dist` as GitHub Pages artifact |
| Deploy | Deploys to GitHub Pages via `actions/deploy-pages` |

### 9. Rollback and Reassignment (Deploy Failure)

If any deploy (staging or production) fails, the responsible party:
1. Records the failure reason from GitHub Actions logs
2. Rolls back (re-deploy the last successful commit via `workflow_dispatch`)
3. Reassigns the fix to the engineer responsible for the failing change
4. Posts a summary comment on the relevant PR with error context

## Failure Scenarios

### Performance Gate Fails

```
PR opened
    │
    ▼
gate/performance-review: failure
    │
    ▼
Engineer reads PerfEngineer comment with specific issues
    │
    ▼
Engineer fixes issues locally
    │
    ▼
git commit -m "fix: address perf review"
git push
    │
    ▼
gate/performance-review: pending (auto-reset on new commit)
    │
    ▼
PerfEngineer re-reviews → approve or iterate
```

**Resolution steps:**
1. Read the `gate/performance-review` failure description in the PR comment
2. Fix the specific issues (bundle size, re-renders, N+1 queries, etc.)
3. Push new commits — the gate auto-resets to `pending`
4. Request re-review from PerfEngineer

### Deploy Fails

```
deploy.yml runs
    │
    ▼
Build or deploy step fails
    │
    ▼
┌──────────────────────────────────────┐
│ Response:                            │
│ 1. Log failure from Actions          │
│ 2. Re-deploy last successful build   │
│ 3. Reassign issue to engineer        │
│ 4. Comment on PR with error context  │
└──────────────────────────────────────┘
    │
    ▼
Engineer investigates failure
    │
    ▼
Fix applied → new commit pushed
    │
    ▼
Deploy retries (auto on develop, DevSecOps-triggered on main)
```

**Manual rollback (frontend — GitHub Pages):**
1. Go to `Actions` → `Deploy to GitHub Pages`
2. Click `Run workflow`
3. Select branch to redeploy
4. Click `Run workflow`

**Manual rollback (backend — VPS):**
```bash
ssh $VPS_USER@$VPS_HOST
docker compose -f /opt/app/docker-compose.prod.yml down api
docker compose -f /opt/app/docker-compose.prod.yml pull api
docker compose -f /opt/app/docker-compose.prod.yml up -d api
```

### Git Flow Violation

```
deploy.yml triggered on main
    │
    ▼
check-git-flow job runs
    │
    ▼
ERROR: main has commits not in develop
    │
    ▼
Deploy blocked — DevSecOps notified
```

**Symptom:** CI fails with `"main has commits not in develop — Git Flow violation"`.

**Root causes:**
- Hotfix merged to `main` without merging back to `develop`
- Direct commit to `main`
- `main` was force-pushed ahead of `develop`

**Resolution:**
```bash
git checkout develop
git merge main
git push origin develop
```

**Prevention:** All agents install the pre-push hook (see [GIT_FLOW.md](GIT_FLOW.md)). CTO audits branches weekly.

## Command Reference

### Git Flow Verification

Check if `main` is ahead of `develop`:

```bash
git log --oneline --left-right main...develop
```

`<` prefix = commits on `main` not in `develop` → **violation**.

Fix:

```bash
git checkout develop
git merge main
git push origin develop
```

### Status Check Management

**Approve performance gate:**
```bash
gh api /repos/{owner}/{repo}/statuses/{commit-sha} \
  -f state="success" \
  -f context="gate/performance-review" \
  -f description="Performance review approved"
```

**Block performance gate:**
```bash
gh api /repos/{owner}/{repo}/statuses/{commit-sha} \
  -f state="failure" \
  -f context="gate/performance-review" \
  -f description="Performance issues: <specific reason>"
```

**List status checks on a commit:**
```bash
gh api /repos/{owner}/{repo}/commits/{commit-sha}/statuses --jq '.[].context'
```

### Manual Deploy Trigger

**Staging:** Auto-deploys on push to `develop`. No manual trigger needed.

**Production (DevSecOps only):**
```bash
gh workflow run deploy.yml --ref main
```

### PR and Branch Operations

**Create release branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b release/v$(date +%Y%m%d)
git push origin release/v$(date +%Y%m%d)
```

**Open PR from CLI:**
```bash
gh pr create --base develop --head feature/TSUAA-XX-name \
  --title "feat: description" \
  --body "## Summary\n\n..."
```

**Check CI run status:**
```bash
gh run list --workflow=deploy.yml --limit 5
gh run watch <run-id>
gh run view <run-id> --log
```

### Rollback Commands

**Frontend rollback (GitHub Pages):**
```bash
gh workflow run deploy.yml --ref main
# or via GitHub UI: Actions → Deploy to GitHub Pages → Run workflow → select branch
```

**Backend rollback (VPS):**
```bash
ssh $VPS_USER@$VPS_HOST << 'EOF'
  docker compose -f /opt/app/docker-compose.prod.yml down api
  docker compose -f /opt/app/docker-compose.prod.yml pull api
  docker compose -f /opt/app/docker-compose.prod.yml up -d api
EOF
```

### Pre-Push Hook Setup

```bash
cat > .git/hooks/pre-push << 'HOOK'
#!/bin/bash
current_branch=$(git symbolic-ref HEAD | sed 's|refs/heads/||')
if [ "$current_branch" = "main" ]; then
  ahead=$(git rev-list --count main..develop 2>/dev/null)
  if [ "$ahead" -lt 0 ] 2>/dev/null; then
    echo "BLOCKED: main is ahead of develop. Merge main into develop first."
    exit 1
  fi
fi
HOOK
chmod +x .git/hooks/pre-push
```

### Dependency and Bundle Analysis

```bash
# Check bundle size
npm run build
du -sh dist/
du -sh dist/assets/*.js | sort -h
```

## Related Documents

| Document | Location | Content |
|----------|----------|---------|
| Git Flow Protocol | [docs/GIT_FLOW.md](GIT_FLOW.md) | Branch model, ground rules, CI enforcement, pre-push hook |
| Workflow implementations | `.github/workflows/` | `performance-review.yml`, `deploy.yml` |
| PR Template | `.github/PULL_REQUEST_TEMPLATE.md` | Performance checklist, testing checklist, type-of-change |

## Quick Reference Card

| Action | Who | Command / Trigger |
|--------|-----|-------------------|
| Start feature | Engineer | `git checkout -b feature/XX-name develop` |
| Request review | Engineer | Open PR → `performance-review.yml` auto-triggers |
| Approve perf gate | PerfEngineer | `gh api ... statuses/{sha} -f state=success` |
| Merge to develop | Any reviewer | GitHub PR merge button (gate must be `success`) |
| Deploy to staging | Auto | Push to `develop` → `deploy.yml` |
| Verify staging | PerfEngineer | Open Pages URL → run Lighthouse |
| Create release | PerfEngineer | `git checkout -b release/vX develop` |
| Trigger prod deploy | DevSecOps | `gh workflow run deploy.yml --ref main` |
| Rollback frontend | DevSecOps | `gh workflow run deploy.yml --ref main` |
| Rollback backend | DevSecOps | SSH → `docker compose down/pull/up` |
| Fix Git Flow violation | Engineer / CTO | `git checkout develop && git merge main && git push` |

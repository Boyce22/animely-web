# Deployment Workflow — GitHub Pages

## Overview

The `animely-web` frontend is deployed to GitHub Pages automatically. The deployment process follows TSUAA's [Git Flow](GIT_FLOW.md) and integrates with the [Performance Gate](PERFORMANCE_GATE.md).

## Branch-to-Environment Mapping

| Branch | Environment | URL | Trigger | Gatekeeper |
|--------|-------------|-----|---------|------------|
| `develop` | Staging | `https://<org>.github.io/animely-web/` | Auto on push | None (auto-deploy) |
| `main` | Production | `https://<org>.github.io/animely-web/` | `workflow_dispatch` only | **DevSecOps** |

Production deploys are **gated**. They do NOT auto-deploy on push to `main`. Only DevSecOps can trigger production deploys via `workflow_dispatch`.

## Full Lifecycle

```
Developer PR ──► performance-review.yml (pre-merge gate)
      │
      ▼  (PR approved by PerfEngineer + code review)
  Merge to develop
      │
      ▼
  deploy.yml (auto on push to develop) ──► Staging deploy
      │
      ├── Notify PerfEngineer + DevSecOps
      │
      ▼
  PerfEngineer reviews deployed staging changes
      │
      ├── Issues found → create fix PR → loop
      └── Approved → create release/* PR: develop → main
              │
              ▼
          Merge release PR to main
              │
              ▼
          DevSecOps triggers production deploy
              │
              ▼
          deploy.yml (workflow_dispatch, environment=production) ──► Production deploy
              │
              ├── Success → done
              └── Failure → rollback + reassign to responsible engineer
```

## PerfEngineer Post-Merge Workflow (Staging)

After any PR merges to `develop`:

1. **Wait for deploy** — GitHub Actions runs `deploy.yml`, builds, and deploys to Pages
2. **Read notification** — PerfEngineer receives an automated comment on the merged PR with the Pages URL
3. **Review deployed changes**:
   - Open the GitHub Pages URL
   - Run Lighthouse on key pages
   - Check bundle size (see bundle size in deploy logs)
   - Verify no performance regressions
4. **Approve or block**:
   - ✅ Approved → Create a `release/*` PR from `develop` → `main` (see [Release Process](#release-process))
   - ❌ Issues found → Create a new issue in [TSUAA](/TSUAA) with findings, link the merged PR, and notify the original developer

## Release Process

When PerfEngineer approves the staging deployment:

1. PerfEngineer creates a release branch:
   ```bash
   git checkout develop
   git checkout -b release/v<version>
   git push origin release/v<version>
   ```
2. Open a PR from `release/*` → `main`
3. Add `@PerfEngineer` as reviewer
4. After CI passes, merge the release PR to `main`
5. Production deploy does NOT auto-trigger. DevSecOps must trigger it:
   ```bash
   gh workflow run deploy.yml --ref main -f environment=production
   ```
   Or via GitHub UI: `Actions → Deploy to GitHub Pages → Run workflow → main, environment=production`

## Production Deploy Gate

Production deploys are **gated behind DevSecOps**:

### Gating Mechanism

| Aspect | Implementation |
|--------|---------------|
| Trigger removed | `push` trigger for `main` branch removed from `deploy.yml` |
| Manual dispatch | Production deploy requires `workflow_dispatch` with `environment=production` |
| Git Flow check | `check-git-flow` job runs only on production deploys, verifying `main` is not ahead of `develop` |
| Authorization | Only DevSecOps has permissions to run `workflow_dispatch` on `main` (GitHub branch protection) |

### DevSecOps Pre-Deploy Checklist

Before triggering a production deploy, DevSecOps verifies:

- [ ] Performance gate passed on all merged PRs
- [ ] PerfEngineer has approved the staging deployment
- [ ] Release PR is merged to `main`
- [ ] Git Flow check passes (main not ahead of develop)
- [ ] No active incidents or known regressions

If any check fails, DevSecOps blocks the deploy and notifies the CTO.

## CI Workflow

File: `.github/workflows/deploy.yml`

### Triggers

| Trigger | Environment | Branch | Who |
|---------|-------------|--------|-----|
| `push` | Staging | `develop` | Auto (any merge to develop) |
| `workflow_dispatch` | Staging or Production | Any | DevSecOps (manually triggered) |

### Jobs

| Job | Runs on | Description |
|-----|---------|-------------|
| `check-git-flow` | Production deploys only | Verifies `main` is not ahead of `develop`. Blocks deploy if violated. |
| `build-and-deploy` | All deploys | Builds the app, uploads artifact, deploys to Pages |
| `notify-deploy-failure` | On failure only | Comments on the triggering PR with error context and rollback instructions |

### Steps (build-and-deploy)

1. **Git Flow check** (production only) — Fails if `main` has commits not in `develop`
2. **Setup Pages** — Configures GitHub Pages settings
3. **Install + Build** — `npm ci` → `npm run build`
4. **SPA fallback** — Copies `index.html` → `404.html` for client-side routing
5. **Upload artifact** — Uploads `./dist` as Pages artifact
6. **Deploy** — Deploys to GitHub Pages via `actions/deploy-pages`
7. **Notify** — Comments on the merged PR with Pages URL, staging review checklist (for PerfEngineer), and production-live notice (for DevSecOps)

### Steps (notify-deploy-failure)

If any job fails, the `notify-deploy-failure` job runs:

1. Posts a PR comment with:
   - Environment and branch that failed
   - Link to the failed GitHub Actions run
   - Rollback instructions
   - Responsibility note (author of the failing commit)
2. The comment serves as the **automated reassignment** — the responsible engineer is tagged via the commit author

## Rollback

### Frontend Rollback (GitHub Pages)

Since `deploy.yml` auto-deploys on push to `develop`, **reverting the commit** is the primary rollback strategy:

1. **Identify the failing commit** from the deploy failure notification
2. **Revert the PR** via GitHub UI (Revert button on merged PR)
3. Push creates a new commit to `develop` → auto-deploy restores previous state

For urgent rollbacks (production):
```bash
gh workflow run deploy.yml --ref main -f environment=production
# or re-deploy a known-good commit via git revert
```

### Backend Rollback (VPS)

```bash
ssh $VPS_USER@$VPS_HOST
docker compose -f /opt/app/docker-compose.prod.yml down api
docker compose -f /opt/app/docker-compose.prod.yml pull api
docker compose -f /opt/app/docker-compose.prod.yml up -d api
```

## Automation on Failure

The `notify-deploy-failure` job in `deploy.yml` provides automated failure handling:

1. Detects failure in any deploy job (via `if: failure()`)
2. Posts a detailed comment on the triggering PR with:
   - ❌ Failure banner with environment, branch, commit
   - 🔗 Link to the failed GitHub Actions run
   - 📋 Rollback instructions for both frontend and backend
3. The comment serves as the **reassignment notification** — the engineer responsible for the failing commit is expected to act

The automated comment replaces manual incident tracking. If additional severity is needed, DevSecOps creates a follow-up issue.

## Troubleshooting

### Deployment fails with permission error
Ensure `Settings > Pages > Build and deployment > GitHub Actions` is selected (not "Deploy from a branch").

### 404 on page reload
The SPA fallback step copies `index.html` to `404.html`. Verify it ran: `cp dist/index.html dist/404.html`

### Git Flow check fails on production deploy
Run locally:
```bash
git checkout develop
git merge main
git push origin develop
```

### Deploy fails — what to do
1. Read the failure comment on the merged PR
2. Check the Actions run log for the error
3. Revert the failing PR (or push a fix)
4. DevSecOps re-triggers the deploy

## Manual Deploy

### Staging (auto)
Pushes to `develop` auto-deploy. No manual trigger needed.

### Production (DevSecOps only)
```bash
gh workflow run deploy.yml --ref main -f environment=production
```

Or via GitHub UI: `Actions → Deploy to GitHub Pages → Run workflow → branch: main, environment: production`

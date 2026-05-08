# Deployment Workflow — GitHub Pages

## Overview

The `animely-web` frontend is deployed to GitHub Pages automatically. The deployment process follows TSUAA's [Git Flow](GIT_FLOW.md) and integrates with the [Performance Gate](PERFORMANCE_GATE.md).

## Branch-to-Environment Mapping

| Branch     | Environment     | URL                            | Trigger             |
|------------|-----------------|--------------------------------|---------------------|
| `develop`  | Staging         | `https://<org>.github.io/animely-web/` | Push to `develop`   |
| `main`     | Production      | `https://<org>.github.io/animely-web/` | Push to `main`      |

Currently both branches deploy to the same GitHub Pages site. In future, separate environments can be configured.

## Full Lifecycle

```
Developer PR ──► performance-review.yml (pre-merge gate)
      │
      ▼  (PR approved by PerfEngineer + code review)
  Merge to develop
      │
      ▼
  deploy.yml ──► Build + Deploy to GitHub Pages
      │
      ├── Notify PerfEngineer (post-merge review)
      │
      ▼
  PerfEngineer reviews deployed changes
      │
      ├── Issues found → create fix PR → loop
      └── Approved → create release/* PR: develop → main
              │
              ▼
          Merge release PR to main
              │
              ▼
          deploy.yml ──► Build + Deploy to GitHub Pages (production)
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
5. `deploy.yml` triggers automatically on push to `main`, deploying to GitHub Pages

## CI Workflow

File: `.github/workflows/deploy.yml`

### Jobs

| Job              | Runs on        | Description                                  |
|------------------|----------------|----------------------------------------------|
| `check-git-flow` | `main` only    | Verifies `main` is not ahead of `develop`    |
| `build-and-deploy` | `develop` + `main` | Builds the app, uploads artifact, deploys to Pages |

### Steps

1. **Git Flow check** (main only) — Fails if `main` has commits not in `develop`
2. **Setup Pages** — Configures GitHub Pages settings
3. **Install + Build** — `npm ci` → `npm run build`
4. **SPA fallback** — Copies `index.html` → `404.html` for client-side routing
5. **Upload artifact** — Uploads `./dist` as Pages artifact
6. **Deploy** — Deploys to GitHub Pages via `actions/deploy-pages`
7. **Notify PerfEngineer** (develop only) — Comments on the merged PR with Pages URL and review checklist

## Troubleshooting

### Deployment fails with permission error
Ensure `Settings > Pages > Build and deployment > GitHub Actions` is selected (not "Deploy from a branch").

### 404 on page reload
The SPA fallback step copies `index.html` to `404.html`. Verify it ran: `cp dist/index.html dist/404.html`

### Git Flow check fails
Run locally:
```bash
git checkout develop
git merge main
git push origin develop
```

## Manual Deployment

Trigger manually via GitHub UI:
1. Go to `Actions` → `Deploy to GitHub Pages`
2. Click `Run workflow`
3. Select branch (`develop` for staging, `main` for production)
4. Click `Run workflow`
